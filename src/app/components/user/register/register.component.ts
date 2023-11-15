import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { hasFormErrors, validateEmail } from 'src/app/helpers/form.validation.helper';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
form!: FormGroup;
isSubmitted= false

constructor(
  private formBuilder:FormBuilder,
  private http: HttpClient,
  private router: Router
  ){}

  ngOnInit():void{
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }


  get f(){
    return this.form.controls
  }

onSubmit(): void{
  this.isSubmitted = true
  console.log('submitted');
  console.log(this.form, 'form');

  if(this.form.invalid){
    Swal.fire("Check Inputs", "Enter all input fields properly", 'warning')
  }else{
    console.log('form is valid');
    
    const user = this.form.getRawValue()
    
    this.http.post('user/register',user,{withCredentials:true}).subscribe({
      next: ()=>{
      localStorage.setItem('isUserLoggedIn','true')
      this.router.navigate(['/'])
    },
    error:(err)=>{
      Swal.fire("Error",err.error.message,"error")
    }
    })
  }
}

}


