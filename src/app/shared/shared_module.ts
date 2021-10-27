import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        RouterModule,
        MatSortModule,
    ],
    declarations: [
        TitleBarComponent,
        EmployeeTableComponent,
    ],
    exports: [
        TitleBarComponent,
        EmployeeTableComponent,
    ],
})
export class SharedModule { }