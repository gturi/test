class YoutubeDlProgressHook:

    __download_locations = []
    __download_prefix = '[download] Destination: '

    def progress_hook(self, d) -> None:
        status = d['status']
        if status == 'finished':
            # the returned files are only temporary and they will be removed after merge
            self.__download_locations.append(d['filename'])

    def get_downloaded_files_locations(self) -> list:
        return self.__download_locations
