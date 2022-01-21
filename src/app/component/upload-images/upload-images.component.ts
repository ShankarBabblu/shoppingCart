import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {
  images :any = [];
  myImage: any;
  file:File | undefined;
  imageData:any;
  categories:any;
  subCategories:any;
  productCategories:any;
  constructor(private service:ApiserviceService) { }
  myForm = new FormGroup({
    categoryId:new FormControl(''),
    productTitle:new FormControl('',[Validators.required]),
    file: new FormControl('', [Validators.required]),
    description :new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    sellerName:new FormControl('',[Validators.required]),
  });
  onChange($event:Event)
  {
    const target= $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (target.files && target.files[0]){
    var filesAmount = target.files.length;
    // console.log(filesAmount)
    for (let i = 0; i < filesAmount; i++){
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);
                  var dt = event.target.result;
                  this.imageData = event.target.result
                  //  this.images.push(dt); 
   
                   this.myForm.patchValue({
                      fileSource: this.images
                   });
                }
                reader.readAsDataURL(target.files[i]);
              }
    this.convertToBase64(file);}
    console.log(this.images)

  }
   
     convertToBase64(file: File) {
    this.myImage = new Observable((subscriber:Subscriber<any>) => {
      this.readFile(file,subscriber);
    });

    
  }
  readFile(file:File,subscriber:Subscriber<any>)
  {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload=() => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
  getCategories(){
    this.service.getCategories().subscribe(res => {
      this.categories = res
      console.log(this.categories)
    })
  }
  getSubCategories(event:any){
    this.service.getSubCategories(event).subscribe(res => {
      this.subCategories = res
      console.log(this.subCategories)
    })
  }
  getProductCategories(event:any){
    this.service.getProductCategories(event).subscribe(res => {
      this.productCategories = res
      console.log(this.productCategories)
    })
  }

  userForm = new FormGroup({
    'category' : new FormControl('', [Validators.required]),
    'sub_category' : new FormControl('', [Validators.required]),
    'product_category' : new FormControl('', [Validators.required]),
    'product_title' : new FormControl('', [Validators.required]),
    'product_description' : new FormControl('', [Validators.required]),
    'product_image' : new FormControl(''),
    'product_price' : new FormControl('', [Validators.required]),
  })
  getSubCategory(event:any) {
    var category_id = event.value
    this.getSubCategories(event.value)
  }
  getProductCategory(event:any) {
    this.getProductCategories(event.value)
  }

  formSubmit() {
    if(this.userForm.valid){
      console.log(this.userForm.value)
      this.userForm.value['product_image'] = this.imageData;
      console.log(this.userForm.value)
      this.service.uploadImage(this.userForm).subscribe(res => {
        console.log(res)
      })
    }
    else {
      console.log("user form is not valud")
    }
  }
  ngOnInit(): void {
    this.getCategories()
    this.service.getProductImages().subscribe(res=>
      {
          console.log(res)
      })
  }

}
