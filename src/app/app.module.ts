import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './modules/shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { lazyLoadedData$ } from './data/json/lazy-loaded-data';
import { MovieDTOJson } from './models';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HeaderComponent,
    LandingPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [{ provide: MovieDTOJson, useValue: { data$: lazyLoadedData$ } }],
  bootstrap: [AppComponent],
})
export class AppModule {}
