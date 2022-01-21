import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from './services/apiservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public userData :any;
  constructor(private router: Router,private service:ApiserviceService) {
    // ...
  }
 
  title = 'p1';
  public searchTerm !: string;
  // userData = JSON.parse(sessionStorage.getItem('user'))
  
  ngOnInit():void {
    this.userData = (sessionStorage.getItem('user'))
    this.userData = JSON.parse(this.userData)
    console.log(this.userData)
  }

  search(event:any)
  {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }
  
}
