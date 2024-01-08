import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../services/authentication.service";
import {ComponentStateEnum} from "../../../../enums/component-state.enum";
import {UserAccountService} from "../../../../services/user-account.service";
import {Router} from "@angular/router";
import {RouteManager} from "../../../../shared/route-manager";
import {ToastrService} from "ngx-toastr";
import {finalize} from "rxjs";
import {
  UserAccountInformationPayloadModel
} from "../../../../models/user-account/user-account-information-payload.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../../../../shared/validators/email.validator";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public readonly ComponentStateEnum = ComponentStateEnum;
  public userDataFormGroup: FormGroup | null = null;
  public componentState: ComponentStateEnum = ComponentStateEnum.PREVIEW;
  public userAccountData: UserAccountInformationPayloadModel | null = null;
  constructor(private authenticationService: AuthenticationService,
              private userAccountService: UserAccountService,
              private router: Router,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initUserDataForm();
    this.fetchUserData();
  }

  public get firstName(): FormControl {
    return <FormControl>this.userDataFormGroup?.get('firstName');
  }

  public get lastName(): FormControl {
    return <FormControl>this.userDataFormGroup?.get('lastName');
  }

  public get email(): FormControl {
    return <FormControl>this.userDataFormGroup?.get('email');
  }

  public get phoneNumber(): FormControl {
    return <FormControl>this.userDataFormGroup?.get('phoneNumber');
  }

  private initUserDataForm(): void {
    this.userDataFormGroup = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, emailValidator()]],
      phoneNumber: [null]
    });
  }

  private fetchUserData(): void {
    this.componentState = ComponentStateEnum.LOADING;
    const email = this.handleInvalidEmail();
    this.userAccountService.getUserAccountDataByEmail(email as string)
      .pipe(finalize(() => this.componentState = ComponentStateEnum.PREVIEW))
      .subscribe({
        next: (res) => {
          this.userAccountData = res;
          this.fillUserDataForm();
        },
        error: () => {
          this.toastrService.error('Wystąpił bład podczas pobierania informacji o koncie, skontaktuj się z administratorem');
          this.router.navigate(RouteManager.getHome());
        }
      });
  }

  private fillUserDataForm(): void {
    this.userDataFormGroup?.get('firstName')?.setValue(this.userAccountData?.firstname);
    this.userDataFormGroup?.get('lastName')?.setValue(this.userAccountData?.lastname);
    this.userDataFormGroup?.get('email')?.setValue(this.userAccountData?.email);
    this.userDataFormGroup?.get('phoneNumber')?.setValue(this.userAccountData?.phoneNumber);
  }
  private handleInvalidEmail() {
    const email: string | null = this.authenticationService.getUsername();
    if (email == null) {
      this.router.navigate(RouteManager.getHome());
      this.toastrService.info('Token stracił ważność, zaloguj się ponownie');
    }
    return email;
  }

  public onFileSelected(): void {
    const inputNode: any = document.querySelector('#file');

    if (inputNode.files.length > 0) {
      const file = inputNode.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const blob = new Blob([e.target.result], { type: file.type });
        this.changeAvatarImage(blob);
      };

      reader.readAsArrayBuffer(file);
    }
  }

  public submit(): void {
    if (this.userDataFormGroup?.invalid) {
      this.toastrService.info('Uzupełnij wszystkie wymagane informacje')
      this.userDataFormGroup?.markAllAsTouched();
      return;
    }
    this.componentState = ComponentStateEnum.LOADING;

    const changedPersonalData: UserAccountInformationPayloadModel = {
        firstname: this.firstName.value,
        lastname: this.lastName.value,
        phoneNumber: this.phoneNumber.value
      } as UserAccountInformationPayloadModel;
    this.userAccountService.changePersonalData(changedPersonalData, this.userAccountData?.email as string)
      .pipe(finalize(() => this.componentState = ComponentStateEnum.PREVIEW))
      .subscribe({
        next: res => {
          this.userAccountData = res;
          this.toastrService.success('Pomyślnie zmieniono dane dotyczące profilu');
        },
        error: err => this.toastrService.error('Wystąpił błąd podczas edycji danych profilu')
      });
  }

  public toggleNewsletter(): void {
    this.componentState = ComponentStateEnum.LOADING;
    this.userAccountService.toggleAssignedForNewsletter(this.userAccountData?.email as string)
      .pipe(finalize(() => this.componentState = ComponentStateEnum.PREVIEW))
      .subscribe({
        next: res => {
          this.userAccountData = res;
          this.toastrService.success(this.userAccountData?.isAssignedForNewsletter
            ? 'Pomyślnie zapisano się na nweslettera' : 'Pomyślnie wypisano się z newslettera');
        },
        error: err => this.toastrService.error('Wystąpił błąd podczas zapisywania się na newsletter')
      });
  }

  private changeAvatarImage(blob: Blob) {
    this.componentState = ComponentStateEnum.LOADING;
    const formData = new FormData();
    formData.append('file', blob);
    this.userAccountService.changeAvatar(formData, this.authenticationService.getUsername() as string)
      .pipe(finalize(() => this.componentState = ComponentStateEnum.PREVIEW))
      .subscribe({
      next: res => {
        this.userAccountData = res;
        this.toastrService.success('Pomyślnie zmieniono avatar profilu');
      },
      error: err => this.toastrService.error('Wystąpił błąd podczas zmiany avatara')
    })
  }
}
