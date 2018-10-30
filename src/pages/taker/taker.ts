import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-taker',
  templateUrl: 'taker.html',
})
export class TakerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  addTaker(){
    this.navCtrl.push("RegisterTakerPage");
  }

}
