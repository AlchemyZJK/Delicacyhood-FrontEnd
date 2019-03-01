import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { InformationResponse } from './information-responce';

import { UserIdService } from '../user-id.service';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})

export class UserInformationComponent implements OnInit {
  informationRes: InformationResponse;
  username:string;
  id:string;
  gender:string;
  intro:string;
  birth:string;
  photopath:string;

  constructor(private api: ApiService, public userIdService: UserIdService,public global:GlobalsService) {
    this.getUserInformation();
  }

  ngOnInit() {
  }

  getUserInformation() {
    console.log(this.global.token);
    //this.test=this.global.token;
    this.api.get('/api/1.0/inform/show_inform').then(
      res=>{
        if(res['status']) {
          //this.informationRes= res['data'];
          //this.photopath='../assets/logo.png';
          
          this.photopath= this.global.sourcePrefix+res['avatar'];
          this.username=res['userName'];
          this.id=res['id'];
          this.gender=res['gender'];
          this.intro=res['intro'];
          this.birth=res['birth'];

          this.global.userId = this.id;
          console.log('Get Information success!');
          //this.userIdService.userIdTemp = this.informationRes.id; // added by zjk
          //console.log('emit the userId ' + this.informationRes.id); // added by zjk
        }
        else{
          console.log(res['message']);
        }
      });
  }

}

