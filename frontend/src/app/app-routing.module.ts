import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutUsComponent } from './about-us/about-us.component';
import { AuthGuard } from './shared/services/auth.guard';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataComponent } from './data/data.component';
import { DataTechnoComponent } from './data-techno/data-techno.component';
import { Error404Component } from './error404/error404.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RedirectGuard } from './shared/services/redirect.guard';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data : {
      header: true
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectGuard],
    data : {
      header: true
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data : {
      header: false
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data : {
      header: true
    }
  },
  {
    path: 'data',
    component: DataComponent,
    data : {
      header: true
    }
  },
  {
    path: 'data-techno',
    component: DataTechnoComponent,
    data : {
      header: true
    }
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data : {
      header: true
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data : {
      header: true
    }
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data : {
      header: false
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data : {
      header: false
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data : {
      header: false
    }
  },
  {
    path: '**',
    component: Error404Component,
    data : {
      header: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }