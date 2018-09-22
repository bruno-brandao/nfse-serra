import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakerPage } from './taker';

@NgModule({
  declarations: [
    TakerPage,
  ],
  imports: [
    IonicPageModule.forChild(TakerPage),
  ],
})
export class TakerPageModule {}
