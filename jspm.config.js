SystemJS.config({
  nodeConfig: {
    "paths": {
      "github:": "jspm_packages/github/",
      "npm:": "jspm_packages/npm/",
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
      "jquery-csv": "github:evanplaice/jquery-csv@0.8.2",
      "jquery-serializejson": "github:marioizquierdo/jquery.serializeJSON@2.7.2",
      "jquery-ui": "github:components/jqueryui@1.12.0",
      "jquery.cookie": "github:carhartl/jquery-cookie@1.4.1",
      "jquery.waitforChild": "github:huasofoundries/jquery.waitforChild@1.1.0",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.12",
      "css": "github:systemjs/plugin-css@0.1.23"
    }
  },

  meta: {
    "*.js": {
      "babelOptions": {
        "stage1": true
      }
    }
  },
  packages: {
    "jquery_helper": {
      "main": "jquery_helper.js"
    },
    "jquery_shim": {
      "main": "index.js",
      "format": "amd",
      "map": {
        "jquery": "libs/jquery.js"
      }
    },
    "jquery-ui": {
      "main": "jquery-ui.js",
      "format": "amd",
      "map": {
        "jquery": "libs/jquery.js"
      }
    },
    "src_material": {
      "main": "./material_helper.js",
      "defaultExtension": "js",
      "format": "esm"
    }
  },
  map: {
    "jquery": "libs/jquery.js",
    "velocity": "libs/velocity.es6.js",
    "hammerjs": "libs/hammer.es6.js",
    "materialize": "libs/materialize.es6.js"
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
