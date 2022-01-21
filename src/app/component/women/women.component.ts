import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {
   womenData:any;
   myImage:Observable<any> | undefined;
   images:any
   cartId:any
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  displayInfo: boolean | undefined;
  user: any;

  constructor(private service:ApiserviceService,private router:Router) { }
  

  ngOnInit(): void {
    this.user = sessionStorage.getItem('user')
    this.user = JSON.parse(this.user)
    this.service.getWomenImages().subscribe(result =>
      {
        this.womenData = result
        console.log(this.womenData)
      })
      console.log(this.user.userid)
  
      this.service.getCartItems(this.user.userid).subscribe(res =>
        {
          this.cartId = res[0].cart_id
        
        })
      // sessionStorage.getItem(this.womenData)
  }
  display() {
    this.displayInfo = true;
  }
  addTC(cartId:any,Pid:any)
  {
    console.log(this.cartId)
    console.log(Pid)
    this.service.addItemToCart(cartId,Pid).subscribe(() =>
    {
        
        console.log()
        // alert('Product Added');
    })
  }
  buyNow()
  {
    this.router.navigate(['billing']);
  }

}
