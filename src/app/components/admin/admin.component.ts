import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  orders: any;
  
  constructor(private getdata: DataService) { }

  ngOnInit() {
    this.getorders();
  }

  getorders() {
    this.getdata.getOrders()
      .subscribe (res => {
        this.orders = res.json();
      });
  }

  

}
