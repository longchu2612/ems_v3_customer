import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit{
  amountValue: number;
  areaValue: string;
  amountEntered: boolean = false;
  areaEntered: boolean = false;
  qrCodeValue: string;
  public qrCodeDownloadLink: SafeUrl = "";

  constructor(
    private apiService: ApiService,
    private router: Router
  ){}
  
  ngOnInit(){
    
  }

  formatNumberWithCommas(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  get inputValue(): string {
    return this.formatNumberWithCommas(this.amountValue);
  }

  convertToWords(): string {
    const numericValue = parseFloat(this.inputValue.replace(/,/g, ''));
    return this.numberToWords(numericValue) + ' Đồng';
  }

  numberToWords(number: number): string {
    const ones = ['', 'Một', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín'];
    const teens = [
      'Mười',
      'Mười Một',
      'Mười Hai',
      'Mười Ba',
      'Mười Bốn',
      'Mười Lăm',
      'Mười Sáu',
      'Mười Bảy',
      'Mười Tám',
      'Mười Chín',
    ];
    const tens = ['', 'Mười', 'Hai Mươi', 'Ba Mươi', 'Bốn Mươi', 'Năm Mươi', 'Sáu Mươi', 'Bảy Mươi', 'Tám Mươi', 'Chín Mươi'];
    const chunks = ['', 'Nghìn', 'Triệu', 'Tỷ'];

    const toWords = (num: number, index: number): string => {
      if (num === 0) return '';

      let words = '';

      if (num < 10) {
        words = ones[num];
      } else if (num < 20) {
        words = teens[num - 10];
      } else if (num < 100) {
        const ten = Math.floor(num / 10);
        const remainder = num % 10;
        words = `${tens[ten]} ${remainder === 1 ? 'Mốt' : (remainder === 4 ? 'Tư' : ones[remainder])}`;
      } else {
        const hundred = Math.floor(num / 100);
        const remainder = num % 100;
        words = `${ones[hundred]} Trăm ${toWords(remainder, 0)}`;
      }

      if (index > 0) {
        words += ` ${chunks[index]}`;
      }

      return words.trim();
    };

    const chunksArray = [];

    while (number > 0) {
      const chunk = number % 1000;
      chunksArray.push(chunk);
      number = Math.floor(number / 1000);
    }

    if (chunksArray.length === 0) {
      return 'Không';
    }

    const wordsArray = chunksArray.map((chunk, index) => toWords(chunk, index));

    return wordsArray.reverse().join(' ').trim();
  }

  noQrcode = <any>[];

   onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  qRcode ={
    amount: 0,
    mid: ""
  }

  data :string = ""

  createQRCode(){
    this.qRcode.amount = this.amountValue
    this.qRcode.mid = this.areaValue
    
    this.apiService.createQR(this.qRcode.amount, this.qRcode.mid).subscribe(data => {
      console.log(data);
      this.data = data['data'];
      // console.log('aaaaaaaaa', this.data)
    })

    this.noQrcode = false;
  }

  payLoud() {
    this.apiService.payLoud(this.qRcode.amount, this.qRcode.mid).subscribe(data => {
      Swal.fire({
        icon: "success",
        title: "Thanh toán thành công!",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/account'])
    })
  }
}
