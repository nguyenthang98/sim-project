import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SimLoginComponent } from "../../components/sim-login/sim-login.component";
import { SimPageNotFoundComponent } from "../../components/sim-page-not-found/sim-page-not-found.component";
import { SimAuthGuard } from "../../sim-auth.guard";
import { SimMainLayoutComponent } from "../../components/sim-main-layout/sim-main-layout.component";

const routes: Routes = [
	{ path: "", component: SimMainLayoutComponent, canActivate: [SimAuthGuard] },
	{ path: "login", component: SimLoginComponent },
	{ path: "**", component: SimPageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
export const RoutingComponents = [
	SimLoginComponent,
	SimPageNotFoundComponent,
	SimMainLayoutComponent
];
