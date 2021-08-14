import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(@Inject('data') private data: any) {
  }

  ngOnInit(): void {
  }

  showData(): void {
    console.log(this.data);
  }

}
