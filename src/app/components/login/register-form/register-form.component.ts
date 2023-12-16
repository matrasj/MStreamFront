import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {emailValidator} from "../../../shared/validators/email.validator";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public registrationForm: FormGroup | null = null;
  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService) { }

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
  }
}
