import {Component, NgModule, ModuleWithProviders, Input} from '@angular/core';


@Component({
  selector: 'material-io-example-viewer',
  template: 'EXAMPLE: {{example}}',
})
export class MaterialIoExampleViewer {
  @Input()
  example: string;
}


@NgModule({
  exports: [MaterialIoExampleViewer],
  declarations: [MaterialIoExampleViewer]
})
export class MaterialIoExampleViewerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialIoExampleViewerModule,
      providers: []
    };
  }
}
