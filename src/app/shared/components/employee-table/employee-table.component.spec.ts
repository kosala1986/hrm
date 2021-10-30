import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDataSource } from '../../../services/user.datasource';
import { of } from "rxjs";

import { EmployeeTableComponent } from './employee-table.component';
import { UserService, EmployeeList } from '../../../services/user.service';

describe('EmployeeTableComponent', () => {
  let component: EmployeeTableComponent;
  let fixture: ComponentFixture<EmployeeTableComponent>;
  const mockUserService = jasmine.createSpyObj('UserService', ['getEmployees']);

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
        { provide: UserService, useValue: mockUserService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    mockUserService.getEmployees.and.returnValue(of(mockEmpList));

    fixture = TestBed.createComponent(EmployeeTableComponent);
    component = fixture.componentInstance;
    component.dataSource = new UserDataSource(mockUserService);
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
