import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {
  isAuthenticated = false

  constructor(
    private http:HttpClient
  ){}

  ngOnInit():void {
    if(localStorage.getItem('isUserLoggedIn')){
      this.isAuthenticated = true
    }else{
      this.isAuthenticated = false
    }
  }

  logout(){
    this.http.post('user/logout',{},{withCredentials:true}).subscribe(()=>{
      localStorage.removeItem('isUserLoggedIn')
      // this.isAuthenticated = false
    })
  }

}
