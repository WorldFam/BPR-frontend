import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebSocketConnectionService implements OnInit {
  constructor(private http: HttpClient) {
  
  }
  ngOnInit(){
  }
  
  async getUriAndConnectToPubSub()  {
    return await this.http.get('http://localhost:7071/api/generate-uri')
    .toPromise().then(res => res["uri"]);
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
    return webSocket(uri)
  }
}
