import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '@emi/features-admin/shared/data-access';

@Component({
  selector: 'emi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  isCollapsed = false;

  pageTitle = '';

  userName = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.data['title'] ?? '';
        })
      )
      .subscribe((title) => {
        this.pageTitle = title;
      });
  }

  ngOnInit(): void {
    console.log('user',this.authService.getCurrentUser());
    this.userName = this.authService.getCurrentUser()?.username;
  }

  logout() {
    this.authService.logout();
  }

}
