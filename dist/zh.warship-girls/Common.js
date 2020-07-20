/* 此处的JavaScript将加载于所有用户每一个页面。 */
/* Custom Tooltips for use with the Tooltips/code.js */
var tooltips_list = [{
    classname: 'shipsdata-equip',
    parse: '{|style="white-space:nowrap;"\n!Parameter:\n|<#parameter#>\n|-\n!Lc:\n|{' + '{lc:<#parameter#>}}\n|-\n!Uc:\n|{' + '{uc:<#parameter#>}}\n|-\n!PAGENAME:\n|{' + '{PAGENAME}}\n|}',
}];
 
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true
};

//$(function(){alert("test");});

$(function() {
    var birtext = $("#Birthday_Twitter").attr('class');
    if (birtext === undefined) {
        return;
    }
    var temp1 = birtext.replace('[[', "");
    var ship = temp1.replace(']]', "");
    //Twitter
    if ($("#Birthday_Twitter").html("<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-url=\"http://warship-girls.wikia.com/wiki/"+  ship +"\" data-text='Happy birthday! " + ship + "!' data-via=\"WarshipGirlsWET\"  data-hashtags=\"WarshipGirls\" data-dnt=\"true\">Tweet</a>").length !== 0) {
        // Twitter Button
        !function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
                p = /^http:/.test(d.location) ? 'http' : 'https';
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = p + '://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, 'script', 'twitter-wjs');
    }
});


$(function() {
    if (location.href.indexOf('?action=edit') < 0) {
        if (document.getElementById("WikiaArticle").innerHTML.indexOf("hidden_on_mobile")>0)
            document.getElementById("WikiaArticle").innerHTML = document.getElementById("WikiaArticle").innerHTML.replace(/<div class="hidden_on_mobile">/, "<div>");
        if (document.getElementById("WikiaArticle").innerHTML.indexOf("hidden_on_desktop")>0)
            document.getElementById("WikiaArticle").innerHTML = document.getElementById("WikiaArticle").innerHTML.replace(/<div class="hidden_on_desktop">/, '<div class = "hidden">');
    }
});


//Purge Button
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PurgeButton/code.js'
    ]
});

//APICall
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:APICall/code.js'
    ]
});
/*countdown*/
 
/*********************************countdown******************/
/**
 * Countdown
 *
 * @version 2.1
 *
 * @author Pecoes <http://c.wikia.com/wiki/User:Pecoes>
 * @author Asaba <http://dev.wikia.com/wiki/User:Asaba>
 *
 * Version 1 authors:
 * - Splarka <http://c.wikia.com/wiki/User:Splarka>
 * - Eladkse <http://c.wikia.com/wiki/User:Eladkse>
 *
 * documentation and examples at:
 * <http://dev.wikia.com/wiki/Countdown>
 */
 
/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/
 
;(function (module, mw, $, undefined) {
 
    'use strict';
 
    var translations = $.extend(true, {
        // English (English)
        // Modified for custom format
        en: {
            and: '',
            second: '',
            seconds: '',
            minute: ':',
            minutes: ':',
            hour: ':',
            hours: ':',
            day: 'D ',
            days: 'D '
        }
    }, module.translations || {}),
    i18n = translations[
        mw.config.get('wgContentLanguage')
    ] || translations.en;
 
    var countdowns = [];
 
    var NO_LEADING_ZEROS = 1;
 
    function output (i, diff) {
        /*jshint bitwise:false*/
        var delta, result, parts = [];
        delta = diff % 60;
        parts.unshift(delta + '' + i18n[delta === 1 ? 'second' : 'seconds']);
        diff = Math.floor(diff / 60);
        delta = diff % 60;
        parts.unshift(delta + '' + i18n[delta === 1 ? 'minute' : 'minutes']);
        diff = Math.floor(diff / 60);
        delta = diff % 24;
        parts.unshift(delta + '' + i18n[delta === 1 ? 'hour'   : 'hours'  ]);
        diff = Math.floor(diff / 24);
        parts.unshift(diff  + '' + i18n[diff  === 1 ? 'day'    : 'days'   ]);
        result = parts.pop();
        if (countdowns[i].opts & NO_LEADING_ZEROS) {
            while (parts.length && parts[0][0] === '0') {
                parts.shift();
            }
        }
        for(var part in parts) {
            parts[part] = (parts[part] < 10 ? "0" + parts[part] : parts[part])
        }
        if (parts.length) {
            result = parts.join('') + '' + i18n.and + '' + result;
        }
        countdowns[i].node.text(result);
    }
 
    function end(i) {
        var c = countdowns[i].node.parent();
        switch (c.attr('data-end')) {
            case 'remove':
                c.remove();
                return true;
            case 'stop':
                output(i, 0);
                return true;
            case 'toggle':
                var toggle = c.attr('data-toggle');
                if (toggle && $(toggle).length) {
                    $(toggle).css('display', 'inline');
                    c.css('display', 'none');
                    return true;
                }
                break;
            case 'callback':
                var callback = c.attr('data-callback');
                if (callback && $.isFunction(module[callback])) {
                    output(i, 0);
                    module[callback].call(c);
                    return true;
                }
                break;
         }
         countdowns[i].countup = true;
         output(i, 0);
         //alert("test");
         //var time = new Date();
         //var year = time.getUTCFullYear();
         //var hours = time.getUTCHours();
         //var month = time.getUTCMonth();
         //var day = time.getUTCDate();
         //day+=1;
         //month+=1;
         //var result = month+" "+day+" "+year+" 03:00:00 +0800";
         //alert(result);
 
         //$('.countdowndate').empty();
         //$('.countdowndate').append(result);
         return false;
         //return true;
    }
 
    function update () {
        var now = Date.now();
        var countdownsToRemove = [];
        $.each(countdowns.slice(0), function (i, countdown) {
            var diff = Math.floor((countdown.date - now) / 1000);
            if (diff <= 0 && !countdown.countup) {
                if (end(i)) countdownsToRemove.push(i);
            } else {
                output(i, Math.abs(diff));
            }
        });
        var x;
        while((x = countdownsToRemove.pop()) !== undefined) {
            countdowns.splice(x, 1);
        }
        if (countdowns.length) {
            window.setTimeout(function () {
                update();
            }, 1000);
        }
    }
 
    function getOptions (node) {
        /*jshint bitwise:false*/
        var text = node.parent().attr('data-options'),
            opts = 0;
        if (text) {
            if (/no-leading-zeros/.test(text)) {
                opts |= NO_LEADING_ZEROS;
            }
        }
        return opts;
    }
 
    $(function () {
        var countdown = $('.countdown');
        if (!countdown.length) return;
        $('.nocountdown').css('display', 'none');
        countdown
        .css('display', 'inline')
        .find('.countdowndate')
        .each(function () {
            var $this = $(this),
                date = (new Date($this.text())).valueOf();
            if (isNaN(date)) {
                $this.text('BAD DATE');
                return;
            }
            countdowns.push({
                node: $this,
                opts: getOptions($this),
                date: date,
            });
        });
        if (countdowns.length) {
            update();
        }
    });
 
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));

$(document).ready(function(){

//Twitter
if($(".twitter_btn").html("<a class=\"twitter-timeline\" data-dnt=\"true\" href=\"https:\/\/twitter.com\/WarshipGirlsWET\" data-widget-id=\"604939858092523520\">Tweets by @WarshipGirlsWET<\/a>").length !== 0) {
	//Auto-generated code
	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
}

});