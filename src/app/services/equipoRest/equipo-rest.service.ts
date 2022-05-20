import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class EquipoRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })

  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }

  saveEquipo(idLeague: string, params: {}) {
    return this.http.post(
      environment.baseUrl + 'equipo/saveEquipo/' + idLeague ,
      params,
      {
        headers: this.httpOptions,
      }
    );
  }

  getEquipo(idLeague: string, idEquipo: string) {
    return this.http.get(
      environment.baseUrl + 'equipo/getEquipo/' + idLeague + '/' + idEquipo,
      {
        headers: this.httpOptions,
      }
    );
  }

  getEquipos(idLeague: string) {
    return this.http.get(environment.baseUrl + 'equipo/getEquipos/' + idLeague, {
      headers: this.httpOptions,
    });
  }

  updateEquipo( params: {}, idLeague: string, idEquipo: string) {
    return this.http.put(
      environment.baseUrl + 'equipo/updateEquipo/' + idLeague + '/' + idEquipo,
      params,
      { headers: this.httpOptions }
    );
  }

  deleteEquipo(idLeague: string, idEquipo: string) {
    return this.http.delete(
      environment.baseUrl + 'equipo/deleteEquipo/' + idLeague + '/' + idEquipo,
      {
        headers: this.httpOptions,
      }
    );
  }

}
