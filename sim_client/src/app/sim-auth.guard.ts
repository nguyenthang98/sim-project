import { Injectable } from "@angular/core";
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router
} from "@angular/router";
import { Observable } from "rxjs";
import { SimApiService } from "./services/sim-api.service";
import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelper = new JwtHelperService();

@Injectable({
	providedIn: "root"
})
export class SimAuthGuard implements CanActivate {
	constructor(private simApiService: SimApiService, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		// return true;
		console.log({ next, state });

		const token =
			localStorage.getItem("token") || sessionStorage.getItem("token");
		if (token && !jwtHelper.isTokenExpired(token)) {
			return true;
		}
		this.router.navigate(["/login"]);
		return false;
	}
}
