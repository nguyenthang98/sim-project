import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {SimHome} from "../../components/sim-homepage/sim-homepage.component";
import { SimLoginComponent } from "../../components/sim-login/sim-login.component";
import { SimPageNotFoundComponent } from "../../components/sim-page-not-found/sim-page-not-found.component";
import { SimAuthGuard } from "../../sim-auth.guard";
import { SimMainLayoutComponent } from "../../components/sim-main-layout/sim-main-layout.component";
import { SimUserCollectionComponent } from "../../components/sim-user-collection/sim-user-collection.component";

const routes: Routes = [
	{ path: "editor/:idProject", component: SimMainLayoutComponent, canActivate: [SimAuthGuard] },
	{ path: "editor", component: SimMainLayoutComponent, canActivate: [SimAuthGuard] },
	{ path: "login", component: SimLoginComponent },
	{
		path: "user-collection",
		component: SimUserCollectionComponent,
		canActivate: [SimAuthGuard]
	},
	{path:"",component:SimHome},
	{ path: "**", component: SimPageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
	SimLoginComponent,
	SimPageNotFoundComponent,
	SimMainLayoutComponent,
	SimHome
];
