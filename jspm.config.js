SystemJS.config({
  transpiler: false,
  meta: {
    "jquery_helper": {
      "deps": [
        "jquery"
      ],
      "exports": "jquery",
      "format": "amd"
    },
    "jquery-csv": {
      "deps": [
        "jquery"
      ],
      "format": "cjs"
    },
    "jquery-serializejson": {
      "deps": [
        "jquery"
      ],
      "format": "amd"
    }
  },
  map: {
    "jquery_helper": "src/jquery_helper"
  },
  packages: {
    "jquery_helper": {
      "main": "jquery_helper.js"
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
    "jquery-impromptu": "github:trentrichardson/jQuery-Impromptu@6.2.2",
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
