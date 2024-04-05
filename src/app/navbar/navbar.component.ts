import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service'; // Adjust the path as necessary
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class NavbarComponent {
  title = 'ecommerce-frontend';
  isOpen = false; // Initialize isOpen as false

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  hasToken(): boolean {
    return this.authService.hasToken();
  }
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Or your preferred route
  }
}
