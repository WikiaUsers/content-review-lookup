// this file is from babel,
// origin es+ code is in [[MediaWiki:PttHighlight.esn.js]]
 
void function () {
"use strict";

var _obj;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["(?:(", ")\\s*\u770B\u677F\\s*)?", ""], ["(?:(", ")\\\\s*\u770B\u677F\\\\s*)?", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["", "(?:\\s*\\((", ")\\))?"], ["", "(?:\\\\s*\\\\((", ")\\\\))?"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

var pttArticleId = {
  decodeB64: function decodeB64(b64) {
    var bitString = '';

    for (var i = 0; i < b64.length; i++) {
      var charCode = b64.codePointAt(i);
      var bcode = void 0;
      if (charCode == 45) bcode = 62; // -
      else if (charCode == 95) bcode = 63; // _
        else if (charCode <= 57) bcode = charCode - 48; // 0-9
          else if (charCode <= 90) bcode = charCode - 65 + 10; // A-Z
            else if (charCode <= 122) bcode = charCode - 97 + 36; // a-z
              else throw new Error('not ptt b64 string: ' + b64);
      bitString += this.formatPadBit(bcode);
    }

    return bitString;
  },
  formatPadBit: function formatPadBit(value) {
    var string = value.toString(2);

    while (string.length < 6) {
      string = '0' + string;
    }

    return string;
  },
  toFileName: function toFileName(aid) {
    var bitString = this.decodeB64(aid);
    var time = parseInt(bitString.slice(0, -12), 2);
    var random = parseInt(bitString.slice(-12), 2);
    return ("M." + time.toString(10) + ".A." + random.toString(16)).toUpperCase();
  }
};

function r(stringSegment) {
  var regexpList = arguments;
  var resultString = stringSegment[0];

  for (var i = 1; i < stringSegment.length; i++) {
    var regexp = regexpList[i];
    if (typeof regexp == 'string') resultString += regexp;else resultString += regexp.source;
    resultString += stringSegment[i];
  }

  return new RegExp(resultString);
}

r.board = /\w[-_\w]*/;
r.aid = /#([-_\w]{8})/;

var Parser =
/*#__PURE__*/
function () {
  function Parser() {}

  var _proto = Parser.prototype;

  _proto.processRegexp = function processRegexp(text, regexp, command) {
    if (!regexp.global) {
      regexp = new RegExp(regexp.source, regexp.flags + 'g');
    }

    var result = [];
    var index = 0;
    var scan;

    while (scan = regexp.exec(text)) {
      var beforeMatch = text.slice(index, scan.index);
      result.push(beforeMatch);
      result.push(command(Array.from(scan)));
      index = regexp.lastIndex;
    }

    result.push(text.slice(index));
    return result;
  };

  _proto.token = function token(text, type) {
    var node = document.createElement('span');
    node.textContent = text;
    node.classList.add(type);
    return node;
  };

  _proto.line = function line(_line, type) {
    var lineNode = document.createElement('div');
    lineNode.classList.add('line');

    _line.shift(); // match()[0] is useless


    for (var _iterator = _line, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var token = _ref;

      if (typeof token == 'string') {
        var textNode = document.createTextNode(token);
        lineNode.appendChild(textNode);
      } else if (_instanceof(token, Node)) {
        lineNode.appendChild(token);
      } else {
        console.error('unknown token: ', token);
      }
    }

    if (type) lineNode.classList.add(type);
    return lineNode;
  };

  Parser.rule = function rule(regexp, command) {
    var copy = new this();
    copy.regexp = regexp;
    copy.command = command;
    return copy;
  };

  return Parser;
}();

Parser.aidParser = {
  __proto__: Parser.prototype,
  processAid: function processAid(text) {
    return this.processRegexp(text, this.aidRegexp, this.aidToNode);
  },
  aidRegexp: r(_templateObject(), r.aid, r.board),
  aidToNode: function aidToNode(scan) {
    var aid = scan[1];
    var board = scan[2] || 'not-found';
    var anchor = document.createElement('a');
    var fileName = pttArticleId.toFileName(aid);
    anchor.href = "https://www.ptt.cc/bbs/" + board + "/" + fileName + ".html";
    anchor.textContent = scan[0];
    anchor.classList.add('ptt-aid');
    return anchor;
  }
};
Parser.statusParser = {
  __proto__: Parser.prototype,
  keyRegexp: /\([^()]+\)/,
  keyCommand: function keyCommand(scan) {
    return this.token(scan[0], 'key');
  },
  processKey: function processKey(text) {
    return this.processRegexp(text, this.keyRegexp, this.keyCommand.bind(this));
  }
};
var pttHighlight = {
  r: r,
  Parser: Parser,
  pttArticleId: pttArticleId,
  matchCommand: [Parser.rule( // /^(\s*作者 )( *)(\w[\w\d]*)( *\()(.*)(\) *)( 看板 ?)( ?)([-\d\w_]+)( *)$/,
  /^(\s*作者 )(.*)( 看板 )(.*)$/, function command(match) {
    match[1] = this.token(match[1], 'head');
    match[3] = this.token(match[3], 'head');
    return this.line(match, 'head');
  }), Parser.rule(/^(\s*(?:標題|時間|轉信|作者|看板) )(.*)$/, function command(match) {
    match[1] = this.token(match[1], 'head');
    return this.line(match, 'head');
  }), {
    __proto__: Parser.aidParser,
    // → illumi:要去 op 板啊^^                                 推 140.123.225.127 12/19
    // → TomRiddle: 五樓厲害了                            61.216.122.103 06/21 18:18
    // 放棄詭異的格式 /^\s*([推噓→])( +)(\w[\w\d]*)(:.*?)((?:\s[推噓→]\s{0,8})?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\ )?\d{2}\/\d{2}(?: \d{2}:\d{2})?)?( *)$/,
    //regexp: /^\s*([推噓→])( +)(\w[\w\d]*)(:.*?)((?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\ )?\d{2}\/\d{2}(?: \d{2}:\d{2})?)?( *)$/,
    regexp: /^\s*([推噓→])( +)([^:\n]+)(:.*?)((?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\ )?\d{2}\/\d{2}(?: \d{2}:\d{2})?)?( *)$/,
    command: function command(match) {
      switch (match[1]) {
        case '推':
          match[1] = this.token(match[1], 'push');
          break;

        case '噓':
          match[1] = this.token(match[1], 'boo');
          break;

        case '→':
          match[1] = this.token(match[1], 'arrow');
          break;
      }

      match[3] = this.token(match[3], 'username');
      if (match[5]) match[5] = this.token(match[5], 'date');
      match.splice.apply(match, [4, 1].concat(this.processAid(match[4])));
      return this.line(match, 'comment');
    }
  }, {
    __proto__: Parser.statusParser,
    // 瀏覽 第 1/7 頁 ( 11%)  目前顯示: 第 01~22 行  (y)回應(X%)推文(h)說明(← )離開
    regexp: /^(\s*瀏覽 第 \d+(?:\/\d+)? 頁 \(\s*\d+%\)\s)(.*?)(\(.*)$/,
    markPageRange: function markPageRange(match) {
      var range = 'page-middle';
      if (/第\s*01~/.test(match[2].textContent)) range = 'page-first';else if (/100%/.test(match[1].textContent)) range = 'page-last';
      match[1].classList.add(range);
    },
    command: function command(match) {
      match[1] = this.token(match[1], 'percent');
      match[2] = this.token(match[2], 'line-number');
      this.markPageRange(match);
      match.splice.apply(match, [3, 1].concat(this.processKey(match[3])));
      return this.line(match, 'status');
    }
  }, Parser.rule(/^─+$/, function (match) {
    match.push(match[0]);
    return this.line(match, 'hr');
  }), _obj = {
    __proto__: Parser.aidParser,
    regexp: /^※.*$/,
    aidRegexp: r(_templateObject2(), r.board, r.aid),
    aidToNode: function aidToNode(scan) {
      var text, aid, board;
      text = scan[0];
      board = scan[1];
      aid = scan[2];
      return _get(_getPrototypeOf(_obj), "aidToNode", this).call(this, [text, aid, board]);
    },
    command: function command(match) {
      var parseAid = this.processAid(match[0]);
      match.push.apply(match, parseAid);
      return this.line(match, 'system');
    }
  }, Parser.rule(/^(\s*▄+\s*)(請按任意鍵繼續)(\s*▄+\s*)$/, function command(match) {
    match[1] = this.token(match[1], 'back-wall');
    match[3] = this.token(match[3], 'back-wall');
    return this.line(match, 'anykey');
  }), Parser.rule(/^(\s*◆.*)(\s\[按任意鍵繼續\]\s*)$/, function match(match) {
    match[1] = this.token(match[1], 'action');
    match[2] = this.token(match[2], 'prompt');
    return this.line(match, 'anykey');
  }), Parser.rule(/^(【.*?】)(\s*.*\s*)((?:看板|系列|文摘)《.*》\s*)$/, function command(match) {
    match[2] = this.token(match[2], 'center');
    return this.line(match, 'info-board');
  }), Parser.rule(/^\s+編號\s+.\s*.\s*.*\s+人氣.*$/, function command(match) {
    match.push(match[0]);
    return this.line(match, 'field-head');
  }), {
    __proto__: Parser.statusParser,
    regexp: /^(\s*(?:文章選讀|選擇看板)\s?)(.*)$/,
    command: function command(match) {
      match[1] = this.token(match[1], 'status-name');
      match.splice.apply(match, [2, 1].concat(this.processKey(match[2])));
      return this.line(match, 'status');
    }
  }, {
    __proto__: Parser.prototype,
    regexp: /^([>●]?)(\s*)(\d+\s|★\s*)(.)( \d|\d\d|爆|X.|  )(..\/.*$)$/,
    command: function command(match) {
      if (match[3].charAt(0) == '★') {
        match[3] = this.token(match[3], 'announcement');
      }

      match[5] = this.markPushCount(match[5]);
      return this.line(match, 'list-entry');
    },
    markPushCount: function markPushCount(symbol) {
      var count = Number(symbol);
      var type = 'low';

      if (Number.isNaN(count)) {
        if (symbol == '爆') type = 'high';else if (symbol.charAt(0) == 'X') type = 'bad';
      } else {
        if (count < 10) type = 'ones';else if (count < 100) type = 'tens';
      }

      return this.token(symbol, type);
    }
  }, {
    __proto__: Parser.aidParser,
    regexp: /^[:>](?:|\s.*)$/,
    command: function command(match) {
      var parseAid = this.processAid(match[0]);
      match.push.apply(match, parseAid);
      return this.line(match, 'quote');
    }
  }, {
    __proto__: Parser.aidParser,
    regexp: /^.*$/,
    command: function command(match) {
      var parseAid = this.processAid(match[0]);
      match.push.apply(match, parseAid);
      return this.line(match);
    }
  }],
  textToNode: function textToNode(text) {
    var node = document.createElement('pre');

    for (var _iterator2 = text.split(/\n/g), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var line = _ref2;
      if (line.slice(-1) == '\r') line = line.slice(0, -1);

      for (var _iterator3 = this.matchCommand, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var match = _ref3;
        var scan = line.match(match.regexp);

        if (scan) {
          var lineNode = match.command(Array.from(scan));
          node.appendChild(lineNode);
          break;
        }
      }
    }

    return node;
  },
  processTemplate: function processTemplate(root) {
    if (root === void 0) {
      root = document;
    }

    return this.processRootSelector(root, '.ptt-format-text.raw');
  },
  processRootSelector: function processRootSelector(root, selector) {
    if (root === void 0) {
      root = document;
    }

    if (selector === void 0) {
      selector = '.ptt-format-text.raw';
    }

    var rawList = root.querySelectorAll(selector);

    for (var _iterator4 = rawList, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref4 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref4 = _i4.value;
      }

      var raw = _ref4;
      var node = this.textToNode(raw.textContent);
      node.className = raw.className;
      node.classList.remove('raw');
      raw.parentNode.classList.remove('raw');
      if (this.debug) raw.after(node);else raw.replaceWith(node);
    }

    return rawList;
  },
  processMarkdownLang: function processMarkdownLang(root) {
    if (root === void 0) {
      root = document;
    }

    var markdownNodeList = root.querySelectorAll('.lang-ptt');
    markdownNodeList.forEach(function (node) {
      node.classList.add('ptt-format-text', 'raw');
    });
    return this.processRootSelector(root);
  }
};

if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object') {
  exports.pttHighlight = pttHighlight;
} else if ((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object') {
  window.pttHighlight = pttHighlight;
} else if (_typeof(this) == 'object') {
  this.pttHighlight = pttHighlight;
}

pttHighlight.processTemplate();
}()