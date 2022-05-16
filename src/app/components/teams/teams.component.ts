import { Component, OnInit } from '@angular/core';
import { LeagueRestService } from 'src/app/services/leagueRest/league-rest.service';
import { EquipoRestService } from 'src/app/services/equipoRest/equipo-rest.service';
import { EquiposModel } from 'src/app/models/equipo.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { JornadaRestService } from 'src/app/services/jornadaRest/jornada-rest.service';
import { JornadaModel } from 'src/app/models/jornada.model';
import { ResultModel } from 'src/app/models/result.model';
import { ResultRestService } from 'src/app/services/resultRest/result-rest.service';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  equipo:EquiposModel;
  equipos: any;
  equipoGetId: any; 
  search: any;
  idLeague: any;
  idJornada: any;
  jornadas: any;
  jornadaGetId: any;
  resultados: any;
  resultado: ResultModel; 
  jornada: JornadaModel;


  constructor(
    private equipoRest: EquipoRestService,
    private jornadaRest: JornadaRestService,
    private resultRest: ResultRestService,
    private activatedRoute: ActivatedRoute
    ){ 
      this.equipo = new EquiposModel('','',0,0,0,0,0);
      this.jornada = new JornadaModel('', '');
      this.resultado = new ResultModel ( '', 0, '', 0);
    }

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((idRuta) => {
        this.idLeague = idRuta.get('id');
      });
      this.getEquipos();
    }

  getEquipos(){
    this.equipoRest.getEquipos(this.idLeague).subscribe({
      next: (res: any) => {
        this.equipos = res.equipos;
        console.log(this.equipos)
    },
    error: (err: any) =>{
      console.log(err.error.message);
    },
  })
  }
  saveEquipo(addEquipoForm:any){
    this.equipoRest.saveEquipo(this.idLeague, this.equipo).subscribe({
      next: (res:any)=> {
        Swal.fire ({ icon: 'success', title: res.message,});
        this.getEquipos();
        addEquipoForm.reset();
    },
    error:(err)=>{Swal.fire({icon: 'warning', title: err.error.message || err.error, });
  }, 
  })
 }
 getEquipo(id:string){
  this.equipoRest.getEquipo(this.idLeague, id).subscribe({
    next: (res:any)=>{
      this.equipoGetId = res.league;
    },
    error: (err)=> alert(err.error.message)
  })
 }
 updateEquipo(){
  this.equipoGetId.user= undefined;
  this.equipoGetId.equipos = undefined;
  this.equipoGetId.jornadas =  undefined;
  this.equipoGetId.updateEquipo(this.equipoGetId._id, this.equipoGetId).subscribe({
    next: (res:any)=> {
      Swal.fire ({ icon: 'success', title: res.message,});
      this.getEquipos();
    },
    error: (err: { error: { message: any; }; })=> {Swal.fire({icon: 'warning', title: err.error.message || err.error, });
    },
  })
 }
 
 deleteEquipo(id:string){
  this.equipoRest.deleteEquipo(this.idLeague, id).subscribe({
    next: (res:any)=> {
      Swal.fire({
        title: res.message + ' ' + res.equipoDelete.name,
        icon: 'success',
        position: 'center',
        showConfirmButton: false,
        timer: 2000
      });
      this.getEquipos();
    },
    error: (err)=> Swal.fire({
      title: err.error.message,
      icon: 'error',
      position: 'center',
      timer: 3000
    })
  })
 }
 
 getJornadas(){
   this.jornadaRest.getJornadas(this.idLeague).subscribe({
    next:(res: any)=>{
      this.jornadas = res.jornadas;
      console.log(res)
    },
    error: (err: any)=>{
    console.log (err);
    }
  })
 }

  saveJornadaResult(addJornadaForm: any) {
    this.resultRest.saveJornadaResult(this.resultado, this.idLeague, this.idJornada).subscribe({
      next: (res: any) => {
        Swal.fire({ icon: 'success', title: res.message, });
        this.getEquipos();
        this.getResult(this.idJornada);
        console.log(res);
        addJornadaForm.reset();
      },
      error: (err: { error: { message: any; }; }) => {
        Swal.fire({ icon: 'warning', title: err.error.message || err.error, });
      },
    })
  }

  getJornada(idJornada: string) { 
    this.jornadaRest.getJornada(this.idLeague, idJornada).subscribe({
      next: (res: any) => {
        this.idJornada = res.jornada._id;
        this.jornadaGetId = res.jornada;
      },
      error: (err) => alert(err.error.message)
    })
  }


  getResult(idJornada: string) {
    this.resultRest.getResult( this.idLeague, idJornada).subscribe({
      next: (res: any) => {
        this.getJornada(idJornada);
        this.resultados = res.resultados;
        console.log(res);
      },
      error: (err) => alert(err.error.message)
    })
  }


  
}