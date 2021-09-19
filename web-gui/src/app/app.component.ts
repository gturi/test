import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { saveAs } from 'file-saver';
import { DialogService } from './services/dialog/dialog.service';
import { DownloadService } from './services/download/download.service';
import { InfoService } from './services/info/info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  availableFormats = ['3gp', 'aac', 'flv', 'm4a', 'mp3', 'mp4', 'ogg', 'wav', 'webm'];

  ydlOpts: Map<string, string | number> = new Map();

  hostAddress = 'unknown';

  serverVersion = 'unknown';

  youtubeDlVersion = 'unknown';

  urls: string[] = [''];

  downloadInProgress: boolean = false;

  constructor(
    infoService: InfoService,
    private downloadService: DownloadService,
    private dialogService: DialogService) {
    infoService.getServerInfo().then(serverInfo => {
      console.log(serverInfo);
      this.hostAddress = serverInfo.hostAddress;
      this.serverVersion = serverInfo.serverVersion;
      this.youtubeDlVersion = serverInfo.youtubeDlVersion;
    });
  }

  openMultipleDownloadDialog() {
    this.dialogService.openMultipleDownloadDialog(this.urls).then(newUrls => {
      if (newUrls) {
        this.urls = newUrls;
      }
    });
  }

  isMultipleDownload(): boolean {
    return this.urls.length > 1
  }

  isDownloadDisabled(): boolean {
    return !this.urls.some(url => url !== undefined && url !== null && url !== '') && !this.downloadInProgress;
  }

  download() {
    if (this.urls.length >= 1) {
      this.downloadInProgress = true;
      this.downloadService.download(this.urls, this.ydlOpts)
        .then(response => this.promptSaveData(response))
        .catch(e => this.dialogService.openErrorDialog(e))
        .finally(() => this.downloadInProgress = false);
    }
  }

  getFiles() {
    if (this.urls.length >= 1 && !this.downloadInProgress) {
      this.downloadInProgress = true;
      let response: Promise<HttpResponse<Blob>>;
      if (this.urls.length === 1) {
        const url = this.urls[0];
        response = this.downloadService.getFile(url);
      } else {
        response = this.downloadService.getFiles(this.urls)
      }
      response.then(response => this.promptSaveData(response))
        .catch(e => this.dialogService.openErrorDialog(e))
        .finally(() => this.downloadInProgress = false);
    }
  }

  promptSaveData(response: HttpResponse<Blob>) {
    const fileName = this.downloadService.getFileNameFromHeaders(response.headers)
    const data = response.body;
    if (data !== null) {
      saveAs(data, fileName)
    } else {
      this.dialogService.openErrorDialog(new Error('file content can not be null!'));
    }
  }

  options() {
    this.dialogService.openOptionsDialog(this.ydlOpts)
      .then(newYdlOpts => {
        if (newYdlOpts !== null && newYdlOpts !== undefined) {
          this.ydlOpts = newYdlOpts;
        }
      })
      .catch(e => this.dialogService.openErrorDialog(e));
  }

  setSelectedFormat(matSelectChange: MatSelectChange) {
    const selectedFormat = matSelectChange.value;
    if (selectedFormat === undefined) {
      this.ydlOpts.delete('format');
    } else {
      this.ydlOpts.set('format', selectedFormat);
    }
  }

  showYoutubeDlDocs() {
    this.dialogService.openYoutubeDlDocsDialog("asd");
  }
}
