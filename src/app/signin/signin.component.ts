import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { SigninRequest } from './signin-request';
import { SigninResponse } from './signin-response';
import { ApiService } from '../api.service';
import { Md5 } from 'ts-md5/dist/md5';
import { DialogModule } from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

import { UserIdService } from '../user-id.service';
import { GlobalsService } from '../globals.service';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import {RouterConfigLoader} from '@angular/router/src/router_config_loader';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  useremail: string;
  password: string;
  signinReq: SigninRequest;
  signinRes: SigninResponse[];
  dialog1: DialogModule; // 忘记密码
  display = false;
  testresult1: string; // ***测试按钮用 */
  token: string;
  id: string;
  mmsg: Message[] = [];
  mmsg2: Message[] = [];
  constructor(private api: ApiService,
              public userIdService: UserIdService,
              public global: GlobalsService,
              private messageService: MessageService,
              public router: Router) {
    this.useremail = this.password = '';
    this.testresult1 = '尚未登录';
   }


  ngOnInit() {

  }

  showDialog() {
    this.display = true;
  }

  email() {
    this.signinReq = {email: this.useremail, password: this.password};
    this.api.post('/api/1.0/user/sign_in', this.signinReq).then(
      res => {
        if (res['status']) {
          this.token = res['token'];
          this.id = res['id'];
          this.global.token = this.token;
          localStorage.setItem('token', res['token']);
          this.global.logInStatus.next(true);
          this.global.userId = this.id;
          console.log(this.id);
          this.userIdService.userIdTemp = this.id;
          this.testresult1 = '登陆成功';
          this.mmsg.push({severity: '"info"', detail: this.testresult1});
          this.router.navigate(['/user'], {
            queryParams: {
              option: '1'
            }
          })
        } else {
          console.log(res['message']);
          this.testresult1 = res['message'];
          this.mmsg2.push({severity: '"info"', detail: this.testresult1});
        }
      });
  }
}
