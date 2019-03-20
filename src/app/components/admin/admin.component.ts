import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

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
      .subscribe(data => {
         if (data.json) {
          this.orders = data.json();
        }
      })
  }

  
}
