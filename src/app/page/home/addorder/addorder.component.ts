import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ProductService } from 'src/app/shared/services/product.service';

export interface Product{
  name: string,
  price: number,
  quantity:number,
  totalPrice:number,
}

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.scss']
})
export class AddorderComponent {
  constructor(
    private apiService: ApiService,
    private commonSevice: CommonService,
    private router: Router,
    private productService: ProductService
  ){}

  products:any;

  ngOnInit(): void {
    this.getProductsList()
  }

  getProductsList(){
    const data = {}
    this.apiService.getListpost('products/list', data).pipe(map(item=>item['content'])).subscribe(
      (data:Product)=>{
        this.productData = data
      }, err => {
        console.log(err)
      })
  }

  productData
  product: Product= {
    name: '',
    price: 0,
    quantity: 1,
    totalPrice: 0
  }

  takeInfo(a){
    this.productService.setProductInfo(a);
  }

}
