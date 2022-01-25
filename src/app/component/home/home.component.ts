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
  constructor(private http:HttpClient,private service:ApiserviceService, private activatedRoute: ActivatedRoute, private route : Router) {
    this.http.get(`http://localhost:3000/product/images`).subscribe(data => {
      // Populating usersArray with names from API
      // data.json().forEach((element:any) => {
      //  this.productArray.push(element.product_title);
      // });
    });
   }

  ngOnInit(): void {
    this.getAllProducts()

    setTimeout(() => {
      this.activatedRoute.params.subscribe(params => {
        console.log(params['search'])
        this.getSearchProducts(params['search'])
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
    // this.products.array.forEach((obj: { product_title: any; }):any => {
    //   obj.product_title
    //   console.log(obj.product_title)
    // });
    this.products.forEach((obj: { product_title: any; }) => {
      obj.product_title
      console.log(obj.product_title)
    })
  }
  getSearchProducts(search:any)
  {
    console.log(this.products)
    this.products.forEach((obj: { product_title: any; }) => {
    if(obj.product_title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    {
      this.searchProductArray.push(obj)
    }
      
    })
    console.log(this.searchProductArray)
  }

}

