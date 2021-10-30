import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeeList } from '../../../services/employee.service';
import { SharedModule } from '../../../shared/shared_module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeDataSource } from '../../../services/employee.datasource';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeStatus } from '../../../shared/models/employee';
import { of } from "rxjs";

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let mockDialog: MatDialog = jasmine.createSpyObj('MatDialog', ['open', 'close']);
  const mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['getEmployees']);

  const mockEmpList: EmployeeList = {
    total: 0,
    result: [
      {
        id: 1,
        name: 'Kosala',
        location: 'Singapore',
        email: 'kosala@xyz.com',
        status: EmployeeStatus.EMPLOYED,
        image: 'img.jpg',
      },
    ],
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSortModule,
        MatPaginatorModule,
        SharedModule,
        NoopAnimationsModule,],
      declarations: [
        EmployeeListComponent,
        EmployeeComponent,
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    mockEmployeeService.getEmployees.and.returnValue(of(mockEmpList));

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    component.dataSource = new EmployeeDataSource(mockEmployeeService);

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should get employees when user search with a filter', fakeAsync(() => {
    spyOn(component, 'loadEmployees');
    component.searchSubject$.next(new KeyboardEvent('Kosala Yapa'));

    tick(600);

    expect(component.loadEmployees).toHaveBeenCalled();
  }));

  it('should get employees when pagination', () => {
    spyOn(component, 'loadEmployees');

    component.paginator.page.next();

    expect(component.loadEmployees).toHaveBeenCalled();
  });

  it('should get employees when sorting', () => {
    spyOn(component, 'loadEmployees');

    component.employeeTable.sort.sortChange.next();

    expect(component.loadEmployees).toHaveBeenCalled();
  });
});
