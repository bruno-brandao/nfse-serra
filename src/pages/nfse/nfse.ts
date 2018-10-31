import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-nfse',
  templateUrl: 'nfse.html',
})
export class NfsePage {

  data: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  newNfse(){
    this.navCtrl.push("NewNfsePage");
  }
}
