import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private multipartHeader = new HttpHeaders({
    'enctype': 'multipart/form-data'
  });

  private params = new HttpParams();
  public queryParams = '';
  constructor(
      private httpClient: HttpClient,
      public cookieService: CookieService
  ) {
  }
  verifyAuth () {
    return !!this.cookieService.get('user');
  }
  async logOut() {
    this.cookieService.delete('user');
  }
  setCookie(field, value) {
    this.cookieService.set(field, value);
  }
  setParameters(parameters, setQueryParams = false): ApiService {
    this.queryParams = '';
    this.params = new HttpParams();
    for (const [key, value] of Object.entries(parameters)) {
        this.params.set(key, JSON.stringify(value));
        if (value && setQueryParams) {
            this.queryParams += key+"="+value+"&";
        }
    }
    return this;
  }
  get apiUrl() {
    return environment.apiUrl;
  }
  getRequest(endPoint:string) {
      return this.httpClient.get(environment.apiUrl+endPoint+(this.queryParams ? '?'+this.queryParams:''), {headers: this.headers, params: this.params});
  }
  postRequest(endPoint:string, payload) {
      return this.httpClient.post(environment.apiUrl+endPoint, JSON.stringify(payload), {headers: this.headers, params: this.params});
  }
  uploadPostRequest(endPoint:string, payload) {
      return this.httpClient.post(environment.apiUrl+endPoint, payload, {headers: this.multipartHeader, params: this.params});
  }
  deleteRequest(endPoint:string) {
      return this.httpClient.delete(environment.apiUrl+endPoint);
  }
  putRequest(endPoint:string, payload) {
      return this.httpClient.put(environment.apiUrl+endPoint,JSON.stringify(payload), {headers: this.headers, params: this.params});
  }
  download(location) {
    window.open(`${environment.apiUrl}${location}`, '_blank');
  }
  export (endPoint) {
    window.open(environment.apiUrl+endPoint+'?'+this.queryParams, '_blank');
  }
}
