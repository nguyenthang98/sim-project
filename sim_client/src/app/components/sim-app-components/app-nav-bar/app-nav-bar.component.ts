import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const localUrl = 'http://localhost:3000';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './app-nav-bar.component.html',
  styleUrls: ['./app-nav-bar.component.css']
})
export class AppNavBarComponent implements OnInit {
  avatarUrl: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.avatarUrl = `/${localStorage.avatar || sessionStorage.avatar}`;
    // this.avatarUrl = `${localUrl}/${localStorage.avatar || sessionStorage.avatar}`;
  }

  goToUserCollection() {
    this.router.navigate(["/user-collection"]);
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
