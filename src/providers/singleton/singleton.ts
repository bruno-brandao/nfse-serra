import { Injectable } from '@angular/core';
import { Loading, AlertController, LoadingController, ToastController, App, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';

@Injectable()
export class SingletonProvider {

	public loading: Loading;
	isIos: boolean;
  onDevice: boolean;

	constructor(
		public alertCtrl: AlertController,
    public device: Device,
		public loadingCtrl: LoadingController,
    public network: Network,
    public platform: Platform,
		public toastCtrl: ToastController,
		public app: App
	) {
    this.onDevice = this.platform.is('cordova');
	}

	getActivePage() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(this.app.getActiveNav().getActive().name);
			}, 500);
		});
	}

	presentToast(message: string, duration: number = 3000, position: string = 'bottom') {
		let toast = this.toastCtrl.create({
			message: message,
			duration: duration,
			position: position,
			cssClass: "custom-toast"
		});
		toast.present();
	}

	showLoading(message: string = null) {
		if (!this.loading) {
			this.loading = this.loadingCtrl.create({
				content: message != null ? message : 'Aguarde...'
			});

			this.loading.present();
		} else {
			this.loading.data.content = message;
		}
	}

	dismissLoading() {
		if (this.loading) {
			try {
				this.loading.dismiss();
			} catch (exception) { }
			this.loading = null;
		}
	}

	showMessage(title: any, message: any) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['OK']
		});
		alert.present();
	}

  isOnline(): boolean {
    var isOnline = false;
    if (this.onDevice && this.network.type) {
      isOnline = this.network.type !== 'none';
    } else {
      isOnline = navigator.onLine;
    }
    return isOnline;
  }

}