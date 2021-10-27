import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Employee } from '../../shared/models/employee';
import { EmployeeTableComponent } from '../../shared/components/employee-table/employee-table.component';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Params } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';

interface SearchResult {
  dataSource: MatTableDataSource<Employee>;
}

interface Pagination {
  limit: number;
  pageNumber: number;
}

export interface Query {
  pagination: Pagination,
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild(EmployeeTableComponent) readonly employeeTable!: EmployeeTableComponent;
  @ViewChild('paginator') paginator?: MatPaginator;

  searchResult?: SearchResult;
  searchQuery!: Query;


  totalCount: number = 0;

  constructor(
    private readonly userService: UserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.searchResult = undefined;
    this.getEmployees();

  }

  getEmployees(event?: PageEvent) {

    this.userService.getEmployees().subscribe(response => {
      this.totalCount = response.total;
      this.searchResult = {
        dataSource: new MatTableDataSource(response.result),
      };
    });
  }

  viewEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeComponent, {
      data: employee,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
