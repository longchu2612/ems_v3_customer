import { Component } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-supportand-pays',
  templateUrl: './supportand-pays.component.html',
  styleUrls: ['./supportand-pays.component.scss']
})
export class SupportandPaysComponent {
  position
  currentUser
  tableName
  customerName = ''
  id = ' '
  productData
  constructor(
        private apiService: ApiService
    ) { }

  ngOnInit() {
    // this.getOdersreVenue()
    this.getProductsList()
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    console.log();
    this.tableName = this.currentUser['tableName']
    this.position = this.currentUser['position']
    this.customerName = this.currentUser['customerName']
  }
  getProductsList() {
    this.apiService.getListData('eateries/detail/3M072957').subscribe({
        next: res => {
        this.productData = res['name']
            console.log(res);
        },error: e => {
            console.log(e);
        }
    })
  }
  showSuccessAlert() {
        swal.fire({
            icon: 'success',
            text: 'Thành công!',
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
    getDataFromWebSocket(){
        // Create a WebSocket connection
var socket = new WebSocket("ws://150.95.113.52:8080/notification");

// Handle incoming messages
    socket.onmessage = (event) => {
        const message = event.data;
        // Handle the received message, for example:
        console.log("Received message:", message);
        // You can update UI, show notifications, etc., based on the received message
    };

// Handle WebSocket connection open event
socket.onopen = () => {
    console.log("WebSocket connection established.");
};

// Handle WebSocket connection close event
socket.onclose = () => {
    console.log("WebSocket connection closed.");
};

// Handle WebSocket connection error event
socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};

    }
  callWaiter() {
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
}
