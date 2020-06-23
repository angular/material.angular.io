import {
  Component,
  ComponentFactoryResolver,
  Input,
  NgModule, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-scene-viewer',
  templateUrl: './scene-viewer.html',
  styleUrls: ['./scene-viewer.scss'],
})
export class SceneViewer implements OnInit, OnDestroy {

  /**
   * Degree to change hue of scene by. All scenes default to a reddish hue.
   * e.g. 90 = greenish, 180 = blueish
   */
  @Input()
  get hueRotation(): number {
    return this._hueRotation;
  }

  set hueRotation(deg: number) {
    this._hueRotation = deg;
    // Currently this is the only way to ensure overlay elements are also filtered.
    // Generally setting the filter on the document is not a good idea but this is a one off
    // component used only for generating images.
    // Change this when overlay supports setting a host element and set the filter
    // on there instead.
    document.body.style.filter = `hue-rotate(${this.hueRotation}deg)`;
  }

  private _hueRotation: number;

  /** Scale of scene (1 is unscaled) */
  @Input() scale = 1;

  /** Component of scene to display */
  @Input() component: any;

  @ViewChild('scene', {read: ViewContainerRef, static: true})
  scene: ViewContainerRef;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute) {
    this.hueRotation = this.route.snapshot.data['hueRotate'];
    this.component = this.route.snapshot.data['scene'];
    this.scale = this.route.snapshot.data['scale'];
  }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    const sceneComponent = this.scene.createComponent(componentFactory).location.nativeElement;
    sceneComponent.style.transform = `scale(${this.scale})`;
    sceneComponent.style.transformOrigin = 'center';
  }

  ngOnDestroy() {
    document.body.style.filter = '';
  }
}

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [SceneViewer],
  declarations: [SceneViewer]
})
export class SceneViewerModule {
}
