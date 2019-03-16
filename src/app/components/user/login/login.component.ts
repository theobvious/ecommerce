import { User } from './../../../models/user';
import { CartService } from './../../../services/cart.service';
import { DateFormatPipe } from './../../../dateFormat.pipe';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('f') form: any;
  usernameModel: string;
  passwordModel: string;
  user: User;
  message: any;
  shopurl: string = '/shop';
  adminurl: string = '/admin';
  activecarturl: string = '/activecart';
  currentDate: any;

  constructor(private getdata: DataService, private userservice: UserService, private cartservice: CartService, public router: Router, public route: ActivatedRoute, private dateformat : DateFormatPipe) { }

  ngOnInit() { 
    this.userservice.getUsers();
    this.currentDate = this.dateformat.transform(new Date());
   }

  logIn(): void {
    this.userservice.sendUser({username: this.usernameModel, password: this.passwordModel, date: this.currentDate})
    .subscribe(
        response=> { 
          sessionStorage.setItem("loggedIn", "true");
          sessionStorage.setItem("date", this.currentDate);
          this.user = response.json();
          this.userservice.name = this.user.name;

          this.userservice.isLoggedIn.next(true);
          this.userservice.loggedInUser = this.user;

          this.router.navigate(['/admin']);
        },
        err=> this.message="אירעה תקלה. תנסו שוב או הירשמו."
    )
  }
}