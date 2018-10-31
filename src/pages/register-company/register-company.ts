import { UserServiceProvider } from './../../providers/user-service/user-service';
import { CompanyProvider, Company } from './../../providers/company/company';
import { SingletonProvider } from './../../providers/singleton/singleton';
import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@IonicPage()
@Component({
  selector: 'page-register-company',
  templateUrl: 'register-company.html',
})
export class RegisterCompanyPage {
  company: Company;
  @ViewChild(Slides) slides: Slides;
  loading: boolean = false;
  hasError: boolean = false;
  cnpj: any;

  constructor(
    public companyProvider: CompanyProvider,
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public singleton: SingletonProvider,
    public statusBar: StatusBar,
    public userProvider: UserServiceProvider
  ) {
		this.statusBar.hide();
	}

	ionViewDidLoad() {
		this.setContent();
  }
  
  getCompanyData(){
    if(this.cnpj.length == 18){
      this.singleton.showLoading("Buscando as informações da sua empresa...");
      let cnpjNumber = this.cnpj.replace(/\D/g, '');
      this.companyProvider.getCompanyDataInReceita(cnpjNumber).then((data: any)=>{
        if(data.status == "ERROR"){
          this.singleton.dismissLoading();
          this.singleton.presentToast(data.message);
        }else{
          console.log(data);
          this.company = new Company();
          this.company.UserId = this.userProvider.user.UserId;
          this.company.CNPJ = cnpjNumber;
          this.company.Email = this.userProvider.user.Email;
          this.company.Telephone = data.telefone.split('/')[0].replace(/\D/g, '');
          this.company.Name = data.nome;
          this.company.NameFantasy = data.fantasia;
          this.company.CEP = data.cep.replace(/\D/g, '');
          this.company.State = data.uf;
          this.company.City = data.municipio;
          this.company.Neighborhood = data.bairro;
          this.company.Street = data.logradouro;
          this.companyProvider.createCompany(this.company).then(()=>{
            this.singleton.dismissLoading();
            this.navCtrl.setRoot("HomePage");
          }).catch(error=>{
            this.singleton.dismissLoading();
            this.singleton.presentToast(this.errorHandler.toString(error));
          });
        }
      }).catch(error=>{
        console.log(error)
        this.singleton.dismissLoading();
        this.singleton.presentToast("Não encontramos informações deste CNPJ, verifique os números e tente novamente");
      });
    }
  }

	setContent(){
	}

	nextSlide() {
		this.slides.slideNext(350);
	}

	openListPage() {
		// this.singleton.showLoading("Salvando respostas, aguarde...");
		// this.spmktService.saveAnswers({ "answers" : this.questions }).then((data)=>{
		// 	this.hasError = false;
		// 	this.singleton.dismissLoading();
		// 	let opts: NavOptions = {
		// 		animate: true,
		// 		animation: 'wp-transition',
		// 		duration: 600
		// 	}
		// 	this.navCtrl.setRoot("TabsPage", {}, opts);
		// 	this.singleton.dismissLoading();
		// }).catch((error) => {
		// 	this.hasError = true;
		// 	this.singleton.dismissLoading();
		// 	this.singleton.presentToast(this.errorHandler.toString(error));
		// });
	}

}
