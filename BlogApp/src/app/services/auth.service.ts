import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  getUserDetails() {
    return localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : null;
  }

  getBlogDetails() {
    return localStorage.getItem('blogData')
      ? JSON.parse(localStorage.getItem('blogData'))
      : null;
  }

  getCategoryDetails() {
    return localStorage.getItem('categoryData')
      ? JSON.parse(localStorage.getItem('categoryData'))
      : null;
  }

  getPostViewDetails() {
    return localStorage.getItem('postViewData')
      ? JSON.parse(localStorage.getItem('postViewData'))
      : null;
  }

  getPostDetails() {
    return localStorage.getItem('PostData')
      ? JSON.parse(localStorage.getItem('PostData'))
      : null;
  }
  setDataInLocalStorage(variableName, data) {
    localStorage.setItem(variableName, data);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  clearStorage() {
    localStorage.clear();
  }
}
