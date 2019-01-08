import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../../models/application.model';

@Injectable()
@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.css']
})
export class ApplicationCardComponent implements OnInit {

  @Input('application') application: Application = null;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewApplication() {
    this.router.navigateByUrl(`application/${this.application.id}`);
  }

}
