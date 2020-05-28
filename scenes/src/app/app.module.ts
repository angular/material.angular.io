import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MAT_DATEPICKER_SCROLL_STRATEGY} from '@angular/material/datepicker';
import {CdkScrollableModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDialogModule,
    CdkScrollableModule
  ],
  providers: [{provide: MAT_DATEPICKER_SCROLL_STRATEGY, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
