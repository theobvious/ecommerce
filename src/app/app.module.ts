import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AuthGuard } from './services/auth-guard.service';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { DateFormatPipe } from './dateFormat.pipe';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { AddProductComponent } from './components/admin/products/addproduct/addproduct.component';
import { EditProductComponent } from './components/admin/products/editproduct/editproduct.component';
import { ShopComponent } from './components/shop/shop.component';
import { CategoryComponent } from './components/shop/category/category.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';

const routes: Routes = [
  {path: '', redirectTo: 'shop', pathMatch: 'full'},
  {path: 'find', redirectTo: 'search'},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent,  canActivate: [AuthGuard]},
  {path: 'products', component: ProductsComponent,
      children: [
        {path: 'editproduct/:id', component: EditProductComponent},
        {path: 'addproduct', component: AddProductComponent}
      ]
  },
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {
    path: 'shop',
    component: ShopComponent,
    children: [
      {path: 'category/:category', component: CategoryComponent}
    ]
  },
];

export class MyRouteReuseStrategy implements RouteReuseStrategy {

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): boolean {
    return false;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return false;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ShopComponent,
    CategoryComponent,
    CartComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [DataService, CartService, UserService, OrderService, AuthGuard, DateFormatPipe, 
    {provide: APP_BASE_HREF, useValue : '/' },
    {provide: RouteReuseStrategy, useClass: MyRouteReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
