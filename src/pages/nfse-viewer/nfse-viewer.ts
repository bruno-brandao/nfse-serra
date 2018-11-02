import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-nfse-viewer',
  templateUrl: 'nfse-viewer.html',
})
export class NfseViewerPage {

  pdf: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.pdf = this.base64ToArrayBuffer(navParams.get("pdf"));
  }

  base64ToArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

}
