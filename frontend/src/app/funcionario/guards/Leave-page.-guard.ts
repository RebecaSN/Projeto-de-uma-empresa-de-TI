import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivate as CA} from '../models/canDeactivate';


@Injectable()
export class LeavePageGuard implements CanDeactivate<CA> {
  canDeactivate(
    component: CA,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      return component.canDeactivate();
      
     
  }
  
}
