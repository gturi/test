from datetime import datetime
from pathlib import Path


class Config:

    __default_download_folder = Path.home().joinpath('Downloads', 'youtube-dl')

    __time_format = '%Y-%m-%d h%H m%M s%S'

    def get_download_folder(self, temporary: bool = False) -> str:
        if temporary:
            now = self.get_current_time_as_string()
            return str(self.__default_download_folder.joinpath(now))
        else:
            return str(self.__default_download_folder)

    def get_as_path_in_download_folder(self, path: str, download_folder: str = __default_download_folder) -> str:
        return str(Path(download_folder).joinpath(path))

    def get_current_time_as_string(self) -> str:
        return datetime.now().strftime(self.__time_format)
