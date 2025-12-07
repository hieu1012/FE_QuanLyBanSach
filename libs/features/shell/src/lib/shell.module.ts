import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './shell.route';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class ShellModule { }
