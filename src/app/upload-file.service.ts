import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private oss: any;

  constructor(public global: GlobalsService,
              public api: ApiService) {

  }

  dataURLtoBlob(dataURL: string) {
    // convert base64 to raw binary data held in a string
    const byteString = atob(dataURL.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // New Code
    return new Blob([ia], {type: mimeString});
  }

  uploadFile(file: any, extension?: string) {
    if (!extension) { extension = 'png'; }
    return new Promise((resolve, reject) => {
      console.log('file: ', file);
      console.log('type of : ', typeof file);
      this.api.get('/api/1.0/key/').then(
        res => {
          if (res['status']) {
            this.oss = new OSS({
              'region': 'oss-cn-shanghai',
              'accessKeyId': res['data']['accessKeyId'],
              'accessKeySecret': res['data']['accessKeySecret'],
              'bucket': res['data']['bucket']
            });
            const sha = new Hashes.SHA256().hex(this.global.userId).substr(0, 8);
            const dateStamp = new Date().getTime();
            this.oss.put(sha + dateStamp + '.' + extension, file).then(function (data) {
                resolve(data['url']);
            }).catch(function (err) {
              reject(err);
            });
          }
        }
      );
    });
  }

}
