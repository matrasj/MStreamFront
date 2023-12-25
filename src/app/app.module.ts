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
} from "./components/recruitment-questions/recruitment-questions.component";
import {RegisterFormComponent} from "./components/login/register-form/register-form.component";
import { RecoverPasswordComponent } from './components/login/recover-password/recover-password.component';
import { LoaderComponent } from './shared/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { CoursesListComponent } from './components/account/courses/courses-list.component';
import {AuthenticationGuard} from "./guards/authentication.guard";
import {MatMenuModule} from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import {QuizFormComponent} from "./components/recruitment-questions/quiz/quiz-form/quiz-form.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { SolvedQuizComponent } from './components/recruitment-questions/quiz/solved-quiz/solved-quiz.component';
import {NgCircleProgressModule} from "ng-circle-progress";
import { QuizGenerationFormComponent } from './components/recruitment-questions/quiz/quiz-generation-form/quiz-generation-form.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { QuestionCategoriesMenuComponent } from './components/recruitment-questions/questions-list/question-categories-menu/question-categories-menu.component';
import { QuestionCategoriesListComponent } from './components/recruitment-questions/questions-list/question-categories-list/question-categories-list.component';
import {MatListModule} from "@angular/material/list";
import {MatChipsModule} from "@angular/material/chips";
import {MatTreeModule} from "@angular/material/tree";

const routes: Routes = [
  { path: "recruitment-questions", component: RecruitmentQuestionsComponent, children: [
      {
        path: '',
        redirectTo: 'quiz-form',
        pathMatch: 'full',
      },
      {
        path: 'quiz-form',
        component: QuizGenerationFormComponent
      },
      {
        path: 'solving',
        component: QuizFormComponent
      },
      {
        path: 'questions-list',
        component: QuestionCategoriesListComponent
      }
  ]},
  { path: "login", component: LoginFormComponent },
  { path: "register", component: RegisterFormComponent },
  { path: "recover-password", component: RecoverPasswordComponent },
  {
    path: "account",
    children: [
      {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full'
      },
      {
        path: 'courses',
        component: CoursesListComponent
      }
    ],
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MainFooterComponent,
    RecruitmentQuestionsComponent,
    QuizFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RecoverPasswordComponent,
    LoaderComponent,
    CoursesListComponent,
    SolvedQuizComponent,
    QuizGenerationFormComponent,
    QuestionCategoriesMenuComponent,
    QuestionCategoriesListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
      paramsInheritanceStrategy: 'always'
    }),
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonToggleModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
