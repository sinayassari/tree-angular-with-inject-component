import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Injector,
  Input,
  OnInit,
  ReflectiveInjector,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[appInjectComponent]'
})
export class InjectComponentDirective implements OnInit {
  @Input() compRef: any;
  @Input() data: any;

  constructor(public vcr: ViewContainerRef,
              private cfr: ComponentFactoryResolver,
              private inj: Injector) {
  }

  ngOnInit(): void {
    const injector: Injector = ReflectiveInjector.resolveAndCreate(
      [{
        provide: 'config', useValue: this.data
      }]);
    const factory = this.cfr.resolveComponentFactory(this.compRef);
    const cr: ComponentRef<any> = this.vcr.createComponent(factory, 0, injector);
  }

}
