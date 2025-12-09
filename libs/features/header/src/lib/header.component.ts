// import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService, AuthUser, AuthResponse, UserRole } from '@emi/features-admin/shared/data-access';
//
// @Component({
//   selector       : 'emi-header',
//   templateUrl    : './header.component.html',
//   styleUrls      : ['./header.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class HeaderComponent implements OnInit {
//   @HostListener('window:scroll', [])
//
//   showScrollTopBtn = false;
//
//   isLoggedIn = false;
//   currentUser: AuthUser | null = null;
//
//   constructor(private router: Router, private authService: AuthService) {
//   }
//
//   ngOnInit(): void {
//     this.isLoggedIn = this.authService.isLoggedIn();
//     this.currentUser = this.authService.getCurrentUser();
//   }
//
//   logout() {
//     this.authService.logout();
//   }
//
//   scrollToTop() {
//     window.scrollTo({top: 0, behavior: 'smooth'});
//   }
//
//   isActive(path: string): boolean {
//     // Kiểm tra nếu router.url bắt đầu bằng path
//     return this.router.url.startsWith(path);
//   }
// }


import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthUser, CartService } from '@emi/features/shared/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'emi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  showScrollTopBtn = false;

  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<AuthUser | null>;

  cartQuantity$ = this.cartService.cartQuantity$;
  cartItems$ = this.cartService.cartItems$;

  constructor(private router: Router, public authService: AuthService, private cartService: CartService,) {
    this.isLoggedIn$ = this.authService.loggedIn$;
    this.currentUser$ = this.authService.user$;
    this.cartService.refreshCart();
  }

  logout() {
    this.authService.logout();
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }
}
