import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShippingCompanyPage } from './shipping-company';

@NgModule({
  declarations: [
    ShippingCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(ShippingCompanyPage),
  ],
})
export class ShippingCompanyPageModule {}
