import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TimePipe } from './pipe/time.pipe';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

const antDesignIcons = AllIcons as {
    [key: string]: IconDefinition;
  };
  const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


const antdModule = [
    NzIconModule.forRoot(icons),
    NzButtonModule,
    NzBreadCrumbModule,
    NzDatePickerModule,
    NzTableModule,
    NzTabsModule,
    NzSelectModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    NzDropDownModule,
    NzSpinModule,
    NzModalModule,
    NzInputNumberModule,
    NzSpaceModule
]


@NgModule({
    declarations: [
        LoadingComponent,
        TimePipe,
        FooterComponent
    ],
    imports: [
        CommonModule,
        antdModule,
        HttpClientModule,

        NzModalModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        antdModule,
        LoadingComponent,
        HttpClientModule,
        FormsModule,
        TimePipe,
        OwlNativeDateTimeModule,
        OwlDateTimeModule,
        NzModalModule,
        FooterComponent
    ]
})
export class SharedModule { }
