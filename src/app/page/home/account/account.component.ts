import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { FormControl } from '@angular/forms';
import { count, map } from 'rxjs/operators';
import * as moment from 'moment';
import Swal from 'sweetalert2';
export interface GeneralReport {// ép kiểu
  count: number;
  name: string;
  total: number;
  start: number;
  end: number;
  userID: number
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  constructor(
    private apiService: ApiService,
    private commonSevice: CommonService,
    private router: Router
  ) {
    this.data = this.commonSevice.getOrder()
    console.log(this.data)
  }
  currentUser 
  ngOnInit() {
    // this.getOdersreVenue()
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    console.log(this.currentUser);
    
  }
  // life cycle

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  data = null;
  public selectedMoments = new Date()
  // lấy thông tin về ngày:
  // chọn ngày-> thay đổi api có thông tin về ngày (start, end)
  getOdersreVenue() {
    var start = moment(this.selectedMoments).startOf('day').unix(); //ngay bắt đầu
    var end = moment(this.selectedMoments).endOf('day').unix();
    this.apiService.getOdersreVenue(this.generalReport.count, this.generalReport.name, this.generalReport.total, start, end, this.generalReport.userID)
      // .pipe(map(item=>item['data'])) : pipe(map): để lấy ra 1 giá trị nào đó chứ k phải tất cả
      .subscribe((data: GeneralReport) => { // subscribe((data) trả về kết quả cuối cùng của data
        //console.log(data)
        // sessionStorage.setItem('access_token', data['accessToken'])
        // this.router.navigate(['/order'])
        console.log(data)
        this.generalReport = data
      }, err => {
        console.log(err)
      })
  }
  logout() {
    sessionStorage.removeItem('selectedProducts')
  }
  onChangeDate() {
    this.getOdersreVenue()
  }

  generalReport: GeneralReport = {
    count: 0,
    name: '',
    total: 0,
    start: 0,
    end: 0,
    userID: 0
  }

}
