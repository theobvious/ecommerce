import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  screen1: boolean = true;
  screen2: boolean = false;

  cities: string[] = [
    "London",
    "Hogwarts",
    "Hogsmeade",
    "The Burrow",
    "Godric's Hollow",
    "Little Hangleton",
    "Spinner's End",
    "Forest of Dean"
  ]

  nameModel: string;
  unameModel: string;
  emailModel: string;
  pwdModel: string;
  confirmModel: string;
  tzModel: number;
  cityModel: string;
  streetModel: string;
  messageCode: any;
  newUser: User;
  submitted: boolean = false;

  constructor(private userservice: UserService) {}

  onSubmit() {
    //why is it needing a double click??
    this.userservice.checkUser({tz: this.tzModel})
      .subscribe(res => {
        this.messageCode=res.json();
      });
    if (this.messageCode == 1) {
      alert("Error: a user with such an ID is already registered in the system!");
      return;
    } else if (this.messageCode == 2) {
      this.screen1 = false;
      this.screen2 = true;
    }
  }

  backToLogin() {
    window.location.replace('/');
  }
 
  register() {
    this.newUser = new User(
      this.nameModel,
      this.emailModel,
      "user", 
      this.cityModel,
      this.streetModel,
      this.unameModel,
      this.pwdModel,
      this.tzModel,
    );
    this.submitted = true;
    this.userservice.registerUser(this.newUser)
      .subscribe(res=>{
        window.location.replace('/');
      });
  }
}