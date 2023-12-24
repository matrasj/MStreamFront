import {QuizQuestionAnswerInfoResultPayloadModel} from "./quiz-question-answer-info-result-payload.model";

export interface QuizSolvedPayloadResponseModel {
  totalQuestionsCount: number;
  totalCorrectAnswersCount: number;
  resultPercent: string;
  answersInfo: { [key: number]: QuizQuestionAnswerInfoResultPayloadModel };
}
