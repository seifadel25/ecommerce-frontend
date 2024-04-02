//login.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router // Inject Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    console.log('Form Submitted', this.loginForm.value);
    console.log('Is Form Valid?', this.loginForm.valid);
    console.log('Username Valid?', this.loginForm.get('username')!.valid);
    console.log('Password Valid?', this.loginForm.get('password')!.valid);
    console.log('Form Errors:', this.loginForm.errors);
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token); // Assuming the response contains a token
          console.log('Login successful:', response);
          // Navigate to another route or show login success message
          this.router.navigate(['/products']); // Navigate to Products route
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Handle login error (e.g., show an error message)
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
