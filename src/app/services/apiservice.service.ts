import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  url = 'http://localhost:3000/home'
  loginurl = 'http://localhost:3000/login';
  cartItems = 'http://localhost:3000/cart'
  cartProducts = 'http://localhost:3000/cartProducts'
  signinurl = 'http://localhost:3000/signin';
   
  // public cartItemList : any =[]
  // public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  constructor(private http: HttpClient) { }
  userLogin(data: any): Observable<any> {
    var user = data.email;
    var password = data.password;
    console.log(user)
    console.log(password)
    return this.http.post(this.loginurl, { user: user, password: password })
  }

  getImage(): Observable<any> {
    return this.http.get(this.url);
  }

  getCartData(user_id:any):Observable<any>{
    return this.http.get(`http://localhost:3000/cart/${user_id}`)
  }
  setCartData(user:any):Observable<any>{
    console.log(user.FirstName)
    return this.http.post(`http://localhost:3000/cart`, user)
  }

  getProductImages():Observable<any>
  {
    return this.http.get(`http://localhost:3000/product/images`)
  }
  getCartItems(userId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/cart/${userId}`)
  }
  getCartProducts(cartId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/cart/items/${cartId}`)
  }
  getProductById(productId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/product/${productId}`)
  }
  addItemToCart(cart_id: any, product_id:number): Observable<any> {
    return this.http.post(`http://localhost:3000/cart/add`, { cartId: cart_id, productId: product_id })
  }
  deleteItemFromCart(Pid: any, cart_id: number): Observable<any> {
    return this.http.post(`http://localhost:3000/cart/delete/${Pid}`, { cart_id: cart_id })
  }
  userSignup(data: any): Observable<any> {
    var firstName = data.FirstName;
    var lastName = data.LastName;
    var mobile = data.Mobile;
    var email = data.Email;
    var password = data.Pwd;
    console.log(firstName, lastName, mobile,email, password)
    return this.http.post(this.signinurl, { firstName: firstName, lastName: lastName,mobile:mobile,email: email, password: password})
  }
  increaseQTY(pid: any, quantity: any, cart_id: number): Observable<any> {
    console.log(pid)
    return this.http.post(`http://localhost:3000/quantity/inc/${pid}`, { quantity: quantity, cart_id: cart_id })
  }
  decreaseQTY(pid: any, quantity: any, cart_id: number): Observable<any> {
    console.log(pid)
    return this.http.post(`http://localhost:3000/quantity/dec/${pid}`, { quantity: quantity, cart_id: cart_id })
  }
  emptyCart(cart_id:any):Observable<any> {
    return this.http.delete(`http://localhost:3000/cart/empty/${cart_id}`)
  }
  userCheckout(data: any): Observable<any> {
    var firstName = data.firstname;
    var lastName = data.lastname;
    var email = data.email;
    var mobilenumber = data.mobileNumber;
    var address = data.address;
    return this.http.post(`http://localhost:3000/checkout`, { firstName: firstName, lastName: lastName, email: email, mobilenumber: mobilenumber, address: address })
  }

  getCategories(category_id : any = null): Observable<any> {
    console.log(category_id)
    if(category_id){
      return this.http.get(`http://localhost:3000/category/${category_id}`)
    }
    else {
      return this.http.get("http://localhost:3000/categories")
    }
  }

  getSubCategories(category_id : any = null): Observable<any> {
    if(category_id){
      return this.http.get(`http://localhost:3000/subCategories/${category_id}`)
    }
    else {
      return this.http.get(`http://localhost:3000/subCategories`)
    }
  }
  
  getProductCategories(sub_category_id:any): Observable<any> {
     return this.http.get(`http://localhost:3000/productCategories/${sub_category_id}`)
  }

  getProducts(product_category_id:any):Observable<any> {
    return this.http.get(`http://localhost:3000/products/${product_category_id}`)
  }
  uploadImage(userForm:any):Observable<any> {
    console.log(userForm)
    let product_category_id = userForm.value['product_category']
    let product_title = userForm.value.product_title
    let product_description = userForm.value.product_description
    let product_price = userForm.value.product_price
    let product_image = userForm.value.product_image
    let data = {
      'product_category_id' : product_category_id,
      'product_title' : product_title,
      'product_description': product_description,
      'product_price': product_price,
      'product_image' : product_image
    }
    console.log(data)
    return this.http.post('http://localhost:3000/products/upload', data)
  }

  addCustomer(userData:any):Observable<any>{
    console.log(userData)
    return this.http.post('http://localhost:3000/customer', userData)
  }
  

}

// for uploading purpose
