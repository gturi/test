import os
import shutil
import youtube_dl
import zipfile
from flask import safe_join
from io import BytesIO
from src.config.config import Config
from src.models.file_info import FileInfo


class DownloaderService:

    config = Config()
    name_template = '%(title)s.%(ext)s'

    def download(self, urls: set, ydl_opts: dict = None, temporary: bool = False) -> str:
        download_folder = self.config.get_download_folder(temporary)
        outtmpl = self.config.get_as_path_in_download_folder(self.name_template, download_folder)
        default_ydl_opts = {'outtmpl': outtmpl}
        if ydl_opts is None or not ydl_opts:
            ydl_opts = default_ydl_opts
        else:
            ydl_opts.update(default_ydl_opts)

        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download(urls)
            # ideally the downloaded files should be returned, however,
            # due to https://github.com/ytdl-org/youtube-dl/issues/5710,
            # it is not possible and the download location is returned instead
            return download_folder

    def zip_files(self, files: list, download_folder: str = config.get_download_folder()) -> FileInfo:
        in_memory_zip = BytesIO()
        with zipfile.ZipFile(in_memory_zip, 'w', zipfile.ZIP_DEFLATED) as zf:
            for file in files:
                data = zipfile.ZipInfo(safe_join(download_folder, file))
                zf.writestr(data, file)
        in_memory_zip.seek(0)

        now = self.config.get_current_time_as_string()
        return FileInfo(f'ytdl-download-{now}.zip', in_memory_zip, 'application/zip')

    def load_file(self, file: str, download_folder: str = config.get_download_folder()) -> FileInfo:
        with open(safe_join(download_folder, file), 'rb') as fh:
            return FileInfo(file, BytesIO(fh.read()))

    def remove_file(self, file: str, download_folder: str = config.get_download_folder()) -> None:
        os.remove(safe_join(download_folder, file))

    def load_files_in_directory(self, directory: str = config.get_download_folder()) -> FileInfo:
        files = os.listdir(directory)
        files_number = len(files)
        if files_number == 1:
            return self.load_file(files[0], directory)
        elif files_number > 1:
            return self.zip_files(files, directory)
        else:
            raise Exception(f'no files found in directory {directory}')

    def remove_directory(self, directory) -> None:
        shutil.rmtree(directory)
