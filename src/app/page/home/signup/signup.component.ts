import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  confirmpassword: any
  
  constructor(
    private apiService:ApiService,
    private router: Router
  ){

  }
  
  ngOnInit(){
   
  }

  signupForm = {
    name: '',
    email: '',
    username: '',
    phone: null,
    password: ''
  }

  signup(){
    this.apiService.signUp(this.signupForm.name, this.signupForm.email, this.signupForm.username ,this.signupForm.phone, this.signupForm.password).pipe(map(item=>item['data'])).subscribe(data =>{
      console.log(data)
      Swal.fire({
        icon: 'success',
        timer: 1500,
        position: 'center',
        title: 'Đăng ký thành công',
        showConfirmButton: false
      })
      this.router.navigate(['/login'])
    }, err => {
      Swal.fire(
        {
          icon: 'error',
          position: 'center',
          title: 'Đăng ký không thành công, đăng ký lại!',
          timer: 1500,
          showConfirmButton: false
        }
      )
    }
    )
  }
}
