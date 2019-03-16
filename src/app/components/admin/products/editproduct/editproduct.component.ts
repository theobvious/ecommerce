import { product } from './../../../../models/product';
import { DataService } from './../../../../services/data.service';
import { Component, OnInit, ViewChild, Host } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditProductComponent implements OnInit {

  product: any;
  id: any;
  message: string;
  @ViewChild('f') form: any;
  @ViewChild('newimg') file;
  fileToUpload:File;


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

  newFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
      this.getdata.upload(this.fileToUpload)
      .subscribe(res=>{
        this.product.img = res.json();
        this.editProduct();
      });
  }

  editProduct() {
    this.getdata.editProduct(this.product)
      .subscribe(res => {
        this.message = "נערך בהצלחה!";      })
  };

  refresh(): void {
    this.router.navigated = false;
    this.router.navigate(["/", this.id]);
  }
}
