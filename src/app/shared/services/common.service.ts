import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  

  selectOrder$ = new BehaviorSubject(null)
  _selectOrder = this.selectOrder$.asObservable()

  setOrder(item){
    this.selectOrder$.next(item)
  }

  getOrder(){
    return this.selectOrder$.getValue()
  }

  loaderService(){
    return new Promise(resolve => {
      resolve(null)
  });
  }
}
