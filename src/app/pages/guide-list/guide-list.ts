import {Component, NgModule, OnInit} from '@angular/core';
import {GuideItems} from '../../shared/guide-items/guide-items';
import {MdListModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FooterModule} from '../../shared/footer/footer';
import {CommonModule} from '@angular/common';
import {ComponentPageTitle} from '../page-title/page-title';

@Component({
  selector: 'app-guides',
  templateUrl: './guide-list.html',
  styleUrls: ['./guide-list.scss']
})
export class GuideList implements OnInit {
  constructor(public guideItems: GuideItems, public _componentPageTitle: ComponentPageTitle) {}

  ngOnInit(): void {
    this._componentPageTitle.title = 'Guides';
  }
}


@NgModule({
  imports: [MdListModule, RouterModule, FooterModule, CommonModule],
  exports: [GuideList],
  declarations: [GuideList],
  providers: [GuideItems, ComponentPageTitle],
})
export class GuideListModule { }
