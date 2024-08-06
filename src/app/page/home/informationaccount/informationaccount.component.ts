import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

export interface GeneralReport {// ép kiểu
  updated_at: number;
  name: string;
  phone: number;
  email: string
}

@Component({
  selector: 'app-informationaccount',
  templateUrl: './informationaccount.component.html',
  styleUrls: ['./informationaccount.component.scss']
})
export class InformationaccountComponent implements OnInit{
  constructor(
    private apiService:ApiService,
    private router:Router
  ){}

  ngOnInit() {
    this.getInforAccount()
  }
  
  getInforAccount() {
    this.apiService.getInforAccount(this.generalReport.updated_at,this.generalReport.name,this.generalReport.phone, this.generalReport.email)
    .pipe(map(item=>item['data']))
    .subscribe((data:GeneralReport) => { 
      //: pipe(map): để lấy ra 1 giá trị nào đó chứ k phải tất cả  
      // subscribe((data) trả về kết quả cuối cùng của data
      //console.log(data)
      // sessionStorage.setItem('access_token', data['accessToken'])
      // this.router.navigate(['/order'])
      console.log(data)
      this.userData = data
      
    }, err => {
      console.log(err)
    })
  }
  userData 
  generalReport: GeneralReport= {
    updated_at: 0,
    name: '', 
    phone: 0,
    email: ''
  }

}
