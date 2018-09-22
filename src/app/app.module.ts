import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { EndpointsProvider } from '../providers/endpoints/endpoints';
import { ServicesProvider } from '../providers/services/services';
import { TakerProvider } from '../providers/taker/taker';
import { CompanyProvider } from '../providers/company/company';
import { ShippingCompanyProvider } from '../providers/shipping-company/shipping-company';
import { NfseProvider } from '../providers/nfse/nfse';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    NfseProvider
  ]
})
export class AppModule {}
