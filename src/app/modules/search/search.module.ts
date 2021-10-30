import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchRoutingModule } from './search-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SharedModule } from '../../shared/shared_module';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeComponent } from './employee/employee.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatDialogModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    SharedModule,
  ],
  providers: [
    EmployeeService,
  ],
})
export class SearchModule { }
