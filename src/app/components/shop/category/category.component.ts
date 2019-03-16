import { CartService } from './../../../services/cart.service';
import { product } from './../../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() product : product;
  products:any;
  category:any;

  constructor(private getdata: DataService, private cartService : CartService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((routeParams: ParamMap) => {
      this.getproducts(routeParams);
    });
  }
  
  getproducts(routeParams: ParamMap) : void {
    this.category = routeParams.get('category');
    this.getdata.getProducts({category: this.category})
    .subscribe(
      res => {
        this.products = res.json();
      });
  }

  checkQuantity(product : product) {
    if (product.quantity >= 1) {
      this.addToCart(product);
    } else alert("יש לבחור כמות");
  }

  addToCart(product : product) {
    this.cartService.addProduct(product);
    alert("נוסף בהצלחה!");
}
}