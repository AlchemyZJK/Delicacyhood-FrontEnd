import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AddDirRequest } from './add-dir-request';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { SelectItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { GlobalsService } from '../globals.service';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  checkpassword: string;
  username: string;
  optionquestion: SelectItem[];
  question1: number;
  answer1: string;
  question2: number;
  answer2: string;
  loginReq: LoginRequest;
  loginRes: LoginResponse;
  gender: string;
  testresult1: string;
  token: string;
  id: string;
  mmsg: Message[] = [];
  mmsg2: Message[] = [];
  mmsg_password: Message[] = [];
  mmsg_answer: Message[] = [];

  // userId: string; // added by : zjk
  addDirFlag = false; // the collection folder flag (added by : zjk)
  addDirReq: AddDirRequest; // 添加收藏夹请求包 (added by : zjk)


  constructor(private api: ApiService,
              public global: GlobalsService,
              private messageService: MessageService,
              public router: Router) {
    this.email = this.password = this.checkpassword = this.username = this.answer1 = this.answer2 = '';
    this.gender = 'unknown';
    this.testresult1 = '尚未注册';
    this.question1 = 0;
    this.question2 = 0;
  }

  ngOnInit() {
    console.log('login_component');
    this.loadQuestion();
  }

  loadQuestion() {
    this.api.get('/api/1.0/user/show_cue').then(
      res => {
        if (res['status']) {
          this.optionquestion = res['data'];
          console.log(this.optionquestion);
        }
      }
    );
  }

  register() {
    if (this.check()) { return; }
    this.loginReq = {email: this.email,
      password: this.password,
      userName: this.username, cue1_id: this.question1,
      cue2_id: this.question2, cue1_ans: this.answer1,
      cue2_ans: this.answer2, gender: this.gender};

    this.api.post('/api/1.0/user/log_in', this.loginReq).then(
      res => {
        if (res['status']) {
          this.token = res['token'];
          this.global.logInStatus.next(true);
          localStorage.setItem('token', res['token']);
          this.id = res['id'];
          console.log('Login success!');
          this.testresult1 = '注册成功！';
          this.mmsg2 = [];
          this.mmsg_answer = [];
          this.mmsg_password = [];
          this.mmsg.push({severity: '"info"', detail: this.testresult1});
          this.global.token = this.token;
          this.global.userId = this.id;
          // add the collection folder for user(added by : zjk)
          if (this.id) {
            this.add_dir(this.id);
          }
          this.router.navigate(['/user'], {
            queryParams: {
              option: '1'
            }
          });
        } else {
          console.log(res['message']);
          this.testresult1 = res['message'];
          this.mmsg = [];
          this.mmsg_answer = [];
          this.mmsg_password = [];
          this.mmsg2.push({severity: '"info"', detail: this.testresult1});
        }
    });
  }

  check(): number {
    if (this.password.length < 6) {
      this.testresult1 = '密码长度不符合要求';
      this.mmsg2 = [];
      this.mmsg_answer = [];
      this.mmsg = [];
      this.mmsg_password.push({severity: '"error"', detail: this.testresult1});
      this.password = '';
      this.checkpassword = '';
      return 1;
    }
    if (this.password !== this.checkpassword) {
      this.testresult1 = '两次输入的密码不同';
      this.mmsg2 = [];
      this.mmsg_answer = [];
      this.mmsg = [];
      this.mmsg_password.push({severity: '"error"', detail: this.testresult1});
      this.checkpassword = '';
      return 2;
    }

    if (this.question1 === this.question2) {
      this.testresult1 = '请选择两个不同的密保问题';
      this.mmsg_answer.push({severity: '"error"', detail: this.testresult1});
      this.question2 = 0;
      this.answer2 = '';
      return 3;
    }
    if (this.question1 === 0 || this.question2 === 0) {
      this.testresult1 = '您需要选择两个密保问题并作答';
      this.mmsg2 = [];
      this.mmsg = [];
      this.mmsg_password = [];
      this.mmsg_answer.push({severity: '"error"', detail: this.testresult1});
      return 4;

    }
    if (this.answer1 === undefined || this.answer1 === '' || this.answer2 === undefined || this.answer2 === '') {
      this.testresult1 = '请输入密保问题的回答';
      this.mmsg2 = [];
      this.mmsg = [];
      this.mmsg_password = [];
      this.mmsg_answer.push({severity: '"error"', detail: this.testresult1});
      return 5;
    }

    return 0;
  }

  add_dir(userId: string) {
    this.addDirReq = {userId: userId, folder: 'root'};
    this.api.post('/api/1.0/collection/dir/add', this.addDirReq).then(
          res => {
            if (res['status']) {
              console.log('Add Collection Folder Success!');
            } else {
              console.log(res['message']);
            }
          });
  }

}



