import {Component, OnInit} from '@angular/core';
import {QuizQuestionService} from "../../../../services/quiz/quiz-question.service";
import {QuizQuestionModel} from "../../../../models/quiz/quiz-question.model";
import {ComponentStateEnum} from "../../../../enums/component-state.enum";
import {switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {
  QuizQuestionWithInfoAboutCorrectAnswersModel
} from "../../../../models/quiz/quiz-question-with-info-about-correct-answers.model";
import {PaginationPayloadRequestModel} from "../../../../models/shared/pagination-payload-request.model";
import {PageEvent} from "@angular/material/paginator";
import {$e} from "@angular/compiler/src/chars";

@Component({
  selector: 'app-question-categories-list',
  templateUrl: './question-categories-list.component.html',
  styleUrls: ['./question-categories-list.component.css']
})
export class QuestionCategoriesListComponent implements OnInit {
  public readonly ComponentStateEnum = ComponentStateEnum;
  public paginationModel: PaginationPayloadRequestModel = {
    itemsPerPage: 5,
    page: 0
  };
  public totalCount: number = 0;
  public expandMap: Map<number, boolean> = new Map<number, boolean>();
  public componentState: ComponentStateEnum = ComponentStateEnum.PREVIEW;
  public quizQuestions: QuizQuestionWithInfoAboutCorrectAnswersModel[] = [];
  public quizCategoryId: number | null = null;
  constructor(private quizQuestionService: QuizQuestionService,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.initData();
  }

  public expand(questionId: number): void {
    if (this.expandMap.get(questionId)) {
      this.expandMap.set(questionId, false);
    } else {
      this.expandMap.set(questionId, true);
    }
  }

  public onPageChange($event: PageEvent) {
    this.paginationModel.page = $event.pageIndex;
    this.paginationModel.itemsPerPage = $event.pageSize;
    this.fetchQuestions();
  }
  private initData(): void {
    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        this.quizCategoryId = Number(paramMap.get('quizCategoryId'));
        this.fetchQuestions();
      });
  }

  private fetchQuestions(): void {
    if (this.quizCategoryId !== null) {
      this.componentState = ComponentStateEnum.LOADING;
      this.quizQuestionService.getQuizQuestionsByCategoryId(this.quizCategoryId, this.paginationModel)
        .subscribe({
          next: (res) => {
            this.quizQuestions = res.items;
            this.totalCount = res.totalCount;
            this.componentState = ComponentStateEnum.PREVIEW;
          },
          error: (err) => {
            this.toastrService.error('Wystąpił błąd podczas pobierania pytań dla tej kategorii');
            this.componentState = ComponentStateEnum.PREVIEW;
          }
        });
    }
  }
}
