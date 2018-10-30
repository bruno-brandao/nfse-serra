import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { SingletonProvider } from '../../providers/singleton/singleton';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { CompanyProvider } from '../../providers/company/company';

@IonicPage()
@Component({
  selector: 'page-register-service',
  templateUrl: 'register-service.html',
})
export class RegisterServicePage {

  service: any = {};

  constructor(
    public companyProvider: CompanyProvider,
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public servicesProvider: ServicesProvider,
    public singleton: SingletonProvider
  ) {
  }

  ionViewDidLoad() {
  }

  saveService(){
    this.servicesProvider.saveService(this.service).then((data)=>{
      this.service = data;
      this.navCtrl.pop();
    }).catch((error)=>{
      this.singleton.presentToast(this.errorHandler.toString(error));
    });
  }

}
