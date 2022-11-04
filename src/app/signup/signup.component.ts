
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../AuthService';
import { Router } from '@angular/router';
import { User } from '../user';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  signupform!: FormGroup;
  firstName!:FormControl;
  lastName!:FormControl;
  email!:FormControl;
  password!:FormControl;
  role!:FormControl;

  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder, private dialogRef:MatDialogRef<SignupComponent>) { }

  ngOnInit():void {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('',  Validators.required);
    this.email = new FormControl('',  [Validators.required,  Validators.email]);
    this.password = new FormControl('',  Validators.required);
    this.role = new FormControl('',  Validators.required);
    this.signupform=this.formBuilder.group( {
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        password:this.password,
        role:this.role
      });
  }
  

  save() {
    this.authService
    .signUp(this.signupform.value).subscribe(data => {
      console.log(data)
    }, 
    error => console.log(error));
  }

  onSubmit() {
  if(this.signupform.valid){
    this.save(); 
    this.signupform.reset();
    this.dialogRef.close('Sign Up');
  }
  else{
    alert("User not Registerd")
  }
  }
}

