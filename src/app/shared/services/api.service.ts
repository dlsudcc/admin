import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private params = new HttpParams();
  public queryParams = '';
  constructor(
      private httpClient: HttpClient, 
  ) {
  }
  setParameters(parameters): ApiService {
    this.queryParams = '';
    this.params = new HttpParams();
    for (const [key, value] of Object.entries(parameters)) {
        this.params.set(key, JSON.stringify(value));
        if (value) {
            this.queryParams += key+"="+value+"&";
        }
    }
    console.log(this.queryParams);
    return this;
}
  setHeaders(headers = []) {
    for (const [key, value] of Object.entries(headers)) {
        this.headers.append(key, value);
    }
  }
  getRequest(endPoint:string) {
      return this.httpClient.get(environment.apiUrl+endPoint+(this.queryParams ? '?'+this.queryParams:''), {headers: this.headers, params: this.params});
  }
  postRequest(endPoint:string, payload: any) {
      return this.httpClient.post(environment.apiUrl+endPoint,JSON.stringify(payload), {headers: this.headers, params: this.params});
  }
  deleteRequest(endPoint:string) {
      return this.httpClient.delete(environment.apiUrl+endPoint);
  }
  putRequest(endPoint:string, payload: any) {
      return this.httpClient.put(environment.apiUrl+endPoint,JSON.stringify(payload), {headers: this.headers, params: this.params});
  }
}
