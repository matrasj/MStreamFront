import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import {MatIconModule} from "@angular/material/icon";

const routes: [] = [];
@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MainFooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
