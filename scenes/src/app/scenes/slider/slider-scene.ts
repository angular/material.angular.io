import {Component, NgModule, ViewEncapsulation} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-slider-scene',
  templateUrl: './slider-scene.html',
  styleUrls: ['./slider-scene.scss']
})
export class SliderScene {}

@NgModule({
  imports: [
    MatIconModule,
    MatSliderModule
  ],
  exports: [SliderScene],
  declarations: [SliderScene]
})
export class SliderSceneModule {}

