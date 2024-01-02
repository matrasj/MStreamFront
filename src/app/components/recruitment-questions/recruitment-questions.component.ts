import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuizCategoryService} from "../../services/quiz/quiz-category.service";
import {QuizCategoryModel} from "../../models/quiz/quiz-category.model";
import {finalize} from "rxjs";
import {ComponentStateEnum} from "../../enums/component-state.enum";
import {ToastrService} from "ngx-toastr";
import {RouteManager} from "../../shared/route-manager";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recruitment-questions',
  templateUrl: './recruitment-questions.component.html',
  styleUrls: ['./recruitment-questions.component.css']
})
export class RecruitmentQuestionsComponent {
  constructor(private router: Router) {
  }
  public readonly RouteManager = RouteManager;
  public isRouteActive(routes: string[]): boolean {
    return routes.find((route) => route.includes(route)) !== undefined
  }
}
