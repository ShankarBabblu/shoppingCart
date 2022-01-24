import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialComponent } from './component/material/material.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadImagesComponent } from './component/upload-images/upload-images.component';
import { SignComponent } from './component/sign/sign.component';
import { BillingComponent } from './component/billing/billing.component';
import { HeaderComponent } from './component/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './component/home/home.component';
import { CategoriesComponent } from './component/categories/categories.component';




const material = [MatToolbarModule]
@NgModule({
  declarations: [
    AppComponent,
    MaterialComponent,
    routingComponents,
    CartComponent,
    ProductsComponent,
    UploadImagesComponent,
    SignComponent,
    BillingComponent,
    HeaderComponent,
    HomeComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,

    FormsModule,
    material,
    ReactiveFormsModule,
    NgbModule
  ],
  exports:[material],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
