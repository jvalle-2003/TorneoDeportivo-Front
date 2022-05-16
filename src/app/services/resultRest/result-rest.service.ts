import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ResultRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })
  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }

  saveJornadaResult(
    params: {},
    idLeague: string,
    idJornada: string
    
  ) {
    return this.http.post(environment.baseUrl + 'jornada/saveJornadaResult/' + idLeague + '/' + idJornada, params, { headers: this.httpOptions });
  }

  getResult(
    idLeague: string,
     idJornada: string
  ) {
    return this.http.get(environment.baseUrl + 'jornada/getResultados/' + idLeague + '/' + idJornada,{ headers: this.httpOptions });
  }

}