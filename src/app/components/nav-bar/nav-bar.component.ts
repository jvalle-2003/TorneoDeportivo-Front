import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  token:any;
  identity:any;
  role:any;
  username:any;
  name: any;

  constructor(private userRest: UserRestService) {}

  ngOnInit(): void {
    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity();
    this.role = this.userRest.getIdentity().role;
    this.name = this.userRest.getIdentity().name;
  }

  logOut(){
    localStorage.clear();
    Swal.fire({
      icon:'success',
      title:'Loged Out',
      text:'Log Out successfully, Have a nice day!'
    })
  }

}