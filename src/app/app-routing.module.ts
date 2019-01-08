import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationViewComponent } from './views/application-view/application-view.component';
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardViewComponent },
    { path: 'application/:id', component: ApplicationViewComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule{}