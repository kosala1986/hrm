import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeComponent } from './employee.component';
import { FormsModule } from '@angular/forms';
import { Employee ,EmployeeStatus} from '../../../shared/models/employee';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let fakeDialogRef: jasmine.SpyObj<MatDialogRef<EmployeeComponent>>;

  const employee: Employee = {
    id: 1,
    name: 'Kosala',
    location: 'Singapore',
    email: 'kosala@xyz.com',
    status: EmployeeStatus.EMPLOYED,
    image: 'img.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeComponent],
      imports: [FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: fakeDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: employee },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
