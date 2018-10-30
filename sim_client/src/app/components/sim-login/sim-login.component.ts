import { Component, OnInit } from "@angular/core";
import { SimApiService } from "../../services/sim-api.service";

@Component({
	selector: "app-sim-login",
	templateUrl: "./sim-login.component.html",
	styleUrls: ["./sim-login.component.css"]
})
export class SimLoginComponent implements OnInit {
	currentSession: number;
	login: {
		username: string;
		password: string;
	};
	register: {
		username: string;
		password: string;
		passwordConfirm: string;
		email: string;
	};

	constructor(private simApiService: SimApiService) {}

	ngOnInit() {
		this.onInit();
	}

	onInit(): void {
		this.currentSession = 1;
		this.login = {
			username: "",
			password: ""
		};
		this.register = {
			username: "",
			password: "",
			passwordConfirm: "",
			email: ""
		};
	}

	changeCurrentSession(sessionCode: number): void {
		this.currentSession = sessionCode;
	}

	onLoginButtonClicked(): void {
		this.simApiService.simLogin(this.login).subscribe(res => {
			localStorage.setItem("token", res.content);
		});
	}

	onRegisterButtonClicked(): void {
		this.confirmPassword(this.register.password, this.register.passwordConfirm);
	}

	private confirmPassword(password: string, passwordConfirm: string): boolean {
		console.log("check password");
		let check = true;
		if (password !== passwordConfirm) check = false;
		return check;
	}
}
