import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {ValidationProvider as ValidationService} from '../../providers/validation/validation';
import { SingletonProvider } from '../../providers/singleton/singleton';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public todo: FormGroup;
  group_fields: any;

  constructor(
    public errorHandler: ErrorHandlerProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public singleton: SingletonProvider,
    public userProvider: UserServiceProvider
  ) {
    this.group_fields = {
        Name: ['', [Validators.required, ValidationService.fullName]],
        CPF: ['', [Validators.required, , ValidationService.validarCPF]],
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, ValidationService.password]],
        confirmPassword: ['', [Validators.required, ValidationService.password]],
    }
    
    this.todo = this.formBuilder.group(this.group_fields, {validator: ValidationService.passwordsMatch});
  }

  ionViewDidLoad() {
  }

  submit() {
    if(!this.singleton.isOnline()){
      this.singleton.presentToast("Conecte-se a internet e tente novamente");
      return;
    }
    if (this.todo.valid) {
      this.todo.addControl("LastName", new FormControl(this.todo.value.Name));

      this.singleton.showLoading("Registrando Usuário...");
        this.userProvider
            .register(this.todo.value)
            .then((data: string) => {
                this.singleton.dismissLoading();
                this.singleton.presentToast(data);
                this.navCtrl.pop();
            }).catch((error) => {
                this.singleton.dismissLoading();
                this.singleton.presentToast(this.errorHandler.toString(error));
            });
        }
  }

}
