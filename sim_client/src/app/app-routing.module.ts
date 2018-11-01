import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SimLoginComponent } from "./components/sim-login/sim-login.component";
import { SimPageNotFoundComponent } from "./components/sim-page-not-found/sim-page-not-found.component";
import { SimAuthGuard } from "./sim-auth.guard";
import { SimDemoComponent } from "./components/sim-demo/sim-demo.component";
import { SimMainLayoutComponent } from "./components/sim-main-layout/sim-main-layout.component";

const routes: Routes = [
	{ path: "", component: SimMainLayoutComponent, canActivate: [SimAuthGuard] },
	{ path: "login", component: SimLoginComponent },
	{ path: "demo", component: SimDemoComponent },
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
	SimMainLayoutComponent,
	SimDemoComponent
];
