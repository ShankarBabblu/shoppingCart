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
  cart : any;
  cartData:any;
  cartProducts:any;
  cart_item:any
  quantity:number = 1
  product: any;
  total:number=0
  constructor(private service:ApiserviceService,private router:Router) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('user')
    this.cart = sessionStorage.getItem('cart')
    this.user = JSON.parse(this.user)
    this.cart = JSON.parse(this.cart)
    console.log(this.user)
    console.log(this.cart[0])
    console.log(this.user.userid)
    this.getCartProducts()
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

    this.service.getCartProducts(this.cart[0].cart_id).subscribe((res) => {
      console.log(res)
      this.cartProducts = res
      console.log(this.cartProducts)
      this.totalPrice()
    })
  }
  deleteItemFromCart(product_id:any, index:number) {
    console.log(product_id)

    console.log(this.cartProducts)
    // write a service here to remove the item from cart

    this.service.deleteItemFromCart(product_id, this.cart[0].cart_id, ).subscribe((res) =>
      {
        this.cartProducts.splice(index,1)
        console.log(res)
        console.log(this.cartProducts)
      })
  }

  emptyCart(){
    this.service.emptyCart(this.cart[0].cart_id).subscribe(res => {
      console.log(res)
      // clear cart here on this.cartProducts
      this.cartProducts = null
    })
  }
  increamentQTY(pid:any,quantity:number, index:number)
  { 
    console.log(this.cart[0])
    console.log(pid, quantity, index)
    this.service.increaseQTY(pid,quantity, this.cart[0].cart_id).subscribe((res) =>
    {
      this.cartProducts[index].quantity++;
      console.log(res)  
    })

  }
 
  decreamentQTY(pid:any,quantity:number, index: number)
  {
    console.log(pid, quantity)
    if(quantity < 1){
      this.service.deleteItemFromCart(pid, this.cart[0].cart_id).subscribe((res) => {
        this.cartProducts.splice(index,1)
        console.log(res)
      })
    }
    else{
      console.log(this.cart[0].cart_id)
      this.service.increaseQTY(pid,quantity, this.cart[0].cart_id).subscribe((res) =>
      {
        this.cartProducts[index].quantity--;
        console.log(res)
      })
    }
    }
 
  totalPrice(){ 
    
    let length = this.cartProducts.length
    console.log(length)
    for(let i=0; i<length; i++){
      this.total+= this.cartProducts[i].product_price * this.cartProducts[i].quantity
    }
    console.log(this.total)
  }
  shop()
  {
    this.router.navigate(['/categories'])
  }
  checkOut()
  {
     this.router.navigate(['/checkout'])
  }
 
  }

