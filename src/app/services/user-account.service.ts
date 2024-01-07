import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegistrationRequestModel} from "../models/registration/registration-request.model";
import {Observable} from "rxjs";
import {RegistrationResponseModel} from "../models/registration/registration-response.model";
import {UserAccountInformationPayloadModel} from "../models/user-account/user-account-information-payload.model";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  private resourceUrl: string = '/user/api/user-account';
  constructor(private httpClient: HttpClient) {
  }

  public registerAccount(registrationRequest: RegistrationRequestModel): Observable<RegistrationResponseModel> {
    return this.httpClient.post<RegistrationResponseModel>(`${this.resourceUrl}/registration`, registrationRequest);
  }

  public getUserAccountDataByEmail(email: string): Observable<UserAccountInformationPayloadModel> {
    return this.httpClient.get<UserAccountInformationPayloadModel>(`${this.resourceUrl}/email/${email}`);
  }

  public changeAvatar(formData: FormData, email: string): Observable<UserAccountInformationPayloadModel> {
    return this.httpClient.post<UserAccountInformationPayloadModel>(`${this.resourceUrl}/email/${email}/avatar`, formData);
  }
}
