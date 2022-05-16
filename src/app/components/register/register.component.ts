import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/user-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:UserModel;
  repeatPassword: string = '';
  timer: any;

  constructor(
    private userRest: UserRestService,
    private router : Router  
    
    ) { 
    this.user = new UserModel('', '','','','','','','');
  }
  ngOnInit(): void {
  }

  async checkPassword(){
    clearTimeout(this.timer);
    this.timer = await setTimeout(()=>{
      if(this.repeatPassword != this.user.password){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password doesnt match',
        })
        clearTimeout(this.timer);
      }else{
        Swal.fire({
          icon: 'success',
          title: 'Password',
          text: 'Password match',
        })
        clearTimeout(this.timer);
      }
    }, 1500)
  }


  register(){
    this.userRest.register(this.user).subscribe({
        next: (res:any)=>{
          Swal.fire({
            icon: 'success',
            title: 'Registered',
            text: 'Already can login!',
          })
          this.router.navigateByUrl('/login');
        },
        error: (err)=>{
         alert(err.error.message || err.error);
        }
    })
  }


}


