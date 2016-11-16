import {Component} from '@angular/core';

export class ComponentGroup {
  name: string;
  list: ComponentItem[];

  constructor(name: string, list: ComponentItem[]) {
    this.name = name;
    this.list = list;
  }
}
export class ComponentItem {
  name: string;
  src: string;
  link: string;

  constructor(name: string, src?: string, link?: string) {
    this.name = name;
    this.src = src ? src : name;
    this.link = link ? link : this.src;
  }

  get routerLink() {
    return '../component/' + this.link;
  }

  get imageSrc() {
    return `../../../assets/img/components/${this.src}.svg`;
  }
}

@Component({
  selector: 'app-components',
  templateUrl: 'components.html',
  styleUrls: ['components.scss'],
})
export class ComponentsList {
  componentGroups: ComponentGroup[] = [
    new ComponentGroup('Form Controls', [
      new ComponentItem('Chips', 'chip'),
    ]),
    new ComponentGroup('Layout Components', [
      new ComponentItem('Cards', 'card'),
      new ComponentItem('Grid lists', 'grid'),
    ]),
    new ComponentGroup('Pop-up and Notifications', [
      new ComponentItem('Tooltip', 'tooltip'),
      new ComponentItem('Menu', 'menu'),
    ]),
    new ComponentGroup('Miscellaneous', [
      new ComponentItem('Progress', 'progress'),
    ]),
  ]

  gridMode: boolean = true;

  get viewIcon() : string {
    return this.gridMode ? 'lists' : 'apps';
  }

  switchViewMode() {
    this.gridMode = !this.gridMode;
  }
}
