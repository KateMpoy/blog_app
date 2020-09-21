import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [AppComponent, SigninComponent, SignupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports : [
    SigninComponent, 
    SignupComponent
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
