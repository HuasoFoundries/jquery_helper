SystemJS.config({
  nodeConfig: {
    "paths": {
      "github:": "jspm_packages/github/",
      "npm:": "jspm_packages/npm/",
      "jquery_helper/": "dist/"
    }
  },
  devConfig: {
    "map": {
      "hammerjs": "github:hammerjs/hammer.js@2.0.8",
      "jquery-csv": "github:evanplaice/jquery-csv@0.8.2",
      "jquery-serializejson": "github:marioizquierdo/jquery.serializeJSON@2.7.2",
      "jquery-ui": "github:components/jqueryui@1.12.0",
      "jquery.cookie": "github:carhartl/jquery-cookie@1.4.1",
      "jquery.waitforChild": "github:huasofoundries/jquery.waitforChild@1.1.0",
      "materialize-css": "npm:materialize-css@0.97.6",
      "velocity": "npm:velocity-animate@1.2.3",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.12",
      "css": "github:systemjs/plugin-css@0.1.23"
    }
  },
  transpiler: "plugin-babel",
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
    "node_modules/jquery": {
      "main": "src/jquery.js",
      "defaultExtension": "js"
    },
    "src_jquery": {
      "main": "./jquery_helper.js",
      "defaultExtension": "js",
      "format": "amd"
    },
    "src_material": {
      "main": "./material_helper.js",
      "defaultExtension": "js"
    }
  },
  map: {
    "jquery": "node_modules/jquery"
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
