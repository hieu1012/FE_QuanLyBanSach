import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellModule } from '@emi/features-admin/shared/shell';

import { AppComponent } from './app.component';
;

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // Your modules
    ShellModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
