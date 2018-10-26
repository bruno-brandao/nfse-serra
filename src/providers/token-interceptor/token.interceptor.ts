import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserServiceProvider } from '../user-service/user-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: UserServiceProvider) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        'SessionHash': `${this.auth.getToken()}`
      }
    });
    
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      console.log(err)
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.auth.logout();
        }
      }
    });;
  }
}