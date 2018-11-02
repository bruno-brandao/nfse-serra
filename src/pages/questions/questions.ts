import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { SingletonProvider } from '../../providers/singleton/singleton';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

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
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public singleton: SingletonProvider,
    private userProvider: UserServiceProvider
  ) {
  }

  ionViewDidLoad() {
    this.getQuestions();
  }

  getQuestions(){
    this.userProvider.getQuestions().then((data: Array<any>)=>{
      this.questions = data;
      this.question = this.questions[this.index];
      console.log(this.question);
    }).catch(error=>{
      this.singleton.presentToast(this.errorHandler.toString(error));
    });
  }

	nextSlide(answer) {
    this.index += 1;
    this.question = this.questions[this.index];
		this.slides.slideNext(350);
	}

	saveAnswer(question) {
    this.singleton.showLoading("Salvando resposta, aguarde...");
	}

	nextQuestion(index, answerId){
		let question = null;
		Object.keys(this.questions).forEach(key => {
		  if(this.questions[key].answered == false){
			question = this.questions[key];
			this.questionKey = key;
		  }
		});
		return question;
	}

}
