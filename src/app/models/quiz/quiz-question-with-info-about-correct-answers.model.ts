import {QuizQuestionAnswerWithCorrectInfoModel} from "./quiz-question-answer-with-correct-info.model";

export interface QuizQuestionWithInfoAboutCorrectAnswersModel {
  id: number;
  content: string;
  answers: QuizQuestionAnswerWithCorrectInfoModel[];
}
