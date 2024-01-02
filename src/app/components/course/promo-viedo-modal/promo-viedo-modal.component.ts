import { Component, OnInit } from '@angular/core';
import {VgApiService} from "@videogular/ngx-videogular/core";

@Component({
  selector: 'app-promo-viedo-modal',
  templateUrl: './promo-viedo-modal.component.html',
  styleUrls: ['./promo-viedo-modal.component.css']
})
export class PromoViedoModalComponent implements OnInit {
  public videoUrl = '../..assets/';
  public api: VgApiService | null= null;

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.play();
  }
  constructor() { }

  ngOnInit(): void {
  }

}
