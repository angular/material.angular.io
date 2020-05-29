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
  @Input() hueRotation: string;
  @Input() component: any;
  @ViewChild('scene', {read: ViewContainerRef, static: true})
  scene: ViewContainerRef;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.hueRotation = this.route.snapshot.data['hueRotate'];
    this.component = this.route.snapshot.data['scene'];
    const wrapper = document.getElementById('wrapper');
    if (wrapper) {
      wrapper.style.filter = 'hue-rotate(' + this.hueRotation + 'deg)';
    }
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

