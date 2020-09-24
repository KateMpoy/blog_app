import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  isLogin: boolean = false;
  rowData;
  errorMessage;

  columnDefs = [
    { headerName: 'ID', field: 'categoryid' },
    { headerName: 'Name', field: 'categoryName', editable: true },
    { headerName: 'Description', field: 'catDescription', editable: true },
    { checkboxSelection: true },
  ];
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    let x = this._auth.getUserDetails();

    this._api.postTypeRequest('user/getCategories', x[0]).subscribe(
      (res: any) => {
        res.status && (this.rowData = res.data);
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

  NewCategory() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this._router.navigate(['newCategory']);
    }
  }

  deleteRow() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    console.log(selectedData);

    this._api.postTypeRequest('user/deleteCategory', selectedData[0]).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this.ngOnInit();
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

    this._api.postTypeRequest('user/saveCategory', selectedData[0]).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this.ngOnInit();
        }
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );
  }
}
