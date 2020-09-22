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
