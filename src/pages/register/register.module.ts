import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';

import { BrMaskerModule } from 'brmasker-ionic-3';
import {ComponentsModule} from '../../components/components.module';


@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    ComponentsModule,
    BrMaskerModule
  ],
})
export class RegisterPageModule {}
