import { Storage } from '@ionic/storage';
import { EndpointsProvider } from './../endpoints/endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export class UserServiceProvider {

  public user: any = {};

  constructor(
    public endpoint: EndpointsProvider,
    public events: Events,
    public http: HttpClient,
    public storage: Storage
  ) {
    this.getUserStorage();
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

  getUserStorage(){
      return new Promise(resolve=>{
        if(this.user != {} || !this.user){
          this.storage.get('user').then(data=>{
            if(data)
              this.user = data;
            resolve(data);
          })
        } else{
          resolve(this.user);
        }
      })
  }

  logout(){
    this.events.publish('user:logout');
  }

  getToken(){
    return this.user.SessionHash;
  }

  getQuestions(){
    return new Promise((resolve, reject)=>{
      this.http.get(this.endpoint.getQuestions()).subscribe(data=>{
        resolve(data);
      }, error =>{
        reject(error);
      });
    });
  }

  saveAnswer(data){
    return new Promise((resolve, reject)=>{
      this.http.post(this.endpoint.saveAnswer(), data).subscribe((data: any) => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
}
