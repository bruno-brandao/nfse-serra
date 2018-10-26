import { Injectable } from '@angular/core';
import { EndpointsProvider } from '../endpoints/endpoints';
import { HttpClient } from '@angular/common/http';
import { UserServiceProvider } from '../user-service/user-service';
import { Storage } from '@ionic/storage';

@Injectable()
export class CompanyProvider {
  company: any;
  constructor(
    public endpoints: EndpointsProvider,
    public http: HttpClient,
    public storage: Storage,
    private userProvider: UserServiceProvider
  ) {

  }

  getUserCompany(){
    return new Promise((resolve, reject)=>{
      this.http.get(this.endpoints.getCompanyByUserId(this.userProvider.user.UserId))
      .subscribe(data =>{
        this.storage.set("company", data);
        this.company = data;
        resolve(data);
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
            this.company = data;
            resolve(data);
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
      this.http.get('https://www.receitaws.com.br/v1/cnpj/' + cnpj).subscribe(data=>{
        resolve(data);
      }, error=>{
        reject(error);
      });
    });
  }

  createCompany(data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoints.setCompany(), data).subscribe((data: any) => {
        this.company = data;
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

}
