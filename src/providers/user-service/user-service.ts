import { EndpointsProvider } from './../endpoints/endpoints';
import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  public user: any;

  constructor(
    public endpoint: EndpointsProvider,
    public http: HTTP
  ) {
    
  }

  login(email, password){
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoint.login(email, password), {}, {}).then((data)=>{
        this.user = data;
        resolve(data);
      }).catch((error)=>{
        reject(error);
      })
    });
  }

}
