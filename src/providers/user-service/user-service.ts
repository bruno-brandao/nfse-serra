import { EndpointsProvider } from './../endpoints/endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  public user: any = {};

  constructor(
    public endpoint: EndpointsProvider,
    public http: HttpClient
  ) {
    
  }

  login(email, password){
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoint.login(email, password), {}).subscribe((data: any) => {
        this.user = data;
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  register(data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoint.setUser(), data).subscribe((data: any) => {
        this.user = data;
        console.log(this.user);
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  getToken(){
    return this.user.SessionHash;
  }
}
