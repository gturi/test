import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private httpClient: HttpClient) { }

  getServerInfo(): Promise<any> {
    const url = Api.base.addPath('info').build()
    return this.httpClient.get(url).toPromise();
  }
}
