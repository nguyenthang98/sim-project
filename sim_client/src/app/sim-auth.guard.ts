import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SimApiService } from './services/sim-api.service';

@Injectable({
  providedIn: 'root'
})
export class SimAuthGuard implements CanActivate {
  constructor(private simApiService: SimApiService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log({ next, state });
      this.router.navigate(["/authentication"]);
      return false;
  }
}
