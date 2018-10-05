import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms'

import { ValidationProvider as ValidationService } from '../../providers/validation/validation'

@Component({
	selector: 'validation-messages',
	template: '<div *ngIf="errorMessage !== null" text-left><p class="invalid">{{errorMessage}}</p></div>'
})
export class ValidationMessagesComponent {

	_errorMessage: string;
	@Input() control: FormControl;

	constructor() { }

	get errorMessage() {
		if(this.control) {
			for(let propertyName in this.control.errors) {
				if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
					this._errorMessage = ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
					return this._errorMessage;
				}
			}
		}
		
		return null;
	}
}