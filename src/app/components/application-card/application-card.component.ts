import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';

@Injectable()
@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.css']
})
export class ApplicationCardComponent implements OnInit {

  @Input('application') application: Application = null;

  constructor(
    private router: Router,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
  }

  viewApplication() {
    this.router.navigateByUrl(`application/${this.application.id}`);
  }

  toggleBookmark($event: MouseEvent) {
    this.application.bookmarked = !this.application.bookmarked;
    if (this.application.bookmarked)
      this.applicationService.bookmarkApplication(this.application.id)
    else 
      this.applicationService.unBookmarkApplication(this.application.id)
    $event.stopPropagation();
  }

  

}
