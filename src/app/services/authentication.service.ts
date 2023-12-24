import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequestModel} from "../models/login/login-request.model";
import {Observable} from "rxjs";
import {LoginResponseModel} from "../models/login/login-response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private resourceUrl: string = '/user/api/authentication';
  constructor(private httpClient: HttpClient) {
  }

  public login(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(`${this.resourceUrl}/login`, loginRequest);
  }

  public logout(): void {
    localStorage.clear();
  }
  public getJwtToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  public getUsername(): string | null {
    return localStorage.getItem('username');
  }

  public getExpirationTime(): string | null {
    return localStorage.getItem('expiresAt');
  }

  public isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
