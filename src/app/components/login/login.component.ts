import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:UserModel;

  constructor(private userRest: UserRestService,
              public router: Router) {
    this.user = new UserModel('','','','','','','','');
  }

  ngOnInit(): void {
  }

  login(){
    console.log(this.user),
    this.userRest.login(this.user).subscribe({
      next: (res:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Loged In!',
          text: 'login successfully!',
        })

        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.already));

        //cambiar de /home a /leagues cuando la vista de ligas esté terminada
        this.router.navigateByUrl('/home');
      },
      error: (err)=> alert(err.error.message || err.error)

    })
  }

}
