import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import {ClientRestService} from 'src/app/services/clientRest/client-rest.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:any;
  user:UserModel;
  userGetId:any;
  idUser:any;
  constructor(
    private clientRest: ClientRestService,

  ) {
    this.user = new UserModel('', '','','','','','','');
   }

  ngOnInit(): void {
    this.getUsers()
  } 

  getUser(id: string){
    this.clientRest.getUser(id).subscribe({
      next: (res:any)=>this.userGetId = res.user, 
      error: (err)=> console.log(err)
    })
  }

  getUsers(){
    this.clientRest.getUsers().subscribe({
      next: (res:any)=>this.users = res.user, 
      error: (err)=> console.log(err)
    })
  }

  saveUser(addUserForm:any){
    this.clientRest.saveUser(this.user).subscribe({
      next: (res:any)=> {
        Swal.fire ({ icon: 'success', title: res.message,});
        this.getUsers();
        addUserForm.reset();
    },
    error:(err)=>{Swal.fire({icon: 'warning', title: err.error.message || err.error, });
  }, 
  })
 }
 updateUser(){
  this.clientRest.updateUser( this.userGetId, this.userGetId._id).subscribe({
    next: (res:any)=> {
      Swal.fire ({ icon: 'success', title: res.message,});
      this.getUsers();
    },
    error: (err)=> {Swal.fire({icon: 'warning', title: err.error.message || err.error, });
    },
  })
}

deleteUser(id:string){
  this.clientRest.deleteUser(id).subscribe({
    next: (res:any)=> {
      Swal.fire({
        title: res.message + ' ' + res.userDeleted.name,
        icon: 'success',
        position: 'center',
        showConfirmButton: false,
        timer: 2000
      });
      this.getUsers();
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
