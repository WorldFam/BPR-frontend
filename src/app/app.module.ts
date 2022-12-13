import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { Auth0LoginComponent } from './pages/auth0-login/auth0-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialExampleModule} from '../material.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { FilterOptComponent } from './components/filter-opt/filter-opt.component';
import { FilterDateComponent } from './components/filter-date/filter-date.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import {MatSelectInfiniteScrollModule} from 'ng-mat-select-infinite-scroll';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoadingComponent,
    ErrorComponent,
    Auth0LoginComponent,
    DashboardComponent,
    FilterOptComponent,
    FilterDateComponent,
    HeaderComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    HighlightModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSelectInfiniteScrollModule,
    AuthModule.forRoot({
      ...env.auth
    }),
  ],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: Window,
      useValue: window,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          json: () => import('highlight.js/lib/languages/json'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
