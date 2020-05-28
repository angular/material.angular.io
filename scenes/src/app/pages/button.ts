import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SceneViewerModule} from '../scene-viewer/scene-viewer';


@Component({
  selector: 'app-button',
  template: `<scene-viewer hueRotation="45"></scene-viewer>`
})
export class ButtonPage {

}

const routes: Routes = [{path: '', component: ButtonPage}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SceneViewerModule,
  ],
  exports: [ButtonPage],
  declarations: [ButtonPage],
})
export class ButtonPageModule { }
