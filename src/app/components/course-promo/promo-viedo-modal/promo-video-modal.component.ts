import { Component, OnInit } from '@angular/core';
import {VgApiService} from "@videogular/ngx-videogular/core";

@Component({
  selector: 'app-promo-video-modal',
  templateUrl: './promo-video-modal.component.html',
  styleUrls: ['./promo-video-modal.component.css']
})
export class PromoVideoModalComponent implements OnInit {

  ngOnInit(): void {
  }

  onPlayerRead($event: VgApiService) {

  }
}
