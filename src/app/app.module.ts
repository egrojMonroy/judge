import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CreateProblemComponent } from './create-problem/create-problem.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NavbarComponent,
    SignUpComponent,
    CreateProblemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
