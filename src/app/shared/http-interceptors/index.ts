import { httpRequestAuthInterceptor } from './http-request-auth.interceptor';
import { noopInterceptor } from './noop.interceptor';

/** Array of Http interceptor providers in outside-in order */
export const httpInterceptorsInjectorsList = [noopInterceptor, httpRequestAuthInterceptor];
