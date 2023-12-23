import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequestModel} from "../models/login/login-request.model";
import {Observable} from "rxjs";
import {LoginResponseModel} from "../models/login/login-response.model";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private resourceUrl: string = '/user/api/authentication';
  constructor(private httpClient: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  public login(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(`${this.resourceUrl}/login`, loginRequest);
  }

  public logout(): void {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
    this.localStorageService.clear('refreshToken');
    this.localStorageService.clear('expiresAt');
  }
  public getJwtToken(): string | null {
    return this.localStorageService.retrieve('jwtToken');
  }

  public getRefreshToken(): string | null {
    return this.localStorageService.retrieve('refreshToken');
  }

  public getUsername(): string | null {
    return this.localStorageService.retrieve('username');
  }

  public getExpirationTime(): string | null {
    return this.localStorageService.retrieve('expiresAt');
  }

  public isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
