import {CommonModule} from '@angular/common';
import {HttpTestingController} from '@angular/common/http/testing';
import {NgModule} from '@angular/core';
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';

import {EXAMPLE_COMPONENTS} from '@angular/components-examples';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DocsAppTestingModule} from '../../testing/testing-module';
import {CopierService} from '../copier/copier.service';
import {DocViewerModule} from '../doc-viewer/doc-viewer-module';
import {ExampleViewer} from './example-viewer';
import {AutocompleteExamplesModule} from '@angular/components-examples/material/autocomplete';

const exampleKey = 'autocomplete-overview';
const exampleBasePath = `/docs-content/examples-highlighted/material/autocomplete/${exampleKey}`;


describe('ExampleViewer', () => {
  let fixture: ComponentFixture<ExampleViewer>;
  let component: ExampleViewer;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DocViewerModule,
        DocsAppTestingModule,
        ReactiveFormsModule,
        TestExampleModule,
      ],
    }).compileComponents();
  }));

  beforeEach(inject([HttpTestingController], (h: HttpTestingController) => {
    http = h;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleViewer);
    component = fixture.componentInstance;
  });

  it('should toggle between the 3 views', async(() => {
    fixture.detectChanges();
    // need to specify a file because toggling from snippet to full changes the tabs to match
    component.file = 'file.html';
    component.view = 'snippet';
    expect(component.view).toBe('snippet');
    component.toggleCompactView();
    expect(component.view).toBe('full');
    component.toggleSourceView();
    expect(component.view).toBe('demo');
  }));

  it('should change to correct tab', async(() => {
    fixture.detectChanges();
    component.file = 'file.html';
    component.selectCorrectTab();
    expect(component.selectedTab).toBe(0);

    component.file = 'file.ts';
    component.selectCorrectTab();
    expect(component.selectedTab).toBe(1);

    component.file = 'file.css';
    component.selectCorrectTab();
    expect(component.selectedTab).toBe(2);
  }));

  it('should generate correct url with region', async(() => {
    fixture.detectChanges();
    component.example = exampleKey;
    component.region = 'region';
    const url = component.generateUrl('a.b.html');
    expect(url).toBe(exampleBasePath + '/a.b_region-html.html');
  }));

  it('should generate correct url without region', async(() => {
    fixture.detectChanges();
    component.example = exampleKey;
    component.region = undefined;
    const url = component.generateUrl('a.b.ts');
    expect(url).toBe(exampleBasePath + '/a.b-ts.html');
  }));

  it('should print an error message about incorrect file type', async(() => {
    spyOn(console, 'error');
    fixture.detectChanges();
    component.file = 'file.bad';
    component.selectCorrectTab();


    expect(console.error).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Unexpected file type: bad. Expected html, ts, or css.');
  }));

  it('should set and return example properly', async(() => {
    component.example = exampleKey;
    fixture.detectChanges();
    const data = component.exampleData;
    // TODO(jelbourn): remove `as any` once LiveExample is updated to have optional members.
    expect(data).toEqual(EXAMPLE_COMPONENTS[exampleKey] as any);
  }));

  it('should print an error message about missing example', async(() => {
    spyOn(console, 'error');
    component.example = 'foobar';
    fixture.detectChanges();
    expect(console.error).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Could not find example: foobar');
  }));

  it('should return docs-content path for example based on extension', async(() => {
    // set example
    component.example = exampleKey;
    fixture.detectChanges();

    // get example file path for each extension
    const extensions = ['ts', 'css', 'html'];

    extensions.forEach(extension => {
      const expected = `${exampleBasePath}/${exampleKey}-example-${extension}.html`;
      const actual = component.exampleTabs[extension.toUpperCase()];

      expect(actual).toEqual(expected);
    });
  }));

  describe('view-source tab group', () => {

    it('should only render HTML, TS and CSS files if no additional files are specified', () => {
      component.example = exampleKey;
      fixture.detectChanges();

      expect(component._getExampleTabNames()).toEqual(['HTML', 'TS', 'CSS']);
    });

    it('should be able to render additional files', () => {
      EXAMPLE_COMPONENTS['additional-files'] = {
        ...EXAMPLE_COMPONENTS[exampleKey],
        additionalFiles: ['some-additional-file.html'],
      };

      component.example = 'additional-files';
      fixture.detectChanges();

      expect(component._getExampleTabNames())
        .toEqual(['HTML', 'TS', 'CSS', 'some-additional-file.html']);
    });
  });

  describe('copy button', () => {
    let button: HTMLElement;

    beforeEach(() => {
      // Open source view
      component.example = exampleKey;
      component.view = 'full';
      fixture.detectChanges();

      for (const url of Object.keys(FAKE_DOCS)) {
        http.expectOne(url).flush(FAKE_DOCS[url]);
      }

      // Select button element
      const btnDe = fixture.debugElement.query(By.css('.docs-example-source-copy'));
      button = btnDe ? btnDe.nativeElement : null;
    });

    it('should call copier service when clicked', (() => {
      const copierService: CopierService = TestBed.inject(CopierService);
      const spy = spyOn(copierService, 'copyText');
      expect(spy.calls.count()).toBe(0, 'before click');
      button.click();
      expect(spy.calls.count()).toBe(1, 'after click');
      expect(spy.calls.argsFor(0)[0]).toBe('my docs page', 'click content');
    }));

    it('should display a message when copy succeeds', (() => {
      const snackBar: MatSnackBar = TestBed.inject(MatSnackBar);
      const copierService: CopierService = TestBed.inject(CopierService);
      spyOn(snackBar, 'open');
      spyOn(copierService, 'copyText').and.returnValue(true);
      button.click();
      expect(snackBar.open).toHaveBeenCalledWith('Code copied', '', {duration: 2500});
    }));

    it('should display an error when copy fails', (() => {
      const snackBar: MatSnackBar = TestBed.inject(MatSnackBar);
      const copierService: CopierService = TestBed.inject(CopierService);
      spyOn(snackBar, 'open');
      spyOn(copierService, 'copyText').and.returnValue(false);
      button.click();
      expect(snackBar.open)
          .toHaveBeenCalledWith('Copy failed. Please try again!', '', {duration: 2500});
    }));
  });

});


// Create a version of ExampleModule for testing with only one component so that we don't have
// to compile all of the examples for these tests.
@NgModule({
  imports: [
    MatInputModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AutocompleteExamplesModule,
  ],
})
class TestExampleModule { }


const FAKE_DOCS: {[key: string]: string} = {
  [`${exampleBasePath}/autocomplete-overview-example-html.html`]: '<div>my docs page</div>',
  [`${exampleBasePath}/autocomplete-overview-example-ts.html`]: '<span>const a = 1;</span>',
  [`${exampleBasePath}/autocomplete-overview-example-css.html`]:
      '<pre>.class { color: black; }</pre>',
};
