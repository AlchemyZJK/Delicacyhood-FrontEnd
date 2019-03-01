import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GlobalsService} from './globals.service';
import {ApiService} from './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Welcome Page';
  showbar = false;
  active: string;
  activeSub: string;
  searchStatus = false;
  logInStatus = false;
  selfOption: string; // 去到个人中心时的位置
  searchOption = 0; // 0 for content, 1 for author
  condition: string; // 搜索框输入的内容

  constructor(private router: Router,
              private global: GlobalsService,
              public api: ApiService) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null && this.global.token === undefined) {
      this.global.token = localStorage.getItem('token');
      this.checkToken();
    }
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      console.log('set status false');
      this.global.logInStatus.next(false);
    }
    this.global.getLogInStatus().subscribe(status => {
      console.log('change status:', status);
      this.logInStatus = status;
    });
  }

  checkToken() {
    this.api.get('/api/1.0/inform/token_id').then(
      res => {
        if(res['status']) {
          this.global.logInStatus.next(true);
          this.global.userId = res['id'];
          this.logInStatus = true;
        } else {
          this.global.logInStatus.next(false);
          this.global.token = undefined;
          localStorage.removeItem('token');
          this.logInStatus = false;
        }
      }
    )
  }

  changeSearchOption(option: number) {
    this.searchOption = option;
  }

  output() {
    console.log(this.condition);
  }

  search() {
    console.log(this.searchOption);
    this.searchStatus = true;
    this.router.navigate(['/exhibition'], {
      queryParams: {
        searchOption: this.searchOption,
        content: this.condition,
      }
    });
    console.log(this.condition);
  }

  status2Class(option: string): string {
    if (option === this.active) {
      return 'active nav-link nav-text';
    } else {
      return 'nav-link nav-text';
    }
  }

  choose(option: string) {
    this.activeSub = option;
    this.router.navigate(['/exhibition'], {
      queryParams: {
        id: option,
      }
    });
  }

  status2SubClass(option: string) {
    if (option === this.activeSub) {
      return 'nav-link active';
    } else {
      return 'nav-link';
    }
  }

  home() {
    this.searchStatus = false;
    this.showbar = false;
    this.active = 'home';
  }

  goTo(option: string) {
    this.selfOption = option;
    this.router.navigate(['/user'], {
      queryParams: {
        option: option
      }
    });
  }

  logOut() {
    this.api.get('/api/1.0/user/sign_out').then(
      res => {
        if (res['status']) {
          this.global.token = undefined;
          this.global.logInStatus.next(false);
          localStorage.removeItem('token');
        } else {
          console.log(res['message']);
        }
      });
  }

  upload() {
    this.searchStatus = false;
    this.showbar = false;
    this.active = 'upload';
    this.router.navigate(['/upload']);
  }

  menu() {
    this.showbar = true;
    this.active = 'menu';
    this.activeSub = '1';
    this.router.navigate(['/exhibition'], {
      queryParams: {
        'id': 1
      }
    });
  }

  health() {
    this.searchStatus = false;
    this.showbar = false;
    this.active = 'health';
    this.router.navigate(['/exhibition'], {
      queryParams: {
        'id': 4
      }
    });
  }

  asmr() {
    this.searchStatus = false;
    this.showbar = false;
    this.active = 'asmr';
    this.router.navigate(['/exhibition'], {
      queryParams: {
        'id': 5
      }
    });
  }

  photoSquare() {
    this.searchStatus = false;
    this.showbar = false;
    this.active = 'square';
  }

}


