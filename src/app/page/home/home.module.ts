import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home.component';
import { Route, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { FinishComponent } from './finish/finish.component';
import { AccountComponent } from './account/account.component';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { BankComponent } from './bank/bank.component';
import { InformationaccountComponent } from './informationaccount/informationaccount.component';
import { ChangeinformationComponent } from './changeinformation/changeinformation.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HistoryComponent } from './history/history.component';
import { NotificationComponent } from './notification/notification.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { SupportComponent } from './support/support.component';
import { AddorderComponent } from './addorder/addorder.component';
import { NotificationorderComponent } from './notificationorder/notificationorder.component';
import { NeworderComponent } from './neworder/neworder.component';
import { BillComponent } from './bill/bill.component';
import { QRCodeModule } from 'angularx-qrcode';
import { HomeComponent1 } from '../home/home/home.component';
import { SupportandPaysComponent } from './supportand-pays/supportand-pays.component';


const route: Route[] = [ {
  path: '',
  component: HomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'order',
      component: OrderComponent
    },
    {
      path: 'checkout',
      component: CheckoutComponent
    },
    {
      path: 'payment',
      component: PaymentComponent
    },
    {
      path: 'finish',
      component: FinishComponent
    },
    {
      path: 'users',
      component: AccountComponent
    },
    {
      path: 'account',
      component: SupportandPaysComponent
    },
    {
      path: 'changepassword',
      component: ChangepasswordComponent
    },
    {
      path: 'bank',
      component: BankComponent
    },
    {
      path: 'informationaccount',
      component: InformationaccountComponent
    },
    {
      path: 'changeinformation',
      component: ChangeinformationComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'signup',
      component: SignupComponent
    },
    {
      path: 'history',
      component: HistoryComponent
    },
    {
      path: 'noti',
      component: NotificationComponent
    },
    // {
    //   path: 'account',
    //   component: AccountComponent
    // },
    {
      path: 'forgetpassword',
      component: ForgetpasswordComponent
    },
    {
      path: 'qrcode',
      component: QrcodeComponent
    },
    {
      path: 'support',
      component: SupportComponent
    },
    {
      path: 'addorder',
      component: AddorderComponent
    },
    {
      path: 'notificationorder',
      component: NotificationorderComponent
    },
    {
      path: 'neworder',
      component: NeworderComponent
    },
    {
      path: 'bill',
      component: BillComponent
    }
  ]
} ]

@NgModule({
  declarations: [
    OrderComponent,
    PaymentComponent,
    HomeComponent,
    CheckoutComponent,
    FinishComponent,
    AccountComponent,
    ChangepasswordComponent,
    BankComponent,
    InformationaccountComponent,
    ChangeinformationComponent,
    LoginComponent,
    SignupComponent,
    HistoryComponent,
    NotificationComponent,
    NotificationorderComponent,
    AccountComponent,
    ForgetpasswordComponent,
    QrcodeComponent,
    SupportComponent,
    AddorderComponent,
    NeworderComponent,
    BillComponent,
    SupportandPaysComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(route),
    QRCodeModule,
  ],
   
  providers: [DecimalPipe]
})
export class HomeModule { }
