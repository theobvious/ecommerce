import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  id: string;
  loggedIn: boolean = false;

  constructor (private userservice: UserService) { }

  ngOnInit() {
    this.start();
  }
    
  start(){
      this.userservice.isLoggedIn.subscribe(res => {
        this.loggedIn = res;
      });
      this.id=UUID.UUID();
      sessionStorage.setItem('id', this.id);

    }

  adminBtn():void {
    if(this.loggedIn==true){
      window.location.replace("/admin");
    } else window.location.replace("/login");
  }

  logOutBtn():void {
    this.userservice.logOut().subscribe(res =>{
      window.location.replace("/")
    }) 
  }
}
