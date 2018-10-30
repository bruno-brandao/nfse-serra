import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TakerProvider } from '../../providers/taker/taker';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { SingletonProvider } from '../../providers/singleton/singleton';

@IonicPage()
@Component({
  selector: 'page-taker',
  templateUrl: 'taker.html',
})
export class TakerPage {

  takers: Array<any>;

  constructor(
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public singleton: SingletonProvider,
    public takersProvider: TakerProvider
  ) {
  }

  ionViewDidLoad() {
    this.getTakers();
  }

  getTakers(){
    this.takersProvider.getAllTakers().then((data: Array<any>) => {
      this.takers = data;
    }).catch(error=>{
      let message = this.errorHandler.toString(error);
      if(message != "Não foram encontrados registros!")
        this.singleton.presentToast(message);
      else
        this.takers = [];
    });
  }

  addTaker(){
    this.navCtrl.push("RegisterTakerPage");
  }

}
