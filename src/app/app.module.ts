import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MainFooterComponent } from './components/infrastructure/main-footer/main-footer.component';
import {MatIconModule} from "@angular/material/icon";
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {ToastrModule} from "ngx-toastr";
import {MainMenuComponent} from "./components/infrastructure/main-menu/main-menu.component";
import {
  RecruitmentQuestionsComponent
} from "./components/recruitment-question/recruitment-questions/recruitment-questions.component";
import {RegisterFormComponent} from "./components/login/register-form/register-form.component";
import {
  RecruitmentQuestionsSidebarComponent
} from "./components/recruitment-question/recruitment-questions-sidebar/recruitment-questions-sidebar.component";
import { RecoverPasswordComponent } from './components/login/recover-password/recover-password.component';

const routes: Routes = [
  { path: "recruitment-questions", component: RecruitmentQuestionsComponent},
  { path: "login", component: LoginFormComponent },
  { path: "register", component: RegisterFormComponent },
  { path: "recover-password", component: RecoverPasswordComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MainFooterComponent,
    RecruitmentQuestionsSidebarComponent,
    RecruitmentQuestionsComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RecoverPasswordComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    ToastrModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
