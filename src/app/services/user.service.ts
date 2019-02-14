import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
constructor(private http: Http) { }

 loggedInUser: User;
 username:any = new Subject();
 isLoggedIn = new Subject<boolean>();
// isAdmin:boolean = false;

 set name(value) {
   this.username.next(value);
   sessionStorage.setItem('name', value);
 }

 get name() {
   return sessionStorage.getItem('name');
 }

 getLoggedInUser(): User {
  return this.loggedInUser;
}

checkLoggedIn() {
  return this.isLoggedIn;
}

sendUser(userData): Observable<any> {
  return this.http.post('/user', userData);
}

checkUser(tz): Observable<any> {
  return this.http.post('/checkexist', tz);
}

registerUser(userData): Observable<any>{
  return this.http.post('/newuser', userData);
}

getUsers(): Observable<any> {
  return this.http.get('/users');
}

logOut(): Observable<any> {
  this.isLoggedIn.next(false);
 // this.isAdmin = false;
  this.loggedInUser = null;
  sessionStorage.clear();
  
  return this.http.post('/logout', null);
}
}




