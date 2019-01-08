import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application.model';
import { Observable } from 'rxjs';

@Injectable()
export class ApplicationService {

    private baseUrl: string;

    constructor(private http: HttpClient) {
        let port = (location.port !== "") ? `:${location.port}` : '';
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}${port}`;
    }

    getApplications() {
        return this.http.get<Application[]>(`${this.baseUrl}/assets/applications.json`);
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

    
}