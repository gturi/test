import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Api } from 'src/app/services/api';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private httpClient: HttpClient) { }

  getFile(name: string): Promise<HttpResponse<Blob>> {
    const url = Api.base.addPath('file')
      .addPath(name)
      .build()
    return this.httpClient.get(url, { responseType: 'blob', observe: 'response' }).toPromise();
  }

  getFiles(names: string[]): Promise<HttpResponse<Blob>> {
    if (names.length === 1) {
      return this.getFile(names[0]);
    } else {
      const url = Api.base.addPath('files').build()
      return this.httpClient.post(url, names, { responseType: 'blob', observe: 'response' }).toPromise();
    }
  }

  download(urls: string[], ydlOpts: Map<string, string | number>): Promise<HttpResponse<Blob>> {
    const url = Api.base.addPath('download-and-send').build()
    const body: any = {
      'urls': urls,
      'temporary': true
    }
    if (ydlOpts.size > 0) {
      body.ydlOpts = Object.fromEntries(ydlOpts);
    }
    return this.httpClient.post(url, JSON.stringify(body), {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'blob',
      observe: 'response'
    }).toPromise();
  }

  getFileNameFromHeaders(headers: HttpHeaders): string {
    const contentDisposition = headers.get('content-disposition');
    if (contentDisposition === null) {
      return 'unknown';
    }
    // https://stackoverflow.com/a/23054920
    const regexpMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    const fileName = regexpMatch === null ? 'unknown' : regexpMatch[1];
    return this.removeLeadingAndTrailingQuotes(fileName);
  }

  private removeLeadingAndTrailingQuotes(string: string) {
    // equivalent of /^(")?(.+?)(")?$/
    return string.replace(/^['"]/, '').replace(/['"]$/, '');
  }
}
