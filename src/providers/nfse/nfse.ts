import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsProvider } from '../endpoints/endpoints';
import { CompanyProvider } from '../company/company';

@Injectable()
export class NfseProvider {

  constructor(
    private companyProvider: CompanyProvider,
    private endpoints: EndpointsProvider,
    private http: HttpClient
  ) {
  }

  getCodes() {
    return new Promise((resolve, reject) => {
      this.http.get(this.endpoints.getCFPS()).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  getActivities() {
    return new Promise((resolve, reject) => {
      let CompanyId = this.companyProvider.company.CompanyId;
      this.http.get(this.endpoints.getTaxpayerActivities(CompanyId)).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  newNfse(){

  }

}
