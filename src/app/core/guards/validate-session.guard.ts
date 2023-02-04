import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateSessionGuard implements CanActivate {

  constructor(private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLocalStorage();
  }
  private checkLocalStorage(): boolean{

    const user = localStorage.getItem('token');
    if (!user)
    {
      this.router.navigate(['/'])
      return false;
    }
      return true;
  }
}
