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

  dropdownSettings:IDropdownSettings ={
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
 };
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
    console.log(this.x);

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];

  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit(form: NgForm) {
    form.value.blogId = this.x[0].blogId;
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
