
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  emailId!:FormControl;
  password!:FormControl;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService, public dialog: MatDialog,
    public router: Router, private formBuilder: FormBuilder, private dialogRef:MatDialogRef<LoginComponent>
  ) {
  }
 
  ngOnInit() {

    this.emailId = new FormControl('',  [Validators.required,  Validators.email]);
    this.password = new FormControl('', Validators.required);
    this.loginForm=this.formBuilder.group( {
        emailId:this.emailId,
        password:this.password
      });
  }

  loginUser() {
    if(this.loginForm.valid){
    this.authService.signIn(this.loginForm.value);
    console.log(this.loginForm.value);
    this.loginForm.reset();
    this.dialogRef.close('Login');
    }
    else{
      alert("Incorrect email or password")
    }
  }

  openDialog() {
    this.dialog.open(LoginComponent, {
    }).afterClosed().subscribe(val=>{
  if(val==='Login'){
    this.router.navigate(['/employees']);
  }
    });
  }
  openSignupDialog(){
    this.dialogRef.close('Login');
    this.dialog.open(SignupComponent, {
    }).afterClosed().subscribe(val=>{
      
  if(val==='Sign Up'){
    alert("User Registerd Successfully");
    //this.router.navigate(["/"]);
    this.openDialog();
  }
    });
  }
}