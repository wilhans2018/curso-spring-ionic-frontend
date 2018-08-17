import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs/Rx";
import { StorageService } from '../services/storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage : StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        //console.log("passou no interceptor");
        return next.handle(req)
        .catch((error, caught)=> {

            let erroObj = error;
            if(erroObj.error){
                erroObj = erroObj.error;
            }
            if (!erroObj.status){
                erroObj = JSON.parse(erroObj);
            }

            
            console.log(erroObj);


            switch(erroObj.status){
                case 403:
                this.handle403();
                break;
            }


            return Observable.throw(erroObj);
        }) as any;


    }

    handle403(){
        this.storage.setLocalUser(null);
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};