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
    'http://localhost:7071/api/EventController';

  constructor(private http: HttpClient) {}

  
  public getFilterOptions<T>(endpoint): Observable<T[]> {

    return this.http
      .get<T[]>(this.baseURL + `/infrastructure/${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  public getUrgentMarketMessages<T>(queryParams?): Observable<T[]> {
    let params = new HttpParams({
      fromObject: queryParams,
    });

    return this.http
      .get<T[]>(this.baseURL , {
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  public getUrgentMarketMessageHistoricData<T>(id: string): Observable<T> {
    let params = new HttpParams({
      fromString: id,
    });

    return this.http
      .get<T>(this.baseURL, {
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
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
