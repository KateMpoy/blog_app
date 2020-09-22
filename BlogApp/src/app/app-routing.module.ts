import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'newCategory', component: NewCategoryComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
