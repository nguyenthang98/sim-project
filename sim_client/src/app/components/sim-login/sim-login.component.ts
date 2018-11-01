import { Component, OnInit } from "@angular/core";
import { SimApiService } from "../../services/sim-api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelper = new JwtHelperService();

@Component({
	selector: "app-sim-login",
	templateUrl: "./sim-login.component.html",
	styleUrls: ["./sim-login.component.css"]
})
export class SimLoginComponent implements OnInit {
	currentSession: number;
	rememberAuth: boolean;
	checkValidPass: boolean;
	isLogin: boolean;
	isRegister: string;

	loginForm: FormGroup;
	registerForm: FormGroup;

	constructor(private simApiService: SimApiService, private router: Router) {}

	ngOnInit() {
		this.initAuthInfo();
		this.rememberAuth = false;

		const token = localStorage.getItem("token") || "";
		if (token && !jwtHelper.isTokenExpired(token)) {
			this.router.navigate(["/"]);
		}
	}

	initAuthInfo(): void {
		this.isLogin = true;
		this.isRegister = "ok";
		this.checkValidPass = true;
		this.loginForm = new FormGroup({
			username: new FormControl("", [Validators.required]),
			password: new FormControl("", [])
		});

		this.registerForm = new FormGroup({
			username: new FormControl("", [Validators.required]),
			password: new FormControl("", [
				Validators.required,
				Validators.minLength(6)
			]),
			email: new FormControl("", [Validators.required, Validators.email]),
			passwordConfirm: new FormControl("", [Validators.required])
		});
	}

	changeCurrentSession(sessionCode: number): void {
		this.initAuthInfo();
		this.currentSession = sessionCode;
	}

	onLoginButtonClicked(): void {
		this.simApiService.simLogin(this.loginForm.value).subscribe(res => {
			if (res.code !== 200) {
				this.isLogin = false;
			} else {
				this.isLogin = true;
				if (this.rememberAuth) {
					localStorage.setItem("token", res.content);
				} else {
					localStorage.clear();
					sessionStorage.setItem("token", res.content);
				}
				this.router.navigate(["/"]);
			}
		});
	}

	onRegisterButtonClicked(): void {
		this.checkValidPass = this.confirmPassword(
			this.registerForm.value.password,
			this.registerForm.value.passwordConfirm
		);
		if (this.checkValidPass) {
			this.simApiService.simRegister(this.registerForm.value).subscribe(res => {
				if (res.code !== 200) {
					if (res.content === "USER_EXISTED") {
						this.isRegister = "user";
					} else if (res.content === "EMAIL_EXISTED") {
						this.isRegister = "email";
					}
				} else {
					this.isRegister = "ok";
					sessionStorage.setItem("token", res.content);
					this.router.navigate(["/"]);
				}
			});
		}
	}

	confirmPassword(password: string, passwordConfirm: string): boolean {
		let check = true;
		if (password !== passwordConfirm) check = false;
		return check;
	}
}
