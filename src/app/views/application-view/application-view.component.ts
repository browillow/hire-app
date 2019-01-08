import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {

  application: Application = null;

  constructor() { }

  ngOnInit() {
  }

}
