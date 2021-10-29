import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee ,EmployeeLabel } from '../../../shared/models/employee';

@Component({
  selector: 'employee-dialog',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  readonly EmployeeLabel = EmployeeLabel;

  constructor(
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: Employee) { 
    }

  ngOnInit(): void {
  }

}
