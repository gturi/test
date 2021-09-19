from flask import send_file
from flask_restx import Resource, fields
from src.config.flask_restx_config import api
from src.service.downloader_service import DownloaderService

ns = api.namespace('youtube-dl', description='Download operations')

download = api.model('Download', {
    'urls': fields.List(fields.String(), required=True),
    'ydlOpts': fields.Wildcard(fields.String(), required=False),
    'temporary': fields.Boolean(default=False, required=False)
})


@ns.route('/download-and-send')
class DownloadAndSend(Resource):
    '''TODO'''

    __downloader_service = DownloaderService()

    @ns.doc('downloads videos and sends them to device', responses={
        200: 'Success',
        400: 'Validation Error'
    })
    @ns.expect(download)
    def post(self):
        body = api.payload
        urls = set(body.get('urls'))
        ydl_opts = body.get('ydlOpts', None)
        temporary = body.get('temporary', False)

        download_directory = self.__downloader_service.download(urls, ydl_opts, temporary)

        loaded = self.__downloader_service.load_files_in_directory(download_directory)

        if temporary:
            self.__downloader_service.remove_directory(download_directory)

        return send_file(
            loaded.content,
            mimetype=loaded.mimetype,
            as_attachment=True,
            attachment_filename=loaded.name
        )
