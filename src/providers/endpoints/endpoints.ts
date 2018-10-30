import { Injectable } from '@angular/core';

@Injectable()
export class EndpointsProvider {

  public route_api: string;

  constructor() {
    this.route_api = 'http://unclephillwebapinfes.azurewebsites.net/'
  }

  //Taker Methods
  public getTaker(TakerId): string{
    return this.route_api + 'api/Taker/Get?TakerId='+ TakerId;
  }

  public setTaker(){
    return this.route_api + 'api/Taker/Post';
  }

  public putTaker(){
    return this.route_api + 'api/Taker/Put';
  }

  public deleteTaker(TakerId){
    return this.route_api + 'api/Taker/Delete?TakerId='+ TakerId;
  }

  //Company
  public getCompanyByUserId(UserId): string{
    return this.route_api + 'api/Company/GetByUser?UserId='+ UserId;
  }

  public setCompany(){
    return this.route_api + 'api/Company/Post';
  }

  public putCompany(){
    return this.route_api + 'api/Company/Put';
  }

  public deleteCompany(CompanyId){
    return this.route_api + 'api/Company/Delete?CompanyId='+ CompanyId;
  }

  //User
  public login(Email, Password){
    return this.route_api + 'api/User/Login?Email=' + Email + '&Password=' + Password;
  }

  public getUser(UserId): string{
    return this.route_api + 'api/User/Get?UserId='+ UserId;
  }

  public setUser(){
    return this.route_api + 'api/User/Post';
  }

  public putUser(){
    return this.route_api + 'api/User/Put';
  }

  public deleteUser(UserId){
    return this.route_api + 'api/User?UserId='+ UserId;
  }

  //ShippingCompany
  public ShippingCompany(ShippingCompanyId): string{
    return this.route_api + 'api/ShippingCompany/Get?ShippingCompanyId='+ ShippingCompanyId;
  }

  public setShippingCompany(){
    return this.route_api + 'api/ShippingCompany/Post';
  }

  public putShippingCompany(){
    return this.route_api + 'api/ShippingCompany/Put';
  }

  public deleteShippingCompany(ShippingCompanyId){
    return this.route_api + 'api/ShippingCompany/Delete?ShippingCompanyId='+ ShippingCompanyId;
  }

  //NFeS
  public getNFeS(){
    return this.route_api + 'api/NFeS';
  }

  //TaxpayerActivities
  public getTaxpayerActivities(CompanyId): string{
    return this.route_api + 'api/TaxpayerActivities?CompanyId=' + CompanyId;
  }

  //Service
  public getAllService(){
    return this.route_api + 'api/Service/Get';
  }

  public getService(ServiceId): string{
    return this.route_api + 'api/Service?ServiceId='+ ServiceId;
  }

  public setService(){
    return this.route_api + 'api/Service/Post';
  }

  public putService(){
    return this.route_api + 'api/Service';
  }

  public deleteService(ServiceId){
    return this.route_api + 'api/Service?ServiceId='+ ServiceId;
  }

  //CFPS
  public getCFPS(CFPSId): string{
    return this.route_api + 'api/CFPS/Get?CFPSId=' + CFPSId;
  }
}
