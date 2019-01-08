import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';
import { ApplicationViewComponent } from './views/application-view/application-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardViewComponent,
    ApplicationViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
