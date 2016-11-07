SystemJS.config({
  nodeConfig: {
    "paths": {
      "github:": "jspm_packages/github/",
      "npm:": "jspm_packages/npm/",
      "jquery": "dist/jquery.esm.js",
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
    },
    "dist/jquery.esm.js": {
      "build": false
    }
  },
  packages: {
    "jquery_helper": {
      "main": "jquery.js"
    },
    "jquery_ui": {
      "main": "index.js",
      "map": {
        "jquery": "dist/jquery.js"
      }
    },
    "jquery_ui_es6": {
      "main": "index.js",
      "format": "esm",
      "map": {
        "jquery": "dist/jquery.esm.js"
      }
    },
    "jquery_shim": {
      "main": "index.js",
      "format": "esm"
    }
  },
  map: {
    "jquery": "dist/jquery.js",
    "hammerjs": "src/libs/hammer.es6.js",
    "jquery_shim": "src/jquery_shim",
    "jquery_ui": "src/jquery_ui",
    "jquery_ui_es6": "src/jquery_ui"
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
