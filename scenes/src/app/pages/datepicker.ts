import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SceneViewerModule} from '../scene-viewer/scene-viewer';
import {DatepickerSceneModule} from '../scenes/datepicker/datepicker-scene';


@Component({
  selector: 'app-datepicker',
  template: `
    <app-scene-viewer hueRotation="45">
      <app-datepicker-scene></app-datepicker-scene>
    </app-scene-viewer>`
})
export class DatepickerPage {

}

const routes: Routes = [{path: '', component: DatepickerPage}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SceneViewerModule,
    DatepickerSceneModule
  ],
  exports: [DatepickerPage],
  declarations: [DatepickerPage],
})
export class DatepickerPageModule {
}
