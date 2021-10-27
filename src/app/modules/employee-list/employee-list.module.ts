import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { EmployeeListComponent } from './employee-list.component';
import { SharedModule } from '../../shared/shared_module';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { EmployeeComponent } from './employee/employee.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeListRoutingModule,
    MatDialogModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    SharedModule,
  ],
  providers: [
    UserService,
  ],
})
export class EmployeeListModule { }
