import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { shallowCopyArray } from 'ng-zorro-antd/core/util';
import { ApiService } from 'src/app/shared/services/api.service';
import swal from 'sweetalert/typings/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit{
  confirmpassword: any

  constructor(
    private router:Router,
    private apiService:ApiService
  ){}

  changepass = {
    old_password: '',
    new_password: '',
  }

  ngOnInit(){

  }

  changePass(){
    this.apiService.changePassword(this.changepass.old_password, this.changepass.new_password).subscribe(data =>{
      console.log(data)
      Swal.fire({
        icon: 'success',
        title: 'Đổi mật khẩu thành công!',
        timer: 1500,
        showConfirmButton: false
      })
      this.router.navigate(['account'])
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Không thành công, nhập lại!',
        timer: 1500
      })
    })
  }
}
