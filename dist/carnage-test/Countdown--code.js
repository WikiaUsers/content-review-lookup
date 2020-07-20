/**
 * @title       Countdown
 * @version     v3.0
 * @author      Ultimate Dark Carnage <https://c.fandom.com/wiki/User:Ultimate_Dark_Carnage>
 * @author      Pecoes <https://c.fandom.com/wiki/User:Pecoes>
 * @author      Asaba <https://dev.fandom.com/wiki/User:Asaba>
 * @author      Splarka <https://c.fandom.com/wiki/User:Splarka>
 * @author      Eladkse <https://c.fandom.com/wiki/User:Eladkse>
 */

require(["wikia.window", "jquery", "mediawiki"],
function(window, $, mw){
    "use strict";

    var options = $.extend({}, window.countdownTimer),
        NO_LEADING_ZEROS = 1,
        SHORT_FORMAT = 2,
        NO_ZEROS = 4,
        _bind = function(fn, ctx){
            ctx = ctx === undefined ? this : ctx;
            var args = [].slice.call(arguments, 2);
            if ("bind" in Function.prototype){
                return fn.bind.apply(fx, [ctx].concat(args));
            } else {
                return $.proxy.apply($, [fn, ctx].concat(args));
            }
        };
    
    function Countdown(config){
        if (!(this instanceof Countdown)){
            return new Countdown(config);
        }
        this.i18n = {};
        this.time = {};
        this.countdowns = [];
        this._callbacks = {};
        this.$target = config.$target || $('.countdown');
        return this;
    }

    Countdown.prototype = {
        constructor: Countdown,
        loadI18n: function(){
            mw.hook("dev.i18n").add(_bind(this.getI18n, this));
            return this;
        },
        getI18n: function(i18no){
            i18no.loadMessages("Countdown").then(_bind(this.setI18n, this));
        },
        setI18n: function(i18n){
            var msgo = i18n._messages.en, msgs = Object.keys(msgo);
            while (msgs.length){
                var msg = msgs.shift();
                this.i18n[msg] = {
                    parse: i18n.msg(msg).parse(),
                    escape: i18n.msg(msg).escape(),
                    plain: i18n.msg(msg).plain(),
                    _default: "escape"
                };
            }
        },
        fire: function(name){},
        on: function(name, callbacks){},
        off: function(name, callback){}
    };
});