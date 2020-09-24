import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  isLogin: boolean = false;
  errorMessage;
  x;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}
  ngOnInit() {
    this.isUserLogin();
  }
  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this._api.postTypeRequest('user/login', form.value).subscribe(
      (res: any) => {
        if (res.data.length !== 0) {
          console.log(res);
          this.x = res.data
          this._auth.setDataInLocalStorage(
            'userData',
            JSON.stringify(res.data)
          );
          this._auth.setDataInLocalStorage('token', res.token);
          this.getBlog()
          this._router.navigate(['profile']);
        } else {
          alert('Invalid Credentials')
        }
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );
   

  }
  isUserLogin() {
    console.log(this._auth.getUserDetails());
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
     
    }
  }

  getBlog(){

    this._api.postTypeRequest('user/getBlog', this.x[0]).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this._auth.setDataInLocalStorage(
            'blogData',
            JSON.stringify(res.data)
          );
          this._router.navigate(['profile']);
        } else {
        }
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );
  }
}
