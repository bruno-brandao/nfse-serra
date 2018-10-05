import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';
import { ValidationMessagesComponent } from './validation-messages/validation-messages';
@NgModule({
	declarations: [ValidationMessagesComponent],
	imports: [IonicPageModule],
	exports: [ValidationMessagesComponent]
})
export class ComponentsModule {}
