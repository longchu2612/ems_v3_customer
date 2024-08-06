import { CommonService } from '../../../shared/services/common.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-finish',
    templateUrl: './finish.component.html',
    styleUrls: ['./finish.component.scss']
})
export class FinishComponent {

    constructor(
        private commonService: CommonService
    ) {
        this.data = this.commonService.getOrder()
    }

    data

    ngOnInit(){
        console.log(this.data)
    }

    money = 69
}
