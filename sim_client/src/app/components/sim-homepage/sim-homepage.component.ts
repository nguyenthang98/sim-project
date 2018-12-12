import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-sim-home',
  templateUrl: './sim-homepage.component.html',
  styleUrls: ['./sim-homepage.component.css']
})
export class SimHome implements OnInit {
    isLogin: boolean;
    constructor(private httpClient: HttpClient) {
        let token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
    }

    ngOnInit() {
    }

}
