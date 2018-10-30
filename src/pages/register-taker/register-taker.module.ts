import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterTakerPage } from './register-taker';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    RegisterTakerPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterTakerPage),
    BrMaskerModule
  ],
})
export class RegisterTakerPageModule {}
