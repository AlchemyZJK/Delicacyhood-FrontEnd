import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-delicacy-collection',
  templateUrl: './delicacy-collection.component.html',
  styleUrls: ['./delicacy-collection.component.css']
})
export class DelicacyCollectionComponent implements OnInit {
  postId: '222'; // just for test
  collectionNum: number;
  remarkNum: number;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.get_remark_num(this.postId);
    this.get_collection_num(this.postId);
  }

  get_remark_num(postId: string) {
    this.api.get('/api/1.0/comment/number', postId).then(
      res=>{
        if(res['status']) {
          this.remarkNum = res['data'];
          console.log('Get RemarkNum Success!')
        }
        else{
          console.log(res['message']);
        }
      });
  }

  get_collection_num(postId: string) {
    this.api.get('/api/1.0/collection/number', postId).then(
      res=>{
        if(res['status']) {
          this.collectionNum = res['data'];
          console.log('Get CollectionNum Success!')
        }
        else{
          console.log(res['message']);
        }
      });
  }

}
