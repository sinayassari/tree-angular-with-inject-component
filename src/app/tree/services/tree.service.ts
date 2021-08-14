import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  gatherData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  searchData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
  }

  sendGatherDataToTree(data: any): void {
    this.gatherData.next(data);
  }

  sendGatherSearchData(data: any): void {
    this.searchData.next(data);
  }
}
