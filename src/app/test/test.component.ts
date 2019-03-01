import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { MessageService } from 'primeng/api';
import { GlobalsService } from '../globals.service';
import { ApiService } from '../api.service';

import { Content } from './submit-request';
import { VedioData, VedioSubmitRequest } from './submit-request';
import { PicTextData, PicTextSubmitRequest } from './submit-request';
import { MenuData, MenuSubmitRequest } from './submit-request';
import { AsmrData, AsmrSubmitRequest } from './submit-request';
import { PicData, PicSubmitRequest } from './submit-request';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  file: any;
  extension: string;

  type: number;
  coverImgUrl: string;
  sourceUrl: string;
  authorId: string;

  hidden: boolean = true;

  // 关于视频帖发表的变量
  vedioTitle: string;
  vedioIntro: string;
  vedioTag: string;
  vedioTagArray: string[] = [];
  vedioData: VedioData;
  vedioSubmitRequest: VedioSubmitRequest;

  // 关于图文帖的变量
  picTextTitle: string;
  picTextTextTemp: string;
  picTextContentTemp: Content;
  picTextContentArray: Content[]= [];
  picTextTag: string;
  picTextTagArray: string[] = [];
  picTextData: PicTextData;
  picTextSubmitRequest: PicTextSubmitRequest;

  // 图文帖和菜谱帖共用的变量
  contentList: string[]= [];

  // 关于菜谱帖的变量
  menuTitle: string;
  menuIntro: string;
  menuIntroContent: Content;
  menuIntroArray: Content[] = [];
  menuTextTemp: string;
  menuContentTemp: Content;
  menuContentArray: Content[] = [];
  menuFruitArray: Content[] = [];
  menuTag: string;
  menuTagArray: string[] = [];
  menuData: MenuData;
  menuSubmitRequest: MenuSubmitRequest;


  // 关于音频帖发表的变量
  asmrTitle: string;
  asmrIntro: string;
  asmrTag: string;
  asmrTagArray: string[] = [];
  asmrData: AsmrData;
  asmrSubmitRequest: AsmrSubmitRequest;

  // 关于单图帖发表的变量
  picTitle: string;
  picTag: string;
  picTagArray: string[] = [];
  picData: PicData;
  picSubmitRequest: PicSubmitRequest;

  constructor(private fileUpload: UploadFileService,
              private messageService: MessageService,
              private api: ApiService,
              public global: GlobalsService) { }

  ngOnInit() {
  }

  output(event) {
    this.file = event.srcElement.files;
    const temp = this.file[0].name.split('.');
    this.extension = temp[temp.length - 1];
    const blob = new Blob(this.file);
    console.log(blob);
    console.log('type of blob: ', typeof blob);
    this.messageService.add({severity:'info', summary: '选择文件', detail:this.file[0].name});
  }

  upload() {
    const blob = new Blob(this.file);
    this.fileUpload.uploadFile(blob, this.extension).then((url: string) => {
      console.log(url);
      this.messageService.add({severity:'info', summary: '上传文件成功', detail:url});
    });
  }

  uploadCoverImg() {
    const blob = new Blob(this.file);
    this.fileUpload.uploadFile(blob, this.extension).then((url: string) => {
      console.log('coverImgUrl: ' + url);
      this.coverImgUrl = this.cutUrl(url);
      this.messageService.add({severity:'info', summary: '上传封面图片成功', detail:this.coverImgUrl});
    });
  }

  uploadSource() {
    const blob = new Blob(this.file);
    this.fileUpload.uploadFile(blob, this.extension).then((url: string) => {
      console.log('sourceUrl: ' + url);
      this.sourceUrl = this.cutUrl(url);
      this.messageService.add({severity:'info', summary: '上传资源文件成功', detail:this.sourceUrl});
    });
  }


  // 视频帖发布
  vedioSubmit() {
    this.hidden = false;
    this.authorId = this.global.userId;
    this.vedioData = {authorId: this.authorId,
                      title: this.vedioTitle,
                      source: this.sourceUrl,
                      coverImg: this.coverImgUrl,
                      text: this.vedioIntro,
                      tag: this.vedioTagArray};
    console.log(this.vedioData);
    this.vedioSubmitRequest = {type: 1, userId: this.authorId, data: this.vedioData};
    console.log(this.vedioSubmitRequest);
    this.api.post('/api/1.0/poster/post', this.vedioSubmitRequest).then(
      res => {
        if(res['status']) {
          console.log('Submit Vedio Success!');
          this.messageService.add({severity:'info', summary: '发表视频成功', detail:'Submit Vedio Success'});
          this.hidden = true;
        }
        else {
          console.log(res['message']);
          this.messageService.add({severity:'info', summary: '发表视频成功', detail:'Wait For a long Time'});
          this.hidden = true;
        }
      }
    );
    // 初始化变量
    this.vedioTitle = '';
    this.vedioIntro = '';
    this.vedioTagArray = [];
  }

  vedioAddTag() {
    this.vedioTagArray.push(this.vedioTag);
    this.vedioTag = '';
  }

  uploadVedioSource() {
    const blob = new Blob(this.file);
    this.fileUpload.uploadFile(blob, this.extension).then((url: string) => {
      console.log('sourceUrl: ' + url);
      //this.sourceUrl = this.cutUrl(url);
      this.sourceUrl = url;
      this.messageService.add({severity:'info', summary: '上传资源文件成功', detail:this.sourceUrl});
    });
  }

  // ASMR音频帖发布
  asmrSubmit() {
    this.hidden = false;
    this.authorId = this.global.userId;
    this.asmrData = {authorId: this.authorId,
                     title: this.asmrTitle,
                     source: this.sourceUrl,
                     coverImg: this.coverImgUrl,
                     text: this.asmrIntro,
                     tag: this.asmrTagArray};
    console.log(this.asmrData);
    this.asmrSubmitRequest = {type: 4, userId: this.authorId, data: this.asmrData};
    console.log(this.asmrSubmitRequest);
    this.api.post('/api/1.0/poster/post', this.asmrSubmitRequest).then(
          res => {
            if(res['status']) {
              console.log('Submit ASMR Success!');
              this.messageService.add({severity:'info', summary: '发表ASMR成功', detail:'Submit ASMR Success'});
              this.hidden = true;
            }
            else {
              console.log(res['message']);
              this.messageService.add({severity:'info', summary: '发表ASMR成功', detail:'Wait For a long Time'});
              this.hidden = true;
            }
          }
        );
    // 初始化变量
    this.asmrTitle = '';
    this.asmrIntro = '';
    this.asmrTagArray = [];
  }

  asmrAddTag() {
    this.asmrTagArray.push(this.asmrTag);
    this.asmrTag = '';
  }

  // 图文帖发布
  picTextSubmit() {
    this.hidden = false;
    this.authorId = this.global.userId;
    this.picTextData = {authorId: this.authorId,
                        title: this.picTextTitle,
                        coverImg: this.coverImgUrl,
                        content: this.picTextContentArray,
                        tag: this.picTextTagArray};
    console.log(this.picTextData);
    this.picTextSubmitRequest = {type: 2, userId: this.authorId, data: this.picTextData};
    console.log(this.picTextSubmitRequest);
    this.api.post('/api/1.0/poster/post', this.picTextSubmitRequest).then(
              res => {
                if(res['status']) {
                  console.log('Submit Pic Text Success!');
                  this.messageService.add({severity:'info', summary: '发表图文帖成功', detail:'Submit Pic Text Success'});
                  this.hidden = true;
                }
                else {
                  console.log(res['message']);
                  this.messageService.add({severity:'error', summary: '发表图文帖失败', detail:res['message']});
                  this.hidden = true;
                }
              }
            );
    // 初始化变量
    this.picTextTitle = '';
    this.picTextTagArray = [];
    this.contentList = [];
    this.picTextContentArray = [];
  }

  picTextAddTag() {
    this.picTextTagArray.push(this.picTextTag);
    this.picTextTag = '';
  }

  uploadPicTextImg() {
    const blob = new Blob(this.file);
    this.contentList.push(this.file[0].name);
    console.log(this.file);
    this.fileUpload.uploadFile(blob, this.extension).then((url: string) => {
      console.log('picTextContentUrl: ' + url);
      this.picTextContentTemp = {imageFlag: true, text: url};
      this.picTextContentArray.push(this.picTextContentTemp);
    });
  }

  uploadPicTextText() {
    this.contentList.push(this.picTextTextTemp);
    this.picTextContentTemp = {imageFlag: false, text: this.picTextTextTemp};
    this.picTextContentArray.push(this.picTextContentTemp);
    this.picTextTextTemp = '';
  }

  // 图片帖发布
  picSubmit() {
    this.hidden = false;
    this.authorId = this.global.userId;
    this.picData = {authorId: this.authorId,
                    title: this.picTitle,
                    coverImg: this.coverImgUrl,
                    tag: this.picTagArray};
    console.log(this.picData);
    this.picSubmitRequest = {type: 5, userId: this.authorId, data: this.picData};
    console.log(this.picSubmitRequest);
    this.api.post('/api/1.0/poster/post', this.picSubmitRequest).then(
          res => {
            if(res['status']) {
              console.log('Submit Pic Success!');
              this.messageService.add({severity:'info', summary: '发表图片成功', detail:'Submit Pic Success'});
              this.hidden = true;
            }
            else {
              console.log(res['message']);
              this.messageService.add({severity:'error', summary: '发表图片失败', detail:res['message']});
              this.hidden = true;
            }
          }
        );
    // 初始化变量
    this.picTitle = '';
    this.picTagArray = [];
  }

  picAddTag() {
    this.picTagArray.push(this.picTag);
    this.picTag = '';
  }

  // 菜谱帖发布
  menuSubmit() {
    this.hidden = false;
    this.authorId = this.global.userId;
    this.menuIntroContent = {imageFlag: false, text: this.menuIntro};
    this.menuIntroArray.push(this.menuIntroContent);
    this.menuFruitArray.push(this.menuIntroContent);
    this.menuData = {authorId: this.authorId,
                     title: this.menuTitle,
                     coverImg: this.coverImgUrl,
                     intro: this.menuIntroArray,
                     content: this.menuContentArray,
                     fruit: this.menuFruitArray,
                     tag: this.menuTagArray};
    console.log(this.menuData);
    this.menuSubmitRequest = {type: 3, userId: this.authorId, data: this.menuData};
    console.log(this.menuSubmitRequest);
    this.api.post('/api/1.0/poster/post', this.menuSubmitRequest).then(
              res => {
                if(res['status']) {
                  console.log('Submit Menu Success!');
                  this.messageService.add({severity:'info', summary: '发表菜谱帖成功', detail:'Submit Menu Success'});
                  this.hidden = true;
                }
                else {
                  console.log(res['message']);
                  this.messageService.add({severity:'error', summary: '发表菜谱帖失败', detail:res['message']});
                  this.hidden = true;
                }
              }
            );
    // 初始化变量
    this.menuTitle = '';
    this.menuIntro = '';
    this.menuIntroArray = [];
    this.menuContentArray = [];
    this.menuFruitArray = [];
    this.contentList = [];
    this.menuTagArray = [];
  }

  menuAddTag() {
    this.menuTagArray.push(this.menuTag);
    this.menuTag = '';
  }

  uploadMenuImg() {
    const blob = new Blob(this.file);
    this.contentList.push(this.file[0].name);
    console.log(this.file);
    this.fileUpload.uploadFile(blob, this.extension).then((url: string) => {
      console.log('menuContentUrl: ' + url);
      const tempUrl = this.cutUrl(url);
      this.menuContentTemp = {imageFlag: true, text: tempUrl};
      this.menuContentArray.push(this.menuContentTemp);
    });
  }

  uploadMenuText() {
    this.contentList.push(this.menuTextTemp);
    this.menuContentTemp = {imageFlag: false, text: this.menuTextTemp};
    this.menuContentArray.push(this.menuContentTemp);
    this.menuTextTemp = '';
  }

  // 修剪URL
  cutUrl(rawUrl: string):string {
    const temp = rawUrl.split('/');
    return temp[temp.length - 1];
  }

}
