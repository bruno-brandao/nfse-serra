import { EndpointsProvider } from './../endpoints/endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  public user: any;

  constructor(
    public endpoint: EndpointsProvider,
    public http: HttpClient
  ) {
    
  }

  login(email, password){
    let data = {
      email: email,
      password: password
    }
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoint.login(email, password), data).subscribe(data => {
        this.user = data;
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

}
