import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Item } from './item';
import { Folder } from './folder';

import { GlobalsService } from '../globals.service';
import { SearchResource } from '../delicacy-search/search-resource';

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.css']
})

export class UserCollectionComponent implements OnInit {
  collectionRes: Folder[] = [];
  collections: Item[] = [];
  userId: string;
  postid: string[];

  temp: any[];
  tempTemp: any[];
  mType: number;
  mTitle: string;
  mImgUrl: string;
  mRoute: string;
  cardContent: SearchResource[];

  constructor(private api: ApiService, public global: GlobalsService) {
  }

  ngOnInit() {
    this.userId = this.global.userId;
    this.getUserCollection();
  }

  getUserCollection() {
    this.cardContent = [];
    this.userId = this.global.userId;
    if (this.userId) {
      this.api.post('/api/1.0/collection/get', {'userId': this.userId}).then(
        res => {
          if (res['status']) {
            this.collectionRes = res['data'];
            if (this.collectionRes[0]) {
              this.collections = this.collectionRes[0].items;
              for (const c of this.collections) {
                this.api.post('/api/1.0/poster/resource', {'postId': c['postId']}).then(
                  response => {
                    if (response['status']) {
                      this.temp = response['post'];
                      this.mType = this.temp['type'];
                      this.tempTemp = this.temp['data'];
                      this.mTitle = this.tempTemp['title'];
                      this.mImgUrl = this.global.sourcePrefix + this.tempTemp['coverImg'];
                      if (this.mType === 3) {
                        this.mRoute = '/menu-detail/' + c['postId'];
                      } else if (this.mType === 2) {
                        this.mRoute = '/pictxt-detail/' + c['postId'];
                      } else if (this.mType === 4) {
                        this.mRoute = '/music-detail/' + c['postId'];
                      } else if (this.mType === 1) {
                        this.mRoute = '/video-detail/' + c['postId'];
                      }
                      this.cardContent.push({title: this.mTitle, coverImg: this.mImgUrl, postUrl: this.mRoute});
                    } else {
                      console.log(response['message']);
                    }
                  }
                );
              }
            }
          } else {
            console.log(res['message']);
          }
        });
    }
  }

}
