import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  isLogin: boolean = false;
  blogName: string;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {

  }

  ngOnInit() {
    this.isUserLogin();
  }

  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this._router.navigate(['profile']);
    }
  }

  logout() {
    this._auth.clearStorage();
    this._router.navigate(['login']);
  }

  viewCategories() {
    this._router.navigate(['categories']);
  }

  viewPosts() {
    this._router.navigate(['login']);
  }

}
