import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewNfsePage } from './new-nfse';

@NgModule({
  declarations: [
    NewNfsePage,
  ],
  imports: [
    IonicPageModule.forChild(NewNfsePage),
  ],
})
export class NewNfsePageModule {}
