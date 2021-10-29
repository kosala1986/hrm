import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Single endpoint service to communicate to backend.
 * All front-end services should route through this service only.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private readonly http: HttpClient,
  ) { }

  /** GET method which returns Observable of T. */
  get<T>(url: string, p?: HttpParams): Observable<HttpResponse<T>> {
    let header = this.createHeader();
    return this.http.get<T>(url, { headers: header, params: p, observe: 'response', },)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** POST method which returns Observable of R. */
  post<T, R>(path: string, payload: T): Observable<R> {
    const httpOptions = {
      headers: this.createHeader(),
    };
    return this.http.post<R>(path, payload, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private createHeader(): HttpHeaders {
    let header = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    return header;
  }

  /**
   * Transforms error messages into developer friendly messages. 
   * TODO: Adds Error Service.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}