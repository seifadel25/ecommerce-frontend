import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service'; // Adjust the path as per your project structure
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  backendErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      Id: 0,
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]], // Add an email field with validation
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: () => {
          this.router.navigate(['/auth/login']); // Redirect the user to the login page or wherever you prefer
        },
        error: (err) => {
          this.backendErrors = [
            err.error || 'Signup failed. Please try again.',
          ];
        },
      });
    } else {
      this.backendErrors = ['Form is not valid'];
    }
  }
}
