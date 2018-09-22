import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
//import { Pro } from '@ionic/pro';
import { SingletonProvider } from '../singleton/singleton'

// Pro.init('41229e9c', {
//   appVersion: '0.0.10'
// })
@Injectable()
export class ErrorHandlerProvider implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;
  constructor(
    injector: Injector,
    public singleton: SingletonProvider
  ) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch (e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.    err = this.errorCatch(err);
    // this.singleton.getActivePage().then((data)=>{
    //   Pro.monitoring.handleNewError(err,{ "device" : this.device.model || "browser", "page": data});   
    // }); 
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }

  toString(error: any) {
    let message = '';
    try {
      if(typeof error === 'string'){
        message = error;
      }else if (error.status !== 0 && JSON.parse(error._body).message && JSON.parse(error._body).message != '') {
        message = JSON.parse(error._body).message;
      } else if(error.status !== 0 && typeof (error) === "object"){
        error = error.json();
        if (error.errors) {
          Object.keys(error.errors).map(function (objectKey, index) {
            var value = error.errors[objectKey];
            message += value + "\n";
          });
        }
      } else{
        message = this.verifyHttpErros(error);
      }
    } catch (e) {
      try {
        if(error.status !== 0 && typeof (error) === "object"){
          error = error.json();
          if (error.errors) {
            Object.keys(error.errors).map(function (objectKey, index) {
              var value = error.errors[objectKey];
              message += value + "\n";
            });
          }
        }  
      } catch (e) {
        //treta
        message = this.verifyHttpErros(error);
      }
    }
    if(message == ''){
      message = "Ocorreu um erro indefinido, favor tentar ação novamente!";
    }
    return message;
  }

  verifyHttpErros(error){
    let message = "Ocorreu um erro indefinido, favor tentar ação novamente!";
    if (error.status == 400) {
      message = 'Solicitação não entendida pelo servidor';
    } else if (error.status == 403) {
      message = 'Você não tem permissão';
    } else if (error.status == 500) {
      message = 'Ocorreu um erro nos nossos servidores';
    } else if (error.status == 404) {
      message = 'Não encontramos o que você está procurando nos nossos servidores';
    } else if (error.name == "TimeoutError") {
      message = 'Tempo de requisição expirado, verifique sua conexão.';
    }else if (error.status == 503) {
      message = 'Serviço temporariamente indisponível';
    }else if(error.status == 502){
      message = "Falha na comunicação com o servidor";
    }else if(error.status == 501){
      message = "O servidor ainda não suporta a funcionalidade ativada.";
    }
    return message;
  }

}