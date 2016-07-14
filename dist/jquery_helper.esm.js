!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return D(e.substr(6));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define("2", ["4", "3"], factory);
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
    define("5", ["4", "3"], factory);
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
    define("6", ["4", "3"], factory);
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
    define("7", ["4", "8", "9", "a", "5", "6", "b", "3", "c"], factory);
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
    define("d", ["4", "7", "8", "3", "c"], factory);
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
    define("e", ["4", "3"], factory);
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
    define("a", ["4", "3"], factory);
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
    define("f", ["4", "8", "e", "a", "3", "c"], factory);
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
    define("10", ["4", "8", "3", "c"], factory);
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
    define("9", ["4", "3"], factory);
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
    define("b", ["4", "3"], factory);
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
    define("11", ["4", "8", "9", "12", "b", "3", "c"], factory);
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
    define("13", ["4", "3", "c"], factory);
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
    define("14", ["4", "c", "8"], factory);
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
    define("12", ["4", "3"], factory);
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
    define("3", ["4"], factory);
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
    define("c", ["4", "3"], factory);
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
    define("8", ["4", "12", "3", "c"], factory);
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
    define("15", ["4", "c", "8"], factory);
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
    define("16", ["4"], factory);
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
    define("17", ["4"], factory);
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
    define("18", ["4"], factory);
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
    define("19", ["4"], factory);
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
(function() {
var define = $__System.amdDefine;
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define("1a", ["4"], factory);
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
define("1b", ["4", "c", "8", "2", "7", "d", "f", "10", "11", "13", "14", "15", "16", "17", "18", "19", "1a"], function(jQuery) {
  return jQuery;
});

})();
(function() {
var define = $__System.amdDefine;
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(global) : typeof define === 'function' && define.amd ? define("4", [], function() {
    return factory(global);
  }) : (global.jQuery = factory(global));
}(this, function($_GLOBAL) {
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
  jQuery.noConflict = function() {};
  if (!$_GLOBAL.noGlobal) {
    $_GLOBAL.jQuery = $_GLOBAL.$ = jQuery;
  }
  return jQuery;
}));

})();
$__System.register('1',['4','1b'],function(_export,_context){"use strict";var jQuery,jQuery$1,$_GLOBAL$2,document$2,IE,rAFShim,Type,$$2,isJQuery,DURATION_DEFAULT,EASING_DEFAULT,Velocity,generateSpringRK4,CSS,animate,ticker,velocityVersion,requiredVersion,abortError,effectName,$_GLOBAL$3,document$3,VENDOR_PREFIXES,TEST_ELEMENT,TYPE_FUNCTION,round,abs,now,assign,extend,merge,_uniqueId,MOBILE_REGEX,SUPPORT_TOUCH,SUPPORT_POINTER_EVENTS,SUPPORT_ONLY_TOUCH,INPUT_TYPE_TOUCH,INPUT_TYPE_PEN,INPUT_TYPE_MOUSE,INPUT_TYPE_KINECT,COMPUTE_INTERVAL,INPUT_START,INPUT_MOVE,INPUT_END,INPUT_CANCEL,DIRECTION_NONE,DIRECTION_LEFT,DIRECTION_RIGHT,DIRECTION_UP,DIRECTION_DOWN,DIRECTION_HORIZONTAL,DIRECTION_VERTICAL,DIRECTION_ALL,PROPS_XY,PROPS_CLIENT_XY,MOUSE_INPUT_MAP,MOUSE_ELEMENT_EVENTS,MOUSE_WINDOW_EVENTS,POINTER_INPUT_MAP,IE10_POINTER_TYPE_ENUM,POINTER_ELEMENT_EVENTS,POINTER_WINDOW_EVENTS,SINGLE_TOUCH_INPUT_MAP,SINGLE_TOUCH_TARGET_EVENTS,SINGLE_TOUCH_WINDOW_EVENTS,TOUCH_INPUT_MAP,TOUCH_TARGET_EVENTS,DEDUP_TIMEOUT,DEDUP_DISTANCE,PREFIXED_TOUCH_ACTION,NATIVE_TOUCH_ACTION,TOUCH_ACTION_COMPUTE,TOUCH_ACTION_AUTO,TOUCH_ACTION_MANIPULATION,TOUCH_ACTION_NONE,TOUCH_ACTION_PAN_X,TOUCH_ACTION_PAN_Y,TOUCH_ACTION_MAP,STATE_POSSIBLE,STATE_BEGAN,STATE_CHANGED,STATE_ENDED,STATE_RECOGNIZED,STATE_CANCELLED,STATE_FAILED,STOP,FORCED_STOP,$_GLOBAL$1,$$1,Materialize,_stack,_lastID,_generateID,repositionWithinScreen,sideNavmethods,jWindow,elements,elementsInView,isSpying,ticks,getTime,slidermethods,openFABMenu,closeFABMenu,guidfn,validate_field,Waves,document$1,$$,Effect,TouchHandler,$,$_GLOBAL;/* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */function compactSparseArray(array){var index=-1,length=array?array.length:0,result=[];while(++index<length){var value=array[index];if(value){result.push(value);}}return result;}function sanitizeElements(elements){/* Unwrap jQuery/Zepto objects. */if(Type.isWrapped(elements)){elements=[].slice.call(elements);/* Wrap a single element in an array so that $.each() can iterate with the element instead of its node's children. */}else if(Type.isNode(elements)){elements=[elements];}return elements;}/* Shorthand alias for jQuery's $.data() utility. */function Data(element){/* Hardcode a reference to the plugin name. */var response=$$2.data(element,"velocity");/* jQuery <=1.4.2 returns null instead of undefined when no match is found. We normalize this behavior. */return response===null?undefined:response;}/**************
        Easing
    **************//* Step easing generator. */function generateStep(steps){return function(p){return Math.round(p*steps)*(1/steps);};}/* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */function generateBezier(mX1,mY1,mX2,mY2){var NEWTON_ITERATIONS=4,NEWTON_MIN_SLOPE=0.001,SUBDIVISION_PRECISION=0.0000001,SUBDIVISION_MAX_ITERATIONS=10,kSplineTableSize=11,kSampleStepSize=1.0/(kSplineTableSize-1.0),float32ArraySupported="Float32Array"in $_GLOBAL$2;/* Must contain four arguments. */if(arguments.length!==4){return false;}/* Arguments must be numbers. */for(var i=0;i<4;++i){if(typeof arguments[i]!=="number"||isNaN(arguments[i])||!isFinite(arguments[i])){return false;}}/* X values must be in the [0, 1] range. */mX1=Math.min(mX1,1);mX2=Math.min(mX2,1);mX1=Math.max(mX1,0);mX2=Math.max(mX2,0);var mSampleValues=float32ArraySupported?new Float32Array(kSplineTableSize):new Array(kSplineTableSize);function A(aA1,aA2){return 1.0-3.0*aA2+3.0*aA1;}function B(aA1,aA2){return 3.0*aA2-6.0*aA1;}function C(aA1){return 3.0*aA1;}function calcBezier(aT,aA1,aA2){return((A(aA1,aA2)*aT+B(aA1,aA2))*aT+C(aA1))*aT;}function getSlope(aT,aA1,aA2){return 3.0*A(aA1,aA2)*aT*aT+2.0*B(aA1,aA2)*aT+C(aA1);}function newtonRaphsonIterate(aX,aGuessT){for(var i=0;i<NEWTON_ITERATIONS;++i){var currentSlope=getSlope(aGuessT,mX1,mX2);if(currentSlope===0.0)return aGuessT;var currentX=calcBezier(aGuessT,mX1,mX2)-aX;aGuessT-=currentX/currentSlope;}return aGuessT;}function calcSampleValues(){for(var i=0;i<kSplineTableSize;++i){mSampleValues[i]=calcBezier(i*kSampleStepSize,mX1,mX2);}}function binarySubdivide(aX,aA,aB){var currentX,currentT,i=0;do{currentT=aA+(aB-aA)/2.0;currentX=calcBezier(currentT,mX1,mX2)-aX;if(currentX>0.0){aB=currentT;}else{aA=currentT;}}while(Math.abs(currentX)>SUBDIVISION_PRECISION&&++i<SUBDIVISION_MAX_ITERATIONS);return currentT;}function getTForX(aX){var intervalStart=0.0,currentSample=1,lastSample=kSplineTableSize-1;for(;currentSample!=lastSample&&mSampleValues[currentSample]<=aX;++currentSample){intervalStart+=kSampleStepSize;}--currentSample;var dist=(aX-mSampleValues[currentSample])/(mSampleValues[currentSample+1]-mSampleValues[currentSample]),guessForT=intervalStart+dist*kSampleStepSize,initialSlope=getSlope(guessForT,mX1,mX2);if(initialSlope>=NEWTON_MIN_SLOPE){return newtonRaphsonIterate(aX,guessForT);}else if(initialSlope==0.0){return guessForT;}else{return binarySubdivide(aX,intervalStart,intervalStart+kSampleStepSize);}}var _precomputed=false;function precompute(){_precomputed=true;if(mX1!=mY1||mX2!=mY2)calcSampleValues();}var f=function f(aX){if(!_precomputed)precompute();if(mX1===mY1&&mX2===mY2)return aX;if(aX===0)return 0;if(aX===1)return 1;return calcBezier(getTForX(aX),mY1,mY2);};f.getControlPoints=function(){return[{x:mX1,y:mY1},{x:mX2,y:mY2}];};var str="generateBezier("+[mX1,mY1,mX2,mY2]+")";f.toString=function(){return str;};return f;}/* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License *//* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
       then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. *//* Determine the appropriate easing type given an easing input. */function getEasing(value,duration){var easing=value;/* The easing option can either be a string that references a pre-registered easing,
           or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */if(Type.isString(value)){/* Ensure that the easing has been assigned to jQuery's Velocity.Easings object. */if(!Velocity.Easings[value]){easing=false;}}else if(Type.isArray(value)&&value.length===1){easing=generateStep.apply(null,value);}else if(Type.isArray(value)&&value.length===2){/* springRK4 must be passed the animation's duration. *//* Note: If the springRK4 array contains non-numbers, generateSpringRK4() returns an easing
               function generated with default tension and friction values. */easing=generateSpringRK4.apply(null,value.concat([duration]));}else if(Type.isArray(value)&&value.length===4){/* Note: If the bezier array contains non-numbers, generateBezier() returns false. */easing=generateBezier.apply(null,value);}else{easing=false;}/* Revert to the Velocity-wide default easing type, or fall back to "swing" (which is also jQuery's default)
           if the Velocity-wide default has been incorrectly modified. */if(easing===false){if(Velocity.Easings[Velocity.defaults.easing]){easing=Velocity.defaults.easing;}else{easing=EASING_DEFAULT;}}return easing;}/*****************
        CSS Stack
    *****************//* The CSS object is a highly condensed and performant CSS stack that fully replaces jQuery's.
       It handles the validation, getting, and setting of both standard CSS properties and CSS property hooks. *//* Note: A "CSS" shorthand is aliased so that our code is easier to read. *//************
        Tick
    ************//* Note: All calls to Velocity are pushed to the Velocity.State.calls array, which is fully iterated through upon each tick. */function tick(timestamp){/* An empty timestamp argument indicates that this is the first tick occurence since ticking was turned on.
           We leverage this metadata to fully ignore the first tick pass since RAF's initial pass is fired whenever
           the browser's next tick sync time occurs, which results in the first elements subjected to Velocity
           calls being animated out of sync with any elements animated immediately thereafter. In short, we ignore
           the first RAF tick pass so that elements being immediately consecutively animated -- instead of simultaneously animated
           by the same Velocity call -- are properly batched into the same initial RAF tick and consequently remain in sync thereafter. */if(timestamp){/* We ignore RAF's high resolution timestamp since it can be significantly offset when the browser is
               under high stress; we opt for choppiness over allowing the browser to drop huge chunks of frames. */var timeCurrent=new Date().getTime();/********************
               Call Iteration
            ********************/var callsLength=Velocity.State.calls.length;/* To speed up iterating over this array, it is compacted (falsey items -- calls that have completed -- are removed)
               when its length has ballooned to a point that can impact tick performance. This only becomes necessary when animation
               has been continuous with many elements over a long period of time; whenever all active calls are completed, completeCall() clears Velocity.State.calls. */if(callsLength>10000){Velocity.State.calls=compactSparseArray(Velocity.State.calls);}/* Iterate through each active call. */for(var i=0;i<callsLength;i++){/* When a Velocity call is completed, its Velocity.State.calls entry is set to false. Continue on to the next call. */if(!Velocity.State.calls[i]){continue;}/************************
                   Call-Wide Variables
                ************************/var callContainer=Velocity.State.calls[i],call=callContainer[0],opts=callContainer[2],timeStart=callContainer[3],firstTick=!!timeStart,tweenDummyValue=null;/* If timeStart is undefined, then this is the first time that this call has been processed by tick().
                   We assign timeStart now so that its value is as close to the real animation start time as possible.
                   (Conversely, had timeStart been defined when this call was added to Velocity.State.calls, the delay
                   between that time and now would cause the first few frames of the tween to be skipped since
                   percentComplete is calculated relative to timeStart.) *//* Further, subtract 16ms (the approximate resolution of RAF) from the current time value so that the
                   first tick iteration isn't wasted by animating at 0% tween completion, which would produce the
                   same style value as the element's current value. */if(!timeStart){timeStart=Velocity.State.calls[i][3]=timeCurrent-16;}/* The tween's completion percentage is relative to the tween's start time, not the tween's start value
                   (which would result in unpredictable tween durations since JavaScript's timers are not particularly accurate).
                   Accordingly, we ensure that percentComplete does not exceed 1. */var percentComplete=Math.min((timeCurrent-timeStart)/opts.duration,1);/**********************
                   Element Iteration
                **********************//* For every call, iterate through each of the elements in its set. */for(var j=0,callLength=call.length;j<callLength;j++){var tweensContainer=call[j],element=tweensContainer.element;/* Check to see if this element has been deleted midway through the animation by checking for the
                       continued existence of its data cache. If it's gone, skip animating this element. */if(!Data(element)){continue;}var transformPropertyExists=false;/**********************************
                       Display & Visibility Toggling
                    **********************************//* If the display option is set to non-"none", set it upfront so that the element can become visible before tweening begins.
                       (Otherwise, display's "none" value is set in completeCall() once the animation has completed.) */if(opts.display!==undefined&&opts.display!==null&&opts.display!=="none"){if(opts.display==="flex"){var flexValues=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];$$2.each(flexValues,function(i,flexValue){CSS.setPropertyValue(element,"display",flexValue);});}CSS.setPropertyValue(element,"display",opts.display);}/* Same goes with the visibility option, but its "none" equivalent is "hidden". */if(opts.visibility!==undefined&&opts.visibility!=="hidden"){CSS.setPropertyValue(element,"visibility",opts.visibility);}/************************
                       Property Iteration
                    ************************//* For every element, iterate through each property. */for(var property in tweensContainer){/* Note: In addition to property tween data, tweensContainer contains a reference to its associated element. */if(property!=="element"){var tween=tweensContainer[property],currentValue,/* Easing can either be a pre-genereated function or a string that references a pre-registered easing
                                   on the Velocity.Easings object. In either case, return the appropriate easing *function*. */easing=Type.isString(tween.easing)?Velocity.Easings[tween.easing]:tween.easing;/******************************
                               Current Value Calculation
                            ******************************//* If this is the last tick pass (if we've reached 100% completion for this tween),
                               ensure that currentValue is explicitly set to its target endValue so that it's not subjected to any rounding. */if(percentComplete===1){currentValue=tween.endValue;/* Otherwise, calculate currentValue based on the current delta from startValue. */}else{var tweenDelta=tween.endValue-tween.startValue;currentValue=tween.startValue+tweenDelta*easing(percentComplete,opts,tweenDelta);/* If no value change is occurring, don't proceed with DOM updating. */if(!firstTick&&currentValue===tween.currentValue){continue;}}tween.currentValue=currentValue;/* If we're tweening a fake 'tween' property in order to log transition values, update the one-per-call variable so that
                               it can be passed into the progress callback. */if(property==="tween"){tweenDummyValue=currentValue;}else{/******************
                                   Hooks: Part I
                                ******************//* For hooked properties, the newly-updated rootPropertyValueCache is cached onto the element so that it can be used
                                   for subsequent hooks in this call that are associated with the same root property. If we didn't cache the updated
                                   rootPropertyValue, each subsequent update to the root property in this tick pass would reset the previous hook's
                                   updates to rootPropertyValue prior to injection. A nice performance byproduct of rootPropertyValue caching is that
                                   subsequently chained animations using the same hookRoot but a different hook can use this cached rootPropertyValue. */if(CSS.Hooks.registered[property]){var hookRoot=CSS.Hooks.getRoot(property),rootPropertyValueCache=Data(element).rootPropertyValueCache[hookRoot];if(rootPropertyValueCache){tween.rootPropertyValue=rootPropertyValueCache;}}/*****************
                                    DOM Update
                                *****************//* setPropertyValue() returns an array of the property name and property value post any normalization that may have been performed. *//* Note: To solve an IE<=8 positioning bug, the unit type is dropped when setting a property value of 0. */var adjustedSetData=CSS.setPropertyValue(element,/* SET */property,tween.currentValue+(parseFloat(currentValue)===0?"":tween.unitType),tween.rootPropertyValue,tween.scrollData);/*******************
                                   Hooks: Part II
                                *******************//* Now that we have the hook's updated rootPropertyValue (the post-processed value provided by adjustedSetData), cache it onto the element. */if(CSS.Hooks.registered[property]){/* Since adjustedSetData contains normalized data ready for DOM updating, the rootPropertyValue needs to be re-extracted from its normalized form. ?? */if(CSS.Normalizations.registered[hookRoot]){Data(element).rootPropertyValueCache[hookRoot]=CSS.Normalizations.registered[hookRoot]("extract",null,adjustedSetData[1]);}else{Data(element).rootPropertyValueCache[hookRoot]=adjustedSetData[1];}}/***************
                                   Transforms
                                ***************//* Flag whether a transform property is being animated so that flushTransformCache() can be triggered once this tick pass is complete. */if(adjustedSetData[0]==="transform"){transformPropertyExists=true;}}}}/****************
                        mobileHA
                    ****************//* If mobileHA is enabled, set the translate3d transform to null to force hardware acceleration.
                       It's safe to override this property since Velocity doesn't actually support its animation (hooks are used in its place). */if(opts.mobileHA){/* Don't set the null transform hack if we've already done so. */if(Data(element).transformCache.translate3d===undefined){/* All entries on the transformCache object are later concatenated into a single transform string via flushTransformCache(). */Data(element).transformCache.translate3d="(0px, 0px, 0px)";transformPropertyExists=true;}}if(transformPropertyExists){CSS.flushTransformCache(element);}}/* The non-"none" display value is only applied to an element once -- when its associated call is first ticked through.
                   Accordingly, it's set to false so that it isn't re-processed by this call in the next tick. */if(opts.display!==undefined&&opts.display!=="none"){Velocity.State.calls[i][2].display=false;}if(opts.visibility!==undefined&&opts.visibility!=="hidden"){Velocity.State.calls[i][2].visibility=false;}/* Pass the elements and the timing data (percentComplete, msRemaining, timeStart, tweenDummyValue) into the progress callback. */if(opts.progress){opts.progress.call(callContainer[1],callContainer[1],percentComplete,Math.max(0,timeStart+opts.duration-timeCurrent),timeStart,tweenDummyValue);}/* If this call has finished tweening, pass its index to completeCall() to handle call cleanup. */if(percentComplete===1){completeCall(i);}}}/* Note: completeCall() sets the isTicking flag to false when the last call on Velocity.State.calls has completed. */if(Velocity.State.isTicking){ticker(tick);}}/**********************
        Call Completion
    **********************//* Note: Unlike tick(), which processes all active calls at once, call completion is handled on a per-call basis. */function completeCall(callIndex,isStopped){/* Ensure the call exists. */if(!Velocity.State.calls[callIndex]){return false;}/* Pull the metadata from the call. */var call=Velocity.State.calls[callIndex][0],elements=Velocity.State.calls[callIndex][1],opts=Velocity.State.calls[callIndex][2],resolver=Velocity.State.calls[callIndex][4];var remainingCallsExist=false;/*************************
           Element Finalization
        *************************/for(var i=0,callLength=call.length;i<callLength;i++){var element=call[i].element;/* If the user set display to "none" (intending to hide the element), set it now that the animation has completed. *//* Note: display:none isn't set when calls are manually stopped (via Velocity("stop"). *//* Note: Display gets ignored with "reverse" calls and infinite loops, since this behavior would be undesirable. */if(!isStopped&&!opts.loop){if(opts.display==="none"){CSS.setPropertyValue(element,"display",opts.display);}if(opts.visibility==="hidden"){CSS.setPropertyValue(element,"visibility",opts.visibility);}}/* If the element's queue is empty (if only the "inprogress" item is left at position 0) or if its queue is about to run
               a non-Velocity-initiated entry, turn off the isAnimating flag. A non-Velocity-initiatied queue entry's logic might alter
               an element's CSS values and thereby cause Velocity's cached value data to go stale. To detect if a queue entry was initiated by Velocity,
               we check for the existence of our special Velocity.queueEntryFlag declaration, which minifiers won't rename since the flag
               is assigned to jQuery's jQuery $ object and thus exists out of Velocity's own scope. */if(opts.loop!==true&&($$2.queue(element)[1]===undefined||!/\.velocityQueueEntryFlag/i.test($$2.queue(element)[1]))){/* The element may have been deleted. Ensure that its data cache still exists before acting on it. */if(Data(element)){Data(element).isAnimating=false;/* Clear the element's rootPropertyValueCache, which will become stale. */Data(element).rootPropertyValueCache={};var transformHAPropertyExists=false;/* If any 3D transform subproperty is at its default value (regardless of unit type), remove it. */$$2.each(CSS.Lists.transforms3D,function(i,transformName){var defaultValue=/^scale/.test(transformName)?1:0,currentValue=Data(element).transformCache[transformName];if(Data(element).transformCache[transformName]!==undefined&&new RegExp("^\\("+defaultValue+"[^.]").test(currentValue)){transformHAPropertyExists=true;delete Data(element).transformCache[transformName];}});/* Mobile devices have hardware acceleration removed at the end of the animation in order to avoid hogging the GPU's memory. */if(opts.mobileHA){transformHAPropertyExists=true;delete Data(element).transformCache.translate3d;}/* Flush the subproperty removals to the DOM. */if(transformHAPropertyExists){CSS.flushTransformCache(element);}/* Remove the "velocity-animating" indicator class. */CSS.Values.removeClass(element,"velocity-animating");}}/*********************
               Option: Complete
            *********************//* Complete is fired once per call (not once per element) and is passed the full raw DOM element set as both its context and its first argument. *//* Note: Callbacks aren't fired when calls are manually stopped (via Velocity("stop"). */if(!isStopped&&opts.complete&&!opts.loop&&i===callLength-1){/* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */try{opts.complete.call(elements,elements);}catch(error){setTimeout(function(){throw error;},1);}}/**********************
               Promise Resolving
            **********************//* Note: Infinite loops don't return promises. */if(resolver&&opts.loop!==true){resolver(elements);}/****************************
               Option: Loop (Infinite)
            ****************************/if(Data(element)&&opts.loop===true&&!isStopped){/* If a rotateX/Y/Z property is being animated to 360 deg with loop:true, swap tween start/end values to enable
                   continuous iterative rotation looping. (Otherise, the element would just rotate back and forth.) */$$2.each(Data(element).tweensContainer,function(propertyName,tweenContainer){if(/^rotate/.test(propertyName)&&parseFloat(tweenContainer.endValue)===360){tweenContainer.endValue=0;tweenContainer.startValue=360;}if(/^backgroundPosition/.test(propertyName)&&parseFloat(tweenContainer.endValue)===100&&tweenContainer.unitType==="%"){tweenContainer.endValue=0;tweenContainer.startValue=100;}});Velocity(element,"reverse",{loop:true,delay:opts.delay});}/***************
               Dequeueing
            ***************//* Fire the next call in the queue so long as this call's queue wasn't set to false (to trigger a parallel animation),
               which would have already caused the next call to fire. Note: Even if the end of the animation queue has been reached,
               $.dequeue() must still be called in order to completely clear jQuery's animation queue. */if(opts.queue!==false){$$2.dequeue(element,opts.queue);}}/************************
           Calls Array Cleanup
        ************************//* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
          (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */Velocity.State.calls[callIndex]=false;/* Iterate through the calls array to determine if this was the final in-progress animation.
           If so, set a flag to end ticking and clear the calls array. */for(var j=0,callsLength=Velocity.State.calls.length;j<callsLength;j++){if(Velocity.State.calls[j]!==false){remainingCallsExist=true;break;}}if(remainingCallsExist===false){/* tick() will detect this flag upon its next iteration and subsequently turn itself off. */Velocity.State.isTicking=false;/* Clear the calls array so that its length is reset. */delete Velocity.State.calls;Velocity.State.calls=[];}}/******************
        Frameworks
    ******************//* Both jQuery and Zepto allow their $.fn object to be extended to allow wrapped elements to be subjected to plugin calls.
       If either framework is loaded, register a "velocity" extension pointing to Velocity's core animate() method.  Velocity
       also registers itself onto a jQuery container ($_GLOBAL.jQuery || $_GLOBAL.Zepto || $_GLOBAL) so that certain features are
       accessible beyond just a per-element scope. This master object contains an .animate() method, which is later assigned to $.fn
       (if jQuery or Zepto are present). Accordingly, Velocity can both act on wrapped DOM elements and stand alone for targeting raw DOM elements. */function greaterSemver(primary,secondary){var versionInts=[];if(!primary||!secondary){return false;}$$2.each([primary,secondary],function(i,versionObject){var versionIntsComponents=[];$$2.each(versionObject,function(component,value){while(value.toString().length<5){value="0"+value;}versionIntsComponents.push(value);});versionInts.push(versionIntsComponents.join(""));});return parseFloat(versionInts[0])>parseFloat(versionInts[1]);}/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */function setTimeoutContext(fn,timeout,context){return setTimeout(bindFn(fn,context),timeout);}/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */function invokeArrayArg(arg,fn,context){if(Array.isArray(arg)){each(arg,context[fn],context);return true;}return false;}/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */function each(obj,iterator,context){var i;if(!obj){return;}if(obj.forEach){obj.forEach(iterator,context);}else if(obj.length!==undefined){i=0;while(i<obj.length){iterator.call(context,obj[i],i,obj);i++;}}else{for(i in obj){obj.hasOwnProperty(i)&&iterator.call(context,obj[i],i,obj);}}}/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */function deprecate(method,name,message){var deprecationMessage='DEPRECATED METHOD: '+name+'\n'+message+' AT \n';return function(){var e=new Error('get-stack-trace');var stack=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,'').replace(/^\s+at\s+/gm,'').replace(/^Object.<anonymous>\s*\(/gm,'{anonymous}()@'):'Unknown Stack Trace';var log=$_GLOBAL$3.console&&(window.console.warn||window.console.log);if(log){log.call(window.console,deprecationMessage,stack);}return method.apply(this,arguments);};}/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 *//**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */function inherit(child,base,properties){var baseP=base.prototype,childP;childP=child.prototype=Object.create(baseP);childP.constructor=child;childP._super=baseP;if(properties){assign(childP,properties);}}/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */function bindFn(fn,context){return function boundFn(){return fn.apply(context,arguments);};}/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */function boolOrFn(val,args){if(typeof val==TYPE_FUNCTION){return val.apply(args?args[0]||undefined:undefined,args);}return val;}/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */function ifUndefined(val1,val2){return val1===undefined?val2:val1;}/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */function addEventListeners(target,types,handler){each(splitStr(types),function(type){target.addEventListener(type,handler,false);});}/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */function removeEventListeners(target,types,handler){each(splitStr(types),function(type){target.removeEventListener(type,handler,false);});}/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */function hasParent(node,parent){while(node){if(node==parent){return true;}node=node.parentNode;}return false;}/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */function inStr(str,find){return str.indexOf(find)>-1;}/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */function splitStr(str){return str.trim().split(/\s+/g);}/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */function inArray(src,find,findByKey){if(src.indexOf&&!findByKey){return src.indexOf(find);}else{var i=0;while(i<src.length){if(findByKey&&src[i][findByKey]==find||!findByKey&&src[i]===find){return i;}i++;}return-1;}}/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */function toArray(obj){return Array.prototype.slice.call(obj,0);}/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */function uniqueArray(src,key,sort){var results=[];var values=[];var i=0;while(i<src.length){var val=key?src[i][key]:src[i];if(inArray(values,val)<0){results.push(src[i]);}values[i]=val;i++;}if(sort){if(!key){results=results.sort();}else{results=results.sort(function sortUniqueArray(a,b){return a[key]>b[key];});}}return results;}/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */function prefixed(obj,property){var prefix,prop;var camelProp=property[0].toUpperCase()+property.slice(1);var i=0;while(i<VENDOR_PREFIXES.length){prefix=VENDOR_PREFIXES[i];prop=prefix?prefix+camelProp:property;if(prop in obj){return prop;}i++;}return undefined;}/**
 * get a unique id
 * @returns {number} uniqueId
 */function uniqueId(){return _uniqueId++;}/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */function getWindowForElement(element){var doc=element.ownerDocument||element;return doc.defaultView||doc.parentWindow||window;}/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */function Input(manager,callback){var self=this;this.manager=manager;this.callback=callback;this.element=manager.element;this.target=manager.options.inputTarget;// smaller wrapper around the handler, for the scope and the enabled state of the manager,
// so when disabled the input events are completely bypassed.
this.domHandler=function(ev){if(boolOrFn(manager.options.enable,[manager])){self.handler(ev);}};this.init();}/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */function createInputInstance(manager){var Type;var inputClass=manager.options.inputClass;if(inputClass){Type=inputClass;}else if(SUPPORT_POINTER_EVENTS){Type=PointerEventInput;}else if(SUPPORT_ONLY_TOUCH){Type=TouchInput;}else if(!SUPPORT_TOUCH){Type=MouseInput;}else{Type=TouchMouseInput;}return new Type(manager,inputHandler);}/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */function inputHandler(manager,eventType,input){var pointersLen=input.pointers.length;var changedPointersLen=input.changedPointers.length;var isFirst=eventType&INPUT_START&&pointersLen-changedPointersLen===0;var isFinal=eventType&(INPUT_END|INPUT_CANCEL)&&pointersLen-changedPointersLen===0;input.isFirst=!!isFirst;input.isFinal=!!isFinal;if(isFirst){manager.session={};}// source event is the normalized value of the domEvents
// like 'touchstart, mouseup, pointerdown'
input.eventType=eventType;// compute scale, rotation etc
computeInputData(manager,input);// emit secret event
manager.emit('hammer.input',input);manager.recognize(input);manager.session.prevInput=input;}/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */function computeInputData(manager,input){var session=manager.session;var pointers=input.pointers;var pointersLength=pointers.length;// store the first input to calculate the distance and direction
if(!session.firstInput){session.firstInput=simpleCloneInputData(input);}// to compute scale and rotation we need to store the multiple touches
if(pointersLength>1&&!session.firstMultiple){session.firstMultiple=simpleCloneInputData(input);}else if(pointersLength===1){session.firstMultiple=false;}var firstInput=session.firstInput;var firstMultiple=session.firstMultiple;var offsetCenter=firstMultiple?firstMultiple.center:firstInput.center;var center=input.center=getCenter(pointers);input.timeStamp=now();input.deltaTime=input.timeStamp-firstInput.timeStamp;input.angle=getAngle(offsetCenter,center);input.distance=getDistance(offsetCenter,center);computeDeltaXY(session,input);input.offsetDirection=getDirection(input.deltaX,input.deltaY);var overallVelocity=getVelocity(input.deltaTime,input.deltaX,input.deltaY);input.overallVelocityX=overallVelocity.x;input.overallVelocityY=overallVelocity.y;input.overallVelocity=abs(overallVelocity.x)>abs(overallVelocity.y)?overallVelocity.x:overallVelocity.y;input.scale=firstMultiple?getScale(firstMultiple.pointers,pointers):1;input.rotation=firstMultiple?getRotation(firstMultiple.pointers,pointers):0;input.maxPointers=!session.prevInput?input.pointers.length:input.pointers.length>session.prevInput.maxPointers?input.pointers.length:session.prevInput.maxPointers;computeIntervalInputData(session,input);// find the correct target
var target=manager.element;if(hasParent(input.srcEvent.target,target)){target=input.srcEvent.target;}input.target=target;}function computeDeltaXY(session,input){var center=input.center;var offset=session.offsetDelta||{};var prevDelta=session.prevDelta||{};var prevInput=session.prevInput||{};if(input.eventType===INPUT_START||prevInput.eventType===INPUT_END){prevDelta=session.prevDelta={x:prevInput.deltaX||0,y:prevInput.deltaY||0};offset=session.offsetDelta={x:center.x,y:center.y};}input.deltaX=prevDelta.x+(center.x-offset.x);input.deltaY=prevDelta.y+(center.y-offset.y);}/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */function computeIntervalInputData(session,input){var last=session.lastInterval||input,deltaTime=input.timeStamp-last.timeStamp,velocity,velocityX,velocityY,direction;if(input.eventType!=INPUT_CANCEL&&(deltaTime>COMPUTE_INTERVAL||last.velocity===undefined)){var deltaX=input.deltaX-last.deltaX;var deltaY=input.deltaY-last.deltaY;var v=getVelocity(deltaTime,deltaX,deltaY);velocityX=v.x;velocityY=v.y;velocity=abs(v.x)>abs(v.y)?v.x:v.y;direction=getDirection(deltaX,deltaY);session.lastInterval=input;}else{// use latest velocity info if it doesn't overtake a minimum period
velocity=last.velocity;velocityX=last.velocityX;velocityY=last.velocityY;direction=last.direction;}input.velocity=velocity;input.velocityX=velocityX;input.velocityY=velocityY;input.direction=direction;}/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */function simpleCloneInputData(input){// make a simple copy of the pointers because we will get a reference if we don't
// we only need clientXY for the calculations
var pointers=[];var i=0;while(i<input.pointers.length){pointers[i]={clientX:round(input.pointers[i].clientX),clientY:round(input.pointers[i].clientY)};i++;}return{timeStamp:now(),pointers:pointers,center:getCenter(pointers),deltaX:input.deltaX,deltaY:input.deltaY};}/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */function getCenter(pointers){var pointersLength=pointers.length;// no need to loop when only one touch
if(pointersLength===1){return{x:round(pointers[0].clientX),y:round(pointers[0].clientY)};}var x=0,y=0,i=0;while(i<pointersLength){x+=pointers[i].clientX;y+=pointers[i].clientY;i++;}return{x:round(x/pointersLength),y:round(y/pointersLength)};}/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */function getVelocity(deltaTime,x,y){return{x:x/deltaTime||0,y:y/deltaTime||0};}/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */function getDirection(x,y){if(x===y){return DIRECTION_NONE;}if(abs(x)>=abs(y)){return x<0?DIRECTION_LEFT:DIRECTION_RIGHT;}return y<0?DIRECTION_UP:DIRECTION_DOWN;}/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */function getDistance(p1,p2,props){if(!props){props=PROPS_XY;}var x=p2[props[0]]-p1[props[0]],y=p2[props[1]]-p1[props[1]];return Math.sqrt(x*x+y*y);}/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */function getAngle(p1,p2,props){if(!props){props=PROPS_XY;}var x=p2[props[0]]-p1[props[0]],y=p2[props[1]]-p1[props[1]];return Math.atan2(y,x)*180/Math.PI;}/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */function getRotation(start,end){return getAngle(end[1],end[0],PROPS_CLIENT_XY)+getAngle(start[1],start[0],PROPS_CLIENT_XY);}/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */function getScale(start,end){return getDistance(end[0],end[1],PROPS_CLIENT_XY)/getDistance(start[0],start[1],PROPS_CLIENT_XY);}/**
 * Mouse events input
 * @constructor
 * @extends Input
 */function MouseInput(){this.evEl=MOUSE_ELEMENT_EVENTS;this.evWin=MOUSE_WINDOW_EVENTS;this.pressed=false;// mousedown state
Input.apply(this,arguments);}/**
 * Pointer events input
 * @constructor
 * @extends Input
 */function PointerEventInput(){this.evEl=POINTER_ELEMENT_EVENTS;this.evWin=POINTER_WINDOW_EVENTS;Input.apply(this,arguments);this.store=this.manager.session.pointerEvents=[];}/**
 * Touch events input
 * @constructor
 * @extends Input
 */function SingleTouchInput(){this.evTarget=SINGLE_TOUCH_TARGET_EVENTS;this.evWin=SINGLE_TOUCH_WINDOW_EVENTS;this.started=false;Input.apply(this,arguments);}/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */function normalizeSingleTouches(ev,type){var all=toArray(ev.touches);var changed=toArray(ev.changedTouches);if(type&(INPUT_END|INPUT_CANCEL)){all=uniqueArray(all.concat(changed),'identifier',true);}return[all,changed];}/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */function TouchInput(){this.evTarget=TOUCH_TARGET_EVENTS;this.targetIds={};Input.apply(this,arguments);}/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */function getTouches(ev,type){var allTouches=toArray(ev.touches);var targetIds=this.targetIds;// when there is only one touch, the process can be simplified
if(type&(INPUT_START|INPUT_MOVE)&&allTouches.length===1){targetIds[allTouches[0].identifier]=true;return[allTouches,allTouches];}var i,targetTouches,changedTouches=toArray(ev.changedTouches),changedTargetTouches=[],target=this.target;// get target touches from touches
targetTouches=allTouches.filter(function(touch){return hasParent(touch.target,target);});// collect touches
if(type===INPUT_START){i=0;while(i<targetTouches.length){targetIds[targetTouches[i].identifier]=true;i++;}}// filter changed touches to only contain touches that exist in the collected target ids
i=0;while(i<changedTouches.length){if(targetIds[changedTouches[i].identifier]){changedTargetTouches.push(changedTouches[i]);}// cleanup removed touches
if(type&(INPUT_END|INPUT_CANCEL)){delete targetIds[changedTouches[i].identifier];}i++;}if(!changedTargetTouches.length){return;}return[// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
uniqueArray(targetTouches.concat(changedTargetTouches),'identifier',true),changedTargetTouches];}function TouchMouseInput(){Input.apply(this,arguments);var handler=bindFn(this.handler,this);this.touch=new TouchInput(this.manager,handler);this.mouse=new MouseInput(this.manager,handler);this.primaryTouch=null;this.lastTouches=[];}function recordTouches(eventType,eventData){if(eventType&INPUT_START){this.primaryTouch=eventData.changedPointers[0].identifier;setLastTouch.call(this,eventData);}else if(eventType&(INPUT_END|INPUT_CANCEL)){setLastTouch.call(this,eventData);}}function setLastTouch(eventData){var touch=eventData.changedPointers[0];if(touch.identifier===this.primaryTouch){var lastTouch={x:touch.clientX,y:touch.clientY};this.lastTouches.push(lastTouch);var lts=this.lastTouches;var removeLastTouch=function removeLastTouch(){var i=lts.indexOf(lastTouch);if(i>-1){lts.splice(i,1);}};setTimeout(removeLastTouch,DEDUP_TIMEOUT);}}function isSyntheticEvent(eventData){var x=eventData.srcEvent.clientX,y=eventData.srcEvent.clientY;for(var i=0;i<this.lastTouches.length;i++){var t=this.lastTouches[i];var dx=Math.abs(x-t.x),dy=Math.abs(y-t.y);if(dx<=DEDUP_DISTANCE&&dy<=DEDUP_DISTANCE){return true;}}return false;}/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */function TouchAction(manager,value){this.manager=manager;this.set(value);}/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */function cleanTouchActions(actions){// none
if(inStr(actions,TOUCH_ACTION_NONE)){return TOUCH_ACTION_NONE;}var hasPanX=inStr(actions,TOUCH_ACTION_PAN_X);var hasPanY=inStr(actions,TOUCH_ACTION_PAN_Y);// if both pan-x and pan-y are set (different recognizers
// for different directions, e.g. horizontal pan but vertical swipe?)
// we need none (as otherwise with pan-x pan-y combined none of these
// recognizers will work, since the browser would handle all panning
if(hasPanX&&hasPanY){return TOUCH_ACTION_NONE;}// pan-x OR pan-y
if(hasPanX||hasPanY){return hasPanX?TOUCH_ACTION_PAN_X:TOUCH_ACTION_PAN_Y;}// manipulation
if(inStr(actions,TOUCH_ACTION_MANIPULATION)){return TOUCH_ACTION_MANIPULATION;}return TOUCH_ACTION_AUTO;}function getTouchActionProps(){if(!NATIVE_TOUCH_ACTION){return false;}var touchMap={};var cssSupports=$_GLOBAL$3.CSS&&window.CSS.supports;['auto','manipulation','pan-y','pan-x','pan-x pan-y','none'].forEach(function(val){// If css.supports is not supported but there is native touch-action assume it supports
// all values. This is the case for IE 10 and 11.
touchMap[val]=cssSupports?window.CSS.supports('touch-action',val):true;});return touchMap;}/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */function Recognizer(options){this.options=assign({},this.defaults,options||{});this.id=uniqueId();this.manager=null;// default is enable true
this.options.enable=ifUndefined(this.options.enable,true);this.state=STATE_POSSIBLE;this.simultaneous={};this.requireFail=[];}/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */function stateStr(state){if(state&STATE_CANCELLED){return'cancel';}else if(state&STATE_ENDED){return'end';}else if(state&STATE_CHANGED){return'move';}else if(state&STATE_BEGAN){return'start';}return'';}/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */function directionStr(direction){if(direction==DIRECTION_DOWN){return'down';}else if(direction==DIRECTION_UP){return'up';}else if(direction==DIRECTION_LEFT){return'left';}else if(direction==DIRECTION_RIGHT){return'right';}return'';}/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */function getRecognizerByNameIfManager(otherRecognizer,recognizer){var manager=recognizer.manager;if(manager){return manager.get(otherRecognizer);}return otherRecognizer;}function AttrRecognizer(){Recognizer.apply(this,arguments);}function PanRecognizer(){AttrRecognizer.apply(this,arguments);this.pX=null;this.pY=null;}function PinchRecognizer(){AttrRecognizer.apply(this,arguments);}function PressRecognizer(){Recognizer.apply(this,arguments);this._timer=null;this._input=null;}function RotateRecognizer(){AttrRecognizer.apply(this,arguments);}function SwipeRecognizer(){AttrRecognizer.apply(this,arguments);}function TapRecognizer(){Recognizer.apply(this,arguments);// previous time and center,
// used for tap counting
this.pTime=false;this.pCenter=false;this._timer=null;this._input=null;this.count=0;}function Hammer(element,options){options=options||{};options.recognizers=ifUndefined(options.recognizers,Hammer.defaults.preset);return new Manager(element,options);}/**
 * @const {string}
 *//**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */function Manager(element,options){this.options=assign({},Hammer.defaults,options||{});this.options.inputTarget=this.options.inputTarget||element;this.handlers={};this.session={};this.recognizers=[];this.oldCssProps={};this.element=element;this.input=createInputInstance(this);this.touchAction=new TouchAction(this,this.options.touchAction);toggleCssProps(this,true);each(this.options.recognizers,function(item){var recognizer=this.add(new item[0](item[1]));item[2]&&recognizer.recognizeWith(item[2]);item[3]&&recognizer.requireFailure(item[3]);},this);}/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */function toggleCssProps(manager,add){var element=manager.element;if(!element.style){return;}var prop;each(manager.options.cssProps,function(value,name){prop=prefixed(element.style,name);if(add){manager.oldCssProps[prop]=element.style[prop];element.style[prop]=value;}else{element.style[prop]=manager.oldCssProps[prop]||'';}});if(!add){manager.oldCssProps={};}}/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */function triggerDomEvent(event,data){var gestureEvent=document$3.createEvent('Event');gestureEvent.initEvent(event,true,true);gestureEvent.gesture=data;data.target.dispatchEvent(gestureEvent);}function hammerify(el,options){var $el=$$1(el);if(!$el.data("hammer")){$el.data("hammer",new Hammer($el[0],options));}}/**
	 * Find elements that are within the boundary
	 * @param {number} top
	 * @param {number} right
	 * @param {number} bottom
	 * @param {number} left
	 * @return {jQuery}		A collection of elements
	 */function findElements(top,right,bottom,left){var hits=$$1();$$1.each(elements,function(i,element){if(element.height()>0){var elTop=element.offset().top,elLeft=element.offset().left,elRight=elLeft+element.width(),elBottom=elTop+element.height();var isIntersect=!(elLeft>right||elRight<left||elTop>bottom||elBottom<top);if(isIntersect){hits.push(element);}}});return hits;}/**
	 * Called when the user scrolls the $_GLOBAL
	 */function onScroll(){// unique tick id
++ticks;// viewport rectangle
var top=jWindow.scrollTop(),left=jWindow.scrollLeft(),right=left+jWindow.width(),bottom=top+jWindow.height();// determine which elements are in view
//        + 60 accounts for fixed nav
var intersections=findElements(top+offset.top+200,right+offset.right,bottom+offset.bottom,left+offset.left);$$1.each(intersections,function(i,element){var lastTick=element.data('scrollSpy:ticks');if(typeof lastTick!='number'){// entered into view
element.triggerHandler('scrollSpy:enter');}// update tick id
element.data('scrollSpy:ticks',ticks);});// determine which elements are no longer in view
$$1.each(elementsInView,function(i,element){var lastTick=element.data('scrollSpy:ticks');if(typeof lastTick=='number'&&lastTick!==ticks){// exited from view
element.triggerHandler('scrollSpy:exit');element.data('scrollSpy:ticks',null);}});// remember elements in view for next tick
elementsInView=intersections;}/**
	 * Called when $_GLOBAL is resized
	*/function onWinSize(){jWindow.trigger('scrollSpy:winSize');}/**
	 * Get time in ms
   * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
	 * @type {function}
	 * @return {number}
	 *//**
	 * Returns a function, that, when invoked, will only be triggered at most once
	 * during a given $_GLOBAL of time. Normally, the throttled function will run
	 * as much as it can, without ever going more than once per `wait` duration;
	 * but if you'd like to disable the execution on the leading edge, pass
	 * `{leading: false}`. To disable execution on the trailing edge, ditto.
	 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
	 * @param {function} func
	 * @param {number} wait
	 * @param {Object=} options
	 * @returns {Function}
	 */function throttle(func,wait,options){var context,args,result;var timeout=null;var previous=0;options||(options={});var later=function later(){previous=options.leading===false?0:getTime();timeout=null;result=func.apply(context,args);context=args=null;};return function(){var now=getTime();if(!previous&&options.leading===false)previous=now;var remaining=wait-(now-previous);context=this;args=arguments;if(remaining<=0){clearTimeout(timeout);timeout=null;previous=now;result=func.apply(context,args);context=args=null;}else if(!timeout&&options.trailing!==false){timeout=setTimeout(later,remaining);}return result;};}// Find exact position of element
function isWindow(obj){return obj!==null&&obj===obj.$_GLOBAL;}function getWindow(elem){return isWindow(elem)?elem:elem.nodeType===9&&elem.defaultView;}function offset(elem){var docElem,win,box={top:0,left:0},doc=elem&&elem.ownerDocument;docElem=doc.documentElement;if(typeof elem.getBoundingClientRect!==typeof undefined){box=elem.getBoundingClientRect();}win=getWindow(doc);return{top:box.top+win.pageYOffset-docElem.clientTop,left:box.left+win.pageXOffset-docElem.clientLeft};}function convertStyle(obj){var style='';for(var a in obj){if(obj.hasOwnProperty(a)){style+=a+':'+obj[a]+';';}}return style;}/**
 * Delegated click handler for .waves-effect element.
 * returns null when .waves-effect element not in "click tree"
 */function getWavesEffectElement(e){if(TouchHandler.allowEvent(e)===false){return null;}var element=null;var target=e.target||e.srcElement;while(target.parentElement!==null){if(!(target instanceof SVGElement)&&target.className.indexOf('waves-effect')!==-1){element=target;break;}else if(target.classList.contains('waves-effect')){element=target;break;}target=target.parentElement;}return element;}/**
 * Bubble the click and show effect if .waves-effect elem was found
 */function showEffect(e){var element=getWavesEffectElement(e);if(element!==null){Effect.show(e,element);if('ontouchstart'in $_GLOBAL$1){element.addEventListener('touchend',Effect.hide,false);element.addEventListener('touchcancel',Effect.hide,false);}element.addEventListener('mouseup',Effect.hide,false);element.addEventListener('mouseleave',Effect.hide,false);}}function textareaAutoResize($textarea){// Set font properties of hiddenDiv
var fontFamily=$textarea.css('font-family');var fontSize=$textarea.css('font-size');if(fontSize){hiddenDiv.css('font-size',fontSize);}if(fontFamily){hiddenDiv.css('font-family',fontFamily);}if($textarea.attr('wrap')==="off"){hiddenDiv.css('overflow-wrap',"normal").css('white-space',"pre");}hiddenDiv.text($textarea.val()+'\n');var content=hiddenDiv.html().replace(/\n/g,'<br>');hiddenDiv.html(content);// When textarea is hidden, width goes crazy.
// Approximate with half of window size
if($textarea.is(':visible')){hiddenDiv.css('width',$textarea.width());}else{hiddenDiv.css('width',$(window).width()/2);}$textarea.css('height',hiddenDiv.height());}return{setters:[function(_2){jQuery$1=_2.default;},function(_b){jQuery=_b.default;}],execute:function(){$_GLOBAL$2=typeof window!=='undefined'?window:typeof global!=='undefined'?global:Function('return this')();document$2=$_GLOBAL$2.document;IE=function(){if(document$2.documentMode){return document$2.documentMode;}else{for(var i=7;i>4;i--){var div=document$2.createElement("div");div.innerHTML="<!--[if IE "+i+"]><span></span><![endif]-->";if(div.getElementsByTagName("span").length){div=null;return i;}}}return undefined;}();rAFShim=function(){var timeLast=0;return $_GLOBAL$2.webkitRequestAnimationFrame||$_GLOBAL$2.mozRequestAnimationFrame||function(callback){var timeCurrent=new Date().getTime(),timeDelta;/* Dynamically set delay on a per-tick basis to match 60fps. *//* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */timeDelta=Math.max(0,16-(timeCurrent-timeLast));timeLast=timeCurrent+timeDelta;return setTimeout(function(){callback(timeCurrent+timeDelta);},timeDelta);};}();Type={isString:function isString(variable){return typeof variable==="string";},isArray:Array.isArray||function(variable){return Object.prototype.toString.call(variable)==="[object Array]";},isFunction:function isFunction(variable){return Object.prototype.toString.call(variable)==="[object Function]";},isNode:function isNode(variable){return variable&&variable.nodeType;},/* Copyright Martin Bohm. MIT License: https://gist.github.com/Tomalak/818a78a226a0738eaade */isNodeList:function isNodeList(variable){return typeof variable==="object"&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable))&&variable.length!==undefined&&(variable.length===0||typeof variable[0]==="object"&&variable[0].nodeType>0);},/* Determine if variable is a wrapped jQuery or Zepto element. */isWrapped:function isWrapped(variable){return variable&&(variable.jquery||$_GLOBAL$2.Zepto&&$_GLOBAL$2.Zepto.zepto.isZ(variable));},isSVG:function isSVG(variable){return $_GLOBAL$2.SVGElement&&variable instanceof $_GLOBAL$2.SVGElement;},isEmptyObject:function isEmptyObject(variable){for(var name in variable){return false;}return true;}};isJQuery=false;if(jQuery$1.fn&&jQuery$1.fn.jquery){$$2=jQuery$1;isJQuery=true;}else{$$2=$_GLOBAL$2.Velocity.Utilities;}DURATION_DEFAULT=400;EASING_DEFAULT="swing";Velocity={/* Container for page-wide Velocity state data. */State:{/* Detect mobile devices to determine if mobileHA should be turned on. */isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),/* The mobileHA option's behavior changes on older Android devices (Gingerbread, versions 2.3.3-2.3.7). */isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:$_GLOBAL$2.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),/* Create a cached element for re-use when checking for CSS property prefixes. */prefixElement:document$2.createElement("div"),/* Cache every prefix match to avoid repeating lookups. */prefixMatches:{},/* Cache the anchor used for animating $_GLOBAL scrolling. */scrollAnchor:null,/* Cache the browser-specific property names associated with the scroll anchor. */scrollPropertyLeft:null,scrollPropertyTop:null,/* Keep track of whether our RAF tick is running. */isTicking:false,/* Container for every in-progress call to Velocity. */calls:[]},/* Velocity's custom CSS stack. Made jQuery for unit testing. */CSS:{/* Defined below. */},/* A shim of the jQuery utility functions used by Velocity -- provided by Velocity's optional jQuery shim. */Utilities:$$2,/* Container for the user's custom animation redirects that are referenced by name in place of the properties map argument. */Redirects:{/* Manually registered by the user. */},Easings:{/* Defined below. */},/* Attempt to use ES6 Promises by default. Users can override this with a third-party promises library. */Promise:$_GLOBAL$2.Promise,/* Velocity option defaults, which can be overriden by the user. */defaults:{queue:"",duration:DURATION_DEFAULT,easing:EASING_DEFAULT,begin:undefined,complete:undefined,progress:undefined,display:undefined,visibility:undefined,loop:false,delay:false,mobileHA:true,/* Advanced: Set to false to prevent property values from being cached between consecutive Velocity-initiated chain calls. */_cacheValues:true},/* A design goal of Velocity is to cache data wherever possible in order to avoid DOM requerying. Accordingly, each element has a data cache. */init:function init(element){$$2.data(element,"velocity",{/* Store whether this is an SVG element, since its properties are retrieved and updated differently than standard HTML elements. */isSVG:Type.isSVG(element),/* Keep track of whether the element is currently being animated by Velocity.
                   This is used to ensure that property values are not transferred between non-consecutive (stale) calls. */isAnimating:false,/* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/$_GLOBAL.getComputedStyle */computedStyle:null,/* Tween data is cached for each animation on the element so that data can be passed across calls --
                   in particular, end values are used as subsequent start values in consecutive Velocity calls. */tweensContainer:null,/* The full root property values of each CSS hook being animated on this element are cached so that:
                   1) Concurrently-animating hooks sharing the same root can have their root values' merged into one while tweening.
                   2) Post-hook-injection root values can be transferred over to consecutively chained Velocity calls as starting root values. */rootPropertyValueCache:{},/* A cache for transform updates, which must be manually flushed via CSS.flushTransformCache(). */transformCache:{}});},/* A parallel to jQuery's $.css(), used for getting/setting Velocity's hooked CSS properties. */hook:null,/* Defined below. *//* Velocity-wide animation time remapping for testing purposes. */mock:false,version:{major:1,minor:2,patch:2},/* Set to 1 or 2 (most verbose) to output debug info to console. */debug:false};/* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */if($_GLOBAL$2.pageYOffset!==undefined){Velocity.State.scrollAnchor=$_GLOBAL$2;Velocity.State.scrollPropertyLeft="pageXOffset";Velocity.State.scrollPropertyTop="pageYOffset";}else{Velocity.State.scrollAnchor=document$2.documentElement||document$2.body.parentNode||document$2.body;Velocity.State.scrollPropertyLeft="scrollLeft";Velocity.State.scrollPropertyTop="scrollTop";};generateSpringRK4=function(){function springAccelerationForState(state){return-state.tension*state.x-state.friction*state.v;}function springEvaluateStateWithDerivative(initialState,dt,derivative){var state={x:initialState.x+derivative.dx*dt,v:initialState.v+derivative.dv*dt,tension:initialState.tension,friction:initialState.friction};return{dx:state.v,dv:springAccelerationForState(state)};}function springIntegrateState(state,dt){var a={dx:state.v,dv:springAccelerationForState(state)},b=springEvaluateStateWithDerivative(state,dt*0.5,a),c=springEvaluateStateWithDerivative(state,dt*0.5,b),d=springEvaluateStateWithDerivative(state,dt,c),dxdt=1.0/6.0*(a.dx+2.0*(b.dx+c.dx)+d.dx),dvdt=1.0/6.0*(a.dv+2.0*(b.dv+c.dv)+d.dv);state.x=state.x+dxdt*dt;state.v=state.v+dvdt*dt;return state;}return function springRK4Factory(tension,friction,duration){var initState={x:-1,v:0,tension:null,friction:null},path=[0],time_lapsed=0,tolerance=1/10000,DT=16/1000,have_duration,dt,last_state;tension=parseFloat(tension)||500;friction=parseFloat(friction)||20;duration=duration||null;initState.tension=tension;initState.friction=friction;have_duration=duration!==null;/* Calculate the actual time it takes for this animation to complete with the provided conditions. */if(have_duration){/* Run the simulation without a duration. */time_lapsed=springRK4Factory(tension,friction);/* Compute the adjusted time delta. */dt=time_lapsed/duration*DT;}else{dt=DT;}while(true){/* Next/step function .*/last_state=springIntegrateState(last_state||initState,dt);/* Store the position. */path.push(1+last_state.x);time_lapsed+=16;/* If the change threshold is reached, break. */if(!(Math.abs(last_state.x)>tolerance&&Math.abs(last_state.v)>tolerance)){break;}}/* If duration is not defined, return the actual time required for completing this animation. Otherwise, return a closure that holds the
               computed path and returns a snapshot of the position according to a given percentComplete. */return!have_duration?time_lapsed:function(percentComplete){return path[percentComplete*(path.length-1)|0];};};}();/* jQuery easings. */Velocity.Easings={linear:function linear(p){return p;},swing:function swing(p){return 0.5-Math.cos(p*Math.PI)/2;},/* Bonus "spring" easing, which is a less exaggerated version of easeInOutElastic. */spring:function spring(p){return 1-Math.cos(p*4.5*Math.PI)*Math.exp(-p*6);}};/* CSS3 and Robert Penner easings. */$$2.each([["ease",[0.25,0.1,0.25,1.0]],["ease-in",[0.42,0.0,1.00,1.0]],["ease-out",[0.00,0.0,0.58,1.0]],["ease-in-out",[0.42,0.0,0.58,1.0]],["easeInSine",[0.47,0,0.745,0.715]],["easeOutSine",[0.39,0.575,0.565,1]],["easeInOutSine",[0.445,0.05,0.55,0.95]],["easeInQuad",[0.55,0.085,0.68,0.53]],["easeOutQuad",[0.25,0.46,0.45,0.94]],["easeInOutQuad",[0.455,0.03,0.515,0.955]],["easeInCubic",[0.55,0.055,0.675,0.19]],["easeOutCubic",[0.215,0.61,0.355,1]],["easeInOutCubic",[0.645,0.045,0.355,1]],["easeInQuart",[0.895,0.03,0.685,0.22]],["easeOutQuart",[0.165,0.84,0.44,1]],["easeInOutQuart",[0.77,0,0.175,1]],["easeInQuint",[0.755,0.05,0.855,0.06]],["easeOutQuint",[0.23,1,0.32,1]],["easeInOutQuint",[0.86,0,0.07,1]],["easeInExpo",[0.95,0.05,0.795,0.035]],["easeOutExpo",[0.19,1,0.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[0.6,0.04,0.98,0.335]],["easeOutCirc",[0.075,0.82,0.165,1]],["easeInOutCirc",[0.785,0.135,0.15,0.86]]],function(i,easingArray){Velocity.Easings[easingArray[0]]=generateBezier.apply(null,easingArray[1]);});CSS=Velocity.CSS={/*************
            RegEx
        *************/RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,/* Unwrap a property value's surrounding text, e.g. "rgba(4, 3, 2, 1)" ==> "4, 3, 2, 1" and "rect(4px 3px 2px 1px)" ==> "4px 3px 2px 1px". */valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,/* Split a multi-value property into an array of subvalues, e.g. "rgba(4, 3, 2, 1) 4px 3px 2px 1px" ==> [ "rgba(4, 3, 2, 1)", "4px", "3px", "2px", "1px" ]. */valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig},/************
            Lists
        ************/Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},/************
            Hooks
        ************//* Hooks allow a subproperty (e.g. "boxShadowBlur") of a compound-value CSS property
           (e.g. "boxShadow: X Y Blur Spread Color") to be animated as if it were a discrete property. *//* Note: Beyond enabling fine-grained property animation, hooking is necessary since Velocity only
           tweens properties with single numeric values; unlike CSS transitions, Velocity does not interpolate compound-values. */Hooks:{/********************
                Registration
            ********************//* Templates are a concise way of indicating which subproperties must be individually registered for each compound-value CSS property. *//* Each template consists of the compound-value's base name, its constituent subproperty names, and those subproperties' default values. */templates:{"textShadow":["Color X Y Blur","black 0px 0px 0px"],"boxShadow":["Color X Y Blur Spread","black 0px 0px 0px 0px"],"clip":["Top Right Bottom Left","0px 0px 0px 0px"],"backgroundPosition":["X Y","0% 0%"],"transformOrigin":["X Y Z","50% 50% 0px"],"perspectiveOrigin":["X Y","50% 50%"]},/* A "registered" hook is one that has been converted from its template form into a live,
               tweenable property. It contains data to associate it with its root property. */registered:{/* Note: A registered hook looks like this ==> textShadowBlur: [ "textShadow", 3 ],
                   which consists of the subproperty's name, the associated root property's name,
                   and the subproperty's position in the root's value. */},/* Convert the templates into individual hooks then append them to the registered object above. */register:function register(){/* Color hooks registration: Colors are defaulted to white -- as opposed to black -- since colors that are
                   currently set to "transparent" default to their respective template below when color-animated,
                   and white is typically a closer match to transparent than black is. An exception is made for text ("color"),
                   which is almost always set closer to black than white. */for(var i=0;i<CSS.Lists.colors.length;i++){var rgbComponents=CSS.Lists.colors[i]==="color"?"0 0 0 1":"255 255 255 1";CSS.Hooks.templates[CSS.Lists.colors[i]]=["Red Green Blue Alpha",rgbComponents];}var rootProperty,hookTemplate,hookNames;/* In IE, color values inside compound-value properties are positioned at the end the value instead of at the beginning.
                   Thus, we re-arrange the templates accordingly. */if(IE){for(rootProperty in CSS.Hooks.templates){hookTemplate=CSS.Hooks.templates[rootProperty];hookNames=hookTemplate[0].split(" ");var defaultValues=hookTemplate[1].match(CSS.RegEx.valueSplit);if(hookNames[0]==="Color"){/* Reposition both the hook's name and its default value to the end of their respective strings. */hookNames.push(hookNames.shift());defaultValues.push(defaultValues.shift());/* Replace the existing template for the hook's root property. */CSS.Hooks.templates[rootProperty]=[hookNames.join(" "),defaultValues.join(" ")];}}}/* Hook registration. */for(rootProperty in CSS.Hooks.templates){hookTemplate=CSS.Hooks.templates[rootProperty];hookNames=hookTemplate[0].split(" ");for(var i in hookNames){var fullHookName=rootProperty+hookNames[i],hookPosition=i;/* For each hook, register its full name (e.g. textShadowBlur) with its root property (e.g. textShadow)
                           and the hook's position in its template's default value string. */CSS.Hooks.registered[fullHookName]=[rootProperty,hookPosition];}}},/*****************************
               Injection and Extraction
            *****************************//* Look up the root property associated with the hook (e.g. return "textShadow" for "textShadowBlur"). *//* Since a hook cannot be set directly (the browser won't recognize it), style updating for hooks is routed through the hook's root property. */getRoot:function getRoot(property){var hookData=CSS.Hooks.registered[property];if(hookData){return hookData[0];}else{/* If there was no hook match, return the property name untouched. */return property;}},/* Convert any rootPropertyValue, null or otherwise, into a space-delimited list of hook values so that
               the targeted hook can be injected or extracted at its standard position. */cleanRootPropertyValue:function cleanRootPropertyValue(rootProperty,rootPropertyValue){/* If the rootPropertyValue is wrapped with "rgb()", "clip()", etc., remove the wrapping to normalize the value before manipulation. */if(CSS.RegEx.valueUnwrap.test(rootPropertyValue)){rootPropertyValue=rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];}/* If rootPropertyValue is a CSS null-value (from which there's inherently no hook value to extract),
                   default to the root's default value as defined in CSS.Hooks.templates. *//* Note: CSS null-values include "none", "auto", and "transparent". They must be converted into their
                   zero-values (e.g. textShadow: "none" ==> textShadow: "0px 0px 0px black") for hook manipulation to proceed. */if(CSS.Values.isCSSNullValue(rootPropertyValue)){rootPropertyValue=CSS.Hooks.templates[rootProperty][1];}return rootPropertyValue;},/* Extracted the hook's value from its root property's value. This is used to get the starting value of an animating hook. */extractValue:function extractValue(fullHookName,rootPropertyValue){var hookData=CSS.Hooks.registered[fullHookName];if(hookData){var hookRoot=hookData[0],hookPosition=hookData[1];rootPropertyValue=CSS.Hooks.cleanRootPropertyValue(hookRoot,rootPropertyValue);/* Split rootPropertyValue into its constituent hook values then grab the desired hook at its standard position. */return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];}else{/* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */return rootPropertyValue;}},/* Inject the hook's value into its root property's value. This is used to piece back together the root property
               once Velocity has updated one of its individually hooked values through tweening. */injectValue:function injectValue(fullHookName,hookValue,rootPropertyValue){var hookData=CSS.Hooks.registered[fullHookName];if(hookData){var hookRoot=hookData[0],hookPosition=hookData[1],rootPropertyValueParts,rootPropertyValueUpdated;rootPropertyValue=CSS.Hooks.cleanRootPropertyValue(hookRoot,rootPropertyValue);/* Split rootPropertyValue into its individual hook values, replace the targeted value with hookValue,
                       then reconstruct the rootPropertyValue string. */rootPropertyValueParts=rootPropertyValue.toString().match(CSS.RegEx.valueSplit);rootPropertyValueParts[hookPosition]=hookValue;rootPropertyValueUpdated=rootPropertyValueParts.join(" ");return rootPropertyValueUpdated;}else{/* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */return rootPropertyValue;}}},/*******************
           Normalizations
        *******************//* Normalizations standardize CSS property manipulation by pollyfilling browser-specific implementations (e.g. opacity)
           and reformatting special properties (e.g. clip, rgba) to look like standard ones. */Normalizations:{/* Normalizations are passed a normalization target (either the property's name, its extracted value, or its injected value),
               the targeted element (which may need to be queried), and the targeted property value. */registered:{clip:function clip(type,element,propertyValue){switch(type){case"name":return"clip";/* Clip needs to be unwrapped and stripped of its commas during extraction. */case"extract":var extracted;/* If Velocity also extracted this value, skip extraction. */if(CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)){extracted=propertyValue;}else{/* Remove the "rect()" wrapper. */extracted=propertyValue.toString().match(CSS.RegEx.valueUnwrap);/* Strip off commas. */extracted=extracted?extracted[1].replace(/,(\s+)?/g," "):propertyValue;}return extracted;/* Clip needs to be re-wrapped during injection. */case"inject":return"rect("+propertyValue+")";}},blur:function blur(type,element,propertyValue){switch(type){case"name":return Velocity.State.isFirefox?"filter":"-webkit-filter";case"extract":var extracted=parseFloat(propertyValue);/* If extracted is NaN, meaning the value isn't already extracted. */if(!(extracted||extracted===0)){var blurComponent=propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);/* If the filter string had a blur component, return just the blur value and unit type. */if(blurComponent){extracted=blurComponent[1];/* If the component doesn't exist, default blur to 0. */}else{extracted=0;}}return extracted;/* Blur needs to be re-wrapped during injection. */case"inject":/* For the blur effect to be fully de-applied, it needs to be set to "none" instead of 0. */if(!parseFloat(propertyValue)){return"none";}else{return"blur("+propertyValue+")";}}},/* <=IE8 do not support the standard opacity property. They use filter:alpha(opacity=INT) instead. */opacity:function opacity(type,element,propertyValue){if(IE<=8){switch(type){case"name":return"filter";case"extract":/* <=IE8 return a "filter" value of "alpha(opacity=\d{1,3})".
                                   Extract the value and convert it to a decimal value to match the standard CSS opacity property's formatting. */var extracted=propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);if(extracted){/* Convert to decimal value. */propertyValue=extracted[1]/100;}else{/* When extracting opacity, default to 1 since a null value means opacity hasn't been set. */propertyValue=1;}return propertyValue;case"inject":/* Opacified elements are required to have their zoom property set to a non-zero value. */element.style.zoom=1;/* Setting the filter property on elements with certain font property combinations can result in a
                                   highly unappealing ultra-bolding effect. There's no way to remedy this throughout a tween, but dropping the
                                   value altogether (when opacity hits 1) at leasts ensures that the glitch is gone post-tweening. */if(parseFloat(propertyValue)>=1){return"";}else{/* As per the filter property's spec, convert the decimal value to a whole number and wrap the value. */return"alpha(opacity="+parseInt(parseFloat(propertyValue)*100,10)+")";}}/* With all other browsers, normalization is not required; return the same values that were passed in. */}else{switch(type){case"name":return"opacity";case"extract":return propertyValue;case"inject":return propertyValue;}}}},/*****************************
                Batched Registrations
            *****************************//* Note: Batched normalizations extend the CSS.Normalizations.registered object. */register:function register(){/*****************
                    Transforms
                *****************//* Transforms are the subproperties contained by the CSS "transform" property. Transforms must undergo normalization
                   so that they can be referenced in a properties map by their individual names. *//* Note: When transforms are "set", they are actually assigned to a per-element transformCache. When all transform
                   setting is complete complete, CSS.flushTransformCache() must be manually called to flush the values to the DOM.
                   Transform setting is batched in this way to improve performance: the transform style only needs to be updated
                   once when multiple transform subproperties are being animated simultaneously. *//* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
                   transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
                   from being normalized for these browsers so that tweening skips these properties altogether
                   (since it will ignore them as being unsupported by the browser.) */if(!(IE<=9)&&!Velocity.State.isGingerbread){/* Note: Since the standalone CSS "perspective" property and the CSS transform "perspective" subproperty
                    share the same name, the latter is given a unique token within Velocity: "transformPerspective". */CSS.Lists.transformsBase=CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);}for(var i=0;i<CSS.Lists.transformsBase.length;i++){/* Wrap the dynamically generated normalization function in a new scope so that transformName's value is
                    paired with its respective function. (Otherwise, all functions would take the final for loop's transformName.) */(function(){var transformName=CSS.Lists.transformsBase[i];CSS.Normalizations.registered[transformName]=function(type,element,propertyValue){switch(type){/* The normalized property name is the parent "transform" property -- the property that is actually set in CSS. */case"name":return"transform";/* Transform values are cached onto a per-element transformCache object. */case"extract":/* If this transform has yet to be assigned a value, return its null value. */if(Data(element)===undefined||Data(element).transformCache[transformName]===undefined){/* Scale CSS.Lists.transformsBase default to 1 whereas all other transform properties default to 0. */return (/^scale/i.test(transformName)?1:0);/* When transform values are set, they are wrapped in parentheses as per the CSS spec.
                                       Thus, when extracting their values (for tween calculations), we strip off the parentheses. */}else{return Data(element).transformCache[transformName].replace(/[()]/g,"");}case"inject":var invalid=false;/* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
                                       Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. *//* Switch on the base transform type; ignore the axis by removing the last letter from the transform's name. */switch(transformName.substr(0,transformName.length-1)){/* Whitelist unit types for each transform. */case"translate":invalid=!/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);break;/* Since an axis-free "scale" property is supported as well, a little hack is used here to detect it by chopping off its last letter. */case"scal":case"scale":/* Chrome on Android has a bug in which scaled elements blur if their initial scale
                                               value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
                                               and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */if(Velocity.State.isAndroid&&Data(element).transformCache[transformName]===undefined&&propertyValue<1){propertyValue=1;}invalid=!/(\d)$/i.test(propertyValue);break;case"skew":invalid=!/(deg|\d)$/i.test(propertyValue);break;case"rotate":invalid=!/(deg|\d)$/i.test(propertyValue);break;}if(!invalid){/* As per the CSS spec, wrap the value in parentheses. */Data(element).transformCache[transformName]="("+propertyValue+")";}/* Although the value is set on the transformCache object, return the newly-updated value for the calling code to process as normal. */return Data(element).transformCache[transformName];}};})();}/*************
                    Colors
                *************//* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
                   Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */for(var i=0;i<CSS.Lists.colors.length;i++){/* Wrap the dynamically generated normalization function in a new scope so that colorName's value is paired with its respective function.
                       (Otherwise, all functions would take the final for loop's colorName.) */(function(){var colorName=CSS.Lists.colors[i];/* Note: In IE<=8, which support rgb but not rgba, color properties are reverted to rgb by stripping off the alpha component. */CSS.Normalizations.registered[colorName]=function(type,element,propertyValue){switch(type){case"name":return colorName;/* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */case"extract":var extracted;/* If the color is already in its hookable form (e.g. "255 255 255 1") due to having been previously extracted, skip extraction. */if(CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)){extracted=propertyValue;}else{var converted,colorNames={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/* Convert color names to rgb. */if(/^[A-z]+$/i.test(propertyValue)){if(colorNames[propertyValue]!==undefined){converted=colorNames[propertyValue];}else{/* If an unmatched color name is provided, default to black. */converted=colorNames.black;}/* Convert hex values to rgb. */}else if(CSS.RegEx.isHex.test(propertyValue)){converted="rgb("+CSS.Values.hexToRgb(propertyValue).join(" ")+")";/* If the provided color doesn't match any of the accepted color formats, default to black. */}else if(!/^rgba?\(/i.test(propertyValue)){converted=colorNames.black;}/* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
                                           repeated spaces (in case the value included spaces to begin with). */extracted=(converted||propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ");}/* So long as this isn't <=IE8, add a fourth (alpha) component if it's missing and default it to 1 (visible). */if(!(IE<=8)&&extracted.split(" ").length===3){extracted+=" 1";}return extracted;case"inject":/* If this is IE<=8 and an alpha component exists, strip it off. */if(IE<=8){if(propertyValue.split(" ").length===4){propertyValue=propertyValue.split(/\s+/).slice(0,3).join(" ");}/* Otherwise, add a fourth (alpha) component if it's missing and default it to 1 (visible). */}else if(propertyValue.split(" ").length===3){propertyValue+=" 1";}/* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
                                       on all values but the fourth (R, G, and B only accept whole numbers). */return(IE<=8?"rgb":"rgba")+"("+propertyValue.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")";}};})();}}},/************************
           CSS Property Names
        ************************/Names:{/* Camelcase a property name into its JavaScript notation (e.g. "background-color" ==> "backgroundColor").
               Camelcasing is used to normalize property names between and across calls. */camelCase:function camelCase(property){return property.replace(/-(\w)/g,function(match,subMatch){return subMatch.toUpperCase();});},/* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */SVGAttribute:function SVGAttribute(property){var SVGAttributes="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";/* Certain browsers require an SVG transform to be applied as an attribute. (Otherwise, application via CSS is preferable due to 3D support.) */if(IE||Velocity.State.isAndroid&&!Velocity.State.isChrome){SVGAttributes+="|transform";}return new RegExp("^("+SVGAttributes+")$","i").test(property);},/* Determine whether a property should be set with a vendor prefix. *//* If a prefixed version of the property exists, return it. Otherwise, return the original property name.
               If the property is not at all supported by the browser, return a false flag. */prefixCheck:function prefixCheck(property){/* If this property has already been checked, return the cached value. */if(Velocity.State.prefixMatches[property]){return[Velocity.State.prefixMatches[property],true];}else{var vendors=["","Webkit","Moz","ms","O"];for(var i=0,vendorsLength=vendors.length;i<vendorsLength;i++){var propertyPrefixed;if(i===0){propertyPrefixed=property;}else{/* Capitalize the first letter of the property to conform to JavaScript vendor prefix notation (e.g. webkitFilter). */propertyPrefixed=vendors[i]+property.replace(/^\w/,function(match){return match.toUpperCase();});}/* Check if the browser supports this property as prefixed. */if(Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])){/* Cache the match. */Velocity.State.prefixMatches[property]=propertyPrefixed;return[propertyPrefixed,true];}}/* If the browser doesn't support this property in any form, include a false flag so that the caller can decide how to proceed. */return[property,false];}}},/************************
           CSS Property Values
        ************************/Values:{/* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */hexToRgb:function hexToRgb(hex){var shortformRegex=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,longformRegex=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,rgbParts;hex=hex.replace(shortformRegex,function(m,r,g,b){return r+r+g+g+b+b;});rgbParts=longformRegex.exec(hex);return rgbParts?[parseInt(rgbParts[1],16),parseInt(rgbParts[2],16),parseInt(rgbParts[3],16)]:[0,0,0];},isCSSNullValue:function isCSSNullValue(value){/* The browser defaults CSS values that have not been set to either 0 or one of several possible null-value strings.
                   Thus, we check for both falsiness and these special strings. *//* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
                   templates as defined as CSS.Hooks (for the sake of hook injection/extraction). *//* Note: Chrome returns "rgba(0, 0, 0, 0)" for an undefined color whereas IE returns "transparent". */return value==0||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value);},/* Retrieve a property's default unit type. Used for assigning a unit type when one is not supplied by the user. */getUnitType:function getUnitType(property){if(/^(rotate|skew)/i.test(property)){return"deg";}else if(/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)){/* The above properties are unitless. */return"";}else{/* Default to px for all other properties. */return"px";}},/* HTML elements default to an associated display type when they're not set to display:none. *//* Note: This function is used for correctly setting the non-"none" display value in certain Velocity redirects, such as fadeIn/Out. */getDisplayType:function getDisplayType(element){var tagName=element&&element.tagName.toString().toLowerCase();if(/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)){return"inline";}else if(/^(li)$/i.test(tagName)){return"list-item";}else if(/^(tr)$/i.test(tagName)){return"table-row";}else if(/^(table)$/i.test(tagName)){return"table";}else if(/^(tbody)$/i.test(tagName)){return"table-row-group";/* Default to "block" when no match is found. */}else{return"block";}},/* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */addClass:function addClass(element,className){if(element.classList){element.classList.add(className);}else{element.className+=(element.className.length?" ":"")+className;}},removeClass:function removeClass(element,className){if(element.classList){element.classList.remove(className);}else{element.className=element.className.toString().replace(new RegExp("(^|\\s)"+className.split(" ").join("|")+"(\\s|$)","gi")," ");}}},/****************************
           Style Getting & Setting
        ****************************//* The singular getPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */getPropertyValue:function getPropertyValue(element,property,rootPropertyValue,forceStyleLookup){/* Get an element's computed property value. *//* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
               style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
               *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/$_GLOBAL.getComputedStyle */function computePropertyValue(element,property){/* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
                   element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
                   offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
                   We subtract border and padding to get the sum of interior + scrollbar. */var computedValue=0;/* IE<=8 doesn't support $_GLOBAL.getComputedStyle, thus we defer to jQuery, which has an extensive array
                   of hacks to accurately retrieve IE8 property values. Re-implementing that logic here is not worth bloating the
                   codebase for a dying browser. The performance repercussions of using jQuery here are minimal since
                   Velocity is optimized to rarely (and sometimes never) query the DOM. Further, the $.css() codepath isn't that slow. */if(IE<=8){computedValue=$$2.css(element,property);/* GET *//* All other browsers support getComputedStyle. The returned live object reference is cached onto its
                   associated element so that it does not need to be refetched upon every GET. */}else{var revertDisplay=function revertDisplay(){if(toggleDisplay){CSS.setPropertyValue(element,"display","none");}};/* Browsers do not return height and width values for elements that are set to display:"none". Thus, we temporarily
                       toggle display to the element type's default value. */var toggleDisplay=false;if(/^(width|height)$/.test(property)&&CSS.getPropertyValue(element,"display")===0){toggleDisplay=true;CSS.setPropertyValue(element,"display",CSS.Values.getDisplayType(element));}if(!forceStyleLookup){if(property==="height"&&CSS.getPropertyValue(element,"boxSizing").toString().toLowerCase()!=="border-box"){var contentBoxHeight=element.offsetHeight-(parseFloat(CSS.getPropertyValue(element,"borderTopWidth"))||0)-(parseFloat(CSS.getPropertyValue(element,"borderBottomWidth"))||0)-(parseFloat(CSS.getPropertyValue(element,"paddingTop"))||0)-(parseFloat(CSS.getPropertyValue(element,"paddingBottom"))||0);revertDisplay();return contentBoxHeight;}else if(property==="width"&&CSS.getPropertyValue(element,"boxSizing").toString().toLowerCase()!=="border-box"){var contentBoxWidth=element.offsetWidth-(parseFloat(CSS.getPropertyValue(element,"borderLeftWidth"))||0)-(parseFloat(CSS.getPropertyValue(element,"borderRightWidth"))||0)-(parseFloat(CSS.getPropertyValue(element,"paddingLeft"))||0)-(parseFloat(CSS.getPropertyValue(element,"paddingRight"))||0);revertDisplay();return contentBoxWidth;}}var computedStyle;/* For elements that Velocity hasn't been called on directly (e.g. when Velocity queries the DOM on behalf
                       of a parent of an element its animating), perform a direct getComputedStyle lookup since the object isn't cached. */if(Data(element)===undefined){computedStyle=$_GLOBAL$2.getComputedStyle(element,null);/* GET *//* If the computedStyle object has yet to be cached, do so now. */}else if(!Data(element).computedStyle){computedStyle=Data(element).computedStyle=$_GLOBAL$2.getComputedStyle(element,null);/* GET *//* If computedStyle is cached, use it. */}else{computedStyle=Data(element).computedStyle;}/* IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
                       Also, in all browsers, when border colors aren't all the same, a compound value is returned that Velocity isn't setup to parse.
                       So, as a polyfill for querying individual border side colors, we just return the top border's color and animate all borders from that value. */if(property==="borderColor"){property="borderTopColor";}/* IE9 has a bug in which the "filter" property must be accessed from computedStyle using the getPropertyValue method
                       instead of a direct property lookup. The getPropertyValue method is slower than a direct lookup, which is why we avoid it by default. */if(IE===9&&property==="filter"){computedValue=computedStyle.getPropertyValue(property);/* GET */}else{computedValue=computedStyle[property];}/* Fall back to the property's style value (if defined) when computedValue returns nothing,
                       which can happen when the element hasn't been painted. */if(computedValue===""||computedValue===null){computedValue=element.style[property];}revertDisplay();}/* For top, right, bottom, and left (TRBL) values that are set to "auto" on elements of "fixed" or "absolute" position,
                   defer to jQuery for converting "auto" to a numeric value. (For elements with a "static" or "relative" position, "auto" has the same
                   effect as being set to 0, so no conversion is necessary.) *//* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
                   property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
                   to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */if(computedValue==="auto"&&/^(top|right|bottom|left)$/i.test(property)){var position=computePropertyValue(element,"position");/* GET *//* For absolute positioning, jQuery's $.position() only returns values for top and left;
                       right and bottom will have their "auto" value reverted to 0. *//* Note: A jQuery object must be created here since jQuery doesn't have a low-level alias for $.position().
                       Not a big deal since we're currently in a GET batch anyway. */if(position==="fixed"||position==="absolute"&&/top|left/i.test(property)){/* Note: jQuery strips the pixel unit from its returned values; we re-add it here to conform with computePropertyValue's behavior. */computedValue=$$2(element).position()[property]+"px";/* GET */}}return computedValue;}var propertyValue;/* If this is a hooked property (e.g. "clipLeft" instead of the root property of "clip"),
               extract the hook's value from a normalized rootPropertyValue using CSS.Hooks.extractValue(). */if(CSS.Hooks.registered[property]){var hook=property,hookRoot=CSS.Hooks.getRoot(hook);/* If a cached rootPropertyValue wasn't passed in (which Velocity always attempts to do in order to avoid requerying the DOM),
                   query the DOM for the root property's value. */if(rootPropertyValue===undefined){/* Since the browser is now being directly queried, use the official post-prefixing property name for this lookup. */rootPropertyValue=CSS.getPropertyValue(element,CSS.Names.prefixCheck(hookRoot)[0]);/* GET */}/* If this root has a normalization registered, peform the associated normalization extraction. */if(CSS.Normalizations.registered[hookRoot]){rootPropertyValue=CSS.Normalizations.registered[hookRoot]("extract",element,rootPropertyValue);}/* Extract the hook's value. */propertyValue=CSS.Hooks.extractValue(hook,rootPropertyValue);/* If this is a normalized property (e.g. "opacity" becomes "filter" in <=IE8) or "translateX" becomes "transform"),
               normalize the property's name and value, and handle the special case of transforms. *//* Note: Normalizing a property is mutually exclusive from hooking a property since hook-extracted values are strictly
               numerical and therefore do not require normalization extraction. */}else if(CSS.Normalizations.registered[property]){var normalizedPropertyName,normalizedPropertyValue;normalizedPropertyName=CSS.Normalizations.registered[property]("name",element);/* Transform values are calculated via normalization extraction (see below), which checks against the element's transformCache.
                   At no point do transform GETs ever actually query the DOM; initial stylesheet values are never processed.
                   This is because parsing 3D transform matrices is not always accurate and would bloat our codebase;
                   thus, normalization extraction defaults initial transform values to their zero-values (e.g. 1 for scaleX and 0 for translateX). */if(normalizedPropertyName!=="transform"){normalizedPropertyValue=computePropertyValue(element,CSS.Names.prefixCheck(normalizedPropertyName)[0]);/* GET *//* If the value is a CSS null-value and this property has a hook template, use that zero-value template so that hooks can be extracted from it. */if(CSS.Values.isCSSNullValue(normalizedPropertyValue)&&CSS.Hooks.templates[property]){normalizedPropertyValue=CSS.Hooks.templates[property][1];}}propertyValue=CSS.Normalizations.registered[property]("extract",element,normalizedPropertyValue);}/* If a (numeric) value wasn't produced via hook extraction or normalization, query the DOM. */if(!/^[\d-]/.test(propertyValue)){/* For SVG elements, dimensional properties (which SVGAttribute() detects) are tweened via
                   their HTML attribute values instead of their CSS style values. */if(Data(element)&&Data(element).isSVG&&CSS.Names.SVGAttribute(property)){/* Since the height/width attribute values must be set manually, they don't reflect computed values.
                       Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */if(/^(height|width)$/i.test(property)){/* Firefox throws an error if .getBBox() is called on an SVG that isn't attached to the DOM. */try{propertyValue=element.getBBox()[property];}catch(error){propertyValue=0;}/* Otherwise, access the attribute value directly. */}else{propertyValue=element.getAttribute(property);}}else{propertyValue=computePropertyValue(element,CSS.Names.prefixCheck(property)[0]);/* GET */}}/* Since property lookups are for animation purposes (which entails computing the numeric delta between start and end values),
               convert CSS null-values to an integer of value 0. */if(CSS.Values.isCSSNullValue(propertyValue)){propertyValue=0;}if(Velocity.debug>=2)console.log("Get "+property+": "+propertyValue);return propertyValue;},/* The singular setPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */setPropertyValue:function setPropertyValue(element,property,propertyValue,rootPropertyValue,scrollData){var propertyName=property;/* In order to be subjected to call options and element queueing, scroll animation is routed through Velocity as if it were a standard CSS property. */if(property==="scroll"){/* If a container option is present, scroll the container instead of the browser $_GLOBAL. */if(scrollData.container){scrollData.container["scroll"+scrollData.direction]=propertyValue;/* Otherwise, Velocity defaults to scrolling the browser $_GLOBAL. */}else{if(scrollData.direction==="Left"){$_GLOBAL$2.scrollTo(propertyValue,scrollData.alternateValue);}else{$_GLOBAL$2.scrollTo(scrollData.alternateValue,propertyValue);}}}else{/* Transforms (translateX, rotateZ, etc.) are applied to a per-element transformCache object, which is manually flushed via flushTransformCache().
                   Thus, for now, we merely cache transforms being SET. */if(CSS.Normalizations.registered[property]&&CSS.Normalizations.registered[property]("name",element)==="transform"){/* Perform a normalization injection. *//* Note: The normalization logic handles the transformCache updating. */CSS.Normalizations.registered[property]("inject",element,propertyValue);propertyName="transform";propertyValue=Data(element).transformCache[property];}else{/* Inject hooks. */if(CSS.Hooks.registered[property]){var hookName=property,hookRoot=CSS.Hooks.getRoot(property);/* If a cached rootPropertyValue was not provided, query the DOM for the hookRoot's current value. */rootPropertyValue=rootPropertyValue||CSS.getPropertyValue(element,hookRoot);/* GET */propertyValue=CSS.Hooks.injectValue(hookName,propertyValue,rootPropertyValue);property=hookRoot;}/* Normalize names and values. */if(CSS.Normalizations.registered[property]){propertyValue=CSS.Normalizations.registered[property]("inject",element,propertyValue);property=CSS.Normalizations.registered[property]("name",element);}/* Assign the appropriate vendor prefix before performing an official style update. */propertyName=CSS.Names.prefixCheck(property)[0];/* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
                       Try/catch is avoided for other browsers since it incurs a performance overhead. */if(IE<=8){try{element.style[propertyName]=propertyValue;}catch(error){if(Velocity.debug)console.log("Browser does not support ["+propertyValue+"] for ["+propertyName+"]");}/* SVG elements have their dimensional properties (width, height, x, y, cx, etc.) applied directly as attributes instead of as styles. *//* Note: IE8 does not support SVG elements, so it's okay that we skip it for SVG animation. */}else if(Data(element)&&Data(element).isSVG&&CSS.Names.SVGAttribute(property)){/* Note: For SVG attributes, vendor-prefixed property names are never used. *//* Note: Not all CSS properties can be animated via attributes, but the browser won't throw an error for unsupported properties. */element.setAttribute(property,propertyValue);}else{element.style[propertyName]=propertyValue;}if(Velocity.debug>=2)console.log("Set "+property+" ("+propertyName+"): "+propertyValue);}}/* Return the normalized property name and value in case the caller wants to know how these values were modified before being applied to the DOM. */return[propertyName,propertyValue];},/* To increase performance by batching transform updates into a single SET, transforms are not directly applied to an element until flushTransformCache() is called. *//* Note: Velocity applies transform properties in the same order that they are chronogically introduced to the element's CSS styles. */flushTransformCache:function flushTransformCache(element){var transformString="";/* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
               (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */if((IE||Velocity.State.isAndroid&&!Velocity.State.isChrome)&&Data(element).isSVG){/* Since transform values are stored in their parentheses-wrapped form, we use a helper function to strip out their numeric values.
                   Further, SVG transform properties only take unitless (representing pixels) values, so it's okay that parseFloat() strips the unit suffixed to the float value. */var getTransformFloat=function getTransformFloat(transformProperty){return parseFloat(CSS.getPropertyValue(element,transformProperty));};/* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
                   we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */var SVGTransforms={translate:[getTransformFloat("translateX"),getTransformFloat("translateY")],skewX:[getTransformFloat("skewX")],skewY:[getTransformFloat("skewY")],/* If the scale property is set (non-1), use that value for the scaleX and scaleY values
                       (this behavior mimics the result of animating all these properties at once on HTML elements). */scale:getTransformFloat("scale")!==1?[getTransformFloat("scale"),getTransformFloat("scale")]:[getTransformFloat("scaleX"),getTransformFloat("scaleY")],/* Note: SVG's rotate transform takes three values: rotation degrees followed by the X and Y values
                       defining the rotation's origin point. We ignore the origin values (default them to 0). */rotate:[getTransformFloat("rotateZ"),0,0]};/* Iterate through the transform properties in the user-defined property map order.
                   (This mimics the behavior of non-SVG transform animation.) */$$2.each(Data(element).transformCache,function(transformName){/* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
                       properties so that they match up with SVG's accepted transform properties. */if(/^translate/i.test(transformName)){transformName="translate";}else if(/^scale/i.test(transformName)){transformName="scale";}else if(/^rotate/i.test(transformName)){transformName="rotate";}/* Check that we haven't yet deleted the property from the SVGTransforms container. */if(SVGTransforms[transformName]){/* Append the transform property in the SVG-supported transform format. As per the spec, surround the space-delimited values in parentheses. */transformString+=transformName+"("+SVGTransforms[transformName].join(" ")+")"+" ";/* After processing an SVG transform property, delete it from the SVGTransforms container so we don't
                           re-insert the same master property if we encounter another one of its axis-specific properties. */delete SVGTransforms[transformName];}});}else{var transformValue,perspective;/* Transform properties are stored as members of the transformCache object. Concatenate all the members into a string. */$$2.each(Data(element).transformCache,function(transformName){transformValue=Data(element).transformCache[transformName];/* Transform's perspective subproperty must be set first in order to take effect. Store it temporarily. */if(transformName==="transformPerspective"){perspective=transformValue;return true;}/* IE9 only supports one rotation type, rotateZ, which it refers to as "rotate". */if(IE===9&&transformName==="rotateZ"){transformName="rotate";}transformString+=transformName+transformValue+" ";});/* If present, set the perspective subproperty first. */if(perspective){transformString="perspective"+perspective+" "+transformString;}}CSS.setPropertyValue(element,"transform",transformString);}};/* Register hooks and normalizations. */CSS.Hooks.register();CSS.Normalizations.register();/* Allow hook setting in the same fashion as jQuery's $.css(). */Velocity.hook=function(elements,arg2,arg3){var value=undefined;elements=sanitizeElements(elements);$$2.each(elements,function(i,element){/* Initialize Velocity's per-element data cache if this element hasn't previously been animated. */if(Data(element)===undefined){Velocity.init(element);}/* Get property value. If an element set was passed in, only return the value for the first element. */if(arg3===undefined){if(value===undefined){value=Velocity.CSS.getPropertyValue(element,arg2);}/* Set property value. */}else{/* sPV returns an array of the normalized propertyName/propertyValue pair used to update the DOM. */var adjustedSet=Velocity.CSS.setPropertyValue(element,arg2,arg3);/* Transform properties don't automatically set. They have to be flushed to the DOM. */if(adjustedSet[0]==="transform"){Velocity.CSS.flushTransformCache(element);}value=adjustedSet;}});return value;};/*****************
        Animation
    *****************/animate=function animate(){/******************
            Call Chain
        ******************//* Logic for determining what to return to the call stack when exiting out of Velocity. */function getChain(){/* If we are using the utility function, attempt to return this call's promise. If no promise library was detected,
               default to null instead of returning the targeted elements so that utility function's return value is standardized. */if(isUtility){return promiseData.promise||null;/* Otherwise, if we're using $.fn, return the jQuery-/Zepto-wrapped element set. */}else{return elementsWrapped;}}/*************************
           Arguments Assignment
        *************************//* To allow for expressive CoffeeScript code, Velocity supports an alternative syntax in which "elements" (or "e"), "properties" (or "p"), and "options" (or "o")
           objects are defined on a container object that's passed in as Velocity's sole argument. *//* Note: Some browsers automatically populate arguments with a "properties" object. We detect it by checking for its default "names" property. */var syntacticSugar=arguments[0]&&(arguments[0].p||$$2.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||Type.isString(arguments[0].properties)),/* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */isUtility,/* When Velocity is called via the utility function ($.Velocity()/Velocity()), elements are explicitly
               passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */elementsWrapped,argumentIndex;var elements,propertiesMap,options;/* Detect jQuery/Zepto elements being animated via the $.fn method. */if(Type.isWrapped(this)){isUtility=false;argumentIndex=0;elements=this;elementsWrapped=this;/* Otherwise, raw elements are being animated via the utility function. */}else{isUtility=true;argumentIndex=1;elements=syntacticSugar?arguments[0].elements||arguments[0].e:arguments[0];}elements=sanitizeElements(elements);if(!elements){return;}if(syntacticSugar){propertiesMap=arguments[0].properties||arguments[0].p;options=arguments[0].options||arguments[0].o;}else{propertiesMap=arguments[argumentIndex];options=arguments[argumentIndex+1];}/* The length of the element set (in the form of a nodeList or an array of elements) is defaulted to 1 in case a
           single raw DOM element is passed in (which doesn't contain a length property). */var elementsLength=elements.length,elementsIndex=0;/***************************
            Argument Overloading
        ***************************//* Support is included for jQuery's argument overloading: $.animate(propertyMap [, duration] [, easing] [, complete]).
           Overloading is detected by checking for the absence of an object being passed into options. *//* Note: The stop and finish actions do not accept animation options, and are therefore excluded from this check. */if(!/^(stop|finish|finishAll)$/i.test(propertiesMap)&&!$$2.isPlainObject(options)){/* The utility function shifts all arguments one position to the right, so we adjust for that offset. */var startingArgumentPosition=argumentIndex+1;options={};/* Iterate through all options arguments */for(var i=startingArgumentPosition;i<arguments.length;i++){/* Treat a number as a duration. Parse it out. *//* Note: The following RegEx will return true if passed an array with a number as its first item.
                   Thus, arrays are skipped from this check. */if(!Type.isArray(arguments[i])&&(/^(fast|normal|slow)$/i.test(arguments[i])||/^\d/.test(arguments[i]))){options.duration=arguments[i];/* Treat strings and arrays as easings. */}else if(Type.isString(arguments[i])||Type.isArray(arguments[i])){options.easing=arguments[i];/* Treat a function as a complete callback. */}else if(Type.isFunction(arguments[i])){options.complete=arguments[i];}}}/***************
            Promises
        ***************/var promiseData={promise:null,resolver:null,rejecter:null};/* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if
           promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
           method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
           call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. *//* Note: Velocity employs a call-based queueing architecture, which means that stopping an animating element actually stops the full call that
           triggered it -- not that one element exclusively. Similarly, there is one promise per call, and all elements targeted by a Velocity call are
           grouped together for the purposes of resolving and rejecting a promise. */if(isUtility&&Velocity.Promise){promiseData.promise=new Velocity.Promise(function(resolve,reject){promiseData.resolver=resolve;promiseData.rejecter=reject;});}/*********************
           Action Detection
        *********************//* Velocity's behavior is categorized into "actions": Elements can either be specially scrolled into view,
           or they can be started, stopped, or reversed. If a literal or referenced properties map is passed in as Velocity's
           first argument, the associated action is "start". Alternatively, "scroll", "reverse", or "stop" can be passed in instead of a properties map. */var action;switch(propertiesMap){case"scroll":action="scroll";break;case"reverse":action="reverse";break;case"finish":case"finishAll":case"stop":/*******************
                    Action: Stop
                *******************//* Clear the currently-active delay on each targeted element. */$$2.each(elements,function(i,element){if(Data(element)&&Data(element).delayTimer){/* Stop the timer from triggering its cached next() function. */clearTimeout(Data(element).delayTimer.setTimeout);/* Manually call the next() function so that the subsequent queue items can progress. */if(Data(element).delayTimer.next){Data(element).delayTimer.next();}delete Data(element).delayTimer;}/* If we want to finish everything in the queue, we have to iterate through it
                       and call each function. This will make them active calls below, which will
                       cause them to be applied via the duration setting. */if(propertiesMap==="finishAll"&&(options===true||Type.isString(options))){/* Iterate through the items in the element's queue. */$$2.each($$2.queue(element,Type.isString(options)?options:""),function(_,item){/* The queue array can contain an "inprogress" string, which we skip. */if(Type.isFunction(item)){item();}});/* Clearing the $.queue() array is achieved by resetting it to []. */$$2.queue(element,Type.isString(options)?options:"",[]);}});var callsToStop=[];/* When the stop action is triggered, the elements' currently active call is immediately stopped. The active call might have
                   been applied to multiple elements, in which case all of the call's elements will be stopped. When an element
                   is stopped, the next item in its animation queue is immediately triggered. *//* An additional argument may be passed in to clear an element's remaining queued calls. Either true (which defaults to the "fx" queue)
                   or a custom queue string can be passed in. *//* Note: The stop command runs prior to Velocity's Queueing phase since its behavior is intended to take effect *immediately*,
                   regardless of the element's current queue state. *//* Iterate through every active call. */$$2.each(Velocity.State.calls,function(i,activeCall){/* Inactive calls are set to false by the logic inside completeCall(). Skip them. */if(activeCall){/* Iterate through the active call's targeted elements. */$$2.each(activeCall[1],function(k,activeElement){/* If true was passed in as a secondary argument, clear absolutely all calls on this element. Otherwise, only
                               clear calls associated with the relevant queue. *//* Call stopping logic works as follows:
                               - options === true --> stop current default queue calls (and queue:false calls), including remaining queued ones.
                               - options === undefined --> stop current queue:"" call and all queue:false calls.
                               - options === false --> stop only queue:false calls.
                               - options === "custom" --> stop current queue:"custom" call, including remaining queued ones (there is no functionality to only clear the currently-running queue:"custom" call). */var queueName=options===undefined?"":options;if(queueName!==true&&activeCall[2].queue!==queueName&&!(options===undefined&&activeCall[2].queue===false)){return true;}/* Iterate through the calls targeted by the stop command. */$$2.each(elements,function(l,element){/* Check that this call was applied to the target element. */if(element===activeElement){/* Optionally clear the remaining queued calls. If we're doing "finishAll" this won't find anything,
                                       due to the queue-clearing above. */if(options===true||Type.isString(options)){/* Iterate through the items in the element's queue. */$$2.each($$2.queue(element,Type.isString(options)?options:""),function(_,item){/* The queue array can contain an "inprogress" string, which we skip. */if(Type.isFunction(item)){/* Pass the item's callback a flag indicating that we want to abort from the queue call.
                                                   (Specifically, the queue will resolve the call's associated promise then abort.)  */item(null,true);}});/* Clearing the $.queue() array is achieved by resetting it to []. */$$2.queue(element,Type.isString(options)?options:"",[]);}if(propertiesMap==="stop"){/* Since "reverse" uses cached start values (the previous call's endValues), these values must be
                                           changed to reflect the final value that the elements were actually tweened to. *//* Note: If only queue:false animations are currently running on an element, it won't have a tweensContainer
                                           object. Also, queue:false animations can't be reversed. */if(Data(element)&&Data(element).tweensContainer&&queueName!==false){$$2.each(Data(element).tweensContainer,function(m,activeTween){activeTween.endValue=activeTween.currentValue;});}callsToStop.push(i);}else if(propertiesMap==="finish"||propertiesMap==="finishAll"){/* To get active tweens to finish immediately, we forcefully shorten their durations to 1ms so that
                                        they finish upon the next rAf tick then proceed with normal call completion logic. */activeCall[2].duration=1;}}});});}});/* Prematurely call completeCall() on each matched active call. Pass an additional flag for "stop" to indicate
                   that the complete callback and display:none setting should be skipped since we're completing prematurely. */if(propertiesMap==="stop"){$$2.each(callsToStop,function(i,j){completeCall(j,true);});if(promiseData.promise){/* Immediately resolve the promise associated with this stop call since stop runs synchronously. */promiseData.resolver(elements);}}/* Since we're stopping, and not proceeding with queueing, exit out of Velocity. */return getChain();default:/* Treat a non-empty plain object as a literal properties map. */if($$2.isPlainObject(propertiesMap)&&!Type.isEmptyObject(propertiesMap)){action="start";/****************
                    Redirects
                ****************//* Check if a string matches a registered redirect (see Redirects above). */}else if(Type.isString(propertiesMap)&&Velocity.Redirects[propertiesMap]){var opts=$$2.extend({},options),durationOriginal=opts.duration,delayOriginal=opts.delay||0;/* If the backwards option was passed in, reverse the element set so that elements animate from the last to the first. */if(opts.backwards===true){elements=$$2.extend(true,[],elements).reverse();}/* Individually trigger the redirect for each element in the set to prevent users from having to handle iteration logic in their redirect. */$$2.each(elements,function(elementIndex,element){/* If the stagger option was passed in, successively delay each element by the stagger value (in ms). Retain the original delay value. */if(parseFloat(opts.stagger)){opts.delay=delayOriginal+parseFloat(opts.stagger)*elementIndex;}else if(Type.isFunction(opts.stagger)){opts.delay=delayOriginal+opts.stagger.call(element,elementIndex,elementsLength);}/* If the drag option was passed in, successively increase/decrease (depending on the presense of opts.backwards)
                           the duration of each element's animation, using floors to prevent producing very short durations. */if(opts.drag){/* Default the duration of UI pack effects (callouts and transitions) to 1000ms instead of the usual default duration of 400ms. */opts.duration=parseFloat(durationOriginal)||(/^(callout|transition)/.test(propertiesMap)?1000:DURATION_DEFAULT);/* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
                               B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
                               The end result is a baseline of 75% of the redirect's duration that increases/decreases as the end of the element set is approached. */opts.duration=Math.max(opts.duration*(opts.backwards?1-elementIndex/elementsLength:(elementIndex+1)/elementsLength),opts.duration*0.75,200);}/* Pass in the call's opts object so that the redirect can optionally extend it. It defaults to an empty object instead of null to
                           reduce the opts checking logic required inside the redirect. */Velocity.Redirects[propertiesMap].call(element,element,opts||{},elementIndex,elementsLength,elements,promiseData.promise?promiseData:undefined);});/* Since the animation logic resides within the redirect's own code, abort the remainder of this call.
                       (The performance overhead up to this point is virtually non-existant.) *//* Note: The jQuery call chain is kept intact by returning the complete element set. */return getChain();}else{var abortError="Velocity: First argument ("+propertiesMap+") was not a property map, a known action, or a registered redirect. Aborting.";if(promiseData.promise){promiseData.rejecter(new Error(abortError));}else{console.log(abortError);}return getChain();}}/**************************
            Call-Wide Variables
        **************************//* A container for CSS unit conversion ratios (e.g. %, rem, and em ==> px) that is used to cache ratios across all elements
           being animated in a single Velocity call. Calculating unit ratios necessitates DOM querying and updating, and is therefore
           avoided (via caching) wherever possible. This container is call-wide instead of page-wide to avoid the risk of using stale
           conversion metrics across Velocity animations that are not immediately consecutively chained. */var callUnitConversionData={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null};/* A container for all the ensuing tween data and metadata associated with this call. This container gets pushed to the page-wide
           Velocity.State.calls array that is processed during animation ticking. */var call=[];/************************
           Element Processing
        ************************//* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
           1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
           2) Queueing: The logic that runs once this call has reached its point of execution in the element's $.queue() stack. Most logic is placed here to avoid risking it becoming stale.
           3) Pushing: Consolidation of the tween data followed by its push onto the jQuery in-progress calls container.
        */function processElement(){/*************************
               Part I: Pre-Queueing
            *************************//***************************
               Element-Wide Variables
            ***************************/var element=this,/* The runtime opts object is the extension of the current call's options and Velocity's page-wide option defaults. */opts=$$2.extend({},Velocity.defaults,options),/* A container for the processed data associated with each property in the propertyMap.
                   (Each property in the map produces its own "tween".) */tweensContainer={},elementUnitConversionData;/******************
               Element Init
            ******************/if(Data(element)===undefined){Velocity.init(element);}/******************
               Option: Delay
            ******************//* Since queue:false doesn't respect the item's existing queue, we avoid injecting its delay here (it's set later on). *//* Note: Velocity rolls its own delay function since jQuery doesn't have a utility alias for $.fn.delay()
               (and thus requires jQuery element creation, which we avoid since its overhead includes DOM querying). */if(parseFloat(opts.delay)&&opts.queue!==false){$$2.queue(element,opts.queue,function(next){/* This is a flag used to indicate to the upcoming completeCall() function that this queue entry was initiated by Velocity. See completeCall() for further details. */Velocity.velocityQueueEntryFlag=true;/* The ensuing queue item (which is assigned to the "next" argument that $.queue() automatically passes in) will be triggered after a setTimeout delay.
                       The setTimeout is stored so that it can be subjected to clearTimeout() if this animation is prematurely stopped via Velocity's "stop" command. */Data(element).delayTimer={setTimeout:setTimeout(next,parseFloat(opts.delay)),next:next};});}/*********************
               Option: Duration
            *********************//* Support for jQuery's named durations. */switch(opts.duration.toString().toLowerCase()){case"fast":opts.duration=200;break;case"normal":opts.duration=DURATION_DEFAULT;break;case"slow":opts.duration=600;break;default:/* Remove the potential "ms" suffix and default to 1 if the user is attempting to set a duration of 0 (in order to produce an immediate style change). */opts.duration=parseFloat(opts.duration)||1;}/************************
               Global Option: Mock
            ************************/if(Velocity.mock!==false){/* In mock mode, all animations are forced to 1ms so that they occur immediately upon the next rAF tick.
                   Alternatively, a multiplier can be passed in to time remap all delays and durations. */if(Velocity.mock===true){opts.duration=opts.delay=1;}else{opts.duration*=parseFloat(Velocity.mock)||1;opts.delay*=parseFloat(Velocity.mock)||1;}}/*******************
               Option: Easing
            *******************/opts.easing=getEasing(opts.easing,opts.duration);/**********************
               Option: Callbacks
            **********************//* Callbacks must functions. Otherwise, default to null. */if(opts.begin&&!Type.isFunction(opts.begin)){opts.begin=null;}if(opts.progress&&!Type.isFunction(opts.progress)){opts.progress=null;}if(opts.complete&&!Type.isFunction(opts.complete)){opts.complete=null;}/*********************************
               Option: Display & Visibility
            *********************************//* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. *//* Note: We strictly check for undefined instead of falsiness because display accepts an empty string value. */if(opts.display!==undefined&&opts.display!==null){opts.display=opts.display.toString().toLowerCase();/* Users can pass in a special "auto" value to instruct Velocity to set the element to its default display value. */if(opts.display==="auto"){opts.display=Velocity.CSS.Values.getDisplayType(element);}}if(opts.visibility!==undefined&&opts.visibility!==null){opts.visibility=opts.visibility.toString().toLowerCase();}/**********************
               Option: mobileHA
            **********************//* When set to true, and if this is a mobile device, mobileHA automatically enables hardware acceleration (via a null transform hack)
               on animating elements. HA is removed from the element at the completion of its animation. *//* Note: Android Gingerbread doesn't support HA. If a null transform hack (mobileHA) is in fact set, it will prevent other tranform subproperties from taking effect. *//* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */opts.mobileHA=opts.mobileHA&&Velocity.State.isMobile&&!Velocity.State.isGingerbread;/***********************
               Part II: Queueing
            ***********************//* When a set of elements is targeted by a Velocity call, the set is broken up and each element has the current Velocity call individually queued onto it.
               In this way, each element's existing queue is respected; some elements may already be animating and accordingly should not have this current Velocity call triggered immediately. *//* In each queue, tween data is processed for each animating property then pushed onto the call-wide calls array. When the last element in the set has had its tweens processed,
               the call array is pushed to Velocity.State.calls for live processing by the requestAnimationFrame tick. */function buildQueue(next){/*******************
                   Option: Begin
                *******************//* The begin callback is fired once per call -- not once per elemenet -- and is passed the full raw DOM element set as both its context and its first argument. */if(opts.begin&&elementsIndex===0){/* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */try{opts.begin.call(elements,elements);}catch(error){setTimeout(function(){throw error;},1);}}/*****************************************
                   Tween Data Construction (for Scroll)
                *****************************************//* Note: In order to be subjected to chaining and animation options, scroll's tweening is routed through Velocity as if it were a standard CSS property animation. */if(action==="scroll"){/* The scroll action uniquely takes an optional "offset" option -- specified in pixels -- that offsets the targeted scroll position. */var scrollDirection=/^x$/i.test(opts.axis)?"Left":"Top",scrollOffset=parseFloat(opts.offset)||0,scrollPositionCurrent,scrollPositionCurrentAlternate,scrollPositionEnd;/* Scroll also uniquely takes an optional "container" option, which indicates the parent element that should be scrolled --
                       as opposed to the browser $_GLOBAL itself. This is useful for scrolling toward an element that's inside an overflowing parent element. */if(opts.container){/* Ensure that either a jQuery object or a raw DOM element was passed in. */if(Type.isWrapped(opts.container)||Type.isNode(opts.container)){/* Extract the raw DOM element from the jQuery wrapper. */opts.container=opts.container[0]||opts.container;/* Note: Unlike other properties in Velocity, the browser's scroll position is never cached since it so frequently changes
                               (due to the user's natural interaction with the page). */scrollPositionCurrent=opts.container["scroll"+scrollDirection];/* GET *//* $.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
                               -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
                               the scroll container's current scroll position. */scrollPositionEnd=scrollPositionCurrent+$$2(element).position()[scrollDirection.toLowerCase()]+scrollOffset;/* GET *//* If a value other than a jQuery object or a raw DOM element was passed in, default to null so that this option is ignored. */}else{opts.container=null;}}else{/* If the $_GLOBAL itself is being scrolled -- not a containing element -- perform a live scroll position lookup using
                           the appropriate cached property names (which differ based on browser type). */scrollPositionCurrent=Velocity.State.scrollAnchor[Velocity.State["scrollProperty"+scrollDirection]];/* GET *//* When scrolling the browser $_GLOBAL, cache the alternate axis's current value since $_GLOBAL.scrollTo() doesn't let us change only one value at a time. */scrollPositionCurrentAlternate=Velocity.State.scrollAnchor[Velocity.State["scrollProperty"+(scrollDirection==="Left"?"Top":"Left")]];/* GET *//* Unlike $.position(), $.offset() values are relative to the browser $_GLOBAL's true dimensions -- not merely its currently viewable area --
                           and therefore end values do not need to be compounded onto current values. */scrollPositionEnd=$$2(element).offset()[scrollDirection.toLowerCase()]+scrollOffset;/* GET */}/* Since there's only one format that scroll's associated tweensContainer can take, we create it manually. */tweensContainer={scroll:{rootPropertyValue:false,startValue:scrollPositionCurrent,currentValue:scrollPositionCurrent,endValue:scrollPositionEnd,unitType:"",easing:opts.easing,scrollData:{container:opts.container,direction:scrollDirection,alternateValue:scrollPositionCurrentAlternate}},element:element};if(Velocity.debug)console.log("tweensContainer (scroll): ",tweensContainer.scroll,element);/******************************************
                   Tween Data Construction (for Reverse)
                ******************************************//* Reverse acts like a "start" action in that a property map is animated toward. The only difference is
                   that the property map used for reverse is the inverse of the map used in the previous call. Thus, we manipulate
                   the previous call to construct our new map: use the previous map's end values as our new map's start values. Copy over all other data. *//* Note: Reverse can be directly called via the "reverse" parameter, or it can be indirectly triggered via the loop option. (Loops are composed of multiple reverses.) *//* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
                   there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
                   as reverting to the element's values as they were prior to the previous *Velocity* call. */}else if(action==="reverse"){/* Abort if there is no prior animation data to reverse to. */if(!Data(element).tweensContainer){/* Dequeue the element so that this queue entry releases itself immediately, allowing subsequent queue entries to run. */$$2.dequeue(element,opts.queue);return;}else{/*********************
                           Options Parsing
                        *********************//* If the element was hidden via the display option in the previous call,
                           revert display to "auto" prior to reversal so that the element is visible again. */if(Data(element).opts.display==="none"){Data(element).opts.display="auto";}if(Data(element).opts.visibility==="hidden"){Data(element).opts.visibility="visible";}/* If the loop option was set in the previous call, disable it so that "reverse" calls aren't recursively generated.
                           Further, remove the previous call's callback options; typically, users do not want these to be refired. */Data(element).opts.loop=false;Data(element).opts.begin=null;Data(element).opts.complete=null;/* Since we're extending an opts object that has already been extended with the defaults options object,
                           we remove non-explicitly-defined properties that are auto-assigned values. */if(!options.easing){delete opts.easing;}if(!options.duration){delete opts.duration;}/* The opts object used for reversal is an extension of the options object optionally passed into this
                           reverse call plus the options used in the previous Velocity call. */opts=$$2.extend({},Data(element).opts,opts);/*************************************
                           Tweens Container Reconstruction
                        *************************************//* Create a deepy copy (indicated via the true flag) of the previous call's tweensContainer. */var lastTweensContainer=$$2.extend(true,{},Data(element).tweensContainer);/* Manipulate the previous tweensContainer by replacing its end values and currentValues with its start values. */for(var lastTween in lastTweensContainer){/* In addition to tween data, tweensContainers contain an element property that we ignore here. */if(lastTween!=="element"){var lastStartValue=lastTweensContainer[lastTween].startValue;lastTweensContainer[lastTween].startValue=lastTweensContainer[lastTween].currentValue=lastTweensContainer[lastTween].endValue;lastTweensContainer[lastTween].endValue=lastStartValue;/* Easing is the only option that embeds into the individual tween data (since it can be defined on a per-property basis).
                                   Accordingly, every property's easing value must be updated when an options object is passed in with a reverse call.
                                   The side effect of this extensibility is that all per-property easing values are forcefully reset to the new value. */if(!Type.isEmptyObject(options)){lastTweensContainer[lastTween].easing=opts.easing;}if(Velocity.debug)console.log("reverse tweensContainer ("+lastTween+"): "+JSON.stringify(lastTweensContainer[lastTween]),element);}}tweensContainer=lastTweensContainer;}/*****************************************
                   Tween Data Construction (for Start)
                *****************************************/}else if(action==="start"){var lastTweensContainer;var property;var valueData,endValue,easing,startValue;var rootProperty,rootPropertyValue;var separatedValue,endValueUnitType,startValueUnitType,operator;var axis;(function(){/***************************
                       Tween Data Calculation
                    ***************************//* This function parses property data and defaults endValue, easing, and startValue as appropriate. *//* Property map values can either take the form of 1) a single value representing the end value,
                       or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
                       The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
                       the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */var parsePropertyValue=function parsePropertyValue(valueData,skipResolvingEasing){var endValue=undefined,easing=undefined,startValue=undefined;/* Handle the array format, which can be structured as one of three potential overloads:
                           A) [ endValue, easing, startValue ], B) [ endValue, easing ], or C) [ endValue, startValue ] */if(Type.isArray(valueData)){/* endValue is always the first item in the array. Don't bother validating endValue's value now
                               since the ensuing property cycling logic does that. */endValue=valueData[0];/* Two-item array format: If the second item is a number, function, or hex string, treat it as a
                               start value since easings can only be non-hex strings or arrays. */if(!Type.isArray(valueData[1])&&/^[\d-]/.test(valueData[1])||Type.isFunction(valueData[1])||CSS.RegEx.isHex.test(valueData[1])){startValue=valueData[1];/* Two or three-item array: If the second item is a non-hex string or an array, treat it as an easing. */}else if(Type.isString(valueData[1])&&!CSS.RegEx.isHex.test(valueData[1])||Type.isArray(valueData[1])){easing=skipResolvingEasing?valueData[1]:getEasing(valueData[1],opts.duration);/* Don't bother validating startValue's value now since the ensuing property cycling logic inherently does that. */if(valueData[2]!==undefined){startValue=valueData[2];}}/* Handle the single-value format. */}else{endValue=valueData;}/* Default to the call's easing if a per-property easing type was not defined. */if(!skipResolvingEasing){easing=easing||opts.easing;}/* If functions were passed in as values, pass the function the current element as its context,
                           plus the element's index and the element set's size as arguments. Then, assign the returned value. */if(Type.isFunction(endValue)){endValue=endValue.call(element,elementsIndex,elementsLength);}if(Type.isFunction(startValue)){startValue=startValue.call(element,elementsIndex,elementsLength);}/* Allow startValue to be left as undefined to indicate to the ensuing code that its value was not forcefed. */return[endValue||0,easing,startValue];};/* Cycle through each property in the map, looking for shorthand color properties (e.g. "color" as opposed to "colorRed"). Inject the corresponding
                       colorRed, colorGreen, and colorBlue RGB component tweens into the propertiesMap (which Velocity understands) and remove the shorthand property. *//* The per-element isAnimating flag is used to indicate whether it's safe (i.e. the data isn't stale)
                       to transfer over end values to use as start values. If it's set to true and there is a previous
                       Velocity call to pull values from, do so. */if(Data(element).tweensContainer&&Data(element).isAnimating===true){lastTweensContainer=Data(element).tweensContainer;}$$2.each(propertiesMap,function(property,value){/* Find shorthand color properties that have been passed a hex string. */if(RegExp("^"+CSS.Lists.colors.join("$|^")+"$").test(property)){/* Parse the value data for each shorthand. */var valueData=parsePropertyValue(value,true),endValue=valueData[0],easing=valueData[1],startValue=valueData[2];if(CSS.RegEx.isHex.test(endValue)){/* Convert the hex strings into their RGB component arrays. */var colorComponents=["Red","Green","Blue"],endValueRGB=CSS.Values.hexToRgb(endValue),startValueRGB=startValue?CSS.Values.hexToRgb(startValue):undefined;/* Inject the RGB component tweens into propertiesMap. */for(var i=0;i<colorComponents.length;i++){var dataArray=[endValueRGB[i]];if(easing){dataArray.push(easing);}if(startValueRGB!==undefined){dataArray.push(startValueRGB[i]);}propertiesMap[property+colorComponents[i]]=dataArray;}/* Remove the intermediary shorthand property entry now that we've processed it. */delete propertiesMap[property];}}});/* Create a tween out of each property, and append its associated data to tweensContainer. */var _loop=function _loop(){/**************************
                           Start Value Sourcing
                        **************************//* Parse out endValue, easing, and startValue from the property's data. */valueData=parsePropertyValue(propertiesMap[property]);endValue=valueData[0];easing=valueData[1];startValue=valueData[2];/* Now that the original property name's format has been used for the parsePropertyValue() lookup above,
                           we force the property to its camelCase styling to normalize it for manipulation. */property=CSS.Names.camelCase(property);/* In case this property is a hook, there are circumstances where we will intend to work on the hook's root property and not the hooked subproperty. */rootProperty=CSS.Hooks.getRoot(property);rootPropertyValue=false;/* Other than for the dummy tween property, properties that are not supported by the browser (and do not have an associated normalization) will
                           inherently produce no style changes when set, so they are skipped in order to decrease animation tick overhead.
                           Property support is determined via prefixCheck(), which returns a false flag when no supported is detected. *//* Note: Since SVG elements have some of their properties directly applied as HTML attributes,
                           there is no way to check for their explicit browser support, and so we skip skip this check for them. */if(!Data(element).isSVG&&rootProperty!=="tween"&&CSS.Names.prefixCheck(rootProperty)[1]===false&&CSS.Normalizations.registered[rootProperty]===undefined){if(Velocity.debug)console.log("Skipping ["+rootProperty+"] due to a lack of browser support.");return'continue';}/* If the display option is being set to a non-"none" (e.g. "block") and opacity (filter on IE<=8) is being
                           animated to an endValue of non-zero, the user's intention is to fade in from invisible, thus we forcefeed opacity
                           a startValue of 0 if its startValue hasn't already been sourced by value transferring or prior forcefeeding. */if((opts.display!==undefined&&opts.display!==null&&opts.display!=="none"||opts.visibility!==undefined&&opts.visibility!=="hidden")&&/opacity|filter/.test(property)&&!startValue&&endValue!==0){startValue=0;}/* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
                           for all of the current call's properties that were *also* animated in the previous call. *//* Note: Value transferring can optionally be disabled by the user via the _cacheValues option. */if(opts._cacheValues&&lastTweensContainer&&lastTweensContainer[property]){if(startValue===undefined){startValue=lastTweensContainer[property].endValue+lastTweensContainer[property].unitType;}/* The previous call's rootPropertyValue is extracted from the element's data cache since that's the
                               instance of rootPropertyValue that gets freshly updated by the tweening process, whereas the rootPropertyValue
                               attached to the incoming lastTweensContainer is equal to the root property's value prior to any tweening. */rootPropertyValue=Data(element).rootPropertyValueCache[rootProperty];/* If values were not transferred from a previous Velocity call, query the DOM as needed. */}else{/* Handle hooked properties. */if(CSS.Hooks.registered[property]){if(startValue===undefined){rootPropertyValue=CSS.getPropertyValue(element,rootProperty);/* GET *//* Note: The following getPropertyValue() call does not actually trigger a DOM query;
                                       getPropertyValue() will extract the hook from rootPropertyValue. */startValue=CSS.getPropertyValue(element,property,rootPropertyValue);/* If startValue is already defined via forcefeeding, do not query the DOM for the root property's value;
                                   just grab rootProperty's zero-value template from CSS.Hooks. This overwrites the element's actual
                                   root property value (if one is set), but this is acceptable since the primary reason users forcefeed is
                                   to avoid DOM queries, and thus we likewise avoid querying the DOM for the root property's value. */}else{/* Grab this hook's zero-value template, e.g. "0px 0px 0px black". */rootPropertyValue=CSS.Hooks.templates[rootProperty][1];}/* Handle non-hooked properties that haven't already been defined via forcefeeding. */}else if(startValue===undefined){startValue=CSS.getPropertyValue(element,property);/* GET */}}/**************************
                           Value Data Extraction
                        **************************/operator=false;/* Separates a property value into its numeric value and its unit type. */function separateValue(property,value){var unitType,numericValue;numericValue=(value||"0").toString().toLowerCase()/* Match the unit type at the end of the value. */.replace(/[%A-z]+$/,function(match){/* Grab the unit type. */unitType=match;/* Strip the unit type off of value. */return"";});/* If no unit type was supplied, assign one that is appropriate for this property (e.g. "deg" for rotateZ or "px" for width). */if(!unitType){unitType=CSS.Values.getUnitType(property);}return[numericValue,unitType];}/* Separate startValue. */separatedValue=separateValue(property,startValue);startValue=separatedValue[0];startValueUnitType=separatedValue[1];/* Separate endValue, and extract a value operator (e.g. "+=", "-=") if one exists. */separatedValue=separateValue(property,endValue);endValue=separatedValue[0].replace(/^([+-\/*])=/,function(match,subMatch){operator=subMatch;/* Strip the operator off of the value. */return"";});endValueUnitType=separatedValue[1];/* Parse float values from endValue and startValue. Default to 0 if NaN is returned. */startValue=parseFloat(startValue)||0;endValue=parseFloat(endValue)||0;/***************************************
                           Property-Specific Value Conversion
                        ***************************************//* Custom support for properties that don't actually accept the % unit type, but where pollyfilling is trivial and relatively foolproof. */if(endValueUnitType==="%"){/* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
                               which is identical to the em unit's behavior, so we piggyback off of that. */if(/^(fontSize|lineHeight)$/.test(property)){/* Convert % into an em decimal value. */endValue=endValue/100;endValueUnitType="em";/* For scaleX and scaleY, convert the value into its decimal format and strip off the unit type. */}else if(/^scale/.test(property)){endValue=endValue/100;endValueUnitType="";/* For RGB components, take the defined percentage of 255 and strip off the unit type. */}else if(/(Red|Green|Blue)$/i.test(property)){endValue=endValue/100*255;endValueUnitType="";}}/***************************
                           Unit Ratio Calculation
                        ***************************//* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
                           %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
                           for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
                           from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
                           1) Calculating the ratio of %/em/rem/vh/vw relative to pixels
                           2) Converting startValue into the same unit of measurement as endValue based on these ratios. *//* Unit conversion ratios are calculated by inserting a sibling node next to the target node, copying over its position property,
                           setting values with the target unit type then comparing the returned pixel value. *//* Note: Even if only one of these unit types is being animated, all unit ratios are calculated at once since the overhead
                           of batching the SETs and GETs together upfront outweights the potential overhead
                           of layout thrashing caused by re-querying for uncalculated ratios for subsequently-processed properties. *//* Todo: Shift this logic into the calls' first tick instance so that it's synced with RAF. */function calculateUnitRatios(){/************************
                                Same Ratio Checks
                            ************************//* The properties below are used to determine whether the element differs sufficiently from this call's
                               previously iterated element to also differ in its unit conversion ratios. If the properties match up with those
                               of the prior element, the prior element's conversion ratios are used. Like most optimizations in Velocity,
                               this is done to minimize DOM querying. */var sameRatioIndicators={myParent:element.parentNode||document$2.body,/* GET */position:CSS.getPropertyValue(element,"position"),/* GET */fontSize:CSS.getPropertyValue(element,"fontSize")/* GET */},/* Determine if the same % ratio can be used. % is based on the element's position value and its parent's width and height dimensions. */samePercentRatio=sameRatioIndicators.position===callUnitConversionData.lastPosition&&sameRatioIndicators.myParent===callUnitConversionData.lastParent,/* Determine if the same em ratio can be used. em is relative to the element's fontSize. */sameEmRatio=sameRatioIndicators.fontSize===callUnitConversionData.lastFontSize;/* Store these ratio indicators call-wide for the next element to compare against. */callUnitConversionData.lastParent=sameRatioIndicators.myParent;callUnitConversionData.lastPosition=sameRatioIndicators.position;callUnitConversionData.lastFontSize=sameRatioIndicators.fontSize;/***************************
                               Element-Specific Units
                            ***************************//* Note: IE8 rounds to the nearest pixel when returning CSS values, thus we perform conversions using a measurement
                               of 100 (instead of 1) to give our ratios a precision of at least 2 decimal values. */var measurement=100,unitRatios={};if(!sameEmRatio||!samePercentRatio){var dummy=Data(element).isSVG?document$2.createElementNS("http://www.w3.org/2000/svg","rect"):document$2.createElement("div");Velocity.init(dummy);sameRatioIndicators.myParent.appendChild(dummy);/* To accurately and consistently calculate conversion ratios, the element's cascaded overflow and box-sizing are stripped.
                                   Similarly, since width/height can be artificially constrained by their min-/max- equivalents, these are controlled for as well. *//* Note: Overflow must be also be controlled for per-axis since the overflow property overwrites its per-axis values. */$$2.each(["overflow","overflowX","overflowY"],function(i,property){Velocity.CSS.setPropertyValue(dummy,property,"hidden");});Velocity.CSS.setPropertyValue(dummy,"position",sameRatioIndicators.position);Velocity.CSS.setPropertyValue(dummy,"fontSize",sameRatioIndicators.fontSize);Velocity.CSS.setPropertyValue(dummy,"boxSizing","content-box");/* width and height act as our proxy properties for measuring the horizontal and vertical % ratios. */$$2.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(i,property){Velocity.CSS.setPropertyValue(dummy,property,measurement+"%");});/* paddingLeft arbitrarily acts as our proxy property for the em ratio. */Velocity.CSS.setPropertyValue(dummy,"paddingLeft",measurement+"em");/* Divide the returned value by the measurement to get the ratio between 1% and 1px. Default to 1 since working with 0 can produce Infinite. */unitRatios.percentToPxWidth=callUnitConversionData.lastPercentToPxWidth=(parseFloat(CSS.getPropertyValue(dummy,"width",null,true))||1)/measurement;/* GET */unitRatios.percentToPxHeight=callUnitConversionData.lastPercentToPxHeight=(parseFloat(CSS.getPropertyValue(dummy,"height",null,true))||1)/measurement;/* GET */unitRatios.emToPx=callUnitConversionData.lastEmToPx=(parseFloat(CSS.getPropertyValue(dummy,"paddingLeft"))||1)/measurement;/* GET */sameRatioIndicators.myParent.removeChild(dummy);}else{unitRatios.emToPx=callUnitConversionData.lastEmToPx;unitRatios.percentToPxWidth=callUnitConversionData.lastPercentToPxWidth;unitRatios.percentToPxHeight=callUnitConversionData.lastPercentToPxHeight;}/***************************
                               Element-Agnostic Units
                            ***************************//* Whereas % and em ratios are determined on a per-element basis, the rem unit only needs to be checked
                               once per call since it's exclusively dependant upon document.body's fontSize. If this is the first time
                               that calculateUnitRatios() is being run during this call, remToPx will still be set to its default value of null,
                               so we calculate it now. */if(callUnitConversionData.remToPx===null){/* Default to browsers' default fontSize of 16px in the case of 0. */callUnitConversionData.remToPx=parseFloat(CSS.getPropertyValue(document$2.body,"fontSize"))||16;/* GET */}/* Similarly, viewport units are %-relative to the $_GLOBAL's inner dimensions. */if(callUnitConversionData.vwToPx===null){callUnitConversionData.vwToPx=parseFloat($_GLOBAL$2.innerWidth)/100;/* GET */callUnitConversionData.vhToPx=parseFloat($_GLOBAL$2.innerHeight)/100;/* GET */}unitRatios.remToPx=callUnitConversionData.remToPx;unitRatios.vwToPx=callUnitConversionData.vwToPx;unitRatios.vhToPx=callUnitConversionData.vhToPx;if(Velocity.debug>=1)console.log("Unit ratios: "+JSON.stringify(unitRatios),element);return unitRatios;}/********************
                           Unit Conversion
                        ********************//* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */if(/[\/*]/.test(operator)){endValueUnitType=startValueUnitType;/* If startValue and endValue differ in unit type, convert startValue into the same unit type as endValue so that if endValueUnitType
                           is a relative unit (%, em, rem), the values set during tweening will continue to be accurately relative even if the metrics they depend
                           on are dynamically changing during the course of the animation. Conversely, if we always normalized into px and used px for setting values, the px ratio
                           would become stale if the original unit being animated toward was relative and the underlying metrics change during the animation. *//* Since 0 is 0 in any unit type, no conversion is necessary when startValue is 0 -- we just start at 0 with endValueUnitType. */}else if(startValueUnitType!==endValueUnitType&&startValue!==0){/* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. *//* Note: Skipping unit conversion here means that if endValueUnitType was originally a relative unit, the animation won't relatively
                               match the underlying metrics if they change, but this is acceptable since we're animating toward invisibility instead of toward visibility,
                               which remains past the point of the animation's completion. */if(endValue===0){endValueUnitType=startValueUnitType;}else{/* By this point, we cannot avoid unit conversion (it's undesirable since it causes layout thrashing).
                                   If we haven't already, we trigger calculateUnitRatios(), which runs once per element per call. */elementUnitConversionData=elementUnitConversionData||calculateUnitRatios();/* The following RegEx matches CSS properties that have their % values measured relative to the x-axis. *//* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */axis=/margin|padding|left|right|width|text|word|letter/i.test(property)||/X$/.test(property)||property==="x"?"x":"y";/* In order to avoid generating n^2 bespoke conversion functions, unit conversion is a two-step process:
                                   1) Convert startValue into pixels. 2) Convert this new pixel value into endValue's unit type. */switch(startValueUnitType){case"%":/* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
                                           Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
                                           to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */startValue*=axis==="x"?elementUnitConversionData.percentToPxWidth:elementUnitConversionData.percentToPxHeight;break;case"px":/* px acts as our midpoint in the unit conversion process; do nothing. */break;default:startValue*=elementUnitConversionData[startValueUnitType+"ToPx"];}/* Invert the px ratios to convert into to the target unit. */switch(endValueUnitType){case"%":startValue*=1/(axis==="x"?elementUnitConversionData.percentToPxWidth:elementUnitConversionData.percentToPxHeight);break;case"px":/* startValue is already in px, do nothing; we're done. */break;default:startValue*=1/elementUnitConversionData[endValueUnitType+"ToPx"];}}}/*********************
                           Relative Values
                        *********************//* Operator logic must be performed last since it requires unit-normalized start and end values. *//* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
                           to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
                           50 points is added on top of the current % value. */switch(operator){case"+":endValue=startValue+endValue;break;case"-":endValue=startValue-endValue;break;case"*":endValue=startValue*endValue;break;case"/":endValue=startValue/endValue;break;}/**************************
                           tweensContainer Push
                        **************************//* Construct the per-property tween object, and push it to the element's tweensContainer. */tweensContainer[property]={rootPropertyValue:rootPropertyValue,startValue:startValue,currentValue:startValue,endValue:endValue,unitType:endValueUnitType,easing:easing};if(Velocity.debug)console.log("tweensContainer ("+property+"): "+JSON.stringify(tweensContainer[property]),element);};for(property in propertiesMap){var _ret2=_loop();if(_ret2==='continue')continue;}/* Along with its property data, store a reference to the element itself onto tweensContainer. */tweensContainer.element=element;})();}/*****************
                    Call Push
                *****************//* Note: tweensContainer can be empty if all of the properties in this call's property map were skipped due to not
                   being supported by the browser. The element property is used for checking that the tweensContainer has been appended to. */if(tweensContainer.element){/* Apply the "velocity-animating" indicator class. */CSS.Values.addClass(element,"velocity-animating");/* The call array houses the tweensContainers for each element being animated in the current call. */call.push(tweensContainer);/* Store the tweensContainer and options if we're working on the default effects queue, so that they can be used by the reverse command. */if(opts.queue===""){Data(element).tweensContainer=tweensContainer;Data(element).opts=opts;}/* Switch on the element's animating flag. */Data(element).isAnimating=true;/* Once the final element in this call's element set has been processed, push the call array onto
                       Velocity.State.calls for the animation tick to immediately begin processing. */if(elementsIndex===elementsLength-1){/* Add the current call plus its associated metadata (the element set and the call's options) onto the jQuery call container.
                           Anything on this call container is subjected to tick() processing. */Velocity.State.calls.push([call,elements,opts,null,promiseData.resolver]);/* If the animation tick isn't running, start it. (Velocity shuts it off when there are no active calls to process.) */if(Velocity.State.isTicking===false){Velocity.State.isTicking=true;/* Start the tick loop. */tick();}}else{elementsIndex++;}}}/* When the queue option is set to false, the call skips the element's queue and fires immediately. */if(opts.queue===false){/* Since this buildQueue call doesn't respect the element's existing queue (which is where a delay option would have been appended),
                   we manually inject the delay property here with an explicit setTimeout. */if(opts.delay){setTimeout(buildQueue,opts.delay);}else{buildQueue();}/* Otherwise, the call undergoes element queueing as normal. *//* Note: To interoperate with jQuery, Velocity uses jQuery's own $.queue() stack for queuing logic. */}else{$$2.queue(element,opts.queue,function(next,clearQueue){/* If the clearQueue flag was passed in by the stop command, resolve this call's promise. (Promises can only be resolved once,
                       so it's fine if this is repeatedly triggered for each element in the associated call.) */if(clearQueue===true){if(promiseData.promise){promiseData.resolver(elements);}/* Do not continue with animation queueing. */return true;}/* This flag indicates to the upcoming completeCall() function that this queue entry was initiated by Velocity.
                       See completeCall() for further details. */Velocity.velocityQueueEntryFlag=true;buildQueue(next);});}/*********************
                Auto-Dequeuing
            *********************//* As per jQuery's $.queue() behavior, to fire the first non-custom-queue entry on an element, the element
               must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
               for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
               queue is further appended with additional items -- including $.delay()'s or even $.animate() calls, the queue's
               first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. *//* Note: When an element set is being subjected to a non-parallel Velocity call, the animation will not begin until
               each one of the elements in the set has reached the end of its individually pre-existing queue chain. *//* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, $.queue() function.
               Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */if((opts.queue===""||opts.queue==="fx")&&$$2.queue(element)[0]!=="inprogress"){$$2.dequeue(element);}}/**************************
           Element Set Iteration
        **************************//* If the "nodeType" property exists on the elements variable, we're animating a single element.
           Place it in an array so that $.each() can iterate over it. */$$2.each(elements,function(i,element){/* Ensure each element in a set has a nodeType (is a real element) to avoid throwing errors. */if(Type.isNode(element)){processElement.call(element);}});/******************
           Option: Loop
        ******************//* The loop option accepts an integer indicating how many times the element should loop between the values in the
           current call's properties map and the element's property values prior to this call. *//* Note: The loop option's logic is performed here -- after element processing -- because the current call needs
           to undergo its queue insertion prior to the loop option generating its series of constituent "reverse" calls,
           which chain after the current call. Two reverse calls (two "alternations") constitute one loop. */var opts=$$2.extend({},Velocity.defaults,options),reverseCallsCount;opts.loop=parseInt(opts.loop);reverseCallsCount=opts.loop*2-1;if(opts.loop){/* Double the loop count to convert it into its appropriate number of "reverse" calls.
               Subtract 1 from the resulting value since the current call is included in the total alternation count. */for(var x=0;x<reverseCallsCount;x++){/* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
                   isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
                   call so that the delay logic that occurs inside *Pre-Queueing* can process it. */var reverseOptions={delay:opts.delay,progress:opts.progress};/* If a complete callback was passed into this call, transfer it to the loop redirect's final "reverse" call
                   so that it's triggered when the entire redirect is complete (and not when the very first animation is complete). */if(x===reverseCallsCount-1){reverseOptions.display=opts.display;reverseOptions.visibility=opts.visibility;reverseOptions.complete=opts.complete;}animate(elements,"reverse",reverseOptions);}}/***************
            Chaining
        ***************//* Return the elements back to the call chain, with wrapped elements taking precedence in case Velocity was called via the $.fn. extension. */return getChain();};/* Turn Velocity into the animation function, extended with the pre-existing Velocity object. */Velocity=$$2.extend(animate,Velocity);/* For legacy support, also expose the literal animate method. */Velocity.animate=animate;/**************
        Timing
    **************//* Ticker function. */ticker=$_GLOBAL$2.requestAnimationFrame||rAFShim;/* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
       To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
       devices to avoid wasting battery power on inactive tabs. *//* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */if(!Velocity.State.isMobile&&document$2.hidden!==undefined){document$2.addEventListener("visibilitychange",function(){/* Reassign the rAF function (which the jQuery tick() function uses) based on the tab's focus state. */if(document$2.hidden){ticker=function ticker(callback){/* The tick function needs a truthy first argument in order to pass its internal timestamp check. */return setTimeout(function(){callback(true);},16);};/* The rAF loop has been paused by the browser, so we manually restart the tick. */tick();}else{ticker=$_GLOBAL$2.requestAnimationFrame||rAFShim;}});}jQuery$1.Velocity=Velocity;if(jQuery$1!==$_GLOBAL$2){/* Assign the element function to Velocity's core animate() method. */jQuery$1.fn.velocity=animate;/* Assign the object function's defaults to Velocity's jQuery defaults object. */jQuery$1.fn.velocity.defaults=Velocity.defaults;}/***********************
       Packaged Redirects
    ***********************//* slideUp, slideDown */$$2.each(["Down","Up"],function(i,direction){Velocity.Redirects["slide"+direction]=function(element,options,elementsIndex,elementsSize,elements,promiseData){var opts=$$2.extend({},options),begin=opts.begin,complete=opts.complete,computedValues={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},inlineValues={};if(opts.display===undefined){/* Show the element before slideDown begins and hide the element after slideUp completes. *//* Note: Inline elements cannot have dimensions animated, so they're reverted to inline-block. */opts.display=direction==="Down"?Velocity.CSS.Values.getDisplayType(element)==="inline"?"inline-block":"block":"none";}opts.begin=function(){/* If the user passed in a begin callback, fire it now. */begin&&begin.call(elements,elements);/* Cache the elements' original vertical dimensional property values so that we can animate back to them. */for(var property in computedValues){inlineValues[property]=element.style[property];/* For slideDown, use forcefeeding to animate all vertical properties from 0. For slideUp,
                       use forcefeeding to start from computed values and animate down to 0. */var propertyValue=Velocity.CSS.getPropertyValue(element,property);computedValues[property]=direction==="Down"?[propertyValue,0]:[0,propertyValue];}/* Force vertical overflow content to clip so that sliding works as expected. */inlineValues.overflow=element.style.overflow;element.style.overflow="hidden";};opts.complete=function(){/* Reset element to its pre-slide inline values once its slide animation is complete. */for(var property in inlineValues){element.style[property]=inlineValues[property];}/* If the user passed in a complete callback, fire it now. */complete&&complete.call(elements,elements);promiseData&&promiseData.resolver(elements);};Velocity(element,computedValues,opts);};});/* fadeIn, fadeOut */$$2.each(["In","Out"],function(i,direction){Velocity.Redirects["fade"+direction]=function(element,options,elementsIndex,elementsSize,elements,promiseData){var opts=$$2.extend({},options),propertiesMap={opacity:direction==="In"?1:0},originalComplete=opts.complete;/* Since redirects are triggered individually for each element in the animated set, avoid repeatedly triggering
               callbacks by firing them only when the final element has been reached. */if(elementsIndex!==elementsSize-1){opts.complete=opts.begin=null;}else{opts.complete=function(){if(originalComplete){originalComplete.call(elements,elements);}promiseData&&promiseData.resolver(elements);};}/* If a display was passed in, use it. Otherwise, default to "none" for fadeOut or the element-specific default for fadeIn. *//* Note: We allow users to pass in "null" to skip display setting altogether. */if(opts.display===undefined){opts.display=direction==="In"?"auto":"none";}Velocity(this,propertiesMap,opts);};});velocityVersion=Velocity.version;requiredVersion={major:1,minor:1,patch:0};if(greaterSemver(requiredVersion,velocityVersion)){abortError="Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";alert(abortError);throw new Error(abortError);}/************************
       Effect Registration
    ************************//* Note: RegisterUI is a legacy name. */Velocity.RegisterEffect=Velocity.RegisterUI=function(effectName,properties){/* Animate the expansion/contraction of the elements' parent's height for In/Out effects. */function animateParentHeight(elements,direction,totalDuration,stagger){var totalHeightDelta=0,parentNode;/* Sum the total height (including padding and margin) of all targeted elements. */$$2.each(elements.nodeType?[elements]:elements,function(i,element){if(stagger){/* Increase the totalDuration by the successive delay amounts produced by the stagger option. */totalDuration+=i*stagger;}parentNode=element.parentNode;$$2.each(["height","paddingTop","paddingBottom","marginTop","marginBottom"],function(i,property){totalHeightDelta+=parseFloat(Velocity.CSS.getPropertyValue(element,property));});});/* Animate the parent element's height adjustment (with a varying duration multiplier for aesthetic benefits). */Velocity.animate(parentNode,{height:(direction==="In"?"+":"-")+"="+totalHeightDelta},{queue:false,easing:"ease-in-out",duration:totalDuration*(direction==="In"?0.6:1)});}/* Register a custom redirect for each effect. */Velocity.Redirects[effectName]=function(element,redirectOptions,elementsIndex,elementsSize,elements,promiseData){var finalElement=elementsIndex===elementsSize-1;if(typeof properties.defaultDuration==="function"){properties.defaultDuration=properties.defaultDuration.call(elements,elements);}else{properties.defaultDuration=parseFloat(properties.defaultDuration);}/* Iterate through each effect's call array. */for(var callIndex=0;callIndex<properties.calls.length;callIndex++){var call=properties.calls[callIndex],propertyMap=call[0],redirectDuration=redirectOptions.duration||properties.defaultDuration||1000,durationPercentage=call[1],callOptions=call[2]||{},opts={};/* Assign the whitelisted per-call options. */opts.duration=redirectDuration*(durationPercentage||1);opts.queue=redirectOptions.queue||"";opts.easing=callOptions.easing||"ease";opts.delay=parseFloat(callOptions.delay)||0;opts._cacheValues=callOptions._cacheValues||true;/* Special processing for the first effect call. */if(callIndex===0){/* If a delay was passed into the redirect, combine it with the first call's delay. */opts.delay+=parseFloat(redirectOptions.delay)||0;if(elementsIndex===0){opts.begin=function(){/* Only trigger a begin callback on the first effect call with the first element in the set. */redirectOptions.begin&&redirectOptions.begin.call(elements,elements);var direction=effectName.match(/(In|Out)$/);/* Make "in" transitioning elements invisible immediately so that there's no FOUC between now
                               and the first RAF tick. */if(direction&&direction[0]==="In"&&propertyMap.opacity!==undefined){$$2.each(elements.nodeType?[elements]:elements,function(i,element){Velocity.CSS.setPropertyValue(element,"opacity",0);});}/* Only trigger animateParentHeight() if we're using an In/Out transition. */if(redirectOptions.animateParentHeight&&direction){animateParentHeight(elements,direction[0],redirectDuration+opts.delay,redirectOptions.stagger);}};}/* If the user isn't overriding the display option, default to "auto" for "In"-suffixed transitions. */if(redirectOptions.display!==null){if(redirectOptions.display!==undefined&&redirectOptions.display!=="none"){opts.display=redirectOptions.display;}else if(/In$/.test(effectName)){/* Inline elements cannot be subjected to transforms, so we switch them to inline-block. */var defaultDisplay=Velocity.CSS.Values.getDisplayType(element);opts.display=defaultDisplay==="inline"?"inline-block":defaultDisplay;}}if(redirectOptions.visibility&&redirectOptions.visibility!=="hidden"){opts.visibility=redirectOptions.visibility;}}/* Special processing for the last effect call. */if(callIndex===properties.calls.length-1){(function(){/* Append promise resolving onto the user's redirect callback. */var injectFinalCallbacks=function injectFinalCallbacks(){if((redirectOptions.display===undefined||redirectOptions.display==="none")&&/Out$/.test(effectName)){$$2.each(elements.nodeType?[elements]:elements,function(i,element){Velocity.CSS.setPropertyValue(element,"display","none");});}redirectOptions.complete&&redirectOptions.complete.call(elements,elements);if(promiseData){promiseData.resolver(elements||element);}};opts.complete=function(){if(properties.reset){for(var resetProperty in properties.reset){var resetValue=properties.reset[resetProperty];/* Format each non-array value in the reset property map to [ value, value ] so that changes apply
                                   immediately and DOM querying is avoided (via forcefeeding). *//* Note: Don't forcefeed hooks, otherwise their hook roots will be defaulted to their null values. */if(Velocity.CSS.Hooks.registered[resetProperty]===undefined&&(typeof resetValue==="string"||typeof resetValue==="number")){properties.reset[resetProperty]=[properties.reset[resetProperty],properties.reset[resetProperty]];}}/* So that the reset values are applied instantly upon the next rAF tick, use a zero duration and parallel queueing. */var resetOptions={duration:0,queue:false};/* Since the reset option uses up the complete callback, we trigger the user's complete callback at the end of ours. */if(finalElement){resetOptions.complete=injectFinalCallbacks;}Velocity.animate(element,properties.reset,resetOptions);/* Only trigger the user's complete callback on the last effect call with the last element in the set. */}else if(finalElement){injectFinalCallbacks();}};if(redirectOptions.visibility==="hidden"){opts.visibility=redirectOptions.visibility;}})();}Velocity.animate(element,propertyMap,opts);}};/* Return the Velocity object so that RegisterUI calls can be chained. */return Velocity;};/*********************
       Packaged Effects
    *********************//* Externalize the packagedEffects data so that they can optionally be modified and re-registered. *//* Support: <=IE8: Callouts will have no effect, and transitions will simply fade in/out. IE9/Android 2.3: Most effects are fully supported, the rest fade in/out. All other browsers: full support. */Velocity.RegisterEffect.packagedEffects={/* Animate.css */"callout.bounce":{defaultDuration:550,calls:[[{translateY:-30},0.25],[{translateY:0},0.125],[{translateY:-15},0.125],[{translateY:0},0.25]]},/* Animate.css */"callout.shake":{defaultDuration:800,calls:[[{translateX:-11},0.125],[{translateX:11},0.125],[{translateX:-11},0.125],[{translateX:11},0.125],[{translateX:-11},0.125],[{translateX:11},0.125],[{translateX:-11},0.125],[{translateX:0},0.125]]},/* Animate.css */"callout.flash":{defaultDuration:1100,calls:[[{opacity:[0,"easeInOutQuad",1]},0.25],[{opacity:[1,"easeInOutQuad"]},0.25],[{opacity:[0,"easeInOutQuad"]},0.25],[{opacity:[1,"easeInOutQuad"]},0.25]]},/* Animate.css */"callout.pulse":{defaultDuration:825,calls:[[{scaleX:1.1,scaleY:1.1},0.50,{easing:"easeInExpo"}],[{scaleX:1,scaleY:1},0.50]]},/* Animate.css */"callout.swing":{defaultDuration:950,calls:[[{rotateZ:15},0.20],[{rotateZ:-10},0.20],[{rotateZ:5},0.20],[{rotateZ:-5},0.20],[{rotateZ:0},0.20]]},/* Animate.css */"callout.tada":{defaultDuration:1000,calls:[[{scaleX:0.9,scaleY:0.9,rotateZ:-3},0.10],[{scaleX:1.1,scaleY:1.1,rotateZ:3},0.10],[{scaleX:1.1,scaleY:1.1,rotateZ:-3},0.10],["reverse",0.125],["reverse",0.125],["reverse",0.125],["reverse",0.125],["reverse",0.125],[{scaleX:1,scaleY:1,rotateZ:0},0.20]]},"transition.fadeIn":{defaultDuration:500,calls:[[{opacity:[1,0]}]]},"transition.fadeOut":{defaultDuration:500,calls:[[{opacity:[0,1]}]]},/* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.flipXIn":{defaultDuration:700,calls:[[{opacity:[1,0],transformPerspective:[800,800],rotateY:[0,-55]}]],reset:{transformPerspective:0}},/* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.flipXOut":{defaultDuration:700,calls:[[{opacity:[0,1],transformPerspective:[800,800],rotateY:55}]],reset:{transformPerspective:0,rotateY:0}},/* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.flipYIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],rotateX:[0,-45]}]],reset:{transformPerspective:0}},/* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.flipYOut":{defaultDuration:800,calls:[[{opacity:[0,1],transformPerspective:[800,800],rotateX:25}]],reset:{transformPerspective:0,rotateX:0}},/* Animate.css *//* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.flipBounceXIn":{defaultDuration:900,calls:[[{opacity:[0.725,0],transformPerspective:[400,400],rotateY:[-10,90]},0.50],[{opacity:0.80,rotateY:10},0.25],[{opacity:1,rotateY:0},0.25]],reset:{transformPerspective:0}},/* Animate.css *//* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.flipBounceXOut":{defaultDuration:800,calls:[[{opacity:[0.9,1],transformPerspective:[400,400],rotateY:-10},0.50],[{opacity:0,rotateY:90},0.50]],reset:{transformPerspective:0,rotateY:0}},/* Animate.css *//* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.flipBounceYIn":{defaultDuration:850,calls:[[{opacity:[0.725,0],transformPerspective:[400,400],rotateX:[-10,90]},0.50],[{opacity:0.80,rotateX:10},0.25],[{opacity:1,rotateX:0},0.25]],reset:{transformPerspective:0}},/* Animate.css *//* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.flipBounceYOut":{defaultDuration:800,calls:[[{opacity:[0.9,1],transformPerspective:[400,400],rotateX:-15},0.50],[{opacity:0,rotateX:90},0.50]],reset:{transformPerspective:0,rotateX:0}},/* Magic.css */"transition.swoopIn":{defaultDuration:850,calls:[[{opacity:[1,0],transformOriginX:["100%","50%"],transformOriginY:["100%","100%"],scaleX:[1,0],scaleY:[1,0],translateX:[0,-700],translateZ:0}]],reset:{transformOriginX:"50%",transformOriginY:"50%"}},/* Magic.css */"transition.swoopOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformOriginX:["50%","100%"],transformOriginY:["100%","100%"],scaleX:0,scaleY:0,translateX:-700,translateZ:0}]],reset:{transformOriginX:"50%",transformOriginY:"50%",scaleX:1,scaleY:1,translateX:0}},/* Magic.css *//* Support: Loses rotation in IE9/Android 2.3. (Fades and scales only.) */"transition.whirlIn":{defaultDuration:850,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,0],scaleY:[1,0],rotateY:[0,160]},1,{easing:"easeInOutSine"}]]},/* Magic.css *//* Support: Loses rotation in IE9/Android 2.3. (Fades and scales only.) */"transition.whirlOut":{defaultDuration:750,calls:[[{opacity:[0,"easeInOutQuint",1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:0,scaleY:0,rotateY:160},1,{easing:"swing"}]],reset:{scaleX:1,scaleY:1,rotateY:0}},"transition.shrinkIn":{defaultDuration:750,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,1.5],scaleY:[1,1.5],translateZ:0}]]},"transition.shrinkOut":{defaultDuration:600,calls:[[{opacity:[0,1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:1.3,scaleY:1.3,translateZ:0}]],reset:{scaleX:1,scaleY:1}},"transition.expandIn":{defaultDuration:700,calls:[[{opacity:[1,0],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:[1,0.625],scaleY:[1,0.625],translateZ:0}]]},"transition.expandOut":{defaultDuration:700,calls:[[{opacity:[0,1],transformOriginX:["50%","50%"],transformOriginY:["50%","50%"],scaleX:0.5,scaleY:0.5,translateZ:0}]],reset:{scaleX:1,scaleY:1}},/* Animate.css */"transition.bounceIn":{defaultDuration:800,calls:[[{opacity:[1,0],scaleX:[1.05,0.3],scaleY:[1.05,0.3]},0.40],[{scaleX:0.9,scaleY:0.9,translateZ:0},0.20],[{scaleX:1,scaleY:1},0.50]]},/* Animate.css */"transition.bounceOut":{defaultDuration:800,calls:[[{scaleX:0.95,scaleY:0.95},0.35],[{scaleX:1.1,scaleY:1.1,translateZ:0},0.35],[{opacity:[0,1],scaleX:0.3,scaleY:0.3},0.30]],reset:{scaleX:1,scaleY:1}},/* Animate.css */"transition.bounceUpIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateY:[-30,1000]},0.60,{easing:"easeOutCirc"}],[{translateY:10},0.20],[{translateY:0},0.20]]},/* Animate.css */"transition.bounceUpOut":{defaultDuration:1000,calls:[[{translateY:20},0.20],[{opacity:[0,"easeInCirc",1],translateY:-1000},0.80]],reset:{translateY:0}},/* Animate.css */"transition.bounceDownIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateY:[30,-1000]},0.60,{easing:"easeOutCirc"}],[{translateY:-10},0.20],[{translateY:0},0.20]]},/* Animate.css */"transition.bounceDownOut":{defaultDuration:1000,calls:[[{translateY:-20},0.20],[{opacity:[0,"easeInCirc",1],translateY:1000},0.80]],reset:{translateY:0}},/* Animate.css */"transition.bounceLeftIn":{defaultDuration:750,calls:[[{opacity:[1,0],translateX:[30,-1250]},0.60,{easing:"easeOutCirc"}],[{translateX:-10},0.20],[{translateX:0},0.20]]},/* Animate.css */"transition.bounceLeftOut":{defaultDuration:750,calls:[[{translateX:30},0.20],[{opacity:[0,"easeInCirc",1],translateX:-1250},0.80]],reset:{translateX:0}},/* Animate.css */"transition.bounceRightIn":{defaultDuration:750,calls:[[{opacity:[1,0],translateX:[-30,1250]},0.60,{easing:"easeOutCirc"}],[{translateX:10},0.20],[{translateX:0},0.20]]},/* Animate.css */"transition.bounceRightOut":{defaultDuration:750,calls:[[{translateX:-30},0.20],[{opacity:[0,"easeInCirc",1],translateX:1250},0.80]],reset:{translateX:0}},"transition.slideUpIn":{defaultDuration:900,calls:[[{opacity:[1,0],translateY:[0,20],translateZ:0}]]},"transition.slideUpOut":{defaultDuration:900,calls:[[{opacity:[0,1],translateY:-20,translateZ:0}]],reset:{translateY:0}},"transition.slideDownIn":{defaultDuration:900,calls:[[{opacity:[1,0],translateY:[0,-20],translateZ:0}]]},"transition.slideDownOut":{defaultDuration:900,calls:[[{opacity:[0,1],translateY:20,translateZ:0}]],reset:{translateY:0}},"transition.slideLeftIn":{defaultDuration:1000,calls:[[{opacity:[1,0],translateX:[0,-20],translateZ:0}]]},"transition.slideLeftOut":{defaultDuration:1050,calls:[[{opacity:[0,1],translateX:-20,translateZ:0}]],reset:{translateX:0}},"transition.slideRightIn":{defaultDuration:1000,calls:[[{opacity:[1,0],translateX:[0,20],translateZ:0}]]},"transition.slideRightOut":{defaultDuration:1050,calls:[[{opacity:[0,1],translateX:20,translateZ:0}]],reset:{translateX:0}},"transition.slideUpBigIn":{defaultDuration:850,calls:[[{opacity:[1,0],translateY:[0,75],translateZ:0}]]},"transition.slideUpBigOut":{defaultDuration:800,calls:[[{opacity:[0,1],translateY:-75,translateZ:0}]],reset:{translateY:0}},"transition.slideDownBigIn":{defaultDuration:850,calls:[[{opacity:[1,0],translateY:[0,-75],translateZ:0}]]},"transition.slideDownBigOut":{defaultDuration:800,calls:[[{opacity:[0,1],translateY:75,translateZ:0}]],reset:{translateY:0}},"transition.slideLeftBigIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateX:[0,-75],translateZ:0}]]},"transition.slideLeftBigOut":{defaultDuration:750,calls:[[{opacity:[0,1],translateX:-75,translateZ:0}]],reset:{translateX:0}},"transition.slideRightBigIn":{defaultDuration:800,calls:[[{opacity:[1,0],translateX:[0,75],translateZ:0}]]},"transition.slideRightBigOut":{defaultDuration:750,calls:[[{opacity:[0,1],translateX:75,translateZ:0}]],reset:{translateX:0}},/* Magic.css */"transition.perspectiveUpIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:["100%","100%"],rotateX:[0,-180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},/* Magic.css *//* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.perspectiveUpOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:["100%","100%"],rotateX:-180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateX:0}},/* Magic.css *//* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.perspectiveDownIn":{defaultDuration:800,calls:[[{opacity:[1,0],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:[0,0],rotateX:[0,180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},/* Magic.css *//* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.perspectiveDownOut":{defaultDuration:850,calls:[[{opacity:[0,1],transformPerspective:[800,800],transformOriginX:[0,0],transformOriginY:[0,0],rotateX:180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateX:0}},/* Magic.css *//* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.perspectiveLeftIn":{defaultDuration:950,calls:[[{opacity:[1,0],transformPerspective:[2000,2000],transformOriginX:[0,0],transformOriginY:[0,0],rotateY:[0,-180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},/* Magic.css *//* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.perspectiveLeftOut":{defaultDuration:950,calls:[[{opacity:[0,1],transformPerspective:[2000,2000],transformOriginX:[0,0],transformOriginY:[0,0],rotateY:-180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateY:0}},/* Magic.css *//* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.perspectiveRightIn":{defaultDuration:950,calls:[[{opacity:[1,0],transformPerspective:[2000,2000],transformOriginX:["100%","100%"],transformOriginY:[0,0],rotateY:[0,180]}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%"}},/* Magic.css *//* Support: Loses rotation in IE9/Android 2.3 (fades only). */"transition.perspectiveRightOut":{defaultDuration:950,calls:[[{opacity:[0,1],transformPerspective:[2000,2000],transformOriginX:["100%","100%"],transformOriginY:[0,0],rotateY:180}]],reset:{transformPerspective:0,transformOriginX:"50%",transformOriginY:"50%",rotateY:0}}};/* Register the packaged effects. */for(effectName in Velocity.RegisterEffect.packagedEffects){Velocity.RegisterEffect(effectName,Velocity.RegisterEffect.packagedEffects[effectName]);}/*********************
       Sequence Running
    **********************//* Note: Sequence calls must use Velocity's single-object arguments syntax. */Velocity.RunSequence=function(originalSequence){var sequence=$$2.extend(true,[],originalSequence);if(sequence.length>1){$$2.each(sequence.reverse(),function(i,currentCall){var nextCall=sequence[i+1];if(nextCall){/* Parallel sequence calls (indicated via sequenceQueue:false) are triggered
                       in the previous call's begin callback. Otherwise, chained calls are normally triggered
                       in the previous call's complete callback. */var currentCallOptions=currentCall.o||currentCall.options,nextCallOptions=nextCall.o||nextCall.options;var timing=currentCallOptions&&currentCallOptions.sequenceQueue===false?"begin":"complete",callbackOriginal=nextCallOptions&&nextCallOptions[timing],options={};options[timing]=function(){var nextCallElements=nextCall.e||nextCall.elements;var elements=nextCallElements.nodeType?[nextCallElements]:nextCallElements;callbackOriginal&&callbackOriginal.call(elements,elements);Velocity(currentCall);};if(nextCall.o){nextCall.o=$$2.extend({},nextCallOptions,options);}else{nextCall.options=$$2.extend({},nextCallOptions,options);}}});sequence.reverse();}Velocity(sequence[0]);};$_GLOBAL$3=typeof window!=='undefined'?window:typeof global!=='undefined'?global:Function('return this')();document$3=$_GLOBAL$3.document;VENDOR_PREFIXES=['','webkit','Moz','MS','ms','o'];TEST_ELEMENT=document$3.createElement('div');TYPE_FUNCTION='function';round=Math.round;abs=Math.abs;now=Date.now;if(typeof Object.assign!=='function'){assign=function assign(target){if(target===undefined||target===null){throw new TypeError('Cannot convert undefined or null to object');}var output=Object(target);for(var index=1;index<arguments.length;index++){var source=arguments[index];if(source!==undefined&&source!==null){for(var nextKey in source){if(source.hasOwnProperty(nextKey)){output[nextKey]=source[nextKey];}}}}return output;};}else{assign=Object.assign;}/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */extend=deprecate(function extend(dest,src,merge){var keys=Object.keys(src);var i=0;while(i<keys.length){if(!merge||merge&&dest[keys[i]]===undefined){dest[keys[i]]=src[keys[i]];}i++;}return dest;},'extend','Use `assign`.');merge=deprecate(function merge(dest,src){return extend(dest,src,true);},'merge','Use `assign`.');_uniqueId=1;MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android/i;SUPPORT_TOUCH='ontouchstart'in $_GLOBAL$3;SUPPORT_POINTER_EVENTS=prefixed(window,'PointerEvent')!==undefined;SUPPORT_ONLY_TOUCH=SUPPORT_TOUCH&&MOBILE_REGEX.test(navigator.userAgent);INPUT_TYPE_TOUCH='touch';INPUT_TYPE_PEN='pen';INPUT_TYPE_MOUSE='mouse';INPUT_TYPE_KINECT='kinect';COMPUTE_INTERVAL=25;INPUT_START=1;INPUT_MOVE=2;INPUT_END=4;INPUT_CANCEL=8;DIRECTION_NONE=1;DIRECTION_LEFT=2;DIRECTION_RIGHT=4;DIRECTION_UP=8;DIRECTION_DOWN=16;DIRECTION_HORIZONTAL=DIRECTION_LEFT|DIRECTION_RIGHT;DIRECTION_VERTICAL=DIRECTION_UP|DIRECTION_DOWN;DIRECTION_ALL=DIRECTION_HORIZONTAL|DIRECTION_VERTICAL;PROPS_XY=['x','y'];PROPS_CLIENT_XY=['clientX','clientY'];Input.prototype={/**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */handler:function handler(){},/**
     * bind the events
     */init:function init(){this.evEl&&addEventListeners(this.element,this.evEl,this.domHandler);this.evTarget&&addEventListeners(this.target,this.evTarget,this.domHandler);this.evWin&&addEventListeners(getWindowForElement(this.element),this.evWin,this.domHandler);},/**
     * unbind the events
     */destroy:function destroy(){this.evEl&&removeEventListeners(this.element,this.evEl,this.domHandler);this.evTarget&&removeEventListeners(this.target,this.evTarget,this.domHandler);this.evWin&&removeEventListeners(getWindowForElement(this.element),this.evWin,this.domHandler);}};MOUSE_INPUT_MAP={mousedown:INPUT_START,mousemove:INPUT_MOVE,mouseup:INPUT_END};MOUSE_ELEMENT_EVENTS='mousedown';MOUSE_WINDOW_EVENTS='mousemove mouseup';inherit(MouseInput,Input,{/**
     * handle mouse events
     * @param {Object} ev
     */handler:function MEhandler(ev){var eventType=MOUSE_INPUT_MAP[ev.type];// on start we want to have the left mouse button down
if(eventType&INPUT_START&&ev.button===0){this.pressed=true;}if(eventType&INPUT_MOVE&&ev.which!==1){eventType=INPUT_END;}// mouse must be down
if(!this.pressed){return;}if(eventType&INPUT_END){this.pressed=false;}this.callback(this.manager,eventType,{pointers:[ev],changedPointers:[ev],pointerType:INPUT_TYPE_MOUSE,srcEvent:ev});}});POINTER_INPUT_MAP={pointerdown:INPUT_START,pointermove:INPUT_MOVE,pointerup:INPUT_END,pointercancel:INPUT_CANCEL,pointerout:INPUT_CANCEL};IE10_POINTER_TYPE_ENUM={2:INPUT_TYPE_TOUCH,3:INPUT_TYPE_PEN,4:INPUT_TYPE_MOUSE,5:INPUT_TYPE_KINECT// see https://twitter.com/jacobrossi/status/480596438489890816
};POINTER_ELEMENT_EVENTS='pointerdown';POINTER_WINDOW_EVENTS='pointermove pointerup pointercancel';// IE10 has prefixed support, and case-sensitive
if($_GLOBAL$3.MSPointerEvent&&!window.PointerEvent){POINTER_ELEMENT_EVENTS='MSPointerDown';POINTER_WINDOW_EVENTS='MSPointerMove MSPointerUp MSPointerCancel';}inherit(PointerEventInput,Input,{/**
     * handle mouse events
     * @param {Object} ev
     */handler:function PEhandler(ev){var store=this.store;var removePointer=false;var eventTypeNormalized=ev.type.toLowerCase().replace('ms','');var eventType=POINTER_INPUT_MAP[eventTypeNormalized];var pointerType=IE10_POINTER_TYPE_ENUM[ev.pointerType]||ev.pointerType;var isTouch=pointerType==INPUT_TYPE_TOUCH;// get index of the event in the store
var storeIndex=inArray(store,ev.pointerId,'pointerId');// start and mouse must be down
if(eventType&INPUT_START&&(ev.button===0||isTouch)){if(storeIndex<0){store.push(ev);storeIndex=store.length-1;}}else if(eventType&(INPUT_END|INPUT_CANCEL)){removePointer=true;}// it not found, so the pointer hasn't been down (so it's probably a hover)
if(storeIndex<0){return;}// update the event in the store
store[storeIndex]=ev;this.callback(this.manager,eventType,{pointers:store,changedPointers:[ev],pointerType:pointerType,srcEvent:ev});if(removePointer){// remove from the store
store.splice(storeIndex,1);}}});SINGLE_TOUCH_INPUT_MAP={touchstart:INPUT_START,touchmove:INPUT_MOVE,touchend:INPUT_END,touchcancel:INPUT_CANCEL};SINGLE_TOUCH_TARGET_EVENTS='touchstart';SINGLE_TOUCH_WINDOW_EVENTS='touchstart touchmove touchend touchcancel';inherit(SingleTouchInput,Input,{handler:function TEhandler(ev){var type=SINGLE_TOUCH_INPUT_MAP[ev.type];// should we handle the touch events?
if(type===INPUT_START){this.started=true;}if(!this.started){return;}var touches=normalizeSingleTouches.call(this,ev,type);// when done, reset the started state
if(type&(INPUT_END|INPUT_CANCEL)&&touches[0].length-touches[1].length===0){this.started=false;}this.callback(this.manager,type,{pointers:touches[0],changedPointers:touches[1],pointerType:INPUT_TYPE_TOUCH,srcEvent:ev});}});TOUCH_INPUT_MAP={touchstart:INPUT_START,touchmove:INPUT_MOVE,touchend:INPUT_END,touchcancel:INPUT_CANCEL};TOUCH_TARGET_EVENTS='touchstart touchmove touchend touchcancel';inherit(TouchInput,Input,{handler:function MTEhandler(ev){var type=TOUCH_INPUT_MAP[ev.type];var touches=getTouches.call(this,ev,type);if(!touches){return;}this.callback(this.manager,type,{pointers:touches[0],changedPointers:touches[1],pointerType:INPUT_TYPE_TOUCH,srcEvent:ev});}});DEDUP_TIMEOUT=2500;DEDUP_DISTANCE=25;inherit(TouchMouseInput,Input,{/**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */handler:function TMEhandler(manager,inputEvent,inputData){var isTouch=inputData.pointerType==INPUT_TYPE_TOUCH,isMouse=inputData.pointerType==INPUT_TYPE_MOUSE;if(isMouse&&inputData.sourceCapabilities&&inputData.sourceCapabilities.firesTouchEvents){return;}// when we're in a touch event, record touches to  de-dupe synthetic mouse event
if(isTouch){recordTouches.call(this,inputEvent,inputData);}else if(isMouse&&isSyntheticEvent.call(this,inputData)){return;}this.callback(manager,inputEvent,inputData);},/**
     * remove the event listeners
     */destroy:function destroy(){this.touch.destroy();this.mouse.destroy();}});PREFIXED_TOUCH_ACTION=prefixed(TEST_ELEMENT.style,'touchAction');NATIVE_TOUCH_ACTION=PREFIXED_TOUCH_ACTION!==undefined;TOUCH_ACTION_COMPUTE='compute';TOUCH_ACTION_AUTO='auto';TOUCH_ACTION_MANIPULATION='manipulation';TOUCH_ACTION_NONE='none';TOUCH_ACTION_PAN_X='pan-x';TOUCH_ACTION_PAN_Y='pan-y';TOUCH_ACTION_MAP=getTouchActionProps();TouchAction.prototype={/**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */set:function set(value){// find out the touch-action by the event handlers
if(value==TOUCH_ACTION_COMPUTE){value=this.compute();}if(NATIVE_TOUCH_ACTION&&this.manager.element.style&&TOUCH_ACTION_MAP[value]){this.manager.element.style[PREFIXED_TOUCH_ACTION]=value;}this.actions=value.toLowerCase().trim();},/**
     * just re-set the touchAction value
     */update:function update(){this.set(this.manager.options.touchAction);},/**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */compute:function compute(){var actions=[];each(this.manager.recognizers,function(recognizer){if(boolOrFn(recognizer.options.enable,[recognizer])){actions=actions.concat(recognizer.getTouchAction());}});return cleanTouchActions(actions.join(' '));},/**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */preventDefaults:function preventDefaults(input){var srcEvent=input.srcEvent;var direction=input.offsetDirection;// if the touch action did prevented once this session
if(this.manager.session.prevented){srcEvent.preventDefault();return;}var actions=this.actions;var hasNone=inStr(actions,TOUCH_ACTION_NONE)&&!TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];var hasPanY=inStr(actions,TOUCH_ACTION_PAN_Y)&&!TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];var hasPanX=inStr(actions,TOUCH_ACTION_PAN_X)&&!TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];if(hasNone){//do not prevent defaults if this is a tap gesture
var isTapPointer=input.pointers.length===1;var isTapMovement=input.distance<2;var isTapTouchTime=input.deltaTime<250;if(isTapPointer&&isTapMovement&&isTapTouchTime){return;}}if(hasPanX&&hasPanY){// `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
return;}if(hasNone||hasPanY&&direction&DIRECTION_HORIZONTAL||hasPanX&&direction&DIRECTION_VERTICAL){return this.preventSrc(srcEvent);}},/**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */preventSrc:function preventSrc(srcEvent){this.manager.session.prevented=true;srcEvent.preventDefault();}};STATE_POSSIBLE=1;STATE_BEGAN=2;STATE_CHANGED=4;STATE_ENDED=8;STATE_RECOGNIZED=STATE_ENDED;STATE_CANCELLED=16;STATE_FAILED=32;Recognizer.prototype={/**
     * @virtual
     * @type {Object}
     */defaults:{},/**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */set:function set(options){assign(this.options,options);// also update the touchAction, in case something changed about the directions/enabled state
this.manager&&this.manager.touchAction.update();return this;},/**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */recognizeWith:function recognizeWith(otherRecognizer){if(invokeArrayArg(otherRecognizer,'recognizeWith',this)){return this;}var simultaneous=this.simultaneous;otherRecognizer=getRecognizerByNameIfManager(otherRecognizer,this);if(!simultaneous[otherRecognizer.id]){simultaneous[otherRecognizer.id]=otherRecognizer;otherRecognizer.recognizeWith(this);}return this;},/**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */dropRecognizeWith:function dropRecognizeWith(otherRecognizer){if(invokeArrayArg(otherRecognizer,'dropRecognizeWith',this)){return this;}otherRecognizer=getRecognizerByNameIfManager(otherRecognizer,this);delete this.simultaneous[otherRecognizer.id];return this;},/**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */requireFailure:function requireFailure(otherRecognizer){if(invokeArrayArg(otherRecognizer,'requireFailure',this)){return this;}var requireFail=this.requireFail;otherRecognizer=getRecognizerByNameIfManager(otherRecognizer,this);if(inArray(requireFail,otherRecognizer)===-1){requireFail.push(otherRecognizer);otherRecognizer.requireFailure(this);}return this;},/**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */dropRequireFailure:function dropRequireFailure(otherRecognizer){if(invokeArrayArg(otherRecognizer,'dropRequireFailure',this)){return this;}otherRecognizer=getRecognizerByNameIfManager(otherRecognizer,this);var index=inArray(this.requireFail,otherRecognizer);if(index>-1){this.requireFail.splice(index,1);}return this;},/**
     * has require failures boolean
     * @returns {boolean}
     */hasRequireFailures:function hasRequireFailures(){return this.requireFail.length>0;},/**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */canRecognizeWith:function canRecognizeWith(otherRecognizer){return!!this.simultaneous[otherRecognizer.id];},/**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */emit:function emit(input){var self=this;var state=this.state;function emit(event){self.manager.emit(event,input);}// 'panstart' and 'panmove'
if(state<STATE_ENDED){emit(self.options.event+stateStr(state));}emit(self.options.event);// simple 'eventName' events
if(input.additionalEvent){// additional event(panleft, panright, pinchin, pinchout...)
emit(input.additionalEvent);}// panend and pancancel
if(state>=STATE_ENDED){emit(self.options.event+stateStr(state));}},/**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */tryEmit:function tryEmit(input){if(this.canEmit()){return this.emit(input);}// it's failing anyway
this.state=STATE_FAILED;},/**
     * can we emit?
     * @returns {boolean}
     */canEmit:function canEmit(){var i=0;while(i<this.requireFail.length){if(!(this.requireFail[i].state&(STATE_FAILED|STATE_POSSIBLE))){return false;}i++;}return true;},/**
     * update the recognizer
     * @param {Object} inputData
     */recognize:function recognize(inputData){// make a new copy of the inputData
// so we can change the inputData without messing up the other recognizers
var inputDataClone=assign({},inputData);// is is enabled and allow recognizing?
if(!boolOrFn(this.options.enable,[this,inputDataClone])){this.reset();this.state=STATE_FAILED;return;}// reset when we've reached the end
if(this.state&(STATE_RECOGNIZED|STATE_CANCELLED|STATE_FAILED)){this.state=STATE_POSSIBLE;}this.state=this.process(inputDataClone);// the recognizer has recognized a gesture
// so trigger an event
if(this.state&(STATE_BEGAN|STATE_CHANGED|STATE_ENDED|STATE_CANCELLED)){this.tryEmit(inputDataClone);}},/**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */process:function process(inputData){},// jshint ignore:line
/**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */getTouchAction:function getTouchAction(){},/**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */reset:function reset(){}};inherit(AttrRecognizer,Recognizer,{/**
     * @namespace
     * @memberof AttrRecognizer
     */defaults:{/**
         * @type {Number}
         * @default 1
         */pointers:1},/**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */attrTest:function attrTest(input){var optionPointers=this.options.pointers;return optionPointers===0||input.pointers.length===optionPointers;},/**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */process:function process(input){var state=this.state;var eventType=input.eventType;var isRecognized=state&(STATE_BEGAN|STATE_CHANGED);var isValid=this.attrTest(input);// on cancel input and we've recognized before, return STATE_CANCELLED
if(isRecognized&&(eventType&INPUT_CANCEL||!isValid)){return state|STATE_CANCELLED;}else if(isRecognized||isValid){if(eventType&INPUT_END){return state|STATE_ENDED;}else if(!(state&STATE_BEGAN)){return STATE_BEGAN;}return state|STATE_CHANGED;}return STATE_FAILED;}});inherit(PanRecognizer,AttrRecognizer,{/**
     * @namespace
     * @memberof PanRecognizer
     */defaults:{event:'pan',threshold:10,pointers:1,direction:DIRECTION_ALL},getTouchAction:function getTouchAction(){var direction=this.options.direction;var actions=[];if(direction&DIRECTION_HORIZONTAL){actions.push(TOUCH_ACTION_PAN_Y);}if(direction&DIRECTION_VERTICAL){actions.push(TOUCH_ACTION_PAN_X);}return actions;},directionTest:function directionTest(input){var options=this.options;var hasMoved=true;var distance=input.distance;var direction=input.direction;var x=input.deltaX;var y=input.deltaY;// lock to axis?
if(!(direction&options.direction)){if(options.direction&DIRECTION_HORIZONTAL){direction=x===0?DIRECTION_NONE:x<0?DIRECTION_LEFT:DIRECTION_RIGHT;hasMoved=x!=this.pX;distance=Math.abs(input.deltaX);}else{direction=y===0?DIRECTION_NONE:y<0?DIRECTION_UP:DIRECTION_DOWN;hasMoved=y!=this.pY;distance=Math.abs(input.deltaY);}}input.direction=direction;return hasMoved&&distance>options.threshold&&direction&options.direction;},attrTest:function attrTest(input){return AttrRecognizer.prototype.attrTest.call(this,input)&&(this.state&STATE_BEGAN||!(this.state&STATE_BEGAN)&&this.directionTest(input));},emit:function emit(input){this.pX=input.deltaX;this.pY=input.deltaY;var direction=directionStr(input.direction);if(direction){input.additionalEvent=this.options.event+direction;}this._super.emit.call(this,input);}});inherit(PinchRecognizer,AttrRecognizer,{/**
     * @namespace
     * @memberof PinchRecognizer
     */defaults:{event:'pinch',threshold:0,pointers:2},getTouchAction:function getTouchAction(){return[TOUCH_ACTION_NONE];},attrTest:function attrTest(input){return this._super.attrTest.call(this,input)&&(Math.abs(input.scale-1)>this.options.threshold||this.state&STATE_BEGAN);},emit:function emit(input){if(input.scale!==1){var inOut=input.scale<1?'in':'out';input.additionalEvent=this.options.event+inOut;}this._super.emit.call(this,input);}});inherit(PressRecognizer,Recognizer,{/**
     * @namespace
     * @memberof PressRecognizer
     */defaults:{event:'press',pointers:1,time:251,// minimal time of the pointer to be pressed
threshold:9// a minimal movement is ok, but keep it low
},getTouchAction:function getTouchAction(){return[TOUCH_ACTION_AUTO];},process:function process(input){var options=this.options;var validPointers=input.pointers.length===options.pointers;var validMovement=input.distance<options.threshold;var validTime=input.deltaTime>options.time;this._input=input;// we only allow little movement
// and we've reached an end event, so a tap is possible
if(!validMovement||!validPointers||input.eventType&(INPUT_END|INPUT_CANCEL)&&!validTime){this.reset();}else if(input.eventType&INPUT_START){this.reset();this._timer=setTimeoutContext(function(){this.state=STATE_RECOGNIZED;this.tryEmit();},options.time,this);}else if(input.eventType&INPUT_END){return STATE_RECOGNIZED;}return STATE_FAILED;},reset:function reset(){clearTimeout(this._timer);},emit:function emit(input){if(this.state!==STATE_RECOGNIZED){return;}if(input&&input.eventType&INPUT_END){this.manager.emit(this.options.event+'up',input);}else{this._input.timeStamp=now();this.manager.emit(this.options.event,this._input);}}});inherit(RotateRecognizer,AttrRecognizer,{/**
     * @namespace
     * @memberof RotateRecognizer
     */defaults:{event:'rotate',threshold:0,pointers:2},getTouchAction:function getTouchAction(){return[TOUCH_ACTION_NONE];},attrTest:function attrTest(input){return this._super.attrTest.call(this,input)&&(Math.abs(input.rotation)>this.options.threshold||this.state&STATE_BEGAN);}});inherit(SwipeRecognizer,AttrRecognizer,{/**
     * @namespace
     * @memberof SwipeRecognizer
     */defaults:{event:'swipe',threshold:10,velocity:0.3,direction:DIRECTION_HORIZONTAL|DIRECTION_VERTICAL,pointers:1},getTouchAction:function getTouchAction(){return PanRecognizer.prototype.getTouchAction.call(this);},attrTest:function attrTest(input){var direction=this.options.direction;var velocity;if(direction&(DIRECTION_HORIZONTAL|DIRECTION_VERTICAL)){velocity=input.overallVelocity;}else if(direction&DIRECTION_HORIZONTAL){velocity=input.overallVelocityX;}else if(direction&DIRECTION_VERTICAL){velocity=input.overallVelocityY;}return this._super.attrTest.call(this,input)&&direction&input.offsetDirection&&input.distance>this.options.threshold&&input.maxPointers==this.options.pointers&&abs(velocity)>this.options.velocity&&input.eventType&INPUT_END;},emit:function emit(input){var direction=directionStr(input.offsetDirection);if(direction){this.manager.emit(this.options.event+direction,input);}this.manager.emit(this.options.event,input);}});inherit(TapRecognizer,Recognizer,{/**
     * @namespace
     * @memberof PinchRecognizer
     */defaults:{event:'tap',pointers:1,taps:1,interval:300,// max time between the multi-tap taps
time:250,// max time of the pointer to be down (like finger on the screen)
threshold:9,// a minimal movement is ok, but keep it low
posThreshold:10// a multi-tap can be a bit off the initial position
},getTouchAction:function getTouchAction(){return[TOUCH_ACTION_MANIPULATION];},process:function process(input){var options=this.options;var validPointers=input.pointers.length===options.pointers;var validMovement=input.distance<options.threshold;var validTouchTime=input.deltaTime<options.time;this.reset();if(input.eventType&INPUT_START&&this.count===0){return this.failTimeout();}// we only allow little movement
// and we've reached an end event, so a tap is possible
if(validMovement&&validTouchTime&&validPointers){if(input.eventType!=INPUT_END){return this.failTimeout();}var validInterval=this.pTime?input.timeStamp-this.pTime<options.interval:true;var validMultiTap=!this.pCenter||getDistance(this.pCenter,input.center)<options.posThreshold;this.pTime=input.timeStamp;this.pCenter=input.center;if(!validMultiTap||!validInterval){this.count=1;}else{this.count+=1;}this._input=input;// if tap count matches we have recognized it,
// else it has began recognizing...
var tapCount=this.count%options.taps;if(tapCount===0){// no failing requirements, immediately trigger the tap event
// or wait as long as the multitap interval to trigger
if(!this.hasRequireFailures()){return STATE_RECOGNIZED;}else{this._timer=setTimeoutContext(function(){this.state=STATE_RECOGNIZED;this.tryEmit();},options.interval,this);return STATE_BEGAN;}}}return STATE_FAILED;},failTimeout:function failTimeout(){this._timer=setTimeoutContext(function(){this.state=STATE_FAILED;},this.options.interval,this);return STATE_FAILED;},reset:function reset(){clearTimeout(this._timer);},emit:function emit(){if(this.state==STATE_RECOGNIZED){this._input.tapCount=this.count;this.manager.emit(this.options.event,this._input);}}});Hammer.VERSION='{{PKG_VERSION}}';/**
 * default settings
 * @namespace
 */Hammer.defaults={/**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */domEvents:false,/**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */touchAction:TOUCH_ACTION_COMPUTE,/**
     * @type {Boolean}
     * @default true
     */enable:true,/**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */inputTarget:null,/**
     * force an input class
     * @type {Null|Function}
     * @default null
     */inputClass:null,/**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */preset:[// RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
[RotateRecognizer,{enable:false}],[PinchRecognizer,{enable:false},['rotate']],[SwipeRecognizer,{direction:DIRECTION_HORIZONTAL}],[PanRecognizer,{direction:DIRECTION_HORIZONTAL},['swipe']],[TapRecognizer],[TapRecognizer,{event:'doubletap',taps:2},['tap']],[PressRecognizer]],/**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */cssProps:{/**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */userSelect:'none',/**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */touchSelect:'none',/**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */touchCallout:'none',/**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */contentZooming:'none',/**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */userDrag:'none',/**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */tapHighlightColor:'rgba(0,0,0,0)'}};STOP=1;FORCED_STOP=2;Manager.prototype={/**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */set:function set(options){assign(this.options,options);// Options that need a little more setup
if(options.touchAction){this.touchAction.update();}if(options.inputTarget){// Clean up existing event listeners and reinitialize
this.input.destroy();this.input.target=options.inputTarget;this.input.init();}return this;},/**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */stop:function stop(force){this.session.stopped=force?FORCED_STOP:STOP;},/**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */recognize:function recognize(inputData){var session=this.session;if(session.stopped){return;}// run the touch-action polyfill
this.touchAction.preventDefaults(inputData);var recognizer;var recognizers=this.recognizers;// this holds the recognizer that is being recognized.
// so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
// if no recognizer is detecting a thing, it is set to `null`
var curRecognizer=session.curRecognizer;// reset when the last recognizer is recognized
// or when we're in a new session
if(!curRecognizer||curRecognizer&&curRecognizer.state&STATE_RECOGNIZED){curRecognizer=session.curRecognizer=null;}var i=0;while(i<recognizers.length){recognizer=recognizers[i];// find out if we are allowed try to recognize the input for this one.
// 1.   allow if the session is NOT forced stopped (see the .stop() method)
// 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
//      that is being recognized.
// 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
//      this can be setup with the `recognizeWith()` method on the recognizer.
if(session.stopped!==FORCED_STOP&&(// 1
!curRecognizer||recognizer==curRecognizer||// 2
recognizer.canRecognizeWith(curRecognizer))){// 3
recognizer.recognize(inputData);}else{recognizer.reset();}// if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
// current active recognizer. but only if we don't already have an active recognizer
if(!curRecognizer&&recognizer.state&(STATE_BEGAN|STATE_CHANGED|STATE_ENDED)){curRecognizer=session.curRecognizer=recognizer;}i++;}},/**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */get:function get(recognizer){if(recognizer instanceof Recognizer){return recognizer;}var recognizers=this.recognizers;for(var i=0;i<recognizers.length;i++){if(recognizers[i].options.event==recognizer){return recognizers[i];}}return null;},/**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */add:function add(recognizer){if(invokeArrayArg(recognizer,'add',this)){return this;}// remove existing
var existing=this.get(recognizer.options.event);if(existing){this.remove(existing);}this.recognizers.push(recognizer);recognizer.manager=this;this.touchAction.update();return recognizer;},/**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */remove:function remove(recognizer){if(invokeArrayArg(recognizer,'remove',this)){return this;}recognizer=this.get(recognizer);// let's make sure this recognizer exists
if(recognizer){var recognizers=this.recognizers;var index=inArray(recognizers,recognizer);if(index!==-1){recognizers.splice(index,1);this.touchAction.update();}}return this;},/**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */on:function on(events,handler){if(events===undefined){return;}if(handler===undefined){return;}var handlers=this.handlers;each(splitStr(events),function(event){handlers[event]=handlers[event]||[];handlers[event].push(handler);});return this;},/**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */off:function off(events,handler){if(events===undefined){return;}var handlers=this.handlers;each(splitStr(events),function(event){if(!handler){delete handlers[event];}else{handlers[event]&&handlers[event].splice(inArray(handlers[event],handler),1);}});return this;},/**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */emit:function emit(event,data){// we also want to trigger dom events
if(this.options.domEvents){triggerDomEvent(event,data);}// no handlers, so skip it all
var handlers=this.handlers[event]&&this.handlers[event].slice();if(!handlers||!handlers.length){return;}data.type=event;data.preventDefault=function(){data.srcEvent.preventDefault();};var i=0;while(i<handlers.length){handlers[i](data);i++;}},/**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */destroy:function destroy(){this.element&&toggleCssProps(this,false);this.handlers={};this.session={};this.input.destroy();this.element=null;}};assign(Hammer,{INPUT_START:INPUT_START,INPUT_MOVE:INPUT_MOVE,INPUT_END:INPUT_END,INPUT_CANCEL:INPUT_CANCEL,STATE_POSSIBLE:STATE_POSSIBLE,STATE_BEGAN:STATE_BEGAN,STATE_CHANGED:STATE_CHANGED,STATE_ENDED:STATE_ENDED,STATE_RECOGNIZED:STATE_RECOGNIZED,STATE_CANCELLED:STATE_CANCELLED,STATE_FAILED:STATE_FAILED,DIRECTION_NONE:DIRECTION_NONE,DIRECTION_LEFT:DIRECTION_LEFT,DIRECTION_RIGHT:DIRECTION_RIGHT,DIRECTION_UP:DIRECTION_UP,DIRECTION_DOWN:DIRECTION_DOWN,DIRECTION_HORIZONTAL:DIRECTION_HORIZONTAL,DIRECTION_VERTICAL:DIRECTION_VERTICAL,DIRECTION_ALL:DIRECTION_ALL,Manager:Manager,Input:Input,TouchAction:TouchAction,TouchInput:TouchInput,MouseInput:MouseInput,PointerEventInput:PointerEventInput,TouchMouseInput:TouchMouseInput,SingleTouchInput:SingleTouchInput,Recognizer:Recognizer,AttrRecognizer:AttrRecognizer,Tap:TapRecognizer,Pan:PanRecognizer,Swipe:SwipeRecognizer,Pinch:PinchRecognizer,Rotate:RotateRecognizer,Press:PressRecognizer,on:addEventListeners,off:removeEventListeners,each:each,merge:merge,extend:extend,assign:assign,inherit:inherit,bindFn:bindFn,prefixed:prefixed});$_GLOBAL$1=typeof $_GLOBAL$1!=='undefined'?$_GLOBAL$1:typeof global!=='undefined'?global:Function('return this')();$$1=jQuery;Materialize={};$$1.fn.hammer=function(options){return this.each(function(){hammerify(this,options);});};// extend the emit method to also trigger jQuery events
Hammer.Manager.prototype.emit=function(originalEmit){return function(type,data){originalEmit.call(this,type,data);$$1(this.element).trigger({type:type,gesture:data});};}(Hammer.Manager.prototype.emit);$$1.fn.material_select=function(callback){// Make option as selected and scroll to selected position
var activateOption=function activateOption(collection,newOption){collection.find('li.active').removeClass('active');$$1(newOption).addClass('active');collection.scrollTo(newOption);};$$1(this).each(function(){var $select=$$1(this);if($select.hasClass('browser-default')){return;// Continue to next (return false breaks out of entire loop)
}// Tear down structure if Select needs to be rebuilt
var lastID=$select.data('select-id');if(lastID){$select.parent().find('span.caret').remove();$select.parent().find('input').remove();$select.unwrap();$$1('ul#select-options-'+lastID).remove();}// If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
if(callback==='destroy'){$select.data('select-id',null).removeClass('initialized');return;}var uniqueID=Materialize.guid();$select.data('select-id',uniqueID);var wrapper=$$1('<div class="select-wrapper"></div>');wrapper.addClass($select.attr('class'));var options=$$1('<ul id="select-options-'+uniqueID+'" class="dropdown-content select-dropdown"></ul>');var selectOptions=$select.children('option');var label;if($select.find('option:selected')!==undefined){label=$select.find('option:selected');}else{label=selectOptions.first();}// Create Dropdown structure
selectOptions.each(function(){// Add disabled attr if disabled
options.append($$1('<li class="'+($$1(this).is(':disabled')?'disabled':'')+'"><span>'+$$1(this).html()+'</span></li>'));});options.find('li').each(function(i){var $curr_select=$select;$$1(this).click(function(){// Check if option element is disabled
if(!$$1(this).hasClass('disabled')){$curr_select.find('option').eq(i).prop('selected',true);// Trigger onchange() event
$curr_select.trigger('change');$curr_select.siblings('input.select-dropdown').val($$1(this).text());if(typeof callback!=='undefined'){callback();}}});});// Wrap Elements
$select.wrap(wrapper);// Add Select Display Element
var dropdownIcon=$$1('<span class="caret">&#9660;</span>');if($select.is(':disabled')){dropdownIcon.addClass('disabled');}// escape double quotes
var sanitizedLabelHtml=label.html().replace(/"/g,'&quot;');var $newSelect=$$1('<input type="text" class="select-dropdown" readonly="true" '+($select.is(':disabled')?'disabled':'')+' data-activates="select-options-'+uniqueID+'" value="'+sanitizedLabelHtml+'"/>');$select.before($newSelect);$newSelect.before(dropdownIcon);$$1('body').append(options);// Check if section element is disabled
if(!$select.is(':disabled')){$newSelect.dropdown({"hover":false});}// Copy tabindex
if($select.attr('tabindex')){$$1($newSelect[0]).attr('tabindex',$select.attr('tabindex'));}$select.addClass('initialized');$newSelect.on('focus',function(){$$1(this).trigger('open');label=$$1(this).val();var selectedOption=options.find('li').filter(function(){return $$1(this).text().toLowerCase()===label.toLowerCase();})[0];activateOption(options,selectedOption);});$newSelect.on('blur',function(){$$1(this).trigger('close');});// Allow user to search by typing
// this array is cleared after 1 second
var filterQuery=[];var onKeyDown=function onKeyDown(event){var newOption,activeOption;// TAB - switch to another input
if(event.which===9){$newSelect.trigger('close');return;}// ARROW DOWN WHEN SELECT IS CLOSED - open select options
if(event.which===40&&!options.is(":visible")){$newSelect.trigger('open');return;}// ENTER WHEN SELECT IS CLOSED - submit form
if(event.which===13&&!options.is(":visible")){return;}event.preventDefault();// CASE WHEN USER TYPE LETTERS
var letter=String.fromCharCode(event.which).toLowerCase();var nonLetters=[9,13,27,38,40];if(letter&&nonLetters.indexOf(event.which)===-1){filterQuery.push(letter);var string=filterQuery.join("");newOption=options.find('li').filter(function(){return $$1(this).text().toLowerCase().indexOf(string)===0;})[0];if(newOption){activateOption(options,newOption);}}// ENTER - select option and close when select options are opened
if(event.which===13){activeOption=options.find('li.active:not(.disabled)')[0];if(activeOption){$$1(activeOption).trigger('click');$newSelect.trigger('close');}}// ARROW DOWN - move to next not disabled option
if(event.which===40){newOption=options.find('li.active').next('li:not(.disabled)')[0];if(newOption){activateOption(options,newOption);}}// ESC - close options
if(event.which===27){$newSelect.trigger('close');}// ARROW UP - move to previous not disabled option
if(event.which===38){newOption=options.find('li.active').prev('li:not(.disabled)')[0];if(newOption){activateOption(options,newOption);}}// Automaticaly clean filter query so user can search again by starting letters
setTimeout(function(){filterQuery=[];},1000);};$newSelect.on('keydown',onKeyDown);});};jQuery.easing={linear:function linear(p){return p;},swing:function swing(p){return 0.5-Math.cos(p*Math.PI)/2;},jswing:function jswing(p){return 0.5-Math.cos(p*Math.PI)/2;},easeInOutMaterial:function easeInOutMaterial(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return c/4*((t-=2)*t*t+2)+b;},_default:"swing"};jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function swing(x,t,b,c,d){//alert(jQuery.easing.default);
return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function easeInQuad(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function easeOutQuad(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad:function easeInOutQuad(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*(--t*(t-2)-1)+b;},easeInCubic:function easeInCubic(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function easeOutCubic(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function easeInOutCubic(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function easeInQuart(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function easeOutQuart(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function easeInOutQuart(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function easeInQuint(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function easeOutQuint(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function easeInOutQuint(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function easeInSine(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function easeOutSine(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function easeInOutSine(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function easeInExpo(x,t,b,c,d){return t==0?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function easeOutExpo(x,t,b,c,d){return t==d?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function easeInOutExpo(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function easeInCirc(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function easeOutCirc(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function easeInOutCirc(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function easeInElastic(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function easeOutElastic(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function easeInOutElastic(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function easeInBack(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function easeOutBack(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function easeInOutBack(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=1.525)+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+b;},easeInBounce:function easeInBounce(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function easeOutBounce(x,t,b,c,d){if((t/=d)<1/2.75){return c*(7.5625*t*t)+b;}else if(t<2/2.75){return c*(7.5625*(t-=1.5/2.75)*t+.75)+b;}else if(t<2.5/2.75){return c*(7.5625*(t-=2.25/2.75)*t+.9375)+b;}else{return c*(7.5625*(t-=2.625/2.75)*t+.984375)+b;}},easeInOutBounce:function easeInOutBounce(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});// Source: src/helpers/collapsible.js
$$1.fn.collapsible=function(options){var defaults={accordion:undefined};options=$$1.extend(defaults,options);return this.each(function(){var $this=$$1(this);var $panel_headers=$$1(this).find('> li > .collapsible-header');var collapsible_type=$this.data("collapsible");// Turn off any existing event handlers
$this.off('click.collapse','> li > .collapsible-header');$panel_headers.off('click.collapse');/****************
      Helper Functions
      ****************/// Accordion Open
function accordionOpen(object){$panel_headers=$this.find('> li > .collapsible-header');if(object.hasClass('active')){object.parent().addClass('active');object.siblings('.collapsible-body').velocity('slideDown',function(){jQuery(this).css('height','');}).trigger('shown');}else{object.parent().removeClass('active');object.siblings('.collapsible-body').velocity('slideUp').trigger('hidden');}$panel_headers.not(object).removeClass('active').parent().removeClass('active');$panel_headers.not(object).parent().children('.collapsible-body').velocity('slideUp').trigger('hidden');}// Expandable Open
function expandableOpen(object){if(object.hasClass('active')){object.parent().addClass('active');object.siblings('.collapsible-body').velocity('slideDown',function(){jQuery(this).css('height','');}).trigger('shown');}else{object.parent().removeClass('active');object.siblings('.collapsible-body').velocity('slideUp').trigger('hidden');}}/**
       * Get panel header from a children element
       * @param  {Object} object Jquery object
       * @return {Object} panel header object
       */function getPanelHeader(object){return object.closest('li > .collapsible-header');}/**
       * Check if object is children of panel header
       * @param  {Object}  object Jquery object
       * @return {Boolean} true if it is children
       */function isChildrenOfPanelHeader(object){var panelHeader=getPanelHeader(object);return panelHeader.length>0;}/*****  End Helper Functions  *****/// Add click handler to only direct collapsible header children
$this.on('click.collapse','> li > .collapsible-header',function(e){var $header=$$1(this),element=$$1(e.target);if(isChildrenOfPanelHeader(element)){element=getPanelHeader(element);}element.toggleClass('active');if(options.accordion||collapsible_type==="accordion"||collapsible_type===undefined){// Handle Accordion
accordionOpen(element);}else{// Handle Expandables
expandableOpen(element);if($header.hasClass('active')){expandableOpen($header);}}});if(options.accordion||collapsible_type==="accordion"||collapsible_type===undefined){// Handle Accordion
accordionOpen($panel_headers.filter('.active').first());}else{// Handle Expandables
$panel_headers.filter('.active').each(function(){expandableOpen($$1(this));});}});};$$1(document$1).ready(function(){$$1('.collapsible').collapsible();});// Source: src/helpers/dropdown.js
// Add posibility to scroll to selected option
// usefull for select for example
$$1.fn.scrollTo=function(elem){$$1(this).scrollTop($$1(this).scrollTop()-$$1(this).offset().top+$$1(elem).offset().top);return this;};$$1.fn.dropdown=function(option){var defaults={inDuration:300,outDuration:225,constrain_width:true,// Constrains width of dropdown to the activator
hover:false,gutter:0,// Spacing from edge
belowOrigin:false,alignment:'left'};this.each(function(){var origin=$$1(this);var options=$$1.extend({},defaults,option);var isFocused=false;// Dropdown menu
var activates=$$1("#"+origin.attr('data-activates'));function updateOptions(){if(origin.data('induration')!==undefined)options.inDuration=origin.data('inDuration');if(origin.data('outduration')!==undefined)options.outDuration=origin.data('outDuration');if(origin.data('constrainwidth')!==undefined)options.constrain_width=origin.data('constrainwidth');if(origin.data('hover')!==undefined)options.hover=origin.data('hover');if(origin.data('gutter')!==undefined)options.gutter=origin.data('gutter');if(origin.data('beloworigin')!==undefined)options.belowOrigin=origin.data('beloworigin');if(origin.data('alignment')!==undefined)options.alignment=origin.data('alignment');}updateOptions();// Attach dropdown to its activator
origin.after(activates);/*
        Helper function to position and resize dropdown.
        Used in hover and click handler.
      */function placeDropdown(eventType){// Check for simultaneous focus and click events.
if(eventType==='focus'){isFocused=true;}// Check html data attributes
updateOptions();// Set Dropdown state
activates.addClass('active');origin.addClass('active');// Constrain width
if(options.constrain_width===true){activates.css('width',origin.outerWidth());}else{activates.css('white-space','nowrap');}// Offscreen detection
var $_GLOBALHeight=$_GLOBAL$1.innerHeight;var originHeight=origin.innerHeight();var offsetLeft=origin.offset().left;var offsetTop=origin.offset().top-$$1($_GLOBAL$1).scrollTop();var currAlignment=options.alignment;var gutterSpacing=0;var leftPosition=0;// Below Origin
var verticalOffset=0;if(options.belowOrigin===true){verticalOffset=originHeight;}// Check for scrolling positioned container.
var scrollOffset=0;var wrapper=origin.parent();if(!wrapper.is('body')&&wrapper[0].scrollHeight>wrapper[0].clientHeight){scrollOffset=wrapper[0].scrollTop;}if(offsetLeft+activates.innerWidth()>$$1($_GLOBAL$1).width()){// Dropdown goes past screen on right, force right alignment
currAlignment='right';}else if(offsetLeft-activates.innerWidth()+origin.innerWidth()<0){// Dropdown goes past screen on left, force left alignment
currAlignment='left';}// Vertical bottom offscreen detection
if(offsetTop+activates.innerHeight()>$_GLOBALHeight){// If going upwards still goes offscreen, just crop height of dropdown.
if(offsetTop+originHeight-activates.innerHeight()<0){var adjustedHeight=$_GLOBALHeight-offsetTop-verticalOffset;activates.css('max-height',adjustedHeight);}else{// Flow upwards.
if(!verticalOffset){verticalOffset+=originHeight;}verticalOffset-=activates.innerHeight();}}// Handle edge alignment
if(currAlignment==='left'){gutterSpacing=options.gutter;leftPosition=origin.position().left+gutterSpacing;}else if(currAlignment==='right'){var offsetRight=origin.position().left+origin.outerWidth()-activates.outerWidth();gutterSpacing=-options.gutter;leftPosition=offsetRight+gutterSpacing;}// Position dropdown
activates.css({position:'absolute',top:origin.position().top+verticalOffset+scrollOffset,left:leftPosition});// Show dropdown
activates.stop(true,true).css('opacity',0).velocity('slideDown').velocity({opacity:1},{queue:false,duration:options.inDuration,easing:'easeOutSine'});}function hideDropdown(){// Check for simultaneous focus and click events.
isFocused=false;activates.fadeOut(options.outDuration);activates.removeClass('active');origin.removeClass('active');setTimeout(function(){activates.css('max-height','');},options.outDuration);}// Hover
if(options.hover){var open=false;origin.unbind('click.'+origin.attr('id'));// Hover handler to show dropdown
origin.on('mouseenter',function(e){// Mouse over
if(open===false){placeDropdown();open=true;}});origin.on('mouseleave',function(e){// If hover on origin then to something other than dropdown content, then close
var toEl=e.toElement||e.relatedTarget;// added browser compatibility for target element
if(!$$1(toEl).closest('.dropdown-content').is(activates)){activates.stop(true,true);hideDropdown();open=false;}});activates.on('mouseleave',function(e){// Mouse out
var toEl=e.toElement||e.relatedTarget;if(!$$1(toEl).closest('.dropdown-button').is(origin)){activates.stop(true,true);hideDropdown();open=false;}});// Click
}else{// Click handler to show dropdown
origin.unbind('click.'+origin.attr('id'));origin.bind('click.'+origin.attr('id'),function(e){if(!isFocused){if(origin[0]==e.currentTarget&&!origin.hasClass('active')&&$$1(e.target).closest('.dropdown-content').length===0){e.preventDefault();// Prevents button click from moving $_GLOBAL
placeDropdown('click');}// If origin is clicked and menu is open, close menu
else if(origin.hasClass('active')){hideDropdown();$$1(document$1).unbind('click.'+activates.attr('id')+' touchstart.'+activates.attr('id'));}// If menu open, add click close handler to document
if(activates.hasClass('active')){$$1(document$1).bind('click.'+activates.attr('id')+' touchstart.'+activates.attr('id'),function(e){if(!activates.is(e.target)&&!origin.is(e.target)&&!origin.find(e.target).length){hideDropdown();$$1(document$1).unbind('click.'+activates.attr('id')+' touchstart.'+activates.attr('id'));}});}}});}// End else
// Listen to open and close event - useful for select component
origin.on('open',function(e,eventType){placeDropdown(eventType);});origin.on('close',hideDropdown);});};// End dropdown plugin
$$1(document$1).ready(function(){$$1('.dropdown-button').dropdown();});// Source: node_modules/materialize-css/js/leanModal.js
_stack=0;_lastID=0;_generateID=function _generateID(){_lastID++;return'materialize-lean-overlay-'+_lastID;};$$1.fn.extend({openModal:function openModal(options){var $body=$$1('body');var oldWidth=$body.innerWidth();$body.css('overflow','hidden');$body.width(oldWidth);var defaults={opacity:0.5,in_duration:350,out_duration:250,ready:undefined,complete:undefined,dismissible:true,starting_top:'4%'},$modal=$$1(this);if($modal.hasClass('open')){return;}overlayID=_generateID();$overlay=$$1('<div class="lean-overlay"></div>');lStack=++_stack;// Store a reference of the overlay
$overlay.attr('id',overlayID).css('z-index',1000+lStack*2);$modal.data('overlay-id',overlayID).css('z-index',1000+lStack*2+1);$modal.addClass('open');$$1("body").append($overlay);// Override defaults
options=$$1.extend(defaults,options);if(options.dismissible){$overlay.click(function(){$modal.closeModal(options);});// Return on ESC
$$1(document$1).on('keyup.leanModal'+overlayID,function(e){if(e.keyCode===27){// ESC key
$modal.closeModal(options);}});}$modal.find(".modal-close").on('click.close',function(e){$modal.closeModal(options);});$overlay.css({display:"block",opacity:0});$modal.css({display:"block",opacity:0});$overlay.velocity({opacity:options.opacity},{duration:options.in_duration,queue:false,ease:"easeOutCubic"});$modal.data('associated-overlay',$overlay[0]);// Define Bottom Sheet animation
if($modal.hasClass('bottom-sheet')){$modal.velocity({bottom:"0",opacity:1},{duration:options.in_duration,queue:false,ease:"easeOutCubic",// Handle modal ready callback
complete:function complete(){if(typeof options.ready==="function"){options.ready();}}});}else{$$1.Velocity.hook($modal,"scaleX",0.7);$modal.css({top:options.starting_top});$modal.velocity({top:"10%",opacity:1,scaleX:'1'},{duration:options.in_duration,queue:false,ease:"easeOutCubic",// Handle modal ready callback
complete:function complete(){if(typeof options.ready==="function"){options.ready();}}});}}});$$1.fn.extend({closeModal:function closeModal(options){var defaults={out_duration:250,complete:undefined},$modal=$$1(this),overlayID=$modal.data('overlay-id'),$overlay=$$1('#'+overlayID);$modal.removeClass('open');options=$$1.extend(defaults,options);// Enable scrolling
$$1('body').css({overflow:'',width:''});$modal.find('.modal-close').off('click.close');$$1(document$1).off('keyup.leanModal'+overlayID);$overlay.velocity({opacity:0},{duration:options.out_duration,queue:false,ease:"easeOutQuart"});// Define Bottom Sheet animation
if($modal.hasClass('bottom-sheet')){$modal.velocity({bottom:"-100%",opacity:0},{duration:options.out_duration,queue:false,ease:"easeOutCubic",// Handle modal ready callback
complete:function complete(){$overlay.css({display:"none"});// Call complete callback
if(typeof options.complete==="function"){options.complete();}$overlay.remove();_stack--;}});}else{$modal.velocity({top:options.starting_top,opacity:0,scaleX:0.7},{duration:options.out_duration,complete:function complete(){$$1(this).css('display','none');// Call complete callback
if(typeof options.complete==="function"){options.complete();}$overlay.remove();_stack--;}});}}});$$1.fn.extend({leanModal:function leanModal(option){return this.each(function(){var defaults={starting_top:'4%'},// Override defaults
options=$$1.extend(defaults,option);// Close Handlers
$$1(this).click(function(e){options.starting_top=($$1(this).offset().top-$$1($_GLOBAL$1).scrollTop())/1.15;var modal_id=$$1(this).attr("href")||'#'+$$1(this).data('target');$$1(modal_id).openModal(options);e.preventDefault();});// done set on click
});// done return
}});// Source: node_modules/materialize-css/js/materialbox.js
$$1.fn.materialbox=function(){return this.each(function(){if($$1(this).hasClass('initialized')){return;}$$1(this).addClass('initialized');var overlayActive=false;var doneAnimating=true;var inDuration=275;var outDuration=200;var origin=$$1(this);var placeholder=$$1('<div></div>').addClass('material-placeholder');var originalWidth=0;var originalHeight=0;var ancestorsChanged;var ancestor;origin.wrap(placeholder);origin.on('click',function(){var placeholder=origin.parent('.material-placeholder');var $_GLOBALWidth=$_GLOBAL$1.innerWidth;var $_GLOBALHeight=$_GLOBAL$1.innerHeight;var originalWidth=origin.width();var originalHeight=origin.height();// If already modal, return to original
if(doneAnimating===false){returnToOriginal();return false;}else if(overlayActive&&doneAnimating===true){returnToOriginal();return false;}// Set states
doneAnimating=false;origin.addClass('active');overlayActive=true;// Set positioning for placeholder
placeholder.css({width:placeholder[0].getBoundingClientRect().width,height:placeholder[0].getBoundingClientRect().height,position:'relative',top:0,left:0});// Find ancestor with overflow: hidden; and remove it
ancestorsChanged=undefined;ancestor=placeholder[0].parentNode;var count=0;while(ancestor!==null&&!$$1(ancestor).is(document$1)){var curr=$$1(ancestor);if(curr.css('overflow')!=='visible'){curr.css('overflow','visible');if(ancestorsChanged===undefined){ancestorsChanged=curr;}else{ancestorsChanged=ancestorsChanged.add(curr);}}ancestor=ancestor.parentNode;}// Set css on origin
origin.css({position:'absolute','z-index':1000}).data('width',originalWidth).data('height',originalHeight);// Add overlay
var overlay=$$1('<div id="materialbox-overlay"></div>').css({opacity:0}).click(function(){if(doneAnimating===true)returnToOriginal();});// Animate Overlay
// Put before in origin image to preserve z-index layering.
origin.before(overlay);overlay.velocity({opacity:1},{duration:inDuration,queue:false,easing:'easeOutQuad'});// Add and animate caption if it exists
if(origin.data('caption')!==""){var $photo_caption=$$1('<div class="materialbox-caption"></div>');$photo_caption.text(origin.data('caption'));$$1('body').append($photo_caption);$photo_caption.css({"display":"inline"});$photo_caption.velocity({opacity:1},{duration:inDuration,queue:false,easing:'easeOutQuad'});}// Resize Image
var ratio=0;var widthPercent=originalWidth/$_GLOBALWidth;var heightPercent=originalHeight/$_GLOBALHeight;var newWidth=0;var newHeight=0;if(widthPercent>heightPercent){ratio=originalHeight/originalWidth;newWidth=$_GLOBALWidth*0.9;newHeight=$_GLOBALWidth*0.9*ratio;}else{ratio=originalWidth/originalHeight;newWidth=$_GLOBALHeight*0.9*ratio;newHeight=$_GLOBALHeight*0.9;}// Animate image + set z-index
if(origin.hasClass('responsive-img')){origin.velocity({'max-width':newWidth,'width':originalWidth},{duration:0,queue:false,complete:function complete(){origin.css({left:0,top:0}).velocity({height:newHeight,width:newWidth,left:$$1(document$1).scrollLeft()+$_GLOBALWidth/2-origin.parent('.material-placeholder').offset().left-newWidth/2,top:$$1(document$1).scrollTop()+$_GLOBALHeight/2-origin.parent('.material-placeholder').offset().top-newHeight/2},{duration:inDuration,queue:false,easing:'easeOutQuad',complete:function complete(){doneAnimating=true;}});}// End Complete
});// End Velocity
}else{origin.css('left',0).css('top',0).velocity({height:newHeight,width:newWidth,left:$$1(document$1).scrollLeft()+$_GLOBALWidth/2-origin.parent('.material-placeholder').offset().left-newWidth/2,top:$$1(document$1).scrollTop()+$_GLOBALHeight/2-origin.parent('.material-placeholder').offset().top-newHeight/2},{duration:inDuration,queue:false,easing:'easeOutQuad',complete:function complete(){doneAnimating=true;}});// End Velocity
}});// End origin on click
// Return on scroll
$$1($_GLOBAL$1).scroll(function(){if(overlayActive){returnToOriginal();}});// Return on ESC
$$1(document$1).keyup(function(e){if(e.keyCode===27&&doneAnimating===true){// ESC key
if(overlayActive){returnToOriginal();}}});// This function returns the modaled image to the original spot
function returnToOriginal(){doneAnimating=false;var placeholder=origin.parent('.material-placeholder');var $_GLOBALWidth=$_GLOBAL$1.innerWidth;var $_GLOBALHeight=$_GLOBAL$1.innerHeight;var originalWidth=origin.data('width');var originalHeight=origin.data('height');origin.velocity("stop",true);$$1('#materialbox-overlay').velocity("stop",true);$$1('.materialbox-caption').velocity("stop",true);$$1('#materialbox-overlay').velocity({opacity:0},{duration:outDuration,// Delay prevents animation overlapping
queue:false,easing:'easeOutQuad',complete:function complete(){// Remove Overlay
overlayActive=false;$$1(this).remove();}});// Resize Image
origin.velocity({width:originalWidth,height:originalHeight,left:0,top:0},{duration:outDuration,queue:false,easing:'easeOutQuad'});// Remove Caption + reset css settings on image
$$1('.materialbox-caption').velocity({opacity:0},{duration:outDuration,// Delay prevents animation overlapping
queue:false,easing:'easeOutQuad',complete:function complete(){placeholder.css({height:'',width:'',position:'',top:'',left:''});origin.css({height:'',top:'',left:'',width:'','max-width':'',position:'','z-index':''});// Remove class
origin.removeClass('active');doneAnimating=true;$$1(this).remove();// Remove overflow overrides on ancestors
if(ancestorsChanged){ancestorsChanged.css('overflow','');}}});}});};$$1(document$1).ready(function(){$$1('.materialboxed').materialbox();});// Source: node_modules/materialize-css/js/tooltip.js
$$1.fn.tooltip=function(options){var timeout=null,margin=5;// Defaults
var defaults={delay:350};// Remove tooltip from the activator
if(options==="remove"){this.each(function(){$$1('#'+$$1(this).attr('data-tooltip-id')).remove();$$1(this).off('mouseenter.tooltip mouseleave.tooltip');});return false;}options=$$1.extend(defaults,options);return this.each(function(){var tooltipId=Materialize.guid();var origin=$$1(this);origin.attr('data-tooltip-id',tooltipId);// Create Text span
var tooltip_text=$$1('<span></span>').text(origin.attr('data-tooltip'));// Create tooltip
var newTooltip=$$1('<div></div>');newTooltip.addClass('material-tooltip').append(tooltip_text).appendTo($$1('body')).attr('id',tooltipId);var backdrop=$$1('<div></div>').addClass('backdrop');backdrop.appendTo(newTooltip);backdrop.css({top:0,left:0});//Destroy previously binded events
origin.off('mouseenter.tooltip mouseleave.tooltip');// Mouse In
var started=false,timeoutRef;origin.on({'mouseenter.tooltip':function mouseenterTooltip(e){var tooltip_delay=origin.attr('data-delay');tooltip_delay=tooltip_delay===undefined||tooltip_delay===''?options.delay:tooltip_delay;timeoutRef=setTimeout(function(){started=true;newTooltip.velocity('stop');backdrop.velocity('stop');newTooltip.css({display:'block',left:'0px',top:'0px'});// Set Tooltip text
newTooltip.children('span').text(origin.attr('data-tooltip'));// Tooltip positioning
var originWidth=origin.outerWidth();var originHeight=origin.outerHeight();var tooltipPosition=origin.attr('data-position');var tooltipHeight=newTooltip.outerHeight();var tooltipWidth=newTooltip.outerWidth();var tooltipVerticalMovement='0px';var tooltipHorizontalMovement='0px';var scale_factor=8;var targetTop,targetLeft,newCoordinates;if(tooltipPosition==="top"){// Top Position
targetTop=origin.offset().top-tooltipHeight-margin;targetLeft=origin.offset().left+originWidth/2-tooltipWidth/2;newCoordinates=repositionWithinScreen(targetLeft,targetTop,tooltipWidth,tooltipHeight);tooltipVerticalMovement='-10px';backdrop.css({borderRadius:'14px 14px 0 0',transformOrigin:'50% 90%',marginTop:tooltipHeight,marginLeft:tooltipWidth/2-backdrop.width()/2});}// Left Position
else if(tooltipPosition==="left"){targetTop=origin.offset().top+originHeight/2-tooltipHeight/2;targetLeft=origin.offset().left-tooltipWidth-margin;newCoordinates=repositionWithinScreen(targetLeft,targetTop,tooltipWidth,tooltipHeight);tooltipHorizontalMovement='-10px';backdrop.css({width:'14px',height:'14px',borderRadius:'14px 0 0 14px',transformOrigin:'95% 50%',marginTop:tooltipHeight/2,marginLeft:tooltipWidth});}// Right Position
else if(tooltipPosition==="right"){targetTop=origin.offset().top+originHeight/2-tooltipHeight/2;targetLeft=origin.offset().left+originWidth+margin;newCoordinates=repositionWithinScreen(targetLeft,targetTop,tooltipWidth,tooltipHeight);tooltipHorizontalMovement='+10px';backdrop.css({width:'14px',height:'14px',borderRadius:'0 14px 14px 0',transformOrigin:'5% 50%',marginTop:tooltipHeight/2,marginLeft:'0px'});}else{// Bottom Position
targetTop=origin.offset().top+origin.outerHeight()+margin;targetLeft=origin.offset().left+originWidth/2-tooltipWidth/2;newCoordinates=repositionWithinScreen(targetLeft,targetTop,tooltipWidth,tooltipHeight);tooltipVerticalMovement='+10px';backdrop.css({marginLeft:tooltipWidth/2-backdrop.width()/2});}// Set tooptip css placement
newTooltip.css({top:newCoordinates.y,left:newCoordinates.x});// Calculate Scale to fill
scale_factor=tooltipWidth/8;if(scale_factor<8){scale_factor=8;}if(tooltipPosition==="right"||tooltipPosition==="left"){scale_factor=tooltipWidth/10;if(scale_factor<6)scale_factor=6;}newTooltip.velocity({marginTop:tooltipVerticalMovement,marginLeft:tooltipHorizontalMovement},{duration:350,queue:false}).velocity({opacity:1},{duration:300,delay:50,queue:false});backdrop.css({display:'block'}).velocity({opacity:1},{duration:55,delay:0,queue:false}).velocity({scale:scale_factor},{duration:300,delay:0,queue:false,easing:'easeInOutQuad'});},tooltip_delay);// End Interval
// Mouse Out
},'mouseleave.tooltip':function mouseleaveTooltip(){// Reset State
started=false;clearTimeout(timeoutRef);// Animate back
setTimeout(function(){if(started!=true){newTooltip.velocity({opacity:0,marginTop:0,marginLeft:0},{duration:225,queue:false});backdrop.velocity({opacity:0,scale:1},{duration:225,queue:false,complete:function complete(){backdrop.css('display','none');newTooltip.css('display','none');started=false;}});}},225);}});});};repositionWithinScreen=function repositionWithinScreen(x,y,width,height){var newX=x;var newY=y;if(newX<0){newX=4;}else if(newX+width>$_GLOBAL$1.innerWidth){newX-=newX+width-$_GLOBAL$1.innerWidth;}if(newY<0){newY=4;}else if(newY+height>$_GLOBAL$1.innerHeight+$$1($_GLOBAL$1).scrollTop){newY-=newY+height-$_GLOBAL$1.innerHeight;}return{x:newX,y:newY};};$$1(document$1).ready(function(){$$1('.tooltipped').tooltip();});// Source: node_modules/materialize-css/js/sideNav.js
sideNavmethods={init:function init(options){var defaults={menuWidth:240,edge:'left',closeOnClick:false};options=$$1.extend(defaults,options);$$1(this).each(function(){var $this=$$1(this);var menu_id=$$1("#"+$this.attr('data-activates'));// Set to width
if(options.menuWidth!=240){menu_id.css('width',options.menuWidth);}// Add Touch Area
var dragTarget=$$1('<div class="drag-target"></div>');$$1('body').append(dragTarget);if(options.edge=='left'){menu_id.css('transform','translateX(-100%)');dragTarget.css({'left':0});// Add Touch Area
}else{menu_id.addClass('right-aligned')// Change text-alignment to right
.css('transform','translateX(100%)');dragTarget.css({'right':0});// Add Touch Area
}// If fixed sidenav, bring menu out
if(menu_id.hasClass('fixed')){if($_GLOBAL$1.innerWidth>992){menu_id.css('transform','translateX(0)');}}// Window resize to reset on large screens fixed
if(menu_id.hasClass('fixed')){$$1($_GLOBAL$1).resize(function(){if($_GLOBAL$1.innerWidth>992){// Close menu if $_GLOBAL is resized bigger than 992 and user has fixed sidenav
if($$1('#sidenav-overlay').length!=0&&menuOut){removeMenu(true);}else{// menu_id.removeAttr('style');
menu_id.css('transform','translateX(0%)');// menu_id.css('width', options.menuWidth);
}}else if(menuOut===false){if(options.edge==='left'){menu_id.css('transform','translateX(-100%)');}else{menu_id.css('transform','translateX(100%)');}}});}// if closeOnClick, then add close event for all a tags in side sideNav
if(options.closeOnClick===true){menu_id.on("click.itemclick","a:not(.collapsible-header)",function(){removeMenu();});}function removeMenu(restoreNav){panning=false;menuOut=false;// Reenable scrolling
$$1('body').css({overflow:'',width:''});$$1('#sidenav-overlay').velocity({opacity:0},{duration:200,queue:false,easing:'easeOutQuad',complete:function complete(){$$1(this).remove();}});if(options.edge==='left'){// Reset phantom div
dragTarget.css({width:'',right:'',left:'0'});menu_id.velocity({'translateX':'-100%'},{duration:200,queue:false,easing:'easeOutCubic',complete:function complete(){if(restoreNav===true){// Restore Fixed sidenav
menu_id.removeAttr('style');menu_id.css('width',options.menuWidth);}}});}else{// Reset phantom div
dragTarget.css({width:'',right:'0',left:''});menu_id.velocity({'translateX':'100%'},{duration:200,queue:false,easing:'easeOutCubic',complete:function complete(){if(restoreNav===true){// Restore Fixed sidenav
menu_id.removeAttr('style');menu_id.css('width',options.menuWidth);}}});}}// Touch Event
var panning=false;var menuOut=false;dragTarget.on('click',function(){removeMenu();});dragTarget.hammer({prevent_default:false}).bind('pan',function(e){if(e.gesture.pointerType=="touch"){var direction=e.gesture.direction;var x=e.gesture.center.x;var y=e.gesture.center.y;var velocityX=e.gesture.velocityX;// Disable Scrolling
var $body=$$1('body');var oldWidth=$body.innerWidth();$body.css('overflow','hidden');$body.width(oldWidth);// If overlay does not exist, create one and if it is clicked, close menu
if($$1('#sidenav-overlay').length===0){var overlay=$$1('<div id="sidenav-overlay"></div>');overlay.css('opacity',0).click(function(){removeMenu();});$$1('body').append(overlay);}// Keep within boundaries
if(options.edge==='left'){if(x>options.menuWidth){x=options.menuWidth;}else if(x<0){x=0;}}if(options.edge==='left'){// Left Direction
if(x<options.menuWidth/2){menuOut=false;}// Right Direction
else if(x>=options.menuWidth/2){menuOut=true;}menu_id.css('transform','translateX('+(x-options.menuWidth)+'px)');}else{// Left Direction
if(x<$_GLOBAL$1.innerWidth-options.menuWidth/2){menuOut=true;}// Right Direction
else if(x>=$_GLOBAL$1.innerWidth-options.menuWidth/2){menuOut=false;}var rightPos=x-options.menuWidth/2;if(rightPos<0){rightPos=0;}menu_id.css('transform','translateX('+rightPos+'px)');}// Percentage overlay
var overlayPerc;if(options.edge==='left'){overlayPerc=x/options.menuWidth;$$1('#sidenav-overlay').velocity({opacity:overlayPerc},{duration:10,queue:false,easing:'easeOutQuad'});}else{overlayPerc=Math.abs((x-$_GLOBAL$1.innerWidth)/options.menuWidth);$$1('#sidenav-overlay').velocity({opacity:overlayPerc},{duration:10,queue:false,easing:'easeOutQuad'});}}}).bind('panend',function(e){if(e.gesture.pointerType=="touch"){var velocityX=e.gesture.velocityX;var x=e.gesture.center.x;var leftPos=x-options.menuWidth;var rightPos=x-options.menuWidth/2;if(leftPos>0){leftPos=0;}if(rightPos<0){rightPos=0;}panning=false;if(options.edge==='left'){// If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
if(menuOut&&velocityX<=0.3||velocityX<-0.5){if(leftPos!=0){menu_id.velocity({'translateX':[0,leftPos]},{duration:300,queue:false,easing:'easeOutQuad'});}// menu_id.css({'translateX': 0});
$$1('#sidenav-overlay').velocity({opacity:1},{duration:50,queue:false,easing:'easeOutQuad'});dragTarget.css({width:'50%',right:0,left:''});}else if(!menuOut||velocityX>0.3){// Enable Scrolling
$$1('body').css({overflow:'',width:''});// Slide menu closed
menu_id.velocity({'translateX':[-1*options.menuWidth-10,leftPos]},{duration:200,queue:false,easing:'easeOutQuad'});$$1('#sidenav-overlay').velocity({opacity:0},{duration:200,queue:false,easing:'easeOutQuad',complete:function complete(){$$1(this).remove();}});dragTarget.css({width:'10px',right:'',left:0});}}else{if(menuOut&&velocityX>=-0.3||velocityX>0.5){menu_id.velocity({'translateX':[0,rightPos]},{duration:300,queue:false,easing:'easeOutQuad'});$$1('#sidenav-overlay').velocity({opacity:1},{duration:50,queue:false,easing:'easeOutQuad'});dragTarget.css({width:'50%',right:'',left:0});}else if(!menuOut||velocityX<-0.3){// Enable Scrolling
$$1('body').css({overflow:'',width:''});// Slide menu closed
menu_id.velocity({'translateX':[options.menuWidth+10,rightPos]},{duration:200,queue:false,easing:'easeOutQuad'});$$1('#sidenav-overlay').velocity({opacity:0},{duration:200,queue:false,easing:'easeOutQuad',complete:function complete(){$$1(this).remove();}});dragTarget.css({width:'10px',right:0,left:''});}}}});$this.click(function(){if(menuOut===true){menuOut=false;panning=false;removeMenu();}else{// Disable Scrolling
var $body=$$1('body');var oldWidth=$body.innerWidth();$body.css('overflow','hidden');$body.width(oldWidth);// Push current drag target on top of DOM tree
$$1('body').append(dragTarget);if(options.edge==='left'){dragTarget.css({width:'50%',right:0,left:''});menu_id.velocity({'translateX':[0,-1*options.menuWidth]},{duration:300,queue:false,easing:'easeOutQuad'});}else{dragTarget.css({width:'50%',right:'',left:0});menu_id.velocity({'translateX':[0,options.menuWidth]},{duration:300,queue:false,easing:'easeOutQuad'});}var overlay=$$1('<div id="sidenav-overlay"></div>');overlay.css('opacity',0).click(function(){menuOut=false;panning=false;removeMenu();overlay.velocity({opacity:0},{duration:300,queue:false,easing:'easeOutQuad',complete:function complete(){$$1(this).remove();}});});$$1('body').append(overlay);overlay.velocity({opacity:1},{duration:300,queue:false,easing:'easeOutQuad',complete:function complete(){menuOut=true;panning=false;}});}return false;});});},show:function show(){this.trigger('click');},hide:function hide(){$$1('#sidenav-overlay').trigger('click');}};$$1.fn.sideNav=function(methodOrOptions){if(sideNavmethods[methodOrOptions]){return sideNavmethods[methodOrOptions].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof methodOrOptions==='object'||!methodOrOptions){// Default to "init"
return sideNavmethods.init.apply(this,arguments);}else{$$1.error('Method '+methodOrOptions+' does not exist on jQuery.sideNav');}};// Plugin end
// Source: node_modules/materialize-css/js/scrollspy.js
/**
 * Extend jquery with a scrollspy plugin.
 * This watches the $_GLOBAL scroll and fires events when elements are scrolled into viewport.
 *
 * throttle() and getTime() taken from Underscore.js
 * https://github.com/jashkenas/underscore
 *
 * @author Copyright 2013 John Smart
 * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
 * @see https://github.com/thesmart
 * @version 0.1.2
 */jWindow=$$1($_GLOBAL$1);elements=[];elementsInView=[];isSpying=false;ticks=0;getTime=Date.now||function(){return new Date().getTime();};;/**
	 * Enables ScrollSpy using a selector
	 * @param {jQuery|string} selector  The elements collection, or a selector
	 * @param {Object=} options	Optional.
        throttle : number -> scrollspy throttling. Default: 100 ms
        offsetTop : number -> offset from top. Default: 0
        offsetRight : number -> offset from right. Default: 0
        offsetBottom : number -> offset from bottom. Default: 0
        offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */$$1.scrollSpy=function(selector,options){var visible=[];selector=$$1(selector);selector.each(function(i,element){elements.push($$1(element));$$1(element).data("scrollSpy:id",i);// Smooth scroll to section
$$1('a[href="#'+$$1(element).attr('id')+'"]').click(function(e){e.preventDefault();var offset=$$1(this.hash).offset().top+1;//          offset - 200 allows elements near bottom of page to scroll
$$1('html, body').animate({scrollTop:offset-200},{duration:400,queue:false,easing:'easeOutCubic'});});});options=options||{throttle:100};offset.top=options.offsetTop||0;offset.right=options.offsetRight||0;offset.bottom=options.offsetBottom||0;offset.left=options.offsetLeft||0;var throttledScroll=throttle(onScroll,options.throttle||100);var readyScroll=function readyScroll(){$$1(document$1).ready(throttledScroll);};if(!isSpying){jWindow.on('scroll',readyScroll);jWindow.on('resize',readyScroll);isSpying=true;}// perform a scan once, after current execution context, and after dom is ready
setTimeout(readyScroll,0);selector.on('scrollSpy:enter',function(){visible=$$1.grep(visible,function(value){return value.height()!=0;});var $this=$$1(this);if(visible[0]){$$1('a[href="#'+visible[0].attr('id')+'"]').removeClass('active');if($this.data('scrollSpy:id')<visible[0].data('scrollSpy:id')){visible.unshift($$1(this));}else{visible.push($$1(this));}}else{visible.push($$1(this));}$$1('a[href="#'+visible[0].attr('id')+'"]').addClass('active');});selector.on('scrollSpy:exit',function(){visible=$$1.grep(visible,function(value){return value.height()!=0;});if(visible[0]){$$1('a[href="#'+visible[0].attr('id')+'"]').removeClass('active');var $this=$$1(this);visible=$$1.grep(visible,function(value){return value.attr('id')!=$this.attr('id');});if(visible[0]){// Check if empty
$$1('a[href="#'+visible[0].attr('id')+'"]').addClass('active');}}});return selector;};/**
	 * Listen for $_GLOBAL resize events
	 * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms
	 * @returns {jQuery}		$($_GLOBAL)
	 */$$1.winSizeSpy=function(options){$$1.winSizeSpy=function(){return jWindow;};// lock from multiple calls
options=options||{throttle:100};return jWindow.on('resize',throttle(onWinSize,options.throttle||100));};/**
	 * Enables ScrollSpy on a collection of elements
	 * e.g. $('.scrollSpy').scrollSpy()
	 * @param {Object=} options	Optional.
											throttle : number -> scrollspy throttling. Default: 100 ms
											offsetTop : number -> offset from top. Default: 0
											offsetRight : number -> offset from right. Default: 0
											offsetBottom : number -> offset from bottom. Default: 0
											offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */$$1.fn.scrollSpy=function(options){return $$1.scrollSpy($$1(this),options);};// Source: node_modules/materialize-css/js/slider.js
slidermethods={init:function init(options){var defaults={indicators:true,height:400,transition:500,interval:6000};options=$$1.extend(defaults,options);return this.each(function(){// For each slider, we want to keep track of
// which slide is active and its associated content
var $this=$$1(this);var $slider=$this.find('ul.slides').first();var $slides=$slider.find('li');var $active_index=$slider.find('.active').index();var $active,$indicators,$interval;if($active_index!=-1){$active=$slides.eq($active_index);}// Transitions the caption depending on alignment
function captionTransition(caption,duration){if(caption.hasClass("center-align")){caption.velocity({opacity:0,translateY:-100},{duration:duration,queue:false});}else if(caption.hasClass("right-align")){caption.velocity({opacity:0,translateX:100},{duration:duration,queue:false});}else if(caption.hasClass("left-align")){caption.velocity({opacity:0,translateX:-100},{duration:duration,queue:false});}}// This function will transition the slide to any index of the next slide
function moveToSlide(index){// Wrap around indices.
if(index>=$slides.length)index=0;else if(index<0)index=$slides.length-1;$active_index=$slider.find('.active').index();// Only do if index changes
if($active_index!=index){$active=$slides.eq($active_index);$caption=$active.find('.caption');$active.removeClass('active');$active.velocity({opacity:0},{duration:options.transition,queue:false,easing:'easeOutQuad',complete:function complete(){$slides.not('.active').velocity({opacity:0,translateX:0,translateY:0},{duration:0,queue:false});}});captionTransition($caption,options.transition);// Update indicators
if(options.indicators){$indicators.eq($active_index).removeClass('active');}$slides.eq(index).velocity({opacity:1},{duration:options.transition,queue:false,easing:'easeOutQuad'});$slides.eq(index).find('.caption').velocity({opacity:1,translateX:0,translateY:0},{duration:options.transition,delay:options.transition,queue:false,easing:'easeOutQuad'});$slides.eq(index).addClass('active');// Update indicators
if(options.indicators){$indicators.eq(index).addClass('active');}}}// Set height of slider
// If fullscreen, do nothing
if(!$this.hasClass('fullscreen')){if(options.indicators){// Add height if indicators are present
$this.height(options.height+40);}else{$this.height(options.height);}$slider.height(options.height);}// Set initial positions of captions
$slides.find('.caption').each(function(){captionTransition($$1(this),0);});// Move img src into background-image
$slides.find('img').each(function(){var placeholderBase64='data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';if($$1(this).attr('src')!==placeholderBase64){$$1(this).css('background-image','url('+$$1(this).attr('src')+')');$$1(this).attr('src',placeholderBase64);}});// dynamically add indicators
if(options.indicators){$indicators=$$1('<ul class="indicators"></ul>');$slides.each(function(index){var $indicator=$$1('<li class="indicator-item"></li>');// Handle clicks on indicators
$indicator.click(function(){var $parent=$slider.parent();var curr_index=$parent.find($$1(this)).index();moveToSlide(curr_index);// reset interval
clearInterval($interval);$interval=setInterval(function(){$active_index=$slider.find('.active').index();if($slides.length==$active_index+1)$active_index=0;// loop to start
else $active_index+=1;moveToSlide($active_index);},options.transition+options.interval);});$indicators.append($indicator);});$this.append($indicators);$indicators=$this.find('ul.indicators').find('li.indicator-item');}if($active){$active.show();}else{$slides.first().addClass('active').velocity({opacity:1},{duration:options.transition,queue:false,easing:'easeOutQuad'});$active_index=0;$active=$slides.eq($active_index);// Update indicators
if(options.indicators){$indicators.eq($active_index).addClass('active');}}// Adjust height to current slide
$active.find('img').each(function(){$active.find('.caption').velocity({opacity:1,translateX:0,translateY:0},{duration:options.transition,queue:false,easing:'easeOutQuad'});});// auto scroll
$interval=setInterval(function(){$active_index=$slider.find('.active').index();moveToSlide($active_index+1);},options.transition+options.interval);// HammerJS, Swipe navigation
// Touch Event
var panning=false;var swipeLeft=false;var swipeRight=false;$this.hammer({prevent_default:false}).bind('pan',function(e){if(e.gesture.pointerType==="touch"){// reset interval
clearInterval($interval);var direction=e.gesture.direction;var x=e.gesture.deltaX;var velocityX=e.gesture.velocityX;$curr_slide=$slider.find('.active');$curr_slide.velocity({translateX:x},{duration:50,queue:false,easing:'easeOutQuad'});// Swipe Left
if(direction===4&&(x>$this.innerWidth()/2||velocityX<-0.65)){swipeRight=true;}// Swipe Right
else if(direction===2&&(x<-1*$this.innerWidth()/2||velocityX>0.65)){swipeLeft=true;}// Make Slide Behind active slide visible
var next_slide;if(swipeLeft){next_slide=$curr_slide.next();if(next_slide.length===0){next_slide=$slides.first();}next_slide.velocity({opacity:1},{duration:300,queue:false,easing:'easeOutQuad'});}if(swipeRight){next_slide=$curr_slide.prev();if(next_slide.length===0){next_slide=$slides.last();}next_slide.velocity({opacity:1},{duration:300,queue:false,easing:'easeOutQuad'});}}}).bind('panend',function(e){if(e.gesture.pointerType==="touch"){$curr_slide=$slider.find('.active');panning=false;curr_index=$slider.find('.active').index();if(!swipeRight&&!swipeLeft||$slides.length<=1){// Return to original spot
$curr_slide.velocity({translateX:0},{duration:300,queue:false,easing:'easeOutQuad'});}else if(swipeLeft){moveToSlide(curr_index+1);$curr_slide.velocity({translateX:-1*$this.innerWidth()},{duration:300,queue:false,easing:'easeOutQuad',complete:function complete(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:false});}});}else if(swipeRight){moveToSlide(curr_index-1);$curr_slide.velocity({translateX:$this.innerWidth()},{duration:300,queue:false,easing:'easeOutQuad',complete:function complete(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:false});}});}swipeLeft=false;swipeRight=false;// Restart interval
clearInterval($interval);$interval=setInterval(function(){$active_index=$slider.find('.active').index();if($slides.length==$active_index+1)$active_index=0;// loop to start
else $active_index+=1;moveToSlide($active_index);},options.transition+options.interval);}});$this.on('sliderPause',function(){clearInterval($interval);});$this.on('sliderStart',function(){clearInterval($interval);$interval=setInterval(function(){$active_index=$slider.find('.active').index();if($slides.length==$active_index+1)$active_index=0;// loop to start
else $active_index+=1;moveToSlide($active_index);},options.transition+options.interval);});$this.on('sliderNext',function(){$active_index=$slider.find('.active').index();moveToSlide($active_index+1);});$this.on('sliderPrev',function(){$active_index=$slider.find('.active').index();moveToSlide($active_index-1);});});},pause:function pause(){$$1(this).trigger('sliderPause');},start:function start(){$$1(this).trigger('sliderStart');},next:function next(){$$1(this).trigger('sliderNext');},prev:function prev(){$$1(this).trigger('sliderPrev');}};$$1.fn.slider=function(methodOrOptions){if(slidermethods[methodOrOptions]){return slidermethods[methodOrOptions].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof methodOrOptions==='object'||!methodOrOptions){// Default to "init"
return slidermethods.init.apply(this,arguments);}else{$$1.error('Method '+methodOrOptions+' does not exist on jQuery.tooltip');}};// Plugin end
// Source: node_modules/materialize-css/js/cards.js
$$1(document$1).ready(function(){$$1(document$1).on('click.card','.card',function(e){if($$1(this).find('> .card-reveal').length){if($$1(e.target).is($$1('.card-reveal .card-title'))||$$1(e.target).is($$1('.card-reveal .card-title i'))){// Make Reveal animate down and display none
$$1(this).find('.card-reveal').velocity({translateY:0},{duration:225,queue:false,easing:'easeInOutQuad',complete:function complete(){$$1(this).css({display:'none'});}});}else if($$1(e.target).is($$1('.card .activator'))||$$1(e.target).is($$1('.card .activator i'))){$$1(e.target).closest('.card').css('overflow','hidden');$$1(this).find('.card-reveal').css({display:'block'}).velocity("stop",false).velocity({translateY:'-100%'},{duration:300,queue:false,easing:'easeInOutQuad'});}}$$1('.card-reveal').closest('.card').css('overflow','hidden');});});// Source: node_modules/materialize-css/js/chips.js
$$1(document$1).ready(function(){$$1(document$1).on('click.chip','.chip .material-icons',function(e){$$1(this).parent().remove();});});// Source: node_modules/materialize-css/js/pushpin.js
$$1.fn.pushpin=function(options){var defaults={top:0,bottom:Infinity,offset:0};options=$$1.extend(defaults,options);$index=0;return this.each(function(){var $uniqueId=Materialize.guid(),$this=$$1(this),$original_offset=$$1(this).offset().top;function removePinClasses(object){object.removeClass('pin-top');object.removeClass('pinned');object.removeClass('pin-bottom');}function updateElements(objects,scrolled){objects.each(function(){// Add position fixed (because its between top and bottom)
if(options.top<=scrolled&&options.bottom>=scrolled&&!$$1(this).hasClass('pinned')){removePinClasses($$1(this));$$1(this).css('top',options.offset);$$1(this).addClass('pinned');}// Add pin-top (when scrolled position is above top)
if(scrolled<options.top&&!$$1(this).hasClass('pin-top')){removePinClasses($$1(this));$$1(this).css('top',0);$$1(this).addClass('pin-top');}// Add pin-bottom (when scrolled position is below bottom)
if(scrolled>options.bottom&&!$$1(this).hasClass('pin-bottom')){removePinClasses($$1(this));$$1(this).addClass('pin-bottom');$$1(this).css('top',options.bottom-$original_offset);}});}updateElements($this,$$1($_GLOBAL$1).scrollTop());$$1($_GLOBAL$1).on('scroll.'+$uniqueId,function(){var $scrolled=$$1($_GLOBAL$1).scrollTop()+options.offset;updateElements($this,$scrolled);});});};// Source: node_modules/materialize-css/js/buttons.js
$$1(document$1).ready(function(){// jQuery reverse
$$1.fn.reverse=[].reverse;// Hover behaviour: make sure this doesn't work on .click-to-toggle FABs!
$$1(document$1).on('mouseenter.fixedActionBtn','.fixed-action-btn:not(.click-to-toggle)',function(e){var $this=$$1(this);openFABMenu($this);});$$1(document$1).on('mouseleave.fixedActionBtn','.fixed-action-btn:not(.click-to-toggle)',function(e){var $this=$$1(this);closeFABMenu($this);});// Toggle-on-click behaviour.
$$1(document$1).on('click.fixedActionBtn','.fixed-action-btn.click-to-toggle > a',function(e){var $this=$$1(this);var $menu=$this.parent();if($menu.hasClass('active')){closeFABMenu($menu);}else{openFABMenu($menu);}});});$$1.fn.extend({openFAB:function openFAB(){openFABMenu($$1(this));},closeFAB:function closeFAB(){closeFABMenu($$1(this));}});openFABMenu=function openFABMenu(btn){$this=btn;if($this.hasClass('active')===false){// Get direction option
var horizontal=$this.hasClass('horizontal');var offsetY,offsetX;if(horizontal===true){offsetX=40;}else{offsetY=40;}$this.addClass('active');$this.find('ul .btn-floating').velocity({scaleY:".4",scaleX:".4",translateY:offsetY+'px',translateX:offsetX+'px'},{duration:0});var time=0;$this.find('ul .btn-floating').reverse().each(function(){$$1(this).velocity({opacity:"1",scaleX:"1",scaleY:"1",translateY:"0",translateX:'0'},{duration:80,delay:time});time+=40;});}};closeFABMenu=function closeFABMenu(btn){$this=btn;// Get direction option
var horizontal=$this.hasClass('horizontal');var offsetY,offsetX;if(horizontal===true){offsetX=40;}else{offsetY=40;}$this.removeClass('active');var time=0;$this.find('ul .btn-floating').velocity("stop",true);$this.find('ul .btn-floating').velocity({opacity:"0",scaleX:".4",scaleY:".4",translateY:offsetY+'px',translateX:offsetX+'px'},{duration:80});};// Source: node_modules/materialize-css/js/transitions.js
// Image transition function
Materialize.fadeInImage=function(selector){var element=$$1(selector);element.css({opacity:0});$$1(element).velocity({opacity:1},{duration:650,queue:false,easing:'easeOutSine'});$$1(element).velocity({opacity:1},{duration:1300,queue:false,easing:'swing',step:function step(now,fx){fx.start=100;var grayscale_setting=now/100;var brightness_setting=150-(100-now)/1.75;if(brightness_setting<100){brightness_setting=100;}if(now>=0){$$1(this).css({"-webkit-filter":"grayscale("+grayscale_setting+")"+"brightness("+brightness_setting+"%)","filter":"grayscale("+grayscale_setting+")"+"brightness("+brightness_setting+"%)"});}}});};// Horizontal staggered list
Materialize.showStaggeredList=function(selector){var time=0;$$1(selector).find('li').velocity({translateX:"-100px"},{duration:0});$$1(selector).find('li').each(function(){$$1(this).velocity({opacity:"1",translateX:"0"},{duration:800,delay:time,easing:[60,10]});time+=120;});};$$1(document$1).ready(function(){// Hardcoded .staggered-list scrollFire
// var staggeredListOptions = [];
// $('ul.staggered-list').each(function (i) {
//   var label = 'scrollFire-' + i;
//   $(this).addClass(label);
//   staggeredListOptions.push(
//     {selector: 'ul.staggered-list.' + label,
//      offset: 200,
//      callback: 'showStaggeredList("ul.staggered-list.' + label + '")'});
// });
// scrollFire(staggeredListOptions);
// HammerJS, Swipe navigation
// Touch Event
var swipeLeft=false;var swipeRight=false;// Dismissible Collections
$$1('.dismissable').each(function(){$$1(this).hammer({prevent_default:false}).bind('pan',function(e){if(e.gesture.pointerType==="touch"){var $this=$$1(this);var direction=e.gesture.direction;var x=e.gesture.deltaX;var velocityX=e.gesture.velocityX;$this.velocity({translateX:x},{duration:50,queue:false,easing:'easeOutQuad'});// Swipe Left
if(direction===4&&(x>$this.innerWidth()/2||velocityX<-0.75)){swipeLeft=true;}// Swipe Right
if(direction===2&&(x<-1*$this.innerWidth()/2||velocityX>0.75)){swipeRight=true;}}}).bind('panend',function(e){// Reset if collection is moved back into original position
if(Math.abs(e.gesture.deltaX)<$$1(this).innerWidth()/2){swipeRight=false;swipeLeft=false;}if(e.gesture.pointerType==="touch"){var $this=$$1(this);if(swipeLeft||swipeRight){var fullWidth;if(swipeLeft){fullWidth=$this.innerWidth();}else{fullWidth=-1*$this.innerWidth();}$this.velocity({translateX:fullWidth},{duration:100,queue:false,easing:'easeOutQuad',complete:function complete(){$this.css('border','none');$this.velocity({height:0,padding:0},{duration:200,queue:false,easing:'easeOutQuad',complete:function complete(){$this.remove();}});}});}else{$this.velocity({translateX:0},{duration:100,queue:false,easing:'easeOutQuad'});}swipeLeft=false;swipeRight=false;}});});// time = 0
// // Vertical Staggered list
// $('ul.staggered-list.vertical li').velocity(
//     { translateY: "100px"},
//     { duration: 0 });
// $('ul.staggered-list.vertical li').each(function() {
//   $(this).velocity(
//     { opacity: "1", translateY: "0"},
//     { duration: 800, delay: time, easing: [60, 25] });
//   time += 120;
// });
// // Fade in and Scale
// $('.fade-in.scale').velocity(
//     { scaleX: .4, scaleY: .4, translateX: -600},
//     { duration: 0});
// $('.fade-in').each(function() {
//   $(this).velocity(
//     { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},
//     { duration: 800, easing: [60, 10] });
// });
});guidfn=function guidfn(){function s4(){return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);}return function(){return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();};};validate_field=function validate_field(object){var hasLength=object.attr('length')!==undefined;var lenAttr=parseInt(object.attr('length'),10);var len=object.val().length;if(object.val().length===0&&object[0].validity.badInput===false){if(object.hasClass('validate')){object.removeClass('valid');object.removeClass('invalid');}}else if(object.hasClass('validate')){// Check for character counter attributes
if(object.is(':valid')&&hasLength&&len<=lenAttr||object.is(':valid')&&!hasLength){object.removeClass('invalid');object.addClass('valid');}else{object.removeClass('valid');object.addClass('invalid');}}};// Unique ID
Materialize.guid=guidfn();Materialize.elementOrParentIsFixed=function(element){var $element=$$1(element);var $checkElements=$element.add($element.parents());var isFixed=false;$checkElements.each(function(){if($$1(this).css("position")==="fixed"){isFixed=true;return false;}});return isFixed;};// Text based inputs
Materialize.input_selector=['input[type=text]','input[type=password]','input[type=email]','input[type=url]','input[type=tel]','input[type=number]','input[type=search]','textarea'].join(',');// Function to update labels of text fields
Materialize.updateTextFields=function(){$$1(Materialize.input_selector).each(function(index,element){if($$1(element).val().length>0||$$1(this).attr('placeholder')!==undefined||$$1(element)[0].validity.badInput===true){$$1(this).siblings('label').addClass('active');}else{$$1(this).siblings('label, i').removeClass('active');}});};$$1(document$1).ready(function(){// Add active if form auto complete
$$1(document$1).on('change',Materialize.input_selector,function(){if($$1(this).val().length!==0||$$1(this).attr('placeholder')!==undefined){$$1(this).siblings('label').addClass('active');}validate_field($$1(this));});// Add active when element has focus
$$1(document$1).on('focus',Materialize.input_selector,function(){$$1(this).siblings('label, i').addClass('active');});$$1(document$1).on('blur',Materialize.input_selector,function(){var $inputElement=$$1(this);if($inputElement.val().length===0&&$inputElement[0].validity.badInput!==true&&$inputElement.attr('placeholder')===undefined){$inputElement.siblings('label, i').removeClass('active');}if($inputElement.val().length===0&&$inputElement[0].validity.badInput!==true&&$inputElement.attr('placeholder')!==undefined){$inputElement.siblings('i').removeClass('active');}validate_field($inputElement);});Materialize.updateTextFields();// HTML DOM FORM RESET handling
$$1(document$1).on('reset',function(e){var formReset=$$1(e.target);if(formReset.is('form')){formReset.find(Materialize.input_selector).removeClass('valid').removeClass('invalid');formReset.find(Materialize.input_selector).each(function(){if($$1(this).attr('value')===''){$$1(this).siblings('label, i').removeClass('active');}});// Reset select
formReset.find('select.initialized').each(function(){var reset_text=formReset.find('option[selected]').text();formReset.siblings('input.select-dropdown').val(reset_text);});}});});Waves=Waves||{};document$1=$_GLOBAL$1.document;$$=document$1.querySelectorAll.bind(document$1);Effect={// Effect delay
duration:750,show:function show(e,element){// Disable right click
if(e.button===2){return false;}var el=element||this;// Create ripple
var ripple=document$1.createElement('div');ripple.className='waves-ripple';el.appendChild(ripple);// Get click coordinate and element witdh
var pos=offset(el);var relativeY=e.pageY-pos.top;var relativeX=e.pageX-pos.left;var scale='scale('+el.clientWidth/100*10+')';// Support for touch devices
if('touches'in e){relativeY=e.touches[0].pageY-pos.top;relativeX=e.touches[0].pageX-pos.left;}// Attach data to element
ripple.setAttribute('data-hold',Date.now());ripple.setAttribute('data-scale',scale);ripple.setAttribute('data-x',relativeX);ripple.setAttribute('data-y',relativeY);// Set ripple position
var rippleStyle={'top':relativeY+'px','left':relativeX+'px'};ripple.className=ripple.className+' waves-notransition';ripple.setAttribute('style',convertStyle(rippleStyle));ripple.className=ripple.className.replace('waves-notransition','');// Scale the ripple
rippleStyle['-webkit-transform']=scale;rippleStyle['-moz-transform']=scale;rippleStyle['-ms-transform']=scale;rippleStyle['-o-transform']=scale;rippleStyle.transform=scale;rippleStyle.opacity='1';rippleStyle['-webkit-transition-duration']=Effect.duration+'ms';rippleStyle['-moz-transition-duration']=Effect.duration+'ms';rippleStyle['-o-transition-duration']=Effect.duration+'ms';rippleStyle['transition-duration']=Effect.duration+'ms';rippleStyle['-webkit-transition-timing-function']='cubic-bezier(0.250, 0.460, 0.450, 0.940)';rippleStyle['-moz-transition-timing-function']='cubic-bezier(0.250, 0.460, 0.450, 0.940)';rippleStyle['-o-transition-timing-function']='cubic-bezier(0.250, 0.460, 0.450, 0.940)';rippleStyle['transition-timing-function']='cubic-bezier(0.250, 0.460, 0.450, 0.940)';ripple.setAttribute('style',convertStyle(rippleStyle));},hide:function hide(e){TouchHandler.touchup(e);var el=this;var width=el.clientWidth*1.4;// Get first ripple
var ripple=null;var ripples=el.getElementsByClassName('waves-ripple');if(ripples.length>0){ripple=ripples[ripples.length-1];}else{return false;}var relativeX=ripple.getAttribute('data-x');var relativeY=ripple.getAttribute('data-y');var scale=ripple.getAttribute('data-scale');// Get delay beetween mousedown and mouse leave
var diff=Date.now()-Number(ripple.getAttribute('data-hold'));var delay=350-diff;if(delay<0){delay=0;}// Fade out ripple after delay
setTimeout(function(){var style={'top':relativeY+'px','left':relativeX+'px','opacity':'0',// Duration
'-webkit-transition-duration':Effect.duration+'ms','-moz-transition-duration':Effect.duration+'ms','-o-transition-duration':Effect.duration+'ms','transition-duration':Effect.duration+'ms','-webkit-transform':scale,'-moz-transform':scale,'-ms-transform':scale,'-o-transform':scale,'transform':scale};ripple.setAttribute('style',convertStyle(style));setTimeout(function(){try{el.removeChild(ripple);}catch(e){return false;}},Effect.duration);},delay);},// Little hack to make <input> can perform waves effect
wrapInput:function wrapInput(elements){for(var a=0;a<elements.length;a++){var el=elements[a];if(el.tagName.toLowerCase()==='input'){var parent=el.parentNode;// If input already have parent just pass through
if(parent.tagName.toLowerCase()==='i'&&parent.className.indexOf('waves-effect')!==-1){continue;}// Put element class and style to the specified parent
var wrapper=document$1.createElement('i');wrapper.className=el.className+' waves-input-wrapper';var elementStyle=el.getAttribute('style');if(!elementStyle){elementStyle='';}wrapper.setAttribute('style',elementStyle);el.className='waves-button-input';el.removeAttribute('style');// Put element as child
parent.replaceChild(wrapper,el);wrapper.appendChild(el);}}}};TouchHandler={/* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */touches:0,allowEvent:function allowEvent(e){var allow=true;if(e.type==='touchstart'){TouchHandler.touches+=1;//push
}else if(e.type==='touchend'||e.type==='touchcancel'){setTimeout(function(){if(TouchHandler.touches>0){TouchHandler.touches-=1;//pop after 500ms
}},500);}else if(e.type==='mousedown'&&TouchHandler.touches>0){allow=false;}return allow;},touchup:function touchup(e){TouchHandler.allowEvent(e);}};Waves.displayEffect=function(options){options=options||{};if('duration'in options){Effect.duration=options.duration;}//Wrap input inside <i> tag
Effect.wrapInput($$('.waves-effect'));if('ontouchstart'in $_GLOBAL$1){document$1.body.addEventListener('touchstart',showEffect,false);}document$1.body.addEventListener('mousedown',showEffect,false);};/**
 * Attach Waves to an input element (or any element which doesn't
 * bubble mouseup/mousedown events).
 *   Intended to be used with dynamically loaded forms/inputs, or
 * where the user doesn't want a delegated click handler.
 */Waves.attach=function(element){//FUTURE: automatically add waves classes and allow users
// to specify them with an options param? Eg. light/classic/button
if(element.tagName.toLowerCase()==='input'){Effect.wrapInput([element]);element=element.parentElement;}if('ontouchstart'in $_GLOBAL$1){element.addEventListener('touchstart',showEffect,false);}element.addEventListener('mousedown',showEffect,false);};$_GLOBAL$1.Waves=Waves;document$1.addEventListener('DOMContentLoaded',function(){Waves.displayEffect();},false);$=jQuery;jQuery.fn.animate=jQuery.fn.velocity;jQuery.fn.fadeOut=function(speed,easing,callback){return this.each(function(){$(this).velocity({opacity:'hide'},speed,easing,callback);});};jQuery.fn.fadeIn=function(speed,easing,callback){return this.each(function(){$(this).velocity({opacity:'show'},speed,easing,callback);});};/*
		jQuery.fn.extend({
		show: function () {
			return jQuery(this).removeClass('invisible');
		},
		hide: function () {
			return jQuery(this).addClass('invisible');
		},
		toggle: function (state) {
			return jQuery(this).toggleClass('invisible');
		}
	});
	*/$.fn.modal=function(option){var defaults={dismissible:true,// Modal can be dismissed by clicking outside of the modal
opacity:0.5,// Opacity of modal background
in_duration:300,// Transition in duration
out_duration:200,// Transition out duration
ready:function ready(){alert('Ready');},// Callback for Modal open
complete:function complete(){alert('Closed');}// Callback for Modal close
};var options=$.extend(defaults,option);return this.each(function(){if(option==='show'){$(this).openModal();}else if(options==='hide'){$(this).closeModal();}else{$(this).leanModal(options);}});};/**
 * Devuelve el elemento que calza con el selector, o crea un nuevo elemento
 * @param  {String} selector  selector CSS para buscar si existe el elemento
 * @param  {String} html  definicion del elemento a crear
 * @return {jQuery Object} uno o mas elementos que calzan con el criterio de seleccion
 */jQuery.getOrCreate=function(selector,html){var elemento=jQuery(selector);if(elemento.length===0){elemento=jQuery(html);}return elemento;};$.fn.tabs=function(methodOrOptions){var methods={init:function init(){return this.each(function(){// For each set of tabs, we want to keep track of
// which tab is active and its associated content
var $this=$(this),window_width=$(window).width();$this.width('100%');var $active,$content,$links=$this.find('li.tab a'),$tabs_width=$this.width(),$tab_width=Math.max($tabs_width,$this[0].scrollWidth)/$links.length,$index=0;// If the location.hash matches one of the links, use that as the active tab.
$active=$($links.filter('[href="'+location.hash+'"]'));// If no match is found, use the first link or any with class 'active' as the initial active tab.
if($active.length===0){$active=$(this).find('li.tab a.active').first();}if($active.length===0){$active=$(this).find('li.tab a').first();}$active.addClass('active');$index=$links.index($active);if($index<0){$index=0;}if($active[0]!==undefined){$content=$($active[0].hash);}// append indicator then set indicator width to tab width
$this.append('<div class="indicator"></div>');var $indicator=$this.find('.indicator');if($this.is(":visible")){$indicator.css({"right":$tabs_width-($index+1)*$tab_width});$indicator.css({"left":$index*$tab_width});}$(window).resize(function(){$tabs_width=$this.width();$tab_width=Math.max($tabs_width,$this[0].scrollWidth)/$links.length;if($index<0){$index=0;}if($tab_width!==0&&$tabs_width!==0){$indicator.css({"right":$tabs_width-($index+1)*$tab_width});$indicator.css({"left":$index*$tab_width});}});// Hide the remaining content
$links.not($active).each(function(){$(this.hash).hide();});// Bind the click event handler
$this.on('click','a',function(e){if($(this).parent().hasClass('disabled')){e.preventDefault();return;}$tabs_width=$this.width();$tab_width=Math.max($tabs_width,$this[0].scrollWidth)/$links.length;// Make the old tab inactive.
$active.removeClass('active');if($content!==undefined){$content.hide();}// Update the variables with the new link and content
$active=$(this);$content=$(this.hash);$links=$this.find('li.tab a');// Make the tab active.
$active.addClass('active');var $prev_index=$index;$index=$links.index($(this));if($index<0){$index=0;}// Change url to current tab
// window.location.hash = $active.attr('href');
if($content!==undefined){$content.show();}// Update indicator
if($index-$prev_index>=0){$indicator.velocity({"right":$tabs_width-($index+1)*$tab_width},{duration:300,queue:false,easing:'easeOutQuad'});$indicator.velocity({"left":$index*$tab_width},{duration:300,queue:false,easing:'easeOutQuad',delay:90});}else{$indicator.velocity({"left":$index*$tab_width},{duration:300,queue:false,easing:'easeOutQuad'});$indicator.velocity({"right":$tabs_width-($index+1)*$tab_width},{duration:300,queue:false,easing:'easeOutQuad',delay:90});}// Prevent the anchor's default click action
e.preventDefault();});});},select_tab:function select_tab(id){this.find('a[href="#'+id+'"]').trigger('click');}};if(methods[methodOrOptions]){return methods[methodOrOptions].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof methodOrOptions==='object'||!methodOrOptions){// Default to "init"
return methods.init.apply(this,arguments);}else{$.error('Method '+methodOrOptions+' does not exist on jQuery.tooltip');}};$(document).ready(function(){var swipeLeft=false;var swipeRight=false;$('ul.tabs').tabs();// Dismissible Collections
$('.dismissable').each(function(){$(this).hammer({prevent_default:false}).bind('pan',function(e){if(e.gesture.pointerType==="touch"){var $this=$(this);var direction=e.gesture.direction;var x=e.gesture.deltaX;var velocityX=e.gesture.velocityX;$this.velocity({translateX:x},{duration:50,queue:false,easing:'easeOutQuad'});// Swipe Left
if(direction===4&&(x>$this.innerWidth()/2||velocityX<-0.75)){swipeLeft=true;}// Swipe Right
if(direction===2&&(x<-1*$this.innerWidth()/2||velocityX>0.75)){swipeRight=true;}}}).bind('panend',function(e){// Reset if collection is moved back into original position
if(Math.abs(e.gesture.deltaX)<$(this).innerWidth()/2){swipeRight=false;swipeLeft=false;}if(e.gesture.pointerType==="touch"){var $this=$(this);if(swipeLeft||swipeRight){var fullWidth;if(swipeLeft){fullWidth=$this.innerWidth();}else{fullWidth=-1*$this.innerWidth();}$this.velocity({translateX:fullWidth},{duration:100,queue:false,easing:'easeOutQuad',complete:function complete(){$this.css('border','none');$this.velocity({height:0,padding:0},{duration:200,queue:false,easing:'easeOutQuad',complete:function complete(){$this.remove();}});}});}else{$this.velocity({translateX:0},{duration:100,queue:false,easing:'easeOutQuad'});}swipeLeft=false;swipeRight=false;}});});// Handle HTML5 autofocus
$('input[autofocus]').siblings('label, i').addClass('active');// Textarea Auto Resize
var hiddenDiv=$('.hiddendiv').first();if(!hiddenDiv.length){hiddenDiv=$('<div class="hiddendiv common"></div>');$('body').append(hiddenDiv);}var text_area_selector='.materialize-textarea';$(text_area_selector).each(function(){var $textarea=$(this);if($textarea.val().length){textareaAutoResize($textarea);}});$('body').on('keyup keydown autoresize',text_area_selector,function(){textareaAutoResize($(this));});// File Input Path
$(document).on('change','.file-field input[type="file"]',function(){var file_field=$(this).closest('.file-field');var path_input=file_field.find('input.file-path');var files=$(this)[0].files;var file_names=[];for(var i=0;i<files.length;i++){file_names.push(files[i].name);}path_input.val(file_names.join(", "));path_input.trigger('change');});});$_GLOBAL=typeof window!=='undefined'?window:typeof global!=='undefined'?global:Function('return this')();if(typeof exports==='object'&&typeof module!=='undefined'){module.exports=jQuery;}else if(typeof define==='function'&&define.amd){define(function(){return jQuery;});}else{$_GLOBAL.jQuery=jQuery;}_export('jQuery',jQuery);_export('default',jQuery);}};});
})
(function(factory) {
  main = factory();
});

export default main;