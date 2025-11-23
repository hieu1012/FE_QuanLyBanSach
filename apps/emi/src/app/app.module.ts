import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import { HeaderModule } from '@emi/features/header';
import { FooterModule } from '@emi/features/footer';
import { ShellModule } from '@emi/features/shell';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // Your modules
    ShellModule,
    HeaderModule,
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }