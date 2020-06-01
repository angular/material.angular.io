import {
  Component,
  ComponentFactoryResolver,
  Input,
  NgModule,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputSceneModule} from '../scenes/input/input-scene';
import {ButtonSceneModule} from '../scenes/button/button-scene';
import {ActivatedRoute} from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-scene-viewer',
  templateUrl: './scene-viewer.html',
  styleUrls: ['./scene-viewer.scss']
})
export class SceneViewer implements OnInit {
  /**
   * Degree to change hue of scene by. All scenes default to a reddish hue.
   * e.g. 90 = greenish, 180 = blueish
   */
  @Input() hueRotation: number;

  /** Component of scene to display */
  @Input() component: any;

  @ViewChild('scene', {read: ViewContainerRef, static: true})
  scene: ViewContainerRef;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.hueRotation = this.route.snapshot.data['hueRotate'];
    this.component = this.route.snapshot.data['scene'];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    this.scene.createComponent(componentFactory);
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

