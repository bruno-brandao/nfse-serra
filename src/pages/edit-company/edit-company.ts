import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edit-company',
  templateUrl: 'edit-company.html',
})
export class EditCompanyPage {
  
  public todo: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.todo = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
  }

}
