import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SceneViewerModule} from '../scene-viewer/scene-viewer';


@Component({
  selector: 'app-input',
  template: `<scene-viewer hueRotation="30"></scene-viewer>`
})
export class InputPage {

}

const routes: Routes = [{path: '', component: InputPage}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SceneViewerModule,
  ],
  exports: [InputPage],
  declarations: [InputPage],
})
export class InputPageModule { }
