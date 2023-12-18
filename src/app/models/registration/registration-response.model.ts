import {ConfirmationTokenModel} from "./confirmation-token.model";

export interface RegistrationResponseModel {
  email: string;
  confirmationToken: ConfirmationTokenModel;
}
