import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyPage } from './company';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    CompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyPage),
    BrMaskerModule
  ],
})
export class CompanyPageModule {}
