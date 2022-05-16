import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })
  constructor(
    private http: HttpClient,
    private userRest : UserRestService
  ) { }

  getLeagues(){
    return this.http.get(environment.baseUrl + 'league/getLeagues', {headers: this.httpOptions})
  }

  getLeaguesByAdmin(){
    return this.http.get(environment.baseUrl + 'league/getLeaguesbyAdmin', {headers: this.httpOptions})
  }

  getLeague(id:string){
    return this.http.get(environment.baseUrl + 'league/getLeague/' + id, {headers: this.httpOptions});
  }

  saveLeague(
    params : {}
  ){
    return this.http.post(environment.baseUrl +'league/saveLeague', params, {headers: this.httpOptions});

  }
  updateLeague(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'league/updateLeague/' + id, params, {headers: this.httpOptions});
  }

  deleteLeague(id:string){
    return this.http.delete(environment.baseUrl + 'league/deleteleague/' + id, {headers: this.httpOptions});
  }
}
