
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Employee } from '../shared/models/employee';
import { UserService, EmployeeList } from './user.service';
import { catchError, finalize } from "rxjs/operators";
import { Query } from '../modules/search/employee-list/employee-list.component';

/**
 *  Custom data source which connects to the datatable while sorting, filtering
 *  and pagination events. This calls UserService to get data from API.
 */
export class UserDataSource implements DataSource<Employee> {
    private EmployeesSubject = new BehaviorSubject<Employee[]>([]);

    private totalCountSubject = new BehaviorSubject<number>(0);
    public totalCount$ = this.totalCountSubject.asObservable();

    constructor(private userService: UserService) {

    }

    getEmployees(query: Query) {

        this.userService.getEmployees(query)
            .pipe(
                catchError(() => of([])),
                finalize(() => { })
            )
            .subscribe((response) => {
                this.EmployeesSubject.next((response as EmployeeList).result);
                this.totalCountSubject.next((response as EmployeeList).total);
            }
            );
    }

    /** Connects this data source to it's view */
    connect(collectionViewer: CollectionViewer): Observable<Employee[]> {
        return this.EmployeesSubject.asObservable();
    }

    /** Disconnects this data source from it's view when the view is getting
     * destroyed. */
    disconnect(collectionViewer: CollectionViewer): void {
        this.EmployeesSubject.complete();
        this.totalCountSubject.complete();
    }
}