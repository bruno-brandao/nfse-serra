import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { TakerProvider } from '../../providers/taker/taker';
import { SingletonProvider } from '../../providers/singleton/singleton';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { NfseProvider, NFSE } from '../../providers/nfse/nfse';

@IonicPage()
@Component({
  selector: 'page-select-data',
  templateUrl: 'select-data.html',
})
export class SelectDataPage {

  param: any;
  data: any;
  nfseData: NFSE;

  constructor(
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public nfProvider: NfseProvider,
    public servicesProvider: ServicesProvider,
    public singleton: SingletonProvider,
    public takerProvider: TakerProvider,
    public viewController: ViewController
  ) {
    this.param = navParams.get("select");
    this.nfseData = navParams.get("data");
  }

  ionViewDidLoad() {
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
      if(this.nfseData.Itens.length){
        this.nfseData.Itens.map((item, i)=>{
          this.data.find((element, j)=>{
            if(item.ServicesId == element.ServicesId){
              element.Amount = item.Amount;
              return;
            }
          });
        })
      }
    }).catch(error=>{
      let message = this.errorHandler.toString(error);
      if(message == "Não foram encontrados registros!"){
        this.data = [];
      }else{
        this.singleton.presentToast(message);
      }
      
    });
  }

  getTakers(){
    this.takerProvider.getAllTakers().then(data=>{
      this.data = data;
    }).catch(error=>{
      let message = this.errorHandler.toString(error);
      if(message == "Não foram encontrados registros!"){
        this.data = [];
      }else{
        this.singleton.presentToast(message);
      }
    });
  }

  getCodes(){
    this.nfProvider.getCodes().then(data=>{
      this.data = data;
    }).catch(error=>{
      let message = this.errorHandler.toString(error);
      if(message == "Não foram encontrados registros!"){
        this.data = [];
      }else{
        this.singleton.presentToast(message);
      }
    });
  }

  getActivities(){
    this.nfProvider.getActivities().then(data=>{
      this.data = data;
    }).catch(error=>{
      let message = this.errorHandler.toString(error);
      if(message == "Não foram encontrados registros!"){
        this.data = [];
      }else{
        this.singleton.presentToast(message);
      }
    });
  }

  formatReal(value){
    return parseFloat(value).toFixed(2).toString().replace(".",",")
  }

  isSelected(service): boolean{
    return this.nfseData.Itens.find(el => el.ServicesId == service.ServicesId)
  }

  selectTaker(taker){
    this.nfseData.TakerName = taker.Name;
    this.nfseData.TakerId = taker.TakerId;
    this.viewController.dismiss(this.nfseData);
  }

  selectServices(service){
    if(this.nfseData.Itens.length){
      let index = this.nfseData.Itens.findIndex(i => i.ServicesId === service.ServicesId)
      if(index != -1){
        this.nfseData.Itens.splice(index, 1);
      }else{
        this.nfseData.Itens.push(service);
      }
    }else{
      this.nfseData.Itens.push(service);
    }
  }

  addServices(service){
    if(!service.Amount){
      service.Amount = 1;
      this.nfseData.Itens.push(service)
    }else{
      service.Amount += 1;
      this.nfseData.Itens.map((item)=>{
        if(item.ServicesId == service.ServicesId){
          item.Amount = service.Amount;
        }
      });
    }
  }

  removeServices(service){
    service.Amount = service.Amount - 1;
    if(service.Amount == 0){
      this.nfseData.Itens = this.nfseData.Itens.filter((item)=>{
        return item.ServicesId != service.ServicesId;
      });
    }
  }

  selectCode(code){
    this.nfseData.CFPSName = code.Description;
    this.nfseData.CFPSId = code.CFPSId;
    this.viewController.dismiss(this.nfseData);
  }

  selectActivity(activity){
    this.nfseData.ActivitiesName = activity.Description;
    this.nfseData.TaxpayerActivitiesId = activity.TaxpayerActivitiesId;
    this.viewController.dismiss(this.nfseData);
  }

  backClickHandler(){
    this.viewController.dismiss(this.nfseData);
  }

}
