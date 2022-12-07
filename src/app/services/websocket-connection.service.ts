import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebSocketConnectionService implements OnInit {
  constructor(private http: HttpClient) {
  
  }

  pubSubUri: Object

  ngOnInit(){
  }
  
  getUriAndConnectToPubSub()  {
   return this.http.get('http://localhost:7071/api/GeneratingUriForPubSub')
   .subscribe((data) => console.log(data) );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  subscribeToWebSocket(uri){
    return webSocket('wss://bpr.webpubsub.azure.com:443/client/hubs/BPR?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NzA0MTY1OTcsImV4cCI6MTY3MDQyMDE5NywiaWF0IjoxNjcwNDE2NTk3LCJhdWQiOiJodHRwczovL2Jwci53ZWJwdWJzdWIuYXp1cmUuY29tL2NsaWVudC9odWJzL0JQUiJ9.wnznEr1g-u14buZ9dfs7xBuUtHP_V2QtF_CiELyXiQ0')
  }
  
}
