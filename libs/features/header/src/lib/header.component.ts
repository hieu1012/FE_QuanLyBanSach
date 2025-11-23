import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'emi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  hideTopbar = false;
  showScrollTopBtn = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.hideTopbar = scrollY > 60;
    this.showScrollTopBtn = scrollY > 250;

  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isActive(path: string): boolean {
    // Kiểm tra nếu router.url bắt đầu bằng path
    return this.router.url.startsWith(path);
  }

  // Mobile menu
  showMobileMenu = false;
  mobileDropdown = {
    lookup: false,
    register: false
  };

  openMobileMenu() {
    this.showMobileMenu = true;
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
    document.body.style.overflow = '';
    // Đóng tất cả dropdown mobile khi đóng menu
    this.mobileDropdown = { lookup: false, register: false };
  }

  toggleMobileDropdown(key: 'lookup' | 'register') {
    this.mobileDropdown[key] = !this.mobileDropdown[key];
  }


}
