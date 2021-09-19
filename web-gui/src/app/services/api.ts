import { UrlBuilder } from 'http-url-builder';

export class Api {
  
  static readonly base = new UrlBuilder('http://0.0.0.0:5000/youtube-dl');
}