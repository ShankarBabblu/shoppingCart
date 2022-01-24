import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './component/material/material.component';
import { HomeComponent } from './component/home/home.component';
import { AboutusComponent } from './component/aboutus/aboutus.component';
import { LoginComponent } from './component/login/login.component';
import { UploadImagesComponent } from './component/upload-images/upload-images.component';

import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { SignComponent } from './component/sign/sign.component';
import { BillingComponent } from './component/billing/billing.component';
import { HeaderComponent } from './component/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './component/categories/categories.component';


const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path:'search/:search',component:HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'category/:id', component: CategoriesComponent},
  {path: 'categories', component: CategoriesComponent},
  {path : 'login',component:LoginComponent},
  {path : 'upload',component:UploadImagesComponent},
  {path: 'cart',component:CartComponent},
  {path:'products',component:ProductsComponent},
  {path : 'register',component:SignComponent},
  {path:'billing',component:BillingComponent},
  {path : 'header',component:HeaderComponent},
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent,AboutusComponent,LoginComponent,]