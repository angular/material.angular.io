import {Component, NgModule, ModuleWithProviders} from '@angular/core';


@Component({
  selector: 'material-io-doc-viewer',
  template: 'Hi!!'
})
export class MaterialIoDocViewer {
}


@NgModule({
  exports: [MaterialIoDocViewer],
  declarations: [MaterialIoDocViewer]
})
export class MaterialIoDocViewerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialIoDocViewerModule,
      providers: []
    };
  }
}
