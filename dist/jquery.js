!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return D(e.substr(6));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["jquery_shim/index.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/position.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/version.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  (function() {
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
    supportsOffsetFractions = function() {
      var element = $("<div>").css("position", "absolute").appendTo("body").offset({
        top: 1.5,
        left: 1.5
      }),
          support = element.offset().top === 1.5;
      element.remove();
      supportsOffsetFractions = function() {
        return support;
      };
      return support;
    };
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
            div = $("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"),
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
            isDocument = !!withinElement[0] && withinElement[0].nodeType === 9,
            hasOffset = !isWindow && !isDocument;
        return {
          element: withinElement,
          isWindow: isWindow,
          isDocument: isDocument,
          offset: hasOffset ? $(element).offset() : {
            left: 0,
            top: 0
          },
          scrollLeft: withinElement.scrollLeft(),
          scrollTop: withinElement.scrollTop(),
          width: withinElement.outerWidth(),
          height: withinElement.outerHeight()
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
        if (!supportsOffsetFractions()) {
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
  })();
  return $.ui.position;
}));

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/safe-active-element.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/version.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.ui.safeActiveElement = function(document) {
    var activeElement;
    try {
      activeElement = document.activeElement;
    } catch (error) {
      activeElement = document.body;
    }
    if (!activeElement) {
      activeElement = document.body;
    }
    if (!activeElement.nodeName) {
      activeElement = document.body;
    }
    return activeElement;
  };
}));

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/safe-blur.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/version.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.ui.safeBlur = function(element) {
    if (element && element.nodeName.toLowerCase() !== "body") {
      $(element).trigger("blur");
    }
  };
}));

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/widgets/draggable.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/widgets/mouse.js", "github:components/jqueryui@1.12.0/ui/data.js", "github:components/jqueryui@1.12.0/ui/plugin.js", "github:components/jqueryui@1.12.0/ui/safe-active-element.js", "github:components/jqueryui@1.12.0/ui/safe-blur.js", "github:components/jqueryui@1.12.0/ui/scroll-parent.js", "github:components/jqueryui@1.12.0/ui/version.js", "github:components/jqueryui@1.12.0/ui/widget.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  $.widget("ui.draggable", $.ui.mouse, {
    version: "1.12.0",
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
        this._addClass("ui-draggable");
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
      var activeElement = $.ui.safeActiveElement(this.document[0]),
          target = $(event.target);
      if (this._getHandle(event) && target.closest(activeElement).length) {
        return;
      }
      $.ui.safeBlur(activeElement);
    },
    _mouseStart: function(event) {
      var o = this.options;
      this.helper = this._createHelper(event);
      this._addClass(this.helper, "ui-draggable-dragging");
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
          this._mouseUp(new $.Event("mouseup", event));
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
        this.element.trigger("focus");
      }
      return $.ui.mouse.prototype._mouseUp.call(this, event);
    },
    cancel: function() {
      if (this.helper.is(".ui-draggable-dragging")) {
        this._mouseUp(new $.Event("mouseup", {target: this.element[0]}));
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
      this._addClass(this.handleElement, "ui-draggable-handle");
    },
    _removeHandleClassName: function() {
      this._removeClass(this.handleElement, "ui-draggable-handle");
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
      this._removeClass(this.helper, "ui-draggable-dragging");
      if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
        this.helper.remove();
      }
      this.helper = null;
      this.cancelHelperRemoval = false;
      if (this.destroyOnClear) {
        this.destroy();
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

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/widgets/droppable.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/widgets/draggable.js", "github:components/jqueryui@1.12.0/ui/widgets/mouse.js", "github:components/jqueryui@1.12.0/ui/version.js", "github:components/jqueryui@1.12.0/ui/widget.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  $.widget("ui.droppable", {
    version: "1.12.0",
    widgetEventPrefix: "drop",
    options: {
      accept: "*",
      addClasses: true,
      greedy: false,
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
      o.addClasses && this._addClass("ui-droppable");
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
      this._addActiveClass();
      if (draggable) {
        this._trigger("activate", event, this.ui(draggable));
      }
    },
    _deactivate: function(event) {
      var draggable = $.ui.ddmanager.current;
      this._removeActiveClass();
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
        this._addHoverClass();
        this._trigger("over", event, this.ui(draggable));
      }
    },
    _out: function(event) {
      var draggable = $.ui.ddmanager.current;
      if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {
        return;
      }
      if (this.accept.call(this.element[0], (draggable.currentItem || draggable.element))) {
        this._removeHoverClass();
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
        if (inst.options.greedy && !inst.options.disabled && inst.options.scope === draggable.options.scope && inst.accept.call(inst.element[0], (draggable.currentItem || draggable.element)) && intersect(draggable, $.extend(inst, {offset: inst.element.offset()}), inst.options.tolerance, event)) {
          childrenIntersection = true;
          return false;
        }
      });
      if (childrenIntersection) {
        return false;
      }
      if (this.accept.call(this.element[0], (draggable.currentItem || draggable.element))) {
        this._removeActiveClass();
        this._removeHoverClass();
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
    },
    _addHoverClass: function() {
      this._addClass("ui-droppable-hover");
    },
    _removeHoverClass: function() {
      this._removeClass("ui-droppable-hover");
    },
    _addActiveClass: function() {
      this._addClass("ui-droppable-active");
    },
    _removeActiveClass: function() {
      this._removeClass("ui-droppable-active");
    }
  });
  var intersect = $.ui.intersect = (function() {
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
        if (!this.options.disabled && this.visible && intersect(draggable, this, this.options.tolerance, event)) {
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
      draggable.element.parentsUntil("body").on("scroll.droppable", function() {
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
            intersects = intersect(draggable, this, this.options.tolerance, event),
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
      draggable.element.parentsUntil("body").off("scroll.droppable");
      if (!draggable.options.refreshPositions) {
        $.ui.ddmanager.prepareOffsets(draggable, event);
      }
    }
  };
  if ($.uiBackCompat !== false) {
    $.widget("ui.droppable", $.ui.droppable, {
      options: {
        hoverClass: false,
        activeClass: false
      },
      _addActiveClass: function() {
        this._super();
        if (this.options.activeClass) {
          this.element.addClass(this.options.activeClass);
        }
      },
      _removeActiveClass: function() {
        this._super();
        if (this.options.activeClass) {
          this.element.removeClass(this.options.activeClass);
        }
      },
      _addHoverClass: function() {
        this._super();
        if (this.options.hoverClass) {
          this.element.addClass(this.options.hoverClass);
        }
      },
      _removeHoverClass: function() {
        this._super();
        if (this.options.hoverClass) {
          this.element.removeClass(this.options.hoverClass);
        }
      }
    });
  }
  return $.ui.droppable;
}));

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/disable-selection.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/version.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.fn.extend({
    disableSelection: (function() {
      var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
      return function() {
        return this.on(eventType + ".ui-disableSelection", function(event) {
          event.preventDefault();
        });
      };
    })(),
    enableSelection: function() {
      return this.off(".ui-disableSelection");
    }
  });
}));

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/plugin.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/version.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.ui.plugin = {
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

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/widgets/resizable.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/widgets/mouse.js", "github:components/jqueryui@1.12.0/ui/disable-selection.js", "github:components/jqueryui@1.12.0/ui/plugin.js", "github:components/jqueryui@1.12.0/ui/version.js", "github:components/jqueryui@1.12.0/ui/widget.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  $.widget("ui.resizable", $.ui.mouse, {
    version: "1.12.0",
    widgetEventPrefix: "resize",
    options: {
      alsoResize: false,
      animate: false,
      animateDuration: "slow",
      animateEasing: "swing",
      aspectRatio: false,
      autoHide: false,
      classes: {"ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"},
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
      return parseFloat(value) || 0;
    },
    _isNumber: function(value) {
      return !isNaN(parseFloat(value));
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
      var margins,
          o = this.options,
          that = this;
      this._addClass("ui-resizable");
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
        margins = {
          marginTop: this.originalElement.css("marginTop"),
          marginRight: this.originalElement.css("marginRight"),
          marginBottom: this.originalElement.css("marginBottom"),
          marginLeft: this.originalElement.css("marginLeft")
        };
        this.element.css(margins);
        this.originalElement.css("margin", 0);
        this.originalResizeStyle = this.originalElement.css("resize");
        this.originalElement.css("resize", "none");
        this._proportionallyResizeElements.push(this.originalElement.css({
          position: "static",
          zoom: 1,
          display: "block"
        }));
        this.originalElement.css(margins);
        this._proportionallyResize();
      }
      this._setupHandles();
      if (o.autoHide) {
        $(this.element).on("mouseenter", function() {
          if (o.disabled) {
            return;
          }
          that._removeClass("ui-resizable-autohide");
          that._handles.show();
        }).on("mouseleave", function() {
          if (o.disabled) {
            return;
          }
          if (!that.resizing) {
            that._addClass("ui-resizable-autohide");
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
            $(exp).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove();
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
    _setOption: function(key, value) {
      this._super(key, value);
      switch (key) {
        case "handles":
          this._removeHandles();
          this._setupHandles();
          break;
        default:
          break;
      }
    },
    _setupHandles: function() {
      var o = this.options,
          handle,
          i,
          n,
          hname,
          axis,
          that = this;
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
          axis = $("<div>");
          this._addClass(axis, "ui-resizable-handle " + hname);
          axis.css({zIndex: o.zIndex});
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
      this._handles.on("mouseover", function() {
        if (!that.resizing) {
          if (this.className) {
            axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
          }
          that.axis = axis && axis[1] ? axis[1] : "se";
        }
      });
      if (o.autoHide) {
        this._handles.hide();
        this._addClass("ui-resizable-autohide");
      }
    },
    _removeHandles: function() {
      this._handles.remove();
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
      this._addClass("ui-resizable-resizing");
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
        left = (parseFloat(that.element.css("left")) + (that.position.left - that.originalPosition.left)) || null;
        top = (parseFloat(that.element.css("top")) + (that.position.top - that.originalPosition.top)) || null;
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
      this._removeClass("ui-resizable-resizing");
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
          dh = this.originalPosition.top + this.originalSize.height,
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
        widths[i] = (parseFloat(borders[i]) || 0);
        widths[i] += (parseFloat(paddings[i]) || 0);
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
        this._addClass(this.helper, this._helper);
        this.helper.css({
          width: this.element.outerWidth(),
          height: this.element.outerHeight(),
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
          left = (parseFloat(that.element.css("left")) + (that.position.left - that.originalPosition.left)) || null,
          top = (parseFloat(that.element.css("top")) + (that.position.top - that.originalPosition.top)) || null;
      that.element.animate($.extend(style, top && left ? {
        top: top,
        left: left
      } : {}), {
        duration: o.animateDuration,
        easing: o.animateEasing,
        step: function() {
          var data = {
            width: parseFloat(that.element.css("width")),
            height: parseFloat(that.element.css("height")),
            top: parseFloat(that.element.css("top")),
            left: parseFloat(that.element.css("left"))
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
          width: parseFloat(el.width()),
          height: parseFloat(el.height()),
          left: parseFloat(el.css("left")),
          top: parseFloat(el.css("top"))
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
      $(this).removeData("ui-resizable-alsoresize");
    }
  });
  $.ui.plugin.add("resizable", "ghost", {
    start: function() {
      var that = $(this).resizable("instance"),
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
      });
      that._addClass(that.ghost, "ui-resizable-ghost");
      if ($.uiBackCompat !== false && typeof that.options.ghost === "string") {
        that.ghost.addClass(this.options.ghost);
      }
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

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/widgets/selectable.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/widgets/mouse.js", "github:components/jqueryui@1.12.0/ui/version.js", "github:components/jqueryui@1.12.0/ui/widget.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.widget("ui.selectable", $.ui.mouse, {
    version: "1.12.0",
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
      var that = this;
      this._addClass("ui-selectable");
      this.dragged = false;
      this.refresh = function() {
        that.elementPos = $(that.element[0]).offset();
        that.selectees = $(that.options.filter, that.element[0]);
        that._addClass(that.selectees, "ui-selectee");
        that.selectees.each(function() {
          var $this = $(this),
              selecteeOffset = $this.offset(),
              pos = {
                left: selecteeOffset.left - that.elementPos.left,
                top: selecteeOffset.top - that.elementPos.top
              };
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
      this._mouseInit();
      this.helper = $("<div>");
      this._addClass(this.helper, "ui-selectable-helper");
    },
    _destroy: function() {
      this.selectees.removeData("selectable-item");
      this._mouseDestroy();
    },
    _mouseStart: function(event) {
      var that = this,
          options = this.options;
      this.opos = [event.pageX, event.pageY];
      this.elementPos = $(this.element[0]).offset();
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
          that._removeClass(selectee.$element, "ui-selected");
          selectee.selected = false;
          that._addClass(selectee.$element, "ui-unselecting");
          selectee.unselecting = true;
          that._trigger("unselecting", event, {unselecting: selectee.element});
        }
      });
      $(event.target).parents().addBack().each(function() {
        var doSelect,
            selectee = $.data(this, "selectable-item");
        if (selectee) {
          doSelect = (!event.metaKey && !event.ctrlKey) || !selectee.$element.hasClass("ui-selected");
          that._removeClass(selectee.$element, doSelect ? "ui-unselecting" : "ui-selected")._addClass(selectee.$element, doSelect ? "ui-selecting" : "ui-unselecting");
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
            hit = false,
            offset = {};
        if (!selectee || selectee.element === that.element[0]) {
          return;
        }
        offset.left = selectee.left + that.elementPos.left;
        offset.right = selectee.right + that.elementPos.left;
        offset.top = selectee.top + that.elementPos.top;
        offset.bottom = selectee.bottom + that.elementPos.top;
        if (options.tolerance === "touch") {
          hit = (!(offset.left > x2 || offset.right < x1 || offset.top > y2 || offset.bottom < y1));
        } else if (options.tolerance === "fit") {
          hit = (offset.left > x1 && offset.right < x2 && offset.top > y1 && offset.bottom < y2);
        }
        if (hit) {
          if (selectee.selected) {
            that._removeClass(selectee.$element, "ui-selected");
            selectee.selected = false;
          }
          if (selectee.unselecting) {
            that._removeClass(selectee.$element, "ui-unselecting");
            selectee.unselecting = false;
          }
          if (!selectee.selecting) {
            that._addClass(selectee.$element, "ui-selecting");
            selectee.selecting = true;
            that._trigger("selecting", event, {selecting: selectee.element});
          }
        } else {
          if (selectee.selecting) {
            if ((event.metaKey || event.ctrlKey) && selectee.startselected) {
              that._removeClass(selectee.$element, "ui-selecting");
              selectee.selecting = false;
              that._addClass(selectee.$element, "ui-selected");
              selectee.selected = true;
            } else {
              that._removeClass(selectee.$element, "ui-selecting");
              selectee.selecting = false;
              if (selectee.startselected) {
                that._addClass(selectee.$element, "ui-unselecting");
                selectee.unselecting = true;
              }
              that._trigger("unselecting", event, {unselecting: selectee.element});
            }
          }
          if (selectee.selected) {
            if (!event.metaKey && !event.ctrlKey && !selectee.startselected) {
              that._removeClass(selectee.$element, "ui-selected");
              selectee.selected = false;
              that._addClass(selectee.$element, "ui-unselecting");
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
        that._removeClass(selectee.$element, "ui-unselecting");
        selectee.unselecting = false;
        selectee.startselected = false;
        that._trigger("unselected", event, {unselected: selectee.element});
      });
      $(".ui-selecting", this.element[0]).each(function() {
        var selectee = $.data(this, "selectable-item");
        that._removeClass(selectee.$element, "ui-selecting")._addClass(selectee.$element, "ui-selected");
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

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/data.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/version.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.extend($.expr[":"], {data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
      return function(elem) {
        return !!$.data(elem, dataName);
      };
    }) : function(elem, i, match) {
      return !!$.data(elem, match[3]);
    }});
}));

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/scroll-parent.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/version.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.fn.scrollParent = function(includeHidden) {
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
  };
}));

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/widgets/sortable.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/widgets/mouse.js", "github:components/jqueryui@1.12.0/ui/data.js", "github:components/jqueryui@1.12.0/ui/ie.js", "github:components/jqueryui@1.12.0/ui/scroll-parent.js", "github:components/jqueryui@1.12.0/ui/version.js", "github:components/jqueryui@1.12.0/ui/widget.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.widget("ui.sortable", $.ui.mouse, {
    version: "1.12.0",
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
      this._addClass("ui-sortable");
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
      var that = this;
      this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle");
      $.each(this.items, function() {
        that._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle");
      });
    },
    _destroy: function() {
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
      this._addClass(this.helper, "ui-sortable-helper");
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
          this.currentItem.css(this._storedCSS);
          this._removeClass(this.currentItem, "ui-sortable-helper");
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
      var verticalDirection,
          horizontalDirection,
          isOverElementHeight = (this.options.axis === "x") || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
          isOverElementWidth = (this.options.axis === "y") || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
          isOverElement = isOverElementHeight && isOverElementWidth;
      if (!isOverElement) {
        return false;
      }
      verticalDirection = this._getDragVerticalDirection();
      horizontalDirection = this._getDragHorizontalDirection();
      return this.floating ? ((horizontalDirection === "right" || verticalDirection === "down") ? 2 : 1) : (verticalDirection && (verticalDirection === "down" ? 2 : 1));
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
                element = $("<" + nodeName + ">", that.document[0]);
            that._addClass(element, "ui-sortable-placeholder", className || that.currentItem[0].className)._removeClass(element, "ui-sortable-helper");
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
        axis = floating ? "pageX" : "pageY";
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
        this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, o.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, (o.containment === "document" ? (this.document.height() || document.body.parentNode.scrollHeight) : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
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
        this.currentItem.css(this._storedCSS);
        this._removeClass(this.currentItem, "ui-sortable-helper");
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

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/widgets/progressbar.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/version.js", "github:components/jqueryui@1.12.0/ui/widget.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.widget("ui.progressbar", {
    version: "1.12.0",
    options: {
      classes: {
        "ui-progressbar": "ui-corner-all",
        "ui-progressbar-value": "ui-corner-left",
        "ui-progressbar-complete": "ui-corner-right"
      },
      max: 100,
      value: 0,
      change: null,
      complete: null
    },
    min: 0,
    _create: function() {
      this.oldValue = this.options.value = this._constrainedValue();
      this.element.attr({
        role: "progressbar",
        "aria-valuemin": this.min
      });
      this._addClass("ui-progressbar", "ui-widget ui-widget-content");
      this.valueDiv = $("<div>").appendTo(this.element);
      this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header");
      this._refreshValue();
    },
    _destroy: function() {
      this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow");
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
      this._super(key, value);
    },
    _setOptionDisabled: function(value) {
      this._super(value);
      this.element.attr("aria-disabled", value);
      this._toggleClass(null, "ui-state-disabled", !!value);
    },
    _percentage: function() {
      return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
    },
    _refreshValue: function() {
      var value = this.options.value,
          percentage = this._percentage();
      this.valueDiv.toggle(this.indeterminate || value > this.min).width(percentage.toFixed(0) + "%");
      this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, value === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate);
      if (this.indeterminate) {
        this.element.removeAttr("aria-valuenow");
        if (!this.overlayDiv) {
          this.overlayDiv = $("<div>").appendTo(this.valueDiv);
          this._addClass(this.overlayDiv, "ui-progressbar-overlay");
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

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("jquery_shim/plugins/jquery.evol.colorpicker.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/widget.js", "github:components/jqueryui@1.12.0/ui/widgets/mouse.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
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
  $.widget("evol.colorpicker", {
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
            var thisvalue = $(this).val();
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
        $('.colorPicker').not('.' + this._id).colorpicker('hidePalette');
        if (this._palette === null) {
          this._palette = this.element.next().after(this._paletteHTML()).next().on('click', function(evt) {
            evt.stopPropagation();
          });
          this._bindColors();
          var that = this;
          $(document.body).on('click.' + this._id, function(evt) {
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
        $(document.body).off('click.' + this._id);
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
            var c = toHex3($(this).data('color'));
            that._setValue(String(c));
          } else if (that.options.type === 'gradient') {
            var gradientid = $(this).data('gradient');
            that.options.gradientid = gradientid;
            that._setValue(String(gradientid));
            $('.gradientpicker', that.element.parent()).attr('style', that.getGradient(gradientid));
          }
        }
      }).on('mouseover', sel, function(evt) {
        if (that._enabled) {
          var c = toHex3($(this).data('color'));
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
      $(document.body).off('click.' + this._id);
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
      $.Widget.prototype.destroy.call(this);
    }
  });
  return $.evol.colorpicker;
}));

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/ie.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/version.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  return $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
}));

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/version.js", ["libs/jquery.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  $.ui = $.ui || {};
  return $.ui.version = "1.12.0";
}));

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/widget.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/version.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  var widgetUuid = 0;
  var widgetSlice = Array.prototype.slice;
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
    var existingConstructor,
        constructor,
        basePrototype;
    var proxiedPrototype = {};
    var namespace = name.split(".")[0];
    name = name.split(".")[1];
    var fullName = namespace + "-" + name;
    if (!prototype) {
      prototype = base;
      base = $.Widget;
    }
    if ($.isArray(prototype)) {
      prototype = $.extend.apply(null, [{}].concat(prototype));
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
        function _super() {
          return base.prototype[prop].apply(this, arguments);
        }
        function _superApply(args) {
          return base.prototype[prop].apply(this, args);
        }
        return function() {
          var __super = this._super;
          var __superApply = this._superApply;
          var returnValue;
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
    var input = widgetSlice.call(arguments, 1);
    var inputIndex = 0;
    var inputLength = input.length;
    var key;
    var value;
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
      var isMethodCall = typeof options === "string";
      var args = widgetSlice.call(arguments, 1);
      var returnValue = this;
      if (isMethodCall) {
        this.each(function() {
          var methodValue;
          var instance = $.data(this, fullName);
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
      classes: {},
      disabled: false,
      create: null
    },
    _createWidget: function(options, element) {
      element = $(element || this.defaultElement || this)[0];
      this.element = $(element);
      this.uuid = widgetUuid++;
      this.eventNamespace = "." + this.widgetName + this.uuid;
      this.bindings = $();
      this.hoverable = $();
      this.focusable = $();
      this.classesElementLookup = {};
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
      if (this.options.disabled) {
        this._setOptionDisabled(this.options.disabled);
      }
      this._trigger("create", null, this._getCreateEventData());
      this._init();
    },
    _getCreateOptions: function() {
      return {};
    },
    _getCreateEventData: $.noop,
    _create: $.noop,
    _init: $.noop,
    destroy: function() {
      var that = this;
      this._destroy();
      $.each(this.classesElementLookup, function(key, value) {
        that._removeClass(value, key);
      });
      this.element.off(this.eventNamespace).removeData(this.widgetFullName);
      this.widget().off(this.eventNamespace).removeAttr("aria-disabled");
      this.bindings.off(this.eventNamespace);
    },
    _destroy: $.noop,
    widget: function() {
      return this.element;
    },
    option: function(key, value) {
      var options = key;
      var parts;
      var curOption;
      var i;
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
      if (key === "classes") {
        this._setOptionClasses(value);
      }
      this.options[key] = value;
      if (key === "disabled") {
        this._setOptionDisabled(value);
      }
      return this;
    },
    _setOptionClasses: function(value) {
      var classKey,
          elements,
          currentElements;
      for (classKey in value) {
        currentElements = this.classesElementLookup[classKey];
        if (value[classKey] === this.options.classes[classKey] || !currentElements || !currentElements.length) {
          continue;
        }
        elements = $(currentElements.get());
        this._removeClass(currentElements, classKey);
        elements.addClass(this._classes({
          element: elements,
          keys: classKey,
          classes: value,
          add: true
        }));
      }
    },
    _setOptionDisabled: function(value) {
      this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!value);
      if (value) {
        this._removeClass(this.hoverable, null, "ui-state-hover");
        this._removeClass(this.focusable, null, "ui-state-focus");
      }
    },
    enable: function() {
      return this._setOptions({disabled: false});
    },
    disable: function() {
      return this._setOptions({disabled: true});
    },
    _classes: function(options) {
      var full = [];
      var that = this;
      options = $.extend({
        element: this.element,
        classes: this.options.classes || {}
      }, options);
      function processClassString(classes, checkOption) {
        var current,
            i;
        for (i = 0; i < classes.length; i++) {
          current = that.classesElementLookup[classes[i]] || $();
          if (options.add) {
            current = $($.unique(current.get().concat(options.element.get())));
          } else {
            current = $(current.not(options.element).get());
          }
          that.classesElementLookup[classes[i]] = current;
          full.push(classes[i]);
          if (checkOption && options.classes[classes[i]]) {
            full.push(options.classes[classes[i]]);
          }
        }
      }
      if (options.keys) {
        processClassString(options.keys.match(/\S+/g) || [], true);
      }
      if (options.extra) {
        processClassString(options.extra.match(/\S+/g) || []);
      }
      return full.join(" ");
    },
    _removeClass: function(element, keys, extra) {
      return this._toggleClass(element, keys, extra, false);
    },
    _addClass: function(element, keys, extra) {
      return this._toggleClass(element, keys, extra, true);
    },
    _toggleClass: function(element, keys, extra, add) {
      add = (typeof add === "boolean") ? add : extra;
      var shift = (typeof element === "string" || element === null),
          options = {
            extra: shift ? keys : extra,
            keys: shift ? element : keys,
            element: shift ? this.element : element,
            add: add
          };
      options.element.toggleClass(this._classes(options), add);
      return this;
    },
    _on: function(suppressDisabledCheck, element, handlers) {
      var delegateElement;
      var instance = this;
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
        var match = event.match(/^([\w:-]*)\s*(.*)$/);
        var eventName = match[1] + instance.eventNamespace;
        var selector = match[2];
        if (selector) {
          delegateElement.on(eventName, selector, handlerProxy);
        } else {
          element.on(eventName, handlerProxy);
        }
      });
    },
    _off: function(element, eventName) {
      eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
      element.off(eventName).off(eventName);
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
          this._addClass($(event.currentTarget), null, "ui-state-hover");
        },
        mouseleave: function(event) {
          this._removeClass($(event.currentTarget), null, "ui-state-hover");
        }
      });
    },
    _focusable: function(element) {
      this.focusable = this.focusable.add(element);
      this._on(element, {
        focusin: function(event) {
          this._addClass($(event.currentTarget), null, "ui-state-focus");
        },
        focusout: function(event) {
          this._removeClass($(event.currentTarget), null, "ui-state-focus");
        }
      });
    },
    _trigger: function(type, event, data) {
      var prop,
          orig;
      var callback = this.options[type];
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
      var hasOptions;
      var effectName = !options ? method : options === true || typeof options === "number" ? defaultEffect : options.effect || defaultEffect;
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

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("github:components/jqueryui@1.12.0/ui/widgets/mouse.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/ie.js", "github:components/jqueryui@1.12.0/ui/version.js", "github:components/jqueryui@1.12.0/ui/widget.js"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  var mouseHandled = false;
  $(document).on("mouseup", function() {
    mouseHandled = false;
  });
  return $.widget("ui.mouse", {
    version: "1.12.0",
    options: {
      cancel: "input, textarea, button, select, option",
      distance: 1,
      delay: 0
    },
    _mouseInit: function() {
      var that = this;
      this.element.on("mousedown." + this.widgetName, function(event) {
        return that._mouseDown(event);
      }).on("click." + this.widgetName, function(event) {
        if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
          $.removeData(event.target, that.widgetName + ".preventClickEvent");
          event.stopImmediatePropagation();
          return false;
        }
      });
      this.started = false;
    },
    _mouseDestroy: function() {
      this.element.off("." + this.widgetName);
      if (this._mouseMoveDelegate) {
        this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
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
      this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate);
      event.preventDefault();
      mouseHandled = true;
      return true;
    },
    _mouseMove: function(event) {
      if (this._mouseMoved) {
        if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
          return this._mouseUp(event);
        } else if (!event.which) {
          if (event.originalEvent.altKey || event.originalEvent.ctrlKey || event.originalEvent.metaKey || event.originalEvent.shiftKey) {
            this.ignoreMissingWhich = true;
          } else if (!this.ignoreMissingWhich) {
            return this._mouseUp(event);
          }
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
      this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
      if (this._mouseStarted) {
        this._mouseStarted = false;
        if (event.target === this._mouseDownEvent.target) {
          $.data(event.target, this.widgetName + ".preventClickEvent", true);
        }
        this._mouseStop(event);
      }
      if (this._mouseDelayTimer) {
        clearTimeout(this._mouseDelayTimer);
        delete this._mouseDelayTimer;
      }
      this.ignoreMissingWhich = false;
      mouseHandled = false;
      event.preventDefault();
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

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("jquery_shim/plugins/jquery.ui.rotatable.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/widget.js", "github:components/jqueryui@1.12.0/ui/widgets/mouse.js"], factory);
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
      handle.appendTo(this.element);
      handle.on('mousedown', this.listeners.startRotate);
      if (this.options.angle !== false) {
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
      return [elementCentreX, elementCentreY];
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
      $(document).on('mousemove', this.listeners.rotateElement);
      $(document).on('mouseup', this.listeners.stopRotate);
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
      if (previousRotateAngle !== rotateAngle) {
        this._trigger("rotate", event, this.ui());
        this.hasRotated = true;
      }
      return false;
    },
    stopRotate: function(event) {
      if (!this.element) {
        return;
      }
      $(document).off('mousemove', this.listeners.rotateElement);
      $(document).off('mouseup', this.listeners.stopRotate);
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
      if (n !== "rotate") {
        this._trigger(n, event, this.ui());
      }
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

})();
(function() {
var define = $__System.amdDefine;
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define("jquery_shim/plugins/jquery.ajax.progress.js", ["libs/jquery.js"], factory);
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

})();
(function() {
var define = $__System.amdDefine;
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define("jquery_shim/plugins/jquery.hotkeys.js", ["libs/jquery.js"], factory);
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

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define("github:carhartl/jquery-cookie@1.4.1/jquery.cookie.js", ["libs/jquery.js"], factory);
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

})();
(function() {
var define = $__System.amdDefine;
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define("github:huasofoundries/jquery.waitforChild@1.1.0/jquery.waitforChild.js", ["libs/jquery.js"], factory);
  } else if (typeof module !== 'undefined' && typeof exports === "object") {
    module.exports = factory(require('jquery'));
  } else {
    root.jQuery = factory(root.jQuery);
  }
}(this, function($) {
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
}));

})();
$__System.registerDynamic("libs/jquery.slim.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(global, factory) {
    "use strict";
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
  })(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    "use strict";
    var arr = [];
    var document = window.document;
    var getProto = Object.getPrototypeOf;
    var slice = arr.slice;
    var concat = arr.concat;
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);
    var support = {};
    function DOMEval(code, doc) {
      doc = doc || document;
      var script = doc.createElement("script");
      script.text = code;
      doc.head.appendChild(script).parentNode.removeChild(script);
    }
    var version = "3.1.0",
        jQuery = function(selector, context) {
          return new jQuery.fn.init(selector, context);
        },
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([a-z])/g,
        fcamelCase = function(all, letter) {
          return letter.toUpperCase();
        };
    jQuery.fn = jQuery.prototype = {
      jquery: version,
      constructor: jQuery,
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
        var type = jQuery.type(obj);
        return (type === "number" || type === "string") && !isNaN(obj - parseFloat(obj));
      },
      isPlainObject: function(obj) {
        var proto,
            Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") {
          return false;
        }
        proto = getProto(obj);
        if (!proto) {
          return true;
        }
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
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
        DOMEval(code);
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
          identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
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
          runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
          funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 0x10000;
            return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
          },
          rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
          fcssescape = function(ch, asCodePoint) {
            if (asCodePoint) {
              if (ch === "\0") {
                return "\uFFFD";
              }
              return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
            }
            return "\\" + ch;
          },
          unloadHandler = function() {
            setDocument();
          },
          disabledAncestor = addCombinator(function(elem) {
            return elem.disabled === true;
          }, {
            dir: "parentNode",
            next: "legend"
          });
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
                  nid = nid.replace(rcssescape, fcssescape);
                } else {
                  context.setAttribute("id", (nid = expando));
                }
                groups = tokenize(selector);
                i = groups.length;
                while (i--) {
                  groups[i] = "#" + nid + " " + toSelector(groups[i]);
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
        var el = document.createElement("fieldset");
        try {
          return !!fn(el);
        } catch (e) {
          return false;
        } finally {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
          el = null;
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
            diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
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
      function createDisabledPseudo(disabled) {
        return function(elem) {
          return "label" in elem && elem.disabled === disabled || "form" in elem && elem.disabled === disabled || "form" in elem && elem.disabled === false && (elem.isDisabled === disabled || elem.isDisabled !== !disabled && ("label" in elem || !disabledAncestor(elem)) !== disabled);
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
            subWindow,
            doc = node ? node.ownerDocument || node : preferredDoc;
        if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
          return document;
        }
        document = doc;
        docElem = document.documentElement;
        documentIsHTML = !isXML(document);
        if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
          if (subWindow.addEventListener) {
            subWindow.addEventListener("unload", unloadHandler, false);
          } else if (subWindow.attachEvent) {
            subWindow.attachEvent("onunload", unloadHandler);
          }
        }
        support.attributes = assert(function(el) {
          el.className = "i";
          return !el.getAttribute("className");
        });
        support.getElementsByTagName = assert(function(el) {
          el.appendChild(document.createComment(""));
          return !el.getElementsByTagName("*").length;
        });
        support.getElementsByClassName = rnative.test(document.getElementsByClassName);
        support.getById = assert(function(el) {
          docElem.appendChild(el).id = expando;
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
          assert(function(el) {
            docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
            if (el.querySelectorAll("[msallowcapture^='']").length) {
              rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
            }
            if (!el.querySelectorAll("[selected]").length) {
              rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
            }
            if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
              rbuggyQSA.push("~=");
            }
            if (!el.querySelectorAll(":checked").length) {
              rbuggyQSA.push(":checked");
            }
            if (!el.querySelectorAll("a#" + expando + "+*").length) {
              rbuggyQSA.push(".#.+[+~]");
            }
          });
          assert(function(el) {
            el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";
            var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            el.appendChild(input).setAttribute("name", "D");
            if (el.querySelectorAll("[name=d]").length) {
              rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
            }
            if (el.querySelectorAll(":enabled").length !== 2) {
              rbuggyQSA.push(":enabled", ":disabled");
            }
            docElem.appendChild(el).disabled = true;
            if (el.querySelectorAll(":disabled").length !== 2) {
              rbuggyQSA.push(":enabled", ":disabled");
            }
            el.querySelectorAll("*,:x");
            rbuggyQSA.push(",.*:");
          });
        }
        if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
          assert(function(el) {
            support.disconnectedMatch = matches.call(el, "*");
            matches.call(el, "[s!='']:x");
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
      Sizzle.escape = function(sel) {
        return (sel + "").replace(rcssescape, fcssescape);
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
          "enabled": createDisabledPseudo(false),
          "disabled": createDisabledPseudo(true),
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
            skip = combinator.next,
            key = skip || dir,
            checkNonElements = base && key === "parentNode",
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
                if (skip && skip === elem.nodeName.toLowerCase()) {
                  elem = elem[dir] || elem;
                } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                  return (newCache[2] = oldCache[2]);
                } else {
                  uniqueCache[key] = newCache;
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
      support.sortDetached = assert(function(el) {
        return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
      });
      if (!assert(function(el) {
        el.innerHTML = "<a href='#'></a>";
        return el.firstChild.getAttribute("href") === "#";
      })) {
        addHandle("type|href|height|width", function(elem, name, isXML) {
          if (!isXML) {
            return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
          }
        });
      }
      if (!support.attributes || !assert(function(el) {
        el.innerHTML = "<input/>";
        el.firstChild.setAttribute("value", "");
        return el.firstChild.getAttribute("value") === "";
      })) {
        addHandle("value", function(elem, name, isXML) {
          if (!isXML && elem.nodeName.toLowerCase() === "input") {
            return elem.defaultValue;
          }
        });
      }
      if (!assert(function(el) {
        return el.getAttribute("disabled") == null;
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
    jQuery.escapeSelector = Sizzle.escape;
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
    var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);
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
        return (indexOf.call(qualifier, elem) > -1) !== not && elem.nodeType === 1;
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
            ret,
            len = this.length,
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
        ret = this.pushStack([]);
        for (i = 0; i < len; i++) {
          jQuery.find(selector, self[i], ret);
        }
        return len > 1 ? jQuery.uniqueSort(ret) : ret;
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
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
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
                if (elem) {
                  this[0] = elem;
                  this.length = 1;
                }
                return this;
              }
            } else if (!context || context.jquery) {
              return (context || root).find(selector);
            } else {
              return this.constructor(context).find(selector);
            }
          } else if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
            return this;
          } else if (jQuery.isFunction(selector)) {
            return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
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
            targets = typeof selectors !== "string" && jQuery(selectors);
        if (!rneedsContext.test(selectors)) {
          for (; i < l; i++) {
            for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
              if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
              }
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
              if (!memory && !firing) {
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
    function Identity(v) {
      return v;
    }
    function Thrower(ex) {
      throw ex;
    }
    function adoptValue(value, resolve, reject) {
      var method;
      try {
        if (value && jQuery.isFunction((method = value.promise))) {
          method.call(value).done(resolve).fail(reject);
        } else if (value && jQuery.isFunction((method = value.then))) {
          method.call(value, resolve, reject);
        } else {
          resolve.call(undefined, value);
        }
      } catch (value) {
        reject.call(undefined, value);
      }
    }
    jQuery.extend({
      Deferred: function(func) {
        var tuples = [["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
            state = "pending",
            promise = {
              state: function() {
                return state;
              },
              always: function() {
                deferred.done(arguments).fail(arguments);
                return this;
              },
              "catch": function(fn) {
                return promise.then(null, fn);
              },
              pipe: function() {
                var fns = arguments;
                return jQuery.Deferred(function(newDefer) {
                  jQuery.each(tuples, function(i, tuple) {
                    var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];
                    deferred[tuple[1]](function() {
                      var returned = fn && fn.apply(this, arguments);
                      if (returned && jQuery.isFunction(returned.promise)) {
                        returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                      } else {
                        newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                      }
                    });
                  });
                  fns = null;
                }).promise();
              },
              then: function(onFulfilled, onRejected, onProgress) {
                var maxDepth = 0;
                function resolve(depth, deferred, handler, special) {
                  return function() {
                    var that = this,
                        args = arguments,
                        mightThrow = function() {
                          var returned,
                              then;
                          if (depth < maxDepth) {
                            return;
                          }
                          returned = handler.apply(that, args);
                          if (returned === deferred.promise()) {
                            throw new TypeError("Thenable self-resolution");
                          }
                          then = returned && (typeof returned === "object" || typeof returned === "function") && returned.then;
                          if (jQuery.isFunction(then)) {
                            if (special) {
                              then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));
                            } else {
                              maxDepth++;
                              then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                            }
                          } else {
                            if (handler !== Identity) {
                              that = undefined;
                              args = [returned];
                            }
                            (special || deferred.resolveWith)(that, args);
                          }
                        },
                        process = special ? mightThrow : function() {
                          try {
                            mightThrow();
                          } catch (e) {
                            if (jQuery.Deferred.exceptionHook) {
                              jQuery.Deferred.exceptionHook(e, process.stackTrace);
                            }
                            if (depth + 1 >= maxDepth) {
                              if (handler !== Thrower) {
                                that = undefined;
                                args = [e];
                              }
                              deferred.rejectWith(that, args);
                            }
                          }
                        };
                    if (depth) {
                      process();
                    } else {
                      if (jQuery.Deferred.getStackHook) {
                        process.stackTrace = jQuery.Deferred.getStackHook();
                      }
                      window.setTimeout(process);
                    }
                  };
                }
                return jQuery.Deferred(function(newDefer) {
                  tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));
                  tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));
                  tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
                }).promise();
              },
              promise: function(obj) {
                return obj != null ? jQuery.extend(obj, promise) : promise;
              }
            },
            deferred = {};
        jQuery.each(tuples, function(i, tuple) {
          var list = tuple[2],
              stateString = tuple[5];
          promise[tuple[1]] = list.add;
          if (stateString) {
            list.add(function() {
              state = stateString;
            }, tuples[3 - i][2].disable, tuples[0][2].lock);
          }
          list.add(tuple[3].fire);
          deferred[tuple[0]] = function() {
            deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
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
      when: function(singleValue) {
        var remaining = arguments.length,
            i = remaining,
            resolveContexts = Array(i),
            resolveValues = slice.call(arguments),
            master = jQuery.Deferred(),
            updateFunc = function(i) {
              return function(value) {
                resolveContexts[i] = this;
                resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
                if (!(--remaining)) {
                  master.resolveWith(resolveContexts, resolveValues);
                }
              };
            };
        if (remaining <= 1) {
          adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject);
          if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {
            return master.then();
          }
        }
        while (i--) {
          adoptValue(resolveValues[i], updateFunc(i), master.reject);
        }
        return master.promise();
      }
    });
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    jQuery.Deferred.exceptionHook = function(error, stack) {
      if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
        window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
      }
    };
    jQuery.readyException = function(error) {
      window.setTimeout(function() {
        throw error;
      });
    };
    var readyList = jQuery.Deferred();
    jQuery.fn.ready = function(fn) {
      readyList.then(fn).catch(function(error) {
        jQuery.readyException(error);
      });
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
      }
    });
    jQuery.ready.then = readyList.then;
    function completed() {
      document.removeEventListener("DOMContentLoaded", completed);
      window.removeEventListener("load", completed);
      jQuery.ready();
    }
    if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
      window.setTimeout(jQuery.ready);
    } else {
      document.addEventListener("DOMContentLoaded", completed);
      window.addEventListener("load", completed);
    }
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
      cache: function(owner) {
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
          cache[jQuery.camelCase(data)] = value;
        } else {
          for (prop in data) {
            cache[jQuery.camelCase(prop)] = data[prop];
          }
        }
        return cache;
      },
      get: function(owner, key) {
        return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
      },
      access: function(owner, key, value) {
        if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
          return this.get(owner, key);
        }
        this.set(owner, key, value);
        return value !== undefined ? value : key;
      },
      remove: function(owner, key) {
        var i,
            cache = owner[this.expando];
        if (cache === undefined) {
          return;
        }
        if (key !== undefined) {
          if (jQuery.isArray(key)) {
            key = key.map(jQuery.camelCase);
          } else {
            key = jQuery.camelCase(key);
            key = key in cache ? [key] : (key.match(rnotwhite) || []);
          }
          i = key.length;
          while (i--) {
            delete cache[key[i]];
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
            data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? JSON.parse(data) : data;
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
          var data;
          if (elem && value === undefined) {
            data = dataUser.get(elem, key);
            if (data !== undefined) {
              return data;
            }
            data = dataAttr(elem, key);
            if (data !== undefined) {
              return data;
            }
            return;
          }
          this.each(function() {
            dataUser.set(this, key, value);
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
    var isHiddenWithinTree = function(elem, el) {
      elem = el || elem;
      return elem.style.display === "none" || elem.style.display === "" && jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
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
    var defaultDisplayMap = {};
    function getDefaultDisplay(elem) {
      var temp,
          doc = elem.ownerDocument,
          nodeName = elem.nodeName,
          display = defaultDisplayMap[nodeName];
      if (display) {
        return display;
      }
      temp = doc.body.appendChild(doc.createElement(nodeName)), display = jQuery.css(temp, "display");
      temp.parentNode.removeChild(temp);
      if (display === "none") {
        display = "block";
      }
      defaultDisplayMap[nodeName] = display;
      return display;
    }
    function showHide(elements, show) {
      var display,
          elem,
          values = [],
          index = 0,
          length = elements.length;
      for (; index < length; index++) {
        elem = elements[index];
        if (!elem.style) {
          continue;
        }
        display = elem.style.display;
        if (show) {
          if (display === "none") {
            values[index] = dataPriv.get(elem, "display") || null;
            if (!values[index]) {
              elem.style.display = "";
            }
          }
          if (elem.style.display === "" && isHiddenWithinTree(elem)) {
            values[index] = getDefaultDisplay(elem);
          }
        } else {
          if (display !== "none") {
            values[index] = "none";
            dataPriv.set(elem, "display", display);
          }
        }
      }
      for (index = 0; index < length; index++) {
        if (values[index] != null) {
          elements[index].style.display = values[index];
        }
      }
      return elements;
    }
    jQuery.fn.extend({
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
          if (isHiddenWithinTree(this)) {
            jQuery(this).show();
          } else {
            jQuery(this).hide();
          }
        });
      }
    });
    var rcheckableType = (/^(?:checkbox|radio)$/i);
    var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]+)/i);
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
    var documentElement = document.documentElement;
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
        return elem;
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
        if (selector) {
          jQuery.find.matchesSelector(documentElement, selector);
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
      dispatch: function(nativeEvent) {
        var event = jQuery.event.fix(nativeEvent);
        var i,
            j,
            ret,
            matched,
            handleObj,
            handlerQueue,
            args = new Array(arguments.length),
            handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
            special = jQuery.event.special[event.type] || {};
        args[0] = event;
        for (i = 1; i < arguments.length; i++) {
          args[i] = arguments[i];
        }
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
      addProp: function(name, hook) {
        Object.defineProperty(jQuery.Event.prototype, name, {
          enumerable: true,
          configurable: true,
          get: jQuery.isFunction(hook) ? function() {
            if (this.originalEvent) {
              return hook(this.originalEvent);
            }
          } : function() {
            if (this.originalEvent) {
              return this.originalEvent[name];
            }
          },
          set: function(value) {
            Object.defineProperty(this, name, {
              enumerable: true,
              configurable: true,
              writable: true,
              value: value
            });
          }
        });
      },
      fix: function(originalEvent) {
        return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
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
        this.target = (src.target && src.target.nodeType === 3) ? src.target.parentNode : src.target;
        this.currentTarget = src.currentTarget;
        this.relatedTarget = src.relatedTarget;
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
      isSimulated: false,
      preventDefault: function() {
        var e = this.originalEvent;
        this.isDefaultPrevented = returnTrue;
        if (e && !this.isSimulated) {
          e.preventDefault();
        }
      },
      stopPropagation: function() {
        var e = this.originalEvent;
        this.isPropagationStopped = returnTrue;
        if (e && !this.isSimulated) {
          e.stopPropagation();
        }
      },
      stopImmediatePropagation: function() {
        var e = this.originalEvent;
        this.isImmediatePropagationStopped = returnTrue;
        if (e && !this.isSimulated) {
          e.stopImmediatePropagation();
        }
        this.stopPropagation();
      }
    };
    jQuery.each({
      altKey: true,
      bubbles: true,
      cancelable: true,
      changedTouches: true,
      ctrlKey: true,
      detail: true,
      eventPhase: true,
      metaKey: true,
      pageX: true,
      pageY: true,
      shiftKey: true,
      view: true,
      "char": true,
      charCode: true,
      key: true,
      keyCode: true,
      button: true,
      buttons: true,
      clientX: true,
      clientY: true,
      offsetX: true,
      offsetY: true,
      pointerId: true,
      pointerType: true,
      screenX: true,
      screenY: true,
      targetTouches: true,
      toElement: true,
      touches: true,
      which: function(event) {
        var button = event.button;
        if (event.which == null && rkeyEvent.test(event.type)) {
          return event.charCode != null ? event.charCode : event.keyCode;
        }
        if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
          return (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
        }
        return event.which;
      }
    }, jQuery.event.addProp);
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
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
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
                  DOMEval(node.textContent.replace(rcleanScript, ""), doc);
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
    var rmargin = (/^margin/);
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var getStyles = function(elem) {
      var view = elem.ownerDocument.defaultView;
      if (!view || !view.opener) {
        view = window;
      }
      return view.getComputedStyle(elem);
    };
    (function() {
      function computeStyleTests() {
        if (!div) {
          return;
        }
        div.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
        div.innerHTML = "";
        documentElement.appendChild(container);
        var divStyle = window.getComputedStyle(div);
        pixelPositionVal = divStyle.top !== "1%";
        reliableMarginLeftVal = divStyle.marginLeft === "2px";
        boxSizingReliableVal = divStyle.width === "4px";
        div.style.marginRight = "50%";
        pixelMarginRightVal = divStyle.marginRight === "4px";
        documentElement.removeChild(container);
        div = null;
      }
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
      jQuery.extend(support, {
        pixelPosition: function() {
          computeStyleTests();
          return pixelPositionVal;
        },
        boxSizingReliable: function() {
          computeStyleTests();
          return boxSizingReliableVal;
        },
        pixelMarginRight: function() {
          computeStyleTests();
          return pixelMarginRightVal;
        },
        reliableMarginLeft: function() {
          computeStyleTests();
          return reliableMarginLeftVal;
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
        cssPrefixes = ["Webkit", "Moz", "ms"],
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
      var val,
          valueIsBorderBox = true,
          styles = getStyles(elem),
          isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
      if (elem.getClientRects().length) {
        val = elem.getBoundingClientRect()[name];
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
            return rdisplayswap.test(jQuery.css(elem, "display")) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
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
    jQuery.fn.extend({css: function(name, value) {
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
      }});
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
          hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
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
            i = 0,
            attrNames = value && value.match(rnotwhite);
        if (attrNames && elem.nodeType === 1) {
          while ((name = attrNames[i++])) {
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
            handle,
            lowercaseName = name.toLowerCase();
        if (!isXML) {
          handle = attrHandle[lowercaseName];
          attrHandle[lowercaseName] = ret;
          ret = getter(elem, name, isXML) != null ? lowercaseName : null;
          attrHandle[lowercaseName] = handle;
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
      jQuery.propHooks.selected = {
        get: function(elem) {
          var parent = elem.parentNode;
          if (parent && parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
          return null;
        },
        set: function(elem) {
          var parent = elem.parentNode;
          if (parent) {
            parent.selectedIndex;
            if (parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
          }
        }
      };
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
    var rreturn = /\r/g,
        rspaces = /[\x20\t\r\n\f]+/g;
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
            var val = jQuery.find.attr(elem, "value");
            return val != null ? val : jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
          }},
        select: {
          get: function(elem) {
            var value,
                option,
                options = elem.options,
                index = elem.selectedIndex,
                one = elem.type === "select-one",
                values = one ? null : [],
                max = one ? index + 1 : options.length,
                i = index < 0 ? max : one ? index : 0;
            for (; i < max; i++) {
              option = options[i];
              if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
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
    jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function(i, name) {
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
    var rbracket = /\[\]$/,
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
          add = function(key, valueOrFunction) {
            var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
          };
      if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
        jQuery.each(a, function() {
          add(this.name, this.value);
        });
      } else {
        for (prefix in a) {
          buildParams(prefix, a[prefix], traditional, add);
        }
      }
      return s.join("&");
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
    var r20 = /%20/g,
        rhash = /#.*$/,
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
          "text json": JSON.parse,
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
            completed,
            fireGlobals,
            i,
            uncached,
            s = jQuery.ajaxSetup({}, options),
            callbackContext = s.context || s,
            globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
            deferred = jQuery.Deferred(),
            completeDeferred = jQuery.Callbacks("once memory"),
            statusCode = s.statusCode || {},
            requestHeaders = {},
            requestHeadersNames = {},
            strAbort = "canceled",
            jqXHR = {
              readyState: 0,
              getResponseHeader: function(key) {
                var match;
                if (completed) {
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
                return completed ? responseHeadersString : null;
              },
              setRequestHeader: function(name, value) {
                if (completed == null) {
                  name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                  requestHeaders[name] = value;
                }
                return this;
              },
              overrideMimeType: function(type) {
                if (completed == null) {
                  s.mimeType = type;
                }
                return this;
              },
              statusCode: function(map) {
                var code;
                if (map) {
                  if (completed) {
                    jqXHR.always(map[jqXHR.status]);
                  } else {
                    for (code in map) {
                      statusCode[code] = [statusCode[code], map[code]];
                    }
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
        deferred.promise(jqXHR);
        s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");
        s.type = options.method || options.type || s.method || s.type;
        s.dataTypes = (s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
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
        if (completed) {
          return jqXHR;
        }
        fireGlobals = jQuery.event && s.global;
        if (fireGlobals && jQuery.active++ === 0) {
          jQuery.event.trigger("ajaxStart");
        }
        s.type = s.type.toUpperCase();
        s.hasContent = !rnoContent.test(s.type);
        cacheURL = s.url.replace(rhash, "");
        if (!s.hasContent) {
          uncached = s.url.slice(cacheURL.length);
          if (s.data) {
            cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
            delete s.data;
          }
          if (s.cache === false) {
            cacheURL = cacheURL.replace(rts, "");
            uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce++) + uncached;
          }
          s.url = cacheURL + uncached;
        } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
          s.data = s.data.replace(r20, "+");
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
        if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
          return jqXHR.abort();
        }
        strAbort = "abort";
        completeDeferred.add(s.complete);
        jqXHR.done(s.success);
        jqXHR.fail(s.error);
        transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
        if (!transport) {
          done(-1, "No Transport");
        } else {
          jqXHR.readyState = 1;
          if (fireGlobals) {
            globalEventContext.trigger("ajaxSend", [jqXHR, s]);
          }
          if (completed) {
            return jqXHR;
          }
          if (s.async && s.timeout > 0) {
            timeoutTimer = window.setTimeout(function() {
              jqXHR.abort("timeout");
            }, s.timeout);
          }
          try {
            completed = false;
            transport.send(requestHeaders, done);
          } catch (e) {
            if (completed) {
              throw e;
            }
            done(-1, e);
          }
        }
        function done(status, nativeStatusText, responses, headers) {
          var isSuccess,
              success,
              error,
              response,
              modified,
              statusText = nativeStatusText;
          if (completed) {
            return;
          }
          completed = true;
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
    jQuery.fn.extend({
      wrapAll: function(html) {
        var wrap;
        if (this[0]) {
          if (jQuery.isFunction(html)) {
            html = html.call(this[0]);
          }
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
      unwrap: function(selector) {
        this.parent(selector).not("body").each(function() {
          jQuery(this).replaceWith(this.childNodes);
        });
        return this;
      }
    });
    jQuery.expr.pseudos.hidden = function(elem) {
      return !jQuery.expr.pseudos.visible(elem);
    };
    jQuery.expr.pseudos.visible = function(elem) {
      return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    };
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
    jQuery.ajaxPrefilter(function(s) {
      if (s.crossDomain) {
        s.contents.script = false;
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
      if (typeof data !== "string") {
        return [];
      }
      if (typeof context === "boolean") {
        keepScripts = context;
        context = false;
      }
      var base,
          parsed,
          scripts;
      if (!context) {
        if (support.createHTMLDocument) {
          context = document.implementation.createHTMLDocument("");
          base = context.createElement("base");
          base.href = document.location.href;
          context.head.appendChild(base);
        } else {
          context = document;
        }
      }
      parsed = rsingleTag.exec(data);
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
    jQuery.fn.load = function(url, params, callback) {
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
            callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
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
            rect,
            doc,
            elem = this[0];
        if (!elem) {
          return;
        }
        if (!elem.getClientRects().length) {
          return {
            top: 0,
            left: 0
          };
        }
        rect = elem.getBoundingClientRect();
        if (rect.width || rect.height) {
          doc = elem.ownerDocument;
          win = getWindow(doc);
          docElem = doc.documentElement;
          return {
            top: rect.top + win.pageYOffset - docElem.clientTop,
            left: rect.left + win.pageXOffset - docElem.clientLeft
          };
        }
        return rect;
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
          parentOffset = {
            top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
            left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
          };
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
              return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
            }
            if (elem.nodeType === 9) {
              doc = elem.documentElement;
              return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
            }
            return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
          }, type, chainable ? margin : undefined, chainable);
        };
      });
    });
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
  });
  return module.exports;
});

(function() {
var define = $__System.amdDefine;
define("libs/jquery.js", ["libs/jquery.slim.js"], function(global) {
  var IE = (function() {
    if (document.documentMode) {
      return document.documentMode;
    } else {
      for (var i = 7; i > 4; i--) {
        var div = document.createElement("div");
        div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";
        if (div.getElementsByTagName("span").length) {
          div = null;
          return i;
        }
      }
    }
    return undefined;
  })();
  var rAFShim = (function() {
    var timeLast = 0;
    return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
      var timeCurrent = (new Date()).getTime(),
          timeDelta;
      timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
      timeLast = timeCurrent + timeDelta;
      return setTimeout(function() {
        callback(timeCurrent + timeDelta);
      }, timeDelta);
    };
  })();
  function compactSparseArray(array) {
    var index = -1,
        length = array ? array.length : 0,
        result = [];
    while (++index < length) {
      var value = array[index];
      if (value) {
        result.push(value);
      }
    }
    return result;
  }
  function sanitizeElements(elements) {
    if (Type.isWrapped(elements)) {
      elements = [].slice.call(elements);
    } else if (Type.isNode(elements)) {
      elements = [elements];
    }
    return elements;
  }
  var Type = {
    isString: function(variable) {
      return (typeof variable === "string");
    },
    isArray: Array.isArray || function(variable) {
      return Object.prototype.toString.call(variable) === "[object Array]";
    },
    isFunction: function(variable) {
      return Object.prototype.toString.call(variable) === "[object Function]";
    },
    isNode: function(variable) {
      return variable && variable.nodeType;
    },
    isNodeList: function(variable) {
      return typeof variable === "object" && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) && variable.length !== undefined && (variable.length === 0 || (typeof variable[0] === "object" && variable[0].nodeType > 0));
    },
    isWrapped: function(variable) {
      return variable && (variable.jquery || (window.Zepto && window.Zepto.zepto.isZ(variable)));
    },
    isSVG: function(variable) {
      return window.SVGElement && (variable instanceof window.SVGElement);
    },
    isEmptyObject: function(variable) {
      for (var name in variable) {
        return false;
      }
      return true;
    }
  };
  var $,
      isJQuery = false;
  if (global.fn && global.fn.jquery) {
    $ = global;
    isJQuery = true;
  } else {
    $ = window.Velocity.Utilities;
  }
  var DURATION_DEFAULT = 400,
      EASING_DEFAULT = "swing";
  var Velocity = {
    State: {
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isAndroid: /Android/i.test(navigator.userAgent),
      isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
      isChrome: window.chrome,
      isFirefox: /Firefox/i.test(navigator.userAgent),
      prefixElement: document.createElement("div"),
      prefixMatches: {},
      scrollAnchor: null,
      scrollPropertyLeft: null,
      scrollPropertyTop: null,
      isTicking: false,
      calls: []
    },
    CSS: {},
    Utilities: $,
    Redirects: {},
    Easings: {},
    Promise: window.Promise,
    defaults: {
      queue: "",
      duration: DURATION_DEFAULT,
      easing: EASING_DEFAULT,
      begin: undefined,
      complete: undefined,
      progress: undefined,
      display: undefined,
      visibility: undefined,
      loop: false,
      delay: false,
      mobileHA: true,
      _cacheValues: true
    },
    init: function(element) {
      $.data(element, "velocity", {
        isSVG: Type.isSVG(element),
        isAnimating: false,
        computedStyle: null,
        tweensContainer: null,
        rootPropertyValueCache: {},
        transformCache: {}
      });
    },
    hook: null,
    mock: false,
    version: {
      major: 1,
      minor: 2,
      patch: 2
    },
    debug: false
  };
  if (window.pageYOffset !== undefined) {
    Velocity.State.scrollAnchor = window;
    Velocity.State.scrollPropertyLeft = "pageXOffset";
    Velocity.State.scrollPropertyTop = "pageYOffset";
  } else {
    Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
    Velocity.State.scrollPropertyLeft = "scrollLeft";
    Velocity.State.scrollPropertyTop = "scrollTop";
  }
  function Data(element) {
    var response = $.data(element, "velocity");
    return response === null ? undefined : response;
  }
  ;
  function generateStep(steps) {
    return function(p) {
      return Math.round(p * steps) * (1 / steps);
    };
  }
  function generateBezier(mX1, mY1, mX2, mY2) {
    var NEWTON_ITERATIONS = 4,
        NEWTON_MIN_SLOPE = 0.001,
        SUBDIVISION_PRECISION = 0.0000001,
        SUBDIVISION_MAX_ITERATIONS = 10,
        kSplineTableSize = 11,
        kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
        float32ArraySupported = "Float32Array" in window;
    if (arguments.length !== 4) {
      return false;
    }
    for (var i = 0; i < 4; ++i) {
      if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
        return false;
      }
    }
    mX1 = Math.min(mX1, 1);
    mX2 = Math.min(mX2, 1);
    mX1 = Math.max(mX1, 0);
    mX2 = Math.max(mX2, 0);
    var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    function A(aA1, aA2) {
      return 1.0 - 3.0 * aA2 + 3.0 * aA1;
    }
    function B(aA1, aA2) {
      return 3.0 * aA2 - 6.0 * aA1;
    }
    function C(aA1) {
      return 3.0 * aA1;
    }
    function calcBezier(aT, aA1, aA2) {
      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
      return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
    }
    function newtonRaphsonIterate(aX, aGuessT) {
      for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0)
          return aGuessT;
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }
    function calcSampleValues() {
      for (var i = 0; i < kSplineTableSize; ++i) {
        mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }
    function binarySubdivide(aX, aA, aB) {
      var currentX,
          currentT,
          i = 0;
      do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0.0) {
          aB = currentT;
        } else {
          aA = currentT;
        }
      } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
      return currentT;
    }
    function getTForX(aX) {
      var intervalStart = 0.0,
          currentSample = 1,
          lastSample = kSplineTableSize - 1;
      for (; currentSample != lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;
      var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]),
          guessForT = intervalStart + dist * kSampleStepSize,
          initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT);
      } else if (initialSlope == 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
      }
    }
    var _precomputed = false;
    function precompute() {
      _precomputed = true;
      if (mX1 != mY1 || mX2 != mY2)
        calcSampleValues();
    }
    var f = function(aX) {
      if (!_precomputed)
        precompute();
      if (mX1 === mY1 && mX2 === mY2)
        return aX;
      if (aX === 0)
        return 0;
      if (aX === 1)
        return 1;
      return calcBezier(getTForX(aX), mY1, mY2);
    };
    f.getControlPoints = function() {
      return [{
        x: mX1,
        y: mY1
      }, {
        x: mX2,
        y: mY2
      }];
    };
    var str = "generateBezier(" + [mX1, mY1, mX2, mY2] + ")";
    f.toString = function() {
      return str;
    };
    return f;
  }
  var generateSpringRK4 = (function() {
    function springAccelerationForState(state) {
      return (-state.tension * state.x) - (state.friction * state.v);
    }
    function springEvaluateStateWithDerivative(initialState, dt, derivative) {
      var state = {
        x: initialState.x + derivative.dx * dt,
        v: initialState.v + derivative.dv * dt,
        tension: initialState.tension,
        friction: initialState.friction
      };
      return {
        dx: state.v,
        dv: springAccelerationForState(state)
      };
    }
    function springIntegrateState(state, dt) {
      var a = {
        dx: state.v,
        dv: springAccelerationForState(state)
      },
          b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
          c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
          d = springEvaluateStateWithDerivative(state, dt, c),
          dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
          dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);
      state.x = state.x + dxdt * dt;
      state.v = state.v + dvdt * dt;
      return state;
    }
    return function springRK4Factory(tension, friction, duration) {
      var initState = {
        x: -1,
        v: 0,
        tension: null,
        friction: null
      },
          path = [0],
          time_lapsed = 0,
          tolerance = 1 / 10000,
          DT = 16 / 1000,
          have_duration,
          dt,
          last_state;
      tension = parseFloat(tension) || 500;
      friction = parseFloat(friction) || 20;
      duration = duration || null;
      initState.tension = tension;
      initState.friction = friction;
      have_duration = duration !== null;
      if (have_duration) {
        time_lapsed = springRK4Factory(tension, friction);
        dt = time_lapsed / duration * DT;
      } else {
        dt = DT;
      }
      while (true) {
        last_state = springIntegrateState(last_state || initState, dt);
        path.push(1 + last_state.x);
        time_lapsed += 16;
        if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
          break;
        }
      }
      return !have_duration ? time_lapsed : function(percentComplete) {
        return path[(percentComplete * (path.length - 1)) | 0];
      };
    };
  }());
  Velocity.Easings = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    spring: function(p) {
      return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6));
    }
  };
  $.each([["ease", [0.25, 0.1, 0.25, 1.0]], ["ease-in", [0.42, 0.0, 1.00, 1.0]], ["ease-out", [0.00, 0.0, 0.58, 1.0]], ["ease-in-out", [0.42, 0.0, 0.58, 1.0]], ["easeInSine", [0.47, 0, 0.745, 0.715]], ["easeOutSine", [0.39, 0.575, 0.565, 1]], ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]], ["easeInQuad", [0.55, 0.085, 0.68, 0.53]], ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]], ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]], ["easeInCubic", [0.55, 0.055, 0.675, 0.19]], ["easeOutCubic", [0.215, 0.61, 0.355, 1]], ["easeInOutCubic", [0.645, 0.045, 0.355, 1]], ["easeInQuart", [0.895, 0.03, 0.685, 0.22]], ["easeOutQuart", [0.165, 0.84, 0.44, 1]], ["easeInOutQuart", [0.77, 0, 0.175, 1]], ["easeInQuint", [0.755, 0.05, 0.855, 0.06]], ["easeOutQuint", [0.23, 1, 0.32, 1]], ["easeInOutQuint", [0.86, 0, 0.07, 1]], ["easeInExpo", [0.95, 0.05, 0.795, 0.035]], ["easeOutExpo", [0.19, 1, 0.22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [0.6, 0.04, 0.98, 0.335]], ["easeOutCirc", [0.075, 0.82, 0.165, 1]], ["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]]], function(i, easingArray) {
    Velocity.Easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
  });
  function getEasing(value, duration) {
    var easing = value;
    if (Type.isString(value)) {
      if (!Velocity.Easings[value]) {
        easing = false;
      }
    } else if (Type.isArray(value) && value.length === 1) {
      easing = generateStep.apply(null, value);
    } else if (Type.isArray(value) && value.length === 2) {
      easing = generateSpringRK4.apply(null, value.concat([duration]));
    } else if (Type.isArray(value) && value.length === 4) {
      easing = generateBezier.apply(null, value);
    } else {
      easing = false;
    }
    if (easing === false) {
      if (Velocity.Easings[Velocity.defaults.easing]) {
        easing = Velocity.defaults.easing;
      } else {
        easing = EASING_DEFAULT;
      }
    }
    return easing;
  }
  var CSS = Velocity.CSS = {
    RegEx: {
      isHex: /^#([A-f\d]{3}){1,2}$/i,
      valueUnwrap: /^[A-z]+\((.*)\)$/i,
      wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
      valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
    },
    Lists: {
      colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
      transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
      transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
    },
    Hooks: {
      templates: {
        "textShadow": ["Color X Y Blur", "black 0px 0px 0px"],
        "boxShadow": ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
        "clip": ["Top Right Bottom Left", "0px 0px 0px 0px"],
        "backgroundPosition": ["X Y", "0% 0%"],
        "transformOrigin": ["X Y Z", "50% 50% 0px"],
        "perspectiveOrigin": ["X Y", "50% 50%"]
      },
      registered: {},
      register: function() {
        for (var i = 0; i < CSS.Lists.colors.length; i++) {
          var rgbComponents = (CSS.Lists.colors[i] === "color") ? "0 0 0 1" : "255 255 255 1";
          CSS.Hooks.templates[CSS.Lists.colors[i]] = ["Red Green Blue Alpha", rgbComponents];
        }
        var rootProperty,
            hookTemplate,
            hookNames;
        if (IE) {
          for (rootProperty in CSS.Hooks.templates) {
            hookTemplate = CSS.Hooks.templates[rootProperty];
            hookNames = hookTemplate[0].split(" ");
            var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);
            if (hookNames[0] === "Color") {
              hookNames.push(hookNames.shift());
              defaultValues.push(defaultValues.shift());
              CSS.Hooks.templates[rootProperty] = [hookNames.join(" "), defaultValues.join(" ")];
            }
          }
        }
        for (rootProperty in CSS.Hooks.templates) {
          hookTemplate = CSS.Hooks.templates[rootProperty];
          hookNames = hookTemplate[0].split(" ");
          for (var i in hookNames) {
            var fullHookName = rootProperty + hookNames[i],
                hookPosition = i;
            CSS.Hooks.registered[fullHookName] = [rootProperty, hookPosition];
          }
        }
      },
      getRoot: function(property) {
        var hookData = CSS.Hooks.registered[property];
        if (hookData) {
          return hookData[0];
        } else {
          return property;
        }
      },
      cleanRootPropertyValue: function(rootProperty, rootPropertyValue) {
        if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
          rootPropertyValue = rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];
        }
        if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
          rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
        }
        return rootPropertyValue;
      },
      extractValue: function(fullHookName, rootPropertyValue) {
        var hookData = CSS.Hooks.registered[fullHookName];
        if (hookData) {
          var hookRoot = hookData[0],
              hookPosition = hookData[1];
          rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);
          return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
        } else {
          return rootPropertyValue;
        }
      },
      injectValue: function(fullHookName, hookValue, rootPropertyValue) {
        var hookData = CSS.Hooks.registered[fullHookName];
        if (hookData) {
          var hookRoot = hookData[0],
              hookPosition = hookData[1],
              rootPropertyValueParts,
              rootPropertyValueUpdated;
          rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);
          rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
          rootPropertyValueParts[hookPosition] = hookValue;
          rootPropertyValueUpdated = rootPropertyValueParts.join(" ");
          return rootPropertyValueUpdated;
        } else {
          return rootPropertyValue;
        }
      }
    },
    Normalizations: {
      registered: {
        clip: function(type, element, propertyValue) {
          switch (type) {
            case "name":
              return "clip";
            case "extract":
              var extracted;
              if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                extracted = propertyValue;
              } else {
                extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);
                extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
              }
              return extracted;
            case "inject":
              return "rect(" + propertyValue + ")";
          }
        },
        blur: function(type, element, propertyValue) {
          switch (type) {
            case "name":
              return Velocity.State.isFirefox ? "filter" : "-webkit-filter";
            case "extract":
              var extracted = parseFloat(propertyValue);
              if (!(extracted || extracted === 0)) {
                var blurComponent = propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                if (blurComponent) {
                  extracted = blurComponent[1];
                } else {
                  extracted = 0;
                }
              }
              return extracted;
            case "inject":
              if (!parseFloat(propertyValue)) {
                return "none";
              } else {
                return "blur(" + propertyValue + ")";
              }
          }
        },
        opacity: function(type, element, propertyValue) {
          if (IE <= 8) {
            switch (type) {
              case "name":
                return "filter";
              case "extract":
                var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);
                if (extracted) {
                  propertyValue = extracted[1] / 100;
                } else {
                  propertyValue = 1;
                }
                return propertyValue;
              case "inject":
                element.style.zoom = 1;
                if (parseFloat(propertyValue) >= 1) {
                  return "";
                } else {
                  return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
                }
            }
          } else {
            switch (type) {
              case "name":
                return "opacity";
              case "extract":
                return propertyValue;
              case "inject":
                return propertyValue;
            }
          }
        }
      },
      register: function() {
        if (!(IE <= 9) && !Velocity.State.isGingerbread) {
          CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
        }
        for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {
          (function() {
            var transformName = CSS.Lists.transformsBase[i];
            CSS.Normalizations.registered[transformName] = function(type, element, propertyValue) {
              switch (type) {
                case "name":
                  return "transform";
                case "extract":
                  if (Data(element) === undefined || Data(element).transformCache[transformName] === undefined) {
                    return /^scale/i.test(transformName) ? 1 : 0;
                  } else {
                    return Data(element).transformCache[transformName].replace(/[()]/g, "");
                  }
                case "inject":
                  var invalid = false;
                  switch (transformName.substr(0, transformName.length - 1)) {
                    case "translate":
                      invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
                      break;
                    case "scal":
                    case "scale":
                      if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
                        propertyValue = 1;
                      }
                      invalid = !/(\d)$/i.test(propertyValue);
                      break;
                    case "skew":
                      invalid = !/(deg|\d)$/i.test(propertyValue);
                      break;
                    case "rotate":
                      invalid = !/(deg|\d)$/i.test(propertyValue);
                      break;
                  }
                  if (!invalid) {
                    Data(element).transformCache[transformName] = "(" + propertyValue + ")";
                  }
                  return Data(element).transformCache[transformName];
              }
            };
          })();
        }
        for (var i = 0; i < CSS.Lists.colors.length; i++) {
          (function() {
            var colorName = CSS.Lists.colors[i];
            CSS.Normalizations.registered[colorName] = function(type, element, propertyValue) {
              switch (type) {
                case "name":
                  return colorName;
                case "extract":
                  var extracted;
                  if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                    extracted = propertyValue;
                  } else {
                    var converted,
                        colorNames = {
                          black: "rgb(0, 0, 0)",
                          blue: "rgb(0, 0, 255)",
                          gray: "rgb(128, 128, 128)",
                          green: "rgb(0, 128, 0)",
                          red: "rgb(255, 0, 0)",
                          white: "rgb(255, 255, 255)"
                        };
                    if (/^[A-z]+$/i.test(propertyValue)) {
                      if (colorNames[propertyValue] !== undefined) {
                        converted = colorNames[propertyValue];
                      } else {
                        converted = colorNames.black;
                      }
                    } else if (CSS.RegEx.isHex.test(propertyValue)) {
                      converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";
                    } else if (!(/^rgba?\(/i.test(propertyValue))) {
                      converted = colorNames.black;
                    }
                    extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                  }
                  if (!(IE <= 8) && extracted.split(" ").length === 3) {
                    extracted += " 1";
                  }
                  return extracted;
                case "inject":
                  if (IE <= 8) {
                    if (propertyValue.split(" ").length === 4) {
                      propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
                    }
                  } else if (propertyValue.split(" ").length === 3) {
                    propertyValue += " 1";
                  }
                  return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
              }
            };
          })();
        }
      }
    },
    Names: {
      camelCase: function(property) {
        return property.replace(/-(\w)/g, function(match, subMatch) {
          return subMatch.toUpperCase();
        });
      },
      SVGAttribute: function(property) {
        var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
        if (IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) {
          SVGAttributes += "|transform";
        }
        return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
      },
      prefixCheck: function(property) {
        if (Velocity.State.prefixMatches[property]) {
          return [Velocity.State.prefixMatches[property], true];
        } else {
          var vendors = ["", "Webkit", "Moz", "ms", "O"];
          for (var i = 0,
              vendorsLength = vendors.length; i < vendorsLength; i++) {
            var propertyPrefixed;
            if (i === 0) {
              propertyPrefixed = property;
            } else {
              propertyPrefixed = vendors[i] + property.replace(/^\w/, function(match) {
                return match.toUpperCase();
              });
            }
            if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {
              Velocity.State.prefixMatches[property] = propertyPrefixed;
              return [propertyPrefixed, true];
            }
          }
          return [property, false];
        }
      }
    },
    Values: {
      hexToRgb: function(hex) {
        var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
            rgbParts;
        hex = hex.replace(shortformRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
        });
        rgbParts = longformRegex.exec(hex);
        return rgbParts ? [parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16)] : [0, 0, 0];
      },
      isCSSNullValue: function(value) {
        return (value == 0 || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value));
      },
      getUnitType: function(property) {
        if (/^(rotate|skew)/i.test(property)) {
          return "deg";
        } else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
          return "";
        } else {
          return "px";
        }
      },
      getDisplayType: function(element) {
        var tagName = element && element.tagName.toString().toLowerCase();
        if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
          return "inline";
        } else if (/^(li)$/i.test(tagName)) {
          return "list-item";
        } else if (/^(tr)$/i.test(tagName)) {
          return "table-row";
        } else if (/^(table)$/i.test(tagName)) {
          return "table";
        } else if (/^(tbody)$/i.test(tagName)) {
          return "table-row-group";
        } else {
          return "block";
        }
      },
      addClass: function(element, className) {
        if (element.classList) {
          element.classList.add(className);
        } else {
          element.className += (element.className.length ? " " : "") + className;
        }
      },
      removeClass: function(element, className) {
        if (element.classList) {
          element.classList.remove(className);
        } else {
          element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
        }
      }
    },
    getPropertyValue: function(element, property, rootPropertyValue, forceStyleLookup) {
      function computePropertyValue(element, property) {
        var computedValue = 0;
        if (IE <= 8) {
          computedValue = $.css(element, property);
        } else {
          var toggleDisplay = false;
          if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
            toggleDisplay = true;
            CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
          }
          function revertDisplay() {
            if (toggleDisplay) {
              CSS.setPropertyValue(element, "display", "none");
            }
          }
          if (!forceStyleLookup) {
            if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
              var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
              revertDisplay();
              return contentBoxHeight;
            } else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
              var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
              revertDisplay();
              return contentBoxWidth;
            }
          }
          var computedStyle;
          if (Data(element) === undefined) {
            computedStyle = window.getComputedStyle(element, null);
          } else if (!Data(element).computedStyle) {
            computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null);
          } else {
            computedStyle = Data(element).computedStyle;
          }
          if (property === "borderColor") {
            property = "borderTopColor";
          }
          if (IE === 9 && property === "filter") {
            computedValue = computedStyle.getPropertyValue(property);
          } else {
            computedValue = computedStyle[property];
          }
          if (computedValue === "" || computedValue === null) {
            computedValue = element.style[property];
          }
          revertDisplay();
        }
        if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
          var position = computePropertyValue(element, "position");
          if (position === "fixed" || (position === "absolute" && /top|left/i.test(property))) {
            computedValue = $(element).position()[property] + "px";
          }
        }
        return computedValue;
      }
      var propertyValue;
      if (CSS.Hooks.registered[property]) {
        var hook = property,
            hookRoot = CSS.Hooks.getRoot(hook);
        if (rootPropertyValue === undefined) {
          rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]);
        }
        if (CSS.Normalizations.registered[hookRoot]) {
          rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
        }
        propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);
      } else if (CSS.Normalizations.registered[property]) {
        var normalizedPropertyName,
            normalizedPropertyValue;
        normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);
        if (normalizedPropertyName !== "transform") {
          normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]);
          if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
            normalizedPropertyValue = CSS.Hooks.templates[property][1];
          }
        }
        propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
      }
      if (!/^[\d-]/.test(propertyValue)) {
        if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
          if (/^(height|width)$/i.test(property)) {
            try {
              propertyValue = element.getBBox()[property];
            } catch (error) {
              propertyValue = 0;
            }
          } else {
            propertyValue = element.getAttribute(property);
          }
        } else {
          propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]);
        }
      }
      if (CSS.Values.isCSSNullValue(propertyValue)) {
        propertyValue = 0;
      }
      if (Velocity.debug >= 2)
        console.log("Get " + property + ": " + propertyValue);
      return propertyValue;
    },
    setPropertyValue: function(element, property, propertyValue, rootPropertyValue, scrollData) {
      var propertyName = property;
      if (property === "scroll") {
        if (scrollData.container) {
          scrollData.container["scroll" + scrollData.direction] = propertyValue;
        } else {
          if (scrollData.direction === "Left") {
            window.scrollTo(propertyValue, scrollData.alternateValue);
          } else {
            window.scrollTo(scrollData.alternateValue, propertyValue);
          }
        }
      } else {
        if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {
          CSS.Normalizations.registered[property]("inject", element, propertyValue);
          propertyName = "transform";
          propertyValue = Data(element).transformCache[property];
        } else {
          if (CSS.Hooks.registered[property]) {
            var hookName = property,
                hookRoot = CSS.Hooks.getRoot(property);
            rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot);
            propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
            property = hookRoot;
          }
          if (CSS.Normalizations.registered[property]) {
            propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
            property = CSS.Normalizations.registered[property]("name", element);
          }
          propertyName = CSS.Names.prefixCheck(property)[0];
          if (IE <= 8) {
            try {
              element.style[propertyName] = propertyValue;
            } catch (error) {
              if (Velocity.debug)
                console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]");
            }
          } else if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
            element.setAttribute(property, propertyValue);
          } else {
            element.style[propertyName] = propertyValue;
          }
          if (Velocity.debug >= 2)
            console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
        }
      }
      return [propertyName, propertyValue];
    },
    flushTransformCache: function(element) {
      var transformString = "";
      if ((IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) && Data(element).isSVG) {
        function getTransformFloat(transformProperty) {
          return parseFloat(CSS.getPropertyValue(element, transformProperty));
        }
        var SVGTransforms = {
          translate: [getTransformFloat("translateX"), getTransformFloat("translateY")],
          skewX: [getTransformFloat("skewX")],
          skewY: [getTransformFloat("skewY")],
          scale: getTransformFloat("scale") !== 1 ? [getTransformFloat("scale"), getTransformFloat("scale")] : [getTransformFloat("scaleX"), getTransformFloat("scaleY")],
          rotate: [getTransformFloat("rotateZ"), 0, 0]
        };
        $.each(Data(element).transformCache, function(transformName) {
          if (/^translate/i.test(transformName)) {
            transformName = "translate";
          } else if (/^scale/i.test(transformName)) {
            transformName = "scale";
          } else if (/^rotate/i.test(transformName)) {
            transformName = "rotate";
          }
          if (SVGTransforms[transformName]) {
            transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";
            delete SVGTransforms[transformName];
          }
        });
      } else {
        var transformValue,
            perspective;
        $.each(Data(element).transformCache, function(transformName) {
          transformValue = Data(element).transformCache[transformName];
          if (transformName === "transformPerspective") {
            perspective = transformValue;
            return true;
          }
          if (IE === 9 && transformName === "rotateZ") {
            transformName = "rotate";
          }
          transformString += transformName + transformValue + " ";
        });
        if (perspective) {
          transformString = "perspective" + perspective + " " + transformString;
        }
      }
      CSS.setPropertyValue(element, "transform", transformString);
    }
  };
  CSS.Hooks.register();
  CSS.Normalizations.register();
  Velocity.hook = function(elements, arg2, arg3) {
    var value = undefined;
    elements = sanitizeElements(elements);
    $.each(elements, function(i, element) {
      if (Data(element) === undefined) {
        Velocity.init(element);
      }
      if (arg3 === undefined) {
        if (value === undefined) {
          value = Velocity.CSS.getPropertyValue(element, arg2);
        }
      } else {
        var adjustedSet = Velocity.CSS.setPropertyValue(element, arg2, arg3);
        if (adjustedSet[0] === "transform") {
          Velocity.CSS.flushTransformCache(element);
        }
        value = adjustedSet;
      }
    });
    return value;
  };
  var animate = function() {
    function getChain() {
      if (isUtility) {
        return promiseData.promise || null;
      } else {
        return elementsWrapped;
      }
    }
    var syntacticSugar = (arguments[0] && (arguments[0].p || (($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || Type.isString(arguments[0].properties)))),
        isUtility,
        elementsWrapped,
        argumentIndex;
    var elements,
        propertiesMap,
        options;
    if (Type.isWrapped(this)) {
      isUtility = false;
      argumentIndex = 0;
      elements = this;
      elementsWrapped = this;
    } else {
      isUtility = true;
      argumentIndex = 1;
      elements = syntacticSugar ? (arguments[0].elements || arguments[0].e) : arguments[0];
    }
    elements = sanitizeElements(elements);
    if (!elements) {
      return;
    }
    if (syntacticSugar) {
      propertiesMap = arguments[0].properties || arguments[0].p;
      options = arguments[0].options || arguments[0].o;
    } else {
      propertiesMap = arguments[argumentIndex];
      options = arguments[argumentIndex + 1];
    }
    var elementsLength = elements.length,
        elementsIndex = 0;
    if (!/^(stop|finish|finishAll)$/i.test(propertiesMap) && !$.isPlainObject(options)) {
      var startingArgumentPosition = argumentIndex + 1;
      options = {};
      for (var i = startingArgumentPosition; i < arguments.length; i++) {
        if (!Type.isArray(arguments[i]) && (/^(fast|normal|slow)$/i.test(arguments[i]) || /^\d/.test(arguments[i]))) {
          options.duration = arguments[i];
        } else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
          options.easing = arguments[i];
        } else if (Type.isFunction(arguments[i])) {
          options.complete = arguments[i];
        }
      }
    }
    var promiseData = {
      promise: null,
      resolver: null,
      rejecter: null
    };
    if (isUtility && Velocity.Promise) {
      promiseData.promise = new Velocity.Promise(function(resolve, reject) {
        promiseData.resolver = resolve;
        promiseData.rejecter = reject;
      });
    }
    var action;
    switch (propertiesMap) {
      case "scroll":
        action = "scroll";
        break;
      case "reverse":
        action = "reverse";
        break;
      case "finish":
      case "finishAll":
      case "stop":
        $.each(elements, function(i, element) {
          if (Data(element) && Data(element).delayTimer) {
            clearTimeout(Data(element).delayTimer.setTimeout);
            if (Data(element).delayTimer.next) {
              Data(element).delayTimer.next();
            }
            delete Data(element).delayTimer;
          }
          if (propertiesMap === "finishAll" && (options === true || Type.isString(options))) {
            $.each($.queue(element, Type.isString(options) ? options : ""), function(_, item) {
              if (Type.isFunction(item)) {
                item();
              }
            });
            $.queue(element, Type.isString(options) ? options : "", []);
          }
        });
        var callsToStop = [];
        $.each(Velocity.State.calls, function(i, activeCall) {
          if (activeCall) {
            $.each(activeCall[1], function(k, activeElement) {
              var queueName = (options === undefined) ? "" : options;
              if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
                return true;
              }
              $.each(elements, function(l, element) {
                if (element === activeElement) {
                  if (options === true || Type.isString(options)) {
                    $.each($.queue(element, Type.isString(options) ? options : ""), function(_, item) {
                      if (Type.isFunction(item)) {
                        item(null, true);
                      }
                    });
                    $.queue(element, Type.isString(options) ? options : "", []);
                  }
                  if (propertiesMap === "stop") {
                    if (Data(element) && Data(element).tweensContainer && queueName !== false) {
                      $.each(Data(element).tweensContainer, function(m, activeTween) {
                        activeTween.endValue = activeTween.currentValue;
                      });
                    }
                    callsToStop.push(i);
                  } else if (propertiesMap === "finish" || propertiesMap === "finishAll") {
                    activeCall[2].duration = 1;
                  }
                }
              });
            });
          }
        });
        if (propertiesMap === "stop") {
          $.each(callsToStop, function(i, j) {
            completeCall(j, true);
          });
          if (promiseData.promise) {
            promiseData.resolver(elements);
          }
        }
        return getChain();
      default:
        if ($.isPlainObject(propertiesMap) && !Type.isEmptyObject(propertiesMap)) {
          action = "start";
        } else if (Type.isString(propertiesMap) && Velocity.Redirects[propertiesMap]) {
          var opts = $.extend({}, options),
              durationOriginal = opts.duration,
              delayOriginal = opts.delay || 0;
          if (opts.backwards === true) {
            elements = $.extend(true, [], elements).reverse();
          }
          $.each(elements, function(elementIndex, element) {
            if (parseFloat(opts.stagger)) {
              opts.delay = delayOriginal + (parseFloat(opts.stagger) * elementIndex);
            } else if (Type.isFunction(opts.stagger)) {
              opts.delay = delayOriginal + opts.stagger.call(element, elementIndex, elementsLength);
            }
            if (opts.drag) {
              opts.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DURATION_DEFAULT);
              opts.duration = Math.max(opts.duration * (opts.backwards ? 1 - elementIndex / elementsLength : (elementIndex + 1) / elementsLength), opts.duration * 0.75, 200);
            }
            Velocity.Redirects[propertiesMap].call(element, element, opts || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
          });
          return getChain();
        } else {
          var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered redirect. Aborting.";
          if (promiseData.promise) {
            promiseData.rejecter(new Error(abortError));
          } else {
            console.log(abortError);
          }
          return getChain();
        }
    }
    var callUnitConversionData = {
      lastParent: null,
      lastPosition: null,
      lastFontSize: null,
      lastPercentToPxWidth: null,
      lastPercentToPxHeight: null,
      lastEmToPx: null,
      remToPx: null,
      vwToPx: null,
      vhToPx: null
    };
    var call = [];
    function processElement() {
      var element = this,
          opts = $.extend({}, Velocity.defaults, options),
          tweensContainer = {},
          elementUnitConversionData;
      if (Data(element) === undefined) {
        Velocity.init(element);
      }
      if (parseFloat(opts.delay) && opts.queue !== false) {
        $.queue(element, opts.queue, function(next) {
          Velocity.velocityQueueEntryFlag = true;
          Data(element).delayTimer = {
            setTimeout: setTimeout(next, parseFloat(opts.delay)),
            next: next
          };
        });
      }
      switch (opts.duration.toString().toLowerCase()) {
        case "fast":
          opts.duration = 200;
          break;
        case "normal":
          opts.duration = DURATION_DEFAULT;
          break;
        case "slow":
          opts.duration = 600;
          break;
        default:
          opts.duration = parseFloat(opts.duration) || 1;
      }
      if (Velocity.mock !== false) {
        if (Velocity.mock === true) {
          opts.duration = opts.delay = 1;
        } else {
          opts.duration *= parseFloat(Velocity.mock) || 1;
          opts.delay *= parseFloat(Velocity.mock) || 1;
        }
      }
      opts.easing = getEasing(opts.easing, opts.duration);
      if (opts.begin && !Type.isFunction(opts.begin)) {
        opts.begin = null;
      }
      if (opts.progress && !Type.isFunction(opts.progress)) {
        opts.progress = null;
      }
      if (opts.complete && !Type.isFunction(opts.complete)) {
        opts.complete = null;
      }
      if (opts.display !== undefined && opts.display !== null) {
        opts.display = opts.display.toString().toLowerCase();
        if (opts.display === "auto") {
          opts.display = Velocity.CSS.Values.getDisplayType(element);
        }
      }
      if (opts.visibility !== undefined && opts.visibility !== null) {
        opts.visibility = opts.visibility.toString().toLowerCase();
      }
      opts.mobileHA = (opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread);
      function buildQueue(next) {
        if (opts.begin && elementsIndex === 0) {
          try {
            opts.begin.call(elements, elements);
          } catch (error) {
            setTimeout(function() {
              throw error;
            }, 1);
          }
        }
        if (action === "scroll") {
          var scrollDirection = (/^x$/i.test(opts.axis) ? "Left" : "Top"),
              scrollOffset = parseFloat(opts.offset) || 0,
              scrollPositionCurrent,
              scrollPositionCurrentAlternate,
              scrollPositionEnd;
          if (opts.container) {
            if (Type.isWrapped(opts.container) || Type.isNode(opts.container)) {
              opts.container = opts.container[0] || opts.container;
              scrollPositionCurrent = opts.container["scroll" + scrollDirection];
              scrollPositionEnd = (scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()]) + scrollOffset;
            } else {
              opts.container = null;
            }
          } else {
            scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]];
            scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]];
            scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset;
          }
          tweensContainer = {
            scroll: {
              rootPropertyValue: false,
              startValue: scrollPositionCurrent,
              currentValue: scrollPositionCurrent,
              endValue: scrollPositionEnd,
              unitType: "",
              easing: opts.easing,
              scrollData: {
                container: opts.container,
                direction: scrollDirection,
                alternateValue: scrollPositionCurrentAlternate
              }
            },
            element: element
          };
          if (Velocity.debug)
            console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);
        } else if (action === "reverse") {
          if (!Data(element).tweensContainer) {
            $.dequeue(element, opts.queue);
            return;
          } else {
            if (Data(element).opts.display === "none") {
              Data(element).opts.display = "auto";
            }
            if (Data(element).opts.visibility === "hidden") {
              Data(element).opts.visibility = "visible";
            }
            Data(element).opts.loop = false;
            Data(element).opts.begin = null;
            Data(element).opts.complete = null;
            if (!options.easing) {
              delete opts.easing;
            }
            if (!options.duration) {
              delete opts.duration;
            }
            opts = $.extend({}, Data(element).opts, opts);
            var lastTweensContainer = $.extend(true, {}, Data(element).tweensContainer);
            for (var lastTween in lastTweensContainer) {
              if (lastTween !== "element") {
                var lastStartValue = lastTweensContainer[lastTween].startValue;
                lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
                lastTweensContainer[lastTween].endValue = lastStartValue;
                if (!Type.isEmptyObject(options)) {
                  lastTweensContainer[lastTween].easing = opts.easing;
                }
                if (Velocity.debug)
                  console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
              }
            }
            tweensContainer = lastTweensContainer;
          }
        } else if (action === "start") {
          var lastTweensContainer;
          if (Data(element).tweensContainer && Data(element).isAnimating === true) {
            lastTweensContainer = Data(element).tweensContainer;
          }
          function parsePropertyValue(valueData, skipResolvingEasing) {
            var endValue = undefined,
                easing = undefined,
                startValue = undefined;
            if (Type.isArray(valueData)) {
              endValue = valueData[0];
              if ((!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1])) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
                startValue = valueData[1];
              } else if ((Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1])) || Type.isArray(valueData[1])) {
                easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);
                if (valueData[2] !== undefined) {
                  startValue = valueData[2];
                }
              }
            } else {
              endValue = valueData;
            }
            if (!skipResolvingEasing) {
              easing = easing || opts.easing;
            }
            if (Type.isFunction(endValue)) {
              endValue = endValue.call(element, elementsIndex, elementsLength);
            }
            if (Type.isFunction(startValue)) {
              startValue = startValue.call(element, elementsIndex, elementsLength);
            }
            return [endValue || 0, easing, startValue];
          }
          $.each(propertiesMap, function(property, value) {
            if (RegExp("^" + CSS.Lists.colors.join("$|^") + "$").test(property)) {
              var valueData = parsePropertyValue(value, true),
                  endValue = valueData[0],
                  easing = valueData[1],
                  startValue = valueData[2];
              if (CSS.RegEx.isHex.test(endValue)) {
                var colorComponents = ["Red", "Green", "Blue"],
                    endValueRGB = CSS.Values.hexToRgb(endValue),
                    startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;
                for (var i = 0; i < colorComponents.length; i++) {
                  var dataArray = [endValueRGB[i]];
                  if (easing) {
                    dataArray.push(easing);
                  }
                  if (startValueRGB !== undefined) {
                    dataArray.push(startValueRGB[i]);
                  }
                  propertiesMap[property + colorComponents[i]] = dataArray;
                }
                delete propertiesMap[property];
              }
            }
          });
          for (var property in propertiesMap) {
            var valueData = parsePropertyValue(propertiesMap[property]),
                endValue = valueData[0],
                easing = valueData[1],
                startValue = valueData[2];
            property = CSS.Names.camelCase(property);
            var rootProperty = CSS.Hooks.getRoot(property),
                rootPropertyValue = false;
            if (!Data(element).isSVG && rootProperty !== "tween" && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
              if (Velocity.debug)
                console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");
              continue;
            }
            if (((opts.display !== undefined && opts.display !== null && opts.display !== "none") || (opts.visibility !== undefined && opts.visibility !== "hidden")) && /opacity|filter/.test(property) && !startValue && endValue !== 0) {
              startValue = 0;
            }
            if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
              if (startValue === undefined) {
                startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
              }
              rootPropertyValue = Data(element).rootPropertyValueCache[rootProperty];
            } else {
              if (CSS.Hooks.registered[property]) {
                if (startValue === undefined) {
                  rootPropertyValue = CSS.getPropertyValue(element, rootProperty);
                  startValue = CSS.getPropertyValue(element, property, rootPropertyValue);
                } else {
                  rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                }
              } else if (startValue === undefined) {
                startValue = CSS.getPropertyValue(element, property);
              }
            }
            var separatedValue,
                endValueUnitType,
                startValueUnitType,
                operator = false;
            function separateValue(property, value) {
              var unitType,
                  numericValue;
              numericValue = (value || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(match) {
                unitType = match;
                return "";
              });
              if (!unitType) {
                unitType = CSS.Values.getUnitType(property);
              }
              return [numericValue, unitType];
            }
            separatedValue = separateValue(property, startValue);
            startValue = separatedValue[0];
            startValueUnitType = separatedValue[1];
            separatedValue = separateValue(property, endValue);
            endValue = separatedValue[0].replace(/^([+-\/*])=/, function(match, subMatch) {
              operator = subMatch;
              return "";
            });
            endValueUnitType = separatedValue[1];
            startValue = parseFloat(startValue) || 0;
            endValue = parseFloat(endValue) || 0;
            if (endValueUnitType === "%") {
              if (/^(fontSize|lineHeight)$/.test(property)) {
                endValue = endValue / 100;
                endValueUnitType = "em";
              } else if (/^scale/.test(property)) {
                endValue = endValue / 100;
                endValueUnitType = "";
              } else if (/(Red|Green|Blue)$/i.test(property)) {
                endValue = (endValue / 100) * 255;
                endValueUnitType = "";
              }
            }
            function calculateUnitRatios() {
              var sameRatioIndicators = {
                myParent: element.parentNode || document.body,
                position: CSS.getPropertyValue(element, "position"),
                fontSize: CSS.getPropertyValue(element, "fontSize")
              },
                  samePercentRatio = ((sameRatioIndicators.position === callUnitConversionData.lastPosition) && (sameRatioIndicators.myParent === callUnitConversionData.lastParent)),
                  sameEmRatio = (sameRatioIndicators.fontSize === callUnitConversionData.lastFontSize);
              callUnitConversionData.lastParent = sameRatioIndicators.myParent;
              callUnitConversionData.lastPosition = sameRatioIndicators.position;
              callUnitConversionData.lastFontSize = sameRatioIndicators.fontSize;
              var measurement = 100,
                  unitRatios = {};
              if (!sameEmRatio || !samePercentRatio) {
                var dummy = Data(element).isSVG ? document.createElementNS("http://www.w3.org/2000/svg", "rect") : document.createElement("div");
                Velocity.init(dummy);
                sameRatioIndicators.myParent.appendChild(dummy);
                $.each(["overflow", "overflowX", "overflowY"], function(i, property) {
                  Velocity.CSS.setPropertyValue(dummy, property, "hidden");
                });
                Velocity.CSS.setPropertyValue(dummy, "position", sameRatioIndicators.position);
                Velocity.CSS.setPropertyValue(dummy, "fontSize", sameRatioIndicators.fontSize);
                Velocity.CSS.setPropertyValue(dummy, "boxSizing", "content-box");
                $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(i, property) {
                  Velocity.CSS.setPropertyValue(dummy, property, measurement + "%");
                });
                Velocity.CSS.setPropertyValue(dummy, "paddingLeft", measurement + "em");
                unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(dummy, "width", null, true)) || 1) / measurement;
                unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(dummy, "height", null, true)) || 1) / measurement;
                unitRatios.emToPx = callUnitConversionData.lastEmToPx = (parseFloat(CSS.getPropertyValue(dummy, "paddingLeft")) || 1) / measurement;
                sameRatioIndicators.myParent.removeChild(dummy);
              } else {
                unitRatios.emToPx = callUnitConversionData.lastEmToPx;
                unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth;
                unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight;
              }
              if (callUnitConversionData.remToPx === null) {
                callUnitConversionData.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16;
              }
              if (callUnitConversionData.vwToPx === null) {
                callUnitConversionData.vwToPx = parseFloat(window.innerWidth) / 100;
                callUnitConversionData.vhToPx = parseFloat(window.innerHeight) / 100;
              }
              unitRatios.remToPx = callUnitConversionData.remToPx;
              unitRatios.vwToPx = callUnitConversionData.vwToPx;
              unitRatios.vhToPx = callUnitConversionData.vhToPx;
              if (Velocity.debug >= 1)
                console.log("Unit ratios: " + JSON.stringify(unitRatios), element);
              return unitRatios;
            }
            if (/[\/*]/.test(operator)) {
              endValueUnitType = startValueUnitType;
            } else if ((startValueUnitType !== endValueUnitType) && startValue !== 0) {
              if (endValue === 0) {
                endValueUnitType = startValueUnitType;
              } else {
                elementUnitConversionData = elementUnitConversionData || calculateUnitRatios();
                var axis = (/margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property) || property === "x") ? "x" : "y";
                switch (startValueUnitType) {
                  case "%":
                    startValue *= (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                    break;
                  case "px":
                    break;
                  default:
                    startValue *= elementUnitConversionData[startValueUnitType + "ToPx"];
                }
                switch (endValueUnitType) {
                  case "%":
                    startValue *= 1 / (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                    break;
                  case "px":
                    break;
                  default:
                    startValue *= 1 / elementUnitConversionData[endValueUnitType + "ToPx"];
                }
              }
            }
            switch (operator) {
              case "+":
                endValue = startValue + endValue;
                break;
              case "-":
                endValue = startValue - endValue;
                break;
              case "*":
                endValue = startValue * endValue;
                break;
              case "/":
                endValue = startValue / endValue;
                break;
            }
            tweensContainer[property] = {
              rootPropertyValue: rootPropertyValue,
              startValue: startValue,
              currentValue: startValue,
              endValue: endValue,
              unitType: endValueUnitType,
              easing: easing
            };
            if (Velocity.debug)
              console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
          }
          tweensContainer.element = element;
        }
        if (tweensContainer.element) {
          CSS.Values.addClass(element, "velocity-animating");
          call.push(tweensContainer);
          if (opts.queue === "") {
            Data(element).tweensContainer = tweensContainer;
            Data(element).opts = opts;
          }
          Data(element).isAnimating = true;
          if (elementsIndex === elementsLength - 1) {
            Velocity.State.calls.push([call, elements, opts, null, promiseData.resolver]);
            if (Velocity.State.isTicking === false) {
              Velocity.State.isTicking = true;
              tick();
            }
          } else {
            elementsIndex++;
          }
        }
      }
      if (opts.queue === false) {
        if (opts.delay) {
          setTimeout(buildQueue, opts.delay);
        } else {
          buildQueue();
        }
      } else {
        $.queue(element, opts.queue, function(next, clearQueue) {
          if (clearQueue === true) {
            if (promiseData.promise) {
              promiseData.resolver(elements);
            }
            return true;
          }
          Velocity.velocityQueueEntryFlag = true;
          buildQueue(next);
        });
      }
      if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
        $.dequeue(element);
      }
    }
    $.each(elements, function(i, element) {
      if (Type.isNode(element)) {
        processElement.call(element);
      }
    });
    var opts = $.extend({}, Velocity.defaults, options),
        reverseCallsCount;
    opts.loop = parseInt(opts.loop);
    reverseCallsCount = (opts.loop * 2) - 1;
    if (opts.loop) {
      for (var x = 0; x < reverseCallsCount; x++) {
        var reverseOptions = {
          delay: opts.delay,
          progress: opts.progress
        };
        if (x === reverseCallsCount - 1) {
          reverseOptions.display = opts.display;
          reverseOptions.visibility = opts.visibility;
          reverseOptions.complete = opts.complete;
        }
        animate(elements, "reverse", reverseOptions);
      }
    }
    return getChain();
  };
  Velocity = $.extend(animate, Velocity);
  Velocity.animate = animate;
  var ticker = window.requestAnimationFrame || rAFShim;
  if (!Velocity.State.isMobile && document.hidden !== undefined) {
    document.addEventListener("visibilitychange", function() {
      if (document.hidden) {
        ticker = function(callback) {
          return setTimeout(function() {
            callback(true);
          }, 16);
        };
        tick();
      } else {
        ticker = window.requestAnimationFrame || rAFShim;
      }
    });
  }
  function tick(timestamp) {
    if (timestamp) {
      var timeCurrent = (new Date).getTime();
      var callsLength = Velocity.State.calls.length;
      if (callsLength > 10000) {
        Velocity.State.calls = compactSparseArray(Velocity.State.calls);
      }
      for (var i = 0; i < callsLength; i++) {
        if (!Velocity.State.calls[i]) {
          continue;
        }
        var callContainer = Velocity.State.calls[i],
            call = callContainer[0],
            opts = callContainer[2],
            timeStart = callContainer[3],
            firstTick = !!timeStart,
            tweenDummyValue = null;
        if (!timeStart) {
          timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
        }
        var percentComplete = Math.min((timeCurrent - timeStart) / opts.duration, 1);
        for (var j = 0,
            callLength = call.length; j < callLength; j++) {
          var tweensContainer = call[j],
              element = tweensContainer.element;
          if (!Data(element)) {
            continue;
          }
          var transformPropertyExists = false;
          if (opts.display !== undefined && opts.display !== null && opts.display !== "none") {
            if (opts.display === "flex") {
              var flexValues = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
              $.each(flexValues, function(i, flexValue) {
                CSS.setPropertyValue(element, "display", flexValue);
              });
            }
            CSS.setPropertyValue(element, "display", opts.display);
          }
          if (opts.visibility !== undefined && opts.visibility !== "hidden") {
            CSS.setPropertyValue(element, "visibility", opts.visibility);
          }
          for (var property in tweensContainer) {
            if (property !== "element") {
              var tween = tweensContainer[property],
                  currentValue,
                  easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;
              if (percentComplete === 1) {
                currentValue = tween.endValue;
              } else {
                var tweenDelta = tween.endValue - tween.startValue;
                currentValue = tween.startValue + (tweenDelta * easing(percentComplete, opts, tweenDelta));
                if (!firstTick && (currentValue === tween.currentValue)) {
                  continue;
                }
              }
              tween.currentValue = currentValue;
              if (property === "tween") {
                tweenDummyValue = currentValue;
              } else {
                if (CSS.Hooks.registered[property]) {
                  var hookRoot = CSS.Hooks.getRoot(property),
                      rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];
                  if (rootPropertyValueCache) {
                    tween.rootPropertyValue = rootPropertyValueCache;
                  }
                }
                var adjustedSetData = CSS.setPropertyValue(element, property, tween.currentValue + (parseFloat(currentValue) === 0 ? "" : tween.unitType), tween.rootPropertyValue, tween.scrollData);
                if (CSS.Hooks.registered[property]) {
                  if (CSS.Normalizations.registered[hookRoot]) {
                    Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
                  } else {
                    Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
                  }
                }
                if (adjustedSetData[0] === "transform") {
                  transformPropertyExists = true;
                }
              }
            }
          }
          if (opts.mobileHA) {
            if (Data(element).transformCache.translate3d === undefined) {
              Data(element).transformCache.translate3d = "(0px, 0px, 0px)";
              transformPropertyExists = true;
            }
          }
          if (transformPropertyExists) {
            CSS.flushTransformCache(element);
          }
        }
        if (opts.display !== undefined && opts.display !== "none") {
          Velocity.State.calls[i][2].display = false;
        }
        if (opts.visibility !== undefined && opts.visibility !== "hidden") {
          Velocity.State.calls[i][2].visibility = false;
        }
        if (opts.progress) {
          opts.progress.call(callContainer[1], callContainer[1], percentComplete, Math.max(0, (timeStart + opts.duration) - timeCurrent), timeStart, tweenDummyValue);
        }
        if (percentComplete === 1) {
          completeCall(i);
        }
      }
    }
    if (Velocity.State.isTicking) {
      ticker(tick);
    }
  }
  function completeCall(callIndex, isStopped) {
    if (!Velocity.State.calls[callIndex]) {
      return false;
    }
    var call = Velocity.State.calls[callIndex][0],
        elements = Velocity.State.calls[callIndex][1],
        opts = Velocity.State.calls[callIndex][2],
        resolver = Velocity.State.calls[callIndex][4];
    var remainingCallsExist = false;
    for (var i = 0,
        callLength = call.length; i < callLength; i++) {
      var element = call[i].element;
      if (!isStopped && !opts.loop) {
        if (opts.display === "none") {
          CSS.setPropertyValue(element, "display", opts.display);
        }
        if (opts.visibility === "hidden") {
          CSS.setPropertyValue(element, "visibility", opts.visibility);
        }
      }
      if (opts.loop !== true && ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))) {
        if (Data(element)) {
          Data(element).isAnimating = false;
          Data(element).rootPropertyValueCache = {};
          var transformHAPropertyExists = false;
          $.each(CSS.Lists.transforms3D, function(i, transformName) {
            var defaultValue = /^scale/.test(transformName) ? 1 : 0,
                currentValue = Data(element).transformCache[transformName];
            if (Data(element).transformCache[transformName] !== undefined && new RegExp("^\\(" + defaultValue + "[^.]").test(currentValue)) {
              transformHAPropertyExists = true;
              delete Data(element).transformCache[transformName];
            }
          });
          if (opts.mobileHA) {
            transformHAPropertyExists = true;
            delete Data(element).transformCache.translate3d;
          }
          if (transformHAPropertyExists) {
            CSS.flushTransformCache(element);
          }
          CSS.Values.removeClass(element, "velocity-animating");
        }
      }
      if (!isStopped && opts.complete && !opts.loop && (i === callLength - 1)) {
        try {
          opts.complete.call(elements, elements);
        } catch (error) {
          setTimeout(function() {
            throw error;
          }, 1);
        }
      }
      if (resolver && opts.loop !== true) {
        resolver(elements);
      }
      if (Data(element) && opts.loop === true && !isStopped) {
        $.each(Data(element).tweensContainer, function(propertyName, tweenContainer) {
          if (/^rotate/.test(propertyName) && parseFloat(tweenContainer.endValue) === 360) {
            tweenContainer.endValue = 0;
            tweenContainer.startValue = 360;
          }
          if (/^backgroundPosition/.test(propertyName) && parseFloat(tweenContainer.endValue) === 100 && tweenContainer.unitType === "%") {
            tweenContainer.endValue = 0;
            tweenContainer.startValue = 100;
          }
        });
        Velocity(element, "reverse", {
          loop: true,
          delay: opts.delay
        });
      }
      if (opts.queue !== false) {
        $.dequeue(element, opts.queue);
      }
    }
    Velocity.State.calls[callIndex] = false;
    for (var j = 0,
        callsLength = Velocity.State.calls.length; j < callsLength; j++) {
      if (Velocity.State.calls[j] !== false) {
        remainingCallsExist = true;
        break;
      }
    }
    if (remainingCallsExist === false) {
      Velocity.State.isTicking = false;
      delete Velocity.State.calls;
      Velocity.State.calls = [];
    }
  }
  global.Velocity = Velocity;
  if (global !== window) {
    global.fn.velocity = animate;
    global.fn.velocity.defaults = Velocity.defaults;
  }
  $.each(["Down", "Up"], function(i, direction) {
    Velocity.Redirects["slide" + direction] = function(element, options, elementsIndex, elementsSize, elements, promiseData) {
      var opts = $.extend({}, options),
          begin = opts.begin,
          complete = opts.complete,
          computedValues = {
            height: "",
            marginTop: "",
            marginBottom: "",
            paddingTop: "",
            paddingBottom: ""
          },
          inlineValues = {};
      if (opts.display === undefined) {
        opts.display = (direction === "Down" ? (Velocity.CSS.Values.getDisplayType(element) === "inline" ? "inline-block" : "block") : "none");
      }
      opts.begin = function() {
        begin && begin.call(elements, elements);
        for (var property in computedValues) {
          inlineValues[property] = element.style[property];
          var propertyValue = Velocity.CSS.getPropertyValue(element, property);
          computedValues[property] = (direction === "Down") ? [propertyValue, 0] : [0, propertyValue];
        }
        inlineValues.overflow = element.style.overflow;
        element.style.overflow = "hidden";
      };
      opts.complete = function() {
        for (var property in inlineValues) {
          element.style[property] = inlineValues[property];
        }
        complete && complete.call(elements, elements);
        promiseData && promiseData.resolver(elements);
      };
      Velocity(element, computedValues, opts);
    };
  });
  $.each(["In", "Out"], function(i, direction) {
    Velocity.Redirects["fade" + direction] = function(element, options, elementsIndex, elementsSize, elements, promiseData) {
      var opts = $.extend({}, options),
          propertiesMap = {opacity: (direction === "In") ? 1 : 0},
          originalComplete = opts.complete;
      if (elementsIndex !== elementsSize - 1) {
        opts.complete = opts.begin = null;
      } else {
        opts.complete = function() {
          if (originalComplete) {
            originalComplete.call(elements, elements);
          }
          promiseData && promiseData.resolver(elements);
        };
      }
      if (opts.display === undefined) {
        opts.display = (direction === "In" ? "auto" : "none");
      }
      Velocity(this, propertiesMap, opts);
    };
  });
  $.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    jswing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    easeInOutMaterial: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1)
        return c / 2 * t * t + b;
      return c / 4 * ((t -= 2) * t * t + 2) + b;
    },
    _default: "swing"
  };
  $.extend($.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
      return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1)
        return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1)
        return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1)
        return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1)
        return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
      return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
      return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
      if (t == 0)
        return b;
      if (t == d)
        return b + c;
      if ((t /= d / 2) < 1)
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1)
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0)
        return b;
      if ((t /= d) == 1)
        return b + c;
      if (!p)
        p = d * .3;
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0)
        return b;
      if ((t /= d) == 1)
        return b + c;
      if (!p)
        p = d * .3;
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0)
        return b;
      if ((t /= d / 2) == 2)
        return b + c;
      if (!p)
        p = d * (.3 * 1.5);
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
      if (t < 1)
        return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
      if (s == undefined)
        s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
      if (s == undefined)
        s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
      if (s == undefined)
        s = 1.70158;
      if ((t /= d / 2) < 1)
        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
      return c - $.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
      }
    },
    easeInOutBounce: function(x, t, b, c, d) {
      if (t < d / 2)
        return $.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
      return $.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
  });
  $.fn.animate = $.fn.velocity;
  $.fn.fadeOut = function(speed, easing, callback) {
    return this.each(function() {
      $(this).velocity({opacity: 'hide'}, speed, easing, callback);
    });
  };
  $.fn.fadeIn = function(speed, easing, callback) {
    return this.each(function() {
      $(this).velocity({opacity: 'show'}, speed, easing, callback);
    });
  };
  return $;
});

})();
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define("github:marioizquierdo/jquery.serializeJSON@2.7.2/jquery.serializejson.js", ["libs/jquery.js"], factory);
  } else if (typeof exports === 'object') {
    var jQuery = require('jquery');
    module.exports = factory(jQuery);
  } else {
    factory(window.jQuery || window.Zepto || window.$);
  }
}(function($) {
  "use strict";
  $.fn.serializeJSON = function(options) {
    var f,
        $form,
        opts,
        formAsArray,
        serializedObject,
        name,
        value,
        _obj,
        nameWithNoType,
        type,
        keys;
    f = $.serializeJSON;
    $form = this;
    opts = f.setupOpts(options);
    formAsArray = $form.serializeArray();
    f.readCheckboxUncheckedValues(formAsArray, opts, $form);
    serializedObject = {};
    $.each(formAsArray, function(i, obj) {
      name = obj.name;
      value = obj.value;
      _obj = f.extractTypeAndNameWithNoType(name);
      nameWithNoType = _obj.nameWithNoType;
      type = _obj.type;
      if (!type)
        type = f.tryToFindTypeFromDataAttr(name, $form);
      f.validateType(name, type, opts);
      if (type !== 'skip') {
        keys = f.splitInputNameIntoKeysArray(nameWithNoType);
        value = f.parseValue(value, name, type, opts);
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
          return $.serializeJSON.parseValue(str, null, null, {
            parseNumbers: true,
            parseBooleans: true,
            parseNulls: true
          });
        },
        "skip": null
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
    parseValue: function(valStr, inputName, type, opts) {
      var f,
          parsedVal;
      f = $.serializeJSON;
      parsedVal = valStr;
      if (opts.typeFunctions && type && opts.typeFunctions[type]) {
        parsedVal = opts.typeFunctions[type](valStr);
      } else if (opts.parseNumbers && f.isNumeric(valStr)) {
        parsedVal = Number(valStr);
      } else if (opts.parseBooleans && (valStr === "true" || valStr === "false")) {
        parsedVal = (valStr === "true");
      } else if (opts.parseNulls && valStr == "null") {
        parsedVal = null;
      }
      if (opts.parseWithFunction && !type) {
        parsedVal = opts.parseWithFunction(parsedVal, inputName);
      }
      return parsedVal;
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
    readCheckboxUncheckedValues: function(formAsArray, opts, $form) {
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
    },
    extractTypeAndNameWithNoType: function(name) {
      var match;
      if (match = name.match(/(.*):([^:]+)$/)) {
        return {
          nameWithNoType: match[1],
          type: match[2]
        };
      } else {
        return {
          nameWithNoType: name,
          type: null
        };
      }
    },
    tryToFindTypeFromDataAttr: function(name, $form) {
      var escapedName,
          selector,
          $input,
          typeFromDataAttr;
      escapedName = name.replace(/(:|\.|\[|\]|\s)/g, '\\$1');
      selector = '[name="' + escapedName + '"]';
      $input = $form.find(selector).add($form.filter(selector));
      typeFromDataAttr = $input.attr('data-value-type');
      return typeFromDataAttr || null;
    },
    validateType: function(name, type, opts) {
      var validTypes,
          f;
      f = $.serializeJSON;
      validTypes = f.optionKeys(opts ? opts.typeFunctions : f.defaultOptions.defaultTypes);
      if (!type || validTypes.indexOf(type) !== -1) {
        return true;
      } else {
        throw new Error("serializeJSON ERROR: Invalid type " + type + " found in input name '" + name + "', please use one of " + validTypes.join(', '));
      }
    },
    splitInputNameIntoKeysArray: function(nameWithNoType) {
      var keys,
          f;
      f = $.serializeJSON;
      keys = nameWithNoType.split('[');
      keys = $.map(keys, function(key) {
        return key.replace(/\]/g, '');
      });
      if (keys[0] === '') {
        keys.shift();
      }
      return keys;
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
    }
  };
}));

})();
(function() {
var define = $__System.amdDefine;
define("jquery_shim/index.js", ["libs/jquery.js", "github:components/jqueryui@1.12.0/ui/widget.js", "github:components/jqueryui@1.12.0/ui/widgets/mouse.js", "github:components/jqueryui@1.12.0/ui/position.js", "github:components/jqueryui@1.12.0/ui/widgets/draggable.js", "github:components/jqueryui@1.12.0/ui/widgets/droppable.js", "github:components/jqueryui@1.12.0/ui/widgets/resizable.js", "github:components/jqueryui@1.12.0/ui/widgets/selectable.js", "github:components/jqueryui@1.12.0/ui/widgets/sortable.js", "github:components/jqueryui@1.12.0/ui/widgets/progressbar.js", "jquery_shim/plugins/jquery.evol.colorpicker.js", "jquery_shim/plugins/jquery.ui.rotatable.js", "jquery_shim/plugins/jquery.ajax.progress.js", "jquery_shim/plugins/jquery.hotkeys.js", "github:carhartl/jquery-cookie@1.4.1/jquery.cookie.js", "github:huasofoundries/jquery.waitforChild@1.1.0/jquery.waitforChild.js", "github:marioizquierdo/jquery.serializeJSON@2.7.2/jquery.serializejson.js"], function(jQ2) {
  var $_GLOBAL = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : Function('return this')();
  $_GLOBAL.jQ2 = jQ2;
  return jQ2;
});

})();
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    jQuery = factory();
});