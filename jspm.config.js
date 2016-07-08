SystemJS.config({
  transpiler: false,
  packages: {
    "src": {
      "main": "./jquery_helper.js",
      "format": "amd"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "github:*/*.json",
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "hammerjs": "github:hammerjs/hammer.js@2.0.8",
    "jquery": "npm:jquery@3.1.0",
    "jquery-csv": "github:evanplaice/jquery-csv@0.8.2",
    "jquery-serializejson": "github:marioizquierdo/jquery.serializeJSON@2.7.2",
    "jquery-ui": "github:components/jqueryui@1.11.4",
    "jquery.cookie": "github:carhartl/jquery-cookie@1.4.1",
    "jquery.waitforChild": "github:huasofoundries/jquery.waitforChild@1.1.0",
    "materialize-css": "npm:materialize-css@0.97.6",
    "velocity": "npm:velocity-animate@1.2.3"
  },
  packages: {
    "npm:materialize-css@0.97.6": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.23",
        "jquery": "github:components/jquery@3.1.0"
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
});
