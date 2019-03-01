import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIdService {
  public userIdTemp: string;
  constructor() {
    console.log('Hello userIdService');
  }
}
