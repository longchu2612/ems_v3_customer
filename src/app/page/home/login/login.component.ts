import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }
  listTable
  // tableId = ''
  ngOnInit(): void {
    localStorage.removeItem('name');
    this.getTableList()

  }
  getTableList() {
    const data = {}
    this.apiService.getListpost('tables/list', data).pipe(map(item => item['content'])).subscribe(
      (res) => {
        this.listTable = res.filter(i => i.status > 0);
        console.log(res);
      }, err => {
        console.log(err)
      })
  }

  loginForm = {
    name: '',
    tableId: ''
  }

  login() {
    // this.apiService.login(this.loginForm.name, this.loginForm.password).pipe(map(item=>item['data'])).subscribe(data => {
    //   console.log(data)
    const data = {
      'customerName': this.loginForm.name,
      'tableId': this.loginForm.tableId
    }
    this.apiService.getListpost('orders/get-by-table', data).pipe().subscribe(
      (res) => {
        this.router.navigate(['/account'])
        localStorage.setItem('user', JSON.stringify(res))
        localStorage.setItem('tableId', res['id'])
        console.log(res['id']);
      }, err => {
        console.log(err)
      })
  }
}
