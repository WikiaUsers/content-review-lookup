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
    __assign = Object.assign || function(t) {
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
        if (selector === void 0) { selector = '.user-functions, .UserFunctions'; }
        this._el = $(selector);
        this.userName = mw.config.get('wgUserName');
        this.userGroups = mw.config.get('wgUserGroups');
        this.isLoggedIn = this.userName !== null;
    }
    Object.defineProperty(UserFunctions.prototype, "$elements", {
        set: function (selector) {
            this._el = $(selector);
        },
        enumerable: false,
        configurable: true
    });
    UserFunctions.prototype.init = function () {
        var _this = this;
        this._el.each(function (index, element) {
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
    /**
     * Get standard compare boolean map
     * @example toBoolMap('foo|!bar') === { foo: true, bar: false }
     */
    UserFunctions.prototype.toBoolMap = function (data) {
        var arr = data.split('|');
        var map = {};
        arr.forEach(function (item) {
            var key = item.trim().replace(/^!/, '');
            map[key] = !item.startsWith('!');
        });
        return map;
    };
    /**
     * Data is means yes or no
     * - `false`, `no`, `n`, `0` → `false`
     * - others → `true`
     */
    UserFunctions.prototype.toBoolean = function (data) {
        return ![false, 'false', 'no', 'n', 0, '0'].includes(data);
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
        $el.attr('userfunctions-hit', 'true');
        return $el;
    };
    UserFunctions.prototype.handleIfLoggedIn = function ($el) {
        var yes = this.toBoolean($el.data('if-logged-in'));
        var show = (yes && this.isLoggedIn) || (!yes && !this.isLoggedIn);
        $el.toggle(show).attr('data-userfunctions-hit', '' + show);
        return $el;
    };
    UserFunctions.prototype.handleIfUserName = function ($el) {
        var users = this.toBoolMap($el.data('if-username'));
        var show = !!users[this.userName];
        $el.toggle(show).attr('data-userfunctions-hit', '' + show);
        return $el;
    };
    UserFunctions.prototype.handleIfUserGroup = function ($el) {
        var map = this.toBoolMap($el.data('if-usergroup'));
        var show = false;
        for (var group in map) {
            var yes = map[group];
            if ((yes && this.userGroups.includes(group)) ||
                (!yes && !this.userGroups.includes(group))) {
                show = true;
            }
            else {
                show = false;
            }
        }
        $el.toggle(show).attr('data-userfunctions-hit', '' + show);
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
            .attr('data-userfunctions-hit', 'true')
            .attr('data-userfunctions-error', 'true');
    };
    return UserFunctions;
}());
window.dev = __assign(__assign({}, window.dev), { UserFunctions: UserFunctions });
// Run
var app = new UserFunctions();
app.init();
//# sourceMappingURL=index.js.map