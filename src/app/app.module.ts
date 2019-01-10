import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';

import { ApplicationService } from './services/application.service';
import { StorageService } from './services/storage.service';

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
    FormsModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatExpansionModule,
    MatCheckboxModule,
    AppRoutingModule
  ],
  providers: [
    ApplicationService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
