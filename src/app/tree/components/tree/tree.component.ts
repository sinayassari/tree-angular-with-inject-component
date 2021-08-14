import {Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ReflectiveInjector, Renderer2} from '@angular/core';
import {TreeConfig} from '../../model/config.model';
import {TreeService} from '../../services/tree.service';
import {FormControl} from '@angular/forms';
import {log} from 'util';
import {childOfKind} from 'tslint';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  // @ts-ignore
  @Input() config: TreeConfig;
  @Input() data: any;
  @Output() searchMethod: EventEmitter<any> = new EventEmitter<any>();
  searchParam = '';

  constructor(private tree: TreeService, private renderer: Renderer2, private cfr: ComponentFactoryResolver) {
  }

  search(): void {
    this.searchMethod.emit(this.searchParam);
  }

  expandRotate(event: any): void {
    if (event.target.classList.contains('rotate-Expand-icon')) {
      event.target.classList.remove('rotate-Expand-icon');
    } else {
      event.target.classList.add('rotate-Expand-icon');
    }
  }

  lightenDarkenColor(colorCode: string, amount: number): string {
    var usePound = false;

    if (colorCode[0] === '#') {
      colorCode = colorCode.slice(1);
      usePound = true;
    }

    var num = parseInt(colorCode, 16);

    var r = (num >> 16) + amount;

    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }

    var b = ((num >> 8) & 0x00FF) + amount;

    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }

    var g = (num & 0x0000FF) + amount;

    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }

    return (usePound ? '#' : '#') + (g | (b << 8) | (r << 16)).toString(16);
  }

  firstGeneratedComponent(component: HTMLElement, item: any): void {
    const genElement = document.getElementById(`comp${item.id}`);
    if (genElement?.children.length === 0 && genElement) {
      const genComp = this.generateComponent(this.config.parentCompInject, item);
      genElement?.appendChild(genComp);
    }
  }

  generateComponent(component: any, componentData: any): any {
    const inject = ReflectiveInjector.resolveAndCreate([{
      provide: 'data',
      useValue: componentData,
    }]);
    const comp = this.cfr.resolveComponentFactory(component);
    const generatedComponent = comp.create(inject);
    return generatedComponent.location.nativeElement;
  }

  appendChildToParent(parentId: number | string, data: any): void {
    if (parentId) {
      const parent: HTMLElement | null = document.getElementById(`${parentId}`);
      if (parent?.childNodes[1]?.childNodes) {
        parent?.removeChild(parent?.childNodes[1]);
      } else {
        const childContainer: HTMLElement = this.renderer.createElement('div');
        const expandIconSrc = './assets/icons/chevron.png';
        childContainer.setAttribute('class', 'child-container');
        childContainer.setAttribute('childContainerId', `${parentId}`);
        data.map((item: any) => {
          const title: HTMLElement = this.renderer.createElement('div');
          const childItem: HTMLElement = this.renderer.createElement('div');
          const component: HTMLElement = this.renderer.createElement('div');
          component.setAttribute('class', 'component');
          childItem.setAttribute('id', item.id);
          childItem.setAttribute('class', 'child-item');
          title.setAttribute('class', 'title');
          const expandIcon: HTMLElement = this.renderer.createElement('img');
          const parentIcon: HTMLElement = this.renderer.createElement('img');
          const childIcon: HTMLElement = this.renderer.createElement('img');
          if (item[this.config.parentPropertyName] === true) {
            const generatedComp = this.generateComponent(this.config.parentCompInject, item);
            component.appendChild(generatedComp);
            title.setAttribute('style', `background-color: ${this.config.parentBgc}`);
            expandIcon.setAttribute('src', expandIconSrc);
            // @ts-ignore
            const childWidth = parent?.clientWidth - 50;
            childItem.setAttribute('style', `width: ${childWidth}px`);
            title.appendChild(expandIcon);
            title.appendChild(parentIcon);
            title.appendChild(component);
            parentIcon.setAttribute('src', this.config?.parentIconSrc || '');
            expandIcon.addEventListener('click', event => {
              event.stopPropagation();
              this.expandRotate(event);
              this.config?.expandIconAction(item);
            });
            childItem.addEventListener('click', (event) => {
              event.stopPropagation();
              this.config.rowParentAction(item);
            });
          } else {
            const generatedComp = this.generateComponent(this.config.parentCompInject, item);
            component.appendChild(generatedComp);
            title.setAttribute('style', `background-color: ${this.config.childBgc}`);
            title.appendChild(childIcon);
            title.appendChild(component);
            // @ts-ignore
            const childWidth = parent?.clientWidth - 50;
            childItem.setAttribute('style', `width: ${childWidth}px`);
            childIcon.setAttribute('src', this.config.childIconSrc || '');
            childItem.addEventListener('click', (event) => {
              event.stopPropagation();
              this.config.rowChildAction(item);
            });
          }
          const text: HTMLElement = this.renderer.createElement('span');
          text.innerText = item[this.config?.titlePropertyName[0]];
          title.appendChild(text);
          childItem.appendChild(title);
          childContainer.appendChild(childItem);
          parent?.appendChild(childContainer);
        });
      }
    }
  }

  appendChildSearch(data: any): void {
    if (data) {
      this.appendChildToParent(data[0].children[0][this.config.parentIdPropertyName], data[0].children);
      this.appendChildSearch(data[0].children);
    }
  }

  ngOnInit(): void {
    this.tree.gatherData.subscribe(res => {
      if (res) {
        this.appendChildToParent(res[0][this.config.parentIdPropertyName], res);
      }
    });
    this.tree.searchData.subscribe(res => {
      if (res) {
        this.data = res;
        setTimeout(() => {
          this.appendChildSearch(res);
        }, 100);
      }
    });
  }

}
