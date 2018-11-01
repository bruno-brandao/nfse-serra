import { SingletonProvider } from './../../providers/singleton/singleton';
import { NfseProvider } from './../../providers/nfse/nfse';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@IonicPage()
@Component({
  selector: 'page-nfse',
  templateUrl: 'nfse.html',
})
export class NfsePage {

  data: Array<any>;

  constructor(
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public nfseProvider: NfseProvider,
    public singleton: SingletonProvider
  ) {
  }

  ionViewDidEnter(){
    this.getNfse();
  }

  getNfse(){
    this.nfseProvider.getAllNfse().then((data: Array<any>) => {
      this.data = data;
    }).catch(error=>{
      let message = this.errorHandler.toString(error);
      if(message != "Não foram encontrados registros!"){
        this.singleton.presentToast(message);
      }else{
        this.data = [];
      }
    });
  }

  openPDF(URL){
    this.navCtrl.push("NfseViewerPage", {pdf: URL});
  }

  newNfse(){
    this.navCtrl.push("NewNfsePage");
  }
}
