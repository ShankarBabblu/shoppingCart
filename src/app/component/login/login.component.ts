import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
 public emailid: any;
 public user:any;
 public cart : any
 wrongUser = false
 constructor(private service:ApiserviceService, private router : Router) { }

  userLoginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  ngOnInit(): void {
  }
  onClickSubmit() {
    if(this.userLoginForm.valid){
      this.service.userLogin(this.userLoginForm.value).subscribe(res => {
        console.log(res)
        if(!res[0]){
          this.wrongUser = true
        }
        else{
          this.wrongUser = false
          this.user = res[0]
          console.log(this.user)
          
          this.isUserLoggedIn()
          this.setCartToSession()
          this.router.navigate([''])
        }
      })
    }
  }
  clear()
  {
    // this.addForm.clear();
  }
  isUserLoggedIn(){
    if(this.user){
      console.log('user exists')
      sessionStorage.setItem('user',JSON.stringify(this.user))
    }
    else{
      console.log('no user')
    }
  }
  setCartToSession(){
    if(this.user){
      console.log(this.user.userid)
      this.service.getCartData(this.user.userid).subscribe(res => {
        console.log(res)
        console.log(res.length)
        this.cart = res
        if(this.cart.length == 0){
          console.log('abc')
          this.service.setCartData(this.user).subscribe(res => {
            console.log(res)
          })
        }
        else{
          console.log(this.cart)
          sessionStorage.setItem('cart', JSON.stringify(this.cart))
        }
      })
    }
  }


}
