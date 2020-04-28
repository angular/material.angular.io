import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { By } from "@angular/platform-browser";
import { DocsAppTestingModule } from "../../../testing/testing-module";
import { CopierService } from "../../copier/copier.service";
import { DocViewerModule } from "../../doc-viewer/doc-viewer-module";
import { DocsApiModuleImport } from "./docs-api-module-import";

const exportName = "{MatButton}";
const moduleImportPath = `@angular/material/button`;

describe("DocsApiModuleImport", () => {
  let fixture: ComponentFixture<DocsApiModuleImport>;
  let component: DocsApiModuleImport;
  let button: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DocViewerModule, DocsAppTestingModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsApiModuleImport);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    // Open source view
    component.exportName = exportName;
    component.moduleImportPath = moduleImportPath;
    fixture.detectChanges();

    // Select button element
    const btnDe = fixture.debugElement.query(
      By.css(".docs-api-module-import-copy")
    );
    button = btnDe ? btnDe.nativeElement : null;
  });

  it('should format the import in TS format', () => {
    const importTextElement = fixture.debugElement.query(
      By.css('.docs-api-module-import code')
    );

    const expectedImportFormat = `import {${exportName}} from '${moduleImportPath}';`;

    expect(importTextElement).toBeTruthy();
    expect(importTextElement.nativeElement.innerText).toBe(expectedImportFormat);
  });

  it("should call copier service when clicked", () => {
    const copierService: CopierService = TestBed.inject(CopierService);
    const spy = spyOn(copierService, "copyText");
    expect(spy.calls.count()).toBe(0, "before click");
    button.click();
    expect(spy.calls.count()).toBe(1, "after click");
    expect(spy.calls.argsFor(0)[0]).toBe("my docs page", "click content");
  });

  it("should display a message when copy succeeds", () => {
    const snackBar: MatSnackBar = TestBed.inject(MatSnackBar);
    const copierService: CopierService = TestBed.inject(CopierService);
    spyOn(snackBar, "open");
    spyOn(copierService, "copyText").and.returnValue(true);
    button.click();
    expect(snackBar.open).toHaveBeenCalledWith("Code copied", "", {
      duration: 2500,
    });
  });

  it("should display an error when copy fails", () => {
    const snackBar: MatSnackBar = TestBed.inject(MatSnackBar);
    const copierService: CopierService = TestBed.inject(CopierService);
    spyOn(snackBar, "open");
    spyOn(copierService, "copyText").and.returnValue(false);
    button.click();
    expect(
      snackBar.open
    ).toHaveBeenCalledWith("Copy failed. Please try again!", "", {
      duration: 2500,
    });
  });
});
