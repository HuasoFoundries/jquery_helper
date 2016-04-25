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
    "jquery": "npm:jquery@2.2.3",
    "jquery-csv": "github:evanplaice/jquery-csv@0.8.1",
    "jquery-serializejson": "github:marioizquierdo/jquery.serializeJSON@2.7.2",
    "jquery-ui": "github:components/jqueryui@1.11.4",
    "jquery.cookie": "github:carhartl/jquery-cookie@1.4.1",
    "jquery.waitforChild": "github:huasofoundries/jquery.waitforChild@1.0.1"
  },
  packages: {
    "github:components/jqueryui@1.11.4": {
      "map": {
        "jquery": "npm:jquery@2.2.3"
      }
    }
  }
});
