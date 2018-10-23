import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterCompanyPage } from './register-company';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    RegisterCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterCompanyPage),
    BrMaskerModule,
  ],
})
export class RegisterCompanyPageModule {}
