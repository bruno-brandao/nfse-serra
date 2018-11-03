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

  service: any;

  constructor(
    public companyProvider: CompanyProvider,
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public servicesProvider: ServicesProvider,
    public singleton: SingletonProvider
  ) {
    this.service = this.navParams.get("service") || {};
  }

  ionViewDidLoad() {
  }

  saveService(){
    this.service.Value = this.service.Value.toString().replace(",", ".");
    this.singleton.showLoading();
    if(!this.service.ServicesId){
      this.servicesProvider.saveService(this.service).then((data)=>{
        this.singleton.dismissLoading();
        this.service = data;
        this.navCtrl.pop();
      }).catch((error)=>{
        this.singleton.dismissLoading();
        this.singleton.presentToast(this.errorHandler.toString(error));
      });
    }else{
      this.servicesProvider.putService(this.service).then((data)=>{
        this.singleton.dismissLoading();
        this.navCtrl.pop();
      }).catch((error)=>{
        this.singleton.dismissLoading();
        this.singleton.presentToast(this.errorHandler.toString(error));
      });
    }
  }

}
