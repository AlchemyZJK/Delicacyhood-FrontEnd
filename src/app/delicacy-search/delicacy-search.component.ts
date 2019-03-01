import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { Condition } from '../condition';
import { SearchRequest } from './search-request';
import { SearchResponse } from './search-response';
import { ApiService } from '../api.service';
import { SearchResource } from './search-resource';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-delicacy-search',
  templateUrl: './delicacy-search.component.html',
  styleUrls: ['./delicacy-search.component.css']
})
export class DelicacySearchComponent implements OnInit {
  condition: Condition[]; // 条件筛选
  searchReq: SearchRequest; // 关键词搜索请求包
  searchRes: SearchResponse[]; // 关键词相应包
  searchElement: SearchResponse;
  keyword: string;
  limit: number;
  offset: number;
  time: Date; // 当前时间
  optionTime: SelectItem[]; // 选择时间列表
  selectedTime: string; // 返回的选择时间跨度值
  author: string;
  optionLimit: SelectItem[];

  timeFormat: string;

  searchResourceArray: SearchResource[];
  temp: any[];
  tempTemp: any[];
  mTitle: string;
  mImgUrl: string;
  mType: number;
  mRoute: string;

  constructor(private api: ApiService, public global: GlobalsService, private location: Location) {
    this.condition = [];
    this.keyword = this.selectedTime = this.author = '';
    this.limit = 18;
    this.offset = 0;
    // this.time = new Date();
    this.optionTime = [
      {label: 'Select a Created Time', value: null},
      {label: '一天以内', value: 'OD'},
      {label: '一个月以内', value: 'OM'},
      {label: '三个月以内', value: 'TM'},
      {label: '一年以内', value: 'OY'}
    ];
    this.optionLimit = [
      {label: 'Select the Limit', value: null},
      {label: '3', value: 3},
      {label: '6', value: 6},
      {label: '9', value: 9},
      {label: '12', value: 12},
      {label: '15', value: 15}
    ];
  }

  ngOnInit() {
  }

  requestSearch() {
    this.condition = [];
    this.searchResourceArray = [];
    // 处理createdAt条件
    if (this.selectedTime) {
      this.setTime(this.selectedTime);
    }
    // 处理author条件
    if (this.author != '') {
      this.condition.push({column: 'author_id', value: this.author, op: '='});
    }
    // 装备request包
    console.log(this.keyword);
    this.searchReq = {condition: this.condition, keyword: this.keyword, limit: this.limit, offset: this.offset};
    // POST
    this.api.post('/api/1.0/search/', this.searchReq).then(
            res => {
              if (res['status']) {
                this.searchRes = res['data'];
                console.log('Search Response Success!');
                for (const e of this.searchRes) {
                  this.api.post('/api/1.0/poster/resource', {'postId': e['postId']}).then(
                    response => {
                      if (response['status']) {
                        this.temp = response['post'];
                        this.mType = this.temp['type'];
                        this.tempTemp = this.temp['data'];
                        this.mTitle = this.tempTemp['title'];
                        this.mImgUrl = this.global.sourcePrefix + this.tempTemp['coverImg'];

                        if (this.mType === 3) {
                          this.mRoute = '/menu-detail/' + e['postId'];
                        } else if (this.mType === 2) {
                          this.mRoute = '/pictxt-detail/' + e['postId'];
                        } else if (this.mType === 1) {
                          this.mRoute = '/music-detail/' + e['postId'];
                        } else if (this.mType === 4) {
                          this.mRoute = '/vedio-detail/' + e['postId'];
                        }

                        this.searchResourceArray.push({title: this.mTitle, coverImg: this.mImgUrl, postUrl: this.mRoute});
                        console.log('Get poster resource Success: ' + e['postId']);
                      } else {
                        console.log(response['message']);
                      }
                    });
                }
              } else {
                console.log(res['message']);
              }
            });
  }

  setTime(span: string) {
    let current: Date = new Date();
    let flag = true;

    if (span == 'OD') {
      this.time = new Date(current.getTime() - 1000 * 3600 * 24);
    } else if (span == 'OM') {
      this.time = new Date(current.getTime() - 1000 * 3600 * 24 * 30);
    } else if (span == 'TM') {
      this.time = new Date(current.getTime() - 1000 * 3600 * 24 * 90);
    } else if (span == 'OY') {
      this.time = new Date(current.getTime() - 1000 * 3600 * 24 * 365);
    } else {
      flag = false;
    }
    // 转化时间格式
    this.formatTime();
    // 将时间戳的条件加入condition
    if (flag) {
      this.condition.push({column: 'created_at', value: this.timeFormat, op: '!='});
    }
  }

  formatTime() {
    let year = this.time.getFullYear();
    let month = this.time.getMonth();
    let day = this.time.getDate();
    let hour = this.time.getHours();
    let minute = this.time.getMinutes();
    let second = this.time.getSeconds();

    this.timeFormat = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }

}

