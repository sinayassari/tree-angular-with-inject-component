import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChildConfig, ParentConfig} from '../../model/config.model';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any;
  @Input() config: ChildConfig | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
