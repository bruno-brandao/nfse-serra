import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsProvider } from '../endpoints/endpoints';
import { CompanyProvider } from '../company/company';

export class NFSE {
  CompanyId: number;
  TakerId: number;
  TakerName: string;
  CFPSId: number;
  CFPSName: string;
  TaxpayerActivitiesId: number;
  ActivitiesName: string;
  ShippingCompanyId: number;
  Note: string;
  Itens: Array<any>;
  Invoices: any;
  Total: any;

  constructor(){
    this.CompanyId = null;
    this.TakerId = null;
    this.TakerName = "";
    this.CFPSId = null;
    this.CFPSName = "";
    this.TaxpayerActivitiesId = null;
    this.ActivitiesName = "";
    this.ShippingCompanyId = null;
    this.Note = "";
    this.Itens = [];
    this.Invoices = [];
    this.Total = 0;
  }
}

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

  newNfse(data) {
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoints.setNFeS(), data).subscribe((data: any) => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

}
