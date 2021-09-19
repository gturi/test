class ServerInfoDto:

    def __init__(self, serverVersion: str, youtubeDlVersion: str, hostAddress: str):
        self.__serverVersion = serverVersion
        self.__youtubeDlVersion = youtubeDlVersion
        self.__hostAddress = hostAddress

    @property
    def serverVersion(self) -> str:
        return self.__serverVersion

    @property
    def youtubeDlVersion(self) -> str:
        return self.__youtubeDlVersion

    @property
    def hostAddress(self) -> str:
        return self.__hostAddress
