import {Component} from '@angular/core';

type TreeConfig = {
  parentPropertyName: string,
  parentIdPropertyName: string,
  titlePropertyName: string[],
  parentCompInject?: any,
  childCompInject?: any,
  rowParentAction: (event: any) => any,
  rowChildAction: (event: any) => any,
  parentIconSrc?: string,
  childIconSrc?: string,
  expandIconAction: (event: any) => any,
  multiTitle?: [],
  parentBgc?: string,
  childBgc?: string,
};

type ParentConfig = {
  bgc: string,
};

type ChildConfig = {
  bgc: string,
};
