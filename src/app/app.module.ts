import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { GuardianGuard } from './service/guardian.guard';
import { UserComponent } from './components/user-container/user/user.component';
import { AddUserComponent } from './components/user-container/add-user/add-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyModule } from 'ngx-currency';
import { UserReportComponent } from './components/user-container/add-user-report/user-report.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

export const appRouters: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [GuardianGuard] },
  { path: 'users', component: UserComponent, canActivate: [GuardianGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [GuardianGuard] },
  { path: 'add-user/:uuid', component: AddUserComponent, canActivate: [GuardianGuard] },
  { path: 'user-report', component: UserReportComponent, canActivate: [GuardianGuard] },
  { path: 'chart', component: BarChartComponent, canActivate: [GuardianGuard] }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

export const optionsMask: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    AddUserComponent,
    UserReportComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask),
    NgxPaginationModule,
    NgbModule,
    NgxCurrencyModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
