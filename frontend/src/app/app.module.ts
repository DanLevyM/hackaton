import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AboutUsComponent } from './about-us/about-us.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './shared/services/auth.service';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataComponent } from './data/data.component';
import { Error404Component } from './error404/error404.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    ContactComponent,
    DashboardComponent,
    DataComponent,
    Error404Component,
    FooterComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
