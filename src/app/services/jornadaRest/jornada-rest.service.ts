import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRestService } from '../user-rest.service';
import { environment } from 'src/environments/environment';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root'
})
export class JornadaRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  });
  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }

    getJornadas(idLeague: string){
      return this.http.get(environment.baseUrl+ 'jornada/getJornadas/' + idLeague,  {headers: this.httpOptions});
    }

    getJornada(
      idLeague: String,
      idJornada: string){
      return this.http.get(environment.baseUrl + 'jornada/getjornada/' + idLeague + '/' + idJornada, {headers: this.httpOptions})
    }

}