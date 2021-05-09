"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

$(document).ready(function () {
   var mwapi = new mw.Api();
   window.custom_mwapi = function callee$1$0(action, data) {
      var has_csrf_token = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
      var re_data;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
         while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
               re_data = {};

               if (!has_csrf_token) {
                  context$2$0.next = 7;
                  break;
               }

               context$2$0.next = 4;
               return regeneratorRuntime.awrap(mwapi.postWithEditToken(_extends({ action: action }, data)));

            case 4:
               re_data = context$2$0.sent;
               context$2$0.next = 10;
               break;

            case 7:
               context$2$0.next = 9;
               return regeneratorRuntime.awrap(mwapi.post(_extends({ action: action }, data)));

            case 9:
               re_data = context$2$0.sent;

            case 10:
               return context$2$0.abrupt("return", re_data[action]);

            case 11:
            case "end":
               return context$2$0.stop();
         }
      }, null, this);
   };
});