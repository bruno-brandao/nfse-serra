import { SingletonProvider } from './../../providers/singleton/singleton';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TakerProvider, Taker } from '../../providers/taker/taker';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@IonicPage()
@Component({
  selector: 'page-register-taker',
  templateUrl: 'register-taker.html',
})
export class RegisterTakerPage {

  tpPessoa: string = "PJ";
  taker: Taker = new Taker();

  constructor(
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public singleton: SingletonProvider,
    public takerProvider: TakerProvider
  ) {
    this.taker.TypePerson = this.tpPessoa;
  }

  ionViewDidLoad() {
  }

  saveData(){
    if(!this.validateInputs()){
      return;
    }
    this.taker.CPF_CNPJ = this.taker.CPF_CNPJ.replace(/\D/g, '');
    this.takerProvider.addTaker(this.taker).then((data: Taker) => {
      this.taker = data;
    }).catch(error=>{
      this.singleton.presentToast(this.errorHandler.toString(error));
    });
  }

  validateInputs(){
    if(!this.taker.CPF_CNPJ){
      if(this.tpPessoa == "pf")
        this.singleton.presentToast("Informe o CPF do cliente");
      else
        this.singleton.presentToast("Informe o CNPJ do cliente");
      return false;
    }else if(!this.taker.Name){
      this.singleton.presentToast("Informe o nome do cliente");
      return false;
    }else if(!this.taker.RG_IE){
      if(this.tpPessoa == "pf")
        this.singleton.presentToast("Informe o RG do cliente");
      else
        this.singleton.presentToast("Informe a Inscrição Estadual do cliente");
        false;
    }else if(!this.taker.Telephone){
      this.singleton.presentToast("Informe o telefone do cliente");
      return false;
    }else if(!this.taker.Email){
      this.singleton.presentToast("Informe o email do cliente");
      return false;
    }else if(!this.taker.CEP){
      this.singleton.presentToast("Informe o CEP do cliente");
      return false;
    }else if(!this.taker.Street){
      this.singleton.presentToast("Informe a rua do cliente");
      return false;
    }else if(!this.taker.State){
      this.singleton.presentToast("Informe o estado do cliente");
      return false;
    }else if(!this.taker.Neighborhood){
      this.singleton.presentToast("Informe o bairro do cliente");
      return false;
    }
    return true;
  }

  changeTpPerson(){
    this.taker.CPF_CNPJ = null;
    this.taker.Name = null;
    this.taker.NameFantasy = null;
    this.taker.IM = null;
    this.taker.TypePerson = this.tpPessoa;
  }

}
