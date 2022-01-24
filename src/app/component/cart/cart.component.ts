import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user:any;
  cartData:any;
  cartProducts:any;
  cart_item:any
  quantity:number = 1
  product: any;
  total:number =0
  constructor(private service:ApiserviceService,private router:Router) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('user')
    this.user = JSON.parse(this.user)
    console.log(this.user.userid)
    this.getCartItems()
    
  }
  getCartItems(){
    this.service.getCartItems(this.user.userid).subscribe((res) => {
      console.log(res)
      this.cartData = res[0]
      this.getCartProducts()
      // console.log(this.cartData.cart_id)
    })
  }
  getCartProducts() {
    this.service.getCartProducts(this.cartData.cart_id).subscribe((res) => {
      console.log(res)
      this.cartProducts = res
      console.log(this.cartProducts)
      // this.totalPrice()
    })
  }
  deleteItemFromCart(product_id:any, index:number) {
    console.log(product_id)

    console.log(this.cartProducts)
    // write a service here to remove the item from cart

    this.service.deleteItemFromCart(product_id, this.cartData.cart_id, ).subscribe((res) =>
      {
        this.cartProducts.splice(index,1)
        console.log(res)
        console.log(this.cartProducts)
      })
  }
  increamentQTY(pid:any,quantity:number, index:number)
  { 
    
    console.log(this.cartProducts)
    this.service.increaseQTY(pid,quantity, this.cartData.cart_id).subscribe((res) =>
    {
      this.cartProducts[index].quantity++;
      console.log(res)
    
    })

  }
 
  decreamentQTY(pid:any,quantity:number, index: number)
  {
    console.log(this.cartData.cart_id, index)
    if(this.cartProducts[index].quantity <= 1){
      this.service.deleteItemFromCart(pid, this.cartData.cart_id).subscribe((res) => {
        this.cartProducts.splice(index,1)
        console.log(res)
      })
    }
    else{

      this.service.increaseQTY(pid,quantity, this.cartData.cart_id).subscribe((res) =>
      {
        this.cartProducts[index].quantity--;
        console.log(res)
      })
    }
    }
 
  totalPrice(){ 
    
    let length = this.cartProducts.length
    for(let i=0; i<length; i++){
      this.total += this.cartProducts[i].price * this.cartProducts[i].quantity
    }
    console.log(this.total)
  }
  shop()
  {
    this.router.navigate(['/categories'])
  }
 
  }
  // emptyCart(){
  //   this.service.removeAllCart();
  // }
