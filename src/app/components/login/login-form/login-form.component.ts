import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {RouteManager} from "../../../shared/route-manager";
import {emailValidator} from "../../../shared/validators/email.validator";
import {ComponentStateEnum} from "../../../enums/component-state.enum";
import {LoginRequestModel} from "../../../models/login/login-request.model";
import {finalize} from "rxjs";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public readonly RouteManager = RouteManager;
  public readonly ComponentStateEnum = ComponentStateEnum;
  public componentState: ComponentStateEnum = ComponentStateEnum.CREATE;
  public loginForm: UntypedFormGroup | null = null;
  constructor(public authenticationService: AuthenticationService,
              private formBuilder: UntypedFormBuilder,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  public get emailFormControl(): UntypedFormControl {
    return <UntypedFormControl>this.loginForm?.get('email');
  }

  public get passwordFormControl(): UntypedFormControl {
    return <UntypedFormControl>this.loginForm?.get('password');
  }

  public login(): void {
    if (this.loginForm?.invalid) {
      this.toastr.info('Uzupełnij wszystkie wymagane pola');
      this.loginForm.markAllAsTouched();
      return;
    }

    this.componentState = ComponentStateEnum.LOADING;
    this.authenticationService.login({
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    } as LoginRequestModel)
      .pipe(finalize(() => this.componentState = ComponentStateEnum.CREATE))
      .subscribe({
        next: (res) => {
          localStorage.setItem('jwtToken', res.jwtToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('expiresAt', `${res.expiresAt}`);
          localStorage.setItem('username', res.email);

          this.toastr.success('Logowanie zakończyło się sukcesem')
          this.router.navigate(RouteManager.getUserProfile());
        },
        error: (err) => {
          if (err.error?.message === 'EntityNotFoundException') {
            this.toastr.error('Konto o podanym emailu nie istnieje');
            return;
          }

          if (err.error?.message === 'InvalidCredentialsException') {
            this.toastr.error('Nieprawidłowe hasło');
            return;
          }

          this.toastr.error('Wystąpił błąd podczas logowania');
        }
      })
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator()]],
      password: [null, Validators.required]
    });
  }
}
