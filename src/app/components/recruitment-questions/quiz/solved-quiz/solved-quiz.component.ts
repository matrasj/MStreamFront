import {Component, Input, OnInit} from '@angular/core';
import {QuizSolvedPayloadResponseModel} from "../../../../models/quiz/quiz-solved-payload-response.model";
import {QuizQuestionModel} from "../../../../models/quiz/quiz-question.model";
import {RouteManager} from "../../../../shared/route-manager";

@Component({
  selector: 'app-solved-quiz',
  templateUrl: './solved-quiz.component.html',
  styleUrls: ['./solved-quiz.component.css']
})
export class SolvedQuizComponent implements OnInit {
  public readonly RouteManager = RouteManager;
  @Input()
  public solvedQuizResponse: QuizSolvedPayloadResponseModel | null  = null;

  @Input()
  public quizQuestions: QuizQuestionModel[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
