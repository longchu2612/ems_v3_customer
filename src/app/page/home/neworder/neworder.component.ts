import { Component } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.scss']
})
export class NeworderComponent {
  
  productInfo : any ;
  quantity: number = 1;
  totalPrice: number;
  number = '0';
  price:number;
  total: number = 0;
  discountAmount:number = 0;


  constructor(private productService : ProductService){
    this.productInfo = this.productService.getProductInfo();
  }

  ngOnInit(): void {
    this.caculateTotal();
  }

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(event: MouseEvent) {

    const modalElement = document.querySelector('.modal-container');
    if (modalElement && modalElement.contains(event.target as Node)) {
      return;
    }
    this.isModalOpen = false;
  }

  add(){
    this.quantity = this.quantity + 1; 
    this.caculateTotal()
    this.checkout()
  }

  reduce(){
    if (this.quantity != 1){
      this.quantity = this.quantity -1;
      }
    this.caculateTotal()
    this.checkout()
  }

  caculateTotal(){
    this.total = this.productInfo.price * this.quantity;
    this.totalPrice = this.total;
  }

  displayNumber(v){
    if(this.number == '0'){
      this.number = '';
    }
    this.number += v;
  }

  deleteNumber(){
    this.number = '0';
  }

  checkout(){
    this.isModalOpen = false;
    let discount:number = +this.number;
    this.totalPrice = this.total - discount;
    this.discountAmount = +this.number;
    
    if(this.totalPrice < 0) {
      this.totalPrice = 0;
    }
  }
  
  takeInfo(a){
    this.productService.setProductInfo(a);
    this.productInfo.quantity = this.quantity;
    this.productInfo.totalPrice = this.totalPrice;
  }
  
}
