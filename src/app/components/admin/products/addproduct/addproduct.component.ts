import { AdminComponent } from './../../admin.component';
import { product } from './../../../../models/product';
import { DataService } from './../../../../services/data.service';
import { Component, OnInit, ViewChild, Host } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddProductComponent implements OnInit {
  @ViewChild('f') form: any;
  @ViewChild('newimg') file;
  categories:any;
  fileToUpload:File;
  newProduct: product = new product(0, '', 0, '', '', 0);
  message:string;

  constructor(private getdata: DataService, private router: Router) { }

  ngOnInit() {
    this.getdata.getCategories()
      .subscribe(res=> {
        this.categories = res.json();
      })
  }

 newFile(files: FileList) {
  this.fileToUpload = files.item(0);
}
 
onSubmit() {
    this.message = '';
      this.getdata.upload(this.fileToUpload)
      .subscribe(res=>{
        this.newProduct.img = res.json();
        this.sendInfo();
      });
  }

  sendInfo() {
    this.getdata.sendProduct(this.newProduct)
    .subscribe(res=> {
      this.message = "נוסף בהצלחה!";
      this.form.reset();
    });
  }
}