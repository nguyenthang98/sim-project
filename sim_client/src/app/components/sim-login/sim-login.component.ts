import { Component, OnInit } from "@angular/core";
import { SimApiService } from "../../services/sim-api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { passValidator } from "../../directives/pass-validator/pass-validator.directive";
import { MatSnackBar } from "@angular/material";

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

    loginForm: FormGroup;
    registerForm: FormGroup;

    constructor(
        private simApiService: SimApiService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.initAuthInfo();
        this.rememberAuth = false;

        const token = localStorage.getItem("token") || "";
        if (token && !jwtHelper.isTokenExpired(token)) {
            this.router.navigate(["/"]);
        }
    }

    initAuthInfo(): void {
        this.checkValidPass = true;
        this.loginForm = new FormGroup({
            username: new FormControl("", [Validators.required]),
            password: new FormControl("", [])
        });

        this.registerForm = new FormGroup({
            username: new FormControl("", [Validators.required]),
            password: new FormControl("", [Validators.required]),
            email: new FormControl("", [Validators.required, Validators.email]),
            confirmPassword: new FormControl("", [
                Validators.required,
                passValidator("password")
            ])
        });
    }

    changeCurrentSession(sessionCode: number): void {
        this.initAuthInfo();
        this.currentSession = sessionCode;
    }

    onLoginButtonClicked(): void {
        this.simApiService.simLogin(this.loginForm.value).subscribe(res => {
            if (res.code !== 200) {
                this.openSnackBar("Username or Password is incorrect", "Close");
            } else {
                if (this.rememberAuth) {
                    this.setUserInfo(localStorage, res.content);
                } else {
                    localStorage.clear();
                    this.setUserInfo(sessionStorage, res.content);
                }
                this.router.navigate(["/"]);
            }
        });
    }

    onRegisterButtonClicked(): void {
        if (this.checkValidPass) {
            this.simApiService.simRegister(this.registerForm.value).subscribe(res => {
                if (res.code !== 200) {
                    if (res.content === "USER_EXISTED") {
                        this.openSnackBar("User existed", "Close");
                    } else if (res.content === "EMAIL_EXISTED") {
                        this.openSnackBar("Email existed", "Close");
                    }
                } else {
                    this.setUserInfo(sessionStorage, res.content);
                    this.router.navigate(["/"]);
                }
            });
        }
    }

    private setUserInfo(storage: any, data: any) {
        storage.setItem("token", data.token);
        storage.setItem("idUser", data.idUser);
        storage.setItem("username", data.username);
        storage.setItem("avatar", data.avatar);
    }

    getErrorMessage(form: string, field: string) {
        return this[form].get(field).hasError("required")
            ? "You must enter a value"
            : this[form].get(field).hasError("email")
                ? "Not a valid email"
                : this[form].get(field).hasError("passValidator")
                    ? "Password does not match"
                    : "";
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 5000,
            horizontalPosition: "end"
        });
    }
}