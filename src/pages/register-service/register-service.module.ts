import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterServicePage } from './register-service';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    RegisterServicePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterServicePage),
    BrMaskerModule
  ],
})
export class RegisterServicePageModule {}
