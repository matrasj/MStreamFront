import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {emailValidator} from "../../../shared/validators/email.validator";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  public emailFormControl: UntypedFormControl = new UntypedFormControl(null, [Validators.required, emailValidator()]);
  constructor() { }

  ngOnInit(): void {
  }

  public resetPassword(): void {

  }
}
