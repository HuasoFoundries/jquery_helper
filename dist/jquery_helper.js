!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {

!function(){var t=$__System;if("undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var s=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");t.set("@@cjs-helpers",t.newModule({getPathVars:function(t){var n,o=t.lastIndexOf("!");n=-1!=o?t.substr(0,o):t;var e=n.split("/");return e.pop(),e=e.join("/"),"file:///"==n.substr(0,8)?(n=n.substr(7),e=e.substr(7),isWindows&&(n=n.substr(1),e=e.substr(1))):s&&n.substr(0,s.length)===s&&(n=n.substr(s.length),e=e.substr(s.length)),{filename:n,dirname:e}}}))}();
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(s),i=(r[1].split(",")[n]||"require").replace(p,""),t=c[i]||(c[i]=new RegExp(u+i+a,"g"));t.lastIndex=0;for(var o,f=[];o=t.exec(e);)f.push(o[2]||o[3]);return f}function r(e,n,i,t){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var f=o.get(e);return f.__useDefault?f["default"]:f}throw new TypeError("Invalid require")}for(var l=[],u=0;u<e.length;u++)l.push(o["import"](e[u],t));Promise.all(l).then(function(e){n&&n.apply(null,e)},i)}function i(i,t,l){"string"!=typeof i&&(l=t,t=i,i=null),t instanceof Array||(l=t,t=["require","exports","module"].splice(0,l.length)),"function"!=typeof l&&(l=function(e){return function(){return e}}(l)),void 0===t[t.length-1]&&t.pop();var u,a,s;-1!=(u=f.call(t,"require"))&&(t.splice(u,1),i||(t=t.concat(n(l.toString(),u)))),-1!=(a=f.call(t,"exports"))&&t.splice(a,1),-1!=(s=f.call(t,"module"))&&t.splice(s,1);var p={name:i,deps:t,execute:function(n,i,f){for(var p=[],c=0;c<t.length;c++)p.push(n(t[c]));f.uri=f.id,f.config=function(){},-1!=s&&p.splice(s,0,f),-1!=a&&p.splice(a,0,i),-1!=u&&p.splice(u,0,function(e,i,t){return"string"==typeof e&&"function"!=typeof i?n(e):r.call(o,e,i,t,f.id)});var d=l.apply(-1==a?e:i,p);return"undefined"==typeof d&&f&&(d=f.exports),"undefined"!=typeof d?d:void 0}};if(i)d.anonDefine||d.isBundle?(d.anonDefine&&d.anonDefine.name&&o.registerDynamic(d.anonDefine.name,d.anonDefine.deps,!1,d.anonDefine.execute),d.anonDefine=null):d.anonDefine=p,d.isBundle=!0,o.registerDynamic(i,p.deps,!1,p.execute);else{if(d.anonDefine)throw new TypeError("Multiple defines for anonymous module");d.anonDefine=p}}function t(n){d.anonDefine=null,d.isBundle=!1;var r=e.module,t=e.exports,o=e.define;return e.module=void 0,e.exports=void 0,e.define=i,function(){e.define=o,e.module=r,e.exports=t}}var o=$__System,f=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,u="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",a="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",s=/\(([^\)]*)\)/,p=/^\s+|\s+$/g,c={};i.amd={};var d={isBundle:!1,anonDefine:null};o.set("@@amd-helpers",o.newModule({createDefine:t,require:r,define:i,lastModule:d})),o.amdDefine=i,o.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
"format amd";
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define("2", ["3"], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function($) {
  var pluses = /\+/g;
  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }
  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }
  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }
  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    try {
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch (e) {}
  }
  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }
  var config = $.cookie = function(key, value, options) {
    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);
      if (typeof options.expires === 'number') {
        var days = options.expires,
            t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }
      return (document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
    }
    var result = key ? undefined : {};
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    for (var i = 0,
        l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');
      if (key && key === name) {
        result = read(cookie, value);
        break;
      }
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }
    return result;
  };
  config.defaults = {};
  $.removeCookie = function(key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }
    $.cookie(key, '', $.extend({}, options, {expires: -1}));
    return !$.cookie(key);
  };
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
define("4", ["2"], function(main) {
  return main;
});

_removeDefine();
})();
$__System.registerDynamic("5", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function($) {
    'use strict';
    $.fn.waitforChild = function(onFound, querySelector, once) {
      if (typeof arguments[0] === 'object') {
        once = arguments[0].once || false;
        querySelector = arguments[0].querySelector || null;
        onFound = arguments[0].onFound;
      }
      if (!onFound) {
        onFound = function() {};
      }
      var $this = this;
      if (!querySelector && $this.children().length) {
        if (once) {
          onFound($this.children().first());
        } else {
          $this.children().each(function(key, element) {
            onFound($(element));
          });
        }
      } else if ($this.find(querySelector).length !== 0) {
        if (once) {
          onFound($this.find(querySelector).first());
        } else {
          $this.find(querySelector).each(function(key, element) {
            onFound($(element));
          });
        }
      } else {
        if ($this.length === 0) {
          console.warn("Can't attach an observer to a null node", $this);
        } else {
          var observer = new MutationObserver(function(mutations) {
            var _this = this;
            mutations.forEach(function(mutation) {
              if (mutation.addedNodes) {
                if (!querySelector) {
                  onFound($(mutation.addedNodes[0]));
                  if (once) {
                    _this.disconnect();
                  }
                } else {
                  for (var i = 0; i < mutation.addedNodes.length; ++i) {
                    var addedNode = mutation.addedNodes[i];
                    if ($(addedNode).is(querySelector)) {
                      onFound($(addedNode));
                      if (once) {
                        _this.disconnect();
                        break;
                      }
                    }
                  }
                }
              }
            });
          });
          observer.observe($this[0], {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
          });
        }
      }
      return $this;
    };
  }(jQuery));
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("6", ["5"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('5');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("7", ["3"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
    } else if (typeof exports === 'object') {
      var jQuery = $__require('3');
      module.exports = factory(jQuery);
    } else {
      factory(window.jQuery || window.Zepto || window.$);
    }
  }(function($) {
    "use strict";
    $.fn.serializeJSON = function(options) {
      var serializedObject,
          formAsArray,
          keys,
          type,
          value,
          _ref,
          f,
          opts;
      f = $.serializeJSON;
      opts = f.setupOpts(options);
      formAsArray = this.serializeArray();
      f.readCheckboxUncheckedValues(formAsArray, this, opts);
      serializedObject = {};
      $.each(formAsArray, function(i, input) {
        keys = f.splitInputNameIntoKeysArray(input.name, opts);
        type = keys.pop();
        if (type !== 'skip') {
          value = f.parseValue(input.value, type, opts);
          if (opts.parseWithFunction && type === '_') {
            value = opts.parseWithFunction(value, input.name);
          }
          f.deepSet(serializedObject, keys, value, opts);
        }
      });
      return serializedObject;
    };
    $.serializeJSON = {
      defaultOptions: {
        checkboxUncheckedValue: undefined,
        parseNumbers: false,
        parseBooleans: false,
        parseNulls: false,
        parseAll: false,
        parseWithFunction: null,
        customTypes: {},
        defaultTypes: {
          "string": function(str) {
            return String(str);
          },
          "number": function(str) {
            return Number(str);
          },
          "boolean": function(str) {
            var falses = ["false", "null", "undefined", "", "0"];
            return falses.indexOf(str) === -1;
          },
          "null": function(str) {
            var falses = ["false", "null", "undefined", "", "0"];
            return falses.indexOf(str) === -1 ? str : null;
          },
          "array": function(str) {
            return JSON.parse(str);
          },
          "object": function(str) {
            return JSON.parse(str);
          },
          "auto": function(str) {
            return $.serializeJSON.parseValue(str, null, {
              parseNumbers: true,
              parseBooleans: true,
              parseNulls: true
            });
          }
        },
        useIntKeysAsArrayIndex: false
      },
      setupOpts: function(options) {
        var opt,
            validOpts,
            defaultOptions,
            optWithDefault,
            parseAll,
            f;
        f = $.serializeJSON;
        if (options == null) {
          options = {};
        }
        defaultOptions = f.defaultOptions || {};
        validOpts = ['checkboxUncheckedValue', 'parseNumbers', 'parseBooleans', 'parseNulls', 'parseAll', 'parseWithFunction', 'customTypes', 'defaultTypes', 'useIntKeysAsArrayIndex'];
        for (opt in options) {
          if (validOpts.indexOf(opt) === -1) {
            throw new Error("serializeJSON ERROR: invalid option '" + opt + "'. Please use one of " + validOpts.join(', '));
          }
        }
        optWithDefault = function(key) {
          return (options[key] !== false) && (options[key] !== '') && (options[key] || defaultOptions[key]);
        };
        parseAll = optWithDefault('parseAll');
        return {
          checkboxUncheckedValue: optWithDefault('checkboxUncheckedValue'),
          parseNumbers: parseAll || optWithDefault('parseNumbers'),
          parseBooleans: parseAll || optWithDefault('parseBooleans'),
          parseNulls: parseAll || optWithDefault('parseNulls'),
          parseWithFunction: optWithDefault('parseWithFunction'),
          typeFunctions: $.extend({}, optWithDefault('defaultTypes'), optWithDefault('customTypes')),
          useIntKeysAsArrayIndex: optWithDefault('useIntKeysAsArrayIndex')
        };
      },
      parseValue: function(str, type, opts) {
        var typeFunction,
            f;
        f = $.serializeJSON;
        typeFunction = opts.typeFunctions && opts.typeFunctions[type];
        if (typeFunction) {
          return typeFunction(str);
        }
        if (opts.parseNumbers && f.isNumeric(str)) {
          return Number(str);
        }
        if (opts.parseBooleans && (str === "true" || str === "false")) {
          return str === "true";
        }
        if (opts.parseNulls && str == "null") {
          return null;
        }
        return str;
      },
      isObject: function(obj) {
        return obj === Object(obj);
      },
      isUndefined: function(obj) {
        return obj === void 0;
      },
      isValidArrayIndex: function(val) {
        return /^[0-9]+$/.test(String(val));
      },
      isNumeric: function(obj) {
        return obj - parseFloat(obj) >= 0;
      },
      optionKeys: function(obj) {
        if (Object.keys) {
          return Object.keys(obj);
        } else {
          var key,
              keys = [];
          for (key in obj) {
            keys.push(key);
          }
          return keys;
        }
      },
      splitInputNameIntoKeysArray: function(name, opts) {
        var keys,
            nameWithoutType,
            type,
            _ref,
            f;
        f = $.serializeJSON;
        _ref = f.extractTypeFromInputName(name, opts);
        nameWithoutType = _ref[0];
        type = _ref[1];
        keys = nameWithoutType.split('[');
        keys = $.map(keys, function(key) {
          return key.replace(/\]/g, '');
        });
        if (keys[0] === '') {
          keys.shift();
        }
        keys.push(type);
        return keys;
      },
      extractTypeFromInputName: function(name, opts) {
        var match,
            validTypes,
            f;
        if (match = name.match(/(.*):([^:]+)$/)) {
          f = $.serializeJSON;
          validTypes = f.optionKeys(opts ? opts.typeFunctions : f.defaultOptions.defaultTypes);
          validTypes.push('skip');
          if (validTypes.indexOf(match[2]) !== -1) {
            return [match[1], match[2]];
          } else {
            throw new Error("serializeJSON ERROR: Invalid type " + match[2] + " found in input name '" + name + "', please use one of " + validTypes.join(', '));
          }
        } else {
          return [name, '_'];
        }
      },
      deepSet: function(o, keys, value, opts) {
        var key,
            nextKey,
            tail,
            lastIdx,
            lastVal,
            f;
        if (opts == null) {
          opts = {};
        }
        f = $.serializeJSON;
        if (f.isUndefined(o)) {
          throw new Error("ArgumentError: param 'o' expected to be an object or array, found undefined");
        }
        if (!keys || keys.length === 0) {
          throw new Error("ArgumentError: param 'keys' expected to be an array with least one element");
        }
        key = keys[0];
        if (keys.length === 1) {
          if (key === '') {
            o.push(value);
          } else {
            o[key] = value;
          }
        } else {
          nextKey = keys[1];
          if (key === '') {
            lastIdx = o.length - 1;
            lastVal = o[lastIdx];
            if (f.isObject(lastVal) && (f.isUndefined(lastVal[nextKey]) || keys.length > 2)) {
              key = lastIdx;
            } else {
              key = lastIdx + 1;
            }
          }
          if (nextKey === '') {
            if (f.isUndefined(o[key]) || !$.isArray(o[key])) {
              o[key] = [];
            }
          } else {
            if (opts.useIntKeysAsArrayIndex && f.isValidArrayIndex(nextKey)) {
              if (f.isUndefined(o[key]) || !$.isArray(o[key])) {
                o[key] = [];
              }
            } else {
              if (f.isUndefined(o[key]) || !f.isObject(o[key])) {
                o[key] = {};
              }
            }
          }
          tail = keys.slice(1);
          f.deepSet(o[key], tail, value, opts);
        }
      },
      readCheckboxUncheckedValues: function(formAsArray, $form, opts) {
        var selector,
            $uncheckedCheckboxes,
            $el,
            dataUncheckedValue,
            f;
        if (opts == null) {
          opts = {};
        }
        f = $.serializeJSON;
        selector = 'input[type=checkbox][name]:not(:checked):not([disabled])';
        $uncheckedCheckboxes = $form.find(selector).add($form.filter(selector));
        $uncheckedCheckboxes.each(function(i, el) {
          $el = $(el);
          dataUncheckedValue = $el.attr('data-unchecked-value');
          if (dataUncheckedValue) {
            formAsArray.push({
              name: el.name,
              value: dataUncheckedValue
            });
          } else {
            if (!f.isUndefined(opts.checkboxUncheckedValue)) {
              formAsArray.push({
                name: el.name,
                value: opts.checkboxUncheckedValue
              });
            }
          }
        });
      }
    };
  }));
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("8", ["7"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('7');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("9", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  RegExp.escape = function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  (function(undefined) {
    'use strict';
    var $;
    if (typeof jQuery !== 'undefined' && jQuery) {
      $ = jQuery;
    } else {
      $ = {};
    }
    $.csv = {
      defaults: {
        separator: ',',
        delimiter: '"',
        headers: true
      },
      hooks: {castToScalar: function(value, state) {
          var hasDot = /\./;
          if (isNaN(value)) {
            return value;
          } else {
            if (hasDot.test(value)) {
              return parseFloat(value);
            } else {
              var integer = parseInt(value);
              if (isNaN(integer)) {
                return null;
              } else {
                return integer;
              }
            }
          }
        }},
      parsers: {
        parse: function(csv, options) {
          var separator = options.separator;
          var delimiter = options.delimiter;
          if (!options.state.rowNum) {
            options.state.rowNum = 1;
          }
          if (!options.state.colNum) {
            options.state.colNum = 1;
          }
          var data = [];
          var entry = [];
          var state = 0;
          var value = '';
          var exit = false;
          function endOfEntry() {
            state = 0;
            value = '';
            if (options.start && options.state.rowNum < options.start) {
              entry = [];
              options.state.rowNum++;
              options.state.colNum = 1;
              return;
            }
            if (options.onParseEntry === undefined) {
              data.push(entry);
            } else {
              var hookVal = options.onParseEntry(entry, options.state);
              if (hookVal !== false) {
                data.push(hookVal);
              }
            }
            entry = [];
            if (options.end && options.state.rowNum >= options.end) {
              exit = true;
            }
            options.state.rowNum++;
            options.state.colNum = 1;
          }
          function endOfValue() {
            if (options.onParseValue === undefined) {
              entry.push(value);
            } else {
              var hook = options.onParseValue(value, options.state);
              if (hook !== false) {
                entry.push(hook);
              }
            }
            value = '';
            state = 0;
            options.state.colNum++;
          }
          var escSeparator = RegExp.escape(separator);
          var escDelimiter = RegExp.escape(delimiter);
          var match = /(D|S|\r\n|\n|\r|[^DS\r\n]+)/;
          var matchSrc = match.source;
          matchSrc = matchSrc.replace(/S/g, escSeparator);
          matchSrc = matchSrc.replace(/D/g, escDelimiter);
          match = RegExp(matchSrc, 'gm');
          csv.replace(match, function(m0) {
            if (exit) {
              return;
            }
            switch (state) {
              case 0:
                if (m0 === separator) {
                  value += '';
                  endOfValue();
                  break;
                }
                if (m0 === delimiter) {
                  state = 1;
                  break;
                }
                if (/^(\r\n|\n|\r)$/.test(m0)) {
                  endOfValue();
                  endOfEntry();
                  break;
                }
                value += m0;
                state = 3;
                break;
              case 1:
                if (m0 === delimiter) {
                  state = 2;
                  break;
                }
                value += m0;
                state = 1;
                break;
              case 2:
                if (m0 === delimiter) {
                  value += m0;
                  state = 1;
                  break;
                }
                if (m0 === separator) {
                  endOfValue();
                  break;
                }
                if (/^(\r\n|\n|\r)$/.test(m0)) {
                  endOfValue();
                  endOfEntry();
                  break;
                }
                throw new Error('CSVDataError: Illegal State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
              case 3:
                if (m0 === separator) {
                  endOfValue();
                  break;
                }
                if (/^(\r\n|\n|\r)$/.test(m0)) {
                  endOfValue();
                  endOfEntry();
                  break;
                }
                if (m0 === delimiter) {
                  throw new Error('CSVDataError: Illegal Quote [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
                }
                throw new Error('CSVDataError: Illegal Data [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
              default:
                throw new Error('CSVDataError: Unknown State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
            }
          });
          if (entry.length !== 0) {
            endOfValue();
            endOfEntry();
          }
          return data;
        },
        splitLines: function(csv, options) {
          var separator = options.separator;
          var delimiter = options.delimiter;
          if (!options.state.rowNum) {
            options.state.rowNum = 1;
          }
          var entries = [];
          var state = 0;
          var entry = '';
          var exit = false;
          function endOfLine() {
            state = 0;
            if (options.start && options.state.rowNum < options.start) {
              entry = '';
              options.state.rowNum++;
              return;
            }
            if (options.onParseEntry === undefined) {
              entries.push(entry);
            } else {
              var hookVal = options.onParseEntry(entry, options.state);
              if (hookVal !== false) {
                entries.push(hookVal);
              }
            }
            entry = '';
            if (options.end && options.state.rowNum >= options.end) {
              exit = true;
            }
            options.state.rowNum++;
          }
          var escSeparator = RegExp.escape(separator);
          var escDelimiter = RegExp.escape(delimiter);
          var match = /(D|S|\n|\r|[^DS\r\n]+)/;
          var matchSrc = match.source;
          matchSrc = matchSrc.replace(/S/g, escSeparator);
          matchSrc = matchSrc.replace(/D/g, escDelimiter);
          match = RegExp(matchSrc, 'gm');
          csv.replace(match, function(m0) {
            if (exit) {
              return;
            }
            switch (state) {
              case 0:
                if (m0 === separator) {
                  entry += m0;
                  state = 0;
                  break;
                }
                if (m0 === delimiter) {
                  entry += m0;
                  state = 1;
                  break;
                }
                if (m0 === '\n') {
                  endOfLine();
                  break;
                }
                if (/^\r$/.test(m0)) {
                  break;
                }
                entry += m0;
                state = 3;
                break;
              case 1:
                if (m0 === delimiter) {
                  entry += m0;
                  state = 2;
                  break;
                }
                entry += m0;
                state = 1;
                break;
              case 2:
                var prevChar = entry.substr(entry.length - 1);
                if (m0 === delimiter && prevChar === delimiter) {
                  entry += m0;
                  state = 1;
                  break;
                }
                if (m0 === separator) {
                  entry += m0;
                  state = 0;
                  break;
                }
                if (m0 === '\n') {
                  endOfLine();
                  break;
                }
                if (m0 === '\r') {
                  break;
                }
                throw new Error('CSVDataError: Illegal state [Row:' + options.state.rowNum + ']');
              case 3:
                if (m0 === separator) {
                  entry += m0;
                  state = 0;
                  break;
                }
                if (m0 === '\n') {
                  endOfLine();
                  break;
                }
                if (m0 === '\r') {
                  break;
                }
                if (m0 === delimiter) {
                  throw new Error('CSVDataError: Illegal quote [Row:' + options.state.rowNum + ']');
                }
                throw new Error('CSVDataError: Illegal state [Row:' + options.state.rowNum + ']');
              default:
                throw new Error('CSVDataError: Unknown state [Row:' + options.state.rowNum + ']');
            }
          });
          if (entry !== '') {
            endOfLine();
          }
          return entries;
        },
        parseEntry: function(csv, options) {
          var separator = options.separator;
          var delimiter = options.delimiter;
          if (!options.state.rowNum) {
            options.state.rowNum = 1;
          }
          if (!options.state.colNum) {
            options.state.colNum = 1;
          }
          var entry = [];
          var state = 0;
          var value = '';
          function endOfValue() {
            if (options.onParseValue === undefined) {
              entry.push(value);
            } else {
              var hook = options.onParseValue(value, options.state);
              if (hook !== false) {
                entry.push(hook);
              }
            }
            value = '';
            state = 0;
            options.state.colNum++;
          }
          if (!options.match) {
            var escSeparator = RegExp.escape(separator);
            var escDelimiter = RegExp.escape(delimiter);
            var match = /(D|S|\n|\r|[^DS\r\n]+)/;
            var matchSrc = match.source;
            matchSrc = matchSrc.replace(/S/g, escSeparator);
            matchSrc = matchSrc.replace(/D/g, escDelimiter);
            options.match = RegExp(matchSrc, 'gm');
          }
          csv.replace(options.match, function(m0) {
            switch (state) {
              case 0:
                if (m0 === separator) {
                  value += '';
                  endOfValue();
                  break;
                }
                if (m0 === delimiter) {
                  state = 1;
                  break;
                }
                if (m0 === '\n' || m0 === '\r') {
                  break;
                }
                value += m0;
                state = 3;
                break;
              case 1:
                if (m0 === delimiter) {
                  state = 2;
                  break;
                }
                value += m0;
                state = 1;
                break;
              case 2:
                if (m0 === delimiter) {
                  value += m0;
                  state = 1;
                  break;
                }
                if (m0 === separator) {
                  endOfValue();
                  break;
                }
                if (m0 === '\n' || m0 === '\r') {
                  break;
                }
                throw new Error('CSVDataError: Illegal State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
              case 3:
                if (m0 === separator) {
                  endOfValue();
                  break;
                }
                if (m0 === '\n' || m0 === '\r') {
                  break;
                }
                if (m0 === delimiter) {
                  throw new Error('CSVDataError: Illegal Quote [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
                }
                throw new Error('CSVDataError: Illegal Data [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
              default:
                throw new Error('CSVDataError: Unknown State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
            }
          });
          endOfValue();
          return entry;
        }
      },
      helpers: {collectPropertyNames: function(objects) {
          var o,
              propName,
              props = [];
          for (o in objects) {
            for (propName in objects[o]) {
              if ((objects[o].hasOwnProperty(propName)) && (props.indexOf(propName) < 0) && (typeof objects[o][propName] !== 'function')) {
                props.push(propName);
              }
            }
          }
          return props;
        }},
      toArray: function(csv, options, callback) {
        var options = (options !== undefined ? options : {});
        var config = {};
        config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
        config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
        config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
        var state = (options.state !== undefined ? options.state : {});
        var options = {
          delimiter: config.delimiter,
          separator: config.separator,
          onParseEntry: options.onParseEntry,
          onParseValue: options.onParseValue,
          state: state
        };
        var entry = $.csv.parsers.parseEntry(csv, options);
        if (!config.callback) {
          return entry;
        } else {
          config.callback('', entry);
        }
      },
      toArrays: function(csv, options, callback) {
        var options = (options !== undefined ? options : {});
        var config = {};
        config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
        config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
        config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
        var data = [];
        var options = {
          delimiter: config.delimiter,
          separator: config.separator,
          onPreParse: options.onPreParse,
          onParseEntry: options.onParseEntry,
          onParseValue: options.onParseValue,
          onPostParse: options.onPostParse,
          start: options.start,
          end: options.end,
          state: {
            rowNum: 1,
            colNum: 1
          }
        };
        if (options.onPreParse !== undefined) {
          options.onPreParse(csv, options.state);
        }
        data = $.csv.parsers.parse(csv, options);
        if (options.onPostParse !== undefined) {
          options.onPostParse(data, options.state);
        }
        if (!config.callback) {
          return data;
        } else {
          config.callback('', data);
        }
      },
      toObjects: function(csv, options, callback) {
        var options = (options !== undefined ? options : {});
        var config = {};
        config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
        config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
        config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
        config.headers = 'headers' in options ? options.headers : $.csv.defaults.headers;
        options.start = 'start' in options ? options.start : 1;
        if (config.headers) {
          options.start++;
        }
        if (options.end && config.headers) {
          options.end++;
        }
        var lines = [];
        var data = [];
        var options = {
          delimiter: config.delimiter,
          separator: config.separator,
          onPreParse: options.onPreParse,
          onParseEntry: options.onParseEntry,
          onParseValue: options.onParseValue,
          onPostParse: options.onPostParse,
          start: options.start,
          end: options.end,
          state: {
            rowNum: 1,
            colNum: 1
          },
          match: false,
          transform: options.transform
        };
        var headerOptions = {
          delimiter: config.delimiter,
          separator: config.separator,
          start: 1,
          end: 1,
          state: {
            rowNum: 1,
            colNum: 1
          }
        };
        if (options.onPreParse !== undefined) {
          options.onPreParse(csv, options.state);
        }
        var headerLine = $.csv.parsers.splitLines(csv, headerOptions);
        var headers = $.csv.toArray(headerLine[0], options);
        var lines = $.csv.parsers.splitLines(csv, options);
        options.state.colNum = 1;
        if (headers) {
          options.state.rowNum = 2;
        } else {
          options.state.rowNum = 1;
        }
        for (var i = 0,
            len = lines.length; i < len; i++) {
          var entry = $.csv.toArray(lines[i], options);
          var object = {};
          for (var j = 0; j < headers.length; j++) {
            object[headers[j]] = entry[j];
          }
          if (options.transform !== undefined) {
            data.push(options.transform.call(undefined, object));
          } else {
            data.push(object);
          }
          options.state.rowNum++;
        }
        if (options.onPostParse !== undefined) {
          options.onPostParse(data, options.state);
        }
        if (!config.callback) {
          return data;
        } else {
          config.callback('', data);
        }
      },
      fromArrays: function(arrays, options, callback) {
        var options = (options !== undefined ? options : {});
        var config = {};
        config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
        config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
        config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
        var output = '',
            line,
            lineValues,
            i,
            j;
        for (i = 0; i < arrays.length; i++) {
          line = arrays[i];
          lineValues = [];
          for (j = 0; j < line.length; j++) {
            var strValue = (line[j] === undefined || line[j] === null) ? '' : line[j].toString();
            if (strValue.indexOf(config.delimiter) > -1) {
              strValue = strValue.replace(config.delimiter, config.delimiter + config.delimiter);
            }
            var escMatcher = '\n|\r|S|D';
            escMatcher = escMatcher.replace('S', config.separator);
            escMatcher = escMatcher.replace('D', config.delimiter);
            if (strValue.search(escMatcher) > -1) {
              strValue = config.delimiter + strValue + config.delimiter;
            }
            lineValues.push(strValue);
          }
          output += lineValues.join(config.separator) + '\r\n';
        }
        if (!config.callback) {
          return output;
        } else {
          config.callback('', output);
        }
      },
      fromObjects: function(objects, options, callback) {
        var options = (options !== undefined ? options : {});
        var config = {};
        config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
        config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
        config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
        config.headers = 'headers' in options ? options.headers : $.csv.defaults.headers;
        config.sortOrder = 'sortOrder' in options ? options.sortOrder : 'declare';
        config.manualOrder = 'manualOrder' in options ? options.manualOrder : [];
        config.transform = options.transform;
        if (typeof config.manualOrder === 'string') {
          config.manualOrder = $.csv.toArray(config.manualOrder, config);
        }
        if (config.transform !== undefined) {
          var origObjects = objects;
          objects = [];
          var i;
          for (i = 0; i < origObjects.length; i++) {
            objects.push(config.transform.call(undefined, origObjects[i]));
          }
        }
        var props = $.csv.helpers.collectPropertyNames(objects);
        if (config.sortOrder === 'alpha') {
          props.sort();
        }
        if (config.manualOrder.length > 0) {
          var propsManual = [].concat(config.manualOrder);
          var p;
          for (p = 0; p < props.length; p++) {
            if (propsManual.indexOf(props[p]) < 0) {
              propsManual.push(props[p]);
            }
          }
          props = propsManual;
        }
        var o,
            p,
            line,
            output = [],
            propName;
        if (config.headers) {
          output.push(props);
        }
        for (o = 0; o < objects.length; o++) {
          line = [];
          for (p = 0; p < props.length; p++) {
            propName = props[p];
            if (propName in objects[o] && typeof objects[o][propName] !== 'function') {
              line.push(objects[o][propName]);
            } else {
              line.push('');
            }
          }
          output.push(line);
        }
        return $.csv.fromArrays(output, options, config.callback);
      }
    };
    $.csvEntry2Array = $.csv.toArray;
    $.csv2Array = $.csv.toArrays;
    $.csv2Dictionary = $.csv.toObjects;
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = $.csv;
    }
  }).call(this);
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("a", ["9"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('9');
  global.define = __define;
  return module.exports;
});

(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("b", ["3", "c", "d", "e"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  $.widget("ui.draggable", $.ui.mouse, {
    version: "1.11.4",
    widgetEventPrefix: "drag",
    options: {
      addClasses: true,
      appendTo: "parent",
      axis: false,
      connectToSortable: false,
      containment: false,
      cursor: "auto",
      cursorAt: false,
      grid: false,
      handle: false,
      helper: "original",
      iframeFix: false,
      opacity: false,
      refreshPositions: false,
      revert: false,
      revertDuration: 500,
      scope: "default",
      scroll: true,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: false,
      snapMode: "both",
      snapTolerance: 20,
      stack: false,
      zIndex: false,
      drag: null,
      start: null,
      stop: null
    },
    _create: function() {
      if (this.options.helper === "original") {
        this._setPositionRelative();
      }
      if (this.options.addClasses) {
        this.element.addClass("ui-draggable");
      }
      if (this.options.disabled) {
        this.element.addClass("ui-draggable-disabled");
      }
      this._setHandleClassName();
      this._mouseInit();
    },
    _setOption: function(key, value) {
      this._super(key, value);
      if (key === "handle") {
        this._removeHandleClassName();
        this._setHandleClassName();
      }
    },
    _destroy: function() {
      if ((this.helper || this.element).is(".ui-draggable-dragging")) {
        this.destroyOnClear = true;
        return;
      }
      this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
      this._removeHandleClassName();
      this._mouseDestroy();
    },
    _mouseCapture: function(event) {
      var o = this.options;
      this._blurActiveElement(event);
      if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
        return false;
      }
      this.handle = this._getHandle(event);
      if (!this.handle) {
        return false;
      }
      this._blockFrames(o.iframeFix === true ? "iframe" : o.iframeFix);
      return true;
    },
    _blockFrames: function(selector) {
      this.iframeBlocks = this.document.find(selector).map(function() {
        var iframe = $(this);
        return $("<div>").css("position", "absolute").appendTo(iframe.parent()).outerWidth(iframe.outerWidth()).outerHeight(iframe.outerHeight()).offset(iframe.offset())[0];
      });
    },
    _unblockFrames: function() {
      if (this.iframeBlocks) {
        this.iframeBlocks.remove();
        delete this.iframeBlocks;
      }
    },
    _blurActiveElement: function(event) {
      var document = this.document[0];
      if (!this.handleElement.is(event.target)) {
        return;
      }
      try {
        if (document.activeElement && document.activeElement.nodeName.toLowerCase() !== "body") {
          $(document.activeElement).blur();
        }
      } catch (error) {}
    },
    _mouseStart: function(event) {
      var o = this.options;
      this.helper = this._createHelper(event);
      this.helper.addClass("ui-draggable-dragging");
      this._cacheHelperProportions();
      if ($.ui.ddmanager) {
        $.ui.ddmanager.current = this;
      }
      this._cacheMargins();
      this.cssPosition = this.helper.css("position");
      this.scrollParent = this.helper.scrollParent(true);
      this.offsetParent = this.helper.offsetParent();
      this.hasFixedAncestor = this.helper.parents().filter(function() {
        return $(this).css("position") === "fixed";
      }).length > 0;
      this.positionAbs = this.element.offset();
      this._refreshOffsets(event);
      this.originalPosition = this.position = this._generatePosition(event, false);
      this.originalPageX = event.pageX;
      this.originalPageY = event.pageY;
      (o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));
      this._setContainment();
      if (this._trigger("start", event) === false) {
        this._clear();
        return false;
      }
      this._cacheHelperProportions();
      if ($.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(this, event);
      }
      this._normalizeRightBottom();
      this._mouseDrag(event, true);
      if ($.ui.ddmanager) {
        $.ui.ddmanager.dragStart(this, event);
      }
      return true;
    },
    _refreshOffsets: function(event) {
      this.offset = {
        top: this.positionAbs.top - this.margins.top,
        left: this.positionAbs.left - this.margins.left,
        scroll: false,
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      };
      this.offset.click = {
        left: event.pageX - this.offset.left,
        top: event.pageY - this.offset.top
      };
    },
    _mouseDrag: function(event, noPropagation) {
      if (this.hasFixedAncestor) {
        this.offset.parent = this._getParentOffset();
      }
      this.position = this._generatePosition(event, true);
      this.positionAbs = this._convertPositionTo("absolute");
      if (!noPropagation) {
        var ui = this._uiHash();
        if (this._trigger("drag", event, ui) === false) {
          this._mouseUp({});
          return false;
        }
        this.position = ui.position;
      }
      this.helper[0].style.left = this.position.left + "px";
      this.helper[0].style.top = this.position.top + "px";
      if ($.ui.ddmanager) {
        $.ui.ddmanager.drag(this, event);
      }
      return false;
    },
    _mouseStop: function(event) {
      var that = this,
          dropped = false;
      if ($.ui.ddmanager && !this.options.dropBehaviour) {
        dropped = $.ui.ddmanager.drop(this, event);
      }
      if (this.dropped) {
        dropped = this.dropped;
        this.dropped = false;
      }
      if ((this.options.revert === "invalid" && !dropped) || (this.options.revert === "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
        $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
          if (that._trigger("stop", event) !== false) {
            that._clear();
          }
        });
      } else {
        if (this._trigger("stop", event) !== false) {
          this._clear();
        }
      }
      return false;
    },
    _mouseUp: function(event) {
      this._unblockFrames();
      if ($.ui.ddmanager) {
        $.ui.ddmanager.dragStop(this, event);
      }
      if (this.handleElement.is(event.target)) {
        this.element.focus();
      }
      return $.ui.mouse.prototype._mouseUp.call(this, event);
    },
    cancel: function() {
      if (this.helper.is(".ui-draggable-dragging")) {
        this._mouseUp({});
      } else {
        this._clear();
      }
      return this;
    },
    _getHandle: function(event) {
      return this.options.handle ? !!$(event.target).closest(this.element.find(this.options.handle)).length : true;
    },
    _setHandleClassName: function() {
      this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;
      this.handleElement.addClass("ui-draggable-handle");
    },
    _removeHandleClassName: function() {
      this.handleElement.removeClass("ui-draggable-handle");
    },
    _createHelper: function(event) {
      var o = this.options,
          helperIsFunction = $.isFunction(o.helper),
          helper = helperIsFunction ? $(o.helper.apply(this.element[0], [event])) : (o.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);
      if (!helper.parents("body").length) {
        helper.appendTo((o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo));
      }
      if (helperIsFunction && helper[0] === this.element[0]) {
        this._setPositionRelative();
      }
      if (helper[0] !== this.element[0] && !(/(fixed|absolute)/).test(helper.css("position"))) {
        helper.css("position", "absolute");
      }
      return helper;
    },
    _setPositionRelative: function() {
      if (!(/^(?:r|a|f)/).test(this.element.css("position"))) {
        this.element[0].style.position = "relative";
      }
    },
    _adjustOffsetFromHelper: function(obj) {
      if (typeof obj === "string") {
        obj = obj.split(" ");
      }
      if ($.isArray(obj)) {
        obj = {
          left: +obj[0],
          top: +obj[1] || 0
        };
      }
      if ("left" in obj) {
        this.offset.click.left = obj.left + this.margins.left;
      }
      if ("right" in obj) {
        this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
      }
      if ("top" in obj) {
        this.offset.click.top = obj.top + this.margins.top;
      }
      if ("bottom" in obj) {
        this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
      }
    },
    _isRootNode: function(element) {
      return (/(html|body)/i).test(element.tagName) || element === this.document[0];
    },
    _getParentOffset: function() {
      var po = this.offsetParent.offset(),
          document = this.document[0];
      if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
        po.left += this.scrollParent.scrollLeft();
        po.top += this.scrollParent.scrollTop();
      }
      if (this._isRootNode(this.offsetParent[0])) {
        po = {
          top: 0,
          left: 0
        };
      }
      return {
        top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      };
    },
    _getRelativeOffset: function() {
      if (this.cssPosition !== "relative") {
        return {
          top: 0,
          left: 0
        };
      }
      var p = this.element.position(),
          scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
      return {
        top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + (!scrollIsRootNode ? this.scrollParent.scrollTop() : 0),
        left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + (!scrollIsRootNode ? this.scrollParent.scrollLeft() : 0)
      };
    },
    _cacheMargins: function() {
      this.margins = {
        left: (parseInt(this.element.css("marginLeft"), 10) || 0),
        top: (parseInt(this.element.css("marginTop"), 10) || 0),
        right: (parseInt(this.element.css("marginRight"), 10) || 0),
        bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
      };
    },
    _cacheHelperProportions: function() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function() {
      var isUserScrollable,
          c,
          ce,
          o = this.options,
          document = this.document[0];
      this.relativeContainer = null;
      if (!o.containment) {
        this.containment = null;
        return;
      }
      if (o.containment === "window") {
        this.containment = [$(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, $(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left, $(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
        return;
      }
      if (o.containment === "document") {
        this.containment = [0, 0, $(document).width() - this.helperProportions.width - this.margins.left, ($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
        return;
      }
      if (o.containment.constructor === Array) {
        this.containment = o.containment;
        return;
      }
      if (o.containment === "parent") {
        o.containment = this.helper[0].parentNode;
      }
      c = $(o.containment);
      ce = c[0];
      if (!ce) {
        return;
      }
      isUserScrollable = /(scroll|auto)/.test(c.css("overflow"));
      this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (isUserScrollable ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (isUserScrollable ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
      this.relativeContainer = c;
    },
    _convertPositionTo: function(d, pos) {
      if (!pos) {
        pos = this.position;
      }
      var mod = d === "absolute" ? 1 : -1,
          scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
      return {
        top: (pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ((this.cssPosition === "fixed" ? -this.offset.scroll.top : (scrollIsRootNode ? 0 : this.offset.scroll.top)) * mod)),
        left: (pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ((this.cssPosition === "fixed" ? -this.offset.scroll.left : (scrollIsRootNode ? 0 : this.offset.scroll.left)) * mod))
      };
    },
    _generatePosition: function(event, constrainPosition) {
      var containment,
          co,
          top,
          left,
          o = this.options,
          scrollIsRootNode = this._isRootNode(this.scrollParent[0]),
          pageX = event.pageX,
          pageY = event.pageY;
      if (!scrollIsRootNode || !this.offset.scroll) {
        this.offset.scroll = {
          top: this.scrollParent.scrollTop(),
          left: this.scrollParent.scrollLeft()
        };
      }
      if (constrainPosition) {
        if (this.containment) {
          if (this.relativeContainer) {
            co = this.relativeContainer.offset();
            containment = [this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top];
          } else {
            containment = this.containment;
          }
          if (event.pageX - this.offset.click.left < containment[0]) {
            pageX = containment[0] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top < containment[1]) {
            pageY = containment[1] + this.offset.click.top;
          }
          if (event.pageX - this.offset.click.left > containment[2]) {
            pageX = containment[2] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top > containment[3]) {
            pageY = containment[3] + this.offset.click.top;
          }
        }
        if (o.grid) {
          top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
          pageY = containment ? ((top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3]) ? top : ((top - this.offset.click.top >= containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
          left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
          pageX = containment ? ((left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2]) ? left : ((left - this.offset.click.left >= containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
        }
        if (o.axis === "y") {
          pageX = this.originalPageX;
        }
        if (o.axis === "x") {
          pageY = this.originalPageY;
        }
      }
      return {
        top: (pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.offset.scroll.top : (scrollIsRootNode ? 0 : this.offset.scroll.top))),
        left: (pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.offset.scroll.left : (scrollIsRootNode ? 0 : this.offset.scroll.left)))
      };
    },
    _clear: function() {
      this.helper.removeClass("ui-draggable-dragging");
      if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
        this.helper.remove();
      }
      this.helper = null;
      this.cancelHelperRemoval = false;
      if (this.destroyOnClear) {
        this.destroy();
      }
    },
    _normalizeRightBottom: function() {
      if (this.options.axis !== "y" && this.helper.css("right") !== "auto") {
        this.helper.width(this.helper.width());
        this.helper.css("right", "auto");
      }
      if (this.options.axis !== "x" && this.helper.css("bottom") !== "auto") {
        this.helper.height(this.helper.height());
        this.helper.css("bottom", "auto");
      }
    },
    _trigger: function(type, event, ui) {
      ui = ui || this._uiHash();
      $.ui.plugin.call(this, type, [event, ui, this], true);
      if (/^(drag|start|stop)/.test(type)) {
        this.positionAbs = this._convertPositionTo("absolute");
        ui.offset = this.positionAbs;
      }
      return $.Widget.prototype._trigger.call(this, type, event, ui);
    },
    plugins: {},
    _uiHash: function() {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      };
    }
  });
  $.ui.plugin.add("draggable", "connectToSortable", {
    start: function(event, ui, draggable) {
      var uiSortable = $.extend({}, ui, {item: draggable.element});
      draggable.sortables = [];
      $(draggable.options.connectToSortable).each(function() {
        var sortable = $(this).sortable("instance");
        if (sortable && !sortable.options.disabled) {
          draggable.sortables.push(sortable);
          sortable.refreshPositions();
          sortable._trigger("activate", event, uiSortable);
        }
      });
    },
    stop: function(event, ui, draggable) {
      var uiSortable = $.extend({}, ui, {item: draggable.element});
      draggable.cancelHelperRemoval = false;
      $.each(draggable.sortables, function() {
        var sortable = this;
        if (sortable.isOver) {
          sortable.isOver = 0;
          draggable.cancelHelperRemoval = true;
          sortable.cancelHelperRemoval = false;
          sortable._storedCSS = {
            position: sortable.placeholder.css("position"),
            top: sortable.placeholder.css("top"),
            left: sortable.placeholder.css("left")
          };
          sortable._mouseStop(event);
          sortable.options.helper = sortable.options._helper;
        } else {
          sortable.cancelHelperRemoval = true;
          sortable._trigger("deactivate", event, uiSortable);
        }
      });
    },
    drag: function(event, ui, draggable) {
      $.each(draggable.sortables, function() {
        var innermostIntersecting = false,
            sortable = this;
        sortable.positionAbs = draggable.positionAbs;
        sortable.helperProportions = draggable.helperProportions;
        sortable.offset.click = draggable.offset.click;
        if (sortable._intersectsWith(sortable.containerCache)) {
          innermostIntersecting = true;
          $.each(draggable.sortables, function() {
            this.positionAbs = draggable.positionAbs;
            this.helperProportions = draggable.helperProportions;
            this.offset.click = draggable.offset.click;
            if (this !== sortable && this._intersectsWith(this.containerCache) && $.contains(sortable.element[0], this.element[0])) {
              innermostIntersecting = false;
            }
            return innermostIntersecting;
          });
        }
        if (innermostIntersecting) {
          if (!sortable.isOver) {
            sortable.isOver = 1;
            draggable._parent = ui.helper.parent();
            sortable.currentItem = ui.helper.appendTo(sortable.element).data("ui-sortable-item", true);
            sortable.options._helper = sortable.options.helper;
            sortable.options.helper = function() {
              return ui.helper[0];
            };
            event.target = sortable.currentItem[0];
            sortable._mouseCapture(event, true);
            sortable._mouseStart(event, true, true);
            sortable.offset.click.top = draggable.offset.click.top;
            sortable.offset.click.left = draggable.offset.click.left;
            sortable.offset.parent.left -= draggable.offset.parent.left - sortable.offset.parent.left;
            sortable.offset.parent.top -= draggable.offset.parent.top - sortable.offset.parent.top;
            draggable._trigger("toSortable", event);
            draggable.dropped = sortable.element;
            $.each(draggable.sortables, function() {
              this.refreshPositions();
            });
            draggable.currentItem = draggable.element;
            sortable.fromOutside = draggable;
          }
          if (sortable.currentItem) {
            sortable._mouseDrag(event);
            ui.position = sortable.position;
          }
        } else {
          if (sortable.isOver) {
            sortable.isOver = 0;
            sortable.cancelHelperRemoval = true;
            sortable.options._revert = sortable.options.revert;
            sortable.options.revert = false;
            sortable._trigger("out", event, sortable._uiHash(sortable));
            sortable._mouseStop(event, true);
            sortable.options.revert = sortable.options._revert;
            sortable.options.helper = sortable.options._helper;
            if (sortable.placeholder) {
              sortable.placeholder.remove();
            }
            ui.helper.appendTo(draggable._parent);
            draggable._refreshOffsets(event);
            ui.position = draggable._generatePosition(event, true);
            draggable._trigger("fromSortable", event);
            draggable.dropped = false;
            $.each(draggable.sortables, function() {
              this.refreshPositions();
            });
          }
        }
      });
    }
  });
  $.ui.plugin.add("draggable", "cursor", {
    start: function(event, ui, instance) {
      var t = $("body"),
          o = instance.options;
      if (t.css("cursor")) {
        o._cursor = t.css("cursor");
      }
      t.css("cursor", o.cursor);
    },
    stop: function(event, ui, instance) {
      var o = instance.options;
      if (o._cursor) {
        $("body").css("cursor", o._cursor);
      }
    }
  });
  $.ui.plugin.add("draggable", "opacity", {
    start: function(event, ui, instance) {
      var t = $(ui.helper),
          o = instance.options;
      if (t.css("opacity")) {
        o._opacity = t.css("opacity");
      }
      t.css("opacity", o.opacity);
    },
    stop: function(event, ui, instance) {
      var o = instance.options;
      if (o._opacity) {
        $(ui.helper).css("opacity", o._opacity);
      }
    }
  });
  $.ui.plugin.add("draggable", "scroll", {
    start: function(event, ui, i) {
      if (!i.scrollParentNotHidden) {
        i.scrollParentNotHidden = i.helper.scrollParent(false);
      }
      if (i.scrollParentNotHidden[0] !== i.document[0] && i.scrollParentNotHidden[0].tagName !== "HTML") {
        i.overflowOffset = i.scrollParentNotHidden.offset();
      }
    },
    drag: function(event, ui, i) {
      var o = i.options,
          scrolled = false,
          scrollParent = i.scrollParentNotHidden[0],
          document = i.document[0];
      if (scrollParent !== document && scrollParent.tagName !== "HTML") {
        if (!o.axis || o.axis !== "x") {
          if ((i.overflowOffset.top + scrollParent.offsetHeight) - event.pageY < o.scrollSensitivity) {
            scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
          } else if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
            scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
          }
        }
        if (!o.axis || o.axis !== "y") {
          if ((i.overflowOffset.left + scrollParent.offsetWidth) - event.pageX < o.scrollSensitivity) {
            scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
          } else if (event.pageX - i.overflowOffset.left < o.scrollSensitivity) {
            scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
          }
        }
      } else {
        if (!o.axis || o.axis !== "x") {
          if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
            scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
          } else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
            scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
          }
        }
        if (!o.axis || o.axis !== "y") {
          if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
            scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
          } else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
            scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
          }
        }
      }
      if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(i, event);
      }
    }
  });
  $.ui.plugin.add("draggable", "snap", {
    start: function(event, ui, i) {
      var o = i.options;
      i.snapElements = [];
      $(o.snap.constructor !== String ? (o.snap.items || ":data(ui-draggable)") : o.snap).each(function() {
        var $t = $(this),
            $o = $t.offset();
        if (this !== i.element[0]) {
          i.snapElements.push({
            item: this,
            width: $t.outerWidth(),
            height: $t.outerHeight(),
            top: $o.top,
            left: $o.left
          });
        }
      });
    },
    drag: function(event, ui, inst) {
      var ts,
          bs,
          ls,
          rs,
          l,
          r,
          t,
          b,
          i,
          first,
          o = inst.options,
          d = o.snapTolerance,
          x1 = ui.offset.left,
          x2 = x1 + inst.helperProportions.width,
          y1 = ui.offset.top,
          y2 = y1 + inst.helperProportions.height;
      for (i = inst.snapElements.length - 1; i >= 0; i--) {
        l = inst.snapElements[i].left - inst.margins.left;
        r = l + inst.snapElements[i].width;
        t = inst.snapElements[i].top - inst.margins.top;
        b = t + inst.snapElements[i].height;
        if (x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item)) {
          if (inst.snapElements[i].snapping) {
            (inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {snapItem: inst.snapElements[i].item})));
          }
          inst.snapElements[i].snapping = false;
          continue;
        }
        if (o.snapMode !== "inner") {
          ts = Math.abs(t - y2) <= d;
          bs = Math.abs(b - y1) <= d;
          ls = Math.abs(l - x2) <= d;
          rs = Math.abs(r - x1) <= d;
          if (ts) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: t - inst.helperProportions.height,
              left: 0
            }).top;
          }
          if (bs) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: b,
              left: 0
            }).top;
          }
          if (ls) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: l - inst.helperProportions.width
            }).left;
          }
          if (rs) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: r
            }).left;
          }
        }
        first = (ts || bs || ls || rs);
        if (o.snapMode !== "outer") {
          ts = Math.abs(t - y1) <= d;
          bs = Math.abs(b - y2) <= d;
          ls = Math.abs(l - x1) <= d;
          rs = Math.abs(r - x2) <= d;
          if (ts) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: t,
              left: 0
            }).top;
          }
          if (bs) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: b - inst.helperProportions.height,
              left: 0
            }).top;
          }
          if (ls) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: l
            }).left;
          }
          if (rs) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: r - inst.helperProportions.width
            }).left;
          }
        }
        if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
          (inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {snapItem: inst.snapElements[i].item})));
        }
        inst.snapElements[i].snapping = (ts || bs || ls || rs || first);
      }
    }
  });
  $.ui.plugin.add("draggable", "stack", {start: function(event, ui, instance) {
      var min,
          o = instance.options,
          group = $.makeArray($(o.stack)).sort(function(a, b) {
            return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
          });
      if (!group.length) {
        return;
      }
      min = parseInt($(group[0]).css("zIndex"), 10) || 0;
      $(group).each(function(i) {
        $(this).css("zIndex", min + i);
      });
      this.css("zIndex", (min + group.length));
    }});
  $.ui.plugin.add("draggable", "zIndex", {
    start: function(event, ui, instance) {
      var t = $(ui.helper),
          o = instance.options;
      if (t.css("zIndex")) {
        o._zIndex = t.css("zIndex");
      }
      t.css("zIndex", o.zIndex);
    },
    stop: function(event, ui, instance) {
      var o = instance.options;
      if (o._zIndex) {
        $(ui.helper).css("zIndex", o._zIndex);
      }
    }
  });
  return $.ui.draggable;
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("f", ["3", "c", "e", "d", "b"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  $.widget("ui.droppable", {
    version: "1.11.4",
    widgetEventPrefix: "drop",
    options: {
      accept: "*",
      activeClass: false,
      addClasses: true,
      greedy: false,
      hoverClass: false,
      scope: "default",
      tolerance: "intersect",
      activate: null,
      deactivate: null,
      drop: null,
      out: null,
      over: null
    },
    _create: function() {
      var proportions,
          o = this.options,
          accept = o.accept;
      this.isover = false;
      this.isout = true;
      this.accept = $.isFunction(accept) ? accept : function(d) {
        return d.is(accept);
      };
      this.proportions = function() {
        if (arguments.length) {
          proportions = arguments[0];
        } else {
          return proportions ? proportions : proportions = {
            width: this.element[0].offsetWidth,
            height: this.element[0].offsetHeight
          };
        }
      };
      this._addToManager(o.scope);
      o.addClasses && this.element.addClass("ui-droppable");
    },
    _addToManager: function(scope) {
      $.ui.ddmanager.droppables[scope] = $.ui.ddmanager.droppables[scope] || [];
      $.ui.ddmanager.droppables[scope].push(this);
    },
    _splice: function(drop) {
      var i = 0;
      for (; i < drop.length; i++) {
        if (drop[i] === this) {
          drop.splice(i, 1);
        }
      }
    },
    _destroy: function() {
      var drop = $.ui.ddmanager.droppables[this.options.scope];
      this._splice(drop);
      this.element.removeClass("ui-droppable ui-droppable-disabled");
    },
    _setOption: function(key, value) {
      if (key === "accept") {
        this.accept = $.isFunction(value) ? value : function(d) {
          return d.is(value);
        };
      } else if (key === "scope") {
        var drop = $.ui.ddmanager.droppables[this.options.scope];
        this._splice(drop);
        this._addToManager(value);
      }
      this._super(key, value);
    },
    _activate: function(event) {
      var draggable = $.ui.ddmanager.current;
      if (this.options.activeClass) {
        this.element.addClass(this.options.activeClass);
      }
      if (draggable) {
        this._trigger("activate", event, this.ui(draggable));
      }
    },
    _deactivate: function(event) {
      var draggable = $.ui.ddmanager.current;
      if (this.options.activeClass) {
        this.element.removeClass(this.options.activeClass);
      }
      if (draggable) {
        this._trigger("deactivate", event, this.ui(draggable));
      }
    },
    _over: function(event) {
      var draggable = $.ui.ddmanager.current;
      if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
        return;
      }
      if (this.accept.call(this.element[0], (draggable.currentItem || draggable.element))) {
        if (this.options.hoverClass) {
          this.element.addClass(this.options.hoverClass);
        }
        this._trigger("over", event, this.ui(draggable));
      }
    },
    _out: function(event) {
      var draggable = $.ui.ddmanager.current;
      if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
        return;
      }
      if (this.accept.call(this.element[0], (draggable.currentItem || draggable.element))) {
        if (this.options.hoverClass) {
          this.element.removeClass(this.options.hoverClass);
        }
        this._trigger("out", event, this.ui(draggable));
      }
    },
    _drop: function(event, custom) {
      var draggable = custom || $.ui.ddmanager.current,
          childrenIntersection = false;
      if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
        return false;
      }
      this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
        var inst = $(this).droppable("instance");
        if (inst.options.greedy && !inst.options.disabled && inst.options.scope === draggable.options.scope && inst.accept.call(inst.element[0], (draggable.currentItem || draggable.element)) && $.ui.intersect(draggable, $.extend(inst, {offset: inst.element.offset()}), inst.options.tolerance, event)) {
          childrenIntersection = true;
          return false;
        }
      });
      if (childrenIntersection) {
        return false;
      }
      if (this.accept.call(this.element[0], (draggable.currentItem || draggable.element))) {
        if (this.options.activeClass) {
          this.element.removeClass(this.options.activeClass);
        }
        if (this.options.hoverClass) {
          this.element.removeClass(this.options.hoverClass);
        }
        this._trigger("drop", event, this.ui(draggable));
        return this.element;
      }
      return false;
    },
    ui: function(c) {
      return {
        draggable: (c.currentItem || c.element),
        helper: c.helper,
        position: c.position,
        offset: c.positionAbs
      };
    }
  });
  $.ui.intersect = (function() {
    function isOverAxis(x, reference, size) {
      return (x >= reference) && (x < (reference + size));
    }
    return function(draggable, droppable, toleranceMode, event) {
      if (!droppable.offset) {
        return false;
      }
      var x1 = (draggable.positionAbs || draggable.position.absolute).left + draggable.margins.left,
          y1 = (draggable.positionAbs || draggable.position.absolute).top + draggable.margins.top,
          x2 = x1 + draggable.helperProportions.width,
          y2 = y1 + draggable.helperProportions.height,
          l = droppable.offset.left,
          t = droppable.offset.top,
          r = l + droppable.proportions().width,
          b = t + droppable.proportions().height;
      switch (toleranceMode) {
        case "fit":
          return (l <= x1 && x2 <= r && t <= y1 && y2 <= b);
        case "intersect":
          return (l < x1 + (draggable.helperProportions.width / 2) && x2 - (draggable.helperProportions.width / 2) < r && t < y1 + (draggable.helperProportions.height / 2) && y2 - (draggable.helperProportions.height / 2) < b);
        case "pointer":
          return isOverAxis(event.pageY, t, droppable.proportions().height) && isOverAxis(event.pageX, l, droppable.proportions().width);
        case "touch":
          return ((y1 >= t && y1 <= b) || (y2 >= t && y2 <= b) || (y1 < t && y2 > b)) && ((x1 >= l && x1 <= r) || (x2 >= l && x2 <= r) || (x1 < l && x2 > r));
        default:
          return false;
      }
    };
  })();
  $.ui.ddmanager = {
    current: null,
    droppables: {"default": []},
    prepareOffsets: function(t, event) {
      var i,
          j,
          m = $.ui.ddmanager.droppables[t.options.scope] || [],
          type = event ? event.type : null,
          list = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
      droppablesLoop: for (i = 0; i < m.length; i++) {
        if (m[i].options.disabled || (t && !m[i].accept.call(m[i].element[0], (t.currentItem || t.element)))) {
          continue;
        }
        for (j = 0; j < list.length; j++) {
          if (list[j] === m[i].element[0]) {
            m[i].proportions().height = 0;
            continue droppablesLoop;
          }
        }
        m[i].visible = m[i].element.css("display") !== "none";
        if (!m[i].visible) {
          continue;
        }
        if (type === "mousedown") {
          m[i]._activate.call(m[i], event);
        }
        m[i].offset = m[i].element.offset();
        m[i].proportions({
          width: m[i].element[0].offsetWidth,
          height: m[i].element[0].offsetHeight
        });
      }
    },
    drop: function(draggable, event) {
      var dropped = false;
      $.each(($.ui.ddmanager.droppables[draggable.options.scope] || []).slice(), function() {
        if (!this.options) {
          return;
        }
        if (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance, event)) {
          dropped = this._drop.call(this, event) || dropped;
        }
        if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (draggable.currentItem || draggable.element))) {
          this.isout = true;
          this.isover = false;
          this._deactivate.call(this, event);
        }
      });
      return dropped;
    },
    dragStart: function(draggable, event) {
      draggable.element.parentsUntil("body").bind("scroll.droppable", function() {
        if (!draggable.options.refreshPositions) {
          $.ui.ddmanager.prepareOffsets(draggable, event);
        }
      });
    },
    drag: function(draggable, event) {
      if (draggable.options.refreshPositions) {
        $.ui.ddmanager.prepareOffsets(draggable, event);
      }
      $.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {
        if (this.options.disabled || this.greedyChild || !this.visible) {
          return;
        }
        var parentInstance,
            scope,
            parent,
            intersects = $.ui.intersect(draggable, this, this.options.tolerance, event),
            c = !intersects && this.isover ? "isout" : (intersects && !this.isover ? "isover" : null);
        if (!c) {
          return;
        }
        if (this.options.greedy) {
          scope = this.options.scope;
          parent = this.element.parents(":data(ui-droppable)").filter(function() {
            return $(this).droppable("instance").options.scope === scope;
          });
          if (parent.length) {
            parentInstance = $(parent[0]).droppable("instance");
            parentInstance.greedyChild = (c === "isover");
          }
        }
        if (parentInstance && c === "isover") {
          parentInstance.isover = false;
          parentInstance.isout = true;
          parentInstance._out.call(parentInstance, event);
        }
        this[c] = true;
        this[c === "isout" ? "isover" : "isout"] = false;
        this[c === "isover" ? "_over" : "_out"].call(this, event);
        if (parentInstance && c === "isout") {
          parentInstance.isout = false;
          parentInstance.isover = true;
          parentInstance._over.call(parentInstance, event);
        }
      });
    },
    dragStop: function(draggable, event) {
      draggable.element.parentsUntil("body").unbind("scroll.droppable");
      if (!draggable.options.refreshPositions) {
        $.ui.ddmanager.prepareOffsets(draggable, event);
      }
    }
  };
  return $.ui.droppable;
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("10", ["3", "c", "d", "e"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  $.widget("ui.resizable", $.ui.mouse, {
    version: "1.11.4",
    widgetEventPrefix: "resize",
    options: {
      alsoResize: false,
      animate: false,
      animateDuration: "slow",
      animateEasing: "swing",
      aspectRatio: false,
      autoHide: false,
      containment: false,
      ghost: false,
      grid: false,
      handles: "e,s,se",
      helper: false,
      maxHeight: null,
      maxWidth: null,
      minHeight: 10,
      minWidth: 10,
      zIndex: 90,
      resize: null,
      start: null,
      stop: null
    },
    _num: function(value) {
      return parseInt(value, 10) || 0;
    },
    _isNumber: function(value) {
      return !isNaN(parseInt(value, 10));
    },
    _hasScroll: function(el, a) {
      if ($(el).css("overflow") === "hidden") {
        return false;
      }
      var scroll = (a && a === "left") ? "scrollLeft" : "scrollTop",
          has = false;
      if (el[scroll] > 0) {
        return true;
      }
      el[scroll] = 1;
      has = (el[scroll] > 0);
      el[scroll] = 0;
      return has;
    },
    _create: function() {
      var n,
          i,
          handle,
          axis,
          hname,
          that = this,
          o = this.options;
      this.element.addClass("ui-resizable");
      $.extend(this, {
        _aspectRatio: !!(o.aspectRatio),
        aspectRatio: o.aspectRatio,
        originalElement: this.element,
        _proportionallyResizeElements: [],
        _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
      });
      if (this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)) {
        this.element.wrap($("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
          position: this.element.css("position"),
          width: this.element.outerWidth(),
          height: this.element.outerHeight(),
          top: this.element.css("top"),
          left: this.element.css("left")
        }));
        this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance"));
        this.elementIsWrapper = true;
        this.element.css({
          marginLeft: this.originalElement.css("marginLeft"),
          marginTop: this.originalElement.css("marginTop"),
          marginRight: this.originalElement.css("marginRight"),
          marginBottom: this.originalElement.css("marginBottom")
        });
        this.originalElement.css({
          marginLeft: 0,
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0
        });
        this.originalResizeStyle = this.originalElement.css("resize");
        this.originalElement.css("resize", "none");
        this._proportionallyResizeElements.push(this.originalElement.css({
          position: "static",
          zoom: 1,
          display: "block"
        }));
        this.originalElement.css({margin: this.originalElement.css("margin")});
        this._proportionallyResize();
      }
      this.handles = o.handles || (!$(".ui-resizable-handle", this.element).length ? "e,s,se" : {
        n: ".ui-resizable-n",
        e: ".ui-resizable-e",
        s: ".ui-resizable-s",
        w: ".ui-resizable-w",
        se: ".ui-resizable-se",
        sw: ".ui-resizable-sw",
        ne: ".ui-resizable-ne",
        nw: ".ui-resizable-nw"
      });
      this._handles = $();
      if (this.handles.constructor === String) {
        if (this.handles === "all") {
          this.handles = "n,e,s,w,se,sw,ne,nw";
        }
        n = this.handles.split(",");
        this.handles = {};
        for (i = 0; i < n.length; i++) {
          handle = $.trim(n[i]);
          hname = "ui-resizable-" + handle;
          axis = $("<div class='ui-resizable-handle " + hname + "'></div>");
          axis.css({zIndex: o.zIndex});
          if ("se" === handle) {
            axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
          }
          this.handles[handle] = ".ui-resizable-" + handle;
          this.element.append(axis);
        }
      }
      this._renderAxis = function(target) {
        var i,
            axis,
            padPos,
            padWrapper;
        target = target || this.element;
        for (i in this.handles) {
          if (this.handles[i].constructor === String) {
            this.handles[i] = this.element.children(this.handles[i]).first().show();
          } else if (this.handles[i].jquery || this.handles[i].nodeType) {
            this.handles[i] = $(this.handles[i]);
            this._on(this.handles[i], {"mousedown": that._mouseDown});
          }
          if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)) {
            axis = $(this.handles[i], this.element);
            padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();
            padPos = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("");
            target.css(padPos, padWrapper);
            this._proportionallyResize();
          }
          this._handles = this._handles.add(this.handles[i]);
        }
      };
      this._renderAxis(this.element);
      this._handles = this._handles.add(this.element.find(".ui-resizable-handle"));
      this._handles.disableSelection();
      this._handles.mouseover(function() {
        if (!that.resizing) {
          if (this.className) {
            axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
          }
          that.axis = axis && axis[1] ? axis[1] : "se";
        }
      });
      if (o.autoHide) {
        this._handles.hide();
        $(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
          if (o.disabled) {
            return;
          }
          $(this).removeClass("ui-resizable-autohide");
          that._handles.show();
        }).mouseleave(function() {
          if (o.disabled) {
            return;
          }
          if (!that.resizing) {
            $(this).addClass("ui-resizable-autohide");
            that._handles.hide();
          }
        });
      }
      this._mouseInit();
    },
    _destroy: function() {
      this._mouseDestroy();
      var wrapper,
          _destroy = function(exp) {
            $(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
          };
      if (this.elementIsWrapper) {
        _destroy(this.element);
        wrapper = this.element;
        this.originalElement.css({
          position: wrapper.css("position"),
          width: wrapper.outerWidth(),
          height: wrapper.outerHeight(),
          top: wrapper.css("top"),
          left: wrapper.css("left")
        }).insertAfter(wrapper);
        wrapper.remove();
      }
      this.originalElement.css("resize", this.originalResizeStyle);
      _destroy(this.originalElement);
      return this;
    },
    _mouseCapture: function(event) {
      var i,
          handle,
          capture = false;
      for (i in this.handles) {
        handle = $(this.handles[i])[0];
        if (handle === event.target || $.contains(handle, event.target)) {
          capture = true;
        }
      }
      return !this.options.disabled && capture;
    },
    _mouseStart: function(event) {
      var curleft,
          curtop,
          cursor,
          o = this.options,
          el = this.element;
      this.resizing = true;
      this._renderProxy();
      curleft = this._num(this.helper.css("left"));
      curtop = this._num(this.helper.css("top"));
      if (o.containment) {
        curleft += $(o.containment).scrollLeft() || 0;
        curtop += $(o.containment).scrollTop() || 0;
      }
      this.offset = this.helper.offset();
      this.position = {
        left: curleft,
        top: curtop
      };
      this.size = this._helper ? {
        width: this.helper.width(),
        height: this.helper.height()
      } : {
        width: el.width(),
        height: el.height()
      };
      this.originalSize = this._helper ? {
        width: el.outerWidth(),
        height: el.outerHeight()
      } : {
        width: el.width(),
        height: el.height()
      };
      this.sizeDiff = {
        width: el.outerWidth() - el.width(),
        height: el.outerHeight() - el.height()
      };
      this.originalPosition = {
        left: curleft,
        top: curtop
      };
      this.originalMousePosition = {
        left: event.pageX,
        top: event.pageY
      };
      this.aspectRatio = (typeof o.aspectRatio === "number") ? o.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
      cursor = $(".ui-resizable-" + this.axis).css("cursor");
      $("body").css("cursor", cursor === "auto" ? this.axis + "-resize" : cursor);
      el.addClass("ui-resizable-resizing");
      this._propagate("start", event);
      return true;
    },
    _mouseDrag: function(event) {
      var data,
          props,
          smp = this.originalMousePosition,
          a = this.axis,
          dx = (event.pageX - smp.left) || 0,
          dy = (event.pageY - smp.top) || 0,
          trigger = this._change[a];
      this._updatePrevProperties();
      if (!trigger) {
        return false;
      }
      data = trigger.apply(this, [event, dx, dy]);
      this._updateVirtualBoundaries(event.shiftKey);
      if (this._aspectRatio || event.shiftKey) {
        data = this._updateRatio(data, event);
      }
      data = this._respectSize(data, event);
      this._updateCache(data);
      this._propagate("resize", event);
      props = this._applyChanges();
      if (!this._helper && this._proportionallyResizeElements.length) {
        this._proportionallyResize();
      }
      if (!$.isEmptyObject(props)) {
        this._updatePrevProperties();
        this._trigger("resize", event, this.ui());
        this._applyChanges();
      }
      return false;
    },
    _mouseStop: function(event) {
      this.resizing = false;
      var pr,
          ista,
          soffseth,
          soffsetw,
          s,
          left,
          top,
          o = this.options,
          that = this;
      if (this._helper) {
        pr = this._proportionallyResizeElements;
        ista = pr.length && (/textarea/i).test(pr[0].nodeName);
        soffseth = ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height;
        soffsetw = ista ? 0 : that.sizeDiff.width;
        s = {
          width: (that.helper.width() - soffsetw),
          height: (that.helper.height() - soffseth)
        };
        left = (parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left)) || null;
        top = (parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top)) || null;
        if (!o.animate) {
          this.element.css($.extend(s, {
            top: top,
            left: left
          }));
        }
        that.helper.height(that.size.height);
        that.helper.width(that.size.width);
        if (this._helper && !o.animate) {
          this._proportionallyResize();
        }
      }
      $("body").css("cursor", "auto");
      this.element.removeClass("ui-resizable-resizing");
      this._propagate("stop", event);
      if (this._helper) {
        this.helper.remove();
      }
      return false;
    },
    _updatePrevProperties: function() {
      this.prevPosition = {
        top: this.position.top,
        left: this.position.left
      };
      this.prevSize = {
        width: this.size.width,
        height: this.size.height
      };
    },
    _applyChanges: function() {
      var props = {};
      if (this.position.top !== this.prevPosition.top) {
        props.top = this.position.top + "px";
      }
      if (this.position.left !== this.prevPosition.left) {
        props.left = this.position.left + "px";
      }
      if (this.size.width !== this.prevSize.width) {
        props.width = this.size.width + "px";
      }
      if (this.size.height !== this.prevSize.height) {
        props.height = this.size.height + "px";
      }
      this.helper.css(props);
      return props;
    },
    _updateVirtualBoundaries: function(forceAspectRatio) {
      var pMinWidth,
          pMaxWidth,
          pMinHeight,
          pMaxHeight,
          b,
          o = this.options;
      b = {
        minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
        maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : Infinity,
        minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
        maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : Infinity
      };
      if (this._aspectRatio || forceAspectRatio) {
        pMinWidth = b.minHeight * this.aspectRatio;
        pMinHeight = b.minWidth / this.aspectRatio;
        pMaxWidth = b.maxHeight * this.aspectRatio;
        pMaxHeight = b.maxWidth / this.aspectRatio;
        if (pMinWidth > b.minWidth) {
          b.minWidth = pMinWidth;
        }
        if (pMinHeight > b.minHeight) {
          b.minHeight = pMinHeight;
        }
        if (pMaxWidth < b.maxWidth) {
          b.maxWidth = pMaxWidth;
        }
        if (pMaxHeight < b.maxHeight) {
          b.maxHeight = pMaxHeight;
        }
      }
      this._vBoundaries = b;
    },
    _updateCache: function(data) {
      this.offset = this.helper.offset();
      if (this._isNumber(data.left)) {
        this.position.left = data.left;
      }
      if (this._isNumber(data.top)) {
        this.position.top = data.top;
      }
      if (this._isNumber(data.height)) {
        this.size.height = data.height;
      }
      if (this._isNumber(data.width)) {
        this.size.width = data.width;
      }
    },
    _updateRatio: function(data) {
      var cpos = this.position,
          csize = this.size,
          a = this.axis;
      if (this._isNumber(data.height)) {
        data.width = (data.height * this.aspectRatio);
      } else if (this._isNumber(data.width)) {
        data.height = (data.width / this.aspectRatio);
      }
      if (a === "sw") {
        data.left = cpos.left + (csize.width - data.width);
        data.top = null;
      }
      if (a === "nw") {
        data.top = cpos.top + (csize.height - data.height);
        data.left = cpos.left + (csize.width - data.width);
      }
      return data;
    },
    _respectSize: function(data) {
      var o = this._vBoundaries,
          a = this.axis,
          ismaxw = this._isNumber(data.width) && o.maxWidth && (o.maxWidth < data.width),
          ismaxh = this._isNumber(data.height) && o.maxHeight && (o.maxHeight < data.height),
          isminw = this._isNumber(data.width) && o.minWidth && (o.minWidth > data.width),
          isminh = this._isNumber(data.height) && o.minHeight && (o.minHeight > data.height),
          dw = this.originalPosition.left + this.originalSize.width,
          dh = this.position.top + this.size.height,
          cw = /sw|nw|w/.test(a),
          ch = /nw|ne|n/.test(a);
      if (isminw) {
        data.width = o.minWidth;
      }
      if (isminh) {
        data.height = o.minHeight;
      }
      if (ismaxw) {
        data.width = o.maxWidth;
      }
      if (ismaxh) {
        data.height = o.maxHeight;
      }
      if (isminw && cw) {
        data.left = dw - o.minWidth;
      }
      if (ismaxw && cw) {
        data.left = dw - o.maxWidth;
      }
      if (isminh && ch) {
        data.top = dh - o.minHeight;
      }
      if (ismaxh && ch) {
        data.top = dh - o.maxHeight;
      }
      if (!data.width && !data.height && !data.left && data.top) {
        data.top = null;
      } else if (!data.width && !data.height && !data.top && data.left) {
        data.left = null;
      }
      return data;
    },
    _getPaddingPlusBorderDimensions: function(element) {
      var i = 0,
          widths = [],
          borders = [element.css("borderTopWidth"), element.css("borderRightWidth"), element.css("borderBottomWidth"), element.css("borderLeftWidth")],
          paddings = [element.css("paddingTop"), element.css("paddingRight"), element.css("paddingBottom"), element.css("paddingLeft")];
      for (; i < 4; i++) {
        widths[i] = (parseInt(borders[i], 10) || 0);
        widths[i] += (parseInt(paddings[i], 10) || 0);
      }
      return {
        height: widths[0] + widths[2],
        width: widths[1] + widths[3]
      };
    },
    _proportionallyResize: function() {
      if (!this._proportionallyResizeElements.length) {
        return;
      }
      var prel,
          i = 0,
          element = this.helper || this.element;
      for (; i < this._proportionallyResizeElements.length; i++) {
        prel = this._proportionallyResizeElements[i];
        if (!this.outerDimensions) {
          this.outerDimensions = this._getPaddingPlusBorderDimensions(prel);
        }
        prel.css({
          height: (element.height() - this.outerDimensions.height) || 0,
          width: (element.width() - this.outerDimensions.width) || 0
        });
      }
    },
    _renderProxy: function() {
      var el = this.element,
          o = this.options;
      this.elementOffset = el.offset();
      if (this._helper) {
        this.helper = this.helper || $("<div style='overflow:hidden;'></div>");
        this.helper.addClass(this._helper).css({
          width: this.element.outerWidth() - 1,
          height: this.element.outerHeight() - 1,
          position: "absolute",
          left: this.elementOffset.left + "px",
          top: this.elementOffset.top + "px",
          zIndex: ++o.zIndex
        });
        this.helper.appendTo("body").disableSelection();
      } else {
        this.helper = this.element;
      }
    },
    _change: {
      e: function(event, dx) {
        return {width: this.originalSize.width + dx};
      },
      w: function(event, dx) {
        var cs = this.originalSize,
            sp = this.originalPosition;
        return {
          left: sp.left + dx,
          width: cs.width - dx
        };
      },
      n: function(event, dx, dy) {
        var cs = this.originalSize,
            sp = this.originalPosition;
        return {
          top: sp.top + dy,
          height: cs.height - dy
        };
      },
      s: function(event, dx, dy) {
        return {height: this.originalSize.height + dy};
      },
      se: function(event, dx, dy) {
        return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
      },
      sw: function(event, dx, dy) {
        return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
      },
      ne: function(event, dx, dy) {
        return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
      },
      nw: function(event, dx, dy) {
        return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
      }
    },
    _propagate: function(n, event) {
      $.ui.plugin.call(this, n, [event, this.ui()]);
      (n !== "resize" && this._trigger(n, event, this.ui()));
    },
    plugins: {},
    ui: function() {
      return {
        originalElement: this.originalElement,
        element: this.element,
        helper: this.helper,
        position: this.position,
        size: this.size,
        originalSize: this.originalSize,
        originalPosition: this.originalPosition
      };
    }
  });
  $.ui.plugin.add("resizable", "animate", {stop: function(event) {
      var that = $(this).resizable("instance"),
          o = that.options,
          pr = that._proportionallyResizeElements,
          ista = pr.length && (/textarea/i).test(pr[0].nodeName),
          soffseth = ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height,
          soffsetw = ista ? 0 : that.sizeDiff.width,
          style = {
            width: (that.size.width - soffsetw),
            height: (that.size.height - soffseth)
          },
          left = (parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left)) || null,
          top = (parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top)) || null;
      that.element.animate($.extend(style, top && left ? {
        top: top,
        left: left
      } : {}), {
        duration: o.animateDuration,
        easing: o.animateEasing,
        step: function() {
          var data = {
            width: parseInt(that.element.css("width"), 10),
            height: parseInt(that.element.css("height"), 10),
            top: parseInt(that.element.css("top"), 10),
            left: parseInt(that.element.css("left"), 10)
          };
          if (pr && pr.length) {
            $(pr[0]).css({
              width: data.width,
              height: data.height
            });
          }
          that._updateCache(data);
          that._propagate("resize", event);
        }
      });
    }});
  $.ui.plugin.add("resizable", "containment", {
    start: function() {
      var element,
          p,
          co,
          ch,
          cw,
          width,
          height,
          that = $(this).resizable("instance"),
          o = that.options,
          el = that.element,
          oc = o.containment,
          ce = (oc instanceof $) ? oc.get(0) : (/parent/.test(oc)) ? el.parent().get(0) : oc;
      if (!ce) {
        return;
      }
      that.containerElement = $(ce);
      if (/document/.test(oc) || oc === document) {
        that.containerOffset = {
          left: 0,
          top: 0
        };
        that.containerPosition = {
          left: 0,
          top: 0
        };
        that.parentData = {
          element: $(document),
          left: 0,
          top: 0,
          width: $(document).width(),
          height: $(document).height() || document.body.parentNode.scrollHeight
        };
      } else {
        element = $(ce);
        p = [];
        $(["Top", "Right", "Left", "Bottom"]).each(function(i, name) {
          p[i] = that._num(element.css("padding" + name));
        });
        that.containerOffset = element.offset();
        that.containerPosition = element.position();
        that.containerSize = {
          height: (element.innerHeight() - p[3]),
          width: (element.innerWidth() - p[1])
        };
        co = that.containerOffset;
        ch = that.containerSize.height;
        cw = that.containerSize.width;
        width = (that._hasScroll(ce, "left") ? ce.scrollWidth : cw);
        height = (that._hasScroll(ce) ? ce.scrollHeight : ch);
        that.parentData = {
          element: ce,
          left: co.left,
          top: co.top,
          width: width,
          height: height
        };
      }
    },
    resize: function(event) {
      var woset,
          hoset,
          isParent,
          isOffsetRelative,
          that = $(this).resizable("instance"),
          o = that.options,
          co = that.containerOffset,
          cp = that.position,
          pRatio = that._aspectRatio || event.shiftKey,
          cop = {
            top: 0,
            left: 0
          },
          ce = that.containerElement,
          continueResize = true;
      if (ce[0] !== document && (/static/).test(ce.css("position"))) {
        cop = co;
      }
      if (cp.left < (that._helper ? co.left : 0)) {
        that.size.width = that.size.width + (that._helper ? (that.position.left - co.left) : (that.position.left - cop.left));
        if (pRatio) {
          that.size.height = that.size.width / that.aspectRatio;
          continueResize = false;
        }
        that.position.left = o.helper ? co.left : 0;
      }
      if (cp.top < (that._helper ? co.top : 0)) {
        that.size.height = that.size.height + (that._helper ? (that.position.top - co.top) : that.position.top);
        if (pRatio) {
          that.size.width = that.size.height * that.aspectRatio;
          continueResize = false;
        }
        that.position.top = that._helper ? co.top : 0;
      }
      isParent = that.containerElement.get(0) === that.element.parent().get(0);
      isOffsetRelative = /relative|absolute/.test(that.containerElement.css("position"));
      if (isParent && isOffsetRelative) {
        that.offset.left = that.parentData.left + that.position.left;
        that.offset.top = that.parentData.top + that.position.top;
      } else {
        that.offset.left = that.element.offset().left;
        that.offset.top = that.element.offset().top;
      }
      woset = Math.abs(that.sizeDiff.width + (that._helper ? that.offset.left - cop.left : (that.offset.left - co.left)));
      hoset = Math.abs(that.sizeDiff.height + (that._helper ? that.offset.top - cop.top : (that.offset.top - co.top)));
      if (woset + that.size.width >= that.parentData.width) {
        that.size.width = that.parentData.width - woset;
        if (pRatio) {
          that.size.height = that.size.width / that.aspectRatio;
          continueResize = false;
        }
      }
      if (hoset + that.size.height >= that.parentData.height) {
        that.size.height = that.parentData.height - hoset;
        if (pRatio) {
          that.size.width = that.size.height * that.aspectRatio;
          continueResize = false;
        }
      }
      if (!continueResize) {
        that.position.left = that.prevPosition.left;
        that.position.top = that.prevPosition.top;
        that.size.width = that.prevSize.width;
        that.size.height = that.prevSize.height;
      }
    },
    stop: function() {
      var that = $(this).resizable("instance"),
          o = that.options,
          co = that.containerOffset,
          cop = that.containerPosition,
          ce = that.containerElement,
          helper = $(that.helper),
          ho = helper.offset(),
          w = helper.outerWidth() - that.sizeDiff.width,
          h = helper.outerHeight() - that.sizeDiff.height;
      if (that._helper && !o.animate && (/relative/).test(ce.css("position"))) {
        $(this).css({
          left: ho.left - cop.left - co.left,
          width: w,
          height: h
        });
      }
      if (that._helper && !o.animate && (/static/).test(ce.css("position"))) {
        $(this).css({
          left: ho.left - cop.left - co.left,
          width: w,
          height: h
        });
      }
    }
  });
  $.ui.plugin.add("resizable", "alsoResize", {
    start: function() {
      var that = $(this).resizable("instance"),
          o = that.options;
      $(o.alsoResize).each(function() {
        var el = $(this);
        el.data("ui-resizable-alsoresize", {
          width: parseInt(el.width(), 10),
          height: parseInt(el.height(), 10),
          left: parseInt(el.css("left"), 10),
          top: parseInt(el.css("top"), 10)
        });
      });
    },
    resize: function(event, ui) {
      var that = $(this).resizable("instance"),
          o = that.options,
          os = that.originalSize,
          op = that.originalPosition,
          delta = {
            height: (that.size.height - os.height) || 0,
            width: (that.size.width - os.width) || 0,
            top: (that.position.top - op.top) || 0,
            left: (that.position.left - op.left) || 0
          };
      $(o.alsoResize).each(function() {
        var el = $(this),
            start = $(this).data("ui-resizable-alsoresize"),
            style = {},
            css = el.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
        $.each(css, function(i, prop) {
          var sum = (start[prop] || 0) + (delta[prop] || 0);
          if (sum && sum >= 0) {
            style[prop] = sum || null;
          }
        });
        el.css(style);
      });
    },
    stop: function() {
      $(this).removeData("resizable-alsoresize");
    }
  });
  $.ui.plugin.add("resizable", "ghost", {
    start: function() {
      var that = $(this).resizable("instance"),
          o = that.options,
          cs = that.size;
      that.ghost = that.originalElement.clone();
      that.ghost.css({
        opacity: 0.25,
        display: "block",
        position: "relative",
        height: cs.height,
        width: cs.width,
        margin: 0,
        left: 0,
        top: 0
      }).addClass("ui-resizable-ghost").addClass(typeof o.ghost === "string" ? o.ghost : "");
      that.ghost.appendTo(that.helper);
    },
    resize: function() {
      var that = $(this).resizable("instance");
      if (that.ghost) {
        that.ghost.css({
          position: "relative",
          height: that.size.height,
          width: that.size.width
        });
      }
    },
    stop: function() {
      var that = $(this).resizable("instance");
      if (that.ghost && that.helper) {
        that.helper.get(0).removeChild(that.ghost.get(0));
      }
    }
  });
  $.ui.plugin.add("resizable", "grid", {resize: function() {
      var outerDimensions,
          that = $(this).resizable("instance"),
          o = that.options,
          cs = that.size,
          os = that.originalSize,
          op = that.originalPosition,
          a = that.axis,
          grid = typeof o.grid === "number" ? [o.grid, o.grid] : o.grid,
          gridX = (grid[0] || 1),
          gridY = (grid[1] || 1),
          ox = Math.round((cs.width - os.width) / gridX) * gridX,
          oy = Math.round((cs.height - os.height) / gridY) * gridY,
          newWidth = os.width + ox,
          newHeight = os.height + oy,
          isMaxWidth = o.maxWidth && (o.maxWidth < newWidth),
          isMaxHeight = o.maxHeight && (o.maxHeight < newHeight),
          isMinWidth = o.minWidth && (o.minWidth > newWidth),
          isMinHeight = o.minHeight && (o.minHeight > newHeight);
      o.grid = grid;
      if (isMinWidth) {
        newWidth += gridX;
      }
      if (isMinHeight) {
        newHeight += gridY;
      }
      if (isMaxWidth) {
        newWidth -= gridX;
      }
      if (isMaxHeight) {
        newHeight -= gridY;
      }
      if (/^(se|s|e)$/.test(a)) {
        that.size.width = newWidth;
        that.size.height = newHeight;
      } else if (/^(ne)$/.test(a)) {
        that.size.width = newWidth;
        that.size.height = newHeight;
        that.position.top = op.top - oy;
      } else if (/^(sw)$/.test(a)) {
        that.size.width = newWidth;
        that.size.height = newHeight;
        that.position.left = op.left - ox;
      } else {
        if (newHeight - gridY <= 0 || newWidth - gridX <= 0) {
          outerDimensions = that._getPaddingPlusBorderDimensions(this);
        }
        if (newHeight - gridY > 0) {
          that.size.height = newHeight;
          that.position.top = op.top - oy;
        } else {
          newHeight = gridY - outerDimensions.height;
          that.size.height = newHeight;
          that.position.top = op.top + os.height - newHeight;
        }
        if (newWidth - gridX > 0) {
          that.size.width = newWidth;
          that.position.left = op.left - ox;
        } else {
          newWidth = gridX - outerDimensions.width;
          that.size.width = newWidth;
          that.position.left = op.left + os.width - newWidth;
        }
      }
    }});
  return $.ui.resizable;
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("11", ["3", "c", "d", "e"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.widget("ui.selectable", $.ui.mouse, {
    version: "1.11.4",
    options: {
      appendTo: "body",
      autoRefresh: true,
      distance: 0,
      filter: "*",
      tolerance: "touch",
      selected: null,
      selecting: null,
      start: null,
      stop: null,
      unselected: null,
      unselecting: null
    },
    _create: function() {
      var selectees,
          that = this;
      this.element.addClass("ui-selectable");
      this.dragged = false;
      this.refresh = function() {
        selectees = $(that.options.filter, that.element[0]);
        selectees.addClass("ui-selectee");
        selectees.each(function() {
          var $this = $(this),
              pos = $this.offset();
          $.data(this, "selectable-item", {
            element: this,
            $element: $this,
            left: pos.left,
            top: pos.top,
            right: pos.left + $this.outerWidth(),
            bottom: pos.top + $this.outerHeight(),
            startselected: false,
            selected: $this.hasClass("ui-selected"),
            selecting: $this.hasClass("ui-selecting"),
            unselecting: $this.hasClass("ui-unselecting")
          });
        });
      };
      this.refresh();
      this.selectees = selectees.addClass("ui-selectee");
      this._mouseInit();
      this.helper = $("<div class='ui-selectable-helper'></div>");
    },
    _destroy: function() {
      this.selectees.removeClass("ui-selectee").removeData("selectable-item");
      this.element.removeClass("ui-selectable ui-selectable-disabled");
      this._mouseDestroy();
    },
    _mouseStart: function(event) {
      var that = this,
          options = this.options;
      this.opos = [event.pageX, event.pageY];
      if (this.options.disabled) {
        return;
      }
      this.selectees = $(options.filter, this.element[0]);
      this._trigger("start", event);
      $(options.appendTo).append(this.helper);
      this.helper.css({
        "left": event.pageX,
        "top": event.pageY,
        "width": 0,
        "height": 0
      });
      if (options.autoRefresh) {
        this.refresh();
      }
      this.selectees.filter(".ui-selected").each(function() {
        var selectee = $.data(this, "selectable-item");
        selectee.startselected = true;
        if (!event.metaKey && !event.ctrlKey) {
          selectee.$element.removeClass("ui-selected");
          selectee.selected = false;
          selectee.$element.addClass("ui-unselecting");
          selectee.unselecting = true;
          that._trigger("unselecting", event, {unselecting: selectee.element});
        }
      });
      $(event.target).parents().addBack().each(function() {
        var doSelect,
            selectee = $.data(this, "selectable-item");
        if (selectee) {
          doSelect = (!event.metaKey && !event.ctrlKey) || !selectee.$element.hasClass("ui-selected");
          selectee.$element.removeClass(doSelect ? "ui-unselecting" : "ui-selected").addClass(doSelect ? "ui-selecting" : "ui-unselecting");
          selectee.unselecting = !doSelect;
          selectee.selecting = doSelect;
          selectee.selected = doSelect;
          if (doSelect) {
            that._trigger("selecting", event, {selecting: selectee.element});
          } else {
            that._trigger("unselecting", event, {unselecting: selectee.element});
          }
          return false;
        }
      });
    },
    _mouseDrag: function(event) {
      this.dragged = true;
      if (this.options.disabled) {
        return;
      }
      var tmp,
          that = this,
          options = this.options,
          x1 = this.opos[0],
          y1 = this.opos[1],
          x2 = event.pageX,
          y2 = event.pageY;
      if (x1 > x2) {
        tmp = x2;
        x2 = x1;
        x1 = tmp;
      }
      if (y1 > y2) {
        tmp = y2;
        y2 = y1;
        y1 = tmp;
      }
      this.helper.css({
        left: x1,
        top: y1,
        width: x2 - x1,
        height: y2 - y1
      });
      this.selectees.each(function() {
        var selectee = $.data(this, "selectable-item"),
            hit = false;
        if (!selectee || selectee.element === that.element[0]) {
          return;
        }
        if (options.tolerance === "touch") {
          hit = (!(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1));
        } else if (options.tolerance === "fit") {
          hit = (selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2);
        }
        if (hit) {
          if (selectee.selected) {
            selectee.$element.removeClass("ui-selected");
            selectee.selected = false;
          }
          if (selectee.unselecting) {
            selectee.$element.removeClass("ui-unselecting");
            selectee.unselecting = false;
          }
          if (!selectee.selecting) {
            selectee.$element.addClass("ui-selecting");
            selectee.selecting = true;
            that._trigger("selecting", event, {selecting: selectee.element});
          }
        } else {
          if (selectee.selecting) {
            if ((event.metaKey || event.ctrlKey) && selectee.startselected) {
              selectee.$element.removeClass("ui-selecting");
              selectee.selecting = false;
              selectee.$element.addClass("ui-selected");
              selectee.selected = true;
            } else {
              selectee.$element.removeClass("ui-selecting");
              selectee.selecting = false;
              if (selectee.startselected) {
                selectee.$element.addClass("ui-unselecting");
                selectee.unselecting = true;
              }
              that._trigger("unselecting", event, {unselecting: selectee.element});
            }
          }
          if (selectee.selected) {
            if (!event.metaKey && !event.ctrlKey && !selectee.startselected) {
              selectee.$element.removeClass("ui-selected");
              selectee.selected = false;
              selectee.$element.addClass("ui-unselecting");
              selectee.unselecting = true;
              that._trigger("unselecting", event, {unselecting: selectee.element});
            }
          }
        }
      });
      return false;
    },
    _mouseStop: function(event) {
      var that = this;
      this.dragged = false;
      $(".ui-unselecting", this.element[0]).each(function() {
        var selectee = $.data(this, "selectable-item");
        selectee.$element.removeClass("ui-unselecting");
        selectee.unselecting = false;
        selectee.startselected = false;
        that._trigger("unselected", event, {unselected: selectee.element});
      });
      $(".ui-selecting", this.element[0]).each(function() {
        var selectee = $.data(this, "selectable-item");
        selectee.$element.removeClass("ui-selecting").addClass("ui-selected");
        selectee.selecting = false;
        selectee.selected = true;
        selectee.startselected = true;
        that._trigger("selected", event, {selected: selectee.element});
      });
      this._trigger("stop", event);
      this.helper.remove();
      return false;
    }
  });
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("12", ["3", "c", "d", "e"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.widget("ui.sortable", $.ui.mouse, {
    version: "1.11.4",
    widgetEventPrefix: "sort",
    ready: false,
    options: {
      appendTo: "parent",
      axis: false,
      connectWith: false,
      containment: false,
      cursor: "auto",
      cursorAt: false,
      dropOnEmpty: true,
      forcePlaceholderSize: false,
      forceHelperSize: false,
      grid: false,
      handle: false,
      helper: "original",
      items: "> *",
      opacity: false,
      placeholder: false,
      revert: false,
      scroll: true,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      scope: "default",
      tolerance: "intersect",
      zIndex: 1000,
      activate: null,
      beforeStop: null,
      change: null,
      deactivate: null,
      out: null,
      over: null,
      receive: null,
      remove: null,
      sort: null,
      start: null,
      stop: null,
      update: null
    },
    _isOverAxis: function(x, reference, size) {
      return (x >= reference) && (x < (reference + size));
    },
    _isFloating: function(item) {
      return (/left|right/).test(item.css("float")) || (/inline|table-cell/).test(item.css("display"));
    },
    _create: function() {
      this.containerCache = {};
      this.element.addClass("ui-sortable");
      this.refresh();
      this.offset = this.element.offset();
      this._mouseInit();
      this._setHandleClassName();
      this.ready = true;
    },
    _setOption: function(key, value) {
      this._super(key, value);
      if (key === "handle") {
        this._setHandleClassName();
      }
    },
    _setHandleClassName: function() {
      this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle");
      $.each(this.items, function() {
        (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle");
      });
    },
    _destroy: function() {
      this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle");
      this._mouseDestroy();
      for (var i = this.items.length - 1; i >= 0; i--) {
        this.items[i].item.removeData(this.widgetName + "-item");
      }
      return this;
    },
    _mouseCapture: function(event, overrideHandle) {
      var currentItem = null,
          validHandle = false,
          that = this;
      if (this.reverting) {
        return false;
      }
      if (this.options.disabled || this.options.type === "static") {
        return false;
      }
      this._refreshItems(event);
      $(event.target).parents().each(function() {
        if ($.data(this, that.widgetName + "-item") === that) {
          currentItem = $(this);
          return false;
        }
      });
      if ($.data(event.target, that.widgetName + "-item") === that) {
        currentItem = $(event.target);
      }
      if (!currentItem) {
        return false;
      }
      if (this.options.handle && !overrideHandle) {
        $(this.options.handle, currentItem).find("*").addBack().each(function() {
          if (this === event.target) {
            validHandle = true;
          }
        });
        if (!validHandle) {
          return false;
        }
      }
      this.currentItem = currentItem;
      this._removeCurrentsFromItems();
      return true;
    },
    _mouseStart: function(event, overrideHandle, noActivation) {
      var i,
          body,
          o = this.options;
      this.currentContainer = this;
      this.refreshPositions();
      this.helper = this._createHelper(event);
      this._cacheHelperProportions();
      this._cacheMargins();
      this.scrollParent = this.helper.scrollParent();
      this.offset = this.currentItem.offset();
      this.offset = {
        top: this.offset.top - this.margins.top,
        left: this.offset.left - this.margins.left
      };
      $.extend(this.offset, {
        click: {
          left: event.pageX - this.offset.left,
          top: event.pageY - this.offset.top
        },
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      });
      this.helper.css("position", "absolute");
      this.cssPosition = this.helper.css("position");
      this.originalPosition = this._generatePosition(event);
      this.originalPageX = event.pageX;
      this.originalPageY = event.pageY;
      (o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));
      this.domPosition = {
        prev: this.currentItem.prev()[0],
        parent: this.currentItem.parent()[0]
      };
      if (this.helper[0] !== this.currentItem[0]) {
        this.currentItem.hide();
      }
      this._createPlaceholder();
      if (o.containment) {
        this._setContainment();
      }
      if (o.cursor && o.cursor !== "auto") {
        body = this.document.find("body");
        this.storedCursor = body.css("cursor");
        body.css("cursor", o.cursor);
        this.storedStylesheet = $("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(body);
      }
      if (o.opacity) {
        if (this.helper.css("opacity")) {
          this._storedOpacity = this.helper.css("opacity");
        }
        this.helper.css("opacity", o.opacity);
      }
      if (o.zIndex) {
        if (this.helper.css("zIndex")) {
          this._storedZIndex = this.helper.css("zIndex");
        }
        this.helper.css("zIndex", o.zIndex);
      }
      if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
        this.overflowOffset = this.scrollParent.offset();
      }
      this._trigger("start", event, this._uiHash());
      if (!this._preserveHelperProportions) {
        this._cacheHelperProportions();
      }
      if (!noActivation) {
        for (i = this.containers.length - 1; i >= 0; i--) {
          this.containers[i]._trigger("activate", event, this._uiHash(this));
        }
      }
      if ($.ui.ddmanager) {
        $.ui.ddmanager.current = this;
      }
      if ($.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(this, event);
      }
      this.dragging = true;
      this.helper.addClass("ui-sortable-helper");
      this._mouseDrag(event);
      return true;
    },
    _mouseDrag: function(event) {
      var i,
          item,
          itemElement,
          intersection,
          o = this.options,
          scrolled = false;
      this.position = this._generatePosition(event);
      this.positionAbs = this._convertPositionTo("absolute");
      if (!this.lastPositionAbs) {
        this.lastPositionAbs = this.positionAbs;
      }
      if (this.options.scroll) {
        if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
          if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
            this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
          } else if (event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
            this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
          }
          if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
            this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
          } else if (event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
            this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
          }
        } else {
          if (event.pageY - this.document.scrollTop() < o.scrollSensitivity) {
            scrolled = this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed);
          } else if (this.window.height() - (event.pageY - this.document.scrollTop()) < o.scrollSensitivity) {
            scrolled = this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed);
          }
          if (event.pageX - this.document.scrollLeft() < o.scrollSensitivity) {
            scrolled = this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed);
          } else if (this.window.width() - (event.pageX - this.document.scrollLeft()) < o.scrollSensitivity) {
            scrolled = this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed);
          }
        }
        if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
          $.ui.ddmanager.prepareOffsets(this, event);
        }
      }
      this.positionAbs = this._convertPositionTo("absolute");
      if (!this.options.axis || this.options.axis !== "y") {
        this.helper[0].style.left = this.position.left + "px";
      }
      if (!this.options.axis || this.options.axis !== "x") {
        this.helper[0].style.top = this.position.top + "px";
      }
      for (i = this.items.length - 1; i >= 0; i--) {
        item = this.items[i];
        itemElement = item.item[0];
        intersection = this._intersectsWithPointer(item);
        if (!intersection) {
          continue;
        }
        if (item.instance !== this.currentContainer) {
          continue;
        }
        if (itemElement !== this.currentItem[0] && this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !== itemElement && !$.contains(this.placeholder[0], itemElement) && (this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)) {
          this.direction = intersection === 1 ? "down" : "up";
          if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {
            this._rearrange(event, item);
          } else {
            break;
          }
          this._trigger("change", event, this._uiHash());
          break;
        }
      }
      this._contactContainers(event);
      if ($.ui.ddmanager) {
        $.ui.ddmanager.drag(this, event);
      }
      this._trigger("sort", event, this._uiHash());
      this.lastPositionAbs = this.positionAbs;
      return false;
    },
    _mouseStop: function(event, noPropagation) {
      if (!event) {
        return;
      }
      if ($.ui.ddmanager && !this.options.dropBehaviour) {
        $.ui.ddmanager.drop(this, event);
      }
      if (this.options.revert) {
        var that = this,
            cur = this.placeholder.offset(),
            axis = this.options.axis,
            animation = {};
        if (!axis || axis === "x") {
          animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft);
        }
        if (!axis || axis === "y") {
          animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop);
        }
        this.reverting = true;
        $(this.helper).animate(animation, parseInt(this.options.revert, 10) || 500, function() {
          that._clear(event);
        });
      } else {
        this._clear(event, noPropagation);
      }
      return false;
    },
    cancel: function() {
      if (this.dragging) {
        this._mouseUp({target: null});
        if (this.options.helper === "original") {
          this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
        } else {
          this.currentItem.show();
        }
        for (var i = this.containers.length - 1; i >= 0; i--) {
          this.containers[i]._trigger("deactivate", null, this._uiHash(this));
          if (this.containers[i].containerCache.over) {
            this.containers[i]._trigger("out", null, this._uiHash(this));
            this.containers[i].containerCache.over = 0;
          }
        }
      }
      if (this.placeholder) {
        if (this.placeholder[0].parentNode) {
          this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
        }
        if (this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
          this.helper.remove();
        }
        $.extend(this, {
          helper: null,
          dragging: false,
          reverting: false,
          _noFinalSort: null
        });
        if (this.domPosition.prev) {
          $(this.domPosition.prev).after(this.currentItem);
        } else {
          $(this.domPosition.parent).prepend(this.currentItem);
        }
      }
      return this;
    },
    serialize: function(o) {
      var items = this._getItemsAsjQuery(o && o.connected),
          str = [];
      o = o || {};
      $(items).each(function() {
        var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || (/(.+)[\-=_](.+)/));
        if (res) {
          str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]));
        }
      });
      if (!str.length && o.key) {
        str.push(o.key + "=");
      }
      return str.join("&");
    },
    toArray: function(o) {
      var items = this._getItemsAsjQuery(o && o.connected),
          ret = [];
      o = o || {};
      items.each(function() {
        ret.push($(o.item || this).attr(o.attribute || "id") || "");
      });
      return ret;
    },
    _intersectsWith: function(item) {
      var x1 = this.positionAbs.left,
          x2 = x1 + this.helperProportions.width,
          y1 = this.positionAbs.top,
          y2 = y1 + this.helperProportions.height,
          l = item.left,
          r = l + item.width,
          t = item.top,
          b = t + item.height,
          dyClick = this.offset.click.top,
          dxClick = this.offset.click.left,
          isOverElementHeight = (this.options.axis === "x") || ((y1 + dyClick) > t && (y1 + dyClick) < b),
          isOverElementWidth = (this.options.axis === "y") || ((x1 + dxClick) > l && (x1 + dxClick) < r),
          isOverElement = isOverElementHeight && isOverElementWidth;
      if (this.options.tolerance === "pointer" || this.options.forcePointerForContainers || (this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"])) {
        return isOverElement;
      } else {
        return (l < x1 + (this.helperProportions.width / 2) && x2 - (this.helperProportions.width / 2) < r && t < y1 + (this.helperProportions.height / 2) && y2 - (this.helperProportions.height / 2) < b);
      }
    },
    _intersectsWithPointer: function(item) {
      var isOverElementHeight = (this.options.axis === "x") || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
          isOverElementWidth = (this.options.axis === "y") || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
          isOverElement = isOverElementHeight && isOverElementWidth,
          verticalDirection = this._getDragVerticalDirection(),
          horizontalDirection = this._getDragHorizontalDirection();
      if (!isOverElement) {
        return false;
      }
      return this.floating ? (((horizontalDirection && horizontalDirection === "right") || verticalDirection === "down") ? 2 : 1) : (verticalDirection && (verticalDirection === "down" ? 2 : 1));
    },
    _intersectsWithSides: function(item) {
      var isOverBottomHalf = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height / 2), item.height),
          isOverRightHalf = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width / 2), item.width),
          verticalDirection = this._getDragVerticalDirection(),
          horizontalDirection = this._getDragHorizontalDirection();
      if (this.floating && horizontalDirection) {
        return ((horizontalDirection === "right" && isOverRightHalf) || (horizontalDirection === "left" && !isOverRightHalf));
      } else {
        return verticalDirection && ((verticalDirection === "down" && isOverBottomHalf) || (verticalDirection === "up" && !isOverBottomHalf));
      }
    },
    _getDragVerticalDirection: function() {
      var delta = this.positionAbs.top - this.lastPositionAbs.top;
      return delta !== 0 && (delta > 0 ? "down" : "up");
    },
    _getDragHorizontalDirection: function() {
      var delta = this.positionAbs.left - this.lastPositionAbs.left;
      return delta !== 0 && (delta > 0 ? "right" : "left");
    },
    refresh: function(event) {
      this._refreshItems(event);
      this._setHandleClassName();
      this.refreshPositions();
      return this;
    },
    _connectWith: function() {
      var options = this.options;
      return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
    },
    _getItemsAsjQuery: function(connected) {
      var i,
          j,
          cur,
          inst,
          items = [],
          queries = [],
          connectWith = this._connectWith();
      if (connectWith && connected) {
        for (i = connectWith.length - 1; i >= 0; i--) {
          cur = $(connectWith[i], this.document[0]);
          for (j = cur.length - 1; j >= 0; j--) {
            inst = $.data(cur[j], this.widgetFullName);
            if (inst && inst !== this && !inst.options.disabled) {
              queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
            }
          }
        }
      }
      queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
        options: this.options,
        item: this.currentItem
      }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
      function addItems() {
        items.push(this);
      }
      for (i = queries.length - 1; i >= 0; i--) {
        queries[i][0].each(addItems);
      }
      return $(items);
    },
    _removeCurrentsFromItems: function() {
      var list = this.currentItem.find(":data(" + this.widgetName + "-item)");
      this.items = $.grep(this.items, function(item) {
        for (var j = 0; j < list.length; j++) {
          if (list[j] === item.item[0]) {
            return false;
          }
        }
        return true;
      });
    },
    _refreshItems: function(event) {
      this.items = [];
      this.containers = [this];
      var i,
          j,
          cur,
          inst,
          targetData,
          _queries,
          item,
          queriesLength,
          items = this.items,
          queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {item: this.currentItem}) : $(this.options.items, this.element), this]],
          connectWith = this._connectWith();
      if (connectWith && this.ready) {
        for (i = connectWith.length - 1; i >= 0; i--) {
          cur = $(connectWith[i], this.document[0]);
          for (j = cur.length - 1; j >= 0; j--) {
            inst = $.data(cur[j], this.widgetFullName);
            if (inst && inst !== this && !inst.options.disabled) {
              queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {item: this.currentItem}) : $(inst.options.items, inst.element), inst]);
              this.containers.push(inst);
            }
          }
        }
      }
      for (i = queries.length - 1; i >= 0; i--) {
        targetData = queries[i][1];
        _queries = queries[i][0];
        for (j = 0, queriesLength = _queries.length; j < queriesLength; j++) {
          item = $(_queries[j]);
          item.data(this.widgetName + "-item", targetData);
          items.push({
            item: item,
            instance: targetData,
            width: 0,
            height: 0,
            left: 0,
            top: 0
          });
        }
      }
    },
    refreshPositions: function(fast) {
      this.floating = this.items.length ? this.options.axis === "x" || this._isFloating(this.items[0].item) : false;
      if (this.offsetParent && this.helper) {
        this.offset.parent = this._getParentOffset();
      }
      var i,
          item,
          t,
          p;
      for (i = this.items.length - 1; i >= 0; i--) {
        item = this.items[i];
        if (item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {
          continue;
        }
        t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;
        if (!fast) {
          item.width = t.outerWidth();
          item.height = t.outerHeight();
        }
        p = t.offset();
        item.left = p.left;
        item.top = p.top;
      }
      if (this.options.custom && this.options.custom.refreshContainers) {
        this.options.custom.refreshContainers.call(this);
      } else {
        for (i = this.containers.length - 1; i >= 0; i--) {
          p = this.containers[i].element.offset();
          this.containers[i].containerCache.left = p.left;
          this.containers[i].containerCache.top = p.top;
          this.containers[i].containerCache.width = this.containers[i].element.outerWidth();
          this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
        }
      }
      return this;
    },
    _createPlaceholder: function(that) {
      that = that || this;
      var className,
          o = that.options;
      if (!o.placeholder || o.placeholder.constructor === String) {
        className = o.placeholder;
        o.placeholder = {
          element: function() {
            var nodeName = that.currentItem[0].nodeName.toLowerCase(),
                element = $("<" + nodeName + ">", that.document[0]).addClass(className || that.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
            if (nodeName === "tbody") {
              that._createTrPlaceholder(that.currentItem.find("tr").eq(0), $("<tr>", that.document[0]).appendTo(element));
            } else if (nodeName === "tr") {
              that._createTrPlaceholder(that.currentItem, element);
            } else if (nodeName === "img") {
              element.attr("src", that.currentItem.attr("src"));
            }
            if (!className) {
              element.css("visibility", "hidden");
            }
            return element;
          },
          update: function(container, p) {
            if (className && !o.forcePlaceholderSize) {
              return;
            }
            if (!p.height()) {
              p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop") || 0, 10) - parseInt(that.currentItem.css("paddingBottom") || 0, 10));
            }
            if (!p.width()) {
              p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft") || 0, 10) - parseInt(that.currentItem.css("paddingRight") || 0, 10));
            }
          }
        };
      }
      that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));
      that.currentItem.after(that.placeholder);
      o.placeholder.update(that, that.placeholder);
    },
    _createTrPlaceholder: function(sourceTr, targetTr) {
      var that = this;
      sourceTr.children().each(function() {
        $("<td>&#160;</td>", that.document[0]).attr("colspan", $(this).attr("colspan") || 1).appendTo(targetTr);
      });
    },
    _contactContainers: function(event) {
      var i,
          j,
          dist,
          itemWithLeastDistance,
          posProperty,
          sizeProperty,
          cur,
          nearBottom,
          floating,
          axis,
          innermostContainer = null,
          innermostIndex = null;
      for (i = this.containers.length - 1; i >= 0; i--) {
        if ($.contains(this.currentItem[0], this.containers[i].element[0])) {
          continue;
        }
        if (this._intersectsWith(this.containers[i].containerCache)) {
          if (innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
            continue;
          }
          innermostContainer = this.containers[i];
          innermostIndex = i;
        } else {
          if (this.containers[i].containerCache.over) {
            this.containers[i]._trigger("out", event, this._uiHash(this));
            this.containers[i].containerCache.over = 0;
          }
        }
      }
      if (!innermostContainer) {
        return;
      }
      if (this.containers.length === 1) {
        if (!this.containers[innermostIndex].containerCache.over) {
          this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
          this.containers[innermostIndex].containerCache.over = 1;
        }
      } else {
        dist = 10000;
        itemWithLeastDistance = null;
        floating = innermostContainer.floating || this._isFloating(this.currentItem);
        posProperty = floating ? "left" : "top";
        sizeProperty = floating ? "width" : "height";
        axis = floating ? "clientX" : "clientY";
        for (j = this.items.length - 1; j >= 0; j--) {
          if (!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
            continue;
          }
          if (this.items[j].item[0] === this.currentItem[0]) {
            continue;
          }
          cur = this.items[j].item.offset()[posProperty];
          nearBottom = false;
          if (event[axis] - cur > this.items[j][sizeProperty] / 2) {
            nearBottom = true;
          }
          if (Math.abs(event[axis] - cur) < dist) {
            dist = Math.abs(event[axis] - cur);
            itemWithLeastDistance = this.items[j];
            this.direction = nearBottom ? "up" : "down";
          }
        }
        if (!itemWithLeastDistance && !this.options.dropOnEmpty) {
          return;
        }
        if (this.currentContainer === this.containers[innermostIndex]) {
          if (!this.currentContainer.containerCache.over) {
            this.containers[innermostIndex]._trigger("over", event, this._uiHash());
            this.currentContainer.containerCache.over = 1;
          }
          return;
        }
        itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
        this._trigger("change", event, this._uiHash());
        this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
        this.currentContainer = this.containers[innermostIndex];
        this.options.placeholder.update(this.currentContainer, this.placeholder);
        this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
        this.containers[innermostIndex].containerCache.over = 1;
      }
    },
    _createHelper: function(event) {
      var o = this.options,
          helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper === "clone" ? this.currentItem.clone() : this.currentItem);
      if (!helper.parents("body").length) {
        $(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
      }
      if (helper[0] === this.currentItem[0]) {
        this._storedCSS = {
          width: this.currentItem[0].style.width,
          height: this.currentItem[0].style.height,
          position: this.currentItem.css("position"),
          top: this.currentItem.css("top"),
          left: this.currentItem.css("left")
        };
      }
      if (!helper[0].style.width || o.forceHelperSize) {
        helper.width(this.currentItem.width());
      }
      if (!helper[0].style.height || o.forceHelperSize) {
        helper.height(this.currentItem.height());
      }
      return helper;
    },
    _adjustOffsetFromHelper: function(obj) {
      if (typeof obj === "string") {
        obj = obj.split(" ");
      }
      if ($.isArray(obj)) {
        obj = {
          left: +obj[0],
          top: +obj[1] || 0
        };
      }
      if ("left" in obj) {
        this.offset.click.left = obj.left + this.margins.left;
      }
      if ("right" in obj) {
        this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
      }
      if ("top" in obj) {
        this.offset.click.top = obj.top + this.margins.top;
      }
      if ("bottom" in obj) {
        this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
      }
    },
    _getParentOffset: function() {
      this.offsetParent = this.helper.offsetParent();
      var po = this.offsetParent.offset();
      if (this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) {
        po.left += this.scrollParent.scrollLeft();
        po.top += this.scrollParent.scrollTop();
      }
      if (this.offsetParent[0] === this.document[0].body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {
        po = {
          top: 0,
          left: 0
        };
      }
      return {
        top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      };
    },
    _getRelativeOffset: function() {
      if (this.cssPosition === "relative") {
        var p = this.currentItem.position();
        return {
          top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
          left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
        };
      } else {
        return {
          top: 0,
          left: 0
        };
      }
    },
    _cacheMargins: function() {
      this.margins = {
        left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
        top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
      };
    },
    _cacheHelperProportions: function() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function() {
      var ce,
          co,
          over,
          o = this.options;
      if (o.containment === "parent") {
        o.containment = this.helper[0].parentNode;
      }
      if (o.containment === "document" || o.containment === "window") {
        this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, o.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, (o.containment === "document" ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
      }
      if (!(/^(document|window|parent)$/).test(o.containment)) {
        ce = $(o.containment)[0];
        co = $(o.containment).offset();
        over = ($(ce).css("overflow") !== "hidden");
        this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top];
      }
    },
    _convertPositionTo: function(d, pos) {
      if (!pos) {
        pos = this.position;
      }
      var mod = d === "absolute" ? 1 : -1,
          scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
          scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
      return {
        top: (pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())) * mod)),
        left: (pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod))
      };
    },
    _generatePosition: function(event) {
      var top,
          left,
          o = this.options,
          pageX = event.pageX,
          pageY = event.pageY,
          scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
          scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
      if (this.cssPosition === "relative" && !(this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0])) {
        this.offset.relative = this._getRelativeOffset();
      }
      if (this.originalPosition) {
        if (this.containment) {
          if (event.pageX - this.offset.click.left < this.containment[0]) {
            pageX = this.containment[0] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top < this.containment[1]) {
            pageY = this.containment[1] + this.offset.click.top;
          }
          if (event.pageX - this.offset.click.left > this.containment[2]) {
            pageX = this.containment[2] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top > this.containment[3]) {
            pageY = this.containment[3] + this.offset.click.top;
          }
        }
        if (o.grid) {
          top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
          pageY = this.containment ? ((top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3]) ? top : ((top - this.offset.click.top >= this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
          left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
          pageX = this.containment ? ((left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2]) ? left : ((left - this.offset.click.left >= this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
        }
      }
      return {
        top: (pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0 : scroll.scrollTop())))),
        left: (pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())))
      };
    },
    _rearrange: function(event, i, a, hardRefresh) {
      a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? i.item[0] : i.item[0].nextSibling));
      this.counter = this.counter ? ++this.counter : 1;
      var counter = this.counter;
      this._delay(function() {
        if (counter === this.counter) {
          this.refreshPositions(!hardRefresh);
        }
      });
    },
    _clear: function(event, noPropagation) {
      this.reverting = false;
      var i,
          delayedTriggers = [];
      if (!this._noFinalSort && this.currentItem.parent().length) {
        this.placeholder.before(this.currentItem);
      }
      this._noFinalSort = null;
      if (this.helper[0] === this.currentItem[0]) {
        for (i in this._storedCSS) {
          if (this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") {
            this._storedCSS[i] = "";
          }
        }
        this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
      } else {
        this.currentItem.show();
      }
      if (this.fromOutside && !noPropagation) {
        delayedTriggers.push(function(event) {
          this._trigger("receive", event, this._uiHash(this.fromOutside));
        });
      }
      if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {
        delayedTriggers.push(function(event) {
          this._trigger("update", event, this._uiHash());
        });
      }
      if (this !== this.currentContainer) {
        if (!noPropagation) {
          delayedTriggers.push(function(event) {
            this._trigger("remove", event, this._uiHash());
          });
          delayedTriggers.push((function(c) {
            return function(event) {
              c._trigger("receive", event, this._uiHash(this));
            };
          }).call(this, this.currentContainer));
          delayedTriggers.push((function(c) {
            return function(event) {
              c._trigger("update", event, this._uiHash(this));
            };
          }).call(this, this.currentContainer));
        }
      }
      function delayEvent(type, instance, container) {
        return function(event) {
          container._trigger(type, event, instance._uiHash(instance));
        };
      }
      for (i = this.containers.length - 1; i >= 0; i--) {
        if (!noPropagation) {
          delayedTriggers.push(delayEvent("deactivate", this, this.containers[i]));
        }
        if (this.containers[i].containerCache.over) {
          delayedTriggers.push(delayEvent("out", this, this.containers[i]));
          this.containers[i].containerCache.over = 0;
        }
      }
      if (this.storedCursor) {
        this.document.find("body").css("cursor", this.storedCursor);
        this.storedStylesheet.remove();
      }
      if (this._storedOpacity) {
        this.helper.css("opacity", this._storedOpacity);
      }
      if (this._storedZIndex) {
        this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex);
      }
      this.dragging = false;
      if (!noPropagation) {
        this._trigger("beforeStop", event, this._uiHash());
      }
      this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
      if (!this.cancelHelperRemoval) {
        if (this.helper[0] !== this.currentItem[0]) {
          this.helper.remove();
        }
        this.helper = null;
      }
      if (!noPropagation) {
        for (i = 0; i < delayedTriggers.length; i++) {
          delayedTriggers[i].call(this, event);
        }
        this._trigger("stop", event, this._uiHash());
      }
      this.fromOutside = false;
      return !this.cancelHelperRemoval;
    },
    _trigger: function() {
      if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
        this.cancel();
      }
    },
    _uiHash: function(_inst) {
      var inst = _inst || this;
      return {
        helper: inst.helper,
        placeholder: inst.placeholder || $([]),
        position: inst.position,
        originalPosition: inst.originalPosition,
        offset: inst.positionAbs,
        item: inst.currentItem,
        sender: _inst ? _inst.element : null
      };
    }
  });
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("13", ["3", "c", "e", "14", "15"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  $.widget("ui.autocomplete", {
    version: "1.11.4",
    defaultElement: "<input>",
    options: {
      appendTo: null,
      autoFocus: false,
      delay: 300,
      minLength: 1,
      position: {
        my: "left top",
        at: "left bottom",
        collision: "none"
      },
      source: null,
      change: null,
      close: null,
      focus: null,
      open: null,
      response: null,
      search: null,
      select: null
    },
    requestIndex: 0,
    pending: 0,
    _create: function() {
      var suppressKeyPress,
          suppressKeyPressRepeat,
          suppressInput,
          nodeName = this.element[0].nodeName.toLowerCase(),
          isTextarea = nodeName === "textarea",
          isInput = nodeName === "input";
      this.isMultiLine = isTextarea ? true : isInput ? false : this.element.prop("isContentEditable");
      this.valueMethod = this.element[isTextarea || isInput ? "val" : "text"];
      this.isNewMenu = true;
      this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
      this._on(this.element, {
        keydown: function(event) {
          if (this.element.prop("readOnly")) {
            suppressKeyPress = true;
            suppressInput = true;
            suppressKeyPressRepeat = true;
            return;
          }
          suppressKeyPress = false;
          suppressInput = false;
          suppressKeyPressRepeat = false;
          var keyCode = $.ui.keyCode;
          switch (event.keyCode) {
            case keyCode.PAGE_UP:
              suppressKeyPress = true;
              this._move("previousPage", event);
              break;
            case keyCode.PAGE_DOWN:
              suppressKeyPress = true;
              this._move("nextPage", event);
              break;
            case keyCode.UP:
              suppressKeyPress = true;
              this._keyEvent("previous", event);
              break;
            case keyCode.DOWN:
              suppressKeyPress = true;
              this._keyEvent("next", event);
              break;
            case keyCode.ENTER:
              if (this.menu.active) {
                suppressKeyPress = true;
                event.preventDefault();
                this.menu.select(event);
              }
              break;
            case keyCode.TAB:
              if (this.menu.active) {
                this.menu.select(event);
              }
              break;
            case keyCode.ESCAPE:
              if (this.menu.element.is(":visible")) {
                if (!this.isMultiLine) {
                  this._value(this.term);
                }
                this.close(event);
                event.preventDefault();
              }
              break;
            default:
              suppressKeyPressRepeat = true;
              this._searchTimeout(event);
              break;
          }
        },
        keypress: function(event) {
          if (suppressKeyPress) {
            suppressKeyPress = false;
            if (!this.isMultiLine || this.menu.element.is(":visible")) {
              event.preventDefault();
            }
            return;
          }
          if (suppressKeyPressRepeat) {
            return;
          }
          var keyCode = $.ui.keyCode;
          switch (event.keyCode) {
            case keyCode.PAGE_UP:
              this._move("previousPage", event);
              break;
            case keyCode.PAGE_DOWN:
              this._move("nextPage", event);
              break;
            case keyCode.UP:
              this._keyEvent("previous", event);
              break;
            case keyCode.DOWN:
              this._keyEvent("next", event);
              break;
          }
        },
        input: function(event) {
          if (suppressInput) {
            suppressInput = false;
            event.preventDefault();
            return;
          }
          this._searchTimeout(event);
        },
        focus: function() {
          this.selectedItem = null;
          this.previous = this._value();
        },
        blur: function(event) {
          if (this.cancelBlur) {
            delete this.cancelBlur;
            return;
          }
          clearTimeout(this.searching);
          this.close(event);
          this._change(event);
        }
      });
      this._initSource();
      this.menu = $("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role: null}).hide().menu("instance");
      this._on(this.menu.element, {
        mousedown: function(event) {
          event.preventDefault();
          this.cancelBlur = true;
          this._delay(function() {
            delete this.cancelBlur;
          });
          var menuElement = this.menu.element[0];
          if (!$(event.target).closest(".ui-menu-item").length) {
            this._delay(function() {
              var that = this;
              this.document.one("mousedown", function(event) {
                if (event.target !== that.element[0] && event.target !== menuElement && !$.contains(menuElement, event.target)) {
                  that.close();
                }
              });
            });
          }
        },
        menufocus: function(event, ui) {
          var label,
              item;
          if (this.isNewMenu) {
            this.isNewMenu = false;
            if (event.originalEvent && /^mouse/.test(event.originalEvent.type)) {
              this.menu.blur();
              this.document.one("mousemove", function() {
                $(event.target).trigger(event.originalEvent);
              });
              return;
            }
          }
          item = ui.item.data("ui-autocomplete-item");
          if (false !== this._trigger("focus", event, {item: item})) {
            if (event.originalEvent && /^key/.test(event.originalEvent.type)) {
              this._value(item.value);
            }
          }
          label = ui.item.attr("aria-label") || item.value;
          if (label && $.trim(label).length) {
            this.liveRegion.children().hide();
            $("<div>").text(label).appendTo(this.liveRegion);
          }
        },
        menuselect: function(event, ui) {
          var item = ui.item.data("ui-autocomplete-item"),
              previous = this.previous;
          if (this.element[0] !== this.document[0].activeElement) {
            this.element.focus();
            this.previous = previous;
            this._delay(function() {
              this.previous = previous;
              this.selectedItem = item;
            });
          }
          if (false !== this._trigger("select", event, {item: item})) {
            this._value(item.value);
          }
          this.term = this._value();
          this.close(event);
          this.selectedItem = item;
        }
      });
      this.liveRegion = $("<span>", {
        role: "status",
        "aria-live": "assertive",
        "aria-relevant": "additions"
      }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body);
      this._on(this.window, {beforeunload: function() {
          this.element.removeAttr("autocomplete");
        }});
    },
    _destroy: function() {
      clearTimeout(this.searching);
      this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
      this.menu.element.remove();
      this.liveRegion.remove();
    },
    _setOption: function(key, value) {
      this._super(key, value);
      if (key === "source") {
        this._initSource();
      }
      if (key === "appendTo") {
        this.menu.element.appendTo(this._appendTo());
      }
      if (key === "disabled" && value && this.xhr) {
        this.xhr.abort();
      }
    },
    _appendTo: function() {
      var element = this.options.appendTo;
      if (element) {
        element = element.jquery || element.nodeType ? $(element) : this.document.find(element).eq(0);
      }
      if (!element || !element[0]) {
        element = this.element.closest(".ui-front");
      }
      if (!element.length) {
        element = this.document[0].body;
      }
      return element;
    },
    _initSource: function() {
      var array,
          url,
          that = this;
      if ($.isArray(this.options.source)) {
        array = this.options.source;
        this.source = function(request, response) {
          response($.ui.autocomplete.filter(array, request.term));
        };
      } else if (typeof this.options.source === "string") {
        url = this.options.source;
        this.source = function(request, response) {
          if (that.xhr) {
            that.xhr.abort();
          }
          that.xhr = $.ajax({
            url: url,
            data: request,
            dataType: "json",
            success: function(data) {
              response(data);
            },
            error: function() {
              response([]);
            }
          });
        };
      } else {
        this.source = this.options.source;
      }
    },
    _searchTimeout: function(event) {
      clearTimeout(this.searching);
      this.searching = this._delay(function() {
        var equalValues = this.term === this._value(),
            menuVisible = this.menu.element.is(":visible"),
            modifierKey = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
        if (!equalValues || (equalValues && !menuVisible && !modifierKey)) {
          this.selectedItem = null;
          this.search(null, event);
        }
      }, this.options.delay);
    },
    search: function(value, event) {
      value = value != null ? value : this._value();
      this.term = this._value();
      if (value.length < this.options.minLength) {
        return this.close(event);
      }
      if (this._trigger("search", event) === false) {
        return;
      }
      return this._search(value);
    },
    _search: function(value) {
      this.pending++;
      this.element.addClass("ui-autocomplete-loading");
      this.cancelSearch = false;
      this.source({term: value}, this._response());
    },
    _response: function() {
      var index = ++this.requestIndex;
      return $.proxy(function(content) {
        if (index === this.requestIndex) {
          this.__response(content);
        }
        this.pending--;
        if (!this.pending) {
          this.element.removeClass("ui-autocomplete-loading");
        }
      }, this);
    },
    __response: function(content) {
      if (content) {
        content = this._normalize(content);
      }
      this._trigger("response", null, {content: content});
      if (!this.options.disabled && content && content.length && !this.cancelSearch) {
        this._suggest(content);
        this._trigger("open");
      } else {
        this._close();
      }
    },
    close: function(event) {
      this.cancelSearch = true;
      this._close(event);
    },
    _close: function(event) {
      if (this.menu.element.is(":visible")) {
        this.menu.element.hide();
        this.menu.blur();
        this.isNewMenu = true;
        this._trigger("close", event);
      }
    },
    _change: function(event) {
      if (this.previous !== this._value()) {
        this._trigger("change", event, {item: this.selectedItem});
      }
    },
    _normalize: function(items) {
      if (items.length && items[0].label && items[0].value) {
        return items;
      }
      return $.map(items, function(item) {
        if (typeof item === "string") {
          return {
            label: item,
            value: item
          };
        }
        return $.extend({}, item, {
          label: item.label || item.value,
          value: item.value || item.label
        });
      });
    },
    _suggest: function(items) {
      var ul = this.menu.element.empty();
      this._renderMenu(ul, items);
      this.isNewMenu = true;
      this.menu.refresh();
      ul.show();
      this._resizeMenu();
      ul.position($.extend({of: this.element}, this.options.position));
      if (this.options.autoFocus) {
        this.menu.next();
      }
    },
    _resizeMenu: function() {
      var ul = this.menu.element;
      ul.outerWidth(Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth()));
    },
    _renderMenu: function(ul, items) {
      var that = this;
      $.each(items, function(index, item) {
        that._renderItemData(ul, item);
      });
    },
    _renderItemData: function(ul, item) {
      return this._renderItem(ul, item).data("ui-autocomplete-item", item);
    },
    _renderItem: function(ul, item) {
      return $("<li>").text(item.label).appendTo(ul);
    },
    _move: function(direction, event) {
      if (!this.menu.element.is(":visible")) {
        this.search(null, event);
        return;
      }
      if (this.menu.isFirstItem() && /^previous/.test(direction) || this.menu.isLastItem() && /^next/.test(direction)) {
        if (!this.isMultiLine) {
          this._value(this.term);
        }
        this.menu.blur();
        return;
      }
      this.menu[direction](event);
    },
    widget: function() {
      return this.menu.element;
    },
    _value: function() {
      return this.valueMethod.apply(this.element, arguments);
    },
    _keyEvent: function(keyEvent, event) {
      if (!this.isMultiLine || this.menu.element.is(":visible")) {
        this._move(keyEvent, event);
        event.preventDefault();
      }
    }
  });
  $.extend($.ui.autocomplete, {
    escapeRegex: function(value) {
      return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    },
    filter: function(array, term) {
      var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
      return $.grep(array, function(value) {
        return matcher.test(value.label || value.value || value);
      });
    }
  });
  $.widget("ui.autocomplete", $.ui.autocomplete, {
    options: {messages: {
        noResults: "No search results.",
        results: function(amount) {
          return amount + (amount > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
        }
      }},
    __response: function(content) {
      var message;
      this._superApply(arguments);
      if (this.options.disabled || this.cancelSearch) {
        return;
      }
      if (content && content.length) {
        message = this.options.messages.results(content.length);
      } else {
        message = this.options.messages.noResults;
      }
      this.liveRegion.children().hide();
      $("<div>").text(message).appendTo(this.liveRegion);
    }
  });
  return $.ui.autocomplete;
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("14", ["3"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  (function() {
    $.ui = $.ui || {};
    var cachedScrollbarWidth,
        supportsOffsetFractions,
        max = Math.max,
        abs = Math.abs,
        round = Math.round,
        rhorizontal = /left|center|right/,
        rvertical = /top|center|bottom/,
        roffset = /[\+\-]\d+(\.[\d]+)?%?/,
        rposition = /^\w+/,
        rpercent = /%$/,
        _position = $.fn.position;
    function getOffsets(offsets, width, height) {
      return [parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)];
    }
    function parseCss(element, property) {
      return parseInt($.css(element, property), 10) || 0;
    }
    function getDimensions(elem) {
      var raw = elem[0];
      if (raw.nodeType === 9) {
        return {
          width: elem.width(),
          height: elem.height(),
          offset: {
            top: 0,
            left: 0
          }
        };
      }
      if ($.isWindow(raw)) {
        return {
          width: elem.width(),
          height: elem.height(),
          offset: {
            top: elem.scrollTop(),
            left: elem.scrollLeft()
          }
        };
      }
      if (raw.preventDefault) {
        return {
          width: 0,
          height: 0,
          offset: {
            top: raw.pageY,
            left: raw.pageX
          }
        };
      }
      return {
        width: elem.outerWidth(),
        height: elem.outerHeight(),
        offset: elem.offset()
      };
    }
    $.position = {
      scrollbarWidth: function() {
        if (cachedScrollbarWidth !== undefined) {
          return cachedScrollbarWidth;
        }
        var w1,
            w2,
            div = $("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
            innerDiv = div.children()[0];
        $("body").append(div);
        w1 = innerDiv.offsetWidth;
        div.css("overflow", "scroll");
        w2 = innerDiv.offsetWidth;
        if (w1 === w2) {
          w2 = div[0].clientWidth;
        }
        div.remove();
        return (cachedScrollbarWidth = w1 - w2);
      },
      getScrollInfo: function(within) {
        var overflowX = within.isWindow || within.isDocument ? "" : within.element.css("overflow-x"),
            overflowY = within.isWindow || within.isDocument ? "" : within.element.css("overflow-y"),
            hasOverflowX = overflowX === "scroll" || (overflowX === "auto" && within.width < within.element[0].scrollWidth),
            hasOverflowY = overflowY === "scroll" || (overflowY === "auto" && within.height < within.element[0].scrollHeight);
        return {
          width: hasOverflowY ? $.position.scrollbarWidth() : 0,
          height: hasOverflowX ? $.position.scrollbarWidth() : 0
        };
      },
      getWithinInfo: function(element) {
        var withinElement = $(element || window),
            isWindow = $.isWindow(withinElement[0]),
            isDocument = !!withinElement[0] && withinElement[0].nodeType === 9;
        return {
          element: withinElement,
          isWindow: isWindow,
          isDocument: isDocument,
          offset: withinElement.offset() || {
            left: 0,
            top: 0
          },
          scrollLeft: withinElement.scrollLeft(),
          scrollTop: withinElement.scrollTop(),
          width: isWindow || isDocument ? withinElement.width() : withinElement.outerWidth(),
          height: isWindow || isDocument ? withinElement.height() : withinElement.outerHeight()
        };
      }
    };
    $.fn.position = function(options) {
      if (!options || !options.of) {
        return _position.apply(this, arguments);
      }
      options = $.extend({}, options);
      var atOffset,
          targetWidth,
          targetHeight,
          targetOffset,
          basePosition,
          dimensions,
          target = $(options.of),
          within = $.position.getWithinInfo(options.within),
          scrollInfo = $.position.getScrollInfo(within),
          collision = (options.collision || "flip").split(" "),
          offsets = {};
      dimensions = getDimensions(target);
      if (target[0].preventDefault) {
        options.at = "left top";
      }
      targetWidth = dimensions.width;
      targetHeight = dimensions.height;
      targetOffset = dimensions.offset;
      basePosition = $.extend({}, targetOffset);
      $.each(["my", "at"], function() {
        var pos = (options[this] || "").split(" "),
            horizontalOffset,
            verticalOffset;
        if (pos.length === 1) {
          pos = rhorizontal.test(pos[0]) ? pos.concat(["center"]) : rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"];
        }
        pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
        pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";
        horizontalOffset = roffset.exec(pos[0]);
        verticalOffset = roffset.exec(pos[1]);
        offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0];
        options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]];
      });
      if (collision.length === 1) {
        collision[1] = collision[0];
      }
      if (options.at[0] === "right") {
        basePosition.left += targetWidth;
      } else if (options.at[0] === "center") {
        basePosition.left += targetWidth / 2;
      }
      if (options.at[1] === "bottom") {
        basePosition.top += targetHeight;
      } else if (options.at[1] === "center") {
        basePosition.top += targetHeight / 2;
      }
      atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
      basePosition.left += atOffset[0];
      basePosition.top += atOffset[1];
      return this.each(function() {
        var collisionPosition,
            using,
            elem = $(this),
            elemWidth = elem.outerWidth(),
            elemHeight = elem.outerHeight(),
            marginLeft = parseCss(this, "marginLeft"),
            marginTop = parseCss(this, "marginTop"),
            collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width,
            collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height,
            position = $.extend({}, basePosition),
            myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
        if (options.my[0] === "right") {
          position.left -= elemWidth;
        } else if (options.my[0] === "center") {
          position.left -= elemWidth / 2;
        }
        if (options.my[1] === "bottom") {
          position.top -= elemHeight;
        } else if (options.my[1] === "center") {
          position.top -= elemHeight / 2;
        }
        position.left += myOffset[0];
        position.top += myOffset[1];
        if (!supportsOffsetFractions) {
          position.left = round(position.left);
          position.top = round(position.top);
        }
        collisionPosition = {
          marginLeft: marginLeft,
          marginTop: marginTop
        };
        $.each(["left", "top"], function(i, dir) {
          if ($.ui.position[collision[i]]) {
            $.ui.position[collision[i]][dir](position, {
              targetWidth: targetWidth,
              targetHeight: targetHeight,
              elemWidth: elemWidth,
              elemHeight: elemHeight,
              collisionPosition: collisionPosition,
              collisionWidth: collisionWidth,
              collisionHeight: collisionHeight,
              offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
              my: options.my,
              at: options.at,
              within: within,
              elem: elem
            });
          }
        });
        if (options.using) {
          using = function(props) {
            var left = targetOffset.left - position.left,
                right = left + targetWidth - elemWidth,
                top = targetOffset.top - position.top,
                bottom = top + targetHeight - elemHeight,
                feedback = {
                  target: {
                    element: target,
                    left: targetOffset.left,
                    top: targetOffset.top,
                    width: targetWidth,
                    height: targetHeight
                  },
                  element: {
                    element: elem,
                    left: position.left,
                    top: position.top,
                    width: elemWidth,
                    height: elemHeight
                  },
                  horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
                  vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
                };
            if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
              feedback.horizontal = "center";
            }
            if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
              feedback.vertical = "middle";
            }
            if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
              feedback.important = "horizontal";
            } else {
              feedback.important = "vertical";
            }
            options.using.call(this, props, feedback);
          };
        }
        elem.offset($.extend(position, {using: using}));
      });
    };
    $.ui.position = {
      fit: {
        left: function(position, data) {
          var within = data.within,
              withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
              outerWidth = within.width,
              collisionPosLeft = position.left - data.collisionPosition.marginLeft,
              overLeft = withinOffset - collisionPosLeft,
              overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
              newOverRight;
          if (data.collisionWidth > outerWidth) {
            if (overLeft > 0 && overRight <= 0) {
              newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
              position.left += overLeft - newOverRight;
            } else if (overRight > 0 && overLeft <= 0) {
              position.left = withinOffset;
            } else {
              if (overLeft > overRight) {
                position.left = withinOffset + outerWidth - data.collisionWidth;
              } else {
                position.left = withinOffset;
              }
            }
          } else if (overLeft > 0) {
            position.left += overLeft;
          } else if (overRight > 0) {
            position.left -= overRight;
          } else {
            position.left = max(position.left - collisionPosLeft, position.left);
          }
        },
        top: function(position, data) {
          var within = data.within,
              withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
              outerHeight = data.within.height,
              collisionPosTop = position.top - data.collisionPosition.marginTop,
              overTop = withinOffset - collisionPosTop,
              overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
              newOverBottom;
          if (data.collisionHeight > outerHeight) {
            if (overTop > 0 && overBottom <= 0) {
              newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
              position.top += overTop - newOverBottom;
            } else if (overBottom > 0 && overTop <= 0) {
              position.top = withinOffset;
            } else {
              if (overTop > overBottom) {
                position.top = withinOffset + outerHeight - data.collisionHeight;
              } else {
                position.top = withinOffset;
              }
            }
          } else if (overTop > 0) {
            position.top += overTop;
          } else if (overBottom > 0) {
            position.top -= overBottom;
          } else {
            position.top = max(position.top - collisionPosTop, position.top);
          }
        }
      },
      flip: {
        left: function(position, data) {
          var within = data.within,
              withinOffset = within.offset.left + within.scrollLeft,
              outerWidth = within.width,
              offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
              collisionPosLeft = position.left - data.collisionPosition.marginLeft,
              overLeft = collisionPosLeft - offsetLeft,
              overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
              myOffset = data.my[0] === "left" ? -data.elemWidth : data.my[0] === "right" ? data.elemWidth : 0,
              atOffset = data.at[0] === "left" ? data.targetWidth : data.at[0] === "right" ? -data.targetWidth : 0,
              offset = -2 * data.offset[0],
              newOverRight,
              newOverLeft;
          if (overLeft < 0) {
            newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
            if (newOverRight < 0 || newOverRight < abs(overLeft)) {
              position.left += myOffset + atOffset + offset;
            }
          } else if (overRight > 0) {
            newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
            if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
              position.left += myOffset + atOffset + offset;
            }
          }
        },
        top: function(position, data) {
          var within = data.within,
              withinOffset = within.offset.top + within.scrollTop,
              outerHeight = within.height,
              offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
              collisionPosTop = position.top - data.collisionPosition.marginTop,
              overTop = collisionPosTop - offsetTop,
              overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
              top = data.my[1] === "top",
              myOffset = top ? -data.elemHeight : data.my[1] === "bottom" ? data.elemHeight : 0,
              atOffset = data.at[1] === "top" ? data.targetHeight : data.at[1] === "bottom" ? -data.targetHeight : 0,
              offset = -2 * data.offset[1],
              newOverTop,
              newOverBottom;
          if (overTop < 0) {
            newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
            if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
              position.top += myOffset + atOffset + offset;
            }
          } else if (overBottom > 0) {
            newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
            if (newOverTop > 0 || abs(newOverTop) < overBottom) {
              position.top += myOffset + atOffset + offset;
            }
          }
        }
      },
      flipfit: {
        left: function() {
          $.ui.position.flip.left.apply(this, arguments);
          $.ui.position.fit.left.apply(this, arguments);
        },
        top: function() {
          $.ui.position.flip.top.apply(this, arguments);
          $.ui.position.fit.top.apply(this, arguments);
        }
      }
    };
    (function() {
      var testElement,
          testElementParent,
          testElementStyle,
          offsetLeft,
          i,
          body = document.getElementsByTagName("body")[0],
          div = document.createElement("div");
      testElement = document.createElement(body ? "div" : "body");
      testElementStyle = {
        visibility: "hidden",
        width: 0,
        height: 0,
        border: 0,
        margin: 0,
        background: "none"
      };
      if (body) {
        $.extend(testElementStyle, {
          position: "absolute",
          left: "-1000px",
          top: "-1000px"
        });
      }
      for (i in testElementStyle) {
        testElement.style[i] = testElementStyle[i];
      }
      testElement.appendChild(div);
      testElementParent = body || document.documentElement;
      testElementParent.insertBefore(testElement, testElementParent.firstChild);
      div.style.cssText = "position: absolute; left: 10.7432222px;";
      offsetLeft = $(div).offset().left;
      supportsOffsetFractions = offsetLeft > 10 && offsetLeft < 11;
      testElement.innerHTML = "";
      testElementParent.removeChild(testElement);
    })();
  })();
  return $.ui.position;
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("15", ["3", "c", "e", "14"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.widget("ui.menu", {
    version: "1.11.4",
    defaultElement: "<ul>",
    delay: 300,
    options: {
      icons: {submenu: "ui-icon-carat-1-e"},
      items: "> *",
      menus: "ul",
      position: {
        my: "left-1 top",
        at: "right top"
      },
      role: "menu",
      blur: null,
      focus: null,
      select: null
    },
    _create: function() {
      this.activeMenu = this.element;
      this.mouseHandled = false;
      this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
        role: this.options.role,
        tabIndex: 0
      });
      if (this.options.disabled) {
        this.element.addClass("ui-state-disabled").attr("aria-disabled", "true");
      }
      this._on({
        "mousedown .ui-menu-item": function(event) {
          event.preventDefault();
        },
        "click .ui-menu-item": function(event) {
          var target = $(event.target);
          if (!this.mouseHandled && target.not(".ui-state-disabled").length) {
            this.select(event);
            if (!event.isPropagationStopped()) {
              this.mouseHandled = true;
            }
            if (target.has(".ui-menu").length) {
              this.expand(event);
            } else if (!this.element.is(":focus") && $(this.document[0].activeElement).closest(".ui-menu").length) {
              this.element.trigger("focus", [true]);
              if (this.active && this.active.parents(".ui-menu").length === 1) {
                clearTimeout(this.timer);
              }
            }
          }
        },
        "mouseenter .ui-menu-item": function(event) {
          if (this.previousFilter) {
            return;
          }
          var target = $(event.currentTarget);
          target.siblings(".ui-state-active").removeClass("ui-state-active");
          this.focus(event, target);
        },
        mouseleave: "collapseAll",
        "mouseleave .ui-menu": "collapseAll",
        focus: function(event, keepActiveItem) {
          var item = this.active || this.element.find(this.options.items).eq(0);
          if (!keepActiveItem) {
            this.focus(event, item);
          }
        },
        blur: function(event) {
          this._delay(function() {
            if (!$.contains(this.element[0], this.document[0].activeElement)) {
              this.collapseAll(event);
            }
          });
        },
        keydown: "_keydown"
      });
      this.refresh();
      this._on(this.document, {click: function(event) {
          if (this._closeOnDocumentClick(event)) {
            this.collapseAll(event);
          }
          this.mouseHandled = false;
        }});
    },
    _destroy: function() {
      this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
      this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
        var elem = $(this);
        if (elem.data("ui-menu-submenu-carat")) {
          elem.remove();
        }
      });
      this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");
    },
    _keydown: function(event) {
      var match,
          prev,
          character,
          skip,
          preventDefault = true;
      switch (event.keyCode) {
        case $.ui.keyCode.PAGE_UP:
          this.previousPage(event);
          break;
        case $.ui.keyCode.PAGE_DOWN:
          this.nextPage(event);
          break;
        case $.ui.keyCode.HOME:
          this._move("first", "first", event);
          break;
        case $.ui.keyCode.END:
          this._move("last", "last", event);
          break;
        case $.ui.keyCode.UP:
          this.previous(event);
          break;
        case $.ui.keyCode.DOWN:
          this.next(event);
          break;
        case $.ui.keyCode.LEFT:
          this.collapse(event);
          break;
        case $.ui.keyCode.RIGHT:
          if (this.active && !this.active.is(".ui-state-disabled")) {
            this.expand(event);
          }
          break;
        case $.ui.keyCode.ENTER:
        case $.ui.keyCode.SPACE:
          this._activate(event);
          break;
        case $.ui.keyCode.ESCAPE:
          this.collapse(event);
          break;
        default:
          preventDefault = false;
          prev = this.previousFilter || "";
          character = String.fromCharCode(event.keyCode);
          skip = false;
          clearTimeout(this.filterTimer);
          if (character === prev) {
            skip = true;
          } else {
            character = prev + character;
          }
          match = this._filterMenuItems(character);
          match = skip && match.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : match;
          if (!match.length) {
            character = String.fromCharCode(event.keyCode);
            match = this._filterMenuItems(character);
          }
          if (match.length) {
            this.focus(event, match);
            this.previousFilter = character;
            this.filterTimer = this._delay(function() {
              delete this.previousFilter;
            }, 1000);
          } else {
            delete this.previousFilter;
          }
      }
      if (preventDefault) {
        event.preventDefault();
      }
    },
    _activate: function(event) {
      if (!this.active.is(".ui-state-disabled")) {
        if (this.active.is("[aria-haspopup='true']")) {
          this.expand(event);
        } else {
          this.select(event);
        }
      }
    },
    refresh: function() {
      var menus,
          items,
          that = this,
          icon = this.options.icons.submenu,
          submenus = this.element.find(this.options.menus);
      this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length);
      submenus.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
        role: this.options.role,
        "aria-hidden": "true",
        "aria-expanded": "false"
      }).each(function() {
        var menu = $(this),
            item = menu.parent(),
            submenuCarat = $("<span>").addClass("ui-menu-icon ui-icon " + icon).data("ui-menu-submenu-carat", true);
        item.attr("aria-haspopup", "true").prepend(submenuCarat);
        menu.attr("aria-labelledby", item.attr("id"));
      });
      menus = submenus.add(this.element);
      items = menus.find(this.options.items);
      items.not(".ui-menu-item").each(function() {
        var item = $(this);
        if (that._isDivider(item)) {
          item.addClass("ui-widget-content ui-menu-divider");
        }
      });
      items.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
        tabIndex: -1,
        role: this._itemRole()
      });
      items.filter(".ui-state-disabled").attr("aria-disabled", "true");
      if (this.active && !$.contains(this.element[0], this.active[0])) {
        this.blur();
      }
    },
    _itemRole: function() {
      return {
        menu: "menuitem",
        listbox: "option"
      }[this.options.role];
    },
    _setOption: function(key, value) {
      if (key === "icons") {
        this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(value.submenu);
      }
      if (key === "disabled") {
        this.element.toggleClass("ui-state-disabled", !!value).attr("aria-disabled", value);
      }
      this._super(key, value);
    },
    focus: function(event, item) {
      var nested,
          focused;
      this.blur(event, event && event.type === "focus");
      this._scrollIntoView(item);
      this.active = item.first();
      focused = this.active.addClass("ui-state-focus").removeClass("ui-state-active");
      if (this.options.role) {
        this.element.attr("aria-activedescendant", focused.attr("id"));
      }
      this.active.parent().closest(".ui-menu-item").addClass("ui-state-active");
      if (event && event.type === "keydown") {
        this._close();
      } else {
        this.timer = this._delay(function() {
          this._close();
        }, this.delay);
      }
      nested = item.children(".ui-menu");
      if (nested.length && event && (/^mouse/.test(event.type))) {
        this._startOpening(nested);
      }
      this.activeMenu = item.parent();
      this._trigger("focus", event, {item: item});
    },
    _scrollIntoView: function(item) {
      var borderTop,
          paddingTop,
          offset,
          scroll,
          elementHeight,
          itemHeight;
      if (this._hasScroll()) {
        borderTop = parseFloat($.css(this.activeMenu[0], "borderTopWidth")) || 0;
        paddingTop = parseFloat($.css(this.activeMenu[0], "paddingTop")) || 0;
        offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop;
        scroll = this.activeMenu.scrollTop();
        elementHeight = this.activeMenu.height();
        itemHeight = item.outerHeight();
        if (offset < 0) {
          this.activeMenu.scrollTop(scroll + offset);
        } else if (offset + itemHeight > elementHeight) {
          this.activeMenu.scrollTop(scroll + offset - elementHeight + itemHeight);
        }
      }
    },
    blur: function(event, fromFocus) {
      if (!fromFocus) {
        clearTimeout(this.timer);
      }
      if (!this.active) {
        return;
      }
      this.active.removeClass("ui-state-focus");
      this.active = null;
      this._trigger("blur", event, {item: this.active});
    },
    _startOpening: function(submenu) {
      clearTimeout(this.timer);
      if (submenu.attr("aria-hidden") !== "true") {
        return;
      }
      this.timer = this._delay(function() {
        this._close();
        this._open(submenu);
      }, this.delay);
    },
    _open: function(submenu) {
      var position = $.extend({of: this.active}, this.options.position);
      clearTimeout(this.timer);
      this.element.find(".ui-menu").not(submenu.parents(".ui-menu")).hide().attr("aria-hidden", "true");
      submenu.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(position);
    },
    collapseAll: function(event, all) {
      clearTimeout(this.timer);
      this.timer = this._delay(function() {
        var currentMenu = all ? this.element : $(event && event.target).closest(this.element.find(".ui-menu"));
        if (!currentMenu.length) {
          currentMenu = this.element;
        }
        this._close(currentMenu);
        this.blur(event);
        this.activeMenu = currentMenu;
      }, this.delay);
    },
    _close: function(startMenu) {
      if (!startMenu) {
        startMenu = this.active ? this.active.parent() : this.element;
      }
      startMenu.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active");
    },
    _closeOnDocumentClick: function(event) {
      return !$(event.target).closest(".ui-menu").length;
    },
    _isDivider: function(item) {
      return !/[^\-\u2014\u2013\s]/.test(item.text());
    },
    collapse: function(event) {
      var newItem = this.active && this.active.parent().closest(".ui-menu-item", this.element);
      if (newItem && newItem.length) {
        this._close();
        this.focus(event, newItem);
      }
    },
    expand: function(event) {
      var newItem = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
      if (newItem && newItem.length) {
        this._open(newItem.parent());
        this._delay(function() {
          this.focus(event, newItem);
        });
      }
    },
    next: function(event) {
      this._move("next", "first", event);
    },
    previous: function(event) {
      this._move("prev", "last", event);
    },
    isFirstItem: function() {
      return this.active && !this.active.prevAll(".ui-menu-item").length;
    },
    isLastItem: function() {
      return this.active && !this.active.nextAll(".ui-menu-item").length;
    },
    _move: function(direction, filter, event) {
      var next;
      if (this.active) {
        if (direction === "first" || direction === "last") {
          next = this.active[direction === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1);
        } else {
          next = this.active[direction + "All"](".ui-menu-item").eq(0);
        }
      }
      if (!next || !next.length || !this.active) {
        next = this.activeMenu.find(this.options.items)[filter]();
      }
      this.focus(event, next);
    },
    nextPage: function(event) {
      var item,
          base,
          height;
      if (!this.active) {
        this.next(event);
        return;
      }
      if (this.isLastItem()) {
        return;
      }
      if (this._hasScroll()) {
        base = this.active.offset().top;
        height = this.element.height();
        this.active.nextAll(".ui-menu-item").each(function() {
          item = $(this);
          return item.offset().top - base - height < 0;
        });
        this.focus(event, item);
      } else {
        this.focus(event, this.activeMenu.find(this.options.items)[!this.active ? "first" : "last"]());
      }
    },
    previousPage: function(event) {
      var item,
          base,
          height;
      if (!this.active) {
        this.next(event);
        return;
      }
      if (this.isFirstItem()) {
        return;
      }
      if (this._hasScroll()) {
        base = this.active.offset().top;
        height = this.element.height();
        this.active.prevAll(".ui-menu-item").each(function() {
          item = $(this);
          return item.offset().top - base + height > 0;
        });
        this.focus(event, item);
      } else {
        this.focus(event, this.activeMenu.find(this.options.items).first());
      }
    },
    _hasScroll: function() {
      return this.element.outerHeight() < this.element.prop("scrollHeight");
    },
    select: function(event) {
      this.active = this.active || $(event.target).closest(".ui-menu-item");
      var ui = {item: this.active};
      if (!this.active.has(".ui-menu").length) {
        this.collapseAll(event, true);
      }
      this._trigger("select", event, ui);
    },
    _filterMenuItems: function(character) {
      var escapedCharacter = character.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
          regex = new RegExp("^" + escapedCharacter, "i");
      return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
        return regex.test($.trim($(this).text()));
      });
    }
  });
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("16", ["3", "c", "e"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.widget("ui.progressbar", {
    version: "1.11.4",
    options: {
      max: 100,
      value: 0,
      change: null,
      complete: null
    },
    min: 0,
    _create: function() {
      this.oldValue = this.options.value = this._constrainedValue();
      this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
        role: "progressbar",
        "aria-valuemin": this.min
      });
      this.valueDiv = $("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
      this._refreshValue();
    },
    _destroy: function() {
      this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
      this.valueDiv.remove();
    },
    value: function(newValue) {
      if (newValue === undefined) {
        return this.options.value;
      }
      this.options.value = this._constrainedValue(newValue);
      this._refreshValue();
    },
    _constrainedValue: function(newValue) {
      if (newValue === undefined) {
        newValue = this.options.value;
      }
      this.indeterminate = newValue === false;
      if (typeof newValue !== "number") {
        newValue = 0;
      }
      return this.indeterminate ? false : Math.min(this.options.max, Math.max(this.min, newValue));
    },
    _setOptions: function(options) {
      var value = options.value;
      delete options.value;
      this._super(options);
      this.options.value = this._constrainedValue(value);
      this._refreshValue();
    },
    _setOption: function(key, value) {
      if (key === "max") {
        value = Math.max(this.min, value);
      }
      if (key === "disabled") {
        this.element.toggleClass("ui-state-disabled", !!value).attr("aria-disabled", value);
      }
      this._super(key, value);
    },
    _percentage: function() {
      return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
    },
    _refreshValue: function() {
      var value = this.options.value,
          percentage = this._percentage();
      this.valueDiv.toggle(this.indeterminate || value > this.min).toggleClass("ui-corner-right", value === this.options.max).width(percentage.toFixed(0) + "%");
      this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate);
      if (this.indeterminate) {
        this.element.removeAttr("aria-valuenow");
        if (!this.overlayDiv) {
          this.overlayDiv = $("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv);
        }
      } else {
        this.element.attr({
          "aria-valuemax": this.options.max,
          "aria-valuenow": value
        });
        if (this.overlayDiv) {
          this.overlayDiv.remove();
          this.overlayDiv = null;
        }
      }
      if (this.oldValue !== value) {
        this.oldValue = value;
        this._trigger("change");
      }
      if (value === this.options.max) {
        this._trigger("complete");
      }
    }
  });
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("17", ["3", "c", "d", "e"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.widget("ui.slider", $.ui.mouse, {
    version: "1.11.4",
    widgetEventPrefix: "slide",
    options: {
      animate: false,
      distance: 0,
      max: 100,
      min: 0,
      orientation: "horizontal",
      range: false,
      step: 1,
      value: 0,
      values: null,
      change: null,
      slide: null,
      start: null,
      stop: null
    },
    numPages: 5,
    _create: function() {
      this._keySliding = false;
      this._mouseSliding = false;
      this._animateOff = true;
      this._handleIndex = null;
      this._detectOrientation();
      this._mouseInit();
      this._calculateNewMax();
      this.element.addClass("ui-slider" + " ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all");
      this._refresh();
      this._setOption("disabled", this.options.disabled);
      this._animateOff = false;
    },
    _refresh: function() {
      this._createRange();
      this._createHandles();
      this._setupEvents();
      this._refreshValue();
    },
    _createHandles: function() {
      var i,
          handleCount,
          options = this.options,
          existingHandles = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
          handle = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
          handles = [];
      handleCount = (options.values && options.values.length) || 1;
      if (existingHandles.length > handleCount) {
        existingHandles.slice(handleCount).remove();
        existingHandles = existingHandles.slice(0, handleCount);
      }
      for (i = existingHandles.length; i < handleCount; i++) {
        handles.push(handle);
      }
      this.handles = existingHandles.add($(handles.join("")).appendTo(this.element));
      this.handle = this.handles.eq(0);
      this.handles.each(function(i) {
        $(this).data("ui-slider-handle-index", i);
      });
    },
    _createRange: function() {
      var options = this.options,
          classes = "";
      if (options.range) {
        if (options.range === true) {
          if (!options.values) {
            options.values = [this._valueMin(), this._valueMin()];
          } else if (options.values.length && options.values.length !== 2) {
            options.values = [options.values[0], options.values[0]];
          } else if ($.isArray(options.values)) {
            options.values = options.values.slice(0);
          }
        }
        if (!this.range || !this.range.length) {
          this.range = $("<div></div>").appendTo(this.element);
          classes = "ui-slider-range" + " ui-widget-header ui-corner-all";
        } else {
          this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
            "left": "",
            "bottom": ""
          });
        }
        this.range.addClass(classes + ((options.range === "min" || options.range === "max") ? " ui-slider-range-" + options.range : ""));
      } else {
        if (this.range) {
          this.range.remove();
        }
        this.range = null;
      }
    },
    _setupEvents: function() {
      this._off(this.handles);
      this._on(this.handles, this._handleEvents);
      this._hoverable(this.handles);
      this._focusable(this.handles);
    },
    _destroy: function() {
      this.handles.remove();
      if (this.range) {
        this.range.remove();
      }
      this.element.removeClass("ui-slider" + " ui-slider-horizontal" + " ui-slider-vertical" + " ui-widget" + " ui-widget-content" + " ui-corner-all");
      this._mouseDestroy();
    },
    _mouseCapture: function(event) {
      var position,
          normValue,
          distance,
          closestHandle,
          index,
          allowed,
          offset,
          mouseOverHandle,
          that = this,
          o = this.options;
      if (o.disabled) {
        return false;
      }
      this.elementSize = {
        width: this.element.outerWidth(),
        height: this.element.outerHeight()
      };
      this.elementOffset = this.element.offset();
      position = {
        x: event.pageX,
        y: event.pageY
      };
      normValue = this._normValueFromMouse(position);
      distance = this._valueMax() - this._valueMin() + 1;
      this.handles.each(function(i) {
        var thisDistance = Math.abs(normValue - that.values(i));
        if ((distance > thisDistance) || (distance === thisDistance && (i === that._lastChangedValue || that.values(i) === o.min))) {
          distance = thisDistance;
          closestHandle = $(this);
          index = i;
        }
      });
      allowed = this._start(event, index);
      if (allowed === false) {
        return false;
      }
      this._mouseSliding = true;
      this._handleIndex = index;
      closestHandle.addClass("ui-state-active").focus();
      offset = closestHandle.offset();
      mouseOverHandle = !$(event.target).parents().addBack().is(".ui-slider-handle");
      this._clickOffset = mouseOverHandle ? {
        left: 0,
        top: 0
      } : {
        left: event.pageX - offset.left - (closestHandle.width() / 2),
        top: event.pageY - offset.top - (closestHandle.height() / 2) - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
      };
      if (!this.handles.hasClass("ui-state-hover")) {
        this._slide(event, index, normValue);
      }
      this._animateOff = true;
      return true;
    },
    _mouseStart: function() {
      return true;
    },
    _mouseDrag: function(event) {
      var position = {
        x: event.pageX,
        y: event.pageY
      },
          normValue = this._normValueFromMouse(position);
      this._slide(event, this._handleIndex, normValue);
      return false;
    },
    _mouseStop: function(event) {
      this.handles.removeClass("ui-state-active");
      this._mouseSliding = false;
      this._stop(event, this._handleIndex);
      this._change(event, this._handleIndex);
      this._handleIndex = null;
      this._clickOffset = null;
      this._animateOff = false;
      return false;
    },
    _detectOrientation: function() {
      this.orientation = (this.options.orientation === "vertical") ? "vertical" : "horizontal";
    },
    _normValueFromMouse: function(position) {
      var pixelTotal,
          pixelMouse,
          percentMouse,
          valueTotal,
          valueMouse;
      if (this.orientation === "horizontal") {
        pixelTotal = this.elementSize.width;
        pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0);
      } else {
        pixelTotal = this.elementSize.height;
        pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0);
      }
      percentMouse = (pixelMouse / pixelTotal);
      if (percentMouse > 1) {
        percentMouse = 1;
      }
      if (percentMouse < 0) {
        percentMouse = 0;
      }
      if (this.orientation === "vertical") {
        percentMouse = 1 - percentMouse;
      }
      valueTotal = this._valueMax() - this._valueMin();
      valueMouse = this._valueMin() + percentMouse * valueTotal;
      return this._trimAlignValue(valueMouse);
    },
    _start: function(event, index) {
      var uiHash = {
        handle: this.handles[index],
        value: this.value()
      };
      if (this.options.values && this.options.values.length) {
        uiHash.value = this.values(index);
        uiHash.values = this.values();
      }
      return this._trigger("start", event, uiHash);
    },
    _slide: function(event, index, newVal) {
      var otherVal,
          newValues,
          allowed;
      if (this.options.values && this.options.values.length) {
        otherVal = this.values(index ? 0 : 1);
        if ((this.options.values.length === 2 && this.options.range === true) && ((index === 0 && newVal > otherVal) || (index === 1 && newVal < otherVal))) {
          newVal = otherVal;
        }
        if (newVal !== this.values(index)) {
          newValues = this.values();
          newValues[index] = newVal;
          allowed = this._trigger("slide", event, {
            handle: this.handles[index],
            value: newVal,
            values: newValues
          });
          otherVal = this.values(index ? 0 : 1);
          if (allowed !== false) {
            this.values(index, newVal);
          }
        }
      } else {
        if (newVal !== this.value()) {
          allowed = this._trigger("slide", event, {
            handle: this.handles[index],
            value: newVal
          });
          if (allowed !== false) {
            this.value(newVal);
          }
        }
      }
    },
    _stop: function(event, index) {
      var uiHash = {
        handle: this.handles[index],
        value: this.value()
      };
      if (this.options.values && this.options.values.length) {
        uiHash.value = this.values(index);
        uiHash.values = this.values();
      }
      this._trigger("stop", event, uiHash);
    },
    _change: function(event, index) {
      if (!this._keySliding && !this._mouseSliding) {
        var uiHash = {
          handle: this.handles[index],
          value: this.value()
        };
        if (this.options.values && this.options.values.length) {
          uiHash.value = this.values(index);
          uiHash.values = this.values();
        }
        this._lastChangedValue = index;
        this._trigger("change", event, uiHash);
      }
    },
    value: function(newValue) {
      if (arguments.length) {
        this.options.value = this._trimAlignValue(newValue);
        this._refreshValue();
        this._change(null, 0);
        return;
      }
      return this._value();
    },
    values: function(index, newValue) {
      var vals,
          newValues,
          i;
      if (arguments.length > 1) {
        this.options.values[index] = this._trimAlignValue(newValue);
        this._refreshValue();
        this._change(null, index);
        return;
      }
      if (arguments.length) {
        if ($.isArray(arguments[0])) {
          vals = this.options.values;
          newValues = arguments[0];
          for (i = 0; i < vals.length; i += 1) {
            vals[i] = this._trimAlignValue(newValues[i]);
            this._change(null, i);
          }
          this._refreshValue();
        } else {
          if (this.options.values && this.options.values.length) {
            return this._values(index);
          } else {
            return this.value();
          }
        }
      } else {
        return this._values();
      }
    },
    _setOption: function(key, value) {
      var i,
          valsLength = 0;
      if (key === "range" && this.options.range === true) {
        if (value === "min") {
          this.options.value = this._values(0);
          this.options.values = null;
        } else if (value === "max") {
          this.options.value = this._values(this.options.values.length - 1);
          this.options.values = null;
        }
      }
      if ($.isArray(this.options.values)) {
        valsLength = this.options.values.length;
      }
      if (key === "disabled") {
        this.element.toggleClass("ui-state-disabled", !!value);
      }
      this._super(key, value);
      switch (key) {
        case "orientation":
          this._detectOrientation();
          this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
          this._refreshValue();
          this.handles.css(value === "horizontal" ? "bottom" : "left", "");
          break;
        case "value":
          this._animateOff = true;
          this._refreshValue();
          this._change(null, 0);
          this._animateOff = false;
          break;
        case "values":
          this._animateOff = true;
          this._refreshValue();
          for (i = 0; i < valsLength; i += 1) {
            this._change(null, i);
          }
          this._animateOff = false;
          break;
        case "step":
        case "min":
        case "max":
          this._animateOff = true;
          this._calculateNewMax();
          this._refreshValue();
          this._animateOff = false;
          break;
        case "range":
          this._animateOff = true;
          this._refresh();
          this._animateOff = false;
          break;
      }
    },
    _value: function() {
      var val = this.options.value;
      val = this._trimAlignValue(val);
      return val;
    },
    _values: function(index) {
      var val,
          vals,
          i;
      if (arguments.length) {
        val = this.options.values[index];
        val = this._trimAlignValue(val);
        return val;
      } else if (this.options.values && this.options.values.length) {
        vals = this.options.values.slice();
        for (i = 0; i < vals.length; i += 1) {
          vals[i] = this._trimAlignValue(vals[i]);
        }
        return vals;
      } else {
        return [];
      }
    },
    _trimAlignValue: function(val) {
      if (val <= this._valueMin()) {
        return this._valueMin();
      }
      if (val >= this._valueMax()) {
        return this._valueMax();
      }
      var step = (this.options.step > 0) ? this.options.step : 1,
          valModStep = (val - this._valueMin()) % step,
          alignValue = val - valModStep;
      if (Math.abs(valModStep) * 2 >= step) {
        alignValue += (valModStep > 0) ? step : (-step);
      }
      return parseFloat(alignValue.toFixed(5));
    },
    _calculateNewMax: function() {
      var max = this.options.max,
          min = this._valueMin(),
          step = this.options.step,
          aboveMin = Math.floor((+(max - min).toFixed(this._precision())) / step) * step;
      max = aboveMin + min;
      this.max = parseFloat(max.toFixed(this._precision()));
    },
    _precision: function() {
      var precision = this._precisionOf(this.options.step);
      if (this.options.min !== null) {
        precision = Math.max(precision, this._precisionOf(this.options.min));
      }
      return precision;
    },
    _precisionOf: function(num) {
      var str = num.toString(),
          decimal = str.indexOf(".");
      return decimal === -1 ? 0 : str.length - decimal - 1;
    },
    _valueMin: function() {
      return this.options.min;
    },
    _valueMax: function() {
      return this.max;
    },
    _refreshValue: function() {
      var lastValPercent,
          valPercent,
          value,
          valueMin,
          valueMax,
          oRange = this.options.range,
          o = this.options,
          that = this,
          animate = (!this._animateOff) ? o.animate : false,
          _set = {};
      if (this.options.values && this.options.values.length) {
        this.handles.each(function(i) {
          valPercent = (that.values(i) - that._valueMin()) / (that._valueMax() - that._valueMin()) * 100;
          _set[that.orientation === "horizontal" ? "left" : "bottom"] = valPercent + "%";
          $(this).stop(1, 1)[animate ? "animate" : "css"](_set, o.animate);
          if (that.options.range === true) {
            if (that.orientation === "horizontal") {
              if (i === 0) {
                that.range.stop(1, 1)[animate ? "animate" : "css"]({left: valPercent + "%"}, o.animate);
              }
              if (i === 1) {
                that.range[animate ? "animate" : "css"]({width: (valPercent - lastValPercent) + "%"}, {
                  queue: false,
                  duration: o.animate
                });
              }
            } else {
              if (i === 0) {
                that.range.stop(1, 1)[animate ? "animate" : "css"]({bottom: (valPercent) + "%"}, o.animate);
              }
              if (i === 1) {
                that.range[animate ? "animate" : "css"]({height: (valPercent - lastValPercent) + "%"}, {
                  queue: false,
                  duration: o.animate
                });
              }
            }
          }
          lastValPercent = valPercent;
        });
      } else {
        value = this.value();
        valueMin = this._valueMin();
        valueMax = this._valueMax();
        valPercent = (valueMax !== valueMin) ? (value - valueMin) / (valueMax - valueMin) * 100 : 0;
        _set[this.orientation === "horizontal" ? "left" : "bottom"] = valPercent + "%";
        this.handle.stop(1, 1)[animate ? "animate" : "css"](_set, o.animate);
        if (oRange === "min" && this.orientation === "horizontal") {
          this.range.stop(1, 1)[animate ? "animate" : "css"]({width: valPercent + "%"}, o.animate);
        }
        if (oRange === "max" && this.orientation === "horizontal") {
          this.range[animate ? "animate" : "css"]({width: (100 - valPercent) + "%"}, {
            queue: false,
            duration: o.animate
          });
        }
        if (oRange === "min" && this.orientation === "vertical") {
          this.range.stop(1, 1)[animate ? "animate" : "css"]({height: valPercent + "%"}, o.animate);
        }
        if (oRange === "max" && this.orientation === "vertical") {
          this.range[animate ? "animate" : "css"]({height: (100 - valPercent) + "%"}, {
            queue: false,
            duration: o.animate
          });
        }
      }
    },
    _handleEvents: {
      keydown: function(event) {
        var allowed,
            curVal,
            newVal,
            step,
            index = $(event.target).data("ui-slider-handle-index");
        switch (event.keyCode) {
          case $.ui.keyCode.HOME:
          case $.ui.keyCode.END:
          case $.ui.keyCode.PAGE_UP:
          case $.ui.keyCode.PAGE_DOWN:
          case $.ui.keyCode.UP:
          case $.ui.keyCode.RIGHT:
          case $.ui.keyCode.DOWN:
          case $.ui.keyCode.LEFT:
            event.preventDefault();
            if (!this._keySliding) {
              this._keySliding = true;
              $(event.target).addClass("ui-state-active");
              allowed = this._start(event, index);
              if (allowed === false) {
                return;
              }
            }
            break;
        }
        step = this.options.step;
        if (this.options.values && this.options.values.length) {
          curVal = newVal = this.values(index);
        } else {
          curVal = newVal = this.value();
        }
        switch (event.keyCode) {
          case $.ui.keyCode.HOME:
            newVal = this._valueMin();
            break;
          case $.ui.keyCode.END:
            newVal = this._valueMax();
            break;
          case $.ui.keyCode.PAGE_UP:
            newVal = this._trimAlignValue(curVal + ((this._valueMax() - this._valueMin()) / this.numPages));
            break;
          case $.ui.keyCode.PAGE_DOWN:
            newVal = this._trimAlignValue(curVal - ((this._valueMax() - this._valueMin()) / this.numPages));
            break;
          case $.ui.keyCode.UP:
          case $.ui.keyCode.RIGHT:
            if (curVal === this._valueMax()) {
              return;
            }
            newVal = this._trimAlignValue(curVal + step);
            break;
          case $.ui.keyCode.DOWN:
          case $.ui.keyCode.LEFT:
            if (curVal === this._valueMin()) {
              return;
            }
            newVal = this._trimAlignValue(curVal - step);
            break;
        }
        this._slide(event, index, newVal);
      },
      keyup: function(event) {
        var index = $(event.target).data("ui-slider-handle-index");
        if (this._keySliding) {
          this._keySliding = false;
          this._stop(event, index);
          this._change(event, index);
          $(event.target).removeClass("ui-state-active");
        }
      }
    }
  });
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("18", ["3", "c", "e"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.widget("ui.tabs", {
    version: "1.11.4",
    delay: 300,
    options: {
      active: null,
      collapsible: false,
      event: "click",
      heightStyle: "content",
      hide: null,
      show: null,
      activate: null,
      beforeActivate: null,
      beforeLoad: null,
      load: null
    },
    _isLocal: (function() {
      var rhash = /#.*$/;
      return function(anchor) {
        var anchorUrl,
            locationUrl;
        anchor = anchor.cloneNode(false);
        anchorUrl = anchor.href.replace(rhash, "");
        locationUrl = location.href.replace(rhash, "");
        try {
          anchorUrl = decodeURIComponent(anchorUrl);
        } catch (error) {}
        try {
          locationUrl = decodeURIComponent(locationUrl);
        } catch (error) {}
        return anchor.hash.length > 1 && anchorUrl === locationUrl;
      };
    })(),
    _create: function() {
      var that = this,
          options = this.options;
      this.running = false;
      this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", options.collapsible);
      this._processTabs();
      options.active = this._initialActive();
      if ($.isArray(options.disabled)) {
        options.disabled = $.unique(options.disabled.concat($.map(this.tabs.filter(".ui-state-disabled"), function(li) {
          return that.tabs.index(li);
        }))).sort();
      }
      if (this.options.active !== false && this.anchors.length) {
        this.active = this._findActive(options.active);
      } else {
        this.active = $();
      }
      this._refresh();
      if (this.active.length) {
        this.load(options.active);
      }
    },
    _initialActive: function() {
      var active = this.options.active,
          collapsible = this.options.collapsible,
          locationHash = location.hash.substring(1);
      if (active === null) {
        if (locationHash) {
          this.tabs.each(function(i, tab) {
            if ($(tab).attr("aria-controls") === locationHash) {
              active = i;
              return false;
            }
          });
        }
        if (active === null) {
          active = this.tabs.index(this.tabs.filter(".ui-tabs-active"));
        }
        if (active === null || active === -1) {
          active = this.tabs.length ? 0 : false;
        }
      }
      if (active !== false) {
        active = this.tabs.index(this.tabs.eq(active));
        if (active === -1) {
          active = collapsible ? false : 0;
        }
      }
      if (!collapsible && active === false && this.anchors.length) {
        active = 0;
      }
      return active;
    },
    _getCreateEventData: function() {
      return {
        tab: this.active,
        panel: !this.active.length ? $() : this._getPanelForTab(this.active)
      };
    },
    _tabKeydown: function(event) {
      var focusedTab = $(this.document[0].activeElement).closest("li"),
          selectedIndex = this.tabs.index(focusedTab),
          goingForward = true;
      if (this._handlePageNav(event)) {
        return;
      }
      switch (event.keyCode) {
        case $.ui.keyCode.RIGHT:
        case $.ui.keyCode.DOWN:
          selectedIndex++;
          break;
        case $.ui.keyCode.UP:
        case $.ui.keyCode.LEFT:
          goingForward = false;
          selectedIndex--;
          break;
        case $.ui.keyCode.END:
          selectedIndex = this.anchors.length - 1;
          break;
        case $.ui.keyCode.HOME:
          selectedIndex = 0;
          break;
        case $.ui.keyCode.SPACE:
          event.preventDefault();
          clearTimeout(this.activating);
          this._activate(selectedIndex);
          return;
        case $.ui.keyCode.ENTER:
          event.preventDefault();
          clearTimeout(this.activating);
          this._activate(selectedIndex === this.options.active ? false : selectedIndex);
          return;
        default:
          return;
      }
      event.preventDefault();
      clearTimeout(this.activating);
      selectedIndex = this._focusNextTab(selectedIndex, goingForward);
      if (!event.ctrlKey && !event.metaKey) {
        focusedTab.attr("aria-selected", "false");
        this.tabs.eq(selectedIndex).attr("aria-selected", "true");
        this.activating = this._delay(function() {
          this.option("active", selectedIndex);
        }, this.delay);
      }
    },
    _panelKeydown: function(event) {
      if (this._handlePageNav(event)) {
        return;
      }
      if (event.ctrlKey && event.keyCode === $.ui.keyCode.UP) {
        event.preventDefault();
        this.active.focus();
      }
    },
    _handlePageNav: function(event) {
      if (event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP) {
        this._activate(this._focusNextTab(this.options.active - 1, false));
        return true;
      }
      if (event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN) {
        this._activate(this._focusNextTab(this.options.active + 1, true));
        return true;
      }
    },
    _findNextTab: function(index, goingForward) {
      var lastTabIndex = this.tabs.length - 1;
      function constrain() {
        if (index > lastTabIndex) {
          index = 0;
        }
        if (index < 0) {
          index = lastTabIndex;
        }
        return index;
      }
      while ($.inArray(constrain(), this.options.disabled) !== -1) {
        index = goingForward ? index + 1 : index - 1;
      }
      return index;
    },
    _focusNextTab: function(index, goingForward) {
      index = this._findNextTab(index, goingForward);
      this.tabs.eq(index).focus();
      return index;
    },
    _setOption: function(key, value) {
      if (key === "active") {
        this._activate(value);
        return;
      }
      if (key === "disabled") {
        this._setupDisabled(value);
        return;
      }
      this._super(key, value);
      if (key === "collapsible") {
        this.element.toggleClass("ui-tabs-collapsible", value);
        if (!value && this.options.active === false) {
          this._activate(0);
        }
      }
      if (key === "event") {
        this._setupEvents(value);
      }
      if (key === "heightStyle") {
        this._setupHeightStyle(value);
      }
    },
    _sanitizeSelector: function(hash) {
      return hash ? hash.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "";
    },
    refresh: function() {
      var options = this.options,
          lis = this.tablist.children(":has(a[href])");
      options.disabled = $.map(lis.filter(".ui-state-disabled"), function(tab) {
        return lis.index(tab);
      });
      this._processTabs();
      if (options.active === false || !this.anchors.length) {
        options.active = false;
        this.active = $();
      } else if (this.active.length && !$.contains(this.tablist[0], this.active[0])) {
        if (this.tabs.length === options.disabled.length) {
          options.active = false;
          this.active = $();
        } else {
          this._activate(this._findNextTab(Math.max(0, options.active - 1), false));
        }
      } else {
        options.active = this.tabs.index(this.active);
      }
      this._refresh();
    },
    _refresh: function() {
      this._setupDisabled(this.options.disabled);
      this._setupEvents(this.options.event);
      this._setupHeightStyle(this.options.heightStyle);
      this.tabs.not(this.active).attr({
        "aria-selected": "false",
        "aria-expanded": "false",
        tabIndex: -1
      });
      this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden": "true"});
      if (!this.active.length) {
        this.tabs.eq(0).attr("tabIndex", 0);
      } else {
        this.active.addClass("ui-tabs-active ui-state-active").attr({
          "aria-selected": "true",
          "aria-expanded": "true",
          tabIndex: 0
        });
        this._getPanelForTab(this.active).show().attr({"aria-hidden": "false"});
      }
    },
    _processTabs: function() {
      var that = this,
          prevTabs = this.tabs,
          prevAnchors = this.anchors,
          prevPanels = this.panels;
      this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function(event) {
        if ($(this).is(".ui-state-disabled")) {
          event.preventDefault();
        }
      }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
        if ($(this).closest("li").is(".ui-state-disabled")) {
          this.blur();
        }
      });
      this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
        role: "tab",
        tabIndex: -1
      });
      this.anchors = this.tabs.map(function() {
        return $("a", this)[0];
      }).addClass("ui-tabs-anchor").attr({
        role: "presentation",
        tabIndex: -1
      });
      this.panels = $();
      this.anchors.each(function(i, anchor) {
        var selector,
            panel,
            panelId,
            anchorId = $(anchor).uniqueId().attr("id"),
            tab = $(anchor).closest("li"),
            originalAriaControls = tab.attr("aria-controls");
        if (that._isLocal(anchor)) {
          selector = anchor.hash;
          panelId = selector.substring(1);
          panel = that.element.find(that._sanitizeSelector(selector));
        } else {
          panelId = tab.attr("aria-controls") || $({}).uniqueId()[0].id;
          selector = "#" + panelId;
          panel = that.element.find(selector);
          if (!panel.length) {
            panel = that._createPanel(panelId);
            panel.insertAfter(that.panels[i - 1] || that.tablist);
          }
          panel.attr("aria-live", "polite");
        }
        if (panel.length) {
          that.panels = that.panels.add(panel);
        }
        if (originalAriaControls) {
          tab.data("ui-tabs-aria-controls", originalAriaControls);
        }
        tab.attr({
          "aria-controls": panelId,
          "aria-labelledby": anchorId
        });
        panel.attr("aria-labelledby", anchorId);
      });
      this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel");
      if (prevTabs) {
        this._off(prevTabs.not(this.tabs));
        this._off(prevAnchors.not(this.anchors));
        this._off(prevPanels.not(this.panels));
      }
    },
    _getList: function() {
      return this.tablist || this.element.find("ol,ul").eq(0);
    },
    _createPanel: function(id) {
      return $("<div>").attr("id", id).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", true);
    },
    _setupDisabled: function(disabled) {
      if ($.isArray(disabled)) {
        if (!disabled.length) {
          disabled = false;
        } else if (disabled.length === this.anchors.length) {
          disabled = true;
        }
      }
      for (var i = 0,
          li; (li = this.tabs[i]); i++) {
        if (disabled === true || $.inArray(i, disabled) !== -1) {
          $(li).addClass("ui-state-disabled").attr("aria-disabled", "true");
        } else {
          $(li).removeClass("ui-state-disabled").removeAttr("aria-disabled");
        }
      }
      this.options.disabled = disabled;
    },
    _setupEvents: function(event) {
      var events = {};
      if (event) {
        $.each(event.split(" "), function(index, eventName) {
          events[eventName] = "_eventHandler";
        });
      }
      this._off(this.anchors.add(this.tabs).add(this.panels));
      this._on(true, this.anchors, {click: function(event) {
          event.preventDefault();
        }});
      this._on(this.anchors, events);
      this._on(this.tabs, {keydown: "_tabKeydown"});
      this._on(this.panels, {keydown: "_panelKeydown"});
      this._focusable(this.tabs);
      this._hoverable(this.tabs);
    },
    _setupHeightStyle: function(heightStyle) {
      var maxHeight,
          parent = this.element.parent();
      if (heightStyle === "fill") {
        maxHeight = parent.height();
        maxHeight -= this.element.outerHeight() - this.element.height();
        this.element.siblings(":visible").each(function() {
          var elem = $(this),
              position = elem.css("position");
          if (position === "absolute" || position === "fixed") {
            return;
          }
          maxHeight -= elem.outerHeight(true);
        });
        this.element.children().not(this.panels).each(function() {
          maxHeight -= $(this).outerHeight(true);
        });
        this.panels.each(function() {
          $(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()));
        }).css("overflow", "auto");
      } else if (heightStyle === "auto") {
        maxHeight = 0;
        this.panels.each(function() {
          maxHeight = Math.max(maxHeight, $(this).height("").height());
        }).height(maxHeight);
      }
    },
    _eventHandler: function(event) {
      var options = this.options,
          active = this.active,
          anchor = $(event.currentTarget),
          tab = anchor.closest("li"),
          clickedIsActive = tab[0] === active[0],
          collapsing = clickedIsActive && options.collapsible,
          toShow = collapsing ? $() : this._getPanelForTab(tab),
          toHide = !active.length ? $() : this._getPanelForTab(active),
          eventData = {
            oldTab: active,
            oldPanel: toHide,
            newTab: collapsing ? $() : tab,
            newPanel: toShow
          };
      event.preventDefault();
      if (tab.hasClass("ui-state-disabled") || tab.hasClass("ui-tabs-loading") || this.running || (clickedIsActive && !options.collapsible) || (this._trigger("beforeActivate", event, eventData) === false)) {
        return;
      }
      options.active = collapsing ? false : this.tabs.index(tab);
      this.active = clickedIsActive ? $() : tab;
      if (this.xhr) {
        this.xhr.abort();
      }
      if (!toHide.length && !toShow.length) {
        $.error("jQuery UI Tabs: Mismatching fragment identifier.");
      }
      if (toShow.length) {
        this.load(this.tabs.index(tab), event);
      }
      this._toggle(event, eventData);
    },
    _toggle: function(event, eventData) {
      var that = this,
          toShow = eventData.newPanel,
          toHide = eventData.oldPanel;
      this.running = true;
      function complete() {
        that.running = false;
        that._trigger("activate", event, eventData);
      }
      function show() {
        eventData.newTab.closest("li").addClass("ui-tabs-active ui-state-active");
        if (toShow.length && that.options.show) {
          that._show(toShow, that.options.show, complete);
        } else {
          toShow.show();
          complete();
        }
      }
      if (toHide.length && this.options.hide) {
        this._hide(toHide, this.options.hide, function() {
          eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
          show();
        });
      } else {
        eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
        toHide.hide();
        show();
      }
      toHide.attr("aria-hidden", "true");
      eventData.oldTab.attr({
        "aria-selected": "false",
        "aria-expanded": "false"
      });
      if (toShow.length && toHide.length) {
        eventData.oldTab.attr("tabIndex", -1);
      } else if (toShow.length) {
        this.tabs.filter(function() {
          return $(this).attr("tabIndex") === 0;
        }).attr("tabIndex", -1);
      }
      toShow.attr("aria-hidden", "false");
      eventData.newTab.attr({
        "aria-selected": "true",
        "aria-expanded": "true",
        tabIndex: 0
      });
    },
    _activate: function(index) {
      var anchor,
          active = this._findActive(index);
      if (active[0] === this.active[0]) {
        return;
      }
      if (!active.length) {
        active = this.active;
      }
      anchor = active.find(".ui-tabs-anchor")[0];
      this._eventHandler({
        target: anchor,
        currentTarget: anchor,
        preventDefault: $.noop
      });
    },
    _findActive: function(index) {
      return index === false ? $() : this.tabs.eq(index);
    },
    _getIndex: function(index) {
      if (typeof index === "string") {
        index = this.anchors.index(this.anchors.filter("[href$='" + index + "']"));
      }
      return index;
    },
    _destroy: function() {
      if (this.xhr) {
        this.xhr.abort();
      }
      this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
      this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");
      this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId();
      this.tablist.unbind(this.eventNamespace);
      this.tabs.add(this.panels).each(function() {
        if ($.data(this, "ui-tabs-destroy")) {
          $(this).remove();
        } else {
          $(this).removeClass("ui-state-default ui-state-active ui-state-disabled " + "ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role");
        }
      });
      this.tabs.each(function() {
        var li = $(this),
            prev = li.data("ui-tabs-aria-controls");
        if (prev) {
          li.attr("aria-controls", prev).removeData("ui-tabs-aria-controls");
        } else {
          li.removeAttr("aria-controls");
        }
      });
      this.panels.show();
      if (this.options.heightStyle !== "content") {
        this.panels.css("height", "");
      }
    },
    enable: function(index) {
      var disabled = this.options.disabled;
      if (disabled === false) {
        return;
      }
      if (index === undefined) {
        disabled = false;
      } else {
        index = this._getIndex(index);
        if ($.isArray(disabled)) {
          disabled = $.map(disabled, function(num) {
            return num !== index ? num : null;
          });
        } else {
          disabled = $.map(this.tabs, function(li, num) {
            return num !== index ? num : null;
          });
        }
      }
      this._setupDisabled(disabled);
    },
    disable: function(index) {
      var disabled = this.options.disabled;
      if (disabled === true) {
        return;
      }
      if (index === undefined) {
        disabled = true;
      } else {
        index = this._getIndex(index);
        if ($.inArray(index, disabled) !== -1) {
          return;
        }
        if ($.isArray(disabled)) {
          disabled = $.merge([index], disabled).sort();
        } else {
          disabled = [index];
        }
      }
      this._setupDisabled(disabled);
    },
    load: function(index, event) {
      index = this._getIndex(index);
      var that = this,
          tab = this.tabs.eq(index),
          anchor = tab.find(".ui-tabs-anchor"),
          panel = this._getPanelForTab(tab),
          eventData = {
            tab: tab,
            panel: panel
          },
          complete = function(jqXHR, status) {
            if (status === "abort") {
              that.panels.stop(false, true);
            }
            tab.removeClass("ui-tabs-loading");
            panel.removeAttr("aria-busy");
            if (jqXHR === that.xhr) {
              delete that.xhr;
            }
          };
      if (this._isLocal(anchor[0])) {
        return;
      }
      this.xhr = $.ajax(this._ajaxSettings(anchor, event, eventData));
      if (this.xhr && this.xhr.statusText !== "canceled") {
        tab.addClass("ui-tabs-loading");
        panel.attr("aria-busy", "true");
        this.xhr.done(function(response, status, jqXHR) {
          setTimeout(function() {
            panel.html(response);
            that._trigger("load", event, eventData);
            complete(jqXHR, status);
          }, 1);
        }).fail(function(jqXHR, status) {
          setTimeout(function() {
            complete(jqXHR, status);
          }, 1);
        });
      }
    },
    _ajaxSettings: function(anchor, event, eventData) {
      var that = this;
      return {
        url: anchor.attr("href"),
        beforeSend: function(jqXHR, settings) {
          return that._trigger("beforeLoad", event, $.extend({
            jqXHR: jqXHR,
            ajaxSettings: settings
          }, eventData));
        }
      };
    },
    _getPanelForTab: function(tab) {
      var id = $(tab).attr("aria-controls");
      return this.element.find(this._sanitizeSelector("#" + id));
    }
  });
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define("19", ["3"], factory);
  } else if (typeof module !== 'undefined' && typeof exports === "object") {
    module.exports = factory(require('jquery'));
  } else {
    root.jQuery = factory(root.jQuery);
  }
}(this, function($) {
  $.prompt = function(message, options) {
    if (options !== undefined && options.classes != undefined && typeof options.classes === 'string') {
      options = {box: options.classes};
    }
    $.prompt.options = $.extend({}, $.prompt.defaults, options);
    $.prompt.currentPrefix = $.prompt.options.prefix;
    var opts = $.prompt.options,
        $body = $(document.body),
        $window = $(window);
    var msgbox = '<div class="' + $.prompt.options.prefix + 'box ' + opts.classes.box + '">';
    if (opts.useiframe && ($('object, applet').length > 0)) {
      msgbox += '<iframe src="javascript:false;" style="display:block;position:absolute;z-index:-1;" class="' + opts.prefix + 'fade ' + opts.classes.fade + '"></iframe>';
    } else {
      msgbox += '<div class="' + opts.prefix + 'fade ' + opts.classes.fade + '"></div>';
    }
    msgbox += '<div class="' + opts.prefix + ' ' + opts.classes.prompt + '">' + '<form action="javascript:false;" onsubmit="return false;" class="' + opts.prefix + 'form">' + '<div class="' + opts.prefix + 'close ' + opts.classes.close + '">' + opts.closeText + '</div>' + '<div class="' + opts.prefix + 'states"></div>' + '</form>' + '</div>' + '</div>';
    $.prompt.jqib = $(msgbox).appendTo($body);
    $.prompt.jqi = $.prompt.jqib.children('.' + opts.prefix);
    $.prompt.jqif = $.prompt.jqib.children('.' + opts.prefix + 'fade');
    if (message.constructor == String) {
      message = {state0: {
          title: opts.title,
          html: message,
          buttons: opts.buttons,
          position: opts.position,
          focus: opts.focus,
          submit: opts.submit,
          backgroud: opts.backgroud
        }};
    }
    $.prompt.options.states = {};
    var k,
        v;
    for (k in message) {
      v = $.extend({}, $.prompt.defaults.state, {name: k}, message[k]);
      $.prompt.addState(v.name, v);
      if ($.prompt.currentStateName === '')
        $.prompt.currentStateName = v.name;
    }
    var $firstState = $.prompt.jqi.find('.' + opts.prefix + 'states .' + opts.prefix + 'state').eq(0);
    $.prompt.goToState($firstState.data('jqi-name'));
    $.prompt.jqi.on('click', '.' + opts.prefix + 'buttons button', function(e) {
      var $t = $(this),
          $state = $t.parents('.' + opts.prefix + 'state'),
          stateobj = $.prompt.options.states[$state.data('jqi-name')],
          msg = $state.children('.' + opts.prefix + 'message'),
          clicked = stateobj.buttons[$t.text()] || stateobj.buttons[$t.html()],
          forminputs = {};
      if (clicked == undefined) {
        for (var i in stateobj.buttons) {
          if (stateobj.buttons[i].title == $t.text() || stateobj.buttons[i].title == $t.html()) {
            clicked = stateobj.buttons[i].value;
          }
        }
      }
      $.each($.prompt.jqi.children('form').serializeArray(), function(i, obj) {
        if (forminputs[obj.name] === undefined) {
          forminputs[obj.name] = obj.value;
        } else if (typeof forminputs[obj.name] == Array || typeof forminputs[obj.name] == 'object') {
          forminputs[obj.name].push(obj.value);
        } else {
          forminputs[obj.name] = [forminputs[obj.name], obj.value];
        }
      });
      var promptsubmite = new $.Event('impromptu:submit');
      promptsubmite.stateName = stateobj.name;
      promptsubmite.state = $state;
      $state.trigger(promptsubmite, [clicked, msg, forminputs]);
      if (!promptsubmite.isDefaultPrevented()) {
        $.prompt.close(true, clicked, msg, forminputs);
      }
    });
    var fadeClicked = function() {
      if (opts.persistent) {
        var offset = (opts.top.toString().indexOf('%') >= 0 ? ($window.height() * (parseInt(opts.top, 10) / 100)) : parseInt(opts.top, 10)),
            top = parseInt($.prompt.jqi.css('top').replace('px', ''), 10) - offset;
        $('html,body').animate({scrollTop: top}, 'fast', function() {
          var i = 0;
          $.prompt.jqib.addClass(opts.prefix + 'warning');
          var intervalid = setInterval(function() {
            $.prompt.jqib.toggleClass(opts.prefix + 'warning');
            if (i++ > 1) {
              clearInterval(intervalid);
              $.prompt.jqib.removeClass(opts.prefix + 'warning');
            }
          }, 100);
        });
      } else {}
    };
    var keyPressEventHandler = function(e) {
      var key = (window.event) ? event.keyCode : e.keyCode;
      if (key == 27) {
        fadeClicked();
      }
      if (key == 9) {
        var $inputels = $('input,select,textarea,button', $.prompt.getCurrentState());
        var fwd = !e.shiftKey && e.target == $inputels[$inputels.length - 1];
        var back = e.shiftKey && e.target == $inputels[0];
        if (fwd || back) {
          setTimeout(function() {
            if (!$inputels)
              return;
            var el = $inputels[back === true ? $inputels.length - 1 : 0];
            if (el)
              el.focus();
          }, 10);
          return false;
        }
      }
    };
    $.prompt.position();
    $.prompt.style();
    $.prompt.jqif.click(fadeClicked);
    $window.resize({animate: false}, $.prompt.position);
    $.prompt.jqi.find('.' + opts.prefix + 'close').click($.prompt.close);
    $.prompt.jqib.on("keydown", keyPressEventHandler).on('impromptu:loaded', opts.loaded).on('impromptu:close', opts.close).on('impromptu:statechanging', opts.statechanging).on('impromptu:statechanged', opts.statechanged);
    $.prompt.jqif[opts.show](opts.overlayspeed);
    $.prompt.jqi[opts.show](opts.promptspeed, function() {
      $.prompt.jqib.trigger('impromptu:loaded');
    });
    if (opts.timeout > 0)
      setTimeout($.prompt.close, opts.timeout);
    return $.prompt.jqib;
  };
  $.prompt.defaults = {
    prefix: 'jqi',
    classes: {
      box: '',
      fade: '',
      prompt: '',
      close: '',
      title: '',
      message: '',
      buttons: '',
      button: '',
      defaultButton: ''
    },
    title: '',
    closeText: '&times;',
    buttons: {},
    loaded: function(e) {},
    submit: function(e, v, m, f) {},
    close: function(e, v, m, f) {},
    statechanging: function(e, from, to) {},
    statechanged: function(e, to) {},
    opacity: 0.1,
    zIndex: 999,
    overlayspeed: 'slow',
    promptspeed: 'fast',
    show: 'fadeIn',
    focus: 0,
    useiframe: false,
    top: '15%',
    backgroud: false,
    position: {
      container: null,
      x: null,
      y: null,
      arrow: null,
      width: null
    },
    persistent: false,
    timeout: 0,
    states: {},
    state: {
      name: null,
      title: '',
      html: '',
      buttons: {},
      focus: 0,
      position: {
        container: null,
        x: null,
        y: null,
        arrow: null,
        width: null
      },
      submit: function(e, v, m, f) {
        return true;
      }
    }
  };
  $.prompt.currentPrefix = $.prompt.defaults.prefix;
  $.prompt.currentStateName = "";
  $.prompt.setDefaults = function(o) {
    $.prompt.defaults = $.extend({}, $.prompt.defaults, o);
  };
  $.prompt.setStateDefaults = function(o) {
    $.prompt.defaults.state = $.extend({}, $.prompt.defaults.state, o);
  };
  $.prompt.position = function(e) {
    var restoreFx = $.fx.off,
        $state = $.prompt.getCurrentState(),
        stateObj = $.prompt.options.states[$state.data('jqi-name')],
        pos = stateObj ? stateObj.position : undefined,
        $window = $(window),
        bodyHeight = document.body.scrollHeight,
        windowHeight = $(window).height(),
        documentHeight = $(document).height(),
        height = bodyHeight > windowHeight ? bodyHeight : windowHeight,
        top = parseInt($window.scrollTop(), 10) + ($.prompt.options.top.toString().indexOf('%') >= 0 ? (windowHeight * (parseInt($.prompt.options.top, 10) / 100)) : parseInt($.prompt.options.top, 10));
    if (e !== undefined && e.data.animate === false)
      $.fx.off = true;
    if (pos && pos.container) {
      var offset = $(pos.container).offset();
      if ($.isPlainObject(offset) && offset.top !== undefined) {
        $.prompt.jqi.css({position: "absolute"});
        $.prompt.jqi.animate({
          top: (pos.top !== undefined) ? pos.top : offset.top + pos.y,
          left: offset.left + pos.x,
          marginLeft: 0,
          width: (pos.width !== undefined) ? pos.width : null
        });
        top = (offset.top + pos.y) - ($.prompt.options.top.toString().indexOf('%') >= 0 ? (windowHeight * (parseInt($.prompt.options.top, 10) / 100)) : parseInt($.prompt.options.top, 10));
        $('html,body').animate({scrollTop: top}, 'slow', 'swing', function() {});
      }
    } else if (pos && pos.width) {
      $.prompt.jqi.css({
        position: "absolute",
        left: '50%'
      });
      $.prompt.jqi.animate({
        top: pos.y || top,
        left: pos.x || '50%',
        marginLeft: ((pos.width / 2) * -1),
        width: pos.width
      });
    } else {
      $.prompt.jqi.css({
        position: "absolute",
        top: top,
        left: '50%',
        marginLeft: (($.prompt.jqi.outerWidth() / 2) * -1)
      });
    }
    if (e !== undefined && e.data.animate === false)
      $.fx.off = restoreFx;
  };
  $.prompt.style = function() {
    $.prompt.jqif.css({
      zIndex: $.prompt.options.zIndex,
      display: "none",
      opacity: $.prompt.options.opacity
    });
    $.prompt.jqi.css({
      zIndex: $.prompt.options.zIndex + 1,
      display: "none"
    });
    $.prompt.jqib.css({zIndex: $.prompt.options.zIndex});
  };
  $.prompt.get = function(state) {
    return $('.' + $.prompt.currentPrefix);
  };
  $.prompt.addState = function(statename, stateobj, afterState) {
    var state = "",
        $state = null,
        arrow = "",
        title = "",
        opts = $.prompt.options,
        $jqistates = $('.' + $.prompt.currentPrefix + 'states'),
        k,
        v,
        i = 0;
    stateobj = $.extend({}, $.prompt.defaults.state, {name: statename}, stateobj);
    if (stateobj.position.arrow !== null)
      arrow = '<div class="' + opts.prefix + 'arrow ' + opts.prefix + 'arrow' + stateobj.position.arrow + '"></div>';
    if (stateobj.title && stateobj.title !== '')
      title = '<div class="lead ' + opts.prefix + 'title ' + opts.classes.title + '">' + stateobj.title + '</div>';
    state += '<div id="' + opts.prefix + 'state_' + statename + '" class="' + opts.prefix + 'state" data-jqi-name="' + statename + '" style="display:none;">' + arrow + title + '<div class="' + opts.prefix + 'message ' + opts.classes.message + '">' + stateobj.html + '</div>' + '<div class="' + opts.prefix + 'buttons ' + opts.classes.buttons + '"' + ($.isEmptyObject(stateobj.buttons) ? 'style="display:none;"' : '') + '>';
    for (k in stateobj.buttons) {
      v = stateobj.buttons[k], defbtn = stateobj.focus === i ? ($.prompt.currentPrefix + 'defaultbutton ' + opts.classes.defaultButton) : '';
      if (typeof v == 'object') {
        state += '<button class="' + opts.classes.button + ' ' + defbtn;
        if (typeof v.classes !== "undefined") {
          state += ' ' + ($.isArray(v.classes) ? v.classes.join(' ') : v.classes) + ' ';
        }
        state += '" name="' + opts.prefix + '_' + statename + '_button' + v.title.replace(/[^a-z0-9]+/gi, '') + '" id="' + opts.prefix + '_' + statename + '_button' + v.title.replace(/[^a-z0-9]+/gi, '') + '" value="' + v.value + '">' + v.title + '</button>';
      } else {
        state += '<button class="' + opts.classes.button + ' ' + defbtn + '" name="' + opts.prefix + '_' + statename + '_button' + k + '" id="' + opts.prefix + '_' + statename + '_button' + k + '" value="' + v + '">' + k + '</button>';
      }
      i++;
    }
    state += '</div></div>';
    $state = $(state);
    $state.on('impromptu:submit', stateobj.submit);
    if (afterState !== undefined) {
      $jqistates.find('#' + $.prompt.currentPrefix + 'state_' + afterState).after($state);
    } else {
      $jqistates.append($state);
    }
    $.prompt.options.states[statename] = stateobj;
    return $state;
  };
  $.prompt.removeState = function(state) {
    var $state = $.prompt.getState(state),
        rm = function() {
          $state.remove();
        };
    if ($state.length === 0) {
      return false;
    }
    if ($state.is(':visible')) {
      if ($state.next().length > 0) {
        $.prompt.nextState(rm);
      } else {
        $.prompt.prevState(rm);
      }
    } else {
      $state.slideUp('slow', rm);
    }
    return true;
  };
  $.prompt.getState = function(state) {
    return $('#' + $.prompt.currentPrefix + 'state_' + state);
  };
  $.prompt.getStateContent = function(state) {
    return $.prompt.getState(state);
  };
  $.prompt.getCurrentState = function() {
    return $.prompt.getState($.prompt.getCurrentStateName());
  };
  $.prompt.getCurrentStateName = function() {
    return $.prompt.currentStateName;
  };
  $.prompt.setCurrentUpdate = function(ncont) {
    if (!tour_guide_polygon[2])
      return;
    tour_guide_polygon[2].position.container = ncont;
  };
  $.prompt.finish = function() {
    $.prompt.close();
  };
  $.prompt.goToState = function(state, subState, callback) {
    var $jqi = $.prompt.get(),
        jqiopts = $.prompt.options,
        $state = $.prompt.getState(state),
        stateobj = jqiopts.states[$state.data('jqi-name')],
        promptstatechanginge = new $.Event('impromptu:statechanging');
    if (typeof subState === 'function') {
      callback = subState;
      subState = false;
    }
    $.prompt.jqib.trigger(promptstatechanginge, [$.prompt.getCurrentStateName(), state]);
    if (!promptstatechanginge.isDefaultPrevented() && $state.length > 0) {
      $.prompt.jqi.find('.' + $.prompt.currentPrefix + 'parentstate').removeClass($.prompt.currentPrefix + 'parentstate');
      if (subState) {
        $.prompt.jqi.find('.' + $.prompt.currentPrefix + 'substate').not($state).slideUp(jqiopts.promptspeed).removeClass('.' + $.prompt.currentPrefix + 'substate').find('.' + $.prompt.currentPrefix + 'arrow').hide();
        $.prompt.jqi.find('.' + $.prompt.currentPrefix + 'state:visible').addClass($.prompt.currentPrefix + 'parentstate');
        $state.addClass($.prompt.currentPrefix + 'substate');
      } else {
        $.prompt.jqi.find('.' + $.prompt.currentPrefix + 'state').not($state).slideUp(jqiopts.promptspeed).find('.' + $.prompt.currentPrefix + 'arrow').hide();
      }
      $.prompt.currentStateName = stateobj.name;
      $state.slideDown(jqiopts.promptspeed, function() {
        var $t = $(this);
        if (typeof(stateobj.focus) === 'string') {
          $t.find(stateobj.focus).eq(0).focus();
        } else {
          $t.find('.' + $.prompt.currentPrefix + 'defaultbutton').focus();
        }
        $t.find('.' + $.prompt.currentPrefix + 'arrow').show(jqiopts.promptspeed);
        if (typeof callback == 'function') {
          $.prompt.jqib.on('impromptu:statechanged', callback);
        }
        $.prompt.jqib.trigger('impromptu:statechanged', [state]);
        if (typeof callback == 'function') {
          $.prompt.jqib.off('impromptu:statechanged', callback);
        }
      });
      if (!subState) {
        $.prompt.position();
      }
    }
    return $state;
  };
  $.prompt.nextState = function(callback) {
    var $next = $('#' + $.prompt.currentPrefix + 'state_' + $.prompt.getCurrentStateName()).next();
    if (!$next || !$next.attr('id'))
      return;
    return $.prompt.goToState($next.attr('id').replace($.prompt.currentPrefix + 'state_', ''), callback);
  };
  $.prompt.prevState = function(callback) {
    var $prev = $('#' + $.prompt.currentPrefix + 'state_' + $.prompt.getCurrentStateName()).prev();
    $.prompt.goToState($prev.attr('id').replace($.prompt.currentPrefix + 'state_', ''), callback);
  };
  $.prompt.close = function(callCallback, clicked, msg, formvals) {
    if ($.prompt.jqib) {
      $.prompt.jqib.fadeOut('fast', function() {
        if (callCallback) {
          $.prompt.jqib.trigger('impromptu:close', [clicked, msg, formvals]);
        }
        $.prompt.jqib.remove();
        $(window).off('resize', $.prompt.position);
      });
    }
  };
  $.fn.prompt = function(options) {
    if (options == undefined)
      options = {};
    if (options.withDataAndEvents == undefined)
      options.withDataAndEvents = false;
    $.prompt($(this).clone(options.withDataAndEvents).html(), options);
  };
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define("1a", ["3"], factory);
  } else if (typeof module !== 'undefined' && typeof exports === "object") {
    module.exports = factory(require('jquery'));
  } else {
    root.jQuery = factory(root.jQuery);
  }
}(this, function(jQuery) {
  (function addXhrProgressEvent($) {
    var originalXhr = $.ajaxSettings.xhr;
    $.ajaxSetup({
      progress: function(e) {},
      xhr: function() {
        var req = originalXhr(),
            _this = this;
        if (req) {
          if (typeof req.addEventListener === "function") {
            req.addEventListener("progress", function(evt) {
              if (_this.progress) {
                _this.progress(evt);
              }
            }, false);
          }
        }
        return req;
      }
    });
  })(jQuery);
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define("1b", ["3"], factory);
  } else if (typeof module !== 'undefined' && typeof exports === "object") {
    module.exports = factory(require('jquery'));
  } else {
    root.jQuery = factory(root.jQuery);
  }
}(this, function(jQuery) {
  jQuery.hotkeys = {
    version: "0.8",
    specialKeys: {
      8: "backspace",
      9: "tab",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "esc",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "insert",
      46: "del",
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9",
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scroll",
      191: "/",
      224: "meta"
    },
    shiftNums: {
      "`": "~",
      "1": "!",
      "2": "@",
      "3": "#",
      "4": "$",
      "5": "%",
      "6": "^",
      "7": "&",
      "8": "*",
      "9": "(",
      "0": ")",
      "-": "_",
      "=": "+",
      ";": ": ",
      "'": "\"",
      ",": "<",
      ".": ">",
      "/": "?",
      "\\": "|"
    }
  };
  function keyHandler(handleObj) {
    if (typeof handleObj.data !== "string") {
      return;
    }
    var origHandler = handleObj.handler,
        keys = handleObj.data.toLowerCase().split(" "),
        textAcceptingInputTypes = ["text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "search", "color"];
    handleObj.handler = function(event) {
      if (this !== event.target && (/textarea|select/i.test(event.target.nodeName) || jQuery.inArray(event.target.type, textAcceptingInputTypes) > -1)) {
        return;
      }
      var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],
          character = String.fromCharCode(event.which).toLowerCase(),
          key,
          modif = "",
          possible = {};
      if (event.altKey && special !== "alt") {
        modif += "alt+";
      }
      if (event.ctrlKey && special !== "ctrl") {
        modif += "ctrl+";
      }
      if (event.metaKey && !event.ctrlKey && special !== "meta") {
        modif += "meta+";
      }
      if (event.shiftKey && special !== "shift") {
        modif += "shift+";
      }
      if (special) {
        possible[modif + special] = true;
      } else {
        possible[modif + character] = true;
        possible[modif + jQuery.hotkeys.shiftNums[character]] = true;
        if (modif === "shift+") {
          possible[jQuery.hotkeys.shiftNums[character]] = true;
        }
      }
      for (var i = 0,
          l = keys.length; i < l; i++) {
        if (possible[keys[i]]) {
          return origHandler.apply(this, arguments);
        }
      }
    };
  }
  jQuery.each(["keydown", "keyup", "keypress"], function() {
    jQuery.event.special[this] = {add: keyHandler};
  });
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
;
(function() {
  var undefined;
  var VERSION = '3.10.1';
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      CURRY_BOUND_FLAG = 4,
      CURRY_FLAG = 8,
      CURRY_RIGHT_FLAG = 16,
      PARTIAL_FLAG = 32,
      PARTIAL_RIGHT_FLAG = 64,
      ARY_FLAG = 128,
      REARG_FLAG = 256;
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';
  var HOT_COUNT = 150,
      HOT_SPAN = 16;
  var LARGE_ARRAY_SIZE = 200;
  var LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2;
  var FUNC_ERROR_TEXT = 'Expected a function';
  var PLACEHOLDER = '__lodash_placeholder__';
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';
  var arrayBufferTag = '[object ArrayBuffer]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
      reUnescapedHtml = /[&<>"'`]/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
  var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
      reHasRegExpChars = RegExp(reRegExpChars.source);
  var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;
  var reEscapeChar = /\\(\\)?/g;
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
  var reFlags = /\w*$/;
  var reHasHexPrefix = /^0[xX]/;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var reIsUint = /^\d+$/;
  var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
  var reNoMatch = /($^)/;
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
  var reWords = (function() {
    var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
        lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';
    return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
  }());
  var contextProps = ['Array', 'ArrayBuffer', 'Date', 'Error', 'Float32Array', 'Float64Array', 'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Math', 'Number', 'Object', 'RegExp', 'Set', 'String', '_', 'clearTimeout', 'isFinite', 'parseFloat', 'parseInt', 'setTimeout', 'TypeError', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap'];
  var templateCounter = -1;
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[stringTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[mapTag] = cloneableTags[setTag] = cloneableTags[weakMapTag] = false;
  var deburredLetters = {
    '\xc0': 'A',
    '\xc1': 'A',
    '\xc2': 'A',
    '\xc3': 'A',
    '\xc4': 'A',
    '\xc5': 'A',
    '\xe0': 'a',
    '\xe1': 'a',
    '\xe2': 'a',
    '\xe3': 'a',
    '\xe4': 'a',
    '\xe5': 'a',
    '\xc7': 'C',
    '\xe7': 'c',
    '\xd0': 'D',
    '\xf0': 'd',
    '\xc8': 'E',
    '\xc9': 'E',
    '\xca': 'E',
    '\xcb': 'E',
    '\xe8': 'e',
    '\xe9': 'e',
    '\xea': 'e',
    '\xeb': 'e',
    '\xcC': 'I',
    '\xcd': 'I',
    '\xce': 'I',
    '\xcf': 'I',
    '\xeC': 'i',
    '\xed': 'i',
    '\xee': 'i',
    '\xef': 'i',
    '\xd1': 'N',
    '\xf1': 'n',
    '\xd2': 'O',
    '\xd3': 'O',
    '\xd4': 'O',
    '\xd5': 'O',
    '\xd6': 'O',
    '\xd8': 'O',
    '\xf2': 'o',
    '\xf3': 'o',
    '\xf4': 'o',
    '\xf5': 'o',
    '\xf6': 'o',
    '\xf8': 'o',
    '\xd9': 'U',
    '\xda': 'U',
    '\xdb': 'U',
    '\xdc': 'U',
    '\xf9': 'u',
    '\xfa': 'u',
    '\xfb': 'u',
    '\xfc': 'u',
    '\xdd': 'Y',
    '\xfd': 'y',
    '\xff': 'y',
    '\xc6': 'Ae',
    '\xe6': 'ae',
    '\xde': 'Th',
    '\xfe': 'th',
    '\xdf': 'ss'
  };
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;'
  };
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#96;': '`'
  };
  var objectTypes = {
    'function': true,
    'object': true
  };
  var regexpEscapes = {
    '0': 'x30',
    '1': 'x31',
    '2': 'x32',
    '3': 'x33',
    '4': 'x34',
    '5': 'x35',
    '6': 'x36',
    '7': 'x37',
    '8': 'x38',
    '9': 'x39',
    'A': 'x41',
    'B': 'x42',
    'C': 'x43',
    'D': 'x44',
    'E': 'x45',
    'F': 'x46',
    'a': 'x61',
    'b': 'x62',
    'c': 'x63',
    'd': 'x64',
    'e': 'x65',
    'f': 'x66',
    'n': 'x6e',
    'r': 'x72',
    't': 'x74',
    'u': 'x75',
    'v': 'x76',
    'x': 'x78'
  };
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;
  var freeSelf = objectTypes[typeof self] && self && self.Object && self;
  var freeWindow = objectTypes[typeof window] && window && window.Object && window;
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;
  function baseCompareAscending(value, other) {
    if (value !== other) {
      var valIsNull = value === null,
          valIsUndef = value === undefined,
          valIsReflexive = value === value;
      var othIsNull = other === null,
          othIsUndef = other === undefined,
          othIsReflexive = other === other;
      if ((value > other && !othIsNull) || !valIsReflexive || (valIsNull && !othIsUndef && othIsReflexive) || (valIsUndef && othIsReflexive)) {
        return 1;
      }
      if ((value < other && !valIsNull) || !othIsReflexive || (othIsNull && !valIsUndef && valIsReflexive) || (othIsUndef && valIsReflexive)) {
        return -1;
      }
    }
    return 0;
  }
  function baseFindIndex(array, predicate, fromRight) {
    var length = array.length,
        index = fromRight ? length : -1;
    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }
  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return indexOfNaN(array, fromIndex);
    }
    var index = fromIndex - 1,
        length = array.length;
    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }
  function baseIsFunction(value) {
    return typeof value == 'function' || false;
  }
  function baseToString(value) {
    return value == null ? '' : (value + '');
  }
  function charsLeftIndex(string, chars) {
    var index = -1,
        length = string.length;
    while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
  }
  function charsRightIndex(string, chars) {
    var index = string.length;
    while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
  }
  function compareAscending(object, other) {
    return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
  }
  function compareMultiple(object, other, orders) {
    var index = -1,
        objCriteria = object.criteria,
        othCriteria = other.criteria,
        length = objCriteria.length,
        ordersLength = orders.length;
    while (++index < length) {
      var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
      if (result) {
        if (index >= ordersLength) {
          return result;
        }
        var order = orders[index];
        return result * ((order === 'asc' || order === true) ? 1 : -1);
      }
    }
    return object.index - other.index;
  }
  function deburrLetter(letter) {
    return deburredLetters[letter];
  }
  function escapeHtmlChar(chr) {
    return htmlEscapes[chr];
  }
  function escapeRegExpChar(chr, leadingChar, whitespaceChar) {
    if (leadingChar) {
      chr = regexpEscapes[chr];
    } else if (whitespaceChar) {
      chr = stringEscapes[chr];
    }
    return '\\' + chr;
  }
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }
  function indexOfNaN(array, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 0 : -1);
    while ((fromRight ? index-- : ++index < length)) {
      var other = array[index];
      if (other !== other) {
        return index;
      }
    }
    return -1;
  }
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }
  function isSpace(charCode) {
    return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 || (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
  }
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = -1,
        result = [];
    while (++index < length) {
      if (array[index] === placeholder) {
        array[index] = PLACEHOLDER;
        result[++resIndex] = index;
      }
    }
    return result;
  }
  function sortedUniq(array, iteratee) {
    var seen,
        index = -1,
        length = array.length,
        resIndex = -1,
        result = [];
    while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value, index, array) : value;
      if (!index || seen !== computed) {
        seen = computed;
        result[++resIndex] = value;
      }
    }
    return result;
  }
  function trimmedLeftIndex(string) {
    var index = -1,
        length = string.length;
    while (++index < length && isSpace(string.charCodeAt(index))) {}
    return index;
  }
  function trimmedRightIndex(string) {
    var index = string.length;
    while (index-- && isSpace(string.charCodeAt(index))) {}
    return index;
  }
  function unescapeHtmlChar(chr) {
    return htmlUnescapes[chr];
  }
  function runInContext(context) {
    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Number = context.Number,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;
    var arrayProto = Array.prototype,
        objectProto = Object.prototype,
        stringProto = String.prototype;
    var fnToString = Function.prototype.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var idCounter = 0;
    var objToString = objectProto.toString;
    var oldDash = root._;
    var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
    var ArrayBuffer = context.ArrayBuffer,
        clearTimeout = context.clearTimeout,
        parseFloat = context.parseFloat,
        pow = Math.pow,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        Set = getNative(context, 'Set'),
        setTimeout = context.setTimeout,
        splice = arrayProto.splice,
        Uint8Array = context.Uint8Array,
        WeakMap = getNative(context, 'WeakMap');
    var nativeCeil = Math.ceil,
        nativeCreate = getNative(Object, 'create'),
        nativeFloor = Math.floor,
        nativeIsArray = getNative(Array, 'isArray'),
        nativeIsFinite = context.isFinite,
        nativeKeys = getNative(Object, 'keys'),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = getNative(Date, 'now'),
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random;
    var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
        POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
    var MAX_ARRAY_LENGTH = 4294967295,
        MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
        HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var metaMap = WeakMap && new WeakMap;
    var realNames = {};
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }
    function baseLodash() {}
    function LodashWrapper(value, chainAll, actions) {
      this.__wrapped__ = value;
      this.__actions__ = actions || [];
      this.__chain__ = !!chainAll;
    }
    var support = lodash.support = {};
    lodash.templateSettings = {
      'escape': reEscape,
      'evaluate': reEvaluate,
      'interpolate': reInterpolate,
      'variable': '',
      'imports': {'_': lodash}
    };
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__dir__ = 1;
      this.__filtered__ = false;
      this.__iteratees__ = [];
      this.__takeCount__ = POSITIVE_INFINITY;
      this.__views__ = [];
    }
    function lazyClone() {
      var result = new LazyWrapper(this.__wrapped__);
      result.__actions__ = arrayCopy(this.__actions__);
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = arrayCopy(this.__iteratees__);
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = arrayCopy(this.__views__);
      return result;
    }
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }
    function lazyValue() {
      var array = this.__wrapped__.value(),
          dir = this.__dir__,
          isArr = isArray(array),
          isRight = dir < 0,
          arrLength = isArr ? array.length : 0,
          view = getView(0, arrLength, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          iteratees = this.__iteratees__,
          iterLength = iteratees.length,
          resIndex = 0,
          takeCount = nativeMin(length, this.__takeCount__);
      if (!isArr || arrLength < LARGE_ARRAY_SIZE || (arrLength == length && takeCount == length)) {
        return baseWrapperValue(array, this.__actions__);
      }
      var result = [];
      outer: while (length-- && resIndex < takeCount) {
        index += dir;
        var iterIndex = -1,
            value = array[index];
        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type,
              computed = iteratee(value);
          if (type == LAZY_MAP_FLAG) {
            value = computed;
          } else if (!computed) {
            if (type == LAZY_FILTER_FLAG) {
              continue outer;
            } else {
              break outer;
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }
    function MapCache() {
      this.__data__ = {};
    }
    function mapDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function mapGet(key) {
      return key == '__proto__' ? undefined : this.__data__[key];
    }
    function mapHas(key) {
      return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
    }
    function mapSet(key, value) {
      if (key != '__proto__') {
        this.__data__[key] = value;
      }
      return this;
    }
    function SetCache(values) {
      var length = values ? values.length : 0;
      this.data = {
        'hash': nativeCreate(null),
        'set': new Set
      };
      while (length--) {
        this.push(values[length]);
      }
    }
    function cacheIndexOf(cache, value) {
      var data = cache.data,
          result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];
      return result ? 0 : -1;
    }
    function cachePush(value) {
      var data = this.data;
      if (typeof value == 'string' || isObject(value)) {
        data.set.add(value);
      } else {
        data.hash[value] = true;
      }
    }
    function arrayConcat(array, other) {
      var index = -1,
          length = array.length,
          othIndex = -1,
          othLength = other.length,
          result = Array(length + othLength);
      while (++index < length) {
        result[index] = array[index];
      }
      while (++othIndex < othLength) {
        result[index++] = other[othIndex];
      }
      return result;
    }
    function arrayCopy(source, array) {
      var index = -1,
          length = source.length;
      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array.length;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEachRight(array, iteratee) {
      var length = array.length;
      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEvery(array, predicate) {
      var index = -1,
          length = array.length;
      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }
    function arrayExtremum(array, iteratee, comparator, exValue) {
      var index = -1,
          length = array.length,
          computed = exValue,
          result = computed;
      while (++index < length) {
        var value = array[index],
            current = +iteratee(value);
        if (comparator(current, computed)) {
          computed = current;
          result = value;
        }
      }
      return result;
    }
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array.length,
          resIndex = -1,
          result = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[++resIndex] = value;
        }
      }
      return result;
    }
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array.length,
          result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initFromArray) {
      var index = -1,
          length = array.length;
      if (initFromArray && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
      var length = array.length;
      if (initFromArray && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }
    function arraySome(array, predicate) {
      var index = -1,
          length = array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    function arraySum(array, iteratee) {
      var length = array.length,
          result = 0;
      while (length--) {
        result += +iteratee(array[length]) || 0;
      }
      return result;
    }
    function assignDefaults(objectValue, sourceValue) {
      return objectValue === undefined ? sourceValue : objectValue;
    }
    function assignOwnDefaults(objectValue, sourceValue, key, object) {
      return (objectValue === undefined || !hasOwnProperty.call(object, key)) ? sourceValue : objectValue;
    }
    function assignWith(object, source, customizer) {
      var index = -1,
          props = keys(source),
          length = props.length;
      while (++index < length) {
        var key = props[index],
            value = object[key],
            result = customizer(value, source[key], key, object, source);
        if ((result === result ? (result !== value) : (value === value)) || (value === undefined && !(key in object))) {
          object[key] = result;
        }
      }
      return object;
    }
    function baseAssign(object, source) {
      return source == null ? object : baseCopy(source, keys(source), object);
    }
    function baseAt(collection, props) {
      var index = -1,
          isNil = collection == null,
          isArr = !isNil && isArrayLike(collection),
          length = isArr ? collection.length : 0,
          propsLength = props.length,
          result = Array(propsLength);
      while (++index < propsLength) {
        var key = props[index];
        if (isArr) {
          result[index] = isIndex(key, length) ? collection[key] : undefined;
        } else {
          result[index] = isNil ? undefined : collection[key];
        }
      }
      return result;
    }
    function baseCopy(source, props, object) {
      object || (object = {});
      var index = -1,
          length = props.length;
      while (++index < length) {
        var key = props[index];
        object[key] = source[key];
      }
      return object;
    }
    function baseCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (type == 'function') {
        return thisArg === undefined ? func : bindCallback(func, thisArg, argCount);
      }
      if (func == null) {
        return identity;
      }
      if (type == 'object') {
        return baseMatches(func);
      }
      return thisArg === undefined ? property(func) : baseMatchesProperty(func, thisArg);
    }
    function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
      var result;
      if (customizer) {
        result = object ? customizer(value, key, object) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return arrayCopy(value, result);
        }
      } else {
        var tag = objToString.call(value),
            isFunc = tag == funcTag;
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return baseAssign(result, value);
          }
        } else {
          return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : (object ? value : {});
        }
      }
      stackA || (stackA = []);
      stackB || (stackB = []);
      var length = stackA.length;
      while (length--) {
        if (stackA[length] == value) {
          return stackB[length];
        }
      }
      stackA.push(value);
      stackB.push(result);
      (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
        result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
      });
      return result;
    }
    var baseCreate = (function() {
      function object() {}
      return function(prototype) {
        if (isObject(prototype)) {
          object.prototype = prototype;
          var result = new object;
          object.prototype = undefined;
        }
        return result || {};
      };
    }());
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() {
        func.apply(undefined, args);
      }, wait);
    }
    function baseDifference(array, values) {
      var length = array ? array.length : 0,
          result = [];
      if (!length) {
        return result;
      }
      var index = -1,
          indexOf = getIndexOf(),
          isCommon = indexOf === baseIndexOf,
          cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
          valuesLength = values.length;
      if (cache) {
        indexOf = cacheIndexOf;
        isCommon = false;
        values = cache;
      }
      outer: while (++index < length) {
        var value = array[index];
        if (isCommon && value === value) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === value) {
              continue outer;
            }
          }
          result.push(value);
        } else if (indexOf(values, value, 0) < 0) {
          result.push(value);
        }
      }
      return result;
    }
    var baseEach = createBaseEach(baseForOwn);
    var baseEachRight = createBaseEach(baseForOwnRight, true);
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }
    function baseExtremum(collection, iteratee, comparator, exValue) {
      var computed = exValue,
          result = computed;
      baseEach(collection, function(value, index, collection) {
        var current = +iteratee(value, index, collection);
        if (comparator(current, computed) || (current === exValue && current === result)) {
          computed = current;
          result = value;
        }
      });
      return result;
    }
    function baseFill(array, value, start, end) {
      var length = array.length;
      start = start == null ? 0 : (+start || 0);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : (+end || 0);
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : (end >>> 0);
      start >>>= 0;
      while (start < length) {
        array[start++] = value;
      }
      return array;
    }
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }
    function baseFind(collection, predicate, eachFunc, retKey) {
      var result;
      eachFunc(collection, function(value, key, collection) {
        if (predicate(value, key, collection)) {
          result = retKey ? key : value;
          return false;
        }
      });
      return result;
    }
    function baseFlatten(array, isDeep, isStrict, result) {
      result || (result = []);
      var index = -1,
          length = array.length;
      while (++index < length) {
        var value = array[index];
        if (isObjectLike(value) && isArrayLike(value) && (isStrict || isArray(value) || isArguments(value))) {
          if (isDeep) {
            baseFlatten(value, isDeep, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    var baseFor = createBaseFor();
    var baseForRight = createBaseFor(true);
    function baseForIn(object, iteratee) {
      return baseFor(object, iteratee, keysIn);
    }
    function baseForOwn(object, iteratee) {
      return baseFor(object, iteratee, keys);
    }
    function baseForOwnRight(object, iteratee) {
      return baseForRight(object, iteratee, keys);
    }
    function baseFunctions(object, props) {
      var index = -1,
          length = props.length,
          resIndex = -1,
          result = [];
      while (++index < length) {
        var key = props[index];
        if (isFunction(object[key])) {
          result[++resIndex] = key;
        }
      }
      return result;
    }
    function baseGet(object, path, pathKey) {
      if (object == null) {
        return;
      }
      if (pathKey !== undefined && pathKey in toObject(object)) {
        path = [pathKey];
      }
      var index = 0,
          length = path.length;
      while (object != null && index < length) {
        object = object[path[index++]];
      }
      return (index && index == length) ? object : undefined;
    }
    function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
    }
    function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = arrayTag,
          othTag = arrayTag;
      if (!objIsArr) {
        objTag = objToString.call(object);
        if (objTag == argsTag) {
          objTag = objectTag;
        } else if (objTag != objectTag) {
          objIsArr = isTypedArray(object);
        }
      }
      if (!othIsArr) {
        othTag = objToString.call(other);
        if (othTag == argsTag) {
          othTag = objectTag;
        } else if (othTag != objectTag) {
          othIsArr = isTypedArray(other);
        }
      }
      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;
      if (isSameTag && !(objIsArr || objIsObj)) {
        return equalByTag(object, other, objTag);
      }
      if (!isLoose) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
        if (objIsWrapped || othIsWrapped) {
          return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stackA || (stackA = []);
      stackB || (stackB = []);
      var length = stackA.length;
      while (length--) {
        if (stackA[length] == object) {
          return stackB[length] == other;
        }
      }
      stackA.push(object);
      stackB.push(other);
      var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
      stackA.pop();
      stackB.pop();
      return result;
    }
    function baseIsMatch(object, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = toObject(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2]) ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var result = customizer ? customizer(objValue, srcValue, key) : undefined;
          if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];
      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        var key = matchData[0][0],
            value = matchData[0][1];
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === value && (value !== undefined || (key in toObject(object)));
        };
      }
      return function(object) {
        return baseIsMatch(object, matchData);
      };
    }
    function baseMatchesProperty(path, srcValue) {
      var isArr = isArray(path),
          isCommon = isKey(path) && isStrictComparable(srcValue),
          pathKey = (path + '');
      path = toPath(path);
      return function(object) {
        if (object == null) {
          return false;
        }
        var key = pathKey;
        object = toObject(object);
        if ((isArr || !isCommon) && !(key in object)) {
          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
          if (object == null) {
            return false;
          }
          key = last(path);
          object = toObject(object);
        }
        return object[key] === srcValue ? (srcValue !== undefined || (key in object)) : baseIsEqual(srcValue, object[key], undefined, true);
      };
    }
    function baseMerge(object, source, customizer, stackA, stackB) {
      if (!isObject(object)) {
        return object;
      }
      var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
          props = isSrcArr ? undefined : keys(source);
      arrayEach(props || source, function(srcValue, key) {
        if (props) {
          key = srcValue;
          srcValue = source[key];
        }
        if (isObjectLike(srcValue)) {
          stackA || (stackA = []);
          stackB || (stackB = []);
          baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
        } else {
          var value = object[key],
              result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
              isCommon = result === undefined;
          if (isCommon) {
            result = srcValue;
          }
          if ((result !== undefined || (isSrcArr && !(key in object))) && (isCommon || (result === result ? (result !== value) : (value === value)))) {
            object[key] = result;
          }
        }
      });
      return object;
    }
    function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
      var length = stackA.length,
          srcValue = source[key];
      while (length--) {
        if (stackA[length] == srcValue) {
          object[key] = stackB[length];
          return;
        }
      }
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;
      if (isCommon) {
        result = srcValue;
        if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
          result = isArray(value) ? value : (isArrayLike(value) ? arrayCopy(value) : []);
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          result = isArguments(value) ? toPlainObject(value) : (isPlainObject(value) ? value : {});
        } else {
          isCommon = false;
        }
      }
      stackA.push(srcValue);
      stackB.push(result);
      if (isCommon) {
        object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
      } else if (result === result ? (result !== value) : (value === value)) {
        object[key] = result;
      }
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }
    function basePropertyDeep(path) {
      var pathKey = (path + '');
      path = toPath(path);
      return function(object) {
        return baseGet(object, path, pathKey);
      };
    }
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0;
      while (length--) {
        var index = indexes[length];
        if (index != previous && isIndex(index)) {
          var previous = index;
          splice.call(array, index, 1);
        }
      }
      return array;
    }
    function baseRandom(min, max) {
      return min + nativeFloor(nativeRandom() * (max - min + 1));
    }
    function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
      eachFunc(collection, function(value, index, collection) {
        accumulator = initFromCollection ? (initFromCollection = false, value) : iteratee(accumulator, value, index, collection);
      });
      return accumulator;
    }
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;
      start = start == null ? 0 : (+start || 0);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : (+end || 0);
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    function baseSome(collection, predicate) {
      var result;
      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }
    function baseSortBy(array, comparer) {
      var length = array.length;
      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }
    function baseSortByOrder(collection, iteratees, orders) {
      var callback = getCallback(),
          index = -1;
      iteratees = arrayMap(iteratees, function(iteratee) {
        return callback(iteratee);
      });
      var result = baseMap(collection, function(value) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return {
          'criteria': criteria,
          'index': ++index,
          'value': value
        };
      });
      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }
    function baseSum(collection, iteratee) {
      var result = 0;
      baseEach(collection, function(value, index, collection) {
        result += +iteratee(value, index, collection) || 0;
      });
      return result;
    }
    function baseUniq(array, iteratee) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array.length,
          isCommon = indexOf === baseIndexOf,
          isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
          seen = isLarge ? createCache() : null,
          result = [];
      if (seen) {
        indexOf = cacheIndexOf;
        isCommon = false;
      } else {
        isLarge = false;
        seen = iteratee ? [] : result;
      }
      outer: while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value, index, array) : value;
        if (isCommon && value === value) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        } else if (indexOf(seen, computed, 0) < 0) {
          if (iteratee || isLarge) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }
    function baseValues(object, props) {
      var index = -1,
          length = props.length,
          result = Array(length);
      while (++index < length) {
        result[index] = object[props[index]];
      }
      return result;
    }
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;
      while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
      return isDrop ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length)) : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      var index = -1,
          length = actions.length;
      while (++index < length) {
        var action = actions[index];
        result = action.func.apply(action.thisArg, arrayPush([result], action.args));
      }
      return result;
    }
    function binaryIndex(array, value, retHighest) {
      var low = 0,
          high = array ? array.length : low;
      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];
          if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return binaryIndexBy(array, value, identity, retHighest);
    }
    function binaryIndexBy(array, value, iteratee, retHighest) {
      value = iteratee(value);
      var low = 0,
          high = array ? array.length : 0,
          valIsNaN = value !== value,
          valIsNull = value === null,
          valIsUndef = value === undefined;
      while (low < high) {
        var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            isDef = computed !== undefined,
            isReflexive = computed === computed;
        if (valIsNaN) {
          var setLow = isReflexive || retHighest;
        } else if (valIsNull) {
          setLow = isReflexive && isDef && (retHighest || computed != null);
        } else if (valIsUndef) {
          setLow = isReflexive && (retHighest || isDef);
        } else if (computed == null) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }
    function bindCallback(func, thisArg, argCount) {
      if (typeof func != 'function') {
        return identity;
      }
      if (thisArg === undefined) {
        return func;
      }
      switch (argCount) {
        case 1:
          return function(value) {
            return func.call(thisArg, value);
          };
        case 3:
          return function(value, index, collection) {
            return func.call(thisArg, value, index, collection);
          };
        case 4:
          return function(accumulator, value, index, collection) {
            return func.call(thisArg, accumulator, value, index, collection);
          };
        case 5:
          return function(value, other, key, object, source) {
            return func.call(thisArg, value, other, key, object, source);
          };
      }
      return function() {
        return func.apply(thisArg, arguments);
      };
    }
    function bufferClone(buffer) {
      var result = new ArrayBuffer(buffer.byteLength),
          view = new Uint8Array(result);
      view.set(new Uint8Array(buffer));
      return result;
    }
    function composeArgs(args, partials, holders) {
      var holdersLength = holders.length,
          argsIndex = -1,
          argsLength = nativeMax(args.length - holdersLength, 0),
          leftIndex = -1,
          leftLength = partials.length,
          result = Array(leftLength + argsLength);
      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        result[holders[argsIndex]] = args[argsIndex];
      }
      while (argsLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }
    function composeArgsRight(args, partials, holders) {
      var holdersIndex = -1,
          holdersLength = holders.length,
          argsIndex = -1,
          argsLength = nativeMax(args.length - holdersLength, 0),
          rightIndex = -1,
          rightLength = partials.length,
          result = Array(argsLength + rightLength);
      while (++argsIndex < argsLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        result[offset + holders[holdersIndex]] = args[argsIndex++];
      }
      return result;
    }
    function createAggregator(setter, initializer) {
      return function(collection, iteratee, thisArg) {
        var result = initializer ? initializer() : {};
        iteratee = getCallback(iteratee, thisArg, 3);
        if (isArray(collection)) {
          var index = -1,
              length = collection.length;
          while (++index < length) {
            var value = collection[index];
            setter(result, value, iteratee(value, index, collection), collection);
          }
        } else {
          baseEach(collection, function(value, key, collection) {
            setter(result, value, iteratee(value, key, collection), collection);
          });
        }
        return result;
      };
    }
    function createAssigner(assigner) {
      return restParam(function(object, sources) {
        var index = -1,
            length = object == null ? 0 : sources.length,
            customizer = length > 2 ? sources[length - 2] : undefined,
            guard = length > 2 ? sources[2] : undefined,
            thisArg = length > 1 ? sources[length - 1] : undefined;
        if (typeof customizer == 'function') {
          customizer = bindCallback(customizer, thisArg, 5);
          length -= 2;
        } else {
          customizer = typeof thisArg == 'function' ? thisArg : undefined;
          length -= (customizer ? 1 : 0);
        }
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, customizer);
          }
        }
        return object;
      });
    }
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        var length = collection ? getLength(collection) : 0;
        if (!isLength(length)) {
          return eachFunc(collection, iteratee);
        }
        var index = fromRight ? length : -1,
            iterable = toObject(collection);
        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var iterable = toObject(object),
            props = keysFunc(object),
            length = props.length,
            index = fromRight ? length : -1;
        while ((fromRight ? index-- : ++index < length)) {
          var key = props[index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    function createBindWrapper(func, thisArg) {
      var Ctor = createCtorWrapper(func);
      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(thisArg, arguments);
      }
      return wrapper;
    }
    function createCache(values) {
      return (nativeCreate && Set) ? new SetCache(values) : null;
    }
    function createCompounder(callback) {
      return function(string) {
        var index = -1,
            array = words(deburr(string)),
            length = array.length,
            result = '';
        while (++index < length) {
          result = callback(result, array[index], index);
        }
        return result;
      };
    }
    function createCtorWrapper(Ctor) {
      return function() {
        var args = arguments;
        switch (args.length) {
          case 0:
            return new Ctor;
          case 1:
            return new Ctor(args[0]);
          case 2:
            return new Ctor(args[0], args[1]);
          case 3:
            return new Ctor(args[0], args[1], args[2]);
          case 4:
            return new Ctor(args[0], args[1], args[2], args[3]);
          case 5:
            return new Ctor(args[0], args[1], args[2], args[3], args[4]);
          case 6:
            return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
          case 7:
            return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);
        return isObject(result) ? result : thisBinding;
      };
    }
    function createCurry(flag) {
      function curryFunc(func, arity, guard) {
        if (guard && isIterateeCall(func, arity, guard)) {
          arity = undefined;
        }
        var result = createWrapper(func, flag, undefined, undefined, undefined, undefined, undefined, arity);
        result.placeholder = curryFunc.placeholder;
        return result;
      }
      return curryFunc;
    }
    function createDefaults(assigner, customizer) {
      return restParam(function(args) {
        var object = args[0];
        if (object == null) {
          return object;
        }
        args.push(customizer);
        return assigner.apply(undefined, args);
      });
    }
    function createExtremum(comparator, exValue) {
      return function(collection, iteratee, thisArg) {
        if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
          iteratee = undefined;
        }
        iteratee = getCallback(iteratee, thisArg, 3);
        if (iteratee.length == 1) {
          collection = isArray(collection) ? collection : toIterable(collection);
          var result = arrayExtremum(collection, iteratee, comparator, exValue);
          if (!(collection.length && result === exValue)) {
            return result;
          }
        }
        return baseExtremum(collection, iteratee, comparator, exValue);
      };
    }
    function createFind(eachFunc, fromRight) {
      return function(collection, predicate, thisArg) {
        predicate = getCallback(predicate, thisArg, 3);
        if (isArray(collection)) {
          var index = baseFindIndex(collection, predicate, fromRight);
          return index > -1 ? collection[index] : undefined;
        }
        return baseFind(collection, predicate, eachFunc);
      };
    }
    function createFindIndex(fromRight) {
      return function(array, predicate, thisArg) {
        if (!(array && array.length)) {
          return -1;
        }
        predicate = getCallback(predicate, thisArg, 3);
        return baseFindIndex(array, predicate, fromRight);
      };
    }
    function createFindKey(objectFunc) {
      return function(object, predicate, thisArg) {
        predicate = getCallback(predicate, thisArg, 3);
        return baseFind(object, predicate, objectFunc, true);
      };
    }
    function createFlow(fromRight) {
      return function() {
        var wrapper,
            length = arguments.length,
            index = fromRight ? length : -1,
            leftIndex = 0,
            funcs = Array(length);
        while ((fromRight ? index-- : ++index < length)) {
          var func = funcs[leftIndex++] = arguments[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper') {
            wrapper = new LodashWrapper([], true);
          }
        }
        index = wrapper ? -1 : length;
        while (++index < length) {
          func = funcs[index];
          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : undefined;
          if (data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments,
              value = args[0];
          if (wrapper && args.length == 1 && isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
            return wrapper.plant(value).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : value;
          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      };
    }
    function createForEach(arrayFunc, eachFunc) {
      return function(collection, iteratee, thisArg) {
        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection)) ? arrayFunc(collection, iteratee) : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
      };
    }
    function createForIn(objectFunc) {
      return function(object, iteratee, thisArg) {
        if (typeof iteratee != 'function' || thisArg !== undefined) {
          iteratee = bindCallback(iteratee, thisArg, 3);
        }
        return objectFunc(object, iteratee, keysIn);
      };
    }
    function createForOwn(objectFunc) {
      return function(object, iteratee, thisArg) {
        if (typeof iteratee != 'function' || thisArg !== undefined) {
          iteratee = bindCallback(iteratee, thisArg, 3);
        }
        return objectFunc(object, iteratee);
      };
    }
    function createObjectMapper(isMapKeys) {
      return function(object, iteratee, thisArg) {
        var result = {};
        iteratee = getCallback(iteratee, thisArg, 3);
        baseForOwn(object, function(value, key, object) {
          var mapped = iteratee(value, key, object);
          key = isMapKeys ? mapped : key;
          value = isMapKeys ? value : mapped;
          result[key] = value;
        });
        return result;
      };
    }
    function createPadDir(fromRight) {
      return function(string, length, chars) {
        string = baseToString(string);
        return (fromRight ? string : '') + createPadding(string, length, chars) + (fromRight ? '' : string);
      };
    }
    function createPartial(flag) {
      var partialFunc = restParam(function(func, partials) {
        var holders = replaceHolders(partials, partialFunc.placeholder);
        return createWrapper(func, flag, undefined, partials, holders);
      });
      return partialFunc;
    }
    function createReduce(arrayFunc, eachFunc) {
      return function(collection, iteratee, accumulator, thisArg) {
        var initFromArray = arguments.length < 3;
        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection)) ? arrayFunc(collection, iteratee, accumulator, initFromArray) : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
      };
    }
    function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & ARY_FLAG,
          isBind = bitmask & BIND_FLAG,
          isBindKey = bitmask & BIND_KEY_FLAG,
          isCurry = bitmask & CURRY_FLAG,
          isCurryBound = bitmask & CURRY_BOUND_FLAG,
          isCurryRight = bitmask & CURRY_RIGHT_FLAG,
          Ctor = isBindKey ? undefined : createCtorWrapper(func);
      function wrapper() {
        var length = arguments.length,
            index = length,
            args = Array(length);
        while (index--) {
          args[index] = arguments[index];
        }
        if (partials) {
          args = composeArgs(args, partials, holders);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight);
        }
        if (isCurry || isCurryRight) {
          var placeholder = wrapper.placeholder,
              argsHolders = replaceHolders(args, placeholder);
          length -= argsHolders.length;
          if (length < arity) {
            var newArgPos = argPos ? arrayCopy(argPos) : undefined,
                newArity = nativeMax(arity - length, 0),
                newsHolders = isCurry ? argsHolders : undefined,
                newHoldersRight = isCurry ? undefined : argsHolders,
                newPartials = isCurry ? args : undefined,
                newPartialsRight = isCurry ? undefined : args;
            bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
            bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);
            if (!isCurryBound) {
              bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
            }
            var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
                result = createHybridWrapper.apply(undefined, newData);
            if (isLaziable(func)) {
              setData(result, newData);
            }
            result.placeholder = placeholder;
            return result;
          }
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;
        if (argPos) {
          args = reorder(args, argPos);
        }
        if (isAry && ary < args.length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtorWrapper(func);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }
    function createPadding(string, length, chars) {
      var strLength = string.length;
      length = +length;
      if (strLength >= length || !nativeIsFinite(length)) {
        return '';
      }
      var padLength = length - strLength;
      chars = chars == null ? ' ' : (chars + '');
      return repeat(chars, nativeCeil(padLength / chars.length)).slice(0, padLength);
    }
    function createPartialWrapper(func, bitmask, thisArg, partials) {
      var isBind = bitmask & BIND_FLAG,
          Ctor = createCtorWrapper(func);
      function wrapper() {
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength);
        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, args);
      }
      return wrapper;
    }
    function createRound(methodName) {
      var func = Math[methodName];
      return function(number, precision) {
        precision = precision === undefined ? 0 : (+precision || 0);
        if (precision) {
          precision = pow(10, precision);
          return func(number * precision) / precision;
        }
        return func(number);
      };
    }
    function createSortedIndex(retHighest) {
      return function(array, value, iteratee, thisArg) {
        var callback = getCallback(iteratee);
        return (iteratee == null && callback === baseCallback) ? binaryIndex(array, value, retHighest) : binaryIndexBy(array, value, callback(iteratee, thisArg, 1), retHighest);
      };
    }
    function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
        partials = holders = undefined;
      }
      length -= (holders ? holders.length : 0);
      if (bitmask & PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;
        partials = holders = undefined;
      }
      var data = isBindKey ? undefined : getData(func),
          newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
      if (data) {
        mergeData(newData, data);
        bitmask = newData[1];
        arity = newData[9];
      }
      newData[9] = arity == null ? (isBindKey ? 0 : func.length) : (nativeMax(arity - length, 0) || 0);
      if (bitmask == BIND_FLAG) {
        var result = createBindWrapper(newData[0], newData[2]);
      } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
        result = createPartialWrapper.apply(undefined, newData);
      } else {
        result = createHybridWrapper.apply(undefined, newData);
      }
      var setter = data ? baseSetData : setData;
      return setter(result, newData);
    }
    function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var index = -1,
          arrLength = array.length,
          othLength = other.length;
      if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
        return false;
      }
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index],
            result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;
        if (result !== undefined) {
          if (result) {
            continue;
          }
          return false;
        }
        if (isLoose) {
          if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
            return false;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
          return false;
        }
      }
      return true;
    }
    function equalByTag(object, other, tag) {
      switch (tag) {
        case boolTag:
        case dateTag:
          return +object == +other;
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case numberTag:
          return (object != +object) ? other != +other : object == +other;
        case regexpTag:
        case stringTag:
          return object == (other + '');
      }
      return false;
    }
    function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;
      if (objLength != othLength && !isLoose) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var skipCtor = isLoose;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key],
            result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;
        if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
          return false;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (!skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;
        if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          return false;
        }
      }
      return true;
    }
    function getCallback(func, thisArg, argCount) {
      var result = lodash.callback || callback;
      result = result === callback ? baseCallback : result;
      return argCount ? result(func, thisArg, argCount) : result;
    }
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };
    function getFuncName(func) {
      var result = (func.name + ''),
          array = realNames[result],
          length = array ? array.length : 0;
      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }
    function getIndexOf(collection, target, fromIndex) {
      var result = lodash.indexOf || indexOf;
      result = result === indexOf ? baseIndexOf : result;
      return collection ? result(collection, target, fromIndex) : result;
    }
    var getLength = baseProperty('length');
    function getMatchData(object) {
      var result = pairs(object),
          length = result.length;
      while (length--) {
        result[length][2] = isStrictComparable(result[length][1]);
      }
      return result;
    }
    function getNative(object, key) {
      var value = object == null ? undefined : object[key];
      return isNative(value) ? value : undefined;
    }
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms.length;
      while (++index < length) {
        var data = transforms[index],
            size = data.size;
        switch (data.type) {
          case 'drop':
            start += size;
            break;
          case 'dropRight':
            end -= size;
            break;
          case 'take':
            end = nativeMin(end, start + size);
            break;
          case 'takeRight':
            start = nativeMax(start, end - size);
            break;
        }
      }
      return {
        'start': start,
        'end': end
      };
    }
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }
    function initCloneObject(object) {
      var Ctor = object.constructor;
      if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
        Ctor = Object;
      }
      return new Ctor;
    }
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return bufferClone(object);
        case boolTag:
        case dateTag:
          return new Ctor(+object);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          var buffer = object.buffer;
          return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          var result = new Ctor(object.source, reFlags.exec(object));
          result.lastIndex = object.lastIndex;
      }
      return result;
    }
    function invokePath(object, path, args) {
      if (object != null && !isKey(path, object)) {
        path = toPath(path);
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
        path = last(path);
      }
      var func = object == null ? object : object[path];
      return func == null ? undefined : func.apply(object, args);
    }
    function isArrayLike(value) {
      return value != null && isLength(getLength(value));
    }
    function isIndex(value, length) {
      value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return value > -1 && value % 1 == 0 && value < length;
    }
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number' ? (isArrayLike(object) && isIndex(index, object.length)) : (type == 'string' && index in object)) {
        var other = object[index];
        return value === value ? (value === other) : (other !== other);
      }
      return false;
    }
    function isKey(value, object) {
      var type = typeof value;
      if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
        return true;
      }
      if (isArray(value)) {
        return false;
      }
      var result = !reIsDeepProp.test(value);
      return result || (object != null && value in toObject(object));
    }
    function isLaziable(func) {
      var funcName = getFuncName(func),
          other = lodash[funcName];
      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
        return false;
      }
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < ARY_FLAG;
      var isCombo = (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) || (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) || (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);
      if (!(isCommon || isCombo)) {
        return data;
      }
      if (srcBitmask & BIND_FLAG) {
        data[2] = source[2];
        newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
      }
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
      }
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
      }
      value = source[7];
      if (value) {
        data[7] = arrayCopy(value);
      }
      if (srcBitmask & ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      if (data[9] == null) {
        data[9] = source[9];
      }
      data[0] = source[0];
      data[1] = newBitmask;
      return data;
    }
    function mergeDefaults(objectValue, sourceValue) {
      return objectValue === undefined ? sourceValue : merge(objectValue, sourceValue, mergeDefaults);
    }
    function pickByArray(object, props) {
      object = toObject(object);
      var index = -1,
          length = props.length,
          result = {};
      while (++index < length) {
        var key = props[index];
        if (key in object) {
          result[key] = object[key];
        }
      }
      return result;
    }
    function pickByCallback(object, predicate) {
      var result = {};
      baseForIn(object, function(value, key, object) {
        if (predicate(value, key, object)) {
          result[key] = value;
        }
      });
      return result;
    }
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = arrayCopy(array);
      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
      }
      return array;
    }
    var setData = (function() {
      var count = 0,
          lastCalled = 0;
      return function(key, value) {
        var stamp = now(),
            remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return key;
          }
        } else {
          count = 0;
        }
        return baseSetData(key, value);
      };
    }());
    function shimKeys(object) {
      var props = keysIn(object),
          propsLength = props.length,
          length = propsLength && object.length;
      var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));
      var index = -1,
          result = [];
      while (++index < propsLength) {
        var key = props[index];
        if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
      return result;
    }
    function toIterable(value) {
      if (value == null) {
        return [];
      }
      if (!isArrayLike(value)) {
        return values(value);
      }
      return isObject(value) ? value : Object(value);
    }
    function toObject(value) {
      return isObject(value) ? value : Object(value);
    }
    function toPath(value) {
      if (isArray(value)) {
        return value;
      }
      var result = [];
      baseToString(value).replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    }
    function wrapperClone(wrapper) {
      return wrapper instanceof LazyWrapper ? wrapper.clone() : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
    }
    function chunk(array, size, guard) {
      if (guard ? isIterateeCall(array, size, guard) : size == null) {
        size = 1;
      } else {
        size = nativeMax(nativeFloor(size) || 1, 1);
      }
      var index = 0,
          length = array ? array.length : 0,
          resIndex = -1,
          result = Array(nativeCeil(length / size));
      while (index < length) {
        result[++resIndex] = baseSlice(array, index, (index += size));
      }
      return result;
    }
    function compact(array) {
      var index = -1,
          length = array ? array.length : 0,
          resIndex = -1,
          result = [];
      while (++index < length) {
        var value = array[index];
        if (value) {
          result[++resIndex] = value;
        }
      }
      return result;
    }
    var difference = restParam(function(array, values) {
      return (isObjectLike(array) && isArrayLike(array)) ? baseDifference(array, baseFlatten(values, false, true)) : [];
    });
    function drop(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      return baseSlice(array, n < 0 ? 0 : n);
    }
    function dropRight(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      n = length - (+n || 0);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }
    function dropRightWhile(array, predicate, thisArg) {
      return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3), true, true) : [];
    }
    function dropWhile(array, predicate, thisArg) {
      return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3), true) : [];
    }
    function fill(array, value, start, end) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }
    var findIndex = createFindIndex();
    var findLastIndex = createFindIndex(true);
    function first(array) {
      return array ? array[0] : undefined;
    }
    function flatten(array, isDeep, guard) {
      var length = array ? array.length : 0;
      if (guard && isIterateeCall(array, isDeep, guard)) {
        isDeep = false;
      }
      return length ? baseFlatten(array, isDeep) : [];
    }
    function flattenDeep(array) {
      var length = array ? array.length : 0;
      return length ? baseFlatten(array, true) : [];
    }
    function indexOf(array, value, fromIndex) {
      var length = array ? array.length : 0;
      if (!length) {
        return -1;
      }
      if (typeof fromIndex == 'number') {
        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
      } else if (fromIndex) {
        var index = binaryIndex(array, value);
        if (index < length && (value === value ? (value === array[index]) : (array[index] !== array[index]))) {
          return index;
        }
        return -1;
      }
      return baseIndexOf(array, value, fromIndex || 0);
    }
    function initial(array) {
      return dropRight(array, 1);
    }
    var intersection = restParam(function(arrays) {
      var othLength = arrays.length,
          othIndex = othLength,
          caches = Array(length),
          indexOf = getIndexOf(),
          isCommon = indexOf === baseIndexOf,
          result = [];
      while (othIndex--) {
        var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
        caches[othIndex] = (isCommon && value.length >= 120) ? createCache(othIndex && value) : null;
      }
      var array = arrays[0],
          index = -1,
          length = array ? array.length : 0,
          seen = caches[0];
      outer: while (++index < length) {
        value = array[index];
        if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
          var othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(value);
          }
          result.push(value);
        }
      }
      return result;
    });
    function last(array) {
      var length = array ? array.length : 0;
      return length ? array[length - 1] : undefined;
    }
    function lastIndexOf(array, value, fromIndex) {
      var length = array ? array.length : 0;
      if (!length) {
        return -1;
      }
      var index = length;
      if (typeof fromIndex == 'number') {
        index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
      } else if (fromIndex) {
        index = binaryIndex(array, value, true) - 1;
        var other = array[index];
        if (value === value ? (value === other) : (other !== other)) {
          return index;
        }
        return -1;
      }
      if (value !== value) {
        return indexOfNaN(array, index, true);
      }
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function pull() {
      var args = arguments,
          array = args[0];
      if (!(array && array.length)) {
        return array;
      }
      var index = 0,
          indexOf = getIndexOf(),
          length = args.length;
      while (++index < length) {
        var fromIndex = 0,
            value = args[index];
        while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }
    var pullAt = restParam(function(array, indexes) {
      indexes = baseFlatten(indexes);
      var result = baseAt(array, indexes);
      basePullAt(array, indexes.sort(baseCompareAscending));
      return result;
    });
    function remove(array, predicate, thisArg) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;
      predicate = getCallback(predicate, thisArg, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }
    function rest(array) {
      return drop(array, 1);
    }
    function slice(array, start, end) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      return baseSlice(array, start, end);
    }
    var sortedIndex = createSortedIndex();
    var sortedLastIndex = createSortedIndex(true);
    function take(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }
    function takeRight(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      n = length - (+n || 0);
      return baseSlice(array, n < 0 ? 0 : n);
    }
    function takeRightWhile(array, predicate, thisArg) {
      return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3), false, true) : [];
    }
    function takeWhile(array, predicate, thisArg) {
      return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3)) : [];
    }
    var union = restParam(function(arrays) {
      return baseUniq(baseFlatten(arrays, false, true));
    });
    function uniq(array, isSorted, iteratee, thisArg) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (isSorted != null && typeof isSorted != 'boolean') {
        thisArg = iteratee;
        iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
        isSorted = false;
      }
      var callback = getCallback();
      if (!(iteratee == null && callback === baseCallback)) {
        iteratee = callback(iteratee, thisArg, 3);
      }
      return (isSorted && getIndexOf() === baseIndexOf) ? sortedUniq(array, iteratee) : baseUniq(array, iteratee);
    }
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var index = -1,
          length = 0;
      array = arrayFilter(array, function(group) {
        if (isArrayLike(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      var result = Array(length);
      while (++index < length) {
        result[index] = arrayMap(array, baseProperty(index));
      }
      return result;
    }
    function unzipWith(array, iteratee, thisArg) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      iteratee = bindCallback(iteratee, thisArg, 4);
      return arrayMap(result, function(group) {
        return arrayReduce(group, iteratee, undefined, true);
      });
    }
    var without = restParam(function(array, values) {
      return isArrayLike(array) ? baseDifference(array, values) : [];
    });
    function xor() {
      var index = -1,
          length = arguments.length;
      while (++index < length) {
        var array = arguments[index];
        if (isArrayLike(array)) {
          var result = result ? arrayPush(baseDifference(result, array), baseDifference(array, result)) : array;
        }
      }
      return result ? baseUniq(result) : [];
    }
    var zip = restParam(unzip);
    function zipObject(props, values) {
      var index = -1,
          length = props ? props.length : 0,
          result = {};
      if (length && !values && !isArray(props[0])) {
        values = [];
      }
      while (++index < length) {
        var key = props[index];
        if (values) {
          result[key] = values[index];
        } else if (key) {
          result[key[0]] = key[1];
        }
      }
      return result;
    }
    var zipWith = restParam(function(arrays) {
      var length = arrays.length,
          iteratee = length > 2 ? arrays[length - 2] : undefined,
          thisArg = length > 1 ? arrays[length - 1] : undefined;
      if (length > 2 && typeof iteratee == 'function') {
        length -= 2;
      } else {
        iteratee = (length > 1 && typeof thisArg == 'function') ? (--length, thisArg) : undefined;
        thisArg = undefined;
      }
      arrays.length = length;
      return unzipWith(arrays, iteratee, thisArg);
    });
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }
    function tap(value, interceptor, thisArg) {
      interceptor.call(thisArg, value);
      return value;
    }
    function thru(value, interceptor, thisArg) {
      return interceptor.call(thisArg, value);
    }
    function wrapperChain() {
      return chain(this);
    }
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }
    var wrapperConcat = restParam(function(values) {
      values = baseFlatten(values);
      return this.thru(function(array) {
        return arrayConcat(isArray(array) ? array : [toObject(array)], values);
      });
    });
    function wrapperPlant(value) {
      var result,
          parent = this;
      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }
    function wrapperReverse() {
      var value = this.__wrapped__;
      var interceptor = function(value) {
        return value.reverse();
      };
      if (value instanceof LazyWrapper) {
        var wrapped = value;
        if (this.__actions__.length) {
          wrapped = new LazyWrapper(this);
        }
        wrapped = wrapped.reverse();
        wrapped.__actions__.push({
          'func': thru,
          'args': [interceptor],
          'thisArg': undefined
        });
        return new LodashWrapper(wrapped, this.__chain__);
      }
      return this.thru(interceptor);
    }
    function wrapperToString() {
      return (this.value() + '');
    }
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }
    var at = restParam(function(collection, props) {
      return baseAt(collection, baseFlatten(props));
    });
    var countBy = createAggregator(function(result, value, key) {
      hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
    });
    function every(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
        predicate = undefined;
      }
      if (typeof predicate != 'function' || thisArg !== undefined) {
        predicate = getCallback(predicate, thisArg, 3);
      }
      return func(collection, predicate);
    }
    function filter(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      predicate = getCallback(predicate, thisArg, 3);
      return func(collection, predicate);
    }
    var find = createFind(baseEach);
    var findLast = createFind(baseEachRight, true);
    function findWhere(collection, source) {
      return find(collection, baseMatches(source));
    }
    var forEach = createForEach(arrayEach, baseEach);
    var forEachRight = createForEach(arrayEachRight, baseEachRight);
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        result[key] = [value];
      }
    });
    function includes(collection, target, fromIndex, guard) {
      var length = collection ? getLength(collection) : 0;
      if (!isLength(length)) {
        collection = values(collection);
        length = collection.length;
      }
      if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
        fromIndex = 0;
      } else {
        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
      }
      return (typeof collection == 'string' || !isArray(collection) && isString(collection)) ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1) : (!!length && getIndexOf(collection, target, fromIndex) > -1);
    }
    var indexBy = createAggregator(function(result, value, key) {
      result[key] = value;
    });
    var invoke = restParam(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          isProp = isKey(path),
          result = isArrayLike(collection) ? Array(collection.length) : [];
      baseEach(collection, function(value) {
        var func = isFunc ? path : ((isProp && value != null) ? value[path] : undefined);
        result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
      });
      return result;
    });
    function map(collection, iteratee, thisArg) {
      var func = isArray(collection) ? arrayMap : baseMap;
      iteratee = getCallback(iteratee, thisArg, 3);
      return func(collection, iteratee);
    }
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() {
      return [[], []];
    });
    function pluck(collection, path) {
      return map(collection, property(path));
    }
    var reduce = createReduce(arrayReduce, baseEach);
    var reduceRight = createReduce(arrayReduceRight, baseEachRight);
    function reject(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      predicate = getCallback(predicate, thisArg, 3);
      return func(collection, function(value, index, collection) {
        return !predicate(value, index, collection);
      });
    }
    function sample(collection, n, guard) {
      if (guard ? isIterateeCall(collection, n, guard) : n == null) {
        collection = toIterable(collection);
        var length = collection.length;
        return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
      }
      var index = -1,
          result = toArray(collection),
          length = result.length,
          lastIndex = length - 1;
      n = nativeMin(n < 0 ? 0 : (+n || 0), length);
      while (++index < n) {
        var rand = baseRandom(index, lastIndex),
            value = result[rand];
        result[rand] = result[index];
        result[index] = value;
      }
      result.length = n;
      return result;
    }
    function shuffle(collection) {
      return sample(collection, POSITIVE_INFINITY);
    }
    function size(collection) {
      var length = collection ? getLength(collection) : 0;
      return isLength(length) ? length : keys(collection).length;
    }
    function some(collection, predicate, thisArg) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
        predicate = undefined;
      }
      if (typeof predicate != 'function' || thisArg !== undefined) {
        predicate = getCallback(predicate, thisArg, 3);
      }
      return func(collection, predicate);
    }
    function sortBy(collection, iteratee, thisArg) {
      if (collection == null) {
        return [];
      }
      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
        iteratee = undefined;
      }
      var index = -1;
      iteratee = getCallback(iteratee, thisArg, 3);
      var result = baseMap(collection, function(value, key, collection) {
        return {
          'criteria': iteratee(value, key, collection),
          'index': ++index,
          'value': value
        };
      });
      return baseSortBy(result, compareAscending);
    }
    var sortByAll = restParam(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var guard = iteratees[2];
      if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
        iteratees.length = 1;
      }
      return baseSortByOrder(collection, baseFlatten(iteratees), []);
    });
    function sortByOrder(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (guard && isIterateeCall(iteratees, orders, guard)) {
        orders = undefined;
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseSortByOrder(collection, iteratees, orders);
    }
    function where(collection, source) {
      return filter(collection, baseMatches(source));
    }
    var now = nativeNow || function() {
      return new Date().getTime();
    };
    function after(n, func) {
      if (typeof func != 'function') {
        if (typeof n == 'function') {
          var temp = n;
          n = func;
          func = temp;
        } else {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
      }
      n = nativeIsFinite(n = +n) ? n : 0;
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }
    function ary(func, n, guard) {
      if (guard && isIterateeCall(func, n, guard)) {
        n = undefined;
      }
      n = (func && n == null) ? func.length : nativeMax(+n || 0, 0);
      return createWrapper(func, ARY_FLAG, undefined, undefined, undefined, undefined, n);
    }
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        if (typeof n == 'function') {
          var temp = n;
          n = func;
          func = temp;
        } else {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
      }
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined;
        }
        return result;
      };
    }
    var bind = restParam(function(func, thisArg, partials) {
      var bitmask = BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, bind.placeholder);
        bitmask |= PARTIAL_FLAG;
      }
      return createWrapper(func, bitmask, thisArg, partials, holders);
    });
    var bindAll = restParam(function(object, methodNames) {
      methodNames = methodNames.length ? baseFlatten(methodNames) : functions(object);
      var index = -1,
          length = methodNames.length;
      while (++index < length) {
        var key = methodNames[index];
        object[key] = createWrapper(object[key], BIND_FLAG, object);
      }
      return object;
    });
    var bindKey = restParam(function(object, key, partials) {
      var bitmask = BIND_FLAG | BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, bindKey.placeholder);
        bitmask |= PARTIAL_FLAG;
      }
      return createWrapper(key, bitmask, object, partials, holders);
    });
    var curry = createCurry(CURRY_FLAG);
    var curryRight = createCurry(CURRY_RIGHT_FLAG);
    function debounce(func, wait, options) {
      var args,
          maxTimeoutId,
          result,
          stamp,
          thisArg,
          timeoutId,
          trailingCall,
          lastCalled = 0,
          maxWait = false,
          trailing = true;
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = wait < 0 ? 0 : (+wait || 0);
      if (options === true) {
        var leading = true;
        trailing = false;
      } else if (isObject(options)) {
        leading = !!options.leading;
        maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      function cancel() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (maxTimeoutId) {
          clearTimeout(maxTimeoutId);
        }
        lastCalled = 0;
        maxTimeoutId = timeoutId = trailingCall = undefined;
      }
      function complete(isCalled, id) {
        if (id) {
          clearTimeout(id);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined;
        if (isCalled) {
          lastCalled = now();
          result = func.apply(thisArg, args);
          if (!timeoutId && !maxTimeoutId) {
            args = thisArg = undefined;
          }
        }
      }
      function delayed() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0 || remaining > wait) {
          complete(trailingCall, maxTimeoutId);
        } else {
          timeoutId = setTimeout(delayed, remaining);
        }
      }
      function maxDelayed() {
        complete(trailing, timeoutId);
      }
      function debounced() {
        args = arguments;
        stamp = now();
        thisArg = this;
        trailingCall = trailing && (timeoutId || !leading);
        if (maxWait === false) {
          var leadingCall = leading && !timeoutId;
        } else {
          if (!maxTimeoutId && !leading) {
            lastCalled = stamp;
          }
          var remaining = maxWait - (stamp - lastCalled),
              isCalled = remaining <= 0 || remaining > maxWait;
          if (isCalled) {
            if (maxTimeoutId) {
              maxTimeoutId = clearTimeout(maxTimeoutId);
            }
            lastCalled = stamp;
            result = func.apply(thisArg, args);
          } else if (!maxTimeoutId) {
            maxTimeoutId = setTimeout(maxDelayed, remaining);
          }
        }
        if (isCalled && timeoutId) {
          timeoutId = clearTimeout(timeoutId);
        } else if (!timeoutId && wait !== maxWait) {
          timeoutId = setTimeout(delayed, wait);
        }
        if (leadingCall) {
          isCalled = true;
          result = func.apply(thisArg, args);
        }
        if (isCalled && !timeoutId && !maxTimeoutId) {
          args = thisArg = undefined;
        }
        return result;
      }
      debounced.cancel = cancel;
      return debounced;
    }
    var defer = restParam(function(func, args) {
      return baseDelay(func, 1, args);
    });
    var delay = restParam(function(func, wait, args) {
      return baseDelay(func, wait, args);
    });
    var flow = createFlow();
    var flowRight = createFlow(true);
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new memoize.Cache;
      return memoized;
    }
    var modArgs = restParam(function(func, transforms) {
      transforms = baseFlatten(transforms);
      if (typeof func != 'function' || !arrayEvery(transforms, baseIsFunction)) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = transforms.length;
      return restParam(function(args) {
        var index = nativeMin(args.length, length);
        while (index--) {
          args[index] = transforms[index](args[index]);
        }
        return func.apply(this, args);
      });
    });
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        return !predicate.apply(this, arguments);
      };
    }
    function once(func) {
      return before(2, func);
    }
    var partial = createPartial(PARTIAL_FLAG);
    var partialRight = createPartial(PARTIAL_RIGHT_FLAG);
    var rearg = restParam(function(func, indexes) {
      return createWrapper(func, REARG_FLAG, undefined, undefined, undefined, baseFlatten(indexes));
    });
    function restParam(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            rest = Array(length);
        while (++index < length) {
          rest[index] = args[start + index];
        }
        switch (start) {
          case 0:
            return func.call(this, rest);
          case 1:
            return func.call(this, args[0], rest);
          case 2:
            return func.call(this, args[0], args[1], rest);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = rest;
        return func.apply(this, otherArgs);
      };
    }
    function spread(func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function(array) {
        return func.apply(this, array);
      };
    }
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (options === false) {
        leading = false;
      } else if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        'leading': leading,
        'maxWait': +wait,
        'trailing': trailing
      });
    }
    function wrap(value, wrapper) {
      wrapper = wrapper == null ? identity : wrapper;
      return createWrapper(wrapper, PARTIAL_FLAG, undefined, [value], []);
    }
    function clone(value, isDeep, customizer, thisArg) {
      if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
        isDeep = false;
      } else if (typeof isDeep == 'function') {
        thisArg = customizer;
        customizer = isDeep;
        isDeep = false;
      }
      return typeof customizer == 'function' ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 3)) : baseClone(value, isDeep);
    }
    function cloneDeep(value, customizer, thisArg) {
      return typeof customizer == 'function' ? baseClone(value, true, bindCallback(customizer, thisArg, 3)) : baseClone(value, true);
    }
    function gt(value, other) {
      return value > other;
    }
    function gte(value, other) {
      return value >= other;
    }
    function isArguments(value) {
      return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
    }
    var isArray = nativeIsArray || function(value) {
      return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
    };
    function isBoolean(value) {
      return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
    }
    function isDate(value) {
      return isObjectLike(value) && objToString.call(value) == dateTag;
    }
    function isElement(value) {
      return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
    }
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) || (isObjectLike(value) && isFunction(value.splice)))) {
        return !value.length;
      }
      return !keys(value).length;
    }
    function isEqual(value, other, customizer, thisArg) {
      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
      var result = customizer ? customizer(value, other) : undefined;
      return result === undefined ? baseIsEqual(value, other, customizer) : !!result;
    }
    function isError(value) {
      return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
    }
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }
    function isFunction(value) {
      return isObject(value) && objToString.call(value) == funcTag;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }
    function isMatch(object, source, customizer, thisArg) {
      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
      return baseIsMatch(object, getMatchData(source), customizer);
    }
    function isNaN(value) {
      return isNumber(value) && value != +value;
    }
    function isNative(value) {
      if (value == null) {
        return false;
      }
      if (isFunction(value)) {
        return reIsNative.test(fnToString.call(value));
      }
      return isObjectLike(value) && reIsHostCtor.test(value);
    }
    function isNull(value) {
      return value === null;
    }
    function isNumber(value) {
      return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
    }
    function isPlainObject(value) {
      var Ctor;
      if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) || (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
        return false;
      }
      var result;
      baseForIn(value, function(subValue, key) {
        result = key;
      });
      return result === undefined || hasOwnProperty.call(value, result);
    }
    function isRegExp(value) {
      return isObject(value) && objToString.call(value) == regexpTag;
    }
    function isString(value) {
      return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
    }
    function isTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
    }
    function isUndefined(value) {
      return value === undefined;
    }
    function lt(value, other) {
      return value < other;
    }
    function lte(value, other) {
      return value <= other;
    }
    function toArray(value) {
      var length = value ? getLength(value) : 0;
      if (!isLength(length)) {
        return values(value);
      }
      if (!length) {
        return [];
      }
      return arrayCopy(value);
    }
    function toPlainObject(value) {
      return baseCopy(value, keysIn(value));
    }
    var merge = createAssigner(baseMerge);
    var assign = createAssigner(function(object, source, customizer) {
      return customizer ? assignWith(object, source, customizer) : baseAssign(object, source);
    });
    function create(prototype, properties, guard) {
      var result = baseCreate(prototype);
      if (guard && isIterateeCall(prototype, properties, guard)) {
        properties = undefined;
      }
      return properties ? baseAssign(result, properties) : result;
    }
    var defaults = createDefaults(assign, assignDefaults);
    var defaultsDeep = createDefaults(merge, mergeDefaults);
    var findKey = createFindKey(baseForOwn);
    var findLastKey = createFindKey(baseForOwnRight);
    var forIn = createForIn(baseFor);
    var forInRight = createForIn(baseForRight);
    var forOwn = createForOwn(baseForOwn);
    var forOwnRight = createForOwn(baseForOwnRight);
    function functions(object) {
      return baseFunctions(object, keysIn(object));
    }
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, toPath(path), (path + ''));
      return result === undefined ? defaultValue : result;
    }
    function has(object, path) {
      if (object == null) {
        return false;
      }
      var result = hasOwnProperty.call(object, path);
      if (!result && !isKey(path)) {
        path = toPath(path);
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
        if (object == null) {
          return false;
        }
        path = last(path);
        result = hasOwnProperty.call(object, path);
      }
      return result || (isLength(object.length) && isIndex(path, object.length) && (isArray(object) || isArguments(object)));
    }
    function invert(object, multiValue, guard) {
      if (guard && isIterateeCall(object, multiValue, guard)) {
        multiValue = undefined;
      }
      var index = -1,
          props = keys(object),
          length = props.length,
          result = {};
      while (++index < length) {
        var key = props[index],
            value = object[key];
        if (multiValue) {
          if (hasOwnProperty.call(result, value)) {
            result[value].push(key);
          } else {
            result[value] = [key];
          }
        } else {
          result[value] = key;
        }
      }
      return result;
    }
    var keys = !nativeKeys ? shimKeys : function(object) {
      var Ctor = object == null ? undefined : object.constructor;
      if ((typeof Ctor == 'function' && Ctor.prototype === object) || (typeof object != 'function' && isArrayLike(object))) {
        return shimKeys(object);
      }
      return isObject(object) ? nativeKeys(object) : [];
    };
    function keysIn(object) {
      if (object == null) {
        return [];
      }
      if (!isObject(object)) {
        object = Object(object);
      }
      var length = object.length;
      length = (length && isLength(length) && (isArray(object) || isArguments(object)) && length) || 0;
      var Ctor = object.constructor,
          index = -1,
          isProto = typeof Ctor == 'function' && Ctor.prototype === object,
          result = Array(length),
          skipIndexes = length > 0;
      while (++index < length) {
        result[index] = (index + '');
      }
      for (var key in object) {
        if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    var mapKeys = createObjectMapper(true);
    var mapValues = createObjectMapper();
    var omit = restParam(function(object, props) {
      if (object == null) {
        return {};
      }
      if (typeof props[0] != 'function') {
        var props = arrayMap(baseFlatten(props), String);
        return pickByArray(object, baseDifference(keysIn(object), props));
      }
      var predicate = bindCallback(props[0], props[1], 3);
      return pickByCallback(object, function(value, key, object) {
        return !predicate(value, key, object);
      });
    });
    function pairs(object) {
      object = toObject(object);
      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);
      while (++index < length) {
        var key = props[index];
        result[index] = [key, object[key]];
      }
      return result;
    }
    var pick = restParam(function(object, props) {
      if (object == null) {
        return {};
      }
      return typeof props[0] == 'function' ? pickByCallback(object, bindCallback(props[0], props[1], 3)) : pickByArray(object, baseFlatten(props));
    });
    function result(object, path, defaultValue) {
      var result = object == null ? undefined : object[path];
      if (result === undefined) {
        if (object != null && !isKey(path, object)) {
          path = toPath(path);
          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
          result = object == null ? undefined : object[last(path)];
        }
        result = result === undefined ? defaultValue : result;
      }
      return isFunction(result) ? result.call(object) : result;
    }
    function set(object, path, value) {
      if (object == null) {
        return object;
      }
      var pathKey = (path + '');
      path = (object[pathKey] != null || isKey(path, object)) ? [pathKey] : toPath(path);
      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;
      while (nested != null && ++index < length) {
        var key = path[index];
        if (isObject(nested)) {
          if (index == lastIndex) {
            nested[key] = value;
          } else if (nested[key] == null) {
            nested[key] = isIndex(path[index + 1]) ? [] : {};
          }
        }
        nested = nested[key];
      }
      return object;
    }
    function transform(object, iteratee, accumulator, thisArg) {
      var isArr = isArray(object) || isTypedArray(object);
      iteratee = getCallback(iteratee, thisArg, 4);
      if (accumulator == null) {
        if (isArr || isObject(object)) {
          var Ctor = object.constructor;
          if (isArr) {
            accumulator = isArray(object) ? new Ctor : [];
          } else {
            accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
          }
        } else {
          accumulator = {};
        }
      }
      (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }
    function values(object) {
      return baseValues(object, keys(object));
    }
    function valuesIn(object) {
      return baseValues(object, keysIn(object));
    }
    function inRange(value, start, end) {
      start = +start || 0;
      if (end === undefined) {
        end = start;
        start = 0;
      } else {
        end = +end || 0;
      }
      return value >= nativeMin(start, end) && value < nativeMax(start, end);
    }
    function random(min, max, floating) {
      if (floating && isIterateeCall(min, max, floating)) {
        max = floating = undefined;
      }
      var noMin = min == null,
          noMax = max == null;
      if (floating == null) {
        if (noMax && typeof min == 'boolean') {
          floating = min;
          min = 1;
        } else if (typeof max == 'boolean') {
          floating = max;
          noMax = true;
        }
      }
      if (noMin && noMax) {
        max = 1;
        noMax = false;
      }
      min = +min || 0;
      if (noMax) {
        max = min;
        min = 0;
      } else {
        max = +max || 0;
      }
      if (floating || min % 1 || max % 1) {
        var rand = nativeRandom();
        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
      }
      return baseRandom(min, max);
    }
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? (word.charAt(0).toUpperCase() + word.slice(1)) : word);
    });
    function capitalize(string) {
      string = baseToString(string);
      return string && (string.charAt(0).toUpperCase() + string.slice(1));
    }
    function deburr(string) {
      string = baseToString(string);
      return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
    }
    function endsWith(string, target, position) {
      string = baseToString(string);
      target = (target + '');
      var length = string.length;
      position = position === undefined ? length : nativeMin(position < 0 ? 0 : (+position || 0), length);
      position -= target.length;
      return position >= 0 && string.indexOf(target, position) == position;
    }
    function escape(string) {
      string = baseToString(string);
      return (string && reHasUnescapedHtml.test(string)) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
    }
    function escapeRegExp(string) {
      string = baseToString(string);
      return (string && reHasRegExpChars.test(string)) ? string.replace(reRegExpChars, escapeRegExpChar) : (string || '(?:)');
    }
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });
    function pad(string, length, chars) {
      string = baseToString(string);
      length = +length;
      var strLength = string.length;
      if (strLength >= length || !nativeIsFinite(length)) {
        return string;
      }
      var mid = (length - strLength) / 2,
          leftLength = nativeFloor(mid),
          rightLength = nativeCeil(mid);
      chars = createPadding('', rightLength, chars);
      return chars.slice(0, leftLength) + string + chars;
    }
    var padLeft = createPadDir();
    var padRight = createPadDir(true);
    function parseInt(string, radix, guard) {
      if (guard ? isIterateeCall(string, radix, guard) : radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      string = trim(string);
      return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
    }
    function repeat(string, n) {
      var result = '';
      string = baseToString(string);
      n = +n;
      if (n < 1 || !string || !nativeIsFinite(n)) {
        return result;
      }
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        string += string;
      } while (n);
      return result;
    }
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
    });
    function startsWith(string, target, position) {
      string = baseToString(string);
      position = position == null ? 0 : nativeMin(position < 0 ? 0 : (+position || 0), string.length);
      return string.lastIndexOf(target, position) == position;
    }
    function template(string, options, otherOptions) {
      var settings = lodash.templateSettings;
      if (otherOptions && isIterateeCall(string, options, otherOptions)) {
        options = otherOptions = undefined;
      }
      string = baseToString(string);
      options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);
      var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);
      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";
      var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$', 'g');
      var sourceURL = '//# sourceURL=' + ('sourceURL' in options ? options.sourceURL : ('lodash.templateSources[' + (++templateCounter) + ']')) + '\n';
      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;
        return match;
      });
      source += "';\n";
      var variable = options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;');
      source = 'function(' + (variable || 'obj') + ') {\n' + (variable ? '' : 'obj || (obj = {});\n') + "var __t, __p = ''" + (isEscaping ? ', __e = _.escape' : '') + (isEvaluating ? ', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n" : ';\n') + source + 'return __p\n}';
      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
      });
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }
    function trim(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
      }
      chars = (chars + '');
      return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
    }
    function trimLeft(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(trimmedLeftIndex(string));
      }
      return string.slice(charsLeftIndex(string, (chars + '')));
    }
    function trimRight(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(0, trimmedRightIndex(string) + 1);
      }
      return string.slice(0, charsRightIndex(string, (chars + '')) + 1);
    }
    function trunc(string, options, guard) {
      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined;
      }
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;
      if (options != null) {
        if (isObject(options)) {
          var separator = 'separator' in options ? options.separator : separator;
          length = 'length' in options ? (+options.length || 0) : length;
          omission = 'omission' in options ? baseToString(options.omission) : omission;
        } else {
          length = +options || 0;
        }
      }
      string = baseToString(string);
      if (length >= string.length) {
        return string;
      }
      var end = length - omission.length;
      if (end < 1) {
        return omission;
      }
      var result = string.slice(0, end);
      if (separator == null) {
        return result + omission;
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              newEnd,
              substring = string.slice(0, end);
          if (!separator.global) {
            separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            newEnd = match.index;
          }
          result = result.slice(0, newEnd == null ? end : newEnd);
        }
      } else if (string.indexOf(separator, end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }
    function unescape(string) {
      string = baseToString(string);
      return (string && reHasEscapedHtml.test(string)) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
    }
    function words(string, pattern, guard) {
      if (guard && isIterateeCall(string, pattern, guard)) {
        pattern = undefined;
      }
      string = baseToString(string);
      return string.match(pattern || reWords) || [];
    }
    var attempt = restParam(function(func, args) {
      try {
        return func.apply(undefined, args);
      } catch (e) {
        return isError(e) ? e : new Error(e);
      }
    });
    function callback(func, thisArg, guard) {
      if (guard && isIterateeCall(func, thisArg, guard)) {
        thisArg = undefined;
      }
      return isObjectLike(func) ? matches(func) : baseCallback(func, thisArg);
    }
    function constant(value) {
      return function() {
        return value;
      };
    }
    function identity(value) {
      return value;
    }
    function matches(source) {
      return baseMatches(baseClone(source, true));
    }
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, true));
    }
    var method = restParam(function(path, args) {
      return function(object) {
        return invokePath(object, path, args);
      };
    });
    var methodOf = restParam(function(object, args) {
      return function(path) {
        return invokePath(object, path, args);
      };
    });
    function mixin(object, source, options) {
      if (options == null) {
        var isObj = isObject(source),
            props = isObj ? keys(source) : undefined,
            methodNames = (props && props.length) ? baseFunctions(source, props) : undefined;
        if (!(methodNames ? methodNames.length : isObj)) {
          methodNames = false;
          options = source;
          source = object;
          object = this;
        }
      }
      if (!methodNames) {
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = true,
          index = -1,
          isFunc = isFunction(object),
          length = methodNames.length;
      if (options === false) {
        chain = false;
      } else if (isObject(options) && 'chain' in options) {
        chain = options.chain;
      }
      while (++index < length) {
        var methodName = methodNames[index],
            func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = (function(func) {
            return function() {
              var chainAll = this.__chain__;
              if (chain || chainAll) {
                var result = object(this.__wrapped__),
                    actions = result.__actions__ = arrayCopy(this.__actions__);
                actions.push({
                  'func': func,
                  'args': arguments,
                  'thisArg': object
                });
                result.__chain__ = chainAll;
                return result;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }(func));
        }
      }
      return object;
    }
    function noConflict() {
      root._ = oldDash;
      return this;
    }
    function noop() {}
    function property(path) {
      return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
    }
    function propertyOf(object) {
      return function(path) {
        return baseGet(object, toPath(path), (path + ''));
      };
    }
    function range(start, end, step) {
      if (step && isIterateeCall(start, end, step)) {
        end = step = undefined;
      }
      start = +start || 0;
      step = step == null ? 1 : (+step || 0);
      if (end == null) {
        end = start;
        start = 0;
      } else {
        end = +end || 0;
      }
      var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);
      while (++index < length) {
        result[index] = start;
        start += step;
      }
      return result;
    }
    function times(n, iteratee, thisArg) {
      n = nativeFloor(n);
      if (n < 1 || !nativeIsFinite(n)) {
        return [];
      }
      var index = -1,
          result = Array(nativeMin(n, MAX_ARRAY_LENGTH));
      iteratee = bindCallback(iteratee, thisArg, 1);
      while (++index < n) {
        if (index < MAX_ARRAY_LENGTH) {
          result[index] = iteratee(index);
        } else {
          iteratee(index);
        }
      }
      return result;
    }
    function uniqueId(prefix) {
      var id = ++idCounter;
      return baseToString(prefix) + id;
    }
    function add(augend, addend) {
      return (+augend || 0) + (+addend || 0);
    }
    var ceil = createRound('ceil');
    var floor = createRound('floor');
    var max = createExtremum(gt, NEGATIVE_INFINITY);
    var min = createExtremum(lt, POSITIVE_INFINITY);
    var round = createRound('round');
    function sum(collection, iteratee, thisArg) {
      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
        iteratee = undefined;
      }
      iteratee = getCallback(iteratee, thisArg, 3);
      return iteratee.length == 1 ? arraySum(isArray(collection) ? collection : toIterable(collection), iteratee) : baseSum(collection, iteratee);
    }
    lodash.prototype = baseLodash.prototype;
    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;
    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;
    MapCache.prototype['delete'] = mapDelete;
    MapCache.prototype.get = mapGet;
    MapCache.prototype.has = mapHas;
    MapCache.prototype.set = mapSet;
    SetCache.prototype.push = cachePush;
    memoize.Cache = MapCache;
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.callback = callback;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defaultsDeep = defaultsDeep;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.functions = functions;
    lodash.groupBy = groupBy;
    lodash.indexBy = indexBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.invert = invert;
    lodash.invoke = invoke;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.modArgs = modArgs;
    lodash.negate = negate;
    lodash.omit = omit;
    lodash.once = once;
    lodash.pairs = pairs;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pluck = pluck;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.restParam = restParam;
    lodash.set = set;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortByAll = sortByAll;
    lodash.sortByOrder = sortByOrder;
    lodash.spread = spread;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.times = times;
    lodash.toArray = toArray;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.union = union;
    lodash.uniq = uniq;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.where = where;
    lodash.without = without;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipWith = zipWith;
    lodash.backflow = flowRight;
    lodash.collect = map;
    lodash.compose = flowRight;
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.extend = assign;
    lodash.iteratee = callback;
    lodash.methods = functions;
    lodash.object = zipObject;
    lodash.select = filter;
    lodash.tail = rest;
    lodash.unique = uniq;
    mixin(lodash, lodash);
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.ceil = ceil;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.deburr = deburr;
    lodash.endsWith = endsWith;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.findWhere = findWhere;
    lodash.first = first;
    lodash.floor = floor;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isBoolean = isBoolean;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isMatch = isMatch;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isString = isString;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.min = min;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padLeft = padLeft;
    lodash.padRight = padRight;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.result = result;
    lodash.round = round;
    lodash.runInContext = runInContext;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.sum = sum;
    lodash.template = template;
    lodash.trim = trim;
    lodash.trimLeft = trimLeft;
    lodash.trimRight = trimRight;
    lodash.trunc = trunc;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.words = words;
    lodash.all = every;
    lodash.any = some;
    lodash.contains = includes;
    lodash.eq = isEqual;
    lodash.detect = find;
    lodash.foldl = reduce;
    lodash.foldr = reduceRight;
    lodash.head = first;
    lodash.include = includes;
    lodash.inject = reduce;
    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!lodash.prototype[methodName]) {
          source[methodName] = func;
        }
      });
      return source;
    }()), false);
    lodash.sample = sample;
    lodash.prototype.sample = function(n) {
      if (!this.__chain__ && n == null) {
        return sample(this.value());
      }
      return this.thru(function(value) {
        return sample(value, n);
      });
    };
    lodash.VERSION = VERSION;
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });
    arrayEach(['drop', 'take'], function(methodName, index) {
      LazyWrapper.prototype[methodName] = function(n) {
        var filtered = this.__filtered__;
        if (filtered && !index) {
          return new LazyWrapper(this);
        }
        n = n == null ? 1 : nativeMax(nativeFloor(n) || 0, 0);
        var result = this.clone();
        if (filtered) {
          result.__takeCount__ = nativeMin(result.__takeCount__, n);
        } else {
          result.__views__.push({
            'size': n,
            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
          });
        }
        return result;
      };
      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };
    });
    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
      var type = index + 1,
          isFilter = type != LAZY_MAP_FLAG;
      LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
        var result = this.clone();
        result.__iteratees__.push({
          'iteratee': getCallback(iteratee, thisArg, 1),
          'type': type
        });
        result.__filtered__ = result.__filtered__ || isFilter;
        return result;
      };
    });
    arrayEach(['first', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');
      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });
    arrayEach(['initial', 'rest'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');
      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    });
    arrayEach(['pluck', 'where'], function(methodName, index) {
      var operationName = index ? 'filter' : 'map',
          createCallback = index ? baseMatches : property;
      LazyWrapper.prototype[methodName] = function(value) {
        return this[operationName](createCallback(value));
      };
    });
    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };
    LazyWrapper.prototype.reject = function(predicate, thisArg) {
      predicate = getCallback(predicate, thisArg, 1);
      return this.filter(function(value) {
        return !predicate(value);
      });
    };
    LazyWrapper.prototype.slice = function(start, end) {
      start = start == null ? 0 : (+start || 0);
      var result = this;
      if (result.__filtered__ && (start > 0 || end < 0)) {
        return new LazyWrapper(result);
      }
      if (start < 0) {
        result = result.takeRight(-start);
      } else if (start) {
        result = result.drop(start);
      }
      if (end !== undefined) {
        end = (+end || 0);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };
    LazyWrapper.prototype.takeRightWhile = function(predicate, thisArg) {
      return this.reverse().takeWhile(predicate, thisArg).reverse();
    };
    LazyWrapper.prototype.toArray = function() {
      return this.take(POSITIVE_INFINITY);
    };
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
          retUnwrapped = /^(?:first|last)$/.test(methodName),
          lodashFunc = lodash[retUnwrapped ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName];
      if (!lodashFunc) {
        return;
      }
      lodash.prototype[methodName] = function() {
        var args = retUnwrapped ? [1] : arguments,
            chainAll = this.__chain__,
            value = this.__wrapped__,
            isHybrid = !!this.__actions__.length,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);
        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          isLazy = useLazy = false;
        }
        var interceptor = function(value) {
          return (retUnwrapped && chainAll) ? lodashFunc(value, 1)[0] : lodashFunc.apply(undefined, arrayPush([value], args));
        };
        var action = {
          'func': thru,
          'args': [interceptor],
          'thisArg': undefined
        },
            onlyLazy = isLazy && !isHybrid;
        if (retUnwrapped && !chainAll) {
          if (onlyLazy) {
            value = value.clone();
            value.__actions__.push(action);
            return func.call(value);
          }
          return lodashFunc.call(undefined, this.value())[0];
        }
        if (!retUnwrapped && useLazy) {
          value = onlyLazy ? value : new LazyWrapper(this);
          var result = func.apply(value, args);
          result.__actions__.push(action);
          return new LodashWrapper(result, chainAll);
        }
        return this.thru(interceptor);
      };
    });
    arrayEach(['join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
      var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);
      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          return func.apply(this.value(), args);
        }
        return this[chainName](function(value) {
          return func.apply(value, args);
        });
      };
    });
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = (lodashFunc.name + ''),
            names = realNames[key] || (realNames[key] = []);
        names.push({
          'name': methodName,
          'func': lodashFunc
        });
      }
    });
    realNames[createHybridWrapper(undefined, BIND_KEY_FLAG).name] = [{
      'name': 'wrapper',
      'func': undefined
    }];
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.concat = wrapperConcat;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toString = wrapperToString;
    lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
    lodash.prototype.collect = lodash.prototype.map;
    lodash.prototype.head = lodash.prototype.first;
    lodash.prototype.select = lodash.prototype.filter;
    lodash.prototype.tail = lodash.prototype.rest;
    return lodash;
  }
  var _ = runInContext();
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    root._ = _;
    define("1c", [], function() {
      return _;
    });
  } else if (freeExports && freeModule) {
    if (moduleExports) {
      (freeModule.exports = _)._ = _;
    } else {
      freeExports._ = _;
    }
  } else {
    root._ = _;
  }
}.call(this));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
define("1d", ["1c"], function(main) {
  return main;
});

_removeDefine();
})();
$__System.register("1e", [], function() { return { setters: [], execute: function() {} } });

(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
define("1f", ["3", "1d", "1e"], function(jQuery, _) {
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g,
    escape: /\{\{-(.+?)\}\}/g
  };
  jQuery.widget("ui.iconpicker", {
    version: '0.1.0',
    options: {
      colorset: [["000066", "660066", "660000", "CC3300", "666600", "006600", "006666", "333333"], ["000099", "990099", "990000", "FF3300", "999900", "009900", "009999", "666666"], ["0000CC", "CC00CC", "CC0000", "FF6600", "CCCC00", "00CC00", "00CCCC", "999999"], ["0000FF", "FF00FF", "FF0000", "FF9900", "FFFF00", "00FF00", "00FFFF", "CCCCCC"]],
      color: '#123456',
      characters: [{
        "character": "e834",
        "classname": "Check Box"
      }, {
        "character": "e851",
        "classname": "Account Box"
      }, {
        "character": "e885",
        "classname": "Grade"
      }, {
        "character": "e88a",
        "classname": "Home"
      }, {
        "character": "e88c",
        "classname": "Hourglass Full"
      }, {
        "character": "e892",
        "classname": "Label"
      }, {
        "character": "e894",
        "classname": "Language"
      }, {
        "character": "e897",
        "classname": "Lock"
      }, {
        "character": "e8a8",
        "classname": "Perm Phone Msg"
      }, {
        "character": "e8cd",
        "classname": "Speaker Notes"
      }, {
        "character": "e8f4",
        "classname": "Visibility"
      }, {
        "character": "e905",
        "classname": "Flight Takeoff"
      }, {
        "character": "e227",
        "classname": "Attach Money"
      }, {
        "character": "e872",
        "classname": "Delete"
      }, {
        "character": "e53e",
        "classname": "Local Atm"
      }, {
        "character": "e407",
        "classname": "Nature People"
      }, {
        "character": "e32a",
        "classname": "Security"
      }, {
        "character": "e84f",
        "classname": "Account Balance"
      }, {
        "character": "e548",
        "classname": "Local Hospital"
      }, {
        "character": "e545",
        "classname": "Local Florist"
      }, {
        "character": "e8cc",
        "classname": "Shopping Cart"
      }, {
        "character": "e559",
        "classname": "Local Taxi"
      }, {
        "character": "e55f",
        "classname": "Place"
      }, {
        "character": "e80c",
        "classname": "School"
      }, {
        "character": "e04b",
        "classname": "Videocam"
      }, {
        "character": "e836",
        "classname": "Radio Button Unchecked"
      }, {
        "character": "e837",
        "classname": "Radio Button Checked"
      }, {
        "character": "e80b",
        "classname": "Public"
      }, {
        "character": "e7ef",
        "classname": "Group"
      }, {
        "character": "e52f",
        "classname": "Directions Bike"
      }, {
        "character": "e534",
        "classname": "Directions Railway"
      }, {
        "character": "e7fd",
        "classname": "Person"
      }],
      buttonCharTemplate: _.template('<button class="newCharacter" style="color:{{thecolor}};" value="{{character}}|{{classname}}" ></button>'),
      buttonColorTemplate: _.template('<button class="iconNew" style="color:{{thecolor}};" value="{{thecolor}}" ></button>'),
      readOnly: false,
      iconclass: null,
      character: 'e8b4',
      container: '#datasets',
      placement: 'top',
      onChange: function(thiscolor, thischaracter, thisclassname) {
        console.log({
          color: thiscolor,
          character: thischaracter,
          classname: thisclassname
        });
      }
    },
    _create: function() {
      var _this = this,
          thetable = jQuery('<table class="insidepopover iconpicker_character"></table>'),
          tr;
      if (this.options.color === '#123456') {
        this.options.color = this.options.colorset[Math.floor(Math.random() * 4)][Math.floor(Math.random() * 8)];
      }
      _this.character = _this.options.character;
      var hideIconpicker = function() {
        _this.element.popover('hide');
      };
      var changeCharacter = function(e) {
        var jqThis = jQuery(this),
            newcharacter = jqThis.val().split('|');
        thetable.find('.newCharacter').removeClass('selected');
        _this.setElementCharacter(_this.element.find('i'), newcharacter[0]);
        _this.setElementCharacter(thetable.find('.iconNew'), newcharacter[0]);
        _this.character = newcharacter[0];
        _this.classname = newcharacter[1];
        jqThis.addClass('selected');
        console.log('changed character', newcharacter);
      };
      var changeColor = function(e) {
        var jqThis = jQuery(this),
            newcolor = jqThis.val();
        thetable.find('.iconNew').removeClass('selected');
        jqThis.addClass('selected');
        _this.element.css('color', newcolor).data('thecolor', newcolor).popover('hide');
        _this.options.onChange(newcolor, _this.character, _this.classname);
      };
      var stopPropagation = function(e) {
        console.zdebug('click on popover');
        e.stopPropagation();
      };
      thetable.css('cursor', 'pointer');
      _this.options.specialchar = _this.fromCharCode(_this.options.character);
      _this.element.html(_.template('<i class="icon-large iconpicker_character" >{{specialchar}}</i>')(_this.options));
      _this.element.css('color', _this.options.color).data('thecolor', _this.options.color);
      if (!_this.options.readOnly) {
        var popoverContainer = jQuery(_this.options.container);
        _this.element.popover({
          html: true,
          placement: _this.options.placement,
          content: function() {
            return thetable;
          },
          container: popoverContainer
        });
        var thead = _this.populateHead();
        thetable.append(thead);
        var tbody = _this.populateBody();
        thetable.append(tbody);
        _this.element.on('show', function(event) {
          console.zdebug('Iconpicker: Event show', event);
          var popover = _this.element.data('popover'),
              popoverDiv = popover.tip();
          _.delay(function() {
            popoverDiv.addClass('iconpicker');
            popoverDiv.on('click', stopPropagation);
            popoverContainer.on('click', hideIconpicker);
            tbody.on('click', '.iconNew', changeColor);
            thead.on('click', '.newCharacter', changeCharacter);
          }, 100);
        });
        _this.element.on('hide', function(event) {
          console.zdebug('popover closed');
          var popover = _this.element.data('popover'),
              popoverDiv = popover.tip();
          popoverDiv.removeClass('iconpicker');
          popoverContainer.off('click', hideIconpicker);
          popoverDiv.off('click', stopPropagation);
          tbody.off('click', '.iconNew', changeColor);
          thead.off('click', '.newCharacter', changeCharacter);
        });
      }
    },
    setElementCharacter: function(container, character) {
      var specialchar = this.fromCharCode(character);
      return container.text(specialchar);
    },
    populateBody: function() {
      var _this = this,
          tbody = jQuery('<tbody></tbody>'),
          tr = jQuery('<tr></tr>');
      for (var row = 0; row < 4; row++) {
        tr = _this.populateRow(row);
        tbody.append(tr);
      }
      return tbody;
    },
    populateHead: function() {
      var _this = this,
          thead = jQuery('<thead></thead>');
      var chunkedcharacters = _.chunk(_this.options.characters, 8);
      _.each(chunkedcharacters, function(row) {
        var tr = jQuery('<tr></tr>');
        _.each(row, function(characterObj) {
          var th = jQuery('<th></th>'),
              buttonOptions = {
                thecolor: _this.options.color,
                character: characterObj.character,
                classname: characterObj.classname
              },
              thebutton = jQuery(_this.options.buttonCharTemplate(buttonOptions));
          _this.setElementCharacter(thebutton, characterObj.character);
          if (buttonOptions.character === _this.options.character) {
            thebutton.addClass('selected');
          }
          th.append(thebutton);
          tr.append(th);
        });
        thead.append(tr);
      });
      return thead;
    },
    populateRow: function(row) {
      var _this = this,
          tr = jQuery('<tr></tr>');
      for (var col = 0; col < 8; col++) {
        var thecolor = _this.options.colorset[row][col];
        if (thecolor.length === 6 || thecolor.length === 3) {
          thecolor = '#' + thecolor;
        }
        var td = jQuery('<td></td>'),
            thebutton = jQuery(_this.options.buttonColorTemplate({thecolor: thecolor}));
        _this.setElementCharacter(thebutton, _this.options.character);
        if (_this.options.iconclass) {
          thebutton.addClass(_this.options.iconclass);
        }
        if (_this.options.color === thecolor) {
          thebutton.addClass('selected');
        }
        td.append(thebutton);
        tr.append(td);
      }
      return tr;
    },
    fromCharCode: function(charcode) {
      return String.fromCharCode("0x" + charcode);
    }
  });
  return jQuery.ui.iconpicker;
});

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("c", ["3"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  $.ui = $.ui || {};
  $.extend($.ui, {
    version: "1.11.4",
    keyCode: {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38
    }
  });
  $.fn.extend({
    scrollParent: function(includeHidden) {
      var position = this.css("position"),
          excludeStaticParent = position === "absolute",
          overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
          scrollParent = this.parents().filter(function() {
            var parent = $(this);
            if (excludeStaticParent && parent.css("position") === "static") {
              return false;
            }
            return overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
          }).eq(0);
      return position === "fixed" || !scrollParent.length ? $(this[0].ownerDocument || document) : scrollParent;
    },
    uniqueId: (function() {
      var uuid = 0;
      return function() {
        return this.each(function() {
          if (!this.id) {
            this.id = "ui-id-" + (++uuid);
          }
        });
      };
    })(),
    removeUniqueId: function() {
      return this.each(function() {
        if (/^ui-id-\d+$/.test(this.id)) {
          $(this).removeAttr("id");
        }
      });
    }
  });
  function focusable(element, isTabIndexNotNaN) {
    var map,
        mapName,
        img,
        nodeName = element.nodeName.toLowerCase();
    if ("area" === nodeName) {
      map = element.parentNode;
      mapName = map.name;
      if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
        return false;
      }
      img = $("img[usemap='#" + mapName + "']")[0];
      return !!img && visible(img);
    }
    return (/^(input|select|textarea|button|object)$/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
  }
  function visible(element) {
    return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
      return $.css(this, "visibility") === "hidden";
    }).length;
  }
  $.extend($.expr[":"], {
    data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
      return function(elem) {
        return !!$.data(elem, dataName);
      };
    }) : function(elem, i, match) {
      return !!$.data(elem, match[3]);
    },
    focusable: function(element) {
      return focusable(element, !isNaN($.attr(element, "tabindex")));
    },
    tabbable: function(element) {
      var tabIndex = $.attr(element, "tabindex"),
          isTabIndexNaN = isNaN(tabIndex);
      return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
    }
  });
  if (!$("<a>").outerWidth(1).jquery) {
    $.each(["Width", "Height"], function(i, name) {
      var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
          type = name.toLowerCase(),
          orig = {
            innerWidth: $.fn.innerWidth,
            innerHeight: $.fn.innerHeight,
            outerWidth: $.fn.outerWidth,
            outerHeight: $.fn.outerHeight
          };
      function reduce(elem, size, border, margin) {
        $.each(side, function() {
          size -= parseFloat($.css(elem, "padding" + this)) || 0;
          if (border) {
            size -= parseFloat($.css(elem, "border" + this + "Width")) || 0;
          }
          if (margin) {
            size -= parseFloat($.css(elem, "margin" + this)) || 0;
          }
        });
        return size;
      }
      $.fn["inner" + name] = function(size) {
        if (size === undefined) {
          return orig["inner" + name].call(this);
        }
        return this.each(function() {
          $(this).css(type, reduce(this, size) + "px");
        });
      };
      $.fn["outer" + name] = function(size, margin) {
        if (typeof size !== "number") {
          return orig["outer" + name].call(this, size);
        }
        return this.each(function() {
          $(this).css(type, reduce(this, size, true, margin) + "px");
        });
      };
    });
  }
  if (!$.fn.addBack) {
    $.fn.addBack = function(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    };
  }
  if ($("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
    $.fn.removeData = (function(removeData) {
      return function(key) {
        if (arguments.length) {
          return removeData.call(this, $.camelCase(key));
        } else {
          return removeData.call(this);
        }
      };
    })($.fn.removeData);
  }
  $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
  $.fn.extend({
    focus: (function(orig) {
      return function(delay, fn) {
        return typeof delay === "number" ? this.each(function() {
          var elem = this;
          setTimeout(function() {
            $(elem).focus();
            if (fn) {
              fn.call(elem);
            }
          }, delay);
        }) : orig.apply(this, arguments);
      };
    })($.fn.focus),
    disableSelection: (function() {
      var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
      return function() {
        return this.bind(eventType + ".ui-disableSelection", function(event) {
          event.preventDefault();
        });
      };
    })(),
    enableSelection: function() {
      return this.unbind(".ui-disableSelection");
    },
    zIndex: function(zIndex) {
      if (zIndex !== undefined) {
        return this.css("zIndex", zIndex);
      }
      if (this.length) {
        var elem = $(this[0]),
            position,
            value;
        while (elem.length && elem[0] !== document) {
          position = elem.css("position");
          if (position === "absolute" || position === "relative" || position === "fixed") {
            value = parseInt(elem.css("zIndex"), 10);
            if (!isNaN(value) && value !== 0) {
              return value;
            }
          }
          elem = elem.parent();
        }
      }
      return 0;
    }
  });
  $.ui.plugin = {
    add: function(module, option, set) {
      var i,
          proto = $.ui[module].prototype;
      for (i in set) {
        proto.plugins[i] = proto.plugins[i] || [];
        proto.plugins[i].push([option, set[i]]);
      }
    },
    call: function(instance, name, args, allowDisconnected) {
      var i,
          set = instance.plugins[name];
      if (!set) {
        return;
      }
      if (!allowDisconnected && (!instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11)) {
        return;
      }
      for (i = 0; i < set.length; i++) {
        if (instance.options[set[i][0]]) {
          set[i][1].apply(instance.element, args);
        }
      }
    }
  };
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var arr = [];
  var document = window.document;
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var version = "2.2.0",
      jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
      },
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      rmsPrefix = /^-ms-/,
      rdashAlpha = /-([\da-z])/gi,
      fcamelCase = function(all, letter) {
        return letter.toUpperCase();
      };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    selector: "",
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    get: function(num) {
      return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function(callback) {
      return jQuery.each(this, callback);
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor();
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery.extend = jQuery.fn.extend = function() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {},
    isFunction: function(obj) {
      return jQuery.type(obj) === "function";
    },
    isArray: Array.isArray,
    isWindow: function(obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function(obj) {
      var realStringObj = obj && obj.toString();
      return !jQuery.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
    },
    isPlainObject: function(obj) {
      if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
      return true;
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    type: function(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    globalEval: function(code) {
      var script,
          indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (code.indexOf("use strict") === 1) {
          script = document.createElement("script");
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function(obj, callback) {
      var length,
          i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }
      return obj;
    },
    trim: function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    merge: function(first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function(elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map: function(elems, callback, arg) {
      var length,
          value,
          i = 0,
          ret = [];
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return concat.apply([], ret);
    },
    guid: 1,
    proxy: function(fn, context) {
      var tmp,
          args,
          proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: Date.now,
    support: support
  });
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
        type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
  }
  var Sizzle = (function(window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
          }
          return 0;
        },
        MAX_NEGATIVE = 1 << 31,
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        indexOf = function(list, elem) {
          var i = 0,
              len = list.length;
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i;
            }
          }
          return -1;
        },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        whitespace = "[\\x20\\t\\r\\n\\f]",
        identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
        rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
          "ID": new RegExp("^#(" + identifier + ")"),
          "CLASS": new RegExp("^\\.(" + identifier + ")"),
          "TAG": new RegExp("^(" + identifier + "|[*])"),
          "ATTR": new RegExp("^" + attributes),
          "PSEUDO": new RegExp("^" + pseudos),
          "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
          "bool": new RegExp("^(?:" + booleans + ")$", "i"),
          "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        },
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        rescape = /'|\\/g,
        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function(_, escaped, escapedWhitespace) {
          var high = "0x" + escaped - 0x10000;
          return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        },
        unloadHandler = function() {
          setDocument();
        };
    try {
      push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {apply: arr.length ? function(target, els) {
          push_native.apply(target, slice.call(els));
        } : function(target, els) {
          var j = target.length,
              i = 0;
          while ((target[j++] = els[i++])) {}
          target.length = j - 1;
        }};
    }
    function Sizzle(selector, context, results, seed) {
      var m,
          i,
          elem,
          nid,
          nidselect,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          nodeType = context ? context.nodeType : 9;
      results = results || [];
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }
        context = context || document;
        if (documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            if ((m = match[1])) {
              if (nodeType === 9) {
                if ((elem = context.getElementById(m))) {
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                }
              } else {
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              }
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            if (nodeType !== 1) {
              newContext = context;
              newSelector = selector;
            } else if (context.nodeName.toLowerCase() !== "object") {
              if ((nid = context.getAttribute("id"))) {
                nid = nid.replace(rescape, "\\$&");
              } else {
                context.setAttribute("id", (nid = expando));
              }
              groups = tokenize(selector);
              i = groups.length;
              nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
              while (i--) {
                groups[i] = nidselect + " " + toSelector(groups[i]);
              }
              newSelector = groups.join(",");
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }
            if (newSelector) {
              try {
                push.apply(results, newContext.querySelectorAll(newSelector));
                return results;
              } catch (qsaError) {} finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return (cache[key + " "] = value);
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        div = null;
      }
    }
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff;
      }
      if (cur) {
        while ((cur = cur.nextSibling)) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length;
          while (i--) {
            if (seed[(j = matchIndexes[i])]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    support = Sizzle.support = {};
    isXML = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare,
          parent,
          doc = node ? node.ownerDocument || node : preferredDoc;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);
      if ((parent = document.defaultView) && parent.top !== parent) {
        if (parent.addEventListener) {
          parent.addEventListener("unload", unloadHandler, false);
        } else if (parent.attachEvent) {
          parent.attachEvent("onunload", unloadHandler);
        }
      }
      support.attributes = assert(function(div) {
        div.className = "i";
        return !div.getAttribute("className");
      });
      support.getElementsByTagName = assert(function(div) {
        div.appendChild(document.createComment(""));
        return !div.getElementsByTagName("*").length;
      });
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);
      support.getById = assert(function(div) {
        docElem.appendChild(div).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var m = context.getElementById(id);
            return m ? [m] : [];
          }
        };
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        delete Expr.find["ID"];
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }
      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function(tag, context) {
        var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName(tag);
        if (tag === "*") {
          while ((elem = results[i++])) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if ((support.qsa = rnative.test(document.querySelectorAll))) {
        assert(function(div) {
          docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
          if (div.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }
          if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          }
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
          if (!div.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function(div) {
          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("name", "D");
          if (div.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }
      if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
        assert(function(div) {
          support.disconnectedMatch = matches.call(div, "div");
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function(a, b) {
        if (b) {
          while ((b = b.parentNode)) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      sortOrder = hasCompare ? function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
        if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          return sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b];
        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        while ((cur = cur.parentNode)) {
          ap.unshift(cur);
        }
        cur = b;
        while ((cur = cur.parentNode)) {
          bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };
    Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function(context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    Sizzle.uniqueSort = function(results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while ((elem = results[i++])) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      sortInput = null;
      return results;
    };
    getText = Sizzle.getText = function(elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;
      if (!nodeType) {
        while ((node = elem[i++])) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {dir: "parentNode"},
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        "ATTR": function(match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        "CHILD": function(match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +((match[7] + match[8]) || match[3] === "odd");
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        "PSEUDO": function(match) {
          var excess,
              unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[4] || match[5] || "";
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        "CHILD": function(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? function(elem) {
            return !!elem.parentNode;
          } : function(elem, context, xml) {
            var cache,
                uniqueCache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while ((node = node[dir])) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                node = parent;
                outerCache = node[expando] || (node[expando] = {});
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache) {
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                if (diff === false) {
                  while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || (diff % first === 0 && diff / first >= 0);
            }
          };
        },
        "PSEUDO": function(pseudo, argument) {
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function(elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        "not": markFunction(function(selector) {
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length;
            while (i--) {
              if ((elem = unmatched[i])) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function(elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function(text) {
          text = text.replace(runescape, funescape);
          return function(elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        "lang": markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        "target": function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function(elem) {
          return elem === docElem;
        },
        "focus": function(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        "enabled": function(elem) {
          return elem.disabled === false;
        },
        "disabled": function(elem) {
          return elem.disabled === true;
        },
        "checked": function(elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },
        "selected": function(elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        "empty": function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        "parent": function(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        "header": function(elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function(elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        "first": createPositionalPseudo(function() {
          return [0];
        }),
        "last": createPositionalPseudo(function(matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function(matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function(matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push((tokens = []));
        }
        matched = false;
        if ((match = rcombinators.exec(soFar))) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          checkNonElements = base && dir === "parentNode",
          doneName = done++;
      return combinator.first ? function(elem, context, xml) {
        while ((elem = elem[dir])) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : function(elem, context, xml) {
        var oldCache,
            uniqueCache,
            outerCache,
            newCache = [dirruns, doneName];
        if (xml) {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                return (newCache[2] = oldCache[2]);
              } else {
                uniqueCache[dir] = newCache;
                if ((newCache[2] = matcher(elem, context, xml))) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;
      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  temp.push((matcherIn[i] = elem));
                }
              }
              postFinder(null, (matcherOut = []), temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          matchContext = addCombinator(function(elem) {
            return elem === checkContext;
          }, implicitRelative, true),
          matchAnyContext = addCombinator(function(elem) {
            return indexOf(checkContext, elem) > -1;
          }, implicitRelative, true),
          matchers = [function(elem, context, xml) {
            var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            checkContext = null;
            return ret;
          }];
      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function(seed, context, xml, results, outermost) {
            var elem,
                j,
                matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;
            if (outermost) {
              outermostContext = context === document || context || outermost;
            }
            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0;
                if (!context && elem.ownerDocument !== document) {
                  setDocument(elem);
                  xml = !documentIsHTML;
                }
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context || document, xml)) {
                    results.push(elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }
              if (bySet) {
                if ((elem = !matcher && elem)) {
                  matchedCount--;
                }
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }
            matchedCount += i;
            if (bySet && i !== matchedCount) {
              j = 0;
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml);
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results);
                    }
                  }
                }
                setMatched = condense(setMatched);
              }
              push.apply(results, setMatched);
              if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                Sizzle.uniqueSort(results);
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }
            return unmatched;
          };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function(selector, match) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        cached.selector = selector;
      }
      return cached;
    };
    select = Sizzle.select = function(selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize((selector = compiled.selector || selector));
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          if (Expr.relative[(type = token.type)]) {
            break;
          }
          if ((find = Expr.find[type])) {
            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    support.detectDuplicates = !!hasDuplicate;
    setDocument();
    support.sortDetached = assert(function(div1) {
      return div1.compareDocumentPosition(document.createElement("div")) & 1;
    });
    if (!assert(function(div) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function(elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    }
    if (!support.attributes || !assert(function(div) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute("value", "");
      return div.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function(elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    }
    if (!assert(function(div) {
      return div.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function(elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    return Sizzle;
  })(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var dir = function(elem, dir, until) {
    var matched = [],
        truncate = until !== undefined;
    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  var siblings = function(n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = (/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/);
  var risSimple = /^.[^:#\[\.,]*$/;
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return (elem === qualifier) !== not;
      });
    }
    if (typeof qualifier === "string") {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function(elem) {
      return (indexOf.call(qualifier, elem) > -1) !== not;
    });
  }
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1;
    }));
  };
  jQuery.fn.extend({
    find: function(selector) {
      var i,
          len = this.length,
          ret = [],
          self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });
  var rootjQuery,
      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      init = jQuery.fn.init = function(selector, context, root) {
        var match,
            elem;
        if (!selector) {
          return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (jQuery.isFunction(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document.getElementById(match[2]);
              if (elem && elem.parentNode) {
                this.length = 1;
                this[0] = elem;
              }
              this.context = document;
              this.selector = selector;
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || root).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this.context = this[0] = selector;
          this.length = 1;
          return this;
        } else if (jQuery.isFunction(selector)) {
          return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
        }
        if (selector.selector !== undefined) {
          this.selector = selector.selector;
          this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
      };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
  jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function() {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function(selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    index: function(elem) {
      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
      }
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }
      return indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }
  jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function(elem, i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function(elem, i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
      return siblings(elem.firstChild);
    },
    contents: function(elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  var rnotwhite = (/\S+/g);
  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function(options) {
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
    var firing,
        memory,
        fired,
        locked,
        list = [],
        queue = [],
        firingIndex = -1,
        fire = function() {
          locked = options.once;
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          if (locked) {
            if (memory) {
              list = [];
            } else {
              list = "";
            }
          }
        },
        self = {
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  if (jQuery.isFunction(arg)) {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                    add(arg);
                  }
                });
              })(arguments);
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          remove: function() {
            jQuery.each(arguments, function(_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
          },
          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },
          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },
          lock: function() {
            locked = queue = [];
            if (!memory) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },
          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          fire: function() {
            self.fireWith(this, arguments);
            return this;
          },
          fired: function() {
            return !!fired;
          }
        };
    return self;
  };
  jQuery.extend({
    Deferred: function(func) {
      var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
          state = "pending",
          promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            then: function() {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          },
          deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
            stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function(subordinate) {
      var i = 0,
          resolveValues = slice.call(arguments),
          length = resolveValues.length,
          remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
          deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
          updateFunc = function(i, contexts, values) {
            return function(value) {
              contexts[i] = this;
              values[i] = arguments.length > 1 ? slice.call(arguments) : value;
              if (values === progressValues) {
                deferred.notifyWith(contexts, values);
              } else if (!(--remaining)) {
                deferred.resolveWith(contexts, values);
              }
            };
          },
          progressValues,
          progressContexts,
          resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  var readyList;
  jQuery.fn.ready = function(fn) {
    jQuery.ready.promise().done(fn);
    return this;
  };
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    holdReady: function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function(wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler("ready");
        jQuery(document).off("ready");
      }
    }
  });
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  }
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        window.setTimeout(jQuery.ready);
      } else {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
      }
    }
    return readyList.promise(obj);
  };
  jQuery.ready.promise();
  var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null;
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
  };
  var acceptData = function(owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
  };
  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.prototype = {
    register: function(owner, initial) {
      var value = initial || {};
      if (owner.nodeType) {
        owner[this.expando] = value;
      } else {
        Object.defineProperty(owner, this.expando, {
          value: value,
          writable: true,
          configurable: true
        });
      }
      return owner[this.expando];
    },
    cache: function(owner) {
      if (!acceptData(owner)) {
        return {};
      }
      var value = owner[this.expando];
      if (!value) {
        value = {};
        if (acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = value;
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }
      return value;
    },
    set: function(owner, data, value) {
      var prop,
          cache = this.cache(owner);
      if (typeof data === "string") {
        cache[data] = value;
      } else {
        for (prop in data) {
          cache[prop] = data[prop];
        }
      }
      return cache;
    },
    get: function(owner, key) {
      return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
    },
    access: function(owner, key, value) {
      var stored;
      if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
        stored = this.get(owner, key);
        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function(owner, key) {
      var i,
          name,
          camel,
          cache = owner[this.expando];
      if (cache === undefined) {
        return;
      }
      if (key === undefined) {
        this.register(owner);
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            name = [key, camel];
          } else {
            name = camel;
            name = name in cache ? [name] : (name.match(rnotwhite) || []);
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
      if (key === undefined || jQuery.isEmptyObject(cache)) {
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function(owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data();
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {}
        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    hasData: function(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function(elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function(elem, name) {
      dataUser.remove(elem, name);
    },
    _data: function(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function(elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function(key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes;
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }
      if (typeof key === "object") {
        return this.each(function() {
          dataUser.set(this, key);
        });
      }
      return access(this, function(value) {
        var data,
            camelKey;
        if (elem && value === undefined) {
          data = dataUser.get(elem, key) || dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());
          if (data !== undefined) {
            return data;
          }
          camelKey = jQuery.camelCase(key);
          data = dataUser.get(elem, camelKey);
          if (data !== undefined) {
            return data;
          }
          data = dataAttr(elem, camelKey, undefined);
          if (data !== undefined) {
            return data;
          }
          return;
        }
        camelKey = jQuery.camelCase(key);
        this.each(function() {
          var data = dataUser.get(this, camelKey);
          dataUser.set(this, camelKey, value);
          if (key.indexOf("-") > -1 && data !== undefined) {
            dataUser.set(this, key, value);
          }
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function(key) {
      return this.each(function() {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function() {
            jQuery.dequeue(elem, type);
          };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {empty: jQuery.Callbacks("once memory").add(function() {
          dataPriv.remove(elem, [type + "queue", key]);
        })});
    }
  });
  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },
    promise: function(type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function() {
            if (!(--count)) {
              defer.resolveWith(elements, [elements]);
            }
          };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var isHidden = function(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
  };
  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
        scale = 1,
        maxIterations = 20,
        currentValue = tween ? function() {
          return tween.cur();
        } : function() {
          return jQuery.css(elem, prop, "");
        },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
        initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      unit = unit || initialInUnit[3];
      valueParts = valueParts || [];
      initialInUnit = +initial || 1;
      do {
        scale = scale || ".5";
        initialInUnit = initialInUnit / scale;
        jQuery.style(elem, prop, initialInUnit + unit);
      } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;
      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }
  var rcheckableType = (/^(?:checkbox|radio)$/i);
  var rtagName = (/<([\w:-]+)/);
  var rscriptType = (/^$|\/(?:java|ecma)script/i);
  var wrapMap = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  function getAll(context, tag) {
    var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }
  var rhtml = /<|&#?\w+;/;
  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
        tmp,
        tag,
        wrap,
        contains,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        if (jQuery.type(elem) === "object") {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }
          jQuery.merge(nodes, tmp.childNodes);
          tmp = fragment.firstChild;
          tmp.textContent = "";
        }
      }
    }
    fragment.textContent = "";
    i = 0;
    while ((elem = nodes[i++])) {
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }
      contains = jQuery.contains(elem.ownerDocument, elem);
      tmp = getAll(fragment.appendChild(elem), "script");
      if (contains) {
        setGlobalEval(tmp);
      }
      if (scripts) {
        j = 0;
        while ((elem = tmp[j++])) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    return fragment;
  }
  (function() {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();
  var rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  function on(elem, types, selector, data, fn, one) {
    var origFn,
        type;
    if (typeof types === "object") {
      if (typeof selector !== "string") {
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }
    if (data == null && fn == null) {
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        fn = data;
        data = undefined;
      } else {
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return this;
    }
    if (one === 1) {
      origFn = fn;
      fn = function(event) {
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function() {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.get(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
    },
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function(event) {
      event = jQuery.event.fix(event);
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue = [],
          args = slice.call(arguments),
          handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function(event, handlers) {
      var i,
          matches,
          sel,
          handleObj,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target;
      if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
      filter: function(event, original) {
        var eventDoc,
            doc,
            body,
            button = original.button;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.which && button !== undefined) {
          event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
        }
        return event;
      }
    },
    fix: function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i,
          prop,
          copy,
          type = event.type,
          originalEvent = event,
          fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: {noBubble: true},
      focus: {
        trigger: function() {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
            this.click();
            return false;
          }
        },
        _default: function(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload: {postDispatch: function(event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }}
    }
  };
  jQuery.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  jQuery.Event = function(src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e) {
        e.preventDefault();
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;
        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj,
          type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      rnoInnerhtml = /<script|<style|<link/i,
      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rscriptTypeMasked = /^true\/(.*)/,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function manipulationTarget(elem, content) {
    if (jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
      return elem.getElementsByTagName("tbody")[0] || elem;
    }
    return elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function cloneCopyEvent(src, dest) {
    var i,
        l,
        type,
        pdataOld,
        pdataCur,
        udataOld,
        udataCur,
        events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.access(src);
      pdataCur = dataPriv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  function domManip(collection, args, callback, ignored) {
    args = concat.apply([], args);
    var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value);
    if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
      return collection.each(function(index) {
        var self = collection.eq(index);
        if (isFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }
    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (hasScripts) {
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(collection[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, restoreScript);
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src) {
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
              }
            }
          }
        }
      }
    }
    return collection;
  }
  function remove(elem, selector, keepData) {
    var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;
    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }
      if (node.parentNode) {
        if (keepData && jQuery.contains(node.ownerDocument, node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }
    return elem;
  }
  jQuery.extend({
    htmlPrefilter: function(html) {
      return html.replace(rxhtmlTag, "<$1></$2>");
    },
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      return clone;
    },
    cleanData: function(elems) {
      var data,
          elem,
          type,
          special = jQuery.event.special,
          i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if ((data = elem[dataPriv.expando])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            elem[dataPriv.expando] = undefined;
          }
          if (elem[dataUser.expando]) {
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    domManip: domManip,
    detach: function(selector) {
      return remove(this, selector, true);
    },
    remove: function(selector) {
      return remove(this, selector);
    },
    text: function(value) {
      return access(this, function(value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function() {
      var elem,
          i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function() {
      var ignored = [];
      return domManip(this, arguments, function(elem) {
        var parent = this.parentNode;
        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }
      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var iframe,
      elemdisplay = {
        HTML: "block",
        BODY: "block"
      };
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
        display = jQuery.css(elem[0], "display");
    elem.detach();
    return display;
  }
  function defaultDisplay(nodeName) {
    var doc = document,
        display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === "none" || !display) {
        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
        doc = iframe[0].contentDocument;
        doc.write();
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  var rmargin = (/^margin/);
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles = function(elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view.opener) {
      view = window;
    }
    return view.getComputedStyle(elem);
  };
  var swap = function(elem, options, callback, args) {
    var ret,
        name,
        old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var documentElement = document.documentElement;
  (function() {
    var pixelPositionVal,
        boxSizingReliableVal,
        pixelMarginRightVal,
        reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div");
    if (!div.style) {
      return;
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
    container.appendChild(div);
    function computeStyleTests() {
      div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
      div.innerHTML = "";
      documentElement.appendChild(container);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";
      reliableMarginLeftVal = divStyle.marginLeft === "2px";
      boxSizingReliableVal = divStyle.width === "4px";
      div.style.marginRight = "50%";
      pixelMarginRightVal = divStyle.marginRight === "4px";
      documentElement.removeChild(container);
    }
    jQuery.extend(support, {
      pixelPosition: function() {
        computeStyleTests();
        return pixelPositionVal;
      },
      boxSizingReliable: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return boxSizingReliableVal;
      },
      pixelMarginRight: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return pixelMarginRightVal;
      },
      reliableMarginLeft: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return reliableMarginLeftVal;
      },
      reliableMarginRight: function() {
        var ret,
            marginDiv = div.appendChild(document.createElement("div"));
        marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
        marginDiv.style.marginRight = marginDiv.style.width = "0";
        div.style.width = "1px";
        documentElement.appendChild(container);
        ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);
        documentElement.removeChild(container);
        div.removeChild(marginDiv);
        return ret;
      }
    });
  })();
  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        style = elem.style;
    computed = computed || getStyles(elem);
    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name];
      if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
        ret = jQuery.style(elem, name);
      }
      if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret !== undefined ? ret + "" : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    return {get: function() {
        if (conditionFn()) {
          delete this.get;
          return;
        }
        return (this.get = hookFn).apply(this, arguments);
      }};
  }
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      cssPrefixes = ["Webkit", "O", "Moz", "ms"],
      emptyStyle = document.createElement("div").style;
  function vendorPropName(name) {
    if (name in emptyStyle) {
      return name;
    }
    var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rcssNum.exec(value);
    return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
        val = 0;
    for (; i < 4; i += 2) {
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if (extra !== "margin") {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (extra !== "padding") {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true,
        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles = getStyles(elem),
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    if (document.msFullscreenElement && window.top !== window) {
      if (elem.getClientRects().length) {
        val = Math.round(elem.getBoundingClientRect()[name] * 100);
      }
    }
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
  }
  function showHide(elements, show) {
    var display,
        elem,
        hidden,
        values = [],
        index = 0,
        length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = dataPriv.get(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === "none") {
          elem.style.display = "";
        }
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
        }
      } else {
        hidden = isHidden(elem);
        if (display !== "none" || !hidden) {
          dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none";
      }
    }
    return elements;
  }
  jQuery.extend({
    cssHooks: {opacity: {get: function(elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }}},
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    cssProps: {"float": "cssFloat"},
    style: function(elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret,
          type,
          hooks,
          origName = jQuery.camelCase(name),
          style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);
          type = "number";
        }
        if (value == null || value !== value) {
          return;
        }
        if (type === "number") {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        }
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function(elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each(["height", "width"], function(i, name) {
    jQuery.cssHooks[name] = {
      get: function(elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function(elem, value, extra) {
        var matches,
            styles = extra && getStyles(elem),
            subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[name] = value;
          value = jQuery.css(elem, name);
        }
        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {marginLeft: 0}, function() {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  });
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
    if (computed) {
      return swap(elem, {"display": "inline-block"}, curCSS, [elem, "marginRight"]);
    }
  });
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
        var i = 0,
            expanded = {},
            parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }};
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function() {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased,
          hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {_default: {
      get: function(tween) {
        var result;
        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }};
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }};
  jQuery.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow,
      timerId,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rrun = /queueHooks$/;
  function createFxNow() {
    window.setTimeout(function() {
      fxNow = undefined;
    });
    return (fxNow = jQuery.now());
  }
  function genFx(type, includeWidth) {
    var which,
        i = 0,
        attrs = {height: type};
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
        collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
        index = 0,
        length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop,
        value,
        toggle,
        tween,
        hooks,
        oldfire,
        display,
        checkDisplay,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHidden(elem),
        dataShow = dataPriv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      display = jQuery.css(elem, "display");
      checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
        style.display = "inline-block";
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      } else {
        display = undefined;
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = dataPriv.access(elem, "fxshow", {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        dataPriv.remove(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0;
          }
        }
      }
    } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
      style.display = display;
    }
  }
  function propFilter(props, specialEasing) {
    var index,
        name,
        easing,
        value,
        hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
        stopped,
        index = 0,
        length = Animation.prefilters.length,
        deferred = jQuery.Deferred().always(function() {
          delete tick.elem;
        }),
        tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(),
              remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
              temp = remaining / animation.duration || 0,
              percent = 1 - temp,
              index = 0,
              length = animation.tweens.length;
          for (; index < length; index++) {
            animation.tweens[index].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length) {
            return remaining;
          } else {
            deferred.resolveWith(elem, [animation]);
            return false;
          }
        },
        animation = deferred.promise({
          elem: elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {
            specialEasing: {},
            easing: jQuery.easing._default
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index = 0,
                length = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index < length; index++) {
              animation.tweens[index].run(1);
            }
            if (gotoEnd) {
              deferred.notifyWith(elem, [animation, 1, 0]);
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }),
        props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (jQuery.isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
        }
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {"*": [function(prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]},
    tweener: function(props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnotwhite);
      }
      var prop,
          index = 0,
          length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    opt.old = opt.complete;
    opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function() {
            var anim = Animation(this, jQuery.extend({}, prop), optall);
            if (empty || dataPriv.get(this, "finish")) {
              anim.stop(true);
            }
          };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function() {
        var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = dataPriv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index,
            data = dataPriv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer,
        i = 0,
        timers = jQuery.timers;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (!timerId) {
      timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function() {
    window.clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function() {
        window.clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";
    support.checkOn = input.value !== "";
    support.optSelected = opt.selected;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        elem.setAttribute(name, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      ret = jQuery.find.attr(elem, name);
      return ret == null ? undefined : ret;
    },
    attrHooks: {type: {set: function(elem, value) {
          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }}},
    removeAttr: function(elem, value) {
      var name,
          propName,
          i = 0,
          attrNames = value && value.match(rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    }
  });
  boolHook = {set: function(elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }};
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function(elem, name, isXML) {
      var ret,
          handle;
      if (!isXML) {
        handle = attrHandle[name];
        attrHandle[name] = ret;
        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
        attrHandle[name] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        return (elem[name] = value);
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      return elem[name];
    },
    propHooks: {tabIndex: {get: function(elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
        }}},
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {get: function(elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      }};
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  var rclass = /[\t\r\n\f]/g;
  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }
  jQuery.fn.extend({
    addClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    removeClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    toggleClass: function(value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }
      return this.each(function() {
        var className,
            i,
            self,
            classNames;
        if (type === "string") {
          i = 0;
          self = jQuery(this);
          classNames = value.match(rnotwhite) || [];
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {
            dataPriv.set(this, "__className__", className);
          }
          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function(selector) {
      var className,
          elem,
          i = 0;
      className = " " + selector + " ";
      while ((elem = this[i++])) {
        if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
          return true;
        }
      }
      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({val: function(value) {
      var hooks,
          ret,
          isFunction,
          elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + "";
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }});
  jQuery.extend({valHooks: {
      option: {get: function(elem) {
          return jQuery.trim(elem.value);
        }},
      select: {
        get: function(elem) {
          var value,
              option,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one" || index < 0,
              values = one ? null : [],
              max = one ? index + 1 : options.length,
              i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function(elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }});
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {set: function(elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
        }
      }};
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  jQuery.extend(jQuery.event, {
    trigger: function(event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") > -1) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    simulate: function(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  });
  jQuery.fn.extend({
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
    jQuery.fn[name] = function(data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }});
  support.focusin = "onfocusin" in window;
  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function(orig, fix) {
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };
      jQuery.event.special[fix] = {
        setup: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }
  var location = window.location;
  var nonce = jQuery.now();
  var rquery = (/\?/);
  jQuery.parseJSON = function(data) {
    return JSON.parse(data + "");
  };
  jQuery.parseXML = function(data) {
    var xml;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }
    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var rhash = /#.*$/,
      rts = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,
      prefilters = {},
      transports = {},
      allTypes = "*/".concat("*"),
      originAnchor = document.createElement("a");
  originAnchor.href = location.href;
  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
        seekingTransport = (structure === transports);
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }
  function ajaxExtend(target, src) {
    var key,
        deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
        type,
        finalDataType,
        firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
        current,
        conv,
        tmp,
        prev,
        converters = {},
        dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    };
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": jQuery.parseJSON,
        "text xml": jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport,
          cacheURL,
          responseHeadersString,
          responseHeaders,
          timeoutTimer,
          urlAnchor,
          fireGlobals,
          i,
          s = jQuery.ajaxSetup({}, options),
          callbackContext = s.context || s,
          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          statusCode = s.statusCode || {},
          requestHeaders = {},
          requestHeadersNames = {},
          state = 0,
          strAbort = "canceled",
          jqXHR = {
            readyState: 0,
            getResponseHeader: function(key) {
              var match;
              if (state === 2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while ((match = rheaders.exec(responseHeadersString))) {
                    responseHeaders[match[1].toLowerCase()] = match[2];
                  }
                }
                match = responseHeaders[key.toLowerCase()];
              }
              return match == null ? null : match;
            },
            getAllResponseHeaders: function() {
              return state === 2 ? responseHeadersString : null;
            },
            setRequestHeader: function(name, value) {
              var lname = name.toLowerCase();
              if (!state) {
                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            overrideMimeType: function(type) {
              if (!state) {
                s.mimeType = type;
              }
              return this;
            },
            statusCode: function(map) {
              var code;
              if (map) {
                if (state < 2) {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                } else {
                  jqXHR.always(map[jqXHR.status]);
                }
              }
              return this;
            },
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a");
        try {
          urlAnchor.href = s.url;
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          s.crossDomain = true;
        }
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = jQuery.event && s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = "abort";
      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (state === 2) {
          return jqXHR;
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
            success,
            error,
            response,
            modified,
            statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!(--jQuery.active)) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      "throws": true
    });
  };
  jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function() {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function() {
        var self = jQuery(this),
            contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  jQuery.expr.filters.hidden = function(elem) {
    return !jQuery.expr.filters.visible(elem);
  };
  jQuery.expr.filters.visible = function(elem) {
    return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
  };
  var r20 = /%20/g,
      rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.param = function(a, traditional) {
    var prefix,
        s = [],
        add = function(key, value) {
          value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join("&").replace(r20, "+");
  };
  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };
  var xhrSuccessStatus = {
    0: 200,
    1223: 204
  },
      xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback,
        errorCallback;
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i,
              xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function(type) {
            return function() {
              if (callback) {
                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete(xhr.status, xhr.statusText);
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {binary: xhr.response} : {text: xhr.responseText}, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          xhr.onload = callback();
          errorCallback = xhr.onerror = callback("error");
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                window.setTimeout(function() {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }
          callback = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  jQuery.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"},
    contents: {script: /\b(?:java|ecma)script\b/},
    converters: {"text script": function(text) {
        jQuery.globalEval(text);
        return text;
      }}
  });
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script,
          callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>").prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function(evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName,
        overwritten,
        responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments;
      };
      jqXHR.always(function() {
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);
        } else {
          window[callbackName] = overwritten;
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return "script";
    }
  });
  support.createHTMLDocument = (function() {
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  })();
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || (support.createHTMLDocument ? document.implementation.createHTMLDocument("") : document);
    var parsed = rsingleTag.exec(data),
        scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };
  var _load = jQuery.fn.load;
  jQuery.fn.load = function(url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments);
    }
    var selector,
        type,
        response,
        self = this,
        off = url.indexOf(" ");
    if (off > -1) {
      selector = jQuery.trim(url.slice(off));
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function(responseText) {
        response = arguments;
        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).always(callback && function(jqXHR, status) {
        self.each(function() {
          callback.apply(self, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }
    return this;
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn);
    };
  });
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.offset = {setOffset: function(elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {};
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }
      if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop;
      }
      if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }};
  jQuery.fn.extend({
    offset: function(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var docElem,
          win,
          elem = this[0],
          box = {
            top: 0,
            left: 0
          },
          doc = elem && elem.ownerDocument;
      if (!doc) {
        return;
      }
      docElem = doc.documentElement;
      if (!jQuery.contains(docElem, elem)) {
        return box;
      }
      box = elem.getBoundingClientRect();
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      };
    },
    position: function() {
      if (!this[0]) {
        return;
      }
      var offsetParent,
          offset,
          elem = this[0],
          parentOffset = {
            top: 0,
            left: 0
          };
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true) - offsetParent.scrollTop();
        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true) - offsetParent.scrollLeft();
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent;
        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || documentElement;
      });
    }
  });
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  });
  jQuery.each(["top", "left"], function(i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  });
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement["client" + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  jQuery.fn.extend({
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    },
    size: function() {
      return this.length;
    }
  });
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof define === "function" && define.amd) {
    define("20", [], function() {
      return jQuery;
    });
  }
  var _jQuery = window.jQuery,
      _$ = window.$;
  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };
  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
define("3", ["20"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("e", ["3"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  var widget_uuid = 0,
      widget_slice = Array.prototype.slice;
  $.cleanData = (function(orig) {
    return function(elems) {
      var events,
          elem,
          i;
      for (i = 0; (elem = elems[i]) != null; i++) {
        try {
          events = $._data(elem, "events");
          if (events && events.remove) {
            $(elem).triggerHandler("remove");
          }
        } catch (e) {}
      }
      orig(elems);
    };
  })($.cleanData);
  $.widget = function(name, base, prototype) {
    var fullName,
        existingConstructor,
        constructor,
        basePrototype,
        proxiedPrototype = {},
        namespace = name.split(".")[0];
    name = name.split(".")[1];
    fullName = namespace + "-" + name;
    if (!prototype) {
      prototype = base;
      base = $.Widget;
    }
    $.expr[":"][fullName.toLowerCase()] = function(elem) {
      return !!$.data(elem, fullName);
    };
    $[namespace] = $[namespace] || {};
    existingConstructor = $[namespace][name];
    constructor = $[namespace][name] = function(options, element) {
      if (!this._createWidget) {
        return new constructor(options, element);
      }
      if (arguments.length) {
        this._createWidget(options, element);
      }
    };
    $.extend(constructor, existingConstructor, {
      version: prototype.version,
      _proto: $.extend({}, prototype),
      _childConstructors: []
    });
    basePrototype = new base();
    basePrototype.options = $.widget.extend({}, basePrototype.options);
    $.each(prototype, function(prop, value) {
      if (!$.isFunction(value)) {
        proxiedPrototype[prop] = value;
        return;
      }
      proxiedPrototype[prop] = (function() {
        var _super = function() {
          return base.prototype[prop].apply(this, arguments);
        },
            _superApply = function(args) {
              return base.prototype[prop].apply(this, args);
            };
        return function() {
          var __super = this._super,
              __superApply = this._superApply,
              returnValue;
          this._super = _super;
          this._superApply = _superApply;
          returnValue = value.apply(this, arguments);
          this._super = __super;
          this._superApply = __superApply;
          return returnValue;
        };
      })();
    });
    constructor.prototype = $.widget.extend(basePrototype, {widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name}, proxiedPrototype, {
      constructor: constructor,
      namespace: namespace,
      widgetName: name,
      widgetFullName: fullName
    });
    if (existingConstructor) {
      $.each(existingConstructor._childConstructors, function(i, child) {
        var childPrototype = child.prototype;
        $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
      });
      delete existingConstructor._childConstructors;
    } else {
      base._childConstructors.push(constructor);
    }
    $.widget.bridge(name, constructor);
    return constructor;
  };
  $.widget.extend = function(target) {
    var input = widget_slice.call(arguments, 1),
        inputIndex = 0,
        inputLength = input.length,
        key,
        value;
    for (; inputIndex < inputLength; inputIndex++) {
      for (key in input[inputIndex]) {
        value = input[inputIndex][key];
        if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
          if ($.isPlainObject(value)) {
            target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value);
          } else {
            target[key] = value;
          }
        }
      }
    }
    return target;
  };
  $.widget.bridge = function(name, object) {
    var fullName = object.prototype.widgetFullName || name;
    $.fn[name] = function(options) {
      var isMethodCall = typeof options === "string",
          args = widget_slice.call(arguments, 1),
          returnValue = this;
      if (isMethodCall) {
        this.each(function() {
          var methodValue,
              instance = $.data(this, fullName);
          if (options === "instance") {
            returnValue = instance;
            return false;
          }
          if (!instance) {
            return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'");
          }
          if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
            return $.error("no such method '" + options + "' for " + name + " widget instance");
          }
          methodValue = instance[options].apply(instance, args);
          if (methodValue !== instance && methodValue !== undefined) {
            returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
            return false;
          }
        });
      } else {
        if (args.length) {
          options = $.widget.extend.apply(null, [options].concat(args));
        }
        this.each(function() {
          var instance = $.data(this, fullName);
          if (instance) {
            instance.option(options || {});
            if (instance._init) {
              instance._init();
            }
          } else {
            $.data(this, fullName, new object(options, this));
          }
        });
      }
      return returnValue;
    };
  };
  $.Widget = function() {};
  $.Widget._childConstructors = [];
  $.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {
      disabled: false,
      create: null
    },
    _createWidget: function(options, element) {
      element = $(element || this.defaultElement || this)[0];
      this.element = $(element);
      this.uuid = widget_uuid++;
      this.eventNamespace = "." + this.widgetName + this.uuid;
      this.bindings = $();
      this.hoverable = $();
      this.focusable = $();
      if (element !== this) {
        $.data(element, this.widgetFullName, this);
        this._on(true, this.element, {remove: function(event) {
            if (event.target === element) {
              this.destroy();
            }
          }});
        this.document = $(element.style ? element.ownerDocument : element.document || element);
        this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
      }
      this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);
      this._create();
      this._trigger("create", null, this._getCreateEventData());
      this._init();
    },
    _getCreateOptions: $.noop,
    _getCreateEventData: $.noop,
    _create: $.noop,
    _init: $.noop,
    destroy: function() {
      this._destroy();
      this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName));
      this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled");
      this.bindings.unbind(this.eventNamespace);
      this.hoverable.removeClass("ui-state-hover");
      this.focusable.removeClass("ui-state-focus");
    },
    _destroy: $.noop,
    widget: function() {
      return this.element;
    },
    option: function(key, value) {
      var options = key,
          parts,
          curOption,
          i;
      if (arguments.length === 0) {
        return $.widget.extend({}, this.options);
      }
      if (typeof key === "string") {
        options = {};
        parts = key.split(".");
        key = parts.shift();
        if (parts.length) {
          curOption = options[key] = $.widget.extend({}, this.options[key]);
          for (i = 0; i < parts.length - 1; i++) {
            curOption[parts[i]] = curOption[parts[i]] || {};
            curOption = curOption[parts[i]];
          }
          key = parts.pop();
          if (arguments.length === 1) {
            return curOption[key] === undefined ? null : curOption[key];
          }
          curOption[key] = value;
        } else {
          if (arguments.length === 1) {
            return this.options[key] === undefined ? null : this.options[key];
          }
          options[key] = value;
        }
      }
      this._setOptions(options);
      return this;
    },
    _setOptions: function(options) {
      var key;
      for (key in options) {
        this._setOption(key, options[key]);
      }
      return this;
    },
    _setOption: function(key, value) {
      this.options[key] = value;
      if (key === "disabled") {
        this.widget().toggleClass(this.widgetFullName + "-disabled", !!value);
        if (value) {
          this.hoverable.removeClass("ui-state-hover");
          this.focusable.removeClass("ui-state-focus");
        }
      }
      return this;
    },
    enable: function() {
      return this._setOptions({disabled: false});
    },
    disable: function() {
      return this._setOptions({disabled: true});
    },
    _on: function(suppressDisabledCheck, element, handlers) {
      var delegateElement,
          instance = this;
      if (typeof suppressDisabledCheck !== "boolean") {
        handlers = element;
        element = suppressDisabledCheck;
        suppressDisabledCheck = false;
      }
      if (!handlers) {
        handlers = element;
        element = this.element;
        delegateElement = this.widget();
      } else {
        element = delegateElement = $(element);
        this.bindings = this.bindings.add(element);
      }
      $.each(handlers, function(event, handler) {
        function handlerProxy() {
          if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
            return;
          }
          return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
        }
        if (typeof handler !== "string") {
          handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
        }
        var match = event.match(/^([\w:-]*)\s*(.*)$/),
            eventName = match[1] + instance.eventNamespace,
            selector = match[2];
        if (selector) {
          delegateElement.delegate(selector, eventName, handlerProxy);
        } else {
          element.bind(eventName, handlerProxy);
        }
      });
    },
    _off: function(element, eventName) {
      eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
      element.unbind(eventName).undelegate(eventName);
      this.bindings = $(this.bindings.not(element).get());
      this.focusable = $(this.focusable.not(element).get());
      this.hoverable = $(this.hoverable.not(element).get());
    },
    _delay: function(handler, delay) {
      function handlerProxy() {
        return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
      }
      var instance = this;
      return setTimeout(handlerProxy, delay || 0);
    },
    _hoverable: function(element) {
      this.hoverable = this.hoverable.add(element);
      this._on(element, {
        mouseenter: function(event) {
          $(event.currentTarget).addClass("ui-state-hover");
        },
        mouseleave: function(event) {
          $(event.currentTarget).removeClass("ui-state-hover");
        }
      });
    },
    _focusable: function(element) {
      this.focusable = this.focusable.add(element);
      this._on(element, {
        focusin: function(event) {
          $(event.currentTarget).addClass("ui-state-focus");
        },
        focusout: function(event) {
          $(event.currentTarget).removeClass("ui-state-focus");
        }
      });
    },
    _trigger: function(type, event, data) {
      var prop,
          orig,
          callback = this.options[type];
      data = data || {};
      event = $.Event(event);
      event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
      event.target = this.element[0];
      orig = event.originalEvent;
      if (orig) {
        for (prop in orig) {
          if (!(prop in event)) {
            event[prop] = orig[prop];
          }
        }
      }
      this.element.trigger(event, data);
      return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
    }
  };
  $.each({
    show: "fadeIn",
    hide: "fadeOut"
  }, function(method, defaultEffect) {
    $.Widget.prototype["_" + method] = function(element, options, callback) {
      if (typeof options === "string") {
        options = {effect: options};
      }
      var hasOptions,
          effectName = !options ? method : options === true || typeof options === "number" ? defaultEffect : options.effect || defaultEffect;
      options = options || {};
      if (typeof options === "number") {
        options = {duration: options};
      }
      hasOptions = !$.isEmptyObject(options);
      options.complete = callback;
      if (options.delay) {
        element.delay(options.delay);
      }
      if (hasOptions && $.effects && $.effects.effect[effectName]) {
        element[method](options);
      } else if (effectName !== method && element[effectName]) {
        element[effectName](options.duration, options.easing, callback);
      } else {
        element.queue(function(next) {
          $(this)[method]();
          if (callback) {
            callback.call(element[0]);
          }
          next();
        });
      }
    };
  });
  return $.widget;
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("d", ["3", "e"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  var mouseHandled = false;
  $(document).mouseup(function() {
    mouseHandled = false;
  });
  return $.widget("ui.mouse", {
    version: "1.11.4",
    options: {
      cancel: "input,textarea,button,select,option",
      distance: 1,
      delay: 0
    },
    _mouseInit: function() {
      var that = this;
      this.element.bind("mousedown." + this.widgetName, function(event) {
        return that._mouseDown(event);
      }).bind("click." + this.widgetName, function(event) {
        if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
          $.removeData(event.target, that.widgetName + ".preventClickEvent");
          event.stopImmediatePropagation();
          return false;
        }
      });
      this.started = false;
    },
    _mouseDestroy: function() {
      this.element.unbind("." + this.widgetName);
      if (this._mouseMoveDelegate) {
        this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      }
    },
    _mouseDown: function(event) {
      if (mouseHandled) {
        return;
      }
      this._mouseMoved = false;
      (this._mouseStarted && this._mouseUp(event));
      this._mouseDownEvent = event;
      var that = this,
          btnIsLeft = (event.which === 1),
          elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
      if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
        return true;
      }
      this.mouseDelayMet = !this.options.delay;
      if (!this.mouseDelayMet) {
        this._mouseDelayTimer = setTimeout(function() {
          that.mouseDelayMet = true;
        }, this.options.delay);
      }
      if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
        this._mouseStarted = (this._mouseStart(event) !== false);
        if (!this._mouseStarted) {
          event.preventDefault();
          return true;
        }
      }
      if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
        $.removeData(event.target, this.widgetName + ".preventClickEvent");
      }
      this._mouseMoveDelegate = function(event) {
        return that._mouseMove(event);
      };
      this._mouseUpDelegate = function(event) {
        return that._mouseUp(event);
      };
      this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
      event.preventDefault();
      mouseHandled = true;
      return true;
    },
    _mouseMove: function(event) {
      if (this._mouseMoved) {
        if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
          return this._mouseUp(event);
        } else if (!event.which) {
          return this._mouseUp(event);
        }
      }
      if (event.which || event.button) {
        this._mouseMoved = true;
      }
      if (this._mouseStarted) {
        this._mouseDrag(event);
        return event.preventDefault();
      }
      if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
        this._mouseStarted = (this._mouseStart(this._mouseDownEvent, event) !== false);
        (this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
      }
      return !this._mouseStarted;
    },
    _mouseUp: function(event) {
      this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      if (this._mouseStarted) {
        this._mouseStarted = false;
        if (event.target === this._mouseDownEvent.target) {
          $.data(event.target, this.widgetName + ".preventClickEvent", true);
        }
        this._mouseStop(event);
      }
      mouseHandled = false;
      return false;
    },
    _mouseDistanceMet: function(event) {
      return (Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance);
    },
    _mouseDelayMet: function() {
      return this.mouseDelayMet;
    },
    _mouseStart: function() {},
    _mouseDrag: function() {},
    _mouseStop: function() {},
    _mouseCapture: function() {
      return true;
    }
  });
}));

_removeDefine();
})();
(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("21", ["3", "c", "e", "d"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  $.widget("ui.rotatable", $.ui.mouse, {
    options: {
      handle: false,
      angle: false,
      start: null,
      rotate: null,
      stop: null
    },
    handle: function(handle) {
      if (handle === undefined) {
        return this.options.handle;
      }
      this.options.handle = handle;
    },
    angle: function(angle) {
      if (angle === undefined) {
        return this.options.angle;
      }
      this.options.angle = angle;
      this.performRotation(this.options.angle);
    },
    _create: function() {
      var handle;
      if (!this.options.handle) {
        handle = $(document.createElement('div'));
        handle.addClass('ui-rotatable-handle');
      } else {
        handle = this.options.handle;
      }
      this.listeners = {
        rotateElement: $.proxy(this.rotateElement, this),
        startRotate: $.proxy(this.startRotate, this),
        stopRotate: $.proxy(this.stopRotate, this)
      };
      handle.draggable({
        helper: 'clone',
        start: this.dragStart,
        handle: handle
      });
      handle.bind('mousedown', this.listeners.startRotate);
      handle.appendTo(this.element);
      if (this.options.angle != false) {
        this.elementCurrentAngle = this.options.angle;
        this.performRotation(this.elementCurrentAngle);
      } else {
        this.elementCurrentAngle = 0;
      }
    },
    _destroy: function() {
      this.element.removeClass('ui-rotatable');
      this.element.find('.ui-rotatable-handle').remove();
    },
    performRotation: function(angle) {
      this.element.css('transform', 'rotate(' + angle + 'rad)');
      this.element.css('-moz-transform', 'rotate(' + angle + 'rad)');
      this.element.css('-webkit-transform', 'rotate(' + angle + 'rad)');
      this.element.css('-o-transform', 'rotate(' + angle + 'rad)');
    },
    getElementOffset: function() {
      this.performRotation(0);
      var offset = this.element.offset();
      this.performRotation(this.elementCurrentAngle);
      return offset;
    },
    getElementCenter: function() {
      var elementOffset = this.getElementOffset();
      var elementCentreX = elementOffset.left + this.element.width() / 2;
      var elementCentreY = elementOffset.top + this.element.height() / 2;
      return Array(elementCentreX, elementCentreY);
    },
    dragStart: function(event) {
      if (this.element) {
        return false;
      }
    },
    startRotate: function(event) {
      var center = this.getElementCenter();
      var startXFromCenter = event.pageX - center[0];
      var startYFromCenter = event.pageY - center[1];
      this.mouseStartAngle = Math.atan2(startYFromCenter, startXFromCenter);
      this.elementStartAngle = this.elementCurrentAngle;
      this.hasRotated = false;
      this._propagate("start", event);
      $(document).bind('mousemove', this.listeners.rotateElement);
      $(document).bind('mouseup', this.listeners.stopRotate);
      return false;
    },
    rotateElement: function(event) {
      if (!this.element) {
        return false;
      }
      var center = this.getElementCenter();
      var xFromCenter = event.pageX - center[0];
      var yFromCenter = event.pageY - center[1];
      var mouseAngle = Math.atan2(yFromCenter, xFromCenter);
      var rotateAngle = mouseAngle - this.mouseStartAngle + this.elementStartAngle;
      this.performRotation(rotateAngle);
      this.element.data('angle', rotateAngle);
      var previousRotateAngle = this.elementCurrentAngle;
      this.elementCurrentAngle = rotateAngle;
      this._propagate("rotate", event);
      if (previousRotateAngle != rotateAngle) {
        this._trigger("rotate", event, this.ui());
        this.hasRotated = true;
      }
      return false;
    },
    stopRotate: function(event) {
      if (!this.element) {
        return;
      }
      $(document).unbind('mousemove', this.listeners.rotateElement);
      $(document).unbind('mouseup', this.listeners.stopRotate);
      this.elementStopAngle = this.elementCurrentAngle;
      if (this.hasRotated) {
        this._propagate("stop", event);
      }
      setTimeout(function() {
        this.element = false;
      }, 10);
      return false;
    },
    _propagate: function(n, event) {
      $.ui.plugin.call(this, n, [event, this.ui()]);
      (n !== "rotate" && this._trigger(n, event, this.ui()));
    },
    plugins: {},
    ui: function() {
      return {
        element: this.element,
        angle: {
          start: this.elementStartAngle,
          current: this.elementCurrentAngle,
          stop: this.elementStopAngle
        }
      };
    }
  });
  return $.ui.rotatable;
}));

_removeDefine();
})();
$__System.register("22", [], function() { return { setters: [], execute: function() {} } });

(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
define("1", ["3", "4", "6", "8", "a", "c", "e", "d", "14", "b", "f", "10", "11", "12", "13", "15", "16", "17", "18", "19", "1a", "1b", "1f", "21", "22"], function(jQuery) {
  'use strict';
  jQuery.error = function(message) {
    console.warn('jQuery.error', message);
    globalvars.trackJavaScriptError('jQuery', message, navigator.userAgent);
  };
  jQuery(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
    console.debug('ajaxError', {
      jqXHR: jqXHR,
      thrownError: thrownError
    });
    if (jqXHR.responseJSON) {
      globalvars.jsonErrorDump(jqXHR.responseJSON);
    }
    globalvars.trackJavaScriptError('jQuery Ajax', ajaxSettings.url, JSON.stringify({
      result: event.result,
      status: jqXHR.status,
      statusText: jqXHR.statusText,
      crossDomain: ajaxSettings.crossDomain,
      dataType: ajaxSettings.dataType
    }));
  });
  jQuery.getOrCreate = function(selector, html) {
    var elemento = jQuery(selector);
    if (elemento.length === 0) {
      elemento = jQuery(html);
    }
    return elemento;
  };
  var _idx = 0,
      isIE = false,
      _ie = isIE ? '-ie' : '',
      isMoz = false,
      history = [],
      int2Hex = function(i) {
        var h = i.toString(16);
        if (h.length === 1) {
          h = '0' + h;
        }
        return h;
      },
      st2Hex = function(s) {
        return int2Hex(Number(s));
      },
      toHex3 = function(c) {
        if (c && c.length > 10) {
          var p1 = 1 + c.indexOf('('),
              p2 = c.indexOf(')'),
              cs = c.substring(p1, p2).split(',');
          console.log(cs);
          return ['#', st2Hex(cs[0]), st2Hex(cs[1]), st2Hex(cs[2])].join('');
        } else {
          return c;
        }
      };
  jQuery.widget("evol.colorpicker", {
    version: '2.1',
    options: {
      color: null,
      showOn: 'both',
      displayIndicator: true,
      history: true,
      strings: 'Pick A Color',
      cols: 9,
      rows: 4,
      type: 'colorpicker',
      gradientid: 0,
      extraClassnames: '',
      subThemeColors: ['f2f2f2', 'ddd9c3', 'c6d9f0', 'dbe5f1', 'f2dcdb', 'ebf1dd', 'e5e0ec', 'dbeef3', 'fdeada', 'd8d8d8', 'c4bd97', '8db3e2', 'b8cce4', 'e5b9b7', 'd7e3bc', 'ccc1d9', 'b7dde8', 'fbd5b5', 'bfbfbf', '938953', '548dd4', '95b3d7', 'd99694', 'c3d69b', 'b2a2c7', '92cddc', 'fac08f', 'a5a5a5', '494429', '17365d', '366092', '953734', '76923c', '5f497a', '31859b', 'e36c09', '7f7f7f', '1d1b10', '0f243e', '244061', '632423', '4f6128', '3f3151', '205867', '974806']
    },
    _create: function() {
      this._paletteIdx = 1;
      this._id = 'evo-cp' + _idx++;
      this._enabled = true;
      var self = this;
      switch (this.element.get(0).tagName) {
        case 'INPUT':
          var color = this.options.color;
          this._isPopup = true;
          this._palette = null;
          if (color !== null) {
            this.element.val(color);
          } else {
            var v = this.element.val();
            if (v !== '') {
              color = this.options.color = v;
            }
          }
          this.element.addClass('colorPicker ' + this._id);
          if (this.options.type === 'gradient') {
            this.options.rows = this.options.subThemeColors.length;
            var thisgradient = this.getGradient(this.options.gradientid);
            this.element.wrap('<span class="gradientpickerwrap"></span>').after('<div class="gradientpicker ' + ((this.options.showOn === 'focus') ? '' : 'evo-pointer ') + 'evo-colorind' + (isMoz ? '-ff' : _ie) + '"  style="' + thisgradient + '"></div>');
          } else {
            this.element.wrap('<div class="colorpickerwrap" style="width:' + (this.element.width() + 32) + 'px;' + (isIE ? 'margin-bottom:-21px;' : '') + (isMoz ? 'padding:1px 0;' : '') + '"></div>').after('<div class="colorpickerafter ' + ((this.options.showOn === 'focus') ? '' : 'evo-pointer ') + 'evo-colorind' + (isMoz ? '-ff' : _ie) + '" ' + (color !== null ? 'style="background-color:' + color + '"' : '') + '></div>');
          }
          this.element.on('keyup onpaste', function(evt) {
            var thisvalue = jQuery(this).val();
            if (thisvalue !== self.options.color) {
              self._setValue(thisvalue, true);
            }
          });
          var showOn = this.options.showOn;
          if (showOn === 'both' || showOn === 'focus') {
            this.element.on('focus', function() {
              self.showPalette();
            });
          }
          if (showOn === 'both' || showOn === 'button') {
            this.element.next().on('click', function(evt) {
              evt.stopPropagation();
              self.showPalette();
            });
          }
          break;
        default:
          this._isPopup = false;
          this._palette = this.element.html(this._paletteHTML()).attr('aria-haspopup', 'true');
          this._bindColors();
      }
      if (color !== null && this.options.history) {
        this._add2History(color);
      }
    },
    _paletteHTML: function() {
      var h = [],
          pIdx = this._paletteIdx = Math.abs(this._paletteIdx),
          opts = this.options,
          labels = opts.strings.split(',');
      h.push('<div  class="lecolorpicker evo-pop', _ie, this.options.extraClassnames, '"', this._isPopup ? ' style="position:absolute"' : '', '>');
      h.push('<span>', this['_paletteHTML' + pIdx](), '</span>');
      h.push('<div class="evo-more"><a href="javascript:void(0)">', labels[1 + pIdx], '</a>');
      h.push('</div>');
      h.push('</div>');
      return h.join('');
    },
    _colorIndHTML: function(c, fl) {
      var h = [];
      h.push('<div class="evo-color" style="float:left"><div style="');
      h.push(c ? 'background-color:' + c : 'display:none');
      if (isIE) {
        h.push('" class="evo-colorbox-ie"></div><span class=".evo-colortxt-ie" ');
      } else {
        h.push('"></div><span ');
      }
      h.push(c ? '>' + c + '</span>' : '/>');
      h.push('</div>');
      return h.join('');
    },
    _paletteHTML1: function() {
      var h = [],
          labels = this.options.strings.split(','),
          oTD = '<td  class="colorpickersquare" style=" ',
          cTD = isIE ? '"><div style="width:2px;"></div>' : '"><span>',
          fTD = '</span></td>',
          oTRTH = '<tr><th colspan="' + this.options.cols + '" class="ui-widget-content">';
      h.push('<table class="evo-palette', _ie, '">', oTRTH, labels[0], '</th></tr>');
      for (var r = 0; r < this.options.rows; r++) {
        h.push('<tr class="in">');
        if (this.options.type === 'colorpicker') {
          for (var i = 0; i < this.options.cols; i++) {
            h.push(oTD, 'background: #' + this.options.subThemeColors[r * this.options.cols + i] + ';" data-color="' + this.options.subThemeColors[r * this.options.cols + i], cTD, fTD);
          }
        } else if (this.options.type === 'gradient') {
          h.push(oTD);
          h.push(this.getGradient(r));
          h.push(';width: 150px;border:1px solid #EEE" data-gradient="' + r, cTD, fTD);
        }
        h.push('</tr>');
      }
      h.push('</table>');
      return h.join('');
    },
    getGradient: function(gradientid) {
      var thisgradient = [];
      thisgradient.push('background: linear-gradient(to right ');
      var colorlength = this.options.subThemeColors[gradientid][1].length;
      for (var i = 0; i < colorlength; i++) {
        thisgradient.push(' , ', this.options.subThemeColors[gradientid][1][i], ' ', 10 * (10 * i / colorlength), '% ');
      }
      thisgradient.push(')');
      thisgradient = thisgradient.join('');
      return thisgradient;
    },
    showPalette: function() {
      if (this._enabled) {
        jQuery('.colorPicker').not('.' + this._id).colorpicker('hidePalette');
        if (this._palette === null) {
          this._palette = this.element.next().after(this._paletteHTML()).next().on('click', function(evt) {
            evt.stopPropagation();
          });
          this._bindColors();
          var that = this;
          jQuery(document.body).on('click.' + this._id, function(evt) {
            if (evt.target !== that.element.get(0)) {
              that.hidePalette();
            }
          });
        }
      }
      return this;
    },
    hidePalette: function() {
      if (this._isPopup && this._palette) {
        jQuery(document.body).off('click.' + this._id);
        var that = this;
        this._palette.off('mouseover click', 'td').fadeOut(function() {
          that._palette.remove();
          that._palette = that._cTxt = null;
        }).find('.evo-more a').off('click');
      }
      return this;
    },
    _bindColors: function() {
      var es = this._palette.find('div.evo-color'),
          sel = this.options.history ? 'td,.evo-cHist div' : 'td';
      this._cTxt1 = es.eq(0).children().eq(0);
      this._cTxt2 = es.eq(1).children().eq(0);
      var that = this;
      this._palette.on('click', sel, function(evt) {
        if (that._enabled) {
          if (that.options.type === 'colorpicker') {
            var c = toHex3(jQuery(this).data('color'));
            that._setValue(String(c));
          } else if (that.options.type === 'gradient') {
            var gradientid = jQuery(this).data('gradient');
            that.options.gradientid = gradientid;
            that._setValue(String(gradientid));
            jQuery('.gradientpicker', that.element.parent()).attr('style', that.getGradient(gradientid));
          }
        }
      }).on('mouseover', sel, function(evt) {
        if (that._enabled) {
          var c = toHex3(jQuery(this).data('color'));
          if (that.options.displayIndicator) {
            that._setColorInd(c, 2);
          }
          that.element.trigger('mouseover.color', c);
        }
      }).find('.evo-more a').on('click', function() {
        that._switchPalette(this);
      });
    },
    val: function(value) {
      if (typeof value === 'undefined') {
        return this.options.color;
      } else {
        this._setValue(value);
        return this;
      }
    },
    _setValue: function(c, noHide) {
      c = c || '#999999';
      c = String(c).replace(/ /g, '');
      this.options.color = c;
      if (this._isPopup) {
        if (!noHide) {
          this.hidePalette();
        }
        this.element.val(c).next().attr('style', 'background-color:' + c);
      } else {
        this._setColorInd(c, 1);
      }
      if (this.options.history && this._paletteIdx > 0) {
        this._add2History(c);
      }
      this.element.trigger('change.color', c);
    },
    _setColorInd: function(c, idx) {
      this['_cTxt' + idx].attr('style', 'background-color:' + c).next().html(c);
    },
    _setOption: function(key, value) {
      if (key === 'color') {
        this._setValue(value, true);
      } else {
        this.options[key] = value;
      }
    },
    _add2History: function(c) {
      var iMax = history.length;
      for (var i = 0; i < iMax; i++) {
        if (c === history[i]) {
          return;
        }
      }
      if (iMax > 27) {
        history.shift();
      }
      history.push(c);
    },
    enable: function() {
      var e = this.element;
      if (this._isPopup) {
        e.removeAttr('disabled');
      } else {
        e.css({
          'opacity': '1',
          'pointer-events': 'auto'
        });
      }
      if (this.options.showOn !== 'focus') {
        this.element.next().addClass('evo-pointer');
      }
      e.removeAttr('aria-disabled');
      this._enabled = true;
      return this;
    },
    disable: function() {
      var e = this.element;
      if (this._isPopup) {
        e.attr('disabled', 'disabled');
      } else {
        this.hidePalette();
        e.css({
          'opacity': '0.3',
          'pointer-events': 'none'
        });
      }
      if (this.options.showOn !== 'focus') {
        this.element.next().removeClass('evo-pointer');
      }
      e.attr('aria-disabled', 'true');
      this._enabled = false;
      return this;
    },
    isDisabled: function() {
      return !this._enabled;
    },
    destroy: function() {
      jQuery(document.body).off('click.' + this._id);
      if (this._palette) {
        this._palette.off('mouseover click', 'td').find('.evo-more a').off('click');
        if (this._isPopup) {
          this._palette.remove();
        }
        this._palette = this._cTxt = null;
      }
      if (this._isPopup) {
        this.element.next().off('click').remove().end().off('focus').unwrap();
      }
      this.element.removeClass('colorPicker ' + this.id).empty();
      jQuery.Widget.prototype.destroy.call(this);
    }
  });
  return jQuery;
});

_removeDefine();
})();
$__System.register('github:systemjs/plugin-css@0.1.20.js!src/plugins/iconpicker.css', [], false, function() {});
$__System.register('github:systemjs/plugin-css@0.1.20.js!src/css/colorpicker.css', [], false, function() {});
(function(c){if (typeof document == 'undefined') return; var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));})
(".iconpicker_character{font-family:\"Material Icons\";font-style:normal;font-weight:400;speak:none;cursor:pointer;display:inline-block}.iconNew,.newCharacter{width:24px;height:27px}i.fontello_character{min-width:10px;text-align:center}.insidepopover td{padding:1px}.insidepopover button{padding:1px 3px}.insidepopover button{background-color:#F0F0F0}.insidepopover .selected{background-color:#CCC}.popover{width:auto!important;z-index:1100!important;height:auto!important}.popover-title{font-weight:700!important}#controles .popover-content{padding:2px 4px}#controles .popover{height:100px;width:210px!important}#controles .popover button{margin:-1px;font-family:\"Material Icons\";font-style:normal;font-weight:400;speak:none;cursor:pointer;display:inline-block}.iconpicker.popover{margin-top:110px}.iconpicker.popover.right .arrow{top:20px}.dataseticon{vertical-align:middle}.grad_ex{width:260px;height:20px;margin:-5px -5px 25px 0;float:right}.gradientPicker-preview{width:100%;height:100%;border:1px solid rgba(0,0,0,.2)}.gradientPicker-ctrlPt{width:8px;height:8px;border:2px solid gray;position:absolute;display:inline-block}.gradientPicker-ctrlPts{position:relative;height:10px;width:100%}.gradientPicker-ptConfig{position:absolute;width:35px;height:40px;z-index:1;margin-top:2px;background-color:#fff;border-radius:5px;border:1px solid rgba(0,0,0,.2);padding:0 3px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,.2);-moz-box-shadow:0 5px 10px rgba(0,0,0,.2);box-shadow:0 5px 10px rgba(0,0,0,.2)}.gradientPicker-close{position:absolute;top:-4px;right:-4px;width:16px;height:16px;background-image:url(img/gradientpicker/circle_remove.png)}.gradientPicker-ptConfig .color-chooser{float:left}.colorpicker{width:356px;height:176px;overflow:hidden;position:absolute;background:url(img/gradientpicker/colorpicker_background.png);font-family:Arial,Helvetica,sans-serif;display:none;z-index:500}.color-chooser{width:30px;height:30px;margin-top:5px;background:url(img/gradientpicker/select.png) center}.color-chooser>div{width:30px;height:30px;background:url(img/gradientpicker/select.png) center}.colorpicker_color{width:150px;height:150px;left:14px;top:13px;position:absolute;background:red;overflow:hidden;cursor:crosshair}.colorpicker_color div{position:absolute;top:0;left:0;width:150px;height:150px;background:url(img/gradientpicker/colorpicker_overlay.png)}.colorpicker_color div div{position:absolute;top:0;left:0;width:11px;height:11px;overflow:hidden;background:url(img/gradientpicker/colorpicker_select.gif);margin:-5px 0 0 -5px}.colorpicker_hue{position:absolute;top:13px;left:171px;width:35px;height:150px;cursor:n-resize}.colorpicker_hue div{position:absolute;width:35px;height:9px;overflow:hidden;background:url(img/gradientpicker/colorpicker_indic.gif) left top;margin:-4px 0 0 0;left:0}.colorpicker_new_color{position:absolute;width:60px;height:30px;left:213px;top:13px;background:red}.colorpicker_current_color{position:absolute;width:60px;height:30px;left:283px;top:13px;background:red}.colorpicker input{background-color:transparent!important;border:1px solid transparent!important;position:absolute!important;font-size:10px!important;font-family:Arial,Helvetica,sans-serif!important;color:#898989!important;top:4px!important;right:11px!important;text-align:right!important;margin:0!important;padding:0!important;height:11px!important;line-height:11px!important}.colorpicker_hex{position:absolute;width:72px;height:22px;background:url(img/gradientpicker/colorpicker_hex.png) top;left:212px;top:142px}.colorpicker_hex input{right:6px}.colorpicker_field{height:22px;width:62px;background-position:top;position:absolute}.colorpicker_field>input{width:42px}.colorpicker_hex>input{width:42px}.colorpicker_field span{position:absolute;width:12px;height:22px;overflow:hidden;top:0;right:0;cursor:n-resize}.colorpicker_rgb_r{background-image:url(img/gradientpicker/colorpicker_rgb_r.png);top:52px;left:212px}.colorpicker_rgb_g{background-image:url(img/gradientpicker/colorpicker_rgb_g.png);top:82px;left:212px}.colorpicker_rgb_b{background-image:url(img/gradientpicker/colorpicker_rgb_b.png);top:112px;left:212px}.colorpicker_hsb_h{background-image:url(img/gradientpicker/colorpicker_hsb_h.png);top:52px;left:282px}.colorpicker_hsb_s{background-image:url(img/gradientpicker/colorpicker_hsb_s.png);top:82px;left:282px}.colorpicker_hsb_b{background-image:url(img/gradientpicker/colorpicker_hsb_b.png);top:112px;left:282px}.colorpicker_submit{position:absolute;width:22px;height:22px;background:url(img/gradientpicker/colorpicker_submit.png) top;left:322px;top:142px;overflow:hidden}.colorpicker_focus{background-position:center}.colorpicker_hex.colorpicker_focus{background-position:bottom}.colorpicker_submit.colorpicker_focus{background-position:bottom}.colorpicker_slider{background-position:bottom}.grad_ex input.invisible{display:none;position:absolute}#jquery-colour-picker{background:#fafafa;background-image:-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee));width:180px;padding:10px 5px 5px 10px;border:1px solid #666;-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;-moz-box-shadow:5px 5px 5px rgba(0,0,0,.3);-webkit-box-shadow:5px 5px 5px rgba(0,0,0,.3);box-shadow:5px 5px 5px rgba(0,0,0,.3);z-index:1199}#jquery-colour-picker h2{margin:0 0 5px 0;font-size:14px}#jquery-colour-picker ul{margin:0;padding:0;list-style-type:none;zoom:1}#jquery-colour-picker ul:after{content:\".\";display:block;height:0;visibility:hidden;clear:both}#jquery-colour-picker ul li{float:left;margin:0 5px 5px 0}#jquery-colour-picker ul li a{display:block;width:13px;height:13px;text-decoration:none;text-indent:-100000px;outline:0;border:1px solid #aaa}#jquery-colour-picker ul li a:hover{border-color:#000}.evo-pop{z-index:10000;width:204px;padding:3px 3px 0}.evo-pop-ie{z-index:10000;width:212px;padding:3px}.evo-palette,.evo-palette-ie{border-collapse:separate;border-spacing:4px 0}.evo-palette td{font-size:1px;border:solid 1px silver;padding:7px;cursor:pointer}.evo-palette tr.top td{border-bottom:0}.evo-palette tr.in td{border-top:0;border-bottom:0}.evo-palette tr.bottom td{border-top:0}.evo-palette th,.evo-palette-ie th{border:0;padding:5px 3px;text-align:left;font-weight:400;background:0 0!important}.evo-palette div.sep{height:3px}.evo-palette-ie td{font-size:1px;border:solid 1px silver;padding:7px;cursor:pointer}.evo-palette2,.evo-palette2-ie{margin:auto;border-collapse:collapse}.evo-palette2 td,.evo-palette2-ie td{font-size:1px;cursor:pointer}.evo-palette2 td{padding:6px 7px}.evo-palette2-ie td{padding:5px}.evo-palcenter{padding:5px;text-align:center}.colorpickerafter.evo-colorind,.colorpickerafter.evo-colorind-ff,.colorpickerafter.evo-colorind-ie{border:solid 1px #c3c3c3;width:12px!important;height:12px!important;float:left}.context_menu_item .colorpickerafter.evo-colorind,.context_menu_item .colorpickerafter.evo-colorind-ff,.context_menu_item .colorpickerafter.evo-colorind-ie{margin-right:5px}.cr.gradient .gradientpicker.evo-colorind,.cr.gradient .gradientpicker.evo-colorind-ie{border-right:solid 1px #c3c3c3;border-bottom:solid 1px #c3c3c3;width:99%!important;margin:1px 1% 1px 0;height:13px!important;float:left}.evo-colorind{position:relative;top:2px}.evo-colorind-ie{position:relative;left:-16px;top:2px}.evo-colorbox-ie{font-size:8px;padding:3px 9px!important}.evo-colortxt-ie{position:relative;top:-6px}.evo-cHist:after,.evo-color span:after,.evo-colorind-ff:after,.evo-colorind-ie:after,.evo-colorind:after,.evo-pop-ie:after,.evo-pop:after{content:\".\";display:block;height:0;clear:both;visibility:hidden;font-size:0}.evo-color{width:94px;padding:1px 3px 0 4px}.evo-color div{border:solid 1px grey;border-right:solid 1px silver;border-bottom:solid 1px silver;padding:3px;margin-bottom:5px;width:10px;height:10px;float:left}.evo-color span{font-size:15px;margin:1px 0 4px 3px;float:left}.evo-sep{height:10px;font-size:0}.evo-more{padding:4px 5px 4px;font-size:smaller}.evo-cHist{padding:3px}.evo-cHist div{cursor:pointer;border:solid 1px silver;padding:3px;margin:5px;width:10px;height:10px;float:left}a.evo-hist{margin-left:6px}.evo-pointer{cursor:pointer}.pickercolor input{display:inline-block;width:20px;margin-left:10px;height:14px;padding:3px;margin:2px 12px;color:transparent!important}");
})
(function(factory) {
  define([], factory);
});