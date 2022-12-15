import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UnavailabilityMarketMessagesService {
  private baseURL: string =
    'http://localhost:7071/api';

  constructor(private http: HttpClient) {}
  
  public getFilterOptions<T>(id : string): Observable<T[]> {

    return this.http
      .get<T[]>(this.baseURL + `/infrastructure/${id}`)
      .pipe(catchError(this.handleError));
  }

  public getUrgentMarketMessages<T>(queryParams?): Observable<T[]> {
    let params = new HttpParams({
      fromObject: queryParams,
    });

    return this.http
      .get<T[]>(this.baseURL + `/messages`, {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  public getUrgentMarketMessageHistoricData<T>(id: string): Observable<T> {
    let params = new HttpParams({
      fromString: id,
    });

    return this.http
      .get<T>(this.baseURL + `/messages`, {
        params: params,
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
    return throwError(() => {
      return errorMessage;
    });
  }
}
