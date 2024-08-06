import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule),
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}), 
   
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
