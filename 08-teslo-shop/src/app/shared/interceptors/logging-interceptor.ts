import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req : HttpRequest<unknown>, next:HttpHandlerFn) => {
  return next(req);
};
