!function(t){function e(e){for(var i,a,s=e[0],c=e[1],l=e[2],h=0,f=[];h<s.length;h++)a=s[h],o[a]&&f.push(o[a][0]),o[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);for(u&&u(e);f.length;)f.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(i=!1)}i&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},o={7:0},r=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;r.push([68,0]),n()}({14:function(t,e,n){"use strict";function i(t,e){t.parentNode.insertBefore(e,t),e.appendChild(t)}function o(){return matchMedia("only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)").matches}n.d(e,"b",function(){return i}),n.d(e,"a",function(){return o})},15:function(t,e,n){
/*!
  * Bootstrap carousel.js v4.2.1 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
t.exports=function(t,e){"use strict";function n(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){i(t,e,n[e])})}return t}t=t&&t.hasOwnProperty("default")?t.default:t,e=e&&e.hasOwnProperty("default")?e.default:e;var r="carousel",a="bs.carousel",s="."+a,c=t.fn[r],l={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},u={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},h={NEXT:"next",PREV:"prev",LEFT:"left",RIGHT:"right"},f={SLIDE:"slide"+s,SLID:"slid"+s,KEYDOWN:"keydown"+s,MOUSEENTER:"mouseenter"+s,MOUSELEAVE:"mouseleave"+s,TOUCHSTART:"touchstart"+s,TOUCHMOVE:"touchmove"+s,TOUCHEND:"touchend"+s,POINTERDOWN:"pointerdown"+s,POINTERUP:"pointerup"+s,DRAG_START:"dragstart"+s,LOAD_DATA_API:"load.bs.carousel.data-api",CLICK_DATA_API:"click.bs.carousel.data-api"},d={CAROUSEL:"carousel",ACTIVE:"active",SLIDE:"slide",RIGHT:"carousel-item-right",LEFT:"carousel-item-left",NEXT:"carousel-item-next",PREV:"carousel-item-prev",ITEM:"carousel-item",POINTER_EVENT:"pointer-event"},p={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",ITEM_IMG:".carousel-item img",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},v={TOUCH:"touch",PEN:"pen"},g=function(){function i(t,e){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(e),this._element=t,this._indicatorsElement=this._element.querySelector(p.INDICATORS),this._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var c=i.prototype;return c.next=function(){this._isSliding||this._slide(h.NEXT)},c.nextWhenVisible=function(){!document.hidden&&t(this._element).is(":visible")&&"hidden"!==t(this._element).css("visibility")&&this.next()},c.prev=function(){this._isSliding||this._slide(h.PREV)},c.pause=function(t){t||(this._isPaused=!0),this._element.querySelector(p.NEXT_PREV)&&(e.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},c.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},c.to=function(e){var n=this;this._activeElement=this._element.querySelector(p.ACTIVE_ITEM);var i=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)t(this._element).one(f.SLID,function(){return n.to(e)});else{if(i===e)return this.pause(),void this.cycle();var o=e>i?h.NEXT:h.PREV;this._slide(o,this._items[e])}},c.dispose=function(){t(this._element).off(s),t.removeData(this._element,a),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},c._getConfig=function(t){return t=o({},l,t),e.typeCheckConfig(r,t,u),t},c._handleSwipe=function(){var t=Math.abs(this.touchDeltaX);if(!(t<=40)){var e=t/this.touchDeltaX;e>0&&this.prev(),e<0&&this.next()}},c._addEventListeners=function(){var e=this;this._config.keyboard&&t(this._element).on(f.KEYDOWN,function(t){return e._keydown(t)}),"hover"===this._config.pause&&t(this._element).on(f.MOUSEENTER,function(t){return e.pause(t)}).on(f.MOUSELEAVE,function(t){return e.cycle(t)}),this._addTouchEventListeners()},c._addTouchEventListeners=function(){var e=this;if(this._touchSupported){var n=function(t){e._pointerEvent&&v[t.originalEvent.pointerType.toUpperCase()]?e.touchStartX=t.originalEvent.clientX:e._pointerEvent||(e.touchStartX=t.originalEvent.touches[0].clientX)},i=function(t){e._pointerEvent&&v[t.originalEvent.pointerType.toUpperCase()]&&(e.touchDeltaX=t.originalEvent.clientX-e.touchStartX),e._handleSwipe(),"hover"===e._config.pause&&(e.pause(),e.touchTimeout&&clearTimeout(e.touchTimeout),e.touchTimeout=setTimeout(function(t){return e.cycle(t)},500+e._config.interval))};t(this._element.querySelectorAll(p.ITEM_IMG)).on(f.DRAG_START,function(t){return t.preventDefault()}),this._pointerEvent?(t(this._element).on(f.POINTERDOWN,function(t){return n(t)}),t(this._element).on(f.POINTERUP,function(t){return i(t)}),this._element.classList.add(d.POINTER_EVENT)):(t(this._element).on(f.TOUCHSTART,function(t){return n(t)}),t(this._element).on(f.TOUCHMOVE,function(t){return function(t){t.originalEvent.touches&&t.originalEvent.touches.length>1?e.touchDeltaX=0:e.touchDeltaX=t.originalEvent.touches[0].clientX-e.touchStartX}(t)}),t(this._element).on(f.TOUCHEND,function(t){return i(t)}))}},c._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next()}},c._getItemIndex=function(t){return this._items=t&&t.parentNode?[].slice.call(t.parentNode.querySelectorAll(p.ITEM)):[],this._items.indexOf(t)},c._getItemByDirection=function(t,e){var n=t===h.NEXT,i=t===h.PREV,o=this._getItemIndex(e),r=this._items.length-1,a=i&&0===o||n&&o===r;if(a&&!this._config.wrap)return e;var s=t===h.PREV?-1:1,c=(o+s)%this._items.length;return-1===c?this._items[this._items.length-1]:this._items[c]},c._triggerSlideEvent=function(e,n){var i=this._getItemIndex(e),o=this._getItemIndex(this._element.querySelector(p.ACTIVE_ITEM)),r=t.Event(f.SLIDE,{relatedTarget:e,direction:n,from:o,to:i});return t(this._element).trigger(r),r},c._setActiveIndicatorElement=function(e){if(this._indicatorsElement){var n=[].slice.call(this._indicatorsElement.querySelectorAll(p.ACTIVE));t(n).removeClass(d.ACTIVE);var i=this._indicatorsElement.children[this._getItemIndex(e)];i&&t(i).addClass(d.ACTIVE)}},c._slide=function(n,i){var o,r,a,s=this,c=this._element.querySelector(p.ACTIVE_ITEM),l=this._getItemIndex(c),u=i||c&&this._getItemByDirection(n,c),v=this._getItemIndex(u),g=Boolean(this._interval);if(n===h.NEXT?(o=d.LEFT,r=d.NEXT,a=h.LEFT):(o=d.RIGHT,r=d.PREV,a=h.RIGHT),u&&t(u).hasClass(d.ACTIVE))this._isSliding=!1;else{var m=this._triggerSlideEvent(u,a);if(!m.isDefaultPrevented()&&c&&u){this._isSliding=!0,g&&this.pause(),this._setActiveIndicatorElement(u);var _=t.Event(f.SLID,{relatedTarget:u,direction:a,from:l,to:v});if(t(this._element).hasClass(d.SLIDE)){t(u).addClass(r),e.reflow(u),t(c).addClass(o),t(u).addClass(o);var y=parseInt(u.getAttribute("data-interval"),10);y?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=y):this._config.interval=this._config.defaultInterval||this._config.interval;var E=e.getTransitionDurationFromElement(c);t(c).one(e.TRANSITION_END,function(){t(u).removeClass(o+" "+r).addClass(d.ACTIVE),t(c).removeClass(d.ACTIVE+" "+r+" "+o),s._isSliding=!1,setTimeout(function(){return t(s._element).trigger(_)},0)}).emulateTransitionEnd(E)}else t(c).removeClass(d.ACTIVE),t(u).addClass(d.ACTIVE),this._isSliding=!1,t(this._element).trigger(_);g&&this.cycle()}}},i._jQueryInterface=function(e){return this.each(function(){var n=t(this).data(a),r=o({},l,t(this).data());"object"==typeof e&&(r=o({},r,e));var s="string"==typeof e?e:r.slide;if(n||(n=new i(this,r),t(this).data(a,n)),"number"==typeof e)n.to(e);else if("string"==typeof s){if(void 0===n[s])throw new TypeError('No method named "'+s+'"');n[s]()}else r.interval&&(n.pause(),n.cycle())})},i._dataApiClickHandler=function(n){var r=e.getSelectorFromElement(this);if(r){var s=t(r)[0];if(s&&t(s).hasClass(d.CAROUSEL)){var c=o({},t(s).data(),t(this).data()),l=this.getAttribute("data-slide-to");l&&(c.interval=!1),i._jQueryInterface.call(t(s),c),l&&t(s).data(a).to(l),n.preventDefault()}}},function(t,e,i){e&&n(t.prototype,e),i&&n(t,i)}(i,null,[{key:"VERSION",get:function(){return"4.2.1"}},{key:"Default",get:function(){return l}}]),i}();return t(document).on(f.CLICK_DATA_API,p.DATA_SLIDE,g._dataApiClickHandler),t(window).on(f.LOAD_DATA_API,function(){for(var e=[].slice.call(document.querySelectorAll(p.DATA_RIDE)),n=0,i=e.length;n<i;n++){var o=t(e[n]);g._jQueryInterface.call(o,o.data())}}),t.fn[r]=g._jQueryInterface,t.fn[r].Constructor=g,t.fn[r].noConflict=function(){return t.fn[r]=c,g._jQueryInterface},g}(n(4),n(20))},37:function(t,e,n){t.exports=n.p+"images/fon/laptop-index-fon.ee27.jpg"},4:function(t,e){t.exports=jQuery},50:function(t,e,n){var i;!function(){function o(t,e,n){return t.call.apply(t.bind,arguments)}function r(t,e,n){if(!t)throw Error();if(2<arguments.length){var i=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,i),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function a(t,e,n){return(a=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?o:r).apply(null,arguments)}var s=Date.now||function(){return+new Date};var c=!!window.FontFace;function l(t,e,n,i){if(e=t.c.createElement(e),n)for(var o in n)n.hasOwnProperty(o)&&("style"==o?e.style.cssText=n[o]:e.setAttribute(o,n[o]));return i&&e.appendChild(t.c.createTextNode(i)),e}function u(t,e,n){(t=t.c.getElementsByTagName(e)[0])||(t=document.documentElement),t.insertBefore(n,t.lastChild)}function h(t){t.parentNode&&t.parentNode.removeChild(t)}function f(t,e,n){e=e||[],n=n||[];for(var i=t.className.split(/\s+/),o=0;o<e.length;o+=1){for(var r=!1,a=0;a<i.length;a+=1)if(e[o]===i[a]){r=!0;break}r||i.push(e[o])}for(e=[],o=0;o<i.length;o+=1){for(r=!1,a=0;a<n.length;a+=1)if(i[o]===n[a]){r=!0;break}r||e.push(i[o])}t.className=e.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function d(t,e){for(var n=t.className.split(/\s+/),i=0,o=n.length;i<o;i++)if(n[i]==e)return!0;return!1}function p(t,e,n){function i(){s&&o&&r&&(s(a),s=null)}e=l(t,"link",{rel:"stylesheet",href:e,media:"all"});var o=!1,r=!0,a=null,s=n||null;c?(e.onload=function(){o=!0,i()},e.onerror=function(){o=!0,a=Error("Stylesheet failed to load"),i()}):setTimeout(function(){o=!0,i()},0),u(t,"head",e)}function v(t,e,n,i){var o=t.c.getElementsByTagName("head")[0];if(o){var r=l(t,"script",{src:e}),a=!1;return r.onload=r.onreadystatechange=function(){a||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(a=!0,n&&n(null),r.onload=r.onreadystatechange=null,"HEAD"==r.parentNode.tagName&&o.removeChild(r))},o.appendChild(r),setTimeout(function(){a||(a=!0,n&&n(Error("Script load timeout")))},i||5e3),r}return null}function g(){this.a=0,this.c=null}function m(t){return t.a++,function(){t.a--,y(t)}}function _(t,e){t.c=e,y(t)}function y(t){0==t.a&&t.c&&(t.c(),t.c=null)}function E(t){this.a=t||"-"}function w(t,e){this.c=t,this.f=4,this.a="n";var n=(e||"n4").match(/^([nio])([1-9])$/i);n&&(this.a=n[1],this.f=parseInt(n[2],10))}function T(t){var e=[];t=t.split(/,\s*/);for(var n=0;n<t.length;n++){var i=t[n].replace(/['"]/g,"");-1!=i.indexOf(" ")||/^\d/.test(i)?e.push("'"+i+"'"):e.push(i)}return e.join(",")}function b(t){return t.a+t.f}function I(t){var e="normal";return"o"===t.a?e="oblique":"i"===t.a&&(e="italic"),e}function S(t){var e=4,n="n",i=null;return t&&((i=t.match(/(normal|oblique|italic)/i))&&i[1]&&(n=i[1].substr(0,1).toLowerCase()),(i=t.match(/([1-9]00|normal|bold)/i))&&i[1]&&(/bold/i.test(i[1])?e=7:/[1-9]00/.test(i[1])&&(e=parseInt(i[1].substr(0,1),10)))),n+e}function A(t){if(t.g){var e=d(t.f,t.a.c("wf","active")),n=[],i=[t.a.c("wf","loading")];e||n.push(t.a.c("wf","inactive")),f(t.f,n,i)}x(t,"inactive")}function x(t,e,n){t.j&&t.h[e]&&(n?t.h[e](n.c,b(n)):t.h[e]())}function C(t,e){this.c=t,this.f=e,this.a=l(this.c,"span",{"aria-hidden":"true"},this.f)}function O(t){u(t.c,"body",t.a)}function j(t){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+T(t.c)+";font-style:"+I(t)+";font-weight:"+t.f+"00;"}function D(t,e,n,i,o,r){this.g=t,this.j=e,this.a=i,this.c=n,this.f=o||3e3,this.h=r||void 0}function P(t,e,n,i,o,r,a){this.v=t,this.B=e,this.c=n,this.a=i,this.s=a||"BESbswy",this.f={},this.w=o||3e3,this.u=r||null,this.m=this.j=this.h=this.g=null,this.g=new C(this.c,this.s),this.h=new C(this.c,this.s),this.j=new C(this.c,this.s),this.m=new C(this.c,this.s),t=j(t=new w(this.a.c+",serif",b(this.a))),this.g.a.style.cssText=t,t=j(t=new w(this.a.c+",sans-serif",b(this.a))),this.h.a.style.cssText=t,t=j(t=new w("serif",b(this.a))),this.j.a.style.cssText=t,t=j(t=new w("sans-serif",b(this.a))),this.m.a.style.cssText=t,O(this.g),O(this.h),O(this.j),O(this.m)}E.prototype.c=function(t){for(var e=[],n=0;n<arguments.length;n++)e.push(arguments[n].replace(/[\W_]+/g,"").toLowerCase());return e.join(this.a)},D.prototype.start=function(){var t=this.c.o.document,e=this,n=s(),i=new Promise(function(i,o){!function r(){s()-n>=e.f?o():t.fonts.load(function(t){return I(t)+" "+t.f+"00 300px "+T(t.c)}(e.a),e.h).then(function(t){1<=t.length?i():setTimeout(r,25)},function(){o()})}()}),o=null,r=new Promise(function(t,n){o=setTimeout(n,e.f)});Promise.race([r,i]).then(function(){o&&(clearTimeout(o),o=null),e.g(e.a)},function(){e.j(e.a)})};var N={D:"serif",C:"sans-serif"},k=null;function R(){if(null===k){var t=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);k=!!t&&(536>parseInt(t[1],10)||536===parseInt(t[1],10)&&11>=parseInt(t[2],10))}return k}function L(t,e,n){for(var i in N)if(N.hasOwnProperty(i)&&e===t.f[N[i]]&&n===t.f[N[i]])return!0;return!1}function V(t){var e,n=t.g.a.offsetWidth,i=t.h.a.offsetWidth;(e=n===t.f.serif&&i===t.f["sans-serif"])||(e=R()&&L(t,n,i)),e?s()-t.A>=t.w?R()&&L(t,n,i)&&(null===t.u||t.u.hasOwnProperty(t.a.c))?M(t,t.v):M(t,t.B):function(t){setTimeout(a(function(){V(this)},t),50)}(t):M(t,t.v)}function M(t,e){setTimeout(a(function(){h(this.g.a),h(this.h.a),h(this.j.a),h(this.m.a),e(this.a)},t),0)}function X(t,e,n){this.c=t,this.a=e,this.f=0,this.m=this.j=!1,this.s=n}P.prototype.start=function(){this.f.serif=this.j.a.offsetWidth,this.f["sans-serif"]=this.m.a.offsetWidth,this.A=s(),V(this)};var U=null;function H(t){0==--t.f&&t.j&&(t.m?((t=t.a).g&&f(t.f,[t.a.c("wf","active")],[t.a.c("wf","loading"),t.a.c("wf","inactive")]),x(t,"active")):A(t.a))}function W(t){this.j=t,this.a=new function(){this.c={}},this.h=0,this.f=this.g=!0}function F(t,e,n,i,o){var r=0==--t.h;(t.f||t.g)&&setTimeout(function(){var t=o||null,s=i||{};if(0===n.length&&r)A(e.a);else{e.f+=n.length,r&&(e.j=r);var c,l=[];for(c=0;c<n.length;c++){var u=n[c],h=s[u.c],d=e.a,p=u;if(d.g&&f(d.f,[d.a.c("wf",p.c,b(p).toString(),"loading")]),x(d,"fontloading",p),d=null,null===U)if(window.FontFace){p=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent);var v=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);U=p?42<parseInt(p[1],10):!v}else U=!1;d=U?new D(a(e.g,e),a(e.h,e),e.c,u,e.s,h):new P(a(e.g,e),a(e.h,e),e.c,u,e.s,t,h),l.push(d)}for(c=0;c<l.length;c++)l[c].start()}},0)}function q(t,e){this.c=t,this.a=e}function B(t,e){this.c=t,this.a=e}X.prototype.g=function(t){var e=this.a;e.g&&f(e.f,[e.a.c("wf",t.c,b(t).toString(),"active")],[e.a.c("wf",t.c,b(t).toString(),"loading"),e.a.c("wf",t.c,b(t).toString(),"inactive")]),x(e,"fontactive",t),this.m=!0,H(this)},X.prototype.h=function(t){var e=this.a;if(e.g){var n=d(e.f,e.a.c("wf",t.c,b(t).toString(),"active")),i=[],o=[e.a.c("wf",t.c,b(t).toString(),"loading")];n||i.push(e.a.c("wf",t.c,b(t).toString(),"inactive")),f(e.f,i,o)}x(e,"fontinactive",t),H(this)},W.prototype.load=function(t){this.c=new function(t,e){this.a=t,this.o=e||t,this.c=this.o.document}(this.j,t.context||this.j),this.g=!1!==t.events,this.f=!1!==t.classes,function(t,e,n){var i=[],o=n.timeout;!function(t){t.g&&f(t.f,[t.a.c("wf","loading")]),x(t,"loading")}(e);var i=function(t,e,n){var i,o=[];for(i in e)if(e.hasOwnProperty(i)){var r=t.c[i];r&&o.push(r(e[i],n))}return o}(t.a,n,t.c),r=new X(t.c,e,o);for(t.h=i.length,e=0,n=i.length;e<n;e++)i[e].load(function(e,n,i){F(t,r,e,n,i)})}(this,new function(t,e){this.c=t,this.f=t.o.document.documentElement,this.h=e,this.a=new E("-"),this.j=!1!==e.events,this.g=!1!==e.classes}(this.c,t),t)},q.prototype.load=function(t){var e=this,n=e.a.projectId,i=e.a.version;if(n){var o=e.c.o;v(this.c,(e.a.api||"https://fast.fonts.net/jsapi")+"/"+n+".js"+(i?"?v="+i:""),function(i){i?t([]):(o["__MonotypeConfiguration__"+n]=function(){return e.a},function e(){if(o["__mti_fntLst"+n]){var i,r=o["__mti_fntLst"+n](),a=[];if(r)for(var s=0;s<r.length;s++){var c=r[s].fontfamily;void 0!=r[s].fontStyle&&void 0!=r[s].fontWeight?(i=r[s].fontStyle+r[s].fontWeight,a.push(new w(c,i))):a.push(new w(c))}t(a)}else setTimeout(function(){e()},50)}())}).id="__MonotypeAPIScript__"+n}else t([])},B.prototype.load=function(t){var e,n,i=this.a.urls||[],o=this.a.families||[],r=this.a.testStrings||{},a=new g;for(e=0,n=i.length;e<n;e++)p(this.c,i[e],m(a));var s=[];for(e=0,n=o.length;e<n;e++)if((i=o[e].split(":"))[1])for(var c=i[1].split(","),l=0;l<c.length;l+=1)s.push(new w(i[0],c[l]));else s.push(new w(i[0]));_(a,function(){t(s,r)})};var G="https://fonts.googleapis.com/css";var Q={latin:"BESbswy","latin-ext":"çöüğş",cyrillic:"йяЖ",greek:"αβΣ",khmer:"កខគ",Hanuman:"កខគ"},K={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},$={i:"i",italic:"i",n:"n",normal:"n"},z=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;function J(t,e){this.c=t,this.a=e}var Y={Arimo:!0,Cousine:!0,Tinos:!0};function Z(t,e){this.c=t,this.a=e}function tt(t,e){this.c=t,this.f=e,this.a=[]}J.prototype.load=function(t){var e=new g,n=this.c,i=new function(t,e){this.c=t||G,this.a=[],this.f=[],this.g=e||""}(this.a.api,this.a.text),o=this.a.families;!function(t,e){for(var n=e.length,i=0;i<n;i++){var o=e[i].split(":");3==o.length&&t.f.push(o.pop());var r="";2==o.length&&""!=o[1]&&(r=":"),t.a.push(o.join(r))}}(i,o);var r=new function(t){this.f=t,this.a=[],this.c={}}(o);!function(t){for(var e=t.f.length,n=0;n<e;n++){var i=t.f[n].split(":"),o=i[0].replace(/\+/g," "),r=["n4"];if(2<=i.length){var a;if(a=[],s=i[1])for(var s,c=(s=s.split(",")).length,l=0;l<c;l++){var u;if((u=s[l]).match(/^[\w-]+$/))if(null==(f=z.exec(u.toLowerCase())))u="";else{if(u=null==(u=f[2])||""==u?"n":$[u],null==(f=f[1])||""==f)f="4";else var h=K[f],f=h||(isNaN(f)?"4":f.substr(0,1));u=[u,f].join("")}else u="";u&&a.push(u)}0<a.length&&(r=a),3==i.length&&(a=[],0<(i=(i=i[2])?i.split(","):a).length&&(i=Q[i[0]])&&(t.c[o]=i))}for(t.c[o]||(i=Q[o])&&(t.c[o]=i),i=0;i<r.length;i+=1)t.a.push(new w(o,r[i]))}}(r),p(n,function(t){if(0==t.a.length)throw Error("No fonts to load!");if(-1!=t.c.indexOf("kit="))return t.c;for(var e=t.a.length,n=[],i=0;i<e;i++)n.push(t.a[i].replace(/ /g,"+"));return e=t.c+"?family="+n.join("%7C"),0<t.f.length&&(e+="&subset="+t.f.join(",")),0<t.g.length&&(e+="&text="+encodeURIComponent(t.g)),e}(i),m(e)),_(e,function(){t(r.a,r.c,Y)})},Z.prototype.load=function(t){var e=this.a.id,n=this.c.o;e?v(this.c,(this.a.api||"https://use.typekit.net")+"/"+e+".js",function(e){if(e)t([]);else if(n.Typekit&&n.Typekit.config&&n.Typekit.config.fn){e=n.Typekit.config.fn;for(var i=[],o=0;o<e.length;o+=2)for(var r=e[o],a=e[o+1],s=0;s<a.length;s++)i.push(new w(r,a[s]));try{n.Typekit.load({events:!1,classes:!1,async:!0})}catch(t){}t(i)}},2e3):t([])},tt.prototype.load=function(t){var e=this.f.id,n=this.c.o,i=this;e?(n.__webfontfontdeckmodule__||(n.__webfontfontdeckmodule__={}),n.__webfontfontdeckmodule__[e]=function(e,n){for(var o=0,r=n.fonts.length;o<r;++o){var a=n.fonts[o];i.a.push(new w(a.name,S("font-weight:"+a.weight+";font-style:"+a.style)))}t(i.a)},v(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+function(t){return t.o.location.hostname||t.a.location.hostname}(this.c)+"/"+e+".js",function(e){e&&t([])})):t([])};var et=new W(window);et.a.c.custom=function(t,e){return new B(e,t)},et.a.c.fontdeck=function(t,e){return new tt(e,t)},et.a.c.monotype=function(t,e){return new q(e,t)},et.a.c.typekit=function(t,e){return new Z(e,t)},et.a.c.google=function(t,e){return new J(e,t)};var nt={load:a(et.load,et)};void 0===(i=function(){return nt}.call(e,n,e,t))||(t.exports=i)}()},64:function(t,e,n){t.exports=n.p+"images/fon/mobile-index-fon.e1d7.jpg"},65:function(t,e,n){t.exports=n.p+"images/fon/mobile-index-fon@2x.cc10.jpg"},68:function(t,e,n){"use strict";n.r(e);n(5),n(6),n(15);var i=n(50),o=n.n(i),r=n(11),a=(n(7),n(9),n(8),n(14)),s=(n(71),n(64)),c=n.n(s),l=n(65),u=n.n(l),h=n(37),f=n.n(h),d=window.matchMedia("(max-width: 991px)");o.a.load({custom:{families:["hercules_modern"]}}),jQuery.noConflict(),jQuery(document).ready(function(t){var e=t("#wrapper");function n(){if(d.matches){var t=new Image;Object(a.a)()?t.src=u.a:t.src=c.a,t.onload=function(){e.css({backgroundImage:"url(".concat(t.src,")")})}}if(!d.matches){var n=new Image;Object(a.a)(),n.src=f.a,n.onload=function(){var t=document.querySelectorAll(".caption h1 div span");Object(r.defer)(function(){e.css({backgroundImage:"url(".concat(n.src,")")})}),Object(r.each)(t,function(t){Object(r.defer)(function(){t.classList.add("in-up-animation")})})}}}d.addListener(n),n()})},71:function(t,e,n){}});