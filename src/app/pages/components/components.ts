import {Component} from '@angular/core';

/** The Component group to put all the components in different categories*/
export class ComponentGroup {
  name: string;
  list: ComponentItem[];

  constructor(name: string, list: ComponentItem[]) {
    this.name = name;
    this.list = list;
  }
}

/** Component Item with different name, link and icon */
export class ComponentItem {
  name: string;
  src: string;

  constructor(name: string, src: string) {
    this.name = name;
    this.src = src;
  }

  get routerLink() {
    return '../component/' + this.src;
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
  ];

  gridMode: boolean = false;

  get viewMode() : string {
    return this.gridMode ? 'Grid view' : 'List view';
  }
}
