import { Component } from '@angular/core';
import {RouteManager} from "../../../../shared/route-manager";

@Component({
  selector: 'app-account-side-nav',
  templateUrl: './account-side-nav.component.html',
  styleUrls: ['./account-side-nav.component.css']
})
export class AccountSideNavComponent {
  public readonly RouteManager = RouteManager;
}
