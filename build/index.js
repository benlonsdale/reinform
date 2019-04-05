module.exports=function(e){var r={};function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var a in e)t.d(n,a,function(r){return e[r]}.bind(null,a));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=1)}([function(e,r){e.exports=require("react")},function(e,r,t){"use strict";t.r(r);var n=t(0),a=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,o=/[0-9+]{9,13}$/,u=function(e){var r=e.value,t=e.test,n=e.key,u=e.state,l=e.displayName;switch(n){case"maxLength":if(r.length>t)return"Maximum length for this input is ".concat(t);break;case"minLength":if(r.length>0&&r.length<t)return"Minimum length for this input is ".concat(t);break;case"required":if(!0===t&&r.length<1)return"".concat(l," is required");break;case"email":if(!0===t&&r.length>0&&!a.test(r))return"Please enter a valid email address";break;case"phone":if(!0===t&&r.length>0&&!o.test(r))return"Please enter a valid phone number";break;case"customValidator":return t(r,u);default:return}};function l(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=[],n=!0,a=!1,o=void 0;try{for(var u,l=e[Symbol.iterator]();!(n=(u=l.next()).done)&&(t.push(u.value),!r||t.length!==r);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==l.return||l.return()}finally{if(a)throw o}}return t}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var c=function(e,r){var t=e.values,n=e.validationRules,a=e.config;console.log(a);var o=!0;return Object.entries(t).forEach(function(t){var c=i(t,2),s=c[0],f=c[1],d=[];void 0!==n[s]&&(Object.entries(n[s]).forEach(function(r){var t=i(r,2),n=t[0],l=t[1],c={value:f,test:l,key:n,state:e,displayName:a[s].displayName},p=u(c);void 0!==p&&(d.push(p),o=!1)}),r({type:"update",payload:{values:l({},s,f),errors:l({},s,d)}}))}),o};function s(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=[],n=!0,a=!1,o=void 0;try{for(var u,l=e[Symbol.iterator]();!(n=(u=l.next()).done)&&(t.push(u.value),!r||t.length!==r);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==l.return||l.return()}finally{if(a)throw o}}return t}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function f(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.forEach(function(r){d(e,r,t[r])})}return e}function d(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var p=function(e,r){switch(r.type){case"setValidationRules":return f({},e,{validationRules:f({},e.validationRules,r.payload)});case"update":return f({},e,{values:f({},e.values,r.payload.values?r.payload.values:{}),errors:f({},e.errors,r.payload.errors)});case"setConfig":return f({},e,{config:f({},e.config,r.payload)});default:return e}},v=function(){var e=s(Object(n.useReducer)(p,{errors:{},values:{},validationRules:{},config:{}}),2),r=e[0],t=e[1];return{dispatch:t,getErrors:function(){return r.errors},errors:r.errors,getValues:function(){return r.values},values:r.values,isValid:function(){return 0!==Object.keys(r.values).length&&c(r,t)}}};function y(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function b(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var h=function(e,r){var t=e.validation,a=e.defaultValue,o=e.showPlaceholder,l=b(e,["validation","defaultValue","showPlaceholder"]),i=l.name,c=l.displayName;if(!i)throw new Error('"name" is a required key in the config');c||(function(e){throw new Error('"'+e+'" is read-only')}("displayName"),c=i),Object(n.useEffect)(function(){r.dispatch({type:"setValidationRules",payload:y({},i,t)}),r.dispatch({type:"setConfig",payload:y({},i,l)})},[l.validation]);var s=r.errors[i]?r.errors[i]:[],f=r.values[i]?r.values[i]:"";Object(n.useEffect)(function(){r.dispatch({type:"update",payload:{values:y({},i,a||f)}})},[i,a]);var d=Object(n.useCallback)(function(e){var t;t=void 0!==e.target?e.target.value:e,r.dispatch({type:"update",payload:{values:y({},i,t),errors:y({},i,[])}})},[f]),p=Object(n.useCallback)(function(e){var n={values:r.values,errors:r.errors},a=[];void 0!==t&&Object.keys(t).forEach(function(e){var r={value:f,test:t[e],key:e,state:n,displayName:c},o=u(r);o&&a.push(o)}),r.dispatch({type:"update",payload:{values:y({},i,f),errors:y({},i,a)}})},[f,c]);return function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.forEach(function(r){y(e,r,t[r])})}return e}({},l,{"aria-label":l["aria-label"]?l["aria-label"]:c,errors:s.length>0?s:void 0,label:l.label?l.label:l.hideLabel?void 0:c,onChange:d,onBlur:p,placeholder:l.placeholder?l.placeholder:o?c:void 0,validateField:p,value:f})};t.d(r,"useForm",function(){return v}),t.d(r,"useInput",function(){return h})}]);