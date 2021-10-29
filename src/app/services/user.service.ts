import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Employee, SearchParamLabel } from '../shared/models/employee';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Query } from '../modules/search/employee-list/employee-list.component';

export interface EmployeeList {
  total: number;
  result: Employee[];
}
/** User service providing data to the components. */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  /** Gets employee list from the backend API. */
  getEmployees(queryParam?: Query): Observable<EmployeeList> {

    let params = new HttpParams()
      .set(SearchParamLabel.LIMIT, String(queryParam?.[SearchParamLabel.LIMIT]))
      .set(SearchParamLabel.PAGE, String(queryParam?.[SearchParamLabel.PAGE]))
      .set(SearchParamLabel.SORT, String(queryParam?.sort.active).toLowerCase())
      .set(SearchParamLabel.ORDER, String(queryParam?.sort.direction).toLowerCase());

    if (queryParam?.filter) {
      params = params.append(queryParam.filter.field.toLowerCase(), String(queryParam.filter.value));
    }

    return this.httpService.get(environment.getEmployeesUrl, params)
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