import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application.model';
import { Observable } from 'rxjs';
import { map, tap} from 'rxjs/operators';

@Injectable()
export class ApplicationService {

    private baseUrl: string;
    private applications: Application[] = null;
    private bookmarksStorageKey = "bookmarks";

    constructor(private http: HttpClient) {
        let port = (location.port !== "") ? `:${location.port}` : '';
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}${port}`;
    }

    getApplications() {
        let appsObservable = new Observable<Application[]>((observer) => {
            if (this.applications != null) {
                observer.next(this.applications);
                observer.complete();
            } else {
                this.http.get<Application[]>(`${this.baseUrl}/assets/applications.json`)
                .pipe(
                    map(applications => this.rememberBookmarks(applications)),
                    tap(applications => this.cacheApplications(applications))
                ).subscribe(applications => {
                    observer.next(applications);
                    observer.complete();
                });
            }
        });
        return appsObservable;
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

    rememberBookmarks(applications: Application[]): Application[] {
        let bookmarksJson = localStorage.getItem(this.bookmarksStorageKey);
        if (bookmarksJson != null) {
            let bookmarks: number[] = JSON.parse(bookmarksJson);
            applications.forEach(application => {
                application.bookmarked = bookmarks.indexOf(application.id) > -1;
            });
        }
        return applications;
    }

    bookmarkApplication(applicationId: number) {
        let bookmarksJson = localStorage.getItem(this.bookmarksStorageKey);
        let bookmarks: number[] = (bookmarksJson != null) ? JSON.parse(bookmarksJson) : [];
        if (bookmarks.indexOf(applicationId) === -1) {
            bookmarks.push(applicationId);
            localStorage.setItem(this.bookmarksStorageKey, JSON.stringify(bookmarks));
        }
    }

    unBookmarkApplication(applicationId: number) {
        let bookmarksJson = localStorage.getItem(this.bookmarksStorageKey);
        let bookmarks: number[] = (bookmarksJson != null) ? JSON.parse(bookmarksJson) : [];
        bookmarks = bookmarks.filter(id => id !== applicationId);
        localStorage.setItem(this.bookmarksStorageKey, JSON.stringify(bookmarks));
    }
}