import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuizCategoryModel} from "../../models/quiz/quiz-category.model";

@Injectable({
  providedIn: 'root'
})
export class QuizCategoryService {
  private resourceUrl: string = '/quiz/api/quiz-category';
  constructor(private httpClient: HttpClient) {
  }

  public getQuizCategories(): Observable<QuizCategoryModel[]> {
    return this.httpClient.get<QuizCategoryModel[]>(`${this.resourceUrl}`);
  }
}
