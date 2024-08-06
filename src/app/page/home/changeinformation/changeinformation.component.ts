import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-changeinformation',
  templateUrl: './changeinformation.component.html',
  styleUrls: ['./changeinformation.component.scss']
})
export class ChangeinformationComponent implements OnInit{
  constructor(
    private router:Router,
    private apiService: ApiService
  ){}
  
  isEditable = false
  ngOnInit() {
    
  }

  changeInfor = {
    name:'',
    phone: '',
    email:''
  }

  changeInforAcc(){
    this.apiService.changeProfile(this.changeInfor.name,this.changeInfor.phone, this.changeInfor.email).pipe(map(item=>item['data'])).subscribe(data =>{
      // console.log(data)
      Swal.fire({
        icon: 'success',
        title:'Thay đổi thông tin thành công!',
        timer: 1500,
        showConfirmButton: false
      })
      this.router.navigate(['/informationaccount'])
    }, err => {
      Swal.fire({
        icon: 'error',
        showConfirmButton : true,
        title: 'Không thành công, hãy thay đổi lại!'
      })
    })
  }
}
