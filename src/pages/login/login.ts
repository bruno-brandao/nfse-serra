import { Storage } from '@ionic/storage';
import { SingletonProvider } from './../../providers/singleton/singleton';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { ErrorHandlerProvider } from './../../providers/error-handler/error-handler';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public todo: FormGroup;

  constructor(
    public errorProvider: ErrorHandlerProvider,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public singleton: SingletonProvider,
    private storage: Storage,
    public userProvider: UserServiceProvider
  ) {
    this.todo = this.formBuilder.group({
      email: ['bruno.ed00@gmail.com', [Validators.required, Validators.email]],
      password: ['bruno123', Validators.required],
    });
  }

  ionViewDidLoad() {
  }

  openRegisterPage() {
    this.navCtrl.push('RegisterPage');
  }

  login() {
    if (!this.singleton.isOnline()) {
      this.singleton.presentToast("Conecte-se a internet e tente novamente");
      return;
    }
    if (this.todo.valid) {
      this.singleton.showLoading("Por favor aguarde, efetuando operação...");

      this.userProvider.login(this.todo.value.email, this.todo.value.password).then((data) => {
        this.singleton.dismissLoading();
        this.userProvider.user = data;
        this.storage.set("user", data);
        this.navCtrl.setRoot("HomePage");
      }).catch((error) => {
        this.singleton.dismissLoading();
        this.singleton.presentToast(this.errorProvider.toString(error));
      });
    }
  }

}
