import { product } from './../../../../models/product';
import { DataService } from './../../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditProductComponent implements OnInit {

  product: any;
  id: any;

  constructor(private getdata: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((routeParams: ParamMap) => {
      this.getProduct(routeParams);
    });
  }

  getProduct(routeParams: ParamMap): void {
    this.id = +(routeParams.get('id'))
    this.getdata.getProduct({id: this.id})
      .subscribe(res => {
        this.product = res.json();
      });
  }

  editProduct(product) {
    this.getdata.editProduct(product)
      .subscribe(res => {
        console.log('OK');
      })
  };

  refresh(): void {
    this.router.navigated = false;
    this.router.navigate(["/", this.id]);
  }
}
