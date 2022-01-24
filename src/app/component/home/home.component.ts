import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTerm : string = "";
  products:any;
  searchProduct:any
  constructor(private service:ApiserviceService, private activatedRoute: ActivatedRoute, private route : Router) { }

  ngOnInit(): void {
    this.getAllProducts()
    this.activatedRoute.params.subscribe(params => {
      console.log(params['search'])
    })
  }
  getAllProducts(){
    this.service.getProductImages().subscribe(res=>
      {
        this.products = res
          console.log(res)
      })
  }

}

