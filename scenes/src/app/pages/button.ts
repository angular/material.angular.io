import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SceneViewerModule} from '../scene-viewer/scene-viewer';
import {ButtonSceneModule} from '../scenes/button/button-scene';


@Component({
  selector: 'app-button',
  template: `<scene-viewer hueRotation="15"><button-scene></button-scene></scene-viewer>`
})
export class ButtonPage {

}

const routes: Routes = [{path: '', component: ButtonPage}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SceneViewerModule,
    ButtonSceneModule,
  ],
  exports: [ButtonPage],
  declarations: [ButtonPage],
})
export class ButtonPageModule { }
