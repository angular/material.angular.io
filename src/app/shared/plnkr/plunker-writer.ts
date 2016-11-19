import { Http } from '@angular/http';
import { PlunkerData } from './plunker-data';

/**
 * Plunker writer, write example files to Plunker
 *
 * Plunker API
 * URL: http://plnkr.co/edit/?p=preview
 * data: {
 *   // File name, directory and content of files
 *   files[file-name1]: file-content1,
 *   files[directory-name/file-name2]: file-content2,
 *   // Can add multiple tags
 *   tags[0]: tag-0,
 *   // Description of plunker
 *   description: description,
 *   // Private or not
 *   private: true
 * }
 */
export class PlunkerWriter {
  PLUNKER_URL: string = 'http://plnkr.co/edit/?p=preview';

  COPYRIGHT =
    `Copyright 2016 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license`;

  TEMPLATE_PATH = '/app/shared/plnkr/template/';
  TEMPLATE_FILES = ['index.html', 'systemjs.config.js', 'main.ts'];

  TAGS: string[] = ['angular', 'material', 'example'];

  form: HTMLFormElement;
  exampleData: PlunkerData;
  counter = 0;

  constructor(private _http: Http) {}

  /** Construct the plunker content */
  openPlunker(data: PlunkerData) {
    this.counter = 0;
    this.exampleData = data;

    this.form = this._createFormElement();

    for (let i = 0; i < this.TAGS.length; i++) {
      this._createFormInput(`tags[${i}]`, this.TAGS[i]);
    }

    this._createFormInput('private', 'true');
    this._createFormInput('description', this.exampleData.description);

    for (let file of this.TEMPLATE_FILES) {
      this._readFile(file, this.TEMPLATE_PATH);
    }

    for (let file of this.exampleData.exampleFiles) {
      this._readFile(file, this.exampleData.examplePath);
    }
  }

  _createFormElement(): HTMLFormElement {
    var form = document.createElement('form');
    form.action = this.PLUNKER_URL;
    form.method = 'post';
    form.target = '_blank';
    return form;
  }

  _createFormInput(name: string, value: string) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    this.form.appendChild(input);
  }

  _readFile(filename: string, path: string) {
    return this._http.get(path + filename).subscribe(
      response => this._addFileToForm(response.text(), filename, path),
      error => console.log(error));
  }

  _addFileToForm(content: string, filename: string, path: string) {
    this.counter++;
    if (path == this.TEMPLATE_PATH) {
      content = this._processTemplateFile(filename, path, content);
    }
    this._createFormInput(`files[${filename}]`, this._appendCopyright(filename, content));
    this._submitForm();
  }

  _processTemplateFile(filename: string, path: string, content: string): string {
    if (filename == 'index.html') {
      // Replace the component selector in `index,html`.
      // For example, <material-docs-example></material-docs-exmaple> will be replaced as
      // <button-demo></button-demo>
      content = content.replace(new RegExp('material-docs-example', 'g'),
        this.exampleData.selectorName);
    } else if (filename == 'main.ts') {
      // Replace the component name in `main.ts`.
      // For example, `import {MaterialDocsExample} from 'material-docs-example'`
      // will be replaced as `import {ButtonDemo} from './button-demo'`
      content = content.replace(new RegExp('MaterialDocsExample', 'g'),
        this.exampleData.componentName);
      content = content.replace(new RegExp('material-docs-example', 'g'),
        this.exampleData.indexFilename);
    }
    return content;
  }

  _appendCopyright(filename: string, content: string) {
    if (filename.indexOf('.ts') > -1 || filename.indexOf('.scss') > -1) {
      content = `${content}\n\n/**  ${this.COPYRIGHT} */`;
    } else if (filename.indexOf('.html') > -1) {
      content = `${content}\n\n<!-- ${this.COPYRIGHT} -->`;
    }
    return content;
  }

  _submitForm() {
    // When all files loaded
    if (this.counter == this.exampleData.exampleFiles.length + this.TEMPLATE_FILES.length) {
      this.form.submit();
    }
  }
}
