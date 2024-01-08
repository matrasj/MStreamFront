import {Injectable} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {UserAccountService} from "../../services/user-account.service";

@Injectable({
  providedIn : 'root'
})
export class AdminGuard {
  constructor(private userAccountService: UserAccountService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private toastrService: ToastrService) {
  }
  async canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Promise<Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree> {
    if (this.authenticationService.isLoggedIn()) {
      const isAdmin =  await this.userAccountService.isAdmin().toPromise();
      if (isAdmin) {
        return true;
      } return this.disableNavigation();
    }
    return this.disableNavigation();
  }

  private disableNavigation() {
    this.toastrService.error('Brak uprawnień');
    this.router.navigate(['/login']);
    return false;
  }
}
