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
  rowData;
  errorMessage;

  columnDefs = [
    {field: 'categoryName' },
    {field: 'catDescription' }
];
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {

    let x =this._auth.getUserDetails()
    console.log("id", x)
    this.rowData = x
    this._api.postTypeRequest('user/getCategories', x[0]).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this._auth.setDataInLocalStorage(
            'userData',
            JSON.stringify(res.data)
          );
          this._auth.setDataInLocalStorage('token', res.token);
        } else {
        }
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );
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
