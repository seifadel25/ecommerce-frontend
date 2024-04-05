import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  backendErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token); // Assuming the response contains a token
          // Navigate to another route or show login success message
          this.router.navigate(['/']); // Navigate to Products route
        },
        error: (error) => {
          this.backendErrors = [
            error.error || 'Signup failed. Please try again.',
          ]; // Handle login error (e.g., show an error message)
        },
      });
    } else {
      this.backendErrors = ['Form is not valid'];
    }
  }
}
