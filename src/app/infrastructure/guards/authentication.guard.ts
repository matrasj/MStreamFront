import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn : 'root'
})
export class AuthenticationGuard {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
