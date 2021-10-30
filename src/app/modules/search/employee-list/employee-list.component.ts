import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Employee, SearchParamLabel } from '../../../shared/models/employee';
import { EmployeeTableComponent } from '../../../shared/components/employee-table/employee-table.component';
import { EmployeeService } from '../../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject, merge } from 'rxjs';
import { EmployeeComponent } from './../employee/employee.component';
import { EmployeeDataSource } from "../../../services/employee.datasource";
import { debounceTime, distinctUntilChanged, map, filter, combineLatest } from 'rxjs/operators';
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

  dataSource: EmployeeDataSource;

  totalCount = 0;

  
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly dialog: MatDialog,
  ) {
    this.dataSource = new EmployeeDataSource(this.employeeService);
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
        distinctUntilChanged())
      .subscribe((searchedValue) => {

        this.paginator.pageIndex = 0;
        this.searchedValue = searchedValue;
        this.loadEmployees();
      });

    this.dataSource.totalCount$
      .subscribe((total) => {
        this.paginator.length = total;
      });

    merge(this.employeeTable.sort.sortChange, this.paginator.page)
      .subscribe(() => {
        if (!this.employeeTable.sort.direction) {
          this.employeeTable.sort.direction = 'asc';
          this.employeeTable.sort.active = Column.NAME;
        }
        this.loadEmployees();
      });
  }

  /** gets employeees connecting to the EmployeeDataSource. */
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

  resetSearchField() {
    this.searchedValue = '';
    this.searchSubject$.next(new Event(''));
  }

  viewEmployee(employee: Employee): void {

    const dialogRef = this.dialog.open(EmployeeComponent, {
      data: employee,
      disableClose: true,
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((updatedForm) => {
    });
  }

  ngOnDestroy() {
    this.searchSubject$.unsubscribe();
  }
}
