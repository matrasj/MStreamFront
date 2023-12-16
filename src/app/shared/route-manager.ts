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
}
