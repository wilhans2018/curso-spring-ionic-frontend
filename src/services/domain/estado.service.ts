import { Inject, Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "../../../node_modules/rxjs/Rx";
import { EstadoDTO } from "../../models/estado.dto";

@Injectable()
export class EstadoService{

    constructor(public http: HttpClient){

    }

    public findAll() : Observable<EstadoDTO[]>{
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }

}