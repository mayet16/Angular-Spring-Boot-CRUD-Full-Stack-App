import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardGuard } from './auth-guard.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuardGuard] },
  { path: 'add', component: CreateEmployeeComponent , canActivate: [AuthGuardGuard] },
  { path: 'update/:id', component: UpdateEmployeeComponent , canActivate: [AuthGuardGuard] },
  { path: 'details/:id', component: EmployeeDetailsComponent , canActivate: [AuthGuardGuard] },
  { path: 'students', component: StudentListComponent , canActivate: [AuthGuardGuard] },
  { path: 'add-stud', component: CreateStudentComponent , canActivate: [AuthGuardGuard] },
  { path: 'update-student/:id', component: UpdateStudentComponent , canActivate: [AuthGuardGuard] },
  { path: 'student-detail/:id', component: StudentDetailsComponent , canActivate: [AuthGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }