import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { category } from 'src/app/shared/category';
import { product_category } from 'src/app/shared/productCategory';
import { sub_category } from 'src/app/shared/subCategory';

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
  title:any;
  category : category[] | undefined;
  sub_category : sub_category[] | undefined
  product_category : product_category[] | undefined
  constructor(private activatedRoute : ActivatedRoute, private service : ApiserviceService) { }

  getCurrentCategory(currentCategoryId : any) {
    console.log(currentCategoryId)
    this.service.getCategories(currentCategoryId).subscribe(res => {
      this.currentComponent = res[0]
      this.category = res[0]
      console.log(this.category)
      console.log(res)
      this.getSubCategories()
    })
  }

  getSubCategories(){
    this.service.getSubCategories(this.currentComponent.category_id).subscribe(res => {
      this.subCategories = res
      this.sub_category = res
      console.log(this.sub_category)
      console.log(res)
      this.getProductCategories()
    })
  }
  getProductCategories() {
    for (var subCategory of this.subCategories){
      console.log(subCategory.sub_category_id)
      this.service.getProductCategories(subCategory.sub_category_id).subscribe(res => {
        console.log(res)
        this.product_category?.push(res)
        // let data = {
        //   subCategory : subCategory.sub_category_id,
        //   value : res
        // }
        // this.productCategories.push(data)
        for(let item of res){
          // this.product_category?.push(item)
          this.productCategories.push(item)
        }
        this.getProducts()
      })
    }
    console.log(this.productCategories.length)
    console.log(this.product_category)

  }
  getProducts() {
    console.log(this.productCategories) 
    for(var productCategory of this.productCategories){
      this.service.getProducts(productCategory.product_category_id).subscribe(res => {
        for( let item of res){
          this.products.push(item)
        }
      })
      console.log(this.products)
    }
  }
  addToCart(product_id : number){
    let cart = sessionStorage.getItem('cart')
    console.log(cart)
    let cart_id = 1
    // this.service.addItemToCart(product_id, cart_id).subscribe(res => {
    //   console.log(res)
    // })
  }

  ngOnInit(): void {
    this.currentCategoryId = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.currentCategoryId)
    this.getCurrentCategory(this.currentCategoryId)
   
    
  }
  ngOnDestroy(): void {
      this.currentComponent = null
      this.subCategories = null
  }

}
