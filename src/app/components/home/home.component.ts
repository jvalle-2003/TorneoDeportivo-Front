import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token:any;


  constructor(
    public router: Router,
    private userRest: UserRestService
  ) { }

  home(){
    this.router.navigateByUrl('/league');
    
  }
  ngOnInit(): void {
    this.token = this.userRest.getToken();
  }

}
