import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { ApplicationSortMethod } from '../../enums/application-sort-method.enum';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {

  applications: Application[] = [];
  selectedSortMethod: ApplicationSortMethod = ApplicationSortMethod.Newest;
  sortMethods: ApplicationSortMethod[] = [];
  sorters: {[sortMethod: string]: (a: Application, b: Application) => number } = {};

  constructor( private applicationService: ApplicationService) { }

  ngOnInit() {
    this.generateSortMethods();
    this.defineSorters();
    this.applicationService.getApplications().subscribe(applications => {
      this.applications = applications;
      this.sortApplications();
    });
  }
  
  // Application Sorting

  private generateSortMethods() {
    for (const key in ApplicationSortMethod) {
      this.sortMethods.push(ApplicationSortMethod[key] as ApplicationSortMethod);
    }
  }

  defineSorters() {

    this.sorters[ApplicationSortMethod.Newest] = function(a: Application, b: Application): number {
      let appliedDateA = new Date(a.applied);
      let appliedDateB = new Date(b.applied);
      let datesAreSame = appliedDateA.getTime() === appliedDateB.getTime();
      if (datesAreSame)
        return 0;
      if (appliedDateA > appliedDateB)
        return -1;
      if (appliedDateB > appliedDateA)
        return 1;
    };

    this.sorters[ApplicationSortMethod.Oldest] = function(a: Application, b: Application): number {
      let appliedDateA = new Date(a.applied);
      let appliedDateB = new Date(b.applied);
      let datesAreSame = appliedDateA.getTime() === appliedDateB.getTime();
      if (datesAreSame)
        return 0;
      if (appliedDateA < appliedDateB)
        return -1;
      if (appliedDateB < appliedDateA)
        return 1;
    };
    this.sorters[ApplicationSortMethod.MostExperience] = function(a: Application, b: Application): number {
      return b.experience - a.experience;
    };
    this.sorters[ApplicationSortMethod.LeastExperience] = function(a: Application, b: Application): number {
      return a.experience - b.experience;
    };
  }

  sortApplications() {
    let sorter = this.sorters[this.selectedSortMethod];
    this.applications.sort(sorter);
  }

}
