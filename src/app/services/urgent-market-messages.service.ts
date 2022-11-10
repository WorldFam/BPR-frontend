import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UMM } from 'src/app/models/model';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrgentMarketMessagesService {

  private baseURL: string = 'https://636d0bd2ab4814f2b276f566.mockapi.io/Umm';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Accept':"application/json",
      // 'Access-Control-Allow-Methods':'GET',
      // 'Authorization':''
    }),
  };

  public getUMMS<T>(filterValues: { source: string; country: string; }): Observable<T[]> {
    const params = new HttpParams({ fromObject: filterValues })  
    console.log(params.toString()) 
    return this.http.get<T[]>(this.baseURL, {headers: this.httpOptions.headers, params: params}).pipe(
      retry(1), catchError(this.handleError)
    );
  }
  
  public getUMM<T>(id: T): Observable<T> {
    console.log(this.baseURL+`/${id}`)
    return this.http.get<T>(this.baseURL+`/${id}`,{headers: this.httpOptions.headers}).pipe(
      retry(1), catchError(this.handleError)
    );
  }

   handleError(error: any) {
    console.log('EORR')
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



}
