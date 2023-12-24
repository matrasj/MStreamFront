import {QuizQuestionAnswerModel} from "./quiz-question-answer.model";

export interface QuizQuestionModel {
  id: number;
  content: string;
  answers: QuizQuestionAnswerModel[];
}
