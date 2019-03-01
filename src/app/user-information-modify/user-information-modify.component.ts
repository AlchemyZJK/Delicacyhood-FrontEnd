import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SelectItem } from 'primeng/api';
import{ InformationModifyRequest}from './user-information-modify-request';
import{InformationModifyResponse}from'./user-information-modify-response';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-user-information-modify',
  templateUrl: './user-information-modify.component.html',
  styleUrls: ['./user-information-modify.component.css']
})
export class UserInformationModifyComponent implements OnInit {
  informationModifyReq:InformationModifyRequest;
  informationModifyRes:InformationModifyResponse;
  username:string;
  optiongender:SelectItem[];
  gender:number;
  birth:string;
  introduction:string;
  testresult:string;
  mmsg: Message[] = [];
  mmsg2: Message[] = [];

  constructor(private api: ApiService) { this.username=this.birth=this.introduction='';
  this.testresult='尚未修改资料';
  this.gender=0;
  this.optiongender=[
    {label:'保密',value:0},
    {label:'男',value:1},
    {label:'女',value:2}
  ];}


  ngOnInit() {
  }

  modify(){
    this.informationModifyReq = {avatar:"",userName:this.username,gender:this.gender,birth:this.birth,intro:this.introduction};
    this.api.post('/api/1.0/inform/modify_inform', this.informationModifyReq).then(
      res=>{
        if(res['status']) {
          console.log('Modify success!');
          //this.informationModifyRes=res['data'];
          this.testresult='修改成功!'
          this.mmsg.push({severity:'"info"', detail:this.testresult});
        }
        else{
          console.log(res['message']);
          this.testresult=res['message'];
          this.mmsg2.push({severity:'"info"', detail:this.testresult});
        }
      });
  }
}









