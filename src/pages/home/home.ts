import { UserServiceProvider } from './../../providers/user-service/user-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { SingletonProvider } from '../../providers/singleton/singleton';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public errorHandler: ErrorHandlerProvider,
    private companyProvider: CompanyProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserServiceProvider,
    public singleton: SingletonProvider
  ) {
  }

  ionViewDidLoad() {
    this.userProvider.getUserStorage().then(()=>{
      this.companyProvider.getUserCompany().then(data=>{

      }).catch(error=>{
        let message = this.errorHandler.toString(error);
        if(message != "Não foram encontrados registros!"){
          this.singleton.presentToast(message);
        }else{
          if(!this.companyProvider.company){
            this.navCtrl.setRoot('RegisterCompanyPage');
          }
        }
      });
    });
  }

  newNfse(){
    this.navCtrl.push("NewNfsePage");
  }

}
