import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
})
export class NewCategoryComponent implements OnInit {
  isLogin: boolean = false;
  errorMessage;
  x;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.x = this._auth.getBlogDetails();
    console.log(this.x)
  }

  onSubmit(form: NgForm) {
    // console.log('Your form data : ', form.value);
    // this._api.postTypeRequest('user/addCategory', form.value).subscribe(
    //   (res: any) => {
    //     if (res.status) {
    //       console.log(res);
    //       this._auth.setDataInLocalStorage(
    //         'userData',
    //         JSON.stringify(res.data)
    //       );
    //       this._auth.setDataInLocalStorage('token', res.token);

    //     } else {
    //       console.log(res);
    //       alert(res.msg);
    //     }
    //   },
    //   (err) => {
    //     this.errorMessage = err['error'].message;
    //   }
    // );
  }
}
