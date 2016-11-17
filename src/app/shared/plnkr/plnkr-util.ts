import { Http } from '@angular/http';

export class PlunkerUtil {
  PLUNKER_URL: string = 'http://plnkr.co/edit/?p=preview';

  COPYRIGHT =
    `Copyright 2016 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license`;

  TEMPLATE_PATH = '/app/shared/plnkr/template/';
  TEMPLATE_FILES = ['index.html', 'systemjs.config.js', 'main.ts'];

  TAGS: string[] = ['angular', 'material', 'example'];

  description: string = 'Example for Angular Material';
  examplePath: string = '/app/shared/plnkr/example/';
  exampleFiles: string[] = ['button-demo.html', 'button-demo.scss', 'button-demo.ts'];
  selectorName: string = 'button-demo';
  indexFilename: string = 'button-demo';
  componentName: string = 'ButtonDemo';

  form: HTMLFormElement;

  constructor(private _http: Http) {}

  /** Construct the plunker content */
  initPlunker(examplePath: string,
              exampleFiles: string[],
              selectorName: string,
              indexFilename: string,
              componentName: string,
              description: string) {
    this.examplePath = examplePath;
    this.exampleFiles = exampleFiles;
    this.selectorName = selectorName;
    this.indexFilename = indexFilename;
    this.componentName = componentName;
    this.description = description;

    this.form = this._setupForm();

    for (let file of this.TEMPLATE_FILES) {
      this._readFile(file, this.TEMPLATE_PATH);
    }

    for (let file of this.exampleFiles) {
      this._readFile(file, this.examplePath);
    }

    for (let i = 0; i < this.TAGS.length; i++) {
      this._generateInput(`tags[${i}]`, this.TAGS[i]);
    }

    this._generateInput('private', 'true');
    this._generateInput('description', this.description);
  }

  /** Open plunker link */
  openPlunker(): void {
    this.form.submit();
  }

  _setupForm(): HTMLFormElement {
    var form = document.createElement('form');
    form.action = this.PLUNKER_URL;
    form.method = 'post';
    form.target = '_blank';
    return form;
  }

  _generateInput(name: string, value: string, isFile = false) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = (isFile ? `files[${name}]` : name);
    input.value = value;
    this.form.appendChild(input);
  }

  _readFile(filename: string, path: string) {
    this._http.get(path + filename).subscribe(
      (response) => {
        let content = response.text();
        content = this._processContent(filename, path, content);
        this._generateInput(filename, content, true);
      }, (error) => {
        console.log(error);
      }
    );
  }

  _processContent(filename: string, path: string, content: string): string {
    if (path == this.TEMPLATE_PATH) {
      if (filename == 'index.html') {
        content = content.replace(new RegExp('material-docs-example', 'g'), this.selectorName);
      } else if (filename == 'main.ts') {
        content = content.replace(new RegExp('MaterialDocsExample', 'g'), this.componentName);
        content = content.replace(new RegExp('material-docs-example', 'g'), this.indexFilename);
      }
    }

    if (filename.indexOf('.ts') > -1 || filename.indexOf('.scss') > -1) {
      content = content + '/** ' + this.COPYRIGHT + ' */';
    } else if (filename.indexOf('.html') > -1) {
      content = content + '<!-- ' + this.COPYRIGHT + ' -->';
    }
    return content;
  }
}
