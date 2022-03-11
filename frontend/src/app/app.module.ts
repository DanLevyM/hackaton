import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AboutUsComponent } from './about-us/about-us.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './shared/services/auth.service';
import { ContactComponent } from './contact/contact.component';
import { ContactService } from './shared/services/contact.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataComponent } from './data/data.component';
import { DataService } from './shared/services/data.service';
import { DataTechnoComponent } from './data-techno/data-techno.component';
import { Error404Component } from './error404/error404.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordService } from './shared/services/forgot-password.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './progress/progress.component';
import { UploadFileDirective } from './shared/directives/uploadFile.directive';

@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    ContactComponent,
    DashboardComponent,
    DataComponent,
    DataTechnoComponent,
    Error404Component,
    ForgotPasswordComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ProgressComponent,
    UploadFileDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, ForgotPasswordService, ContactService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
