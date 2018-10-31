import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-new-nfse',
  templateUrl: 'new-nfse.html',
})
export class NewNfsePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  selectData(type){
    this.navCtrl.push("SelectDataPage", { select: type });
  }

}
