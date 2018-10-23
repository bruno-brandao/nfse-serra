import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    private companyProvider: CompanyProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    this.getUserCompany();
  }

  getUserCompany(){
    this.companyProvider.getUserCompany().then((data)=>{
      console.log(data);
    }).catch((error)=>{
      console.log(error);
    });
  }

}
