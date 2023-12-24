import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuizQuestionModel} from "../../models/quiz/quiz-question.model";
import {QuizGenerationPayloadRequestModel} from "../../models/quiz/quiz-generation-payload-request.model";

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionService {
  private resourceUrl: string = '/quiz/api/quiz-question';
  constructor(private httpClient: HttpClient) {
  }

  public getQuiz(request: QuizGenerationPayloadRequestModel): Observable<QuizQuestionModel[]> {
    return this.httpClient.post<QuizQuestionModel[]>(`${this.resourceUrl}`, request);
  }
}
