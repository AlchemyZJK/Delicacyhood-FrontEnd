import { Component, OnInit } from '@angular/core';
import { CollectionAddRequest } from './collection-add-request';
import { CollectionDeleteRequest } from './collection-delete-request';
import { DelicacyCollectionComponent } from '../delicacy-collection/delicacy-collection.component';
import { ApiService } from '../api.service';

import { UserIdService } from '../user-id.service';

@Component({
  selector: 'app-delicacy-collection-click',
  templateUrl: './delicacy-collection-click.component.html',
  styleUrls: ['./delicacy-collection-click.component.css']
})

export class DelicacyCollectionClickComponent implements OnInit {
  label: string;
  flag: boolean; // true表示标签显示“收藏”
  collectionAddReq: CollectionAddRequest;
  collectionDeleteReq: CollectionDeleteRequest;

  userId: string = 'cd2341f3dab04569903bcdc41600f7b1'; // just for test
  postId: string = '222'; // just for test

  constructor(private api: ApiService, public userIdService: UserIdService) {
    this.label = '收藏';
    this.flag = true;
  }

  ngOnInit() {
  }

  collectionClick() {
    if (this.flag) {
      this.label = '取消';
      this.flag = false;
      this.collectionAddReq = {userId:this.userId, postId:this.postId, folder:'root'};
      this.api.post('/api/1.0/collection/add', this.collectionAddReq).then(
        res=>{
          if(res['status']) {
            console.log('Add collection success!');
          }
          else{
            console.log(res['message']);
          }
        });
    }
    else {
      this.label = '收藏';
      this.flag = true;
      this.collectionDeleteReq = {userId:this.userId, postId:this.postId, folder:'root'};
      this.api.post('/api/1.0/collection/add', this.collectionDeleteReq).then(
        res=>{
          if(res['status']) {
            console.log('Delete collection success!');
          }
          else{
            console.log(res['message']);
          }
        });
    }
  }

}
