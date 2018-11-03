import { Injectable } from '@angular/core';
import { EndpointsProvider } from '../endpoints/endpoints';
import { HttpClient } from '@angular/common/http';
import { UserServiceProvider } from '../user-service/user-service';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
export class Company{
    UserId;
    CNPJ;
    IM;
    IE;
    Name;
    NameFantasy;
    CEP;
    Street;
    Neighborhood;
    City;
    State;
    Telephone;
    Email;
}

@Injectable()
export class CompanyProvider {
  company: any;
  constructor(
    public endpoints: EndpointsProvider,
    public http: HttpClient,
    public httpNative: HTTP,
    public storage: Storage,
    private userProvider: UserServiceProvider
  ) {

  }

  getUserCompany(){
    return new Promise((resolve, reject)=>{
      this.http.get(this.endpoints.getCompanyByUserId(this.userProvider.user.UserId))
      .subscribe(data =>{
        this.storage.set("company", data[0]);
        this.company = data[0];
        resolve(data[0]);
      }, error =>{
        reject(error);
      });
    });
  }

  getCompanyInStorage(){
    return new Promise((resolve, reject)=>{
      this.storage.get("company").then((data)=>{
        if(data){
          this.company = data;
          resolve(data);
        }else{
          this.getUserCompany().then(data=>{
            this.company = data[0];
            this.storage.set("company", data[0]);
            resolve(data[0]);
          }).catch(error=>{
            reject(error);
          })
        }
      }).catch(error=>{
        reject(error);
      });
    });
  }

  getCompanyDataInReceita(cnpj){
    return new Promise((resolve, reject)=>{
      this.httpNative.get('https://www.receitaws.com.br/v1/cnpj/' + cnpj, {}, {}).then(data=>{
        resolve(JSON.parse(data.data));
      }, error=>{
        reject(error);
      });
    });
  }

  createCompany(data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoints.setCompany(), data).subscribe((data: any) => {
        this.company = data[0];
        this.storage.set("company", data[0]);
        resolve(data[0]);
      }, err => {
        reject(err);
      });
    });
  }

  putCompany(data){
    return new Promise((resolve, reject)=>{
      this.http.put(this.endpoints.putCompany(), data).subscribe((data: any) => {
        this.company = data;
        this.storage.set("company", data);
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  getAddressViaCep(cep){
    return new Promise((resolve, reject)=>{
      this.httpNative.get("https://viacep.com.br/ws/" + cep + "/json/", {}, {})
      .then(data =>{
        resolve(data);
      }, error =>{
        reject(error);
      });
    });
  }

  getQuestions(){
    return new Promise((resolve, reject)=>{
      this.http.get(this.endpoints.getQuestions()).subscribe(data=>{
        resolve(data);
      }, error =>{
        reject(error);
      });
    });
  }

  saveAnswer(data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoints.saveAnswer(), data).subscribe((data: any) => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

}
