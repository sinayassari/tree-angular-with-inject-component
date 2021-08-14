import {Component, OnInit} from '@angular/core';
import {TreeConfig} from './tree/model/config.model';
import {TreeService} from './tree/services/tree.service';
import {HttpClient} from '@angular/common/http';
import {TestComponent} from './test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private tree: TreeService, private httpClient: HttpClient) {
  }

  data = [];

  treeConfig: TreeConfig = {
    parentPropertyName: 'isFolder',
    titlePropertyName: ['accountName'],
    parentIdPropertyName: 'parentId',
    parentCompInject: TestComponent,
    rowParentAction: event => this.getNode(event),
    rowChildAction: event => this.getNode(event),
    expandIconAction: event => this.getChild(event),
    parentBgc: '#4e4e4e',
    childBgc: '#8c8c8c',
  };

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.httpClient.post('/budget-backend/api/int/account/search', {
      count: 10,
      startIndex: 0,
    }, {
      headers: {
        authorization: 'Bearer 401d0aea-4a00-46cd-b94a-caa0e9b85fbd'
      }
    }).subscribe((res: any) => {
      this.tree.sendGatherSearchData(res.list);
    });
  }

  getSearchData(searchName: string): void {
    this.httpClient.post('/budget-backend/api/int/account/search', {
      count: 3,
      startIndex: 0,
      criteria: {
        operator: 'and',
        criteria: [
          {
            operator: 'and',
            criteria: [
              {
                fieldName: 'accountName',
                operator: 'iContains',
                value: [
                  searchName
                ]
              }
            ]
          }
        ]
      }
    }, {
      headers: {
        authorization: 'Bearer 401d0aea-4a00-46cd-b94a-caa0e9b85fbd'
      }
    }).subscribe((res: any) => {
      this.tree.sendGatherSearchData(res.list);
    });
  }

  getNode(event: any): void {
    console.log(event);
  }

  getChild(event: any): void {
    this.httpClient.get('/budget-backend/api/int/account/children/' + event.id, {
      headers: {
        authorization: 'Bearer 401d0aea-4a00-46cd-b94a-caa0e9b85fbd'
      }
    }).subscribe(res => {
      this.tree.sendGatherDataToTree(res);
    });
  }
}
