import { HttpInterceptorFn } from '@angular/common/http';

export const httpRequestAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    // ...req.h
    withCredentials: true,
  });
  return next(modifiedReq);
};
