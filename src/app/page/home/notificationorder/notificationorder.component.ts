import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-notificationorder',
  templateUrl: './notificationorder.component.html',
  styleUrls: ['./notificationorder.component.scss']
})
export class NotificationorderComponent implements OnInit{
  constructor(
    private apiService: ApiService,
    private commonSevice: CommonService,
    private router: Router,
    private decimaPipe: DecimalPipe
){
    this.data = this.commonSevice.getOrder()

    console.log(this.data)

}

isVisible = false
data = null

customerPayment = 0
suggestMoney = []
returnMoney = 0
isError = false

handleOk(){
    if(this.customerPayment >= this.data.total_price/1000){
      this.isVisible = false
      this.returnMoney = this.customerPayment - this.data.total_price/1000
      // this.countMoney()
    }else{
        this.isError = true
    }
}

countMoney(){
    //available currency
    let available = [5, 10, 20, 50, 100, 200, 500];// đưa ra mệnh giá lớn hơn:  ví dụ 50.000 sẽ đưa ra mệnh giá 100, 200,500 
    const current = this.customerPayment
    let list = []
    let breakpoint = available.filter(i => i >= current)

    console.log(breakpoint)

    this.suggestMoney = [...breakpoint]
    for (let index = 0; index < available.length; index++) {
        const element = available[index];
        if(current < element){
            list.push(element)
        }
    }
}

setMoney(m){
    this.customerPayment = m
    this.returnMoney = this.customerPayment - this.data.total_price/1000
    this.apiService.submitPost('admin/orders/pay', {order_id: this.data.id}).subscribe(data => {
        console.log(data)
    })

}

handleCancel(){}
ngOnInit(){
    if(this.data){
      this.customerPayment = this.data['total_price']/1000
        this.countMoney()
    }
}

formatterMoney = (value: number): string => `${this.decimaPipe.transform(value, '1.0-2')}`;
parserMoney = (value: string): string => {
    console.log(value)
    const val = value.replace(/đ|,/g, '');

    return val
    // return (+(value.replace(/đ|,/g, ''))).toString();
}


submitPayment(){
    let message = `Thanh toán thành công ${this.data.total_price/1000} nghìn đồng`
    this.data['customerPayment'] = this.customerPayment*1000;
    this.commonSevice.setOrder(this.data);
    // this.apiService.submitPost('admin/orders/pay', {order_id: this.data.id}).subscribe({
    //     next: res => {
    //         console.log(res)
    //         this.apiService.newsubmitLoa(this.data.total_price).subscribe({
    //             next: res => {
                    
    //             },
    //             error: e => {
    //                 console.log('Có lỗi xảy ra, không phát được ra loa');
    //             }
    //         })
    //         this.router.navigate(['/finish'])
    //     }
    // })
    this.apiService.newsubmitLoa(this.data.total_price).subscribe({next: res => {

    },
        error: e => {
        console.log('Có lỗi xảy ra, không phát được ra loa');}
    })
    this.router.navigate(['/finish'])
}
}
