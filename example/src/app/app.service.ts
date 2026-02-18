import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PageData } from "../types";
import { PAGE_QUERY } from "../graphql/PageQuery";
import { PAGE_VARIABLES } from "../graphql/PageVariables";

import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private apiUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    getPageData(): Observable<PageData> {
        const query = {
            query: PAGE_QUERY,
            variables: PAGE_VARIABLES
        }
        return this.http.post<PageData>(this.apiUrl, query)
    }
}