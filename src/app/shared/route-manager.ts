export class RouteManager {
  public static getHome(): string[] {
    return ['/'];
  }
  public static getCourses(): string[] {
    return RouteManager.getHome().concat(['courses']);
  }

  public static getRecruitmentQuestions(): string[] {
    return RouteManager.getHome().concat(['recruitment-questions']);
  }

  public static getNewsletter(): string[] {
    return RouteManager.getHome().concat(['newsletter']);
  }

  public static getLogin(): string[] {
    return RouteManager.getHome().concat(['login']);
  }

  public static getRegister(): string[] {
    return RouteManager.getHome().concat(['register']);
  }

  public static getRecoverPassword(): string[] {
    return RouteManager.getHome().concat(['recover-password']);
  }

  public static getSolveQuiz(): string[] {
    return RouteManager.getRecruitmentQuestions().concat(['solving']);
  }

  public static getQuizGenerationForm(): string[] {
    return RouteManager.getRecruitmentQuestions().concat(['quiz-form']);
  }

  public static getQuestionsList(): string[] {
    return RouteManager.getRecruitmentQuestions().concat(['questions-list']);
  }

  public static getQuestionsListForQuizCategory(quizCategoryId: number): string[] {
    return RouteManager.getQuestionsList().concat([`${quizCategoryId}`]);
  }

  // Account
  private static getUserAccount(): string[] {
    return RouteManager.getHome().concat(['account']);
  }
  public static getUserProfile(): string[] {
    return RouteManager.getUserAccount().concat(['profile']);
  }

  // Courses
  public static getUserCourses(): string[] {
    return RouteManager.getHome().concat(['user-courses']);
  }
}
