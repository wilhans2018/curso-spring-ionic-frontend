import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient, HttpHeaders } from "../../../node_modules/@angular/common/http";
import { Observable } from "../../../node_modules/rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";


@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storege : StorageService){
    }

    findByemail(email: String) : Observable<ClienteDTO>{
       

        let token = this.storege.getLocalUser().token;
        let authHeader = new HttpHeaders({"Authorization": "Bearer " + token});

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            {"headers": authHeader});
    }

    getImageFromBucket(id : String) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : "blob"});
    }
        
    }

   

