import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading$$.asObservable();

  setLoading(isLoading: boolean) {
    this.isLoading$$.next(isLoading);
  }
  // loader = new BehaviorSubject<boolean>(false)
  // constructor() { }

  // loadCount = 0
  // setLoading(value){
  //   if(value){
  //     this.loadCount++
  //   }else{
  //     this.loadCount--
  //   }
  //   if(this.loadCount == 0){
  //     this.loader.next(false)
  //   }else{
  //     this.loader.next(true)
  //   }
  // }
}
