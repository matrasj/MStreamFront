import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PromoViedoModalComponent} from "../promo-viedo-modal/promo-viedo-modal.component";

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
    const confirmRef = this.ngbModal.open(PromoViedoModalComponent, { size: 'lg' });

  }
}
