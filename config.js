System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "npm:*": "jspm_packages/npm/*",
    "github:*": "jspm_packages/github/*"
  },

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
      "format": "cjs"
    }
  },

  map: {
    "jquery": "github:jquery/jquery@2.2.2",
    "jquery-csv": "github:evanplaice/jquery-csv@0.8.1",
    "jquery-impromptu": "github:trentrichardson/jQuery-Impromptu@6.2.2",
    "jquery-serializejson": "github:marioizquierdo/jquery.serializeJSON@2.7.2",
    "jquery-ui": "github:components/jqueryui@1.11.4",
    "jquery.cookie": "github:carhartl/jquery-cookie@1.4.1",
    "jquery.waitforChild": "github:huasofoundries/jquery.waitforChild@1.0.1",
    "jquery_helper": "src/jquery_helper"
  }
});
