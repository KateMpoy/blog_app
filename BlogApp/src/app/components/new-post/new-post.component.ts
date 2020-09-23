import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

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

    form.value.blogId = this.x[0].blogId
    console.log('Category data : ', form.value);
    this._api.postTypeRequest('user/addCategory', form.value).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this._auth.setDataInLocalStorage(
            'categoryData',
            JSON.stringify(res.data)
          );
          this._router.navigate(['categories']);
        } else {
          console.log(res);
          alert(res.msg);
        }
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );
  }

}
