import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  isLogin: boolean = false;
  rowData;
  errorMessage;

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
  ) {}

  ngOnInit() {
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

  logout() {
    this._auth.clearStorage();
    this._router.navigate(['login']);
  }

  profile() {
    
    this._router.navigate(['profile']);
  }

  NewPost() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this._router.navigate(['newPost']);
    }
  }

  deleteRow() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    console.log(selectedData);

    this._api.postTypeRequest('user/deletePost', selectedData[0]).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this.ngOnInit()
        }
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );
  }

  saveRow() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    console.log(selectedData);

    this._api.postTypeRequest('user/savePost', selectedData[0]).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this.ngOnInit()
        }
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );
  }

}
