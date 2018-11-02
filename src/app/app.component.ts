import { UserServiceProvider } from './../providers/user-service/user-service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { SingletonProvider } from '../providers/singleton/singleton';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public events: Events,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public singleton: SingletonProvider,
    public splashScreen: SplashScreen,
    private storage: Storage,
    private userProvider: UserServiceProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', icon: 'ios-home-outline' },
      { title: 'Empresa', component: 'CompanyPage', icon: 'ios-briefcase-outline' },
      { title: 'Serviços', component: 'ServicePage', icon: 'ios-clipboard-outline' },
      { title: 'Clientes', component: 'TakerPage', icon: 'ios-people-outline' },
      { title: 'Questionário', component: 'QuestionsPage', icon: 'ios-list-outline' },
      //{ title: 'Transportador', component: 'ShippingCompanyPage', icon: 'ios-car-outline' },
      { title: 'Notas', component: 'NfsePage', icon: 'ios-document-outline' }
    ];

  }

  initializeApp() {
    this.events.subscribe('user:logout', () => {
      setTimeout(()=>{
        this.singleton.presentToast("Sessão expirada, faça login novamente.");
        this.nav.setRoot("LoginPage");
      })
    });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.userProvider.user = {};
    this.storage.remove("user");
    this.nav.setRoot("LoginPage");
  }
}
