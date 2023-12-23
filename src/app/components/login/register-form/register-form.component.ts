import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {RouteManager} from 'src/app/shared/route-manager';
import {emailValidator} from "../../../shared/validators/email.validator";
import {ComponentStateEnum} from "../../../enums/component-state.enum";
import {UserAccountService} from "../../../services/user-account.service";
import {RegistrationRequestModel} from "../../../models/registration/registration-request.model";
import {finalize} from "rxjs";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public readonly RouteManager = RouteManager;
  public readonly ComponentStateEnum = ComponentStateEnum;
  public componentState = ComponentStateEnum.CREATE;
  public showInfoAboutCheckingMail: boolean = false;
  public registrationForm: FormGroup | null = null;

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private userAccountService: UserAccountService) { }

  ngOnInit(): void {
    this.initForm();
  }

  public get firstNameFormControl(): FormControl {
    return <FormControl>this.registrationForm?.get('firstName');
  }

  public get lastNameFormControl(): FormControl {
    return <FormControl>this.registrationForm?.get('lastName');
  }

  public get emailFormControl(): FormControl {
    return <FormControl>this.registrationForm?.get('email');
  }

  public get passwordFormControl(): FormControl {
    return <FormControl>this.registrationForm?.get('password');
  }

  public get phoneNumberFormControl(): FormControl {
    return <FormControl>this.registrationForm?.get('phoneNumber');
  }
  private initForm(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, emailValidator()]],
      password: [null, Validators.required],
      phoneNumber: [null]
    });
  }

  public submitForm(): void {
    if (this.registrationForm?.invalid) {
      this.toastr.info('Uzupełnij wszystkie wymagane pola');
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.componentState = ComponentStateEnum.LOADING;
    this.userAccountService.registerAccount({
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
      firstname: this.firstNameFormControl.value,
      lastname: this.lastNameFormControl.value,
      phoneNumber: this.phoneNumberFormControl.value
    } as RegistrationRequestModel).pipe(
      finalize(() => this.componentState = ComponentStateEnum.CREATE)
    ).subscribe({
      next: (res) => {
        this.toastr.success('Pomyślnie utworzono konto');
        this.showInfoAboutCheckingMail = true;
      },
      error: (err) => {
        this.toastr.error('Wystąpił błąd podczas tworzenia użytkownika')
      }
    })
  }
}
