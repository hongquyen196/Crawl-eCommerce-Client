import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        const state: RouterState = this.router.routerState;
        const snapshot: RouterStateSnapshot = state.snapshot;
        const url = snapshot.url;
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                localStorage.removeItem('userInfo');
                if (url && url.includes('/login')) {
                    return throwError(err.error.message);
                } else {
                    return this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
                }
            } else if (err.status === 400) {
                return throwError(err.error.message);
            } else {
                return throwError(err || err.error);
            }
        }));
    }
}
