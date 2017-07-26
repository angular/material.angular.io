import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HeaderLink} from './header-link';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HeaderLink],
  exports: [HeaderLink],
  entryComponents: [HeaderLink],
})
export class HeaderLinkModule { }
