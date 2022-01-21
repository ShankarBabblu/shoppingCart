import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  data:any
  passwordMatch = true
  constructor(private service:ApiserviceService, private router:Router) { }

   userForm = new FormGroup({
    'first_name':new FormControl('', [Validators.required, Validators.minLength(7)]),
    'last_name':new FormControl('', [Validators.required,Validators.minLength(5)]),
    'mobile':new FormControl('', [Validators.required,Validators.minLength(10), Validators.maxLength(12)]),
    'email':new FormControl('', [Validators.required,Validators.email]),
    'password':new FormControl('', [Validators.required, Validators.minLength(5)]),
    'password_verify':new FormControl('', Validators.required)
  });
  

  submit()
  {
    if (this.userForm.valid){
      if( this.userForm.value.password == this.userForm.value.password_verify){
        this.passwordMatch = true
        this.service.addCustomer(this.userForm.value).subscribe(res => {
          console.log(res)
          this.router.navigate(['/login'])
        })
      }
      else {
        this.passwordMatch = false
        console.log('not match')
      }
    }
  }
  ngOnInit(): void {
  }
  errorMessage(input:string)
  {
   let details =  this.userForm.get(input)
   if(details?.touched )
   {
     if(details.hasError('required')){
       return "This Field is required"
     }
      else if(details.hasError('minLength')){
        return "minLength of 7 characters is required"
      }
      else if(details.hasError('email')){
        return "Email should be formatted correctly"
      }
      return 
   }
   return
  }
}
