import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OverlayService } from '../common/overlay/overlay.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private overlayService: OverlayService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        const state: RouterState = this.router.routerState;
        const snapshot: RouterStateSnapshot = state.snapshot;
        const url = snapshot.url;
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                localStorage.removeItem('userInfo');
                if (this.overlayService) {
                    this.overlayService.close();
                }
                if (url && url.includes('/login')) {
                    return throwError(err.error);
                } else {
                    return this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
                }
            } else {
                if (this.overlayService) {
                    this.overlayService.close();
                }
                return throwError(err.error);
            }
        }));
    }
}
