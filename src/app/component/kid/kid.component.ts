import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-kid',
  templateUrl: './kid.component.html',
  styleUrls: ['./kid.component.css']
})
export class KidComponent implements OnInit {
   kidData:any;
   myImage:Observable<any> | undefined;
  displayInfo: boolean | undefined;
  images:any
  cart_id:any
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  cartId: any;
  user: any;
  constructor(private service:ApiserviceService,private router:Router) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('user')
    this.user = JSON.parse(this.user)
    console.log(this.user)
    this.service.getKidImages().subscribe(result =>
      {
        this.kidData = result
        console.log(this.kidData)
      })
    this.service.getCartItems(this.user.userid).subscribe(res =>
    {
        this.cartId = res[0].cart_id
    })
      
  }
  display() {
    this.displayInfo = true;
  }
  addToCart(cartId:any,Pid:any)
  {
    console.log(this.cartId)
    console.log(Pid)
    this.service.addItemToCart(cartId,Pid).subscribe(() => {
    console.log()
      });
  }
  buyNow()
  {
    this.router.navigate(['billing']);
  }
}
