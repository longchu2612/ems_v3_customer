import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import swal from 'sweetalert2';
import { ProductService } from 'src/app/shared/services/product.service';
import { ModalTypes } from 'ng-zorro-antd/modal';

export interface Product {
  name: string,
  price: number,
  quantity: number,
  totalPrice: number,
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  constructor(
    private apiService: ApiService,
    private commonSevice: CommonService,
    private router: Router,
    private productService: ProductService
  ) { }
  productData
  selectedProduct: any
  isVisible = false;
  isConfirmLoading = false;
  note = ''
  quantity = 1
  listIdCate = []
  listCategories = []
  listCategoriesName = [{
    id: null, categoryName : 'Tất cả'
  }]
  productsByCategory = {};
  name = localStorage.getItem('name');
  ngOnInit(): void {
    this.getCategoryList()
    this.getProductsList(null, this.searchQuery)
  }
  showDropdown = false;
  openModal(product): void {
    this.showDropdown = false
    this.note = ''
    this.quantity = 1
    this.selectedProduct = product;
    this.isVisible = true;
    console.log(product);
    
  }

  handleOk(): void {
    let selectedProducts = JSON.parse(sessionStorage.getItem('selectedProducts') || '[]');
    const data = 
     {...this.selectedProduct,quantity :this.quantity,note :this.note, status: null}
    selectedProducts.push(data);
    sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    this.isVisible = false;
    this.showSuccessAlert()
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  isActive: boolean = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }
  searchQuery: string = '';

  performSearch() {
    this.getProductsList('',this.searchQuery)
  }
  selectCategory(category: string) {
    this.getProductsList(category, this.searchQuery)
  }
  getCategoryList() {
    const data = {}
    this.apiService.getListpost('categories/list', data).pipe(map(item => item['content'])).subscribe(
      (data) => {
        this.listCategoriesName = [...this.listCategoriesName, ...data.filter(x => x.status === true)];
      }, err => {
        console.log(err)
      })
  }
  getProductsList(categoryId,name) {
    this.apiService.getListpost('products/list', {categoryId,name}).pipe(map(item => item['content'])).subscribe(
      (data: Product) => {
        this.productData = data
        const listCategories = []
        const productsByCategory =[]
        this.productData.forEach(product => {
          if (!productsByCategory[product.categoryName]) {
            productsByCategory[product.categoryName] = [];
            listCategories.push(product.categoryName)
          
          }
          productsByCategory[product.categoryName].push(product);
        });
        this.listCategories = listCategories
        this.productsByCategory = productsByCategory
      }, err => {
        console.log(err)
      })
  }

    showSuccessAlert() {
      swal.fire({
        icon: 'success',
        text: 'Thêm vào giỏ hàng!',
        width: 300, // Điều chỉnh chiều rộng
        padding: '1rem', // Điều chỉnh padding
        confirmButtonColor: '#28a745' // Màu xanh cho nút OK
      });
    }
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      } else {
        alert("Số lượng không thể nhỏ hơn 1.");
      }
    }
  
    increaseQuantity() {
      this.quantity++;
    }
  }
