import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {MenuItem} from 'primeng/api';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-delicacy',
  templateUrl: './delicacy.component.html',
  styleUrls: ['./delicacy.component.css']
})
export class DelicacyComponent implements OnInit {
  /*hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };*/
  constructor(private api: ApiService,public global:GlobalsService) { }
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'Project'},
            {label: 'Other'},
          ]
        },
          {label: 'Open'},
          {separator: true},
          {label: 'Quit'}
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
      },
      {
        label: 'Help',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Contents'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'File'
              }
            ]}
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {label: 'Save', icon: 'pi pi-fw pi-save'},
              {label: 'Update', icon: 'pi pi-fw pi-save'},
            ]
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-tags',
            items: [
              {label: 'Delete', icon: 'pi pi-fw pi-minus'}
            ]
          }
        ]
      },
      {
        label: 'Quit', icon: 'pi pi-fw pi-times'
      }
    ];
  }
/* this part is commented!
  tryApi() {
    this.api.get('/api/1.0/comment').then(
      res=>{
        if(res['status']) {
          console.log(res['data']);
        }
        else{
          console.log(res['message'])
        }
      }
    ).catch(function(err){
      console.log(err);
    })
  }
this part is commented */

}
