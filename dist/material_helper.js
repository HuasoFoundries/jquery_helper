(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (factory((global.material_helper = global.material_helper || {}),global.$));
}(this, (function (exports,$) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */var $$2=$; var navigator=window.navigator;var requestAnimationFrame=function requestAnimationFrame(callback,element){var currTime=new Date().getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){callback(currTime+timeToCall);},timeToCall);lastTime=currTime+timeToCall;return id;}; var cancelAnimationFrame=function cancelAnimationFrame(id){clearTimeout(id);};(function(self,raf,caf){var lastTime=0;var vendors=['ms','moz','webkit','o'];for(var x=0;x<vendors.length&&!self.requestAnimationFrame;++x){self.requestAnimationFrame=self[vendors[x]+'RequestAnimationFrame'];self.cancelAnimationFrame=self[vendors[x]+'CancelAnimationFrame']||self[vendors[x]+'CancelRequestAnimationFrame'];}if(!self.requestAnimationFrame)self.requestAnimationFrame=raf;if(!self.cancelAnimationFrame)self.cancelAnimationFrame=caf;})(window,requestAnimationFrame,cancelAnimationFrame); /* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */var IE=function(docobj){if(docobj.documentMode){return docobj.documentMode;}else {for(var i=7;i>4;i--){var div=docobj.createElement("div");div.innerHTML="<!--[if IE "+i+"]><span></span><![endif]-->";if(div.getElementsByTagName("span").length){div=null;return i;}}}return undefined;}(window.document);function compactSparseArray(array){var index=-1,length=array?array.length:0,result=[];while(++index<length){var value=array[index];if(value){result.push(value);}}return result;}function sanitizeElements(elements){ /* Unwrap jQuery/Zepto objects. */if(Type.isWrapped(elements)){elements=[].slice.call(elements); /* Wrap a single element in an array so that jQuery.each() can iterate with the element instead of its node's children. */}else if(Type.isNode(elements)){elements=[elements];}return elements;}var Type={isString:function isString(variable){return typeof variable==="string";},isArray:Array.isArray||function(variable){return Object.prototype.toString.call(variable)==="[object Array]";},isFunction:function isFunction(variable){return Object.prototype.toString.call(variable)==="[object Function]";},isNode:function isNode(variable){return variable&&variable.nodeType;}, /* Copyright Martin Bohm. MIT License: https://gist.github.com/Tomalak/818a78a226a0738eaade */isNodeList:function isNodeList(variable){return typeof variable==="object"&&/^\[object (HTMLCollection|NodeList|Object)\]jQuery/.test(Object.prototype.toString.call(variable))&&variable.length!==undefined&&(variable.length===0||typeof variable[0]==="object"&&variable[0].nodeType>0);}, /* Determine if variable is a wrapped jQuery or Zepto element. */isWrapped:function isWrapped(variable){return variable&&(variable.jquery||window.Zepto&&window.Zepto.zepto.isZ(variable));},isSVG:function isSVG(variable){return window.SVGElement&&variable instanceof window.SVGElement;},isEmptyObject:function isEmptyObject(variable){for(var name in variable){return false;}return true;}};var DURATION_DEFAULT=400; var EASING_DEFAULT="swing"; /*************
		 State
		 *************/var Velocity={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:window.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:document.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:false,calls:[],delayedElements:{count:0}},CSS:{},Utilities:$$2,Redirects:{},Easings:{},Promise:window.Promise,defaults:{queue:"",duration:DURATION_DEFAULT,easing:EASING_DEFAULT,begin:undefined,complete:undefined,progress:undefined,display:undefined,visibility:undefined,loop:false,delay:false,mobileHA:true,_cacheValues:true,promiseRejectEmpty:true},init:function init(element){$.data(element,"velocity",{isSVG:Type.isSVG(element),isAnimating:false, /* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}});}, /* A parallel to jQuery's jQuery.css(), used for getting/setting Velocity's hooked CSS properties. */hook:null,mock:false,version:{major:1,minor:4,patch:3},debug:false,timestamp:true,pauseAll:function pauseAll(queueName){var currentTime=new Date().getTime();$.each(Velocity.State.calls,function(i,activeCall){if(activeCall){if(queueName!==undefined&&(activeCall[2].queue!==queueName||activeCall[2].queue===false)){return true;}activeCall[5]={resume:false};}});$.each(Velocity.State.delayedElements,function(k,element){if(!element){return;}pauseDelayOnElement(element,currentTime);});},resumeAll:function resumeAll(queueName){var currentTime=new Date().getTime();$.each(Velocity.State.calls,function(i,activeCall){if(activeCall){if(queueName!==undefined&&(activeCall[2].queue!==queueName||activeCall[2].queue===false)){return true;}if(activeCall[5]){activeCall[5].resume=true;}}});$.each(Velocity.State.delayedElements,function(k,element){if(!element){return;}resumeDelayOnElement(element,currentTime);});}}; /* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */if(window.pageYOffset!==undefined){Velocity.State.scrollAnchor=window;Velocity.State.scrollPropertyLeft="pageXOffset";Velocity.State.scrollPropertyTop="pageYOffset";}else {Velocity.State.scrollAnchor=document.documentElement||document.body.parentNode||document.body;Velocity.State.scrollPropertyLeft="scrollLeft";Velocity.State.scrollPropertyTop="scrollTop";}function VData(element){var response=$.data(element,"velocity");return response===null?undefined:response;} /**************
		 Delay Timer
		 **************/function pauseDelayOnElement(element,currentTime){var data=VData(element);if(data&&data.delayTimer&&!data.delayPaused){data.delayRemaining=data.delay-currentTime+data.delayBegin;data.delayPaused=true;clearTimeout(data.delayTimer.setTimeout);}}function resumeDelayOnElement(element,currentTime){var data=VData(element);if(data&&data.delayTimer&&data.delayPaused){data.delayPaused=false;data.delayTimer.setTimeout=setTimeout(data.delayTimer.next,data.delayRemaining);}} /**************
		 Easing
		 **************/function generateStep(steps){return function(p){return Math.round(p*steps)*(1/steps);};} /* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */function generateBezier(mX1,mY1,mX2,mY2){var NEWTON_ITERATIONS=4,NEWTON_MIN_SLOPE=0.001,SUBDIVISION_PRECISION=0.0000001,SUBDIVISION_MAX_ITERATIONS=10,kSplineTableSize=11,kSampleStepSize=1.0/(kSplineTableSize-1.0),float32ArraySupported="Float32Array" in window;if(arguments.length!==4){return false;}for(var i=0;i<4;++i){if(typeof arguments[i]!=="number"||isNaN(arguments[i])||!isFinite(arguments[i])){return false;}}mX1=Math.min(mX1,1);mX2=Math.min(mX2,1);mX1=Math.max(mX1,0);mX2=Math.max(mX2,0);var mSampleValues=float32ArraySupported?new Float32Array(kSplineTableSize):new Array(kSplineTableSize);function A(aA1,aA2){return 1.0-3.0*aA2+3.0*aA1;}function B(aA1,aA2){return 3.0*aA2-6.0*aA1;}function C(aA1){return 3.0*aA1;}function calcBezier(aT,aA1,aA2){return ((A(aA1,aA2)*aT+B(aA1,aA2))*aT+C(aA1))*aT;}function getSlope(aT,aA1,aA2){return 3.0*A(aA1,aA2)*aT*aT+2.0*B(aA1,aA2)*aT+C(aA1);}function newtonRaphsonIterate(aX,aGuessT){for(var i=0;i<NEWTON_ITERATIONS;++i){var currentSlope=getSlope(aGuessT,mX1,mX2);if(currentSlope===0.0){return aGuessT;}var currentX=calcBezier(aGuessT,mX1,mX2)-aX;aGuessT-=currentX/currentSlope;}return aGuessT;}function calcSampleValues(){for(var i=0;i<kSplineTableSize;++i){mSampleValues[i]=calcBezier(i*kSampleStepSize,mX1,mX2);}}function binarySubdivide(aX,aA,aB){var currentX,currentT,i=0;do {currentT=aA+(aB-aA)/2.0;currentX=calcBezier(currentT,mX1,mX2)-aX;if(currentX>0.0){aB=currentT;}else {aA=currentT;}}while(Math.abs(currentX)>SUBDIVISION_PRECISION&&++i<SUBDIVISION_MAX_ITERATIONS);return currentT;}function getTForX(aX){var intervalStart=0.0,currentSample=1,lastSample=kSplineTableSize-1;for(;currentSample!==lastSample&&mSampleValues[currentSample]<=aX;++currentSample){intervalStart+=kSampleStepSize;}--currentSample;var dist=(aX-mSampleValues[currentSample])/(mSampleValues[currentSample+1]-mSampleValues[currentSample]),guessForT=intervalStart+dist*kSampleStepSize,initialSlope=getSlope(guessForT,mX1,mX2);if(initialSlope>=NEWTON_MIN_SLOPE){return newtonRaphsonIterate(aX,guessForT);}else if(initialSlope===0.0){return guessForT;}else {return binarySubdivide(aX,intervalStart,intervalStart+kSampleStepSize);}}var _precomputed=false;function precompute(){_precomputed=true;if(mX1!==mY1||mX2!==mY2){calcSampleValues();}}var f=function f(aX){if(!_precomputed){precompute();}if(mX1===mY1&&mX2===mY2){return aX;}if(aX===0){return 0;}if(aX===1){return 1;}return calcBezier(getTForX(aX),mY1,mY2);};f.getControlPoints=function(){return [{x:mX1,y:mY1},{x:mX2,y:mY2}];};var str="generateBezier("+[mX1,mY1,mX2,mY2]+")";f.toString=function(){return str;};return f;} /* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */var generateSpringRK4=function(){function springAccelerationForState(state){return -state.tension*state.x-state.friction*state.v;}function springEvaluateStateWithDerivative(initialState,dt,derivative){var state={x:initialState.x+derivative.dx*dt,v:initialState.v+derivative.dv*dt,tension:initialState.tension,friction:initialState.friction};return {dx:state.v,dv:springAccelerationForState(state)};}function springIntegrateState(state,dt){var a={dx:state.v,dv:springAccelerationForState(state)},b=springEvaluateStateWithDerivative(state,dt*0.5,a),c=springEvaluateStateWithDerivative(state,dt*0.5,b),d=springEvaluateStateWithDerivative(state,dt,c),dxdt=1.0/6.0*(a.dx+2.0*(b.dx+c.dx)+d.dx),dvdt=1.0/6.0*(a.dv+2.0*(b.dv+c.dv)+d.dv);state.x=state.x+dxdt*dt;state.v=state.v+dvdt*dt;return state;}return function springRK4Factory(tension,friction,duration){var initState={x:-1,v:0,tension:null,friction:null},path=[0],time_lapsed=0,tolerance=1/10000,DT=16/1000,have_duration,dt,last_state;tension=parseFloat(tension)||500;friction=parseFloat(friction)||20;duration=duration||null;initState.tension=tension;initState.friction=friction;have_duration=duration!==null;if(have_duration){time_lapsed=springRK4Factory(tension,friction);dt=time_lapsed/duration*DT;}else {dt=DT;}while(true){ /* Next/step function .*/last_state=springIntegrateState(last_state||initState,dt);path.push(1+last_state.x);time_lapsed+=16;if(!(Math.abs(last_state.x)>tolerance&&Math.abs(last_state.v)>tolerance)){break;}}return !have_duration?time_lapsed:function(percentComplete){return path[percentComplete*(path.length-1)|0];};};}();Velocity.Easings={linear:function linear(p){return p;},swing:function swing(p){return 0.5-Math.cos(p*Math.PI)/2;},spring:function spring(p){return 1-Math.cos(p*4.5*Math.PI)*Math.exp(-p*6);}};$.each([["ease",[0.25,0.1,0.25,1.0]],["ease-in",[0.42,0.0,1.00,1.0]],["ease-out",[0.00,0.0,0.58,1.0]],["ease-in-out",[0.42,0.0,0.58,1.0]],["easeInSine",[0.47,0,0.745,0.715]],["easeOutSine",[0.39,0.575,0.565,1]],["easeInOutSine",[0.445,0.05,0.55,0.95]],["easeInQuad",[0.55,0.085,0.68,0.53]],["easeOutQuad",[0.25,0.46,0.45,0.94]],["easeInOutQuad",[0.455,0.03,0.515,0.955]],["easeInCubic",[0.55,0.055,0.675,0.19]],["easeOutCubic",[0.215,0.61,0.355,1]],["easeInOutCubic",[0.645,0.045,0.355,1]],["easeInQuart",[0.895,0.03,0.685,0.22]],["easeOutQuart",[0.165,0.84,0.44,1]],["easeInOutQuart",[0.77,0,0.175,1]],["easeInQuint",[0.755,0.05,0.855,0.06]],["easeOutQuint",[0.23,1,0.32,1]],["easeInOutQuint",[0.86,0,0.07,1]],["easeInExpo",[0.95,0.05,0.795,0.035]],["easeOutExpo",[0.19,1,0.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[0.6,0.04,0.98,0.335]],["easeOutCirc",[0.075,0.82,0.165,1]],["easeInOutCirc",[0.785,0.135,0.15,0.86]]],function(i,easingArray){Velocity.Easings[easingArray[0]]=generateBezier.apply(null,easingArray[1]);});function getEasing(value,duration){var easing=value; /* The easing option can either be a string that references a pre-registered easing,
			 or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */if(Type.isString(value)){if(!Velocity.Easings[value]){easing=false;}}else if(Type.isArray(value)&&value.length===1){easing=generateStep.apply(null,value);}else if(Type.isArray(value)&&value.length===2){easing=generateSpringRK4.apply(null,value.concat([duration]));}else if(Type.isArray(value)&&value.length===4){easing=generateBezier.apply(null,value);}else {easing=false;}if(easing===false){if(Velocity.Easings[Velocity.defaults.easing]){easing=Velocity.defaults.easing;}else {easing=EASING_DEFAULT;}}return easing;} /*****************
		 CSS Stack
		 *****************/var CSS=Velocity.CSS={ /*************
			 RegEx
			 *************/RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig}, /************
			 Lists
			 ************/Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"],units:["%", // relative
"em","ex","ch","rem", // font relative
"vw","vh","vmin","vmax", // viewport relative
"cm","mm","Q","in","pc","pt","px", // absolute lengths
"deg","grad","rad","turn", // angles
"s","ms" // time
],colorNames:{"aliceblue":"240,248,255","antiquewhite":"250,235,215","aquamarine":"127,255,212","aqua":"0,255,255","azure":"240,255,255","beige":"245,245,220","bisque":"255,228,196","black":"0,0,0","blanchedalmond":"255,235,205","blueviolet":"138,43,226","blue":"0,0,255","brown":"165,42,42","burlywood":"222,184,135","cadetblue":"95,158,160","chartreuse":"127,255,0","chocolate":"210,105,30","coral":"255,127,80","cornflowerblue":"100,149,237","cornsilk":"255,248,220","crimson":"220,20,60","cyan":"0,255,255","darkblue":"0,0,139","darkcyan":"0,139,139","darkgoldenrod":"184,134,11","darkgray":"169,169,169","darkgrey":"169,169,169","darkgreen":"0,100,0","darkkhaki":"189,183,107","darkmagenta":"139,0,139","darkolivegreen":"85,107,47","darkorange":"255,140,0","darkorchid":"153,50,204","darkred":"139,0,0","darksalmon":"233,150,122","darkseagreen":"143,188,143","darkslateblue":"72,61,139","darkslategray":"47,79,79","darkturquoise":"0,206,209","darkviolet":"148,0,211","deeppink":"255,20,147","deepskyblue":"0,191,255","dimgray":"105,105,105","dimgrey":"105,105,105","dodgerblue":"30,144,255","firebrick":"178,34,34","floralwhite":"255,250,240","forestgreen":"34,139,34","fuchsia":"255,0,255","gainsboro":"220,220,220","ghostwhite":"248,248,255","gold":"255,215,0","goldenrod":"218,165,32","gray":"128,128,128","grey":"128,128,128","greenyellow":"173,255,47","green":"0,128,0","honeydew":"240,255,240","hotpink":"255,105,180","indianred":"205,92,92","indigo":"75,0,130","ivory":"255,255,240","khaki":"240,230,140","lavenderblush":"255,240,245","lavender":"230,230,250","lawngreen":"124,252,0","lemonchiffon":"255,250,205","lightblue":"173,216,230","lightcoral":"240,128,128","lightcyan":"224,255,255","lightgoldenrodyellow":"250,250,210","lightgray":"211,211,211","lightgrey":"211,211,211","lightgreen":"144,238,144","lightpink":"255,182,193","lightsalmon":"255,160,122","lightseagreen":"32,178,170","lightskyblue":"135,206,250","lightslategray":"119,136,153","lightsteelblue":"176,196,222","lightyellow":"255,255,224","limegreen":"50,205,50","lime":"0,255,0","linen":"250,240,230","magenta":"255,0,255","maroon":"128,0,0","mediumaquamarine":"102,205,170","mediumblue":"0,0,205","mediumorchid":"186,85,211","mediumpurple":"147,112,219","mediumseagreen":"60,179,113","mediumslateblue":"123,104,238","mediumspringgreen":"0,250,154","mediumturquoise":"72,209,204","mediumvioletred":"199,21,133","midnightblue":"25,25,112","mintcream":"245,255,250","mistyrose":"255,228,225","moccasin":"255,228,181","navajowhite":"255,222,173","navy":"0,0,128","oldlace":"253,245,230","olivedrab":"107,142,35","olive":"128,128,0","orangered":"255,69,0","orange":"255,165,0","orchid":"218,112,214","palegoldenrod":"238,232,170","palegreen":"152,251,152","paleturquoise":"175,238,238","palevioletred":"219,112,147","papayawhip":"255,239,213","peachpuff":"255,218,185","peru":"205,133,63","pink":"255,192,203","plum":"221,160,221","powderblue":"176,224,230","purple":"128,0,128","red":"255,0,0","rosybrown":"188,143,143","royalblue":"65,105,225","saddlebrown":"139,69,19","salmon":"250,128,114","sandybrown":"244,164,96","seagreen":"46,139,87","seashell":"255,245,238","sienna":"160,82,45","silver":"192,192,192","skyblue":"135,206,235","slateblue":"106,90,205","slategray":"112,128,144","snow":"255,250,250","springgreen":"0,255,127","steelblue":"70,130,180","tan":"210,180,140","teal":"0,128,128","thistle":"216,191,216","tomato":"255,99,71","turquoise":"64,224,208","violet":"238,130,238","wheat":"245,222,179","whitesmoke":"245,245,245","white":"255,255,255","yellowgreen":"154,205,50","yellow":"255,255,0"}}, /************
			 Hooks
			 ************/Hooks:{ /********************
				 Registration
				 ********************/templates:{"textShadow":["Color X Y Blur","black 0px 0px 0px"],"boxShadow":["Color X Y Blur Spread","black 0px 0px 0px 0px"],"clip":["Top Right Bottom Left","0px 0px 0px 0px"],"backgroundPosition":["X Y","0% 0%"],"transformOrigin":["X Y Z","50% 50% 0px"],"perspectiveOrigin":["X Y","50% 50%"]},registered:{},register:function register(){for(var i=0;i<CSS.Lists.colors.length;i++){var rgbComponents=CSS.Lists.colors[i]==="color"?"0 0 0 1":"255 255 255 1";CSS.Hooks.templates[CSS.Lists.colors[i]]=["Red Green Blue Alpha",rgbComponents];}var rootProperty,hookTemplate,hookNames;if(IE){for(rootProperty in CSS.Hooks.templates){if(!CSS.Hooks.templates.hasOwnProperty(rootProperty)){continue;}hookTemplate=CSS.Hooks.templates[rootProperty];hookNames=hookTemplate[0].split(" ");var defaultValues=hookTemplate[1].match(CSS.RegEx.valueSplit);if(hookNames[0]==="Color"){hookNames.push(hookNames.shift());defaultValues.push(defaultValues.shift());CSS.Hooks.templates[rootProperty]=[hookNames.join(" "),defaultValues.join(" ")];}}}for(rootProperty in CSS.Hooks.templates){if(!CSS.Hooks.templates.hasOwnProperty(rootProperty)){continue;}hookTemplate=CSS.Hooks.templates[rootProperty];hookNames=hookTemplate[0].split(" ");for(var j in hookNames){if(!hookNames.hasOwnProperty(j)){continue;}var fullHookName=rootProperty+hookNames[j],hookPosition=j;CSS.Hooks.registered[fullHookName]=[rootProperty,hookPosition];}}}, /*****************************
				 Injection and Extraction
				 *****************************/getRoot:function getRoot(property){var hookVData=CSS.Hooks.registered[property];if(hookVData){return hookVData[0];}else {return property;}},getUnit:function getUnit(str,start){var unit=(str.substr(start||0,5).match(/^[a-z%]+/)||[])[0]||"";if(unit&&CSS.Lists.units.indexOf(unit)>=0){return unit;}return "";},fixColors:function fixColors(str){return str.replace(/(rgba?\(\s*)?(\b[a-z]+\b)/g,function($0,$1,$2){if(CSS.Lists.colorNames.hasOwnProperty($2)){return ($1?$1:"rgba(")+CSS.Lists.colorNames[$2]+($1?"":",1)");}return $1+$2;});},cleanRootPropertyValue:function cleanRootPropertyValue(rootProperty,rootPropertyValue){if(CSS.RegEx.valueUnwrap.test(rootPropertyValue)){rootPropertyValue=rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];}if(CSS.Values.isCSSNullValue(rootPropertyValue)){rootPropertyValue=CSS.Hooks.templates[rootProperty][1];}return rootPropertyValue;},extractValue:function extractValue(fullHookName,rootPropertyValue){var hookVData=CSS.Hooks.registered[fullHookName];if(hookVData){var hookRoot=hookVData[0],hookPosition=hookVData[1];rootPropertyValue=CSS.Hooks.cleanRootPropertyValue(hookRoot,rootPropertyValue);return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];}else {return rootPropertyValue;}},injectValue:function injectValue(fullHookName,hookValue,rootPropertyValue){var hookVData=CSS.Hooks.registered[fullHookName];if(hookVData){var hookRoot=hookVData[0],hookPosition=hookVData[1],rootPropertyValueParts,rootPropertyValueUpdated;rootPropertyValue=CSS.Hooks.cleanRootPropertyValue(hookRoot,rootPropertyValue);rootPropertyValueParts=rootPropertyValue.toString().match(CSS.RegEx.valueSplit);rootPropertyValueParts[hookPosition]=hookValue;rootPropertyValueUpdated=rootPropertyValueParts.join(" ");return rootPropertyValueUpdated;}else {return rootPropertyValue;}}}, /*******************
			 Normalizations
			 *******************/Normalizations:{registered:{clip:function clip(type,element,propertyValue){switch(type){case "name":return "clip";case "extract":var extracted;if(CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)){extracted=propertyValue;}else {extracted=propertyValue.toString().match(CSS.RegEx.valueUnwrap);extracted=extracted?extracted[1].replace(/,(\s+)?/g," "):propertyValue;}return extracted;case "inject":return "rect("+propertyValue+")";}},blur:function blur(type,element,propertyValue){switch(type){case "name":return Velocity.State.isFirefox?"filter":"-webkit-filter";case "extract":var extracted=parseFloat(propertyValue);if(!(extracted||extracted===0)){var blurComponent=propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);if(blurComponent){extracted=blurComponent[1];}else {extracted=0;}}return extracted;case "inject":if(!parseFloat(propertyValue)){return "none";}else {return "blur("+propertyValue+")";}}},opacity:function opacity(type,element,propertyValue){if(IE<=8){switch(type){case "name":return "filter";case "extract":var extracted=propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);if(extracted){propertyValue=extracted[1]/100;}else {propertyValue=1;}return propertyValue;case "inject":element.style.zoom=1;if(parseFloat(propertyValue)>=1){return "";}else {return "alpha(opacity="+parseInt(parseFloat(propertyValue)*100,10)+")";}}}else {switch(type){case "name":return "opacity";case "extract":return propertyValue;case "inject":return propertyValue;}}}}, /*****************************
				 Batched Registrations
				 *****************************/register:function register(){ /*****************
					 Transforms
					 *****************/ /* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
					 transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
					 from being normalized for these browsers so that tweening skips these properties altogether
					 (since it will ignore them as being unsupported by the browser.) */if((!IE||IE>9)&&!Velocity.State.isGingerbread){CSS.Lists.transformsBase=CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);}for(var i=0;i<CSS.Lists.transformsBase.length;i++){(function(){var transformName=CSS.Lists.transformsBase[i];CSS.Normalizations.registered[transformName]=function(type,element,propertyValue){switch(type){case "name":return "transform";case "extract":if(VData(element)===undefined||VData(element).transformCache[transformName]===undefined){return (/^scale/i.test(transformName)?1:0);}return VData(element).transformCache[transformName].replace(/[()]/g,"");case "inject":var invalid=false; /* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
										 Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. */switch(transformName.substr(0,transformName.length-1)){case "translate":invalid=!/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);break;case "scal":case "scale": /* Chrome on Android has a bug in which scaled elements blur if their initial scale
												 value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
												 and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */if(Velocity.State.isAndroid&&VData(element).transformCache[transformName]===undefined&&propertyValue<1){propertyValue=1;}invalid=!/(\d)$/i.test(propertyValue);break;case "skew":invalid=!/(deg|\d)$/i.test(propertyValue);break;case "rotate":invalid=!/(deg|\d)$/i.test(propertyValue);break;}if(!invalid){VData(element).transformCache[transformName]="("+propertyValue+")";}return VData(element).transformCache[transformName];}};})();} /*************
					 Colors
					 *************/ /* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
					 Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */for(var j=0;j<CSS.Lists.colors.length;j++){(function(){var colorName=CSS.Lists.colors[j];CSS.Normalizations.registered[colorName]=function(type,element,propertyValue){switch(type){case "name":return colorName; /* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */case "extract":var extracted;if(CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)){extracted=propertyValue;}else {var converted,colorNames={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};if(/^[A-z]+$/i.test(propertyValue)){if(colorNames[propertyValue]!==undefined){converted=colorNames[propertyValue];}else {converted=colorNames.black;}}else if(CSS.RegEx.isHex.test(propertyValue)){converted="rgb("+CSS.Values.hexToRgb(propertyValue).join(" ")+")";}else if(!/^rgba?\(/i.test(propertyValue)){converted=colorNames.black;} /* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
											 repeated spaces (in case the value included spaces to begin with). */extracted=(converted||propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ");}if((!IE||IE>8)&&extracted.split(" ").length===3){extracted+=" 1";}return extracted;case "inject":if(/^rgb/.test(propertyValue)){return propertyValue;}if(IE<=8){if(propertyValue.split(" ").length===4){propertyValue=propertyValue.split(/\s+/).slice(0,3).join(" ");}}else if(propertyValue.split(" ").length===3){propertyValue+=" 1";} /* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
										 on all values but the fourth (R, G, and B only accept whole numbers). */return (IE<=8?"rgb":"rgba")+"("+propertyValue.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")";}};})();} /**************
					 Dimensions
					 **************/function augmentDimension(name,element,wantInner){var isBorderBox=CSS.getPropertyValue(element,"boxSizing").toString().toLowerCase()==="border-box";if(isBorderBox===(wantInner||false)){ /* in box-sizing mode, the CSS width / height accessors already give the outerWidth / outerHeight. */var i,value,augment=0,sides=name==="width"?["Left","Right"]:["Top","Bottom"],fields=["padding"+sides[0],"padding"+sides[1],"border"+sides[0]+"Width","border"+sides[1]+"Width"];for(i=0;i<fields.length;i++){value=parseFloat(CSS.getPropertyValue(element,fields[i]));if(!isNaN(value)){augment+=value;}}return wantInner?-augment:augment;}return 0;}function getDimension(name,wantInner){return function(type,element,propertyValue){switch(type){case "name":return name;case "extract":return parseFloat(propertyValue)+augmentDimension(name,element,wantInner);case "inject":return parseFloat(propertyValue)-augmentDimension(name,element,wantInner)+"px";}};}CSS.Normalizations.registered.innerWidth=getDimension("width",true);CSS.Normalizations.registered.innerHeight=getDimension("height",true);CSS.Normalizations.registered.outerWidth=getDimension("width");CSS.Normalizations.registered.outerHeight=getDimension("height");}}, /************************
			 CSS Property Names
			 ************************/Names:{camelCase:function camelCase(property){return property.replace(/-(\w)/g,function(match,subMatch){return subMatch.toUpperCase();});}, /* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */SVGAttribute:function SVGAttribute(property){var SVGAttributes="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";if(IE||Velocity.State.isAndroid&&!Velocity.State.isChrome){SVGAttributes+="|transform";}return new RegExp("^("+SVGAttributes+")$","i").test(property);},prefixCheck:function prefixCheck(property){if(Velocity.State.prefixMatches[property]){return [Velocity.State.prefixMatches[property],true];}else {var vendors=["","Webkit","Moz","ms","O"];for(var i=0,vendorsLength=vendors.length;i<vendorsLength;i++){var propertyPrefixed;if(i===0){propertyPrefixed=property;}else {propertyPrefixed=vendors[i]+property.replace(/^\w/,function(match){return match.toUpperCase();});}if(Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])){Velocity.State.prefixMatches[property]=propertyPrefixed;return [propertyPrefixed,true];}}return [property,false];}}}, /************************
			 CSS Property Values
			 ************************/Values:{ /* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */hexToRgb:function hexToRgb(hex){var shortformRegex=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,longformRegex=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,rgbParts;hex=hex.replace(shortformRegex,function(m,r,g,b){return r+r+g+g+b+b;});rgbParts=longformRegex.exec(hex);return rgbParts?[parseInt(rgbParts[1],16),parseInt(rgbParts[2],16),parseInt(rgbParts[3],16)]:[0,0,0];},isCSSNullValue:function isCSSNullValue(value){ /* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
					 templates as defined as CSS.Hooks (for the sake of hook injection/extraction). */return !value||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value);},getUnitType:function getUnitType(property){if(/^(rotate|skew)/i.test(property)){return "deg";}else if(/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)){return "";}else {return "px";}}, /* Note: This function is used for correctly setting the non-"none" display value in certain Velocity redirects, such as fadeIn/Out. */getDisplayType:function getDisplayType(element){var tagName=element&&element.tagName.toString().toLowerCase();if(/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)){return "inline";}else if(/^(li)$/i.test(tagName)){return "list-item";}else if(/^(tr)$/i.test(tagName)){return "table-row";}else if(/^(table)$/i.test(tagName)){return "table";}else if(/^(tbody)$/i.test(tagName)){return "table-row-group";}else {return "block";}}, /* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */addClass:function addClass(element,className){if(element){if(element.classList){element.classList.add(className);}else if(Type.isString(element.className)){ // Element.className is around 15% faster then set/getAttribute
element.className+=(element.className.length?" ":"")+className;}else { // Work around for IE strict mode animating SVG - and anything else that doesn't behave correctly - the same way jQuery does it
var currentClass=element.getAttribute(IE<=7?"className":"class")||"";element.setAttribute("class",currentClass+(currentClass?" ":"")+className);}}},removeClass:function removeClass(element,className){if(element){if(element.classList){element.classList.remove(className);}else if(Type.isString(element.className)){ // Element.className is around 15% faster then set/getAttribute
// TODO: Need some jsperf tests on performance - can we get rid of the regex and maybe use split / array manipulation?
element.className=element.className.toString().replace(new RegExp("(^|\\s)"+className.split(" ").join("|")+"(\\s|$)","gi")," ");}else { // Work around for IE strict mode animating SVG - and anything else that doesn't behave correctly - the same way jQuery does it
var currentClass=element.getAttribute(IE<=7?"className":"class")||"";element.setAttribute("class",currentClass.replace(new RegExp("(^|\s)"+className.split(" ").join("|")+"(\s|$)","gi")," "));}}}}, /****************************
			 Style Getting & Setting
			 ****************************/getPropertyValue:function getPropertyValue(element,property,rootPropertyValue,forceStyleLookup){ /* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
				 style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
				 *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */function computePropertyValue(element,property){ /* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
					 element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
					 offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
					 We subtract border and padding to get the sum of interior + scrollbar. */var computedValue=0;if(IE<=8){computedValue=$.css(element,property);}else {var toggleDisplay=false;if(/^(width|height)$/.test(property)&&CSS.getPropertyValue(element,"display")===0){toggleDisplay=true;CSS.setPropertyValue(element,"display",CSS.Values.getDisplayType(element));}var revertDisplay=function revertDisplay(){if(toggleDisplay){CSS.setPropertyValue(element,"display","none");}};if(!forceStyleLookup){if(property==="height"&&CSS.getPropertyValue(element,"boxSizing").toString().toLowerCase()!=="border-box"){var contentBoxHeight=element.offsetHeight-(parseFloat(CSS.getPropertyValue(element,"borderTopWidth"))||0)-(parseFloat(CSS.getPropertyValue(element,"borderBottomWidth"))||0)-(parseFloat(CSS.getPropertyValue(element,"paddingTop"))||0)-(parseFloat(CSS.getPropertyValue(element,"paddingBottom"))||0);revertDisplay();return contentBoxHeight;}else if(property==="width"&&CSS.getPropertyValue(element,"boxSizing").toString().toLowerCase()!=="border-box"){var contentBoxWidth=element.offsetWidth-(parseFloat(CSS.getPropertyValue(element,"borderLeftWidth"))||0)-(parseFloat(CSS.getPropertyValue(element,"borderRightWidth"))||0)-(parseFloat(CSS.getPropertyValue(element,"paddingLeft"))||0)-(parseFloat(CSS.getPropertyValue(element,"paddingRight"))||0);revertDisplay();return contentBoxWidth;}}var computedStyle;if(VData(element)===undefined){computedStyle=window.getComputedStyle(element,null);}else if(!VData(element).computedStyle){computedStyle=VData(element).computedStyle=window.getComputedStyle(element,null);}else {computedStyle=VData(element).computedStyle;}if(property==="borderColor"){property="borderTopColor";}if(IE===9&&property==="filter"){computedValue=computedStyle.getPropertyValue(property);}else {computedValue=computedStyle[property];}if(computedValue===""||computedValue===null){computedValue=element.style[property];}revertDisplay();} /* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
					 property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
					 to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */if(computedValue==="auto"&&/^(top|right|bottom|left)$/i.test(property)){var position=computePropertyValue(element,"position");if(position==="fixed"||position==="absolute"&&/top|left/i.test(property)){computedValue=$(element).position()[property]+"px";}}return computedValue;}var propertyValue;if(CSS.Hooks.registered[property]){var hook=property,hookRoot=CSS.Hooks.getRoot(hook);if(rootPropertyValue===undefined){rootPropertyValue=CSS.getPropertyValue(element,CSS.Names.prefixCheck(hookRoot)[0]);}if(CSS.Normalizations.registered[hookRoot]){rootPropertyValue=CSS.Normalizations.registered[hookRoot]("extract",element,rootPropertyValue);}propertyValue=CSS.Hooks.extractValue(hook,rootPropertyValue);}else if(CSS.Normalizations.registered[property]){var normalizedPropertyName,normalizedPropertyValue;normalizedPropertyName=CSS.Normalizations.registered[property]("name",element);if(normalizedPropertyName!=="transform"){normalizedPropertyValue=computePropertyValue(element,CSS.Names.prefixCheck(normalizedPropertyName)[0]);if(CSS.Values.isCSSNullValue(normalizedPropertyValue)&&CSS.Hooks.templates[property]){normalizedPropertyValue=CSS.Hooks.templates[property][1];}}propertyValue=CSS.Normalizations.registered[property]("extract",element,normalizedPropertyValue);}if(!/^[\d-]/.test(propertyValue)){var data=VData(element);if(data&&data.isSVG&&CSS.Names.SVGAttribute(property)){ /* Since the height/width attribute values must be set manually, they don't reflect computed values.
						 Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */if(/^(height|width)$/i.test(property)){try{propertyValue=element.getBBox()[property];}catch(error){propertyValue=0;}}else {propertyValue=element.getAttribute(property);}}else {propertyValue=computePropertyValue(element,CSS.Names.prefixCheck(property)[0]);}}if(CSS.Values.isCSSNullValue(propertyValue)){propertyValue=0;}if(Velocity.debug>=2){console.log("Get "+property+": "+propertyValue);}return propertyValue;},setPropertyValue:function setPropertyValue(element,property,propertyValue,rootPropertyValue,scrollVData){var propertyName=property;if(property==="scroll"){if(scrollVData.container){scrollVData.container["scroll"+scrollVData.direction]=propertyValue;}else {if(scrollVData.direction==="Left"){window.scrollTo(propertyValue,scrollVData.alternateValue);}else {window.scrollTo(scrollVData.alternateValue,propertyValue);}}}else {if(CSS.Normalizations.registered[property]&&CSS.Normalizations.registered[property]("name",element)==="transform"){CSS.Normalizations.registered[property]("inject",element,propertyValue);propertyName="transform";propertyValue=VData(element).transformCache[property];}else {if(CSS.Hooks.registered[property]){var hookName=property,hookRoot=CSS.Hooks.getRoot(property);rootPropertyValue=rootPropertyValue||CSS.getPropertyValue(element,hookRoot);propertyValue=CSS.Hooks.injectValue(hookName,propertyValue,rootPropertyValue);property=hookRoot;}if(CSS.Normalizations.registered[property]){propertyValue=CSS.Normalizations.registered[property]("inject",element,propertyValue);property=CSS.Normalizations.registered[property]("name",element);}propertyName=CSS.Names.prefixCheck(property)[0]; /* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
						 Try/catch is avoided for other browsers since it incurs a performance overhead. */if(IE<=8){try{element.style[propertyName]=propertyValue;}catch(error){if(Velocity.debug){console.log("Browser does not support ["+propertyValue+"] for ["+propertyName+"]");}}}else {var data=VData(element);if(data&&data.isSVG&&CSS.Names.SVGAttribute(property)){element.setAttribute(property,propertyValue);}else {element.style[propertyName]=propertyValue;}}if(Velocity.debug>=2){console.log("Set "+property+" ("+propertyName+"): "+propertyValue);}}}return [propertyName,propertyValue];},flushTransformCache:function flushTransformCache(element){var transformString="",data=VData(element); /* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
				 (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */if((IE||Velocity.State.isAndroid&&!Velocity.State.isChrome)&&data&&data.isSVG){var getTransformFloat=function getTransformFloat(transformProperty){return parseFloat(CSS.getPropertyValue(element,transformProperty));}; /* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
					 we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */var SVGTransforms={translate:[getTransformFloat("translateX"),getTransformFloat("translateY")],skewX:[getTransformFloat("skewX")],skewY:[getTransformFloat("skewY")],scale:getTransformFloat("scale")!==1?[getTransformFloat("scale"),getTransformFloat("scale")]:[getTransformFloat("scaleX"),getTransformFloat("scaleY")],rotate:[getTransformFloat("rotateZ"),0,0]};$.each(VData(element).transformCache,function(transformName){ /* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
						 properties so that they match up with SVG's accepted transform properties. */if(/^translate/i.test(transformName)){transformName="translate";}else if(/^scale/i.test(transformName)){transformName="scale";}else if(/^rotate/i.test(transformName)){transformName="rotate";}if(SVGTransforms[transformName]){transformString+=transformName+"("+SVGTransforms[transformName].join(" ")+")"+" ";delete SVGTransforms[transformName];}});}else {var transformValue,perspective;$.each(VData(element).transformCache,function(transformName){transformValue=VData(element).transformCache[transformName];if(transformName==="transformPerspective"){perspective=transformValue;return true;}if(IE===9&&transformName==="rotateZ"){transformName="rotate";}transformString+=transformName+transformValue+" ";});if(perspective){transformString="perspective"+perspective+" "+transformString;}}CSS.setPropertyValue(element,"transform",transformString);}};CSS.Hooks.register();CSS.Normalizations.register();Velocity.hook=function(elements,arg2,arg3){var value;elements=sanitizeElements(elements);$.each(elements,function(i,element){if(VData(element)===undefined){Velocity.init(element);}if(arg3===undefined){if(value===undefined){value=CSS.getPropertyValue(element,arg2);}}else { /* sPV returns an array of the normalized propertyName/propertyValue pair used to update the DOM. */var adjustedSet=CSS.setPropertyValue(element,arg2,arg3);if(adjustedSet[0]==="transform"){Velocity.CSS.flushTransformCache(element);}value=adjustedSet;}});return value;}; /*****************
		 Animation
		 *****************/var animate=function animate(){var opts; /******************
			 Call Chain
			 ******************/function getChain(){if(isUtility){return promiseVData.promise||null; /* Otherwise, if we're using jQuery.fn, return the jQuery-/Zepto-wrapped element set. */}else {return elementsWrapped;}} /*************************
			 Arguments Assignment
			 *************************/var syntacticSugar=arguments[0]&&(arguments[0].p||$.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||Type.isString(arguments[0].properties)), /* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */isUtility, /* When Velocity is called via the utility function (jQuery.Velocity()/Velocity()), elements are explicitly
					 passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */elementsWrapped,argumentIndex;var elements,propertiesMap,options; /* Detect jQuery/Zepto elements being animated via the jQuery.fn method. */if(Type.isWrapped(this)){isUtility=false;argumentIndex=0;elements=this;elementsWrapped=this;}else {isUtility=true;argumentIndex=1;elements=syntacticSugar?arguments[0].elements||arguments[0].e:arguments[0];} /***************
			 Promises
			 ***************/var promiseVData={promise:null,resolver:null,rejecter:null}; /* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if
			 promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
			 method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
			 call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. */if(isUtility&&Velocity.Promise){promiseVData.promise=new Velocity.Promise(function(resolve,reject){promiseVData.resolver=resolve;promiseVData.rejecter=reject;});}if(syntacticSugar){propertiesMap=arguments[0].properties||arguments[0].p;options=arguments[0].options||arguments[0].o;}else {propertiesMap=arguments[argumentIndex];options=arguments[argumentIndex+1];}elements=sanitizeElements(elements);if(!elements){if(promiseVData.promise){if(!propertiesMap||!options||options.promiseRejectEmpty!==false){promiseVData.rejecter();}else {promiseVData.resolver();}}return;}var elementsLength=elements.length,elementsIndex=0; /***************************
			 Argument Overloading
			 ***************************/ /* Note: The stop/finish/pause/resume actions do not accept animation options, and are therefore excluded from this check. */if(!/^(stop|finish|finishAll|pause|resume)$/i.test(propertiesMap)&&!$.isPlainObject(options)){var startingArgumentPosition=argumentIndex+1;options={};for(var i=startingArgumentPosition;i<arguments.length;i++){if(!Type.isArray(arguments[i])&&(/^(fast|normal|slow)$/i.test(arguments[i])||/^\d/.test(arguments[i]))){options.duration=arguments[i];}else if(Type.isString(arguments[i])||Type.isArray(arguments[i])){options.easing=arguments[i];}else if(Type.isFunction(arguments[i])){options.complete=arguments[i];}}} /*********************
			 Action Detection
			 *********************/var action;switch(propertiesMap){case "scroll":action="scroll";break;case "reverse":action="reverse";break;case "pause": /*******************
					 Action: Pause
					 *******************/var currentTime=new Date().getTime();$.each(elements,function(i,element){pauseDelayOnElement(element,currentTime);}); /* Pause and Resume are call-wide (not on a per element basis). Thus, calling pause or resume on a 
					 single element will cause any calls that containt tweens for that element to be paused/resumed
					 as well. */$.each(Velocity.State.calls,function(i,activeCall){var found=false;if(activeCall){$.each(activeCall[1],function(k,activeElement){var queueName=options===undefined?"":options;if(queueName!==true&&activeCall[2].queue!==queueName&&!(options===undefined&&activeCall[2].queue===false)){return true;}$.each(elements,function(l,element){if(element===activeElement){activeCall[5]={resume:false};found=true;return false;}});if(found){return false;}});}});return getChain();case "resume": /*******************
					 Action: Resume
					 *******************/$.each(elements,function(i,element){resumeDelayOnElement(element,currentTime);}); /* Pause and Resume are call-wide (not on a per elemnt basis). Thus, calling pause or resume on a 
					 single element will cause any calls that containt tweens for that element to be paused/resumed
					 as well. */$.each(Velocity.State.calls,function(i,activeCall){var found=false;if(activeCall){$.each(activeCall[1],function(k,activeElement){var queueName=options===undefined?"":options;if(queueName!==true&&activeCall[2].queue!==queueName&&!(options===undefined&&activeCall[2].queue===false)){return true;}if(!activeCall[5]){return true;}$.each(elements,function(l,element){if(element===activeElement){activeCall[5].resume=true;found=true;return false;}});if(found){return false;}});}});return getChain();case "finish":case "finishAll":case "stop": /*******************
					 Action: Stop
					 *******************/$.each(elements,function(i,element){if(VData(element)&&VData(element).delayTimer){clearTimeout(VData(element).delayTimer.setTimeout);if(VData(element).delayTimer.next){VData(element).delayTimer.next();}delete VData(element).delayTimer;}if(propertiesMap==="finishAll"&&(options===true||Type.isString(options))){$.each($.queue(element,Type.isString(options)?options:""),function(_,item){if(Type.isFunction(item)){item();}});$.queue(element,Type.isString(options)?options:"",[]);}});var callsToStop=[]; /* Note: The stop command runs prior to Velocity's Queueing phase since its behavior is intended to take effect *immediately*,
					 regardless of the element's current queue state. */$.each(Velocity.State.calls,function(i,activeCall){if(activeCall){$.each(activeCall[1],function(k,activeElement){var queueName=options===undefined?"":options;if(queueName!==true&&activeCall[2].queue!==queueName&&!(options===undefined&&activeCall[2].queue===false)){return true;}$.each(elements,function(l,element){if(element===activeElement){if(options===true||Type.isString(options)){$.each($.queue(element,Type.isString(options)?options:""),function(_,item){if(Type.isFunction(item)){item(null,true);}});$.queue(element,Type.isString(options)?options:"",[]);}if(propertiesMap==="stop"){var data=VData(element);if(data&&data.tweensContainer&&queueName!==false){$.each(data.tweensContainer,function(m,activeTween){activeTween.endValue=activeTween.currentValue;});}callsToStop.push(i);}else if(propertiesMap==="finish"||propertiesMap==="finishAll"){activeCall[2].duration=1;}}});});}});if(propertiesMap==="stop"){$.each(callsToStop,function(i,j){completeCall(j,true);});if(promiseVData.promise){promiseVData.resolver(elements);}}return getChain();default:if($.isPlainObject(propertiesMap)&&!Type.isEmptyObject(propertiesMap)){action="start"; /****************
						 Redirects
						 ****************/}else if(Type.isString(propertiesMap)&&Velocity.Redirects[propertiesMap]){opts=$.extend({},options);var durationOriginal=opts.duration,delayOriginal=opts.delay||0;if(opts.backwards===true){elements=$.extend(true,[],elements).reverse();}$.each(elements,function(elementIndex,element){if(parseFloat(opts.stagger)){opts.delay=delayOriginal+parseFloat(opts.stagger)*elementIndex;}else if(Type.isFunction(opts.stagger)){opts.delay=delayOriginal+opts.stagger.call(element,elementIndex,elementsLength);} /* If the drag option was passed in, successively increase/decrease (depending on the presense of opts.backwards)
							 the duration of each element's animation, using floors to prevent producing very short durations. */if(opts.drag){opts.duration=parseFloat(durationOriginal)||(/^(callout|transition)/.test(propertiesMap)?1000:DURATION_DEFAULT); /* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
								 B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
								 The end result is a baseline of 75% of the redirect's duration that increases/decreases as the end of the element set is approached. */opts.duration=Math.max(opts.duration*(opts.backwards?1-elementIndex/elementsLength:(elementIndex+1)/elementsLength),opts.duration*0.75,200);}Velocity.Redirects[propertiesMap].call(element,element,opts||{},elementIndex,elementsLength,elements,promiseVData.promise?promiseVData:undefined);});return getChain();}else {var abortError="Velocity: First argument ("+propertiesMap+") was not a property map, a known action, or a registered redirect. Aborting.";if(promiseVData.promise){promiseVData.rejecter(new Error(abortError));}else {console.log(abortError);}return getChain();}} /**************************
			 Call-Wide Variables
			 **************************/var callUnitConversionVData={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null};var call=[]; /************************
			 Element Processing
			 ************************/ /* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
			 1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
			 2) Queueing: The logic that runs once this call has reached its point of execution in the element's jQuery.queue() stack. Most logic is placed here to avoid risking it becoming stale.
			 3) Pushing: Consolidation of the tween data followed by its push onto the $ in-progress calls container.
			 `elementArrayIndex` allows passing index of the element in the original array to value functions.
			 If `elementsIndex` were used instead the index would be determined by the elements' per-element queue.
			 */function processElement(element,elementArrayIndex){ /*************************
				 Part I: Pre-Queueing
				 *************************/ /***************************
				 Element-Wide Variables
				 ***************************/var opts=$.extend({},Velocity.defaults,options),tweensContainer={},elementUnitConversionVData; /******************
				 Element Init
				 ******************/if(VData(element)===undefined){Velocity.init(element);} /******************
				 Option: Delay
				 ******************/if(parseFloat(opts.delay)&&opts.queue!==false){$.queue(element,opts.queue,function(next){Velocity.velocityQueueEntryFlag=true; /* The ensuing queue item (which is assigned to the "next" argument that jQuery.queue() automatically passes in) will be triggered after a setTimeout delay.
						 The setTimeout is stored so that it can be subjected to clearTimeout() if this animation is prematurely stopped via Velocity's "stop" command, and
						 delayBegin/delayTime is used to ensure we can "pause" and "resume" a tween that is still mid-delay. */ /* Temporarily store delayed elements to facilite access for $ pause/resume */var callIndex=Velocity.State.delayedElements.count++;Velocity.State.delayedElements[callIndex]=element;var delayComplete=function(index){return function(){Velocity.State.delayedElements[index]=false;next();};}(callIndex);VData(element).delayBegin=new Date().getTime();VData(element).delay=parseFloat(opts.delay);VData(element).delayTimer={setTimeout:setTimeout(next,parseFloat(opts.delay)),next:delayComplete};});} /*********************
				 Option: Duration
				 *********************/switch(opts.duration.toString().toLowerCase()){case "fast":opts.duration=200;break;case "normal":opts.duration=DURATION_DEFAULT;break;case "slow":opts.duration=600;break;default:opts.duration=parseFloat(opts.duration)||1;} /************************
				 Global Option: Mock
				 ************************/if(Velocity.mock!==false){if(Velocity.mock===true){opts.duration=opts.delay=1;}else {opts.duration*=parseFloat(Velocity.mock)||1;opts.delay*=parseFloat(Velocity.mock)||1;}} /*******************
				 Option: Easing
				 *******************/opts.easing=getEasing(opts.easing,opts.duration); /**********************
				 Option: Callbacks
				 **********************/if(opts.begin&&!Type.isFunction(opts.begin)){opts.begin=null;}if(opts.progress&&!Type.isFunction(opts.progress)){opts.progress=null;}if(opts.complete&&!Type.isFunction(opts.complete)){opts.complete=null;} /*********************************
				 Option: Display & Visibility
				 *********************************/ /* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. */if(opts.display!==undefined&&opts.display!==null){opts.display=opts.display.toString().toLowerCase();if(opts.display==="auto"){opts.display=Velocity.CSS.Values.getDisplayType(element);}}if(opts.visibility!==undefined&&opts.visibility!==null){opts.visibility=opts.visibility.toString().toLowerCase();} /**********************
				 Option: mobileHA
				 **********************/ /* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */opts.mobileHA=opts.mobileHA&&Velocity.State.isMobile&&!Velocity.State.isGingerbread; /***********************
				 Part II: Queueing
				 ***********************/function buildQueue(next){var data,lastTweensContainer; /*******************
					 Option: Begin
					 *******************/if(opts.begin&&elementsIndex===0){try{opts.begin.call(elements,elements);}catch(error){setTimeout(function(){throw error;},1);}} /*****************************************
					 Tween VData Construction (for Scroll)
					 *****************************************/if(action==="scroll"){var scrollDirection=/^x$/i.test(opts.axis)?"Left":"Top",scrollOffset=parseFloat(opts.offset)||0,scrollPositionCurrent,scrollPositionCurrentAlternate,scrollPositionEnd;if(opts.container){if(Type.isWrapped(opts.container)||Type.isNode(opts.container)){opts.container=opts.container[0]||opts.container;scrollPositionCurrent=opts.container["scroll"+scrollDirection]; /* jQuery.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
								 -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
								 the scroll container's current scroll position. */scrollPositionEnd=scrollPositionCurrent+$(element).position()[scrollDirection.toLowerCase()]+scrollOffset;}else {opts.container=null;}}else {scrollPositionCurrent=Velocity.State.scrollAnchor[Velocity.State["scrollProperty"+scrollDirection]];scrollPositionCurrentAlternate=Velocity.State.scrollAnchor[Velocity.State["scrollProperty"+(scrollDirection==="Left"?"Top":"Left")]];scrollPositionEnd=$(element).offset()[scrollDirection.toLowerCase()]+scrollOffset;}tweensContainer={scroll:{rootPropertyValue:false,startValue:scrollPositionCurrent,currentValue:scrollPositionCurrent,endValue:scrollPositionEnd,unitType:"",easing:opts.easing,scrollVData:{container:opts.container,direction:scrollDirection,alternateValue:scrollPositionCurrentAlternate}},element:element};if(Velocity.debug){console.log("tweensContainer (scroll): ",tweensContainer.scroll,element);} /******************************************
						 Tween VData Construction (for Reverse)
						 ******************************************/ /* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
						 there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
						 as reverting to the element's values as they were prior to the previous *Velocity* call. */}else if(action==="reverse"){data=VData(element);if(!data){return;}if(!data.tweensContainer){$.dequeue(element,opts.queue);return;}else { /*********************
							 Options Parsing
							 *********************/if(data.opts.display==="none"){data.opts.display="auto";}if(data.opts.visibility==="hidden"){data.opts.visibility="visible";}data.opts.loop=false;data.opts.begin=null;data.opts.complete=null;if(!options.easing){delete opts.easing;}if(!options.duration){delete opts.duration;}opts=$.extend({},data.opts,opts); /*************************************
							 Tweens Container Reconstruction
							 *************************************/lastTweensContainer=$.extend(true,{},data?data.tweensContainer:null);for(var lastTween in lastTweensContainer){if(lastTweensContainer.hasOwnProperty(lastTween)&&lastTween!=="element"){var lastStartValue=lastTweensContainer[lastTween].startValue;lastTweensContainer[lastTween].startValue=lastTweensContainer[lastTween].currentValue=lastTweensContainer[lastTween].endValue;lastTweensContainer[lastTween].endValue=lastStartValue;if(!Type.isEmptyObject(options)){lastTweensContainer[lastTween].easing=opts.easing;}if(Velocity.debug){console.log("reverse tweensContainer ("+lastTween+"): "+JSON.stringify(lastTweensContainer[lastTween]),element);}}}tweensContainer=lastTweensContainer;} /*****************************************
						 Tween VData Construction (for Start)
						 *****************************************/}else if(action==="start"){ /*************************
						 Value Transferring
						 *************************/ /* If this queue entry follows a previous Velocity-initiated queue entry *and* if this entry was created
						 while the element was in the process of being animated by Velocity, then this current call is safe to use
						 the end values from the prior call as its start values. Velocity attempts to perform this value transfer
						 process whenever possible in order to avoid requerying the DOM. */ /* Note: Conversely, animation reversal (and looping) *always* perform inter-call value transfers; they never requery the DOM. */data=VData(element);if(data&&data.tweensContainer&&data.isAnimating===true){lastTweensContainer=data.tweensContainer;} /***************************
						 Tween VData Calculation
						 ***************************/ /* Property map values can either take the form of 1) a single value representing the end value,
						 or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
						 The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
						 the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */var parsePropertyValue=function parsePropertyValue(valueVData,skipResolvingEasing){var endValue,easing,startValue;if(Type.isFunction(valueVData)){valueVData=valueVData.call(element,elementArrayIndex,elementsLength);}if(Type.isArray(valueVData)){endValue=valueVData[0];if(!Type.isArray(valueVData[1])&&/^[\d-]/.test(valueVData[1])||Type.isFunction(valueVData[1])||CSS.RegEx.isHex.test(valueVData[1])){startValue=valueVData[1];}else if(Type.isString(valueVData[1])&&!CSS.RegEx.isHex.test(valueVData[1])&&Velocity.Easings[valueVData[1]]||Type.isArray(valueVData[1])){easing=skipResolvingEasing?valueVData[1]:getEasing(valueVData[1],opts.duration);startValue=valueVData[2];}else {startValue=valueVData[1]||valueVData[2];}}else {endValue=valueVData;}if(!skipResolvingEasing){easing=easing||opts.easing;}if(Type.isFunction(endValue)){endValue=endValue.call(element,elementArrayIndex,elementsLength);}if(Type.isFunction(startValue)){startValue=startValue.call(element,elementArrayIndex,elementsLength);}return [endValue||0,easing,startValue];};var fixPropertyValue=function fixPropertyValue(property,valueVData){var rootProperty=CSS.Hooks.getRoot(property),rootPropertyValue=false,endValue=valueVData[0],easing=valueVData[1],startValue=valueVData[2],pattern; /**************************
							 Start Value Sourcing
							 **************************/if((!data||!data.isSVG)&&rootProperty!=="tween"&&CSS.Names.prefixCheck(rootProperty)[1]===false&&CSS.Normalizations.registered[rootProperty]===undefined){if(Velocity.debug){console.log("Skipping ["+rootProperty+"] due to a lack of browser support.");}return;}if((opts.display!==undefined&&opts.display!==null&&opts.display!=="none"||opts.visibility!==undefined&&opts.visibility!=="hidden")&&/opacity|filter/.test(property)&&!startValue&&endValue!==0){startValue=0;} /* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
							 for all of the current call's properties that were *also* animated in the previous call. */if(opts._cacheValues&&lastTweensContainer&&lastTweensContainer[property]){if(startValue===undefined){startValue=lastTweensContainer[property].endValue+lastTweensContainer[property].unitType;}rootPropertyValue=data.rootPropertyValueCache[rootProperty];}else {if(CSS.Hooks.registered[property]){if(startValue===undefined){rootPropertyValue=CSS.getPropertyValue(element,rootProperty);startValue=CSS.getPropertyValue(element,property,rootPropertyValue);}else {rootPropertyValue=CSS.Hooks.templates[rootProperty][1];}}else if(startValue===undefined){startValue=CSS.getPropertyValue(element,property);}} /**************************
							 Value VData Extraction
							 **************************/var separatedValue,endValueUnitType,startValueUnitType,operator=false;var separateValue=function separateValue(property,value){var unitType,numericValue;numericValue=(value||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(match){unitType=match;return "";});if(!unitType){unitType=CSS.Values.getUnitType(property);}return [numericValue,unitType];};if(startValue!==endValue&&Type.isString(startValue)&&Type.isString(endValue)){pattern="";var iStart=0, // index in startValue
iEnd=0, // index in endValue
aStart=[], // array of startValue numbers
aEnd=[], // array of endValue numbers
inCalc=0, // Keep track of being inside a "calc()" so we don't duplicate it
inRGB=0, // Keep track of being inside an RGB as we can't use fractional values
inRGBA=0; // Keep track of being inside an RGBA as we must pass fractional for the alpha channel
startValue=CSS.Hooks.fixColors(startValue);endValue=CSS.Hooks.fixColors(endValue);while(iStart<startValue.length&&iEnd<endValue.length){var cStart=startValue[iStart],cEnd=endValue[iEnd];if(/[\d\.-]/.test(cStart)&&/[\d\.-]/.test(cEnd)){var tStart=cStart, // temporary character buffer
tEnd=cEnd, // temporary character buffer
dotStart=".", // Make sure we can only ever match a single dot in a decimal
dotEnd="."; // Make sure we can only ever match a single dot in a decimal
while(++iStart<startValue.length){cStart=startValue[iStart];if(cStart===dotStart){dotStart=".."; // Can never match two characters
}else if(!/\d/.test(cStart)){break;}tStart+=cStart;}while(++iEnd<endValue.length){cEnd=endValue[iEnd];if(cEnd===dotEnd){dotEnd=".."; // Can never match two characters
}else if(!/\d/.test(cEnd)){break;}tEnd+=cEnd;}var uStart=CSS.Hooks.getUnit(startValue,iStart), // temporary unit type
uEnd=CSS.Hooks.getUnit(endValue,iEnd); // temporary unit type
iStart+=uStart.length;iEnd+=uEnd.length;if(uStart===uEnd){ // Same units
if(tStart===tEnd){ // Same numbers, so just copy over
pattern+=tStart+uStart;}else { // Different numbers, so store them
pattern+="{"+aStart.length+(inRGB?"!":"")+"}"+uStart;aStart.push(parseFloat(tStart));aEnd.push(parseFloat(tEnd));}}else { // Different units, so put into a "calc(from + to)" and animate each side to/from zero
var nStart=parseFloat(tStart),nEnd=parseFloat(tEnd);pattern+=(inCalc<5?"calc":"")+"("+(nStart?"{"+aStart.length+(inRGB?"!":"")+"}":"0")+uStart+" + "+(nEnd?"{"+(aStart.length+(nStart?1:0))+(inRGB?"!":"")+"}":"0")+uEnd+")";if(nStart){aStart.push(nStart);aEnd.push(0);}if(nEnd){aStart.push(0);aEnd.push(nEnd);}}}else if(cStart===cEnd){pattern+=cStart;iStart++;iEnd++; // Keep track of being inside a calc()
if(inCalc===0&&cStart==="c"||inCalc===1&&cStart==="a"||inCalc===2&&cStart==="l"||inCalc===3&&cStart==="c"||inCalc>=4&&cStart==="("){inCalc++;}else if(inCalc&&inCalc<5||inCalc>=4&&cStart===")"&&--inCalc<5){inCalc=0;} // Keep track of being inside an rgb() / rgba()
if(inRGB===0&&cStart==="r"||inRGB===1&&cStart==="g"||inRGB===2&&cStart==="b"||inRGB===3&&cStart==="a"||inRGB>=3&&cStart==="("){if(inRGB===3&&cStart==="a"){inRGBA=1;}inRGB++;}else if(inRGBA&&cStart===","){if(++inRGBA>3){inRGB=inRGBA=0;}}else if(inRGBA&&inRGB<(inRGBA?5:4)||inRGB>=(inRGBA?4:3)&&cStart===")"&&--inRGB<(inRGBA?5:4)){inRGB=inRGBA=0;}}else {inCalc=0; // TODO: changing units, fixing colours
break;}}if(iStart!==startValue.length||iEnd!==endValue.length){if(Velocity.debug){console.error("Trying to pattern match mis-matched strings [\""+endValue+"\", \""+startValue+"\"]");}pattern=undefined;}if(pattern){if(aStart.length){if(Velocity.debug){console.log("Pattern found \""+pattern+"\" -> ",aStart,aEnd,"["+startValue+","+endValue+"]");}startValue=aStart;endValue=aEnd;endValueUnitType=startValueUnitType="";}else {pattern=undefined;}}}if(!pattern){separatedValue=separateValue(property,startValue);startValue=separatedValue[0];startValueUnitType=separatedValue[1];separatedValue=separateValue(property,endValue);endValue=separatedValue[0].replace(/^([+-\/*])=/,function(match,subMatch){operator=subMatch;return "";});endValueUnitType=separatedValue[1];startValue=parseFloat(startValue)||0;endValue=parseFloat(endValue)||0; /***************************************
								 Property-Specific Value Conversion
								 ***************************************/if(endValueUnitType==="%"){ /* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
									 which is identical to the em unit's behavior, so we piggyback off of that. */if(/^(fontSize|lineHeight)$/.test(property)){endValue=endValue/100;endValueUnitType="em";}else if(/^scale/.test(property)){endValue=endValue/100;endValueUnitType="";}else if(/(Red|Green|Blue)$/i.test(property)){endValue=endValue/100*255;endValueUnitType="";}}} /***************************
							 Unit Ratio Calculation
							 ***************************/ /* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
							 %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
							 for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
							 from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
							 1) Calculating the ratio of %/em/rem/vh/vw relative to pixels
							 2) Converting startValue into the same unit of measurement as endValue based on these ratios. */var calculateUnitRatios=function calculateUnitRatios(){ /************************
								 Same Ratio Checks
								 ************************/var sameRatioIndicators={myParent:element.parentNode||document.body,position:CSS.getPropertyValue(element,"position"),fontSize:CSS.getPropertyValue(element,"fontSize")},samePercentRatio=sameRatioIndicators.position===callUnitConversionVData.lastPosition&&sameRatioIndicators.myParent===callUnitConversionVData.lastParent,sameEmRatio=sameRatioIndicators.fontSize===callUnitConversionVData.lastFontSize;callUnitConversionVData.lastParent=sameRatioIndicators.myParent;callUnitConversionVData.lastPosition=sameRatioIndicators.position;callUnitConversionVData.lastFontSize=sameRatioIndicators.fontSize; /***************************
								 Element-Specific Units
								 ***************************/var measurement=100,unitRatios={};if(!sameEmRatio||!samePercentRatio){var dummy=data&&data.isSVG?document.createElementNS("http://www.w3.org/2000/svg","rect"):document.createElement("div");Velocity.init(dummy);sameRatioIndicators.myParent.appendChild(dummy); /* To accurately and consistently calculate conversion ratios, the element's cascaded overflow and box-sizing are stripped.
									 Similarly, since width/height can be artificially constrained by their min-/max- equivalents, these are controlled for as well. */$.each(["overflow","overflowX","overflowY"],function(i,property){Velocity.CSS.setPropertyValue(dummy,property,"hidden");});Velocity.CSS.setPropertyValue(dummy,"position",sameRatioIndicators.position);Velocity.CSS.setPropertyValue(dummy,"fontSize",sameRatioIndicators.fontSize);Velocity.CSS.setPropertyValue(dummy,"boxSizing","content-box");$.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(i,property){Velocity.CSS.setPropertyValue(dummy,property,measurement+"%");});Velocity.CSS.setPropertyValue(dummy,"paddingLeft",measurement+"em");unitRatios.percentToPxWidth=callUnitConversionVData.lastPercentToPxWidth=(parseFloat(CSS.getPropertyValue(dummy,"width",null,true))||1)/measurement;unitRatios.percentToPxHeight=callUnitConversionVData.lastPercentToPxHeight=(parseFloat(CSS.getPropertyValue(dummy,"height",null,true))||1)/measurement;unitRatios.emToPx=callUnitConversionVData.lastEmToPx=(parseFloat(CSS.getPropertyValue(dummy,"paddingLeft"))||1)/measurement;sameRatioIndicators.myParent.removeChild(dummy);}else {unitRatios.emToPx=callUnitConversionVData.lastEmToPx;unitRatios.percentToPxWidth=callUnitConversionVData.lastPercentToPxWidth;unitRatios.percentToPxHeight=callUnitConversionVData.lastPercentToPxHeight;} /***************************
								 Element-Agnostic Units
								 ***************************/if(callUnitConversionVData.remToPx===null){callUnitConversionVData.remToPx=parseFloat(CSS.getPropertyValue(document.body,"fontSize"))||16;}if(callUnitConversionVData.vwToPx===null){callUnitConversionVData.vwToPx=parseFloat(window.innerWidth)/100;callUnitConversionVData.vhToPx=parseFloat(window.innerHeight)/100;}unitRatios.remToPx=callUnitConversionVData.remToPx;unitRatios.vwToPx=callUnitConversionVData.vwToPx;unitRatios.vhToPx=callUnitConversionVData.vhToPx;if(Velocity.debug>=1){console.log("Unit ratios: "+JSON.stringify(unitRatios),element);}return unitRatios;}; /********************
							 Unit Conversion
							 ********************/ /* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */if(/[\/*]/.test(operator)){endValueUnitType=startValueUnitType;}else if(startValueUnitType!==endValueUnitType&&startValue!==0){ /* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. */if(endValue===0){endValueUnitType=startValueUnitType;}else {elementUnitConversionVData=elementUnitConversionVData||calculateUnitRatios(); /* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */var axis=/margin|padding|left|right|width|text|word|letter/i.test(property)||/X$/.test(property)||property==="x"?"x":"y";switch(startValueUnitType){case "%": /* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
											 Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
											 to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */startValue*=axis==="x"?elementUnitConversionVData.percentToPxWidth:elementUnitConversionVData.percentToPxHeight;break;case "px":break;default:startValue*=elementUnitConversionVData[startValueUnitType+"ToPx"];}switch(endValueUnitType){case "%":startValue*=1/(axis==="x"?elementUnitConversionVData.percentToPxWidth:elementUnitConversionVData.percentToPxHeight);break;case "px":break;default:startValue*=1/elementUnitConversionVData[endValueUnitType+"ToPx"];}}} /*********************
							 Relative Values
							 *********************/ /* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
							 to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
							 50 points is added on top of the current % value. */switch(operator){case "+":endValue=startValue+endValue;break;case "-":endValue=startValue-endValue;break;case "*":endValue=startValue*endValue;break;case "/":endValue=startValue/endValue;break;} /**************************
							 tweensContainer Push
							 **************************/tweensContainer[property]={rootPropertyValue:rootPropertyValue,startValue:startValue,currentValue:startValue,endValue:endValue,unitType:endValueUnitType,easing:easing};if(pattern){tweensContainer[property].pattern=pattern;}if(Velocity.debug){console.log("tweensContainer ("+property+"): "+JSON.stringify(tweensContainer[property]),element);}};for(var property in propertiesMap){if(!propertiesMap.hasOwnProperty(property)){continue;}var propertyName=CSS.Names.camelCase(property),valueVData=parsePropertyValue(propertiesMap[property]);if(CSS.Lists.colors.indexOf(propertyName)>=0){var endValue=valueVData[0],easing=valueVData[1],startValue=valueVData[2];if(CSS.RegEx.isHex.test(endValue)){var colorComponents=["Red","Green","Blue"],endValueRGB=CSS.Values.hexToRgb(endValue),startValueRGB=startValue?CSS.Values.hexToRgb(startValue):undefined;for(var i=0;i<colorComponents.length;i++){var dataArray=[endValueRGB[i]];if(easing){dataArray.push(easing);}if(startValueRGB!==undefined){dataArray.push(startValueRGB[i]);}fixPropertyValue(propertyName+colorComponents[i],dataArray);}continue;}}fixPropertyValue(propertyName,valueVData);}tweensContainer.element=element;} /*****************
					 Call Push
					 *****************/if(tweensContainer.element){CSS.Values.addClass(element,"velocity-animating");call.push(tweensContainer);data=VData(element);if(data){if(opts.queue===""){data.tweensContainer=tweensContainer;data.opts=opts;}data.isAnimating=true;}if(elementsIndex===elementsLength-1){Velocity.State.calls.push([call,elements,opts,null,promiseVData.resolver,null,0]);if(Velocity.State.isTicking===false){Velocity.State.isTicking=true;tick();}}else {elementsIndex++;}}}if(opts.queue===false){if(opts.delay){ /* Temporarily store delayed elements to facilitate access for $ pause/resume */var callIndex=Velocity.State.delayedElements.count++;Velocity.State.delayedElements[callIndex]=element;var delayComplete=function(index){return function(){Velocity.State.delayedElements[index]=false;buildQueue();};}(callIndex);VData(element).delayBegin=new Date().getTime();VData(element).delay=parseFloat(opts.delay);VData(element).delayTimer={setTimeout:setTimeout(buildQueue,parseFloat(opts.delay)),next:delayComplete};}else {buildQueue();}}else {$.queue(element,opts.queue,function(next,clearQueue){if(clearQueue===true){if(promiseVData.promise){promiseVData.resolver(elements);}return true;}Velocity.velocityQueueEntryFlag=true;buildQueue(next);});} /*********************
				 Auto-Dequeuing
				 *********************/ /* As per jQuery's jQuery.queue() behavior, to fire the first non-custom-queue entry on an element, the element
				 must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
				 for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
				 queue is further appended with additional items -- including jQuery.delay()'s or even jQuery.animate() calls, the queue's
				 first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. */ /* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, jQuery.queue() function.
				 Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */if((opts.queue===""||opts.queue==="fx")&&$.queue(element)[0]!=="inprogress"){$.dequeue(element);}} /**************************
			 Element Set Iteration
			 **************************/$.each(elements,function(i,element){if(Type.isNode(element)){processElement(element,i);}}); /******************
			 Option: Loop
			 ******************/opts=$.extend({},Velocity.defaults,options);opts.loop=parseInt(opts.loop,10);var reverseCallsCount=opts.loop*2-1;if(opts.loop){for(var x=0;x<reverseCallsCount;x++){ /* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
					 isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
					 call so that the delay logic that occurs inside *Pre-Queueing* can process it. */var reverseOptions={delay:opts.delay,progress:opts.progress};if(x===reverseCallsCount-1){reverseOptions.display=opts.display;reverseOptions.visibility=opts.visibility;reverseOptions.complete=opts.complete;}animate(elements,"reverse",reverseOptions);}} /***************
			 Chaining
			 ***************/return getChain();};Velocity=$.extend(animate,Velocity);Velocity.animate=animate; /**************
		 Timing
		 **************/var ticker=window.requestAnimationFrame; /* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
		 To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
		 devices to avoid wasting battery power on inactive tabs. */if(!Velocity.State.isMobile&&document.hidden!==undefined){var updateTicker=function updateTicker(){if(document.hidden){ticker=function ticker(callback){return setTimeout(function(){callback(true);},16);};tick();}else {ticker=window.requestAnimationFrame;}};updateTicker();document.addEventListener("visibilitychange",updateTicker);} /************
		 Tick
		 ************/function tick(timestamp){if(timestamp){var timeCurrent=Velocity.timestamp&&timestamp!==true?timestamp:performance.now(); /********************
				 Call Iteration
				 ********************/var callsLength=Velocity.State.calls.length;if(callsLength>10000){Velocity.State.calls=compactSparseArray(Velocity.State.calls);callsLength=Velocity.State.calls.length;}for(var i=0;i<callsLength;i++){if(!Velocity.State.calls[i]){continue;} /************************
					 Call-Wide Variables
					 ************************/var callContainer=Velocity.State.calls[i],call=callContainer[0],opts=callContainer[2],timeStart=callContainer[3],firstTick=!!timeStart,tweenDummyValue=null,pauseObject=callContainer[5],millisecondsEllapsed=callContainer[6];if(!timeStart){timeStart=Velocity.State.calls[i][3]=timeCurrent-16;}if(pauseObject){if(pauseObject.resume===true){timeStart=callContainer[3]=Math.round(timeCurrent-millisecondsEllapsed-16);callContainer[5]=null;}else {continue;}}millisecondsEllapsed=callContainer[6]=timeCurrent-timeStart;var percentComplete=Math.min(millisecondsEllapsed/opts.duration,1); /**********************
					 Element Iteration
					 **********************/for(var j=0,callLength=call.length;j<callLength;j++){var tweensContainer=call[j],element=tweensContainer.element;if(!VData(element)){continue;}var transformPropertyExists=false; /**********************************
						 Display & Visibility Toggling
						 **********************************/if(opts.display!==undefined&&opts.display!==null&&opts.display!=="none"){if(opts.display==="flex"){var flexValues=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];$.each(flexValues,function(i,flexValue){CSS.setPropertyValue(element,"display",flexValue);});}CSS.setPropertyValue(element,"display",opts.display);}if(opts.visibility!==undefined&&opts.visibility!=="hidden"){CSS.setPropertyValue(element,"visibility",opts.visibility);} /************************
						 Property Iteration
						 ************************/for(var property in tweensContainer){if(tweensContainer.hasOwnProperty(property)&&property!=="element"){var tween=tweensContainer[property],currentValue, /* Easing can either be a pre-genereated function or a string that references a pre-registered easing
										 on the Velocity.Easings object. In either case, return the appropriate easing *function*. */easing=Type.isString(tween.easing)?Velocity.Easings[tween.easing]:tween.easing; /******************************
								 Current Value Calculation
								 ******************************/if(Type.isString(tween.pattern)){var patternReplace=percentComplete===1?function($0,index,round){var result=tween.endValue[index];return round?Math.round(result):result;}:function($0,index,round){var startValue=tween.startValue[index],tweenDelta=tween.endValue[index]-startValue,result=startValue+tweenDelta*easing(percentComplete,opts,tweenDelta);return round?Math.round(result):result;};currentValue=tween.pattern.replace(/{(\d+)(!)?}/g,patternReplace);}else if(percentComplete===1){currentValue=tween.endValue;}else {var tweenDelta=tween.endValue-tween.startValue;currentValue=tween.startValue+tweenDelta*easing(percentComplete,opts,tweenDelta);}if(!firstTick&&currentValue===tween.currentValue){continue;}tween.currentValue=currentValue;if(property==="tween"){tweenDummyValue=currentValue;}else { /******************
									 Hooks: Part I
									 ******************/var hookRoot;if(CSS.Hooks.registered[property]){hookRoot=CSS.Hooks.getRoot(property);var rootPropertyValueCache=VData(element).rootPropertyValueCache[hookRoot];if(rootPropertyValueCache){tween.rootPropertyValue=rootPropertyValueCache;}} /*****************
									 DOM Update
									 *****************/var adjustedSetVData=CSS.setPropertyValue(element,property,tween.currentValue+(IE<9&&parseFloat(currentValue)===0?"":tween.unitType),tween.rootPropertyValue,tween.scrollVData); /*******************
									 Hooks: Part II
									 *******************/if(CSS.Hooks.registered[property]){if(CSS.Normalizations.registered[hookRoot]){VData(element).rootPropertyValueCache[hookRoot]=CSS.Normalizations.registered[hookRoot]("extract",null,adjustedSetVData[1]);}else {VData(element).rootPropertyValueCache[hookRoot]=adjustedSetVData[1];}} /***************
									 Transforms
									 ***************/if(adjustedSetVData[0]==="transform"){transformPropertyExists=true;}}}} /****************
						 mobileHA
						 ****************/if(opts.mobileHA){if(VData(element).transformCache.translate3d===undefined){VData(element).transformCache.translate3d="(0px, 0px, 0px)";transformPropertyExists=true;}}if(transformPropertyExists){CSS.flushTransformCache(element);}}if(opts.display!==undefined&&opts.display!=="none"){Velocity.State.calls[i][2].display=false;}if(opts.visibility!==undefined&&opts.visibility!=="hidden"){Velocity.State.calls[i][2].visibility=false;}if(opts.progress){opts.progress.call(callContainer[1],callContainer[1],percentComplete,Math.max(0,timeStart+opts.duration-timeCurrent),timeStart,tweenDummyValue);}if(percentComplete===1){completeCall(i);}}}if(Velocity.State.isTicking){ticker(tick);}} /**********************
		 Call Completion
		 **********************/function completeCall(callIndex,isStopped){if(!Velocity.State.calls[callIndex]){return false;}var call=Velocity.State.calls[callIndex][0],elements=Velocity.State.calls[callIndex][1],opts=Velocity.State.calls[callIndex][2],resolver=Velocity.State.calls[callIndex][4];var remainingCallsExist=false; /*************************
			 Element Finalization
			 *************************/for(var i=0,callLength=call.length;i<callLength;i++){var element=call[i].element;if(!isStopped&&!opts.loop){if(opts.display==="none"){CSS.setPropertyValue(element,"display",opts.display);}if(opts.visibility==="hidden"){CSS.setPropertyValue(element,"visibility",opts.visibility);}}var data=VData(element);if(opts.loop!==true&&($.queue(element)[1]===undefined||!/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))){if(data){data.isAnimating=false;data.rootPropertyValueCache={};var transformHAPropertyExists=false;$.each(CSS.Lists.transforms3D,function(i,transformName){var defaultValue=/^scale/.test(transformName)?1:0,currentValue=data.transformCache[transformName];if(data.transformCache[transformName]!==undefined&&new RegExp("^\\("+defaultValue+"[^.]").test(currentValue)){transformHAPropertyExists=true;delete data.transformCache[transformName];}});if(opts.mobileHA){transformHAPropertyExists=true;delete data.transformCache.translate3d;}if(transformHAPropertyExists){CSS.flushTransformCache(element);}CSS.Values.removeClass(element,"velocity-animating");}} /*********************
				 Option: Complete
				 *********************/if(!isStopped&&opts.complete&&!opts.loop&&i===callLength-1){try{opts.complete.call(elements,elements);}catch(error){setTimeout(function(){throw error;},1);}} /**********************
				 Promise Resolving
				 **********************/if(resolver&&opts.loop!==true){resolver(elements);} /****************************
				 Option: Loop (Infinite)
				 ****************************/if(data&&opts.loop===true&&!isStopped){ /* If a rotateX/Y/Z property is being animated by 360 deg with loop:true, swap tween start/end values to enable
					 continuous iterative rotation looping. (Otherise, the element would just rotate back and forth.) */$.each(data.tweensContainer,function(propertyName,tweenContainer){if(/^rotate/.test(propertyName)&&(parseFloat(tweenContainer.startValue)-parseFloat(tweenContainer.endValue))%360===0){var oldStartValue=tweenContainer.startValue;tweenContainer.startValue=tweenContainer.endValue;tweenContainer.endValue=oldStartValue;}if(/^backgroundPosition/.test(propertyName)&&parseFloat(tweenContainer.endValue)===100&&tweenContainer.unitType==="%"){tweenContainer.endValue=0;tweenContainer.startValue=100;}});Velocity(element,"reverse",{loop:true,delay:opts.delay});} /***************
				 Dequeueing
				 ***************/if(opts.queue!==false){$.dequeue(element,opts.queue);}} /************************
			 Calls Array Cleanup
			 ************************/ /* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
			 (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */Velocity.State.calls[callIndex]=false;for(var j=0,callsLength=Velocity.State.calls.length;j<callsLength;j++){if(Velocity.State.calls[j]!==false){remainingCallsExist=true;break;}}if(remainingCallsExist===false){Velocity.State.isTicking=false;delete Velocity.State.calls;Velocity.State.calls=[];}} /******************
		 Frameworks
		 ******************/$.Velocity=Velocity;if($$2!==window){$.fn.velocity=animate;$.fn.velocity.defaults=Velocity.defaults;} /***********************
		 Packaged Redirects
		 ***********************/$.each(["Down","Up"],function(i,direction){Velocity.Redirects["slide"+direction]=function(element,options,elementsIndex,elementsSize,elements,promiseVData){var opts=$.extend({},options),begin=opts.begin,complete=opts.complete,inlineValues={},computedValues={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""};if(opts.display===undefined){opts.display=direction==="Down"?Velocity.CSS.Values.getDisplayType(element)==="inline"?"inline-block":"block":"none";}opts.begin=function(){if(elementsIndex===0&&begin){begin.call(elements,elements);}for(var property in computedValues){if(!computedValues.hasOwnProperty(property)){continue;}inlineValues[property]=element.style[property];var propertyValue=CSS.getPropertyValue(element,property);computedValues[property]=direction==="Down"?[propertyValue,0]:[0,propertyValue];}inlineValues.overflow=element.style.overflow;element.style.overflow="hidden";};opts.complete=function(){for(var property in inlineValues){if(inlineValues.hasOwnProperty(property)){element.style[property]=inlineValues[property];}}if(elementsIndex===elementsSize-1){if(complete){complete.call(elements,elements);}if(promiseVData){promiseVData.resolver(elements);}}};Velocity(element,computedValues,opts);};});$.each(["In","Out"],function(i,direction){Velocity.Redirects["fade"+direction]=function(element,options,elementsIndex,elementsSize,elements,promiseVData){var opts=$.extend({},options),complete=opts.complete,propertiesMap={opacity:direction==="In"?1:0};if(elementsIndex!==0){opts.begin=null;}if(elementsIndex!==elementsSize-1){opts.complete=null;}else {opts.complete=function(){if(complete){complete.call(elements,elements);}if(promiseVData){promiseVData.resolver(elements);}};}if(opts.display===undefined){opts.display=direction==="In"?"auto":"none";}Velocity(this,propertiesMap,opts);};});$.easing={linear:function linear(p){return p;},swing:function swing(p){return 0.5-Math.cos(p*Math.PI)/2;},jswing:function jswing(p){return 0.5-Math.cos(p*Math.PI)/2;},easeInOutMaterial:function easeInOutMaterial(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return c/4*((t-=2)*t*t+2)+b;},_default:"swing"};$.extend($.easing,{def:'easeOutQuad',swing:function swing(x,t,b,c,d){ //alert(jQuery.easing.default);
return $.easing[$.easing.def](x,t,b,c,d);},easeInQuad:function easeInQuad(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function easeOutQuad(x,t,b,c,d){return -c*(t/=d)*(t-2)+b;},easeInOutQuad:function easeInOutQuad(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return -c/2*(--t*(t-2)-1)+b;},easeInCubic:function easeInCubic(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function easeOutCubic(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function easeInOutCubic(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function easeInQuart(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function easeOutQuart(x,t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function easeInOutQuart(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return -c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function easeInQuint(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function easeOutQuint(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function easeInOutQuint(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function easeInSine(x,t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function easeOutSine(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function easeInOutSine(x,t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function easeInExpo(x,t,b,c,d){return t==0?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function easeOutExpo(x,t,b,c,d){return t==d?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function easeInOutExpo(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function easeInCirc(x,t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function easeOutCirc(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function easeInOutCirc(x,t,b,c,d){if((t/=d/2)<1)return -c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function easeInElastic(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function easeOutElastic(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function easeInOutElastic(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return -.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function easeInBack(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function easeOutBack(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function easeInOutBack(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=1.525)+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+b;},easeInBounce:function easeInBounce(x,t,b,c,d){return c-$.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function easeOutBounce(x,t,b,c,d){if((t/=d)<1/2.75){return c*(7.5625*t*t)+b;}else if(t<2/2.75){return c*(7.5625*(t-=1.5/2.75)*t+.75)+b;}else if(t<2.5/2.75){return c*(7.5625*(t-=2.25/2.75)*t+.9375)+b;}else {return c*(7.5625*(t-=2.625/2.75)*t+.984375)+b;}},easeInOutBounce:function easeInOutBounce(x,t,b,c,d){if(t<d/2)return $.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return $.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});$.fn.animate=$.fn.animate||$.fn.velocity;$.fn.slideDown=$.fn.slideDown||function(){return this.each(function(){$(this).velocity('slideDown');});};$.fn.slideUp=$.fn.slideUp||function(){return this.each(function(){$(this).velocity('slideDown');});};$.fn.fadeOut=function(speed,easing,callback){return this.each(function(){$(this).velocity({opacity:'hide'},speed,easing,callback);});};$.fn.fadeIn=function(speed,easing,callback){return this.each(function(){$(this).velocity({opacity:'show'},speed,easing,callback);});};$.fn.stop=$.fn.stop||function(){return this.each(function(){$(this).velocity('stop');});};

// Source: src/helpers/materialize_initial.js
var $$1 = $;
var Materialize = {};
var Waves = {};
var $$ = document.querySelectorAll.bind(document);

var guidfn = function guidfn() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
};
// Unique ID
Materialize.guid = guidfn();

// Source: src/helpers/collapsible.js

$$1.fn.collapsible = function (options) {
  var defaults = {
    accordion: undefined
  };

  options = $$1.extend(defaults, options);

  return this.each(function () {

    var $this = $$1(this);

    var $panel_headers = $$1(this).find('> li > .collapsible-header');

    var collapsible_type = $this.data("collapsible");

    // Turn off any existing event handlers
    $this.off('click.collapse', '> li > .collapsible-header');
    $panel_headers.off('click.collapse');

    /****************
    Helper Functions
    ****************/

    // Accordion Open
    function accordionOpen(object) {
      $panel_headers = $this.find('> li > .collapsible-header');
      if (object.hasClass('active')) {
        object.parent().addClass('active');
        object.siblings('.collapsible-body').velocity('slideDown', function () {
          $$1(this).css('height', '');
        }).trigger('shown');
      } else {
        object.parent().removeClass('active');
        object.siblings('.collapsible-body').velocity('slideUp').trigger('hidden');
      }

      $panel_headers.not(object).removeClass('active').parent().removeClass('active');
      $panel_headers.not(object).parent().children('.collapsible-body').velocity('slideUp').trigger('hidden');
    }

    // Expandable Open
    function expandableOpen(object) {
      if (object.hasClass('active')) {
        object.parent().addClass('active');
        object.siblings('.collapsible-body').velocity('slideDown', function () {
          $$1(this).css('height', '');
        }).trigger('shown');
      } else {
        object.parent().removeClass('active');
        object.siblings('.collapsible-body').velocity('slideUp').trigger('hidden');
      }
    }

    /**
     * Get panel header from a children element
     * @param  {Object} object Jquery object
     * @return {Object} panel header object
     */
    function getPanelHeader(object) {

      return object.closest('li > .collapsible-header');
    }

    /**
     * Check if object is children of panel header
     * @param  {Object}  object Jquery object
     * @return {Boolean} true if it is children
     */
    function isChildrenOfPanelHeader(object) {

      var panelHeader = getPanelHeader(object);

      return panelHeader.length > 0;
    }

    /*****  End Helper Functions  *****/

    // Add click handler to only direct collapsible header children
    $this.on('click.collapse', '> li > .collapsible-header', function (e) {
      var $header = $$1(this),
          element = $$1(e.target);

      if (isChildrenOfPanelHeader(element)) {
        element = getPanelHeader(element);
      }

      element.toggleClass('active');

      if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) {
        // Handle Accordion
        accordionOpen(element);
      } else {
        // Handle Expandables
        expandableOpen(element);

        if ($header.hasClass('active')) {
          expandableOpen($header);
        }
      }
    });

    if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) {
      // Handle Accordion
      accordionOpen($panel_headers.filter('.active').first());
    } else {
      // Handle Expandables
      $panel_headers.filter('.active').each(function () {
        expandableOpen($$1(this));
      });
    }
  });
};

$$1(document).ready(function () {
  $$1('.collapsible').collapsible();
});

// Source: src/helpers/dropdown.js

// Add posibility to scroll to selected option
// usefull for select for example
$$1.fn.scrollTo = function (elem) {
  $$1(this).scrollTop($$1(this).scrollTop() - $$1(this).offset().top + $$1(elem).offset().top);
  return this;
};

$$1.fn.dropdown = function (option) {
  var defaults = {
    inDuration: 300,
    outDuration: 225,
    constrain_width: true, // Constrains width of dropdown to the activator
    hover: false,
    gutter: 0, // Spacing from edge
    belowOrigin: false,
    alignment: 'left'
  };

  this.each(function () {
    var origin = $$1(this);
    var options = $$1.extend({}, defaults, option);
    var isFocused = false;

    // Dropdown menu
    var activates = $$1("#" + origin.attr('data-activates'));

    function updateOptions() {
      if (origin.data('induration') !== undefined) options.inDuration = origin.data('inDuration');
      if (origin.data('outduration') !== undefined) options.outDuration = origin.data('outDuration');
      if (origin.data('constrainwidth') !== undefined) options.constrain_width = origin.data('constrainwidth');
      if (origin.data('hover') !== undefined) options.hover = origin.data('hover');
      if (origin.data('gutter') !== undefined) options.gutter = origin.data('gutter');
      if (origin.data('beloworigin') !== undefined) options.belowOrigin = origin.data('beloworigin');
      if (origin.data('alignment') !== undefined) options.alignment = origin.data('alignment');
    }

    updateOptions();

    // Attach dropdown to its activator
    origin.after(activates);

    /*
      Helper function to position and resize dropdown.
      Used in hover and click handler.
    */
    function placeDropdown(eventType) {
      // Check for simultaneous focus and click events.
      if (eventType === 'focus') {
        isFocused = true;
      }

      // Check html data attributes
      updateOptions();

      // Set Dropdown state
      activates.addClass('active');
      origin.addClass('active');

      // Constrain width
      if (options.constrain_width === true) {
        activates.css('width', origin.outerWidth());
      } else {
        activates.css('white-space', 'nowrap');
      }

      // Offscreen detection
      var windowHeight = window.innerHeight;
      var originHeight = origin.innerHeight();
      var offsetLeft = origin.offset().left;
      var offsetTop = origin.offset().top - $$1(window).scrollTop();
      var currAlignment = options.alignment;
      var gutterSpacing = 0;
      var leftPosition = 0;

      // Below Origin
      var verticalOffset = 0;
      if (options.belowOrigin === true) {
        verticalOffset = originHeight;
      }

      // Check for scrolling positioned container.
      var scrollOffset = 0;
      var wrapper = origin.parent();
      if (!wrapper.is('body') && wrapper[0].scrollHeight > wrapper[0].clientHeight) {
        scrollOffset = wrapper[0].scrollTop;
      }

      if (offsetLeft + activates.innerWidth() > $$1(window).width()) {
        // Dropdown goes past screen on right, force right alignment
        currAlignment = 'right';
      } else if (offsetLeft - activates.innerWidth() + origin.innerWidth() < 0) {
        // Dropdown goes past screen on left, force left alignment
        currAlignment = 'left';
      }
      // Vertical bottom offscreen detection
      if (offsetTop + activates.innerHeight() > windowHeight) {
        // If going upwards still goes offscreen, just crop height of dropdown.
        if (offsetTop + originHeight - activates.innerHeight() < 0) {
          var adjustedHeight = windowHeight - offsetTop - verticalOffset;
          activates.css('max-height', adjustedHeight);
        } else {
          // Flow upwards.
          if (!verticalOffset) {
            verticalOffset += originHeight;
          }
          verticalOffset -= activates.innerHeight();
        }
      }

      // Handle edge alignment
      if (currAlignment === 'left') {
        gutterSpacing = options.gutter;
        leftPosition = origin.position().left + gutterSpacing;
      } else if (currAlignment === 'right') {
        var offsetRight = origin.position().left + origin.outerWidth() - activates.outerWidth();
        gutterSpacing = -options.gutter;
        leftPosition = offsetRight + gutterSpacing;
      }

      // Position dropdown
      activates.css({
        position: 'absolute',
        top: origin.position().top + verticalOffset + scrollOffset,
        left: leftPosition
      });

      // Show dropdown
      activates.stop(true, true).css('opacity', 0).slideDown({
        queue: false,
        duration: options.inDuration,
        easing: 'easeOutCubic',
        complete: function complete() {
          $$1(this).css('height', '');
        }
      }).animate({
        opacity: 1
      }, {
        queue: false,
        duration: options.inDuration,
        easing: 'easeOutSine'
      });
    }

    function hideDropdown() {
      // Check for simultaneous focus and click events.
      isFocused = false;
      activates.fadeOut(options.outDuration);
      activates.removeClass('active');
      origin.removeClass('active');
      setTimeout(function () {
        activates.css('max-height', '');
      }, options.outDuration);
    }

    // Hover
    if (options.hover) {
      var open = false;
      origin.unbind('click.' + origin.attr('id'));
      // Hover handler to show dropdown
      origin.on('mouseenter', function (e) {
        // Mouse over
        if (open === false) {
          placeDropdown();
          open = true;
        }
      });
      origin.on('mouseleave', function (e) {
        // If hover on origin then to something other than dropdown content, then close
        var toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
        if (!$$1(toEl).closest('.dropdown-content').is(activates)) {
          activates.stop(true, true);
          hideDropdown();
          open = false;
        }
      });

      activates.on('mouseleave', function (e) {
        // Mouse out
        var toEl = e.toElement || e.relatedTarget;
        if (!$$1(toEl).closest('.dropdown-button').is(origin)) {
          activates.stop(true, true);
          hideDropdown();
          open = false;
        }
      });

      // Click
    } else {
        // Click handler to show dropdown
        origin.unbind('click.' + origin.attr('id'));
        origin.bind('click.' + origin.attr('id'), function (e) {
          if (!isFocused) {
            if (origin[0] == e.currentTarget && !origin.hasClass('active') && $$1(e.target).closest('.dropdown-content').length === 0) {
              e.preventDefault(); // Prevents button click from moving window
              placeDropdown('click');
            }
            // If origin is clicked and menu is open, close menu
            else if (origin.hasClass('active')) {
                hideDropdown();
                $$1(document).unbind('click.' + activates.attr('id') + ' touchstart.' + activates.attr('id'));
              }
            // If menu open, add click close handler to document
            if (activates.hasClass('active')) {
              $$1(document).bind('click.' + activates.attr('id') + ' touchstart.' + activates.attr('id'), function (e) {
                if (!activates.is(e.target) && !origin.is(e.target) && !origin.find(e.target).length) {
                  hideDropdown();
                  $$1(document).unbind('click.' + activates.attr('id') + ' touchstart.' + activates.attr('id'));
                }
              });
            }
          }
        });
      } // End else

    // Listen to open and close event - useful for select component
    origin.on('open', function (e, eventType) {
      placeDropdown(eventType);
    });
    origin.on('close', hideDropdown);
  });
}; // End dropdown plugin
$$1.fn.material_select = function (callback) {
  $$1(this).each(function () {
    var $select = $$1(this);

    if ($select.hasClass('browser-default')) {
      return; // Continue to next (return false breaks out of entire loop)
    }

    var multiple = $select.attr('multiple') ? true : false,
        lastID = $select.data('select-id'); // Tear down structure if Select needs to be rebuilt

    if (lastID) {
      $select.parent().find('span.caret').remove();
      $select.parent().find('input').remove();

      $select.unwrap();
      $$1('ul#select-options-' + lastID).remove();
    }

    // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
    if (callback === 'destroy') {
      $select.data('select-id', null).removeClass('initialized');
      return;
    }

    var uniqueID = Materialize.guid();
    $select.data('select-id', uniqueID);
    var wrapper = $$1('<div class="select-wrapper"></div>');
    wrapper.addClass($select.attr('class'));
    var options = $$1('<ul id="select-options-' + uniqueID + '" class="dropdown-content select-dropdown ' + (multiple ? 'multiple-select-dropdown' : '') + '"></ul>'),
        selectChildren = $select.children('option, optgroup'),
        valuesSelected = [],
        optionsHover = false;

    var label = $select.find('option:selected').html() || $select.find('option:first').html() || "";

    // Function that renders and appends the option taking into
    // account type and possible image icon.
    var appendOptionWithIcon = function appendOptionWithIcon(select, option, type) {
      // Add disabled attr if disabled
      var disabledClass = option.is(':disabled') ? 'disabled ' : '';
      var optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';

      // add icons
      var icon_url = option.data('icon');
      var classes = option.attr('class');
      if (!!icon_url) {
        var classString = '';
        if (!!classes) classString = ' class="' + classes + '"';

        // Check for multiple type.
        if (type === 'multiple') {
          options.append($$1('<li class="' + disabledClass + '"><img src="' + icon_url + '"' + classString + '><span><input type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
        } else {
          options.append($$1('<li class="' + disabledClass + optgroupClass + '"><img src="' + icon_url + '"' + classString + '><span>' + option.html() + '</span></li>'));
        }
        return true;
      }

      // Check for multiple type.
      if (type === 'multiple') {
        options.append($$1('<li class="' + disabledClass + '"><span><input type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
      } else {
        options.append($$1('<li class="' + disabledClass + optgroupClass + '"><span>' + option.html() + '</span></li>'));
      }
    };

    /* Create dropdown structure. */
    if (selectChildren.length) {
      selectChildren.each(function () {
        if ($$1(this).is('option')) {
          // Direct descendant option.
          if (multiple) {
            appendOptionWithIcon($select, $$1(this), 'multiple');
          } else {
            appendOptionWithIcon($select, $$1(this));
          }
        } else if ($$1(this).is('optgroup')) {
          // Optgroup.
          var selectOptions = $$1(this).children('option');
          options.append($$1('<li class="optgroup"><span>' + $$1(this).attr('label') + '</span></li>'));

          selectOptions.each(function () {
            appendOptionWithIcon($select, $$1(this), 'optgroup-option');
          });
        }
      });
    }

    options.find('li:not(.optgroup)').each(function (i) {
      $$1(this).click(function (e) {
        // Check if option element is disabled
        if (!$$1(this).hasClass('disabled') && !$$1(this).hasClass('optgroup')) {
          var selected = true;

          if (multiple) {
            $$1('input[type="checkbox"]', this).prop('checked', function (i, v) {
              return !v;
            });
            selected = toggleEntryFromArray(valuesSelected, $$1(this).index(), $select);
            $newSelect.trigger('focus');
          } else {
            options.find('li').removeClass('active');
            $$1(this).toggleClass('active');
            $newSelect.val($$1(this).text());
          }

          activateOption(options, $$1(this));
          $select.find('option').eq(i).prop('selected', selected);
          // Trigger onchange() event
          $select.trigger('change');
          if (typeof callback !== 'undefined') callback();
        }

        e.stopPropagation();
      });
    });

    // Wrap Elements
    $select.wrap(wrapper);
    // Add Select Display Element
    var dropdownIcon = $$1('<span class="caret">&#9660;</span>');
    if ($select.is(':disabled')) dropdownIcon.addClass('disabled');

    // escape double quotes
    var sanitizedLabelHtml = label.replace(/"/g, '&quot;');

    var $newSelect = $$1('<input type="text" class="select-dropdown" readonly="true" ' + ($select.is(':disabled') ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID + '" value="' + sanitizedLabelHtml + '"/>');
    $select.before($newSelect);
    $newSelect.before(dropdownIcon);

    $newSelect.after(options);
    // Check if section element is disabled
    if (!$select.is(':disabled')) {
      $newSelect.dropdown({
        'hover': false,
        'closeOnClick': false
      });
    }

    // Copy tabindex
    if ($select.attr('tabindex')) {
      $$1($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
    }

    $select.addClass('initialized');

    $newSelect.on({
      'focus': function focus() {
        if ($$1('ul.select-dropdown').not(options[0]).is(':visible')) {
          $$1('input.select-dropdown').trigger('close');
        }
        if (!options.is(':visible')) {
          $$1(this).trigger('open', ['focus']);
          var label = $$1(this).val();
          var selectedOption = options.find('li').filter(function () {
            return $$1(this).text().toLowerCase() === label.toLowerCase();
          })[0];
          activateOption(options, selectedOption);
        }
      },
      'click': function click(e) {
        e.stopPropagation();
      }
    });

    $newSelect.on('blur', function () {
      if (!multiple) {
        $$1(this).trigger('close');
      }
      options.find('li.selected').removeClass('selected');
    });

    options.hover(function () {
      optionsHover = true;
    }, function () {
      optionsHover = false;
    });

    $$1(window).on({
      'click': function click() {
        multiple && (optionsHover || $newSelect.trigger('close'));
      }
    });

    // Add initial multiple selections.
    if (multiple) {
      $select.find("option:selected:not(:disabled)").each(function () {
        var index = $$1(this).index();

        toggleEntryFromArray(valuesSelected, index, $select);
        options.find("li").eq(index).find(":checkbox").prop("checked", true);
      });
    }

    // Make option as selected and scroll to selected position
    var activateOption = function activateOption(collection, newOption) {
      if (newOption) {
        collection.find('li.selected').removeClass('selected');
        var option = $$1(newOption);
        option.addClass('selected');
        options.scrollTo(option);
      }
    };

    // Allow user to search by typing
    // this array is cleared after 1 second
    var filterQuery = [],
        onKeyDown = function onKeyDown(e) {
      // TAB - switch to another input
      if (e.which == 9) {
        $newSelect.trigger('close');
        return;
      }

      // ARROW DOWN WHEN SELECT IS CLOSED - open select options
      if (e.which == 40 && !options.is(':visible')) {
        $newSelect.trigger('open');
        return;
      }

      // ENTER WHEN SELECT IS CLOSED - submit form
      if (e.which == 13 && !options.is(':visible')) {
        return;
      }

      e.preventDefault();

      // CASE WHEN USER TYPE LETTERS
      var letter = String.fromCharCode(e.which).toLowerCase(),
          nonLetters = [9, 13, 27, 38, 40];
      if (letter && nonLetters.indexOf(e.which) === -1) {
        filterQuery.push(letter);

        var string = filterQuery.join(''),
            newOption = options.find('li').filter(function () {
          return $$1(this).text().toLowerCase().indexOf(string) === 0;
        })[0];

        if (newOption) {
          activateOption(options, newOption);
        }
      }

      // ENTER - select option and close when select options are opened
      if (e.which == 13) {
        var activeOption = options.find('li.selected:not(.disabled)')[0];
        if (activeOption) {
          $$1(activeOption).trigger('click');
          if (!multiple) {
            $newSelect.trigger('close');
          }
        }
      }

      // ARROW DOWN - move to next not disabled option
      if (e.which == 40) {
        if (options.find('li.selected').length) {
          newOption = options.find('li.selected').next('li:not(.disabled)')[0];
        } else {
          newOption = options.find('li:not(.disabled)')[0];
        }
        activateOption(options, newOption);
      }

      // ESC - close options
      if (e.which == 27) {
        $newSelect.trigger('close');
      }

      // ARROW UP - move to previous not disabled option
      if (e.which == 38) {
        newOption = options.find('li.selected').prev('li:not(.disabled)')[0];
        if (newOption) activateOption(options, newOption);
      }

      // Automaticaly clean filter query so user can search again by starting letters
      setTimeout(function () {
        filterQuery = [];
      }, 1000);
    };

    $newSelect.on('keydown', onKeyDown);
  });

  function toggleEntryFromArray(entriesArray, entryIndex, select) {
    var index = entriesArray.indexOf(entryIndex),
        notAdded = index === -1;

    if (notAdded) {
      entriesArray.push(entryIndex);
    } else {
      entriesArray.splice(index, 1);
    }

    select.siblings('ul.dropdown-content').find('li').eq(entryIndex).toggleClass('active');

    // use notAdded instead of true (to detect if the option is selected or not)
    select.find('option').eq(entryIndex).prop('selected', notAdded);
    setValueToInput(entriesArray, select);

    return notAdded;
  }

  function setValueToInput(entriesArray, select) {
    var value = '';

    for (var i = 0, count = entriesArray.length; i < count; i++) {
      var text = select.find('option').eq(entriesArray[i]).text();

      i === 0 ? value += text : value += ', ' + text;
    }

    if (value === '') {
      value = select.find('option:disabled').eq(0).text();
    }

    select.siblings('input.select-dropdown').val(value);
  }
};
$$1(document).ready(function () {
  $$1('.dropdown-button').dropdown();
});

// Source: src/helpers/leanModal.js

var _stack = 0;
var _lastID = 0;
var _generateID = function _generateID() {
  _lastID++;
  return 'materialize-lean-overlay-' + _lastID;
};

$$1.fn.extend({
  openModal: function openModal(options) {

    var $body = $$1('body');
    var oldWidth = $body.innerWidth();
    $body.css('overflow', 'hidden');
    $body.width(oldWidth);

    var defaults = {
      opacity: 0.5,
      in_duration: 350,
      out_duration: 250,
      ready: undefined,
      complete: undefined,
      dismissible: true,
      starting_top: '4%'
    },
        $modal = $$1(this);

    if ($modal.hasClass('open')) {
      return;
    }

    var overlayID = _generateID(),
        $overlay = $$1('<div class="lean-overlay"></div>'),
        lStack = ++_stack;

    // Store a reference of the overlay
    $overlay.attr('id', overlayID).css('z-index', 1000 + lStack * 2);
    $modal.data('overlay-id', overlayID).css('z-index', 1000 + lStack * 2 + 1);
    $modal.addClass('open');

    $$1("body").append($overlay);

    // Override defaults
    options = $$1.extend(defaults, options);

    if (options.dismissible) {
      $overlay.click(function () {
        $modal.closeModal(options);
      });
      // Return on ESC
      $$1(document).on('keyup.leanModal' + overlayID, function (e) {
        if (e.keyCode === 27) {
          // ESC key
          $modal.closeModal(options);
        }
      });
    }

    $modal.find(".modal-close").on('click.close', function (e) {
      $modal.closeModal(options);
    });

    $overlay.css({
      display: "block",
      opacity: 0
    });

    $modal.css({
      display: "block",
      opacity: 0
    });

    $overlay.velocity({
      opacity: options.opacity
    }, {
      duration: options.in_duration,
      queue: false,
      ease: "easeOutCubic"
    });
    $modal.data('associated-overlay', $overlay[0]);

    // Define Bottom Sheet animation
    if ($modal.hasClass('bottom-sheet')) {
      $modal.velocity({
        bottom: "0",
        opacity: 1
      }, {
        duration: options.in_duration,
        queue: false,
        ease: "easeOutCubic",
        // Handle modal ready callback
        complete: function complete() {
          if (typeof options.ready === "function") {
            options.ready();
          }
        }
      });
    } else {
      $$1.Velocity.hook($modal, "scaleX", 0.7);
      $modal.css({
        top: options.starting_top
      });
      $modal.velocity({
        top: "10%",
        opacity: 1,
        scaleX: '1'
      }, {
        duration: options.in_duration,
        queue: false,
        ease: "easeOutCubic",
        // Handle modal ready callback
        complete: function complete() {
          if (typeof options.ready === "function") {
            options.ready();
          }
        }
      });
    }
  }
});

$$1.fn.extend({
  closeModal: function closeModal(options) {
    var defaults = {
      out_duration: 250,
      complete: undefined
    },
        $modal = $$1(this),
        overlayID = $modal.data('overlay-id'),
        $overlay = $$1('#' + overlayID);
    $modal.removeClass('open');

    options = $$1.extend(defaults, options);

    // Enable scrolling
    $$1('body').css({
      overflow: '',
      width: ''
    });

    $modal.find('.modal-close').off('click.close');
    $$1(document).off('keyup.leanModal' + overlayID);

    $overlay.velocity({
      opacity: 0
    }, {
      duration: options.out_duration,
      queue: false,
      ease: "easeOutQuart"
    });

    // Define Bottom Sheet animation
    if ($modal.hasClass('bottom-sheet')) {
      $modal.velocity({
        bottom: "-100%",
        opacity: 0
      }, {
        duration: options.out_duration,
        queue: false,
        ease: "easeOutCubic",
        // Handle modal ready callback
        complete: function complete() {
          $overlay.css({
            display: "none"
          });

          // Call complete callback
          if (typeof options.complete === "function") {
            options.complete();
          }
          $overlay.remove();
          _stack--;
        }
      });
    } else {
      $modal.velocity({
        top: options.starting_top,
        opacity: 0,
        scaleX: 0.7
      }, {
        duration: options.out_duration,
        complete: function complete() {

          $$1(this).css('display', 'none');
          // Call complete callback
          if (typeof options.complete === "function") {
            options.complete();
          }
          $overlay.remove();
          _stack--;
        }
      });
    }
  }
});

$$1.fn.extend({
  leanModal: function leanModal(option) {
    return this.each(function () {

      var defaults = {
        starting_top: '4%'
      },

      // Override defaults
      options = $$1.extend(defaults, option);

      // Close Handlers
      $$1(this).click(function (e) {
        options.starting_top = ($$1(this).offset().top - $$1(window).scrollTop()) / 1.15;
        var modal_id = $$1(this).attr("href") || '#' + $$1(this).data('target');
        $$1(modal_id).openModal(options);
        e.preventDefault();
      }); // done set on click
    }); // done return
  }
});

// Source: node_modules/materialize-css/js/materialbox.js

$$1.fn.materialbox = function () {

  return this.each(function () {

    if ($$1(this).hasClass('initialized')) {
      return;
    }

    $$1(this).addClass('initialized');

    var overlayActive = false;
    var doneAnimating = true;
    var inDuration = 275;
    var outDuration = 200;
    var origin = $$1(this);
    var placeholder = $$1('<div></div>').addClass('material-placeholder');
    var originalWidth = 0;
    var originalHeight = 0;
    var ancestorsChanged;
    var ancestor;
    origin.wrap(placeholder);

    origin.on('click', function () {
      var placeholder = origin.parent('.material-placeholder');
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var originalWidth = origin.width();
      var originalHeight = origin.height();

      // If already modal, return to original
      if (doneAnimating === false) {
        returnToOriginal();
        return false;
      } else if (overlayActive && doneAnimating === true) {
        returnToOriginal();
        return false;
      }

      // Set states
      doneAnimating = false;
      origin.addClass('active');
      overlayActive = true;

      // Set positioning for placeholder
      placeholder.css({
        width: placeholder[0].getBoundingClientRect().width,
        height: placeholder[0].getBoundingClientRect().height,
        position: 'relative',
        top: 0,
        left: 0
      });

      // Find ancestor with overflow: hidden; and remove it
      ancestorsChanged = undefined;
      ancestor = placeholder[0].parentNode;
      var count = 0;
      while (ancestor !== null && !$$1(ancestor).is(document)) {
        var curr = $$1(ancestor);
        if (curr.css('overflow') !== 'visible') {
          curr.css('overflow', 'visible');
          if (ancestorsChanged === undefined) {
            ancestorsChanged = curr;
          } else {
            ancestorsChanged = ancestorsChanged.add(curr);
          }
        }
        ancestor = ancestor.parentNode;
      }

      // Set css on origin
      origin.css({ position: 'absolute', 'z-index': 1000 }).data('width', originalWidth).data('height', originalHeight);

      // Add overlay
      var overlay = $$1('<div id="materialbox-overlay"></div>').css({
        opacity: 0
      }).click(function () {
        if (doneAnimating === true) returnToOriginal();
      });
      // Animate Overlay
      // Put before in origin image to preserve z-index layering.
      origin.before(overlay);
      overlay.velocity({ opacity: 1 }, { duration: inDuration, queue: false, easing: 'easeOutQuad' });

      // Add and animate caption if it exists
      if (origin.data('caption') !== "") {
        var $photo_caption = $$1('<div class="materialbox-caption"></div>');
        $photo_caption.text(origin.data('caption'));
        $$1('body').append($photo_caption);
        $photo_caption.css({ "display": "inline" });
        $photo_caption.velocity({ opacity: 1 }, { duration: inDuration, queue: false, easing: 'easeOutQuad' });
      }

      // Resize Image
      var ratio = 0;
      var widthPercent = originalWidth / windowWidth;
      var heightPercent = originalHeight / windowHeight;
      var newWidth = 0;
      var newHeight = 0;

      if (widthPercent > heightPercent) {
        ratio = originalHeight / originalWidth;
        newWidth = windowWidth * 0.9;
        newHeight = windowWidth * 0.9 * ratio;
      } else {
        ratio = originalWidth / originalHeight;
        newWidth = windowHeight * 0.9 * ratio;
        newHeight = windowHeight * 0.9;
      }

      // Animate image + set z-index
      if (origin.hasClass('responsive-img')) {
        origin.velocity({ 'max-width': newWidth, 'width': originalWidth }, { duration: 0, queue: false,
          complete: function complete() {
            origin.css({ left: 0, top: 0 }).velocity({
              height: newHeight,
              width: newWidth,
              left: $$1(document).scrollLeft() + windowWidth / 2 - origin.parent('.material-placeholder').offset().left - newWidth / 2,
              top: $$1(document).scrollTop() + windowHeight / 2 - origin.parent('.material-placeholder').offset().top - newHeight / 2
            }, {
              duration: inDuration,
              queue: false,
              easing: 'easeOutQuad',
              complete: function complete() {
                doneAnimating = true;
              }
            });
          } // End Complete
        }); // End Velocity
      } else {
          origin.css('left', 0).css('top', 0).velocity({
            height: newHeight,
            width: newWidth,
            left: $$1(document).scrollLeft() + windowWidth / 2 - origin.parent('.material-placeholder').offset().left - newWidth / 2,
            top: $$1(document).scrollTop() + windowHeight / 2 - origin.parent('.material-placeholder').offset().top - newHeight / 2
          }, {
            duration: inDuration,
            queue: false,
            easing: 'easeOutQuad',
            complete: function complete() {
              doneAnimating = true;
            }
          }); // End Velocity
        }
    }); // End origin on click

    // Return on scroll
    $$1(window).scroll(function () {
      if (overlayActive) {
        returnToOriginal();
      }
    });

    // Return on ESC
    $$1(document).keyup(function (e) {

      if (e.keyCode === 27 && doneAnimating === true) {
        // ESC key
        if (overlayActive) {
          returnToOriginal();
        }
      }
    });

    // This function returns the modaled image to the original spot
    function returnToOriginal() {

      doneAnimating = false;

      var placeholder = origin.parent('.material-placeholder');
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var originalWidth = origin.data('width');
      var originalHeight = origin.data('height');

      origin.velocity("stop", true);
      $$1('#materialbox-overlay').velocity("stop", true);
      $$1('.materialbox-caption').velocity("stop", true);

      $$1('#materialbox-overlay').velocity({ opacity: 0 }, {
        duration: outDuration, // Delay prevents animation overlapping
        queue: false, easing: 'easeOutQuad',
        complete: function complete() {
          // Remove Overlay
          overlayActive = false;
          $$1(this).remove();
        }
      });

      // Resize Image
      origin.velocity({
        width: originalWidth,
        height: originalHeight,
        left: 0,
        top: 0
      }, {
        duration: outDuration,
        queue: false, easing: 'easeOutQuad'
      });

      // Remove Caption + reset css settings on image
      $$1('.materialbox-caption').velocity({ opacity: 0 }, {
        duration: outDuration, // Delay prevents animation overlapping
        queue: false, easing: 'easeOutQuad',
        complete: function complete() {
          placeholder.css({
            height: '',
            width: '',
            position: '',
            top: '',
            left: ''
          });

          origin.css({
            height: '',
            top: '',
            left: '',
            width: '',
            'max-width': '',
            position: '',
            'z-index': ''
          });

          // Remove class
          origin.removeClass('active');
          doneAnimating = true;
          $$1(this).remove();

          // Remove overflow overrides on ancestors
          if (ancestorsChanged) {
            ancestorsChanged.css('overflow', '');
          }
        }
      });
    }
  });
};

$$1(document).ready(function () {
  $$1('.materialboxed').materialbox();
});

// Source: node_modules/materialize-css/js/tooltip.js

$$1.fn.tooltip = function (options) {
  var timeout = null,
      margin = 5;

  // Defaults
  var defaults = {
    delay: 350
  };

  // Remove tooltip from the activator
  if (options === "remove") {
    this.each(function () {
      $$1('#' + $$1(this).attr('data-tooltip-id')).remove();
      $$1(this).off('mouseenter.tooltip mouseleave.tooltip');
    });
    return false;
  }

  options = $$1.extend(defaults, options);

  return this.each(function () {
    var tooltipId = Materialize.guid();
    var origin = $$1(this);
    origin.attr('data-tooltip-id', tooltipId);

    // Create Text span
    var tooltip_text = $$1('<span></span>').text(origin.attr('data-tooltip'));

    // Create tooltip
    var newTooltip = $$1('<div></div>');
    newTooltip.addClass('material-tooltip').append(tooltip_text).appendTo($$1('body')).attr('id', tooltipId);

    var backdrop = $$1('<div></div>').addClass('backdrop');
    backdrop.appendTo(newTooltip);
    backdrop.css({ top: 0, left: 0 });

    //Destroy previously binded events
    origin.off('mouseenter.tooltip mouseleave.tooltip');
    // Mouse In
    var started = false,
        timeoutRef;
    origin.on({
      'mouseenter.tooltip': function mouseenterTooltip(e) {
        var tooltip_delay = origin.attr('data-delay');
        tooltip_delay = tooltip_delay === undefined || tooltip_delay === '' ? options.delay : tooltip_delay;
        timeoutRef = setTimeout(function () {
          started = true;
          newTooltip.velocity('stop');
          backdrop.velocity('stop');
          newTooltip.css({ display: 'block', left: '0px', top: '0px' });

          // Set Tooltip text
          newTooltip.children('span').text(origin.attr('data-tooltip'));

          // Tooltip positioning
          var originWidth = origin.outerWidth();
          var originHeight = origin.outerHeight();
          var tooltipPosition = origin.attr('data-position');
          var tooltipHeight = newTooltip.outerHeight();
          var tooltipWidth = newTooltip.outerWidth();
          var tooltipVerticalMovement = '0px';
          var tooltipHorizontalMovement = '0px';
          var scale_factor = 8;
          var targetTop, targetLeft, newCoordinates;

          if (tooltipPosition === "top") {
            // Top Position
            targetTop = origin.offset().top - tooltipHeight - margin;
            targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
            newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

            tooltipVerticalMovement = '-10px';
            backdrop.css({
              borderRadius: '14px 14px 0 0',
              transformOrigin: '50% 90%',
              marginTop: tooltipHeight,
              marginLeft: tooltipWidth / 2 - backdrop.width() / 2
            });
          }
          // Left Position
          else if (tooltipPosition === "left") {
              targetTop = origin.offset().top + originHeight / 2 - tooltipHeight / 2;
              targetLeft = origin.offset().left - tooltipWidth - margin;
              newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

              tooltipHorizontalMovement = '-10px';
              backdrop.css({
                width: '14px',
                height: '14px',
                borderRadius: '14px 0 0 14px',
                transformOrigin: '95% 50%',
                marginTop: tooltipHeight / 2,
                marginLeft: tooltipWidth
              });
            }
            // Right Position
            else if (tooltipPosition === "right") {
                targetTop = origin.offset().top + originHeight / 2 - tooltipHeight / 2;
                targetLeft = origin.offset().left + originWidth + margin;
                newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

                tooltipHorizontalMovement = '+10px';
                backdrop.css({
                  width: '14px',
                  height: '14px',
                  borderRadius: '0 14px 14px 0',
                  transformOrigin: '5% 50%',
                  marginTop: tooltipHeight / 2,
                  marginLeft: '0px'
                });
              } else {
                // Bottom Position
                targetTop = origin.offset().top + origin.outerHeight() + margin;
                targetLeft = origin.offset().left + originWidth / 2 - tooltipWidth / 2;
                newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
                tooltipVerticalMovement = '+10px';
                backdrop.css({
                  marginLeft: tooltipWidth / 2 - backdrop.width() / 2
                });
              }

          // Set tooptip css placement
          newTooltip.css({
            top: newCoordinates.y,
            left: newCoordinates.x
          });

          // Calculate Scale to fill
          scale_factor = tooltipWidth / 8;
          if (scale_factor < 8) {
            scale_factor = 8;
          }
          if (tooltipPosition === "right" || tooltipPosition === "left") {
            scale_factor = tooltipWidth / 10;
            if (scale_factor < 6) scale_factor = 6;
          }

          newTooltip.velocity({ marginTop: tooltipVerticalMovement, marginLeft: tooltipHorizontalMovement }, { duration: 350, queue: false }).velocity({ opacity: 1 }, { duration: 300, delay: 50, queue: false });
          backdrop.css({ display: 'block' }).velocity({ opacity: 1 }, { duration: 55, delay: 0, queue: false }).velocity({ scale: scale_factor }, { duration: 300, delay: 0, queue: false, easing: 'easeInOutQuad' });
        }, tooltip_delay); // End Interval

        // Mouse Out
      },
      'mouseleave.tooltip': function mouseleaveTooltip() {
        // Reset State
        started = false;
        clearTimeout(timeoutRef);

        // Animate back
        setTimeout(function () {
          if (started != true) {
            newTooltip.velocity({
              opacity: 0, marginTop: 0, marginLeft: 0 }, { duration: 225, queue: false });
            backdrop.velocity({ opacity: 0, scale: 1 }, {
              duration: 225,
              queue: false,
              complete: function complete() {
                backdrop.css('display', 'none');
                newTooltip.css('display', 'none');
                started = false;
              }
            });
          }
        }, 225);
      }
    });
  });
};

var repositionWithinScreen = function repositionWithinScreen(x, y, width, height) {
  var newX = x;
  var newY = y;

  if (newX < 0) {
    newX = 4;
  } else if (newX + width > window.innerWidth) {
    newX -= newX + width - window.innerWidth;
  }

  if (newY < 0) {
    newY = 4;
  } else if (newY + height > window.innerHeight + $$1(window).scrollTop) {
    newY -= newY + height - window.innerHeight;
  }

  return { x: newX, y: newY };
};

$$1(document).ready(function () {
  $$1('.tooltipped').tooltip();
});

// Source: node_modules/materialize-css/js/cards.js

$$1(document).ready(function () {

  $$1(document).on('click.card', '.card', function (e) {
    if ($$1(this).find('> .card-reveal').length) {
      if ($$1(e.target).is($$1('.card-reveal .card-title')) || $$1(e.target).is($$1('.card-reveal .card-title i'))) {
        // Make Reveal animate down and display none
        $$1(this).find('.card-reveal').velocity({ translateY: 0 }, {
          duration: 225,
          queue: false,
          easing: 'easeInOutQuad',
          complete: function complete() {
            $$1(this).css({ display: 'none' });
          }
        });
      } else if ($$1(e.target).is($$1('.card .activator')) || $$1(e.target).is($$1('.card .activator i'))) {
        $$1(e.target).closest('.card').css('overflow', 'hidden');
        $$1(this).find('.card-reveal').css({ display: 'block' }).velocity("stop", false).velocity({ translateY: '-100%' }, { duration: 300, queue: false, easing: 'easeInOutQuad' });
      }
    }

    $$1('.card-reveal').closest('.card').css('overflow', 'hidden');
  });
});

// Source: node_modules/materialize-css/js/chips.js

$$1(document).ready(function () {

  $$1(document).on('click.chip', '.chip .material-icons', function (e) {
    $$1(this).parent().remove();
  });
});

// Source: node_modules/materialize-css/js/buttons.js

$$1(document).ready(function () {

  // jQuery reverse
  $$1.fn.reverse = [].reverse;

  // Hover behaviour: make sure this doesn't work on .click-to-toggle FABs!
  $$1(document).on('mouseenter.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle)', function (e) {
    var $this = $$1(this);
    openFABMenu($this);
  });
  $$1(document).on('mouseleave.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle)', function (e) {
    var $this = $$1(this);
    closeFABMenu($this);
  });

  // Toggle-on-click behaviour.
  $$1(document).on('click.fixedActionBtn', '.fixed-action-btn.click-to-toggle > a', function (e) {
    var $this = $$1(this);
    var $menu = $this.parent();
    if ($menu.hasClass('active')) {
      closeFABMenu($menu);
    } else {
      openFABMenu($menu);
    }
  });
});

$$1.fn.extend({
  openFAB: function openFAB() {
    openFABMenu($$1(this));
  },
  closeFAB: function closeFAB() {
    closeFABMenu($$1(this));
  }
});

var openFABMenu = function openFABMenu(btn) {
  $this = btn;
  if ($this.hasClass('active') === false) {

    // Get direction option
    var horizontal = $this.hasClass('horizontal');
    var offsetY, offsetX;

    if (horizontal === true) {
      offsetX = 40;
    } else {
      offsetY = 40;
    }

    $this.addClass('active');
    $this.find('ul .btn-floating').velocity({ scaleY: ".4", scaleX: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px' }, { duration: 0 });

    var time = 0;
    $this.find('ul .btn-floating').reverse().each(function () {
      $$1(this).velocity({ opacity: "1", scaleX: "1", scaleY: "1", translateY: "0", translateX: '0' }, { duration: 80, delay: time });
      time += 40;
    });
  }
};

var closeFABMenu = function closeFABMenu(btn) {
  $this = btn;
  // Get direction option
  var horizontal = $this.hasClass('horizontal');
  var offsetY, offsetX;

  if (horizontal === true) {
    offsetX = 40;
  } else {
    offsetY = 40;
  }

  $this.removeClass('active');
  var time = 0;
  $this.find('ul .btn-floating').velocity("stop", true);
  $this.find('ul .btn-floating').velocity({ opacity: "0", scaleX: ".4", scaleY: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px' }, { duration: 80 });
};

// Source: node_modules/materialize-css/js/forms.js

$$1(document).ready(function () {

  // Function to update labels of text fields
  Materialize.updateTextFields = function () {
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
    $$1(input_selector).each(function (index, element) {
      if ($$1(element).val().length > 0 || element.autofocus || $$1(this).attr('placeholder') !== undefined || $$1(element)[0].validity.badInput === true) {
        $$1(this).siblings('label, i').addClass('active');
      } else {
        $$1(this).siblings('label, i').removeClass('active');
      }
    });
  };

  // Text based inputs
  var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

  // Add active if form auto complete
  $$1(document).on('change', input_selector, function () {
    if ($$1(this).val().length !== 0 || $$1(this).attr('placeholder') !== undefined) {
      $$1(this).siblings('label').addClass('active');
    }
    validate_field($$1(this));
  });

  // Add active if input element has been pre-populated on document ready
  $$1(document).ready(function () {
    Materialize.updateTextFields();
  });

  // HTML DOM FORM RESET handling
  $$1(document).on('reset', function (e) {
    var formReset = $$1(e.target);
    if (formReset.is('form')) {
      formReset.find(input_selector).removeClass('valid').removeClass('invalid');
      formReset.find(input_selector).each(function () {
        if ($$1(this).attr('value') === '') {
          $$1(this).siblings('label, i').removeClass('active');
        }
      });

      // Reset select
      formReset.find('select.initialized').each(function () {
        var reset_text = formReset.find('option[selected]').text();
        formReset.siblings('input.select-dropdown').val(reset_text);
      });
    }
  });

  // Add active when element has focus
  $$1(document).on('focus', input_selector, function () {
    $$1(this).siblings('label, i').addClass('active');
  });

  $$1(document).on('blur', input_selector, function () {
    var $inputElement = $$1(this);
    if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
      $inputElement.siblings('label, i').removeClass('active');
    }

    if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') !== undefined) {
      $inputElement.siblings('i').removeClass('active');
    }
    validate_field($inputElement);
  });

  window.validate_field = function (object) {
    var hasLength = object.attr('length') !== undefined;
    var lenAttr = parseInt(object.attr('length'));
    var len = object.val().length;

    if (object.val().length === 0 && object[0].validity.badInput === false) {
      if (object.hasClass('validate')) {
        object.removeClass('valid');
        object.removeClass('invalid');
      }
    } else {
      if (object.hasClass('validate')) {
        // Check for character counter attributes
        if (object.is(':valid') && hasLength && len <= lenAttr || object.is(':valid') && !hasLength) {
          object.removeClass('invalid');
          object.addClass('valid');
        } else {
          object.removeClass('valid');
          object.addClass('invalid');
        }
      }
    }
  };

  // Radio and Checkbox focus class
  var radio_checkbox = 'input[type=radio], input[type=checkbox]';
  $$1(document).on('keyup.radio', radio_checkbox, function (e) {
    // TAB, check if tabbing to radio or checkbox.
    if (e.which === 9) {
      $$1(this).addClass('tabbed');
      var $this = $$1(this);
      $this.one('blur', function (e) {

        $$1(this).removeClass('tabbed');
      });
      return;
    }
  });

  // Textarea Auto Resize
  var hiddenDiv = $$1('.hiddendiv').first();
  if (!hiddenDiv.length) {
    hiddenDiv = $$1('<div class="hiddendiv common"></div>');
    $$1('body').append(hiddenDiv);
  }
  var text_area_selector = '.materialize-textarea';

  function textareaAutoResize($textarea) {
    // Set font properties of hiddenDiv

    var fontFamily = $textarea.css('font-family');
    var fontSize = $textarea.css('font-size');

    if (fontSize) {
      hiddenDiv.css('font-size', fontSize);
    }
    if (fontFamily) {
      hiddenDiv.css('font-family', fontFamily);
    }

    if ($textarea.attr('wrap') === "off") {
      hiddenDiv.css('overflow-wrap', "normal").css('white-space', "pre");
    }

    hiddenDiv.text($textarea.val() + '\n');
    var content = hiddenDiv.html().replace(/\n/g, '<br>');
    hiddenDiv.html(content);

    // When textarea is hidden, width goes crazy.
    // Approximate with half of window size

    if ($textarea.is(':visible')) {
      hiddenDiv.css('width', $textarea.width());
    } else {
      hiddenDiv.css('width', $$1(window).width() / 2);
    }

    $textarea.css('height', hiddenDiv.height());
  }

  $$1(text_area_selector).each(function () {
    var $textarea = $$1(this);
    if ($textarea.val().length) {
      textareaAutoResize($textarea);
    }
  });

  $$1('body').on('keyup keydown autoresize', text_area_selector, function () {
    textareaAutoResize($$1(this));
  });

  // File Input Path
  $$1(document).on('change', '.file-field input[type="file"]', function () {
    var file_field = $$1(this).closest('.file-field');
    var path_input = file_field.find('input.file-path');
    var files = $$1(this)[0].files;
    var file_names = [];
    for (var i = 0; i < files.length; i++) {
      file_names.push(files[i].name);
    }
    path_input.val(file_names.join(", "));
    path_input.trigger('change');
  });

  /****************
  *  Range Input  *
  ****************/

  var range_type = 'input[type=range]';
  var range_mousedown = false;
  var left;

  $$1(range_type).each(function () {
    var thumb = $$1('<span class="thumb"><span class="value"></span></span>');
    $$1(this).after(thumb);
  });

  var range_wrapper = '.range-field';
  $$1(document).on('change', range_type, function (e) {
    var thumb = $$1(this).siblings('.thumb');
    thumb.find('.value').html($$1(this).val());
  });

  $$1(document).on('input mousedown touchstart', range_type, function (e) {
    var thumb = $$1(this).siblings('.thumb');
    var width = $$1(this).outerWidth();

    // If thumb indicator does not exist yet, create it
    if (thumb.length <= 0) {
      thumb = $$1('<span class="thumb"><span class="value"></span></span>');
      $$1(this).after(thumb);
    }

    // Set indicator value
    thumb.find('.value').html($$1(this).val());

    range_mousedown = true;
    $$1(this).addClass('active');

    if (!thumb.hasClass('active')) {
      thumb.velocity({ height: "30px", width: "30px", top: "-20px", marginLeft: "-15px" }, { duration: 300, easing: 'easeOutExpo' });
    }

    if (e.type !== 'input') {
      if (e.pageX === undefined || e.pageX === null) {
        //mobile
        left = e.originalEvent.touches[0].pageX - $$1(this).offset().left;
      } else {
        // desktop
        left = e.pageX - $$1(this).offset().left;
      }
      if (left < 0) {
        left = 0;
      } else if (left > width) {
        left = width;
      }
      thumb.addClass('active').css('left', left);
    }

    thumb.find('.value').html($$1(this).val());
  });

  $$1(document).on('mouseup touchend', range_wrapper, function () {
    range_mousedown = false;
    $$1(this).removeClass('active');
  });

  $$1(document).on('mousemove touchmove', range_wrapper, function (e) {
    var thumb = $$1(this).children('.thumb');
    var left;
    if (range_mousedown) {
      if (!thumb.hasClass('active')) {
        thumb.velocity({ height: '30px', width: '30px', top: '-20px', marginLeft: '-15px' }, { duration: 300, easing: 'easeOutExpo' });
      }
      if (e.pageX === undefined || e.pageX === null) {
        //mobile
        left = e.originalEvent.touches[0].pageX - $$1(this).offset().left;
      } else {
        // desktop
        left = e.pageX - $$1(this).offset().left;
      }
      var width = $$1(this).outerWidth();

      if (left < 0) {
        left = 0;
      } else if (left > width) {
        left = width;
      }
      thumb.addClass('active').css('left', left);
      thumb.find('.value').html(thumb.siblings(range_type).val());
    }
  });

  $$1(document).on('mouseout touchleave', range_wrapper, function () {
    if (!range_mousedown) {

      var thumb = $$1(this).children('.thumb');

      if (thumb.hasClass('active')) {
        thumb.velocity({ height: '0', width: '0', top: '10px', marginLeft: '-6px' }, { duration: 100 });
      }
      thumb.removeClass('active');
    }
  });
}); // End of $(document).ready

/*******************
 *  Select Plugin  *
 ******************/
$$1.fn.material_select = function (callback) {
  $$1(this).each(function () {
    var $select = $$1(this);

    if ($select.hasClass('browser-default')) {
      return; // Continue to next (return false breaks out of entire loop)
    }

    var multiple = $select.attr('multiple') ? true : false,
        lastID = $select.data('select-id'); // Tear down structure if Select needs to be rebuilt

    if (lastID) {
      $select.parent().find('span.caret').remove();
      $select.parent().find('input').remove();

      $select.unwrap();
      $$1('ul#select-options-' + lastID).remove();
    }

    // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
    if (callback === 'destroy') {
      $select.data('select-id', null).removeClass('initialized');
      return;
    }

    var uniqueID = Materialize.guid();
    $select.data('select-id', uniqueID);
    var wrapper = $$1('<div class="select-wrapper"></div>');
    wrapper.addClass($select.attr('class'));
    var options = $$1('<ul id="select-options-' + uniqueID + '" class="dropdown-content select-dropdown ' + (multiple ? 'multiple-select-dropdown' : '') + '"></ul>'),
        selectChildren = $select.children('option, optgroup'),
        valuesSelected = [],
        optionsHover = false;

    var label = $select.find('option:selected').html() || $select.find('option:first').html() || "";

    // Function that renders and appends the option taking into
    // account type and possible image icon.
    var appendOptionWithIcon = function appendOptionWithIcon(select, option, type) {
      // Add disabled attr if disabled
      var disabledClass = option.is(':disabled') ? 'disabled ' : '';
      var optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';

      // add icons
      var icon_url = option.data('icon');
      var classes = option.attr('class');
      if (!!icon_url) {
        var classString = '';
        if (!!classes) classString = ' class="' + classes + '"';

        // Check for multiple type.
        if (type === 'multiple') {
          options.append($$1('<li class="' + disabledClass + '"><img src="' + icon_url + '"' + classString + '><span><input type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
        } else {
          options.append($$1('<li class="' + disabledClass + optgroupClass + '"><img src="' + icon_url + '"' + classString + '><span>' + option.html() + '</span></li>'));
        }
        return true;
      }

      // Check for multiple type.
      if (type === 'multiple') {
        options.append($$1('<li class="' + disabledClass + '"><span><input type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
      } else {
        options.append($$1('<li class="' + disabledClass + optgroupClass + '"><span>' + option.html() + '</span></li>'));
      }
    };

    /* Create dropdown structure. */
    if (selectChildren.length) {
      selectChildren.each(function () {
        if ($$1(this).is('option')) {
          // Direct descendant option.
          if (multiple) {
            appendOptionWithIcon($select, $$1(this), 'multiple');
          } else {
            appendOptionWithIcon($select, $$1(this));
          }
        } else if ($$1(this).is('optgroup')) {
          // Optgroup.
          var selectOptions = $$1(this).children('option');
          options.append($$1('<li class="optgroup"><span>' + $$1(this).attr('label') + '</span></li>'));

          selectOptions.each(function () {
            appendOptionWithIcon($select, $$1(this), 'optgroup-option');
          });
        }
      });
    }

    options.find('li:not(.optgroup)').each(function (i) {
      $$1(this).click(function (e) {
        // Check if option element is disabled
        if (!$$1(this).hasClass('disabled') && !$$1(this).hasClass('optgroup')) {
          var selected = true;

          if (multiple) {
            $$1('input[type="checkbox"]', this).prop('checked', function (i, v) {
              return !v;
            });
            selected = toggleEntryFromArray(valuesSelected, $$1(this).index(), $select);
            $newSelect.trigger('focus');
          } else {
            options.find('li').removeClass('active');
            $$1(this).toggleClass('active');
            $newSelect.val($$1(this).text());
          }

          activateOption(options, $$1(this));
          $select.find('option').eq(i).prop('selected', selected);
          // Trigger onchange() event
          $select.trigger('change');
          if (typeof callback !== 'undefined') callback();
        }

        e.stopPropagation();
      });
    });

    // Wrap Elements
    $select.wrap(wrapper);
    // Add Select Display Element
    var dropdownIcon = $$1('<span class="caret">&#9660;</span>');
    if ($select.is(':disabled')) dropdownIcon.addClass('disabled');

    // escape double quotes
    var sanitizedLabelHtml = label.replace(/"/g, '&quot;');

    var $newSelect = $$1('<input type="text" class="select-dropdown" readonly="true" ' + ($select.is(':disabled') ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID + '" value="' + sanitizedLabelHtml + '"/>');
    $select.before($newSelect);
    $newSelect.before(dropdownIcon);

    $newSelect.after(options);
    // Check if section element is disabled
    if (!$select.is(':disabled')) {
      $newSelect.dropdown({ 'hover': false, 'closeOnClick': false });
    }

    // Copy tabindex
    if ($select.attr('tabindex')) {
      $$1($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
    }

    $select.addClass('initialized');

    $newSelect.on({
      'focus': function focus() {
        if ($$1('ul.select-dropdown').not(options[0]).is(':visible')) {
          $$1('input.select-dropdown').trigger('close');
        }
        if (!options.is(':visible')) {
          $$1(this).trigger('open', ['focus']);
          var label = $$1(this).val();
          var selectedOption = options.find('li').filter(function () {
            return $$1(this).text().toLowerCase() === label.toLowerCase();
          })[0];
          activateOption(options, selectedOption);
        }
      },
      'click': function click(e) {
        e.stopPropagation();
      }
    });

    $newSelect.on('blur', function () {
      if (!multiple) {
        $$1(this).trigger('close');
      }
      options.find('li.selected').removeClass('selected');
    });

    options.hover(function () {
      optionsHover = true;
    }, function () {
      optionsHover = false;
    });

    $$1(window).on({
      'click': function click() {
        multiple && (optionsHover || $newSelect.trigger('close'));
      }
    });

    // Add initial multiple selections.
    if (multiple) {
      $select.find("option:selected:not(:disabled)").each(function () {
        var index = $$1(this).index();

        toggleEntryFromArray(valuesSelected, index, $select);
        options.find("li").eq(index).find(":checkbox").prop("checked", true);
      });
    }

    // Make option as selected and scroll to selected position
    var activateOption = function activateOption(collection, newOption) {
      if (newOption) {
        collection.find('li.selected').removeClass('selected');
        var option = $$1(newOption);
        option.addClass('selected');
        options.scrollTo(option);
      }
    };

    // Allow user to search by typing
    // this array is cleared after 1 second
    var filterQuery = [],
        onKeyDown = function onKeyDown(e) {
      // TAB - switch to another input
      if (e.which == 9) {
        $newSelect.trigger('close');
        return;
      }

      // ARROW DOWN WHEN SELECT IS CLOSED - open select options
      if (e.which == 40 && !options.is(':visible')) {
        $newSelect.trigger('open');
        return;
      }

      // ENTER WHEN SELECT IS CLOSED - submit form
      if (e.which == 13 && !options.is(':visible')) {
        return;
      }

      e.preventDefault();

      // CASE WHEN USER TYPE LETTERS
      var letter = String.fromCharCode(e.which).toLowerCase(),
          nonLetters = [9, 13, 27, 38, 40];
      if (letter && nonLetters.indexOf(e.which) === -1) {
        filterQuery.push(letter);

        var string = filterQuery.join(''),
            newOption = options.find('li').filter(function () {
          return $$1(this).text().toLowerCase().indexOf(string) === 0;
        })[0];

        if (newOption) {
          activateOption(options, newOption);
        }
      }

      // ENTER - select option and close when select options are opened
      if (e.which == 13) {
        var activeOption = options.find('li.selected:not(.disabled)')[0];
        if (activeOption) {
          $$1(activeOption).trigger('click');
          if (!multiple) {
            $newSelect.trigger('close');
          }
        }
      }

      // ARROW DOWN - move to next not disabled option
      if (e.which == 40) {
        if (options.find('li.selected').length) {
          newOption = options.find('li.selected').next('li:not(.disabled)')[0];
        } else {
          newOption = options.find('li:not(.disabled)')[0];
        }
        activateOption(options, newOption);
      }

      // ESC - close options
      if (e.which == 27) {
        $newSelect.trigger('close');
      }

      // ARROW UP - move to previous not disabled option
      if (e.which == 38) {
        newOption = options.find('li.selected').prev('li:not(.disabled)')[0];
        if (newOption) activateOption(options, newOption);
      }

      // Automaticaly clean filter query so user can search again by starting letters
      setTimeout(function () {
        filterQuery = [];
      }, 1000);
    };

    $newSelect.on('keydown', onKeyDown);
  });

  function toggleEntryFromArray(entriesArray, entryIndex, select) {
    var index = entriesArray.indexOf(entryIndex),
        notAdded = index === -1;

    if (notAdded) {
      entriesArray.push(entryIndex);
    } else {
      entriesArray.splice(index, 1);
    }

    select.siblings('ul.dropdown-content').find('li').eq(entryIndex).toggleClass('active');

    // use notAdded instead of true (to detect if the option is selected or not)
    select.find('option').eq(entryIndex).prop('selected', notAdded);
    setValueToInput(entriesArray, select);

    return notAdded;
  }

  function setValueToInput(entriesArray, select) {
    var value = '';

    for (var i = 0, count = entriesArray.length; i < count; i++) {
      var text = select.find('option').eq(entriesArray[i]).text();

      i === 0 ? value += text : value += ', ' + text;
    }

    if (value === '') {
      value = select.find('option:disabled').eq(0).text();
    }

    select.siblings('input.select-dropdown').val(value);
  }
};

// Source: src/helpers/waves.js
/*!
 * Waves v0.6.4
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

var validate_field = function validate_field(object) {
  var hasLength = object.attr('length') !== undefined;
  var lenAttr = parseInt(object.attr('length'), 10);
  var len = object.val().length;

  if (object.val().length === 0 && object[0].validity.badInput === false) {
    if (object.hasClass('validate')) {
      object.removeClass('valid');
      object.removeClass('invalid');
    }
  } else if (object.hasClass('validate')) {
    // Check for character counter attributes
    if (object.is(':valid') && hasLength && len <= lenAttr || object.is(':valid') && !hasLength) {
      object.removeClass('invalid');
      object.addClass('valid');
    } else {
      object.removeClass('valid');
      object.addClass('invalid');
    }
  }
};

Materialize.elementOrParentIsFixed = function (element) {
  var $element = $$1(element);
  var $checkElements = $element.add($element.parents());
  var isFixed = false;
  $checkElements.each(function () {
    if ($$1(this).css("position") === "fixed") {
      isFixed = true;
      return false;
    }
  });
  return isFixed;
};

// Text based inputs
Materialize.input_selector = ['input[type=text]', 'input[type=password]', 'input[type=email]', 'input[type=url]', 'input[type=tel]', 'input[type=number]', 'input[type=search]', 'textarea'].join(',');

// Function to update labels of text fields
Materialize.updateTextFields = function () {

  $$1(Materialize.input_selector).each(function (index, element) {
    if ($$1(element).val().length > 0 || $$1(this).attr('placeholder') !== undefined || $$1(element)[0].validity.badInput === true) {
      $$1(this).siblings('label').addClass('active');
    } else {
      $$1(this).siblings('label, i').removeClass('active');
    }
  });
};

$$1(document).ready(function () {
  // Add active if form auto complete
  $$1(document).on('change', Materialize.input_selector, function () {
    if ($$1(this).val().length !== 0 || $$1(this).attr('placeholder') !== undefined) {
      $$1(this).siblings('label').addClass('active');
    }
    validate_field($$1(this));
  });

  // Add active when element has focus
  $$1(document).on('focus', Materialize.input_selector, function () {
    $$1(this).siblings('label, i').addClass('active');
  });

  $$1(document).on('blur', Materialize.input_selector, function () {
    var $inputElement = $$1(this);
    if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
      $inputElement.siblings('label, i').removeClass('active');
    }

    if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') !== undefined) {
      $inputElement.siblings('i').removeClass('active');
    }
    validate_field($inputElement);
  });

  Materialize.updateTextFields();

  // HTML DOM FORM RESET handling
  $$1(document).on('reset', function (e) {
    var formReset = $$1(e.target);
    if (formReset.is('form')) {
      formReset.find(Materialize.input_selector).removeClass('valid').removeClass('invalid');
      formReset.find(Materialize.input_selector).each(function () {
        if ($$1(this).attr('value') === '') {
          $$1(this).siblings('label, i').removeClass('active');
        }
      });

      // Reset select
      formReset.find('select.initialized').each(function () {
        var reset_text = formReset.find('option[selected]').text();
        formReset.siblings('input.select-dropdown').val(reset_text);
      });
    }
  });
});

// Find exact position of element
function isWindow(obj) {
  return obj !== null && obj === obj.window;
}

function getWindow(elem) {
  return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}

function offset(elem) {
  var docElem,
      win,
      box = {
    top: 0,
    left: 0
  },
      doc = elem && elem.ownerDocument;

  docElem = doc.documentElement;

  if (typeof elem.getBoundingClientRect !== typeof undefined) {
    box = elem.getBoundingClientRect();
  }
  win = getWindow(doc);
  return {
    top: box.top + win.pageYOffset - docElem.clientTop,
    left: box.left + win.pageXOffset - docElem.clientLeft
  };
}

function convertStyle(obj) {
  var style = '';

  for (var a in obj) {
    if (obj.hasOwnProperty(a)) {
      style += a + ':' + obj[a] + ';';
    }
  }

  return style;
}

var Effect = {

  // Effect delay
  duration: 750,

  show: function show(e, element) {

    // Disable right click
    if (e.button === 2) {
      return false;
    }

    var el = element || this;

    // Create ripple
    var ripple = document.createElement('div');
    ripple.className = 'waves-ripple';
    el.appendChild(ripple);

    // Get click coordinate and element witdh
    var pos = offset(el);
    var relativeY = e.pageY - pos.top;
    var relativeX = e.pageX - pos.left;
    var scale = 'scale(' + el.clientWidth / 100 * 10 + ')';

    // Support for touch devices
    if ('touches' in e) {
      relativeY = e.touches[0].pageY - pos.top;
      relativeX = e.touches[0].pageX - pos.left;
    }

    // Attach data to element
    ripple.setAttribute('data-hold', Date.now());
    ripple.setAttribute('data-scale', scale);
    ripple.setAttribute('data-x', relativeX);
    ripple.setAttribute('data-y', relativeY);

    // Set ripple position
    var rippleStyle = {
      'top': relativeY + 'px',
      'left': relativeX + 'px'
    };

    ripple.className = ripple.className + ' waves-notransition';
    ripple.setAttribute('style', convertStyle(rippleStyle));
    ripple.className = ripple.className.replace('waves-notransition', '');

    // Scale the ripple
    rippleStyle['-webkit-transform'] = scale;
    rippleStyle['-moz-transform'] = scale;
    rippleStyle['-ms-transform'] = scale;
    rippleStyle['-o-transform'] = scale;
    rippleStyle.transform = scale;
    rippleStyle.opacity = '1';

    rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
    rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
    rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
    rippleStyle['transition-duration'] = Effect.duration + 'ms';

    rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
    rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
    rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
    rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

    ripple.setAttribute('style', convertStyle(rippleStyle));
  },

  hide: function hide(e) {
    TouchHandler.touchup(e);

    var el = this;
    var width = el.clientWidth * 1.4;

    // Get first ripple
    var ripple = null;
    var ripples = el.getElementsByClassName('waves-ripple');
    if (ripples.length > 0) {
      ripple = ripples[ripples.length - 1];
    } else {
      return false;
    }

    var relativeX = ripple.getAttribute('data-x');
    var relativeY = ripple.getAttribute('data-y');
    var scale = ripple.getAttribute('data-scale');

    // Get delay beetween mousedown and mouse leave
    var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
    var delay = 350 - diff;

    if (delay < 0) {
      delay = 0;
    }

    // Fade out ripple after delay
    setTimeout(function () {
      var style = {
        'top': relativeY + 'px',
        'left': relativeX + 'px',
        'opacity': '0',

        // Duration
        '-webkit-transition-duration': Effect.duration + 'ms',
        '-moz-transition-duration': Effect.duration + 'ms',
        '-o-transition-duration': Effect.duration + 'ms',
        'transition-duration': Effect.duration + 'ms',
        '-webkit-transform': scale,
        '-moz-transform': scale,
        '-ms-transform': scale,
        '-o-transform': scale,
        'transform': scale
      };

      ripple.setAttribute('style', convertStyle(style));

      setTimeout(function () {
        try {
          el.removeChild(ripple);
        } catch (e) {
          return false;
        }
      }, Effect.duration);
    }, delay);
  },

  // Little hack to make <input> can perform waves effect
  wrapInput: function wrapInput(elements) {
    for (var a = 0; a < elements.length; a++) {
      var el = elements[a];

      if (el.tagName.toLowerCase() === 'input') {
        var parent = el.parentNode;

        // If input already have parent just pass through
        if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
          continue;
        }

        // Put element class and style to the specified parent
        var wrapper = document.createElement('i');
        wrapper.className = el.className + ' waves-input-wrapper';

        var elementStyle = el.getAttribute('style');

        if (!elementStyle) {
          elementStyle = '';
        }

        wrapper.setAttribute('style', elementStyle);

        el.className = 'waves-button-input';
        el.removeAttribute('style');

        // Put element as child
        parent.replaceChild(wrapper, el);
        wrapper.appendChild(el);
      }
    }
  }
};

/**
 * Disable mousedown event for 500ms during and after touch
 */
var TouchHandler = {
  /* uses an integer rather than bool so there's no issues with
   * needing to clear timeouts if another touch event occurred
   * within the 500ms. Cannot mouseup between touchstart and
   * touchend, nor in the 500ms after touchend. */
  touches: 0,
  allowEvent: function allowEvent(e) {
    var allow = true;

    if (e.type === 'touchstart') {
      TouchHandler.touches += 1; //push
    } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        setTimeout(function () {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1; //pop after 500ms
          }
        }, 500);
      } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
        allow = false;
      }

    return allow;
  },
  touchup: function touchup(e) {
    TouchHandler.allowEvent(e);
  }
};

/**
 * Delegated click handler for .waves-effect element.
 * returns null when .waves-effect element not in "click tree"
 */
function getWavesEffectElement(e) {
  if (TouchHandler.allowEvent(e) === false) {
    return null;
  }

  var element = null;
  var target = e.target || e.srcElement;

  while (target.parentElement !== null) {
    if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
      element = target;
      break;
    } else if (target.classList.contains('waves-effect')) {
      element = target;
      break;
    }
    target = target.parentElement;
  }

  return element;
}

/**
 * Bubble the click and show effect if .waves-effect elem was found
 */
function showEffect(e) {
  var element = getWavesEffectElement(e);

  if (element !== null) {
    Effect.show(e, element);

    if ('ontouchstart' in window) {
      element.addEventListener('touchend', Effect.hide, false);
      element.addEventListener('touchcancel', Effect.hide, false);
    }

    element.addEventListener('mouseup', Effect.hide, false);
    element.addEventListener('mouseleave', Effect.hide, false);
  }
}

Waves.displayEffect = function (options) {
  options = options || {};

  if ('duration' in options) {
    Effect.duration = options.duration;
  }

  //Wrap input inside <i> tag
  Effect.wrapInput($$('.waves-effect'));

  if ('ontouchstart' in window) {
    document.body.addEventListener('touchstart', showEffect, false);
  }

  document.body.addEventListener('mousedown', showEffect, false);
};

/**
 * Attach Waves to an input element (or any element which doesn't
 * bubble mouseup/mousedown events).
 *   Intended to be used with dynamically loaded forms/inputs, or
 * where the user doesn't want a delegated click handler.
 */
Waves.attach = function (element) {
  //FUTURE: automatically add waves classes and allow users
  // to specify them with an options param? Eg. light/classic/button
  if (element.tagName.toLowerCase() === 'input') {
    Effect.wrapInput([element]);
    element = element.parentElement;
  }

  if ('ontouchstart' in window) {
    element.addEventListener('touchstart', showEffect, false);
  }

  element.addEventListener('mousedown', showEffect, false);
};

window.Waves = Waves;

document.addEventListener('DOMContentLoaded', function () {
  Waves.displayEffect();
}, false);

/*
        $.fn.extend({
        show: function () {
            return $(this).removeClass('invisible');
        },
        hide: function () {
            return $(this).addClass('invisible');
        },
        toggle: function (state) {
            return $(this).toggleClass('invisible');
        }
    });
*/

$$1.fn.modal = function (option) {
  var defaults = {
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: 0.5, // Opacity of modal background
    in_duration: 300, // Transition in duration
    out_duration: 200, // Transition out duration
    ready: function ready() {
      alert('Ready');
    }, // Callback for Modal open
    complete: function complete() {
      alert('Closed');
    } // Callback for Modal close
  };

  var options = $$1.extend(defaults, option);

  return this.each(function () {
    if (option === 'show') {
      $$1(this).openModal();
    } else if (options === 'hide') {
      $$1(this).closeModal();
    } else {
      $$1(this).leanModal(options);
    }
  });
};

/**
 * Devuelve el elemento que calza con el selector, o crea un nuevo elemento
 * @param  {String} selector  selector CSS para buscar si existe el elemento
 * @param  {String} html  definicion del elemento a crear
 * @return {jQuery Object} uno o mas elementos que calzan con el criterio de seleccion
 */
$$1.getOrCreate = function (selector, html) {
  var elemento = $$1(selector);

  if (elemento.length === 0) {
    elemento = $$1(html);
  }

  return elemento;
};

$$1.fn.tabs = function (methodOrOptions) {
  var wavesmethods = {
    init: function init() {
      return this.each(function () {

        // For each set of tabs, we want to keep track of
        // which tab is active and its associated content
        var $this = $$1(this),
            window_width = $$1(window).width();

        $this.width('100%');
        var $active,
            $content,
            $links = $this.find('li.tab a'),
            $tabs_width = $this.width(),
            $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length,
            $index = 0;

        // If the location.hash matches one of the links, use that as the active tab.
        $active = $$1($links.filter('[href="' + location.hash + '"]'));

        // If no match is found, use the first link or any with class 'active' as the initial active tab.
        if ($active.length === 0) {
          $active = $$1(this).find('li.tab a.active').first();
        }
        if ($active.length === 0) {
          $active = $$1(this).find('li.tab a').first();
        }

        $active.addClass('active');
        $index = $links.index($active);
        if ($index < 0) {
          $index = 0;
        }

        if ($active[0] !== undefined) {
          $content = $$1($active[0].hash);
        }

        // append indicator then set indicator width to tab width
        $this.append('<div class="indicator"></div>');
        var $indicator = $this.find('.indicator');
        if ($this.is(":visible")) {
          $indicator.css({
            "right": $tabs_width - ($index + 1) * $tab_width
          });
          $indicator.css({
            "left": $index * $tab_width
          });
        }
        $$1(window).resize(function () {
          $tabs_width = $this.width();
          $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;
          if ($index < 0) {
            $index = 0;
          }
          if ($tab_width !== 0 && $tabs_width !== 0) {
            $indicator.css({
              "right": $tabs_width - ($index + 1) * $tab_width
            });
            $indicator.css({
              "left": $index * $tab_width
            });
          }
        });

        // Hide the remaining content
        $links.not($active).each(function () {
          $$1(this.hash).hide();
        });

        // Bind the click event handler
        $this.on('click', 'a', function (e) {
          if ($$1(this).parent().hasClass('disabled')) {
            e.preventDefault();
            return;
          }

          $tabs_width = $this.width();
          $tab_width = Math.max($tabs_width, $this[0].scrollWidth) / $links.length;

          // Make the old tab inactive.
          $active.removeClass('active');
          if ($content !== undefined) {
            $content.hide();
          }

          // Update the variables with the new link and content
          $active = $$1(this);
          $content = $$1(this.hash);
          $links = $this.find('li.tab a');

          // Make the tab active.
          $active.addClass('active');
          var $prev_index = $index;
          $index = $links.index($$1(this));
          if ($index < 0) {
            $index = 0;
          }
          // Change url to current tab
          // window.location.hash = $active.attr('href');

          if ($content !== undefined) {
            $content.show();
          }

          // Update indicator
          if ($index - $prev_index >= 0) {
            $indicator.velocity({
              "right": $tabs_width - ($index + 1) * $tab_width
            }, {
              duration: 300,
              queue: false,
              easing: 'easeOutQuad'
            });
            $indicator.velocity({
              "left": $index * $tab_width
            }, {
              duration: 300,
              queue: false,
              easing: 'easeOutQuad',
              delay: 90
            });
          } else {
            $indicator.velocity({
              "left": $index * $tab_width
            }, {
              duration: 300,
              queue: false,
              easing: 'easeOutQuad'
            });
            $indicator.velocity({
              "right": $tabs_width - ($index + 1) * $tab_width
            }, {
              duration: 300,
              queue: false,
              easing: 'easeOutQuad',
              delay: 90
            });
          }

          // Prevent the anchor's default click action
          e.preventDefault();
        });
      });
    },
    select_tab: function select_tab(id) {
      this.find('a[href="#' + id + '"]').trigger('click');
    }
  };
  if (wavesmethods[methodOrOptions]) {
    return wavesmethods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
  } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
    // Default to "init"
    return wavesmethods.init.apply(this, arguments);
  } else {
    $$1.error('Method ' + methodOrOptions + ' does not exist on $.tooltip');
  }
};

function textareaAutoResize($textarea) {
  // Set font properties of hiddenDiv

  var fontFamily = $textarea.css('font-family');
  var fontSize = $textarea.css('font-size');

  if (fontSize) {
    hiddenDiv.css('font-size', fontSize);
  }
  if (fontFamily) {
    hiddenDiv.css('font-family', fontFamily);
  }

  if ($textarea.attr('wrap') === "off") {
    hiddenDiv.css('overflow-wrap', "normal").css('white-space', "pre");
  }

  hiddenDiv.text($textarea.val() + '\n');
  var content = hiddenDiv.html().replace(/\n/g, '<br>');
  hiddenDiv.html(content);

  // When textarea is hidden, width goes crazy.
  // Approximate with half of window size

  if ($textarea.is(':visible')) {
    hiddenDiv.css('width', $textarea.width());
  } else {
    hiddenDiv.css('width', $$1(window).width() / 2);
  }

  $textarea.css('height', hiddenDiv.height());
}

$$1(document).ready(function () {

  $$1('ul.tabs').tabs();
  // Dismissible Collections

  // Handle HTML5 autofocus
  $$1('input[autofocus]').siblings('label, i').addClass('active');

  // Textarea Auto Resize
  var hiddenDiv = $$1('.hiddendiv').first();
  if (!hiddenDiv.length) {
    hiddenDiv = $$1('<div class="hiddendiv common"></div>');
    $$1('body').append(hiddenDiv);
  }
  var text_area_selector = '.materialize-textarea';

  $$1(text_area_selector).each(function () {
    var $textarea = $$1(this);
    if ($textarea.val().length) {
      textareaAutoResize($textarea);
    }
  });

  $$1('body').on('keyup keydown autoresize', text_area_selector, function () {
    textareaAutoResize($$1(this));
  });

  // File Input Path

  $$1(document).on('change', '.file-field input[type="file"]', function () {
    var file_field = $$1(this).closest('.file-field');
    var path_input = file_field.find('input.file-path');
    var files = $$1(this)[0].files;
    var file_names = [];
    for (var i = 0; i < files.length; i++) {
      file_names.push(files[i].name);
    }
    path_input.val(file_names.join(", "));
    path_input.trigger('change');
  });
});

var widgetUuid = 0;
var widgetSlice = Array.prototype.slice;

function Widget() /* options, element */{}

Widget._childConstructors = [];

Widget.extend = function (target) {
	var input = widgetSlice.call(arguments, 1);
	var inputIndex = 0;
	var inputLength = input.length;
	var key;
	var value;

	for (; inputIndex < inputLength; inputIndex++) {
		for (key in input[inputIndex]) {
			value = input[inputIndex][key];
			if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {

				// Clone objects
				if ($.isPlainObject(value)) {
					target[key] = $.isPlainObject(target[key]) ? Widget.extend({}, target[key], value) :

					// Don't extend strings, arrays, etc. with objects
					Widget.extend({}, value);

					// Copy everything else by reference
				} else {
						target[key] = value;
					}
			}
		}
	}
	return target;
};

Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",

	options: {
		classes: {},
		disabled: false,

		// Callbacks
		create: null
	},

	_createWidget: function _createWidget(options, element) {
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
			this._on(true, this.element, {
				remove: function remove(event) {
					if (event.target === element) {
						this.destroy();
					}
				}
			});
			this.document = $(element.style ?

			// Element within the document
			element.ownerDocument :

			// Element is window or document
			element.document || element);
			this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
		}

		this.options = Widget.extend({}, this.options, this._getCreateOptions(), options);

		this._create();

		if (this.options.disabled) {
			this._setOptionDisabled(this.options.disabled);
		}

		this._trigger("create", null, this._getCreateEventData());
		this._init();
	},

	_getCreateOptions: function _getCreateOptions() {
		return {};
	},

	_getCreateEventData: $.noop,

	_create: $.noop,

	_init: $.noop,

	destroy: function destroy() {
		var that = this;

		this._destroy();
		$.each(this.classesElementLookup, function (key, value) {
			that._removeClass(value, key);
		});

		// We can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element.off(this.eventNamespace).removeData(this.widgetFullName);
		this.widget().off(this.eventNamespace).removeAttr("aria-disabled");

		// Clean up events and states
		this.bindings.off(this.eventNamespace);
	},

	_destroy: $.noop,

	widget: function widget() {
		return this.element;
	},

	option: function option(key, value) {
		var options = key;
		var parts;
		var curOption;
		var i;

		if (arguments.length === 0) {

			// Don't return a reference to the internal hash
			return Widget.extend({}, this.options);
		}

		if (typeof key === "string") {

			// Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split(".");
			key = parts.shift();
			if (parts.length) {
				curOption = options[key] = Widget.extend({}, this.options[key]);
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

	_setOptions: function _setOptions(options) {
		var key;

		for (key in options) {
			this._setOption(key, options[key]);
		}

		return this;
	},

	_setOption: function _setOption(key, value) {
		if (key === "classes") {
			this._setOptionClasses(value);
		}

		this.options[key] = value;

		if (key === "disabled") {
			this._setOptionDisabled(value);
		}

		return this;
	},

	_setOptionClasses: function _setOptionClasses(value) {
		var classKey, elements, currentElements;

		for (classKey in value) {
			currentElements = this.classesElementLookup[classKey];
			if (value[classKey] === this.options.classes[classKey] || !currentElements || !currentElements.length) {
				continue;
			}

			// We are doing this to create a new jQuery object because the _removeClass() call
			// on the next line is going to destroy the reference to the current elements being
			// tracked. We need to save a copy of this collection so that we can add the new classes
			// below.
			elements = $(currentElements.get());
			this._removeClass(currentElements, classKey);

			// We don't use _addClass() here, because that uses this.options.classes
			// for generating the string of classes. We want to use the value passed in from
			// _setOption(), this is the new value of the classes option which was passed to
			// _setOption(). We pass this value directly to _classes().
			elements.addClass(this._classes({
				element: elements,
				keys: classKey,
				classes: value,
				add: true
			}));
		}
	},

	_setOptionDisabled: function _setOptionDisabled(value) {
		this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!value);

		// If the widget is becoming disabled, then nothing is interactive
		if (value) {
			this._removeClass(this.hoverable, null, "ui-state-hover");
			this._removeClass(this.focusable, null, "ui-state-focus");
		}
	},

	enable: function enable() {
		return this._setOptions({
			disabled: false
		});
	},

	disable: function disable() {
		return this._setOptions({
			disabled: true
		});
	},

	_classes: function _classes(options) {
		var full = [];
		var that = this;

		options = $.extend({
			element: this.element,
			classes: this.options.classes || {}
		}, options);

		function processClassString(classes, checkOption) {
			var current, i;
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

	_removeClass: function _removeClass(element, keys, extra) {
		return this._toggleClass(element, keys, extra, false);
	},

	_addClass: function _addClass(element, keys, extra) {
		return this._toggleClass(element, keys, extra, true);
	},

	_toggleClass: function _toggleClass(element, keys, extra, add) {
		add = typeof add === "boolean" ? add : extra;
		var shift = typeof element === "string" || element === null,
		    options = {
			extra: shift ? keys : extra,
			keys: shift ? element : keys,
			element: shift ? this.element : element,
			add: add
		};
		options.element.toggleClass(this._classes(options), add);
		return this;
	},

	_on: function _on(suppressDisabledCheck, element, handlers) {
		var delegateElement;
		var instance = this;

		// No suppressDisabledCheck flag, shuffle arguments
		if (typeof suppressDisabledCheck !== "boolean") {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// No element argument, shuffle and use this.element
		if (!handlers) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $(element);
			this.bindings = this.bindings.add(element);
		}

		$.each(handlers, function (event, handler) {
			function handlerProxy() {

				// Allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
					return;
				}
				return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
			}

			// Copy the guid so direct unbinding works
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

	_off: function _off(element, eventName) {
		eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
		element.off(eventName).off(eventName);

		// Clear the stack to avoid memory leaks (#10056)
		this.bindings = $(this.bindings.not(element).get());
		this.focusable = $(this.focusable.not(element).get());
		this.hoverable = $(this.hoverable.not(element).get());
	},

	_delay: function _delay(handler, delay) {
		function handlerProxy() {
			return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
		}
		var instance = this;
		return setTimeout(handlerProxy, delay || 0);
	},

	_hoverable: function _hoverable(element) {
		this.hoverable = this.hoverable.add(element);
		this._on(element, {
			mouseenter: function mouseenter(event) {
				this._addClass($(event.currentTarget), null, "ui-state-hover");
			},
			mouseleave: function mouseleave(event) {
				this._removeClass($(event.currentTarget), null, "ui-state-hover");
			}
		});
	},

	_focusable: function _focusable(element) {
		this.focusable = this.focusable.add(element);
		this._on(element, {
			focusin: function focusin(event) {
				this._addClass($(event.currentTarget), null, "ui-state-focus");
			},
			focusout: function focusout(event) {
				this._removeClass($(event.currentTarget), null, "ui-state-focus");
			}
		});
	},

	_trigger: function _trigger(type, event, data) {
		var prop, orig;
		var callback = this.options[type];

		data = data || {};
		event = $.Event(event);
		event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();

		// The original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[0];

		// Copy original event properties over to the new event
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

Widget.prototype._show = function (element, options, callback) {
	if (typeof options === "string") {
		options = {
			effect: options
		};
	}

	var hasOptions;
	var effectName = !options ? method : options === true || typeof options === "number" ? 'fadeIn' : options.effect || 'fadeIn';

	options = options || {};
	if (typeof options === "number") {
		options = {
			duration: options
		};
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
		element.queue(function (next) {
			$(this)[method]();
			if (callback) {
				callback.call(element[0]);
			}
			next();
		});
	}
};
Widget.prototype._hide = function (element, options, callback) {
	if (typeof options === "string") {
		options = {
			effect: options
		};
	}

	var hasOptions;
	var effectName = !options ? method : options === true || typeof options === "number" ? 'fadeOut' : options.effect || 'fadeOut';

	options = options || {};
	if (typeof options === "number") {
		options = {
			duration: options
		};
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
		element.queue(function (next) {
			$(this)[method]();
			if (callback) {
				callback.call(element[0]);
			}
			next();
		});
	}
};

$.Widget = Widget;

$.widget = function (name, base, prototype) {
	var existingConstructor, constructor, basePrototype;

	// ProxiedPrototype allows the provided prototype to remain unmodified
	// so that it can be used as a mixin for multiple widgets (#8876)
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

	// Create selector for plugin
	$.expr[":"][fullName.toLowerCase()] = function (elem) {
		return !!$.data(elem, fullName);
	};

	$[namespace] = $[namespace] || {};
	existingConstructor = $[namespace][name];
	constructor = $[namespace][name] = function (options, element) {

		// Allow instantiation without "new" keyword
		if (!this._createWidget) {
			return new constructor(options, element);
		}

		// Allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if (arguments.length) {
			this._createWidget(options, element);
		}
	};

	// Extend with the existing constructor to carry over any static properties
	$.extend(constructor, existingConstructor, {
		version: prototype.version,

		// Copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend({}, prototype),

		// Track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();

	// We need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend({}, basePrototype.options);
	$.each(prototype, function (prop, value) {
		if (!$.isFunction(value)) {
			proxiedPrototype[prop] = value;
			return;
		}
		proxiedPrototype[prop] = function () {
			function _super() {
				return base.prototype[prop].apply(this, arguments);
			}

			function _superApply(args) {
				return base.prototype[prop].apply(this, args);
			}

			return function () {
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
		}();
	});
	constructor.prototype = $.widget.extend(basePrototype, {

		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if (existingConstructor) {
		$.each(existingConstructor._childConstructors, function (i, child) {
			var childPrototype = child.prototype;

			// Redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
		});

		// Remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push(constructor);
	}

	$.widget.bridge(name, constructor);

	return constructor;
};

$.widget.extend = function (target) {
	var input = widgetSlice.call(arguments, 1);
	var inputIndex = 0;
	var inputLength = input.length;
	var key;
	var value;

	for (; inputIndex < inputLength; inputIndex++) {
		for (key in input[inputIndex]) {
			value = input[inputIndex][key];
			if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {

				// Clone objects
				if ($.isPlainObject(value)) {
					target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) :

					// Don't extend strings, arrays, etc. with objects
					$.widget.extend({}, value);

					// Copy everything else by reference
				} else {
						target[key] = value;
					}
			}
		}
	}
	return target;
};

$.widget.bridge = function (name, object) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[name] = function (options) {
		var isMethodCall = typeof options === "string";
		var args = widgetSlice.call(arguments, 1);
		var returnValue = this;

		if (isMethodCall) {
			this.each(function () {
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

			// Allow multiple hashes to be passed on init
			if (args.length) {
				options = $.widget.extend.apply(null, [options].concat(args));
			}

			this.each(function () {
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

var widget$1 = $.widget;

var ui = {
	version: "1.12.0",
	safeActiveElement: function safeActiveElement(document) {
		var activeElement;

		// Support: IE 9 only
		// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
		try {
			activeElement = document.activeElement;
		} catch (error) {
			activeElement = document.body;
		}

		// Support: IE 9 - 11 only
		// IE may return null instead of an element
		// Interestingly, this only seems to occur when NOT in an iframe
		if (!activeElement) {
			activeElement = document.body;
		}

		// Support: IE 11 only
		// IE11 returns a seemingly empty object in some cases when accessing
		// document.activeElement from an <iframe>
		if (!activeElement.nodeName) {
			activeElement = document.body;
		}

		return activeElement;
	},
	safeBlur: function safeBlur(element) {

		// Support: IE9 - 10 only
		// If the <body> is blurred, IE will switch windows, see #9420
		if (element && element.nodeName.toLowerCase() !== "body") {
			$(element).trigger("blur");
		}
	}
};

$.ui = ui;

var intersect = $.ui.intersect = function () {
	function isOverAxis(x, reference, size) {
		return x >= reference && x < reference + size;
	}

	return function (draggable, droppable, toleranceMode, event) {

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
				return l <= x1 && x2 <= r && t <= y1 && y2 <= b;
			case "intersect":
				return l < x1 + draggable.helperProportions.width / 2 && // Right Half
				x2 - draggable.helperProportions.width / 2 < r && // Left Half
				t < y1 + draggable.helperProportions.height / 2 && // Bottom Half
				y2 - draggable.helperProportions.height / 2 < b; // Top Half
			case "pointer":
				return isOverAxis(event.pageY, t, droppable.proportions().height) && isOverAxis(event.pageX, l, droppable.proportions().width);
			case "touch":
				return (y1 >= t && y1 <= b || // Top edge touching
				y2 >= t && y2 <= b || // Bottom edge touching
				y1 < t && y2 > b // Surrounded vertically
				) && (x1 >= l && x1 <= r || // Left edge touching
				x2 >= l && x2 <= r || // Right edge touching
				x1 < l && x2 > r // Surrounded horizontally
				);
			default:
				return false;
		}
	};
}();

(function (global, jQuery) {
	var cachedScrollbarWidth,
	    _supportsOffsetFractions,
	    max = Math.max,
	    abs = Math.abs,
	    round = Math.round,
	    rhorizontal = /left|center|right/,
	    rvertical = /top|center|bottom/,
	    roffset = /[\+\-]\d+(\.[\d]+)?%?/,
	    rposition = /^\w+/,
	    rpercent = /%jQuery/,
	    _position = jQuery.fn.position;

	// Support: IE <=9 only
	_supportsOffsetFractions = function supportsOffsetFractions() {
		var element = jQuery("<div>").css("position", "absolute").appendTo("body").offset({
			top: 1.5,
			left: 1.5
		}),
		    support = element.offset().top === 1.5;

		element.remove();

		_supportsOffsetFractions = function supportsOffsetFractions() {
			return support;
		};

		return support;
	};

	function getOffsets(offsets, width, height) {
		return [parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)];
	}

	function parseCss(element, property) {
		return parseInt(jQuery.css(element, property), 10) || 0;
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
		if (jQuery.isglobal(raw)) {
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

	jQuery.position = {
		scrollbarWidth: function scrollbarWidth() {
			if (cachedScrollbarWidth !== undefined) {
				return cachedScrollbarWidth;
			}
			var w1,
			    w2,
			    div = jQuery("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"),
			    innerDiv = div.children()[0];

			jQuery("body").append(div);
			w1 = innerDiv.offsetWidth;
			div.css("overflow", "scroll");

			w2 = innerDiv.offsetWidth;

			if (w1 === w2) {
				w2 = div[0].clientWidth;
			}

			div.remove();

			return cachedScrollbarWidth = w1 - w2;
		},
		getScrollInfo: function getScrollInfo(within) {
			var overflowX = within.isglobal || within.isDocument ? "" : within.element.css("overflow-x"),
			    overflowY = within.isglobal || within.isDocument ? "" : within.element.css("overflow-y"),
			    hasOverflowX = overflowX === "scroll" || overflowX === "auto" && within.width < within.element[0].scrollWidth,
			    hasOverflowY = overflowY === "scroll" || overflowY === "auto" && within.height < within.element[0].scrollHeight;
			return {
				width: hasOverflowY ? jQuery.position.scrollbarWidth() : 0,
				height: hasOverflowX ? jQuery.position.scrollbarWidth() : 0
			};
		},
		getWithinInfo: function getWithinInfo(element) {
			var withinElement = jQuery(element || global),
			    isglobal = jQuery.isglobal(withinElement[0]),
			    isDocument = !!withinElement[0] && withinElement[0].nodeType === 9,
			    hasOffset = !isglobal && !isDocument;
			return {
				element: withinElement,
				isglobal: isglobal,
				isDocument: isDocument,
				offset: hasOffset ? jQuery(element).offset() : {
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

	jQuery.fn.position = function (options) {
		if (!options || !options.of) {
			return _position.apply(this, arguments);
		}

		// Make a copy, we don't want to modify arguments
		options = jQuery.extend({}, options);

		var atOffset,
		    targetWidth,
		    targetHeight,
		    targetOffset,
		    basePosition,
		    dimensions,
		    target = jQuery(options.of),
		    within = jQuery.position.getWithinInfo(options.within),
		    scrollInfo = jQuery.position.getScrollInfo(within),
		    collision = (options.collision || "flip").split(" "),
		    offsets = {};

		dimensions = getDimensions(target);
		if (target[0].preventDefault) {

			// Force left top to allow flipping
			options.at = "left top";
		}
		targetWidth = dimensions.width;
		targetHeight = dimensions.height;
		targetOffset = dimensions.offset;

		// Clone to reuse original targetOffset later
		basePosition = jQuery.extend({}, targetOffset);

		// Force my and at to have valid horizontal and vertical positions
		// if a value is missing or invalid, it will be converted to center
		jQuery.each(["my", "at"], function () {
			var pos = (options[this] || "").split(" "),
			    horizontalOffset,
			    verticalOffset;

			if (pos.length === 1) {
				pos = rhorizontal.test(pos[0]) ? pos.concat(["center"]) : rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"];
			}
			pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
			pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";

			// Calculate offsets
			horizontalOffset = roffset.exec(pos[0]);
			verticalOffset = roffset.exec(pos[1]);
			offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0];

			// Reduce to just the positions without the offsets
			options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]];
		});

		// Normalize collision option
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

		return this.each(function () {
			var collisionPosition,
			    using,
			    elem = jQuery(this),
			    elemWidth = elem.outerWidth(),
			    elemHeight = elem.outerHeight(),
			    marginLeft = parseCss(this, "marginLeft"),
			    marginTop = parseCss(this, "marginTop"),
			    collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width,
			    collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height,
			    position = jQuery.extend({}, basePosition),
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

			// If the browser doesn't support fractions, then round for consistent results
			if (!_supportsOffsetFractions()) {
				position.left = round(position.left);
				position.top = round(position.top);
			}

			collisionPosition = {
				marginLeft: marginLeft,
				marginTop: marginTop
			};

			jQuery.each(["left", "top"], function (i, dir) {
				if (jQuery.ui.position[collision[i]]) {
					jQuery.ui.position[collision[i]][dir](position, {
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

				// Adds feedback as second argument to using callback, if present
				using = function using(props) {
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

			elem.offset(jQuery.extend(position, {
				using: using
			}));
		});
	};

	jQuery.ui.position = {
		fit: {
			left: function left(position, data) {
				var within = data.within,
				    withinOffset = within.isglobal ? within.scrollLeft : within.offset.left,
				    outerWidth = within.width,
				    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				    overLeft = withinOffset - collisionPosLeft,
				    overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
				    newOverRight;

				// Element is wider than within
				if (data.collisionWidth > outerWidth) {

					// Element is initially over the left side of within
					if (overLeft > 0 && overRight <= 0) {
						newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
						position.left += overLeft - newOverRight;

						// Element is initially over right side of within
					} else if (overRight > 0 && overLeft <= 0) {
							position.left = withinOffset;

							// Element is initially over both left and right sides of within
						} else {
								if (overLeft > overRight) {
									position.left = withinOffset + outerWidth - data.collisionWidth;
								} else {
									position.left = withinOffset;
								}
							}

					// Too far left -> align with left edge
				} else if (overLeft > 0) {
						position.left += overLeft;

						// Too far right -> align with right edge
					} else if (overRight > 0) {
							position.left -= overRight;

							// Adjust based on position and margin
						} else {
								position.left = max(position.left - collisionPosLeft, position.left);
							}
			},
			top: function top(position, data) {
				var within = data.within,
				    withinOffset = within.isglobal ? within.scrollTop : within.offset.top,
				    outerHeight = data.within.height,
				    collisionPosTop = position.top - data.collisionPosition.marginTop,
				    overTop = withinOffset - collisionPosTop,
				    overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
				    newOverBottom;

				// Element is taller than within
				if (data.collisionHeight > outerHeight) {

					// Element is initially over the top of within
					if (overTop > 0 && overBottom <= 0) {
						newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
						position.top += overTop - newOverBottom;

						// Element is initially over bottom of within
					} else if (overBottom > 0 && overTop <= 0) {
							position.top = withinOffset;

							// Element is initially over both top and bottom of within
						} else {
								if (overTop > overBottom) {
									position.top = withinOffset + outerHeight - data.collisionHeight;
								} else {
									position.top = withinOffset;
								}
							}

					// Too far up -> align with top
				} else if (overTop > 0) {
						position.top += overTop;

						// Too far down -> align with bottom edge
					} else if (overBottom > 0) {
							position.top -= overBottom;

							// Adjust based on position and margin
						} else {
								position.top = max(position.top - collisionPosTop, position.top);
							}
			}
		},
		flip: {
			left: function left(position, data) {
				var within = data.within,
				    withinOffset = within.offset.left + within.scrollLeft,
				    outerWidth = within.width,
				    offsetLeft = within.isglobal ? within.scrollLeft : within.offset.left,
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
			top: function top(position, data) {
				var within = data.within,
				    withinOffset = within.offset.top + within.scrollTop,
				    outerHeight = within.height,
				    offsetTop = within.isglobal ? within.scrollTop : within.offset.top,
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
			left: function left() {
				jQuery.ui.position.flip.left.apply(this, arguments);
				jQuery.ui.position.fit.left.apply(this, arguments);
			},
			top: function top() {
				jQuery.ui.position.flip.top.apply(this, arguments);
				jQuery.ui.position.fit.top.apply(this, arguments);
			}
		}
	};
})(window, $);

$.cleanData = function (orig) {
	return function (elems) {
		var events, elem, i;
		for (i = 0; (elem = elems[i]) != null; i++) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data(elem, "events");
				if (events && events.remove) {
					$(elem).triggerHandler("remove");
				}

				// Http://bugs.jquery.com/ticket/8235
			} catch (e) {}
		}
		orig(elems);
	};
}($.cleanData);

$.extend($.expr[":"], {
	data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
		return function (elem) {
			return !!$.data(elem, dataName);
		};
	}) :

	// Support: jQuery <1.8
	function (elem, i, match) {
		return !!$.data(elem, match[3]);
	}
});

$.fn.scrollParent = function (includeHidden) {
	var position = this.css("position"),
	    excludeStaticParent = position === "absolute",
	    overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
	    scrollParent = this.parents().filter(function () {
		var parent = $(this);
		if (excludeStaticParent && parent.css("position") === "static") {
			return false;
		}
		return overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
	}).eq(0);

	return position === "fixed" || !scrollParent.length ? $(this[0].ownerDocument || document) : scrollParent;
};

$.fn.extend({
	disableSelection: function () {
		var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";

		return function () {
			return this.on(eventType + ".ui-disableSelection", function (event) {
				event.preventDefault();
			});
		};
	}(),

	enableSelection: function enableSelection() {
		return this.off(".ui-disableSelection");
	}
});

/*!
 * jQuery UI Mouse 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Mouse
//>>group: Widgets
//>>description: Abstracts mouse-based interactions to assist in creating certain widgets.
//>>docs: http://api.jqueryui.com/mouse/

var mouseHandled = false;
$(document).on("mouseup", function () {
	mouseHandled = false;
});

widget$1("ui.mouse", {
	version: "1.12.0",
	options: {
		cancel: "input, textarea, button, select, option",
		distance: 1,
		delay: 0
	},
	_mouseInit: function _mouseInit() {
		var that = this;

		this.element.on("mousedown." + this.widgetName, function (event) {
			return that._mouseDown(event);
		}).on("click." + this.widgetName, function (event) {
			if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
				$.removeData(event.target, that.widgetName + ".preventClickEvent");
				event.stopImmediatePropagation();
				return false;
			}
		});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function _mouseDestroy() {
		this.element.off("." + this.widgetName);
		if (this._mouseMoveDelegate) {
			this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
		}
	},

	_mouseDown: function _mouseDown(event) {

		// don't let more than one widget handle mouseStart
		if (mouseHandled) {
			return;
		}

		this._mouseMoved = false;

		// We may have missed mouseup (out of window)
		this._mouseStarted && this._mouseUp(event);

		this._mouseDownEvent = event;

		var that = this,
		    btnIsLeft = event.which === 1,


		// event.target.nodeName works around a bug in IE 8 with
		// disabled inputs (#7620)
		elIsCancel = typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false;
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function () {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = this._mouseStart(event) !== false;
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
			$.removeData(event.target, this.widgetName + ".preventClickEvent");
		}

		// These delegates are required to keep context
		this._mouseMoveDelegate = function (event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function (event) {
			return that._mouseUp(event);
		};

		this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate);

		event.preventDefault();

		mouseHandled = true;
		return true;
	},

	_mouseMove: function _mouseMove(event) {

		// Only check for mouseups outside the document if you've moved inside the document
		// at least once. This prevents the firing of mouseup in the case of IE<9, which will
		// fire a mousemove event if content is placed under the cursor. See #7778
		// Support: IE <9
		if (this._mouseMoved) {

			// IE mouseup check - mouseup happened when mouse was out of window
			if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
				return this._mouseUp(event);

				// Iframe mouseup check - mouseup occurred in another document
			} else if (!event.which) {

					// Support: Safari <=8 - 9
					// Safari sets which to 0 if you press any of the following keys
					// during a drag (#14461)
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
			this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== false;
			this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event);
		}

		return !this._mouseStarted;
	},

	_mouseUp: function _mouseUp(event) {
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

	_mouseDistanceMet: function _mouseDistanceMet(event) {
		return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;
	},

	_mouseDelayMet: function _mouseDelayMet() /* event */{
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function _mouseStart() /* event */{},
	_mouseDrag: function _mouseDrag() /* event */{},
	_mouseStop: function _mouseStop() /* event */{},
	_mouseCapture: function _mouseCapture() /* event */{
		return true;
	}
});

var mouse = $.ui.mouse;

ui.plugin = {
	add: function add(module, option, set) {
		var i,
		    proto = ui[module].prototype;
		for (i in set) {
			proto.plugins[i] = proto.plugins[i] || [];
			proto.plugins[i].push([option, set[i]]);
		}
	},
	call: function call(instance, name, args, allowDisconnected) {
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

var plugin = ui.plugin;

/*!
 * jQuery UI Draggable 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Draggable
//>>group: Interactions
//>>description: Enables dragging functionality for any element.
//>>docs: http://api.jqueryui.com/draggable/
//>>demos: http://jqueryui.com/draggable/
//>>css.structure: ../../themes/base/draggable.css

widget$1("ui.draggable", mouse, {
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

		// Callbacks
		drag: null,
		start: null,
		stop: null
	},
	_create: function _create() {

		if (this.options.helper === "original") {
			this._setPositionRelative();
		}
		if (this.options.addClasses) {
			this._addClass("ui-draggable");
		}
		this._setHandleClassName();

		this._mouseInit();
	},

	_setOption: function _setOption(key, value) {
		this._super(key, value);
		if (key === "handle") {
			this._removeHandleClassName();
			this._setHandleClassName();
		}
	},

	_destroy: function _destroy() {
		if ((this.helper || this.element).is(".ui-draggable-dragging")) {
			this.destroyOnClear = true;
			return;
		}
		this._removeHandleClassName();
		this._mouseDestroy();
	},

	_mouseCapture: function _mouseCapture(event) {
		var o = this.options;

		this._blurActiveElement(event);

		// Among others, prevent a drag on a resizable-handle
		if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
			return false;
		}

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle) {
			return false;
		}

		this._blockFrames(o.iframeFix === true ? "iframe" : o.iframeFix);

		return true;
	},

	_blockFrames: function _blockFrames(selector) {
		this.iframeBlocks = this.document.find(selector).map(function () {
			var iframe = $(this);

			return $("<div>").css("position", "absolute").appendTo(iframe.parent()).outerWidth(iframe.outerWidth()).outerHeight(iframe.outerHeight()).offset(iframe.offset())[0];
		});
	},

	_unblockFrames: function _unblockFrames() {
		if (this.iframeBlocks) {
			this.iframeBlocks.remove();
			delete this.iframeBlocks;
		}
	},

	_blurActiveElement: function _blurActiveElement(event) {
		var activeElement = $.ui.safeActiveElement(this.document[0]),
		    target = $(event.target);

		// Only blur if the event occurred on an element that is:
		// 1) within the draggable handle
		// 2) but not within the currently focused element
		// See #10527, #12472
		if (this._getHandle(event) && target.closest(activeElement).length) {
			return;
		}

		// Blur any element that currently has focus, see #4261
		$.ui.safeBlur(activeElement);
	},

	_mouseStart: function _mouseStart(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		this._addClass(this.helper, "ui-draggable-dragging");

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if ($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		/*
   * - Position generation -
   * This block generates everything position related - it's the core of draggables.
   */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css("position");
		this.scrollParent = this.helper.scrollParent(true);
		this.offsetParent = this.helper.offsetParent();
		this.hasFixedAncestor = this.helper.parents().filter(function () {
			return $(this).css("position") === "fixed";
		}).length > 0;

		//The element's absolute position on the page minus margins
		this.positionAbs = this.element.offset();
		this._refreshOffsets(event);

		//Generate the original position
		this.originalPosition = this.position = this._generatePosition(event, false);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);

		//Set a containment if given in the options
		this._setContainment();

		//Trigger event + callbacks
		if (this._trigger("start", event) === false) {
			this._clear();
			return false;
		}

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		// Execute the drag once - this causes the helper not to be visible before getting its
		// correct position
		this._mouseDrag(event, true);

		// If the ddmanager is used for droppables, inform the manager that dragging has started
		// (see #5003)
		if ($.ui.ddmanager) {
			$.ui.ddmanager.dragStart(this, event);
		}

		return true;
	},

	_refreshOffsets: function _refreshOffsets(event) {
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

	_mouseDrag: function _mouseDrag(event, noPropagation) {

		// reset any necessary cached properties (see #5009)
		if (this.hasFixedAncestor) {
			this.offset.parent = this._getParentOffset();
		}

		//Compute the helpers position
		this.position = this._generatePosition(event, true);
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui$$1 = this._uiHash();
			if (this._trigger("drag", event, ui$$1) === false) {
				this._mouseUp(new $.Event("mouseup", event));
				return false;
			}
			this.position = ui$$1.position;
		}

		this.helper[0].style.left = this.position.left + "px";
		this.helper[0].style.top = this.position.top + "px";

		if ($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		return false;
	},

	_mouseStop: function _mouseStop(event) {

		//If we are using droppables, inform the manager about the drop
		var that = this,
		    dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour) {
			dropped = $.ui.ddmanager.drop(this, event);
		}

		//if a drop comes from outside (a sortable)
		if (this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}

		if (this.options.revert === "invalid" && !dropped || this.options.revert === "valid" && dropped || this.options.revert === true || $.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped)) {
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
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

	_mouseUp: function _mouseUp(event) {
		this._unblockFrames();

		// If the ddmanager is used for droppables, inform the manager that dragging has stopped
		// (see #5003)
		if ($.ui.ddmanager) {
			$.ui.ddmanager.dragStop(this, event);
		}

		// Only need to focus if the event occurred on the draggable itself, see #10527
		if (this.handleElement.is(event.target)) {

			// The interaction is over; whether or not the click resulted in a drag,
			// focus the element
			this.element.trigger("focus");
		}

		return $.ui.mouse.prototype._mouseUp.call(this, event);
	},

	cancel: function cancel() {

		if (this.helper.is(".ui-draggable-dragging")) {
			this._mouseUp(new $.Event("mouseup", {
				target: this.element[0]
			}));
		} else {
			this._clear();
		}

		return this;
	},

	_getHandle: function _getHandle(event) {
		return this.options.handle ? !!$(event.target).closest(this.element.find(this.options.handle)).length : true;
	},

	_setHandleClassName: function _setHandleClassName() {
		this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;
		this._addClass(this.handleElement, "ui-draggable-handle");
	},

	_removeHandleClassName: function _removeHandleClassName() {
		this._removeClass(this.handleElement, "ui-draggable-handle");
	},

	_createHelper: function _createHelper(event) {

		var o = this.options,
		    helperIsFunction = $.isFunction(o.helper),
		    helper = helperIsFunction ? $(o.helper.apply(this.element[0], [event])) : o.helper === "clone" ? this.element.clone().removeAttr("id") : this.element;

		if (!helper.parents("body").length) {
			helper.appendTo(o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo);
		}

		// Http://bugs.jqueryui.com/ticket/9446
		// a helper function can return the original element
		// which wouldn't have been set to relative in _create
		if (helperIsFunction && helper[0] === this.element[0]) {
			this._setPositionRelative();
		}

		if (helper[0] !== this.element[0] && !/(fixed|absolute)/.test(helper.css("position"))) {
			helper.css("position", "absolute");
		}

		return helper;
	},

	_setPositionRelative: function _setPositionRelative() {
		if (!/^(?:r|a|f)/.test(this.element.css("position"))) {
			this.element[0].style.position = "relative";
		}
	},

	_adjustOffsetFromHelper: function _adjustOffsetFromHelper(obj) {
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

	_isRootNode: function _isRootNode(element) {
		return (/(html|body)/i.test(element.tagName) || element === this.document[0]
		);
	},

	_getParentOffset: function _getParentOffset() {

		//Get the offsetParent and cache its position
		var po = this.offsetParent.offset(),
		    document = this.document[0];

		// This is a special case where we need to modify a offset calculated on start, since the
		// following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the
		// next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
		// the document, which means that the scroll is included in the initial calculation of the
		// offset of the parent, and never recalculated upon drag
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

	_getRelativeOffset: function _getRelativeOffset() {
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

	_cacheMargins: function _cacheMargins() {
		this.margins = {
			left: parseInt(this.element.css("marginLeft"), 10) || 0,
			top: parseInt(this.element.css("marginTop"), 10) || 0,
			right: parseInt(this.element.css("marginRight"), 10) || 0,
			bottom: parseInt(this.element.css("marginBottom"), 10) || 0
		};
	},

	_cacheHelperProportions: function _cacheHelperProportions() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function _setContainment() {

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

	_convertPositionTo: function _convertPositionTo(d, pos) {

		if (!pos) {
			pos = this.position;
		}

		var mod = d === "absolute" ? 1 : -1,
		    scrollIsRootNode = this._isRootNode(this.scrollParent[0]);

		return {
			top:

			// The absolute mouse position
			pos.top +

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.top * mod +

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.top * mod - (this.cssPosition === "fixed" ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top) * mod,
			left:

			// The absolute mouse position
			pos.left +

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.left * mod +

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.left * mod - (this.cssPosition === "fixed" ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left) * mod
		};
	},

	_generatePosition: function _generatePosition(event, constrainPosition) {

		var containment,
		    co,
		    top,
		    left,
		    o = this.options,
		    scrollIsRootNode = this._isRootNode(this.scrollParent[0]),
		    pageX = event.pageX,
		    pageY = event.pageY;

		// Cache the scroll
		if (!scrollIsRootNode || !this.offset.scroll) {
			this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			};
		}

		/*
   * - Position constraining -
   * Constrain the position to a mix of grid, containment.
   */

		// If we are not dragging yet, we won't check for options
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

				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid
				// argument errors in IE (see ticket #6950)
				top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
				pageY = containment ? top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3] ? top : top - this.offset.click.top >= containment[1] ? top - o.grid[1] : top + o.grid[1] : top;

				left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
				pageX = containment ? left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2] ? left : left - this.offset.click.left >= containment[0] ? left - o.grid[0] : left + o.grid[0] : left;
			}

			if (o.axis === "y") {
				pageX = this.originalPageX;
			}

			if (o.axis === "x") {
				pageY = this.originalPageY;
			}
		}

		return {
			top:

			// The absolute mouse position
			pageY -

			// Click offset (relative to the element)
			this.offset.click.top -

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.top -

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.top + (this.cssPosition === "fixed" ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top),
			left:

			// The absolute mouse position
			pageX -

			// Click offset (relative to the element)
			this.offset.click.left -

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.left -

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.left + (this.cssPosition === "fixed" ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left)
		};
	},

	_clear: function _clear() {
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

	// From now on bulk stuff - mainly helpers

	_trigger: function _trigger(type, event, ui$$1) {
		ui$$1 = ui$$1 || this._uiHash();
		plugin.call(this, type, [event, ui$$1, this], true);

		// Absolute position and offset (see #6884 ) have to be recalculated after plugins
		if (/^(drag|start|stop)/.test(type)) {
			this.positionAbs = this._convertPositionTo("absolute");
			ui$$1.offset = this.positionAbs;
		}
		return $.Widget.prototype._trigger.call(this, type, event, ui$$1);
	},

	plugins: {},

	_uiHash: function _uiHash() {
		return {
			helper: this.helper,
			position: this.position,
			originalPosition: this.originalPosition,
			offset: this.positionAbs
		};
	}

});

plugin.add("draggable", "connectToSortable", {
	start: function start(event, ui$$1, draggable) {
		var uiSortable = $.extend({}, ui$$1, {
			item: draggable.element
		});

		draggable.sortables = [];
		$(draggable.options.connectToSortable).each(function () {
			var sortable = $(this).sortable("instance");

			if (sortable && !sortable.options.disabled) {
				draggable.sortables.push(sortable);

				// RefreshPositions is called at drag start to refresh the containerCache
				// which is used in drag. This ensures it's initialized and synchronized
				// with any changes that might have happened on the page since initialization.
				sortable.refreshPositions();
				sortable._trigger("activate", event, uiSortable);
			}
		});
	},
	stop: function stop(event, ui$$1, draggable) {
		var uiSortable = $.extend({}, ui$$1, {
			item: draggable.element
		});

		draggable.cancelHelperRemoval = false;

		$.each(draggable.sortables, function () {
			var sortable = this;

			if (sortable.isOver) {
				sortable.isOver = 0;

				// Allow this sortable to handle removing the helper
				draggable.cancelHelperRemoval = true;
				sortable.cancelHelperRemoval = false;

				// Use _storedCSS To restore properties in the sortable,
				// as this also handles revert (#9675) since the draggable
				// may have modified them in unexpected ways (#8809)
				sortable._storedCSS = {
					position: sortable.placeholder.css("position"),
					top: sortable.placeholder.css("top"),
					left: sortable.placeholder.css("left")
				};

				sortable._mouseStop(event);

				// Once drag has ended, the sortable should return to using
				// its original helper, not the shared helper from draggable
				sortable.options.helper = sortable.options._helper;
			} else {

				// Prevent this Sortable from removing the helper.
				// However, don't set the draggable to remove the helper
				// either as another connected Sortable may yet handle the removal.
				sortable.cancelHelperRemoval = true;

				sortable._trigger("deactivate", event, uiSortable);
			}
		});
	},
	drag: function drag(event, ui$$1, draggable) {
		$.each(draggable.sortables, function () {
			var innermostIntersecting = false,
			    sortable = this;

			// Copy over variables that sortable's _intersectsWith uses
			sortable.positionAbs = draggable.positionAbs;
			sortable.helperProportions = draggable.helperProportions;
			sortable.offset.click = draggable.offset.click;

			if (sortable._intersectsWith(sortable.containerCache)) {
				innermostIntersecting = true;

				$.each(draggable.sortables, function () {

					// Copy over variables that sortable's _intersectsWith uses
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

				// If it intersects, we use a little isOver variable and set it once,
				// so that the move-in stuff gets fired only once.
				if (!sortable.isOver) {
					sortable.isOver = 1;

					// Store draggable's parent in case we need to reappend to it later.
					draggable._parent = ui$$1.helper.parent();

					sortable.currentItem = ui$$1.helper.appendTo(sortable.element).data("ui-sortable-item", true);

					// Store helper option to later restore it
					sortable.options._helper = sortable.options.helper;

					sortable.options.helper = function () {
						return ui$$1.helper[0];
					};

					// Fire the start events of the sortable with our passed browser event,
					// and our own helper (so it doesn't create a new one)
					event.target = sortable.currentItem[0];
					sortable._mouseCapture(event, true);
					sortable._mouseStart(event, true, true);

					// Because the browser event is way off the new appended portlet,
					// modify necessary variables to reflect the changes
					sortable.offset.click.top = draggable.offset.click.top;
					sortable.offset.click.left = draggable.offset.click.left;
					sortable.offset.parent.left -= draggable.offset.parent.left - sortable.offset.parent.left;
					sortable.offset.parent.top -= draggable.offset.parent.top - sortable.offset.parent.top;

					draggable._trigger("toSortable", event);

					// Inform draggable that the helper is in a valid drop zone,
					// used solely in the revert option to handle "valid/invalid".
					draggable.dropped = sortable.element;

					// Need to refreshPositions of all sortables in the case that
					// adding to one sortable changes the location of the other sortables (#9675)
					$.each(draggable.sortables, function () {
						this.refreshPositions();
					});

					// Hack so receive/update callbacks work (mostly)
					draggable.currentItem = draggable.element;
					sortable.fromOutside = draggable;
				}

				if (sortable.currentItem) {
					sortable._mouseDrag(event);

					// Copy the sortable's position because the draggable's can potentially reflect
					// a relative position, while sortable is always absolute, which the dragged
					// element has now become. (#8809)
					ui$$1.position = sortable.position;
				}
			} else {

				// If it doesn't intersect with the sortable, and it intersected before,
				// we fake the drag stop of the sortable, but make sure it doesn't remove
				// the helper by using cancelHelperRemoval.
				if (sortable.isOver) {

					sortable.isOver = 0;
					sortable.cancelHelperRemoval = true;

					// Calling sortable's mouseStop would trigger a revert,
					// so revert must be temporarily false until after mouseStop is called.
					sortable.options._revert = sortable.options.revert;
					sortable.options.revert = false;

					sortable._trigger("out", event, sortable._uiHash(sortable));
					sortable._mouseStop(event, true);

					// Restore sortable behaviors that were modfied
					// when the draggable entered the sortable area (#9481)
					sortable.options.revert = sortable.options._revert;
					sortable.options.helper = sortable.options._helper;

					if (sortable.placeholder) {
						sortable.placeholder.remove();
					}

					// Restore and recalculate the draggable's offset considering the sortable
					// may have modified them in unexpected ways. (#8809, #10669)
					ui$$1.helper.appendTo(draggable._parent);
					draggable._refreshOffsets(event);
					ui$$1.position = draggable._generatePosition(event, true);

					draggable._trigger("fromSortable", event);

					// Inform draggable that the helper is no longer in a valid drop zone
					draggable.dropped = false;

					// Need to refreshPositions of all sortables just in case removing
					// from one sortable changes the location of other sortables (#9675)
					$.each(draggable.sortables, function () {
						this.refreshPositions();
					});
				}
			}
		});
	}
});

plugin.add("draggable", "cursor", {
	start: function start(event, ui$$1, instance) {
		var t = $("body"),
		    o = instance.options;

		if (t.css("cursor")) {
			o._cursor = t.css("cursor");
		}
		t.css("cursor", o.cursor);
	},
	stop: function stop(event, ui$$1, instance) {
		var o = instance.options;
		if (o._cursor) {
			$("body").css("cursor", o._cursor);
		}
	}
});

plugin.add("draggable", "opacity", {
	start: function start(event, ui$$1, instance) {
		var t = $(ui$$1.helper),
		    o = instance.options;
		if (t.css("opacity")) {
			o._opacity = t.css("opacity");
		}
		t.css("opacity", o.opacity);
	},
	stop: function stop(event, ui$$1, instance) {
		var o = instance.options;
		if (o._opacity) {
			$(ui$$1.helper).css("opacity", o._opacity);
		}
	}
});

plugin.add("draggable", "scroll", {
	start: function start(event, ui$$1, i) {
		if (!i.scrollParentNotHidden) {
			i.scrollParentNotHidden = i.helper.scrollParent(false);
		}

		if (i.scrollParentNotHidden[0] !== i.document[0] && i.scrollParentNotHidden[0].tagName !== "HTML") {
			i.overflowOffset = i.scrollParentNotHidden.offset();
		}
	},
	drag: function drag(event, ui$$1, i) {

		var o = i.options,
		    scrolled = false,
		    scrollParent = i.scrollParentNotHidden[0],
		    document = i.document[0];

		if (scrollParent !== document && scrollParent.tagName !== "HTML") {
			if (!o.axis || o.axis !== "x") {
				if (i.overflowOffset.top + scrollParent.offsetHeight - event.pageY < o.scrollSensitivity) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
				} else if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
				}
			}

			if (!o.axis || o.axis !== "y") {
				if (i.overflowOffset.left + scrollParent.offsetWidth - event.pageX < o.scrollSensitivity) {
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

plugin.add("draggable", "snap", {
	start: function start(event, ui$$1, i) {

		var o = i.options;

		i.snapElements = [];

		$(o.snap.constructor !== String ? o.snap.items || ":data(ui-draggable)" : o.snap).each(function () {
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
	drag: function drag(event, ui$$1, inst) {

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
		    x1 = ui$$1.offset.left,
		    x2 = x1 + inst.helperProportions.width,
		    y1 = ui$$1.offset.top,
		    y2 = y1 + inst.helperProportions.height;

		for (i = inst.snapElements.length - 1; i >= 0; i--) {

			l = inst.snapElements[i].left - inst.margins.left;
			r = l + inst.snapElements[i].width;
			t = inst.snapElements[i].top - inst.margins.top;
			b = t + inst.snapElements[i].height;

			if (x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item)) {
				if (inst.snapElements[i].snapping) {
					inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
						snapItem: inst.snapElements[i].item
					}));
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
					ui$$1.position.top = inst._convertPositionTo("relative", {
						top: t - inst.helperProportions.height,
						left: 0
					}).top;
				}
				if (bs) {
					ui$$1.position.top = inst._convertPositionTo("relative", {
						top: b,
						left: 0
					}).top;
				}
				if (ls) {
					ui$$1.position.left = inst._convertPositionTo("relative", {
						top: 0,
						left: l - inst.helperProportions.width
					}).left;
				}
				if (rs) {
					ui$$1.position.left = inst._convertPositionTo("relative", {
						top: 0,
						left: r
					}).left;
				}
			}

			first = ts || bs || ls || rs;

			if (o.snapMode !== "outer") {
				ts = Math.abs(t - y1) <= d;
				bs = Math.abs(b - y2) <= d;
				ls = Math.abs(l - x1) <= d;
				rs = Math.abs(r - x2) <= d;
				if (ts) {
					ui$$1.position.top = inst._convertPositionTo("relative", {
						top: t,
						left: 0
					}).top;
				}
				if (bs) {
					ui$$1.position.top = inst._convertPositionTo("relative", {
						top: b - inst.helperProportions.height,
						left: 0
					}).top;
				}
				if (ls) {
					ui$$1.position.left = inst._convertPositionTo("relative", {
						top: 0,
						left: l
					}).left;
				}
				if (rs) {
					ui$$1.position.left = inst._convertPositionTo("relative", {
						top: 0,
						left: r - inst.helperProportions.width
					}).left;
				}
			}

			if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
				inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
					snapItem: inst.snapElements[i].item
				}));
			}
			inst.snapElements[i].snapping = ts || bs || ls || rs || first;
		}
	}
});

plugin.add("draggable", "stack", {
	start: function start(event, ui$$1, instance) {
		var min,
		    o = instance.options,
		    group = $.makeArray($(o.stack)).sort(function (a, b) {
			return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
		});

		if (!group.length) {
			return;
		}

		min = parseInt($(group[0]).css("zIndex"), 10) || 0;
		$(group).each(function (i) {
			$(this).css("zIndex", min + i);
		});
		this.css("zIndex", min + group.length);
	}
});

plugin.add("draggable", "zIndex", {
	start: function start(event, ui$$1, instance) {
		var t = $(ui$$1.helper),
		    o = instance.options;

		if (t.css("zIndex")) {
			o._zIndex = t.css("zIndex");
		}
		t.css("zIndex", o.zIndex);
	},
	stop: function stop(event, ui$$1, instance) {
		var o = instance.options;

		if (o._zIndex) {
			$(ui$$1.helper).css("zIndex", o._zIndex);
		}
	}
});

/*!
 * jQuery UI Keycode 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Keycode
//>>group: Core
//>>description: Provide keycodes as keynames
//>>docs: http://api.jqueryui.com/jQuery.ui.keyCode/

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

// jscs:disable maximumLineLength
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
/*!
 * jQuery UI Datepicker 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Datepicker
//>>group: Widgets
//>>description: Displays a calendar from an input or inline for selecting dates.
//>>docs: http://api.jqueryui.com/datepicker/
//>>demos: http://jqueryui.com/datepicker/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/datepicker.css
//>>css.theme: ../../themes/base/theme.css

$.extend($.ui, {
	datepicker: {
		version: "1.12.1"
	}
});

var datepicker_instActive;

function datepicker_getZindex(elem) {
	var position, value;
	while (elem.length && elem[0] !== document) {

		// Ignore z-index if position is set to a value where z-index is ignored by the browser
		// This makes behavior of this function consistent across browsers
		// WebKit always returns auto if the element is positioned
		position = elem.css("position");
		if (position === "absolute" || position === "relative" || position === "fixed") {

			// IE returns 0 when zIndex is not specified
			// other browsers return a string
			// we ignore the case of nested elements with an explicit value of 0
			// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
			value = parseInt(elem.css("zIndex"), 10);
			if (!isNaN(value) && value !== 0) {
				return value;
			}
		}
		elem = elem.parent();
	}

	return 0;
}
/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker division
	this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker class
	this._appendClass = "ui-datepicker-append"; // The name of the append marker class
	this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker class
	this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker class
	this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker class
	this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker class
	this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker class
	this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[""] = { // Default regional settings
		closeText: "Done", // Display text for close link
		prevText: "Prev", // Display text for previous month link
		nextText: "Next", // Display text for next month link
		currentText: "Today", // Display text for current month link
		monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], // Names of months for drop-down and formatting
		monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
		dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
		dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
		dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], // Column headings for days starting at Sunday
		weekHeader: "Wk", // Column header for week of the year
		dateFormat: "mm/dd/yy", // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false, // True if right-to-left language, false if left-to-right
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearSuffix: "" // Additional text to append to the year in the month headers
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: "focus", // "focus" for popup on focus,
		// "button" for trigger button, or "both" for either
		showAnim: "fadeIn", // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
		// +/-number for offset from today, null for today
		appendText: "", // Display text following the input box, e.g. showing the format
		buttonText: "...", // Text for trigger button
		buttonImage: "", // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
		// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		yearRange: "c-10:c+10", // Range of years to display in drop-down,
		// either relative to today's year (-nn:+nn), relative to currently displayed year
		// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		showWeek: false, // True to show week of the year, false to not show it
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
		// takes a Date and returns the number of the week for it
		shortYearCutoff: "+10", // Short year values < this are in the current century,
		// > this are in the previous century,
		// string value starting with "+" for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: "fast", // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
		// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
		// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
		// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: "", // Selector for an alternate field to store selected dates into
		altFormat: "", // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		autoSize: false, // True to size the input for the date format, false to leave as is
		disabled: false // The initial disabled state
	};
	$.extend(this._defaults, this.regional[""]);
	this.regional.en = $.extend(true, {}, this.regional[""]);
	this.regional["en-US"] = $.extend(true, {}, this.regional.en);
	this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: "hasDatepicker",

	//Keep track of the maximum number of rows displayed (see #7043)
	maxRows: 4,

	// TODO rename to "widget" when switching to widget factory
	_widgetDatepicker: function _widgetDatepicker() {
		return this.dpDiv;
	},

	/* Override the default settings for all instances of the date picker.
  * @param  settings  object - the new settings to use as defaults (anonymous object)
  * @return the manager object
  */
	setDefaults: function setDefaults(settings) {
		datepicker_extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
  * @param  target	element - the target input field or division or span
  * @param  settings  object - the new settings to use for this date picker instance (anonymous)
  */
	_attachDatepicker: function _attachDatepicker(target, settings) {
		var nodeName, inline, inst;
		nodeName = target.nodeName.toLowerCase();
		inline = nodeName === "div" || nodeName === "span";
		if (!target.id) {
			this.uuid += 1;
			target.id = "dp" + this.uuid;
		}
		inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {});
		if (nodeName === "input") {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function _newInst(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta chars
		return {
			id: id,
			input: target, // associated target
			selectedDay: 0,
			selectedMonth: 0,
			selectedYear: 0, // current selection
			drawMonth: 0,
			drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: !inline ? this.dpDiv : // presentation div
			datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
		};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function _connectDatepicker(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName)) {
			return;
		}
		this._attachments(input, inst);
		input.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp);
		this._autoSize(inst);
		$.data(target, "datepicker", inst);

		//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
		if (inst.settings.disabled) {
			this._disableDatepicker(target);
		}
	},

	/* Make attachments based on settings. */
	_attachments: function _attachments(input, inst) {
		var showOn,
		    buttonText,
		    buttonImage,
		    appendText = this._get(inst, "appendText"),
		    isRTL = this._get(inst, "isRTL");

		if (inst.append) {
			inst.append.remove();
		}
		if (appendText) {
			inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
			input[isRTL ? "before" : "after"](inst.append);
		}

		input.off("focus", this._showDatepicker);

		if (inst.trigger) {
			inst.trigger.remove();
		}

		showOn = this._get(inst, "showOn");
		if (showOn === "focus" || showOn === "both") {
			// pop-up date picker when in the marked field
			input.on("focus", this._showDatepicker);
		}
		if (showOn === "button" || showOn === "both") {
			// pop-up date picker when button clicked
			buttonText = this._get(inst, "buttonText");
			buttonImage = this._get(inst, "buttonImage");
			inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
				src: buttonImage,
				alt: buttonText,
				title: buttonText
			}) : $("<button type='button'></button>").addClass(this._triggerClass).html(!buttonImage ? buttonText : $("<img/>").attr({
				src: buttonImage,
				alt: buttonText,
				title: buttonText
			})));
			input[isRTL ? "before" : "after"](inst.trigger);
			inst.trigger.on("click", function () {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
					$.datepicker._hideDatepicker();
				} else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
					$.datepicker._hideDatepicker();
					$.datepicker._showDatepicker(input[0]);
				} else {
					$.datepicker._showDatepicker(input[0]);
				}
				return false;
			});
		}
	},

	/* Apply the maximum length for the date format. */
	_autoSize: function _autoSize(inst) {
		if (this._get(inst, "autoSize") && !inst.inline) {
			var findMax,
			    max,
			    maxI,
			    i,
			    date = new Date(2009, 12 - 1, 20),
			    // Ensure double digits
			dateFormat = this._get(inst, "dateFormat");

			if (dateFormat.match(/[DM]/)) {
				findMax = function findMax(names) {
					max = 0;
					maxI = 0;
					for (i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort")));
				date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay());
			}
			inst.input.attr("size", this._formatDate(inst, date).length);
		}
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function _inlineDatepicker(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName)) {
			return;
		}
		divSpan.addClass(this.markerClassName).append(inst.dpDiv);
		$.data(target, "datepicker", inst);
		this._setDate(inst, this._getDefaultDate(inst), true);
		this._updateDatepicker(inst);
		this._updateAlternate(inst);

		//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
		if (inst.settings.disabled) {
			this._disableDatepicker(target);
		}

		// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
		// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
		inst.dpDiv.css("display", "block");
	},

	/* Pop-up the date picker in a "dialog" box.
  * @param  input element - ignored
  * @param  date	string or Date - the initial date to display
  * @param  onSelect  function - the function to call when a date is selected
  * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
  * @param  pos int[2] - coordinates for the dialog's position within the screen or
  *					event - with x/y coordinates or
  *					leave empty for default (screen centre)
  * @return the manager object
  */
	_dialogDatepicker: function _dialogDatepicker(input, date, onSelect, settings, pos) {
		var id,
		    browserWidth,
		    browserHeight,
		    scrollX,
		    scrollY,
		    inst = this._dialogInst; // internal instance

		if (!inst) {
			this.uuid += 1;
			id = "dp" + this.uuid;
			this._dialogInput = $("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>");
			this._dialogInput.on("keydown", this._doKeyDown);
			$("body").append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], "datepicker", inst);
		}
		datepicker_extendRemove(inst.settings, settings || {});
		date = date && date.constructor === Date ? this._formatDate(inst, date) : date;
		this._dialogInput.val(date);

		this._pos = pos ? pos.length ? pos : [pos.pageX, pos.pageY] : null;
		if (!this._pos) {
			browserWidth = document.documentElement.clientWidth;
			browserHeight = document.documentElement.clientHeight;
			scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
			[browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY];
		}

		// Move input on screen for focus, but hidden behind dialog
		this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI) {
			$.blockUI(this.dpDiv);
		}
		$.data(this._dialogInput[0], "datepicker", inst);
		return this;
	},

	/* Detach a datepicker from its control.
  * @param  target	element - the target input field or division or span
  */
	_destroyDatepicker: function _destroyDatepicker(target) {
		var nodeName,
		    $target = $(target),
		    inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		$.removeData(target, "datepicker");
		if (nodeName === "input") {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp);
		} else if (nodeName === "div" || nodeName === "span") {
			$target.removeClass(this.markerClassName).empty();
		}

		if (datepicker_instActive === inst) {
			datepicker_instActive = null;
		}
	},

	/* Enable the date picker to a jQuery selection.
  * @param  target	element - the target input field or division or span
  */
	_enableDatepicker: function _enableDatepicker(target) {
		var nodeName,
		    inline,
		    $target = $(target),
		    inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = false;
			inst.trigger.filter("button").each(function () {
				this.disabled = false;
			}).end().filter("img").css({
				opacity: "1.0",
				cursor: ""
			});
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().removeClass("ui-state-disabled");
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false);
		}
		this._disabledInputs = $.map(this._disabledInputs, function (value) {
			return value === target ? null : value;
		}); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
  * @param  target	element - the target input field or division or span
  */
	_disableDatepicker: function _disableDatepicker(target) {
		var nodeName,
		    inline,
		    $target = $(target),
		    inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = true;
			inst.trigger.filter("button").each(function () {
				this.disabled = true;
			}).end().filter("img").css({
				opacity: "0.5",
				cursor: "default"
			});
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().addClass("ui-state-disabled");
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true);
		}
		this._disabledInputs = $.map(this._disabledInputs, function (value) {
			return value === target ? null : value;
		}); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
  * @param  target	element - the target input field or division or span
  * @return boolean - true if disabled, false if enabled
  */
	_isDisabledDatepicker: function _isDisabledDatepicker(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] === target) {
				return true;
			}
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
  * @param  target  element - the target input field or division or span
  * @return  object - the associated instance data
  * @throws  error if a jQuery problem getting data
  */
	_getInst: function _getInst(target) {
		try {
			return $.data(target, "datepicker");
		} catch (err) {
			throw "Missing instance data for this datepicker";
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
  * @param  target  element - the target input field or division or span
  * @param  name	object - the new settings to update or
  *				string - the name of the setting to change or retrieve,
  *				when retrieving also "all" for all instance settings or
  *				"defaults" for all global defaults
  * @param  value   any - the new value for the setting
  *				(omit if above is an object or to retrieve a value)
  */
	_optionDatepicker: function _optionDatepicker(target, name, value) {
		var settings,
		    date,
		    minDate,
		    maxDate,
		    inst = this._getInst(target);

		if (arguments.length === 2 && typeof name === "string") {
			return name === "defaults" ? $.extend({}, $.datepicker._defaults) : inst ? name === "all" ? $.extend({}, inst.settings) : this._get(inst, name) : null;
		}

		settings = name || {};
		if (typeof name === "string") {
			settings = {};
			settings[name] = value;
		}

		if (inst) {
			if (this._curInst === inst) {
				this._hideDatepicker();
			}

			date = this._getDateDatepicker(target, true);
			minDate = this._getMinMaxDate(inst, "min");
			maxDate = this._getMinMaxDate(inst, "max");
			datepicker_extendRemove(inst.settings, settings);

			// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
			if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
				inst.settings.minDate = this._formatDate(inst, minDate);
			}
			if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
				inst.settings.maxDate = this._formatDate(inst, maxDate);
			}
			if ("disabled" in settings) {
				if (settings.disabled) {
					this._disableDatepicker(target);
				} else {
					this._enableDatepicker(target);
				}
			}
			this._attachments($(target), inst);
			this._autoSize(inst);
			this._setDate(inst, date);
			this._updateAlternate(inst);
			this._updateDatepicker(inst);
		}
	},

	// Change method deprecated
	_changeDatepicker: function _changeDatepicker(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
  * @param  target  element - the target input field or division or span
  */
	_refreshDatepicker: function _refreshDatepicker(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
  * @param  target element - the target input field or division or span
  * @param  date	Date - the new date
  */
	_setDateDatepicker: function _setDateDatepicker(target, date) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
  * @param  target element - the target input field or division or span
  * @param  noDefault boolean - true if no default date is to be used
  * @return Date - the current date
  */
	_getDateDatepicker: function _getDateDatepicker(target, noDefault) {
		var inst = this._getInst(target);
		if (inst && !inst.inline) {
			this._setDateFromField(inst, noDefault);
		}
		return inst ? this._getDate(inst) : null;
	},

	/* Handle keystrokes. */
	_doKeyDown: function _doKeyDown(event) {
		var onSelect,
		    dateStr,
		    sel,
		    inst = $.datepicker._getInst(event.target),
		    handled = true,
		    isRTL = inst.dpDiv.is(".ui-datepicker-rtl");

		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing) {
			switch (event.keyCode) {
				case 9:
					$.datepicker._hideDatepicker();
					handled = false;
					break; // hide on tab out
				case 13:
					sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
					if (sel[0]) {
						$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
					}

					onSelect = $.datepicker._get(inst, "onSelect");
					if (onSelect) {
						dateStr = $.datepicker._formatDate(inst);

						// Trigger custom callback
						onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]);
					} else {
						$.datepicker._hideDatepicker();
					}

					return false; // don't submit the form
				case 27:
					$.datepicker._hideDatepicker();
					break; // hide on escape
				case 33:
					$.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
					break; // previous month/year on page up/+ ctrl
				case 34:
					$.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
					break; // next month/year on page down/+ ctrl
				case 35:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._clearDate(event.target);
					}
					handled = event.ctrlKey || event.metaKey;
					break; // clear on ctrl or command +end
				case 36:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._gotoToday(event.target);
					}
					handled = event.ctrlKey || event.metaKey;
					break; // current on ctrl or command +home
				case 37:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._adjustDate(event.target, isRTL ? +1 : -1, "D");
					}
					handled = event.ctrlKey || event.metaKey;

					// -1 day on ctrl or command +left
					if (event.originalEvent.altKey) {
						$.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
					}

					// next month/year on alt +left on Mac
					break;
				case 38:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._adjustDate(event.target, -7, "D");
					}
					handled = event.ctrlKey || event.metaKey;
					break; // -1 week on ctrl or command +up
				case 39:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._adjustDate(event.target, isRTL ? -1 : +1, "D");
					}
					handled = event.ctrlKey || event.metaKey;

					// +1 day on ctrl or command +right
					if (event.originalEvent.altKey) {
						$.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
					}

					// next month/year on alt +right
					break;
				case 40:
					if (event.ctrlKey || event.metaKey) {
						$.datepicker._adjustDate(event.target, +7, "D");
					}
					handled = event.ctrlKey || event.metaKey;
					break; // +1 week on ctrl or command +down
				default:
					handled = false;
			}
		} else if (event.keyCode === 36 && event.ctrlKey) {
			// display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		} else {
			handled = false;
		}

		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function _doKeyPress(event) {
		var chars,
		    chr,
		    inst = $.datepicker._getInst(event.target);

		if ($.datepicker._get(inst, "constrainInput")) {
			chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
			chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
			return event.ctrlKey || event.metaKey || chr < " " || !chars || chars.indexOf(chr) > -1;
		}
	},

	/* Synchronise manual entry and field/alternate field. */
	_doKeyUp: function _doKeyUp(event) {
		var date,
		    inst = $.datepicker._getInst(event.target);

		if (inst.input.val() !== inst.lastVal) {
			try {
				date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst));

				if (date) {
					// only if valid
					$.datepicker._setDateFromField(inst);
					$.datepicker._updateAlternate(inst);
					$.datepicker._updateDatepicker(inst);
				}
			} catch (err) {}
		}
		return true;
	},

	/* Pop-up the date picker for a given input field.
  * If false returned from beforeShow event handler do not show.
  * @param  input  element - the input field attached to the date picker or
  *					event - if triggered by focus
  */
	_showDatepicker: function _showDatepicker(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() !== "input") {
			// find from button/image trigger
			input = $("input", input.parentNode)[0];
		}

		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) {
			// already here
			return;
		}

		var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;

		inst = $.datepicker._getInst(input);
		if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
			$.datepicker._curInst.dpDiv.stop(true, true);
			if (inst && $.datepicker._datepickerShowing) {
				$.datepicker._hideDatepicker($.datepicker._curInst.input[0]);
			}
		}

		beforeShow = $.datepicker._get(inst, "beforeShow");
		beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
		if (beforeShowSettings === false) {
			return;
		}
		datepicker_extendRemove(inst.settings, beforeShowSettings);

		inst.lastVal = null;
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);

		if ($.datepicker._inDialog) {
			// hide cursor
			input.value = "";
		}
		if (!$.datepicker._pos) {
			// position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}

		isFixed = false;
		$(input).parents().each(function () {
			isFixed |= $(this).css("position") === "fixed";
			return !isFixed;
		});

		offset = {
			left: $.datepicker._pos[0],
			top: $.datepicker._pos[1]
		};
		$.datepicker._pos = null;

		//to avoid flashes on Firefox
		inst.dpDiv.empty();

		// determine sizing offscreen
		inst.dpDiv.css({
			position: "absolute",
			display: "block",
			top: "-1000px"
		});
		$.datepicker._updateDatepicker(inst);

		// fix width for dynamic number of date pickers
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({
			position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute",
			display: "none",
			left: offset.left + "px",
			top: offset.top + "px"
		});

		if (!inst.inline) {
			showAnim = $.datepicker._get(inst, "showAnim");
			duration = $.datepicker._get(inst, "duration");
			inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1);
			$.datepicker._datepickerShowing = true;

			if ($.effects && $.effects.effect[showAnim]) {
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
			} else {
				inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
			}

			if ($.datepicker._shouldFocusInput(inst)) {
				inst.input.trigger("focus");
			}

			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function _updateDatepicker(inst) {
		this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
		datepicker_instActive = inst; // for delegate hover events
		inst.dpDiv.empty().append(this._generateHTML(inst));
		this._attachHandlers(inst);

		var origyearshtml,
		    numMonths = this._getNumberOfMonths(inst),
		    cols = numMonths[1],
		    width = 17,
		    activeCell = inst.dpDiv.find("." + this._dayOverClass + " a");

		if (activeCell.length > 0) {
			datepicker_handleMouseover.apply(activeCell.get(0));
		}

		inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
		if (cols > 1) {
			inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em");
		}
		inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
		inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");

		if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst)) {
			inst.input.trigger("focus");
		}

		// Deffered render of the years select (to avoid flashes on Firefox)
		if (inst.yearshtml) {
			origyearshtml = inst.yearshtml;
			setTimeout(function () {

				//assure that inst.yearshtml didn't change.
				if (origyearshtml === inst.yearshtml && inst.yearshtml) {
					inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);
				}
				origyearshtml = inst.yearshtml = null;
			}, 0);
		}
	},

	// #6694 - don't focus the input if it's already focused
	// this breaks the change event in IE
	// Support: IE and jQuery <1.9
	_shouldFocusInput: function _shouldFocusInput(inst) {
		return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus");
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function _checkOffset(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth(),
		    dpHeight = inst.dpDiv.outerHeight(),
		    inputWidth = inst.input ? inst.input.outerWidth() : 0,
		    inputHeight = inst.input ? inst.input.outerHeight() : 0,
		    viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
		    viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());

		offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0;
		offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0;
		offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0;

		// Now check if datepicker is showing outside window viewport - move to a better place if so.
		offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
		offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0);

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function _findPos(obj) {
		var position,
		    inst = this._getInst(obj),
		    isRTL = this._get(inst, "isRTL");

		while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
			obj = obj[isRTL ? "previousSibling" : "nextSibling"];
		}

		position = $(obj).offset();
		return [position.left, position.top];
	},

	/* Hide the date picker from view.
  * @param  input  element - the input field attached to the date picker
  */
	_hideDatepicker: function _hideDatepicker(input) {
		var showAnim,
		    duration,
		    postProcess,
		    onClose,
		    inst = this._curInst;

		if (!inst || input && inst !== $.data(input, "datepicker")) {
			return;
		}

		if (this._datepickerShowing) {
			showAnim = this._get(inst, "showAnim");
			duration = this._get(inst, "duration");
			postProcess = function postProcess() {
				$.datepicker._tidyDialog(inst);
			};

			// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
			if ($.effects && ($.effects.effect[showAnim] || $.effects[showAnim])) {
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
			} else {
				inst.dpDiv[showAnim === "slideDown" ? "slideUp" : showAnim === "fadeIn" ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess);
			}

			if (!showAnim) {
				postProcess();
			}
			this._datepickerShowing = false;

			onClose = this._get(inst, "onClose");
			if (onClose) {
				onClose.apply(inst.input ? inst.input[0] : null, [inst.input ? inst.input.val() : "", inst]);
			}

			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({
					position: "absolute",
					left: "0",
					top: "-100px"
				});
				if ($.blockUI) {
					$.unblockUI();
					$("body").append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function _tidyDialog(inst) {
		inst.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function _checkExternalClick(event) {
		if (!$.datepicker._curInst) {
			return;
		}

		var $target = $(event.target),
		    inst = $.datepicker._getInst($target[0]);

		if ($target[0].id !== $.datepicker._mainDivId && $target.parents("#" + $.datepicker._mainDivId).length === 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) || $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst) {
			$.datepicker._hideDatepicker();
		}
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function _adjustDate(id, offset, period) {
		var target = $(id),
		    inst = this._getInst(target[0]);

		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset + (period === "M" ? this._get(inst, "showCurrentAtPos") : 0), // undo positioning
		period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function _gotoToday(id) {
		var date,
		    target = $(id),
		    inst = this._getInst(target[0]);

		if (this._get(inst, "gotoCurrent") && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		} else {
			date = new Date();
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function _selectMonthYear(id, select, period) {
		var target = $(id),
		    inst = this._getInst(target[0]);

		inst["selected" + (period === "M" ? "Month" : "Year")] = inst["draw" + (period === "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);

		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a day. */
	_selectDay: function _selectDay(id, month, year, td) {
		var inst,
		    target = $(id);

		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}

		inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $("a", td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function _clearDate(id) {
		var target = $(id);
		this._selectDate(target, "");
	},

	/* Update the input field with the selected date. */
	_selectDate: function _selectDate(id, dateStr) {
		var onSelect,
		    target = $(id),
		    inst = this._getInst(target[0]);

		dateStr = dateStr != null ? dateStr : this._formatDate(inst);
		if (inst.input) {
			inst.input.val(dateStr);
		}
		this._updateAlternate(inst);

		onSelect = this._get(inst, "onSelect");
		if (onSelect) {
			onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]); // trigger custom callback
		} else if (inst.input) {
				inst.input.trigger("change"); // fire the change event
			}

		if (inst.inline) {
			this._updateDatepicker(inst);
		} else {
			this._hideDatepicker();
			this._lastInput = inst.input[0];
			if (typeof inst.input[0] !== "object") {
				inst.input.trigger("focus"); // restore focus
			}
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function _updateAlternate(inst) {
		var altFormat,
		    date,
		    dateStr,
		    altField = this._get(inst, "altField");

		if (altField) {
			// update alternate field too
			altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
			date = this._getDate(inst);
			dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).val(dateStr);
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
  * @param  date  Date - the date to customise
  * @return [boolean, string] - is this date selectable?, what is its CSS class?
  */
	noWeekends: function noWeekends(date) {
		var day = date.getDay();
		return [day > 0 && day < 6, ""];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
  * @param  date  Date - the date to get the week for
  * @return  number - the number of the week within the year that contains this date
  */
	iso8601Week: function iso8601Week(date) {
		var time,
		    checkDate = new Date(date.getTime());

		// Find Thursday of this week starting on Monday
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

		time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},

	/* Parse a string value into a date object.
  * See formatDate below for the possible formats.
  *
  * @param  format string - the expected format of the date
  * @param  value string - the date in the above format
  * @param  settings Object - attributes include:
  *					shortYearCutoff  number - the cutoff year for determining the century (optional)
  *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
  *					dayNames		string[7] - names of the days from Sunday (optional)
  *					monthNamesShort string[12] - abbreviated names of the months (optional)
  *					monthNames		string[12] - names of the months (optional)
  * @return  Date - the extracted date value or null if value is blank
  */
	parseDate: function parseDate(format, value, settings) {
		if (format == null || value == null) {
			throw "Invalid arguments";
		}

		value = typeof value === "object" ? value.toString() : value + "";
		if (value === "") {
			return null;
		}

		var iFormat,
		    dim,
		    extra,
		    iValue = 0,
		    shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
		    shortYearCutoff = typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp : new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10),
		    dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
		    dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
		    monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
		    monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
		    year = -1,
		    month = -1,
		    day = -1,
		    doy = -1,
		    literal = false,
		    date,


		// Check whether a format character is doubled
		lookAhead = function lookAhead(match) {
			var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
			if (matches) {
				iFormat++;
			}
			return matches;
		},


		// Extract a number from the string value
		getNumber = function getNumber(match) {
			var isDoubled = lookAhead(match),
			    size = match === "@" ? 14 : match === "!" ? 20 : match === "y" && isDoubled ? 4 : match === "o" ? 3 : 2,
			    minSize = match === "y" ? size : 1,
			    digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
			    num = value.substring(iValue).match(digits);
			if (!num) {
				throw "Missing number at position " + iValue;
			}
			iValue += num[0].length;
			return parseInt(num[0], 10);
		},


		// Extract a name from the string value and convert to an index
		getName = function getName(match, shortNames, longNames) {
			var index = -1,
			    names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
				return [[k, v]];
			}).sort(function (a, b) {
				return -(a[1].length - b[1].length);
			});

			$.each(names, function (i, pair) {
				var name = pair[1];
				if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
					index = pair[0];
					iValue += name.length;
					return false;
				}
			});
			if (index !== -1) {
				return index + 1;
			} else {
				throw "Unknown name at position " + iValue;
			}
		},


		// Confirm that a literal character matches the string value
		checkLiteral = function checkLiteral() {
			if (value.charAt(iValue) !== format.charAt(iFormat)) {
				throw "Unexpected literal at position " + iValue;
			}
			iValue++;
		};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					checkLiteral();
				}
			} else {
				switch (format.charAt(iFormat)) {
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
						date = new Date(getNumber("@"));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "!":
						date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'")) {
							checkLiteral();
						} else {
							literal = true;
						}
						break;
					default:
						checkLiteral();
				}
			}
		}

		if (iValue < value.length) {
			extra = value.substr(iValue);
			if (!/^\s+/.test(extra)) {
				throw "Extra/unparsed characters found in date: " + extra;
			}
		}

		if (year === -1) {
			year = new Date().getFullYear();
		} else if (year < 100) {
			year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
		}

		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim) {
					break;
				}
				month++;
				day -= dim;
			} while (true);
		}

		date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
			throw "Invalid date"; // E.g. 31/02/00
		}
		return date;
	},

	/* Standard date formats. */
	ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
	COOKIE: "D, dd M yy",
	ISO_8601: "yy-mm-dd",
	RFC_822: "D, d M y",
	RFC_850: "DD, dd-M-y",
	RFC_1036: "D, d M y",
	RFC_1123: "D, d M yy",
	RFC_2822: "D, d M yy",
	RSS: "D, d M y", // RFC 822
	TICKS: "!",
	TIMESTAMP: "@",
	W3C: "yy-mm-dd", // ISO 8601

	_ticksTo1970: ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000,

	/* Format a date object into a string value.
  * The format can be combinations of the following:
  * d  - day of month (no leading zero)
  * dd - day of month (two digit)
  * o  - day of year (no leading zeros)
  * oo - day of year (three digit)
  * D  - day name short
  * DD - day name long
  * m  - month of year (no leading zero)
  * mm - month of year (two digit)
  * M  - month name short
  * MM - month name long
  * y  - year (two digit)
  * yy - year (four digit)
  * @ - Unix timestamp (ms since 01/01/1970)
  * ! - Windows ticks (100ns since 01/01/0001)
  * "..." - literal text
  * '' - single quote
  *
  * @param  format string - the desired format of the date
  * @param  date Date - the date value to format
  * @param  settings Object - attributes include:
  *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
  *					dayNames		string[7] - names of the days from Sunday (optional)
  *					monthNamesShort string[12] - abbreviated names of the months (optional)
  *					monthNames		string[12] - names of the months (optional)
  * @return  string - the date in the above format
  */
	formatDate: function formatDate(format, date, settings) {
		if (!date) {
			return "";
		}

		var iFormat,
		    dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
		    dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
		    monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
		    monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,


		// Check whether a format character is doubled
		lookAhead = function lookAhead(match) {
			var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
			if (matches) {
				iFormat++;
			}
			return matches;
		},


		// Format a number, with leading zero if necessary
		formatNumber = function formatNumber(match, value, len) {
			var num = "" + value;
			if (lookAhead(match)) {
				while (num.length < len) {
					num = "0" + num;
				}
			}
			return num;
		},


		// Format a name, short or long as requested
		formatName = function formatName(match, value, shortNames, longNames) {
			return lookAhead(match) ? longNames[value] : shortNames[value];
		},
		    output = "",
		    literal = false;

		if (date) {
			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						output += format.charAt(iFormat);
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d":
							output += formatNumber("d", date.getDate(), 2);
							break;
						case "D":
							output += formatName("D", date.getDay(), dayNamesShort, dayNames);
							break;
						case "o":
							output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
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
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'")) {
								output += "'";
							} else {
								literal = true;
							}
							break;
						default:
							output += format.charAt(iFormat);
					}
				}
			}
		}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function _possibleChars(format) {
		var iFormat,
		    chars = "",
		    literal = false,


		// Check whether a format character is doubled
		lookAhead = function lookAhead(match) {
			var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
			if (matches) {
				iFormat++;
			}
			return matches;
		};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					chars += format.charAt(iFormat);
				}
			} else {
				switch (format.charAt(iFormat)) {
					case "d":
					case "m":
					case "y":
					case "@":
						chars += "0123456789";
						break;
					case "D":
					case "M":
						return null; // Accept anything
					case "'":
						if (lookAhead("'")) {
							chars += "'";
						} else {
							literal = true;
						}
						break;
					default:
						chars += format.charAt(iFormat);
				}
			}
		}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function _get(inst, name) {
		return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function _setDateFromField(inst, noDefault) {
		if (inst.input.val() === inst.lastVal) {
			return;
		}

		var dateFormat = this._get(inst, "dateFormat"),
		    dates = inst.lastVal = inst.input ? inst.input.val() : null,
		    defaultDate = this._getDefaultDate(inst),
		    date = defaultDate,
		    settings = this._getFormatConfig(inst);

		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			dates = noDefault ? "" : dates;
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = dates ? date.getDate() : 0;
		inst.currentMonth = dates ? date.getMonth() : 0;
		inst.currentYear = dates ? date.getFullYear() : 0;
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function _getDefaultDate(inst) {
		return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function _determineDate(inst, date, defaultDate) {
		var offsetNumeric = function offsetNumeric(offset) {
			var date = new Date();
			date.setDate(date.getDate() + offset);
			return date;
		},
		    offsetString = function offsetString(offset) {
			try {
				return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst));
			} catch (e) {

				// Ignore
			}

			var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date(),
			    year = date.getFullYear(),
			    month = date.getMonth(),
			    day = date.getDate(),
			    pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
			    matches = pattern.exec(offset);

			while (matches) {
				switch (matches[2] || "d") {
					case "d":
					case "D":
						day += parseInt(matches[1], 10);
						break;
					case "w":
					case "W":
						day += parseInt(matches[1], 10) * 7;
						break;
					case "m":
					case "M":
						month += parseInt(matches[1], 10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
					case "y":
					case "Y":
						year += parseInt(matches[1], 10);
						day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day);
		},
		    newDate = date == null || date === "" ? defaultDate : typeof date === "string" ? offsetString(date) : typeof date === "number" ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());

		newDate = newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate;
		if (newDate) {
			newDate.setHours(0);
			newDate.setMinutes(0);
			newDate.setSeconds(0);
			newDate.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(newDate);
	},

	/* Handle switch to/from daylight saving.
  * Hours may be non-zero on daylight saving cut-over:
  * > 12 when midnight changeover, but then cannot generate
  * midnight datetime, so jump to 1AM, otherwise reset.
  * @param  date  (Date) the date to check
  * @return  (Date) the corrected date
  */
	_daylightSavingAdjust: function _daylightSavingAdjust(date) {
		if (!date) {
			return null;
		}
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function _setDate(inst, date, noChange) {
		var clear = !date,
		    origMonth = inst.selectedMonth,
		    origYear = inst.selectedYear,
		    newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));

		inst.selectedDay = inst.currentDay = newDate.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
		if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
			this._notifyChange(inst);
		}
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? "" : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function _getDate(inst) {
		var startDate = !inst.currentYear || inst.input && inst.input.val() === "" ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
		return startDate;
	},

	/* Attach the onxxx handlers.  These are declared statically so
  * they work with static code transformers like Caja.
  */
	_attachHandlers: function _attachHandlers(inst) {
		var stepMonths = this._get(inst, "stepMonths"),
		    id = "#" + inst.id.replace(/\\\\/g, "\\");
		inst.dpDiv.find("[data-handler]").map(function () {
			var handler = {
				prev: function prev() {
					$.datepicker._adjustDate(id, -stepMonths, "M");
				},
				next: function next() {
					$.datepicker._adjustDate(id, +stepMonths, "M");
				},
				hide: function hide() {
					$.datepicker._hideDatepicker();
				},
				today: function today() {
					$.datepicker._gotoToday(id);
				},
				selectDay: function selectDay() {
					$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
					return false;
				},
				selectMonth: function selectMonth() {
					$.datepicker._selectMonthYear(id, this, "M");
					return false;
				},
				selectYear: function selectYear() {
					$.datepicker._selectMonthYear(id, this, "Y");
					return false;
				}
			};
			$(this).on(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
		});
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function _generateHTML(inst) {
		var maxDraw,
		    prevText,
		    prev,
		    nextText,
		    next,
		    currentText,
		    gotoDate,
		    controls,
		    buttonPanel,
		    firstDay,
		    showWeek,
		    dayNames,
		    dayNamesMin,
		    monthNames,
		    monthNamesShort,
		    beforeShowDay,
		    showOtherMonths,
		    selectOtherMonths,
		    defaultDate,
		    html,
		    dow,
		    row,
		    group,
		    col,
		    selectedDate,
		    cornerClass,
		    calender,
		    thead,
		    day,
		    daysInMonth,
		    leadDays,
		    curRows,
		    numRows,
		    printDate,
		    dRow,
		    tbody,
		    daySettings,
		    otherMonth,
		    unselectable,
		    tempDate = new Date(),
		    today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())),
		    // clear time
		isRTL = this._get(inst, "isRTL"),
		    showButtonPanel = this._get(inst, "showButtonPanel"),
		    hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
		    navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
		    numMonths = this._getNumberOfMonths(inst),
		    showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
		    stepMonths = this._get(inst, "stepMonths"),
		    isMultiMonth = numMonths[0] !== 1 || numMonths[1] !== 1,
		    currentDate = this._daylightSavingAdjust(!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)),
		    minDate = this._getMinMaxDate(inst, "min"),
		    maxDate = this._getMinMaxDate(inst, "max"),
		    drawMonth = inst.drawMonth - showCurrentAtPos,
		    drawYear = inst.drawYear;

		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate()));
			maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw;
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;

		prevText = this._get(inst, "prevText");
		prevText = !navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst));

		prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" + " title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>";

		nextText = this._get(inst, "nextText");
		nextText = !navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst));

		next = this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" + " title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>";

		currentText = this._get(inst, "currentText");
		gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today;
		currentText = !navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst));

		controls = !inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>" : "";

		buttonPanel = showButtonPanel ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" + ">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";

		firstDay = parseInt(this._get(inst, "firstDay"), 10);
		firstDay = isNaN(firstDay) ? 0 : firstDay;

		showWeek = this._get(inst, "showWeek");
		dayNames = this._get(inst, "dayNames");
		dayNamesMin = this._get(inst, "dayNamesMin");
		monthNames = this._get(inst, "monthNames");
		monthNamesShort = this._get(inst, "monthNamesShort");
		beforeShowDay = this._get(inst, "beforeShowDay");
		showOtherMonths = this._get(inst, "showOtherMonths");
		selectOtherMonths = this._get(inst, "selectOtherMonths");
		defaultDate = this._getDefaultDate(inst);
		html = "";

		for (row = 0; row < numMonths[0]; row++) {
			group = "";
			this.maxRows = 4;
			for (col = 0; col < numMonths[1]; col++) {
				selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				cornerClass = " ui-corner-all";
				calender = "";
				if (isMultiMonth) {
					calender += "<div class='ui-datepicker-group";
					if (numMonths[1] > 1) {
						switch (col) {
							case 0:
								calender += " ui-datepicker-group-first";
								cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
								break;
							case numMonths[1] - 1:
								calender += " ui-datepicker-group-last";
								cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
								break;
							default:
								calender += " ui-datepicker-group-middle";
								cornerClass = "";
								break;
						}
					}
					calender += "'>";
				}
				calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && row === 0 ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && row === 0 ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
				"</div><table class='ui-datepicker-calendar'><thead>" + "<tr>";
				thead = showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "";
				for (dow = 0; dow < 7; dow++) {
					// days of the week
					day = (dow + firstDay) % 7;
					thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
				}
				calender += thead + "</tr></thead><tbody>";
				daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				}
				leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
				numRows = isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows; //If multiple months, use the higher number of rows (see #7043)
				this.maxRows = numRows;
				printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (dRow = 0; dRow < numRows; dRow++) {
					// create date picker rows
					calender += "<tr>";
					tbody = !showWeek ? "" : "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>";
					for (dow = 0; dow < 7; dow++) {
						// create date picker days
						daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [printDate]) : [true, ""];
						otherMonth = printDate.getMonth() !== drawMonth;
						unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && printDate > maxDate;
						tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + ( // highlight weekends
						otherMonth ? " ui-datepicker-other-month" : "") + ( // highlight days from other months
						printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || // user pressed key
						defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ?

						// or defaultDate is current printedDate and defaultDate is selectedDate
						" " + this._dayOverClass : "") + ( // highlight selected day
						unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + ( // highlight unselectable days
						otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + ( // highlight custom dates
						printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + ( // highlight selected day
						printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + ( // highlight today (if different)
						(!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + ( // cell title
						unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + ( // actions
						otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
						unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + ( // highlight selected day
						otherMonth ? " ui-priority-secondary" : "") + // distinguish dates from other months
						"' href='#'>" + printDate.getDate() + "</a>") + "</td>"; // display selectable date
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + "</tr>";
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col === numMonths[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
				group += calender;
			}
			html += group;
		}
		html += buttonPanel;
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function _generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {

		var inMinYear,
		    inMaxYear,
		    month,
		    years,
		    thisYear,
		    determineYear,
		    year,
		    endYear,
		    changeMonth = this._get(inst, "changeMonth"),
		    changeYear = this._get(inst, "changeYear"),
		    showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
		    html = "<div class='ui-datepicker-title'>",
		    monthHtml = "";

		// Month selection
		if (secondary || !changeMonth) {
			monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
		} else {
			inMinYear = minDate && minDate.getFullYear() === drawYear;
			inMaxYear = maxDate && maxDate.getFullYear() === drawYear;
			monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
			for (month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
					monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'" : "") + ">" + monthNamesShort[month] + "</option>";
				}
			}
			monthHtml += "</select>";
		}

		if (!showMonthAfterYear) {
			html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
		}

		// Year selection
		if (!inst.yearshtml) {
			inst.yearshtml = "";
			if (secondary || !changeYear) {
				html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
			} else {

				// determine range of years to display
				years = this._get(inst, "yearRange").split(":");
				thisYear = new Date().getFullYear();
				determineYear = function determineYear(value) {
					var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
					return isNaN(year) ? thisYear : year;
				};
				year = determineYear(years[0]);
				endYear = Math.max(year, determineYear(years[1] || ""));
				year = minDate ? Math.max(year, minDate.getFullYear()) : year;
				endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear;
				inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
				for (; year <= endYear; year++) {
					inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'" : "") + ">" + year + "</option>";
				}
				inst.yearshtml += "</select>";

				html += inst.yearshtml;
				inst.yearshtml = null;
			}
		}

		html += this._get(inst, "yearSuffix");
		if (showMonthAfterYear) {
			html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
		}
		html += "</div>"; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function _adjustInstDate(inst, offset, period) {
		var year = inst.selectedYear + (period === "Y" ? offset : 0),
		    month = inst.selectedMonth + (period === "M" ? offset : 0),
		    day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset : 0),
		    date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));

		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period === "M" || period === "Y") {
			this._notifyChange(inst);
		}
	},

	/* Ensure a date is within any min/max bounds. */
	_restrictMinMax: function _restrictMinMax(inst, date) {
		var minDate = this._getMinMaxDate(inst, "min"),
		    maxDate = this._getMinMaxDate(inst, "max"),
		    newDate = minDate && date < minDate ? minDate : date;
		return maxDate && newDate > maxDate ? maxDate : newDate;
	},

	/* Notify change of month/year. */
	_notifyChange: function _notifyChange(inst) {
		var onChange = this._get(inst, "onChangeMonthYear");
		if (onChange) {
			onChange.apply(inst.input ? inst.input[0] : null, [inst.selectedYear, inst.selectedMonth + 1, inst]);
		}
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function _getNumberOfMonths(inst) {
		var numMonths = this._get(inst, "numberOfMonths");
		return numMonths == null ? [1, 1] : typeof numMonths === "number" ? [1, numMonths] : numMonths;
	},

	/* Determine the current maximum date - ensure no time components are set. */
	_getMinMaxDate: function _getMinMaxDate(inst, minMax) {
		return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function _getDaysInMonth(year, month) {
		return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function _getFirstDayOfMonth(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function _canAdjustMonth(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst),
		    date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));

		if (offset < 0) {
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		}
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function _isInRange(inst, date) {
		var yearSplit,
		    currentYear,
		    minDate = this._getMinMaxDate(inst, "min"),
		    maxDate = this._getMinMaxDate(inst, "max"),
		    minYear = null,
		    maxYear = null,
		    years = this._get(inst, "yearRange");
		if (years) {
			yearSplit = years.split(":");
			currentYear = new Date().getFullYear();
			minYear = parseInt(yearSplit[0], 10);
			maxYear = parseInt(yearSplit[1], 10);
			if (yearSplit[0].match(/[+\-].*/)) {
				minYear += currentYear;
			}
			if (yearSplit[1].match(/[+\-].*/)) {
				maxYear += currentYear;
			}
		}

		return (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear);
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function _getFormatConfig(inst) {
		var shortYearCutoff = this._get(inst, "shortYearCutoff");
		shortYearCutoff = typeof shortYearCutoff !== "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10);
		return {
			shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, "dayNamesShort"),
			dayNames: this._get(inst, "dayNames"),
			monthNamesShort: this._get(inst, "monthNamesShort"),
			monthNames: this._get(inst, "monthNames")
		};
	},

	/* Format the given date for display. */
	_formatDate: function _formatDate(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = day ? typeof day === "object" ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
		return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
	}
});

/*
 * Bind hover events for datepicker elements.
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
 * Global datepicker_instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
 */
function datepicker_bindHover(dpDiv) {
	var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
	return dpDiv.on("mouseout", selector, function () {
		$(this).removeClass("ui-state-hover");
		if (this.className.indexOf("ui-datepicker-prev") !== -1) {
			$(this).removeClass("ui-datepicker-prev-hover");
		}
		if (this.className.indexOf("ui-datepicker-next") !== -1) {
			$(this).removeClass("ui-datepicker-next-hover");
		}
	}).on("mouseover", selector, datepicker_handleMouseover);
}

function datepicker_handleMouseover() {
	if (!$.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
		$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
		$(this).addClass("ui-state-hover");
		if (this.className.indexOf("ui-datepicker-prev") !== -1) {
			$(this).addClass("ui-datepicker-prev-hover");
		}
		if (this.className.indexOf("ui-datepicker-next") !== -1) {
			$(this).addClass("ui-datepicker-next-hover");
		}
	}
}

/* jQuery extend now ignores nulls! */
function datepicker_extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props) {
		if (props[name] == null) {
			target[name] = props[name];
		}
	}
	return target;
}

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
					Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function (options) {

	/* Verify an empty collection wasn't passed - Fixes #6976 */
	if (!this.length) {
		return this;
	}

	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).on("mousedown", $.datepicker._checkExternalClick);
		$.datepicker.initialized = true;
	}

	/* Append datepicker main container to body if not exist. */
	if ($("#" + $.datepicker._mainDivId).length === 0) {
		$("body").append($.datepicker.dpDiv);
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {
		return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs));
	}
	if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
		return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs));
	}
	return this.each(function () {
		typeof options === "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.12.1";

var datepicker = $.datepicker;

datepicker.regional.es = {
	closeText: "Cerrar",
	prevText: "&#x3C;Ant",
	nextText: "Sig&#x3E;",
	currentText: "Hoy",
	monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
	monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
	dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
	dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
	dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
	weekHeader: "Sm",
	dateFormat: "dd/mm/yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ""
};
datepicker.setDefaults(datepicker.regional.es);

/*!
 * jQuery UI Rotatable
 */
widget$1("ui.rotatable", mouse, {

	options: {
		handle: false,
		angle: false,

		// callbacks
		start: null,
		rotate: null,
		stop: null
	},

	handle: function handle(_handle) {
		if (_handle === undefined) {
			return this.options.handle;
		}
		this.options.handle = _handle;
	},

	angle: function angle(_angle) {
		if (_angle === undefined) {
			return this.options.angle;
		}
		this.options.angle = _angle;
		this.performRotation(this.options.angle);
	},

	_create: function _create() {
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

	_destroy: function _destroy() {
		this.element.removeClass('ui-rotatable');
		this.element.find('.ui-rotatable-handle').remove();
	},

	performRotation: function performRotation(angle) {
		this.element.css('transform', 'rotate(' + angle + 'rad)');
		this.element.css('-moz-transform', 'rotate(' + angle + 'rad)');
		this.element.css('-webkit-transform', 'rotate(' + angle + 'rad)');
		this.element.css('-o-transform', 'rotate(' + angle + 'rad)');
	},

	getElementOffset: function getElementOffset() {
		this.performRotation(0);
		var offset = this.element.offset();
		this.performRotation(this.elementCurrentAngle);
		return offset;
	},

	getElementCenter: function getElementCenter() {
		var elementOffset = this.getElementOffset();
		var elementCentreX = elementOffset.left + this.element.width() / 2;
		var elementCentreY = elementOffset.top + this.element.height() / 2;
		return [elementCentreX, elementCentreY];
	},

	dragStart: function dragStart(event) {
		if (this.element) {
			return false;
		}
	},

	startRotate: function startRotate(event) {
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

	rotateElement: function rotateElement(event) {
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

		// Plugins callbacks need to be called first.
		this._propagate("rotate", event);

		if (previousRotateAngle !== rotateAngle) {
			this._trigger("rotate", event, this.ui());
			this.hasRotated = true;
		}

		return false;
	},

	stopRotate: function stopRotate(event) {
		if (!this.element) {
			return;
		}

		$(document).off('mousemove', this.listeners.rotateElement);
		$(document).off('mouseup', this.listeners.stopRotate);

		this.elementStopAngle = this.elementCurrentAngle;
		if (this.hasRotated) {
			this._propagate("stop", event);
		}

		setTimeout(function () {
			this.element = false;
		}, 10);
		return false;
	},

	_propagate: function _propagate(n, event) {
		plugin.call(this, n, [event, this.ui()]);
		if (n !== "rotate") {
			this._trigger(n, event, this.ui());
		}
	},

	plugins: {},

	ui: function ui() {
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

/*!
 * jQuery UI Droppable 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Droppable
//>>group: Interactions
//>>description: Enables drop targets for draggable elements.
//>>docs: http://api.jqueryui.com/droppable/
//>>demos: http://jqueryui.com/droppable/

widget$1("ui.droppable", {
	version: "1.12.0",
	widgetEventPrefix: "drop",
	options: {
		accept: "*",
		addClasses: true,
		greedy: false,
		scope: "default",
		tolerance: "intersect",

		// Callbacks
		activate: null,
		deactivate: null,
		drop: null,
		out: null,
		over: null
	},
	_create: function _create() {

		var proportions,
		    o = this.options,
		    accept = o.accept;

		this.isover = false;
		this.isout = true;

		this.accept = $.isFunction(accept) ? accept : function (d) {
			return d.is(accept);
		};

		this.proportions = function () /* valueToWrite */{
			if (arguments.length) {

				// Store the droppable's proportions
				proportions = arguments[0];
			} else {

				// Retrieve or derive the droppable's proportions
				return proportions ? proportions : proportions = {
					width: this.element[0].offsetWidth,
					height: this.element[0].offsetHeight
				};
			}
		};

		this._addToManager(o.scope);

		o.addClasses && this._addClass("ui-droppable");
	},

	_addToManager: function _addToManager(scope) {

		// Add the reference and positions to the manager
		$.ui.ddmanager.droppables[scope] = $.ui.ddmanager.droppables[scope] || [];
		$.ui.ddmanager.droppables[scope].push(this);
	},

	_splice: function _splice(drop) {
		var i = 0;
		for (; i < drop.length; i++) {
			if (drop[i] === this) {
				drop.splice(i, 1);
			}
		}
	},

	_destroy: function _destroy() {
		var drop = $.ui.ddmanager.droppables[this.options.scope];

		this._splice(drop);
	},

	_setOption: function _setOption(key, value) {

		if (key === "accept") {
			this.accept = $.isFunction(value) ? value : function (d) {
				return d.is(value);
			};
		} else if (key === "scope") {
			var drop = $.ui.ddmanager.droppables[this.options.scope];

			this._splice(drop);
			this._addToManager(value);
		}

		this._super(key, value);
	},

	_activate: function _activate(event) {
		var draggable$$1 = $.ui.ddmanager.current;

		this._addActiveClass();
		if (draggable$$1) {
			this._trigger("activate", event, this.ui(draggable$$1));
		}
	},

	_deactivate: function _deactivate(event) {
		var draggable$$1 = $.ui.ddmanager.current;

		this._removeActiveClass();
		if (draggable$$1) {
			this._trigger("deactivate", event, this.ui(draggable$$1));
		}
	},

	_over: function _over(event) {

		var draggable$$1 = $.ui.ddmanager.current;

		// Bail if draggable and droppable are same element
		if (!draggable$$1 || (draggable$$1.currentItem || draggable$$1.element)[0] === this.element[0]) {
			return;
		}

		if (this.accept.call(this.element[0], draggable$$1.currentItem || draggable$$1.element)) {
			this._addHoverClass();
			this._trigger("over", event, this.ui(draggable$$1));
		}
	},

	_out: function _out(event) {

		var draggable$$1 = $.ui.ddmanager.current;

		// Bail if draggable and droppable are same element
		if (!draggable$$1 || (draggable$$1.currentItem || draggable$$1.element)[0] === this.element[0]) {
			return;
		}

		if (this.accept.call(this.element[0], draggable$$1.currentItem || draggable$$1.element)) {
			this._removeHoverClass();
			this._trigger("out", event, this.ui(draggable$$1));
		}
	},

	_drop: function _drop(event, custom) {

		var draggable$$1 = custom || $.ui.ddmanager.current,
		    childrenIntersection = false;

		// Bail if draggable and droppable are same element
		if (!draggable$$1 || (draggable$$1.currentItem || draggable$$1.element)[0] === this.element[0]) {
			return false;
		}

		this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
			var inst = $(this).droppable("instance");
			if (inst.options.greedy && !inst.options.disabled && inst.options.scope === draggable$$1.options.scope && inst.accept.call(inst.element[0], draggable$$1.currentItem || draggable$$1.element) && intersect(draggable$$1, $.extend(inst, {
				offset: inst.element.offset()
			}), inst.options.tolerance, event)) {
				childrenIntersection = true;
				return false;
			}
		});
		if (childrenIntersection) {
			return false;
		}

		if (this.accept.call(this.element[0], draggable$$1.currentItem || draggable$$1.element)) {
			this._removeActiveClass();
			this._removeHoverClass();

			this._trigger("drop", event, this.ui(draggable$$1));
			return this.element;
		}

		return false;
	},

	ui: function ui(c) {
		return {
			draggable: c.currentItem || c.element,
			helper: c.helper,
			position: c.position,
			offset: c.positionAbs
		};
	},

	// Extension points just to make backcompat sane and avoid duplicating logic
	// TODO: Remove in 1.13 along with call to it below
	_addHoverClass: function _addHoverClass() {
		this._addClass("ui-droppable-hover");
	},

	_removeHoverClass: function _removeHoverClass() {
		this._removeClass("ui-droppable-hover");
	},

	_addActiveClass: function _addActiveClass() {
		this._addClass("ui-droppable-active");
	},

	_removeActiveClass: function _removeActiveClass() {
		this._removeClass("ui-droppable-active");
	}
});

/*
	This manager tracks offsets of draggables and droppables
*/
$.ui.ddmanager = {
	current: null,
	droppables: {
		"default": []
	},
	prepareOffsets: function prepareOffsets(t, event) {

		var i,
		    j,
		    m = $.ui.ddmanager.droppables[t.options.scope] || [],
		    type = event ? event.type : null,
		    // workaround for #2317
		list = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();

		droppablesLoop: for (i = 0; i < m.length; i++) {

			// No disabled and non-accepted
			if (m[i].options.disabled || t && !m[i].accept.call(m[i].element[0], t.currentItem || t.element)) {
				continue;
			}

			// Filter out elements in the current dragged item
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

			// Activate the droppable if used directly from draggables
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
	drop: function drop(draggable$$1, event) {

		var dropped = false;

		// Create a copy of the droppables in case the list changes during the drop (#9116)
		$.each(($.ui.ddmanager.droppables[draggable$$1.options.scope] || []).slice(), function () {

			if (!this.options) {
				return;
			}
			if (!this.options.disabled && this.visible && intersect(draggable$$1, this, this.options.tolerance, event)) {
				dropped = this._drop.call(this, event) || dropped;
			}

			if (!this.options.disabled && this.visible && this.accept.call(this.element[0], draggable$$1.currentItem || draggable$$1.element)) {
				this.isout = true;
				this.isover = false;
				this._deactivate.call(this, event);
			}
		});
		return dropped;
	},
	dragStart: function dragStart(draggable$$1, event) {

		// Listen for scrolling so that if the dragging causes scrolling the position of the
		// droppables can be recalculated (see #5003)
		draggable$$1.element.parentsUntil("body").on("scroll.droppable", function () {
			if (!draggable$$1.options.refreshPositions) {
				$.ui.ddmanager.prepareOffsets(draggable$$1, event);
			}
		});
	},
	drag: function drag(draggable$$1, event) {

		// If you have a highly dynamic page, you might try this option. It renders positions
		// every time you move the mouse.
		if (draggable$$1.options.refreshPositions) {
			$.ui.ddmanager.prepareOffsets(draggable$$1, event);
		}

		// Run through all droppables and check their positions based on specific tolerance options
		$.each($.ui.ddmanager.droppables[draggable$$1.options.scope] || [], function () {

			if (this.options.disabled || this.greedyChild || !this.visible) {
				return;
			}

			var parentInstance,
			    scope,
			    parent,
			    intersects = intersect(draggable$$1, this, this.options.tolerance, event),
			    c = !intersects && this.isover ? "isout" : intersects && !this.isover ? "isover" : null;
			if (!c) {
				return;
			}

			if (this.options.greedy) {

				// find droppable parents with same scope
				scope = this.options.scope;
				parent = this.element.parents(":data(ui-droppable)").filter(function () {
					return $(this).droppable("instance").options.scope === scope;
				});

				if (parent.length) {
					parentInstance = $(parent[0]).droppable("instance");
					parentInstance.greedyChild = c === "isover";
				}
			}

			// We just moved into a greedy child
			if (parentInstance && c === "isover") {
				parentInstance.isover = false;
				parentInstance.isout = true;
				parentInstance._out.call(parentInstance, event);
			}

			this[c] = true;
			this[c === "isout" ? "isover" : "isout"] = false;
			this[c === "isover" ? "_over" : "_out"].call(this, event);

			// We just moved out of a greedy child
			if (parentInstance && c === "isout") {
				parentInstance.isout = false;
				parentInstance.isover = true;
				parentInstance._over.call(parentInstance, event);
			}
		});
	},
	dragStop: function dragStop(draggable$$1, event) {
		draggable$$1.element.parentsUntil("body").off("scroll.droppable");

		// Call prepareOffsets one final time since IE does not fire return scroll events when
		// overflow was caused by drag (see #5003)
		if (!draggable$$1.options.refreshPositions) {
			$.ui.ddmanager.prepareOffsets(draggable$$1, event);
		}
	}
};

/*!
 * jQuery UI Resizable 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Resizable
//>>group: Interactions
//>>description: Enables resize functionality for any element.
//>>docs: http://api.jqueryui.com/resizable/
//>>demos: http://jqueryui.com/resizable/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/resizable.css
//>>css.theme: ../../themes/base/theme.css

widget$1("ui.resizable", mouse, {
	version: "1.12.0",
	widgetEventPrefix: "resize",
	options: {
		alsoResize: false,
		animate: false,
		animateDuration: "slow",
		animateEasing: "swing",
		aspectRatio: false,
		autoHide: false,
		classes: {
			"ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
		},
		containment: false,
		ghost: false,
		grid: false,
		handles: "e,s,se",
		helper: false,
		maxHeight: null,
		maxWidth: null,
		minHeight: 10,
		minWidth: 10,

		// See #7960
		zIndex: 90,

		// Callbacks
		resize: null,
		start: null,
		stop: null
	},

	_num: function _num(value) {
		return parseFloat(value) || 0;
	},

	_isNumber: function _isNumber(value) {
		return !isNaN(parseFloat(value));
	},

	_hasScroll: function _hasScroll(el, a) {

		if ($(el).css("overflow") === "hidden") {
			return false;
		}

		var scroll = a && a === "left" ? "scrollLeft" : "scrollTop",
		    has = false;

		if (el[scroll] > 0) {
			return true;
		}

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[scroll] = 1;
		has = el[scroll] > 0;
		el[scroll] = 0;
		return has;
	},

	_create: function _create() {

		var margins,
		    o = this.options,
		    that = this;
		this._addClass("ui-resizable");

		$.extend(this, {
			_aspectRatio: !!o.aspectRatio,
			aspectRatio: o.aspectRatio,
			originalElement: this.element,
			_proportionallyResizeElements: [],
			_helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
		});

		// Wrap the element if it cannot hold child nodes
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

			// support: Safari
			// Prevent Safari textarea resize
			this.originalResizeStyle = this.originalElement.css("resize");
			this.originalElement.css("resize", "none");

			this._proportionallyResizeElements.push(this.originalElement.css({
				position: "static",
				zoom: 1,
				display: "block"
			}));

			// Support: IE9
			// avoid IE jump (hard set the margin)
			this.originalElement.css(margins);

			this._proportionallyResize();
		}

		this._setupHandles();

		if (o.autoHide) {
			$(this.element).on("mouseenter", function () {
				if (o.disabled) {
					return;
				}
				that._removeClass("ui-resizable-autohide");
				that._handles.show();
			}).on("mouseleave", function () {
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

	_destroy: function _destroy() {

		this._mouseDestroy();

		var wrapper,
		    _destroy = function _destroy(exp) {
			$(exp).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove();
		};

		// TODO: Unwrap at same DOM position
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

	_setOption: function _setOption(key, value) {
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

	_setupHandles: function _setupHandles() {
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

				axis.css({
					zIndex: o.zIndex
				});

				this.handles[handle] = ".ui-resizable-" + handle;
				this.element.append(axis);
			}
		}

		this._renderAxis = function (target) {

			var i, axis, padPos, padWrapper;

			target = target || this.element;

			for (i in this.handles) {

				if (this.handles[i].constructor === String) {
					this.handles[i] = this.element.children(this.handles[i]).first().show();
				} else if (this.handles[i].jquery || this.handles[i].nodeType) {
					this.handles[i] = $(this.handles[i]);
					this._on(this.handles[i], {
						"mousedown": that._mouseDown
					});
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

		// TODO: make renderAxis a prototype function
		this._renderAxis(this.element);

		this._handles = this._handles.add(this.element.find(".ui-resizable-handle"));
		this._handles.disableSelection();

		this._handles.on("mouseover", function () {
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

	_removeHandles: function _removeHandles() {
		this._handles.remove();
	},

	_mouseCapture: function _mouseCapture(event) {
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

	_mouseStart: function _mouseStart(event) {

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

		this.aspectRatio = typeof o.aspectRatio === "number" ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1;

		cursor = $(".ui-resizable-" + this.axis).css("cursor");
		$("body").css("cursor", cursor === "auto" ? this.axis + "-resize" : cursor);

		this._addClass("ui-resizable-resizing");
		this._propagate("start", event);
		return true;
	},

	_mouseDrag: function _mouseDrag(event) {

		var data,
		    props,
		    smp = this.originalMousePosition,
		    a = this.axis,
		    dx = event.pageX - smp.left || 0,
		    dy = event.pageY - smp.top || 0,
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

	_mouseStop: function _mouseStop(event) {

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
			ista = pr.length && /textarea/i.test(pr[0].nodeName);
			soffseth = ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height;
			soffsetw = ista ? 0 : that.sizeDiff.width;

			s = {
				width: that.helper.width() - soffsetw,
				height: that.helper.height() - soffseth
			};
			left = parseFloat(that.element.css("left")) + (that.position.left - that.originalPosition.left) || null;
			top = parseFloat(that.element.css("top")) + (that.position.top - that.originalPosition.top) || null;

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

	_updatePrevProperties: function _updatePrevProperties() {
		this.prevPosition = {
			top: this.position.top,
			left: this.position.left
		};
		this.prevSize = {
			width: this.size.width,
			height: this.size.height
		};
	},

	_applyChanges: function _applyChanges() {
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

	_updateVirtualBoundaries: function _updateVirtualBoundaries(forceAspectRatio) {
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

	_updateCache: function _updateCache(data) {
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

	_updateRatio: function _updateRatio(data) {

		var cpos = this.position,
		    csize = this.size,
		    a = this.axis;

		if (this._isNumber(data.height)) {
			data.width = data.height * this.aspectRatio;
		} else if (this._isNumber(data.width)) {
			data.height = data.width / this.aspectRatio;
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

	_respectSize: function _respectSize(data) {

		var o = this._vBoundaries,
		    a = this.axis,
		    ismaxw = this._isNumber(data.width) && o.maxWidth && o.maxWidth < data.width,
		    ismaxh = this._isNumber(data.height) && o.maxHeight && o.maxHeight < data.height,
		    isminw = this._isNumber(data.width) && o.minWidth && o.minWidth > data.width,
		    isminh = this._isNumber(data.height) && o.minHeight && o.minHeight > data.height,
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

		// Fixing jump error on top/left - bug #2330
		if (!data.width && !data.height && !data.left && data.top) {
			data.top = null;
		} else if (!data.width && !data.height && !data.top && data.left) {
			data.left = null;
		}

		return data;
	},

	_getPaddingPlusBorderDimensions: function _getPaddingPlusBorderDimensions(element) {
		var i = 0,
		    widths = [],
		    borders = [element.css("borderTopWidth"), element.css("borderRightWidth"), element.css("borderBottomWidth"), element.css("borderLeftWidth")],
		    paddings = [element.css("paddingTop"), element.css("paddingRight"), element.css("paddingBottom"), element.css("paddingLeft")];

		for (; i < 4; i++) {
			widths[i] = parseFloat(borders[i]) || 0;
			widths[i] += parseFloat(paddings[i]) || 0;
		}

		return {
			height: widths[0] + widths[2],
			width: widths[1] + widths[3]
		};
	},

	_proportionallyResize: function _proportionallyResize() {

		if (!this._proportionallyResizeElements.length) {
			return;
		}

		var prel,
		    i = 0,
		    element = this.helper || this.element;

		for (; i < this._proportionallyResizeElements.length; i++) {

			prel = this._proportionallyResizeElements[i];

			// TODO: Seems like a bug to cache this.outerDimensions
			// considering that we are in a loop.
			if (!this.outerDimensions) {
				this.outerDimensions = this._getPaddingPlusBorderDimensions(prel);
			}

			prel.css({
				height: element.height() - this.outerDimensions.height || 0,
				width: element.width() - this.outerDimensions.width || 0
			});
		}
	},

	_renderProxy: function _renderProxy() {

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
				zIndex: ++o.zIndex //TODO: Don't modify option
			});

			this.helper.appendTo("body").disableSelection();
		} else {
			this.helper = this.element;
		}
	},

	_change: {
		e: function e(event, dx) {
			return {
				width: this.originalSize.width + dx
			};
		},
		w: function w(event, dx) {
			var cs = this.originalSize,
			    sp = this.originalPosition;
			return {
				left: sp.left + dx,
				width: cs.width - dx
			};
		},
		n: function n(event, dx, dy) {
			var cs = this.originalSize,
			    sp = this.originalPosition;
			return {
				top: sp.top + dy,
				height: cs.height - dy
			};
		},
		s: function s(event, dx, dy) {
			return {
				height: this.originalSize.height + dy
			};
		},
		se: function se(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
		},
		sw: function sw(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
		},
		ne: function ne(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
		},
		nw: function nw(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
		}
	},

	_propagate: function _propagate(n, event) {
		plugin.call(this, n, [event, this.ui()]);
		n !== "resize" && this._trigger(n, event, this.ui());
	},

	plugins: {},

	ui: function ui() {
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

/*
 * Resizable Extensions
 */

plugin.add("resizable", "animate", {

	stop: function stop(event) {
		var that = $(this).resizable("instance"),
		    o = that.options,
		    pr = that._proportionallyResizeElements,
		    ista = pr.length && /textarea/i.test(pr[0].nodeName),
		    soffseth = ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height,
		    soffsetw = ista ? 0 : that.sizeDiff.width,
		    style = {
			width: that.size.width - soffsetw,
			height: that.size.height - soffseth
		},
		    left = parseFloat(that.element.css("left")) + (that.position.left - that.originalPosition.left) || null,
		    top = parseFloat(that.element.css("top")) + (that.position.top - that.originalPosition.top) || null;

		that.element.animate($.extend(style, top && left ? {
			top: top,
			left: left
		} : {}), {
			duration: o.animateDuration,
			easing: o.animateEasing,
			step: function step() {

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

				// Propagating resize, and updating values for each animation step
				that._updateCache(data);
				that._propagate("resize", event);
			}
		});
	}

});

plugin.add("resizable", "containment", {

	start: function start() {
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
		    ce = oc instanceof $ ? oc.get(0) : /parent/.test(oc) ? el.parent().get(0) : oc;

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
			$(["Top", "Right", "Left", "Bottom"]).each(function (i, name) {
				p[i] = that._num(element.css("padding" + name));
			});

			that.containerOffset = element.offset();
			that.containerPosition = element.position();
			that.containerSize = {
				height: element.innerHeight() - p[3],
				width: element.innerWidth() - p[1]
			};

			co = that.containerOffset;
			ch = that.containerSize.height;
			cw = that.containerSize.width;
			width = that._hasScroll(ce, "left") ? ce.scrollWidth : cw;
			height = that._hasScroll(ce) ? ce.scrollHeight : ch;

			that.parentData = {
				element: ce,
				left: co.left,
				top: co.top,
				width: width,
				height: height
			};
		}
	},

	resize: function resize(event) {
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

		if (ce[0] !== document && /static/.test(ce.css("position"))) {
			cop = co;
		}

		if (cp.left < (that._helper ? co.left : 0)) {
			that.size.width = that.size.width + (that._helper ? that.position.left - co.left : that.position.left - cop.left);

			if (pRatio) {
				that.size.height = that.size.width / that.aspectRatio;
				continueResize = false;
			}
			that.position.left = o.helper ? co.left : 0;
		}

		if (cp.top < (that._helper ? co.top : 0)) {
			that.size.height = that.size.height + (that._helper ? that.position.top - co.top : that.position.top);

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

		woset = Math.abs(that.sizeDiff.width + (that._helper ? that.offset.left - cop.left : that.offset.left - co.left));

		hoset = Math.abs(that.sizeDiff.height + (that._helper ? that.offset.top - cop.top : that.offset.top - co.top));

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

	stop: function stop() {
		var that = $(this).resizable("instance"),
		    o = that.options,
		    co = that.containerOffset,
		    cop = that.containerPosition,
		    ce = that.containerElement,
		    helper = $(that.helper),
		    ho = helper.offset(),
		    w = helper.outerWidth() - that.sizeDiff.width,
		    h = helper.outerHeight() - that.sizeDiff.height;

		if (that._helper && !o.animate && /relative/.test(ce.css("position"))) {
			$(this).css({
				left: ho.left - cop.left - co.left,
				width: w,
				height: h
			});
		}

		if (that._helper && !o.animate && /static/.test(ce.css("position"))) {
			$(this).css({
				left: ho.left - cop.left - co.left,
				width: w,
				height: h
			});
		}
	}
});

plugin.add("resizable", "alsoResize", {

	start: function start() {
		var that = $(this).resizable("instance"),
		    o = that.options;

		$(o.alsoResize).each(function () {
			var el = $(this);
			el.data("ui-resizable-alsoresize", {
				width: parseFloat(el.width()),
				height: parseFloat(el.height()),
				left: parseFloat(el.css("left")),
				top: parseFloat(el.css("top"))
			});
		});
	},

	resize: function resize(event, ui$$1) {
		var that = $(this).resizable("instance"),
		    o = that.options,
		    os = that.originalSize,
		    op = that.originalPosition,
		    delta = {
			height: that.size.height - os.height || 0,
			width: that.size.width - os.width || 0,
			top: that.position.top - op.top || 0,
			left: that.position.left - op.left || 0
		};

		$(o.alsoResize).each(function () {
			var el = $(this),
			    start = $(this).data("ui-resizable-alsoresize"),
			    style = {},
			    css = el.parents(ui$$1.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];

			$.each(css, function (i, prop) {
				var sum = (start[prop] || 0) + (delta[prop] || 0);
				if (sum && sum >= 0) {
					style[prop] = sum || null;
				}
			});

			el.css(style);
		});
	},

	stop: function stop() {
		$(this).removeData("ui-resizable-alsoresize");
	}
});

plugin.add("resizable", "ghost", {

	start: function start() {

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

		// DEPRECATED
		// TODO: remove after 1.12
		if ($.uiBackCompat !== false && typeof that.options.ghost === "string") {

			// Ghost option
			that.ghost.addClass(this.options.ghost);
		}

		that.ghost.appendTo(that.helper);
	},

	resize: function resize() {
		var that = $(this).resizable("instance");
		if (that.ghost) {
			that.ghost.css({
				position: "relative",
				height: that.size.height,
				width: that.size.width
			});
		}
	},

	stop: function stop() {
		var that = $(this).resizable("instance");
		if (that.ghost && that.helper) {
			that.helper.get(0).removeChild(that.ghost.get(0));
		}
	}

});

plugin.add("resizable", "grid", {

	resize: function resize() {
		var outerDimensions,
		    that = $(this).resizable("instance"),
		    o = that.options,
		    cs = that.size,
		    os = that.originalSize,
		    op = that.originalPosition,
		    a = that.axis,
		    grid = typeof o.grid === "number" ? [o.grid, o.grid] : o.grid,
		    gridX = grid[0] || 1,
		    gridY = grid[1] || 1,
		    ox = Math.round((cs.width - os.width) / gridX) * gridX,
		    oy = Math.round((cs.height - os.height) / gridY) * gridY,
		    newWidth = os.width + ox,
		    newHeight = os.height + oy,
		    isMaxWidth = o.maxWidth && o.maxWidth < newWidth,
		    isMaxHeight = o.maxHeight && o.maxHeight < newHeight,
		    isMinWidth = o.minWidth && o.minWidth > newWidth,
		    isMinHeight = o.minHeight && o.minHeight > newHeight;

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
	}

});

/*!
 * jQuery UI Selectable 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Selectable
//>>group: Interactions
//>>description: Allows groups of elements to be selected with the mouse.
//>>docs: http://api.jqueryui.com/selectable/
//>>demos: http://jqueryui.com/selectable/
//>>css.structure: ../../themes/base/selectable.css
widget$1("ui.selectable", mouse, {
	version: "1.12.0",
	options: {
		appendTo: "body",
		autoRefresh: true,
		distance: 0,
		filter: "*",
		tolerance: "touch",

		// Callbacks
		selected: null,
		selecting: null,
		start: null,
		stop: null,
		unselected: null,
		unselecting: null
	},
	_create: function _create() {
		var that = this;

		this._addClass("ui-selectable");

		this.dragged = false;

		// Cache selectee children based on filter
		this.refresh = function () {
			that.elementPos = $(that.element[0]).offset();
			that.selectees = $(that.options.filter, that.element[0]);
			that._addClass(that.selectees, "ui-selectee");
			that.selectees.each(function () {
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

	_destroy: function _destroy() {
		this.selectees.removeData("selectable-item");
		this._mouseDestroy();
	},

	_mouseStart: function _mouseStart(event) {
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

		// position helper (lasso)
		this.helper.css({
			"left": event.pageX,
			"top": event.pageY,
			"width": 0,
			"height": 0
		});

		if (options.autoRefresh) {
			this.refresh();
		}

		this.selectees.filter(".ui-selected").each(function () {
			var selectee = $.data(this, "selectable-item");
			selectee.startselected = true;
			if (!event.metaKey && !event.ctrlKey) {
				that._removeClass(selectee.$element, "ui-selected");
				selectee.selected = false;
				that._addClass(selectee.$element, "ui-unselecting");
				selectee.unselecting = true;

				// selectable UNSELECTING callback
				that._trigger("unselecting", event, {
					unselecting: selectee.element
				});
			}
		});

		$(event.target).parents().addBack().each(function () {
			var doSelect,
			    selectee = $.data(this, "selectable-item");
			if (selectee) {
				doSelect = !event.metaKey && !event.ctrlKey || !selectee.$element.hasClass("ui-selected");
				that._removeClass(selectee.$element, doSelect ? "ui-unselecting" : "ui-selected")._addClass(selectee.$element, doSelect ? "ui-selecting" : "ui-unselecting");
				selectee.unselecting = !doSelect;
				selectee.selecting = doSelect;
				selectee.selected = doSelect;

				// selectable (UN)SELECTING callback
				if (doSelect) {
					that._trigger("selecting", event, {
						selecting: selectee.element
					});
				} else {
					that._trigger("unselecting", event, {
						unselecting: selectee.element
					});
				}
				return false;
			}
		});
	},

	_mouseDrag: function _mouseDrag(event) {

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

		this.selectees.each(function () {
			var selectee = $.data(this, "selectable-item"),
			    hit = false,
			    offset = {};

			//prevent helper from being selected if appendTo: selectable
			if (!selectee || selectee.element === that.element[0]) {
				return;
			}

			offset.left = selectee.left + that.elementPos.left;
			offset.right = selectee.right + that.elementPos.left;
			offset.top = selectee.top + that.elementPos.top;
			offset.bottom = selectee.bottom + that.elementPos.top;

			if (options.tolerance === "touch") {
				hit = !(offset.left > x2 || offset.right < x1 || offset.top > y2 || offset.bottom < y1);
			} else if (options.tolerance === "fit") {
				hit = offset.left > x1 && offset.right < x2 && offset.top > y1 && offset.bottom < y2;
			}

			if (hit) {

				// SELECT
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

					// selectable SELECTING callback
					that._trigger("selecting", event, {
						selecting: selectee.element
					});
				}
			} else {

				// UNSELECT
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

						// selectable UNSELECTING callback
						that._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
				}
				if (selectee.selected) {
					if (!event.metaKey && !event.ctrlKey && !selectee.startselected) {
						that._removeClass(selectee.$element, "ui-selected");
						selectee.selected = false;

						that._addClass(selectee.$element, "ui-unselecting");
						selectee.unselecting = true;

						// selectable UNSELECTING callback
						that._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
				}
			}
		});

		return false;
	},

	_mouseStop: function _mouseStop(event) {
		var that = this;

		this.dragged = false;

		$(".ui-unselecting", this.element[0]).each(function () {
			var selectee = $.data(this, "selectable-item");
			that._removeClass(selectee.$element, "ui-unselecting");
			selectee.unselecting = false;
			selectee.startselected = false;
			that._trigger("unselected", event, {
				unselected: selectee.element
			});
		});
		$(".ui-selecting", this.element[0]).each(function () {
			var selectee = $.data(this, "selectable-item");
			that._removeClass(selectee.$element, "ui-selecting")._addClass(selectee.$element, "ui-selected");
			selectee.selecting = false;
			selectee.selected = true;
			selectee.startselected = true;
			that._trigger("selected", event, {
				selected: selectee.element
			});
		});
		this._trigger("stop", event);

		this.helper.remove();

		return false;
	}

});

/*!
 * jQuery UI Sortable 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Sortable
//>>group: Interactions
//>>description: Enables items in a list to be sorted using the mouse.
//>>docs: http://api.jqueryui.com/sortable/
//>>demos: http://jqueryui.com/sortable/
//>>css.structure: ../../themes/base/sortable.css

widget$1("ui.sortable", mouse, {
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

		// Callbacks
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

	_isOverAxis: function _isOverAxis(x, reference, size) {
		return x >= reference && x < reference + size;
	},

	_isFloating: function _isFloating(item) {
		return (/left|right/.test(item.css("float")) || /inline|table-cell/.test(item.css("display"))
		);
	},

	_create: function _create() {
		this.containerCache = {};
		this._addClass("ui-sortable");

		//Get the items
		this.refresh();

		//Let's determine the parent's offset
		this.offset = this.element.offset();

		//Initialize mouse events for interaction
		this._mouseInit();

		this._setHandleClassName();

		//We're ready to go
		this.ready = true;
	},

	_setOption: function _setOption(key, value) {
		this._super(key, value);

		if (key === "handle") {
			this._setHandleClassName();
		}
	},

	_setHandleClassName: function _setHandleClassName() {
		var that = this;
		this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle");
		$.each(this.items, function () {
			that._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle");
		});
	},

	_destroy: function _destroy() {
		this._mouseDestroy();

		for (var i = this.items.length - 1; i >= 0; i--) {
			this.items[i].item.removeData(this.widgetName + "-item");
		}

		return this;
	},

	_mouseCapture: function _mouseCapture(event, overrideHandle) {
		var currentItem = null,
		    validHandle = false,
		    that = this;

		if (this.reverting) {
			return false;
		}

		if (this.options.disabled || this.options.type === "static") {
			return false;
		}

		//We have to refresh the items data once first
		this._refreshItems(event);

		//Find out if the clicked node (or one of its parents) is a actual item in this.items
		$(event.target).parents().each(function () {
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
			$(this.options.handle, currentItem).find("*").addBack().each(function () {
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

	_mouseStart: function _mouseStart(event, overrideHandle, noActivation) {

		var i,
		    body,
		    o = this.options;

		this.currentContainer = this;

		//We only need to call refreshPositions, because the refreshItems call has been moved to
		// mouseCapture
		this.refreshPositions();

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		/*
   * - Position generation -
   * This block generates everything position related - it's the core of draggables.
   */

		//Cache the margins of the original element
		this._cacheMargins();

		//Get the next scrolling parent
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.currentItem.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),

			// This is a relative to absolute position minus the actual position calculation -
			// only used for relative positioned helper
			relative: this._getRelativeOffset()
		});

		// Only after we got the offset, we can change the helper's position to absolute
		// TODO: Still need to figure out a way to make relative sorting possible
		this.helper.css("position", "absolute");
		this.cssPosition = this.helper.css("position");

		//Generate the original position
		this.originalPosition = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);

		//Cache the former DOM position
		this.domPosition = {
			prev: this.currentItem.prev()[0],
			parent: this.currentItem.parent()[0]
		};

		// If the helper is not the original, hide the original so it's not playing any role during
		// the drag, won't cause anything bad this way
		if (this.helper[0] !== this.currentItem[0]) {
			this.currentItem.hide();
		}

		//Create the placeholder
		this._createPlaceholder();

		//Set a containment if given in the options
		if (o.containment) {
			this._setContainment();
		}

		if (o.cursor && o.cursor !== "auto") {
			// cursor option
			body = this.document.find("body");

			// Support: IE
			this.storedCursor = body.css("cursor");
			body.css("cursor", o.cursor);

			this.storedStylesheet = $("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(body);
		}

		if (o.opacity) {
			// opacity option
			if (this.helper.css("opacity")) {
				this._storedOpacity = this.helper.css("opacity");
			}
			this.helper.css("opacity", o.opacity);
		}

		if (o.zIndex) {
			// zIndex option
			if (this.helper.css("zIndex")) {
				this._storedZIndex = this.helper.css("zIndex");
			}
			this.helper.css("zIndex", o.zIndex);
		}

		//Prepare scrolling
		if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
			this.overflowOffset = this.scrollParent.offset();
		}

		//Call callbacks
		this._trigger("start", event, this._uiHash());

		//Recache the helper size
		if (!this._preserveHelperProportions) {
			this._cacheHelperProportions();
		}

		//Post "activate" events to possible containers
		if (!noActivation) {
			for (i = this.containers.length - 1; i >= 0; i--) {
				this.containers[i]._trigger("activate", event, this._uiHash(this));
			}
		}

		//Prepare possible droppables
		if ($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		this.dragging = true;

		this._addClass(this.helper, "ui-sortable-helper");

		// Execute the drag once - this causes the helper not to be visiblebefore getting its
		// correct position
		this._mouseDrag(event);
		return true;
	},

	_mouseDrag: function _mouseDrag(event) {
		var i,
		    item,
		    itemElement,
		    intersection,
		    o = this.options,
		    scrolled = false;

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		if (!this.lastPositionAbs) {
			this.lastPositionAbs = this.positionAbs;
		}

		//Do scrolling
		if (this.options.scroll) {
			if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {

				if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity) {
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
				} else if (event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
				}

				if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity) {
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

		//Regenerate the absolute position used for position checks
		this.positionAbs = this._convertPositionTo("absolute");

		//Set the helper position
		if (!this.options.axis || this.options.axis !== "y") {
			this.helper[0].style.left = this.position.left + "px";
		}
		if (!this.options.axis || this.options.axis !== "x") {
			this.helper[0].style.top = this.position.top + "px";
		}

		//Rearrange
		for (i = this.items.length - 1; i >= 0; i--) {

			//Cache variables and intersection, continue if no intersection
			item = this.items[i];
			itemElement = item.item[0];
			intersection = this._intersectsWithPointer(item);
			if (!intersection) {
				continue;
			}

			// Only put the placeholder inside the current Container, skip all
			// items from other containers. This works because when moving
			// an item from one container to another the
			// currentContainer is switched before the placeholder is moved.
			//
			// Without this, moving items in "sub-sortables" can cause
			// the placeholder to jitter between the outer and inner container.
			if (item.instance !== this.currentContainer) {
				continue;
			}

			// Cannot intersect with itself
			// no useless actions that have been done before
			// no action if the item moved is the parent of the item checked
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

		//Post events to containers
		this._contactContainers(event);

		//Interconnect with droppables
		if ($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		//Call callbacks
		this._trigger("sort", event, this._uiHash());

		this.lastPositionAbs = this.positionAbs;
		return false;
	},

	_mouseStop: function _mouseStop(event, noPropagation) {

		if (!event) {
			return;
		}

		//If we are using droppables, inform the manager about the drop
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
			$(this.helper).animate(animation, parseInt(this.options.revert, 10) || 500, function () {
				that._clear(event);
			});
		} else {
			this._clear(event, noPropagation);
		}

		return false;
	},

	cancel: function cancel() {

		if (this.dragging) {

			this._mouseUp({
				target: null
			});

			if (this.options.helper === "original") {
				this.currentItem.css(this._storedCSS);
				this._removeClass(this.currentItem, "ui-sortable-helper");
			} else {
				this.currentItem.show();
			}

			//Post deactivating events to containers
			for (var i = this.containers.length - 1; i >= 0; i--) {
				this.containers[i]._trigger("deactivate", null, this._uiHash(this));
				if (this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", null, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}
		}

		if (this.placeholder) {

			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
			// it unbinds ALL events from the original node!
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

	serialize: function serialize(o) {

		var items = this._getItemsAsjQuery(o && o.connected),
		    str = [];
		o = o || {};

		$(items).each(function () {
			var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[\-=_](.+)/);
			if (res) {
				str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]));
			}
		});

		if (!str.length && o.key) {
			str.push(o.key + "=");
		}

		return str.join("&");
	},

	toArray: function toArray(o) {

		var items = this._getItemsAsjQuery(o && o.connected),
		    ret = [];

		o = o || {};

		items.each(function () {
			ret.push($(o.item || this).attr(o.attribute || "id") || "");
		});
		return ret;
	},

	/* Be careful with the following core functions */
	_intersectsWith: function _intersectsWith(item) {

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
		    isOverElementHeight = this.options.axis === "x" || y1 + dyClick > t && y1 + dyClick < b,
		    isOverElementWidth = this.options.axis === "y" || x1 + dxClick > l && x1 + dxClick < r,
		    isOverElement = isOverElementHeight && isOverElementWidth;

		if (this.options.tolerance === "pointer" || this.options.forcePointerForContainers || this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"]) {
			return isOverElement;
		} else {

			return l < x1 + this.helperProportions.width / 2 && // Right Half
			x2 - this.helperProportions.width / 2 < r && // Left Half
			t < y1 + this.helperProportions.height / 2 && // Bottom Half
			y2 - this.helperProportions.height / 2 < b; // Top Half
		}
	},

	_intersectsWithPointer: function _intersectsWithPointer(item) {
		var verticalDirection,
		    horizontalDirection,
		    isOverElementHeight = this.options.axis === "x" || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
		    isOverElementWidth = this.options.axis === "y" || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
		    isOverElement = isOverElementHeight && isOverElementWidth;

		if (!isOverElement) {
			return false;
		}

		verticalDirection = this._getDragVerticalDirection();
		horizontalDirection = this._getDragHorizontalDirection();

		return this.floating ? horizontalDirection === "right" || verticalDirection === "down" ? 2 : 1 : verticalDirection && (verticalDirection === "down" ? 2 : 1);
	},

	_intersectsWithSides: function _intersectsWithSides(item) {

		var isOverBottomHalf = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height / 2, item.height),
		    isOverRightHalf = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width),
		    verticalDirection = this._getDragVerticalDirection(),
		    horizontalDirection = this._getDragHorizontalDirection();

		if (this.floating && horizontalDirection) {
			return horizontalDirection === "right" && isOverRightHalf || horizontalDirection === "left" && !isOverRightHalf;
		} else {
			return verticalDirection && (verticalDirection === "down" && isOverBottomHalf || verticalDirection === "up" && !isOverBottomHalf);
		}
	},

	_getDragVerticalDirection: function _getDragVerticalDirection() {
		var delta = this.positionAbs.top - this.lastPositionAbs.top;
		return delta !== 0 && (delta > 0 ? "down" : "up");
	},

	_getDragHorizontalDirection: function _getDragHorizontalDirection() {
		var delta = this.positionAbs.left - this.lastPositionAbs.left;
		return delta !== 0 && (delta > 0 ? "right" : "left");
	},

	refresh: function refresh(event) {
		this._refreshItems(event);
		this._setHandleClassName();
		this.refreshPositions();
		return this;
	},

	_connectWith: function _connectWith() {
		var options = this.options;
		return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
	},

	_getItemsAsjQuery: function _getItemsAsjQuery(connected) {

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

	_removeCurrentsFromItems: function _removeCurrentsFromItems() {

		var list = this.currentItem.find(":data(" + this.widgetName + "-item)");

		this.items = $.grep(this.items, function (item) {
			for (var j = 0; j < list.length; j++) {
				if (list[j] === item.item[0]) {
					return false;
				}
			}
			return true;
		});
	},

	_refreshItems: function _refreshItems(event) {

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
		    queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {
			item: this.currentItem
		}) : $(this.options.items, this.element), this]],
		    connectWith = this._connectWith();

		//Shouldn't be run the first time through due to massive slow-down
		if (connectWith && this.ready) {
			for (i = connectWith.length - 1; i >= 0; i--) {
				cur = $(connectWith[i], this.document[0]);
				for (j = cur.length - 1; j >= 0; j--) {
					inst = $.data(cur[j], this.widgetFullName);
					if (inst && inst !== this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {
							item: this.currentItem
						}) : $(inst.options.items, inst.element), inst]);
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

				// Data for target checking (mouse manager)
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

	refreshPositions: function refreshPositions(fast) {

		// Determine whether items are being displayed horizontally
		this.floating = this.items.length ? this.options.axis === "x" || this._isFloating(this.items[0].item) : false;

		//This has to be redone because due to the item being moved out/into the offsetParent,
		// the offsetParent's position will change
		if (this.offsetParent && this.helper) {
			this.offset.parent = this._getParentOffset();
		}

		var i, item, t, p;

		for (i = this.items.length - 1; i >= 0; i--) {
			item = this.items[i];

			//We ignore calculating positions of all connected containers when we're not over them
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

	_createPlaceholder: function _createPlaceholder(that) {
		that = that || this;
		var className,
		    o = that.options;

		if (!o.placeholder || o.placeholder.constructor === String) {
			className = o.placeholder;
			o.placeholder = {
				element: function element() {

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
				update: function update(container, p) {

					// 1. If a className is set as 'placeholder option, we don't force sizes -
					// the class is responsible for that
					// 2. The option 'forcePlaceholderSize can be enabled to force it even if a
					// class name is specified
					if (className && !o.forcePlaceholderSize) {
						return;
					}

					//If the element doesn't have a actual height by itself (without styles coming
					// from a stylesheet), it receives the inline height from the dragged item
					if (!p.height()) {
						p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop") || 0, 10) - parseInt(that.currentItem.css("paddingBottom") || 0, 10));
					}
					if (!p.width()) {
						p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft") || 0, 10) - parseInt(that.currentItem.css("paddingRight") || 0, 10));
					}
				}
			};
		}

		//Create the placeholder
		that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));

		//Append it after the actual current item
		that.currentItem.after(that.placeholder);

		//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
		o.placeholder.update(that, that.placeholder);
	},

	_createTrPlaceholder: function _createTrPlaceholder(sourceTr, targetTr) {
		var that = this;

		sourceTr.children().each(function () {
			$("<td>&#160;</td>", that.document[0]).attr("colspan", $(this).attr("colspan") || 1).appendTo(targetTr);
		});
	},

	_contactContainers: function _contactContainers(event) {
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

		// Get innermost container that intersects with item
		for (i = this.containers.length - 1; i >= 0; i--) {

			// Never consider a container that's located within the item itself
			if ($.contains(this.currentItem[0], this.containers[i].element[0])) {
				continue;
			}

			if (this._intersectsWith(this.containers[i].containerCache)) {

				// If we've already found a container and it's more "inner" than this, then continue
				if (innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
					continue;
				}

				innermostContainer = this.containers[i];
				innermostIndex = i;
			} else {

				// container doesn't intersect. trigger "out" event if necessary
				if (this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", event, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}
		}

		// If no intersecting containers found, return
		if (!innermostContainer) {
			return;
		}

		// Move the item into the container if it's not there already
		if (this.containers.length === 1) {
			if (!this.containers[innermostIndex].containerCache.over) {
				this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
				this.containers[innermostIndex].containerCache.over = 1;
			}
		} else {

			// When entering a new container, we will find the item with the least distance and
			// append our item near it
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

			//Check if dropOnEmpty is enabled
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

			//Update the placeholder
			this.options.placeholder.update(this.currentContainer, this.placeholder);

			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
			this.containers[innermostIndex].containerCache.over = 1;
		}
	},

	_createHelper: function _createHelper(event) {

		var o = this.options,
		    helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : o.helper === "clone" ? this.currentItem.clone() : this.currentItem;

		//Add the helper to the DOM if that didn't happen already
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

	_adjustOffsetFromHelper: function _adjustOffsetFromHelper(obj) {
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

	_getParentOffset: function _getParentOffset() {

		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the
		// following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the
		// next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
		// the document, which means that the scroll is included in the initial calculation of the
		// offset of the parent, and never recalculated upon drag
		if (this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		// This needs to be actually done for all browsers, since pageX/pageY includes this
		// information with an ugly IE fix
		if (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie) {
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

	_getRelativeOffset: function _getRelativeOffset() {

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

	_cacheMargins: function _cacheMargins() {
		this.margins = {
			left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
			top: parseInt(this.currentItem.css("marginTop"), 10) || 0
		};
	},

	_cacheHelperProportions: function _cacheHelperProportions() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function _setContainment() {

		var ce,
		    co,
		    over,
		    o = this.options;
		if (o.containment === "parent") {
			o.containment = this.helper[0].parentNode;
		}
		if (o.containment === "document" || o.containment === "window") {
			this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, o.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, (o.containment === "document" ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
		}

		if (!/^(document|window|parent)$/.test(o.containment)) {
			ce = $(o.containment)[0];
			co = $(o.containment).offset();
			over = $(ce).css("overflow") !== "hidden";

			this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top];
		}
	},

	_convertPositionTo: function _convertPositionTo(d, pos) {

		if (!pos) {
			pos = this.position;
		}
		var mod = d === "absolute" ? 1 : -1,
		    scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
		    scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);

		return {
			top:

			// The absolute mouse position
			pos.top +

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.top * mod +

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.top * mod - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()) * mod,
			left:

			// The absolute mouse position
			pos.left +

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.left * mod +

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.left * mod - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod
		};
	},

	_generatePosition: function _generatePosition(event) {

		var top,
		    left,
		    o = this.options,
		    pageX = event.pageX,
		    pageY = event.pageY,
		    scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
		    scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);

		// This is another very weird special case that only happens for relative elements:
		// 1. If the css position is relative
		// 2. and the scroll parent is the document or similar to the offset parent
		// we have to refresh the relative offset during the scroll so there are no jumps
		if (this.cssPosition === "relative" && !(this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0])) {
			this.offset.relative = this._getRelativeOffset();
		}

		/*
   * - Position constraining -
   * Constrain the position to a mix of grid, containment.
   */

		if (this.originalPosition) {
			//If we are not dragging yet, we won't check for options

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
				pageY = this.containment ? top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3] ? top : top - this.offset.click.top >= this.containment[1] ? top - o.grid[1] : top + o.grid[1] : top;

				left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2] ? left : left - this.offset.click.left >= this.containment[0] ? left - o.grid[0] : left + o.grid[0] : left;
			}
		}

		return {
			top:

			// The absolute mouse position
			pageY -

			// Click offset (relative to the element)
			this.offset.click.top -

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.top -

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()),
			left:

			// The absolute mouse position
			pageX -

			// Click offset (relative to the element)
			this.offset.click.left -

			// Only for relative positioned nodes: Relative offset from element to offset parent
			this.offset.relative.left -

			// The offsetParent's offset without borders (offset + border)
			this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())
		};
	},

	_rearrange: function _rearrange(event, i, a, hardRefresh) {

		a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], this.direction === "down" ? i.item[0] : i.item[0].nextSibling);

		//Various things done here to improve the performance:
		// 1. we create a setTimeout, that calls refreshPositions
		// 2. on the instance, we have a counter variable, that get's higher after every append
		// 3. on the local scope, we copy the counter variable, and check in the timeout,
		// if it's still the same
		// 4. this lets only the last addition to the timeout stack through
		this.counter = this.counter ? ++this.counter : 1;
		var counter = this.counter;

		this._delay(function () {
			if (counter === this.counter) {

				//Precompute after each DOM insertion, NOT on mousemove
				this.refreshPositions(!hardRefresh);
			}
		});
	},

	_clear: function _clear(event, noPropagation) {

		this.reverting = false;

		// We delay all events that have to be triggered to after the point where the placeholder
		// has been removed and everything else normalized again
		var i,
		    delayedTriggers = [];

		// We first have to update the dom position of the actual currentItem
		// Note: don't do it if the current item is already removed (by a user), or it gets
		// reappended (see #4088)
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
			delayedTriggers.push(function (event) {
				this._trigger("receive", event, this._uiHash(this.fromOutside));
			});
		}
		if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {

			// Trigger update callback if the DOM position has changed
			delayedTriggers.push(function (event) {
				this._trigger("update", event, this._uiHash());
			});
		}

		// Check if the items Container has Changed and trigger appropriate
		// events.
		if (this !== this.currentContainer) {
			if (!noPropagation) {
				delayedTriggers.push(function (event) {
					this._trigger("remove", event, this._uiHash());
				});
				delayedTriggers.push(function (c) {
					return function (event) {
						c._trigger("receive", event, this._uiHash(this));
					};
				}.call(this, this.currentContainer));
				delayedTriggers.push(function (c) {
					return function (event) {
						c._trigger("update", event, this._uiHash(this));
					};
				}.call(this, this.currentContainer));
			}
		}

		//Post events to containers
		function delayEvent(type, instance, container) {
			return function (event) {
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

		//Do what was originally in plugins
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

		//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
		// it unbinds ALL events from the original node!
		this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

		if (!this.cancelHelperRemoval) {
			if (this.helper[0] !== this.currentItem[0]) {
				this.helper.remove();
			}
			this.helper = null;
		}

		if (!noPropagation) {
			for (i = 0; i < delayedTriggers.length; i++) {

				// Trigger all delayed events
				delayedTriggers[i].call(this, event);
			}
			this._trigger("stop", event, this._uiHash());
		}

		this.fromOutside = false;
		return !this.cancelHelperRemoval;
	},

	_trigger: function _trigger() {
		if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
			this.cancel();
		}
	},

	_uiHash: function _uiHash(_inst) {
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

/*!
 * jQuery UI Progressbar 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Progressbar
//>>group: Widgets
// jscs:disable maximumLineLength
//>>description: Displays a status indicator for loading state, standard percentage, and other progress indicators.
// jscs:enable maximumLineLength
//>>docs: http://api.jqueryui.com/progressbar/
//>>demos: http://jqueryui.com/progressbar/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/progressbar.css
//>>css.theme: ../../themes/base/theme.css

widget$1("ui.progressbar", {
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

	_create: function _create() {

		// Constrain initial value
		this.oldValue = this.options.value = this._constrainedValue();

		this.element.attr({

			// Only set static values; aria-valuenow and aria-valuemax are
			// set inside _refreshValue()
			role: "progressbar",
			"aria-valuemin": this.min
		});
		this._addClass("ui-progressbar", "ui-widget ui-widget-content");

		this.valueDiv = $("<div>").appendTo(this.element);
		this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header");
		this._refreshValue();
	},

	_destroy: function _destroy() {
		this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow");

		this.valueDiv.remove();
	},

	value: function value(newValue) {
		if (newValue === undefined) {
			return this.options.value;
		}

		this.options.value = this._constrainedValue(newValue);
		this._refreshValue();
	},

	_constrainedValue: function _constrainedValue(newValue) {
		if (newValue === undefined) {
			newValue = this.options.value;
		}

		this.indeterminate = newValue === false;

		// Sanitize value
		if (typeof newValue !== "number") {
			newValue = 0;
		}

		return this.indeterminate ? false : Math.min(this.options.max, Math.max(this.min, newValue));
	},

	_setOptions: function _setOptions(options) {

		// Ensure "value" option is set after other values (like max)
		var value = options.value;
		delete options.value;

		this._super(options);

		this.options.value = this._constrainedValue(value);
		this._refreshValue();
	},

	_setOption: function _setOption(key, value) {
		if (key === "max") {

			// Don't allow a max less than min
			value = Math.max(this.min, value);
		}
		this._super(key, value);
	},

	_setOptionDisabled: function _setOptionDisabled(value) {
		this._super(value);

		this.element.attr("aria-disabled", value);
		this._toggleClass(null, "ui-state-disabled", !!value);
	},

	_percentage: function _percentage() {
		return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min);
	},

	_refreshValue: function _refreshValue() {
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

/*!
 * jQuery Evol Colorpicker
 */
var _idx = 0;
var isIE = false;
var _ie = isIE ? '-ie' : '';
var isMoz = false;
var history = [];
var int2Hex = function int2Hex(i) {
	var h = i.toString(16);
	if (h.length === 1) {
		h = '0' + h;
	}
	return h;
};
var st2Hex = function st2Hex(s) {
	return int2Hex(Number(s));
};
var toHex3 = function toHex3(c) {
	if (c && c.length > 10) {
		// IE9
		var p1 = 1 + c.indexOf('('),
		    p2 = c.indexOf(')'),
		    cs = c.substring(p1, p2).split(',');
		console.log(cs);
		return ['#', st2Hex(cs[0]), st2Hex(cs[1]), st2Hex(cs[2])].join('');
	} else {
		return c;
	}
};

widget$1("evol.colorpicker", {

	version: '2.1',

	options: {
		color: null, // example default:'#31859B'
		showOn: 'both', // possible values 'focus','button','both'
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

	_create: function _create() {

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
					//console.log(thisgradient);
					this.element.wrap('<span class="gradientpickerwrap"></span>').after('<div class="gradientpicker ' + (this.options.showOn === 'focus' ? '' : 'evo-pointer ') + 'evo-colorind' + (isMoz ? '-ff' : _ie) + '"  style="' + thisgradient + '"></div>');
				} else {
					this.element.wrap('<div class="colorpickerwrap" style="width:' + (this.element.width() + 32) + 'px;' + (isIE ? 'margin-bottom:-21px;' : '') + (isMoz ? 'padding:1px 0;' : '') + '"></div>').after('<div class="colorpickerafter ' + (this.options.showOn === 'focus' ? '' : 'evo-pointer ') + 'evo-colorind' + (isMoz ? '-ff' : _ie) + '" ' + (color !== null ? 'style="background-color:' + color + '"' : '') + '></div>');
				}

				this.element.on('keyup onpaste', function (evt) {
					var thisvalue = $(this).val();
					if (thisvalue !== self.options.color) {
						self._setValue(thisvalue, true);
					}
				});

				var showOn = this.options.showOn;
				if (showOn === 'both' || showOn === 'focus') {
					this.element.on('focus', function () {
						self.showPalette();
					});
				}
				if (showOn === 'both' || showOn === 'button') {
					this.element.next().on('click', function (evt) {
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

	_paletteHTML: function _paletteHTML() {
		var h = [],
		    pIdx = this._paletteIdx = Math.abs(this._paletteIdx),
		    opts = this.options,
		    labels = opts.strings.split(',');
		h.push('<div  class="lecolorpicker evo-pop', _ie, this.options.extraClassnames, '"', this._isPopup ? ' style="position:absolute"' : '', '>');
		// palette
		h.push('<span>', this['_paletteHTML' + pIdx](), '</span>');
		// links
		h.push('<div class="evo-more"><a href="javascript:void(0)">', labels[1 + pIdx], '</a>');

		h.push('</div>');

		h.push('</div>');
		return h.join('');
	},

	_colorIndHTML: function _colorIndHTML(c, fl) {
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

	_paletteHTML1: function _paletteHTML1() {
		var h = [],
		    labels = this.options.strings.split(','),
		    oTD = '<td  class="colorpickersquare" style=" ',
		    cTD = isIE ? '"><div style="width:2px;"></div>' : '"><span>',
		    fTD = '</span></td>',
		    oTRTH = '<tr><th colspan="' + this.options.cols + '" class="ui-widget-content">';
		// base theme colors

		h.push('<table class="evo-palette', _ie, '">', oTRTH, labels[0], '</th></tr>');

		//console.log('subThemeColors',this.options.subThemeColors,this.options);
		// theme colors

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

	getGradient: function getGradient(gradientid) {
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

	showPalette: function showPalette() {
		if (this._enabled) {
			$('.colorPicker').not('.' + this._id).colorpicker('hidePalette');
			if (this._palette === null) {
				this._palette = this.element.next().after(this._paletteHTML()).next().on('click', function (evt) {
					evt.stopPropagation();
				});
				this._bindColors();
				var that = this;
				$(document.body).on('click.' + this._id, function (evt) {
					if (evt.target !== that.element.get(0)) {
						that.hidePalette();
					}
				});
			}
		}
		return this;
	},

	hidePalette: function hidePalette() {
		if (this._isPopup && this._palette) {
			$(document.body).off('click.' + this._id);
			var that = this;
			this._palette.off('mouseover click', 'td').fadeOut(function () {
				that._palette.remove();
				that._palette = that._cTxt = null;
			}).find('.evo-more a').off('click');
		}
		return this;
	},

	_bindColors: function _bindColors() {
		var es = this._palette.find('div.evo-color'),
		    sel = this.options.history ? 'td,.evo-cHist div' : 'td';
		this._cTxt1 = es.eq(0).children().eq(0);
		this._cTxt2 = es.eq(1).children().eq(0);
		var that = this;
		this._palette.on('click', sel, function (evt) {
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
		}).on('mouseover', sel, function (evt) {
			if (that._enabled) {
				var c = toHex3($(this).data('color'));
				if (that.options.displayIndicator) {
					that._setColorInd(c, 2);
				}
				that.element.trigger('mouseover.color', c);
			}
		}).find('.evo-more a').on('click', function () {
			that._switchPalette(this);
		});
	},

	val: function val(value) {
		if (typeof value === 'undefined') {
			return this.options.color;
		} else {
			this._setValue(value);
			return this;
		}
	},

	_setValue: function _setValue(c, noHide) {
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

	_setColorInd: function _setColorInd(c, idx) {
		this['_cTxt' + idx].attr('style', 'background-color:' + c).next().html(c);
	},

	_setOption: function _setOption(key, value) {
		if (key === 'color') {
			this._setValue(value, true);
		} else {
			this.options[key] = value;
		}
	},

	_add2History: function _add2History(c) {
		var iMax = history.length;
		// skip color if already in history
		for (var i = 0; i < iMax; i++) {
			if (c === history[i]) {
				return;
			}
		}
		// limit of 28 colors in history
		if (iMax > 27) {
			history.shift();
		}
		// add to history
		history.push(c);
	},

	enable: function enable() {
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

	disable: function disable() {
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

	isDisabled: function isDisabled() {
		return !this._enabled;
	},

	destroy: function destroy() {
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

Object.defineProperty(exports, '__esModule', { value: true });

})));
