import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  categories: any;
  
  constructor(private getdata: DataService) { }

  ngOnInit() {
    this.getcategories();
  }

  getcategories() {
    this.getdata.getCategories()
    .subscribe(
      res => {
        this.categories = res.json();
      });
  }

}
