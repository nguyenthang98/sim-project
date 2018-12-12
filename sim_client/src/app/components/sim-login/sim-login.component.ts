import { Component, OnInit } from "@angular/core";
import { SimApiService } from "../../services/sim-api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { passValidator } from "../../directives/pass-validator/pass-validator.directive";
import { MatSnackBar } from "@angular/material";
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

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
        private snackBar: MatSnackBar,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
        this.initAuthInfo();
        this.rememberAuth = false;

        const token = localStorage.getItem("token") || "";
        if (token && !jwtHelper.isTokenExpired(token)) {
            this.router.navigate(["/editor"]);
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
        this.spinner.show();
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
                // this.initHeaderOptions();
                this.simApiService.isLogin = true;
                this.router.navigate(["/editor"]);
            }
            this.spinner.hide();
        });
    }

    onRegisterButtonClicked(): void {
        this.spinner.show();
        if (this.checkValidPass) {
            this.simApiService.simRegister(this.registerForm.value).subscribe(res => {
                if (res.code !== 200) {
                    if (res.content === "USER_EXISTED") {
                        this.openSnackBar("User existed", "Close");
                    } else if (res.content === "EMAIL_EXISTED") {
                        this.openSnackBar("Email existed", "Close");
                    }
                } else {
                    this.simApiService.isLogin = true;
                    this.setUserInfo(sessionStorage, res.content);
                    // this.initHeaderOptions();
                    this.router.navigate(["/editor"]);
                }
                this.spinner.hide();
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

    // initHeaderOptions() {
    //     this.simApiService.httpOptions = {
    //         headers: new HttpHeaders({
    //             "Content-Type": "application/json",
    //             "Authorization": localStorage.getItem('token') || sessionStorage.getItem('token')
    //         })
    //     };
    // }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 5000,
            horizontalPosition: "end"
        });
    }
}