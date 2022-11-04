import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from './AuthService';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 title = 'Angular + Spring Boot CRUD Full Stack App';

 constructor(
  private router: Router,public dialog: MatDialog, public authService: AuthService) {}

 openDialog() {
  this.dialog.open(LoginComponent, {
  }).afterClosed().subscribe(val=>{
if(val==='Login'){
  this.router.navigate(['/employees']);
}
  });
}
openSignupDialog(){
  this.dialog.open(SignupComponent, {
  }).afterClosed().subscribe(val=>{
if(val==='Sign Up'){
  alert("User Registerd Successfully");
  this.openDialog();
}
  });
}
  logout() {
    this.authService.doLogout()
  }
}
