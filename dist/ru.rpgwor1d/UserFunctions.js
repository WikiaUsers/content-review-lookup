"use strict";
/**
 * @name UserFunctions.js
 * @description Provides functions similar to Extension:UserFunctions
 *              based on JavaScript.
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 *
 * @url https://github.com/Fandom-zh/Gadget-UserFunctions
 * @license MIT
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var UserFunctions = /** @class */ (function () {
    function UserFunctions(selector) {
        this.userName = mw.config.get('wgUserName');
        this.userGroups = mw.config.get('wgUserGroups');
        this.isLoggedIn = true;
        this._elements = $(selector);
        this.selector = selector; // Сохраняем селектор
    }
    Object.defineProperty(UserFunctions.prototype, "elements", {
        get: function () {
            return this._elements;
        },
        set: function (selector) {
            this._elements = $(selector);
        },
        enumerable: false,
        configurable: true
    });
    UserFunctions.prototype.init = function () {
        var _this = this;
        this._elements = $(this.selector); // Обновляем элементы перед обработкой
        this._elements.each(function (_, element) {
            var $el = $(element);
            var username = $el.data('username') !== undefined;
            var ifLoggedIn = $el.data('if-logged-in') !== undefined;
            var ifUserName = $el.data('if-username') !== undefined;
            var ifUserGroup = $el.data('if-usergroup') !== undefined;
            if (username) {
                _this.handleUserName($el);
            }
            else if (ifLoggedIn) {
                _this.handleIfLoggedIn($el);
            }
            else if (ifUserName) {
                _this.handleIfUserName($el);
            }
            else if (ifUserGroup) {
                _this.handleIfUserGroup($el);
            }
            else {
                _this.handleUnknown($el);
            }
        });
    };
    UserFunctions.prototype.handleUserName = function ($el) {
        var text = $el.text();
        $el.html('');
        if ($el.data('with-link') !== undefined) {
            $el.append($('<a>', {
                href: mw.util.getUrl("User:".concat(this.userName)),
                text: text || this.userName,
            }));
        }
        else {
            $el.text(this.userName);
        }
        $el.attr('data-user-fn-hit', 'true');
        return $el;
    };
    UserFunctions.prototype.handleIfLoggedIn = function ($el) {
        var yes = UserFunctions.parseBool($el.data('if-logged-in'));
        var show = (yes && this.isLoggedIn) || (!yes && !this.isLoggedIn);
        $el.toggle(show).attr('data-user-fn-hit', '' + show);
        return $el;
    };
    UserFunctions.prototype.handleIfUserName = function ($el) {
        var data = $el.data('if-username');
        var show = UserFunctions.evaluateUserCondition(data, this.userName);
        $el.toggle(show).attr('data-user-fn-hit', '' + show);
        return $el;
    };
    UserFunctions.prototype.handleIfUserGroup = function ($el) {
        var data = $el.data('if-usergroup');
        var show = UserFunctions.evaluateGroupCondition(data, this.userGroups);
        $el.toggle(show).attr('data-user-fn-hit', '' + show);
        return $el;
    };
    UserFunctions.prototype.handleUnknown = function ($el) {
        $el.html('');
        $el
            .append($('<em>', {
            class: 'error user-functions-error',
        }).append($('<strong>', {
            text: '[Error] UserFunctions.js: Unknown handler or missing data-* attribute.',
        }), ' [', $('<a>', {
            href: 'https://github.com/Fandom-zh/Gadget-UserFunctions',
            target: '_blank',
            text: 'see documentation',
        }), ']'))
            .attr('data-user-fn-hit', 'true')
            .attr('data-user-fn-error', 'true');
    };
    /**
     * Разбирает строку условия с поддержкой логических операторов | (ИЛИ) и && (И)
     * Возвращает массив групп, где каждая группа — массив условий [ { key, expectPresent } ]
     * Пример: "User1|!User2&&!User3" -> [ [{key:"User1",expectPresent:true}], [{key:"User2",expectPresent:false},{key:"User3",expectPresent:false}] ]
     */
    UserFunctions.parseConditionString = function (data) {
        if (!data || typeof data !== 'string') return [];
        var groups = data.split('|');
        return groups.map(function (group) {
            if (!group.trim()) return [];
            return group.split('&&').map(function (cond) {
                var trimmed = cond.trim();
                if (!trimmed) return null;
                var negated = trimmed.startsWith('!');
                var key = negated ? trimmed.slice(1).trim() : trimmed;
                return { key: key, expectPresent: !negated };
            }).filter(Boolean);
        });
    };
    /**
     * Вычисляет, нужно ли показать элемент для заданного имени пользователя
     */
    UserFunctions.evaluateUserCondition = function (data, userName) {
        var groups = UserFunctions.parseConditionString(data);
        if (groups.length === 0) return false; // нет условий -> скрыть
        return groups.some(function (group) {
            if (group.length === 0) return false; // пустая группа из-за лишних ||
            return group.every(function (condition) {
                if (condition.expectPresent) {
                    return userName === condition.key;
                } else {
                    return userName !== condition.key;
                }
            });
        });
    };
    /**
     * Вычисляет, нужно ли показать элемент для групп пользователя
     */
    UserFunctions.evaluateGroupCondition = function (data, userGroups) {
        var groups = UserFunctions.parseConditionString(data);
        if (groups.length === 0) return false;
        return groups.some(function (group) {
            if (group.length === 0) return false;
            return group.every(function (condition) {
                var hasGroup = userGroups.includes(condition.key);
                if (condition.expectPresent) {
                    return hasGroup;
                } else {
                    return !hasGroup;
                }
            });
        });
    };
    UserFunctions.parseBoolMap = function (data) {
        var arr = data.split('|');
        var map = {};
        arr.forEach(function (item) {
            var key = item.trim().replace(/^!/, '');
            map[key] = !item.startsWith('!');
        });
        return map;
    };
    UserFunctions.parseBool = function (data) {
        return ![false, 'false', 'no', 'n', 0, '0'].includes(data);
    };
    return UserFunctions;
}());
window.dev = __assign(__assign({}, window.dev), { UserFunctions: UserFunctions });
// Run
var app = new UserFunctions('.user-functions, .UserFunctions');
setInterval(function () {
    app.init();
}, 1000);