import { UserService } from './../../../services/user.service';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  categories: any;
  name: string;

  constructor(private getdata: DataService, private userservice: UserService) { }

  ngOnInit() {
    this.name = sessionStorage.getItem('name');
    this.getcategories();
    this.getproducts();
  }
  
  getcategories() {
    this.getdata.getCategories()
      .subscribe(
        res => {
          this.categories = res.json();
        }
      )
  }

  getproducts() {
    this.getdata.getAllProducts()
      .subscribe(
        res => {
          this.products = res.json();
        });
  }
}
