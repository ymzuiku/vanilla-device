!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).vanillaDevice={})}(this,function(e){"use strict";function t(){return window.innerWidth}function n(){return window.innerHeight}function o(){return/(?:Android)/.test(b)}function i(){return/(?:Firefox)/.test(b)}function r(){return/(?:iPad|PlayBook)/.test(b)||o()&&!/(?:Mobile)/.test(b)||i()&&/(?:Tablet)/.test(b)}function u(){return/(?:iPhone)/.test(b)&&!r()}function c(){return/MicroMessenger/.test(b)}function s(){return!u()&&!o()}function a(){return/iphone/gi.test(window.navigator.userAgent)&&g&&3===g&&375===t()&&812===n()}function l(){return/iphone/gi.test(window.navigator.userAgent)&&g&&3===g&&414===t()&&896===n()}function d(){return 1<g?.5:1}function f(){return 1<g?.65:1}function m(){return a()||l()}function v(){return 0<=window.location.href.indexOf("_os_ios_")}function w(){return 0<=window.location.href.indexOf("_os_android_")}function h(){return v()||w()||window.cordova||!1}function _(){return h()?m()?43:20:0}function p(){return(h()||c())&&m()?25:0}var b=navigator.userAgent,g=window.devicePixelRatio||1,y="__device-style-ele__";function x(){var e="\n    :root {--safe-top:"+_()+"px; --safe-bottom:"+p()+"px; --hair:"+d()+"px; --line:"+f()+"px;}\n    body {height:"+window.innerHeight+"px;}\n  ",t=document.getElementById(y);if(t)t.textContent=e;else{var n=document.createElement("style");n.textContent=e,n.id=y,document.head.append(n)}}var E=null;window.addEventListener("resize",function(){E&&(clearTimeout(E),E=null),setTimeout(x,30)}),x();e.hair=d,e.ih=n,e.isAndroid=o,e.isChrome=function(){return/(?:Chrome|CriOS)/.test(b)},e.isExtraLarge=function(){return 1<g?t()<=640:t()<=1280},e.isFireFox=i,e.isIPhoneX=a,e.isIPhoneXMax=l,e.isIos=u,e.isLarge=function(){return 1<g?t()<=512:t()<=1024},e.isLow=function(){return!1},e.isMiddle=function(){return 1<g?t()<=375:t()<=750},e.isNative=h,e.isNativeAndroid=w,e.isNativeIOS=v,e.isNeedIPhoneSafe=m,e.isPc=s,e.isSmall=function(){return 1<g?t()<=320:t()<=640},e.isTablet=r,e.isWechat=c,e.iw=t,e.line=f,e.safeBottom=p,e.safeTop=_,e.setCanNotScalePage=function(){if(!s()&&!window.__setCanNotScale){window.__setCanNotScale=!0;var e=document.createElement("style");e.textContent="\n    * {\n      -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none; \n      touch-action: manipulation;\n    }\n    .can-user-select, input, textarea {\n      -moz-user-select:auto; -webkit-user-select:auto;-ms-user-select:auto; user-select:auto;\n    }\n  ";var t=document.createElement("meta");t.setAttribute("name","viewport"),t.setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui, viewport-fit=cover"),document.head.append(e,t),document.addEventListener("gesturestart",function(e){e.preventDefault()})}},e.setFocusTouchScroll=function(t){s()&&!window.__setBodyCanNotTouchScroll&&(document.addEventListener("touchmove",function(e){e.preventDefault()},{passive:!1}),window.__setBodyCanNotTouchScroll=!0),t.__mobile_scroll||(t.__mobile_scroll=!0,t.addEventListener("touchstart",function(){if(t.__can_scroll=t.scrollHeight>t.clientHeight,t.__can_scroll){var e=t.scrollTop;0===e?t.scrollTop=1:e+t.offsetHeight===t.scrollHeight&&(t.scrollTop=t.scrollHeight-t.offsetHeight-1)}}),t.addEventListener("touchmove",function(e){t.__can_scroll?e.stopPropagation():e.preventDefault()}))},e.setKeyboardAutoScrollBack=function(){if(!s()&&!window.__setKeyboardAutoScrollBack){window.__setKeyboardAutoScrollBack=!0;var t,n=0,o=function(){t&&t.blur&&t.blur()};document.body.addEventListener("focusin",function(e){t=e.target,n=document.body.scrollTop,setTimeout(function(){document.body.addEventListener("touchend",o)},50)}),document.body.addEventListener("focusout",function(){document.body.scrollTop=n,t=!1,document.body.removeEventListener("touchend",o)})}},Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
