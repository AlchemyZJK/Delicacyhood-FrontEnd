import { Component, OnInit } from '@angular/core';
import { MockApiService } from '../mock-api.service';
import {Content, Music, Vedio} from '../exhibition/type';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from '../globals.service';

// following are added by zjk
import { CollectionAddRequest } from '../delicacy-collection-click/collection-add-request';
import { CollectionDeleteRequest } from '../delicacy-collection-click/collection-delete-request';
import { CommentAddRequest } from '../delicacy-remark/comment-add-request';
import { RemarkResponse } from '../user-remark/remark-response';
import { MessageService } from 'primeng/api';
import { RemarkContent } from '../remark-content';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.css']
})
export class MusicDetailComponent implements OnInit {
  post: string;
  vedio: Vedio[];
  excontent: any[];
  excontent2: any[];
  ptitle: string;
  pcoverImg: string;
  proute: string;
  ptag: string[];
  pauthor: string;
  pname: string;
  ptxt: string;
  ptime: Date;

  // following are added by zjk
  postId: string;
  userId: string;
  label: string;
  flag: boolean;
  collectionAddReq: CollectionAddRequest; // 添加收藏请求包
  collectionDeleteReq: CollectionDeleteRequest; // 取消收藏请求包
  remark: string;
  commentAddReq: CommentAddRequest; // 发表评论请求包
  remarkGetRes: RemarkResponse[] = []; // 获取评论相应包
  remarkContent: RemarkContent[] = []; // 用户评论列表

  constructor(
    private route: ActivatedRoute,
    private mockService: MockApiService,
    private location: Location,
    private api: ApiService,
    public global: GlobalsService,
    private messageService: MessageService
  ) {

    // following are added by zjk
    this.label = '收藏';
    this.flag = true;
  }

  ngOnInit() {
    this.userId = this.global.userId;
    this.route.params.subscribe(params => {
      this.postId = this.route.snapshot.paramMap.get('postid');
      this.get_content(this.postId);
    });

    // following are added by zjk
    if ( this.postId) {
      this.getRemark(this.postId);
    }
  }

  get_content(postId: string) {
    this.api.post('/api/1.0/poster/resource', {'postId': postId}).then(
      ress => {
        if (ress['status']) {
          this.excontent = ress['post'];
          this.excontent2 = this.excontent['data'];
          this.ptitle = this.excontent2['title'];
          this.pcoverImg = this.global.sourcePrefix + this.excontent2['coverImg'];
          this.proute = this.global.sourcePrefix + this.excontent2['source'];
          this.ptag = this.excontent2['tag'];
          this.pauthor = this.excontent2['authorId'];
          this.ptime = this.excontent2['createAt'];
          this.ptxt = this.excontent2['text'];
          console.log(this.proute);
          this.get_authorName(this.pauthor);
        }
      }
    );
  }

  get_authorName(authorId: string) {
    console.log('get_authorname');
    this.api.post('/api/1.0/inform/get_uname', {'id': authorId}).then(
      rest => {
        if (rest['userName']) {
          this.pname = rest['userName'];
        }
        console.log(this.pname);
      }
    );
  }

  // following are added by zjk
  collectionClick() {
    if (this.flag) {
      this.label = '取消';
      this.flag = false;
      this.userId = this.global.userId;
      this.collectionAddReq = {userId:this.userId, postId:this.postId, folder:'root'};
      this.api.post('/api/1.0/collection/add', this.collectionAddReq).then(
        res => {
          if (res['status']) {
            console.log('Add collection success!');
            this.messageService.add({severity:'success', summary:'添加收藏成功', detail:'Add Collection Success'});
          } else {
            console.log(res['message']);
            this.messageService.add({severity:'warn', summary:'添加收藏失败', detail:'Add Collection Fail'});
          }
        });
    } else {
      this.label = '收藏';
      this.flag = true;
      this.userId = this.global.userId;
      this.collectionDeleteReq = {userId: this.userId, postId: this.postId, folder: 'root'};
      this.api.post('/api/1.0/collection/delete', this.collectionDeleteReq).then(
        res => {
          if (res['status']) {
            console.log('Delete collection success!');
            this.messageService.add({severity:'success', summary:'删除收藏成功', detail:'Delete Collection Success'});
          } else{
            console.log(res['message']);
            this.messageService.add({severity:'warn', summary:'删除收藏失败', detail:'Delete Collection Fail'});
          }
        });
    }
  }

  getRemark(postId: string) {
    this.api.get('/api/1.0/comment/p/' + this.postId).then(
      res=>{
        if(res['status']) {
          this.remarkGetRes = res['remarks'];
          console.log('Get Comment Success!');
          this.get_remark_content();
        }
        else{
          console.log(res['message']);
        }
      });
  }

  addRemark() {
    this.userId = this.global.userId;
    this.commentAddReq = {userId:this.userId, content:this.remark, postId:this.postId};
    this.api.post('/api/1.0/comment/add', this.commentAddReq).then(
      res=>{
        if(res['status']) {
          console.log('Add Comment Success!');
          this.messageService.add({severity:'success', summary:'添加评论成功', detail:'Add Comment Success'});
          this.remark = '';
          this.getRemark(this.postId);
        }
        else{
          console.log(res['message']);
          this.messageService.add({severity:'warn', summary:'添加评论失败', detail:'Add Comment Fail'});
        }
      });
  }

  get_remark_content() {
    for(const c of this.remarkGetRes) {
      this.api.post('/api/1.0/inform/get_uname', {'id': c['userId']}).then(
        res => {
          if(res['status']) {
            this.remarkContent.push({userName:res['userName'], content:c['content'], createdTime:c['createdAt']});
            console.log('Get remark Content Success!');
          }
          else {
            console.log(res['message']);
          }
        }
      );
    }
    console.log(this.remarkContent);
  }

}

