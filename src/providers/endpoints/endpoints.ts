import { Injectable } from '@angular/core';

@Injectable()
export class EndpointsProvider {

  public route_api: string;

  constructor() {
    this.route_api = 'http://unclephillwebapinfes.azurewebsites.net/api/'
  }

  //Taker Methods
  public getTaker(TakerId): string{
    return this.route_api + 'api/Taker?TakerId='+ TakerId;
  }

  public setTaker(){
    return this.route_api + 'api/Taker';
  }

  public putTaker(){
    return this.route_api + 'api/Taker';
  }

  public deleteTaker(TakerId){
    return this.route_api + 'api/Taker?TakerId='+ TakerId;
  }

  //Company
  public getCompany(CompanyId): string{
    return this.route_api + 'api/Company?CompanyId='+ CompanyId;
  }

  public setCompany(){
    return this.route_api + 'api/Company';
  }

  public putCompany(){
    return this.route_api + 'api/Company';
  }

  public deleteCompany(CompanyId){
    return this.route_api + 'api/Company?CompanyId='+ CompanyId;
  }

  //User
  public login(Email, Password){
    return this.route_api + 'api/User?Email=' + Email + '&Password=' + Password;
  }

  public getUser(UserId): string{
    return this.route_api + 'api/User?UserId='+ UserId;
  }

  public setUser(){
    return this.route_api + 'api/User';
  }

  public putUser(){
    return this.route_api + 'api/User';
  }

  public deleteUser(UserId){
    return this.route_api + 'api/User?UserId='+ UserId;
  }

  //ShippingCompany
  public ShippingCompany(ShippingCompanyId): string{
    return this.route_api + 'api/ShippingCompany?ShippingCompanyId='+ ShippingCompanyId;
  }

  public setShippingCompany(){
    return this.route_api + 'api/ShippingCompany';
  }

  public putShippingCompany(){
    return this.route_api + 'api/ShippingCompany';
  }

  public deleteShippingCompany(ShippingCompanyId){
    return this.route_api + 'api/ShippingCompany?ShippingCompanyId='+ ShippingCompanyId;
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
  public getService(ServiceId): string{
    return this.route_api + 'api/Service?ServiceId='+ ServiceId;
  }

  public setService(){
    return this.route_api + 'api/Service';
  }

  public putService(){
    return this.route_api + 'api/Service';
  }

  public deleteService(ServiceId){
    return this.route_api + 'api/Service?ServiceId='+ ServiceId;
  }

  //CFPS
  public getCFPS(CFPSId): string{
    return this.route_api + 'api/CFPS?CFPSId=' + CFPSId;
  }
}
