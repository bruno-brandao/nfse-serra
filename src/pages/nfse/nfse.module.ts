import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NfsePage } from './nfse';

@NgModule({
  declarations: [
    NfsePage,
  ],
  imports: [
    IonicPageModule.forChild(NfsePage),
  ],
})
export class NfsePageModule {}
