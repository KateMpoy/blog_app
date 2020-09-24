import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'categoryid',
    textField: 'categoryName',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
  };
  isLogin: boolean = false;
  errorMessage;
  x;
  y;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.x = this._auth.getBlogDetails();
    this.y = this._auth.getUserDetails();
    console.log(this.x);

    this._api.postTypeRequest('user/getCategories', this.y[0]).subscribe(
      (res: any) => {
        res.status && (this.dropdownList = res.data);
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit(form: NgForm) {
  
    form.value.blogId = this.x[0].blogId
    console.log('POST data : ', form.value);
    this._api.postTypeRequest('user/addPost', form.value).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this._auth.setDataInLocalStorage(
            'postData',
            JSON.stringify(res.data)
          );
          this._router.navigate(['posts']);
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
