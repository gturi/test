from flask_restx import Resource, fields
from src.config.flask_restx_config import api
from src.service.server_info_service import ServerInfoService

ns = api.namespace('youtube-dl', description='Youtube dl documentation')

doc = api.model(
    'Info', {
        "hostAddress": fields.String(required=True, description="Host address where the server is running"),
        "serverVersion": fields.String(required=True, description="Server version"),
        "youtubeDlVersion": fields.String(required=True, description="Youtube dl version"),
    }
)


@ns.route('/info')
class Info(Resource):

    server_info_service = ServerInfoService()

    @ns.marshal_with(doc)
    def get(self):
        return self.server_info_service.get_info()
