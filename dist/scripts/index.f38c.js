!function(e){function t(t){for(var i,s,a=t[0],l=t[1],u=t[2],h=0,f=[];h<a.length;h++)s=a[h],r[s]&&f.push(r[s][0]),r[s]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);for(c&&c(t);f.length;)f.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,a=1;a<n.length;a++){var l=n[a];0!==r[l]&&(i=!1)}i&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},r={7:0},o=[];function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var c=l;o.push([71,0]),n()}({17:function(e,t,n){
/*!
  * Bootstrap carousel.js v4.2.1 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
e.exports=function(e,t){"use strict";function n(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){i(e,t,n[t])})}return e}e=e&&e.hasOwnProperty("default")?e.default:e,t=t&&t.hasOwnProperty("default")?t.default:t;var o="carousel",s="bs.carousel",a="."+s,l=e.fn[o],u={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},c={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},h={NEXT:"next",PREV:"prev",LEFT:"left",RIGHT:"right"},f={SLIDE:"slide"+a,SLID:"slid"+a,KEYDOWN:"keydown"+a,MOUSEENTER:"mouseenter"+a,MOUSELEAVE:"mouseleave"+a,TOUCHSTART:"touchstart"+a,TOUCHMOVE:"touchmove"+a,TOUCHEND:"touchend"+a,POINTERDOWN:"pointerdown"+a,POINTERUP:"pointerup"+a,DRAG_START:"dragstart"+a,LOAD_DATA_API:"load.bs.carousel.data-api",CLICK_DATA_API:"click.bs.carousel.data-api"},d={CAROUSEL:"carousel",ACTIVE:"active",SLIDE:"slide",RIGHT:"carousel-item-right",LEFT:"carousel-item-left",NEXT:"carousel-item-next",PREV:"carousel-item-prev",ITEM:"carousel-item",POINTER_EVENT:"pointer-event"},_={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",ITEM_IMG:".carousel-item img",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},v={TOUCH:"touch",PEN:"pen"},m=function(){function i(e,t){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(t),this._element=e,this._indicatorsElement=this._element.querySelector(_.INDICATORS),this._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var l=i.prototype;return l.next=function(){this._isSliding||this._slide(h.NEXT)},l.nextWhenVisible=function(){!document.hidden&&e(this._element).is(":visible")&&"hidden"!==e(this._element).css("visibility")&&this.next()},l.prev=function(){this._isSliding||this._slide(h.PREV)},l.pause=function(e){e||(this._isPaused=!0),this._element.querySelector(_.NEXT_PREV)&&(t.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},l.cycle=function(e){e||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},l.to=function(t){var n=this;this._activeElement=this._element.querySelector(_.ACTIVE_ITEM);var i=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)e(this._element).one(f.SLID,function(){return n.to(t)});else{if(i===t)return this.pause(),void this.cycle();var r=t>i?h.NEXT:h.PREV;this._slide(r,this._items[t])}},l.dispose=function(){e(this._element).off(a),e.removeData(this._element,s),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},l._getConfig=function(e){return e=r({},u,e),t.typeCheckConfig(o,e,c),e},l._handleSwipe=function(){var e=Math.abs(this.touchDeltaX);if(!(e<=40)){var t=e/this.touchDeltaX;t>0&&this.prev(),t<0&&this.next()}},l._addEventListeners=function(){var t=this;this._config.keyboard&&e(this._element).on(f.KEYDOWN,function(e){return t._keydown(e)}),"hover"===this._config.pause&&e(this._element).on(f.MOUSEENTER,function(e){return t.pause(e)}).on(f.MOUSELEAVE,function(e){return t.cycle(e)}),this._addTouchEventListeners()},l._addTouchEventListeners=function(){var t=this;if(this._touchSupported){var n=function(e){t._pointerEvent&&v[e.originalEvent.pointerType.toUpperCase()]?t.touchStartX=e.originalEvent.clientX:t._pointerEvent||(t.touchStartX=e.originalEvent.touches[0].clientX)},i=function(e){t._pointerEvent&&v[e.originalEvent.pointerType.toUpperCase()]&&(t.touchDeltaX=e.originalEvent.clientX-t.touchStartX),t._handleSwipe(),"hover"===t._config.pause&&(t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout(function(e){return t.cycle(e)},500+t._config.interval))};e(this._element.querySelectorAll(_.ITEM_IMG)).on(f.DRAG_START,function(e){return e.preventDefault()}),this._pointerEvent?(e(this._element).on(f.POINTERDOWN,function(e){return n(e)}),e(this._element).on(f.POINTERUP,function(e){return i(e)}),this._element.classList.add(d.POINTER_EVENT)):(e(this._element).on(f.TOUCHSTART,function(e){return n(e)}),e(this._element).on(f.TOUCHMOVE,function(e){return function(e){e.originalEvent.touches&&e.originalEvent.touches.length>1?t.touchDeltaX=0:t.touchDeltaX=e.originalEvent.touches[0].clientX-t.touchStartX}(e)}),e(this._element).on(f.TOUCHEND,function(e){return i(e)}))}},l._keydown=function(e){if(!/input|textarea/i.test(e.target.tagName))switch(e.which){case 37:e.preventDefault(),this.prev();break;case 39:e.preventDefault(),this.next()}},l._getItemIndex=function(e){return this._items=e&&e.parentNode?[].slice.call(e.parentNode.querySelectorAll(_.ITEM)):[],this._items.indexOf(e)},l._getItemByDirection=function(e,t){var n=e===h.NEXT,i=e===h.PREV,r=this._getItemIndex(t),o=this._items.length-1,s=i&&0===r||n&&r===o;if(s&&!this._config.wrap)return t;var a=e===h.PREV?-1:1,l=(r+a)%this._items.length;return-1===l?this._items[this._items.length-1]:this._items[l]},l._triggerSlideEvent=function(t,n){var i=this._getItemIndex(t),r=this._getItemIndex(this._element.querySelector(_.ACTIVE_ITEM)),o=e.Event(f.SLIDE,{relatedTarget:t,direction:n,from:r,to:i});return e(this._element).trigger(o),o},l._setActiveIndicatorElement=function(t){if(this._indicatorsElement){var n=[].slice.call(this._indicatorsElement.querySelectorAll(_.ACTIVE));e(n).removeClass(d.ACTIVE);var i=this._indicatorsElement.children[this._getItemIndex(t)];i&&e(i).addClass(d.ACTIVE)}},l._slide=function(n,i){var r,o,s,a=this,l=this._element.querySelector(_.ACTIVE_ITEM),u=this._getItemIndex(l),c=i||l&&this._getItemByDirection(n,l),v=this._getItemIndex(c),m=Boolean(this._interval);if(n===h.NEXT?(r=d.LEFT,o=d.NEXT,s=h.LEFT):(r=d.RIGHT,o=d.PREV,s=h.RIGHT),c&&e(c).hasClass(d.ACTIVE))this._isSliding=!1;else{var E=this._triggerSlideEvent(c,s);if(!E.isDefaultPrevented()&&l&&c){this._isSliding=!0,m&&this.pause(),this._setActiveIndicatorElement(c);var p=e.Event(f.SLID,{relatedTarget:c,direction:s,from:u,to:v});if(e(this._element).hasClass(d.SLIDE)){e(c).addClass(o),t.reflow(c),e(l).addClass(r),e(c).addClass(r);var g=parseInt(c.getAttribute("data-interval"),10);g?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=g):this._config.interval=this._config.defaultInterval||this._config.interval;var T=t.getTransitionDurationFromElement(l);e(l).one(t.TRANSITION_END,function(){e(c).removeClass(r+" "+o).addClass(d.ACTIVE),e(l).removeClass(d.ACTIVE+" "+o+" "+r),a._isSliding=!1,setTimeout(function(){return e(a._element).trigger(p)},0)}).emulateTransitionEnd(T)}else e(l).removeClass(d.ACTIVE),e(c).addClass(d.ACTIVE),this._isSliding=!1,e(this._element).trigger(p);m&&this.cycle()}}},i._jQueryInterface=function(t){return this.each(function(){var n=e(this).data(s),o=r({},u,e(this).data());"object"==typeof t&&(o=r({},o,t));var a="string"==typeof t?t:o.slide;if(n||(n=new i(this,o),e(this).data(s,n)),"number"==typeof t)n.to(t);else if("string"==typeof a){if(void 0===n[a])throw new TypeError('No method named "'+a+'"');n[a]()}else o.interval&&(n.pause(),n.cycle())})},i._dataApiClickHandler=function(n){var o=t.getSelectorFromElement(this);if(o){var a=e(o)[0];if(a&&e(a).hasClass(d.CAROUSEL)){var l=r({},e(a).data(),e(this).data()),u=this.getAttribute("data-slide-to");u&&(l.interval=!1),i._jQueryInterface.call(e(a),l),u&&e(a).data(s).to(u),n.preventDefault()}}},function(e,t,i){t&&n(e.prototype,t),i&&n(e,i)}(i,null,[{key:"VERSION",get:function(){return"4.2.1"}},{key:"Default",get:function(){return u}}]),i}();return e(document).on(f.CLICK_DATA_API,_.DATA_SLIDE,m._dataApiClickHandler),e(window).on(f.LOAD_DATA_API,function(){for(var t=[].slice.call(document.querySelectorAll(_.DATA_RIDE)),n=0,i=t.length;n<i;n++){var r=e(t[n]);m._jQueryInterface.call(r,r.data())}}),e.fn[o]=m._jQueryInterface,e.fn[o].Constructor=m,e.fn[o].noConflict=function(){return e.fn[o]=l,m._jQueryInterface},m}(n(7),n(24))},41:function(e,t,n){e.exports=n.p+"images/fon/laptop-index-fon.ee27.jpg"},67:function(e,t,n){e.exports=n.p+"images/fon/mobile-index-fon.e1d7.jpg"},68:function(e,t,n){e.exports=n.p+"images/fon/mobile-index-fon@2x.cc10.jpg"},7:function(e,t){e.exports=jQuery},71:function(e,t,n){"use strict";n.r(t);n(8),n(9),n(17),n(2),n(10),n(12),n(11);var i=n(16),r=(n(76),n(67)),o=n.n(r),s=n(68),a=n.n(s),l=n(41),u=n.n(l);jQuery.noConflict(),jQuery(document).ready(function(e){var t=window.matchMedia("(max-width: 991px)"),n=e("#wrapper");function r(){if(t.matches){var e=new Image;Object(i.a)()?e.src=a.a:e.src=o.a,e.onload=function(){n.css({backgroundImage:"url(".concat(e.src,")")})}}if(!t.matches){var r=new Image;Object(i.a)(),r.src=u.a,r.onload=function(){n.css({backgroundImage:"url(".concat(r.src,")")})}}}t.addListener(r),r()})},76:function(e,t,n){}});