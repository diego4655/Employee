import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ServiceResponse } from '../Models/service-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  public header: HttpHeaders = new HttpHeaders().set('content-type', ['application/json', 'text/plain', '*/*']).set('accept', '*/*');

  constructor(
    private httpClient: HttpClient
  ) { }

  async getAllEmployees() {
    return lastValueFrom(this.httpClient.get<ServiceResponse>(environment.AllEmployees))
  }

  async getIndividualEmployee(id: number) {
    return lastValueFrom(this.httpClient.get<ServiceResponse>(environment.Employee + id))
  }

}
