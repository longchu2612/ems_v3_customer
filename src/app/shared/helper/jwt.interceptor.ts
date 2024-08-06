import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

// import { AuthenticationService } from '../services/auth.service';
// import { AuthfakeauthenticationService } from '../services/authfake.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    // constructor(private authenticationService: AuthenticationService, private authfackservice: AuthfakeauthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (environment.defaultauth === 'firebase') {
        //     const currentUser = this.authenticationService.currentUser();
        //     if (currentUser && currentUser.token) {
        //         request = request.clone({
        //             setHeaders: {
        //                 Authorization: `Bearer ${currentUser.token}`
        //             }
        //         });
        //     }
        // } else {
            if (!request.url.includes('http') && !request.url.includes('assets')) {
                request = request.clone({
                    url: environment.host + request.url
                });
            }
        //     const currentUser = this.authfackservice.currentUserValue;
        //     if (currentUser && currentUser.access_token) {
        //         request = request.clone({
        //             setHeaders: {
        //                 Authorization: `Bearer ${currentUser.access_token}`
        //             }
        //         });
        //     }

        //     // add authorization header with jwt token if available
        // }
        return next.handle(request)

    }
}
