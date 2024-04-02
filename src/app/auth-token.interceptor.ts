import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth/authentication.service'; // Adjust the path as necessary

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve the JWT token from the AuthenticationService
    const authToken = this.authService.getToken();

    if (authToken) {
      // If the token exists, clone the request to add the Authorization header
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });

      // Send the newly created request
      return next.handle(authReq);
    }

    // If no token, send the original request
    return next.handle(req);
  }
}
