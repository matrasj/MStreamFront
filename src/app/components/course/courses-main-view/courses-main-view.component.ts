import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PromoVideoModalComponent} from "../promo-viedo-modal/promo-video-modal.component";

@Component({
  selector: 'app-courses-main-view',
  templateUrl: './courses-main-view.component.html',
  styleUrls: ['./courses-main-view.component.css']
})
export class CoursesMainViewComponent implements OnInit {

  constructor(private ngbModal: NgbModal) { }

  ngOnInit(): void {
  }

  public openPromoWithVideoModal(): void {
    const confirmRef = this.ngbModal.open(PromoVideoModalComponent, { size: 'lg' });

  }
}
