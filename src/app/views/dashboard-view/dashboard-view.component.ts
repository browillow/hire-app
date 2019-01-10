import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { ApplicationSortMethod } from '../../enums/application-sort-method.enum';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {

  applications: Application[] = [];
  allApplications: Application[] = [];
  selectedSortMethod: ApplicationSortMethod;
  sortMethods: ApplicationSortMethod[] = [];
  sorters: {[sortMethod: string]: (a: Application, b: Application) => number } = {};
  showOnlyBookmarks: boolean;

  constructor( 
    private router: Router,
    private applicationService: ApplicationService,
    private storageService: StorageService
  ) { 
    let storedSortMethod = this.storageService.getDashboardSortingMethod();
    let storedShowOnlyBookmarksFilter = this.storageService.getShowOnlyBookmarksFilter();
    this.selectedSortMethod = (storedSortMethod != null) ? storedSortMethod : ApplicationSortMethod.Newest;
    this.showOnlyBookmarks = (storedShowOnlyBookmarksFilter != null) ? storedShowOnlyBookmarksFilter : false;
  }

  ngOnInit() {
    this.generateSortMethods();
    this.defineSorters();
    this.applicationService.getApplications().subscribe(applications => {
      this.allApplications = applications;
      this.applications = this.filterApplications(this.allApplications);
      this.sortApplications();
    });
  }

  viewApplication(applicationId: number) {
    this.router.navigateByUrl(`application/${applicationId}`);
  }

  private generateSortMethods() {
    for (const key in ApplicationSortMethod) {
      this.sortMethods.push(ApplicationSortMethod[key] as ApplicationSortMethod);
    }
  }

  // TODO: Move these sorter funtions into a separate service
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
    this.storageService.setDashboardSortingMethod(this.selectedSortMethod);
    let sorter = this.sorters[this.selectedSortMethod];
    this.applications.sort(sorter);
  }

  applyFilters() {
    this.storageService.setShowOnlyBookmarksFilter(this.showOnlyBookmarks);
    this.applications = this.filterApplications(this.allApplications);
    this.sortApplications();
  }

  filterApplications(apps: Application[]): Application[] {
    return apps.filter(app => !this.showOnlyBookmarks || app.bookmarked);
  }

}
