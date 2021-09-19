import socket
import youtube_dl
from src.models.server_info_dto import ServerInfoDto
from src.version import __version__


class ServerInfoService:

    __host_name = "unknown"

    def __init__(self) -> None:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        self.__host_name = s.getsockname()[0]
        s.close()

    def get_info(self) -> str:
        return ServerInfoDto(
            __version__,
            youtube_dl.version.__version__,
            self.__host_name
        )
