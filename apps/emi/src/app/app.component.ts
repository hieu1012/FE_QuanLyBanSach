import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'emi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'emi';

  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: true // chỉ chạy 1 lần khi cuộn tới
    });
  }
}
