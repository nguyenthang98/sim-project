import { Injectable } from "@angular/core";
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse
} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

const httpOptions = {
	headers: new HttpHeaders({
		"Content-Type": "application/json",
		Authorization:
		localStorage.getItem("token") || sessionStorage.getItem("token")
	})
};
const baseURL = "http://localhost:3000";

@Injectable({
	providedIn: "root"
})
export class SimApiService {
	constructor(private httpClient: HttpClient) {}

	getTestApi(): Observable<any> {
		return this.httpClient.get(`${baseURL}/test`, httpOptions).pipe(
			map(this.extractData),
			catchError(this.handleError)
		);
	}

	simLogin(payload: any): Observable<any> {
		return this.httpClient.post(`${baseURL}/auth/login`, payload);
	}

	simRegister(payload: any): Observable<any> {
		return this.httpClient.post(baseURL + "/auth/register", payload);
	}

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error("An error occurred:", error.error.message);
		} else {
			console.error(
				`Backend returned code ${error.status}, ` + `body was: ${error.error}`
			);
		}
		return throwError("Something bad happened; please try again later.");
	}

	private extractData(res: Response) {
		let body = res;
		return body || {};
	}
}
