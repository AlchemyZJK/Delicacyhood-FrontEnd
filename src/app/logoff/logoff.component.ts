import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LogoffResponse } from'./logoff-response';
import { GlobalsService } from '../globals.service';
@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent implements OnInit {
  token = 'A00001';
  logoffRes: LogoffResponse;

  constructor(private api: ApiService,
              public global: GlobalsService) { }

  ngOnInit() {
  }

  logoffClick() {
    this.api.get('/api/1.0/user/log_off', this.token).then(
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
