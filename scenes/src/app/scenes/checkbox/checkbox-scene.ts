import {Component, NgModule, ViewEncapsulation} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-checkbox-scene',
  templateUrl: './checkbox-scene.html',
  styleUrls: ['./checkbox-scene.scss']
})
export class CheckboxScene {
}

@NgModule({
  imports: [
    MatCheckboxModule,
    MatIconModule,
  ],
  exports: [CheckboxScene],
  declarations: [CheckboxScene]
})
export class CheckboxSceneModule {
}

