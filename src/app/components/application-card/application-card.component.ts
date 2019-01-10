import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { Experience } from '../../enums/experience.enum';

@Injectable()
@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.css']
})
export class ApplicationCardComponent implements OnInit {

  @Input('application') application: Application = null;
  experience: string;

  constructor(
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.experience = Experience[this.application.experience];
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
