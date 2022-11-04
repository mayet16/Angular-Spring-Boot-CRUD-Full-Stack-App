import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeform!: FormGroup;
  actionbtn:String="Save";
  employee:Employee = new Employee();
  firstName!:FormControl;
  lastName!:FormControl;
  emailId!:FormControl;

  constructor(private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private router: Router, private formBuilder: FormBuilder, private dialogRef:MatDialogRef<CreateEmployeeComponent>) { }

  ngOnInit():void {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('',  Validators.required);
    this.emailId = new FormControl('',  [Validators.required,  Validators.email]);
    this.employeeform=this.formBuilder.group( {
        firstName:this.firstName,
        lastName:this.lastName,
        emailId:this.emailId,
      });
    console.log(this.editData);
    if(this.editData){
      this.actionbtn="Update";
      this.employeeform.controls['firstName'].setValue(this.editData.firstName);
      this.employeeform.controls['lastName'].setValue(this.editData.lastName);
      this.employeeform.controls['emailId'].setValue(this.editData.emailId)
    }
  }
  

  save() {
    this.employeeService
    .createEmployee(this.employeeform.value).subscribe(data => {
      console.log(data)
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
if(!this.editData){
  if(this.employeeform.valid){
    this.save(); 
    this.employeeform.reset();
    this.dialogRef.close('Save');
  }
  else{
    alert("Employee not added")
  }
}
 else{
  if(this.employeeform.valid){
  this.updateEmployee();
  }
  else{
    alert("Employee not Updated")
  }
 }  
  }

  updateEmployee(){
    this.employeeService.updateEmployee(this.editData.id, this.employeeform.value).subscribe
    (data=>{
      console.log(data);
      alert("Employee Updated Successfully");
      this.employeeform.reset();
      this.dialogRef.close('Update');

    })
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
}