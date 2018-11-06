import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App, Events } from 'ionic-angular';
import { NfseProvider, NFSE } from '../../providers/nfse/nfse';
import { CompanyProvider } from '../../providers/company/company';
import { SingletonProvider } from '../../providers/singleton/singleton';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@IonicPage()
@Component({
  selector: 'page-new-nfse',
  templateUrl: 'new-nfse.html',
})
export class NewNfsePage {

  nfseData: NFSE;
  showAlert: boolean = false;
  interval: number;
  date: any;
  qtd: any;
  total: number = 0;

  constructor(
    private app: App,
    public companyProvider: CompanyProvider,
    public errorHandler: ErrorHandlerProvider,
    public events: Events,
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public nfseProvider: NfseProvider,
    public singleton: SingletonProvider
  ) {
    this.nfseData = new NFSE();
  }

  ionViewDidLoad() {
    this.companyProvider.getCompanyInStorage().then(()=>{
      this.verifyCompanyData();
      this.nfseData.CompanyId = this.companyProvider.company.CompanyId;
    });
  }

  verifyCompanyData(){
    if(!this.companyProvider.company.IM || !this.companyProvider.company.IE){
      this.singleton.showMessage("", "Para emitir nota fiscal é necessário informar a Inscrição Estadual e Inscrição Municipal");
      this.showAlert = true;
    }
  }

  selectData(type){
    let selectModal = this.modalCtrl.create("SelectDataPage", { select: type, data: this.nfseData });
    selectModal.present();

    this.events.subscribe('modalDidDismissedEvent', (data) => {
      this.nfseData = data; 
      this.nfseData.Total = 0;
      this.nfseData.Itens.forEach((item)=>{
        this.nfseData.Total += item.Value * item.Amount;
      });
      this.events.unsubscribe('modalDidDismissedEvent');
    });

    // selectModal.onDidDismiss(data =>{
    //   this.nfseData = data; 
    //   this.nfseData.Total = 0;
    //   this.nfseData.Itens.forEach((item)=>{
    //     this.nfseData.Total += item.Value * item.Amount;
    //   });
    // });
  }

  formatReal(value){
    return value ? parseFloat(value).toFixed(2).toString().replace(".",",") : "0,00"
  }

  validate(){
    if(!this.date){
      this.singleton.presentToast("Informe a data de vencimento do primeiro boleto");
      return false;
    }else if(!this.interval && this.qtd > 1){
      this.singleton.presentToast("Informe o intervalo de vencimento dos boletos");
      return false;
    }else if(!this.qtd){
      this.singleton.presentToast("Informe a quantidade de boletos da nota fiscal");
      return false;
    }else if(!this.nfseData.TakerId){
      this.singleton.presentToast("Informe o cliente");
      return false;
    }else if(!this.nfseData.CFPSId){
      this.singleton.presentToast("Informe o código");
      return false;
    }else if(!this.nfseData.TaxpayerActivitiesId){
      this.singleton.presentToast("Informe a atividade");
      return false;
    }else if(!this.nfseData.Itens.length){
      this.singleton.presentToast("Informe os serviços");
      return false;
    }
    return true;
  }

  newNfse(){
    if(!this.validate()){
      return;
    }
    this.singleton.showLoading();
    var parts = this.date.split('-');
    let date = new Date(parts[0], parts[1] - 1, parts[2]);
    let value = this.nfseData.Total / this.qtd;
    this.nfseData.Invoices = [];
    for (let index = 0; index < this.qtd; index++) {
      let int = !this.interval ? 0 : this.interval; 
      this.nfseData.Invoices.push({
        Number: index + 1,
        Maturity: date.toISOString().slice(0,10),
        Value: value
      });
      date.setDate((date.getDate() + int));
    }
    this.nfseProvider.newNfse(this.nfseData).then((data: any)=>{
      this.singleton.dismissLoading();
      this.app.getRootNav().setRoot("NfsePage", {}, { animate: true, direction: "back" });
      this.app.getRootNav().insert(1, "NfseViewerPage", { pdf: data.PDF, url: data.UrlNFeS });
    }).catch(error=>{
      this.singleton.dismissLoading();
      this.singleton.presentToast(this.errorHandler.toString(error));
    })
  }

}
