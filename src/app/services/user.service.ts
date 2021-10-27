import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Employee } from '../shared/models/employee';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface EmployeeList {
  total: number;
  result: Employee[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  /** Gets employee list from the backend API. */
  getEmployees(queryParam?: Params): Observable<EmployeeList> {
    return this.httpService.get(environment.getEmployeeUrl, queryParam)
      .pipe(
        map((response) => {
          const totalCount = response.headers.get('X-Total-Count') ?
            response.headers.get('X-Total-Count') : 0;
          const data = response.body as Employee[];

          return {
            total: totalCount as number,
            result: data,
          };
        }));
  }
}