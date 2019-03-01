import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LogoutResponse }from'./logout-response';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {
  token = 'A00001';
  logoutRes: LogoutResponse;

  constructor(private api: ApiService,
              public global: GlobalsService) { }

  ngOnInit() {
  }

  logoutClick() {
    this.api.get('/api/1.0/user/sign_out').then(
      res => {
        if (res['status']) {
          this.global.token = undefined;
          this.global.logInStatus.next(false);
          localStorage.removeItem('token');
          console.log('Logout success!');
        } else {
          console.log(res['message']);
        }
      });
  }
}
