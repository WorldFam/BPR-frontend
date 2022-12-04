import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocetConnectionService {
  constructor(private http: HttpClient) {}
  
  getUriAndConnectToPubSub() {
   return this.http.get('http://localhost:7071/api/GeneratingUriForPubSub');
  }
  getPubSubCountryData(uri : string)
  {
   return  webSocket(uri);
  }
}
