import { Injectable } from '@angular/core';
import { MockApiService } from './mock-api.service';
import { GlobalsService } from './globals.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://47.100.104.177/backend';

  constructor(public http: HttpClient,
              public mockApi: MockApiService,
              public globals: GlobalsService) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    console.log('GET', endpoint, params);

    if (this.globals.mockApi) {
      return this.mockApi.request(endpoint, 'GET', params);
    }

    reqOpts = this.addHeaders(reqOpts);
    if (params) {
      for (const k in params) {
        reqOpts.params[k] = params[k];
      }
    }
    return this.http.get(this.url + endpoint, reqOpts).toPromise().catch(this.handleError);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    console.log('POST', endpoint, body);

    if (this.globals.mockApi) {
      return this.mockApi.request(endpoint, 'POST', body);
    }

    reqOpts = this.addHeaders(reqOpts);
    return this.http.post(this.url + endpoint, body, reqOpts).toPromise().catch(this.handleError);
  }

  addHeaders(reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: {},
        headers: {},
      };
    }
    if (this.globals.token != '' && this.globals.token != undefined) {
      reqOpts.headers['Authorization'] = 'Bear ' + this.globals.token;
    }
    if (reqOpts.headers['Content-Type'] === undefined) {
      reqOpts.headers['Content-Type'] = 'application/json';
    }
    return reqOpts;
  }

  handleError(err) {
    alert(err);
    return {'status': false, 'message': '未知错误'};  // 此处也返回了一个新的resolved的promise
  }

}
