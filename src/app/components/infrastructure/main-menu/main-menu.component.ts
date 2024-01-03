import { Component, OnInit } from '@angular/core';
import {RouteManager} from "../../../shared/route-manager";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  public readonly RouteManager = RouteManager;
  public showMenu = false;
  constructor(public authenticationService: AuthenticationService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
  }
  public toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(RouteManager.getHome());
    this.toastrService.success('Pomyślnie wylogowano użytkownika');
  }

  public navigateAndCloseMenu(route: string[]): void {
    this.showMenu = false;
    this.router.navigate(route);
  }
}
