System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "npm:*": "jspm_packages/npm/*",
    "github:*": "jspm_packages/github/*"
  },
  pluginFirst: true,

  map: {
    "css": "github:systemjs/plugin-css@0.1.20",
    "jquery": "npm:jquery@2.2.0",
    "jquery-serializejson": "npm:jquery-serializejson@2.6.2",
    "jquery-ui": "github:components/jqueryui@1.11.4",
    "jquery.cookie": "github:carhartl/jquery-cookie@1.4.1",
    "jquery.waitforChild": "npm:jquery.waitforChild@0.1.1",
    "lodash": "npm:lodash@4.1.0",
    "github:components/jqueryui@1.11.4": {
      "jquery": "npm:jquery@2.2.0"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:jquery-serializejson@2.6.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash@4.1.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
