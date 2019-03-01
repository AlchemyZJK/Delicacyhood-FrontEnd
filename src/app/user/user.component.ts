import { Component, OnInit } from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { GlobalsService } from '../globals.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
dialog1: DialogModule;
display = false;
test: string;
option: string;

  constructor(public global: GlobalsService,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe(param => {
      this.option = param.option;
    });
  }

  ngOnInit() {
  }

  getSelected(option: string): boolean {
    if (this.option === option) { return true; }
    else { return false; }
  }


  showDialog() {
  this.display = true;
  }
}

