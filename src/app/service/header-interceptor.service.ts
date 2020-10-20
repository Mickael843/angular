import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() { }

  errorProcessing(error: HttpErrorResponse) {
    let errorMessage = 'Error desconhecido';

    if(error.error instanceof ErrorEvent) {
      errorMessage = 'Error: ' + error.error.error;
    } else {
      if(error.status === 403) {
        errorMessage = "Acesso negado. Realize o login novamente";
      } else {
        errorMessage = 'Code: ' + error.error.code + '\nMessage' + error.error.error; 
      }
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(localStorage.getItem('token') !== null) {
      const token = 'Bearer ' + localStorage.getItem('token');
      
      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', token)
      });
      
      return next.handle(tokenRequest).pipe(
        tap((event: HttpEvent<any>) => {
          if(event instanceof HttpResponse && (event.status === 200 || event.status ===201)) {
            //console.info('Sucesso na operação');
          }
        }),
        catchError(this.errorProcessing)
      );
    
    } else {
      return next.handle(req).pipe(catchError(this.errorProcessing));
    }
  }
}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  }]
})
export class HttpInterceptorModule { }
