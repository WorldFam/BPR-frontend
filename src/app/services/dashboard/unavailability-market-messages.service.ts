import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiVersion } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class UnavailabilityMarketMessagesService {
  private baseURL: string =
    ' http://localhost:7071/api';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':"application/json",
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET',
      'Authorization':''
    }),

  };

  
  public getFilterOptions<T>(endpoint): Observable<T[]> {

    return this.http
      .get<T[]>(this.baseURL + `/infrastructure/${endpoint}`, {
        headers: this.httpOptions.headers,
      })
      .pipe(catchError(this.handleError));
  }

  public getUMMS<T>(queryParams?): Observable<T[]> {
    let params = new HttpParams({
      fromObject: queryParams,
    });

    return this.http
      .get<T[]>(this.baseURL + `/messages`, {
        headers: this.httpOptions.headers,
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  public getUMM<T>(id: string): Observable<T> {
    return this.http
      .get<T>(this.baseURL + `/messages/${id}`, {
        headers: this.httpOptions.headers,
      })
      .pipe(catchError(this.handleError));
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
}
