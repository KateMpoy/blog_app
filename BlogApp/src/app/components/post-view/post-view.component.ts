import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css'],
})
export class PostViewComponent implements OnInit {
  title;
  body;
  date;
  categories;
  errorMessage;
  rowData = [];

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    let x = this._auth.getPostViewDetails();
    console.log(x);
    this.title = x[0].title;
    this.body = x[0].body;
    this.date = x[0].postDate.substring(0, 10);

    this._api.postTypeRequest('user/getCategoriesofPost', x[0]).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this.categories = res.data;

          this.categories.forEach(element => {
            this._api.postTypeRequest('user/getCategories2', element).subscribe(
              (res: any) => {
                res.status && (this.rowData =[...this.rowData,res.data[0]] , console.log(this.rowData));
              },
              (err) => {
                this.errorMessage = err['error'].message;
              }
            );
          });
        }
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );


  }
}
