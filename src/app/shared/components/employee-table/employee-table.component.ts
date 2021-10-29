import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { UserDataSource } from '../../../services/user.datasource';
import { Employee, EmployeeLabel } from '../../models/employee';

export enum Column {
  ID = 'id',
  NAME = 'Name',
  LOCATION = 'Location',
  EMAIL_ADDRESS = 'email',
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

  @Input() dataSource!: UserDataSource;

  @Output() view = new EventEmitter<Employee>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
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
