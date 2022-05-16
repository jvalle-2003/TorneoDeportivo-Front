import { Component, OnInit, OnDestroy} from '@angular/core';
import { LeagueRestService } from 'src/app/services/leagueRest/league-rest.service';
import { LeaguesModel } from 'src/app/models/leagues.model';
import Swal from 'sweetalert2';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit, OnDestroy{
 leagues:any;
 league: LeaguesModel;
 leagueGetId: any; 
 search:any;
 role:any;
 token:any;
  constructor(
    private leagueRest: LeagueRestService,
    private userRest: UserRestService 
  ) {
    this.league = new LeaguesModel('','','');
   }


   ngOnInit (): void {
    this.token = this.userRest.getToken();
    this.role=this.userRest.getIdentity().role;
    console.log(this.role);
    if(this.role== 'ADMIN'){ 
      
      return  this.getLeaguesByAdmin()
      
    }else if (this.role='CLIENT'){
      return this.getLeagues()
    }
  }

   ngOnDestroy(): void {
     this.userRest.getIdentity();
     this.getLeaguesByAdmin();
     this.getLeagues();
   }

  getLeaguesByAdmin(){
    this.leagues= [];
    this.leagueRest.getLeaguesByAdmin().subscribe({
      next: (res: any) => {
      this.leagues = res.leagues;
      console.log(res)
    },
    error: (err: any) =>{
      console.log(err);
    },
    });
  }

  getLeagues(){
    this.leagues= [];
    this.leagueRest.getLeagues().subscribe({
      next: (res: any) => {
      this.leagues = res.leagues;
      console.log(this.leagues )
    },
    error: (err: any) =>{
      console.log(err);
    },
    });
  }


saveLeague(addLeagueForm:any){
    this.leagueRest.saveLeague(this.league).subscribe({
      next: (res:any)=> {
        Swal.fire ({ icon: 'success', title: res.message,});
        this.getLeagues();
        addLeagueForm.reset();
    },
    error:(err)=>{Swal.fire({icon: 'warning', title: err.error.message || err.error, });
  }, 
  })
 }

 getLeague(id:string){
  this.leagueRest.getLeague(id).subscribe({
    next: (res:any)=>{
      this.leagueGetId = res.league;
    },
    error: (err)=> alert(err.error.message)
  })
}
updateLeague(){
  this.leagueGetId.user= undefined;
  this.leagueGetId.equipos = undefined;
  this.leagueGetId.jornadas =  undefined;
  this.leagueRest.updateLeague(this.leagueGetId._id, this.leagueGetId).subscribe({
    next: (res:any)=> {
      Swal.fire ({ icon: 'success', title: res.message,});
      this.getLeagues();
    },
    error: (err)=> {Swal.fire({icon: 'warning', title: err.error.message || err.error, });
    },
  })
}

deleteleague(id:string){
  this.leagueRest.deleteLeague(id).subscribe({
    next: (res:any)=> {
      Swal.fire({
        title: res.message + ' ' + res.leagueDeleted.name,
        icon: 'success',
        position: 'center',
        showConfirmButton: false,
        timer: 2000
      });
      this.getLeagues();
    },
    error: (err)=> Swal.fire({
      title: err.error.message,
      icon: 'error',
      position: 'center',
      timer: 3000
    })
  })
}
}