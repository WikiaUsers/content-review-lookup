/* Any JavaScript here will be loaded for all users on every page load. */

//Gif Hover
$("img", "#gifs-rows").hover(function() {
  $('.preset-file').toggle();
  $('.gif-file').toggle();
});

//Auto change theme by month function
var monthcss = 'MediaWiki:' + [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ][new Date().getMonth()] + '.css';

function importMWCSS(title) {
   var url = mw.config.get('wgScript') + ('?title='+title+'&action=raw&ctype=text/css');
   var link = document.createElement('link');
   link.type = 'text/css';
   link.rel = 'stylesheet';
   link.href = url;
   document.getElementsByTagName('head') [0].appendChild(link);
};

importMWCSS(monthcss);

/* Custom Tooltips for use with the Tooltips/code.js */
var tooltips_list = [{
       classname: 'card-icon',
       parse: '{'+'{Tooltip/Card|<#card#>}}'
   },{
       classname: 'character-icon',
       parse: '{'+'{Tooltip/Card2|<#card2#>}}'
   },{
       classname: 'panel-icon',
       parse: '{'+'{Tooltip/Panel|<#panel#>}}'
   },{
       classname: 'fieldevents-icon',
       parse: '{'+'{Tooltip/FieldEvents|<#fieldevents#>}}'
   },
];

/**
 * Implement a timezone-adjusted clock
 * . Looks for elements with class "js-tzclock"
 * . Supports any timezone, not just the user's or UTC
 * . Supports multiple clocks per page
 * . Supports optional daylight saving time
 *
 * Configuration is adapted from tzdata format
 * . Optional comments begin with # (pound/octothorpe)
 * . Spaces in strings must use _ (underscore)
 * .   Underscore is replaced with a space when running
 * . + (plus) is optional for positive time offsets
 * . Basic zone definition must come before any rules
 * . Rules, if there are any, must be in chronological order
 * . NAME is location name displayed in clock (any string)
 * . UTCOFF is offset from UTC ([+|-]hh[:mm])
 * . ZONE is the timezone name (any string)
 * . IN is the month name for a rule (3-letter in English)
 * . ON is the date (numerical date, lastDay, or Day>=date)
 * .   If used, Day is 3-letter in English
 * . AT is the standard time at which the rule takes effect (24-hour)
 * . SAVE is the amount of time added to standard time (hh[:mm])
 * . LETTERS is the zone name when the rule is in effect (any string)
 *
 * Example clock configurations:
 *
 * <div class="js-tzclock"><nowiki>
 * # NAME          UTCOFF  ZONE
 * New_York        -5:00   EST
 * # IN    ON      AT      SAVE    LETTERS
 * Mar     Sun>=8  2:00    1       EDT # 2nd Sunday in March
 * Nov     Sun>=1  2:00    0       EST # 1st Sunday in November
 * </nowiki></div>
 *
 * <div class="js-tzclock"><nowiki>
 * # NAME          UTCOFF  ZONE
 * London          0:00    GMT
 * # IN    ON      AT      SAVE    LETTERS
 * Mar     lastSun 1:00    1       BST # last Sunday in March
 * Oct     lastSun 1:00    0       GMT # last Sunday in October
 * </nowiki></div>
 *
 * <div class="js-tzclock"><nowiki>
 * # NAME          UTCOFF  ZONE
 * Tokyo           9:00    JST # no daylight time in Japan
 * </nowiki></div>
 *
 * <div class="js-tzclock"><nowiki>
 * # NAME          UTCOFF  ZONE
 * Adelaide        +9:30   CST
 * # IN    ON      AT      SAVE    LETTERS
 * Apr     Sun>=1  2:00    0       CST # 1st Sunday in April
 * Oct     Sun>=1  2:00    1       CDT # 1st Sunday in October
 * </nowiki></div>
 *
 * <nowiki> ... </nowiki> may not be essential
 *   for all clock configurations, but it is recommended
 *   to stop MediaWiki from interfering with them
 */
(function ($) {
    'use strict';

    var
        clock = []; // all clock data

    // calculate day of week using Zeller's algorithm
    // 0 = Saturday, ..., 6 = Friday
    function zeller(d, m, y) {
        var
            Y = y - (m < 3 ? 1 : 0),
            c = Math.floor(Y / 100),
            w;

        m += (m < 3) ? 12 : 0;
        y = Y % 100;
        w = (d + Math.floor(13 * (m + 1) / 5) + y +
            Math.floor(y / 4) + Math.floor(c / 4) - 2 * c) % 7;
        return (w < 0) ? w + 7 : w;
    }

    // convert [+|-]h[:m] to seconds
    function parseHM(s) {
        var
            sign = s.charAt(0) === '-' ? -1 : 1;

        s = (s.replace(/[+\-]/, '') + ':0').split(':');
        return sign * (parseInt(s[0], 10) * 60 + parseInt(s[1], 10)) * 60;
    }

    // parse the daylight saving rule for the given year
    // return epoch seconds (local time)
    function parseRule(year, rule) {
        var
            inMonth = rule[0],
            onDay = rule[1],
            atHour = rule[2],
            week = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            m = $.inArray(inMonth, [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]) + 1,
            last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1],
            d;

        if ((m === 2) &&
            (((year % 100 !== 0) && (year % 4 === 0)) || (year % 400 === 0))) {
            // leap year, in the unlikely event daylight saving switches in Feb
            last = 29;
        }
        if (/^\d+$/.test(onDay)) {
            // pure number
            d = parseInt(onDay, 10);
        } else if (onDay.substr(0, 4) === 'last') {
            // last day of week of month
            d = last;
            d -= (zeller(d, m, year) + 7 - $.inArray(onDay.substr(4), week)) % 7;
        } else if (onDay.substr(3, 2) === '>=') {
            // day of week at/after date
            d = parseInt(onDay.substr(5), 10);
            d += ($.inArray(onDay.substr(0, 3), week) + 7 - zeller(d, m, year)) % 7;
        } else {
            // error
            return;
        }
        // ISO format the date and return epoch seconds
        // atHour is local time, so the return is local time, despite the Z
        return Date.parse(
            year.toString() + '-' + ('0' + m.toString()).substr(-2) +
                '-' + ('0' + d.toString()).substr(-2) + 'T00:00:00Z'
        ) / 1000 + atHour;
    }

    // read tz configs from clock elements
    // populate the clock global object
    // data = jQuery collection of clock elements
    // NB: strings inserted into the DOM with $().text()
    //   CANNOT be escaped per OWASP XSS recommendations,
    //   because $().text() uses document.createTextNode,
    //   which does not unescape the entities
    // NB: text nodes are unparsed by the DOM engine
    //   hence there is no XSS or injection risk
    // NB: literal strings that use $().text are
    //   name (0), zone (2), and letters (7 & 12)
    function getConfig(data) {
        var
            i;

        data.each(function (i, e) {
            var
                text = $(e).text()
                    .replace(/#.*?(\n|$)/g, '$1') // remove all comments
                    .replace(/\s+/g, ' ')         // compress whitespace
                    .replace(/^\s|\s$/g, '')      // trim
                    .split(' '),                  // tokenize
                c;

            // process tokens, sanitizing them along the way
            if ((text.length === 3) || (text.length === 13)) {
                // basic zone definition
                c = clock[i] = {
                    e: $(e),
                    name: text[0]           // location description
                        .replace(/_/g, ' '),  // translate spaces
                    utcoff: parseHM(text[1] // [+|-]hh:mm UTC offset
                        .replace(/[^+\-\d:]/g, '')
                    ),
                    zone: text[2]           // zone designator
                        .replace(/_/g, ' '),  // translate spaces
                };
                if (text.length === 13) {
                    // daylight time rules
                    c.year = 1; // truthy, but purposefully wrong
                    c.rule1 = [
                        text[3]         // in month (Jan - Dec)
                            .replace(/[^a-zA-Z]/g, ''),
                        text[4]         // on day (number, last, >=)
                            .replace(/[^a-zA-Z>=\d]/g, ''),
                        parseHM(text[5] // at time hh:mm
                            .replace(/[^\d:]/g, '')
                        )
                    ];
                    c.rule2 = [
                        text[8]          // in month (Jan - Dec)
                            .replace(/[^a-zA-Z]/g, ''),
                        text[9]          // on day (number, last, >=)
                            .replace(/[^a-zA-Z>=\d]/g, ''),
                        parseHM(text[10] // at time hh:mm
                            .replace(/[^\d:]/g, '')
                        )
                    ];
                    c.save1 = parseHM(text[6]  // daylight adjust hh:mm
                        .replace(/[^\d:]/g, '')
                    );
                    c.save2 = parseHM(text[11] // daylight adjust hh:mm
                        .replace(/[^\d:]/g, '')
                    );
                    c.letters1 = text[7]   // zone designator
                        .replace(/_/g, ' '); // translate spaces
                    c.letters2 = text[12]  // zone designator
                        .replace(/_/g, ' '); // translate spaces
                }
            } else {
                // error
                clock[i] = null;
                $(e).empty().text('Incorrect number of data for clock');
            }
        });
        i = 0;
        while (i < clock.length) {
            if (clock[i]) {
                ++i; // no error yet, keep
            } else {
                clock.splice(i, 1); // error, discard
            }
        }
    }

    // handle timer event
    function onTick() {
        var
            now = Math.floor(Date.now() / 1000), // epoch in seconds
            time, year, i, c;

        for ( i = 0; i < clock.length; ++i ) {
            c = clock[i];
            time = now + c.utcoff; // local epoch
            year = (new Date(time * 1000)).getUTCFullYear();  // Date() takes msec
            if (c.year) {
                if (year !== c.year) {
                    // Happy New Year (maybe)
                    // (re)parse the rules for the calendar year
                    c.year = year;
                    c.switch1 = parseRule(year, c.rule1);
                    c.switch2 = parseRule(year, c.rule2);
                }
                // apply the rules
                if ((time >= c.switch1) && (time < c.switch2)) {
                    time += c.save1;
                    c.zone = c.letters1;
                } else {
                    time += c.save2;
                    c.zone = c.letters2;
                }
            }
            // mostly RFC-822/RFC-1123 time string
            // See comment about $().text() at getConfig()
            var thetime;
            if (window.TZclockSimpleFormat) {
                thetime = (new Date(time * 1000)).toUTCString()
                    .replace(/Sun, |Mon, |Tue, |Wed, |Thu, |Fri, |Sat, /, '') // remove day name
                    .replace(/\s\d\d\d\d/, ',')                               // remove year
                    .replace(/:\d\d\sGMT/, '');                               // remove seconds and GMT
            } else {
                thetime = (new Date(time * 1000)).toUTCString()
                    .replace(/\d{4}/, '$&,')                // add comma after year
                    .replace(/ 0/g, ' ')                    // no leading zero on date/hour
                    .replace(/UT|GMT/, '(' + c.zone + ')'); // "local" zone designation
            }
            
            $('.js-tzclock-time', c.e).text(thetime);
        }
        // set timeout for next tick
        setTimeout(onTick, 1100 - Date.now() % 1000);
    }

    // main routine
    // look for signature classes, init, and run
    $(function () {
        var
            data = $('.js-tzclock'),
            dom = String.prototype.concat(
                '<div class="js-tzclock-wrap">',
                    '<div class="js-tzclock-lctn"></div>',
                    '<div class="js-tzclock-time"></div>',
                '</div>'
            ),
            e, i;

        if (data.length) {
            getConfig(data);
            if (clock.length) {
                // init formats with names
                for ( i = 0; i < clock.length; ++i ) {
                    e = clock[i].e.empty().append(dom);
                    // See comment about $().text() at getConfig()
                    $('.js-tzclock-lctn', e).text(clock[i].name);
                }
                // fake the first tick
                setTimeout(onTick);
            }
        }
    });
}(jQuery));

var article = ".page-content";

var Tooltips = {
    hideClasses: [],
    cache: {},
    activeHover: false,
    enabled: true,
    activeVersion: ''
};
var $tfb, $ttfb, $htt;

function hideTip() {
    $tfb.removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
    $tfb.children().remove();
    if ($(this).data('ahl-id') == Tooltips.activeHover) Tooltips.activeHover = null;
}

function displayTip(e) {
    $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $htt.not(":empty").css("visibility", "visible");
    moveTip(e);
}

function moveTip(e) {
    var $ct = $htt.not(":empty");
    var eh = $ct.innerHeight() + 20,
        wh = $(window).height();
    var newTop = e.clientY + ((e.clientY > (wh / 2)) ? -eh : 20);
    var newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($ct.innerWidth() + 20) : 20);
    newTop = Math.max(105, Math.min(wh - eh, newTop));
    $ct.css({
        "position": "fixed",
        "top": newTop + "px",
        "left": newLeft + "px"
    });
}

// AJAX tooltips
function showTipFromCacheEntry(e, url, tag, n, ref,tags) { 
    var h;
    var foundone = false; 
    $tfb.html("");
    for (var i = 0; i < tag.length; i++) {
        var n2 = n[i]; 
        if (n2) { 
            if (n[i] == "X" || n[i] == "") { 
                n2 = "X"; 
            } 
            var h = Tooltips.cache[url + " " + tag[i]];
            if (!h) {
                h = Tooltips.cache[url].find(tag[i]);
                if (h.length) Tooltips.cache[url + " " + tag[i]] = h;
            }
            if (h.length) {
                foundone = true;
                h.css("display", "").addClass("tooltip-content" + n2).addClass("tooltip-contentX"); 
                $tfb.html($tfb.html() + "<div style='display:inline-block;' class='tooltip-content" + n2+" tooltip-contentX'>"+h.html()+"</div>");
            }
        }
    }
    if (foundone == false) {
        $tfb.html('<div class="tooltip-contentX"><b>Notice</b><br />Trying backup-target</div>'); 
        var founddefault = false;
        for(var i=0;i<tag.length;i++){
            if(tag[i]=="div.tooltip-content"){
                 founddefault = true;
            }
        }
        if(founddefault==false){ //Should prevent looping, incase nothing is found at all
             showTip(e,ref); //Try to fallback on 'default'
        }else{
            $tfb.html('<div class="tooltip-contentX"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>'); 
        }
    }
    displayTip(e);
}

function showTip(e,f) { 
    var special=false;
    if(!f){
        f=$(this);
    }else{
        special=true;
    }

    var a = $(f).attr("class").split(" "),
        i;

    if(special==true){ //Fallback
        a=[];
        a[0]="";
    }
    if (!a) {
        a[0] = "";
    }
    var retarr = [];
    var retarr2 = []; 
    var ref=$(f);
    var cc = 0;
    if (a.length > 1) {
        cc = 1;
    }
    for (i = 0; i < a.length; i++) {
        var n = a[i];
        var n2 = n;
        if (i == 0 && a.length != 1) {} else {
            if (a[i] == "ajaxttlink" || a[i] == "X" || a[i] == "") {
                n = "";
                n2 = "X";
            }
            tagOutput = 'div[class*="tooltip-content' + n + '"]';
            retarr[i] = n2; 
            if (!Tooltips.enabled) return;
            var $t = $(f),
                ks = Tooltips.hideClasses,
                $p = $t.parent();
            if ($p.hasClass("selflink") == false) {
                for (var j = 0; j < ks.length; j++) {
                    if ($t.hasClass(ks[j])) return;
                }
                var tooltipIdentifier = "div.tooltip-content" + n,
                    tooltipTag = $t.attr("class").match(/taggedttlink(-[^\s]+)/);
                retarr2[i] = tooltipIdentifier;
                if (n == "-multiple") {
                	retarr2 = [];
	            	multiTagOutput = "-";
	            	tags = $(f).data("tt-tags");
	            	for (var tag in tags) {
	            		if (tag > 0) multiTagOutput += '"],div[class*="tooltip-content-';
	            		multiTagOutput += tags[tag].replace(/[ ()]/g,'_');
	            		retarr[tag] = 'X';
	            		retarr2[tag] = "div.tooltip-content-"+tags[tag].replace(/[ ()]/g,'_');
	            	}
	            	tagOutput = 'div[class*="tooltip-content' + multiTagOutput + '"]';
                }
                if ($t.hasClass("versionsttlink")) tooltipIdentifier += Tooltips.activeVersion;
                else if (tooltipTag) tooltipIdentifier += tooltipTag[1];
                var url = "/index.php?title=" + encodeURIComponent(decodeURIComponent($t.data("tt"))) + "&redirect=no&action=render " + tagOutput;
                var tipId = url + " " + tooltipIdentifier;
                Tooltips.activeHover = tipId;
                $t.data('ahl-id', tipId); 
                if (!Tooltips.cache[url]) { 
                    $('<div style="display: none"/>').load(url, function(text) {  
                        cc++;
                        if (!text) return; // Occurs when navigating away from the page cancels the XHR
                        Tooltips.cache[url] = $(this); 
                        if (tipId != Tooltips.activeHover) return;
                        if (cc == retarr.length) { 
                            showTipFromCacheEntry(e, url, retarr2, retarr,ref);
                        }

                    });
                } else {  
                    cc++;
                    if (cc == retarr.length) { 
                        showTipFromCacheEntry(e, url, retarr2, retarr,ref);
                    }
                }
            }
        }
    }
}

Tooltips.toggleTooltipClassDisplay = function(className, setTo) {
    var ci = this.hideClasses.indexOf(className);
    if (setTo === undefined) setTo = ci < 0;
    if (ci < 0 && setTo === false) {
        this.hideClasses.push(className);
    } else if (ci >= 0 && setTo === true) {
        this.hideClasses.splice(ci, 1);
    }
};
Tooltips.setActivePageVersion = function(versionName) {
    this.activeVersion = versionName;
};

// quick tooltips
function hideTemplateTip() {
    $ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}

function showTemplateTip(e) {
    $ttfb.html('<div class="tooltip-content"><div class="mainbordercolor1px main-tooltip" style="padding: 5px;">' + $(this).next().html() + '</div></div>');
    displayTip(e);
}

function bindTT() {
    var $t = $(this),
        $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
        
    }
}

function tooltipsInit(root) {
    if ($tfb == null) {
        $(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
        $tfb = $("#tfb");
        $ttfb = $("#templatetfb");
        $htt = $("#tfb,#templatetfb");
    }
    root.find(".ajaxoutertt > a").wrapInner('<span class="ajaxttlink" />');
    root.find(".ajaxoutertt, .ajaxoutertt-soft").each(function() {
        var cn = this.className.replace(/(?:^|\s)ajaxoutertt[^\s]*/, "").replace(/^\s+|\s+$/g, "");
        if (cn) $(this).find("span.ajaxttlink").addClass(cn);
    });
    root.find("span.ajaxttlink,img.ajaxttimg").each(bindTT);
    root.find(".character-icon a, .panel-icon a").removeAttr("title");
    root.find("span.tttemplatelink").hover(showTemplateTip, hideTemplateTip).mousemove(moveTip).find("a").removeAttr("title");
}

$(function() {
	$('#bodyContent').addClass('page-content');
    tooltipsInit($(article));
});

// __NOWYSIWYG__
/**
 * Countdown
 *
 * @version 2.1
 *
 * @author Pecoes <https://c.wikia.com/wiki/User:Pecoes>
 * @author Asaba <https://dev.wikia.com/wiki/User:Asaba>
 *
 * Version 1 authors:
 * - Splarka <https://c.wikia.com/wiki/User:Splarka>
 * - Eladkse <https://c.wikia.com/wiki/User:Eladkse>
 *
 * documentation and examples at:
 * <https://dev.wikia.com/wiki/Countdown>
 */
 
/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/
 
;(function (module, mw, $, undefined) {
 
	'use strict';
 
	var translations = $.extend(true, {
		// English (English)
		en: {
			and: 'and',
			second: 'second',
			seconds: 'seconds',
			minute: 'minute',
			minutes: 'minutes',
			hour: 'hour',
			hours: 'hours',
			day: 'day',
			days: 'days'
		},
	}, module.translations || {}),
	i18n = translations[
		mw.config.get('wgContentLanguage')
	] || translations.en;
 
	var countdowns = [];
 
	var NO_LEADING_ZEROS = 1,
	SHORT_FORMAT = 1,
	NO_ZEROS = 4;
 
	function output (i, diff) {
		/*jshint bitwise:false*/
		var delta, result, parts = [];
		delta = diff % 60;
		//result = ' ' + i18n[delta === 1 ? 'second' : 'seconds'];
		//if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		//parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 60;
		result = ' ' + i18n[delta === 1 ? 'minute' : 'minutes'];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 24;
		result = ' ' + i18n[delta === 1 ? 'hour'   : 'hours'  ];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 24);
		result = ' ' + i18n[diff  === 1 ? 'day'    : 'days'   ];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(diff  + result);
		result = parts.pop();
		if (countdowns[i].opts & NO_LEADING_ZEROS) {
			while (parts.length && parts[0][0] === '0') {
				parts.shift();
			}
		}
		if (countdowns[i].opts & NO_ZEROS) {
			parts = parts.filter(function(part) {
				return part[0] !== '0';
			});
		}
		if (parts.length) {
			if (countdowns[i].opts & SHORT_FORMAT) {
				result = parts.join(' ') + ' ' + result;
			} else {
				result = parts.join(', ') + ' ' + i18n.and + ' ' + result;
			}
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
			if (toggle && toggle == 'next') {
				c.next().css('display', 'inline');
				c.css('display', 'none');
				return true;
			}
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
		return false;
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
			if (/short-format/.test(text)) {
				opts |= SHORT_FORMAT;
			}
			if (/no-zeros/.test(text)) {
				opts |= NO_ZEROS;
			}
		}
		return opts;
	}
 
	function toggleInit() {
		var countdown = $('.countdown:not(.handled)');
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
		countdown.addClass('handled');
		if (countdowns.length) {
			update();
		}
	}
 
	mw.hook('wikipage.content').add(toggleInit);
 
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));

/* Gonna try to set these through CSS instead, to not have them jump
$(function() {
    $( '#firstHeading' ).append( $( '#icons' ) );
    $( '#icons' ).css( { 'position' : 'absolute', 'right' : '0.6em', 'top' : '0.1em' } ).show();
});
*/
// Audio can only play 1 element at a time
$(function(){
    $("audio").on("play", function() {
        $("audio").not(this).each(function(index, audio) {
            audio.pause();
        });
    });
});