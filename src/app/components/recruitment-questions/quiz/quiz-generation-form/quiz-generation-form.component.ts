import { Component, OnInit } from '@angular/core';
import {ComponentStateEnum} from "../../../../enums/component-state.enum";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuizCategoryModel} from "../../../../models/quiz/quiz-category.model";
import {RouteManager} from "../../../../shared/route-manager";
import {finalize} from "rxjs";
import {QuizCategoryService} from "../../../../services/quiz/quiz-category.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz-generation-form',
  templateUrl: './quiz-generation-form.component.html',
  styleUrls: ['./quiz-generation-form.component.css']
})
export class QuizGenerationFormComponent implements OnInit {
  public readonly ComponentStatEnum = ComponentStateEnum;
  public componentState: ComponentStateEnum = ComponentStateEnum.PREVIEW;
  public quizFormGroup: FormGroup | undefined;
  public quizCategories: QuizCategoryModel[] = [];
  public questionNumbers: number[] = [1, 5, 10, 15, 20, 25];
  constructor(
    private quizCategoryService: QuizCategoryService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchQuizCategories();
  }

  public get categoriesFormControl(): FormControl {
    return <FormControl>this.quizFormGroup?.get('categories');
  }
  public get countFormControl(): FormControl {
    return <FormControl>this.quizFormGroup?.get('count');
  }
  public solveQuiz(): void {
    if (this.quizFormGroup?.invalid) {
      this.toastrService.info('Formularz nie został wypeniony w całości');
      this.quizFormGroup.markAllAsTouched();
      return;
    }

    this.router.navigate(RouteManager.getSolveQuiz(), {
      queryParams: {
        categories: this.categoriesFormControl.value,
        count: this.countFormControl.value
      }
    });
  }

  private fetchQuizCategories(): void {
    this.componentState = ComponentStateEnum.LOADING;
    this.quizCategoryService.getQuizCategories()
      .pipe(finalize(() => this.componentState = ComponentStateEnum.PREVIEW))
      .subscribe({
        next: (res) => this.quizCategories = res,
        error: (err) => this.toastrService.error('Wystąpił błąd podczas pobierania kategori quizów')
      });
  }

  private initForm(): void {
    this.quizFormGroup = this.formBuilder.group({
      categories: new FormControl(null, [Validators.required]),
      count: new FormControl(null, [Validators.required])
    });
  }
}
