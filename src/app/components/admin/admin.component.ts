import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  orders: any = [];
  
  constructor(private getdata: OrderService) { }

  ngOnInit() {
    this.getorders();
  }

  getorders() {
    this.getdata.getOrders()
      .subscribe (res => {
        this.orders = res;
        this.orders = Array.of(this.orders);
        console.log(this.orders);
      });
  }

  

}
