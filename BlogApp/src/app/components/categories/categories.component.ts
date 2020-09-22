import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  isLogin: boolean = false;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {

  }

  logout() {
    this._auth.clearStorage();
    this._router.navigate(['login']);
  }

  viewCategories() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this._router.navigate(['categories']);
    }
  }

  viewPosts() {
    this._router.navigate(['']);
  }

}
