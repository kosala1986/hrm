import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpService } from './http.service';

describe('HttpServiceService', () => {
  let mockService: HttpService;
  let httpTestingController: HttpTestingController;

  const mockResponse = new HttpResponse({url: 'getUrl'});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    mockService = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(mockService).toBeTruthy();
  });

  it('returns data when get method is successful', () => {
    mockService.get('getUrl').subscribe(response => {
      expect(response.status).toEqual(200);
    });

    const req = httpTestingController.expectOne('getUrl');
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);

    httpTestingController.verify();
  });

  it('returns error when get method fails', () => {
    mockService.get('getUrl').subscribe(() => {
      fail();
    }, (errorInfo) => {
      expect(errorInfo).toBe('Error: Http failure response for getUrl: 400 ');
    });

    const mockError = new ErrorEvent('error');

    const req = httpTestingController.expectOne('getUrl');
    req.error(mockError, { status: 400 });
  });

  it('returns data when post method is successful', () => {
    mockService.post('postUrl', {}).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('postUrl');
    expect(req.request.method).toBe("POST");
    req.flush(mockResponse);

    httpTestingController.verify();
  });

  it('returns error when post method fails', () => {
    mockService.post('postUrl', {}).subscribe(() => {
      fail();
    }, (errorInfo) => {
      expect(errorInfo).toBe('Error: Http failure response for postUrl: 500 ');
    });

    const mockError = new ErrorEvent('error');

    const req = httpTestingController.expectOne('postUrl');
    req.error(mockError, { status: 500 });
  });
});