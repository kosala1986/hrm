import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Employee, SearchParamLabel } from '../../../shared/models/employee';
import { EmployeeTableComponent } from '../../../shared/components/employee-table/employee-table.component';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject, merge } from 'rxjs';
import { EmployeeComponent } from './../employee/employee.component';
import { UserDataSource } from "../../../services/user.datasource";
import { tap, debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { Column } from '../../../shared/components/employee-table/employee-table.component';
import { Sort } from '@angular/material/sort';

/**  Model which has all query params. */
export interface Query {
  [SearchParamLabel.LIMIT]: number;
  [SearchParamLabel.PAGE]: number;
  sort: Sort;
  filter?: Filter;
}

/** Search field: Name and value: David */
export interface Filter {
  field: Column;
  value: string,
}

/**
 *  This component represents the employee table with search functionality.
 */
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly columns = Object.values(Column)
    .filter(value => value != Column.ID && value != Column.ACTION);

  @ViewChild(EmployeeTableComponent) readonly employeeTable!: EmployeeTableComponent;

  @ViewChild('paginator') paginator!: MatPaginator;

  searchSubject$ = new Subject<Event>();

  searchedValue: string = '';

  filter?: Column;

  searchQuery?: Query;

  readonly dataSource: UserDataSource;

  totalCount = 0;

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
  ) {
    this.dataSource = new UserDataSource(this.userService);
  }

  ngOnInit(): void {

    this.dataSource.getEmployees({
      [SearchParamLabel.PAGE]: 0,
      [SearchParamLabel.LIMIT]: 5,
      sort: {
        direction: 'asc',
        active: Column.NAME,
      }
    });
  }

  ngAfterViewInit() {

    this.employeeTable.sort.sortChange
      .subscribe(() => this.paginator.pageIndex = 0);

    this.searchSubject$
      .pipe(
        map(event => {
          const { target } = event;
          if (target) {
            return (target as HTMLInputElement).value;
          } else {
            return '';
          }
        }),
        filter(searchedText => searchedText.length === 0 || searchedText.length > 2),
        debounceTime(500),
        distinctUntilChanged(),
        tap((searchedValue) => {

          this.paginator.pageIndex = 0;
          this.searchedValue = searchedValue;

          this.loadEmployees();
        })
      )
      .subscribe();

    this.dataSource.totalCount$
      .pipe(
        tap((total) => {
          this.paginator.length = total;
        })
      )
      .subscribe();

    merge(this.employeeTable.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          if (!this.employeeTable.sort.direction) {
            this.employeeTable.sort.direction = 'asc';
            this.employeeTable.sort.active = Column.NAME;
          }
          this.loadEmployees();
        })
      )
      .subscribe();
  }

  loadEmployees() {

    const filter: Query = {
      [SearchParamLabel.PAGE]: this.paginator.pageIndex + 1,
      [SearchParamLabel.LIMIT]: this.paginator.pageSize,
      sort: {
        direction: this.employeeTable.sort.direction,
        active: this.employeeTable.sort.active,
      },
      ...(this.searchedValue && {
        filter: {
          field: this.filter ? this.filter : Column.NAME,
          value: this.searchedValue.trim(),
        }
      })
    }
    this.dataSource.getEmployees(filter);

  }

  viewEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeComponent, {
      data: employee,
      width: '400px',
    });
  }

  ngOnDestroy() {
    this.searchSubject$.unsubscribe();
  }
}
