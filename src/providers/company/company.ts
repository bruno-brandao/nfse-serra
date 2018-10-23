import { Injectable } from '@angular/core';
import { EndpointsProvider } from '../endpoints/endpoints';
import { HttpClient } from '@angular/common/http';
import { UserServiceProvider } from '../user-service/user-service';

@Injectable()
export class CompanyProvider {

  constructor(
    public endpoints: EndpointsProvider,
    public http: HttpClient,
    private userProvider: UserServiceProvider
  ) {

  }

  getUserCompany(){
    return new Promise((resolve, reject)=>{
      console.log(this.userProvider.user);
      this.http.get(this.endpoints.getCompanyByUserId(this.userProvider.user.UserId))
      .subscribe(data =>{
        resolve(data);
      }, error =>{
        reject(error);
      });
    });
  }

}
