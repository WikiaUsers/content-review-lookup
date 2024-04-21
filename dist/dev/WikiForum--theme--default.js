/**
 * @name WikiForum/theme/fandom
 * @version 3.1.0 (Core version)
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 * @desc Provide a front-end structured discussion page with JavaScript.
 *       Similar to Community Feed and support wikitext.
 *
 * @license MIT
 * @url https://github.com/Fandom-zh/Gadget-WikiForum
 */

/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";

/*
  MIT License https://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ (function(module) {

"use strict";


function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/stylus-loader/dist/cjs.js!./src/theme/default.styl":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/stylus-loader/dist/cjs.js!./src/theme/default.styl ***!
  \***************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/**\n * WikiForum default theme style\n */\n.wiki-forum-all-container .wiki-forum {\n  border-top: 6px dotted rgba(0,0,0,0.2);\n}\n.wiki-forum-all-container .wiki-forum:last-of-type {\n  border-bottom: 6px dotted rgba(0,0,0,0.2);\n}\n.wiki-forum-all-container .wiki-forum .forum-thread,\n.wiki-forum-all-container .wiki-forum .forum-add-reply {\n  background-color: rgba(0,0,0,0.05);\n  margin: 1rem;\n  padding: 0.5rem 0.5rem 0.5rem 1rem;\n  border-left: 4px solid rgba(0,0,0,0.2);\n}\n.wiki-forum-all-container .wiki-forum .forum-first {\n  border-color: rgba(0,0,0,0.5);\n}\n.wiki-forum-all-container .wiki-forum .forum-first .forum-content {\n  font-size: 1.2rem;\n  line-height: 1.8;\n}\n.wiki-forum-all-container .wiki-forum .forum-add-thread {\n  border-color: #008000;\n}\n.wiki-forum-all-container .wiki-forum .forum-before {\n  position: relative;\n}\n.wiki-forum-all-container .wiki-forum .forum-before .forum-avatar {\n  border-radius: 50%;\n  border: 2px solid rgba(0,0,0,0.2);\n  width: 1.4rem;\n  height: 1.4rem;\n}\n.wiki-forum-all-container .wiki-forum .forum-before .forum-id-link {\n  position: absolute;\n  right: 0.1rem;\n  top: 0.1rem;\n}\n.wiki-forum-all-container .wiki-forum .forum-after {\n  clear: both;\n}\n.wiki-forum-all-container .wiki-forum .forum-after .forum-new-reply-area {\n  display: none;\n}\n.wiki-forum-all-container .wiki-forum .forum-after .post-time {\n  font-size: small;\n  color: #888;\n}\n.wiki-forum-all-container .wiki-forum .forum-after .forum-reaction .reaction-like.not-like {\n  filter: grayscale(1);\n}\n.wiki-forum-all-container .wiki-forum .forum-after .forum-reaction .reaction-like.not-like:hover {\n  filter: grayscale(0);\n}\n.wiki-forum-all-container .wiki-forum .forum-after .forum-reaction .reaction-like.is-like {\n  font-weight: bold;\n}\n.wiki-forum-all-container .wiki-forum .forum-after .forum-reaction .reaction-like.is-like:hover {\n  text-decoration: line-through;\n}\n.wiki-forum-all-container .wiki-forum .forum-input-container {\n  display: flex;\n  position: relative;\n}\n.wiki-forum-all-container .wiki-forum .forum-input-container > div {\n  display: flex;\n}\n.wiki-forum-all-container .wiki-forum .forum-input-container > div:first-of-type {\n  flex: 7;\n}\n.wiki-forum-all-container .wiki-forum .forum-input-container > div:last-of-type {\n  width: 2.8rem;\n  justify-content: center;\n  align-items: center;\n  flex: 1;\n}\n.wiki-forum-all-container .wiki-forum .forum-create-title,\n.wiki-forum-all-container .wiki-forum .forum-textarea {\n  border: none;\n  background: rgba(0,0,0,0.05);\n  padding: 6px;\n  margin: 4px;\n  border-radius: 4px;\n  max-width: 100%;\n  min-width: 100%;\n  box-sizing: border-box;\n}\n.wiki-forum-all-container .wiki-forum .forum-create-title {\n  display: block;\n  width: calc(100% - 12px);\n}\n.wiki-forum-all-container .wiki-forum .forum-submit-btn {\n  width: calc(100% - 12px);\n  padding: 1px 2px;\n  margin: 0 4px;\n}\n.wiki-forum-all-container .forum-loading {\n  position: relative;\n}\n.wiki-forum-all-container .forum-loading:before,\n.wiki-forum-all-container .forum-loading:after {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.wiki-forum-all-container .forum-loading:before {\n  z-index: 10;\n  background: rgba(255,255,255,0.5);\n}\n.wiki-forum-all-container .forum-loading:after {\n  background-image: url(\"https://vignette.wikia.nocookie.net/dftest/images/8/8c/Ms-loading-spinner.svg/revision/latest?cb=20191203083420\");\n  background-position: 50%;\n  background-repeat: no-repeat;\n}\n.skin-oasis .wiki-forum-all-container .thumb.show-info-icon .info-icon {\n  display: none;\n  float: right;\n  margin: -22px 5px 0 0;\n  position: relative;\n}\n.skin-oasis .wiki-forum-all-container .thumb.show-info-icon .info-icon svg {\n  width: 18px;\n  height: 18px;\n  fill: rgba(0,0,0,0.3);\n}\n.skin-oasis .wiki-forum-all-container .thumb.show-info-icon:hover .info-icon {\n  display: block;\n}\n.skin-oasis .wiki-forum-all-container .thumb.show-info-icon:hover .duration {\n  display: none;\n}\n.skin-oasis .wiki-forum-all-container .thumb.inline-video-playing:hover .info-icon {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./src/theme/default.styl"],"names":[],"mappings":"AAAA;;EAEE;AAOA;EACE,sCAAY;AALhB;AAOI;EACE,yCAAe;AALrB;AAQI;;EACE,kCAAkB;EAClB,YAAQ;EACR,kCAAS;EACT,sCAAa;AALnB;AAQI;EACE,6BAAc;AANpB;AAQM;EACE,iBAAW;EACX,gBAAa;AANrB;AASI;EACE,qBAAc;AAPpB;AAUI;EACE,kBAAU;AARhB;AAUM;EACE,kBAAe;EACf,iCAAQ;EACR,aAAO;EACP,cAAQ;AARhB;AAUM;EACE,kBAAU;EACV,aAAO;EACP,WAAK;AARb;AAWI;EACE,WAAO;AATb;AAWM;EACE,aAAS;AATjB;AAWM;EACE,gBAAW;EACX,WAAO;AATf;AAaU;EACE,oBAAQ;AAXpB;AAaY;EACE,oBAAQ;AAXtB;AAaU;EACE,iBAAa;AAXzB;AAaY;EACE,6BAAiB;AAX/B;AAcI;EACE,aAAS;EACT,kBAAU;AAZhB;AAcM;EACE,aAAS;AAZjB;AAcM;EACE,OAAM;AAZd;AAcM;EACE,aAAO;EACP,uBAAiB;EACjB,mBAAa;EACb,OAAM;AAZd;AAcI;;EACE,YAAQ;EACR,4BAAY;EACZ,YAAS;EACT,WAAQ;EACR,kBAAe;EACf,eAAW;EACX,eAAW;EACX,sBAAY;AAXlB;AAaI;EACE,cAAS;EACT,wBAAO;AAXb;AAaI;EACE,wBAAO;EACP,gBAAS;EACT,aAAQ;AAXd;AAaE;EACE,kBAAU;AAXd;AAaI;;EACE,WAAS;EACT,cAAS;EACT,kBAAU;EACV,MAAK;EACL,OAAM;EACN,WAAO;EACP,YAAQ;AAVd;AAYI;EACE,WAAS;EACT,iCAAY;AAVlB;AAYI;EACE,wIAAuI;EACvI,wBAAqB;EACrB,4BAAmB;AAVzB;AAeI;EACE,aAAS;EACT,YAAO;EACP,qBAAQ;EACR,kBAAU;AAbhB;AAeM;EACE,WAAO;EACP,YAAQ;EACR,qBAAM;AAbd;AAeI;EACE,cAAS;AAbf;AAeI;EACE,aAAS;AAbf;AAeE;EACE,aAAS;AAbb","sourcesContent":["/**\r\n * WikiForum default theme style\r\n */\r\nbgGray = rgba(0, 0, 0, 0.05)\r\nborderGray = rgba(0, 0, 0, 0.2)\r\nborderBlack = rgba(0, 0, 0, 0.5)\r\nborderGreen = green\r\n\r\n.wiki-forum-all-container\r\n  .wiki-forum\r\n    border-top: 6px dotted borderGray\r\n\r\n    &:last-of-type\r\n      border-bottom: 6px dotted borderGray\r\n\r\n    // 一般帖子\r\n    .forum-thread, .forum-add-reply\r\n      background-color: bgGray\r\n      margin: 1rem\r\n      padding: 0.5rem 0.5rem 0.5rem 1rem\r\n      border-left: 4px solid borderGray\r\n\r\n    // 楼主\r\n    .forum-first\r\n      border-color: borderBlack\r\n\r\n      .forum-content\r\n        font-size: 1.2rem\r\n        line-height: 1.8\r\n\r\n    // 新增回帖\r\n    .forum-add-thread\r\n      border-color: borderGreen\r\n\r\n    // 帖子头\r\n    .forum-before\r\n      position: relative\r\n\r\n      .forum-avatar\r\n        border-radius: 50%\r\n        border: 2px solid borderGray\r\n        width: 1.4rem\r\n        height: 1.4rem\r\n\r\n      .forum-id-link\r\n        position: absolute\r\n        right: 0.1rem\r\n        top: 0.1rem\r\n\r\n    // 帖子尾\r\n    .forum-after\r\n      clear: both\r\n\r\n      .forum-new-reply-area\r\n        display: none\r\n\r\n      .post-time\r\n        font-size: small\r\n        color: #888888\r\n\r\n      .forum-reaction\r\n        .reaction-like\r\n          &.not-like\r\n            filter: grayscale(1)\r\n\r\n            &:hover\r\n              filter: grayscale(0)\r\n\r\n          &.is-like\r\n            font-weight: bold\r\n\r\n            &:hover\r\n              text-decoration: line-through\r\n\r\n    // 回复框\r\n    .forum-input-container\r\n      display: flex\r\n      position: relative\r\n\r\n      > div\r\n        display: flex\r\n\r\n      > div:first-of-type\r\n        flex: 7\r\n\r\n      > div:last-of-type\r\n        width: 2.8rem\r\n        justify-content: center\r\n        align-items: center\r\n        flex: 1\r\n\r\n    .forum-create-title, .forum-textarea\r\n      border: none\r\n      background: bgGray\r\n      padding: 6px\r\n      margin: 4px\r\n      border-radius: 4px\r\n      max-width: 100%\r\n      min-width: 100%\r\n      box-sizing: border-box\r\n\r\n    .forum-create-title\r\n      display: block\r\n      width: calc(100% - 12px)\r\n\r\n    .forum-submit-btn\r\n      width: calc(100% - 12px)\r\n      padding: 1px 2px\r\n      margin: 0 4px\r\n\r\n  .forum-loading\r\n    position: relative\r\n\r\n    &:before, &:after\r\n      content: ''\r\n      display: block\r\n      position: absolute\r\n      top: 0\r\n      left: 0\r\n      width: 100%\r\n      height: 100%\r\n\r\n    &:before\r\n      z-index: 10\r\n      background: rgba(255, 255, 255, 0.5)\r\n\r\n    &:after\r\n      background-image: url('https://vignette.wikia.nocookie.net/dftest/images/8/8c/Ms-loading-spinner.svg/revision/latest?cb=20191203083420')\r\n      background-position: 50%\r\n      background-repeat: no-repeat // vignette.wikia.nocookie.net/dftest/images/8/8c/Ms-loading-spinner.svg/revision/latest?cb=20191203083420')\r\n\r\n// Minor fix for thumb info-icon\r\n.skin-oasis .wiki-forum-all-container\r\n  .thumb.show-info-icon\r\n    .info-icon\r\n      display: none\r\n      float: right\r\n      margin: -22px 5px 0 0\r\n      position: relative\r\n\r\n      svg\r\n        width: 18px\r\n        height: 18px\r\n        fill: rgba(0, 0, 0, 0.3)\r\n\r\n    &:hover .info-icon\r\n      display: block\r\n\r\n    &:hover .duration\r\n      display: none\r\n\r\n  .thumb.inline-video-playing:hover .info-icon\r\n    display: none"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/theme/default.styl":
/*!********************************!*\
  !*** ./src/theme/default.styl ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_stylus_loader_dist_cjs_js_default_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/stylus-loader/dist/cjs.js!./default.styl */ "./node_modules/css-loader/dist/cjs.js!./node_modules/stylus-loader/dist/cjs.js!./src/theme/default.styl");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_stylus_loader_dist_cjs_js_default_styl__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_stylus_loader_dist_cjs_js_default_styl__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*****************************!*\
  !*** ./src/theme/fandom.js ***!
  \*****************************/
// Theme settings
// const settings = $.extend(
//   {},
//   {
//     adminGroup: ['sysop'],
//     adminUser: [],
//     depthMax: 3,
//     enableNewForum: false,
//     enableModify: true,
//     enableDelete: true,
//   },
//   window.WikiForumDefaultTheme
// )
// Import style
__webpack_require__(/*! ./default.styl */ "./src/theme/default.styl"); // Wait i18n-js
// eslint-disable-next-line no-undef


importArticle({
  type: 'script',
  article: 'u:dev:MediaWiki:I18n-js/code.js'
});
mw.hook('dev.i18n').add(function (i18no) {
  i18no.loadMessages('WikiForum-theme-default').then(main);
}); // function main

function main(i18n) {
  /**
   * @function theme.default 标准的官方主题
   * @param {Object} ctx
   * @param {Object} ctx.meta Metadata
   *
   * @param {Function} next
   */
  mw.hook('WikiForum.theme').add(function (next) {
    function _msg() {
      return i18n.msg.apply(i18n, arguments).parse();
    }

    var conf = mw.config.get(); // 全论坛容器

    var allForumsContainer = function allForumsContainer() {
      return $('<div>', {
        "class": 'wiki-forum-all-container'
      });
    }; // 单论坛容器


    var forumContainer = function forumContainer(ctx) {
      return $('<div>', {
        "class": 'wiki-forum',
        'data-forumid': ctx.meta.id
      });
    }; // 帖子容器


    var threadContainer = function threadContainer(ctx) {
      // 处理 meta
      var forumid = ctx.forumid,
          threadid = ctx.threadid,
          content = ctx.content;
      var timePublish = ctx.meta.timePublish || ctx.meta.timeRelease || ctx.meta.release || ''; // const timeModify = ctx.meta.timeModify || timePublish

      var userAuthor = ctx.meta.userAuthor || ctx.meta.user || 'unsigned';
      var userLast = ctx.meta.userLast || userAuthor;
      var htmlId = "forum-".concat(forumid, "_thread-").concat(threadid); // 缓存组件

      var $idLink = $('<a>', {
        "class": 'forum-id-link',
        text: '#' + threadid,
        href: "#".concat(htmlId)
      }).click(function (e) {
        e.preventDefault();
        window.history.pushState(null, null, '#' + htmlId);
        var $block = $('#' + htmlId);
        $('html,body').animate({
          scrollTop: $block.offset().top - 100
        }, 500);
      });
      var $userLink = $('<div>', {
        "class": 'forum-user'
      }).append($('<span>', {
        "class": 'forum-user-link'
      }).append($('<a>', {
        "class": 'mw-userlink userAuthor',
        text: userAuthor,
        href: mw.util.getUrl('User:' + userAuthor)
      }), userLast === userAuthor ? '' : $('<i>', {
        text: " (".concat(_msg('user-last'), ": ").concat(userLast, ")")
      })));
      var $content = $('<div>', {
        "class": 'forum-content',
        html: content
      });
      var $timeArea = $('<div>', {
        "class": 'post-time'
      }).append($('<i>', {
        "class": 'post-date timePublish',
        text: dateFormat(_msg('date-format'), new Date(timePublish))
      })); // 判断是否为楼主，并返回帖子容器

      if (threadid === '1') {
        // 楼主
        return $('<div>', {
          id: htmlId,
          "class": 'forum-thread forum-first'
        }).append($('<div>', {
          "class": 'forum-before'
        }).append($('<h3>', {
          "class": 'forum-title',
          text: ctx.forumMeta.title || '[UNTITLED] Forum Topic #' + forumid
        }), $idLink, $userLink), $content, $('<div>', {
          "class": 'forum-after'
        }).append($timeArea, reactionContainer(ctx)));
      } else {
        // 普通帖子
        var $root = ctx.$root,
            $container = ctx.$container,
            _forumid = ctx.forumid,
            _forum = ctx._forum,
            fn = ctx.fn;
        var $replyArea = newReplyArea({
          $root: $root,
          $container: $container,
          forumEl: _forum,
          forumid: _forumid,
          threadid: threadid,
          fn: fn
        });
        var $replyContainer = $('<div>', {
          "class": 'new-reply-container'
        }).append($('<div>', {
          "class": 'modify-buttons-group'
        }).append($('<a>', {
          "class": 'reply-btn',
          href: 'javascript:;',
          text: _msg('reply-btn')
        }).click(function () {
          $replyArea.show();
          $(this).hide();
        })), $replyArea);
        return $('<div>', {
          "class": 'forum-thread',
          id: htmlId
        }).append($('<div>', {
          "class": 'forum-before'
        }).append($idLink, $userLink), $content, $('<div>', {
          "class": 'forum-after'
        }).append($timeArea, ctx.isComplex ? null : $replyContainer, reactionContainer(ctx)));
      }
    }; // 新回复容器


    var newReplyArea = function newReplyArea(ctx) {
      var $root = ctx.$root,
          forumEl = ctx.forumEl,
          forumid = ctx.forumid,
          threadid = ctx.threadid;
      var $container = $('<div>', {
        "class": 'forum-new-reply-area'
      });
      var $textArea = $('<textarea>', {
        "class": 'forum-textarea'
      });
      var $submitBtn = $('<button>', {
        text: _msg('reply-btn'),
        "class": 'forum-submit-btn'
      }).click(function () {
        var content = $textArea.val();
        if (!content) return;
        $container.addClass('forum-loading');
        ctx.fn.updater.addReply({
          $root: $root,
          forumEl: forumEl,
          content: content,
          forumid: forumid,
          threadid: threadid
        });
      });
      $container.append($('<label>', {
        "class": 'forum-input-container'
      }).append($('<div>').append($textArea), $('<div>').append($submitBtn)));
      return $container;
    }; // 新帖子容器


    var newThreadArea = function newThreadArea(ctx) {
      var $root = ctx.$root,
          _forum = ctx._forum,
          forumid = ctx.forumid;
      var $container = $('<div>', {
        "class": 'forum-new-thread-area'
      });
      var $textArea = $('<textarea>', {
        "class": 'forum-textarea'
      });
      var $submitBtn = $('<button>', {
        text: _msg('submit-btn'),
        "class": 'forum-submit-btn'
      }).click(function () {
        var content = $textArea.val();
        if (!content) return;
        $container.addClass('forum-loading');
        ctx.fn.updater.addThread({
          $root: $root,
          forumEl: _forum,
          forumid: forumid,
          content: content
        });
      });
      $container.append($('<strong>', {
        text: _msg('add-thread-label')
      }), $('<label>', {
        "class": 'forum-input-container'
      }).append($('<div>').append($textArea), $('<div>').append($submitBtn)));
      return $container;
    }; // 点赞容器


    var reactionContainer = function reactionContainer(ctx) {
      var _forum = ctx._forum,
          forumid = ctx.forumid,
          threadid = ctx.threadid,
          meta = ctx.meta,
          fn = ctx.fn;
      var $container = $('<div>', {
        "class": 'forum-reaction'
      }); // Like btn

      var likeList = meta.reactionLike || '';

      if (likeList) {
        likeList = likeList.split('|');
      } else {
        likeList = [];
      }

      var likeTotal = likeList.length;
      var isLike = likeList.includes(conf.wgUserName);
      var $likeBtn = $('<a>', {
        href: 'javascript:;',
        "class": 'reaction-like',
        text: "\uD83D\uDC4D(".concat(likeTotal, ")"),
        title: isLike ? _msg('reaction-like-remove') : _msg('reaction-like-add')
      }).addClass(isLike ? 'is-like' : 'not-like').click(function () {
        $container.addClass('forum-loading');

        if (isLike) {
          var index = likeList.indexOf(conf.wgUserName);
          if (index > -1) likeList.splice(index, 1);
        } else {
          likeList.push(conf.wgUserName);
        }

        likeList.sort();
        likeList = likeList.join('|');
        fn.updater.updateThread({
          forumEl: _forum,
          forumid: forumid,
          threadid: threadid,
          meta: {
            reactionLike: likeList
          }
        });
      });
      $container.append($likeBtn);
      return $container;
    }; // 新论坛容器


    var newForumContainer = function newForumContainer() {
      return $('<div>').append($('<p>', {
        text: 'newForumContainer'
      }));
    }; // 无论坛容器


    var noForumContainer = function noForumContainer() {};

    var afterForum = function afterForum(ctx) {
      return $('<div>', {
        "class": 'forum-thread forum-add-thread'
      }).append(newThreadArea(ctx));
    };

    var afterAllForums = function afterAllForums(ctx) {
      return $('<div>', {
        "class": 'after-all-forums'
      }).append(newForumContainer(ctx));
    }; // @function dateFormat


    function dateFormat(fmt, date) {
      date = date || new Date();
      var o = {
        'M+': date.getMonth() + 1,
        //月份
        'd+': date.getDate(),
        //日
        'h+': date.getHours(),
        //小时
        'm+': date.getMinutes(),
        //分
        's+': date.getSeconds(),
        //秒
        'q+': Math.floor((date.getMonth() + 3) / 3),
        //季度
        S: date.getMilliseconds() //毫秒

      };

      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }

      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
      }

      return fmt;
    }

    next && next({
      allForumsContainer: allForumsContainer,
      forumContainer: forumContainer,
      threadContainer: threadContainer,
      afterAllForums: afterAllForums,
      afterForum: afterForum,
      noForumContainer: noForumContainer
    });
  });
}
}();
/******/ })()
;
//# sourceMappingURL=fandom.js.map