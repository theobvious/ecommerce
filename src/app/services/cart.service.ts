import { product } from '../models/product';
import { CartState } from '../models/cartState';

import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class CartService {
  id : any;
  today : any;
  cartSubject = new BehaviorSubject<CartState>({id: this.id, products: [], totalPrice: 0, date: this.today});
  products : product[] = [];
  totalPrice : number = 0;

  constructor(private http : Http, private userservice : UserService) { 
    this.id = sessionStorage.getItem('id');
    this.today = sessionStorage.getItem('date');
    console.log(this.today);
    
   }

    addProduct(product:product) {
      var inCart = this.checkInCart(product.name);
      if (inCart == null){
        this.products.push(product);
        var a = this.products.indexOf(product);
      }
      else {
        inCart.quantity += product.quantity;
      }
      this.totalPrice += (product.price*product.quantity);
      this.cartSubject.next(<CartState>{id: this.id, products: this.products, totalPrice: +this.totalPrice, date: this.today});
    }

    checkInCart(name:string) {
      for(var i=0; i< this.products.length; i++) {
        if(this.products[i].name === name){
            return this.products[i];
        }
      }
        return null;
    }

    sendCart(data) {
      this.http.post('/product', data).subscribe(res => console.log(res));
    }

    removeProduct(product) {
      var inCart = this.checkInCart(product.name);
      if (inCart !== null) {
        inCart.quantity -= 1;
        if (inCart.quantity == 0) {
          this.products = this.products.filter(item => item !== product);
        }
      }
      this.totalPrice -= +product.price;
      this.cartSubject.next(<CartState>{id: this.id, products: this.products, totalPrice: +this.totalPrice, date: this.today});
      
      if (this.products.length < 1) {
        this.resetCart();
      } else {
        this.sendCart({products: JSON.stringify(this.products), date: this.today});
      };
    }

    getAllProducts() {
      return this.cartSubject;
    }

    fetchCartContents() : Observable<any>{
      return this.http.get('/cartproducts');
    }

    submitOrder(data): Observable<any> {
      return this.http.post('/order', data);
    }

    resetCart() {
      this.products = [];
      this.totalPrice = 0;
      this.cartSubject.next(<CartState>{id: this.id, products: this.products, totalPrice: +this.totalPrice, date: this.today})
    }

}