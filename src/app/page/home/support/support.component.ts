import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit{
  constructor(
    private apiService: ApiService
    ){}

  ngOnInit() {
  }

  newOderButton(){
    this.apiService.newOder('').subscribe(data => {
      console.log(data)
    })
  }

  callPaymentButton(){
    this.apiService.callPayment('').subscribe(data => {
      console.log(data)
    })
  }

}
