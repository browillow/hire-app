import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application.model';
import { Observable } from 'rxjs';
import { map, tap} from 'rxjs/operators';

@Injectable()
export class ApplicationService {

    private baseUrl: string;
    private applications: Application[] = [];

    constructor(private http: HttpClient) {
        let port = (location.port !== "") ? `:${location.port}` : '';
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}${port}`;
    }

    getApplications() {
        return this.http.get<Application[]>(`${this.baseUrl}/assets/applications.json`)
            .pipe(
                map(applications => this.rememberBookmarks(applications)),
                tap(applications => this.cacheApplications(applications))
            );
    }

    rememberBookmarks(applications: Application[]): Application[] {
        // TODO: Look in local storage for the ids of applications that have been bookmarked
        return applications;
    }

    cacheApplications(applications: Application[]) {
        this.applications = applications;
    }

    getApplication(id: number) {
        let appObservable = new Observable<Application>((observer) => {
            this.getApplications().subscribe(apps => {
                let result: Application = null;
                apps.forEach(app => {
                    if (app.id === id) {
                        result = app;
                    }
                });
                observer.next(result);
                observer.complete();
            });
        });
        return appObservable;
    }

    bookmarkApplication(id: number) {
        // TODO: Save application id in bookmarks collection in local storage
    }
}