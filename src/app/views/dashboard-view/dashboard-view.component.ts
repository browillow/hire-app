import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {

  applications: Application[] = [];

  constructor( private applicationService: ApplicationService) { }

  ngOnInit() {
    this.applicationService.getApplications().subscribe(applications => this.applications = applications)
  }

}
