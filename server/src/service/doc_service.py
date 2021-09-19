from src.models.doc_dto import DocDto
from youtube_dl import YoutubeDL


class DocService:

    def get_youtube_dl_doc(self) -> DocDto:
        return DocDto(YoutubeDL.__doc__)
