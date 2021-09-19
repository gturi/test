from io import BytesIO


class FileInfo:

    def __init__(self, name: str, content: BytesIO, mimetype: str = None):
        self.__name = name
        self.__content = content
        self.__mimetype = mimetype

    @property
    def name(self) -> str:
        return self.__name

    @property
    def content(self) -> BytesIO:
        return self.__content

    @property
    def mimetype(self) -> str:
        return self.__mimetype
