import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SceneViewerModule} from '../scene-viewer/scene-viewer';
import {CheckboxSceneModule} from '../scenes/checkbox/checkbox-scene';


@Component({
  selector: 'app-checkbox',
  template: `<scene-viewer hueRotation="30"><checkbox-scene></checkbox-scene></scene-viewer>`
})
export class CheckboxPage {

}

const routes: Routes = [{path: '', component: CheckboxPage}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SceneViewerModule,
    CheckboxSceneModule,
  ],
  exports: [CheckboxPage],
  declarations: [CheckboxPage],
})
export class CheckboxPageModule { }
