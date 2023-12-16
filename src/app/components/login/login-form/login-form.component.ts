import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {RouteManager} from "../../../shared/route-manager";
import {emailValidator} from "../../../shared/validators/email.validator";
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public readonly RouteManager = RouteManager;
  public loginForm: FormGroup | null = null;
  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService) {
  }
  ngOnInit() {
    this.initForm();
  }

  public get emailFormControl(): FormControl {
    return <FormControl>this.loginForm?.get('email');
  }

  public get passwordFormControl(): FormControl {
    return <FormControl>this.loginForm?.get('password');
  }

  public login(): void {
    if (this.loginForm?.invalid) {
      this.toastr.info('Uzupełnij wszystkie wymagane pola');
      this.loginForm.markAllAsTouched();
      return;
    }
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator()]],
      password: [null, Validators.required]
    });
  }
}
