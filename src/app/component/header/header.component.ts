import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Product } from '../product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchTerm:any;
  categories : any;
  subCategories :any
  user:any;
  productArray =[]
  
  constructor( private service:ApiserviceService, private router : Router,private http:HttpClient) {

  
  }

  ngOnInit(): void {
    this.isUserLoggedIn()
    this.service.getCategories().subscribe(res => {
      this.categories = res
      console.log(this.categories)
    })
    this.service.getSubCategories().subscribe(res => {
      this.subCategories = res
      console.log(this.subCategories)
    })
    
  }
  goToCategory(category_id:any){
    this.router.navigate(['category',category_id]).then(() => {
      window.location.reload()
    })
  }
  isUserLoggedIn(){
    this.user = sessionStorage.getItem('user')
  }
  logout(){
    this.user = null
    sessionStorage.removeItem('user')
  }


  search(){
    this.router.navigate([`/search/${this.searchTerm}`])
  }
  
}