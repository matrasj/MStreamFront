import {Component, OnInit} from '@angular/core';
import {RouteManager} from "../../shared/route-manager";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recruitment-questions',
  templateUrl: './recruitment-questions.component.html',
  styleUrls: ['./recruitment-questions.component.css']
})
export class RecruitmentQuestionsComponent {
  constructor(private router: Router) {
  }
  public readonly RouteManager = RouteManager;
  public isRouteActive(routes: string[]): boolean {
    return routes.find((route) => route.includes(route)) !== undefined
  }
}
