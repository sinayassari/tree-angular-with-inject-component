import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './components/tree/tree.component';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';
import {FormsModule} from '@angular/forms';
import { InjectComponentDirective } from './directive/inject-component.directive';



@NgModule({
  declarations: [TreeComponent, ParentComponent, ChildComponent, InjectComponentDirective],
  exports: [
    TreeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TreeModule { }
