import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { Subscription } from 'rxjs';
import { Experience } from '../../enums/experience.enum';
import { Day } from '../../enums/day.enum';
import { Availability } from '../../enums/availability.enum';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit, OnDestroy {

  application: Application = null;
  paramsSubscription: Subscription;
  experience: string;
  availability: { day: string, availability: string }[] = [];

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private applicationService: ApplicationService
    ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      let applicationId = parseInt(params['id']);
      this.applicationService.getApplication(applicationId).subscribe(application => {
        this.application = application;
        this.experience = Experience[application.experience];
        Object.keys(application.availability).forEach(day => {
          this.availability.push({
            day: Day[day],
            availability: Availability[application.availability[day]]
          });
        });
      });
    });
  }

  goToDashboard() {
    this.router.navigateByUrl(`dashboard`);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
