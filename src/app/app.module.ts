import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { ApplicationService } from './services/application.service';

import { AppComponent } from './app.component';
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';
import { ApplicationViewComponent } from './views/application-view/application-view.component';
import { ApplicationCardComponent } from './components/application-card/application-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardViewComponent,
    ApplicationViewComponent,
    ApplicationCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ApplicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
