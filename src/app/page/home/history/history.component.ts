import { ApiService } from 'src/app/shared/services/api.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import swal from 'sweetalert2';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

    constructor(
        private apiService: ApiService
    ) { }

    @ViewChild('input') input: ElementRef;

    listData = []
    name = localStorage.getItem('name');
    _data = []
    totalPrice = 0
    totalQuantity = 0
    totalPendingQuantity = 0
    totalDoneQuantity = 0
    totalPendingPrice = 0
    totalServingQuantity = 0
    totalServingPrice = 0
    totalDonePrice
    orderId = ''
    pending: boolean = true
    selectedStatus: number = 0;
    status: number
    ngOnInit() {
        this.orderId = localStorage.getItem('tableId');
        this.fetchList(0)
    }
    getproducts() {
        this.listData = JSON.parse(sessionStorage.getItem('orderDetails'))
    }
    fetchList(statusID: number = 0) {
        this.selectedStatus = statusID;
        this.apiService.getListData('orders/detail/' + this.orderId + `?status=${statusID}`).subscribe({
            next: res => {
                const data = res['orderDetails']
                this.totalPrice = res['totalPrice']
                this.status = statusID
                console.log(data);
                this.totalDonePrice = 0
                this.totalPendingPrice = 0
                this.totalQuantity = 0
                this.totalPendingQuantity = 0
                for (let i = 0; i < data.length; i++) {
                    if(this.status === 1)
                        {
                            this.totalPendingQuantity += data[i].pending
                            this.totalPendingPrice += data[i].pending * data[i].price
                        }
                    if(this.status === 3){
                        this.totalServingQuantity += data[i].serving
                        this.totalServingPrice += data[i].serving * data[i].price
                    }
                    if (this.status === 4){
                        this.totalDoneQuantity += data[i].done
                        this.totalDonePrice += data[i].done * data[i].price
                    }
                    if(data[i].quantity === 0){
                        this.totalQuantity += (data[i].pending + data[i].done + data[i].serving + data[i].inProgress + data[i].pay)
                        this.totalPrice +=  (data[i].pending + data[i].done + data[i].serving + data[i].inProgress + data[i].pay) * data[i].price
                    }
                    // this.totalQuantity += data[i].quantity
                }
                // if (this.status == 1){
                sessionStorage.setItem('orderDetails', JSON.stringify(data))
                // this.tabs[0].count = res.length
                // this.tabs.map((item, index) => {
                //     if(index == 0){
                //         item.count = res.length
                //     }else{
                //         item.count = res.filter(i => i.category == index).length
                //     }
                //     return item
                // })
                // this.selectedList = [...this.listOrders]

                // this.totalCount = res.length()

                this.getproducts()
            }
        })
    }
    filterStatus(status) {
        this.pending = false
        if (status == 1) {
            this.pending = true
        }
        if (status == 0) {
            this.pending = true
        }

        this.fetchList(status)
    }
    updateOrder() {
        let order = JSON.parse(sessionStorage.getItem('orderDetails'))
        const data = {
            'orderDetails' : order
        }
        this.apiService.putListData('orders/update/' + this.orderId, data).subscribe({
            next: res => {
                this.showSuccessAlert()
                console.log(res);
            },error: e => {
                this.showErrorAlert()
            }
        })
    }


    increaseQuantity(productId: string) {
        const storedData = JSON.parse(sessionStorage.getItem('orderDetails'));
        if (storedData) {
            // Tìm sản phẩm trong mảng `storedData` dựa trên `productId`
            const productIndex = storedData.findIndex((item: any) => item.id === productId);
            if (productIndex !== -1) {
                // Tăng số lượng sản phẩm
                storedData[productIndex].quantity++;
                // Cập nhật lại sessionStorage
                sessionStorage.setItem('orderDetails', JSON.stringify(storedData));
            }
        }
        this.getproducts()
    }
    decreaseQuantity(productId: string) {
        const storedData = JSON.parse(sessionStorage.getItem('orderDetails'));
        if (storedData) {
            // Tìm sản phẩm trong mảng `storedData` dựa trên `productId`
            const productIndex = storedData.findIndex((item: any) => item.id === productId);
            if (productIndex !== -1) {
                // Giảm số lượng sản phẩm
                if (storedData[productIndex].quantity > 1) {
                    storedData[productIndex].quantity--;
                    // Cập nhật lại sessionStorage
                    sessionStorage.setItem('orderDetails', JSON.stringify(storedData));
                }
            }
        }
        this.getproducts()
    }
    increasePending(productId: string) {
        const storedData = JSON.parse(sessionStorage.getItem('orderDetails'));
        if (storedData) {
            // Tìm sản phẩm trong mảng `storedData` dựa trên `productId`
            const productIndex = storedData.findIndex((item: any) => item.id === productId);
            if (productIndex !== -1) {
                // Tăng số lượng sản phẩm
                storedData[productIndex].pending++;
                this.totalPendingPrice += storedData[productIndex].price
                this.totalPendingQuantity++
                // Cập nhật lại sessionStorage
                sessionStorage.setItem('orderDetails', JSON.stringify(storedData));
            }
        }
        this.getproducts()
    }
    decreasePending(productId: string) {
        const storedData = JSON.parse(sessionStorage.getItem('orderDetails'));
        if (storedData) {
            // Tìm sản phẩm trong mảng `storedData` dựa trên `productId`
            const productIndex = storedData.findIndex((item: any) => item.id === productId);
            if (productIndex !== -1) {
                // Giảm số lượng sản phẩm
                if (storedData[productIndex].pending > 1) {
                    storedData[productIndex].pending--;
                    this.totalPendingPrice -= storedData[productIndex].price
                    this.totalPendingQuantity--
                    // Cập nhật lại sessionStorage
                    sessionStorage.setItem('orderDetails', JSON.stringify(storedData));
                }
            }
        }
        this.getproducts()
    }
    showConfirmDeleteDialog = false;

    deleteProduct(productId: string) {
        const storedData = JSON.parse(sessionStorage.getItem('orderDetails'));
        if (storedData) {
            this.totalPendingQuantity -= storedData.find((item: any) => item.id === productId).pending
            this.totalPendingPrice -= storedData.find((item: any) => item.id === productId).pending * storedData.find((item: any) => item.id === productId).price
            const updatedData = storedData.filter((item: any) => item.id !== productId);
            sessionStorage.setItem('orderDetails', JSON.stringify(updatedData));
        }
        this.getproducts()
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
}
