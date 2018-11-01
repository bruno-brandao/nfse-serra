import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NfseViewerPage } from './nfse-viewer';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    NfseViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(NfseViewerPage),PdfViewerModule
  ]
})
export class NfseViewerPageModule {}
