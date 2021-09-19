import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { OptionsDialogComponent } from './dialogs/options-dialog/options-dialog.component';
import { DocDialogComponent } from './dialogs/doc-dialog/doc-dialog.component';
import { MultipleDownloadsDialogComponent } from './dialogs/multiple-downloads-dialog/multiple-downloads-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    OptionsDialogComponent,
    DocDialogComponent,
    MultipleDownloadsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
