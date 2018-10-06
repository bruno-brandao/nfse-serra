import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { EndpointsProvider } from '../providers/endpoints/endpoints';
import { ServicesProvider } from '../providers/services/services';
import { TakerProvider } from '../providers/taker/taker';
import { CompanyProvider } from '../providers/company/company';
import { ShippingCompanyProvider } from '../providers/shipping-company/shipping-company';
import { NfseProvider } from '../providers/nfse/nfse';
import { SingletonProvider } from '../providers/singleton/singleton';
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';

import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { HTTP } from '@ionic-native/http';
import { ValidationProvider } from '../providers/validation/validation';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    EndpointsProvider,
    ServicesProvider,
    TakerProvider,
    CompanyProvider,
    ShippingCompanyProvider,
    NfseProvider,
    SingletonProvider,
    ErrorHandlerProvider,
    Network,
    Device,
    HTTP,
    ValidationProvider
  ]
})
export class AppModule {}
