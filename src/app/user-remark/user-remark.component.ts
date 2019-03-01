import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { RemarkResponse } from './remark-response';

import { UserIdService } from '../user-id.service';
import { RemarkResource } from './remark-resource';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-user-remark',
  templateUrl: './user-remark.component.html',
  styleUrls: ['./user-remark.component.css']
})
export class UserRemarkComponent implements OnInit {
  userId: string;
  remarkRes: RemarkResponse[] = [];

  temp: any[];
  tempTemp: any[];
  cardContent: RemarkResource[] = [];
  postId: string;
  mTitle: string;
  mContent: string;
  mCreatedTime: Date;
  mRoute: string;
  mType: number;

  constructor(private api: ApiService, public global: GlobalsService) { }

  ngOnInit() {
    this.getUserRemarks();
  }

  getUserRemarks() {
    this.userId = this.global.userId;
    this.api.get('/api/1.0/comment/u/' + this.userId).then(
      res=>{
        if(res['status']) {
          this.remarkRes = res['remarks'];
          console.log('Get Remarks Success!');
          for( const c of this.remarkRes ) {
            this.api.post('/api/1.0/poster/resource', {'postId': c.postId}).then(
              response => {
                if(response['status']) {
                  this.postId = c.postId;
                  this.mContent = c.content;
                  this.mCreatedTime = c.createdAt;

                  this.temp = response['post'];
                  this.mType = this.temp['type'];
                  this.tempTemp = this.temp['data'];
                  this.mTitle = this.tempTemp['title'];
                  if (this.mType === 3) {
                    this.mRoute = '/menu-detail/' + c['postId'];
                  }
                  else if (this.mType === 2) {
                    this.mRoute = '/pictxt-detail/' + c['postId'];
                  }
                  else if (this.mType === 4) {
                    this.mRoute = '/music-detail/' + c['postId'];
                  }
                  else if (this.mType === 1) {
                    this.mRoute = '/video-detail/' + c['postId'];
                  }
                }
                else {
                  console.log(response['message']);
                }
                console.log(this.mContent);
                this.cardContent.push({title: this.mTitle, content: this.mContent, createdAt: this.mCreatedTime, postUrl: this.mRoute});
              }
            );


          }
        }
        else{
          console.log(res['message']);
        }
      });
  }

}
