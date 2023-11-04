import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class InteceptorService implements HttpInterceptor {

  constructor(private loading: LoaderService) { }

 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method != 'GET'  )
      this.loading.isLoading.next(true)

    return next.handle(req).pipe(
      finalize(
        () => {
          if (req.method != 'GET'  )
            setTimeout(() => {
              this.loading.isLoading.next(false)
            }, 500)
        }
      )
    )
  }
}
