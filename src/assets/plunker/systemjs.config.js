/** Add Transpiler for Typescript */
System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  packages: {
    '.': {
      defaultExtension: 'ts'
    },
    'vendor': {
      defaultExtension: 'js'
    }
  }
});

System.config({
  map: {
    'main': 'main.js',

    // Angular specific mappings.
    '@angular/core': 'http://unpkg.com/@angular/core/bundles/core.umd.js',
    '@angular/common': 'http://unpkg.com/@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'http://unpkg.com/@angular/compiler/bundles/compiler.umd.js',
    '@angular/http': 'http://unpkg.com/@angular/http/bundles/http.umd.js',
    '@angular/forms': 'http://unpkg.com/@angular/forms/bundles/forms.umd.js',
    '@angular/router': 'http://unpkg.com/@angular/router/bundles/router.umd.js',
    '@angular/platform-browser': 'http://unpkg.com/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'http://unpkg.com/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/material': 'https://unpkg.com/@angular/material/core/theming/prebuilt/indigo-pink.css',

    // Rxjs mapping
    'rxjs': 'https://unpkg.com/rxjs',
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': { main: 'index' },
  }
});
