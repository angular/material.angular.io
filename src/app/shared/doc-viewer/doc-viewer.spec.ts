import {Component} from '@angular/core';
import {TestBed, inject, async} from '@angular/core/testing';
import {AppModule} from '../../app-module';
import {MockBackend} from '@angular/http/testing';
import {Response, ResponseOptions, XHRBackend} from '@angular/http';


describe('DocViewer', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [
        DocViewerTestComponent
      ],
      providers: [
        MockBackend,
        {provide: XHRBackend, useExisting: MockBackend},
      ]
    });

    TestBed.compileComponents();
  }));

  let deps = [MockBackend];
  beforeEach(inject(deps, (mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: any) => {
      const url = connection.request.url;
      connection.mockRespond(getFakeDocResponse(url));
    });
  }));

  it('should load doc into innerHTML', () => {
    let fixture = TestBed.createComponent(DocViewerTestComponent);
  });
});

@Component({
  selector: 'test',
  template: '',
  //template: `<doc-viewer [documenturl]="documentUrl"></doc-viewer>`,
})
class DocViewerTestComponent {
  documentUrl = 'http://material.angular.io/my-doc.html';
}

const FAKE_DOCS = {
  'http://material.angular.io/my-doc.html': '<div>my docs page</div>'
};

function getFakeDocResponse(url: string) {
  if (url in FAKE_DOCS) {
    return new Response(new ResponseOptions({
      status: 200,
      body: FAKE_DOCS[url],
    }));
  } else {
    return new Response(new ResponseOptions({status: 404}));
  }
}
