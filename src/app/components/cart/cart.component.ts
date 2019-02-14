import { product } from '../../models/product';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart', 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cart: product[];
  cartCopy: product[];
  total: number;
  searchstring: string;

    constructor(private cartservice: CartService, private router: Router) {}

    ngOnInit() { 
        this.cartservice.cartSubject
          .subscribe(res=>{
            this.cart = res.products;
            this.cartCopy = this.cart;
            this.total = res.totalPrice;
          });
    }

    filterList() {
        let str = this.searchstring;
        this.cart = this.cartCopy.filter(item => item.name.indexOf(str) !== -1);
    }

    removeFromCart(product) {
      this.cartservice
        .removeProduct(product);
    }

    goShop() {
      this.router.navigate(['/shop']);
    }

    checkOut() {
      this.router.navigate(['/checkout']);
    }
}