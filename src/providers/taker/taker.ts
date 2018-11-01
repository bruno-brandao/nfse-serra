import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsProvider } from '../endpoints/endpoints';
import { CompanyProvider } from '../company/company';

export class Taker {
  TakerId;
  CompanyId;
  IM;
  CPF_CNPJ;
  RG_IE;
  Name;
  NameFantasy;
  TypePerson;
  CEP;
  Street;
  Number;
  Neighborhood;
  City;
  State;
  Telephone;
  Email;

  constructor(){
    this.TakerId = null;
    this.CompanyId = null;
    this.IM = null;
    this.CPF_CNPJ = null;
    this.RG_IE = null;
    this.Name = null;
    this.NameFantasy = null;
    this.TypePerson = null;
    this.CEP = null;
    this.Street = null;
    this.Number = null;
    this.Neighborhood = null;
    this.City = null;
    this.State = null;
    this.Telephone = null;
    this.Email = null;
  }
}

@Injectable()
export class TakerProvider {

  constructor(
    public companyProvider: CompanyProvider,
    public endpoints: EndpointsProvider,
    public http: HttpClient
  ) {
  }

  getAllTakers(){
    return new Promise((resolve, reject)=>{
      this.http.get(this.endpoints.getAllTaker()).subscribe(data =>{
        resolve(data);
      }, error =>{
        reject(error);
      });
    });
  }

  addTaker(data){
    return new Promise((resolve, reject)=>{
      data.CompanyId = this.companyProvider.company.CompanyId;
      this.http.post(this.endpoints.setTaker(), data).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  putTaker(data){
    return new Promise((resolve, reject)=>{
      data.CompanyId = this.companyProvider.company.CompanyId;
      this.http.put(this.endpoints.putTaker(), data).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

}
