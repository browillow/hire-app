import { Injectable } from '@angular/core';
import { ApplicationSortMethod } from '../enums/application-sort-method.enum';

@Injectable()
export class StorageService {

    private bookmarksKey = "bookmarks";
    private showOnlyBookmarksFilterKey = "showOnlyBookmarks";
    private dashboardSortingMethodKey = "dashboardSortingMethod";

    constructor() {}

    getBookmarks(): number[] {
        let bookmarks: number[] = [];
        let bookmarksJson = localStorage.getItem(this.bookmarksKey);
        if (bookmarksJson != null) {
            bookmarks = JSON.parse(bookmarksJson);
        }
        return bookmarks;
    }

    setBookmarks(bookmarks: number[]) {
        localStorage.setItem(this.bookmarksKey, JSON.stringify(bookmarks));
    }

    getShowOnlyBookmarksFilter(): boolean | null {
        let valueJson = localStorage.getItem(this.showOnlyBookmarksFilterKey);
        return (valueJson != null) ? JSON.parse(valueJson) as boolean : null;
    }

    setShowOnlyBookmarksFilter(value: boolean) {
        localStorage.setItem(this.showOnlyBookmarksFilterKey, JSON.stringify(value));
    }

    getDashboardSortingMethod(): ApplicationSortMethod | null {
        let valueJson = localStorage.getItem(this.dashboardSortingMethodKey);
        return (valueJson != null) ? JSON.parse(valueJson) as ApplicationSortMethod : null;
    }

    setDashboardSortingMethod(value: ApplicationSortMethod) {
        localStorage.setItem(this.dashboardSortingMethodKey, JSON.stringify(value));
    }
}