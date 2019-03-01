import { Injectable } from '@angular/core';
import example from './mock-apis/examples';
import {Observable, of} from 'rxjs';
import {Conte1, Conte2, Conte3, Conte4, Conte5} from './exhibition/content';
import {Content} from './exhibition/type';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  mockApis: any;
  apiList = [
    example,
  ];

  constructor() {
    this.mockApis = {
      'GET': {},
      'POST': {},
      'PATCH': {},
      'DELETE': {},
    };
    for (const i in this.apiList) {
      if (this.apiList.hasOwnProperty(i)) {
        Object.assign(this.mockApis, this.apiList[i]);
      }
    }
  }

  request(endpoint, method, body) {
    return new Promise((resolve) => {
      try {
        resolve(this.mockApis[method][endpoint](body));
      } catch {
        throw Error(endpoint + ' Api not implement');
      }
    }
    );
  }
  getcont(id: number): Observable<Content[]> {
    if (id === 1) {
    return of(Conte1);
    }
    if (id === 2) {
      return of(Conte2);
    }
    if (id === 3) {
      return of(Conte3);
    }
    if (id === 4) {
      return of(Conte4);
    }
    if (id === 5) {
      return of(Conte5);
    }
  }

  getCont(postid: string): Observable<Content> {
    return of((Conte5).find(cont => cont.postid === postid));
  }

}

