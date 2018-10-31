import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { TakerProvider } from '../../providers/taker/taker';
import { SingletonProvider } from '../../providers/singleton/singleton';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { NfseProvider } from '../../providers/nfse/nfse';

@IonicPage()
@Component({
  selector: 'page-select-data',
  templateUrl: 'select-data.html',
})
export class SelectDataPage {

  param: any;
  data: any;

  constructor(
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public nfProvider: NfseProvider,
    public servicesProvider: ServicesProvider,
    public singleton: SingletonProvider,
    public takerProvider: TakerProvider
  ) {
    this.param = navParams.get("select");
  }

  ionViewDidLoad() {
    console.log(this.param);
    if(this.param == 'taker'){
      this.getTakers();
    }else if(this.param == 'services'){
      this.getServices();
    }else if(this.param == 'code'){
      this.getCodes();
    }else if(this.param == 'activities'){
      this.getActivities();
    }
  }

  getServices(){
    this.servicesProvider.getAllServices().then(data=>{
      this.data = data;
    }).catch(error=>{
      this.singleton.presentToast(this.errorHandler.toString(error));
    });
  }

  getTakers(){
    this.takerProvider.getAllTakers().then(data=>{
      this.data = data;
    }).catch(error=>{
      this.singleton.presentToast(this.errorHandler.toString(error));
    });
  }

  getCodes(){
    this.nfProvider.getCodes().then(data=>{
      this.data = data;
    }).catch(error=>{
      this.singleton.presentToast(this.errorHandler.toString(error));
    });
  }

  getActivities(){
    this.nfProvider.getActivities().then(data=>{
      this.data = data;
    }).catch(error=>{
      this.singleton.presentToast(this.errorHandler.toString(error));
    });
  }

  formatReal(value){
    return parseFloat(value).toFixed(2).toString().replace(".",",")
  }

  selectTaker(){

  }

  selectServices(){
    
  }

  selectCode(){
    
  }

  selectActivity(){
    
  }

}
