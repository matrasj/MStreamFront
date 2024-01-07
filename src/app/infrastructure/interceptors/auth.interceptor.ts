import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpStatusCode
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthenticationService} from "../../services/authentication.service";
import {RouteManager} from "../../shared/route-manager";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
              private toastrService: ToastrService,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken : string | null = this.authService.getJwtToken();

    const requestWithBearerJwtToken = this.addToken(request, jwtToken);
    return next.handle(requestWithBearerJwtToken).pipe(
      catchError(
        (err : HttpErrorResponse | any) => {
          if (err.status === HttpStatusCode.Forbidden || err.status === HttpStatusCode.Unauthorized) {
            this.router.navigate(RouteManager.getLogin());
          }
          this.toastrService.error('Wystapił błąd podczas pobierania danych. Brak dostępu.')
          return throwError("Brak dostępu.");
        }
      )
    )
  }

  private addToken(request : HttpRequest<any>, jwtToken : string | null) : HttpRequest<any> {
    return request.clone({
      setHeaders : {
        Authorization : "Bearer " + jwtToken
      }
    });
  }
}
