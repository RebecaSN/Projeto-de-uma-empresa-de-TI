import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Injectable()
export class CanEnterGuard implements CanActivate {
 
 constructor(
   private authService:AuthenticationService,
   private router:Router
 ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.authService.logged()
      .pipe(
        tap(logged =>{//utilizamos o tap para consumir os dados retonados do observable de alguma maneira
         if(logged == false){
           this.router.navigateByUrl('/auth/login')
         }
        })
      )
  }
  
}
