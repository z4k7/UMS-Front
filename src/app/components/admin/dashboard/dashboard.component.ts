import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  adminName!: string;

constructor (
    private http: HttpClient,
    private router: Router
){}

ngOnInit(): void {
  this.http.get('admin/active',{withCredentials:true})
  .subscribe({
    next:(res:any)=>{
      console.log('dashboard');

      this.adminName = res.name
    },
    error:(err) => this.router.navigate(['/admin'])
  })
}
}
