import { HttpInterceptorFn } from '@angular/common/http';

/** Functional Noop Interceptor
 * Pass untouched request through to the next request handler. */
export const noopInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
