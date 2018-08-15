import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs/Rx";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        console.log("passou no interceptor");
        return next.handle(req)
        .catch((error, caught)=> {

            let erroObj = error;
            if(erroObj.error){
                erroObj = erroObj.error;
            }
            if (!erroObj.status){
                erroObj = JSON.parse(erroObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(erroObj);

            return Observable.throw(erroObj);
        }) as any;


    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};