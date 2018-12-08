import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimApiService } from 'src/app/services/sim-api.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './app-nav-bar.component.html',
  styleUrls: ['./app-nav-bar.component.css']
})
export class AppNavBarComponent implements OnInit {
  localUrl: string;
  avatarUrl: string;

  constructor(private router: Router, private simApiService: SimApiService) { }

  ngOnInit() {
    this.localUrl = 'http://localhost:3000';
    this.localUrl = '';
    this.avatarUrl = `${this.localUrl}/${localStorage.avatar || sessionStorage.avatar}`;
  }

  goToUserCollection() {
    this.router.navigate(["/user-collection"]);
  }

  logout() {
    this.simApiService.isLogin = false;
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
