import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit {
    myImage:Observable<any> | undefined;
    user:any
    menData:any
    images :any = [];
    cartId:any
    myForm = new FormGroup({
     name: new FormControl('', [Validators.required, Validators.minLength(3)]),
     file: new FormControl('', [Validators.required]),
     fileSource: new FormControl('', [Validators.required])
   });
    displayInfo : boolean | undefined;
 
  constructor(private service: ApiserviceService, private router:Router) { }

  
  

  ngOnInit(): void {
    this.user = (sessionStorage.getItem('user'))
    this.user = JSON.parse(this.user)
    console.log(this.user.userid)
   this.service.getMenImages().subscribe(result =>
    {
      this.menData = result
      console.log(this.menData)
    })
    this.service.getCartItems(this.user.userid).subscribe(res =>
      {
        this.cartId = res[0].cart_id
      })
  }

display() {
  this.displayInfo = true;
}
atc(cartId:any,Pid:any){
  // console.log(this.cartId)
  // console.log(Pid)
  this.service.addItemToCart(cartId,Pid).subscribe(() => {
    console.log()
   
  });
  }
  buyNow()
  {
    this.router.navigate(['billing']);
  }



  
}

