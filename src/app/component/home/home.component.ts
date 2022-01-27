import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTerm : string = "";
  products:any;
  searchProductArray:any = []
  searchProduct:any
  cart_id: any;
  constructor(private http:HttpClient,private service:ApiserviceService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.http.get(`http://localhost:3000/product/images`).subscribe(data => {

    });
   }

  ngOnInit(): void {
    this.getAllProducts()

    setTimeout(() => {
      this.activatedRoute.params.subscribe(params => {
        console.log(params['subCategory'])
        this.searchTerm = params['subCategory']
        this.getSearchProducts(params['subCategory'])
      })
    },500)
  }
  getAllProducts(){
    this.service.getProductImages().subscribe(res=>
      {
        this.products = res
          console.log(res)
          // this. getProductTitles()
      })
  }
  getProductTitles()
  {
    console.log(this.products)
    this.products.forEach((obj: { product_title: any; }) => {
      obj.product_title
      console.log(obj.product_title)
    })
  }
  getSearchProducts(search:any)
  {
    this.searchProductArray = []
    console.log(this.products)
    this.products.forEach((obj: { product_title: any; }) => {
    if(obj.product_title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    {
      this.searchProductArray.push(obj)
    }
      
    })
    console.log(this.searchProductArray)
  }
  addToCart(product_id:number){
    let cart :any = sessionStorage.getItem("cart")
    cart = JSON.parse(cart)
    this.cart_id = cart[0].cart_id
    console.log(this.cart_id)
    console.log(product_id)
    this.service.addItemToCart(this.cart_id,product_id).subscribe(res => {
      console.log(res)
    })
  }
  shopNow()
  {
    // this.router.navigate['categories'];
    this.router.navigate(['/categories'])
  }

}

