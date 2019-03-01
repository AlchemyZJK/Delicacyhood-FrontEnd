import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {  Content, Music , Menu , Pictxt , Vedio , Card } from './type';
import { MockApiService } from '../mock-api.service';
import { Condition } from '../condition';
import { CollectionAddRequest } from '../delicacy-collection-click/collection-add-request';
import { CollectionDeleteRequest } from '../delicacy-collection-click/collection-delete-request';
import { DelicacyCollectionComponent } from '../delicacy-collection/delicacy-collection.component';
import { ApiService } from '../api.service';
import { ExhibitionRequest } from './exhibition-request';
import { ExhibitionResponse } from './exhibition-response';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  styleUrls: ['./exhibition.component.css']
})
export class ExhibitionComponent implements OnInit {
  searchOption: string;
  content: string;
  exhibitionReq: ExhibitionRequest; // postid请求包
  exhibitionRes: ExhibitionResponse[]; // postid获取结果包
  condition: Condition[]; // 请求条件
  path: string; // 跳转路径
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

  label: string;
  flag: boolean; // true表示标签显示“收藏”
  collectionNum: number;
  remarkNum: number;

  // 展示翻页相关的变量
  page: number = 1;
  beforePageFlag: boolean;
  nextPageFlag: boolean;
  length: number;

  constructor(private route: ActivatedRoute,
              private mockService: MockApiService,
              private location: Location,
              private api: ApiService,
              public global: GlobalsService) {
    this.init();
    this.route.queryParams.subscribe(
      queryParams => {
        this.content = queryParams.content;
        this.searchOption = queryParams.searchOption;
        const id = Number(queryParams.id);
        if (this.content) {
          // 此部分为导航栏的搜索功能
          console.log('getPostIdBySearch');
          this.getPostIdBySearch();
          this.getLength(); // 获取本次搜索返回结果数量
        }
        else {
          // 此部分为分类展示功能
          this.dealWithId(id); // 按照分类的id展示各个分类的主题图
          this.getPostIdByTag();
          this.getLength(); // 获取本次展示返回结果数量
        }
    });
  }

  init() {
    this.condition = [];
    this.keyword = '';
    this.offset = 0;
    this.limit = 12;
    this.cardcont = [];

    this.beforePageFlag = false;
    this.nextPageFlag = true;
    this.length = 120;
  }

  // 按照分类的id展示各个分类的主题图
  dealWithId(id: Number) {
    if ( id === 1) {
      this.path = '../assets/chinese-recipe.png';
      this.tag = '中餐';
    }
    if ( id === 2) {
      this.path = '../assets/west-recipe.png';
      this.tag = '西餐';
    }
    if ( id === 3) {
      this.path = '../assets/else-recipe.png';
      this.tag = '其他';
    }
    if ( id === 4) {
      this.path = '../assets/nourish.png';
      this.tag = '养生';
    }
    if ( id === 5) {
      this.path = '../assets/ASMR.png';
      this.tag = '音乐';
    }
  }

  ngOnInit() {
  }

  // 导航栏的搜索功能
  getPostIdBySearch() {
    let data;
    if (this.searchOption === '0') { // content
      console.log('search by content');
      data = {
        condition: [],
        keyword: this.content,
        limit: this.limit,
        offset: this.offset
      };
    }
    else { // author
      data = {
        condition: [{column: 'author_name', value: this.content, op: '='},
                    {column: 'order', value: 'author', op: '='}],
        keyword: '',
        limit: this.limit,
        offset: this.offset
      };
    }
    this.api.post('/api/1.0/search/', data).then(
      res => {
        if (res['status']) {
          this.exhibitionRes = res['data'];
          this.getResoucesForSearch();
        }
        else {
          console.log(res['message']);
        }
      }
    );
  }

  // 获取详细资源内容
  getResoucesForSearch() {
    this.cardcont  = [];
    for (const v of this.exhibitionRes) {
      this.api.post('/api/1.0/poster/resource', {'postId': v['postId']}).then(
        ress => {
          if (ress['status']) {
            this.excontent = ress['post'];
            this.excontent2 = this.excontent['data'];
            this.ctype = this.excontent['type'];
            this.ctitle = this.excontent2['title'];
            this.cpostid = v['postId'];
            if (this.ctype === 3) {
              this.croute = '/menu-detail/' + v['postId'];
            }
            else if (this.ctype === 2) {
              this.croute = '/pictxt-detail/' + v['postId'];
            }
            else if (this.ctype === 1) {
              this.croute = '/video-detail/' + v['postId'];
            }
            else if (this.ctype === 4) {
              this.croute = '/music-detail/' + v['postId'];
            }
            this.cimg = this.global.sourcePrefix + this.excontent2['coverImg'];
            if(this.ctype != 5) {
              this.cardcont.push({title: this.ctitle, coverImg: this.cimg, postid: this.cpostid, path: this.croute, collectionNum: 0, remarkNum: 0});
              this.get_all_num();
            }
          }
          else{
            console.log(ress['message']);
          }
        });
    }
  }

  // 分类展示功能
  getPostIdByTag() {
    this.condition.push({column: 'tag', value: this.tag, op: '='});
    this.condition.push( {column: 'type', value: 5, op: '!='});
    this.exhibitionReq = { condition: this.condition, keyword: this.keyword, limit: this.limit, offset: this.offset};
    this.api.post('/api/1.0/search/', this.exhibitionReq).then(
      res => {
        if ( res['status']) {
          this.exhibitionRes = res['data'];
          this.getResouces(); // 获取详细资源内容
        }
        else {
          console.log(res['message']);
        }
        this.condition = [];
    });
  }

  // 获取详细资源内容
  getResouces() {
    this.cardcont  = [];
    for (const v of this.exhibitionRes) {
      this.api.post('/api/1.0/poster/resource', {'postId': v['postId']}).then(
        ress => {
          if (ress['status']) {
            this.excontent = ress['post'];
            this.excontent2 = this.excontent['data'];
            this.ctype = this.excontent['type'];
            this.ctitle = this.excontent2['title'];
            this.cpostid = v['postId'];
            if (this.ctype === 3) {
              this.croute = '/menu-detail/' + v['postId'];
            }
            else if (this.ctype === 2) {
              this.croute = '/pictxt-detail/' + v['postId'];
            }
            else if (this.ctype === 1) {
              this.croute = '/video-detail/' + v['postId'];
            }
            else if (this.ctype === 4) {
              this.croute = '/music-detail/' + v['postId'];
            }
            this.cimg = this.global.sourcePrefix + this.excontent2['coverImg'];
            this.cardcont.push({title: this.ctitle, coverImg: this.cimg, postid: this.cpostid, path: this.croute, collectionNum: 0, remarkNum: 0});
            this.get_all_num();
          }
          else{
            console.log(ress['message']);
          }
        });
    }
  }

  // 获取评论数
  get_remark_num(postId: string, entry: Card) {
    this.api.get('/api/1.0/comment/number/' + postId).then(
      res => {
        if (res['status']) {
          this.remarkNum = res['commentNum'];
          entry.remarkNum = this.remarkNum;
        } else {
          console.log(res['message']);
        }
      });
  }

  // 获取收藏数
  get_collection_num(postId: string, entry: Card) {
    var num;
    this.api.get('/api/1.0/collection/number/' + postId).then(
      res => {
        if (res['status']) {
          this.collectionNum = res['collectNum'];
          entry.collectionNum = this.collectionNum;
        } else {
          console.log(res['message']);
        }
      });
  }

  // 获取评论数和收藏数的启发函数
  get_all_num() {
    for(let entry of this.cardcont) {
      this.get_remark_num(entry.postid, entry);
      this.get_collection_num(entry.postid, entry);
    }
  }

  // 页数控制
  controlPage() {
    if(this.page * 12 >= this.length) {
      this.nextPageFlag = false;
    }
    else if(this.page == 1) {
      this.beforePageFlag = false;
    }
  }

  getLength() {
    if (this.content) {
      // 此部分为导航栏的搜索功能
      let data;
      if (this.searchOption === '0') { // content
        console.log('search by content');
        data = {condition: [],
                keyword: this.content,
                limit: this.length,
                offset: 0};
      }
      else { // author
        data = {condition: [{
                column: 'author_name',
                value: this.content,
                op: '='}],
                keyword: '',
                limit: this.length,
                offset: 0};
      }
      this.api.post('/api/1.0/search/', data).then(
        res => {
          if(res['status']) {
            this.exhibitionRes = res['data'];
            this.length = this.exhibitionRes.length;
            if(this.length < 12)
              this.nextPageFlag = false;
          }
          else {
            console.log(res['message']);
          }
        });
    }
    else {
      // 此部分为分类展示功能
      this.condition = [];
      this.condition.push({column: 'tag', value: this.tag, op: '='});
      this.condition.push( {column: 'type', value: 5, op: '!='});
      this.exhibitionReq = { condition: this.condition, keyword: this.keyword, limit: this.length, offset: 0};
      this.api.post('/api/1.0/search/', this.exhibitionReq).then(
        res => {
          if(res['status']) {
            this.exhibitionRes = res['data'];
            this.length = this.exhibitionRes.length;
            if(this.length < 12)
              this.nextPageFlag = false;
          }
          else {
            console.log(res['message']);
          }
        });
    }
  }

  // 往前翻页
  beforePage() {
    this.controlPage();
    this.page--;
    if(this.page == 1) {
      this.beforePageFlag = false;
    }
    else {
      //this.beforePageFlag = true;
      this.cardcont = [];
    }
    this.offset = this.offset - 12;
    this.nextPageFlag = true;

    if (this.content) {
      // 此部分为导航栏的搜索功能
      this.getPostIdBySearch();
    }
    else {
      // 此部分为分类展示功能
      // this.dealWithId(id); // 按照分类的id展示各个分类的主题图
      this.getPostIdByTag();
    }
  }

  // 往后翻页
  nextPage() {
    this.page++;
    this.controlPage();
    this.offset = this.offset + 12;
    this.cardcont = [];
    this.beforePageFlag = true;

    if (this.content) {
      // 此部分为导航栏的搜索功能
      this.getPostIdBySearch();
    }
    else {
      // 此部分为分类展示功能
      // this.dealWithId(id); // 按照分类的id展示各个分类的主题图
      this.getPostIdByTag();
    }
  }

}
