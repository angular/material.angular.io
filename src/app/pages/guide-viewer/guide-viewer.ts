import {Component, NgModule} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {GuideItem, GuideItems} from '../../shared/guide-items/guide-items';
import {FooterModule} from '../../shared/footer/footer';
import {DocViewerModule} from '../../shared/doc-viewer/doc-viewer-module';
import {HeaderLinkModule} from '../../shared/header-link/header-link.module';
import {TableOfContentsModule} from '../../shared/table-of-contents/table-of-contents.module';

@Component({
  selector: 'guide-viewer',
  templateUrl: './guide-viewer.html',
  styleUrls: ['./guide-viewer.scss'],
})
export class GuideViewer {
  guide: GuideItem;

  constructor(private _route: ActivatedRoute, public guideItems: GuideItems) {
    _route.params.subscribe(p => {
      this.guide = guideItems.getItemById(p['id']);
    });
  }
}

@NgModule({
  imports: [DocViewerModule, FooterModule, RouterModule, HeaderLinkModule, TableOfContentsModule],
  exports: [GuideViewer],
  declarations: [GuideViewer],
  providers: [GuideItems],
})
export class GuideViewerModule {}
