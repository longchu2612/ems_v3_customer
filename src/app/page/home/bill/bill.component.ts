import { Component } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
// import { Product } from '../addorder/addorder.component';
import { ApiService } from 'src/app/shared/services/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {
  productInfo: any;
  basket = [];
  totalPrice = 0;
  totalQuantity = 0;
  isOpen = false
  category = [
    'Ăn tại bàn',
    'Mang đi',
    'Giao hàng',
    'Đối tác'
  ]
  currentCategory
  haveCategory = false;
  unixTime: number = 1618574400;
  name = JSON.parse(localStorage.getItem('user')).customerName;

        constructor( 
          private apiService: ApiService,) 
          {}

  ngOnInit(): void {
    const selectedProducts = JSON.parse(sessionStorage.getItem('orderDetails') || '[]');
    this.basket = selectedProducts;
    this.caculateTotal()
    this.convertUnixTimeToDate(this.unixTime);
  }
  convertUnixTimeToDate(unixTime: number): void {
    const convertedDate = new Date(unixTime * 1000); // Convert Unix time to milliseconds
    console.log("Converted date:", convertedDate);
  }
  toggle() {
    this.isOpen = !this.isOpen
  }

  showCategory(a) {
    this.haveCategory = true;
    this.currentCategory = a
  }

  // add(item) {
  //   this.caculateTotal()
  // }

  // subtract(item) {
  //   this.caculateTotal()
  // }
  subtract(itemId: number) {
    // Find the index of the item with the given ID
    const index = this.productInfo.findIndex(item => item.id === itemId);
    if (index !== -1 && this.productInfo[index].quantity > 0) {
      // Decrease quantity of the item if it exists and quantity is greater than 0
      this.productInfo[index].quantity--;
      this.updateSelectedProducts();
    }
  }

  add(itemId: number) {
    // Find the index of the item with the given ID
    const index = this.productInfo.findIndex(item => item.id === itemId);
    if (index !== -1) {
      // Increase quantity of the item if it exists
      this.productInfo[index].quantity++;
      this.updateSelectedProducts();
    }
  }
  updateSelectedProducts() {
    // Save the updated selected products to session storage
    sessionStorage.setItem('selectedProducts', JSON.stringify(this.productInfo));
  }
  caculateTotal() {
    this.totalPrice = 0;
    this.totalQuantity = 0;

    for (let item of this.basket) {
      this.totalPrice += item.price * (item.quantity + item.done + item.pending +item.serving);
      this.totalQuantity += (item.quantity + item.done + item.pending +item.serving);
    }
  }
  redirectToPayment() {
  const orderId = localStorage.getItem('tableId')
    const data = {}
    this.apiService.putListData('orders/call-waiter/' + orderId, data).subscribe({
            next: res => {
                this.showSuccessAlert()
                console.log(res);
            },error: e => {
                this.showErrorAlert()
                console.log(e);
            }
        })
  }
      showSuccessAlert() {
        swal.fire({
            icon: 'success',
            title: 'Thành công!',
            // text: 'Your order has been placed successfully. Thank you!',
            width: 300, // Điều chỉnh chiều rộng
            padding: '1rem', // Điều chỉnh padding
            confirmButtonColor: '#28a745' // Màu xanh cho nút OK
        });
    }

    showErrorAlert() {
        swal.fire({
            icon: 'error',
            title: 'Thất bại!',
            // text: 'An error occurred while placing your order. Please try again later.',
            width: 300, // Điều chỉnh chiều rộng
            padding: '1rem', // Điều chỉnh padding
            confirmButtonColor: '#dc3545' // Màu đỏ cho nút OK
        });
    }

}
