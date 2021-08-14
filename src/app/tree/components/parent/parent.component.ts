import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParentConfig} from '../../model/config.model';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() expandIconAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() config: ParentConfig | undefined;


  constructor() {
  }

  ngOnInit(): void {
  }

  rowClick(data: any): void {
    this.rowAction.emit(data);
  }

}
