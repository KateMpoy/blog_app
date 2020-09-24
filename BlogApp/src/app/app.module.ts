import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CategoriesComponent } from './components/categories/categories.component';
import { AgGridModule } from 'ag-grid-angular';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { PostsComponent } from './components/posts/posts.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PostViewComponent } from './components/post-view/post-view.component';

@NgModule({
  declarations: [AppComponent, SigninComponent, SignupComponent, UserComponent, CategoriesComponent, NewCategoryComponent, PostsComponent, NewPostComponent, PostViewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  exports: [SigninComponent, SignupComponent, UserComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
