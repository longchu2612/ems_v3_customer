import { Injectable } from '@angular/core';
import { find } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private productInfo: any;
  list = []

  setProductInfo(info: any) {
    this.productInfo = info;
  }

  getProductInfo(): any {
    return this.productInfo;
  }

  add(item){
    let findIndex = this.list.findIndex(i => i.id == item.id)
    if(findIndex >= 0){
      this.list[findIndex].quantity += 1
      this.list[findIndex].totalPrice = this.list[findIndex].price * this.list[findIndex].quantity
    }else{
      this.list.push(item)
    }
  }
  subtract(item){
    let findIndex = this.list.findIndex(i=> i.id == item.id)
    if(this.list[findIndex].quantity > 1){
      this.list[findIndex].quantity -= 1
      this.list[findIndex].totalPrice = this.list[findIndex].price * this.list[findIndex].quantity
    }else{
      this.remove(item.id, item.index)
    }
  }
  remove(id, index){
    this.list = this.list.filter(i => i.id != id)
    // this.list = this.list.splice(index, 1)
  }
  get(){
    return this.list
  }
}
