import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public todo: FormGroup;

  user = {
    "Name": "sample string 2",
    "LastName": "sample string 3",
    "CPF": "sample string 4",
    "Email": "sample string 5",
    "Password": "sample string 6",
    "Active": true
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
  ) {
    this.todo = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
  }

}
