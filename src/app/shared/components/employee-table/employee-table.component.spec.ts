import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDataSource } from '../../../services/employee.datasource';
import { of } from "rxjs";

import { EmployeeTableComponent } from './employee-table.component';
import { EmployeeService, EmployeeList } from '../../../services/employee.service';

describe('EmployeeTableComponent', () => {
  let component: EmployeeTableComponent;
  let fixture: ComponentFixture<EmployeeTableComponent>;
  const mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['getEmployees']);

  const mockEmpList: EmployeeList = {
    total: 0,
    result: [
      {
        id: 1,
        name: 'Kosala',
        location: 'Singapore',
        email: 'kosala@xyz.com',
        status: 'Employed',
        image: 'img.jpg',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeTableComponent],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    mockEmployeeService.getEmployees.and.returnValue(of(mockEmpList));

    fixture = TestBed.createComponent(EmployeeTableComponent);
    component = fixture.componentInstance;
    component.dataSource = new EmployeeDataSource(mockEmployeeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getName() method', () => {
    expect(component.getName(mockEmpList.result[0])).toBe('Kosala');
  });

  it('getLocation() method', () => {
    expect(component.getLocation(mockEmpList.result[0])).toBe('Singapore');
  });

  it('should show data in the table', () => {
    const table = fixture.debugElement.nativeElement.querySelectorAll(('table'));

    expect(table.length).toBe(1);
  });
});
