import {Component, OnInit} from '@angular/core';
import {QuizCategoryService} from "../../../../services/quiz/quiz-category.service";
import {ComponentStateEnum} from "../../../../enums/component-state.enum";
import {QuizCategoryModel} from "../../../../models/quiz/quiz-category.model";
import {finalize} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-question-categories-menu',
  templateUrl: './question-categories-menu.component.html',
  styleUrls: ['./question-categories-menu.component.css']
})
export class QuestionCategoriesMenuComponent implements OnInit {
  public readonly ComponentStateEnum = ComponentStateEnum;
  public componentState: ComponentStateEnum = ComponentStateEnum.PREVIEW;
  public quizCategories: QuizCategoryModel[] = [];
  public selectedCategory: QuizCategoryModel | null = null;
  constructor(private quizCategoryService: QuizCategoryService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  public isSelected(quizCategory: QuizCategoryModel): boolean {
    return quizCategory.id === this.selectedCategory?.id;
  }

  private fetchCategories(): void {
    this.componentState = ComponentStateEnum.LOADING;
    this.quizCategoryService.getQuizCategories()
      .pipe(finalize(() => this.componentState = ComponentStateEnum.PREVIEW))
      .subscribe({
        next: (res) => {
          this.quizCategories = res;
          if (this.quizCategories?.length > 0) {
            this.selectedCategory = this.quizCategories[0];
          }
        },
        error: (err) => this.toastrService.error('Wystąpił błąd podczas pobierania kategorii')
      });
  }
}
