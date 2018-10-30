import { Injectable } from '@angular/core';
import { EndpointsProvider } from '../endpoints/endpoints';
import { HttpClient } from '@angular/common/http';
import { CompanyProvider } from '../company/company';

export class Service{
  ServicesId;
  Unity;
  Value;
  Description;
  CompanyId;
}

@Injectable()
export class ServicesProvider {

  services: any;

  constructor(
    public companyProvider: CompanyProvider,
    public endpoints: EndpointsProvider,
    public http: HttpClient
  ) {
  }

  getAllServices(){
    return new Promise((resolve, reject)=>{
      this.http.get(this.endpoints.getAllService()).subscribe(data =>{
        resolve(data);
      }, error =>{
        reject(error);
      });
    });
  }

  saveService(data){
    return new Promise((resolve, reject)=>{
      data.CompanyId = this.companyProvider.company.CompanyId;
      this.http.post(this.endpoints.setService(), data).subscribe((data)=>{
        resolve(data);
      }, error =>{
        reject(error);
      });
    });
  }

  putService(data){
    return new Promise((resolve, reject)=>{
      this.http.put(this.endpoints.putService(), data).subscribe((data)=>{
        resolve(data);
      }, error =>{
        reject(error);
      });
    });
  }

  removeService(id){
    return new Promise((resolve, reject)=>{
      this.http.delete(this.endpoints.deleteService(id)).subscribe((data)=>{
        resolve(data);
      }, error =>{
        reject(error);
      });
    });
  }

}
