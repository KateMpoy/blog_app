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
  rowData;
  errorMessage;
  searchText;

  columnDefs = [
    { headerName: 'ID', field: 'postId' },
    { headerName: 'Title', field: 'title', editable: true },
    { headerName: 'Description', field: 'body', editable: true },
    { headerName: 'Category', field: 'categoryId', editable: true },
    { checkboxSelection: true },
  ];

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {

  }

  ngOnInit() {
    this.isUserLogin()
    let x = this._auth.getBlogDetails();
    
    this._api.postTypeRequest('user/getPosts', x[0]).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this.rowData = res.data;
        }
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );
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
    this._router.navigate(['posts']);
  }

  search() {

    let x = this._auth.getBlogDetails();
    x[0].searchText = this.searchText
    console.log( this.searchText)
    this._api.postTypeRequest('user/search', x[0]).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this.rowData = res.data;
        }
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );
    
  }

}
