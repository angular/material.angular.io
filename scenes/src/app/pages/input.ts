import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SceneViewerModule} from '../scene-viewer/scene-viewer';
import {InputSceneModule} from '../scenes/input/input-scene';


@Component({
  selector: 'app-input',
  template: `<app-scene-viewer hueRotation="0"><app-input-scene></app-input-scene></app-scene-viewer>`
})
export class InputPage {

}

const routes: Routes = [{path: '', component: InputPage}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SceneViewerModule,
    InputSceneModule,
  ],
  exports: [InputPage],
  declarations: [InputPage],
})
export class InputPageModule { }
