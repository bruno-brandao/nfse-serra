import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register-taker',
  templateUrl: 'register-taker.html',
})
export class RegisterTakerPage {

  tpPessoa: string = "pf";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterTakerPage');
  }

}
