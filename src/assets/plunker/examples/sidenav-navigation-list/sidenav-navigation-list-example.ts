import {Component, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'sidenav-navigation-list-example',
  templateUrl: './sidenav-navigation-list-example.html',
  styleUrls: ['./sidenav-navigation-list-example.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavNavigationListExample {
  links = [
    {
      'name':'Google',
      'url' : '/components/component/sidenav'
    },
    {
      'name':'Wikipedia',
      'url' : '/components/component/sidenav'
    },
    {
      'name':'Github',
      'url' : '/components/component/sidenav'
    },
    {
      'name':'Facebook',
      'url' : '/components/component/sidenav'
    }
  ]
}
