import {Component, Input, NgModule, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputSceneModule} from '../scenes/input/input-scene';
import {ButtonSceneModule} from '../scenes/button/button-scene';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-scene-viewer',
  templateUrl: './scene-viewer.html',
  styleUrls: ['./scene-viewer.scss']
})
export class SceneViewer implements OnInit {
  @Input() hueRotation: string;

  ngOnInit() {
    const wrapper = document.getElementById('wrapper');
    if (wrapper) {
      wrapper.style.filter = 'hue-rotate(' + this.hueRotation + 'deg)';
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    InputSceneModule,
    ButtonSceneModule
  ],
  exports: [SceneViewer],
  declarations: [SceneViewer]
})
export class SceneViewerModule {
}

