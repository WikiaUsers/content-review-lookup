/* Any JavaScript here will be loaded for all users on every page load. */
/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, 
 bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, 
 unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
 
(function (module) {
 
    'use strict';
 
    /*!
     * contentloaded.js
     *
     * Author: Diego Perini (diego.perini at gmail.com)
     * Summary: cross-browser wrapper for DOMContentLoaded
     * Updated: 20101020
     * License: MIT
     * Version: 1.2
     *
     * URL:
     * http://javascript.nwbox.com/ContentLoaded/
     * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
     *
     */
 
    // @win window reference
    // @fn function reference
    function contentLoaded(win, fn) {
 
        var done = false, top = true,
 
        doc = win.document, root = doc.documentElement,
 
        add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
        rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
        pre = doc.addEventListener ? '' : 'on',
 
        init = function(e) {
            if (e.type === 'readystatechange' && doc.readyState !== 'complete') return;
            (e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        },
 
        poll = function() {
            try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
            init('poll');
        };
 
        if (doc.readyState === 'complete') fn.call(win, 'lazy');
        else {
            if (doc.createEventObject && root.doScroll) {
                try { top = !win.frameElement; } catch(e) { }
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }
    }
 
    var callbacks = [], ready = false;
    contentLoaded(window, function () {
        ready = true;
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](window.mediaWiki || {}, window.jQuery || window.$);
        }
    });
 
    module.ready = function (callback) {
        if (typeof callback !== 'function') {
            throw new Error('expected function as parameter');
        }
        if (ready) {
            callback(window.mediaWiki || {}, window.jQuery || window.$);
        } else {
            callbacks.push(callback);
        }
    };
 
}((window.dev = window.dev || {}).verbatim = window.dev.verbatim || {}));
var global_link = '';
window.dev.verbatim.ready(function (mw, $) {
$(function() {
    var index = 
[{"series":"原著","volume":"权力的游戏","title":"序章","link":"权力的游戏-序章"},
{"series":"原著","volume":"权力的游戏","title":"章节 1布兰 I","link":"权力的游戏-章节_1"},
{"series":"原著","volume":"权力的游戏","title":"章节 2凯特琳 I","link":"权力的游戏-章节_2"},
{"series":"原著","volume":"权力的游戏","title":"章节 3丹妮莉丝 I","link":"权力的游戏-章节_3"},
{"series":"原著","volume":"权力的游戏","title":"章节 4艾德 I","link":"权力的游戏-章节_4"},
{"series":"原著","volume":"权力的游戏","title":"章节 5琼恩 I","link":"权力的游戏-章节_5"},
{"series":"原著","volume":"权力的游戏","title":"章节 6凯特琳 II","link":"权力的游戏-章节_6"},
{"series":"原著","volume":"权力的游戏","title":"章节 7艾莉亚 I","link":"权力的游戏-章节_7"},
{"series":"原著","volume":"权力的游戏","title":"章节 8布兰 II","link":"权力的游戏-章节_8"},
{"series":"原著","volume":"权力的游戏","title":"章节 9提利昂 I","link":"权力的游戏-章节_9"},
{"series":"原著","volume":"权力的游戏","title":"章节 10琼恩 II","link":"权力的游戏-章节_10"},
{"series":"原著","volume":"权力的游戏","title":"章节 11丹妮莉丝 II","link":"权力的游戏-章节_11"},
{"series":"原著","volume":"权力的游戏","title":"章节 12艾德 II","link":"权力的游戏-章节_12"},
{"series":"原著","volume":"权力的游戏","title":"章节 13提利昂 II","link":"权力的游戏-章节_13"},
{"series":"原著","volume":"权力的游戏","title":"章节 14凯特琳 III","link":"权力的游戏-章节_14"},
{"series":"原著","volume":"权力的游戏","title":"章节 15珊莎 I","link":"权力的游戏-章节_15"},
{"series":"原著","volume":"权力的游戏","title":"章节 16艾德 III","link":"权力的游戏-章节_16"},
{"series":"原著","volume":"权力的游戏","title":"章节 17布兰 III","link":"权力的游戏-章节_17"},
{"series":"原著","volume":"权力的游戏","title":"章节 18凯特琳 IV","link":"权力的游戏-章节_18"},
{"series":"原著","volume":"权力的游戏","title":"章节 19琼恩 III","link":"权力的游戏-章节_19"},
{"series":"原著","volume":"权力的游戏","title":"章节 20艾德 IV","link":"权力的游戏-章节_20"},
{"series":"原著","volume":"权力的游戏","title":"章节 21提利昂 III","link":"权力的游戏-章节_21"},
{"series":"原著","volume":"权力的游戏","title":"章节 22艾莉亚 II","link":"权力的游戏-章节_22"},
{"series":"原著","volume":"权力的游戏","title":"章节 23丹妮莉丝 III","link":"权力的游戏-章节_23"},
{"series":"原著","volume":"权力的游戏","title":"章节 24布兰 IV","link":"权力的游戏-章节_24"},
{"series":"原著","volume":"权力的游戏","title":"章节 25艾德 V","link":"权力的游戏-章节_25"},
{"series":"原著","volume":"权力的游戏","title":"章节 26琼恩 IV","link":"权力的游戏-章节_26"},
{"series":"原著","volume":"权力的游戏","title":"章节 27艾德 VI","link":"权力的游戏-章节_27"},
{"series":"原著","volume":"权力的游戏","title":"章节 28凯特琳 V","link":"权力的游戏-章节_28"},
{"series":"原著","volume":"权力的游戏","title":"章节 29珊莎 II","link":"权力的游戏-章节_29"},
{"series":"原著","volume":"权力的游戏","title":"章节 30艾德 VII","link":"权力的游戏-章节_30"},
{"series":"原著","volume":"权力的游戏","title":"章节 31提利昂 IV","link":"权力的游戏-章节_31"},
{"series":"原著","volume":"权力的游戏","title":"章节 32艾莉亚 III","link":"权力的游戏-章节_32"},
{"series":"原著","volume":"权力的游戏","title":"章节 33艾德 VIII","link":"权力的游戏-章节_33"},
{"series":"原著","volume":"权力的游戏","title":"章节 34凯特琳 VI","link":"权力的游戏-章节_34"},
{"series":"原著","volume":"权力的游戏","title":"章节 35艾德 IX","link":"权力的游戏-章节_35"},
{"series":"原著","volume":"权力的游戏","title":"章节 36丹妮莉丝 IV","link":"权力的游戏-章节_36"},
{"series":"原著","volume":"权力的游戏","title":"章节 37布兰 V","link":"权力的游戏-章节_37"},
{"series":"原著","volume":"权力的游戏","title":"章节 38提利昂 V","link":"权力的游戏-章节_38"},
{"series":"原著","volume":"权力的游戏","title":"章节 39艾德 X","link":"权力的游戏-章节_39"},
{"series":"原著","volume":"权力的游戏","title":"章节 40凯特琳 VII","link":"权力的游戏-章节_40"},
{"series":"原著","volume":"权力的游戏","title":"章节 41琼恩 V","link":"权力的游戏-章节_41"},
{"series":"原著","volume":"权力的游戏","title":"章节 42提利昂 VI","link":"权力的游戏-章节_42"},
{"series":"原著","volume":"权力的游戏","title":"章节 43艾德 XI","link":"权力的游戏-章节_43"},
{"series":"原著","volume":"权力的游戏","title":"章节 44珊莎 III","link":"权力的游戏-章节_44"},
{"series":"原著","volume":"权力的游戏","title":"章节 45艾德 XII","link":"权力的游戏-章节_45"},
{"series":"原著","volume":"权力的游戏","title":"章节 46丹妮莉丝 V","link":"权力的游戏-章节_46"},
{"series":"原著","volume":"权力的游戏","title":"章节 47艾德 XIII","link":"权力的游戏-章节_47"},
{"series":"原著","volume":"权力的游戏","title":"章节 48琼恩 VI","link":"权力的游戏-章节_48"},
{"series":"原著","volume":"权力的游戏","title":"章节 49艾德 XIV","link":"权力的游戏-章节_49"},
{"series":"原著","volume":"权力的游戏","title":"章节 50艾莉亚 IV","link":"权力的游戏-章节_50"},
{"series":"原著","volume":"权力的游戏","title":"章节 51珊莎 IV","link":"权力的游戏-章节_51"},
{"series":"原著","volume":"权力的游戏","title":"章节 52琼恩 VII","link":"权力的游戏-章节_52"},
{"series":"原著","volume":"权力的游戏","title":"章节 53布兰 VI","link":"权力的游戏-章节_53"},
{"series":"原著","volume":"权力的游戏","title":"章节 54丹妮莉丝 VI","link":"权力的游戏-章节_54"},
{"series":"原著","volume":"权力的游戏","title":"章节 55凯特琳 VIII","link":"权力的游戏-章节_55"},
{"series":"原著","volume":"权力的游戏","title":"章节 56提利昂 VII","link":"权力的游戏-章节_56"},
{"series":"原著","volume":"权力的游戏","title":"章节 57珊莎 V","link":"权力的游戏-章节_57"},
{"series":"原著","volume":"权力的游戏","title":"章节 58艾德 XV","link":"权力的游戏-章节_58"},
{"series":"原著","volume":"权力的游戏","title":"章节 59凯特琳 IX","link":"权力的游戏-章节_59"},
{"series":"原著","volume":"权力的游戏","title":"章节 60琼恩 VIII","link":"权力的游戏-章节_60"},
{"series":"原著","volume":"权力的游戏","title":"章节 61丹妮莉丝 VII","link":"权力的游戏-章节_61"},
{"series":"原著","volume":"权力的游戏","title":"章节 62提利昂 VIII","link":"权力的游戏-章节_62"},
{"series":"原著","volume":"权力的游戏","title":"章节 63凯特琳 X","link":"权力的游戏-章节_63"},
{"series":"原著","volume":"权力的游戏","title":"章节 64丹妮莉丝 VIII","link":"权力的游戏-章节_64"},
{"series":"原著","volume":"权力的游戏","title":"章节 65艾莉亚 V","link":"权力的游戏-章节_65"},
{"series":"原著","volume":"权力的游戏","title":"章节 66布兰 VII","link":"权力的游戏-章节_66"},
{"series":"原著","volume":"权力的游戏","title":"章节 67珊莎 VI","link":"权力的游戏-章节_67"},
{"series":"原著","volume":"权力的游戏","title":"章节 68丹妮莉丝 IX","link":"权力的游戏-章节_68"},
{"series":"原著","volume":"权力的游戏","title":"章节 69提利昂 IX","link":"权力的游戏-章节_69"},
{"series":"原著","volume":"权力的游戏","title":"章节 70琼恩 IX","link":"权力的游戏-章节_70"},
{"series":"原著","volume":"权力的游戏","title":"章节 71凯特琳 XI","link":"权力的游戏-章节_71"},
{"series":"原著","volume":"权力的游戏","title":"章节 72丹妮莉丝 X","link":"权力的游戏-章节_72"},
{"series":"原著","volume":"权力的游戏","title":"附录","link":"权力的游戏-附录"},
{"series":"原著","volume":"列王的纷争","title":"序章","link":"列王的纷争-序章"},
{"series":"原著","volume":"列王的纷争","title":"章节 1艾莉亚 I","link":"列王的纷争-章节_1"},
{"series":"原著","volume":"列王的纷争","title":"章节 2珊莎 I","link":"列王的纷争-章节_2"},
{"series":"原著","volume":"列王的纷争","title":"章节 3提利昂 I","link":"列王的纷争-章节_3"},
{"series":"原著","volume":"列王的纷争","title":"章节 4布兰 I","link":"列王的纷争-章节_4"},
{"series":"原著","volume":"列王的纷争","title":"章节 5艾莉亚 II","link":"列王的纷争-章节_5"},
{"series":"原著","volume":"列王的纷争","title":"章节 6琼恩 I","link":"列王的纷争-章节_6"},
{"series":"原著","volume":"列王的纷争","title":"章节 7凯特琳 I","link":"列王的纷争-章节_7"},
{"series":"原著","volume":"列王的纷争","title":"章节 8提利昂 II","link":"列王的纷争-章节_8"},
{"series":"原著","volume":"列王的纷争","title":"章节 9艾莉亚 III","link":"列王的纷争-章节_9"},
{"series":"原著","volume":"列王的纷争","title":"章节 10戴佛斯 I","link":"列王的纷争-章节_10"},
{"series":"原著","volume":"列王的纷争","title":"章节 11席恩 I","link":"列王的纷争-章节_11"},
{"series":"原著","volume":"列王的纷争","title":"章节 12丹妮莉丝 I","link":"列王的纷争-章节_12"},
{"series":"原著","volume":"列王的纷争","title":"章节 13琼恩 II","link":"列王的纷争-章节_13"},
{"series":"原著","volume":"列王的纷争","title":"章节 14艾莉亚 IV","link":"列王的纷争-章节_14"},
{"series":"原著","volume":"列王的纷争","title":"章节 15提利昂 III","link":"列王的纷争-章节_15"},
{"series":"原著","volume":"列王的纷争","title":"章节 16布兰 II","link":"列王的纷争-章节_16"},
{"series":"原著","volume":"列王的纷争","title":"章节 17提利昂 IV","link":"列王的纷争-章节_17"},
{"series":"原著","volume":"列王的纷争","title":"章节 18珊莎 II","link":"列王的纷争-章节_18"},
{"series":"原著","volume":"列王的纷争","title":"章节 19艾莉亚 V","link":"列王的纷争-章节_19"},
{"series":"原著","volume":"列王的纷争","title":"章节 20提利昂 V","link":"列王的纷争-章节_20"},
{"series":"原著","volume":"列王的纷争","title":"章节 21布兰 III","link":"列王的纷争-章节_21"},
{"series":"原著","volume":"列王的纷争","title":"章节 22凯特琳 II","link":"列王的纷争-章节_22"},
{"series":"原著","volume":"列王的纷争","title":"章节 23琼恩 III","link":"列王的纷争-章节_23"},
{"series":"原著","volume":"列王的纷争","title":"章节 24席恩 II","link":"列王的纷争-章节_24"},
{"series":"原著","volume":"列王的纷争","title":"章节 25提利昂 VI","link":"列王的纷争-章节_25"},
{"series":"原著","volume":"列王的纷争","title":"章节 26艾莉亚 VI","link":"列王的纷争-章节_26"},
{"series":"原著","volume":"列王的纷争","title":"章节 27丹妮莉丝 II","link":"列王的纷争-章节_27"},
{"series":"原著","volume":"列王的纷争","title":"章节 28布兰 IV","link":"列王的纷争-章节_28"},
{"series":"原著","volume":"列王的纷争","title":"章节 29提利昂 VII","link":"列王的纷争-章节_29"},
{"series":"原著","volume":"列王的纷争","title":"章节 30艾莉亚 VII","link":"列王的纷争-章节_30"},
{"series":"原著","volume":"列王的纷争","title":"章节 31凯特琳 III","link":"列王的纷争-章节_31"},
{"series":"原著","volume":"列王的纷争","title":"章节 32珊莎 III","link":"列王的纷争-章节_32"},
{"series":"原著","volume":"列王的纷争","title":"章节 33凯特琳 IV","link":"列王的纷争-章节_33"},
{"series":"原著","volume":"列王的纷争","title":"章节 34琼恩 IV","link":"列王的纷争-章节_34"},
{"series":"原著","volume":"列王的纷争","title":"章节 35布兰 V","link":"列王的纷争-章节_35"},
{"series":"原著","volume":"列王的纷争","title":"章节 36提利昂 VIII","link":"列王的纷争-章节_36"},
{"series":"原著","volume":"列王的纷争","title":"章节 37席恩 III","link":"列王的纷争-章节_37"},
{"series":"原著","volume":"列王的纷争","title":"章节 38艾莉亚 VIII","link":"列王的纷争-章节_38"},
{"series":"原著","volume":"列王的纷争","title":"章节 39凯特琳 V","link":"列王的纷争-章节_39"},
{"series":"原著","volume":"列王的纷争","title":"章节 40丹妮莉丝 III","link":"列王的纷争-章节_40"},
{"series":"原著","volume":"列王的纷争","title":"章节 41提利昂 IX","link":"列王的纷争-章节_41"},
{"series":"原著","volume":"列王的纷争","title":"章节 42戴佛斯 II","link":"列王的纷争-章节_42"},
{"series":"原著","volume":"列王的纷争","title":"章节 43琼恩 V","link":"列王的纷争-章节_43"},
{"series":"原著","volume":"列王的纷争","title":"章节 44提利昂 X","link":"列王的纷争-章节_44"},
{"series":"原著","volume":"列王的纷争","title":"章节 45凯特琳 VI","link":"列王的纷争-章节_45"},
{"series":"原著","volume":"列王的纷争","title":"章节 46布兰 VI","link":"列王的纷争-章节_46"},
{"series":"原著","volume":"列王的纷争","title":"章节 47艾莉亚 IX","link":"列王的纷争-章节_47"},
{"series":"原著","volume":"列王的纷争","title":"章节 48丹妮莉丝 IV","link":"列王的纷争-章节_48"},
{"series":"原著","volume":"列王的纷争","title":"章节 49提利昂 XI","link":"列王的纷争-章节_49"},
{"series":"原著","volume":"列王的纷争","title":"章节 50席恩 IV","link":"列王的纷争-章节_50"},
{"series":"原著","volume":"列王的纷争","title":"章节 51琼恩 VI","link":"列王的纷争-章节_51"},
{"series":"原著","volume":"列王的纷争","title":"章节 52珊莎 IV","link":"列王的纷争-章节_52"},
{"series":"原著","volume":"列王的纷争","title":"章节 53琼恩 VII","link":"列王的纷争-章节_53"},
{"series":"原著","volume":"列王的纷争","title":"章节 54提利昂 XII","link":"列王的纷争-章节_54"},
{"series":"原著","volume":"列王的纷争","title":"章节 55凯特琳 VII","link":"列王的纷争-章节_55"},
{"series":"原著","volume":"列王的纷争","title":"章节 56席恩 V","link":"列王的纷争-章节_56"},
{"series":"原著","volume":"列王的纷争","title":"章节 57珊莎 V","link":"列王的纷争-章节_57"},
{"series":"原著","volume":"列王的纷争","title":"章节 58戴佛斯 III","link":"列王的纷争-章节_58"},
{"series":"原著","volume":"列王的纷争","title":"章节 59提利昂 XIII","link":"列王的纷争-章节_59"},
{"series":"原著","volume":"列王的纷争","title":"章节 60珊莎 VI","link":"列王的纷争-章节_60"},
{"series":"原著","volume":"列王的纷争","title":"章节 61提利昂 XIV","link":"列王的纷争-章节_61"},
{"series":"原著","volume":"列王的纷争","title":"章节 62珊莎 VII","link":"列王的纷争-章节_62"},
{"series":"原著","volume":"列王的纷争","title":"章节 63丹妮莉丝 V","link":"列王的纷争-章节_63"},
{"series":"原著","volume":"列王的纷争","title":"章节 64艾莉亚 X","link":"列王的纷争-章节_64"},
{"series":"原著","volume":"列王的纷争","title":"章节 65珊莎 VIII","link":"列王的纷争-章节_65"},
{"series":"原著","volume":"列王的纷争","title":"章节 66席恩 VI","link":"列王的纷争-章节_66"},
{"series":"原著","volume":"列王的纷争","title":"章节 67提利昂 XV","link":"列王的纷争-章节_67"},
{"series":"原著","volume":"列王的纷争","title":"章节 68琼恩 VIII","link":"列王的纷争-章节_68"},
{"series":"原著","volume":"列王的纷争","title":"章节 69布兰 VII","link":"列王的纷争-章节_69"},
{"series":"原著","volume":"列王的纷争","title":"附录","link":"列王的纷争-附录"},
{"series":"原著","volume":"冰雨的风暴","title":"序章","link":"冰雨的风暴-序章"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 1詹姆 I","link":"冰雨的风暴-章节_1"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 2凯特琳 I","link":"冰雨的风暴-章节_2"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 3艾莉亚 I","link":"冰雨的风暴-章节_3"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 4提利昂 I","link":"冰雨的风暴-章节_4"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 5戴佛斯 I","link":"冰雨的风暴-章节_5"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 6珊莎 I","link":"冰雨的风暴-章节_6"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 7琼恩 I","link":"冰雨的风暴-章节_7"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 8丹妮莉丝 I","link":"冰雨的风暴-章节_8"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 9布兰 I","link":"冰雨的风暴-章节_9"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 10戴佛斯 II","link":"冰雨的风暴-章节_10"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 11詹姆 II","link":"冰雨的风暴-章节_11"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 12提利昂 II","link":"冰雨的风暴-章节_12"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 13艾莉亚 II","link":"冰雨的风暴-章节_13"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 14凯特琳 II","link":"冰雨的风暴-章节_14"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 15琼恩 II","link":"冰雨的风暴-章节_15"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 16珊莎 II","link":"冰雨的风暴-章节_16"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 17艾莉亚 III","link":"冰雨的风暴-章节_17"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 18山姆威尔 I","link":"冰雨的风暴-章节_18"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 19提利昂 III","link":"冰雨的风暴-章节_19"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 20凯特琳 III","link":"冰雨的风暴-章节_20"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 21詹姆 III","link":"冰雨的风暴-章节_21"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 22艾莉亚 IV","link":"冰雨的风暴-章节_22"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 23丹妮莉丝 II","link":"冰雨的风暴-章节_23"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 24布兰 II","link":"冰雨的风暴-章节_24"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 25戴佛斯 III","link":"冰雨的风暴-章节_25"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 26琼恩 III","link":"冰雨的风暴-章节_26"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 27丹妮莉丝 III","link":"冰雨的风暴-章节_27"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 28珊莎 III","link":"冰雨的风暴-章节_28"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 29艾莉亚 V","link":"冰雨的风暴-章节_29"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 30琼恩 IV","link":"冰雨的风暴-章节_30"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 31詹姆 IV","link":"冰雨的风暴-章节_31"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 32提利昂 IV","link":"冰雨的风暴-章节_32"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 33山姆威尔 II","link":"冰雨的风暴-章节_33"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 34艾莉亚 VI","link":"冰雨的风暴-章节_34"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 35凯特琳 IV","link":"冰雨的风暴-章节_35"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 36戴佛斯 IV","link":"冰雨的风暴-章节_36"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 37詹姆 V","link":"冰雨的风暴-章节_37"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 38提利昂 V","link":"冰雨的风暴-章节_38"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 39艾莉亚 VII","link":"冰雨的风暴-章节_39"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 40布兰 III","link":"冰雨的风暴-章节_40"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 41琼恩 V","link":"冰雨的风暴-章节_41"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 42丹妮莉丝 IV","link":"冰雨的风暴-章节_42"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 43艾莉亚 VIII","link":"冰雨的风暴-章节_43"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 44詹姆 VI","link":"冰雨的风暴-章节_44"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 45凯特琳 V","link":"冰雨的风暴-章节_45"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 46山姆威尔 III","link":"冰雨的风暴-章节_46"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 47艾莉亚 IX","link":"冰雨的风暴-章节_47"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 48琼恩 VI","link":"冰雨的风暴-章节_48"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 49凯特琳 VI","link":"冰雨的风暴-章节_49"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 50艾莉亚 X","link":"冰雨的风暴-章节_50"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 51凯特琳 VII","link":"冰雨的风暴-章节_51"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 52艾莉亚 XI","link":"冰雨的风暴-章节_52"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 53提利昂 VI","link":"冰雨的风暴-章节_53"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 54戴佛斯 V","link":"冰雨的风暴-章节_54"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 55琼恩 VII","link":"冰雨的风暴-章节_55"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 56布兰 IV","link":"冰雨的风暴-章节_56"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 57丹妮莉丝 V","link":"冰雨的风暴-章节_57"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 58提利昂 VII","link":"冰雨的风暴-章节_58"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 59珊莎 IV","link":"冰雨的风暴-章节_59"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 60提利昂 VIII","link":"冰雨的风暴-章节_60"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 61珊莎 V","link":"冰雨的风暴-章节_61"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 62詹姆 VII","link":"冰雨的风暴-章节_62"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 63戴佛斯 VI","link":"冰雨的风暴-章节_63"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 64琼恩 VIII","link":"冰雨的风暴-章节_64"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 65艾莉亚 XII","link":"冰雨的风暴-章节_65"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 66提利昂 IX","link":"冰雨的风暴-章节_66"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 67詹姆 VIII","link":"冰雨的风暴-章节_67"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 68珊莎 VI","link":"冰雨的风暴-章节_68"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 69琼恩 IX","link":"冰雨的风暴-章节_69"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 70提利昂 X","link":"冰雨的风暴-章节_70"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 71丹妮莉丝 VI","link":"冰雨的风暴-章节_71"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 72詹姆 IX","link":"冰雨的风暴-章节_72"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 73琼恩 X","link":"冰雨的风暴-章节_73"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 74艾莉亚 XIII","link":"冰雨的风暴-章节_74"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 75山姆威尔 IV","link":"冰雨的风暴-章节_75"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 76琼恩 XI","link":"冰雨的风暴-章节_76"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 77提利昂 XI","link":"冰雨的风暴-章节_77"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 78山姆威尔 V","link":"冰雨的风暴-章节_78"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 79琼恩 XII","link":"冰雨的风暴-章节_79"},
{"series":"原著","volume":"冰雨的风暴","title":"章节 80珊莎 VII","link":"冰雨的风暴-章节_80"},
{"series":"原著","volume":"冰雨的风暴","title":"终章","link":"冰雨的风暴-终章"},
{"series":"原著","volume":"冰雨的风暴","title":"附录","link":"冰雨的风暴-附录"},
{"series":"原著","volume":"群鸦的盛宴","title":"序章","link":"群鸦的盛宴-序章"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 1先知 I","link":"群鸦的盛宴-章节_1"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 2侍卫队长 I","link":"群鸦的盛宴-章节_2"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 3瑟曦 I","link":"群鸦的盛宴-章节_3"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 4布蕾妮 I","link":"群鸦的盛宴-章节_4"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 5山姆威尔 I","link":"群鸦的盛宴-章节_5"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 6艾莉亚 I","link":"群鸦的盛宴-章节_6"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 7瑟曦 II","link":"群鸦的盛宴-章节_7"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 8詹姆 I","link":"群鸦的盛宴-章节_8"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 9布蕾妮 II","link":"群鸦的盛宴-章节_9"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 10珊莎 I","link":"群鸦的盛宴-章节_10"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 11海怪之女 I","link":"群鸦的盛宴-章节_11"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 12瑟曦 Ⅲ","link":"群鸦的盛宴-章节_12"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 13污点骑士 I","link":"群鸦的盛宴-章节_13"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 14布蕾妮 Ⅲ","link":"群鸦的盛宴-章节_14"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 15山姆威尔 II","link":"群鸦的盛宴-章节_15"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 16詹姆 II","link":"群鸦的盛宴-章节_16"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 17瑟曦 Ⅳ","link":"群鸦的盛宴-章节_17"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 18铁船长 I","link":"群鸦的盛宴-章节_18"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 19淹人 I","link":"群鸦的盛宴-章节_19"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 20布蕾妮 Ⅳ","link":"群鸦的盛宴-章节_20"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 21拥女王者 I","link":"群鸦的盛宴-章节_21"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 22艾莉亚 II","link":"群鸦的盛宴-章节_22"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 23阿莲 I","link":"群鸦的盛宴-章节_23"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 24瑟曦 Ⅴ","link":"群鸦的盛宴-章节_24"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 25布蕾妮 Ⅴ","link":"群鸦的盛宴-章节_25"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 26山姆威尔 III","link":"群鸦的盛宴-章节_26"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 27詹姆 III","link":"群鸦的盛宴-章节_27"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 28瑟曦 Ⅵ","link":"群鸦的盛宴-章节_28"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 29掠夺者 I","link":"群鸦的盛宴-章节_29"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 30詹姆 IV","link":"群鸦的盛宴-章节_30"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 31布蕾妮 Ⅵ","link":"群鸦的盛宴-章节_31"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 32瑟曦 Ⅶ","link":"群鸦的盛宴-章节_32"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 33詹姆 Ⅴ","link":"群鸦的盛宴-章节_33"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 34运河边的猫儿 I","link":"群鸦的盛宴-章节_34"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 35山姆威尔 IV","link":"群鸦的盛宴-章节_35"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 36瑟曦 Ⅷ","link":"群鸦的盛宴-章节_36"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 37布蕾妮 Ⅶ","link":"群鸦的盛宴-章节_37"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 38詹姆 Ⅵ","link":"群鸦的盛宴-章节_38"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 39瑟曦 Ⅸ","link":"群鸦的盛宴-章节_39"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 40高塔上的公主 I","link":"群鸦的盛宴-章节_40"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 41阿莲 II","link":"群鸦的盛宴-章节_41"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 42布蕾妮 Ⅷ","link":"群鸦的盛宴-章节_42"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 43瑟曦 Ⅹ","link":"群鸦的盛宴-章节_43"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 44詹姆 Ⅶ","link":"群鸦的盛宴-章节_44"},
{"series":"原著","volume":"群鸦的盛宴","title":"章节 45山姆威尔 V","link":"群鸦的盛宴-章节_45"},
{"series":"原著","volume":"群鸦的盛宴","title":"附录","link":"群鸦的盛宴-附录"},
{"series":"原著","volume":"魔龙的狂舞","title":"序章","link":"魔龙的狂舞-序章"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 1提利昂 I","link":"魔龙的狂舞-章节_1"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 2丹妮莉丝 I","link":"魔龙的狂舞-章节_2"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 3琼恩 I","link":"魔龙的狂舞-章节_3"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 4布兰 I","link":"魔龙的狂舞-章节_4"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 5提利昂 II","link":"魔龙的狂舞-章节_5"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 6商人的仆从","link":"魔龙的狂舞-章节_6"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 7琼恩 II","link":"魔龙的狂舞-章节_7"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 8提利昂 III","link":"魔龙的狂舞-章节_8"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 9戴佛斯 I","link":"魔龙的狂舞-章节_9"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 10琼恩 III","link":"魔龙的狂舞-章节_10"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 11丹妮莉丝 II","link":"魔龙的狂舞-章节_11"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 12臭佬 I","link":"魔龙的狂舞-章节_12"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 13布兰 II","link":"魔龙的狂舞-章节_13"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 14提利昂 IV","link":"魔龙的狂舞-章节_14"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 15戴佛斯 II","link":"魔龙的狂舞-章节_15"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 16丹妮莉丝 III","link":"魔龙的狂舞-章节_16"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 17琼恩 IV","link":"魔龙的狂舞-章节_17"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 18提利昂 V","link":"魔龙的狂舞-章节_18"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 19戴佛斯 III","link":"魔龙的狂舞-章节_19"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 20臭佬 II","link":"魔龙的狂舞-章节_20"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 21琼恩 V","link":"魔龙的狂舞-章节_21"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 22提利昂 VI","link":"魔龙的狂舞-章节_22"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 23丹妮莉丝 IV","link":"魔龙的狂舞-章节_23"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 24流亡首相 I","link":"魔龙的狂舞-章节_24"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 25风吹团员","link":"魔龙的狂舞-章节_25"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 26任性的新娘","link":"魔龙的狂舞-章节_26"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 27提利昂 VII","link":"魔龙的狂舞-章节_27"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 28琼恩 VI","link":"魔龙的狂舞-章节_28"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 29戴佛斯 IV","link":"魔龙的狂舞-章节_29"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 30丹妮莉丝 V","link":"魔龙的狂舞-章节_30"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 31梅丽珊卓","link":"魔龙的狂舞-章节_31"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 32臭佬 III","link":"魔龙的狂舞-章节_32"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 33提利昂 VIII","link":"魔龙的狂舞-章节_33"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 34布兰 III","link":"魔龙的狂舞-章节_34"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 35琼恩 VII","link":"魔龙的狂舞-章节_35"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 36丹妮莉丝 VI","link":"魔龙的狂舞-章节_36"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 37临冬城亲王","link":"魔龙的狂舞-章节_37"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 38监视者","link":"魔龙的狂舞-章节_38"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 39琼恩 VIII","link":"魔龙的狂舞-章节_39"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 40提利昂 IX","link":"魔龙的狂舞-章节_40"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 41变色龙","link":"魔龙的狂舞-章节_41"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 42国王的战利品","link":"魔龙的狂舞-章节_42"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 43丹妮莉丝 VII","link":"魔龙的狂舞-章节_43"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 44琼恩 IX","link":"魔龙的狂舞-章节_44"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 45盲眼女孩","link":"魔龙的狂舞-章节_45"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 46临冬城的鬼魂","link":"魔龙的狂舞-章节_46"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 47提利昂 X","link":"魔龙的狂舞-章节_47"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 48詹姆 I","link":"魔龙的狂舞-章节_48"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 49琼恩 X","link":"魔龙的狂舞-章节_49"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 50丹妮莉丝 VIII","link":"魔龙的狂舞-章节_50"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 51席恩 I","link":"魔龙的狂舞-章节_51"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 52丹妮莉丝 IX","link":"魔龙的狂舞-章节_52"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 53琼恩 XI","link":"魔龙的狂舞-章节_53"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 54瑟曦 I","link":"魔龙的狂舞-章节_54"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 55女王铁卫","link":"魔龙的狂舞-章节_55"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 56铁岛求婚者","link":"魔龙的狂舞-章节_56"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 57提利昂 XI","link":"魔龙的狂舞-章节_57"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 58琼恩 XII","link":"魔龙的狂舞-章节_58"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 59免职的骑士","link":"魔龙的狂舞-章节_59"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 60被拒的求婚者","link":"魔龙的狂舞-章节_60"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 61重生的狮鹫","link":"魔龙的狂舞-章节_61"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 62祭品","link":"魔龙的狂舞-章节_62"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 63维克塔利昂 I","link":"魔龙的狂舞-章节_63"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 64丑女孩","link":"魔龙的狂舞-章节_64"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 65瑟曦 II","link":"魔龙的狂舞-章节_65"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 66提利昂 XII","link":"魔龙的狂舞-章节_66"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 67废王者","link":"魔龙的狂舞-章节_67"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 68驯龙者","link":"魔龙的狂舞-章节_68"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 69琼恩 XIII","link":"魔龙的狂舞-章节_69"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 70女王之手","link":"魔龙的狂舞-章节_70"},
{"series":"原著","volume":"魔龙的狂舞","title":"章节 71丹妮莉丝 X","link":"魔龙的狂舞-章节_71"},
{"series":"原著","volume":"魔龙的狂舞","title":"终章","link":"魔龙的狂舞-终章"},
{"series":"原著","volume":"魔龙的狂舞","title":"附录","link":"魔龙的狂舞-附录"},
{"series":"原著","volume":"凛冬的寒风","title":"席恩","link":"凛冬的寒风-席恩章节"},
{"series":"原著","volume":"凛冬的寒风","title":"亚莲恩","link":"凛冬的寒风-亚莲恩章节"},
{"series":"原著","volume":"凛冬的寒风","title":"巴利斯坦","link":"凛冬的寒风-巴利斯坦章节"},
{"series":"原著","volume":"凛冬的寒风","title":"提利昂","link":"凛冬的寒风-提利昂章节"},
{"series":"原著","volume":"凛冬的寒风","title":"茉慈","link":"凛冬的寒风-艾莉亚章节"},
{"series":"原著","volume":"七王国的骑士","title":"雇佣骑士","link":"雇佣骑士"},
{"series":"原著","volume":"七王国的骑士","title":"誓言骑士","link":"誓言骑士"},
{"series":"原著","volume":"七王国的骑士","title":"神秘骑士","link":"神秘骑士"},
{"series":"原著","volume":"历史中篇","title":"公主与王后","link":"公主与王后"},
{"series":"原著","volume":"历史中篇","title":"游侠王子","link":"游侠王子"},
{"series":"电视剧","volume":"第一季","title":"1. TV:凛冬将至","link":"TV:凛冬将至"},
{"series":"电视剧","volume":"第一季","title":"2. TV:国王大道","link":"TV:国王大道"},
{"series":"电视剧","volume":"第一季","title":"3. TV:雪诺大人","link":" TV:雪诺大人"},
{"series":"电视剧","volume":"第一季","title":"4. TV:残缺之躯","link":"TV:残缺之躯"},
{"series":"电视剧","volume":"第一季","title":"5. TV:狮狼之爭","link":"TV:狮狼之爭"},
{"series":"电视剧","volume":"第一季","title":"6. TV:黄金宝冠","link":"TV:黄金宝冠"},
{"series":"电视剧","volume":"第一季","title":"7. TV:不胜则死","link":"TV:不胜则死"},
{"series":"电视剧","volume":"第一季","title":"8. TV:剑之尖端","link":"TV:剑之尖端"},
{"series":"电视剧","volume":"第一季","title":"9. TV:贝勒圣堂","link":"TV:贝勒圣堂"},
{"series":"电视剧","volume":"第一季","title":"10. TV:血火同源","link":"TV:血火同源"},
{"series":"电视剧","volume":"第二季","title":"1. TV:北境不忘","link":"TV:北境不忘"},
{"series":"电视剧","volume":"第二季","title":"2. TV:夜之国度","link":"TV:夜之国度"},
{"series":"电视剧","volume":"第二季","title":"3. TV:逝者不死","link":"TV:逝者不死"},
{"series":"电视剧","volume":"第二季","title":"4. TV:骸骨花园","link":"TV:骸骨花园"},
{"series":"电视剧","volume":"第二季","title":"5. TV:古堡幽灵","link":"TV:古堡幽灵"},
{"series":"电视剧","volume":"第二季","title":"6. TV:新旧诸神","link":"TV:新旧诸神"},
{"series":"电视剧","volume":"第二季","title":"7. TV:毁誉之人","link":"TV:毁誉之人"},
{"series":"电视剧","volume":"第二季","title":"8. TV:北国僭主","link":"TV:北国僭主"},
{"series":"电视剧","volume":"第二季","title":"9. TV:黑水大战","link":"TV:黑水大战"},
{"series":"电视剧","volume":"第二季","title":"10. TV:Valar Morghulis","link":"TV:Valar Morghulis"},
{"series":"电视剧","volume":"第三季","title":"1. TV:Valar Dohaeris","link":"TV:Valar Dohaeris"},
{"series":"电视剧","volume":"第三季","title":"2. TV:黑色翅膀，黑色消息","link":"TV:黑色翅膀，黑色消息"},
{"series":"电视剧","volume":"第三季","title":"3. TV:惩罚之旅","link":"TV:惩罚之旅"},
{"series":"电视剧","volume":"第三季","title":"4. TV:至死方休","link":"TV:至死方休"},
{"series":"电视剧","volume":"第三季","title":"5. TV:火吻而生","link":"TV:火吻而生"},
{"series":"电视剧","volume":"第三季","title":"6. TV:攀爬","link":"TV:攀爬"},
{"series":"电视剧","volume":"第三季","title":"7. TV:狗熊与美少女","link":"TV:狗熊与美少女"},
{"series":"电视剧","volume":"第三季","title":"8. TV:次子","link":"TV:次子"},
{"series":"电视剧","volume":"第三季","title":"9. TV:卡斯特梅的雨季","link":"TV:卡斯特梅的雨季"},
{"series":"电视剧","volume":"第三季","title":"10. TV:弥莎","link":"TV:弥莎"},
{"series":"电视剧","volume":"第四季","title":"1. TV:双剑","link":"TV:双剑"},
{"series":"电视剧","volume":"第四季","title":"2. TV:王家婚礼","link":"TV:王家婚礼"},
{"series":"电视剧","volume":"第四季","title":"3. TV:碎镣之人","link":"TV:碎镣之人"},
{"series":"电视剧","volume":"第四季","title":"4. TV:守誓之剑","link":"TV:守誓之剑"},
{"series":"电视剧","volume":"第四季","title":"5. TV:托曼一世","link":"TV:托曼一世"},
{"series":"电视剧","volume":"第四季","title":"6. TV:国法家法","link":"TV:国法家法"},
{"series":"电视剧","volume":"第四季","title":"7. TV:知更展翅","link":"TV:知更展翅"},
{"series":"电视剧","volume":"第四季","title":"8. TV:比武审判","link":"TV:比武审判"},
{"series":"电视剧","volume":"第四季","title":"9. TV:长城守望","link":"TV:长城守望"},
{"series":"电视剧","volume":"第四季","title":"10. TV:万生之子","link":"TV:万生之子"}]

    
    // set up initial list of series
    var series = get_distinct(index, 'series'); 
    $.each(series, function(index, value) {
       $('select#series').append('<option value="' + value + '">' + value + '</option>')
    });
    
    $('select').change(function() {
        // don't execute if this is the last select element
        if ($(this).is(':last')) {
            set_link($(this).val())
            return;
        }
        
        // clear all of the following select boxes, leaving a blank option
        $(this).nextAll().html('<option></option>');
        
        // get list of index filtered by all the previous parameters
        var filtered_vehicles = filter_vehicles();
        
        // get the next select element
        var next = $(this).next();
        
        // get the distinct values from our list of filtered vehicles
        var values = get_distinct(filtered_vehicles, next.attr('id'));
        
        // append our options
        $.each(values, function(index, value) {
            next.append('<option value="' + value + '">' + value + '</option>')
        });
        set_link($(this).val());
    });
       
    function filter_vehicles() {
        return $.grep(index, function(n, i) {
            if ($('#title').val() != '') 
                return n.series == $('#series').val() && n.volume == $('#volume').val() && n.title == $('#title').val();
            if ($('#volume').val() != '') 
                return n.series == $('#series').val() && n.volume == $('#volume').val();
            else
                return n.series == $('#series').val();
        });
    }
    
    // returns distinct properties from an array of objects
    function get_distinct(array, property) {
       var arr = [];
       
       $.each(array, function(index, value) {
           if ( $.inArray(value[property], arr) == -1 ) {
               arr.push(value[property]);
           }
       });
       
       return arr;
    }
    function set_link(args){
        $.each(index, function(index, value){
            if(value.title == args || value.volume == args || value.series == args ){
                global_link = value.link;
                return;
            }
        });
    }
});
});
function go_to_chapter(){
    if (global_link != ''){
    	addNewSectionForChapter( "剧情追踪器", (mw.config.get('wgUserName')?mw.config.get('wgUserName'):'匿名用户')+"使用了剧情追踪器前往："+global_link );
        window.location='http://zh.asoiaf.wikia.com/wiki/'+global_link;
    }
}
function addNewSectionForChapter( summary, content, editToken ) {
        $.ajax({
            url: mw.util.wikiScript( 'api' ),
            data: {
                format: 'json',
                action: 'edit',
                title: 'Portal:Usage',
                section: 'new',
                summary: summary,
                text: content,
                token: mw.user.tokens.get('editToken')
            },
            dataType: 'json',
            type: 'POST',
            success: function( data ) {
                if ( data && data.edit && data.edit.result == 'Success' ) {
                    //window.location.reload(); // reload page if edit was successful
                } else if ( data && data.error ) {
                    //alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                } else {
                    //alert( 'Error: Unknown result from API.' );
                }
            },
            error: function( xhr ) {
                //alert( 'Error: Request failed.' );
            }
        });
    }