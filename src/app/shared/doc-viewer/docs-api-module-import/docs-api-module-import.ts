import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopierService } from '../../copier/copier.service';

const EXPORT_NAME_PLACEHOLDER = '{{exportName}}';
const MODULE_IMPORT_PATH_PLACEHOLDER = '{{moduleImportPath}}';
const MODULE_IMPORT_TEMPLATE = `import ${EXPORT_NAME_PLACEHOLDER} from '${MODULE_IMPORT_PATH_PLACEHOLDER}';`;

@Component({
  selector: '[docs-api-module-import]',
  template: `
    <p class="docs-api-module-import">
      <code>
        {{ moduleImport }}
      </code>
    </p>
    <button
      class="docs-api-module-import-copy"
      aria-label="Copy module import"
      mat-icon-button
      (click)="copyModuleImport()"
      matTooltip="Copy module import">
      <span class="material-icons">file_copy</span>
    </button>
  `,
})
export class DocsApiModuleImport implements OnInit {
  @Input() exportName: string;
  @Input() moduleImportPath: string;

  moduleImport: string;

  constructor(private snackbar: MatSnackBar, private copier: CopierService) {}

  ngOnInit(): void {
    this.moduleImport = MODULE_IMPORT_TEMPLATE.replace(
      EXPORT_NAME_PLACEHOLDER,
      this.exportName
    ).replace(MODULE_IMPORT_PATH_PLACEHOLDER, this.moduleImportPath);
  }

  copyModuleImport(): void {
    if (this.copier.copyText(this.moduleImport)) {
      this.snackbar.open('Module import copied', '', { duration: 2500 });
    } else {
      this.snackbar.open('Module import copy failed. Please try again!', '', {
        duration: 2500,
      });
    }
  }
}
