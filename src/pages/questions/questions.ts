import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { SingletonProvider } from '../../providers/singleton/singleton';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { CompanyProvider } from '../../providers/company/company';

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {

  questions: Array<any>;
  index: number = 0;
  question: any;
  answerId: any;

  @ViewChild(Slides) slides: Slides;
  
  constructor(
    public companyProvider: CompanyProvider,
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public singleton: SingletonProvider
  ) {
  }

  ionViewDidLoad() {
    this.getQuestions();
  }

  getQuestions(){
    this.companyProvider.getQuestions().then((data: Array<any>)=>{
      this.questions = data;
      this.question = this.questions[this.index];
    }).catch(error=>{
      let message = this.errorHandler.toString(error);
      if(message == "Não existe questões cadastradas!"){
        this.question = "";
      }else
        this.singleton.presentToast(message);
      
    });
  }

	nextSlide() {
    this.singleton.showLoading("Salvando resposta, aguarde...");
    let answer = {
      CompanyId: this.companyProvider.company.CompanyId,
      QuestionId: this.question.QuestionId,
      OptionId: this.answerId
    }
    this.companyProvider.saveAnswer(answer).then(()=>{
      this.singleton.dismissLoading();
      this.index += 1;
      if(this.questions.length == this.index){
        this.question = "";
      }else{
        this.question = this.questions[this.index];
      }
      console.log(this.question)
      this.slides.slideNext(350);
    }).catch(error=>{
      this.singleton.dismissLoading();
      this.singleton.presentToast(this.errorHandler.toString(error));
    });
	}

	// nextQuestion(index, answerId){
	// 	let question = null;
	// 	Object.keys(this.questions).forEach(key => {
	// 	  if(this.questions[key].answered == false){
	// 		question = this.questions[key];
	// 		this.questionKey = key;
	// 	  }
	// 	});
	// 	return question;
	// }

}
