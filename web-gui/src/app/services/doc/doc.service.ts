import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from 'src/app/services/api';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(private httpClient: HttpClient) { }

  getYoutubeDlDoc(): Promise<any> {
    const url = Api.base.addPath('doc').build()
    return this.httpClient.get(url).toPromise();
  }

}
