/**
 * @name WikiForum.core
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 * @description Provide a front-end structured discussion page with JavaScript.
 *              Similar to Community Feed and support wikitext.
 *
 * @license MIT
 * @url https://github.com/Wjghj-Project/Gadget-WikiForum
 */

/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./module/actionEdit.js":
/*!******************************!*\
  !*** ./module/actionEdit.js ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(/*! ./mw */ "./module/mw.js"),
    api = _require.api,
    conf = _require.conf,
    editToken = _require.editToken;

module.exports = function (_ref) {
  var title = _ref.title,
      text = _ref.text,
      summary = _ref.summary;
  return $.post(api, {
    format: 'json',
    action: 'edit',
    token: editToken,
    title: title,
    text: text,
    summary: summary
  });
};

/***/ }),

/***/ "./module/actionGet.js":
/*!*****************************!*\
  !*** ./module/actionGet.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(/*! ./mw */ "./module/mw.js"),
    api = _require.api,
    conf = _require.conf;

module.exports = function () {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : conf.wgPageName;
  return $.get(api, {
    format: 'json',
    action: 'parse',
    prop: 'text|wikitext',
    page: page
  });
};

/***/ }),

/***/ "./module/log.js":
/*!***********************!*\
  !*** ./module/log.js ***!
  \***********************/
/***/ (function(module) {

function log() {
  var _console;

  for (var _len = arguments.length, data = new Array(_len), _key = 0; _key < _len; _key++) {
    data[_key] = arguments[_key];
  }

  (_console = console).info.apply(_console, ['[WikiForum] [INFO]'].concat(data));
}

function warn() {
  var _console2;

  for (var _len2 = arguments.length, data = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    data[_key2] = arguments[_key2];
  }

  (_console2 = console).warn.apply(_console2, ['[WikiForum] [WARN]'].concat(data));
}

function error() {
  var _console3;

  for (var _len3 = arguments.length, data = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    data[_key3] = arguments[_key3];
  }

  (_console3 = console).error.apply(_console3, ['[WikiForum] [ERR]'].concat(data));
}

module.exports = {
  log: log,
  info: log,
  warn: warn,
  error: error,
  err: error
};

/***/ }),

/***/ "./module/mw.js":
/*!**********************!*\
  !*** ./module/mw.js ***!
  \**********************/
/***/ (function(module) {

module.exports = {
  api: mw.util.wikiScript('api'),
  conf: mw.config.get(),
  editToken: mw.user.tokens.get('csrfToken') || mw.user.tokens.get('editToken'),
  hook: mw.hook,
  util: mw.util
};

/***/ }),

/***/ "./module/parser.js":
/*!**************************!*\
  !*** ./module/parser.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(/*! ./log */ "./module/log.js"),
    log = _require.log;
/**
 * @function parseForums 从源代码解析可能存在的全部主题
 * @param {Element} code
 * @param {String} title
 */


function parseForums(code, title) {
  var $root = $(code);
  var forums = [];

  if (!$root.hasClass('wiki-forum')) {
    $root = $root.find('.wiki-forum');
  }

  $root.each(function (index, forum) {
    forums.push({
      forumid: String(index + 1),
      meta: $.extend({}, $(forum).data(), {
        pageName: title
      }),
      threads: parseThreads(forum)
    });
  });
  return forums;
}
/**
 * @function parseThreads 递归全部的帖子
 * @param {Element} forum
 * @param {String} prefix
 */


function parseThreads(forum) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var $forum = $(forum);
  if (prefix) prefix += '-';
  var threads = [];
  $threads = getThreads($forum);
  $.each($threads, function (index, thread) {
    var threadObj = {
      threadid: String(prefix + (index + 1)),
      content: getContent(thread),
      meta: getMeta(thread)
    };

    if (getThreads(thread).length > 0) {
      threadObj.threads = parseThreads(thread, threadObj.threadid);
    }

    threads.push(threadObj);
  });
  return threads;
}
/**
 * @function getContent 获取帖子可能存在的回复的结构
 * @param {Element} thread
 */


function getThreads(thread) {
  var $thread = $(thread);
  return $thread.find('> .forum-thread');
}
/**
 * @function getContent 获取帖子内容
 * @param {Element} thread
 */


function getContent(thread) {
  var $thread = $(thread);
  var content = $thread.find('> .forum-content').html() || '';
  content = content.trim().replace(/^<!--\s*?start\s+?content\s*?-->/, '').replace(/<!--\s*?end\s+?content\s*?-->$/, '').replace(/^\n/, '').replace(/\n$/, '');
  return content;
}
/**
 * @function getMeta 获取帖子的源信息
 * @param {Element} thread
 */


function getMeta(thread) {
  var $thread = $(thread);
  var $data = $thread.data();
  return $data;
}
/**
 * @function getUser 获取帖子发帖者信息
 * @param {Element} thread
 */


function getUser(thread) {
  var $thread = $(thread);
  var author = $thread.data('userAuthor') || '';
  var last = $thread.data('userLast') || author;
  return {
    author: author,
    last: last
  };
}
/**
 * @function getTime 获取帖子发帖时间信息
 * @param {Element} thread
 */


function getTime(thread) {
  var $thread = $(thread);
  var publish = $thread.data('timePublish') || '';
  var modify = $thread.data('timeModify') || publish;
  return {
    publish: publish,
    modify: modify
  };
}
/**
 * @module fromApi 解析 MediaWiki API 返回的信息
 * @param {Object} data 来自 API 的结果：api.php?action=parse&prop=wikitext|text&page=<pageName>
 */


function fromApi(data) {
  var title = data.parse.title;
  var wikitext = data.parse.wikitext['*'];
  var html = data.parse.text['*']; // 防止输出没有根元素

  var $wikitext = $('<div>' + wikitext + '</div>');
  var $html = $('<div>' + html + '</div>'); // 高版本输出自带根元素，低版本没有

  if ($html.find('> .mw-parser-output').length > 0) {
    $html = $html.find('> .mw-parser-output');
  }

  var Obj = {
    wikitext: parseForums($wikitext, title),
    html: parseForums($html, title)
  }; // 缓存全部forum

  window.WikiForum = window.WikiForum || {};
  window.WikiForum.cache = window.WikiForum.cache || {};
  window.WikiForum.cache.pages = window.WikiForum.cache.pages || {};
  window.WikiForum.cache.pages[title] = Obj;
  return Obj;
}
/**
 * @module fromHtml 从 HTML 源代码解析
 * @param {String|Element} code
 */


function fromHtml(code) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var $code = $(code);
  var forumEl = parseForums($code);
  return forumEl;
}

module.exports = {
  fromApi: fromApi,
  fromHtml: fromHtml
};

/***/ }),

/***/ "./module/renderer.js":
/*!****************************!*\
  !*** ./module/renderer.js ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(/*! ./parser */ "./module/parser.js"),
    fromApi = _require.fromApi;

var actionGet = __webpack_require__(/*! ./actionGet */ "./module/actionGet.js");

var _require2 = __webpack_require__(/*! ./mw */ "./module/mw.js"),
    util = _require2.util,
    hook = _require2.hook,
    conf = _require2.conf;

var _require3 = __webpack_require__(/*! ./log */ "./module/log.js"),
    log = _require3.log,
    error = _require3.error; // 获取帖子元素


function getThread(_ref) {
  var forumEl = _ref.forumEl,
      _ref$forumid = _ref.forumid,
      forumid = _ref$forumid === void 0 ? '1' : _ref$forumid,
      threadid = _ref.threadid;
  // 将 id 调整为程序可读的 index
  forumid = Number(forumid);
  forumid--;
  var forum = forumEl[forumid];
  threadid = threadid.split('-');
  $.each(threadid, function (index, item) {
    item = Number(item);
    item--;
    threadid[index] = item;
  }); // 开始递归 threads

  var thread = forum;
  $.each(threadid, function (_, id) {
    log('thread', thread.threads[id]);
    thread = thread.threads[id];
  });
  return thread;
} // 获取帖子内容


function getContent(ctx) {
  var thread = getThread(ctx);
  return thread.content;
} // 获取帖子元信息


function getMeta(ctx) {
  var thread = getThread(ctx);
  return thread.meta;
} // 递归全部主题


function renderAllForums(_ref2) {
  var Obj = _ref2.Obj,
      theme = _ref2.theme,
      $root = _ref2.$root;
  log('开始渲染全部论坛');
  var html = Obj.html;
  var $allForums = theme.allForumsContainer();
  $.each(html, function (index, forum) {
    log('递归渲染主题', "".concat(index + 1, "/").concat(html.length));
    $allForums.append(renderForum({
      $root: $root,
      _forum: Obj,
      forumMeta: forum.meta,
      forumid: forum.forumid,
      forum: forum,
      theme: theme
    }), theme.afterAllForums ? theme.afterAllForums({
      $root: $root,
      $container: $allForums,
      _forum: Obj,
      forumMeta: forum.meta,
      forumid: forum.forumid,
      fn: fn
    }) : '');
  });
  return $allForums;
} // 渲染单个主题


function renderForum(ctx) {
  var $root = ctx.$root,
      $container = ctx.$container,
      _forum = ctx._forum,
      forum = ctx.forum,
      forumMeta = ctx.forumMeta,
      forumid = ctx.forumid,
      theme = ctx.theme;
  var $forum = theme.forumContainer({
    meta: forumMeta
  });
  $.each(forum.threads, function (index, thread) {
    $forum.append(renderThread({
      $root: $root,
      $container: $forum,
      _forum: _forum,
      theme: theme,
      thread: thread,
      forumMeta: forumMeta,
      forumid: forumid
    }));
  });

  if (theme.afterForum) {
    $forum.append(theme.afterForum({
      $root: $root,
      $container: $container,
      _forum: _forum,
      forumMeta: forumMeta,
      forumid: forumid,
      fn: fn
    }));
  }

  return $forum;
} // 渲染单个帖子


function renderThread(ctx) {
  var $root = ctx.$root,
      $container = ctx.$container,
      _forum = ctx._forum,
      theme = ctx.theme,
      thread = ctx.thread,
      forumMeta = ctx.forumMeta,
      forumid = ctx.forumid;
  var content = thread.content,
      meta = thread.meta,
      threadid = thread.threadid;
  log('渲染贴子', {
    forumid: forumid,
    threadid: threadid
  }); // 缓存帖子对象

  var $thread = theme.threadContainer({
    $root: $root,
    $container: $container,
    _forum: _forum,
    forumMeta: forumMeta,
    forumid: forumid,
    threadid: threadid,
    meta: meta,
    content: content,
    fn: fn
  }); // 如果有回复，处理回复

  if (thread.threads && thread.threads.length > 0) {
    $.each(thread.threads, function (index, thread) {
      ctx.thread = thread;
      $thread.append(renderThread(ctx));
    });
  }

  return $thread;
}

var fn = {
  parser: __webpack_require__(/*! ./parser */ "./module/parser.js"),
  updater: __webpack_require__(/*! ./updater */ "./module/updater.js")
}; // 从页面加载内容，并渲染到根元素

function fromPage() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : conf.wgPageName;
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#mw-content-text';
  actionGet(page).then(function (data) {
    log('成功从 API 获取源代码', page);
    var Obj = fromApi(data);
    toPage(Obj, target);
  }, function (err) {
    error('从 API 获取源代码失败', {
      page: page,
      err: err
    });
  });
} // 渲染返回HTML对象


function toHtml(forumEl) {
  log('渲染并返回 HTML');
  mw.hook('WikiForum.theme').fire(function (theme) {
    return renderAllForums({
      forumEl: forumEl,
      theme: theme
    });
  });
}
/**
 * @module toPage 从 WikiForum-Element 渲染到根元素
 * @param {Object} forumEl WikiForum-Element
 * @param {String|Element} target 渲染的根元素
 */


function toPage(Obj) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#mw-content-text';
  log('准备渲染到页面，等待主题文件……');
  /**
   * 触发主题函数
   * @param {Functon} theme 返回的主题渲染器
   */

  hook('WikiForum.theme').fire(function (theme) {
    var $root = $(target);
    $root.html(renderAllForums({
      Obj: Obj,
      theme: theme,
      $root: $root
    }));
    log('页面渲染完毕');
    hook('WikiForum.renderer').fire();
  });
}

module.exports = {
  toPage: toPage,
  toHtml: toHtml,
  fromPage: fromPage,
  getContent: getContent,
  getMeta: getMeta
};

/***/ }),

/***/ "./module/updater.js":
/*!***************************!*\
  !*** ./module/updater.js ***!
  \***************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(/*! ./mw */ "./module/mw.js"),
    conf = _require.conf;

var _require2 = __webpack_require__(/*! ./log */ "./module/log.js"),
    log = _require2.log,
    error = _require2.error;

var actionEdit = __webpack_require__(/*! ./actionEdit */ "./module/actionEdit.js");
/**
 * @module updater 更新器
 *
 * @description
 * 为了避免老版本jQuery的XSS漏洞
 * forumEl->wikitext的过程采用String拼接的方式
 */

/**
 * @function fixHTML 检查字符串的HTML标签是否匹配，wikitext是否闭合
 * @param {String} str
 */


function fixHTML(str) {
  // Trying to fix wikitext
  var openTable = str.match(/\{\|/g);
  openTable = openTable ? openTable.length : 0;
  var closeTable = str.match(/\n\|\}/g);
  closeTable = closeTable ? closeTable.length : 0;

  for (var i = 0; i < openTable - closeTable; i++) {
    str += '\n|}';
  } // fix HTML


  var div = document.createElement('container');
  div.innerHTML = str;
  str = div.innerHTML;
  return str;
}
/**
 * @function handleEdit 处理forumEl并发布
 * @param {Object} forumEl
 */


function handleEdit(_ref) {
  var $root = _ref.$root,
      forumEl = _ref.forumEl,
      summary = _ref.summary;
  var pageName = forumEl[0].meta.pageName;
  var wikitext = parseAllForums(forumEl);
  actionEdit({
    title: pageName,
    text: wikitext,
    summary: summary
  }).then(function (ret) {
    if (ret.error || ret.errors) {
      error(ret.error || ret.errors);
      return;
    }

    log('更新论坛成功', ret);

    var _require3 = __webpack_require__(/*! ./renderer */ "./module/renderer.js"),
        fromPage = _require3.fromPage;

    fromPage(pageName, $root);
  }, function (err) {
    return error(err);
  });
}
/**
 * @function parseAllForums
 */


function parseAllForums(forumEl) {
  var html = '';
  $.each(forumEl, function (index, forum) {
    html += parseForum(forum);
  });
  html = "<!--\n - WikiForum Container\n - \n - Total Forums: ".concat(forumEl.length, "\n - Last modiflied: ").concat(timeStamp(), "\n - Last user: ").concat(conf.wgUserName, "\n -\n - DO NOT EDIT DIRECTLY\n -->\n").concat(html, "\n\n<!-- end WikiForum -->");
  return html;
}

function parseForum(forum) {
  var forumid = forum.forumid,
      meta = forum.meta,
      threads = forum.threads;
  var metaList = getMeta(meta);
  var threadList = '';
  $.each(threads, function (index, thread) {
    threadList += parseThread(thread);
  });
  var html = "\n<!-- start forum#".concat(forumid || 'latest', " -->\n<div class=\"wiki-forum\" ").concat(metaList, ">\n").concat(threadList, "\n</div>\n<!-- end forum#").concat(forumid || 'latest', " -->");
  return html;
}

function parseThread(thread) {
  var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var threadid = thread.threadid,
      meta = thread.meta,
      threads = thread.threads,
      content = thread.content;
  var metaList = getMeta(meta);
  var indentStr = '';

  for (var i = 0; i < indent; i++) {
    indentStr += '  ';
  }

  var reply = '';

  if (threads && threads.length > 0) {
    $.each(threads, function (index, thread) {
      reply += parseThread(thread, indent + 1);
    });
  }

  var html = "\n".concat(indentStr, "<!-- start thread#").concat(threadid || 'latest', " -->\n").concat(indentStr, "<div class=\"forum-thread\" ").concat(metaList, ">\n").concat(indentStr, "  <div class=\"forum-content\">\n<!-- start content -->\n").concat(fixHTML(content), "\n<!-- end content -->\n").concat(indentStr, "  </div>").concat(reply, "\n").concat(indentStr, "</div>\n").concat(indentStr, "<!-- end thread#").concat(threadid || 'latest', " -->\n");
  return html;
}
/**
 * @function getMeta 将meta转换为 data-*="" 字符串
 * @param {Object} meta jQuery.data()
 */


function getMeta(meta) {
  // 将 fooBar 转换为 foo-bar 的形式
  var metaList = [];
  $.each(meta, function (key, val) {
    var newKey = 'data-' + key.replace(/(.*)([A-Z])(.*)/g, '$1-$2$3').toLowerCase();
    metaList.push("".concat(newKey, "=\"").concat(val, "\""));
  });
  metaList = metaList.join(' ');
  return metaList;
}

function timeStamp() {
  return new Date().toISOString();
}

function isComplex(id, depthMax) {
  id = id.split('-');
  if (id.length > depthMax) return true;
  return false;
}
/**
 * @function updateThread 编辑内容
 */


function updateThread(_ref2) {
  var forumEl = _ref2.forumEl,
      _ref2$forumid = _ref2.forumid,
      forumid = _ref2$forumid === void 0 ? '1' : _ref2$forumid,
      threadid = _ref2.threadid,
      content = _ref2.content,
      _ref2$meta = _ref2.meta,
      meta = _ref2$meta === void 0 ? {} : _ref2$meta,
      $root = _ref2.$root;
  var wikitext = forumEl.wikitext; // 将 id 调整为程序可读的 index

  forumid = Number(forumid);
  forumid--;
  var forum = wikitext[forumid];

  function findAndUpdate(_ref3, base) {
    var threadid = _ref3.threadid,
        content = _ref3.content,
        _ref3$meta = _ref3.meta,
        meta = _ref3$meta === void 0 ? {} : _ref3$meta;
    var allThreads = base.threads;
    $.each(allThreads, function (index, item) {
      if (item.threadid === threadid) {
        if (content) {
          item.content = content;
          item.meta.userLast = conf.wgUserName;
          item.meta.timeModify = timeStamp();
        }

        if (meta) {
          item.meta = $.extend({}, item.meta, meta);
        }
      } else if (item.threads) {
        findAndUpdate({
          threadid: threadid,
          content: content
        }, item);
      }
    });
  }

  findAndUpdate({
    threadid: threadid,
    meta: meta,
    content: content
  }, forum);
  log('Update thread', {
    forumid: forumid,
    threadid: threadid,
    content: content
  });
  handleEdit({
    $root: $root,
    forumEl: wikitext,
    summary: "[WikiForum] Modify forum#".concat(forumid, " > thread#").concat(threadid)
  });
}
/**
 * @function addThread 盖新楼，回复楼主
 */


function addThread(_ref4) {
  var forumEl = _ref4.forumEl,
      forumid = _ref4.forumid,
      content = _ref4.content,
      $root = _ref4.$root;
  var wikitext = forumEl.wikitext;
  forumid = Number(forumid);
  forumid--;
  wikitext[forumid].threads.push({
    meta: {
      userAuthor: conf.wgUserName,
      userLast: conf.wgUserName,
      timePublish: timeStamp(),
      timeModify: timeStamp()
    },
    content: content
  });
  log('Add thread', {
    forumid: forumid,
    content: content
  });
  handleEdit({
    $root: $root,
    forumEl: wikitext,
    summary: "[WikiForum] Add thread to forum#".concat(forumid)
  });
}
/**
 * @function addReply 新回复，回复层主
 */


function addReply(_ref5) {
  var forumEl = _ref5.forumEl,
      _ref5$forumid = _ref5.forumid,
      forumid = _ref5$forumid === void 0 ? '1' : _ref5$forumid,
      threadid = _ref5.threadid,
      content = _ref5.content,
      $root = _ref5.$root;
  var wikitext = forumEl.wikitext; // 给楼主回复其实就是盖新楼

  if (threadid === '1') {
    return addThread({
      forumEl: forumEl,
      forumid: forumid,
      content: content
    });
  }

  forumid = Number(forumid);
  forumid--;
  var forum = wikitext[forumid];

  function findAndUpdate(_ref6, base) {
    var threadid = _ref6.threadid,
        content = _ref6.content;
    var allThreads = base.threads;
    $.each(allThreads, function (index, item) {
      if (item.threadid === threadid) {
        item.threads = item.threads || [];
        item.threads.push({
          meta: {
            userAuthor: conf.wgUserName,
            userLast: conf.wgUserName,
            timePublish: timeStamp(),
            timeModify: timeStamp()
          },
          content: content
        });
      } else if (item.threads) {
        findAndUpdate({
          threadid: threadid,
          content: content
        }, item);
      }
    });
  }

  findAndUpdate({
    threadid: threadid,
    content: content
  }, forum);
  log('Add reply', {
    forumid: forumid,
    threadid: threadid,
    content: content
  });
  handleEdit({
    $root: $root,
    forumEl: wikitext,
    summary: "[WikiForum] Add reply to forum#".concat(forumid, " > thread#").concat(threadid)
  });
}

module.exports = {
  addReply: addReply,
  newReply: addReply,
  addThread: addThread,
  newThread: addThread,
  updateThread: updateThread // deleteThread,

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
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
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
!function() {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/**
 * @name WikiForum.core
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 * @url https://github.com/Wjghj-Project/Gadget-WikiForum
 */


var log = __webpack_require__(/*! ./module/log */ "./module/log.js");

var _require = __webpack_require__(/*! ./module/mw */ "./module/mw.js"),
    hook = _require.hook;

mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.user'], function () {
  // init global variable
  var Core = {
    parser: __webpack_require__(/*! ./module/parser */ "./module/parser.js"),
    renderer: __webpack_require__(/*! ./module/renderer */ "./module/renderer.js"),
    updater: __webpack_require__(/*! ./module/updater */ "./module/updater.js")
  };
  window.WikiForum = $.extend({}, window.WikiForum, Core);
  hook('WikiForum').fire(Core);
  log.log('Ready!');
});
}();
/******/ })()
;