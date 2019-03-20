import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: BehaviorSubject<any>;
  public timeInSeconds = 10;

  constructor(private http: Http) { 
    this.orders = new BehaviorSubject<any>([]);
   
    setInterval(() => {
      this.fetchOrders();
    }, this.timeInSeconds * 1000);
    this.fetchOrders();
  }

  private fetchOrders() {
    this.http.get('/getorders').toPromise().then((resData) => {
      this.orders.next(resData);
    });
  }

  getOrders(): Observable<any> {
    return this.orders;
  }
}
