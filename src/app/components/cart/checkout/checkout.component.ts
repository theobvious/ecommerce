import { Order } from './../../../models/order';
import { User } from './../../../models/user';
import { product } from './../../../models/product';
import { DataService } from './../../../services/data.service';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  order: Order = new Order(0, '', '', '', '', '', '');
  filling: boolean = true;
  finished: boolean = false;

  constructor(private cartservice: CartService, private userservice: UserService, private getdata: DataService, private router: Router) {
    this.cartservice.cartSubject
      .subscribe(res=>{
        this.order.products = JSON.stringify(res.products);
        this.order.date = res.date;
      })
   }

  backToShop() {
    this.router.navigate(['/shop']);
  }

  finishShopping() {
    console.log(this.order);
    this.cartservice.submitOrder(this.order)
      .subscribe(res => {
        console.log("Order submitted!")
      });

    this.cartservice.resetCart();
    this.filling = false;
    this.finished = true;
  }
}
