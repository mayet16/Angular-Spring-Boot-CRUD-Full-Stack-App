import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  endpoint: string = 'http://localhost:8080/api/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  rest!:string;
  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: Object): Observable<Object> {
    let api = `${this.endpoint}/signup`;
    console.log(user);
    return this.http.post<Object>(api, user);
  }

  // Sign-in
  signIn(user: any) {
    return this.http
       .post<any>(`${this.endpoint}/login`, user)
       //.pipe(
      //   map(token => {
      //     localStorage.setItem('access_token', token);
      //     console.log(token);
      //     return token;
      //   })
      // );
      .subscribe(data => {
        this.rest = data;
        localStorage.setItem('access_token', this.rest);
        console.log(localStorage.getItem('access_token'))
        //localStorage.setItem('access_token','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYWlsZUBnbWFpbC5jb20iLCJleHAiOjE2NjUwNzI2NTcsImlhdCI6MTY2NTAzNjY1N30.nLU_ujCYuYhwIJD8umUJ3ghXqwkJcAcExJyKwEJnGX0')

      });
    
  }

  getToken() {
    console.log(localStorage.getItem('access_token'))
   // localStorage.setItem('access_token','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZWtlbGVAZ21haWwuY29tIiwiZXhwIjoxNjY1NDc4MjQ0LCJpYXQiOjE2NjUzOTE4NDR9.kUTFRrxFyndg0aDwoPyKSSSfTp-jP_2AXdWj781iVgs')
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/']);
    }
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}