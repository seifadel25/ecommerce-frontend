import { Component } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { AuthenticationService } from './auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ecommerce-frontend';
  isOpen = false; // Initialize isOpen as false

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart:', event.url);
      } else if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event.url);
      } else if (event instanceof NavigationError) {
        console.log('NavigationError:', event.error);
      }
    });
  }

  hasToken(): boolean {
    return this.authService.hasToken();
  }
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }
}
