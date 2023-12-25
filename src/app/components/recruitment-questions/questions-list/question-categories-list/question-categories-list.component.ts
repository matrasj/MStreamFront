import { Component, OnInit } from '@angular/core';
import {QuizQuestionService} from "../../../../services/quiz/quiz-question.service";
import {QuizQuestionModel} from "../../../../models/quiz/quiz-question.model";

@Component({
  selector: 'app-question-categories-list',
  templateUrl: './question-categories-list.component.html',
  styleUrls: ['./question-categories-list.component.css']
})
export class QuestionCategoriesListComponent implements OnInit {
  public quizQuestions: QuizQuestionModel[] = [];
  constructor(private quizQuestionService: QuizQuestionService) { }

  ngOnInit(): void {
    this.quizQuestionService.getQuizQuestionsByCategoryId(1)
      .subscribe({
        next: (res) => {
          this.quizQuestions = res;
        },
        error: (err) => {
        }
      });
  }

}
