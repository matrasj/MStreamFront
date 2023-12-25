import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuizQuestionModel} from "../../models/quiz/quiz-question.model";
import {QuizGenerationPayloadRequestModel} from "../../models/quiz/quiz-generation-payload-request.model";
import {QuizSolvedPayloadRequestModel} from "../../models/quiz/quiz-solved-payload-request.model";
import {QuizSolvedPayloadResponseModel} from "../../models/quiz/quiz-solved-payload-response.model";
import {
  QuizQuestionWithInfoAboutCorrectAnswersModel
} from "../../models/quiz/quiz-question-with-info-about-correct-answers.model";
import {urlJoin} from "@angular-devkit/build-angular/src/utils";

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionService {
  private resourceUrl: string = '/quiz/api/quiz-question';
  constructor(private httpClient: HttpClient) {
  }

  public getQuiz(generationRequest: QuizGenerationPayloadRequestModel): Observable<QuizQuestionModel[]> {
    return this.httpClient.post<QuizQuestionModel[]>(`${this.resourceUrl}`, generationRequest);
  }

  public solveQuiz(solvedQuiz: QuizSolvedPayloadRequestModel): Observable<QuizSolvedPayloadResponseModel> {
    return this.httpClient.post<QuizSolvedPayloadResponseModel>(urlJoin(this.resourceUrl, 'solution'), solvedQuiz);
  }

  public getQuizQuestionsByCategoryId(quizCategoryId: number): Observable<QuizQuestionWithInfoAboutCorrectAnswersModel[]> {
    return this.httpClient.get<QuizQuestionWithInfoAboutCorrectAnswersModel[]>(urlJoin(this.resourceUrl, 'quiz-category', `${quizCategoryId}`));
  }
}
