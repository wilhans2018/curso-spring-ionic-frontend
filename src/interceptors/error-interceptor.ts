import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs/Rx";
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage : StorageService, public alertCtrl : AlertController){}

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
                case 500:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                default:
                this.handleDefaultError(erroObj);
            }


            return Observable.throw(erroObj);
        }) as any;


    }

    handle401(){
        let alert = this.alertCtrl.create({
            title: "Erro 401: Falha de autenticação ",
            message: "Email ou senha incorretos",
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: "ok"
                }

            ]

        });
        alert.present();
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    handleDefaultError(erroObj){
        let alert = this.alertCtrl.create({
            title: "Erro " + erroObj.status + ": " +erroObj.error,
            message: erroObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: "ok"
                }

            ]

        });
        alert.present();

    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};