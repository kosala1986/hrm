import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeList } from './user.service';
import { environment } from 'src/environments/environment';
import { SearchParamLabel } from '../shared/models/employee';
import { Query } from '../modules/search/employee-list/employee-list.component';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let mockHttpService: HttpService;
  let httpTestingController: HttpTestingController;

  const mockResponse: EmployeeList = {
    total: 0,
    result: [
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    mockHttpService = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns data when getEmployees method is successful', () => {

    spyOn(mockHttpService, 'get').
      and.returnValue(of(new HttpResponse({ body: mockResponse.result, headers: new HttpHeaders() })))
      .and.callThrough();

    const mockQuery: Query = {
      [SearchParamLabel.LIMIT]: 10,
      [SearchParamLabel.PAGE]: 1,
      sort: {
        direction: 'asc',
        active: 'name',
      }
    };

    service.getEmployees(mockQuery).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.getEmployeesUrl}?_limit=10&_page=1&_sort=name&_order=asc`);
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse.result);

    httpTestingController.verify();
  });
});