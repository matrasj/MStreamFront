import {Component, OnInit} from '@angular/core';
import {ComponentStateEnum} from 'src/app/enums/component-state.enum';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {of, switchMap} from "rxjs";
import {QuizQuestionService} from "../../services/quiz/quiz-question.service";
import {QuizGenerationPayloadRequestModel} from "../../models/quiz/quiz-generation-payload-request.model";
import {ToastrService} from "ngx-toastr";
import {RouteManager} from "../../shared/route-manager";
import {QuizQuestionModel} from "../../models/quiz/quiz-question.model";
import {FormControl, FormGroup} from "@angular/forms";
import {QuizSolvedPayloadRequestModel} from "../../models/quiz/quiz-solved-payload-request.model";
import {QuizSolvedPayloadResponseModel} from "../../models/quiz/quiz-solved-payload-response.model";
import {QuizQuestionAnswerModel} from "../../models/quiz/quiz-question-answer.model";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  public readonly ComponentStateEnum = ComponentStateEnum;
  public componentState: ComponentStateEnum = ComponentStateEnum.CREATE;
  public quizQuestions: QuizQuestionModel[] = [];
  public quizForm: FormGroup = new FormGroup({});
  public solvedQuizResponse: QuizSolvedPayloadResponseModel | null = null;
  constructor(private activatedRoute: ActivatedRoute,
              private quizQuestionService: QuizQuestionService,
              private router: Router,
              private torastService: ToastrService) { }

  ngOnInit(): void {
    this.fetchForQuiz();
  }

  public getNameForAnswerControl(questionId: number, answerId: number) {
    return `${questionId}_${answerId}`;
  }
  public getControlForAnswer(questionId: number, answerId: number): FormControl {
    return <FormControl>this.quizForm.get(this.getNameForAnswerControl(questionId, answerId));
  }

  private fetchForQuiz(): void {
    this.componentState = ComponentStateEnum.LOADING;
    this.activatedRoute.queryParamMap
      .pipe(
        switchMap((queryParamMap: ParamMap) => {
          const categories: number[] | undefined = queryParamMap.get('categories')?.split(',')?.map(Number);
          const count: number | undefined = Number(queryParamMap.get('count'));

          if (!!categories && !!count) {
            return this.quizQuestionService.getQuiz({
              quizCategoryIds: categories,
              count: count
            } as QuizGenerationPayloadRequestModel);
          } else {
            this.torastService.error('Parametry używane do wygenerowania quizu są niepoprawne');
            this.router.navigate(RouteManager.getHome());
            return of(null);
          }
        })
      ).subscribe({
      next: (res) => {
        if (res) {
          this.quizQuestions = res;
          this.initQuizForm();
        }
        this.componentState = ComponentStateEnum.CREATE;
      },
      error: (err) => {
        this.componentState = ComponentStateEnum.CREATE;
        this.torastService.error('Wystąpił błąd podczas generowania quizu');
      }
    });
  }

  private initQuizForm(): void {
    this.quizQuestions.forEach((question) => {
      if (question.answers?.length > 0) {
        question.answers.forEach((answer) => {
          const answerFormControl: FormControl = new FormControl(null);
          this.quizForm.addControl(this.getNameForAnswerControl(question.id, answer.id), answerFormControl);
        });
      }
    });
  }

  public submit() {
    this.componentState = ComponentStateEnum.LOADING;
    const solvedQuiz: QuizSolvedPayloadRequestModel = this.buildSolvedQuizObject();
    this.quizQuestionService.solveQuiz(solvedQuiz)
      .subscribe({
        next: (res) => {
          this.solvedQuizResponse = res;
          this.componentState = ComponentStateEnum.PREVIEW;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (err) => {
          this.torastService.error('Wystąpił błąd podczas sprawdzania quizu');
        }
      })
  }

  public isCorrectAnswer(question: QuizQuestionModel, answer: QuizQuestionAnswerModel): boolean {
    if (!this.solvedQuizResponse) return false;
    return this.componentState === ComponentStateEnum.PREVIEW
      && this.solvedQuizResponse.answersInfo[question.id].correctAnswerIds.includes(answer.id);
  }

  public isIncorrectAnswer(question: QuizQuestionModel, answer: QuizQuestionAnswerModel): boolean {
    if (!this.solvedQuizResponse) return false;
    return this.componentState === ComponentStateEnum.PREVIEW
      && !this.solvedQuizResponse.answersInfo[question.id].correctAnswerIds.includes(answer.id)
      && this.getControlForAnswer(question.id, answer.id).value === true;
  }
  private buildSolvedQuizObject(): QuizSolvedPayloadRequestModel {
    const questionIdWithAnswerIds: Map<number, number[]> = new Map<number, number[]>();
    this.quizQuestions.forEach((question) => {
      const questionId: number = question.id;
      const answerIds: number[] = [];
      if (question.answers?.length > 0) {
        question.answers.forEach((answer) => {
          if (this.getControlForAnswer(questionId, answer.id)?.value === true) {
            answerIds.push(answer.id);
          }
        });
      }
      questionIdWithAnswerIds.set(questionId, answerIds);
    })

    const mapAsObject: { [key: number]: number[] } = {}
    questionIdWithAnswerIds.forEach((vale, key) => {
      mapAsObject[key] = vale;
    });
    return {
      solutions: mapAsObject
    } as QuizSolvedPayloadRequestModel;
  }
}
