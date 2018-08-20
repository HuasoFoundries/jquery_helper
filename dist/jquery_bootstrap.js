!function(global, factory) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document) throw new Error("jQuery requires a window with a document");
        return factory(w);
    } : factory(global);
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    "use strict";
    function DOMEval(code, doc, node) {
        doc = doc || document;
        var i, script = doc.createElement("script");
        if (script.text = code, node) for (i in preservedScriptAttributes) node[i] && (script[i] = node[i]);
        doc.head.appendChild(script).parentNode.removeChild(script);
    }
    function toType(obj) {
        return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
    }
    function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length, type = toType(obj);
        return !isFunction(obj) && !isWindow(obj) && ("array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj);
    }
    function nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    }
    function winnow(elements, qualifier, not) {
        return isFunction(qualifier) ? jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        }) : qualifier.nodeType ? jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        }) : "string" != typeof qualifier ? jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) > -1 !== not;
        }) : jQuery.filter(qualifier, elements, not);
    }
    function sibling(cur, dir) {
        for (;(cur = cur[dir]) && 1 !== cur.nodeType; ) ;
        return cur;
    }
    function createOptions(options) {
        var object = {};
        return jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function Identity(v) {
        return v;
    }
    function Thrower(ex) {
        throw ex;
    }
    function adoptValue(value, resolve, reject, noValue) {
        var method;
        try {
            value && isFunction(method = value.promise) ? method.call(value).done(resolve).fail(reject) : value && isFunction(method = value.then) ? method.call(value, resolve, reject) : resolve.apply(void 0, [ value ].slice(noValue));
        } catch (value) {
            reject.apply(void 0, [ value ]);
        }
    }
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed), window.removeEventListener("load", completed), 
        jQuery.ready();
    }
    function fcamelCase(all, letter) {
        return letter.toUpperCase();
    }
    function camelCase(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    }
    function Data() {
        this.expando = jQuery.expando + Data.uid++;
    }
    function getData(data) {
        return "true" === data || "false" !== data && ("null" === data ? null : data === +data + "" ? +data : rbrace.test(data) ? JSON.parse(data) : data);
    }
    function dataAttr(elem, key, data) {
        var name;
        if (void 0 === data && 1 === elem.nodeType) if (name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase(), 
        "string" == typeof (data = elem.getAttribute(name))) {
            try {
                data = getData(data);
            } catch (e) {}
            dataUser.set(elem, key, data);
        } else data = void 0;
        return data;
    }
    function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
            return tween.cur();
        } : function() {
            return jQuery.css(elem, prop, "");
        }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = (jQuery.cssNumber[prop] || "px" !== unit && +initial) && rcssNum.exec(jQuery.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
            for (initial /= 2, unit = unit || initialInUnit[3], initialInUnit = +initial || 1; maxIterations--; ) jQuery.style(elem, prop, initialInUnit + unit), 
            (1 - scale) * (1 - (scale = currentValue() / initial || .5)) <= 0 && (maxIterations = 0), 
            initialInUnit /= scale;
            initialInUnit *= 2, jQuery.style(elem, prop, initialInUnit + unit), valueParts = valueParts || [];
        }
        return valueParts && (initialInUnit = +initialInUnit || +initial || 0, adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2], 
        tween && (tween.unit = unit, tween.start = initialInUnit, tween.end = adjusted)), 
        adjusted;
    }
    function getDefaultDisplay(elem) {
        var temp, doc = elem.ownerDocument, nodeName = elem.nodeName, display = defaultDisplayMap[nodeName];
        return display || (temp = doc.body.appendChild(doc.createElement(nodeName)), display = jQuery.css(temp, "display"), 
        temp.parentNode.removeChild(temp), "none" === display && (display = "block"), defaultDisplayMap[nodeName] = display, 
        display);
    }
    function showHide(elements, show) {
        for (var display, elem, values = [], index = 0, length = elements.length; index < length; index++) elem = elements[index], 
        elem.style && (display = elem.style.display, show ? ("none" === display && (values[index] = dataPriv.get(elem, "display") || null, 
        values[index] || (elem.style.display = "")), "" === elem.style.display && isHiddenWithinTree(elem) && (values[index] = getDefaultDisplay(elem))) : "none" !== display && (values[index] = "none", 
        dataPriv.set(elem, "display", display)));
        for (index = 0; index < length; index++) null != values[index] && (elements[index].style.display = values[index]);
        return elements;
    }
    function getAll(context, tag) {
        var ret;
        return ret = void 0 !== context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : void 0 !== context.querySelectorAll ? context.querySelectorAll(tag || "*") : [], 
        void 0 === tag || tag && nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
    }
    function setGlobalEval(elems, refElements) {
        for (var i = 0, l = elems.length; i < l; i++) dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
    function buildFragment(elems, context, scripts, selection, ignored) {
        for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; i < l; i++) if ((elem = elems[i]) || 0 === elem) if ("object" === toType(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
            for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
            wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2], 
            j = wrap[0]; j--; ) tmp = tmp.lastChild;
            jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = "";
        } else nodes.push(context.createTextNode(elem));
        for (fragment.textContent = "", i = 0; elem = nodes[i++]; ) if (selection && jQuery.inArray(elem, selection) > -1) ignored && ignored.push(elem); else if (contains = jQuery.contains(elem.ownerDocument, elem), 
        tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
        scripts) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
        return fragment;
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function on(elem, types, selector, data, fn, one) {
        var origFn, type;
        if ("object" == typeof types) {
            "string" != typeof selector && (data = data || selector, selector = void 0);
            for (type in types) on(elem, type, selector, data, types[type], one);
            return elem;
        }
        if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, 
        data = void 0) : (fn = data, data = selector, selector = void 0)), !1 === fn) fn = returnFalse; else if (!fn) return elem;
        return 1 === one && (origFn = fn, fn = function(event) {
            return jQuery().off(event), origFn.apply(this, arguments);
        }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), elem.each(function() {
            jQuery.event.add(this, types, fn, data, selector);
        });
    }
    function manipulationTarget(elem, content) {
        return nodeName(elem, "table") && nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? jQuery(elem).children("tbody")[0] || elem : elem;
    }
    function disableScript(elem) {
        return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem;
    }
    function restoreScript(elem) {
        return "true/" === (elem.type || "").slice(0, 5) ? elem.type = elem.type.slice(5) : elem.removeAttribute("type"), 
        elem;
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (1 === dest.nodeType) {
            if (dataPriv.hasData(src) && (pdataOld = dataPriv.access(src), pdataCur = dataPriv.set(dest, pdataOld), 
            events = pdataOld.events)) {
                delete pdataCur.handle, pdataCur.events = {};
                for (type in events) for (i = 0, l = events[type].length; i < l; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            dataUser.hasData(src) && (udataOld = dataUser.access(src), udataCur = jQuery.extend({}, udataOld), 
            dataUser.set(dest, udataCur));
        }
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : "input" !== nodeName && "textarea" !== nodeName || (dest.defaultValue = src.defaultValue);
    }
    function domManip(collection, args, callback, ignored) {
        args = concat.apply([], args);
        var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction(value);
        if (valueIsFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return collection.each(function(index) {
            var self = collection.eq(index);
            valueIsFunction && (args[0] = value.call(this, index, self.html())), domManip(self, args, callback, ignored);
        });
        if (l && (fragment = buildFragment(args, collection[0].ownerDocument, !1, collection, ignored), 
        first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
        first || ignored)) {
            for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; i < l; i++) node = fragment, 
            i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
            callback.call(collection[i], node, i);
            if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
            i = 0; i < hasScripts; i++) node = scripts[i], rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src && "module" !== (node.type || "").toLowerCase() ? jQuery._evalUrl && jQuery._evalUrl(node.src) : DOMEval(node.textContent.replace(rcleanScript, ""), doc, node));
        }
        return collection;
    }
    function remove(elem, selector, keepData) {
        for (var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0; null != (node = nodes[i]); i++) keepData || 1 !== node.nodeType || jQuery.cleanData(getAll(node)), 
        node.parentNode && (keepData && jQuery.contains(node.ownerDocument, node) && setGlobalEval(getAll(node, "script")), 
        node.parentNode.removeChild(node));
        return elem;
    }
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name], 
        "" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        !support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name) && (width = style.width, 
        minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        void 0 !== ret ? ret + "" : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    function vendorPropName(name) {
        if (name in emptyStyle) return name;
        for (var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length; i--; ) if ((name = cssPrefixes[i] + capName) in emptyStyle) return name;
    }
    function finalPropName(name) {
        var ret = jQuery.cssProps[name];
        return ret || (ret = jQuery.cssProps[name] = vendorPropName(name) || name), ret;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rcssNum.exec(value);
        return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
    }
    function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
        var i = "width" === dimension ? 1 : 0, extra = 0, delta = 0;
        if (box === (isBorderBox ? "border" : "content")) return 0;
        for (;i < 4; i += 2) "margin" === box && (delta += jQuery.css(elem, box + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === box && (delta -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== box && (delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (delta += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== box ? delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles) : extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles));
        return !isBorderBox && computedVal >= 0 && (delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - .5))), 
        delta;
    }
    function getWidthOrHeight(elem, dimension, extra) {
        var styles = getStyles(elem), val = curCSS(elem, dimension, styles), isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles), valueIsBorderBox = isBorderBox;
        if (rnumnonpx.test(val)) {
            if (!extra) return val;
            val = "auto";
        }
        return valueIsBorderBox = valueIsBorderBox && (support.boxSizingReliable() || val === elem.style[dimension]), 
        ("auto" === val || !parseFloat(val) && "inline" === jQuery.css(elem, "display", !1, styles)) && (val = elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)], 
        valueIsBorderBox = !0), (val = parseFloat(val) || 0) + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles, val) + "px";
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function schedule() {
        inProgress && (!1 === document.hidden && window.requestAnimationFrame ? window.requestAnimationFrame(schedule) : window.setTimeout(schedule, jQuery.fx.interval), 
        jQuery.fx.tick());
    }
    function createFxNow() {
        return window.setTimeout(function() {
            fxNow = void 0;
        }), fxNow = Date.now();
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = {
            height: type
        };
        for (includeWidth = includeWidth ? 1 : 0; i < 4; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length; index < length; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        }));
        for (prop in props) if (value = props[prop], rfxtypes.test(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                hidden = !0;
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        }
        if ((propTween = !jQuery.isEmptyObject(props)) || !jQuery.isEmptyObject(orig)) {
            isBox && 1 === elem.nodeType && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
            restoreDisplay = dataShow && dataShow.display, null == restoreDisplay && (restoreDisplay = dataPriv.get(elem, "display")), 
            display = jQuery.css(elem, "display"), "none" === display && (restoreDisplay ? display = restoreDisplay : (showHide([ elem ], !0), 
            restoreDisplay = elem.style.display || restoreDisplay, display = jQuery.css(elem, "display"), 
            showHide([ elem ]))), ("inline" === display || "inline-block" === display && null != restoreDisplay) && "none" === jQuery.css(elem, "float") && (propTween || (anim.done(function() {
                style.display = restoreDisplay;
            }), null == restoreDisplay && (display = style.display, restoreDisplay = "none" === display ? "" : display)), 
            style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", anim.always(function() {
                style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
            })), propTween = !1;
            for (prop in orig) propTween || (dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = dataPriv.access(elem, "fxshow", {
                display: restoreDisplay
            }), toggle && (dataShow.hidden = !hidden), hidden && showHide([ elem ], !0), anim.done(function() {
                hidden || showHide([ elem ]), dataPriv.remove(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            })), propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim), prop in dataShow || (dataShow[prop] = propTween.start, 
            hidden && (propTween.end = propTween.start, propTween.start = 0));
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = camelCase(index), easing = specialEasing[name], 
        value = props[index], Array.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), (hooks = jQuery.cssHooks[name]) && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; index < length; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), percent < 1 && length ? remaining : (length || deferred.notifyWith(elem, [ animation, 1, 0 ]), 
            deferred.resolveWith(elem, [ animation ]), !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
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
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; index < length; index++) animation.tweens[index].run(1);
                return gotoEnd ? (deferred.notifyWith(elem, [ animation, 1, 0 ]), deferred.resolveWith(elem, [ animation, gotoEnd ])) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); index < length; index++) if (result = Animation.prefilters[index].call(animation, elem, props, animation.opts)) return isFunction(result.stop) && (jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result)), 
        result;
        return jQuery.map(props, createTween, animation), isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation;
    }
    function stripAndCollapse(value) {
        return (value.match(rnothtmlwhite) || []).join(" ");
    }
    function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || "";
    }
    function classesToArray(value) {
        return Array.isArray(value) ? value : "string" == typeof value ? value.match(rnothtmlwhite) || [] : [];
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (Array.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v && null != v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== toType(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
            if (isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
        void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) return finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType];
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
        prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
            if (!(conv = converters[prev + " " + current] || converters["* " + current])) for (conv2 in converters) if (tmp = conv2.split(" "), 
            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                !0 === conv ? conv = converters[conv2] : !0 !== converters[conv2] && (current = tmp[0], 
                dataTypes.unshift(tmp[1]));
                break;
            }
            if (!0 !== conv) if (conv && s.throws) response = conv(response); else try {
                response = conv(response);
            } catch (e) {
                return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                };
            }
        }
        return {
            state: "success",
            data: response
        };
    }
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
        0 === s.indexOf('"') && (s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return s = decodeURIComponent(s.replace(pluses, " ")), config.json ? JSON.parse(s) : s;
        } catch (e) {}
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return jQuery.isFunction(converter) ? converter(value) : value;
    }
    function Widget() {}
    function datepicker_getZindex(elem) {
        for (var position, value; elem.length && elem[0] !== document; ) {
            if (("absolute" === (position = elem.css("position")) || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), 
            !isNaN(value) && 0 !== value)) return value;
            elem = elem.parent();
        }
        return 0;
    }
    function Datepicker() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, 
        this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", 
        this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", 
        this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", 
        this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", 
        this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, $.extend(this._defaults, this.regional[""]), this.regional.en = $.extend(!0, {}, this.regional[""]), 
        this.regional["en-US"] = $.extend(!0, {}, this.regional.en), this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
    }
    function datepicker_bindHover(dpDiv) {
        var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return dpDiv.on("mouseout", selector, function() {
            $(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && $(this).removeClass("ui-datepicker-prev-hover"), 
            -1 !== this.className.indexOf("ui-datepicker-next") && $(this).removeClass("ui-datepicker-next-hover");
        }).on("mouseover", selector, datepicker_handleMouseover);
    }
    function datepicker_handleMouseover() {
        $.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), 
        $(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && $(this).addClass("ui-datepicker-prev-hover"), 
        -1 !== this.className.indexOf("ui-datepicker-next") && $(this).addClass("ui-datepicker-next-hover"));
    }
    function datepicker_extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) null == props[name] && (target[name] = props[name]);
        return target;
    }
    function clearMenus() {
        $(".dropdown-backdrop").remove(), $(toggle).each(function() {
            getParent($(this)).removeClass("open");
        });
    }
    function getParent($this) {
        var $parent, selector = $this.attr("data-target");
        return selector || (selector = $this.attr("href"), selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "")), 
        $parent = selector && $(selector), $parent && $parent.length || ($parent = $this.parent()), 
        $parent;
    }
    var arr = [], document = window.document, getProto = Object.getPrototypeOf, slice = arr.slice, concat = arr.concat, push = arr.push, indexOf = arr.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, fnToString = hasOwn.toString, ObjectFunctionString = fnToString.call(Object), support = {}, isFunction = function(obj) {
        return "function" == typeof obj && "number" != typeof obj.nodeType;
    }, isWindow = function(obj) {
        return null != obj && obj === obj.window;
    }, preservedScriptAttributes = {
        type: !0,
        src: !0,
        noModule: !0
    }, jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    jQuery.fn = jQuery.prototype = {
        jquery: "3.3.1",
        constructor: jQuery,
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return null == num ? slice.call(this) : num < 0 ? this[num + this.length] : this[num];
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret;
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
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor();
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || isFunction(target) || (target = {}), i === length && (target = this, 
        i--); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && Array.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, jQuery.extend({
        expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isPlainObject: function(obj) {
            var proto, Ctor;
            return !(!obj || "[object Object]" !== toString.call(obj)) && (!(proto = getProto(obj)) || "function" == typeof (Ctor = hasOwn.call(proto, "constructor") && proto.constructor) && fnToString.call(Ctor) === ObjectFunctionString);
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        globalEval: function(code) {
            DOMEval(code);
        },
        each: function(obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj)) for (length = obj.length; i < length && !1 !== callback.call(obj[i], i, obj[i]); i++) ; else for (i in obj) if (!1 === callback.call(obj[i], i, obj[i])) break;
            return obj;
        },
        trim: function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArrayLike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            return null == arr ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; j < len; j++) first[i++] = second[j];
            return first.length = i, first;
        },
        grep: function(elems, callback, invert) {
            for (var matches = [], i = 0, length = elems.length, callbackExpect = !invert; i < length; i++) !callback(elems[i], i) !== callbackExpect && matches.push(elems[i]);
            return matches;
        },
        map: function(elems, callback, arg) {
            var length, value, i = 0, ret = [];
            if (isArrayLike(elems)) for (length = elems.length; i < length; i++) null != (value = callback(elems[i], i, arg)) && ret.push(value); else for (i in elems) null != (value = callback(elems[i], i, arg)) && ret.push(value);
            return concat.apply([], ret);
        },
        guid: 1,
        support: support
    }), "function" == typeof Symbol && (jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]), 
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var m, i, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            if (results = results || [], "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results;
            if (!seed && ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, documentIsHTML)) {
                if (11 !== nodeType && (match = rquickExpr.exec(selector))) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (!(elem = context.getElementById(m))) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                    results;
                    if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                    results;
                }
                if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (1 !== nodeType) newContext = context, newSelector = selector; else if ("object" !== context.nodeName.toLowerCase()) {
                        for ((nid = context.getAttribute("id")) ? nid = nid.replace(rcssescape, fcssescape) : context.setAttribute("id", nid = expando), 
                        groups = tokenize(selector), i = groups.length; i--; ) groups[i] = "#" + nid + " " + toSelector(groups[i]);
                        newSelector = groups.join(","), newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                    } catch (qsaError) {} finally {
                        nid === expando && context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
            }
            var keys = [];
            return cache;
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var el = document.createElement("fieldset");
            try {
                return !!fn(el);
            } catch (e) {
                return !1;
            } finally {
                el.parentNode && el.parentNode.removeChild(el), el = null;
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = arr.length; i--; ) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createDisabledPseudo(disabled) {
            return function(elem) {
                return "form" in elem ? elem.parentNode && !1 === elem.disabled ? "label" in elem ? "label" in elem.parentNode ? elem.parentNode.disabled === disabled : elem.disabled === disabled : elem.isDisabled === disabled || elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled : elem.disabled === disabled : "label" in elem && elem.disabled === disabled;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function testContext(context) {
            return context && void 0 !== context.getElementsByTagName && context;
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; i < len; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, skip = combinator.next, key = skip || dir, checkNonElements = base && "parentNode" === key, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
                return !1;
            } : function(elem, context, xml) {
                var oldCache, uniqueCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) if (outerCache = elem[expando] || (elem[expando] = {}), 
                uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {}), skip && skip === elem.nodeName.toLowerCase()) elem = elem[dir] || elem; else {
                    if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                    if (uniqueCache[key] = newCache, newCache[2] = matcher(elem, context, xml)) return !0;
                }
                return !1;
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; i < len; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; i < len; i++) (elem = unmatched[i]) && (filter && !filter(elem, context, xml) || (newUnmatched.push(elem), 
            mapped && map.push(i)));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                return checkContext = null, ret;
            } ]; i < len; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; j < len && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context === document || context || outermost); i !== len && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0, context || elem.ownerDocument === document || (setDocument(elem), xml = !documentIsHTML); matcher = elementMatchers[j++]; ) if (matcher(elem, context || document, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0), 0;
        }, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            for (var i = 0, len = list.length; i < len; i++) if (list[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + identifier + ")"),
            CLASS: new RegExp("^\\.(" + identifier + ")"),
            TAG: new RegExp("^(" + identifier + "|[*])"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        }, rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function(ch, asCodePoint) {
            return asCodePoint ? "\0" === ch ? "�" : ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " " : "\\" + ch;
        }, unloadHandler = function() {
            setDocument();
        }, disabledAncestor = addCombinator(function(elem) {
            return !0 === elem.disabled && ("form" in elem || "label" in elem);
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                    target.length = j - 1;
                }
            };
        }
        support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return !!documentElement && "HTML" !== documentElement.nodeName;
        }, setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = document.documentElement, documentIsHTML = !isXML(document), preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow && (subWindow.addEventListener ? subWindow.addEventListener("unload", unloadHandler, !1) : subWindow.attachEvent && subWindow.attachEvent("onunload", unloadHandler)), 
            support.attributes = assert(function(el) {
                return el.className = "i", !el.getAttribute("className");
            }), support.getElementsByTagName = assert(function(el) {
                return el.appendChild(document.createComment("")), !el.getElementsByTagName("*").length;
            }), support.getElementsByClassName = rnative.test(document.getElementsByClassName), 
            support.getById = assert(function(el) {
                return docElem.appendChild(el).id = expando, !document.getElementsByName || !document.getElementsByName(expando).length;
            }), support.getById ? (Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }, Expr.find.ID = function(id, context) {
                if (void 0 !== context.getElementById && documentIsHTML) {
                    var elem = context.getElementById(id);
                    return elem ? [ elem ] : [];
                }
            }) : (Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = void 0 !== elem.getAttributeNode && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }, Expr.find.ID = function(id, context) {
                if (void 0 !== context.getElementById && documentIsHTML) {
                    var node, i, elems, elem = context.getElementById(id);
                    if (elem) {
                        if ((node = elem.getAttributeNode("id")) && node.value === id) return [ elem ];
                        for (elems = context.getElementsByName(id), i = 0; elem = elems[i++]; ) if ((node = elem.getAttributeNode("id")) && node.value === id) return [ elem ];
                    }
                    return [];
                }
            }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return void 0 !== context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                if (void 0 !== context.getElementsByClassName && documentIsHTML) return context.getElementsByClassName(className);
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(document.querySelectorAll)) && (assert(function(el) {
                docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>", 
                el.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                el.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                el.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), el.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), 
                el.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]");
            }), assert(function(el) {
                el.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var input = document.createElement("input");
                input.setAttribute("type", "hidden"), el.appendChild(input).setAttribute("name", "D"), 
                el.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), 
                2 !== el.querySelectorAll(":enabled").length && rbuggyQSA.push(":enabled", ":disabled"), 
                docElem.appendChild(el).disabled = !0, 2 !== el.querySelectorAll(":disabled").length && rbuggyQSA.push(":enabled", ":disabled"), 
                el.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(el) {
                support.disconnectedMatch = matches.call(el, "*"), matches.call(el, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
            hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = hasCompare ? function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare || (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1);
            } : function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, document) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }, Sizzle.escape = function(sel) {
            return (sel + "").replace(rcssescape, fcssescape);
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
            results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return sortInput = null, results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i++]; ) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || void 0 !== elem.getAttribute && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : !operator || (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator && (result === check || result.slice(0, check.length + 1) === check + "-"));
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = !1;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (node = parent, outerCache = node[expando] || (node[expando] = {}), uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), 
                                cache = uniqueCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    uniqueCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (node = elem, outerCache = node[expando] || (node[expando] = {}), 
                            uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), cache = uniqueCache[type] || [], 
                            nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex), !1 === diff) for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && (outerCache = node[expando] || (node[expando] = {}), 
                            uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), uniqueCache[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return (diff -= last) === first || diff % first == 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return text = text.replace(runescape, funescape), function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do {
                            if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return (elemLang = elemLang.toLowerCase()) === lang || 0 === elemLang.indexOf(lang + "-");
                        } while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: createDisabledPseudo(!1),
                disabled: createDisabledPseudo(!0),
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, !0 === elem.selected;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ argument < 0 ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; i < length; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; i < length; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = function(type) {
            return function(elem) {
                return "input" === elem.nodeName.toLowerCase() && elem.type === type;
            };
        }(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = function(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                matched && !(match = rcomma.exec(soFar)) || (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }, compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)), i = match.length; i--; ) cached = matcherFromTokens(match[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), 
                cached.selector = selector;
            }
            return cached;
        }, select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [], 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (!(context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0])) return results;
                    compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                    if (tokens.splice(i, 1), !(selector = seed.length && toSelector(tokens))) return push.apply(results, seed), 
                    results;
                    break;
                }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context), 
            results;
        }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
        support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(el) {
            return 1 & el.compareDocumentPosition(document.createElement("fieldset"));
        }), assert(function(el) {
            return el.innerHTML = "<a href='#'></a>", "#" === el.firstChild.getAttribute("href");
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            if (!isXML) return elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        }), support.attributes && assert(function(el) {
            return el.innerHTML = "<input/>", el.firstChild.setAttribute("value", ""), "" === el.firstChild.getAttribute("value");
        }) || addHandle("value", function(elem, name, isXML) {
            if (!isXML && "input" === elem.nodeName.toLowerCase()) return elem.defaultValue;
        }), assert(function(el) {
            return null == el.getAttribute("disabled");
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            if (!isXML) return !0 === elem[name] ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }), Sizzle;
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, 
    jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains, jQuery.escapeSelector = Sizzle.escape;
    var dir = function(elem, dir, until) {
        for (var matched = [], truncate = void 0 !== until; (elem = elem[dir]) && 9 !== elem.nodeType; ) if (1 === elem.nodeType) {
            if (truncate && jQuery(elem).is(until)) break;
            matched.push(elem);
        }
        return matched;
    }, siblings = function(n, elem) {
        for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
        return matched;
    }, rneedsContext = jQuery.expr.match.needsContext, rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType;
        }));
    }, jQuery.fn.extend({
        find: function(selector) {
            var i, ret, len = this.length, self = this;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; i < len; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (ret = this.pushStack([]), i = 0; i < len; i++) jQuery.find(selector, self[i], ret);
            return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0));
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (jQuery.fn.init = function(selector, context, root) {
        var match, elem;
        if (!selector) return this;
        if (root = root || rootjQuery, "string" == typeof selector) {
            if (!(match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector)) || !match[1] && context) return !context || context.jquery ? (context || root).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this;
            }
            return elem = document.getElementById(match[2]), elem && (this[0] = elem, this.length = 1), 
            this;
        }
        return selector.nodeType ? (this[0] = selector, this.length = 1, this) : isFunction(selector) ? void 0 !== root.ready ? root.ready(selector) : selector(jQuery) : jQuery.makeArray(selector, this);
    }).prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
                for (var i = 0; i < l; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        closest: function(selectors, context) {
            var cur, i = 0, l = this.length, matched = [], targets = "string" != typeof selectors && jQuery(selectors);
            if (!rneedsContext.test(selectors)) for (;i < l; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
            }
            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
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
            return nodeName(elem, "iframe") ? elem.contentDocument : (nodeName(elem, "template") && (elem = elem.content || elem), 
            jQuery.merge([], elem.childNodes));
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), 
            this.length > 1 && (guaranteedUnique[name] || jQuery.uniqueSort(matched), rparentsprev.test(name) && matched.reverse()), 
            this.pushStack(matched);
        };
    });
    var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
            for (locked = locked || options.once, fired = firing = !0; queue.length; firingIndex = -1) for (memory = queue.shift(); ++firingIndex < list.length; ) !1 === list[firingIndex].apply(memory[0], memory[1]) && options.stopOnFalse && (firingIndex = list.length, 
            memory = !1);
            options.memory || (memory = !1), firing = !1, locked && (list = memory ? [] : "");
        }, self = {
            add: function() {
                return list && (memory && !firing && (firingIndex = list.length - 1, queue.push(memory)), 
                function add(args) {
                    jQuery.each(args, function(_, arg) {
                        isFunction(arg) ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== toType(arg) && add(arg);
                    });
                }(arguments), memory && !firing && fire()), this;
            },
            remove: function() {
                return jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    index <= firingIndex && firingIndex--;
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
            },
            empty: function() {
                return list && (list = []), this;
            },
            disable: function() {
                return locked = queue = [], list = memory = "", this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return locked = queue = [], memory || firing || (list = memory = ""), this;
            },
            locked: function() {
                return !!locked;
            },
            fireWith: function(context, args) {
                return locked || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                queue.push(args), firing || fire()), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2 ], [ "resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected" ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                catch: function(fn) {
                    return promise.then(null, fn);
                },
                pipe: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && isFunction(returned.promise) ? returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject) : newDefer[tuple[0] + "With"](this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                then: function(onFulfilled, onRejected, onProgress) {
                    function resolve(depth, deferred, handler, special) {
                        return function() {
                            var that = this, args = arguments, mightThrow = function() {
                                var returned, then;
                                if (!(depth < maxDepth)) {
                                    if ((returned = handler.apply(that, args)) === deferred.promise()) throw new TypeError("Thenable self-resolution");
                                    then = returned && ("object" == typeof returned || "function" == typeof returned) && returned.then, 
                                    isFunction(then) ? special ? then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special)) : (maxDepth++, 
                                    then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith))) : (handler !== Identity && (that = void 0, 
                                    args = [ returned ]), (special || deferred.resolveWith)(that, args));
                                }
                            }, process = special ? mightThrow : function() {
                                try {
                                    mightThrow();
                                } catch (e) {
                                    jQuery.Deferred.exceptionHook && jQuery.Deferred.exceptionHook(e, process.stackTrace), 
                                    depth + 1 >= maxDepth && (handler !== Thrower && (that = void 0, args = [ e ]), 
                                    deferred.rejectWith(that, args));
                                }
                            };
                            depth ? process() : (jQuery.Deferred.getStackHook && (process.stackTrace = jQuery.Deferred.getStackHook()), 
                            window.setTimeout(process));
                        };
                    }
                    var maxDepth = 0;
                    return jQuery.Deferred(function(newDefer) {
                        tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith)), 
                        tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ? onFulfilled : Identity)), 
                        tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ? onRejected : Thrower));
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[5];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[3 - i][2].disable, tuples[3 - i][3].disable, tuples[0][2].lock, tuples[0][3].lock), 
                list.add(tuple[3].fire), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(singleValue) {
            var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), master = jQuery.Deferred(), updateFunc = function(i) {
                return function(value) {
                    resolveContexts[i] = this, resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value, 
                    --remaining || master.resolveWith(resolveContexts, resolveValues);
                };
            };
            if (remaining <= 1 && (adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining), 
            "pending" === master.state() || isFunction(resolveValues[i] && resolveValues[i].then))) return master.then();
            for (;i--; ) adoptValue(resolveValues[i], updateFunc(i), master.reject);
            return master.promise();
        }
    });
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    jQuery.Deferred.exceptionHook = function(error, stack) {
        window.console && window.console.warn && error && rerrorNames.test(error.name) && window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
    }, jQuery.readyException = function(error) {
        window.setTimeout(function() {
            throw error;
        });
    };
    var readyList = jQuery.Deferred();
    jQuery.fn.ready = function(fn) {
        return readyList.then(fn).catch(function(error) {
            jQuery.readyException(error);
        }), this;
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(wait) {
            (!0 === wait ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, !0 !== wait && --jQuery.readyWait > 0 || readyList.resolveWith(document, [ jQuery ]));
        }
    }), jQuery.ready.then = readyList.then, "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? window.setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed), 
    window.addEventListener("load", completed));
    var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = null == key;
        if ("object" === toType(key)) {
            chainable = !0;
            for (i in key) access(elems, fn, i, key[i], !0, emptyGet, raw);
        } else if (void 0 !== value && (chainable = !0, isFunction(value) || (raw = !0), 
        bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
        })), fn)) for (;i < len; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
    }, rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g, acceptData = function(owner) {
        return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType;
    };
    Data.uid = 1, Data.prototype = {
        cache: function(owner) {
            var value = owner[this.expando];
            return value || (value = {}, acceptData(owner) && (owner.nodeType ? owner[this.expando] = value : Object.defineProperty(owner, this.expando, {
                value: value,
                configurable: !0
            }))), value;
        },
        set: function(owner, data, value) {
            var prop, cache = this.cache(owner);
            if ("string" == typeof data) cache[camelCase(data)] = value; else for (prop in data) cache[camelCase(prop)] = data[prop];
            return cache;
        },
        get: function(owner, key) {
            return void 0 === key ? this.cache(owner) : owner[this.expando] && owner[this.expando][camelCase(key)];
        },
        access: function(owner, key, value) {
            return void 0 === key || key && "string" == typeof key && void 0 === value ? this.get(owner, key) : (this.set(owner, key, value), 
            void 0 !== value ? value : key);
        },
        remove: function(owner, key) {
            var i, cache = owner[this.expando];
            if (void 0 !== cache) {
                if (void 0 !== key) {
                    Array.isArray(key) ? key = key.map(camelCase) : (key = camelCase(key), key = key in cache ? [ key ] : key.match(rnothtmlwhite) || []), 
                    i = key.length;
                    for (;i--; ) delete cache[key[i]];
                }
                (void 0 === key || jQuery.isEmptyObject(cache)) && (owner.nodeType ? owner[this.expando] = void 0 : delete owner[this.expando]);
            }
        },
        hasData: function(owner) {
            var cache = owner[this.expando];
            return void 0 !== cache && !jQuery.isEmptyObject(cache);
        }
    };
    var dataPriv = new Data(), dataUser = new Data(), rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
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
    }), jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = dataUser.get(elem), 1 === elem.nodeType && !dataPriv.get(elem, "hasDataAttrs"))) {
                    for (i = attrs.length; i--; ) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name])));
                    dataPriv.set(elem, "hasDataAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                dataUser.set(this, key);
            }) : access(this, function(value) {
                var data;
                if (elem && void 0 === value) {
                    if (void 0 !== (data = dataUser.get(elem, key))) return data;
                    if (void 0 !== (data = dataAttr(elem, key))) return data;
                } else this.each(function() {
                    dataUser.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, !0);
        },
        removeData: function(key) {
            return this.each(function() {
                dataUser.remove(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) return type = (type || "fx") + "queue", queue = dataPriv.get(elem, type), 
            data && (!queue || Array.isArray(data) ? queue = dataPriv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || [];
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    dataPriv.remove(elem, [ type + "queue", key ]);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
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
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) (tmp = dataPriv.get(elements[i], type + "queueHooks")) && tmp.empty && (count++, 
            tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHiddenWithinTree = function(elem, el) {
        return elem = el || elem, "none" === elem.style.display || "" === elem.style.display && jQuery.contains(elem.ownerDocument, elem) && "none" === jQuery.css(elem, "display");
    }, swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options) elem.style[name] = old[name];
        return ret;
    }, defaultDisplayMap = {};
    jQuery.fn.extend({
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHiddenWithinTree(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    });
    var rcheckableType = /^(?:checkbox|radio)$/i, rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, rscriptType = /^$|^module$|\/(?:java|ecma)script/i, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td;
    var rhtml = /<|&#?\w+;/;
    !function() {
        var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
        input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), 
        div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue;
    }();
    var documentElement = document.documentElement, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
            if (elemData) for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, 
            selector = handleObjIn.selector), selector && jQuery.find.matchesSelector(documentElement, selector), 
            handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), 
            (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                return void 0 !== jQuery && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
            }), types = (types || "").match(rnothtmlwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], 
            type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
            type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
            handleObj = jQuery.extend({
                type: type,
                origType: origType,
                data: data,
                handler: handler,
                guid: handler.guid,
                selector: selector,
                needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                namespace: namespaces.join(".")
            }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
            special.setup && !1 !== special.setup.call(elem, data, namespaces, eventHandle) || elem.addEventListener && elem.addEventListener(type, eventHandle)), 
            special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
            selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
            jQuery.event.global[type] = !0);
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnothtmlwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && !1 !== special.teardown.call(elem, namespaces, elemData.handle) || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && dataPriv.remove(elem, "handle events");
            }
        },
        dispatch: function(nativeEvent) {
            var i, j, ret, matched, handleObj, handlerQueue, event = jQuery.event.fix(nativeEvent), args = new Array(arguments.length), handlers = (dataPriv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            for (args[0] = event, i = 1; i < arguments.length; i++) args[i] = arguments[i];
            if (event.delegateTarget = this, !special.preDispatch || !1 !== special.preDispatch.call(this, event)) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) event.rnamespace && !event.rnamespace.test(handleObj.namespace) || (event.handleObj = handleObj, 
                event.data = handleObj.data, void 0 !== (ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args)) && !1 === (event.result = ret) && (event.preventDefault(), 
                event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && !("click" === event.type && event.button >= 1)) for (;cur !== this; cur = cur.parentNode || this) if (1 === cur.nodeType && ("click" !== event.type || !0 !== cur.disabled)) {
                for (matchedHandlers = [], matchedSelectors = {}, i = 0; i < delegateCount; i++) handleObj = handlers[i], 
                sel = handleObj.selector + " ", void 0 === matchedSelectors[sel] && (matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [ cur ]).length), 
                matchedSelectors[sel] && matchedHandlers.push(handleObj);
                matchedHandlers.length && handlerQueue.push({
                    elem: cur,
                    handlers: matchedHandlers
                });
            }
            return cur = this, delegateCount < handlers.length && handlerQueue.push({
                elem: cur,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        addProp: function(name, hook) {
            Object.defineProperty(jQuery.Event.prototype, name, {
                enumerable: !0,
                configurable: !0,
                get: isFunction(hook) ? function() {
                    if (this.originalEvent) return hook(this.originalEvent);
                } : function() {
                    if (this.originalEvent) return this.originalEvent[name];
                },
                set: function(value) {
                    Object.defineProperty(this, name, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: value
                    });
                }
            });
        },
        fix: function(originalEvent) {
            return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) return this.focus(), !1;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) return this.blur(), !1;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && nodeName(this, "input")) return this.click(), 
                    !1;
                },
                _default: function(event) {
                    return nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result);
                }
            }
        }
    }, jQuery.removeEvent = function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle);
    }, jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) return new jQuery.Event(src, props);
        src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && !1 === src.returnValue ? returnTrue : returnFalse, 
        this.target = src.target && 3 === src.target.nodeType ? src.target.parentNode : src.target, 
        this.currentTarget = src.currentTarget, this.relatedTarget = src.relatedTarget) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || Date.now(), 
        this[jQuery.expando] = !0;
    }, jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && !this.isSimulated && e.preventDefault();
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && !this.isSimulated && e.stopPropagation();
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && !this.isSimulated && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, jQuery.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(event) {
            var button = event.button;
            return null == event.which && rkeyEvent.test(event.type) ? null != event.charCode ? event.charCode : event.keyCode : !event.which && void 0 !== button && rmouseEvent.test(event.type) ? 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0 : event.which;
        }
    }, jQuery.event.addProp), jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return related && (related === target || jQuery.contains(target, related)) || (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn);
        },
        one: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return !1 !== selector && "function" != typeof selector || (fn = selector, selector = void 0), 
            !1 === fn && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    jQuery.extend({
        htmlPrefilter: function(html) {
            return html.replace(rxhtmlTag, "<$1></$2>");
        },
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(!0), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0, l = srcElements.length; i < l; i++) fixInput(srcElements[i], destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0, l = srcElements.length; i < l; i++) cloneCopyEvent(srcElements[i], destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            clone;
        },
        cleanData: function(elems) {
            for (var data, elem, type, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++) if (acceptData(elem)) {
                if (data = elem[dataPriv.expando]) {
                    if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    elem[dataPriv.expando] = void 0;
                }
                elem[dataUser.expando] && (elem[dataUser.expando] = void 0);
            }
        }
    }), jQuery.fn.extend({
        detach: function(selector) {
            return remove(this, selector, !0);
        },
        remove: function(selector) {
            return remove(this, selector);
        },
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = value);
                });
            }, null, value, arguments.length);
        },
        append: function() {
            return domManip(this, arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    manipulationTarget(this, elem).appendChild(elem);
                }
            });
        },
        prepend: function() {
            return domManip(this, arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return domManip(this, arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return domManip(this, arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
            elem.textContent = "");
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null != dataAndEvents && dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = jQuery.htmlPrefilter(value);
                    try {
                        for (;i < l; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var ignored = [];
            return domManip(this, arguments, function(elem) {
                var parent = this.parentNode;
                jQuery.inArray(this, ignored) < 0 && (jQuery.cleanData(getAll(this)), parent && parent.replaceChild(elem, this));
            }, ignored);
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; i <= last; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    });
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), getStyles = function(elem) {
        var view = elem.ownerDocument.defaultView;
        return view && view.opener || (view = window), view.getComputedStyle(elem);
    }, rboxStyle = new RegExp(cssExpand.join("|"), "i");
    !function() {
        function computeStyleTests() {
            if (div) {
                container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", 
                div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", 
                documentElement.appendChild(container).appendChild(div);
                var divStyle = window.getComputedStyle(div);
                pixelPositionVal = "1%" !== divStyle.top, reliableMarginLeftVal = 12 === roundPixelMeasures(divStyle.marginLeft), 
                div.style.right = "60%", pixelBoxStylesVal = 36 === roundPixelMeasures(divStyle.right), 
                boxSizingReliableVal = 36 === roundPixelMeasures(divStyle.width), div.style.position = "absolute", 
                scrollboxSizeVal = 36 === div.offsetWidth || "absolute", documentElement.removeChild(container), 
                div = null;
            }
        }
        function roundPixelMeasures(measure) {
            return Math.round(parseFloat(measure));
        }
        var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableMarginLeftVal, container = document.createElement("div"), div = document.createElement("div");
        div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
        support.clearCloneStyle = "content-box" === div.style.backgroundClip, jQuery.extend(support, {
            boxSizingReliable: function() {
                return computeStyleTests(), boxSizingReliableVal;
            },
            pixelBoxStyles: function() {
                return computeStyleTests(), pixelBoxStylesVal;
            },
            pixelPosition: function() {
                return computeStyleTests(), pixelPositionVal;
            },
            reliableMarginLeft: function() {
                return computeStyleTests(), reliableMarginLeftVal;
            },
            scrollboxSize: function() {
                return computeStyleTests(), scrollboxSizeVal;
            }
        }));
    }();
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rcustomProp = /^--/, cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "Moz", "ms" ], emptyStyle = document.createElement("div").style;
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
                if (isCustomProp || (name = finalPropName(origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], 
                void 0 === value) return hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name];
                type = typeof value, "string" === type && (ret = rcssNum.exec(value)) && ret[1] && (value = adjustCSS(elem, name, ret), 
                type = "number"), null != value && value === value && ("number" === type && (value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px")), 
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (isCustomProp ? style.setProperty(name, value) : style[name] = value));
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = camelCase(name);
            return rcustomProp.test(name) || (name = finalPropName(origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], 
            hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), void 0 === val && (val = curCSS(elem, name, styles)), 
            "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), !0 === extra || isFinite(num) ? num || 0 : val) : val;
        }
    }), jQuery.each([ "height", "width" ], function(i, dimension) {
        jQuery.cssHooks[dimension] = {
            get: function(elem, computed, extra) {
                if (computed) return !rdisplayswap.test(jQuery.css(elem, "display")) || elem.getClientRects().length && elem.getBoundingClientRect().width ? getWidthOrHeight(elem, dimension, extra) : swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, dimension, extra);
                });
            },
            set: function(elem, value, extra) {
                var matches, styles = getStyles(elem), isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles), subtract = extra && boxModelAdjustment(elem, dimension, extra, isBorderBox, styles);
                return isBorderBox && support.scrollboxSize() === styles.position && (subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", !1, styles) - .5)), 
                subtract && (matches = rcssNum.exec(value)) && "px" !== (matches[3] || "px") && (elem.style[dimension] = value, 
                value = jQuery.css(elem, dimension)), setPositiveNumber(elem, value, subtract);
            }
        };
    }), jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
        if (computed) return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
            marginLeft: 0
        }, function() {
            return elem.getBoundingClientRect().left;
        })) + "px";
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; i < 4; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, "margin" !== prefix && (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    }), jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (Array.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; i < len; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || jQuery.easing._default, 
            this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return 1 !== tween.elem.nodeType || null != tween.elem[tween.prop] && null == tween.elem.style[tween.prop] ? tween.elem[tween.prop] : (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0);
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : 1 !== tween.elem.nodeType || null == tween.elem.style[jQuery.cssProps[tween.prop]] && !jQuery.cssHooks[tween.prop] ? tween.elem[tween.prop] = tween.now : jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
    jQuery.Animation = jQuery.extend(Animation, {
        tweeners: {
            "*": [ function(prop, value) {
                var tween = this.createTween(prop, value);
                return adjustCSS(tween.elem, prop, rcssNum.exec(value), tween), tween;
            } ]
        },
        tweener: function(props, callback) {
            isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.match(rnothtmlwhite);
            for (var prop, index = 0, length = props.length; index < length; index++) prop = props[index], 
            Animation.tweeners[prop] = Animation.tweeners[prop] || [], Animation.tweeners[prop].unshift(callback);
        },
        prefilters: [ defaultPrefilter ],
        prefilter: function(callback, prepend) {
            prepend ? Animation.prefilters.unshift(callback) : Animation.prefilters.push(callback);
        }
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !isFunction(easing) && easing
        };
        return jQuery.fx.off ? opt.duration = 0 : "number" != typeof opt.duration && (opt.duration in jQuery.fx.speeds ? opt.duration = jQuery.fx.speeds[opt.duration] : opt.duration = jQuery.fx.speeds._default), 
        null != opt.queue && !0 !== opt.queue || (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || dataPriv.get(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || !1 === optall.queue ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), 
            clearQueue && !1 !== type && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                !dequeue && gotoEnd || jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return !1 !== type && (type = type || "fx"), this.each(function() {
                var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; index < length; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        for (fxNow = Date.now(); i < timers.length; i++) (timer = timers[i])() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = void 0;
    }, jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer), jQuery.fx.start();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        inProgress || (inProgress = !0, schedule());
    }, jQuery.fx.stop = function() {
        inProgress = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
        this.queue(type, function(next, hooks) {
            var timeout = window.setTimeout(next, time);
            hooks.stop = function() {
                window.clearTimeout(timeout);
            };
        });
    }, function() {
        var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, 
        input = document.createElement("input"), input.value = "t", input.type = "radio", 
        support.radioValue = "t" === input.value;
    }();
    var boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    }), jQuery.extend({
        attr: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (3 !== nType && 8 !== nType && 2 !== nType) return void 0 === elem.getAttribute ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0)), 
            void 0 !== value ? null === value ? void jQuery.removeAttr(elem, name) : hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), 
            value) : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
            null == ret ? void 0 : ret));
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        },
        removeAttr: function(elem, value) {
            var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) elem.removeAttribute(name);
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return !1 === value ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), 
            name;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle, lowercaseName = name.toLowerCase();
            return isXML || (handle = attrHandle[lowercaseName], attrHandle[lowercaseName] = ret, 
            ret = null != getter(elem, name, isXML) ? lowercaseName : null, attrHandle[lowercaseName] = handle), 
            ret;
        };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name];
            });
        }
    }), jQuery.extend({
        prop: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (3 !== nType && 8 !== nType && 2 !== nType) return 1 === nType && jQuery.isXMLDoc(elem) || (name = jQuery.propFix[name] || name, 
            hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.parentNode && parent.parentNode.selectedIndex, null;
        },
        set: function(elem) {
            var parent = elem.parentNode;
            parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex);
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    }), jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, getClass(this)));
            });
            if (classes = classesToArray(value), classes.length) for (;elem = this[i++]; ) if (curValue = getClass(elem), 
            cur = 1 === elem.nodeType && " " + stripAndCollapse(curValue) + " ") {
                for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                finalValue = stripAndCollapse(cur), curValue !== finalValue && elem.setAttribute("class", finalValue);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, getClass(this)));
            });
            if (!arguments.length) return this.attr("class", "");
            if (classes = classesToArray(value), classes.length) for (;elem = this[i++]; ) if (curValue = getClass(elem), 
            cur = 1 === elem.nodeType && " " + stripAndCollapse(curValue) + " ") {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") > -1; ) cur = cur.replace(" " + clazz + " ", " ");
                finalValue = stripAndCollapse(cur), curValue !== finalValue && elem.setAttribute("class", finalValue);
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value, isValidValue = "string" === type || Array.isArray(value);
            return "boolean" == typeof stateVal && isValidValue ? stateVal ? this.addClass(value) : this.removeClass(value) : isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
            }) : this.each(function() {
                var className, i, self, classNames;
                if (isValidValue) for (i = 0, self = jQuery(this), classNames = classesToArray(value); className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else void 0 !== value && "boolean" !== type || (className = getClass(this), 
                className && dataPriv.set(this, "__className__", className), this.setAttribute && this.setAttribute("class", className || !1 === value ? "" : dataPriv.get(this, "__className__") || ""));
            });
        },
        hasClass: function(selector) {
            var className, elem, i = 0;
            for (className = " " + selector + " "; elem = this[i++]; ) if (1 === elem.nodeType && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) return !0;
            return !1;
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, valueIsFunction, elem = this[0];
            {
                if (arguments.length) return valueIsFunction = isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = valueIsFunction ? value.call(this, i, jQuery(this).val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : Array.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), (hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]) && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                });
                if (elem) return (hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()]) && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : stripAndCollapse(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    var value, option, i, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type, values = one ? null : [], max = one ? index + 1 : options.length;
                    for (i = index < 0 ? max : one ? index : 0; i < max; i++) if (option = options[i], 
                    (option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) option = options[i], 
                    (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) && (optionSet = !0);
                    return optionSet || (elem.selectedIndex = -1), values;
                }
            }
        }
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (Array.isArray(value)) return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        });
    }), support.focusin = "onfocusin" in window;
    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
        e.stopPropagation();
    };
    jQuery.extend(jQuery.event, {
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = lastElement = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") > -1 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
            event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || !1 !== special.trigger.apply(elem, data))) {
                if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) lastElement = cur, 
                event.type = i > 1 ? bubbleType : special.bindType || type, handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle"), 
                handle && handle.apply(cur, data), (handle = ontype && cur[ontype]) && handle.apply && acceptData(cur) && (event.result = handle.apply(cur, data), 
                !1 === event.result && event.preventDefault());
                return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && !1 !== special._default.apply(eventPath.pop(), data) || !acceptData(elem) || ontype && isFunction(elem[type]) && !isWindow(elem) && (tmp = elem[ontype], 
                tmp && (elem[ontype] = null), jQuery.event.triggered = type, event.isPropagationStopped() && lastElement.addEventListener(type, stopPropagationCallback), 
                elem[type](), event.isPropagationStopped() && lastElement.removeEventListener(type, stopPropagationCallback), 
                jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp)), event.result;
            }
        },
        simulate: function(type, elem, event) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0
            });
            jQuery.event.trigger(e, null, elem);
        }
    }), jQuery.fn.extend({
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) return jQuery.event.trigger(type, data, elem, !0);
        }
    }), support.focusin || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), dataPriv.access(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
                var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix) - 1;
                attaches ? dataPriv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), 
                dataPriv.remove(doc, fix));
            }
        };
    });
    var location = window.location, nonce = Date.now(), rquery = /\?/;
    jQuery.parseXML = function(data) {
        var xml;
        if (!data || "string" != typeof data) return null;
        try {
            xml = new window.DOMParser().parseFromString(data, "text/xml");
        } catch (e) {
            xml = void 0;
        }
        return xml && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), 
        xml;
    };
    var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, valueOrFunction) {
            var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(null == value ? "" : value);
        };
        if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&");
    }, jQuery.fn.extend({
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
                return null == val ? null : Array.isArray(val) ? jQuery.map(val, function(val) {
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
    var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document.createElement("a");
    originAnchor.href = location.href, jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location.protocol),
            global: !0,
            processData: !0,
            async: !0,
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
                "text html": !0,
                "text json": JSON.parse,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                completed || (completed = !0, timeoutTimer && window.clearTimeout(timeoutTimer), 
                transport = void 0, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, 
                isSuccess = status >= 200 && status < 300 || 304 === status, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), 
                response = ajaxConvert(s, response, jqXHR, isSuccess), isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), (modified = jqXHR.getResponseHeader("etag")) && (jQuery.etag[cacheURL] = modified)), 
                204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                !status && statusText || (statusText = "error", status < 0 && (status = 0))), jqXHR.status = status, 
                jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = void 0), options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (completed) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return completed ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    return null == completed && (name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return null == completed && (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (completed) jqXHR.always(map[jqXHR.status]); else for (code in map) statusCode[code] = [ statusCode[code], map[code] ];
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR), s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [ "" ], 
            null == s.crossDomain) {
                urlAnchor = document.createElement("a");
                try {
                    urlAnchor.href = s.url, urlAnchor.href = urlAnchor.href, s.crossDomain = originAnchor.protocol + "//" + originAnchor.host != urlAnchor.protocol + "//" + urlAnchor.host;
                } catch (e) {
                    s.crossDomain = !0;
                }
            }
            if (s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), completed) return jqXHR;
            fireGlobals = jQuery.event && s.global, fireGlobals && 0 == jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url.replace(rhash, ""), 
            s.hasContent ? s.data && s.processData && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && (s.data = s.data.replace(r20, "+")) : (uncached = s.url.slice(cacheURL.length), 
            s.data && (s.processData || "string" == typeof s.data) && (cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data, 
            delete s.data), !1 === s.cache && (cacheURL = cacheURL.replace(rantiCache, "$1"), 
            uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached), s.url = cacheURL + uncached), 
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && !1 !== s.contentType || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (!1 === s.beforeSend.call(callbackContext, jqXHR, s) || completed)) return jqXHR.abort();
            if (strAbort = "abort", completeDeferred.add(s.complete), jqXHR.done(s.success), 
            jqXHR.fail(s.error), transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                if (jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                completed) return jqXHR;
                s.async && s.timeout > 0 && (timeoutTimer = window.setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    completed = !1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (completed) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
        }
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return isFunction(data) && (type = type || callback, callback = data, data = void 0), 
            jQuery.ajax(jQuery.extend({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject(url) && url));
        };
    }), jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        });
    }, jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            return this[0] && (isFunction(html) && (html = html.call(this[0])), wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), 
            this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                for (var elem = this; elem.firstElementChild; ) elem = elem.firstElementChild;
                return elem;
            }).append(this)), this;
        },
        wrapInner: function(html) {
            return isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            }) : this.each(function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var htmlIsFunction = isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function(selector) {
            return this.parent(selector).not("body").each(function() {
                jQuery(this).replaceWith(this.childNodes);
            }), this;
        }
    }), jQuery.expr.pseudos.hidden = function(elem) {
        return !jQuery.expr.pseudos.visible(elem);
    }, jQuery.expr.pseudos.visible = function(elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    }, jQuery.ajaxSettings.xhr = function() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    };
    var xhrSuccessStatus = {
        0: 200,
        1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
    support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, 
    jQuery.ajaxTransport(function(options) {
        var callback, errorCallback;
        if (support.cors || xhrSupported && !options.crossDomain) return {
            send: function(headers, complete) {
                var i, xhr = options.xhr();
                if (xhr.open(options.type, options.url, options.async, options.username, options.password), 
                options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), 
                options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                for (i in headers) xhr.setRequestHeader(i, headers[i]);
                callback = function(type) {
                    return function() {
                        callback && (callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null, 
                        "abort" === type ? xhr.abort() : "error" === type ? "number" != typeof xhr.status ? complete(0, "error") : complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "text" !== (xhr.responseType || "text") || "string" != typeof xhr.responseText ? {
                            binary: xhr.response
                        } : {
                            text: xhr.responseText
                        }, xhr.getAllResponseHeaders()));
                    };
                }, xhr.onload = callback(), errorCallback = xhr.onerror = xhr.ontimeout = callback("error"), 
                void 0 !== xhr.onabort ? xhr.onabort = errorCallback : xhr.onreadystatechange = function() {
                    4 === xhr.readyState && window.setTimeout(function() {
                        callback && errorCallback();
                    });
                }, callback = callback("abort");
                try {
                    xhr.send(options.hasContent && options.data || null);
                } catch (e) {
                    if (callback) throw e;
                }
            },
            abort: function() {
                callback && callback();
            }
        };
    }), jQuery.ajaxPrefilter(function(s) {
        s.crossDomain && (s.contents.script = !1);
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET");
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type);
                    }), document.head.appendChild(script[0]);
                },
                abort: function() {
                    callback && callback();
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = !1 !== s.jsonp && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        if (jsonProp || "jsonp" === s.dataTypes[0]) return callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : !1 !== s.jsonp && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            void 0 === overwritten ? jQuery(window).removeProp(callbackName) : window[callbackName] = overwritten, 
            s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), 
            responseContainer && isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = void 0;
        }), "script";
    }), support.createHTMLDocument = function() {
        var body = document.implementation.createHTMLDocument("").body;
        return body.innerHTML = "<form></form><form></form>", 2 === body.childNodes.length;
    }(), jQuery.parseHTML = function(data, context, keepScripts) {
        if ("string" != typeof data) return [];
        "boolean" == typeof context && (keepScripts = context, context = !1);
        var base, parsed, scripts;
        return context || (support.createHTMLDocument ? (context = document.implementation.createHTMLDocument(""), 
        base = context.createElement("base"), base.href = document.location.href, context.head.appendChild(base)) : context = document), 
        parsed = rsingleTag.exec(data), scripts = !keepScripts && [], parsed ? [ context.createElement(parsed[1]) ] : (parsed = buildFragment([ data ], context, scripts), 
        scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
    }, jQuery.fn.load = function(url, params, callback) {
        var selector, type, response, self = this, off = url.indexOf(" ");
        return off > -1 && (selector = stripAndCollapse(url.slice(off)), url = url.slice(0, off)), 
        isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), 
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type || "GET",
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).always(callback && function(jqXHR, status) {
            self.each(function() {
                callback.apply(this, response || [ jqXHR.responseText, status, jqXHR ]);
            });
        }), this;
    }, jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery.expr.pseudos.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    }, jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), 
            curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, 
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            isFunction(options) && (options = options.call(elem, i, jQuery.extend({}, curOffset))), 
            null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
            var rect, win, elem = this[0];
            if (elem) return elem.getClientRects().length ? (rect = elem.getBoundingClientRect(), 
            win = elem.ownerDocument.defaultView, {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            }) : {
                top: 0,
                left: 0
            };
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, doc, elem = this[0], parentOffset = {
                    top: 0,
                    left: 0
                };
                if ("fixed" === jQuery.css(elem, "position")) offset = elem.getBoundingClientRect(); else {
                    for (offset = this.offset(), doc = elem.ownerDocument, offsetParent = elem.offsetParent || doc.documentElement; offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.parentNode;
                    offsetParent && offsetParent !== elem && 1 === offsetParent.nodeType && (parentOffset = jQuery(offsetParent).offset(), 
                    parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", !0));
                }
                return {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent; offsetParent && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || documentElement;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win;
                if (isWindow(elem) ? win = elem : 9 === elem.nodeType && (win = elem.defaultView), 
                void 0 === val) return win ? win[prop] : elem[method];
                win ? win.scrollTo(top ? win.pageXOffset : val, top ? val : win.pageYOffset) : elem[method] = val;
            }, method, val, arguments.length);
        };
    }), jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed) return computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
        });
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (!0 === margin || !0 === value ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return isWindow(elem) ? 0 === funcName.indexOf("outer") ? elem["inner" + name] : elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : void 0, chainable);
            };
        });
    }), jQuery.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    }), jQuery.fn.extend({
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
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    }), jQuery.proxy = function(fn, context) {
        var tmp, args, proxy;
        if ("string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), isFunction(fn)) return args = slice.call(arguments, 2), 
        proxy = function() {
            return fn.apply(context || this, args.concat(slice.call(arguments)));
        }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy;
    }, jQuery.holdReady = function(hold) {
        hold ? jQuery.readyWait++ : jQuery.ready(!0);
    }, jQuery.isArray = Array.isArray, jQuery.parseJSON = JSON.parse, jQuery.nodeName = nodeName, 
    jQuery.isFunction = isFunction, jQuery.isWindow = isWindow, jQuery.camelCase = camelCase, 
    jQuery.type = toType, jQuery.now = Date.now, jQuery.isNumeric = function(obj) {
        var type = jQuery.type(obj);
        return ("number" === type || "string" === type) && !isNaN(obj - parseFloat(obj));
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    });
    var _jQuery = window.jQuery, _$ = window.$;
    jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
        jQuery;
    }, noGlobal || (window.jQuery = window.$ = jQuery), jQuery.fn.waitforChild = function(onFound, querySelector, once) {
        "object" == typeof arguments[0] && (once = arguments[0].once || !1, querySelector = arguments[0].querySelector || null, 
        onFound = arguments[0].onFound), onFound || (onFound = function() {});
        var jQuerythis = this;
        if (!querySelector && jQuerythis.children().length) once ? onFound(jQuerythis.children().first()) : jQuerythis.children().each(function(key, element) {
            onFound(jQuery(element));
        }); else if (0 !== jQuerythis.find(querySelector).length) once ? onFound(jQuerythis.find(querySelector).first()) : jQuerythis.find(querySelector).each(function(key, element) {
            onFound(jQuery(element));
        }); else if (0 === jQuerythis.length) console.warn("Can't attach an observer to a null node", jQuerythis); else {
            var observer = new MutationObserver(function(mutations) {
                var _this = this;
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes) if (querySelector) for (var i = 0; i < mutation.addedNodes.length; ++i) {
                        var addedNode = mutation.addedNodes[i];
                        if (jQuery(addedNode).is(querySelector) && (onFound(jQuery(addedNode)), once)) {
                            _this.disconnect();
                            break;
                        }
                    } else onFound(jQuery(mutation.addedNodes[0])), once && _this.disconnect();
                });
            });
            observer.observe(jQuerythis[0], {
                childList: !0,
                subtree: !0,
                attributes: !1,
                characterData: !1
            });
        }
        return jQuerythis;
    }, function($) {
        var originalXhr = $.ajaxSettings.xhr;
        $.ajaxSetup({
            progress: function(e) {},
            xhr: function() {
                var req = originalXhr(), _this = this;
                return req && "function" == typeof req.addEventListener && req.addEventListener("progress", function(evt) {
                    _this.progress && _this.progress(evt);
                }, !1), req;
            }
        });
    }(jQuery);
    var pluses = /\+/g, config = jQuery.cookie = function(key, value, options) {
        if (void 0 !== value && !jQuery.isFunction(value)) {
            if (options = jQuery.extend({}, config.defaults, options), "number" == typeof options.expires) {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + 864e5 * days);
            }
            return document.cookie = [ encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : "" ].join("");
        }
        for (var result = key ? void 0 : {}, cookies = document.cookie ? document.cookie.split("; ") : [], i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split("="), name = decode(parts.shift()), cookie = parts.join("=");
            if (key && key === name) {
                result = read(cookie, value);
                break;
            }
            key || void 0 === (cookie = read(cookie)) || (result[name] = cookie);
        }
        return result;
    };
    config.defaults = {}, jQuery.removeCookie = function(key, options) {
        return void 0 !== jQuery.cookie(key) && (jQuery.cookie(key, "", jQuery.extend({}, options, {
            expires: -1
        })), !jQuery.cookie(key));
    }, jQuery.fn.serializeJSON = function(options) {
        var f, jQueryform, opts, formAsArray, serializedObject, name, value, _obj, nameWithNoType, type, keys;
        return f = jQuery.serializeJSON, jQueryform = this, opts = f.setupOpts(options), 
        formAsArray = jQueryform.serializeArray(), f.readCheckboxUncheckedValues(formAsArray, opts, jQueryform), 
        serializedObject = {}, jQuery.each(formAsArray, function(i, obj) {
            name = obj.name, value = obj.value, _obj = f.extractTypeAndNameWithNoType(name), 
            nameWithNoType = _obj.nameWithNoType, type = _obj.type, type || (type = f.tryToFindTypeFromDataAttr(name, jQueryform)), 
            f.validateType(name, type, opts), "skip" !== type && (keys = f.splitInputNameIntoKeysArray(nameWithNoType), 
            value = f.parseValue(value, name, type, opts), f.deepSet(serializedObject, keys, value, opts));
        }), serializedObject;
    }, jQuery.serializeJSON = {
        defaultOptions: {
            checkboxUncheckedValue: void 0,
            parseNumbers: !1,
            parseBooleans: !1,
            parseNulls: !1,
            parseAll: !1,
            parseWithFunction: null,
            customTypes: {},
            defaultTypes: {
                string: function(str) {
                    return String(str);
                },
                number: function(str) {
                    return Number(str);
                },
                boolean: function(str) {
                    return -1 === [ "false", "null", "undefined", "", "0" ].indexOf(str);
                },
                null: function(str) {
                    return -1 === [ "false", "null", "undefined", "", "0" ].indexOf(str) ? str : null;
                },
                array: function(str) {
                    return JSON.parse(str);
                },
                object: function(str) {
                    return JSON.parse(str);
                },
                auto: function(str) {
                    return jQuery.serializeJSON.parseValue(str, null, null, {
                        parseNumbers: !0,
                        parseBooleans: !0,
                        parseNulls: !0
                    });
                },
                skip: null
            },
            useIntKeysAsArrayIndex: !1
        },
        setupOpts: function(options) {
            var opt, validOpts, defaultOptions, optWithDefault, parseAll, f;
            f = jQuery.serializeJSON, null == options && (options = {}), defaultOptions = f.defaultOptions || {}, 
            validOpts = [ "checkboxUncheckedValue", "parseNumbers", "parseBooleans", "parseNulls", "parseAll", "parseWithFunction", "customTypes", "defaultTypes", "useIntKeysAsArrayIndex" ];
            for (opt in options) if (-1 === validOpts.indexOf(opt)) throw new Error("serializeJSON ERROR: invalid option '" + opt + "'. Please use one of " + validOpts.join(", "));
            return optWithDefault = function(key) {
                return !1 !== options[key] && "" !== options[key] && (options[key] || defaultOptions[key]);
            }, parseAll = optWithDefault("parseAll"), {
                checkboxUncheckedValue: optWithDefault("checkboxUncheckedValue"),
                parseNumbers: parseAll || optWithDefault("parseNumbers"),
                parseBooleans: parseAll || optWithDefault("parseBooleans"),
                parseNulls: parseAll || optWithDefault("parseNulls"),
                parseWithFunction: optWithDefault("parseWithFunction"),
                typeFunctions: jQuery.extend({}, optWithDefault("defaultTypes"), optWithDefault("customTypes")),
                useIntKeysAsArrayIndex: optWithDefault("useIntKeysAsArrayIndex")
            };
        },
        parseValue: function(valStr, inputName, type, opts) {
            var f, parsedVal;
            return f = jQuery.serializeJSON, parsedVal = valStr, opts.typeFunctions && type && opts.typeFunctions[type] ? parsedVal = opts.typeFunctions[type](valStr) : opts.parseNumbers && f.isNumeric(valStr) ? parsedVal = Number(valStr) : !opts.parseBooleans || "true" !== valStr && "false" !== valStr ? opts.parseNulls && "null" == valStr && (parsedVal = null) : parsedVal = "true" === valStr, 
            opts.parseWithFunction && !type && (parsedVal = opts.parseWithFunction(parsedVal, inputName)), 
            parsedVal;
        },
        isObject: function(obj) {
            return obj === Object(obj);
        },
        isUndefined: function(obj) {
            return void 0 === obj;
        },
        isValidArrayIndex: function(val) {
            return /^[0-9]+jQuery/.test(String(val));
        },
        isNumeric: function(obj) {
            return obj - parseFloat(obj) >= 0;
        },
        optionKeys: function(obj) {
            if (Object.keys) return Object.keys(obj);
            var key, keys = [];
            for (key in obj) keys.push(key);
            return keys;
        },
        readCheckboxUncheckedValues: function(formAsArray, opts, jQueryform) {
            var selector, jQueryuncheckedCheckboxes, jQueryel, dataUncheckedValue, f;
            null == opts && (opts = {}), f = jQuery.serializeJSON, selector = "input[type=checkbox][name]:not(:checked):not([disabled])", 
            jQueryuncheckedCheckboxes = jQueryform.find(selector).add(jQueryform.filter(selector)), 
            jQueryuncheckedCheckboxes.each(function(i, el) {
                jQueryel = jQuery(el), dataUncheckedValue = jQueryel.attr("data-unchecked-value"), 
                dataUncheckedValue ? formAsArray.push({
                    name: el.name,
                    value: dataUncheckedValue
                }) : f.isUndefined(opts.checkboxUncheckedValue) || formAsArray.push({
                    name: el.name,
                    value: opts.checkboxUncheckedValue
                });
            });
        },
        extractTypeAndNameWithNoType: function(name) {
            var match;
            return (match = name.match(/(.*):([^:]+)jQuery/)) ? {
                nameWithNoType: match[1],
                type: match[2]
            } : {
                nameWithNoType: name,
                type: null
            };
        },
        tryToFindTypeFromDataAttr: function(name, jQueryform) {
            var escapedName, selector, jQueryinput;
            return escapedName = name.replace(/(:|\.|\[|\]|\s)/g, "\\jQuery1"), selector = '[name="' + escapedName + '"]', 
            jQueryinput = jQueryform.find(selector).add(jQueryform.filter(selector)), jQueryinput.attr("data-value-type") || null;
        },
        validateType: function(name, type, opts) {
            var validTypes, f;
            if (f = jQuery.serializeJSON, validTypes = f.optionKeys(opts ? opts.typeFunctions : f.defaultOptions.defaultTypes), 
            type && -1 === validTypes.indexOf(type)) throw new Error("serializeJSON ERROR: Invalid type " + type + " found in input name '" + name + "', please use one of " + validTypes.join(", "));
            return !0;
        },
        splitInputNameIntoKeysArray: function(nameWithNoType) {
            var keys;
            return jQuery.serializeJSON, keys = nameWithNoType.split("["), keys = jQuery.map(keys, function(key) {
                return key.replace(/\]/g, "");
            }), "" === keys[0] && keys.shift(), keys;
        },
        deepSet: function(o, keys, value, opts) {
            var key, nextKey, tail, lastIdx, lastVal, f;
            if (null == opts && (opts = {}), f = jQuery.serializeJSON, f.isUndefined(o)) throw new Error("ArgumentError: param 'o' expected to be an object or array, found undefined");
            if (!keys || 0 === keys.length) throw new Error("ArgumentError: param 'keys' expected to be an array with least one element");
            key = keys[0], 1 === keys.length ? "" === key ? o.push(value) : o[key] = value : (nextKey = keys[1], 
            "" === key && (lastIdx = o.length - 1, lastVal = o[lastIdx], key = f.isObject(lastVal) && (f.isUndefined(lastVal[nextKey]) || keys.length > 2) ? lastIdx : lastIdx + 1), 
            "" === nextKey ? !f.isUndefined(o[key]) && jQuery.isArray(o[key]) || (o[key] = []) : opts.useIntKeysAsArrayIndex && f.isValidArrayIndex(nextKey) ? !f.isUndefined(o[key]) && jQuery.isArray(o[key]) || (o[key] = []) : !f.isUndefined(o[key]) && f.isObject(o[key]) || (o[key] = {}), 
            tail = keys.slice(1), f.deepSet(o[key], tail, value, opts));
        }
    };
    var $ = jQuery, widgetUuid = 0, widgetSlice = Array.prototype.slice;
    Widget._childConstructors = [], Widget.extend = function(target) {
        for (var key, value, input = widgetSlice.call(arguments, 1), inputIndex = 0, inputLength = input.length; inputIndex < inputLength; inputIndex++) for (key in input[inputIndex]) value = input[inputIndex][key], 
        input[inputIndex].hasOwnProperty(key) && void 0 !== value && ($.isPlainObject(value) ? target[key] = $.isPlainObject(target[key]) ? Widget.extend({}, target[key], value) : Widget.extend({}, value) : target[key] = value);
        return target;
    }, Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            classes: {},
            disabled: !1,
            create: null
        },
        _createWidget: function(options, element) {
            element = $(element || this.defaultElement || this)[0], this.element = $(element), 
            this.uuid = widgetUuid++, this.eventNamespace = "." + this.widgetName + this.uuid, 
            this.bindings = $(), this.hoverable = $(), this.focusable = $(), this.classesElementLookup = {}, 
            element !== this && ($.data(element, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(event) {
                    event.target === element && this.destroy();
                }
            }), this.document = $(element.style ? element.ownerDocument : element.document || element), 
            this.window = $(this.document[0].defaultView || this.document[0].parentWindow)), 
            this.options = Widget.extend({}, this.options, this._getCreateOptions(), options), 
            this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), 
            this._trigger("create", null, this._getCreateEventData()), this._init();
        },
        _getCreateOptions: function() {
            return {};
        },
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function() {
            var that = this;
            this._destroy(), $.each(this.classesElementLookup, function(key, value) {
                that._removeClass(value, key);
            }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), 
            this.bindings.off(this.eventNamespace);
        },
        _destroy: $.noop,
        widget: function() {
            return this.element;
        },
        option: function(key, value) {
            var parts, curOption, i, options = key;
            if (0 === arguments.length) return Widget.extend({}, this.options);
            if ("string" == typeof key) if (options = {}, parts = key.split("."), key = parts.shift(), 
            parts.length) {
                for (curOption = options[key] = Widget.extend({}, this.options[key]), i = 0; i < parts.length - 1; i++) curOption[parts[i]] = curOption[parts[i]] || {}, 
                curOption = curOption[parts[i]];
                if (key = parts.pop(), 1 === arguments.length) return void 0 === curOption[key] ? null : curOption[key];
                curOption[key] = value;
            } else {
                if (1 === arguments.length) return void 0 === this.options[key] ? null : this.options[key];
                options[key] = value;
            }
            return this._setOptions(options), this;
        },
        _setOptions: function(options) {
            var key;
            for (key in options) this._setOption(key, options[key]);
            return this;
        },
        _setOption: function(key, value) {
            return "classes" === key && this._setOptionClasses(value), this.options[key] = value, 
            "disabled" === key && this._setOptionDisabled(value), this;
        },
        _setOptionClasses: function(value) {
            var classKey, elements, currentElements;
            for (classKey in value) currentElements = this.classesElementLookup[classKey], value[classKey] !== this.options.classes[classKey] && currentElements && currentElements.length && (elements = $(currentElements.get()), 
            this._removeClass(currentElements, classKey), elements.addClass(this._classes({
                element: elements,
                keys: classKey,
                classes: value,
                add: !0
            })));
        },
        _setOptionDisabled: function(value) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!value), 
            value && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            });
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            });
        },
        _classes: function(options) {
            function processClassString(classes, checkOption) {
                var current, i;
                for (i = 0; i < classes.length; i++) current = that.classesElementLookup[classes[i]] || $(), 
                current = $(options.add ? $.unique(current.get().concat(options.element.get())) : current.not(options.element).get()), 
                that.classesElementLookup[classes[i]] = current, full.push(classes[i]), checkOption && options.classes[classes[i]] && full.push(options.classes[classes[i]]);
            }
            var full = [], that = this;
            return options = $.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, options), options.keys && processClassString(options.keys.match(/\S+/g) || [], !0), 
            options.extra && processClassString(options.extra.match(/\S+/g) || []), full.join(" ");
        },
        _removeClass: function(element, keys, extra) {
            return this._toggleClass(element, keys, extra, !1);
        },
        _addClass: function(element, keys, extra) {
            return this._toggleClass(element, keys, extra, !0);
        },
        _toggleClass: function(element, keys, extra, add) {
            add = "boolean" == typeof add ? add : extra;
            var shift = "string" == typeof element || null === element, options = {
                extra: shift ? keys : extra,
                keys: shift ? element : keys,
                element: shift ? this.element : element,
                add: add
            };
            return options.element.toggleClass(this._classes(options), add), this;
        },
        _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement, instance = this;
            "boolean" != typeof suppressDisabledCheck && (handlers = element, element = suppressDisabledCheck, 
            suppressDisabledCheck = !1), handlers ? (element = delegateElement = $(element), 
            this.bindings = this.bindings.add(element)) : (handlers = element, element = this.element, 
            delegateElement = this.widget()), $.each(handlers, function(event, handler) {
                function handlerProxy() {
                    if (suppressDisabledCheck || !0 !== instance.options.disabled && !$(this).hasClass("ui-state-disabled")) return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments);
                }
                "string" != typeof handler && (handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++);
                var match = event.match(/^([\w:-]*)\s*(.*)$/), eventName = match[1] + instance.eventNamespace, selector = match[2];
                selector ? delegateElement.on(eventName, selector, handlerProxy) : element.on(eventName, handlerProxy);
            });
        },
        _off: function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, 
            element.off(eventName).off(eventName), this.bindings = $(this.bindings.not(element).get()), 
            this.focusable = $(this.focusable.not(element).get()), this.hoverable = $(this.hoverable.not(element).get());
        },
        _delay: function(handler, delay) {
            function handlerProxy() {
                return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments);
            }
            var instance = this;
            return setTimeout(handlerProxy, delay || 0);
        },
        _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element), this._on(element, {
                mouseenter: function(event) {
                    this._addClass($(event.currentTarget), null, "ui-state-hover");
                },
                mouseleave: function(event) {
                    this._removeClass($(event.currentTarget), null, "ui-state-hover");
                }
            });
        },
        _focusable: function(element) {
            this.focusable = this.focusable.add(element), this._on(element, {
                focusin: function(event) {
                    this._addClass($(event.currentTarget), null, "ui-state-focus");
                },
                focusout: function(event) {
                    this._removeClass($(event.currentTarget), null, "ui-state-focus");
                }
            });
        },
        _trigger: function(type, event, data) {
            var prop, orig, callback = this.options[type];
            if (data = data || {}, event = $.Event(event), event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase(), 
            event.target = this.element[0], orig = event.originalEvent) for (prop in orig) prop in event || (event[prop] = orig[prop]);
            return this.element.trigger(event, data), !($.isFunction(callback) && !1 === callback.apply(this.element[0], [ event ].concat(data)) || event.isDefaultPrevented());
        }
    }, Widget.prototype._show = function(element, options, callback) {
        "string" == typeof options && (options = {
            effect: options
        });
        var hasOptions, effectName = options ? !0 === options || "number" == typeof options ? "fadeIn" : options.effect || "fadeIn" : method;
        options = options || {}, "number" == typeof options && (options = {
            duration: options
        }), hasOptions = !$.isEmptyObject(options), options.complete = callback, options.delay && element.delay(options.delay), 
        hasOptions && $.effects && $.effects.effect[effectName] ? element[method](options) : effectName !== method && element[effectName] ? element[effectName](options.duration, options.easing, callback) : element.queue(function(next) {
            $(this)[method](), callback && callback.call(element[0]), next();
        });
    }, Widget.prototype._hide = function(element, options, callback) {
        "string" == typeof options && (options = {
            effect: options
        });
        var hasOptions, effectName = options ? !0 === options || "number" == typeof options ? "fadeOut" : options.effect || "fadeOut" : method;
        options = options || {}, "number" == typeof options && (options = {
            duration: options
        }), hasOptions = !$.isEmptyObject(options), options.complete = callback, options.delay && element.delay(options.delay), 
        hasOptions && $.effects && $.effects.effect[effectName] ? element[method](options) : effectName !== method && element[effectName] ? element[effectName](options.duration, options.easing, callback) : element.queue(function(next) {
            $(this)[method](), callback && callback.call(element[0]), next();
        });
    }, $.Widget = Widget, $.widget = function(name, base, prototype) {
        var existingConstructor, constructor, basePrototype, proxiedPrototype = {}, namespace = name.split(".")[0];
        name = name.split(".")[1];
        var fullName = namespace + "-" + name;
        return prototype || (prototype = base, base = $.Widget), $.isArray(prototype) && (prototype = $.extend.apply(null, [ {} ].concat(prototype))), 
        $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !!$.data(elem, fullName);
        }, $[namespace] = $[namespace] || {}, existingConstructor = $[namespace][name], 
        constructor = $[namespace][name] = function(options, element) {
            if (!this._createWidget) return new constructor(options, element);
            arguments.length && this._createWidget(options, element);
        }, $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({}, prototype),
            _childConstructors: []
        }), basePrototype = new base(), basePrototype.options = $.widget.extend({}, basePrototype.options), 
        $.each(prototype, function(prop, value) {
            if (!$.isFunction(value)) return void (proxiedPrototype[prop] = value);
            proxiedPrototype[prop] = function() {
                function _super() {
                    return base.prototype[prop].apply(this, arguments);
                }
                function _superApply(args) {
                    return base.prototype[prop].apply(this, args);
                }
                return function() {
                    var returnValue, __super = this._super, __superApply = this._superApply;
                    return this._super = _super, this._superApply = _superApply, returnValue = value.apply(this, arguments), 
                    this._super = __super, this._superApply = __superApply, returnValue;
                };
            }();
        }), constructor.prototype = $.widget.extend(basePrototype, {
            widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
        }, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        }), existingConstructor ? ($.each(existingConstructor._childConstructors, function(i, child) {
            var childPrototype = child.prototype;
            $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
        }), delete existingConstructor._childConstructors) : base._childConstructors.push(constructor), 
        $.widget.bridge(name, constructor), constructor;
    }, $.widget.extend = function(target) {
        for (var key, value, input = widgetSlice.call(arguments, 1), inputIndex = 0, inputLength = input.length; inputIndex < inputLength; inputIndex++) for (key in input[inputIndex]) value = input[inputIndex][key], 
        input[inputIndex].hasOwnProperty(key) && void 0 !== value && ($.isPlainObject(value) ? target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value) : target[key] = value);
        return target;
    }, $.widget.bridge = function(name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function(options) {
            var isMethodCall = "string" == typeof options, args = widgetSlice.call(arguments, 1), returnValue = this;
            return isMethodCall ? this.each(function() {
                var methodValue, instance = $.data(this, fullName);
                return "instance" === options ? (returnValue = instance, !1) : instance ? $.isFunction(instance[options]) && "_" !== options.charAt(0) ? (methodValue = instance[options].apply(instance, args), 
                methodValue !== instance && void 0 !== methodValue ? (returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue, 
                !1) : void 0) : $.error("no such method '" + options + "' for " + name + " widget instance") : $.error("cannot call methods on " + name + " prior to initialization; attempted to call method '" + options + "'");
            }) : (args.length && (options = $.widget.extend.apply(null, [ options ].concat(args))), 
            this.each(function() {
                var instance = $.data(this, fullName);
                instance ? (instance.option(options || {}), instance._init && instance._init()) : $.data(this, fullName, new object(options, this));
            })), returnValue;
        };
    };
    var widget = $.widget, ui = {
        version: "1.12.0",
        safeActiveElement: function(document) {
            var activeElement;
            try {
                activeElement = document.activeElement;
            } catch (error) {
                activeElement = document.body;
            }
            return activeElement || (activeElement = document.body), activeElement.nodeName || (activeElement = document.body), 
            activeElement;
        },
        safeBlur: function(element) {
            element && "body" !== element.nodeName.toLowerCase() && $(element).trigger("blur");
        }
    };
    $.ui = ui;
    var intersect = $.ui.intersect = function() {
        function isOverAxis(x, reference, size) {
            return x >= reference && x < reference + size;
        }
        return function(draggable, droppable, toleranceMode, event) {
            if (!droppable.offset) return !1;
            var x1 = (draggable.positionAbs || draggable.position.absolute).left + draggable.margins.left, y1 = (draggable.positionAbs || draggable.position.absolute).top + draggable.margins.top, x2 = x1 + draggable.helperProportions.width, y2 = y1 + draggable.helperProportions.height, l = droppable.offset.left, t = droppable.offset.top, r = l + droppable.proportions().width, b = t + droppable.proportions().height;
            switch (toleranceMode) {
              case "fit":
                return l <= x1 && x2 <= r && t <= y1 && y2 <= b;

              case "intersect":
                return l < x1 + draggable.helperProportions.width / 2 && x2 - draggable.helperProportions.width / 2 < r && t < y1 + draggable.helperProportions.height / 2 && y2 - draggable.helperProportions.height / 2 < b;

              case "pointer":
                return isOverAxis(event.pageY, t, droppable.proportions().height) && isOverAxis(event.pageX, l, droppable.proportions().width);

              case "touch":
                return (y1 >= t && y1 <= b || y2 >= t && y2 <= b || y1 < t && y2 > b) && (x1 >= l && x1 <= r || x2 >= l && x2 <= r || x1 < l && x2 > r);

              default:
                return !1;
            }
        };
    }();
    !function(global, jQuery) {
        function getOffsets(offsets, width, height) {
            return [ parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1) ];
        }
        function parseCss(element, property) {
            return parseInt(jQuery.css(element, property), 10) || 0;
        }
        function getDimensions(elem) {
            var raw = elem[0];
            return 9 === raw.nodeType ? {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : jQuery.isglobal(raw) ? {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: elem.scrollTop(),
                    left: elem.scrollLeft()
                }
            } : raw.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: raw.pageY,
                    left: raw.pageX
                }
            } : {
                width: elem.outerWidth(),
                height: elem.outerHeight(),
                offset: elem.offset()
            };
        }
        var cachedScrollbarWidth, _supportsOffsetFractions, max = Math.max, abs = Math.abs, round = Math.round, rhorizontal = /left|center|right/, rvertical = /top|center|bottom/, roffset = /[\+\-]\d+(\.[\d]+)?%?/, rposition = /^\w+/, rpercent = /%jQuery/, _position = jQuery.fn.position;
        _supportsOffsetFractions = function() {
            var element = jQuery("<div>").css("position", "absolute").appendTo("body").offset({
                top: 1.5,
                left: 1.5
            }), support = 1.5 === element.offset().top;
            return element.remove(), _supportsOffsetFractions = function() {
                return support;
            }, support;
        }, jQuery.position = {
            scrollbarWidth: function() {
                if (void 0 !== cachedScrollbarWidth) return cachedScrollbarWidth;
                var w1, w2, div = jQuery("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), innerDiv = div.children()[0];
                return jQuery("body").append(div), w1 = innerDiv.offsetWidth, div.css("overflow", "scroll"), 
                w2 = innerDiv.offsetWidth, w1 === w2 && (w2 = div[0].clientWidth), div.remove(), 
                cachedScrollbarWidth = w1 - w2;
            },
            getScrollInfo: function(within) {
                var overflowX = within.isglobal || within.isDocument ? "" : within.element.css("overflow-x"), overflowY = within.isglobal || within.isDocument ? "" : within.element.css("overflow-y"), hasOverflowX = "scroll" === overflowX || "auto" === overflowX && within.width < within.element[0].scrollWidth;
                return {
                    width: "scroll" === overflowY || "auto" === overflowY && within.height < within.element[0].scrollHeight ? jQuery.position.scrollbarWidth() : 0,
                    height: hasOverflowX ? jQuery.position.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function(element) {
                var withinElement = jQuery(element || global), isglobal = jQuery.isglobal(withinElement[0]), isDocument = !!withinElement[0] && 9 === withinElement[0].nodeType;
                return {
                    element: withinElement,
                    isglobal: isglobal,
                    isDocument: isDocument,
                    offset: isglobal || isDocument ? {
                        left: 0,
                        top: 0
                    } : jQuery(element).offset(),
                    scrollLeft: withinElement.scrollLeft(),
                    scrollTop: withinElement.scrollTop(),
                    width: withinElement.outerWidth(),
                    height: withinElement.outerHeight()
                };
            }
        }, jQuery.fn.position = function(options) {
            if (!options || !options.of) return _position.apply(this, arguments);
            options = jQuery.extend({}, options);
            var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions, target = jQuery(options.of), within = jQuery.position.getWithinInfo(options.within), scrollInfo = jQuery.position.getScrollInfo(within), collision = (options.collision || "flip").split(" "), offsets = {};
            return dimensions = getDimensions(target), target[0].preventDefault && (options.at = "left top"), 
            targetWidth = dimensions.width, targetHeight = dimensions.height, targetOffset = dimensions.offset, 
            basePosition = jQuery.extend({}, targetOffset), jQuery.each([ "my", "at" ], function() {
                var horizontalOffset, verticalOffset, pos = (options[this] || "").split(" ");
                1 === pos.length && (pos = rhorizontal.test(pos[0]) ? pos.concat([ "center" ]) : rvertical.test(pos[0]) ? [ "center" ].concat(pos) : [ "center", "center" ]), 
                pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center", pos[1] = rvertical.test(pos[1]) ? pos[1] : "center", 
                horizontalOffset = roffset.exec(pos[0]), verticalOffset = roffset.exec(pos[1]), 
                offsets[this] = [ horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0 ], 
                options[this] = [ rposition.exec(pos[0])[0], rposition.exec(pos[1])[0] ];
            }), 1 === collision.length && (collision[1] = collision[0]), "right" === options.at[0] ? basePosition.left += targetWidth : "center" === options.at[0] && (basePosition.left += targetWidth / 2), 
            "bottom" === options.at[1] ? basePosition.top += targetHeight : "center" === options.at[1] && (basePosition.top += targetHeight / 2), 
            atOffset = getOffsets(offsets.at, targetWidth, targetHeight), basePosition.left += atOffset[0], 
            basePosition.top += atOffset[1], this.each(function() {
                var collisionPosition, using, elem = jQuery(this), elemWidth = elem.outerWidth(), elemHeight = elem.outerHeight(), marginLeft = parseCss(this, "marginLeft"), marginTop = parseCss(this, "marginTop"), collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width, collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height, position = jQuery.extend({}, basePosition), myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
                "right" === options.my[0] ? position.left -= elemWidth : "center" === options.my[0] && (position.left -= elemWidth / 2), 
                "bottom" === options.my[1] ? position.top -= elemHeight : "center" === options.my[1] && (position.top -= elemHeight / 2), 
                position.left += myOffset[0], position.top += myOffset[1], _supportsOffsetFractions() || (position.left = round(position.left), 
                position.top = round(position.top)), collisionPosition = {
                    marginLeft: marginLeft,
                    marginTop: marginTop
                }, jQuery.each([ "left", "top" ], function(i, dir) {
                    jQuery.ui.position[collision[i]] && jQuery.ui.position[collision[i]][dir](position, {
                        targetWidth: targetWidth,
                        targetHeight: targetHeight,
                        elemWidth: elemWidth,
                        elemHeight: elemHeight,
                        collisionPosition: collisionPosition,
                        collisionWidth: collisionWidth,
                        collisionHeight: collisionHeight,
                        offset: [ atOffset[0] + myOffset[0], atOffset[1] + myOffset[1] ],
                        my: options.my,
                        at: options.at,
                        within: within,
                        elem: elem
                    });
                }), options.using && (using = function(props) {
                    var left = targetOffset.left - position.left, right = left + targetWidth - elemWidth, top = targetOffset.top - position.top, bottom = top + targetHeight - elemHeight, feedback = {
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
                    targetWidth < elemWidth && abs(left + right) < targetWidth && (feedback.horizontal = "center"), 
                    targetHeight < elemHeight && abs(top + bottom) < targetHeight && (feedback.vertical = "middle"), 
                    max(abs(left), abs(right)) > max(abs(top), abs(bottom)) ? feedback.important = "horizontal" : feedback.important = "vertical", 
                    options.using.call(this, props, feedback);
                }), elem.offset(jQuery.extend(position, {
                    using: using
                }));
            });
        }, jQuery.ui.position = {
            fit: {
                left: function(position, data) {
                    var newOverRight, within = data.within, withinOffset = within.isglobal ? within.scrollLeft : within.offset.left, outerWidth = within.width, collisionPosLeft = position.left - data.collisionPosition.marginLeft, overLeft = withinOffset - collisionPosLeft, overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
                    data.collisionWidth > outerWidth ? overLeft > 0 && overRight <= 0 ? (newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset, 
                    position.left += overLeft - newOverRight) : position.left = overRight > 0 && overLeft <= 0 ? withinOffset : overLeft > overRight ? withinOffset + outerWidth - data.collisionWidth : withinOffset : overLeft > 0 ? position.left += overLeft : overRight > 0 ? position.left -= overRight : position.left = max(position.left - collisionPosLeft, position.left);
                },
                top: function(position, data) {
                    var newOverBottom, within = data.within, withinOffset = within.isglobal ? within.scrollTop : within.offset.top, outerHeight = data.within.height, collisionPosTop = position.top - data.collisionPosition.marginTop, overTop = withinOffset - collisionPosTop, overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
                    data.collisionHeight > outerHeight ? overTop > 0 && overBottom <= 0 ? (newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset, 
                    position.top += overTop - newOverBottom) : position.top = overBottom > 0 && overTop <= 0 ? withinOffset : overTop > overBottom ? withinOffset + outerHeight - data.collisionHeight : withinOffset : overTop > 0 ? position.top += overTop : overBottom > 0 ? position.top -= overBottom : position.top = max(position.top - collisionPosTop, position.top);
                }
            },
            flip: {
                left: function(position, data) {
                    var newOverRight, newOverLeft, within = data.within, withinOffset = within.offset.left + within.scrollLeft, outerWidth = within.width, offsetLeft = within.isglobal ? within.scrollLeft : within.offset.left, collisionPosLeft = position.left - data.collisionPosition.marginLeft, overLeft = collisionPosLeft - offsetLeft, overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft, myOffset = "left" === data.my[0] ? -data.elemWidth : "right" === data.my[0] ? data.elemWidth : 0, atOffset = "left" === data.at[0] ? data.targetWidth : "right" === data.at[0] ? -data.targetWidth : 0, offset = -2 * data.offset[0];
                    overLeft < 0 ? ((newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset) < 0 || newOverRight < abs(overLeft)) && (position.left += myOffset + atOffset + offset) : overRight > 0 && ((newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft) > 0 || abs(newOverLeft) < overRight) && (position.left += myOffset + atOffset + offset);
                },
                top: function(position, data) {
                    var newOverTop, newOverBottom, within = data.within, withinOffset = within.offset.top + within.scrollTop, outerHeight = within.height, offsetTop = within.isglobal ? within.scrollTop : within.offset.top, collisionPosTop = position.top - data.collisionPosition.marginTop, overTop = collisionPosTop - offsetTop, overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop, top = "top" === data.my[1], myOffset = top ? -data.elemHeight : "bottom" === data.my[1] ? data.elemHeight : 0, atOffset = "top" === data.at[1] ? data.targetHeight : "bottom" === data.at[1] ? -data.targetHeight : 0, offset = -2 * data.offset[1];
                    overTop < 0 ? ((newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset) < 0 || newOverBottom < abs(overTop)) && (position.top += myOffset + atOffset + offset) : overBottom > 0 && ((newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop) > 0 || abs(newOverTop) < overBottom) && (position.top += myOffset + atOffset + offset);
                }
            },
            flipfit: {
                left: function() {
                    jQuery.ui.position.flip.left.apply(this, arguments), jQuery.ui.position.fit.left.apply(this, arguments);
                },
                top: function() {
                    jQuery.ui.position.flip.top.apply(this, arguments), jQuery.ui.position.fit.top.apply(this, arguments);
                }
            }
        };
    }(window, $), $.cleanData = function(orig) {
        return function(elems) {
            var events, elem, i;
            for (i = 0; null != (elem = elems[i]); i++) try {
                events = $._data(elem, "events"), events && events.remove && $(elem).triggerHandler("remove");
            } catch (e) {}
            orig(elems);
        };
    }($.cleanData), $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return !!$.data(elem, dataName);
            };
        }) : function(elem, i, match) {
            return !!$.data(elem, match[3]);
        }
    }), $.fn.scrollParent = function(includeHidden) {
        var position = this.css("position"), excludeStaticParent = "absolute" === position, overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/, scrollParent = this.parents().filter(function() {
            var parent = $(this);
            return (!excludeStaticParent || "static" !== parent.css("position")) && overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
        }).eq(0);
        return "fixed" !== position && scrollParent.length ? scrollParent : $(this[0].ownerDocument || document);
    }, $.fn.extend({
        disableSelection: function() {
            var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.on(eventType + ".ui-disableSelection", function(event) {
                    event.preventDefault();
                });
            };
        }(),
        enableSelection: function() {
            return this.off(".ui-disableSelection");
        }
    });
    var mouseHandled = !1;
    $(document).on("mouseup", function() {
        mouseHandled = !1;
    }), widget("ui.mouse", {
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
                if (!0 === $.data(event.target, that.widgetName + ".preventClickEvent")) return $.removeData(event.target, that.widgetName + ".preventClickEvent"), 
                event.stopImmediatePropagation(), !1;
            }), this.started = !1;
        },
        _mouseDestroy: function() {
            this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function(event) {
            if (!mouseHandled) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(event), this._mouseDownEvent = event;
                var that = this, btnIsLeft = 1 === event.which, elIsCancel = !("string" != typeof this.options.cancel || !event.target.nodeName) && $(event.target).closest(this.options.cancel).length;
                return !(btnIsLeft && !elIsCancel && this._mouseCapture(event)) || (this.mouseDelayMet = !this.options.delay, 
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    that.mouseDelayMet = !0;
                }, this.options.delay)), this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = !1 !== this._mouseStart(event), 
                !this._mouseStarted) ? (event.preventDefault(), !0) : (!0 === $.data(event.target, this.widgetName + ".preventClickEvent") && $.removeData(event.target, this.widgetName + ".preventClickEvent"), 
                this._mouseMoveDelegate = function(event) {
                    return that._mouseMove(event);
                }, this._mouseUpDelegate = function(event) {
                    return that._mouseUp(event);
                }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), 
                event.preventDefault(), mouseHandled = !0, !0));
            }
        },
        _mouseMove: function(event) {
            if (this._mouseMoved) {
                if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) return this._mouseUp(event);
                if (!event.which) if (event.originalEvent.altKey || event.originalEvent.ctrlKey || event.originalEvent.metaKey || event.originalEvent.shiftKey) this.ignoreMissingWhich = !0; else if (!this.ignoreMissingWhich) return this._mouseUp(event);
            }
            return (event.which || event.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(event), 
            event.preventDefault()) : (this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, event), 
            this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event)), !this._mouseStarted);
        },
        _mouseUp: function(event) {
            this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), 
            this._mouseStarted && (this._mouseStarted = !1, event.target === this._mouseDownEvent.target && $.data(event.target, this.widgetName + ".preventClickEvent", !0), 
            this._mouseStop(event)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), 
            delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, mouseHandled = !1, 
            event.preventDefault();
        },
        _mouseDistanceMet: function(event) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet;
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0;
        }
    });
    var mouse = $.ui.mouse;
    ui.plugin = {
        add: function(module, option, set) {
            var i, proto = ui[module].prototype;
            for (i in set) proto.plugins[i] = proto.plugins[i] || [], proto.plugins[i].push([ option, set[i] ]);
        },
        call: function(instance, name, args, allowDisconnected) {
            var i, set = instance.plugins[name];
            if (set && (allowDisconnected || instance.element[0].parentNode && 11 !== instance.element[0].parentNode.nodeType)) for (i = 0; i < set.length; i++) instance.options[set[i][0]] && set[i][1].apply(instance.element, args);
        }
    };
    var plugin = ui.plugin;
    widget("ui.draggable", mouse, {
        version: "1.12.0",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), 
            this._setHandleClassName(), this._mouseInit();
        },
        _setOption: function(key, value) {
            this._super(key, value), "handle" === key && (this._removeHandleClassName(), this._setHandleClassName());
        },
        _destroy: function() {
            if ((this.helper || this.element).is(".ui-draggable-dragging")) return void (this.destroyOnClear = !0);
            this._removeHandleClassName(), this._mouseDestroy();
        },
        _mouseCapture: function(event) {
            var o = this.options;
            return this._blurActiveElement(event), !(this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) && (this.handle = this._getHandle(event), 
            !!this.handle && (this._blockFrames(!0 === o.iframeFix ? "iframe" : o.iframeFix), 
            !0));
        },
        _blockFrames: function(selector) {
            this.iframeBlocks = this.document.find(selector).map(function() {
                var iframe = $(this);
                return $("<div>").css("position", "absolute").appendTo(iframe.parent()).outerWidth(iframe.outerWidth()).outerHeight(iframe.outerHeight()).offset(iframe.offset())[0];
            });
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _blurActiveElement: function(event) {
            var activeElement = $.ui.safeActiveElement(this.document[0]), target = $(event.target);
            this._getHandle(event) && target.closest(activeElement).length || $.ui.safeBlur(activeElement);
        },
        _mouseStart: function(event) {
            var o = this.options;
            return this.helper = this._createHelper(event), this._addClass(this.helper, "ui-draggable-dragging"), 
            this._cacheHelperProportions(), $.ui.ddmanager && ($.ui.ddmanager.current = this), 
            this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), 
            this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
                return "fixed" === $(this).css("position");
            }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(event), 
            this.originalPosition = this.position = this._generatePosition(event, !1), this.originalPageX = event.pageX, 
            this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), 
            this._setContainment(), !1 === this._trigger("start", event) ? (this._clear(), !1) : (this._cacheHelperProportions(), 
            $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event), 
            this._mouseDrag(event, !0), $.ui.ddmanager && $.ui.ddmanager.dragStart(this, event), 
            !0);
        },
        _refreshOffsets: function(event) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }, this.offset.click = {
                left: event.pageX - this.offset.left,
                top: event.pageY - this.offset.top
            };
        },
        _mouseDrag: function(event, noPropagation) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(event, !0), 
            this.positionAbs = this._convertPositionTo("absolute"), !noPropagation) {
                var ui$$1 = this._uiHash();
                if (!1 === this._trigger("drag", event, ui$$1)) return this._mouseUp(new $.Event("mouseup", event)), 
                !1;
                this.position = ui$$1.position;
            }
            return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", 
            $.ui.ddmanager && $.ui.ddmanager.drag(this, event), !1;
        },
        _mouseStop: function(event) {
            var that = this, dropped = !1;
            return $.ui.ddmanager && !this.options.dropBehaviour && (dropped = $.ui.ddmanager.drop(this, event)), 
            this.dropped && (dropped = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !dropped || "valid" === this.options.revert && dropped || !0 === this.options.revert || $.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped) ? $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                !1 !== that._trigger("stop", event) && that._clear();
            }) : !1 !== this._trigger("stop", event) && this._clear(), !1;
        },
        _mouseUp: function(event) {
            return this._unblockFrames(), $.ui.ddmanager && $.ui.ddmanager.dragStop(this, event), 
            this.handleElement.is(event.target) && this.element.trigger("focus"), $.ui.mouse.prototype._mouseUp.call(this, event);
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new $.Event("mouseup", {
                target: this.element[0]
            })) : this._clear(), this;
        },
        _getHandle: function(event) {
            return !this.options.handle || !!$(event.target).closest(this.element.find(this.options.handle)).length;
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, 
            this._addClass(this.handleElement, "ui-draggable-handle");
        },
        _removeHandleClassName: function() {
            this._removeClass(this.handleElement, "ui-draggable-handle");
        },
        _createHelper: function(event) {
            var o = this.options, helperIsFunction = $.isFunction(o.helper), helper = helperIsFunction ? $(o.helper.apply(this.element[0], [ event ])) : "clone" === o.helper ? this.element.clone().removeAttr("id") : this.element;
            return helper.parents("body").length || helper.appendTo("parent" === o.appendTo ? this.element[0].parentNode : o.appendTo), 
            helperIsFunction && helper[0] === this.element[0] && this._setPositionRelative(), 
            helper[0] === this.element[0] || /(fixed|absolute)/.test(helper.css("position")) || helper.css("position", "absolute"), 
            helper;
        },
        _setPositionRelative: function() {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
        },
        _adjustOffsetFromHelper: function(obj) {
            "string" == typeof obj && (obj = obj.split(" ")), $.isArray(obj) && (obj = {
                left: +obj[0],
                top: +obj[1] || 0
            }), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left), 
            "top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top);
        },
        _isRootNode: function(element) {
            return /(html|body)/i.test(element.tagName) || element === this.document[0];
        },
        _getParentOffset: function() {
            var po = this.offsetParent.offset(), document = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(), 
            po.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (po = {
                top: 0,
                left: 0
            }), {
                top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition) return {
                top: 0,
                left: 0
            };
            var p = this.element.position(), scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
            return {
                top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + (scrollIsRootNode ? 0 : this.scrollParent.scrollTop()),
                left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + (scrollIsRootNode ? 0 : this.scrollParent.scrollLeft())
            };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var isUserScrollable, c, ce, o = this.options, document = this.document[0];
            return this.relativeContainer = null, o.containment ? "window" === o.containment ? void (this.containment = [ $(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, $(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left, $(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]) : "document" === o.containment ? void (this.containment = [ 0, 0, $(document).width() - this.helperProportions.width - this.margins.left, ($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]) : o.containment.constructor === Array ? void (this.containment = o.containment) : ("parent" === o.containment && (o.containment = this.helper[0].parentNode), 
            c = $(o.containment), void ((ce = c[0]) && (isUserScrollable = /(scroll|auto)/.test(c.css("overflow")), 
            this.containment = [ (parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (isUserScrollable ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (isUserScrollable ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ], 
            this.relativeContainer = c))) : void (this.containment = null);
        },
        _convertPositionTo: function(d, pos) {
            pos || (pos = this.position);
            var mod = "absolute" === d ? 1 : -1, scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
            return {
                top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ("fixed" === this.cssPosition ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top) * mod,
                left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ("fixed" === this.cssPosition ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left) * mod
            };
        },
        _generatePosition: function(event, constrainPosition) {
            var containment, co, top, left, o = this.options, scrollIsRootNode = this._isRootNode(this.scrollParent[0]), pageX = event.pageX, pageY = event.pageY;
            return scrollIsRootNode && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }), constrainPosition && (this.containment && (this.relativeContainer ? (co = this.relativeContainer.offset(), 
            containment = [ this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top ]) : containment = this.containment, 
            event.pageX - this.offset.click.left < containment[0] && (pageX = containment[0] + this.offset.click.left), 
            event.pageY - this.offset.click.top < containment[1] && (pageY = containment[1] + this.offset.click.top), 
            event.pageX - this.offset.click.left > containment[2] && (pageX = containment[2] + this.offset.click.left), 
            event.pageY - this.offset.click.top > containment[3] && (pageY = containment[3] + this.offset.click.top)), 
            o.grid && (top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, 
            pageY = containment ? top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3] ? top : top - this.offset.click.top >= containment[1] ? top - o.grid[1] : top + o.grid[1] : top, 
            left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, 
            pageX = containment ? left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2] ? left : left - this.offset.click.left >= containment[0] ? left - o.grid[0] : left + o.grid[0] : left), 
            "y" === o.axis && (pageX = this.originalPageX), "x" === o.axis && (pageY = this.originalPageY)), 
            {
                top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top),
                left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left)
            };
        },
        _clear: function() {
            this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), 
            this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy();
        },
        _trigger: function(type, event, ui$$1) {
            return ui$$1 = ui$$1 || this._uiHash(), plugin.call(this, type, [ event, ui$$1, this ], !0), 
            /^(drag|start|stop)/.test(type) && (this.positionAbs = this._convertPositionTo("absolute"), 
            ui$$1.offset = this.positionAbs), $.Widget.prototype._trigger.call(this, type, event, ui$$1);
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
    }), plugin.add("draggable", "connectToSortable", {
        start: function(event, ui$$1, draggable) {
            var uiSortable = $.extend({}, ui$$1, {
                item: draggable.element
            });
            draggable.sortables = [], $(draggable.options.connectToSortable).each(function() {
                var sortable = $(this).sortable("instance");
                sortable && !sortable.options.disabled && (draggable.sortables.push(sortable), sortable.refreshPositions(), 
                sortable._trigger("activate", event, uiSortable));
            });
        },
        stop: function(event, ui$$1, draggable) {
            var uiSortable = $.extend({}, ui$$1, {
                item: draggable.element
            });
            draggable.cancelHelperRemoval = !1, $.each(draggable.sortables, function() {
                var sortable = this;
                sortable.isOver ? (sortable.isOver = 0, draggable.cancelHelperRemoval = !0, sortable.cancelHelperRemoval = !1, 
                sortable._storedCSS = {
                    position: sortable.placeholder.css("position"),
                    top: sortable.placeholder.css("top"),
                    left: sortable.placeholder.css("left")
                }, sortable._mouseStop(event), sortable.options.helper = sortable.options._helper) : (sortable.cancelHelperRemoval = !0, 
                sortable._trigger("deactivate", event, uiSortable));
            });
        },
        drag: function(event, ui$$1, draggable) {
            $.each(draggable.sortables, function() {
                var innermostIntersecting = !1, sortable = this;
                sortable.positionAbs = draggable.positionAbs, sortable.helperProportions = draggable.helperProportions, 
                sortable.offset.click = draggable.offset.click, sortable._intersectsWith(sortable.containerCache) && (innermostIntersecting = !0, 
                $.each(draggable.sortables, function() {
                    return this.positionAbs = draggable.positionAbs, this.helperProportions = draggable.helperProportions, 
                    this.offset.click = draggable.offset.click, this !== sortable && this._intersectsWith(this.containerCache) && $.contains(sortable.element[0], this.element[0]) && (innermostIntersecting = !1), 
                    innermostIntersecting;
                })), innermostIntersecting ? (sortable.isOver || (sortable.isOver = 1, draggable._parent = ui$$1.helper.parent(), 
                sortable.currentItem = ui$$1.helper.appendTo(sortable.element).data("ui-sortable-item", !0), 
                sortable.options._helper = sortable.options.helper, sortable.options.helper = function() {
                    return ui$$1.helper[0];
                }, event.target = sortable.currentItem[0], sortable._mouseCapture(event, !0), sortable._mouseStart(event, !0, !0), 
                sortable.offset.click.top = draggable.offset.click.top, sortable.offset.click.left = draggable.offset.click.left, 
                sortable.offset.parent.left -= draggable.offset.parent.left - sortable.offset.parent.left, 
                sortable.offset.parent.top -= draggable.offset.parent.top - sortable.offset.parent.top, 
                draggable._trigger("toSortable", event), draggable.dropped = sortable.element, $.each(draggable.sortables, function() {
                    this.refreshPositions();
                }), draggable.currentItem = draggable.element, sortable.fromOutside = draggable), 
                sortable.currentItem && (sortable._mouseDrag(event), ui$$1.position = sortable.position)) : sortable.isOver && (sortable.isOver = 0, 
                sortable.cancelHelperRemoval = !0, sortable.options._revert = sortable.options.revert, 
                sortable.options.revert = !1, sortable._trigger("out", event, sortable._uiHash(sortable)), 
                sortable._mouseStop(event, !0), sortable.options.revert = sortable.options._revert, 
                sortable.options.helper = sortable.options._helper, sortable.placeholder && sortable.placeholder.remove(), 
                ui$$1.helper.appendTo(draggable._parent), draggable._refreshOffsets(event), ui$$1.position = draggable._generatePosition(event, !0), 
                draggable._trigger("fromSortable", event), draggable.dropped = !1, $.each(draggable.sortables, function() {
                    this.refreshPositions();
                }));
            });
        }
    }), plugin.add("draggable", "cursor", {
        start: function(event, ui$$1, instance) {
            var t = $("body"), o = instance.options;
            t.css("cursor") && (o._cursor = t.css("cursor")), t.css("cursor", o.cursor);
        },
        stop: function(event, ui$$1, instance) {
            var o = instance.options;
            o._cursor && $("body").css("cursor", o._cursor);
        }
    }), plugin.add("draggable", "opacity", {
        start: function(event, ui$$1, instance) {
            var t = $(ui$$1.helper), o = instance.options;
            t.css("opacity") && (o._opacity = t.css("opacity")), t.css("opacity", o.opacity);
        },
        stop: function(event, ui$$1, instance) {
            var o = instance.options;
            o._opacity && $(ui$$1.helper).css("opacity", o._opacity);
        }
    }), plugin.add("draggable", "scroll", {
        start: function(event, ui$$1, i) {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), 
            i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset());
        },
        drag: function(event, ui$$1, i) {
            var o = i.options, scrolled = !1, scrollParent = i.scrollParentNotHidden[0], document = i.document[0];
            scrollParent !== document && "HTML" !== scrollParent.tagName ? (o.axis && "x" === o.axis || (i.overflowOffset.top + scrollParent.offsetHeight - event.pageY < o.scrollSensitivity ? scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed : event.pageY - i.overflowOffset.top < o.scrollSensitivity && (scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed)), 
            o.axis && "y" === o.axis || (i.overflowOffset.left + scrollParent.offsetWidth - event.pageX < o.scrollSensitivity ? scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed : event.pageX - i.overflowOffset.left < o.scrollSensitivity && (scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed))) : (o.axis && "x" === o.axis || (event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) : $(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed))), 
            o.axis && "y" === o.axis || (event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) : $(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed)))), 
            !1 !== scrolled && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(i, event);
        }
    }), plugin.add("draggable", "snap", {
        start: function(event, ui$$1, i) {
            var o = i.options;
            i.snapElements = [], $(o.snap.constructor !== String ? o.snap.items || ":data(ui-draggable)" : o.snap).each(function() {
                var $t = $(this), $o = $t.offset();
                this !== i.element[0] && i.snapElements.push({
                    item: this,
                    width: $t.outerWidth(),
                    height: $t.outerHeight(),
                    top: $o.top,
                    left: $o.left
                });
            });
        },
        drag: function(event, ui$$1, inst) {
            var ts, bs, ls, rs, l, r, t, b, i, first, o = inst.options, d = o.snapTolerance, x1 = ui$$1.offset.left, x2 = x1 + inst.helperProportions.width, y1 = ui$$1.offset.top, y2 = y1 + inst.helperProportions.height;
            for (i = inst.snapElements.length - 1; i >= 0; i--) l = inst.snapElements[i].left - inst.margins.left, 
            r = l + inst.snapElements[i].width, t = inst.snapElements[i].top - inst.margins.top, 
            b = t + inst.snapElements[i].height, x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item) ? (inst.snapElements[i].snapping && inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
                snapItem: inst.snapElements[i].item
            })), inst.snapElements[i].snapping = !1) : ("inner" !== o.snapMode && (ts = Math.abs(t - y2) <= d, 
            bs = Math.abs(b - y1) <= d, ls = Math.abs(l - x2) <= d, rs = Math.abs(r - x1) <= d, 
            ts && (ui$$1.position.top = inst._convertPositionTo("relative", {
                top: t - inst.helperProportions.height,
                left: 0
            }).top), bs && (ui$$1.position.top = inst._convertPositionTo("relative", {
                top: b,
                left: 0
            }).top), ls && (ui$$1.position.left = inst._convertPositionTo("relative", {
                top: 0,
                left: l - inst.helperProportions.width
            }).left), rs && (ui$$1.position.left = inst._convertPositionTo("relative", {
                top: 0,
                left: r
            }).left)), first = ts || bs || ls || rs, "outer" !== o.snapMode && (ts = Math.abs(t - y1) <= d, 
            bs = Math.abs(b - y2) <= d, ls = Math.abs(l - x1) <= d, rs = Math.abs(r - x2) <= d, 
            ts && (ui$$1.position.top = inst._convertPositionTo("relative", {
                top: t,
                left: 0
            }).top), bs && (ui$$1.position.top = inst._convertPositionTo("relative", {
                top: b - inst.helperProportions.height,
                left: 0
            }).top), ls && (ui$$1.position.left = inst._convertPositionTo("relative", {
                top: 0,
                left: l
            }).left), rs && (ui$$1.position.left = inst._convertPositionTo("relative", {
                top: 0,
                left: r - inst.helperProportions.width
            }).left)), !inst.snapElements[i].snapping && (ts || bs || ls || rs || first) && inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
                snapItem: inst.snapElements[i].item
            })), inst.snapElements[i].snapping = ts || bs || ls || rs || first);
        }
    }), plugin.add("draggable", "stack", {
        start: function(event, ui$$1, instance) {
            var min, o = instance.options, group = $.makeArray($(o.stack)).sort(function(a, b) {
                return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
            });
            group.length && (min = parseInt($(group[0]).css("zIndex"), 10) || 0, $(group).each(function(i) {
                $(this).css("zIndex", min + i);
            }), this.css("zIndex", min + group.length));
        }
    }), plugin.add("draggable", "zIndex", {
        start: function(event, ui$$1, instance) {
            var t = $(ui$$1.helper), o = instance.options;
            t.css("zIndex") && (o._zIndex = t.css("zIndex")), t.css("zIndex", o.zIndex);
        },
        stop: function(event, ui$$1, instance) {
            var o = instance.options;
            o._zIndex && $(ui$$1.helper).css("zIndex", o._zIndex);
        }
    });
    $.ui.draggable;
    $.ui.keyCode = {
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
    };
    $.ui.keyCode;
    $.extend($.ui, {
        datepicker: {
            version: "1.12.1"
        }
    });
    var datepicker_instActive;
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv;
        },
        setDefaults: function(settings) {
            return datepicker_extendRemove(this._defaults, settings || {}), this;
        },
        _attachDatepicker: function(target, settings) {
            var nodeName, inline, inst;
            nodeName = target.nodeName.toLowerCase(), inline = "div" === nodeName || "span" === nodeName, 
            target.id || (this.uuid += 1, target.id = "dp" + this.uuid), inst = this._newInst($(target), inline), 
            inst.settings = $.extend({}, settings || {}), "input" === nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst);
        },
        _newInst: function(target, inline) {
            return {
                id: target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: inline ? datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            };
        },
        _connectDatepicker: function(target, inst) {
            var input = $(target);
            inst.append = $([]), inst.trigger = $([]), input.hasClass(this.markerClassName) || (this._attachments(input, inst), 
            input.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), 
            this._autoSize(inst), $.data(target, "datepicker", inst), inst.settings.disabled && this._disableDatepicker(target));
        },
        _attachments: function(input, inst) {
            var showOn, buttonText, buttonImage, appendText = this._get(inst, "appendText"), isRTL = this._get(inst, "isRTL");
            inst.append && inst.append.remove(), appendText && (inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>"), 
            input[isRTL ? "before" : "after"](inst.append)), input.off("focus", this._showDatepicker), 
            inst.trigger && inst.trigger.remove(), showOn = this._get(inst, "showOn"), "focus" !== showOn && "both" !== showOn || input.on("focus", this._showDatepicker), 
            "button" !== showOn && "both" !== showOn || (buttonText = this._get(inst, "buttonText"), 
            buttonImage = this._get(inst, "buttonImage"), inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                src: buttonImage,
                alt: buttonText,
                title: buttonText
            }) : $("<button type='button'></button>").addClass(this._triggerClass).html(buttonImage ? $("<img/>").attr({
                src: buttonImage,
                alt: buttonText,
                title: buttonText
            }) : buttonText)), input[isRTL ? "before" : "after"](inst.trigger), inst.trigger.on("click", function() {
                return $.datepicker._datepickerShowing && $.datepicker._lastInput === input[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0] ? ($.datepicker._hideDatepicker(), 
                $.datepicker._showDatepicker(input[0])) : $.datepicker._showDatepicker(input[0]), 
                !1;
            }));
        },
        _autoSize: function(inst) {
            if (this._get(inst, "autoSize") && !inst.inline) {
                var findMax, max, maxI, i, date = new Date(2009, 11, 20), dateFormat = this._get(inst, "dateFormat");
                dateFormat.match(/[DM]/) && (findMax = function(names) {
                    for (max = 0, maxI = 0, i = 0; i < names.length; i++) names[i].length > max && (max = names[i].length, 
                    maxI = i);
                    return maxI;
                }, date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))), 
                date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay())), 
                inst.input.attr("size", this._formatDate(inst, date).length);
            }
        },
        _inlineDatepicker: function(target, inst) {
            var divSpan = $(target);
            divSpan.hasClass(this.markerClassName) || (divSpan.addClass(this.markerClassName).append(inst.dpDiv), 
            $.data(target, "datepicker", inst), this._setDate(inst, this._getDefaultDate(inst), !0), 
            this._updateDatepicker(inst), this._updateAlternate(inst), inst.settings.disabled && this._disableDatepicker(target), 
            inst.dpDiv.css("display", "block"));
        },
        _dialogDatepicker: function(input, date, onSelect, settings, pos) {
            var id, browserWidth, browserHeight, scrollX, scrollY, inst = this._dialogInst;
            return inst || (this.uuid += 1, id = "dp" + this.uuid, this._dialogInput = $("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>"), 
            this._dialogInput.on("keydown", this._doKeyDown), $("body").append(this._dialogInput), 
            inst = this._dialogInst = this._newInst(this._dialogInput, !1), inst.settings = {}, 
            $.data(this._dialogInput[0], "datepicker", inst)), datepicker_extendRemove(inst.settings, settings || {}), 
            date = date && date.constructor === Date ? this._formatDate(inst, date) : date, 
            this._dialogInput.val(date), this._pos = pos ? pos.length ? pos : [ pos.pageX, pos.pageY ] : null, 
            this._pos || (browserWidth = document.documentElement.clientWidth, browserHeight = document.documentElement.clientHeight, 
            scrollX = document.documentElement.scrollLeft || document.body.scrollLeft, scrollY = document.documentElement.scrollTop || document.body.scrollTop, 
            this._pos = [ browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY ]), 
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), 
            inst.settings.onSelect = onSelect, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), 
            this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), 
            $.data(this._dialogInput[0], "datepicker", inst), this;
        },
        _destroyDatepicker: function(target) {
            var nodeName, $target = $(target), inst = $.data(target, "datepicker");
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), 
            $.removeData(target, "datepicker"), "input" === nodeName ? (inst.append.remove(), 
            inst.trigger.remove(), $target.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : "div" !== nodeName && "span" !== nodeName || $target.removeClass(this.markerClassName).empty(), 
            datepicker_instActive === inst && (datepicker_instActive = null));
        },
        _enableDatepicker: function(target) {
            var nodeName, inline, $target = $(target), inst = $.data(target, "datepicker");
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), 
            "input" === nodeName ? (target.disabled = !1, inst.trigger.filter("button").each(function() {
                this.disabled = !1;
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : "div" !== nodeName && "span" !== nodeName || (inline = $target.children("." + this._inlineClass), 
            inline.children().removeClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), 
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return value === target ? null : value;
            }));
        },
        _disableDatepicker: function(target) {
            var nodeName, inline, $target = $(target), inst = $.data(target, "datepicker");
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), 
            "input" === nodeName ? (target.disabled = !0, inst.trigger.filter("button").each(function() {
                this.disabled = !0;
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : "div" !== nodeName && "span" !== nodeName || (inline = $target.children("." + this._inlineClass), 
            inline.children().addClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), 
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return value === target ? null : value;
            }), this._disabledInputs[this._disabledInputs.length] = target);
        },
        _isDisabledDatepicker: function(target) {
            if (!target) return !1;
            for (var i = 0; i < this._disabledInputs.length; i++) if (this._disabledInputs[i] === target) return !0;
            return !1;
        },
        _getInst: function(target) {
            try {
                return $.data(target, "datepicker");
            } catch (err) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(target, name, value) {
            var settings, date, minDate, maxDate, inst = this._getInst(target);
            if (2 === arguments.length && "string" == typeof name) return "defaults" === name ? $.extend({}, $.datepicker._defaults) : inst ? "all" === name ? $.extend({}, inst.settings) : this._get(inst, name) : null;
            settings = name || {}, "string" == typeof name && (settings = {}, settings[name] = value), 
            inst && (this._curInst === inst && this._hideDatepicker(), date = this._getDateDatepicker(target, !0), 
            minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), 
            datepicker_extendRemove(inst.settings, settings), null !== minDate && void 0 !== settings.dateFormat && void 0 === settings.minDate && (inst.settings.minDate = this._formatDate(inst, minDate)), 
            null !== maxDate && void 0 !== settings.dateFormat && void 0 === settings.maxDate && (inst.settings.maxDate = this._formatDate(inst, maxDate)), 
            "disabled" in settings && (settings.disabled ? this._disableDatepicker(target) : this._enableDatepicker(target)), 
            this._attachments($(target), inst), this._autoSize(inst), this._setDate(inst, date), 
            this._updateAlternate(inst), this._updateDatepicker(inst));
        },
        _changeDatepicker: function(target, name, value) {
            this._optionDatepicker(target, name, value);
        },
        _refreshDatepicker: function(target) {
            var inst = this._getInst(target);
            inst && this._updateDatepicker(inst);
        },
        _setDateDatepicker: function(target, date) {
            var inst = this._getInst(target);
            inst && (this._setDate(inst, date), this._updateDatepicker(inst), this._updateAlternate(inst));
        },
        _getDateDatepicker: function(target, noDefault) {
            var inst = this._getInst(target);
            return inst && !inst.inline && this._setDateFromField(inst, noDefault), inst ? this._getDate(inst) : null;
        },
        _doKeyDown: function(event) {
            var onSelect, dateStr, sel, inst = $.datepicker._getInst(event.target), handled = !0, isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            if (inst._keyEvent = !0, $.datepicker._datepickerShowing) switch (event.keyCode) {
              case 9:
                $.datepicker._hideDatepicker(), handled = !1;
                break;

              case 13:
                return sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv), 
                sel[0] && $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]), 
                onSelect = $.datepicker._get(inst, "onSelect"), onSelect ? (dateStr = $.datepicker._formatDate(inst), 
                onSelect.apply(inst.input ? inst.input[0] : null, [ dateStr, inst ])) : $.datepicker._hideDatepicker(), 
                !1;

              case 27:
                $.datepicker._hideDatepicker();
                break;

              case 33:
                $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                break;

              case 34:
                $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                break;

              case 35:
                (event.ctrlKey || event.metaKey) && $.datepicker._clearDate(event.target), handled = event.ctrlKey || event.metaKey;
                break;

              case 36:
                (event.ctrlKey || event.metaKey) && $.datepicker._gotoToday(event.target), handled = event.ctrlKey || event.metaKey;
                break;

              case 37:
                (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? 1 : -1, "D"), 
                handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                break;

              case 38:
                (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, -7, "D"), 
                handled = event.ctrlKey || event.metaKey;
                break;

              case 39:
                (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? -1 : 1, "D"), 
                handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                break;

              case 40:
                (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, 7, "D"), 
                handled = event.ctrlKey || event.metaKey;
                break;

              default:
                handled = !1;
            } else 36 === event.keyCode && event.ctrlKey ? $.datepicker._showDatepicker(this) : handled = !1;
            handled && (event.preventDefault(), event.stopPropagation());
        },
        _doKeyPress: function(event) {
            var chars, chr, inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, "constrainInput")) return chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat")), 
            chr = String.fromCharCode(null == event.charCode ? event.keyCode : event.charCode), 
            event.ctrlKey || event.metaKey || chr < " " || !chars || chars.indexOf(chr) > -1;
        },
        _doKeyUp: function(event) {
            var date, inst = $.datepicker._getInst(event.target);
            if (inst.input.val() !== inst.lastVal) try {
                date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst)), 
                date && ($.datepicker._setDateFromField(inst), $.datepicker._updateAlternate(inst), 
                $.datepicker._updateDatepicker(inst));
            } catch (err) {}
            return !0;
        },
        _showDatepicker: function(input) {
            if (input = input.target || input, "input" !== input.nodeName.toLowerCase() && (input = $("input", input.parentNode)[0]), 
            !$.datepicker._isDisabledDatepicker(input) && $.datepicker._lastInput !== input) {
                var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;
                inst = $.datepicker._getInst(input), $.datepicker._curInst && $.datepicker._curInst !== inst && ($.datepicker._curInst.dpDiv.stop(!0, !0), 
                inst && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0])), 
                beforeShow = $.datepicker._get(inst, "beforeShow"), beforeShowSettings = beforeShow ? beforeShow.apply(input, [ input, inst ]) : {}, 
                !1 !== beforeShowSettings && (datepicker_extendRemove(inst.settings, beforeShowSettings), 
                inst.lastVal = null, $.datepicker._lastInput = input, $.datepicker._setDateFromField(inst), 
                $.datepicker._inDialog && (input.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(input), 
                $.datepicker._pos[1] += input.offsetHeight), isFixed = !1, $(input).parents().each(function() {
                    return !(isFixed |= "fixed" === $(this).css("position"));
                }), offset = {
                    left: $.datepicker._pos[0],
                    top: $.datepicker._pos[1]
                }, $.datepicker._pos = null, inst.dpDiv.empty(), inst.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), $.datepicker._updateDatepicker(inst), offset = $.datepicker._checkOffset(inst, offset, isFixed), 
                inst.dpDiv.css({
                    position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute",
                    display: "none",
                    left: offset.left + "px",
                    top: offset.top + "px"
                }), inst.inline || (showAnim = $.datepicker._get(inst, "showAnim"), duration = $.datepicker._get(inst, "duration"), 
                inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1), $.datepicker._datepickerShowing = !0, 
                $.effects && $.effects.effect[showAnim] ? inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration) : inst.dpDiv[showAnim || "show"](showAnim ? duration : null), 
                $.datepicker._shouldFocusInput(inst) && inst.input.trigger("focus"), $.datepicker._curInst = inst));
            }
        },
        _updateDatepicker: function(inst) {
            this.maxRows = 4, datepicker_instActive = inst, inst.dpDiv.empty().append(this._generateHTML(inst)), 
            this._attachHandlers(inst);
            var origyearshtml, numMonths = this._getNumberOfMonths(inst), cols = numMonths[1], activeCell = inst.dpDiv.find("." + this._dayOverClass + " a");
            activeCell.length > 0 && datepicker_handleMouseover.apply(activeCell.get(0)), inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), 
            cols > 1 && inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", 17 * cols + "em"), 
            inst.dpDiv[(1 !== numMonths[0] || 1 !== numMonths[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), 
            inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), 
            inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst) && inst.input.trigger("focus"), 
            inst.yearshtml && (origyearshtml = inst.yearshtml, setTimeout(function() {
                origyearshtml === inst.yearshtml && inst.yearshtml && inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml), 
                origyearshtml = inst.yearshtml = null;
            }, 0));
        },
        _shouldFocusInput: function(inst) {
            return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus");
        },
        _checkOffset: function(inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth(), dpHeight = inst.dpDiv.outerHeight(), inputWidth = inst.input ? inst.input.outerWidth() : 0, inputHeight = inst.input ? inst.input.outerHeight() : 0, viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()), viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
            return offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0, offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0, 
            offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0, 
            offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0), 
            offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0), 
            offset;
        },
        _findPos: function(obj) {
            for (var position, inst = this._getInst(obj), isRTL = this._get(inst, "isRTL"); obj && ("hidden" === obj.type || 1 !== obj.nodeType || $.expr.filters.hidden(obj)); ) obj = obj[isRTL ? "previousSibling" : "nextSibling"];
            return position = $(obj).offset(), [ position.left, position.top ];
        },
        _hideDatepicker: function(input) {
            var showAnim, duration, postProcess, onClose, inst = this._curInst;
            !inst || input && inst !== $.data(input, "datepicker") || this._datepickerShowing && (showAnim = this._get(inst, "showAnim"), 
            duration = this._get(inst, "duration"), postProcess = function() {
                $.datepicker._tidyDialog(inst);
            }, $.effects && ($.effects.effect[showAnim] || $.effects[showAnim]) ? inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) : inst.dpDiv["slideDown" === showAnim ? "slideUp" : "fadeIn" === showAnim ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess), 
            showAnim || postProcess(), this._datepickerShowing = !1, onClose = this._get(inst, "onClose"), 
            onClose && onClose.apply(inst.input ? inst.input[0] : null, [ inst.input ? inst.input.val() : "", inst ]), 
            this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1);
        },
        _tidyDialog: function(inst) {
            inst.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
        },
        _checkExternalClick: function(event) {
            if ($.datepicker._curInst) {
                var $target = $(event.target), inst = $.datepicker._getInst($target[0]);
                ($target[0].id === $.datepicker._mainDivId || 0 !== $target.parents("#" + $.datepicker._mainDivId).length || $target.hasClass($.datepicker.markerClassName) || $target.closest("." + $.datepicker._triggerClass).length || !$.datepicker._datepickerShowing || $.datepicker._inDialog && $.blockUI) && (!$target.hasClass($.datepicker.markerClassName) || $.datepicker._curInst === inst) || $.datepicker._hideDatepicker();
            }
        },
        _adjustDate: function(id, offset, period) {
            var target = $(id), inst = this._getInst(target[0]);
            this._isDisabledDatepicker(target[0]) || (this._adjustInstDate(inst, offset + ("M" === period ? this._get(inst, "showCurrentAtPos") : 0), period), 
            this._updateDatepicker(inst));
        },
        _gotoToday: function(id) {
            var date, target = $(id), inst = this._getInst(target[0]);
            this._get(inst, "gotoCurrent") && inst.currentDay ? (inst.selectedDay = inst.currentDay, 
            inst.drawMonth = inst.selectedMonth = inst.currentMonth, inst.drawYear = inst.selectedYear = inst.currentYear) : (date = new Date(), 
            inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), 
            inst.drawYear = inst.selectedYear = date.getFullYear()), this._notifyChange(inst), 
            this._adjustDate(target);
        },
        _selectMonthYear: function(id, select, period) {
            var target = $(id), inst = this._getInst(target[0]);
            inst["selected" + ("M" === period ? "Month" : "Year")] = inst["draw" + ("M" === period ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10), 
            this._notifyChange(inst), this._adjustDate(target);
        },
        _selectDay: function(id, month, year, td) {
            var inst, target = $(id);
            $(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0]) || (inst = this._getInst(target[0]), 
            inst.selectedDay = inst.currentDay = $("a", td).html(), inst.selectedMonth = inst.currentMonth = month, 
            inst.selectedYear = inst.currentYear = year, this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear)));
        },
        _clearDate: function(id) {
            var target = $(id);
            this._selectDate(target, "");
        },
        _selectDate: function(id, dateStr) {
            var onSelect, target = $(id), inst = this._getInst(target[0]);
            dateStr = null != dateStr ? dateStr : this._formatDate(inst), inst.input && inst.input.val(dateStr), 
            this._updateAlternate(inst), onSelect = this._get(inst, "onSelect"), onSelect ? onSelect.apply(inst.input ? inst.input[0] : null, [ dateStr, inst ]) : inst.input && inst.input.trigger("change"), 
            inst.inline ? this._updateDatepicker(inst) : (this._hideDatepicker(), this._lastInput = inst.input[0], 
            "object" != typeof inst.input[0] && inst.input.trigger("focus"), this._lastInput = null);
        },
        _updateAlternate: function(inst) {
            var altFormat, date, dateStr, altField = this._get(inst, "altField");
            altField && (altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat"), 
            date = this._getDate(inst), dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst)), 
            $(altField).val(dateStr));
        },
        noWeekends: function(date) {
            var day = date.getDay();
            return [ day > 0 && day < 6, "" ];
        },
        iso8601Week: function(date) {
            var time, checkDate = new Date(date.getTime());
            return checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)), time = checkDate.getTime(), 
            checkDate.setMonth(0), checkDate.setDate(1), Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1;
        },
        parseDate: function(format, value, settings) {
            if (null == format || null == value) throw "Invalid arguments";
            if ("" === (value = "object" == typeof value ? value.toString() : value + "")) return null;
            var iFormat, dim, extra, date, iValue = 0, shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff, shortYearCutoff = "string" != typeof shortYearCutoffTemp ? shortYearCutoffTemp : new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10), dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, year = -1, month = -1, day = -1, doy = -1, literal = !1, lookAhead = function(match) {
                var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                return matches && iFormat++, matches;
            }, getNumber = function(match) {
                var isDoubled = lookAhead(match), size = "@" === match ? 14 : "!" === match ? 20 : "y" === match && isDoubled ? 4 : "o" === match ? 3 : 2, minSize = "y" === match ? size : 1, digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
                if (!num) throw "Missing number at position " + iValue;
                return iValue += num[0].length, parseInt(num[0], 10);
            }, getName = function(match, shortNames, longNames) {
                var index = -1, names = $.map(lookAhead(match) ? longNames : shortNames, function(v, k) {
                    return [ [ k, v ] ];
                }).sort(function(a, b) {
                    return -(a[1].length - b[1].length);
                });
                if ($.each(names, function(i, pair) {
                    var name = pair[1];
                    if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) return index = pair[0], 
                    iValue += name.length, !1;
                }), -1 !== index) return index + 1;
                throw "Unknown name at position " + iValue;
            }, checkLiteral = function() {
                if (value.charAt(iValue) !== format.charAt(iFormat)) throw "Unexpected literal at position " + iValue;
                iValue++;
            };
            for (iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" !== format.charAt(iFormat) || lookAhead("'") ? checkLiteral() : literal = !1; else switch (format.charAt(iFormat)) {
              case "d":
                day = getNumber("d");
                break;

              case "D":
                getName("D", dayNamesShort, dayNames);
                break;

              case "o":
                doy = getNumber("o");
                break;

              case "m":
                month = getNumber("m");
                break;

              case "M":
                month = getName("M", monthNamesShort, monthNames);
                break;

              case "y":
                year = getNumber("y");
                break;

              case "@":
                date = new Date(getNumber("@")), year = date.getFullYear(), month = date.getMonth() + 1, 
                day = date.getDate();
                break;

              case "!":
                date = new Date((getNumber("!") - this._ticksTo1970) / 1e4), year = date.getFullYear(), 
                month = date.getMonth() + 1, day = date.getDate();
                break;

              case "'":
                lookAhead("'") ? checkLiteral() : literal = !0;
                break;

              default:
                checkLiteral();
            }
            if (iValue < value.length && (extra = value.substr(iValue), !/^\s+/.test(extra))) throw "Extra/unparsed characters found in date: " + extra;
            if (-1 === year ? year = new Date().getFullYear() : year < 100 && (year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)), 
            doy > -1) for (month = 1, day = doy; ;) {
                if (dim = this._getDaysInMonth(year, month - 1), day <= dim) break;
                month++, day -= dim;
            }
            if (date = this._daylightSavingAdjust(new Date(year, month - 1, day)), date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) throw "Invalid date";
            return date;
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function(format, date, settings) {
            if (!date) return "";
            var iFormat, dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, lookAhead = function(match) {
                var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                return matches && iFormat++, matches;
            }, formatNumber = function(match, value, len) {
                var num = "" + value;
                if (lookAhead(match)) for (;num.length < len; ) num = "0" + num;
                return num;
            }, formatName = function(match, value, shortNames, longNames) {
                return lookAhead(match) ? longNames[value] : shortNames[value];
            }, output = "", literal = !1;
            if (date) for (iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" !== format.charAt(iFormat) || lookAhead("'") ? output += format.charAt(iFormat) : literal = !1; else switch (format.charAt(iFormat)) {
              case "d":
                output += formatNumber("d", date.getDate(), 2);
                break;

              case "D":
                output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                break;

              case "o":
                output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                break;

              case "m":
                output += formatNumber("m", date.getMonth() + 1, 2);
                break;

              case "M":
                output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                break;

              case "y":
                output += lookAhead("y") ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100;
                break;

              case "@":
                output += date.getTime();
                break;

              case "!":
                output += 1e4 * date.getTime() + this._ticksTo1970;
                break;

              case "'":
                lookAhead("'") ? output += "'" : literal = !0;
                break;

              default:
                output += format.charAt(iFormat);
            }
            return output;
        },
        _possibleChars: function(format) {
            var iFormat, chars = "", literal = !1, lookAhead = function(match) {
                var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                return matches && iFormat++, matches;
            };
            for (iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" !== format.charAt(iFormat) || lookAhead("'") ? chars += format.charAt(iFormat) : literal = !1; else switch (format.charAt(iFormat)) {
              case "d":
              case "m":
              case "y":
              case "@":
                chars += "0123456789";
                break;

              case "D":
              case "M":
                return null;

              case "'":
                lookAhead("'") ? chars += "'" : literal = !0;
                break;

              default:
                chars += format.charAt(iFormat);
            }
            return chars;
        },
        _get: function(inst, name) {
            return void 0 !== inst.settings[name] ? inst.settings[name] : this._defaults[name];
        },
        _setDateFromField: function(inst, noDefault) {
            if (inst.input.val() !== inst.lastVal) {
                var dateFormat = this._get(inst, "dateFormat"), dates = inst.lastVal = inst.input ? inst.input.val() : null, defaultDate = this._getDefaultDate(inst), date = defaultDate, settings = this._getFormatConfig(inst);
                try {
                    date = this.parseDate(dateFormat, dates, settings) || defaultDate;
                } catch (event) {
                    dates = noDefault ? "" : dates;
                }
                inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), 
                inst.drawYear = inst.selectedYear = date.getFullYear(), inst.currentDay = dates ? date.getDate() : 0, 
                inst.currentMonth = dates ? date.getMonth() : 0, inst.currentYear = dates ? date.getFullYear() : 0, 
                this._adjustInstDate(inst);
            }
        },
        _getDefaultDate: function(inst) {
            return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
        },
        _determineDate: function(inst, date, defaultDate) {
            var newDate = null == date || "" === date ? defaultDate : "string" == typeof date ? function(offset) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst));
                } catch (e) {}
                for (var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date(), year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset); matches; ) {
                    switch (matches[2] || "d") {
                      case "d":
                      case "D":
                        day += parseInt(matches[1], 10);
                        break;

                      case "w":
                      case "W":
                        day += 7 * parseInt(matches[1], 10);
                        break;

                      case "m":
                      case "M":
                        month += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                        break;

                      case "y":
                      case "Y":
                        year += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                    }
                    matches = pattern.exec(offset);
                }
                return new Date(year, month, day);
            }(date) : "number" == typeof date ? isNaN(date) ? defaultDate : function(offset) {
                var date = new Date();
                return date.setDate(date.getDate() + offset), date;
            }(date) : new Date(date.getTime());
            return newDate = newDate && "Invalid Date" === newDate.toString() ? defaultDate : newDate, 
            newDate && (newDate.setHours(0), newDate.setMinutes(0), newDate.setSeconds(0), newDate.setMilliseconds(0)), 
            this._daylightSavingAdjust(newDate);
        },
        _daylightSavingAdjust: function(date) {
            return date ? (date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0), date) : null;
        },
        _setDate: function(inst, date, noChange) {
            var clear = !date, origMonth = inst.selectedMonth, origYear = inst.selectedYear, newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
            inst.selectedDay = inst.currentDay = newDate.getDate(), inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth(), 
            inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear(), origMonth === inst.selectedMonth && origYear === inst.selectedYear || noChange || this._notifyChange(inst), 
            this._adjustInstDate(inst), inst.input && inst.input.val(clear ? "" : this._formatDate(inst));
        },
        _getDate: function(inst) {
            return !inst.currentYear || inst.input && "" === inst.input.val() ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
        },
        _attachHandlers: function(inst) {
            var stepMonths = this._get(inst, "stepMonths"), id = "#" + inst.id.replace(/\\\\/g, "\\");
            inst.dpDiv.find("[data-handler]").map(function() {
                var handler = {
                    prev: function() {
                        $.datepicker._adjustDate(id, -stepMonths, "M");
                    },
                    next: function() {
                        $.datepicker._adjustDate(id, +stepMonths, "M");
                    },
                    hide: function() {
                        $.datepicker._hideDatepicker();
                    },
                    today: function() {
                        $.datepicker._gotoToday(id);
                    },
                    selectDay: function() {
                        return $.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), 
                        !1;
                    },
                    selectMonth: function() {
                        return $.datepicker._selectMonthYear(id, this, "M"), !1;
                    },
                    selectYear: function() {
                        return $.datepicker._selectMonthYear(id, this, "Y"), !1;
                    }
                };
                $(this).on(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
            });
        },
        _generateHTML: function(inst) {
            var maxDraw, prevText, prev, nextText, next, currentText, gotoDate, controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin, monthNames, monthNamesShort, beforeShowDay, showOtherMonths, selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate, cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows, printDate, dRow, tbody, daySettings, otherMonth, unselectable, tempDate = new Date(), today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), isRTL = this._get(inst, "isRTL"), showButtonPanel = this._get(inst, "showButtonPanel"), hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"), navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"), numMonths = this._getNumberOfMonths(inst), showCurrentAtPos = this._get(inst, "showCurrentAtPos"), stepMonths = this._get(inst, "stepMonths"), isMultiMonth = 1 !== numMonths[0] || 1 !== numMonths[1], currentDate = this._daylightSavingAdjust(inst.currentDay ? new Date(inst.currentYear, inst.currentMonth, inst.currentDay) : new Date(9999, 9, 9)), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), drawMonth = inst.drawMonth - showCurrentAtPos, drawYear = inst.drawYear;
            if (drawMonth < 0 && (drawMonth += 12, drawYear--), maxDate) for (maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate())), 
            maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw; this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw; ) --drawMonth < 0 && (drawMonth = 11, 
            drawYear--);
            for (inst.drawMonth = drawMonth, inst.drawYear = drawYear, prevText = this._get(inst, "prevText"), 
            prevText = navigationAsDateFormat ? this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)) : prevText, 
            prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>", 
            nextText = this._get(inst, "nextText"), nextText = navigationAsDateFormat ? this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)) : nextText, 
            next = this._canAdjustMonth(inst, 1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>", 
            currentText = this._get(inst, "currentText"), gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today, 
            currentText = navigationAsDateFormat ? this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)) : currentText, 
            controls = inst.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>", 
            buttonPanel = showButtonPanel ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "", 
            firstDay = parseInt(this._get(inst, "firstDay"), 10), firstDay = isNaN(firstDay) ? 0 : firstDay, 
            showWeek = this._get(inst, "showWeek"), dayNames = this._get(inst, "dayNames"), 
            dayNamesMin = this._get(inst, "dayNamesMin"), monthNames = this._get(inst, "monthNames"), 
            monthNamesShort = this._get(inst, "monthNamesShort"), beforeShowDay = this._get(inst, "beforeShowDay"), 
            showOtherMonths = this._get(inst, "showOtherMonths"), selectOtherMonths = this._get(inst, "selectOtherMonths"), 
            defaultDate = this._getDefaultDate(inst), html = "", row = 0; row < numMonths[0]; row++) {
                for (group = "", this.maxRows = 4, col = 0; col < numMonths[1]; col++) {
                    if (selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay)), 
                    cornerClass = " ui-corner-all", calender = "", isMultiMonth) {
                        if (calender += "<div class='ui-datepicker-group", numMonths[1] > 1) switch (col) {
                          case 0:
                            calender += " ui-datepicker-group-first", cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                            break;

                          case numMonths[1] - 1:
                            calender += " ui-datepicker-group-last", cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                            break;

                          default:
                            calender += " ui-datepicker-group-middle", cornerClass = "";
                        }
                        calender += "'>";
                    }
                    for (calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && 0 === row ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && 0 === row ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + "</div><table class='ui-datepicker-calendar'><thead><tr>", 
                    thead = showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "", 
                    dow = 0; dow < 7; dow++) day = (dow + firstDay) % 7, thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
                    for (calender += thead + "</tr></thead><tbody>", daysInMonth = this._getDaysInMonth(drawYear, drawMonth), 
                    drawYear === inst.selectedYear && drawMonth === inst.selectedMonth && (inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)), 
                    leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7, curRows = Math.ceil((leadDays + daysInMonth) / 7), 
                    numRows = isMultiMonth && this.maxRows > curRows ? this.maxRows : curRows, this.maxRows = numRows, 
                    printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays)), 
                    dRow = 0; dRow < numRows; dRow++) {
                        for (calender += "<tr>", tbody = showWeek ? "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>" : "", 
                        dow = 0; dow < 7; dow++) daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [ printDate ]) : [ !0, "" ], 
                        otherMonth = printDate.getMonth() !== drawMonth, unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && printDate > maxDate, 
                        tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + (printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + (otherMonth && !showOtherMonths || !daySettings[2] ? "" : " title='" + daySettings[2].replace(/'/g, "&#39;") + "'") + (unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + "' href='#'>" + printDate.getDate() + "</a>") + "</td>", 
                        printDate.setDate(printDate.getDate() + 1), printDate = this._daylightSavingAdjust(printDate);
                        calender += tbody + "</tr>";
                    }
                    drawMonth++, drawMonth > 11 && (drawMonth = 0, drawYear++), calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col === numMonths[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), 
                    group += calender;
                }
                html += group;
            }
            return html += buttonPanel, inst._keyEvent = !1, html;
        },
        _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
            var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear, changeMonth = this._get(inst, "changeMonth"), changeYear = this._get(inst, "changeYear"), showMonthAfterYear = this._get(inst, "showMonthAfterYear"), html = "<div class='ui-datepicker-title'>", monthHtml = "";
            if (secondary || !changeMonth) monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>"; else {
                for (inMinYear = minDate && minDate.getFullYear() === drawYear, inMaxYear = maxDate && maxDate.getFullYear() === drawYear, 
                monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", 
                month = 0; month < 12; month++) (!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()) && (monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'" : "") + ">" + monthNamesShort[month] + "</option>");
                monthHtml += "</select>";
            }
            if (showMonthAfterYear || (html += monthHtml + (!secondary && changeMonth && changeYear ? "" : "&#xa0;")), 
            !inst.yearshtml) if (inst.yearshtml = "", secondary || !changeYear) html += "<span class='ui-datepicker-year'>" + drawYear + "</span>"; else {
                for (years = this._get(inst, "yearRange").split(":"), thisYear = new Date().getFullYear(), 
                determineYear = function(value) {
                    var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
                    return isNaN(year) ? thisYear : year;
                }, year = determineYear(years[0]), endYear = Math.max(year, determineYear(years[1] || "")), 
                year = minDate ? Math.max(year, minDate.getFullYear()) : year, endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear, 
                inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; year <= endYear; year++) inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'" : "") + ">" + year + "</option>";
                inst.yearshtml += "</select>", html += inst.yearshtml, inst.yearshtml = null;
            }
            return html += this._get(inst, "yearSuffix"), showMonthAfterYear && (html += (!secondary && changeMonth && changeYear ? "" : "&#xa0;") + monthHtml), 
            html += "</div>";
        },
        _adjustInstDate: function(inst, offset, period) {
            var year = inst.selectedYear + ("Y" === period ? offset : 0), month = inst.selectedMonth + ("M" === period ? offset : 0), day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + ("D" === period ? offset : 0), date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
            inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), 
            inst.drawYear = inst.selectedYear = date.getFullYear(), "M" !== period && "Y" !== period || this._notifyChange(inst);
        },
        _restrictMinMax: function(inst, date) {
            var minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), newDate = minDate && date < minDate ? minDate : date;
            return maxDate && newDate > maxDate ? maxDate : newDate;
        },
        _notifyChange: function(inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            onChange && onChange.apply(inst.input ? inst.input[0] : null, [ inst.selectedYear, inst.selectedMonth + 1, inst ]);
        },
        _getNumberOfMonths: function(inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return null == numMonths ? [ 1, 1 ] : "number" == typeof numMonths ? [ 1, numMonths ] : numMonths;
        },
        _getMinMaxDate: function(inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
        },
        _getDaysInMonth: function(year, month) {
            return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
        },
        _getFirstDayOfMonth: function(year, month) {
            return new Date(year, month, 1).getDay();
        },
        _canAdjustMonth: function(inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst), date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
            return offset < 0 && date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth())), 
            this._isInRange(inst, date);
        },
        _isInRange: function(inst, date) {
            var yearSplit, currentYear, minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), minYear = null, maxYear = null, years = this._get(inst, "yearRange");
            return years && (yearSplit = years.split(":"), currentYear = new Date().getFullYear(), 
            minYear = parseInt(yearSplit[0], 10), maxYear = parseInt(yearSplit[1], 10), yearSplit[0].match(/[+\-].*/) && (minYear += currentYear), 
            yearSplit[1].match(/[+\-].*/) && (maxYear += currentYear)), (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear);
        },
        _getFormatConfig: function(inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            return shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10), 
            {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            };
        },
        _formatDate: function(inst, day, month, year) {
            day || (inst.currentDay = inst.selectedDay, inst.currentMonth = inst.selectedMonth, 
            inst.currentYear = inst.selectedYear);
            var date = day ? "object" == typeof day ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
        }
    }), $.fn.datepicker = function(options) {
        if (!this.length) return this;
        $.datepicker.initialized || ($(document).on("mousedown", $.datepicker._checkExternalClick), 
        $.datepicker.initialized = !0), 0 === $("#" + $.datepicker._mainDivId).length && $("body").append($.datepicker.dpDiv);
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof options || "isDisabled" !== options && "getDate" !== options && "widget" !== options ? "option" === options && 2 === arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this[0] ].concat(otherArgs)) : this.each(function() {
            "string" == typeof options ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this ].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
        }) : $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this[0] ].concat(otherArgs));
    }, $.datepicker = new Datepicker(), $.datepicker.initialized = !1, $.datepicker.uuid = new Date().getTime(), 
    $.datepicker.version = "1.12.1";
    var datepicker = $.datepicker;
    datepicker.regional.es = {
        closeText: "Cerrar",
        prevText: "&#x3C;Ant",
        nextText: "Sig&#x3E;",
        currentText: "Hoy",
        monthNames: [ "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre" ],
        monthNamesShort: [ "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic" ],
        dayNames: [ "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado" ],
        dayNamesShort: [ "dom", "lun", "mar", "mié", "jue", "vie", "sáb" ],
        dayNamesMin: [ "D", "L", "M", "X", "J", "V", "S" ],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    }, datepicker.setDefaults(datepicker.regional.es), widget("ui.rotatable", mouse, {
        options: {
            handle: !1,
            angle: !1,
            start: null,
            rotate: null,
            stop: null
        },
        handle: function(_handle) {
            if (void 0 === _handle) return this.options.handle;
            this.options.handle = _handle;
        },
        angle: function(_angle) {
            if (void 0 === _angle) return this.options.angle;
            this.options.angle = _angle, this.performRotation(this.options.angle);
        },
        _create: function() {
            var handle;
            this.options.handle ? handle = this.options.handle : (handle = $(document.createElement("div")), 
            handle.addClass("ui-rotatable-handle")), this.listeners = {
                rotateElement: $.proxy(this.rotateElement, this),
                startRotate: $.proxy(this.startRotate, this),
                stopRotate: $.proxy(this.stopRotate, this)
            }, handle.draggable({
                helper: "clone",
                start: this.dragStart,
                handle: handle
            }), handle.appendTo(this.element), handle.on("mousedown", this.listeners.startRotate), 
            !1 !== this.options.angle ? (this.elementCurrentAngle = this.options.angle, this.performRotation(this.elementCurrentAngle)) : this.elementCurrentAngle = 0;
        },
        _destroy: function() {
            this.element.removeClass("ui-rotatable"), this.element.find(".ui-rotatable-handle").remove();
        },
        performRotation: function(angle) {
            this.element.css("transform", "rotate(" + angle + "rad)"), this.element.css("-moz-transform", "rotate(" + angle + "rad)"), 
            this.element.css("-webkit-transform", "rotate(" + angle + "rad)"), this.element.css("-o-transform", "rotate(" + angle + "rad)");
        },
        getElementOffset: function() {
            this.performRotation(0);
            var offset = this.element.offset();
            return this.performRotation(this.elementCurrentAngle), offset;
        },
        getElementCenter: function() {
            var elementOffset = this.getElementOffset();
            return [ elementOffset.left + this.element.width() / 2, elementOffset.top + this.element.height() / 2 ];
        },
        dragStart: function(event) {
            if (this.element) return !1;
        },
        startRotate: function(event) {
            var center = this.getElementCenter(), startXFromCenter = event.pageX - center[0], startYFromCenter = event.pageY - center[1];
            return this.mouseStartAngle = Math.atan2(startYFromCenter, startXFromCenter), this.elementStartAngle = this.elementCurrentAngle, 
            this.hasRotated = !1, this._propagate("start", event), $(document).on("mousemove", this.listeners.rotateElement), 
            $(document).on("mouseup", this.listeners.stopRotate), !1;
        },
        rotateElement: function(event) {
            if (!this.element) return !1;
            var center = this.getElementCenter(), xFromCenter = event.pageX - center[0], yFromCenter = event.pageY - center[1], mouseAngle = Math.atan2(yFromCenter, xFromCenter), rotateAngle = mouseAngle - this.mouseStartAngle + this.elementStartAngle;
            this.performRotation(rotateAngle), this.element.data("angle", rotateAngle);
            var previousRotateAngle = this.elementCurrentAngle;
            return this.elementCurrentAngle = rotateAngle, this._propagate("rotate", event), 
            previousRotateAngle !== rotateAngle && (this._trigger("rotate", event, this.ui()), 
            this.hasRotated = !0), !1;
        },
        stopRotate: function(event) {
            if (this.element) return $(document).off("mousemove", this.listeners.rotateElement), 
            $(document).off("mouseup", this.listeners.stopRotate), this.elementStopAngle = this.elementCurrentAngle, 
            this.hasRotated && this._propagate("stop", event), setTimeout(function() {
                this.element = !1;
            }, 10), !1;
        },
        _propagate: function(n, event) {
            plugin.call(this, n, [ event, this.ui() ]), "rotate" !== n && this._trigger(n, event, this.ui());
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
    $.ui.rotatable;
    widget("ui.droppable", {
        version: "1.12.0",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            addClasses: !0,
            greedy: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var proportions, o = this.options, accept = o.accept;
            this.isover = !1, this.isout = !0, this.accept = $.isFunction(accept) ? accept : function(d) {
                return d.is(accept);
            }, this.proportions = function() {
                if (!arguments.length) return proportions || (proportions = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                });
                proportions = arguments[0];
            }, this._addToManager(o.scope), o.addClasses && this._addClass("ui-droppable");
        },
        _addToManager: function(scope) {
            $.ui.ddmanager.droppables[scope] = $.ui.ddmanager.droppables[scope] || [], $.ui.ddmanager.droppables[scope].push(this);
        },
        _splice: function(drop) {
            for (var i = 0; i < drop.length; i++) drop[i] === this && drop.splice(i, 1);
        },
        _destroy: function() {
            var drop = $.ui.ddmanager.droppables[this.options.scope];
            this._splice(drop);
        },
        _setOption: function(key, value) {
            if ("accept" === key) this.accept = $.isFunction(value) ? value : function(d) {
                return d.is(value);
            }; else if ("scope" === key) {
                var drop = $.ui.ddmanager.droppables[this.options.scope];
                this._splice(drop), this._addToManager(value);
            }
            this._super(key, value);
        },
        _activate: function(event) {
            var draggable$$1 = $.ui.ddmanager.current;
            this._addActiveClass(), draggable$$1 && this._trigger("activate", event, this.ui(draggable$$1));
        },
        _deactivate: function(event) {
            var draggable$$1 = $.ui.ddmanager.current;
            this._removeActiveClass(), draggable$$1 && this._trigger("deactivate", event, this.ui(draggable$$1));
        },
        _over: function(event) {
            var draggable$$1 = $.ui.ddmanager.current;
            draggable$$1 && (draggable$$1.currentItem || draggable$$1.element)[0] !== this.element[0] && this.accept.call(this.element[0], draggable$$1.currentItem || draggable$$1.element) && (this._addHoverClass(), 
            this._trigger("over", event, this.ui(draggable$$1)));
        },
        _out: function(event) {
            var draggable$$1 = $.ui.ddmanager.current;
            draggable$$1 && (draggable$$1.currentItem || draggable$$1.element)[0] !== this.element[0] && this.accept.call(this.element[0], draggable$$1.currentItem || draggable$$1.element) && (this._removeHoverClass(), 
            this._trigger("out", event, this.ui(draggable$$1)));
        },
        _drop: function(event, custom) {
            var draggable$$1 = custom || $.ui.ddmanager.current, childrenIntersection = !1;
            return !(!draggable$$1 || (draggable$$1.currentItem || draggable$$1.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var inst = $(this).droppable("instance");
                if (inst.options.greedy && !inst.options.disabled && inst.options.scope === draggable$$1.options.scope && inst.accept.call(inst.element[0], draggable$$1.currentItem || draggable$$1.element) && intersect(draggable$$1, $.extend(inst, {
                    offset: inst.element.offset()
                }), inst.options.tolerance, event)) return childrenIntersection = !0, !1;
            }), !childrenIntersection && (!!this.accept.call(this.element[0], draggable$$1.currentItem || draggable$$1.element) && (this._removeActiveClass(), 
            this._removeHoverClass(), this._trigger("drop", event, this.ui(draggable$$1)), this.element)));
        },
        ui: function(c) {
            return {
                draggable: c.currentItem || c.element,
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
    }), $.ui.ddmanager = {
        current: null,
        droppables: {
            default: []
        },
        prepareOffsets: function(t, event) {
            var i, j, m = $.ui.ddmanager.droppables[t.options.scope] || [], type = event ? event.type : null, list = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
            droppablesLoop: for (i = 0; i < m.length; i++) if (!(m[i].options.disabled || t && !m[i].accept.call(m[i].element[0], t.currentItem || t.element))) {
                for (j = 0; j < list.length; j++) if (list[j] === m[i].element[0]) {
                    m[i].proportions().height = 0;
                    continue droppablesLoop;
                }
                m[i].visible = "none" !== m[i].element.css("display"), m[i].visible && ("mousedown" === type && m[i]._activate.call(m[i], event), 
                m[i].offset = m[i].element.offset(), m[i].proportions({
                    width: m[i].element[0].offsetWidth,
                    height: m[i].element[0].offsetHeight
                }));
            }
        },
        drop: function(draggable$$1, event) {
            var dropped = !1;
            return $.each(($.ui.ddmanager.droppables[draggable$$1.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && intersect(draggable$$1, this, this.options.tolerance, event) && (dropped = this._drop.call(this, event) || dropped), 
                !this.options.disabled && this.visible && this.accept.call(this.element[0], draggable$$1.currentItem || draggable$$1.element) && (this.isout = !0, 
                this.isover = !1, this._deactivate.call(this, event)));
            }), dropped;
        },
        dragStart: function(draggable$$1, event) {
            draggable$$1.element.parentsUntil("body").on("scroll.droppable", function() {
                draggable$$1.options.refreshPositions || $.ui.ddmanager.prepareOffsets(draggable$$1, event);
            });
        },
        drag: function(draggable$$1, event) {
            draggable$$1.options.refreshPositions && $.ui.ddmanager.prepareOffsets(draggable$$1, event), 
            $.each($.ui.ddmanager.droppables[draggable$$1.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var parentInstance, scope, parent, intersects = intersect(draggable$$1, this, this.options.tolerance, event), c = !intersects && this.isover ? "isout" : intersects && !this.isover ? "isover" : null;
                    c && (this.options.greedy && (scope = this.options.scope, parent = this.element.parents(":data(ui-droppable)").filter(function() {
                        return $(this).droppable("instance").options.scope === scope;
                    }), parent.length && (parentInstance = $(parent[0]).droppable("instance"), parentInstance.greedyChild = "isover" === c)), 
                    parentInstance && "isover" === c && (parentInstance.isover = !1, parentInstance.isout = !0, 
                    parentInstance._out.call(parentInstance, event)), this[c] = !0, this["isout" === c ? "isover" : "isout"] = !1, 
                    this["isover" === c ? "_over" : "_out"].call(this, event), parentInstance && "isout" === c && (parentInstance.isout = !1, 
                    parentInstance.isover = !0, parentInstance._over.call(parentInstance, event)));
                }
            });
        },
        dragStop: function(draggable$$1, event) {
            draggable$$1.element.parentsUntil("body").off("scroll.droppable"), draggable$$1.options.refreshPositions || $.ui.ddmanager.prepareOffsets(draggable$$1, event);
        }
    };
    $.ui.droppable;
    widget("ui.resizable", mouse, {
        version: "1.12.0",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            classes: {
                "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
            },
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
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
            if ("hidden" === $(el).css("overflow")) return !1;
            var scroll = a && "left" === a ? "scrollLeft" : "scrollTop", has = !1;
            return el[scroll] > 0 || (el[scroll] = 1, has = el[scroll] > 0, el[scroll] = 0, 
            has);
        },
        _create: function() {
            var margins, o = this.options, that = this;
            this._addClass("ui-resizable"), $.extend(this, {
                _aspectRatio: !!o.aspectRatio,
                aspectRatio: o.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap($("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), 
            this.elementIsWrapper = !0, margins = {
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom"),
                marginLeft: this.originalElement.css("marginLeft")
            }, this.element.css(margins), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), 
            this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css(margins), this._proportionallyResize()), this._setupHandles(), 
            o.autoHide && $(this.element).on("mouseenter", function() {
                o.disabled || (that._removeClass("ui-resizable-autohide"), that._handles.show());
            }).on("mouseleave", function() {
                o.disabled || that.resizing || (that._addClass("ui-resizable-autohide"), that._handles.hide());
            }), this._mouseInit();
        },
        _destroy: function() {
            this._mouseDestroy();
            var wrapper, _destroy = function(exp) {
                $(exp).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove();
            };
            return this.elementIsWrapper && (_destroy(this.element), wrapper = this.element, 
            this.originalElement.css({
                position: wrapper.css("position"),
                width: wrapper.outerWidth(),
                height: wrapper.outerHeight(),
                top: wrapper.css("top"),
                left: wrapper.css("left")
            }).insertAfter(wrapper), wrapper.remove()), this.originalElement.css("resize", this.originalResizeStyle), 
            _destroy(this.originalElement), this;
        },
        _setOption: function(key, value) {
            switch (this._super(key, value), key) {
              case "handles":
                this._removeHandles(), this._setupHandles();
            }
        },
        _setupHandles: function() {
            var handle, i, n, hname, axis, o = this.options, that = this;
            if (this.handles = o.handles || ($(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"), this._handles = $(), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), 
            n = this.handles.split(","), this.handles = {}, i = 0; i < n.length; i++) handle = $.trim(n[i]), 
            hname = "ui-resizable-" + handle, axis = $("<div>"), this._addClass(axis, "ui-resizable-handle " + hname), 
            axis.css({
                zIndex: o.zIndex
            }), this.handles[handle] = ".ui-resizable-" + handle, this.element.append(axis);
            this._renderAxis = function(target) {
                var i, axis, padPos, padWrapper;
                target = target || this.element;
                for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = $(this.handles[i]), 
                this._on(this.handles[i], {
                    mousedown: that._mouseDown
                })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (axis = $(this.handles[i], this.element), 
                padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth(), 
                padPos = [ "padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left" ].join(""), 
                target.css(padPos, padWrapper), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i]);
            }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), 
            this._handles.disableSelection(), this._handles.on("mouseover", function() {
                that.resizing || (this.className && (axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), 
                that.axis = axis && axis[1] ? axis[1] : "se");
            }), o.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"));
        },
        _removeHandles: function() {
            this._handles.remove();
        },
        _mouseCapture: function(event) {
            var i, handle, capture = !1;
            for (i in this.handles) ((handle = $(this.handles[i])[0]) === event.target || $.contains(handle, event.target)) && (capture = !0);
            return !this.options.disabled && capture;
        },
        _mouseStart: function(event) {
            var curleft, curtop, cursor, o = this.options, el = this.element;
            return this.resizing = !0, this._renderProxy(), curleft = this._num(this.helper.css("left")), 
            curtop = this._num(this.helper.css("top")), o.containment && (curleft += $(o.containment).scrollLeft() || 0, 
            curtop += $(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), 
            this.position = {
                left: curleft,
                top: curtop
            }, this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: el.width(),
                height: el.height()
            }, this.originalSize = this._helper ? {
                width: el.outerWidth(),
                height: el.outerHeight()
            } : {
                width: el.width(),
                height: el.height()
            }, this.sizeDiff = {
                width: el.outerWidth() - el.width(),
                height: el.outerHeight() - el.height()
            }, this.originalPosition = {
                left: curleft,
                top: curtop
            }, this.originalMousePosition = {
                left: event.pageX,
                top: event.pageY
            }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, 
            cursor = $(".ui-resizable-" + this.axis).css("cursor"), $("body").css("cursor", "auto" === cursor ? this.axis + "-resize" : cursor), 
            this._addClass("ui-resizable-resizing"), this._propagate("start", event), !0;
        },
        _mouseDrag: function(event) {
            var data, props, smp = this.originalMousePosition, a = this.axis, dx = event.pageX - smp.left || 0, dy = event.pageY - smp.top || 0, trigger = this._change[a];
            return this._updatePrevProperties(), !!trigger && (data = trigger.apply(this, [ event, dx, dy ]), 
            this._updateVirtualBoundaries(event.shiftKey), (this._aspectRatio || event.shiftKey) && (data = this._updateRatio(data, event)), 
            data = this._respectSize(data, event), this._updateCache(data), this._propagate("resize", event), 
            props = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), 
            $.isEmptyObject(props) || (this._updatePrevProperties(), this._trigger("resize", event, this.ui()), 
            this._applyChanges()), !1);
        },
        _mouseStop: function(event) {
            this.resizing = !1;
            var pr, ista, soffseth, soffsetw, s, left, top, o = this.options, that = this;
            return this._helper && (pr = this._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName), 
            soffseth = ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height, soffsetw = ista ? 0 : that.sizeDiff.width, 
            s = {
                width: that.helper.width() - soffsetw,
                height: that.helper.height() - soffseth
            }, left = parseFloat(that.element.css("left")) + (that.position.left - that.originalPosition.left) || null, 
            top = parseFloat(that.element.css("top")) + (that.position.top - that.originalPosition.top) || null, 
            o.animate || this.element.css($.extend(s, {
                top: top,
                left: left
            })), that.helper.height(that.size.height), that.helper.width(that.size.width), this._helper && !o.animate && this._proportionallyResize()), 
            $("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", event), 
            this._helper && this.helper.remove(), !1;
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            }, this.prevSize = {
                width: this.size.width,
                height: this.size.height
            };
        },
        _applyChanges: function() {
            var props = {};
            return this.position.top !== this.prevPosition.top && (props.top = this.position.top + "px"), 
            this.position.left !== this.prevPosition.left && (props.left = this.position.left + "px"), 
            this.size.width !== this.prevSize.width && (props.width = this.size.width + "px"), 
            this.size.height !== this.prevSize.height && (props.height = this.size.height + "px"), 
            this.helper.css(props), props;
        },
        _updateVirtualBoundaries: function(forceAspectRatio) {
            var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b, o = this.options;
            b = {
                minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
                maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : 1 / 0,
                minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
                maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : 1 / 0
            }, (this._aspectRatio || forceAspectRatio) && (pMinWidth = b.minHeight * this.aspectRatio, 
            pMinHeight = b.minWidth / this.aspectRatio, pMaxWidth = b.maxHeight * this.aspectRatio, 
            pMaxHeight = b.maxWidth / this.aspectRatio, pMinWidth > b.minWidth && (b.minWidth = pMinWidth), 
            pMinHeight > b.minHeight && (b.minHeight = pMinHeight), pMaxWidth < b.maxWidth && (b.maxWidth = pMaxWidth), 
            pMaxHeight < b.maxHeight && (b.maxHeight = pMaxHeight)), this._vBoundaries = b;
        },
        _updateCache: function(data) {
            this.offset = this.helper.offset(), this._isNumber(data.left) && (this.position.left = data.left), 
            this._isNumber(data.top) && (this.position.top = data.top), this._isNumber(data.height) && (this.size.height = data.height), 
            this._isNumber(data.width) && (this.size.width = data.width);
        },
        _updateRatio: function(data) {
            var cpos = this.position, csize = this.size, a = this.axis;
            return this._isNumber(data.height) ? data.width = data.height * this.aspectRatio : this._isNumber(data.width) && (data.height = data.width / this.aspectRatio), 
            "sw" === a && (data.left = cpos.left + (csize.width - data.width), data.top = null), 
            "nw" === a && (data.top = cpos.top + (csize.height - data.height), data.left = cpos.left + (csize.width - data.width)), 
            data;
        },
        _respectSize: function(data) {
            var o = this._vBoundaries, a = this.axis, ismaxw = this._isNumber(data.width) && o.maxWidth && o.maxWidth < data.width, ismaxh = this._isNumber(data.height) && o.maxHeight && o.maxHeight < data.height, isminw = this._isNumber(data.width) && o.minWidth && o.minWidth > data.width, isminh = this._isNumber(data.height) && o.minHeight && o.minHeight > data.height, dw = this.originalPosition.left + this.originalSize.width, dh = this.originalPosition.top + this.originalSize.height, cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
            return isminw && (data.width = o.minWidth), isminh && (data.height = o.minHeight), 
            ismaxw && (data.width = o.maxWidth), ismaxh && (data.height = o.maxHeight), isminw && cw && (data.left = dw - o.minWidth), 
            ismaxw && cw && (data.left = dw - o.maxWidth), isminh && ch && (data.top = dh - o.minHeight), 
            ismaxh && ch && (data.top = dh - o.maxHeight), data.width || data.height || data.left || !data.top ? data.width || data.height || data.top || !data.left || (data.left = null) : data.top = null, 
            data;
        },
        _getPaddingPlusBorderDimensions: function(element) {
            for (var i = 0, widths = [], borders = [ element.css("borderTopWidth"), element.css("borderRightWidth"), element.css("borderBottomWidth"), element.css("borderLeftWidth") ], paddings = [ element.css("paddingTop"), element.css("paddingRight"), element.css("paddingBottom"), element.css("paddingLeft") ]; i < 4; i++) widths[i] = parseFloat(borders[i]) || 0, 
            widths[i] += parseFloat(paddings[i]) || 0;
            return {
                height: widths[0] + widths[2],
                width: widths[1] + widths[3]
            };
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) for (var prel, i = 0, element = this.helper || this.element; i < this._proportionallyResizeElements.length; i++) prel = this._proportionallyResizeElements[i], 
            this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(prel)), 
            prel.css({
                height: element.height() - this.outerDimensions.height || 0,
                width: element.width() - this.outerDimensions.width || 0
            });
        },
        _renderProxy: function() {
            var el = this.element, o = this.options;
            this.elementOffset = el.offset(), this._helper ? (this.helper = this.helper || $("<div style='overflow:hidden;'></div>"), 
            this._addClass(this.helper, this._helper), this.helper.css({
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++o.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element;
        },
        _change: {
            e: function(event, dx) {
                return {
                    width: this.originalSize.width + dx
                };
            },
            w: function(event, dx) {
                var cs = this.originalSize;
                return {
                    left: this.originalPosition.left + dx,
                    width: cs.width - dx
                };
            },
            n: function(event, dx, dy) {
                var cs = this.originalSize;
                return {
                    top: this.originalPosition.top + dy,
                    height: cs.height - dy
                };
            },
            s: function(event, dx, dy) {
                return {
                    height: this.originalSize.height + dy
                };
            },
            se: function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [ event, dx, dy ]));
            },
            sw: function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [ event, dx, dy ]));
            },
            ne: function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [ event, dx, dy ]));
            },
            nw: function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [ event, dx, dy ]));
            }
        },
        _propagate: function(n, event) {
            plugin.call(this, n, [ event, this.ui() ]), "resize" !== n && this._trigger(n, event, this.ui());
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
    }), plugin.add("resizable", "animate", {
        stop: function(event) {
            var that = $(this).resizable("instance"), o = that.options, pr = that._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName), soffseth = ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height, soffsetw = ista ? 0 : that.sizeDiff.width, style = {
                width: that.size.width - soffsetw,
                height: that.size.height - soffseth
            }, left = parseFloat(that.element.css("left")) + (that.position.left - that.originalPosition.left) || null, top = parseFloat(that.element.css("top")) + (that.position.top - that.originalPosition.top) || null;
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
                    pr && pr.length && $(pr[0]).css({
                        width: data.width,
                        height: data.height
                    }), that._updateCache(data), that._propagate("resize", event);
                }
            });
        }
    }), plugin.add("resizable", "containment", {
        start: function() {
            var element, p, co, ch, cw, width, height, that = $(this).resizable("instance"), o = that.options, el = that.element, oc = o.containment, ce = oc instanceof $ ? oc.get(0) : /parent/.test(oc) ? el.parent().get(0) : oc;
            ce && (that.containerElement = $(ce), /document/.test(oc) || oc === document ? (that.containerOffset = {
                left: 0,
                top: 0
            }, that.containerPosition = {
                left: 0,
                top: 0
            }, that.parentData = {
                element: $(document),
                left: 0,
                top: 0,
                width: $(document).width(),
                height: $(document).height() || document.body.parentNode.scrollHeight
            }) : (element = $(ce), p = [], $([ "Top", "Right", "Left", "Bottom" ]).each(function(i, name) {
                p[i] = that._num(element.css("padding" + name));
            }), that.containerOffset = element.offset(), that.containerPosition = element.position(), 
            that.containerSize = {
                height: element.innerHeight() - p[3],
                width: element.innerWidth() - p[1]
            }, co = that.containerOffset, ch = that.containerSize.height, cw = that.containerSize.width, 
            width = that._hasScroll(ce, "left") ? ce.scrollWidth : cw, height = that._hasScroll(ce) ? ce.scrollHeight : ch, 
            that.parentData = {
                element: ce,
                left: co.left,
                top: co.top,
                width: width,
                height: height
            }));
        },
        resize: function(event) {
            var woset, hoset, isParent, isOffsetRelative, that = $(this).resizable("instance"), o = that.options, co = that.containerOffset, cp = that.position, pRatio = that._aspectRatio || event.shiftKey, cop = {
                top: 0,
                left: 0
            }, ce = that.containerElement, continueResize = !0;
            ce[0] !== document && /static/.test(ce.css("position")) && (cop = co), cp.left < (that._helper ? co.left : 0) && (that.size.width = that.size.width + (that._helper ? that.position.left - co.left : that.position.left - cop.left), 
            pRatio && (that.size.height = that.size.width / that.aspectRatio, continueResize = !1), 
            that.position.left = o.helper ? co.left : 0), cp.top < (that._helper ? co.top : 0) && (that.size.height = that.size.height + (that._helper ? that.position.top - co.top : that.position.top), 
            pRatio && (that.size.width = that.size.height * that.aspectRatio, continueResize = !1), 
            that.position.top = that._helper ? co.top : 0), isParent = that.containerElement.get(0) === that.element.parent().get(0), 
            isOffsetRelative = /relative|absolute/.test(that.containerElement.css("position")), 
            isParent && isOffsetRelative ? (that.offset.left = that.parentData.left + that.position.left, 
            that.offset.top = that.parentData.top + that.position.top) : (that.offset.left = that.element.offset().left, 
            that.offset.top = that.element.offset().top), woset = Math.abs(that.sizeDiff.width + (that._helper ? that.offset.left - cop.left : that.offset.left - co.left)), 
            hoset = Math.abs(that.sizeDiff.height + (that._helper ? that.offset.top - cop.top : that.offset.top - co.top)), 
            woset + that.size.width >= that.parentData.width && (that.size.width = that.parentData.width - woset, 
            pRatio && (that.size.height = that.size.width / that.aspectRatio, continueResize = !1)), 
            hoset + that.size.height >= that.parentData.height && (that.size.height = that.parentData.height - hoset, 
            pRatio && (that.size.width = that.size.height * that.aspectRatio, continueResize = !1)), 
            continueResize || (that.position.left = that.prevPosition.left, that.position.top = that.prevPosition.top, 
            that.size.width = that.prevSize.width, that.size.height = that.prevSize.height);
        },
        stop: function() {
            var that = $(this).resizable("instance"), o = that.options, co = that.containerOffset, cop = that.containerPosition, ce = that.containerElement, helper = $(that.helper), ho = helper.offset(), w = helper.outerWidth() - that.sizeDiff.width, h = helper.outerHeight() - that.sizeDiff.height;
            that._helper && !o.animate && /relative/.test(ce.css("position")) && $(this).css({
                left: ho.left - cop.left - co.left,
                width: w,
                height: h
            }), that._helper && !o.animate && /static/.test(ce.css("position")) && $(this).css({
                left: ho.left - cop.left - co.left,
                width: w,
                height: h
            });
        }
    }), plugin.add("resizable", "alsoResize", {
        start: function() {
            var that = $(this).resizable("instance"), o = that.options;
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
        resize: function(event, ui$$1) {
            var that = $(this).resizable("instance"), o = that.options, os = that.originalSize, op = that.originalPosition, delta = {
                height: that.size.height - os.height || 0,
                width: that.size.width - os.width || 0,
                top: that.position.top - op.top || 0,
                left: that.position.left - op.left || 0
            };
            $(o.alsoResize).each(function() {
                var el = $(this), start = $(this).data("ui-resizable-alsoresize"), style = {}, css = el.parents(ui$$1.originalElement[0]).length ? [ "width", "height" ] : [ "width", "height", "top", "left" ];
                $.each(css, function(i, prop) {
                    var sum = (start[prop] || 0) + (delta[prop] || 0);
                    sum && sum >= 0 && (style[prop] = sum || null);
                }), el.css(style);
            });
        },
        stop: function() {
            $(this).removeData("ui-resizable-alsoresize");
        }
    }), plugin.add("resizable", "ghost", {
        start: function() {
            var that = $(this).resizable("instance"), cs = that.size;
            that.ghost = that.originalElement.clone(), that.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: cs.height,
                width: cs.width,
                margin: 0,
                left: 0,
                top: 0
            }), that._addClass(that.ghost, "ui-resizable-ghost"), !1 !== $.uiBackCompat && "string" == typeof that.options.ghost && that.ghost.addClass(this.options.ghost), 
            that.ghost.appendTo(that.helper);
        },
        resize: function() {
            var that = $(this).resizable("instance");
            that.ghost && that.ghost.css({
                position: "relative",
                height: that.size.height,
                width: that.size.width
            });
        },
        stop: function() {
            var that = $(this).resizable("instance");
            that.ghost && that.helper && that.helper.get(0).removeChild(that.ghost.get(0));
        }
    }), plugin.add("resizable", "grid", {
        resize: function() {
            var outerDimensions, that = $(this).resizable("instance"), o = that.options, cs = that.size, os = that.originalSize, op = that.originalPosition, a = that.axis, grid = "number" == typeof o.grid ? [ o.grid, o.grid ] : o.grid, gridX = grid[0] || 1, gridY = grid[1] || 1, ox = Math.round((cs.width - os.width) / gridX) * gridX, oy = Math.round((cs.height - os.height) / gridY) * gridY, newWidth = os.width + ox, newHeight = os.height + oy, isMaxWidth = o.maxWidth && o.maxWidth < newWidth, isMaxHeight = o.maxHeight && o.maxHeight < newHeight, isMinWidth = o.minWidth && o.minWidth > newWidth, isMinHeight = o.minHeight && o.minHeight > newHeight;
            o.grid = grid, isMinWidth && (newWidth += gridX), isMinHeight && (newHeight += gridY), 
            isMaxWidth && (newWidth -= gridX), isMaxHeight && (newHeight -= gridY), /^(se|s|e)$/.test(a) ? (that.size.width = newWidth, 
            that.size.height = newHeight) : /^(ne)$/.test(a) ? (that.size.width = newWidth, 
            that.size.height = newHeight, that.position.top = op.top - oy) : /^(sw)$/.test(a) ? (that.size.width = newWidth, 
            that.size.height = newHeight, that.position.left = op.left - ox) : ((newHeight - gridY <= 0 || newWidth - gridX <= 0) && (outerDimensions = that._getPaddingPlusBorderDimensions(this)), 
            newHeight - gridY > 0 ? (that.size.height = newHeight, that.position.top = op.top - oy) : (newHeight = gridY - outerDimensions.height, 
            that.size.height = newHeight, that.position.top = op.top + os.height - newHeight), 
            newWidth - gridX > 0 ? (that.size.width = newWidth, that.position.left = op.left - ox) : (newWidth = gridX - outerDimensions.width, 
            that.size.width = newWidth, that.position.left = op.left + os.width - newWidth));
        }
    });
    $.ui.resizable;
    widget("ui.selectable", mouse, {
        version: "1.12.0",
        options: {
            appendTo: "body",
            autoRefresh: !0,
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
            this._addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                that.elementPos = $(that.element[0]).offset(), that.selectees = $(that.options.filter, that.element[0]), 
                that._addClass(that.selectees, "ui-selectee"), that.selectees.each(function() {
                    var $this = $(this), selecteeOffset = $this.offset(), pos = {
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
                        startselected: !1,
                        selected: $this.hasClass("ui-selected"),
                        selecting: $this.hasClass("ui-selecting"),
                        unselecting: $this.hasClass("ui-unselecting")
                    });
                });
            }, this.refresh(), this._mouseInit(), this.helper = $("<div>"), this._addClass(this.helper, "ui-selectable-helper");
        },
        _destroy: function() {
            this.selectees.removeData("selectable-item"), this._mouseDestroy();
        },
        _mouseStart: function(event) {
            var that = this, options = this.options;
            this.opos = [ event.pageX, event.pageY ], this.elementPos = $(this.element[0]).offset(), 
            this.options.disabled || (this.selectees = $(options.filter, this.element[0]), this._trigger("start", event), 
            $(options.appendTo).append(this.helper), this.helper.css({
                left: event.pageX,
                top: event.pageY,
                width: 0,
                height: 0
            }), options.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.startselected = !0, event.metaKey || event.ctrlKey || (that._removeClass(selectee.$element, "ui-selected"), 
                selectee.selected = !1, that._addClass(selectee.$element, "ui-unselecting"), selectee.unselecting = !0, 
                that._trigger("unselecting", event, {
                    unselecting: selectee.element
                }));
            }), $(event.target).parents().addBack().each(function() {
                var doSelect, selectee = $.data(this, "selectable-item");
                if (selectee) return doSelect = !event.metaKey && !event.ctrlKey || !selectee.$element.hasClass("ui-selected"), 
                that._removeClass(selectee.$element, doSelect ? "ui-unselecting" : "ui-selected")._addClass(selectee.$element, doSelect ? "ui-selecting" : "ui-unselecting"), 
                selectee.unselecting = !doSelect, selectee.selecting = doSelect, selectee.selected = doSelect, 
                doSelect ? that._trigger("selecting", event, {
                    selecting: selectee.element
                }) : that._trigger("unselecting", event, {
                    unselecting: selectee.element
                }), !1;
            }));
        },
        _mouseDrag: function(event) {
            if (this.dragged = !0, !this.options.disabled) {
                var tmp, that = this, options = this.options, x1 = this.opos[0], y1 = this.opos[1], x2 = event.pageX, y2 = event.pageY;
                return x1 > x2 && (tmp = x2, x2 = x1, x1 = tmp), y1 > y2 && (tmp = y2, y2 = y1, 
                y1 = tmp), this.helper.css({
                    left: x1,
                    top: y1,
                    width: x2 - x1,
                    height: y2 - y1
                }), this.selectees.each(function() {
                    var selectee = $.data(this, "selectable-item"), hit = !1, offset = {};
                    selectee && selectee.element !== that.element[0] && (offset.left = selectee.left + that.elementPos.left, 
                    offset.right = selectee.right + that.elementPos.left, offset.top = selectee.top + that.elementPos.top, 
                    offset.bottom = selectee.bottom + that.elementPos.top, "touch" === options.tolerance ? hit = !(offset.left > x2 || offset.right < x1 || offset.top > y2 || offset.bottom < y1) : "fit" === options.tolerance && (hit = offset.left > x1 && offset.right < x2 && offset.top > y1 && offset.bottom < y2), 
                    hit ? (selectee.selected && (that._removeClass(selectee.$element, "ui-selected"), 
                    selectee.selected = !1), selectee.unselecting && (that._removeClass(selectee.$element, "ui-unselecting"), 
                    selectee.unselecting = !1), selectee.selecting || (that._addClass(selectee.$element, "ui-selecting"), 
                    selectee.selecting = !0, that._trigger("selecting", event, {
                        selecting: selectee.element
                    }))) : (selectee.selecting && ((event.metaKey || event.ctrlKey) && selectee.startselected ? (that._removeClass(selectee.$element, "ui-selecting"), 
                    selectee.selecting = !1, that._addClass(selectee.$element, "ui-selected"), selectee.selected = !0) : (that._removeClass(selectee.$element, "ui-selecting"), 
                    selectee.selecting = !1, selectee.startselected && (that._addClass(selectee.$element, "ui-unselecting"), 
                    selectee.unselecting = !0), that._trigger("unselecting", event, {
                        unselecting: selectee.element
                    }))), selectee.selected && (event.metaKey || event.ctrlKey || selectee.startselected || (that._removeClass(selectee.$element, "ui-selected"), 
                    selectee.selected = !1, that._addClass(selectee.$element, "ui-unselecting"), selectee.unselecting = !0, 
                    that._trigger("unselecting", event, {
                        unselecting: selectee.element
                    })))));
                }), !1;
            }
        },
        _mouseStop: function(event) {
            var that = this;
            return this.dragged = !1, $(".ui-unselecting", this.element[0]).each(function() {
                var selectee = $.data(this, "selectable-item");
                that._removeClass(selectee.$element, "ui-unselecting"), selectee.unselecting = !1, 
                selectee.startselected = !1, that._trigger("unselected", event, {
                    unselected: selectee.element
                });
            }), $(".ui-selecting", this.element[0]).each(function() {
                var selectee = $.data(this, "selectable-item");
                that._removeClass(selectee.$element, "ui-selecting")._addClass(selectee.$element, "ui-selected"), 
                selectee.selecting = !1, selectee.selected = !0, selectee.startselected = !0, that._trigger("selected", event, {
                    selected: selectee.element
                });
            }), this._trigger("stop", event), this.helper.remove(), !1;
        }
    });
    $.ui.selectable;
    widget("ui.sortable", mouse, {
        version: "1.12.0",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
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
            return x >= reference && x < reference + size;
        },
        _isFloating: function(item) {
            return /left|right/.test(item.css("float")) || /inline|table-cell/.test(item.css("display"));
        },
        _create: function() {
            this.containerCache = {}, this._addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), 
            this._mouseInit(), this._setHandleClassName(), this.ready = !0;
        },
        _setOption: function(key, value) {
            this._super(key, value), "handle" === key && this._setHandleClassName();
        },
        _setHandleClassName: function() {
            var that = this;
            this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"), 
            $.each(this.items, function() {
                that._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle");
            });
        },
        _destroy: function() {
            this._mouseDestroy();
            for (var i = this.items.length - 1; i >= 0; i--) this.items[i].item.removeData(this.widgetName + "-item");
            return this;
        },
        _mouseCapture: function(event, overrideHandle) {
            var currentItem = null, validHandle = !1, that = this;
            return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(event), 
            $(event.target).parents().each(function() {
                if ($.data(this, that.widgetName + "-item") === that) return currentItem = $(this), 
                !1;
            }), $.data(event.target, that.widgetName + "-item") === that && (currentItem = $(event.target)), 
            !!currentItem && (!(this.options.handle && !overrideHandle && ($(this.options.handle, currentItem).find("*").addBack().each(function() {
                this === event.target && (validHandle = !0);
            }), !validHandle)) && (this.currentItem = currentItem, this._removeCurrentsFromItems(), 
            !0))));
        },
        _mouseStart: function(event, overrideHandle, noActivation) {
            var i, body, o = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(event), 
            this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), 
            this.offset = this.currentItem.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, $.extend(this.offset, {
                click: {
                    left: event.pageX - this.offset.left,
                    top: event.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), 
            this.originalPosition = this._generatePosition(event), this.originalPageX = event.pageX, 
            this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), 
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), 
            o.containment && this._setContainment(), o.cursor && "auto" !== o.cursor && (body = this.document.find("body"), 
            this.storedCursor = body.css("cursor"), body.css("cursor", o.cursor), this.storedStylesheet = $("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(body)), 
            o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), 
            this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), 
            this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), 
            this._trigger("start", event, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), 
            !noActivation) for (i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("activate", event, this._uiHash(this));
            return $.ui.ddmanager && ($.ui.ddmanager.current = this), $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event), 
            this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(event), 
            !0;
        },
        _mouseDrag: function(event) {
            var i, item, itemElement, intersection, o = this.options, scrolled = !1;
            for (this.position = this._generatePosition(event), this.positionAbs = this._convertPositionTo("absolute"), 
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed : event.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed), 
            this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed : event.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (event.pageY - this.document.scrollTop() < o.scrollSensitivity ? scrolled = this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed) : this.window.height() - (event.pageY - this.document.scrollTop()) < o.scrollSensitivity && (scrolled = this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed)), 
            event.pageX - this.document.scrollLeft() < o.scrollSensitivity ? scrolled = this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed) : this.window.width() - (event.pageX - this.document.scrollLeft()) < o.scrollSensitivity && (scrolled = this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed))), 
            !1 !== scrolled && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event)), 
            this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
            i = this.items.length - 1; i >= 0; i--) if (item = this.items[i], itemElement = item.item[0], 
            (intersection = this._intersectsWithPointer(item)) && item.instance === this.currentContainer && !(itemElement === this.currentItem[0] || this.placeholder[1 === intersection ? "next" : "prev"]()[0] === itemElement || $.contains(this.placeholder[0], itemElement) || "semi-dynamic" === this.options.type && $.contains(this.element[0], itemElement))) {
                if (this.direction = 1 === intersection ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(item)) break;
                this._rearrange(event, item), this._trigger("change", event, this._uiHash());
                break;
            }
            return this._contactContainers(event), $.ui.ddmanager && $.ui.ddmanager.drag(this, event), 
            this._trigger("sort", event, this._uiHash()), this.lastPositionAbs = this.positionAbs, 
            !1;
        },
        _mouseStop: function(event, noPropagation) {
            if (event) {
                if ($.ui.ddmanager && !this.options.dropBehaviour && $.ui.ddmanager.drop(this, event), 
                this.options.revert) {
                    var that = this, cur = this.placeholder.offset(), axis = this.options.axis, animation = {};
                    axis && "x" !== axis || (animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), 
                    axis && "y" !== axis || (animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), 
                    this.reverting = !0, $(this.helper).animate(animation, parseInt(this.options.revert, 10) || 500, function() {
                        that._clear(event);
                    });
                } else this._clear(event, noPropagation);
                return !1;
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }), "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), 
                this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                for (var i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("deactivate", null, this._uiHash(this)), 
                this.containers[i].containerCache.over && (this.containers[i]._trigger("out", null, this._uiHash(this)), 
                this.containers[i].containerCache.over = 0);
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
            "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), 
            $.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? $(this.domPosition.prev).after(this.currentItem) : $(this.domPosition.parent).prepend(this.currentItem)), 
            this;
        },
        serialize: function(o) {
            var items = this._getItemsAsjQuery(o && o.connected), str = [];
            return o = o || {}, $(items).each(function() {
                var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[\-=_](.+)/);
                res && str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]));
            }), !str.length && o.key && str.push(o.key + "="), str.join("&");
        },
        toArray: function(o) {
            var items = this._getItemsAsjQuery(o && o.connected), ret = [];
            return o = o || {}, items.each(function() {
                ret.push($(o.item || this).attr(o.attribute || "id") || "");
            }), ret;
        },
        _intersectsWith: function(item) {
            var x1 = this.positionAbs.left, x2 = x1 + this.helperProportions.width, y1 = this.positionAbs.top, y2 = y1 + this.helperProportions.height, l = item.left, r = l + item.width, t = item.top, b = t + item.height, dyClick = this.offset.click.top, dxClick = this.offset.click.left, isOverElementHeight = "x" === this.options.axis || y1 + dyClick > t && y1 + dyClick < b, isOverElementWidth = "y" === this.options.axis || x1 + dxClick > l && x1 + dxClick < r, isOverElement = isOverElementHeight && isOverElementWidth;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"] ? isOverElement : l < x1 + this.helperProportions.width / 2 && x2 - this.helperProportions.width / 2 < r && t < y1 + this.helperProportions.height / 2 && y2 - this.helperProportions.height / 2 < b;
        },
        _intersectsWithPointer: function(item) {
            var verticalDirection, horizontalDirection, isOverElementHeight = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height), isOverElementWidth = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width);
            return !(!isOverElementHeight || !isOverElementWidth) && (verticalDirection = this._getDragVerticalDirection(), 
            horizontalDirection = this._getDragHorizontalDirection(), this.floating ? "right" === horizontalDirection || "down" === verticalDirection ? 2 : 1 : verticalDirection && ("down" === verticalDirection ? 2 : 1));
        },
        _intersectsWithSides: function(item) {
            var isOverBottomHalf = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height / 2, item.height), isOverRightHalf = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width), verticalDirection = this._getDragVerticalDirection(), horizontalDirection = this._getDragHorizontalDirection();
            return this.floating && horizontalDirection ? "right" === horizontalDirection && isOverRightHalf || "left" === horizontalDirection && !isOverRightHalf : verticalDirection && ("down" === verticalDirection && isOverBottomHalf || "up" === verticalDirection && !isOverBottomHalf);
        },
        _getDragVerticalDirection: function() {
            var delta = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== delta && (delta > 0 ? "down" : "up");
        },
        _getDragHorizontalDirection: function() {
            var delta = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== delta && (delta > 0 ? "right" : "left");
        },
        refresh: function(event) {
            return this._refreshItems(event), this._setHandleClassName(), this.refreshPositions(), 
            this;
        },
        _connectWith: function() {
            var options = this.options;
            return options.connectWith.constructor === String ? [ options.connectWith ] : options.connectWith;
        },
        _getItemsAsjQuery: function(connected) {
            function addItems() {
                items.push(this);
            }
            var i, j, cur, inst, items = [], queries = [], connectWith = this._connectWith();
            if (connectWith && connected) for (i = connectWith.length - 1; i >= 0; i--) for (cur = $(connectWith[i], this.document[0]), 
            j = cur.length - 1; j >= 0; j--) (inst = $.data(cur[j], this.widgetFullName)) && inst !== this && !inst.options.disabled && queries.push([ $.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst ]);
            for (queries.push([ $.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this ]), 
            i = queries.length - 1; i >= 0; i--) queries[i][0].each(addItems);
            return $(items);
        },
        _removeCurrentsFromItems: function() {
            var list = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = $.grep(this.items, function(item) {
                for (var j = 0; j < list.length; j++) if (list[j] === item.item[0]) return !1;
                return !0;
            });
        },
        _refreshItems: function(event) {
            this.items = [], this.containers = [ this ];
            var i, j, cur, inst, targetData, _queries, item, queriesLength, items = this.items, queries = [ [ $.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {
                item: this.currentItem
            }) : $(this.options.items, this.element), this ] ], connectWith = this._connectWith();
            if (connectWith && this.ready) for (i = connectWith.length - 1; i >= 0; i--) for (cur = $(connectWith[i], this.document[0]), 
            j = cur.length - 1; j >= 0; j--) (inst = $.data(cur[j], this.widgetFullName)) && inst !== this && !inst.options.disabled && (queries.push([ $.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {
                item: this.currentItem
            }) : $(inst.options.items, inst.element), inst ]), this.containers.push(inst));
            for (i = queries.length - 1; i >= 0; i--) for (targetData = queries[i][1], _queries = queries[i][0], 
            j = 0, queriesLength = _queries.length; j < queriesLength; j++) item = $(_queries[j]), 
            item.data(this.widgetName + "-item", targetData), items.push({
                item: item,
                instance: targetData,
                width: 0,
                height: 0,
                left: 0,
                top: 0
            });
        },
        refreshPositions: function(fast) {
            this.floating = !!this.items.length && ("x" === this.options.axis || this._isFloating(this.items[0].item)), 
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var i, item, t, p;
            for (i = this.items.length - 1; i >= 0; i--) item = this.items[i], item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0] || (t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item, 
            fast || (item.width = t.outerWidth(), item.height = t.outerHeight()), p = t.offset(), 
            item.left = p.left, item.top = p.top);
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (i = this.containers.length - 1; i >= 0; i--) p = this.containers[i].element.offset(), 
            this.containers[i].containerCache.left = p.left, this.containers[i].containerCache.top = p.top, 
            this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), 
            this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this;
        },
        _createPlaceholder: function(that) {
            that = that || this;
            var className, o = that.options;
            o.placeholder && o.placeholder.constructor !== String || (className = o.placeholder, 
            o.placeholder = {
                element: function() {
                    var nodeName = that.currentItem[0].nodeName.toLowerCase(), element = $("<" + nodeName + ">", that.document[0]);
                    return that._addClass(element, "ui-sortable-placeholder", className || that.currentItem[0].className)._removeClass(element, "ui-sortable-helper"), 
                    "tbody" === nodeName ? that._createTrPlaceholder(that.currentItem.find("tr").eq(0), $("<tr>", that.document[0]).appendTo(element)) : "tr" === nodeName ? that._createTrPlaceholder(that.currentItem, element) : "img" === nodeName && element.attr("src", that.currentItem.attr("src")), 
                    className || element.css("visibility", "hidden"), element;
                },
                update: function(container, p) {
                    className && !o.forcePlaceholderSize || (p.height() || p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop") || 0, 10) - parseInt(that.currentItem.css("paddingBottom") || 0, 10)), 
                    p.width() || p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft") || 0, 10) - parseInt(that.currentItem.css("paddingRight") || 0, 10)));
                }
            }), that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem)), 
            that.currentItem.after(that.placeholder), o.placeholder.update(that, that.placeholder);
        },
        _createTrPlaceholder: function(sourceTr, targetTr) {
            var that = this;
            sourceTr.children().each(function() {
                $("<td>&#160;</td>", that.document[0]).attr("colspan", $(this).attr("colspan") || 1).appendTo(targetTr);
            });
        },
        _contactContainers: function(event) {
            var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, cur, nearBottom, floating, axis, innermostContainer = null, innermostIndex = null;
            for (i = this.containers.length - 1; i >= 0; i--) if (!$.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
                if (innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) continue;
                innermostContainer = this.containers[i], innermostIndex = i;
            } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", event, this._uiHash(this)), 
            this.containers[i].containerCache.over = 0);
            if (innermostContainer) if (1 === this.containers.length) this.containers[innermostIndex].containerCache.over || (this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), 
            this.containers[innermostIndex].containerCache.over = 1); else {
                for (dist = 1e4, itemWithLeastDistance = null, floating = innermostContainer.floating || this._isFloating(this.currentItem), 
                posProperty = floating ? "left" : "top", sizeProperty = floating ? "width" : "height", 
                axis = floating ? "pageX" : "pageY", j = this.items.length - 1; j >= 0; j--) $.contains(this.containers[innermostIndex].element[0], this.items[j].item[0]) && this.items[j].item[0] !== this.currentItem[0] && (cur = this.items[j].item.offset()[posProperty], 
                nearBottom = !1, event[axis] - cur > this.items[j][sizeProperty] / 2 && (nearBottom = !0), 
                Math.abs(event[axis] - cur) < dist && (dist = Math.abs(event[axis] - cur), itemWithLeastDistance = this.items[j], 
                this.direction = nearBottom ? "up" : "down"));
                if (!itemWithLeastDistance && !this.options.dropOnEmpty) return;
                if (this.currentContainer === this.containers[innermostIndex]) return void (this.currentContainer.containerCache.over || (this.containers[innermostIndex]._trigger("over", event, this._uiHash()), 
                this.currentContainer.containerCache.over = 1));
                itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, !0) : this._rearrange(event, null, this.containers[innermostIndex].element, !0), 
                this._trigger("change", event, this._uiHash()), this.containers[innermostIndex]._trigger("change", event, this._uiHash(this)), 
                this.currentContainer = this.containers[innermostIndex], this.options.placeholder.update(this.currentContainer, this.placeholder), 
                this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), this.containers[innermostIndex].containerCache.over = 1;
            }
        },
        _createHelper: function(event) {
            var o = this.options, helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [ event, this.currentItem ])) : "clone" === o.helper ? this.currentItem.clone() : this.currentItem;
            return helper.parents("body").length || $("parent" !== o.appendTo ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]), 
            helper[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), helper[0].style.width && !o.forceHelperSize || helper.width(this.currentItem.width()), 
            helper[0].style.height && !o.forceHelperSize || helper.height(this.currentItem.height()), 
            helper;
        },
        _adjustOffsetFromHelper: function(obj) {
            "string" == typeof obj && (obj = obj.split(" ")), $.isArray(obj) && (obj = {
                left: +obj[0],
                top: +obj[1] || 0
            }), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left), 
            "top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top);
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var po = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(), 
            po.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && $.ui.ie) && (po = {
                top: 0,
                left: 0
            }), {
                top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var p = this.currentItem.position();
                return {
                    top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                };
            }
            return {
                top: 0,
                left: 0
            };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var ce, co, over, o = this.options;
            "parent" === o.containment && (o.containment = this.helper[0].parentNode), "document" !== o.containment && "window" !== o.containment || (this.containment = [ 0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === o.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === o.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]), 
            /^(document|window|parent)$/.test(o.containment) || (ce = $(o.containment)[0], co = $(o.containment).offset(), 
            over = "hidden" !== $(ce).css("overflow"), this.containment = [ co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top ]);
        },
        _convertPositionTo: function(d, pos) {
            pos || (pos = this.position);
            var mod = "absolute" === d ? 1 : -1, scroll = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
            return {
                top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()) * mod,
                left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod
            };
        },
        _generatePosition: function(event) {
            var top, left, o = this.options, pageX = event.pageX, pageY = event.pageY, scroll = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), 
            this.originalPosition && (this.containment && (event.pageX - this.offset.click.left < this.containment[0] && (pageX = this.containment[0] + this.offset.click.left), 
            event.pageY - this.offset.click.top < this.containment[1] && (pageY = this.containment[1] + this.offset.click.top), 
            event.pageX - this.offset.click.left > this.containment[2] && (pageX = this.containment[2] + this.offset.click.left), 
            event.pageY - this.offset.click.top > this.containment[3] && (pageY = this.containment[3] + this.offset.click.top)), 
            o.grid && (top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1], 
            pageY = this.containment ? top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3] ? top : top - this.offset.click.top >= this.containment[1] ? top - o.grid[1] : top + o.grid[1] : top, 
            left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0], 
            pageX = this.containment ? left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2] ? left : left - this.offset.click.left >= this.containment[0] ? left - o.grid[0] : left + o.grid[0] : left)), 
            {
                top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()),
                left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())
            };
        },
        _rearrange: function(event, i, a, hardRefresh) {
            a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? i.item[0] : i.item[0].nextSibling), 
            this.counter = this.counter ? ++this.counter : 1;
            var counter = this.counter;
            this._delay(function() {
                counter === this.counter && this.refreshPositions(!hardRefresh);
            });
        },
        _clear: function(event, noPropagation) {
            function delayEvent(type, instance, container) {
                return function(event) {
                    container._trigger(type, event, instance._uiHash(instance));
                };
            }
            this.reverting = !1;
            var i, delayedTriggers = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), 
            this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (i in this._storedCSS) "auto" !== this._storedCSS[i] && "static" !== this._storedCSS[i] || (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper");
            } else this.currentItem.show();
            for (this.fromOutside && !noPropagation && delayedTriggers.push(function(event) {
                this._trigger("receive", event, this._uiHash(this.fromOutside));
            }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || noPropagation || delayedTriggers.push(function(event) {
                this._trigger("update", event, this._uiHash());
            }), this !== this.currentContainer && (noPropagation || (delayedTriggers.push(function(event) {
                this._trigger("remove", event, this._uiHash());
            }), delayedTriggers.push(function(c) {
                return function(event) {
                    c._trigger("receive", event, this._uiHash(this));
                };
            }.call(this, this.currentContainer)), delayedTriggers.push(function(c) {
                return function(event) {
                    c._trigger("update", event, this._uiHash(this));
                };
            }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) noPropagation || delayedTriggers.push(delayEvent("deactivate", this, this.containers[i])), 
            this.containers[i].containerCache.over && (delayedTriggers.push(delayEvent("out", this, this.containers[i])), 
            this.containers[i].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), 
            this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), 
            this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), 
            this.dragging = !1, noPropagation || this._trigger("beforeStop", event, this._uiHash()), 
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), 
            this.helper = null), !noPropagation) {
                for (i = 0; i < delayedTriggers.length; i++) delayedTriggers[i].call(this, event);
                this._trigger("stop", event, this._uiHash());
            }
            return this.fromOutside = !1, !this.cancelHelperRemoval;
        },
        _trigger: function() {
            !1 === $.Widget.prototype._trigger.apply(this, arguments) && this.cancel();
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
    $.ui.sortable;
    widget("ui.progressbar", {
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
            this.oldValue = this.options.value = this._constrainedValue(), this.element.attr({
                role: "progressbar",
                "aria-valuemin": this.min
            }), this._addClass("ui-progressbar", "ui-widget ui-widget-content"), this.valueDiv = $("<div>").appendTo(this.element), 
            this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"), this._refreshValue();
        },
        _destroy: function() {
            this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"), this.valueDiv.remove();
        },
        value: function(newValue) {
            if (void 0 === newValue) return this.options.value;
            this.options.value = this._constrainedValue(newValue), this._refreshValue();
        },
        _constrainedValue: function(newValue) {
            return void 0 === newValue && (newValue = this.options.value), this.indeterminate = !1 === newValue, 
            "number" != typeof newValue && (newValue = 0), !this.indeterminate && Math.min(this.options.max, Math.max(this.min, newValue));
        },
        _setOptions: function(options) {
            var value = options.value;
            delete options.value, this._super(options), this.options.value = this._constrainedValue(value), 
            this._refreshValue();
        },
        _setOption: function(key, value) {
            "max" === key && (value = Math.max(this.min, value)), this._super(key, value);
        },
        _setOptionDisabled: function(value) {
            this._super(value), this.element.attr("aria-disabled", value), this._toggleClass(null, "ui-state-disabled", !!value);
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
        },
        _refreshValue: function() {
            var value = this.options.value, percentage = this._percentage();
            this.valueDiv.toggle(this.indeterminate || value > this.min).width(percentage.toFixed(0) + "%"), 
            this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, value === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate), 
            this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = $("<div>").appendTo(this.valueDiv), 
            this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": value
            }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== value && (this.oldValue = value, 
            this._trigger("change")), value === this.options.max && this._trigger("complete");
        }
    });
    var _idx = ($.ui.progressbar, 0), history = [], int2Hex = function(i) {
        var h = i.toString(16);
        return 1 === h.length && (h = "0" + h), h;
    }, st2Hex = function(s) {
        return int2Hex(Number(s));
    }, toHex3 = function(c) {
        if (c && c.length > 10) {
            var p1 = 1 + c.indexOf("("), p2 = c.indexOf(")"), cs = c.substring(p1, p2).split(",");
            return console.log(cs), [ "#", st2Hex(cs[0]), st2Hex(cs[1]), st2Hex(cs[2]) ].join("");
        }
        return c;
    };
    widget("evol.colorpicker", {
        version: "2.1",
        options: {
            color: null,
            showOn: "both",
            displayIndicator: !0,
            history: !0,
            strings: "Pick A Color",
            cols: 9,
            rows: 4,
            type: "colorpicker",
            gradientid: 0,
            extraClassnames: "",
            subThemeColors: [ "f2f2f2", "ddd9c3", "c6d9f0", "dbe5f1", "f2dcdb", "ebf1dd", "e5e0ec", "dbeef3", "fdeada", "d8d8d8", "c4bd97", "8db3e2", "b8cce4", "e5b9b7", "d7e3bc", "ccc1d9", "b7dde8", "fbd5b5", "bfbfbf", "938953", "548dd4", "95b3d7", "d99694", "c3d69b", "b2a2c7", "92cddc", "fac08f", "a5a5a5", "494429", "17365d", "366092", "953734", "76923c", "5f497a", "31859b", "e36c09", "7f7f7f", "1d1b10", "0f243e", "244061", "632423", "4f6128", "3f3151", "205867", "974806" ]
        },
        _create: function() {
            this._paletteIdx = 1, this._id = "evo-cp" + _idx++, this._enabled = !0;
            var self = this;
            switch (this.element.get(0).tagName) {
              case "INPUT":
                var color = this.options.color;
                if (this._isPopup = !0, this._palette = null, null !== color) this.element.val(color); else {
                    var v = this.element.val();
                    "" !== v && (color = this.options.color = v);
                }
                if (this.element.addClass("colorPicker " + this._id), "gradient" === this.options.type) {
                    this.options.rows = this.options.subThemeColors.length;
                    var thisgradient = this.getGradient(this.options.gradientid);
                    this.element.wrap('<span class="gradientpickerwrap"></span>').after('<div class="gradientpicker ' + ("focus" === this.options.showOn ? "" : "evo-pointer ") + 'evo-colorind"  style="' + thisgradient + '"></div>');
                } else this.element.wrap('<div class="colorpickerwrap" style="width:' + (this.element.width() + 32) + 'px;"></div>').after('<div class="colorpickerafter ' + ("focus" === this.options.showOn ? "" : "evo-pointer ") + 'evo-colorind" ' + (null !== color ? 'style="background-color:' + color + '"' : "") + "></div>");
                this.element.on("keyup onpaste", function(evt) {
                    var thisvalue = $(this).val();
                    thisvalue !== self.options.color && self._setValue(thisvalue, !0);
                });
                var showOn = this.options.showOn;
                "both" !== showOn && "focus" !== showOn || this.element.on("focus", function() {
                    self.showPalette();
                }), "both" !== showOn && "button" !== showOn || this.element.next().on("click", function(evt) {
                    evt.stopPropagation(), self.showPalette();
                });
                break;

              default:
                this._isPopup = !1, this._palette = this.element.html(this._paletteHTML()).attr("aria-haspopup", "true"), 
                this._bindColors();
            }
            null !== color && this.options.history && this._add2History(color);
        },
        _paletteHTML: function() {
            var h = [], pIdx = this._paletteIdx = Math.abs(this._paletteIdx), opts = this.options, labels = opts.strings.split(",");
            return h.push('<div  class="lecolorpicker evo-pop', "", this.options.extraClassnames, '"', this._isPopup ? ' style="position:absolute"' : "", ">"), 
            h.push("<span>", this["_paletteHTML" + pIdx](), "</span>"), h.push('<div class="evo-more"><a href="javascript:void(0)">', labels[1 + pIdx], "</a>"), 
            h.push("</div>"), h.push("</div>"), h.join("");
        },
        _colorIndHTML: function(c, fl) {
            var h = [];
            return h.push('<div class="evo-color" style="float:left"><div style="'), h.push(c ? "background-color:" + c : "display:none"), 
            h.push('"></div><span '), h.push(c ? ">" + c + "</span>" : "/>"), h.push("</div>"), 
            h.join("");
        },
        _paletteHTML1: function() {
            var h = [], labels = this.options.strings.split(","), oTD = '<td  class="colorpickersquare" style=" ', fTD = "</span></td>", oTRTH = '<tr><th colspan="' + this.options.cols + '" class="ui-widget-content">';
            h.push('<table class="evo-palette', "", '">', oTRTH, labels[0], "</th></tr>");
            for (var r = 0; r < this.options.rows; r++) {
                if (h.push('<tr class="in">'), "colorpicker" === this.options.type) for (var i = 0; i < this.options.cols; i++) h.push(oTD, "background: #" + this.options.subThemeColors[r * this.options.cols + i] + ';" data-color="' + this.options.subThemeColors[r * this.options.cols + i], '"><span>', fTD); else "gradient" === this.options.type && (h.push(oTD), 
                h.push(this.getGradient(r)), h.push(';width: 150px;border:1px solid #EEE" data-gradient="' + r, '"><span>', fTD));
                h.push("</tr>");
            }
            return h.push("</table>"), h.join("");
        },
        getGradient: function(gradientid) {
            var thisgradient = [];
            thisgradient.push("background: linear-gradient(to right ");
            for (var colorlength = this.options.subThemeColors[gradientid][1].length, i = 0; i < colorlength; i++) thisgradient.push(" , ", this.options.subThemeColors[gradientid][1][i], " ", 10 * i / colorlength * 10, "% ");
            return thisgradient.push(")"), thisgradient = thisgradient.join("");
        },
        showPalette: function() {
            if (this._enabled && ($(".colorPicker").not("." + this._id).colorpicker("hidePalette"), 
            null === this._palette)) {
                this._palette = this.element.next().after(this._paletteHTML()).next().on("click", function(evt) {
                    evt.stopPropagation();
                }), this._bindColors();
                var that = this;
                $(document.body).on("click." + this._id, function(evt) {
                    evt.target !== that.element.get(0) && that.hidePalette();
                });
            }
            return this;
        },
        hidePalette: function() {
            if (this._isPopup && this._palette) {
                $(document.body).off("click." + this._id);
                var that = this;
                this._palette.off("mouseover click", "td").fadeOut(function() {
                    that._palette.remove(), that._palette = that._cTxt = null;
                }).find(".evo-more a").off("click");
            }
            return this;
        },
        _bindColors: function() {
            var es = this._palette.find("div.evo-color"), sel = this.options.history ? "td,.evo-cHist div" : "td";
            this._cTxt1 = es.eq(0).children().eq(0), this._cTxt2 = es.eq(1).children().eq(0);
            var that = this;
            this._palette.on("click", sel, function(evt) {
                if (that._enabled) if ("colorpicker" === that.options.type) {
                    var c = toHex3($(this).data("color"));
                    that._setValue(String(c));
                } else if ("gradient" === that.options.type) {
                    var gradientid = $(this).data("gradient");
                    that.options.gradientid = gradientid, that._setValue(String(gradientid)), $(".gradientpicker", that.element.parent()).attr("style", that.getGradient(gradientid));
                }
            }).on("mouseover", sel, function(evt) {
                if (that._enabled) {
                    var c = toHex3($(this).data("color"));
                    that.options.displayIndicator && that._setColorInd(c, 2), that.element.trigger("mouseover.color", c);
                }
            }).find(".evo-more a").on("click", function() {
                that._switchPalette(this);
            });
        },
        val: function(value) {
            return void 0 === value ? this.options.color : (this._setValue(value), this);
        },
        _setValue: function(c, noHide) {
            c = c || "#999999", c = String(c).replace(/ /g, ""), this.options.color = c, this._isPopup ? (noHide || this.hidePalette(), 
            this.element.val(c).next().attr("style", "background-color:" + c)) : this._setColorInd(c, 1), 
            this.options.history && this._paletteIdx > 0 && this._add2History(c), this.element.trigger("change.color", c);
        },
        _setColorInd: function(c, idx) {
            this["_cTxt" + idx].attr("style", "background-color:" + c).next().html(c);
        },
        _setOption: function(key, value) {
            "color" === key ? this._setValue(value, !0) : this.options[key] = value;
        },
        _add2History: function(c) {
            for (var iMax = history.length, i = 0; i < iMax; i++) if (c === history[i]) return;
            iMax > 27 && history.shift(), history.push(c);
        },
        enable: function() {
            var e = this.element;
            return this._isPopup ? e.removeAttr("disabled") : e.css({
                opacity: "1",
                "pointer-events": "auto"
            }), "focus" !== this.options.showOn && this.element.next().addClass("evo-pointer"), 
            e.removeAttr("aria-disabled"), this._enabled = !0, this;
        },
        disable: function() {
            var e = this.element;
            return this._isPopup ? e.attr("disabled", "disabled") : (this.hidePalette(), e.css({
                opacity: "0.3",
                "pointer-events": "none"
            })), "focus" !== this.options.showOn && this.element.next().removeClass("evo-pointer"), 
            e.attr("aria-disabled", "true"), this._enabled = !1, this;
        },
        isDisabled: function() {
            return !this._enabled;
        },
        destroy: function() {
            $(document.body).off("click." + this._id), this._palette && (this._palette.off("mouseover click", "td").find(".evo-more a").off("click"), 
            this._isPopup && this._palette.remove(), this._palette = this._cTxt = null), this._isPopup && this.element.next().off("click").remove().end().off("focus").unwrap(), 
            this.element.removeClass("colorPicker " + this.id).empty(), $.Widget.prototype.destroy.call(this);
        }
    });
    var dismiss = ($.evol.colorpicker, '[data-dismiss="alert"]'), Alert = function(el) {
        $(el).on("click", dismiss, this.close);
    };
    Alert.prototype.close = function(e) {
        function removeElement() {
            $parent.trigger("closed").remove();
        }
        var $parent, $this = $(this), selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
        $parent = $(selector), e && e.preventDefault(), $parent.length || ($parent = $this.hasClass("alert") ? $this : $this.parent()), 
        $parent.trigger(e = $.Event("close")), e.isDefaultPrevented() || ($parent.removeClass("in"), 
        $.support.transition && $parent.hasClass("fade") ? $parent.on($.support.transition.end, removeElement) : removeElement());
    };
    var old = $.fn.alert;
    $.fn.alert = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("alert");
            data || $this.data("alert", data = new Alert(this)), "string" == typeof option && data[option].call($this);
        });
    }, $.fn.alert.Constructor = Alert, $.fn.alert.noConflict = function() {
        return $.fn.alert = old, this;
    }, $(document).on("click.alert.data-api", dismiss, Alert.prototype.close);
    var Button = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, $.fn.button.defaults, options);
    };
    Button.prototype.setState = function(state) {
        var d = "disabled", $el = this.$element, data = $el.data(), val = $el.is("input") ? "val" : "html";
        state += "Text", data.resetText || $el.data("resetText", $el[val]()), $el[val](data[state] || this.options[state]), 
        setTimeout(function() {
            "loadingText" == state ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d);
        }, 0);
    }, Button.prototype.toggle = function() {
        var $parent = this.$element.closest('[data-toggle="buttons-radio"]');
        $parent && $parent.find(".active").removeClass("active"), this.$element.toggleClass("active");
    };
    var old$1 = $.fn.button;
    $.fn.button = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("button"), options = "object" == typeof option && option;
            data || $this.data("button", data = new Button(this, options)), "toggle" == option ? data.toggle() : option && data.setState(option);
        });
    }, $.fn.button.defaults = {
        loadingText: "loading..."
    }, $.fn.button.Constructor = Button, $.fn.button.noConflict = function() {
        return $.fn.button = old$1, this;
    }, $(document).on("click.button.data-api", "[data-toggle^=button]", function(e) {
        var $btn = $(e.target);
        $btn.hasClass("btn") || ($btn = $btn.closest(".btn")), $btn.button("toggle");
    });
    var Collapse = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, $.fn.collapse.defaults, options), 
        this.options.parent && (this.$parent = $(this.options.parent)), this.options.toggle && this.toggle();
    };
    Collapse.prototype = {
        constructor: Collapse,
        dimension: function() {
            return this.$element.hasClass("width") ? "width" : "height";
        },
        show: function() {
            var dimension, scroll, actives, hasData;
            if (!this.transitioning && !this.$element.hasClass("in")) {
                if (dimension = this.dimension(), scroll = $.camelCase([ "scroll", dimension ].join("-")), 
                (actives = this.$parent && this.$parent.find("> .accordion-group > .in")) && actives.length) {
                    if ((hasData = actives.data("collapse")) && hasData.transitioning) return;
                    actives.collapse("hide"), hasData || actives.data("collapse", null);
                }
                this.$element[dimension](0), this.transition("addClass", $.Event("show"), "shown"), 
                $.support.transition && this.$element[dimension](this.$element[0][scroll]);
            }
        },
        hide: function() {
            var dimension;
            !this.transitioning && this.$element.hasClass("in") && (dimension = this.dimension(), 
            this.reset(this.$element[dimension]()), this.transition("removeClass", $.Event("hide"), "hidden"), 
            this.$element[dimension](0));
        },
        reset: function(size) {
            var dimension = this.dimension();
            return this.$element.removeClass("collapse")[dimension](size || "auto")[0].offsetWidth, 
            this.$element[null !== size ? "addClass" : "removeClass"]("collapse"), this;
        },
        transition: function(method, startEvent, completeEvent) {
            var that = this, complete = function() {
                "show" == startEvent.type && that.reset(), that.transitioning = 0, that.$element.trigger(completeEvent);
            };
            this.$element.trigger(startEvent), startEvent.isDefaultPrevented() || (this.transitioning = 1, 
            this.$element[method]("in"), $.support.transition && this.$element.hasClass("collapse") ? this.$element.one($.support.transition.end, complete) : complete());
        },
        toggle: function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]();
        }
    };
    var old$2 = $.fn.collapse;
    $.fn.collapse = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("collapse"), options = $.extend({}, $.fn.collapse.defaults, $this.data(), "object" == typeof option && option);
            data || $this.data("collapse", data = new Collapse(this, options)), "string" == typeof option && data[option]();
        });
    }, $.fn.collapse.defaults = {
        toggle: !0
    }, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function() {
        return $.fn.collapse = old$2, this;
    }, $(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(e) {
        var href, $this = $(this), target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""), option = $(target).data("collapse") ? "toggle" : $this.data();
        $this[$(target).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), $(target).collapse(option);
    });
    var toggle = "[data-toggle=dropdown]", Dropdown = function(element) {
        var $el = $(element).on("click.dropdown.data-api", this.toggle);
        $("html").on("click.dropdown.data-api", function() {
            $el.parent().removeClass("open");
        });
    };
    Dropdown.prototype = {
        constructor: Dropdown,
        toggle: function(e) {
            var $parent, isActive, $this = $(this);
            if (!$this.is(".disabled, :disabled")) return $parent = getParent($this), isActive = $parent.hasClass("open"), 
            clearMenus(), isActive || ("ontouchstart" in document.documentElement && $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on("click", clearMenus), 
            $parent.toggleClass("open")), $this.focus(), !1;
        },
        keydown: function(e) {
            var $this, $items, $parent, isActive, index;
            if (/(38|40|27)/.test(e.keyCode) && ($this = $(this), e.preventDefault(), e.stopPropagation(), 
            !$this.is(".disabled, :disabled"))) {
                if ($parent = getParent($this), !(isActive = $parent.hasClass("open")) || isActive && 27 == e.keyCode) return 27 == e.which && $parent.find(toggle).focus(), 
                $this.click();
                $items = $("[role=menu] li:not(.divider):visible a", $parent), $items.length && (index = $items.index($items.filter(":focus")), 
                38 == e.keyCode && index > 0 && index--, 40 == e.keyCode && index < $items.length - 1 && index++, 
                ~index || (index = 0), $items.eq(index).focus());
            }
        }
    };
    var old$3 = $.fn.dropdown;
    $.fn.dropdown = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("dropdown");
            data || $this.data("dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this);
        });
    }, $.fn.dropdown.Constructor = Dropdown, $.fn.dropdown.noConflict = function() {
        return $.fn.dropdown = old$3, this;
    }, $(document).on("click.dropdown.data-api", clearMenus).on("click.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation();
    }).on("click.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.dropdown.data-api", toggle + ", [role=menu]", Dropdown.prototype.keydown);
    var Modal = function(element, options) {
        this.options = options, this.$element = $(element).delegate('[data-dismiss="modal"]', "click.dismiss.modal", $.proxy(this.hide, this)), 
        this.options.remote && this.$element.find(".modal-body").load(this.options.remote);
    };
    Modal.prototype = {
        constructor: Modal,
        toggle: function() {
            return this[this.isShown ? "hide" : "show"]();
        },
        show: function() {
            var that = this, e = $.Event("show");
            this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, 
            this.escape(), this.backdrop(function() {
                var transition = $.support.transition && that.$element.hasClass("fade");
                that.$element.parent().length || that.$element.appendTo(document.body), that.$element.show(), 
                transition && that.$element[0].offsetWidth, that.$element.addClass("in").attr("aria-hidden", !1), 
                that.enforceFocus(), transition ? that.$element.one($.support.transition.end, function() {
                    that.$element.focus().trigger("shown");
                }) : that.$element.focus().trigger("shown");
            }));
        },
        hide: function(e) {
            e && e.preventDefault(), e = $.Event("hide"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, 
            this.escape(), $(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), 
            $.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal());
        },
        enforceFocus: function() {
            var that = this;
            $(document).on("focusin.modal", function(e) {
                that.$element[0] === e.target || that.$element.has(e.target).length || that.$element.focus();
            });
        },
        escape: function() {
            var that = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(e) {
                27 == e.which && that.hide();
            }) : this.isShown || this.$element.off("keyup.dismiss.modal");
        },
        hideWithTransition: function() {
            var that = this, timeout = setTimeout(function() {
                that.$element.off($.support.transition.end), that.hideModal();
            }, 500);
            this.$element.one($.support.transition.end, function() {
                clearTimeout(timeout), that.hideModal();
            });
        },
        hideModal: function() {
            var that = this;
            this.$element.hide(), this.backdrop(function() {
                that.removeBackdrop(), that.$element.trigger("hidden");
            });
        },
        removeBackdrop: function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
        },
        backdrop: function(callback) {
            var animate = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate;
                if (this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body), 
                this.$backdrop.click("static" == this.options.backdrop ? $.proxy(this.$element[0].focus, this.$element[0]) : $.proxy(this.hide, this)), 
                doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !callback) return;
                doAnimate ? this.$backdrop.one($.support.transition.end, callback) : callback();
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, callback) : callback()) : callback && callback();
        }
    };
    var old$4 = $.fn.modal;
    $.fn.modal = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("modal"), options = $.extend({}, $.fn.modal.defaults, $this.data(), "object" == typeof option && option);
            data || $this.data("modal", data = new Modal(this, options)), "string" == typeof option ? data[option]() : options.show && data.show();
        });
    }, $.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, $.fn.modal.Constructor = Modal, $.fn.modal.noConflict = function() {
        return $.fn.modal = old$4, this;
    }, $(document).on("click.modal.data-api", '[data-toggle="modal"]', function(e) {
        var $this = $(this), href = $this.attr("href"), $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")), option = $target.data("modal") ? "toggle" : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());
        e.preventDefault(), $target.modal(option).one("hide", function() {
            $this.focus();
        });
    });
    var Tooltip = function(element, options) {
        this.init("tooltip", element, options);
    };
    Tooltip.prototype = {
        constructor: Tooltip,
        init: function(type, element, options) {
            var eventIn, eventOut, triggers, trigger, i;
            for (this.type = type, this.$element = $(element), this.options = this.getOptions(options), 
            this.enabled = !0, triggers = this.options.trigger.split(" "), i = triggers.length; i--; ) trigger = triggers[i], 
            "click" == trigger ? this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this)) : "manual" != trigger && (eventIn = "hover" == trigger ? "mouseenter" : "focus", 
            eventOut = "hover" == trigger ? "mouseleave" : "blur", this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this)), 
            this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this)));
            this.options.selector ? this._options = $.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle();
        },
        getOptions: function(options) {
            return options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options), 
            options.delay && "number" == typeof options.delay && (options.delay = {
                show: options.delay,
                hide: options.delay
            }), options;
        },
        enter: function(e) {
            var self, defaults = $.fn[this.type].defaults, options = {};
            if (this._options && $.each(this._options, function(key, value) {
                defaults[key] != value && (options[key] = value);
            }, this), self = $(e.currentTarget)[this.type](options).data(this.type), !self.options.delay || !self.options.delay.show) return self.show();
            clearTimeout(this.timeout), self.hoverState = "in", this.timeout = setTimeout(function() {
                "in" == self.hoverState && self.show();
            }, self.options.delay.show);
        },
        leave: function(e) {
            var self = $(e.currentTarget)[this.type](this._options).data(this.type);
            if (this.timeout && clearTimeout(this.timeout), !self.options.delay || !self.options.delay.hide) return self.hide();
            self.hoverState = "out", this.timeout = setTimeout(function() {
                "out" == self.hoverState && self.hide();
            }, self.options.delay.hide);
        },
        show: function() {
            var $tip, pos, actualWidth, actualHeight, placement, tp, e = $.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                switch ($tip = this.tip(), this.setContent(), this.options.animation && $tip.addClass("fade"), 
                placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement, 
                $tip.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element), 
                pos = this.getPosition(), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight, 
                placement) {
                  case "bottom":
                    tp = {
                        top: pos.top + pos.height,
                        left: pos.left + pos.width / 2 - actualWidth / 2
                    };
                    break;

                  case "top":
                    tp = {
                        top: pos.top - actualHeight,
                        left: pos.left + pos.width / 2 - actualWidth / 2
                    };
                    break;

                  case "left":
                    tp = {
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left - actualWidth
                    };
                    break;

                  case "right":
                    tp = {
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left + pos.width
                    };
                }
                this.applyPlacement(tp, placement), this.$element.trigger("shown");
            }
        },
        applyPlacement: function(offset, placement) {
            var actualWidth, actualHeight, delta, replace, $tip = this.tip(), width = $tip[0].offsetWidth, height = $tip[0].offsetHeight;
            $tip.offset(offset).addClass(placement).addClass("in"), actualWidth = $tip[0].offsetWidth, 
            actualHeight = $tip[0].offsetHeight, "top" == placement && actualHeight != height && (offset.top = offset.top + height - actualHeight, 
            replace = !0), "bottom" == placement || "top" == placement ? (delta = 0, offset.left < 0 && (delta = -2 * offset.left, 
            offset.left = 0, $tip.offset(offset), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight), 
            this.replaceArrow(delta - width + actualWidth, actualWidth, "left")) : this.replaceArrow(actualHeight - height, actualHeight, "top"), 
            replace && $tip.offset(offset);
        },
        replaceArrow: function(delta, dimension, position) {
            this.arrow().css(position, delta ? 50 * (1 - delta / dimension) + "%" : "");
        },
        setContent: function() {
            var $tip = this.tip(), title = this.getTitle();
            $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title), $tip.removeClass("fade in top bottom left right");
        },
        hide: function() {
            var $tip = this.tip(), e = $.Event("hide");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) return $tip.removeClass("in"), 
            $.support.transition && this.$tip.hasClass("fade") ? function() {
                var timeout = setTimeout(function() {
                    $tip.off($.support.transition.end).detach();
                }, 500);
                $tip.one($.support.transition.end, function() {
                    clearTimeout(timeout), $tip.detach();
                });
            }() : $tip.detach(), this.$element.trigger("hidden"), this;
        },
        fixTitle: function() {
            var $e = this.$element;
            ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
        },
        hasContent: function() {
            return this.getTitle();
        },
        getPosition: function() {
            var el = this.$element[0];
            return $.extend({}, "function" == typeof el.getBoundingClientRect ? el.getBoundingClientRect() : {
                width: el.offsetWidth,
                height: el.offsetHeight
            }, this.$element.offset());
        },
        getTitle: function() {
            var $e = this.$element, o = this.options;
            return $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title);
        },
        tip: function() {
            return this.$tip = this.$tip || $(this.options.template);
        },
        arrow: function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
        },
        enable: function() {
            this.enabled = !0;
        },
        disable: function() {
            this.enabled = !1;
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled;
        },
        toggle: function(e) {
            var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this;
            self.tip().hasClass("in") ? self.hide() : self.show();
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type);
        }
    };
    var old$5 = $.fn.tooltip;
    $.fn.tooltip = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("tooltip"), options = "object" == typeof option && option;
            data || $this.data("tooltip", data = new Tooltip(this, options)), "string" == typeof option && data[option]();
        });
    }, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, $.fn.tooltip.noConflict = function() {
        return $.fn.tooltip = old$5, this;
    };
    var Popover = function(element, options) {
        this.init("popover", element, options);
    };
    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {
        constructor: Popover,
        setContent: function() {
            var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
            $tip.find(".popover-title")[this.options.html ? "html" : "text"](title), $tip.find(".popover-content")[this.options.html ? "html" : "text"](content), 
            $tip.removeClass("fade top bottom left right in");
        },
        hasContent: function() {
            return this.getTitle() || this.getContent();
        },
        getContent: function() {
            var $e = this.$element, o = this.options;
            return ("function" == typeof o.content ? o.content.call($e[0]) : o.content) || $e.attr("data-content");
        },
        tip: function() {
            return this.$tip || (this.$tip = $(this.options.template)), this.$tip;
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type);
        }
    });
    var old$6 = $.fn.popover;
    $.fn.popover = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("popover"), options = "object" == typeof option && option;
            data || $this.data("popover", data = new Popover(this, options)), "string" == typeof option && data[option]();
        });
    }, $.fn.popover.Constructor = Popover, $.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), $.fn.popover.noConflict = function() {
        return $.fn.popover = old$6, this;
    }, $(function() {
        $.support.transition = function() {
            var transitionEnd = function() {
                var name, el = document.createElement("bootstrap"), transEndEventNames = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for (name in transEndEventNames) if (void 0 !== el.style[name]) return transEndEventNames[name];
            }();
            return transitionEnd && {
                end: transitionEnd
            };
        }();
    });
    var Tab = function(element) {
        this.element = $(element);
    };
    Tab.prototype = {
        constructor: Tab,
        show: function() {
            var previous, $target, e, $this = this.element, $ul = $this.closest("ul:not(.dropdown-menu)"), selector = $this.attr("data-target");
            selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
            $this.parent("li").hasClass("active") || (previous = $ul.find(".active:last a")[0], 
            e = $.Event("show", {
                relatedTarget: previous
            }), $this.trigger(e), e.isDefaultPrevented() || ($target = $(selector), this.activate($this.parent("li"), $ul), 
            this.activate($target, $target.parent(), function() {
                $this.trigger({
                    type: "shown",
                    relatedTarget: previous
                });
            })));
        },
        activate: function(element, container, callback) {
            function next() {
                $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), 
                element.addClass("active"), transition ? (element[0].offsetWidth, element.addClass("in")) : element.removeClass("fade"), 
                element.parent(".dropdown-menu") && element.closest("li.dropdown").addClass("active"), 
                callback && callback();
            }
            var $active = container.find("> .active"), transition = callback && $.support.transition && $active.hasClass("fade");
            transition ? $active.one($.support.transition.end, next) : next(), $active.removeClass("in");
        }
    };
    var old$7 = $.fn.tab;
    return $.fn.tab = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("tab");
            data || $this.data("tab", data = new Tab(this)), "string" == typeof option && data[option]();
        });
    }, $.fn.tab.Constructor = Tab, $.fn.tab.noConflict = function() {
        return $.fn.tab = old$7, this;
    }, $(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault(), $(this).tab("show");
    }), jQuery;
});
//# sourceMappingURL=jquery_bootstrap.js.map