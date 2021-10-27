import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee, EmployeeLabel } from '../../models/employee';

enum Column {
  ID = 'id',
  NAME = 'Name',
  LOCATION = 'Location',
  EMAIL_ADDRESS = 'Email address',
  STATUS = 'Status',
  ACTION = 'Action',
}

/** Displays tubular employee data. */
@Component({
  selector: 'employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {

  readonly Column = Column;
  readonly EmployeeLabel = EmployeeLabel;

  columns = [
    Column.NAME,
    Column.LOCATION,
    Column.EMAIL_ADDRESS,
    Column.STATUS,
    Column.ACTION,
  ]

  constructor() { }

  @Input() dataSource!: MatTableDataSource<Employee>;

  @Output() view = new EventEmitter<Employee>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    const defaultSortingDataAccessor = this.dataSource.sortingDataAccessor;
    this.dataSource.sortingDataAccessor = (employee: Employee, sortHeaderId: string) => {
      const column = sortHeaderId as Column;
      switch (column) {
        case Column.NAME:
          return employee.name;
        case Column.LOCATION:
          return employee.location;
        case Column.EMAIL_ADDRESS:
          return employee.email;
        case Column.STATUS:
          return employee.status;
        default:
          return defaultSortingDataAccessor(employee, sortHeaderId);
      }
    };
  }

  getName(employee: Employee) {
    return employee.name;
  }

  getLocation(employee: Employee) {
    return employee.location;
  }

  getEmailAddress(employee: Employee) {
    return employee.email;
  }

  getStatus(employee: Employee) {
    return employee.status;
  }

  viewInfo(employee: Employee) {
    this.view.emit(employee);
  }
}
