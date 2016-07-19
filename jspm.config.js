SystemJS.config({
  nodeConfig: {
    "paths": {
      "github:": "jspm_packages/github/",
      "npm:": "jspm_packages/npm/",
      "jquery": "dist/jquery.js",
      "jquery_helper/": "dist/"
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  devConfig: {
    "map": {
      "jquery-ui": "github:components/jqueryui@1.12.0",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.12"
    }
  },
  meta: {
    "*.js": {
      "babelOptions": {
        "stage1": true
      }
    },
    "dist/jquery.js": {
      "build": false
    }
  },
  packages: {
    "jquery_helper": {
      "main": "jquery.js"
    },
    "jquery_ui": {
      "main": "index.js",
      "format": "esm",
      "map": {
        "jquery": "dist/jquery.js"
      }
    },
    "jquery_shim": {
      "main": "index.js",
      "format": "esm"
    },
    "src": {
      "main": "./material_helper.js",
      "defaultExtension": "js",
      "format": "esm",
      "map": {
        "jquery": "dist/jquery.js"
      }
    }
  },
  map: {
    "jquery": "dist/jquery.js",
    "hammerjs": "libs/hammer.es6.js"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "github:*/*.json",
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {},
  packages: {}
});
