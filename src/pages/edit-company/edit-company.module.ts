import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCompanyPage } from './edit-company';

@NgModule({
  declarations: [
    EditCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCompanyPage),
  ],
})
export class EditCompanyPageModule {}
