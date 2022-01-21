import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './component/material/material.component';
import { HomeComponent } from './component/home/home.component';
import { AboutusComponent } from './component/aboutus/aboutus.component';
import { MenComponent } from './component/men/men.component';
import { LoginComponent } from './component/login/login.component';
import { UploadImagesComponent } from './component/upload-images/upload-images.component';
import { WomenComponent } from './component/women/women.component';
import { KidComponent } from './component/kid/kid.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { SignComponent } from './component/sign/sign.component';
import { BillingComponent } from './component/billing/billing.component';
import { HeaderComponent } from './component/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './component/categories/categories.component';


const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'category/:id', component: CategoriesComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'men',component:MenComponent},
  {path : 'login',component:LoginComponent},
  {path : 'upload',component:UploadImagesComponent},
  {path: 'cart',component:CartComponent},
  {path:'products',component:ProductsComponent},
  {path : 'sign',component:SignComponent},
  {path:'billing',component:BillingComponent},
  {path : 'header',component:HeaderComponent},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent,AboutusComponent,MenComponent,LoginComponent,WomenComponent]