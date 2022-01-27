import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { category } from 'src/app/shared/category';
import { product_category } from 'src/app/shared/productCategory';
import { sub_category } from 'src/app/shared/subCategory';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  currentCategoryId : any;
  currentComponent : any;
  subCategories : any;
  productCategories: any = [];
  products : any = [];
  product_id:number | any
  cart_id:any
  title:any;
  category : category[] | undefined;
  sub_category : sub_category[] | undefined
  product_category : product_category[] | undefined
  constructor(private activatedRoute : ActivatedRoute, private service : ApiserviceService) {
   }

  getCurrentCategory(currentCategoryId : any) {
    console.log(currentCategoryId)
    this.service.getCategories(currentCategoryId).subscribe(res => {
      this.currentComponent = res[0]
      this.category = res[0]
      console.log(this.category)
      // console.log(res)
      this.getSubCategories()
    })
  }

  getSubCategories(){
    this.service.getSubCategories(this.currentComponent.category_id).subscribe(res => {
      this.subCategories = res
      this.sub_category = res
      console.log(this.sub_category)
      this.getProductCategories()
    })
  }
  
  getProductCategories() {
    this.productCategories = []
    for (var subCategory of this.subCategories){
      console.log(subCategory.sub_category_id)
      this.service.getProductCategories(subCategory.sub_category_id).subscribe(res => {
        console.log(res)
        for(let item of res){
          this.productCategories.push(item)
        }
        this.getProducts(res)
      })
    }
  }

  getProducts(productCat:any) {
    console.log(this.productCategories) 
    this.products = []
    for(var productCategory of productCat){
      this.service.getProducts(productCategory.product_category_id).subscribe(res => {
        for( let item of res){
          this.products.push(item)
        }
      })
      console.log(this.products)
    }
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


  ngOnInit(): void {
    this.currentCategoryId = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.currentCategoryId)
    this.getCurrentCategory(this.currentCategoryId) 
    // this.addToCart(this.product_id)
  }

  ngOnDestroy(): void {
      this.currentComponent = null
      this.subCategories = null
  }

}
