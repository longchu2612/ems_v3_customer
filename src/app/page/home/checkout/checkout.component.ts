import { CommonService } from '../../../shared/services/common.service';
import { ApiService } from './../../../shared/services/api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

    constructor(
        private apiService: ApiService,
        private commonSevice: CommonService,
        private router: Router
    ){
        this.data = this.commonSevice.getOrder()
        console.log(this.data)
    }

    data = null

    ngOnInit(){
        if(!this.data){

        }
    }

    increase(i){
        alert('coming soon')
    }

    decrease(i){
      alert('coming soon')
    }

    submitCheckout(){
        this.router.navigate(['/payment'])
    }
}
