import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class UserLoginGuard implements CanActivate{
    constructor (private router:Router){}

    canActivate(): boolean{

        const isUserLoggedIn= localStorage.getItem('isUserLoggedIn')

        if(isUserLoggedIn){
            this.router.navigate(['/'])
            return false
        }
        return true 
    }

}