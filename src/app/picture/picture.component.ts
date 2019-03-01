import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Content, Music , Menu , Pictxt , Vedio , Card } from '../exhibition/type';
import { MockApiService } from '../mock-api.service';
import { Condition } from '../condition';
import { CollectionAddRequest } from '../delicacy-collection-click/collection-add-request';
import { CollectionDeleteRequest } from '../delicacy-collection-click/collection-delete-request';
import { DelicacyCollectionComponent } from '../delicacy-collection/delicacy-collection.component';
import { ApiService } from '../api.service';
import { ExhibitionRequest } from '../exhibition/exhibition-request';
import { ExhibitionResponse } from '../exhibition/exhibition-response';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})

export class PictureComponent implements OnInit {
  exhibitionReq: ExhibitionRequest; // postid请求包
  exhibitionRes: ExhibitionResponse[]; // postid获取结果包
  condition: Condition[]; // 请求条件
  postidlist: string [];
  tag: string;
  offset: number;
  limit: number;
  keyword: string;
  excontent: any[]; // 接收post内容
  excontent2: any[];
  cardcont: Card[];
  ctitle: string;
  cimg: string;
  ctype: number;
  croute: string;
  cpostid: string;

  // 展示翻页相关的变量
  page: number = 1;
  beforePageFlag: boolean = false;
  nextPageFlag: boolean = true;
  length: number = 120;

  constructor(private route: ActivatedRoute,
              private mockService: MockApiService,
              private location: Location,
              private api: ApiService,
              public global: GlobalsService) {
    this.condition = [];
    this.keyword = '';
    this.offset = 0;
    this.limit = 12;
    this.cardcont = [];
  }

  ngOnInit() {
    // 初始化获得前12资源作为第一页
    this.get_postid();  // 若将limit设置为无穷大，offset设置为0，则获取所有资源--zjk
    this.getLength();  // 获得总共有多少项 控制页数--zjk
  }

  get_postid() {
    this.condition.push( {column: 'type', value: 5, op: '='});
    this.exhibitionReq = { condition: this.condition, keyword: this.keyword, limit: this.limit, offset: this.offset};
    this.api.post('/api/1.0/search/', this.exhibitionReq).then(
      res => {
        if ( res['status']) {
          this.exhibitionRes = res['data'];
          for (const v of this.exhibitionRes) {
            this.api.post('/api/1.0/poster/resource', {'postId': v['postId']}).then(
              ress => {
                if (ress['status']) {
                  this.excontent = ress['post'];
                  this.excontent2 = this.excontent['data'];
                  this.ctype = this.excontent['type'];
                  this.ctitle = this.excontent2['title'];
                  this.cpostid = v['postId'];
                  this.cimg = this.global.sourcePrefix + this.excontent2['coverImg'];
                  this.cardcont.push({title: this.ctitle, coverImg: this.cimg, postid: this.cpostid, path: this.croute, collectionNum: 0, remarkNum: 0});
                }
              }
            );
          }
          console.log('Get Keyword Success!');
        } else {
          console.log(res['message']);
        }
      }
    );
  }

  getLength() {
    //this.condition.push( {column: 'type', value: 5, op: '='});
    this.exhibitionReq = { condition: this.condition, keyword: this.keyword, limit: this.length, offset: 0};
    this.api.post('/api/1.0/search/', this.exhibitionReq).then(
      res => {
        if(res['status']) {
          const response = res['data'];
          this.length = response.length;
          console.log('PageNum: ' + this.length);
        }
        else {
          console.log(res['message']);
        }
      }
    );
  }

  beforePage() {
    this.controlPage();
    this.page--;
    if(this.page == 1) {
      this.beforePageFlag = false;
    }
    else {
      this.cardcont = [];
    }
    this.offset = this.offset - 12;
    this.nextPageFlag = true;

    //this.condition.push( {column: 'type', value: 5, op: '='});
    this.exhibitionReq = { condition: this.condition, keyword: this.keyword, limit: this.limit, offset: this.offset};
    this.api.post('/api/1.0/search/', this.exhibitionReq).then(
      res => {
        if(res['status']) {
          this.exhibitionRes = res['data'];
          for (const v of this.exhibitionRes) {
            this.api.post('/api/1.0/poster/resource', {'postId': v['postId']}).then(
              ress => {
                if (ress['status']) {
                  this.excontent = ress['post'];
                  this.excontent2 = this.excontent['data'];
                  this.ctype = this.excontent['type'];
                  this.ctitle = this.excontent2['title'];
                  this.cpostid = v['postId'];
                  this.cimg = this.global.sourcePrefix + this.excontent2['coverImg'];
                  this.cardcont.push({title: this.ctitle, coverImg: this.cimg, postid: this.cpostid, path: this.croute, collectionNum: 0, remarkNum: 0});
                }
                else {
                  console.log(ress['message']);
                }
              });
            }
        }
        else {
          console.log(res['message']);
        }
      });
    if(this.page == 1) {
      this.beforePageFlag = false;
    }
  }

  nextPage() {
    this.page++;
    this.controlPage();
    this.offset = this.offset + 12;
    this.cardcont = [];
    this.beforePageFlag = true;

    //this.condition.push( {column: 'type', value: 5, op: '='});
    this.exhibitionReq = { condition: this.condition, keyword: this.keyword, limit: this.limit, offset: this.offset};
    this.api.post('/api/1.0/search/', this.exhibitionReq).then(
      res => {
        if(res['status']) {
          this.exhibitionRes = res['data'];
          for (const v of this.exhibitionRes) {
            this.api.post('/api/1.0/poster/resource', {'postId': v['postId']}).then(
              ress => {
                if (ress['status']) {
                  this.excontent = ress['post'];
                  this.excontent2 = this.excontent['data'];
                  this.ctype = this.excontent['type'];
                  this.ctitle = this.excontent2['title'];
                  this.cpostid = v['postId'];
                  this.cimg = this.global.sourcePrefix + this.excontent2['coverImg'];
                  this.cardcont.push({title: this.ctitle, coverImg: this.cimg, postid: this.cpostid, path: this.croute, collectionNum: 0, remarkNum: 0});
                }
                else {
                  console.log(ress['message']);
                }
              });
            }
        }
        else {
          console.log(res['message']);
        }
      });
  }

  controlPage() {
    if(this.page * 12 >= this.length) {
      this.nextPageFlag = false;
    }
    else if(this.page == 1) {
      this.beforePageFlag = false;
    }
  }

}
