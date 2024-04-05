//authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:5234/Authentication/login'; // Adjust based on your API
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  constructor(private http: HttpClient) {}

  // Login method with error handling
  login(credentials: { username: string; password: string }): Observable<any> {
    console.log('Sending login request with:', credentials);
    return this.http.post<any>(`${this.apiUrl}`, credentials).pipe(
      tap((response) => console.log('Login response:', response)),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  // Logout method
  logout(): void {
    this.removeToken();
    this.isAuthenticatedSubject.next(false);
    // Additional logout operations as needed
  }
  // In authentication.service.ts

  signup(user: {
    userName: string;
    password: string;
    email: string;
    Id: number;
    /* include other user properties as needed */
  }): Observable<any> {
    const signupUrl = 'http://localhost:5234/Users'; // Adjust based on your API endpoint for creating users
    return this.http.post<any>(signupUrl, user).pipe(
      tap((response) => console.log('Signup response:', response)),
      catchError((error) => {
        console.error('signup error:', error);
        return throwError(() => error);
      }) // Reuse the existing error handling method
    );
  }

  // Token management methods
  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private removeToken(): void {
    localStorage.removeItem('token');
  }

  hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Observable to watch authentication status
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Server returned code ${error.status}, message was: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
