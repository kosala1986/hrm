
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Employee } from "../shared/models/employee";
import { UserService } from "./user.service";
import { catchError, finalize } from "rxjs/operators";
import { Query } from '../modules/search/employee-list/employee-list.component';

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
            .subscribe((response: any) => {
                this.EmployeesSubject.next(response.result);
                this.totalCountSubject.next(response.total);
            }
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<Employee[]> {
        return this.EmployeesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.EmployeesSubject.complete();
        this.totalCountSubject.complete();
    }
}