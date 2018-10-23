import { Injectable } from '@angular/core';
import { Loading, AlertController, LoadingController, ToastController, App, Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserServiceProvider } from '../user-service/user-service'

@Injectable()
export class SingletonProvider {

	public loading: Loading;
	isIos: boolean;
	onDevice: boolean;

	constructor(
		public alertCtrl: AlertController,
		public device: Device,
		public http: HttpClient,
		public loadingCtrl: LoadingController,
		public network: Network,
		public platform: Platform,
		public toastCtrl: ToastController,
		public app: App,
		private userService: UserServiceProvider
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

	// authGet(url, data = null, extra_headers = null) {
	// 	let headers = new HttpHeaders({
	// 		'Content-Type': 'application/json',
	// 		'Accept': 'application/json',
	// 		'Authorization': 'Bearer ' + this.userService.user.SessionId
	// 	});

	// 	if (data) {
	// 		for (var key in extra_headers) {
	// 			headers.append(key, extra_headers[key]);
	// 		}
	// 	}
	// 	if (extra_headers) {
	// 			for (var key in extra_headers) {
	// 					_jwtHeader.append(key, extra_headers[key]);
	// 			}
	// 	}
	// 	const httpOptions = {
	// 		headers: headers
	// 		params: new HttpParams(
				
	// 		)
	// 	};
	// 	return new Promise((resolve, reject) => {
	// 		this.http.get(url, httpOptions).subscribe(data => {
	// 			resolve(data);
	// 		}, error => {
	// 			reject(error);
	// 		});
	// 	});

	// }

	// authPut(url, data = null, extra_headers = null) {
	// 	let headers = new HttpHeaders({
	// 		'Content-Type': 'application/json',
	// 		'Accept': 'application/json',
	// 		'Authorization': 'Bearer ' + this.userService.user.SessionId
	// 	});

	// 	if (extra_headers) {
	// 		for (var key in extra_headers) {
	// 			headers.append(key, extra_headers[key]);
	// 		}
	// 	}
	// 	const httpOptions = {
	// 		headers: headers
	// 	};
	// 	return new Promise((resolve, reject) => {
	// 		this.http.put(url, data, httpOptions).subscribe(data => {
	// 			resolve(data);
	// 		}, error => {
	// 			reject(error);
	// 		});
	// 	});
	// }

	// authPost(url, data = null, extra_headers = null) {

	// }

	// authDelete(url, data = null, extra_headers = null) {

	// }

}