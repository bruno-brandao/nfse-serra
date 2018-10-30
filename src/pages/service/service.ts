import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { SingletonProvider } from '../../providers/singleton/singleton';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
})
export class ServicePage {

  services: Array<any>;

  constructor(
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public servicesProvider: ServicesProvider,
    public singleton: SingletonProvider
  ) {
  }

  ionViewDidEnter(){
    this.getServices();
  }

  getServices(){
    this.servicesProvider.getAllServices().then((data: Array<any>) => {
      this.services = data;
    }).catch(error=>{
      let message = this.errorHandler.toString(error);
      if(message != "Não foram encontrados registros!")
        this.singleton.presentToast(message);
      else
        this.services = [];
    });
  }

  addService(){
    this.navCtrl.push("RegisterServicePage");
  }

}
