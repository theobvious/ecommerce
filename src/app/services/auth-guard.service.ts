import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userservice: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAdmin();
  }

  checkAdmin(): boolean {
    if (this.userservice.checkLoggedIn()) {
          return true;
        } else {
        this.router.navigate(['/login']);
        return false;
    }
  }
  
}