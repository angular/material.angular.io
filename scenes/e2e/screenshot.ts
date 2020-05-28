import * as fs from 'fs';
import * as path from 'path';
import {browser} from 'protractor';

const OUTPUT_DIR = path.join(__dirname, 'screenshots');


export class Screenshot {
  id: string;

  /** The filename used to store the screenshot. */
  get filename(): string {
    return this.id
        .toLowerCase()
        .replace(/\s/g, '_')
        .replace(/[^/a-z0-9_]+/g, '')
      + '.scene.png';
  }

  /** The full path to the screenshot */
  get fullPath(): string {
    return path.resolve(OUTPUT_DIR, this.filename);
  }

  constructor(id: string) {
    this.id = id;
    browser.takeScreenshot().then(png => this.storeScreenshot(png));
  }

  /** Replaces the existing screenshot with the newly generated one. */
  storeScreenshot(png: any) {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, '744');
    }

    if (fs.existsSync(OUTPUT_DIR)) {
      fs.writeFileSync(this.fullPath, png, {encoding: 'base64' });
    }
  }
}

export function screenshot(id: string) {
  return new Screenshot(id);
}
