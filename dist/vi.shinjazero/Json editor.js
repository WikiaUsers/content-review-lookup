function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function () {}; return { s: F, n: function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (e) { throw e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function () { it = it.call(o); }, n: function () { var step = it.next(); normalCompletion = step.done; return step; }, e: function (e) { didErr = true; err = e; }, f: function () { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

$(document).ready(function _callee3() {
  var mw_api, json_editors, _iterator, _step, el, editor, config_page, json_str;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          mw_api = new mw.Api();
          _context3.next = 3;
          return regeneratorRuntime.awrap($.getScript("https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.4.0/jsoneditor.min.js"));

        case 3:
          $('<link/>', {
            rel: 'stylesheet',
            type: 'text/css',
            href: "https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/9.4.0/jsoneditor.min.css"
          }).appendTo('head');
          json_editors = [];
          _iterator = _createForOfIteratorHelper($(".json-config"));
          _context3.prev = 6;

          _iterator.s();

        case 8:
          if ((_step = _iterator.n()).done) {
            _context3.next = 21;
            break;
          }

          el = _step.value;
          editor = new JSONEditor(el);
          config_page = $(el).data("config-page");
          _context3.t0 = $;
          _context3.next = 15;
          return regeneratorRuntime.awrap(mw_api.parse(new mw.Title("Cấu_hình_đặc_biệt/" + config_page)).catch(function () {
            return "{}";
          }));

        case 15:
          _context3.t1 = _context3.sent;
          json_str = (0, _context3.t0)(_context3.t1).text();
          editor.set(JSON.parse(json_str));
          json_editors.push({
            element: editor,
            page: config_page
          });

        case 19:
          _context3.next = 8;
          break;

        case 21:
          _context3.next = 26;
          break;

        case 23:
          _context3.prev = 23;
          _context3.t2 = _context3["catch"](6);

          _iterator.e(_context3.t2);

        case 26:
          _context3.prev = 26;

          _iterator.f();

          return _context3.finish(26);

        case 29:
          $(".save-config").on("click", function _callee2() {
            var _loop, _iterator2, _step2, json_editor;

            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _loop = function _callee(json_editor) {
                      return regeneratorRuntime.async(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.prev = 0;
                              _context.next = 3;
                              return regeneratorRuntime.awrap(mw_api.edit("Cấu_hình_đặc_biệt" + json_editor.page, function () {
                                return {
                                  text: json_editor.element.getText(),
                                  summary: "Chỉnh sửa từ JSON Editor"
                                };
                              }));

                            case 3:
                              _context.next = 9;
                              break;

                            case 5:
                              _context.prev = 5;
                              _context.t0 = _context["catch"](0);
                              _context.next = 9;
                              return regeneratorRuntime.awrap(mw_api.create("Cấu_hình_đặc_biệt" + json_editor.page, {
                                summary: "A edit from json_editor!"
                              }, json_editor.element.getText()));

                            case 9:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, null, null, [[0, 5]], Promise);
                    };

                    _iterator2 = _createForOfIteratorHelper(json_editors);
                    _context2.prev = 2;

                    _iterator2.s();

                  case 4:
                    if ((_step2 = _iterator2.n()).done) {
                      _context2.next = 10;
                      break;
                    }

                    json_editor = _step2.value;
                    _context2.next = 8;
                    return regeneratorRuntime.awrap(_loop(json_editor));

                  case 8:
                    _context2.next = 4;
                    break;

                  case 10:
                    _context2.next = 15;
                    break;

                  case 12:
                    _context2.prev = 12;
                    _context2.t0 = _context2["catch"](2);

                    _iterator2.e(_context2.t0);

                  case 15:
                    _context2.prev = 15;

                    _iterator2.f();

                    return _context2.finish(15);

                  case 18:
                  case "end":
                    return _context2.stop();
                }
              }
            }, null, null, [[2, 12, 15, 18]], Promise);
          });

        case 30:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[6, 23, 26, 29]], Promise);
});