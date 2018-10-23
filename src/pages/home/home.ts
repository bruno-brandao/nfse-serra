import { UserServiceProvider } from './../../providers/user-service/user-service';
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
    public navParams: NavParams,
    public userProvider: UserServiceProvider
  ) {
  }

  ionViewDidLoad() {
    this.userProvider.getUserStorage().then(()=>{
      this.companyProvider.getUserCompany().then(data=>{}).catch(error=>{}).then(()=>{
        if(!this.companyProvider.company){
          this.navCtrl.setRoot('RegisterCompanyPage');
        }
      })
    });
  }

}
