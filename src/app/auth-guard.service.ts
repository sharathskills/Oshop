import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private auth:AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.auth.Username$.map(user=>
      {
        if(user) return true;

        this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
        return false;
      });
  }
}
