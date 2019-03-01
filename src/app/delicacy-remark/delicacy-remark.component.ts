import { Component, OnInit } from '@angular/core';
import { CommentAddRequest } from './comment-add-request';
import { ApiService } from '../api.service';
import { RemarkResponse } from '../user-remark/remark-response';

import { UserIdService } from '../user-id.service';

@Component({
  selector: 'app-delicacy-remark',
  templateUrl: './delicacy-remark.component.html',
  styleUrls: ['./delicacy-remark.component.css']
})
export class DelicacyRemarkComponent implements OnInit {
  remark: string = '';
  userId: string;
  postId: string = '222'; // just for test
  commentAddReq: CommentAddRequest; // 发表评论请求包
  remarkGetRes: RemarkResponse[] = []; // just for test

  constructor(private api: ApiService, public userIdService: UserIdService) {
  }

  ngOnInit() {
    this.userId = this.userIdService.userIdTemp;
    if(this.userId) {
      this.getRemark(this.postId);
    }
  }

  addRemark() {
    this.commentAddReq = {userId:this.userId, content:this.remark, postId:this.postId};
    this.api.post('/api/1.0/comment/add', this.commentAddReq).then(
      res=>{
        if(res['status']) {
          console.log('Add Comment Success!');
        }
        else{
          console.log(res['message']);
        }
      });
  }

  getRemark(postId: string) {
    this.api.get('/api/1.0/comment/' + this.postId).then(
      res=>{
        if(res['status']) {
          this.remarkGetRes = res['data'];
          console.log('Get Comment Success!');
        }
        else{
          console.log(res['message']);
        }
      });
  }

}
