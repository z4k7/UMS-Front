import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';


@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

constructor (
  private http: HttpClient,
  private router: Router
){}

ngOnInit(): void {
  
}

onLogout(){
  this.http.post('admin/logout', {}, {withCredentials: true}).subscribe({
    next: ()=>{
      localStorage.removeItem('isAdminLoggedIn')
      this.router.navigate(['/admin'])
    }
  })
}

}
