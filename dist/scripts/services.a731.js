!function(t){function e(e){for(var r,i,u=e[0],l=e[1],c=e[2],s=0,d=[];s<u.length;s++)i=u[s],a[i]&&d.push(a[i][0]),a[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);for(f&&f(e);d.length;)d.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,u=1;u<n.length;u++){var l=n[u];0!==a[l]&&(r=!1)}r&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={11:0},o=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var u=window.webpackJsonp=window.webpackJsonp||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var c=0;c<u.length;c++)e(u[c]);var f=l;o.push([75,0]),n()}({2:function(t,e,n){t.exports=n.p+"images/fon/laptop-common-fon.0cd6.jpg"},3:function(t,e,n){t.exports=n.p+"images/fon/mobile-common-fon.32c2.jpg"},30:function(t,e){!function(t,e){"use strict";var n=t.jQuery||t.Zepto,r=0,a=!1;function o(r,o,i,u,l){var c=0,f=-1,s=-1,d=!1,m="afterLoad",p="load",b="error",g="img",h="src",A="srcset",v="sizes",y="background-image";function w(){d=t.devicePixelRatio>1,i=j(i),o.delay>=0&&setTimeout(function(){O(!0)},o.delay),(o.delay<0||o.combined)&&(u.e=function(t,e){var n,a=0;return function(i,u){var l=+new Date-a;function c(){a=+new Date,e.call(r,i)}n&&clearTimeout(n),l>t||!o.enableThrottle||u?c():n=setTimeout(c,t-l)}}(o.throttle,function(t){"resize"===t.type&&(f=s=-1),O(t.all)}),u.a=function(t){t=j(t),i.push.apply(i,t)},u.g=function(){return i=n(i).filter(function(){return!n(this).data(o.loadedName)})},u.f=function(t){for(var e=0;e<t.length;e++){var n=i.filter(function(){return this===t[e]});n.length&&O(!1,n)}},O(),n(o.appendScroll).on("scroll."+l+" resize."+l,u.e))}function j(t){for(var a=o.defaultImage,i=o.placeholder,u=o.imageBase,l=o.srcsetAttribute,c=o.loaderAttribute,f=o._f||{},s=0,d=(t=n(t).filter(function(){var t=n(this),r=B(this);return!t.data(o.handledName)&&(t.attr(o.attribute)||t.attr(l)||t.attr(c)||f[r]!==e)}).data("plugin_"+o.name,r)).length;s<d;s++){var m=n(t[s]),p=B(t[s]),b=m.attr(o.imageBaseAttribute)||u;p===g&&b&&m.attr(l)&&m.attr(l,x(m.attr(l),b)),f[p]===e||m.attr(c)||m.attr(c,f[p]),p===g&&a&&!m.attr(h)?m.attr(h,a):p===g||!i||m.css(y)&&"none"!==m.css(y)||m.css(y,"url('"+i+"')")}return t}function O(t,e){if(i.length){for(var a=e||i,u=!1,l=o.imageBase||"",c=o.srcsetAttribute,f=o.handledName,s=0;s<a.length;s++)if(t||e||L(a[s])){var d=n(a[s]),m=B(a[s]),p=d.attr(o.attribute),b=d.attr(o.imageBaseAttribute)||l,v=d.attr(o.loaderAttribute);d.data(f)||o.visibleOnly&&!d.is(":visible")||!((p||d.attr(c))&&(m===g&&(b+p!==d.attr(h)||d.attr(c)!==d.attr(A))||m!==g&&b+p!==d.css(y))||v)||(u=!0,d.data(f,!0),z(d,m,b,v))}u&&(i=n(i).filter(function(){return!n(this).data(f)}))}else o.autoDestroy&&r.destroy()}function z(t,e,r,a){++c;var i=function(){_("onError",t),T(),i=n.noop};_("beforeLoad",t);var u=o.attribute,l=o.srcsetAttribute,f=o.sizesAttribute,s=o.retinaAttribute,w=o.removeAttribute,j=o.loadedName,O=t.attr(s);if(a){var z=function(){w&&t.removeAttr(o.loaderAttribute),t.data(j,!0),_(m,t),setTimeout(T,1),z=n.noop};t.off(b).one(b,i).one(p,z),_(a,t,function(e){e?(t.off(p),z()):(t.off(b),i())})||t.trigger(b)}else{var L=n(new Image);L.one(b,i).one(p,function(){t.hide(),e===g?t.attr(v,L.attr(v)).attr(A,L.attr(A)).attr(h,L.attr(h)):t.css(y,"url('"+L.attr(h)+"')"),t[o.effect](o.effectTime),w&&(t.removeAttr(u+" "+l+" "+s+" "+o.imageBaseAttribute),f!==v&&t.removeAttr(f)),t.data(j,!0),_(m,t),L.remove(),T()});var B=(d&&O?O:t.attr(u))||"";L.attr(v,t.attr(f)).attr(A,t.attr(l)).attr(h,B?r+B:null),L.complete&&L.trigger(p)}}function L(e){var r=e.getBoundingClientRect(),a=o.scrollDirection,i=o.threshold,u=(s>=0?s:s=n(t).height())+i>r.top&&-i<r.bottom,l=(f>=0?f:f=n(t).width())+i>r.left&&-i<r.right;return"vertical"===a?u:"horizontal"===a?l:u&&l}function B(t){return t.tagName.toLowerCase()}function x(t,e){if(e){var n=t.split(",");t="";for(var r=0,a=n.length;r<a;r++)t+=e+n[r].trim()+(r!==a-1?",":"")}return t}function T(){--c,i.length||c||_("onFinishedAll")}function _(t,e,n){return!!(t=o[t])&&(t.apply(r,[].slice.call(arguments,1)),!0)}"event"===o.bind||a?w():n(t).on(p+"."+l,w)}function i(a,i){var u=this,l=n.extend({},u.config,i),c={},f=l.name+"-"+ ++r;return u.config=function(t,n){return n===e?l[t]:(l[t]=n,u)},u.addItems=function(t){return c.a&&c.a("string"===n.type(t)?n(t):t),u},u.getItems=function(){return c.g?c.g():{}},u.update=function(t){return c.e&&c.e({},!t),u},u.force=function(t){return c.f&&c.f("string"===n.type(t)?n(t):t),u},u.loadAll=function(){return c.e&&c.e({all:!0},!0),u},u.destroy=function(){return n(l.appendScroll).off("."+f,c.e),n(t).off("."+f),c={},e},o(u,l,a,c,f),l.chainable?a:u}n.fn.Lazy=n.fn.lazy=function(t){return new i(this,t)},n.Lazy=n.lazy=function(t,r,a){if(n.isFunction(r)&&(a=r,r=[]),n.isFunction(a)){t=n.isArray(t)?t:[t],r=n.isArray(r)?r:[r];for(var o=i.prototype.config,u=o._f||(o._f={}),l=0,c=t.length;l<c;l++)(o[t[l]]===e||n.isFunction(o[t[l]]))&&(o[t[l]]=a);for(var f=0,s=r.length;f<s;f++)u[r[f]]=t[0]}},i.prototype.config={name:"lazy",chainable:!0,autoDestroy:!0,bind:"load",threshold:500,visibleOnly:!1,appendScroll:t,scrollDirection:"both",imageBase:null,defaultImage:"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",placeholder:null,delay:-1,combined:!1,attribute:"data-src",srcsetAttribute:"data-srcset",sizesAttribute:"data-sizes",retinaAttribute:"data-retina",loaderAttribute:"data-loader",imageBaseAttribute:"data-imagebase",removeAttribute:!0,handledName:"handled",loadedName:"loaded",effect:"show",effectTime:0,enableThrottle:!0,throttle:250,beforeLoad:e,afterLoad:e,onError:e,onFinishedAll:e},n(t).on("load",function(){a=!0})}(window)},4:function(t,e,n){"use strict";var r=n(0),a=n(1),o=n(2),i=n.n(o),u=n(3),l=n.n(u);document.addEventListener("DOMContentLoaded",function(){function t(){if(a.b.matches){var t=new Image;t.src=l.a,t.onload=function(){Object(r.defer)(function(){document.documentElement.classList.add("fon-loaded")})}}if(!a.b.matches){var e=new Image;e.src=i.a,e.onload=function(){Object(r.defer)(function(){document.documentElement.classList.add("fon-loaded")})}}}a.b.addListener(t),t()})},5:function(t,e){t.exports=jQuery},75:function(t,e,n){"use strict";n.r(e);n(6),n(7),n(30),n(8),n(10),n(4),n(9),n(76);jQuery.noConflict(),jQuery(document).ready(function(t){t(".lazy").Lazy()})},76:function(t,e,n){}});