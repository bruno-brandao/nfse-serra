import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicePage } from './service';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    ServicePage,
  ],
  imports: [
    IonicPageModule.forChild(ServicePage),
    BrMaskerModule
  ],
})
export class ServicePageModule {}
