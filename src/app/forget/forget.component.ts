import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
// import {Md5} from "ts-md5/dist/md5";
import { ApiService } from '../api.service';
import {ModifyRequest} from './modify-request';
import {ModifyResponse} from './modify-response';
import {GetqueRequest} from './getque-request';
import {GetqueResponse} from './getque-response';
import {CardModule} from 'primeng/card';
import { GlobalsService } from '../globals.service';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  useremail: string;
  q1id:number;
  q2id:number;
  question1: string;
  question2: string;
  question: number;
  optionquestion: SelectItem[];
  myoptionquestion: SelectItem[];
  answer: string;
  password: string;
  getqueReq: GetqueRequest;
  getqueRes: GetqueResponse;
  modifyReq: ModifyRequest;
  modifyRes: ModifyResponse;
  token: string;
  id: string;
  result:string;
  mmsg: Message[] = [];
  mmsg2: Message[] = [];
  mmsg3:Message[]=[];
  mmsg_password: Message[] = [];
  b:string;
  constructor(private api: ApiService, public global: GlobalsService,private messageService: MessageService) {
    this.useremail = this.password = this.answer = '';
    this.b='　　　　　';
    this.question = 0;
  }





  ngOnInit() {
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

  getquestion() {
    this.getqueReq = {email: this.useremail};
    this.api.post('/api/1.0/security/get_cue', this.getqueReq).then(
      res => {
        if (res['status']) {
          console.log('getque success!');
          //  this.getqueRes=res['data'];
          this.question1 = res['question1'];
          this.question2 = res['question2'];
          this.q1id=res['cue1_id'];
          this.q2id=res['cue2_id'];
          this.myoptionquestion = [
            {label: this.question1, value: 1},
            {label: this.question2, value: 2}
          ];

        } else {
          console.log(res['message']);
          this.result=res['message'];
          this.mmsg3.push({severity:'"info"', detail:this.result});
        }
      });
  }


  check(): number {
    if (this.password.length<6){
      this.result = '密码长度不符合要求';
      this.mmsg_password.push({severity: '"error"', detail: this.result});
      this.password = '';
      return 1;
    }
    return 0;
  }


  modify() {
      if (this.check()) { return; }
      if(this.question==1){
        this.question=this.q1id;
      }
      else if(this.question==2){
        this.question=this.q2id;
      }
      this.modifyReq = {email: this.useremail, cue_id: this.question, answer: this.answer, password: this.password};
      console.log(this.modifyReq);
      console.log(typeof this.modifyReq);
      this.api.post('/api/1.0/security/forget_password', this.modifyReq).then(
        res => {
          if (res['status']) {
            console.log('modify success!');
            this.token = res['token'];
            this.id = res['id'];
            console.log(this.token);
            this.global.token = this.token;
            this.global.userId = this.id;
            this.result='修改密码成功！'
            this.mmsg.push({severity:'"info"', detail:this.result});
          } else {
            console.log(res['message']);
            this.result=res['message'];
            this.mmsg2.push({severity:'"info"', detail:this.result});
          }
        });

  }

}
