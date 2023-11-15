import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TransformUrlInterceptor } from './interceptors/transform-url.interceptor';


import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { CreateUserComponent } from './components/admin/create-user/create-user.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { HomeComponent } from './components/user/home/home.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserNavComponent } from './components/user/user-nav/user-nav.component';
import { profileReducer, usersReducer } from './states/user/user.reduce';
import { UserEffects } from './states/user/user.effects';
import { AdminRoutingModule } from './components/admin/admin-login/admin.routing';


@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminNavComponent,
    CreateUserComponent,
    DashboardComponent,
    EditUserComponent,
    UsersListComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    UserLoginComponent,
    UserNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({
      userDetails:profileReducer,
      allUsers: usersReducer as any
    }),
    EffectsModule.forRoot([UserEffects]),
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:TransformUrlInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
