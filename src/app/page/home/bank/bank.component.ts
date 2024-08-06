import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit{

  constructor(
    private router:Router
  ){}

  ngOnInit(){
    
  }

  bankaccount = <any>[];

  unLink(){
    Swal.fire({
      title: 'Bạn có chắc muốn hủy liên kết?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chắc chắn'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Huỷ liên kết thành công!',
          showConfirmButton: false,
          timer: 1500
        }
        )
        this.bankaccount = false;
      }
    })
  }
}
