import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories : any;
  subCategories :any
  user:any;
  public searchTerm !: string;
  constructor( private service:ApiserviceService, private router : Router) { }

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
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
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
  
}