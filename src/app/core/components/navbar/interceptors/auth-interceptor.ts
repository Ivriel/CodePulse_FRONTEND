import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService)
  const token = cookieService.get('Authorization')

  if(req.url.includes("/auth/login") || req.url.includes("/auth/register")) {
    return next(req)
  }

  if(token) {
    const newReq = req.clone({
      setHeaders:{
        Authorization: token
      }
    })
    return next(newReq)
  }
  return next(req)
};
