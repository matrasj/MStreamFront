import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequestModel} from "../models/login/login-request.model";
import {Observable} from "rxjs";
import {AuthenticationPayloadResponse} from "../models/login/authentication-payload.response";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private resourceUrl: string = '/user/api/authentication';
  constructor(private httpClient: HttpClient) {
  }

  public login(loginRequest: LoginRequestModel): Observable<AuthenticationPayloadResponse> {
    return this.httpClient.post<AuthenticationPayloadResponse>(`${this.resourceUrl}/login`, loginRequest);
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
