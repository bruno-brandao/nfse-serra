import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ShippingCompanyProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ShippingCompanyProvider Provider');
  }

}
