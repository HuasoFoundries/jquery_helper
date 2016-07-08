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
      "jquery-ui": "github:components/jqueryui@1.11.4",
      "jquery.cookie": "github:carhartl/jquery-cookie@1.4.1",
      "jquery.waitforChild": "github:huasofoundries/jquery.waitforChild@1.1.0",
      "materialize-css": "npm:materialize-css@0.97.6",
      "velocity": "npm:velocity-animate@1.2.3",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.12",
      "jquery_full": "npm:jquery@3.1.0"
    },
    "packages": {
      "npm:materialize-css@0.97.6": {
        "map": {
          "css": "github:systemjs/plugin-css@0.1.23",
          "jquery": "npm:jquery@3.1.0"
        }
      },
      "npm:velocity-animate@1.2.3": {
        "map": {
          "jquery": "npm:jquery@3.1.0"
        }
      },
      "github:components/jqueryui@1.11.4": {
        "map": {
          "jquery": "npm:jquery@3.1.0"
        }
      }
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
    "npm:materialize-css@0.97.6": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.23",
        "jquery": "src/jquery.slim.js"
      }
    },
    "npm:velocity-animate@1.2.3": {
      "map": {
        "jquery": "src/jquery.slim.js"
      }
    },
    "github:components/jqueryui@1.11.4": {
      "map": {
        "jquery": "src/jquery.slim.js"
      }
    },
    "src": {
      "main": "./jquery_helper.js",
      "defaultExtension": "js",
      "format": "amd",
      "map": {
        "jquery": "./jquery.slim.js"
      }
    }
  },
  map: {
    "jquery": "src/jquery.slim.js"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "github:*/*.json",
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "jquery": "src/jquery.slim.js"
  },
  packages: {
    "npm:materialize-css@0.97.6": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.23",
        "jquery": "src/jquery.slim.js"
      }
    },
    "npm:velocity-animate@1.2.3": {
      "map": {
        "jquery": "src/jquery.slim.js"
      }
    },
    "github:components/jqueryui@1.11.4": {
      "map": {
        "jquery": "src/jquery.slim.js"
      }
    }
  }
});
