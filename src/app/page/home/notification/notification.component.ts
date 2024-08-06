import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  constructor(
    private apiService: ApiService
  ) { }

  @ViewChild('input') input: ElementRef;

  listdata = <any>[]
  name = localStorage.getItem('name');
  totalPrice = 0
  totalQuantity = 0
  _data = []
  tableId = ''
  ngOnInit() {
    // this.listdata = JSON.parse(sessionStorage.getItem('selectedProducts'))
    this.getProduct()
    this.tableId = localStorage.getItem('tableId')
    this.caculateTotal()
    // this.fetchList()
  }
  caculateTotal() {
    this.totalPrice = 0;
    this.totalQuantity = 0;

    for (let item of this.listdata) {
      this.totalPrice += item.price * item.quantity;
      this.totalQuantity += item.quantity;
    }
  }
  getProduct() {
    const storedData = JSON.parse(sessionStorage.getItem('selectedProducts'));
    console.log(storedData);

    // Kiểm tra nếu dữ liệu tồn tại
    if (storedData) {
      // Đổi tên trường từ "id" thành "productId"
      this.listdata = storedData.map((item: any) => {
        return {
          ...item,
          productId: item.id
        };
      });
      console.log(this.listdata);

    }
  }
  // increaseQuantity(id) {
  //   console.log(id);

  // }
  increaseQuantity(productId: string) {
    // Lấy dữ liệu từ sessionStorage
    const storedData = JSON.parse(sessionStorage.getItem('selectedProducts'));
    if (storedData) {
      // Tìm sản phẩm trong mảng `storedData` dựa trên `productId`
      const productIndex = storedData.findIndex((item: any) => item.id === productId);
      if (productIndex !== -1) {
        // Tăng số lượng sản phẩm
        storedData[productIndex].quantity++;
        // Cập nhật lại sessionStorage
        sessionStorage.setItem('selectedProducts', JSON.stringify(storedData));
      }
    }
    // this.listdata = JSON.parse(sessionStorage.getItem('selectedProducts'))
    this.getProduct()
    this.caculateTotal()

  }
  decreaseQuantity(productId: string) {
    // Lấy dữ liệu từ sessionStorage
    const storedData = JSON.parse(sessionStorage.getItem('selectedProducts'));
    if (storedData) {
      // Tìm sản phẩm trong mảng `storedData` dựa trên `productId`
      const productIndex = storedData.findIndex((item: any) => item.id === productId);
      if (productIndex !== -1) {
        // Giảm số lượng sản phẩm
        if (storedData[productIndex].quantity > 1) {
          storedData[productIndex].quantity--;
          // Cập nhật lại sessionStorage
          sessionStorage.setItem('selectedProducts', JSON.stringify(storedData));
        }
      }
    }
    // this.listdata = JSON.parse(sessionStorage.getItem('selectedProducts'))
    this.getProduct()
    this.caculateTotal()
  }
  showConfirmDeleteDialog = false;

  deleteProduct(productId: string) {
    const storedData = JSON.parse(sessionStorage.getItem('selectedProducts'));
    if (storedData) {
      const updatedData = storedData.filter((item: any) => item.id !== productId);
      sessionStorage.setItem('selectedProducts', JSON.stringify(updatedData));
    }
    // this.listdata = JSON.parse(sessionStorage.getItem('selectedProducts'))
    this.getProduct()
    this.caculateTotal()
  }
  addNeworder() {

    const data = {
      'orderDetails': this.listdata
    }
    this.apiService.getListpost ('orders/add-from-cart/' + this.tableId, data).pipe().subscribe(
      (res) => {
        console.log(res);
        sessionStorage.removeItem('selectedProducts');
        this.showSuccessAlert()
        // window.location.reload()

      }, err => {
        this.showErrorAlert()
        console.log(err)
      })
  }
  showSuccessAlert() {
    swal.fire({
      icon: 'success',
      text: 'Gọi món thành công!',
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
  //   ngAfterViewInit() {
  //     // server-side search
  //     fromEvent(this.input.nativeElement,'keyup')
  //         .pipe(
  //             filter(Boolean),
  //             debounceTime(300),
  //             distinctUntilChanged(),
  //             tap((text) => {
  //                 const value = this.input.nativeElement.value;
  //                 this._data = this.data.filter(i => i.id.toString().indexOf(value) > -1)
  //                 // console.log(this.input.nativeElement.value);
  //             })
  //         )
  //         .subscribe();
  // }

  //   fetchList(){
  //     this.data = []
  //     this.apiService.getList('admin/orders/list', 'status=paid').subscribe({
  //         next : res => {
  //             this.data = res.map(i => {
  //                 i['total_price'] = 0
  //                 i['total_quantity'] = 0
  //                 if(i.order_list.length > 0){
  //                     let count = i.order_list.reduce((a, b) => ({price: a.price + b.price, quantity: a.quantity + b.quantity}))
  //                   i['total_price'] = count['price'];
  //                   i['total_quantity'] = count['quantity'];

  //                 }
  //                 return i
  //             })
  //             this._data = [...this.data]
  //             console.log(this.data)
  //             // this.tabs[0].count = res.length
  //             // this.tabs.map((item, index) => {
  //             //     if(index == 0){
  //             //         item.count = res.length
  //             //     }else{
  //             //         item.count = res.filter(i => i.category == index).length
  //             //     }
  //             //     return item
  //             // })
  //             // this.selectedList = [...this.listOrders]

  //             // this.totalCount = res.length()


  //         }
  //     })
  // }
}


