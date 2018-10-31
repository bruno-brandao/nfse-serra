import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';
import { SingletonProvider } from '../../providers/singleton/singleton';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@IonicPage()
@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {

  company: any;

  constructor(
    public companyProvider: CompanyProvider,
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public singleton: SingletonProvider
  ) {
  }

  ionViewDidLoad() {
    if(this.companyProvider.company)
      this.company = this.companyProvider.company;
    else
      this.companyProvider.getCompanyInStorage().then(data =>{
        this.company = data;
      }).catch(error => {
        this.singleton.presentToast(this.errorHandler.toString(error));
      });
  }

  saveCompanyData(){
    this.singleton.showLoading();
    this.companyProvider.putCompany(this.company).then(data=>{
      this.company = data;
      this.singleton.dismissLoading();
    }).catch(error=>{
      this.singleton.presentToast(this.errorHandler.toString(error));
      this.singleton.dismissLoading();
    });
  }
}
