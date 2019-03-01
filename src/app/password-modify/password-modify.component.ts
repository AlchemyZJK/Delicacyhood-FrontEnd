import { Component, OnInit } from '@angular/core';
import {PasswordModifyRequest} from './password-modify-request';
import{PasswordModifyResponse} from "./password-modify-response";
import { ApiService } from '../api.service';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-password-modify',
  templateUrl: './password-modify.component.html',
  styleUrls: ['./password-modify.component.css']
})
export class PasswordModifyComponent implements OnInit {
  oldpassword:string;
  newpassword:string;
  passwordmodifyReq:PasswordModifyRequest;
  passwordmodifyRes:PasswordModifyResponse;
  testresult1:string;
  mmsg_password: Message[] = [];
  mmsg_password2: Message[] = [];
  constructor(private api: ApiService,private messageService: MessageService) {
    this.oldpassword=this.newpassword='';
    this.testresult1='尚未修改密码'; }

  ngOnInit() {

  }

  passwordmodify(){
    if(this.newpassword.length<6){
      this.testresult1='新密码长度不足';
      this.mmsg_password2.push({severity: '"error"', detail: this.testresult1});
      this.newpassword='';
    }
    else{
    this.passwordmodifyReq = {old:this.oldpassword,new:this.newpassword};
    this.api.post('/api/1.0/security/modify_password', this.passwordmodifyReq).then(
      res=>{
        if(res['status']) {
          console.log('Password modify success!');
          this.testresult1='修改成功';
          this.mmsg_password.push({severity: '"info"', detail: this.testresult1});
        }
        else{
          console.log(res['message']);
          this.testresult1=res['message'];
          this.mmsg_password2.push({severity: '"error"', detail: this.testresult1});
        }
      }); 
    }
  }

}
