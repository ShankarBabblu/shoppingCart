import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  constructor(private service:ApiserviceService,private router:Router) { }

  ngOnInit(): void {
  }
  onClickSubmit(data:any)
  {
    console.log(data)
    this.service.userCheckout(data).subscribe((res =>
      {
        console.log(res)
        alert("Thanks for Ordering");
        
      }))
  }
 
}
