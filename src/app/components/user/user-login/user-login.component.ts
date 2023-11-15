import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Emitters } from 'src/app/emitters/emitters';
import { hasFormErrors } from 'src/app/helpers/form.validation.helper';
import Swal from 'sweetalert2';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
form!: FormGroup
isSubmitted = false

constructor(
  private formBuilder:FormBuilder,
  private http:HttpClient,
  private router: Router,
  ){}

  ngOnInit():void{
    this.form = this.formBuilder.group({
      email:['',Validators.required,Validators.email],
      password:['',Validators.required]
    })

    // this.http.get('user',{withCredentials:true}).subscribe(()=>{
    //   this.router.navigate(['/'])
    //   Emitters.authEmitter.emit(true)
    // },
    // (err) =>{
    //   this.router.navigate(['login'])
    //   Emitters.authEmitter.emit(false)
    // }
    // )

  }

  get f(){
    return this.form.controls
  }

  onSubmit():void{
    this.isSubmitted = true

    if(this.form.invalid){
      Swal.fire("Check Inputs","Enter all input fields properly","warning")
    }else{
      const user = this.form.getRawValue()
      this.http.post('user/login',user,{withCredentials:true}).subscribe(
        (res) =>{
          console.log(res)
          localStorage.setItem('isUserLoggedIn','true')
          this.router.navigate(['/'])
        },
        (err)=>{
          Swal.fire("Error",err.error.message,"error")
        }
      )
    }
  }

}
