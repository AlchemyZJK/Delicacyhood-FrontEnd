import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public mockApi = false; // if link to the real network, change it to false
  public token: string;
  public userId: string;
  public logInStatus = new Subject<boolean>();
  public sourcePrefix = 'http://dam-back.oss-cn-shanghai.aliyuncs.com/';

  constructor() {
    console.log('Global Service Up, userId: ' + this.userId);
  }

  getLogInStatus(): Observable<boolean> {
    console.log(this.token);
    if (this.token === undefined || this.token === null) { this.logInStatus.next(false) ; }
    console.log('LogInStatus: ' + this.logInStatus);
    return this.logInStatus.asObservable();
  }
}
