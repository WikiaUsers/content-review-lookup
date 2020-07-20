/* Any JavaScript here will be loaded for all users on every page load. */


/* Collapsible */
importScriptPage('ShowHide/code.js', 'dev');

/* Toggle */
// <syntax type="javascript">
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j in toggles)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j in toggles)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);
 
// </syntax>

/* Countdown */
;(function (module, mw, $) {
 
    'use strict';
 
    var translations = $.extend(true, {
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
        fr: {
            and: 'et',
            second: 'seconde',
            seconds: 'secondes',
            minute: 'minute',
            minutes: 'minutes',
            hour: 'heure',
            hours: 'heures',
            day: 'jour',
            days: 'jours'
        },
        es: {
            and: 'y',
            second: 'segundo',
            seconds: 'segundos',
            minute: 'minuto',
            minutes: 'minutos',
            hour: 'hora',
            hours: 'horas',
            day: 'día',
            days: 'días'
        },
        ca: {
            and: 'i',
            second: 'segon',
            seconds: 'segons',
            minute: 'minut',
            minutes: 'minuts',
            hour: 'hora',
            hours: 'hores',
            day: 'dia',
            days: 'dies'
        },
        'pt-br': {
            and: 'e',
            second: 'segundo',
            seconds: 'segundos',
            minute: 'minuto',
            minutes: 'minutos',
            hour: 'hora',
            hours: 'horas',
            day: 'dia',
            days: 'dias'
        },
        de: {
            and: 'und',
            second: 'Sekunde',
            seconds: 'Sekunden',
            minute: 'Minute',
            minutes: 'Minuten',
            hour: 'Stunde',
            hours: 'Stunden',
            day: 'Tag',
            days: 'Tage'
        },
        it: {
            and: 'e',
            second: 'secondo',
            seconds: 'secondi',
            minute: 'minuto',
            minutes: 'minuti',
            hour: 'ora',
            hours: 'ore',
            day: 'giorno',
            days: 'giorni'
        },
        nl: {
            and: 'en',
            second: 'seconde',
            seconds: 'seconden',
            minute: 'minuut',
            minutes: 'minuten',
            hour: 'huur',
            hours: 'huren',
            day: 'dag',
            days: 'dagen'
        },
        pl: {
            and: 'i',
            second: 'sekund(y)',
            seconds: 'sekund(y)',
            minute: 'minut(y)',
            minutes: 'minut(y)',
            hour: 'godzin(y)',
            hours: 'godzin(y)',
            day: 'dni',
            days: 'dni'
        },
        zh: {
            and: ' ',
            second: '秒',
            seconds: '秒',
            minute: '分',
            minutes: '分',
            hour: '小时',
            hours: '小时',
            day: '天',
            days: '天'
        },
        hu: {
            and: 'és',
            second: 'másodperc',
            seconds: 'másodperc',
            minute: 'perc',
            minutes: 'perc',
            hour: 'óra',
            hours: 'óra',
            day: 'nap',
            days: 'nap'
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
        parts.unshift(delta + ' ' + i18n[delta === 1 ? 'second' : 'seconds']);
        diff = Math.floor(diff / 60);
        delta = diff % 60;
        parts.unshift(delta + ' ' + i18n[delta === 1 ? 'minute' : 'minutes']);
        diff = Math.floor(diff / 60);
        delta = diff % 24;
        parts.unshift(delta + ' ' + i18n[delta === 1 ? 'hour'   : 'hours'  ]);
        diff = Math.floor(diff / 24);
        parts.unshift(diff  + ' ' + i18n[diff  === 1 ? 'day'    : 'days'   ]);
        result = parts.pop();
        if (countdowns[i].opts & NO_LEADING_ZEROS) {
            while (parts.length && parts[0][0] === '0') {
                parts.shift();
            }
        }
        if (parts.length) {
            result = parts.join(', ') + ' ' + i18n.and + ' ' + result;
        }
        countdowns[i].node.text(result);
    }
 
    function end(i) {
        var c = countdowns[i].node.parent();
        switch (c.attr('data-end')) {
            case 'remove':
                c.remove();
                countdowns.splice(i, 1);
                return;
            case 'stop':
                output(i, 0);
                countdowns.splice(i, 1);
                return;
            case 'toggle':
                var toggle = c.attr('data-toggle');
                if (toggle && $(toggle).length) {
                    $(toggle).css('display', 'inline');
                    c.css('display', 'none');
                    countdowns.splice(i, 1);
                    return;
                }
                break;
            case 'callback':
                var callback = c.attr('data-callback');
                if (callback && $.isFunction(module[callback])) {
                    output(i, 0);
                    countdowns.splice(i, 1);
                    module[callback].call(c);
                    return;
                }
                break;
        }
        countdowns[i].countup = true;
        output(i, 0);
    }
 
    function update () {
        var now = Date.now();
        $.each(countdowns.slice(0), function (i, countdown) {
            var diff = Math.floor((countdown.date - now) / 1000);
            if (diff <= 0 && !countdown.countup) {
                end(i);
            } else {
                output(i, Math.abs(diff));
            }
        });
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
//


// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['user']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

/* MediaWiki:Common.js */
try
{
	/* Any JavaScript here will be loaded for all users on every page load. */
	var tooltip=function()
	{
		var id = 'tooltip_mouseover';
		var top = 3;
		var left = 15;
		var speed = 10;
		var timer = 20;
		var endalpha = 98;
		var alpha = 0;
		var tt,h;
		var ie = document.all ? true : false;
		var ttArray = new Array();
		var ttArrayWidths = new Array();
		var current_article;
		return{
			create:function(v, w)
			{
				if(tt == null)
				{
					tt = document.createElement('div');
					tt.setAttribute('id',id);
					document.body.appendChild(tt);
					tt.style.opacity = 0;
					tt.style.position = 'absolute';
					tt.style.zIndex = 100;
					tt.style.border = '2px solid #000000';
					tt.style.backgroundColor = '#000000';
					tt.style.filter = 'alpha(opacity=0)';
					document.onmousemove = this.pos;
				}
				tt.style.display = 'block';
				tt.innerHTML = v;
				tt.style.width = w ? w : 'auto';
				h = parseInt(tt.offsetHeight) + top;
				clearInterval(tt.timer);
				tt.timer = setInterval(function(){tooltip.fade(1)},timer);
			},
			pos:function(e)
			{
				var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
				var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
				tt.style.top = (u-h) + 'px';
				tt.style.left = (l + left) + 'px';
			},
			fade:function(d)
			{
				var a = alpha;
				if((a != endalpha && d == 1) || (a != 0 && d == -1))
				{
					var i = speed;
					if(endalpha - a < speed && d == 1)
					{
						i = endalpha - a;
					}else if(alpha < speed && d == -1)
					{
						i = a;
					}
					alpha = a + (i * d);
					tt.style.opacity = alpha * .01;
					tt.style.filter = 'alpha(opacity=' + alpha + ')';
				}else
				{
					clearInterval(tt.timer);
					if(d == -1){tt.style.display = 'none'}
				}
			},
			hide:function()
			{
				if (tt != null) 
				{
					clearInterval(tt.timer);
					tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
				}
			},
			show:function(article, maxwidth)
			{
				current_article = article;
				if (ttArray[article] == null) 
				{
					ttArrayWidths[article] = maxwidth;
					tooltip.create('Retrieving information...', maxwidth);
					if (tooltip.access(article) == false) 
					{
						tt.innerHTML = 'Sorry, your browser is not compatible with tooltips.';
					}
				} 
				else 
				{
					tooltip.create(ttArray[article], ttArrayWidths[article]);
				}
			},
			update:function(httpRequest,article) 
			{
				if (httpRequest.readyState == 4) 
				{
					if (httpRequest.status == 200) 
					{
						if (tt != null && current_article == article) 
						{
							var searchStr = new RegExp('Click here to start this page!');
							if ((httpRequest.responseText).search(searchStr) != -1) 
							{
								tt.innerHTML = 'This article does not yet exist.';
							} 
							else 
							{
								searchStr = '<span id="tooltipstart"></span>';
								var startPoint = (httpRequest.responseText).indexOf(searchStr) + searchStr.length;
								if (startPoint != -1) 
								{
									var endPoint = (httpRequest.responseText).lastIndexOf('<span id="tooltipend"></span>');
									if (endPoint != -1)
									{
										tt.innerHTML = (httpRequest.responseText).substr(startPoint,endPoint-startPoint);
										ttArray[article] = tt.innerHTML;
										return;
									}
								}
								tt.innerHTML = 'This article does not yet have a properly formatted tooltip.';
							}
						}
						h = parseInt(tt.offsetHeight) + top;
					} 
					else 
					{
						if (tt != null) 
						{
							tt.innerHTML = 'Could not retrieve information.';
						}
					}
				}
			},
			access:function(article) 
			{
				var httpRequest;
				if (window.XMLHttpRequest) 
				{
					httpRequest = new XMLHttpRequest();
					if (httpRequest.overrideMimeType) 
					{
						httpRequest.overrideMimeType('text/xml');
					}
				}
				else if (window.ActiveXObject) 
				{
					try 
					{
						httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
					}
					catch (e) 
					{
						try 
						{
							httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
						}
						catch (e) {}
					}
				}
				if (!httpRequest) 
				{
					// Browser incompatible with AJAX
					return false;
				}
				httpRequest.onreadystatechange = function() 
				{ 
					tooltip.update(httpRequest,article); 
				};
				httpRequest.open('GET', 'http://shadowlandonline.wikia.com/index.php?action=render&title='+article+'&templates=expand', true);
				httpRequest.send();
			}
		};
	}();
	/* Check for tooltip links when document finishes loading */
	function mouseoverTooltip(article, maxwidth) {
		return function() 
		{
			article = article.replace(".27","'");
			tooltip.show(article, maxwidth);
		};
	}
	function putTooltips()
	{
		var spanArray = document.getElementsByTagName("span");
		for (var i=0 ; i<spanArray.length ; i++)
		{
			if (spanArray[i].className == "tooltip_link") 
			{
				var article = (spanArray[i].id).substr(3);
				spanArray[i].onmouseover = mouseoverTooltip(article, spanArray[i].style.maxWidth);
				spanArray[i].onmouseout = function(){ tooltip.hide() };
				// Change link inside to mouseover link style
				var tlink = spanArray[i].getElementsByTagName("a");
				if (tlink[0] && tlink[0].className != "new")
				{
					tlink[0].title = "";
                                        tlink[0].style.color = spanArray[i].style.color;
				}
			}
		}
	}
	if (window.addEventListener)
		window.addEventListener("load", putTooltips, false);
	else if (window.attachEvent)
		window.attachEvent("onload", putTooltips);
	else if (document.getElementById)
		window.onload=putTooltips();
}
catch(err) 
{
	window._customJSerror = err;
}

importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */


/**********/
/* Switch */
/**********/
$('.old-button').click(function(){
    $('.New').each(function(){
        $(this).css('display', 'none');
    });
    $('.Old').each(function(){
        $(this).css('display', 'inline');
    });
});
 
$('.new-button').click(function(){
    $('.New').each(function(){
        $(this).css('display', 'inline');
    });
    $('.Old').each(function(){
        $(this).css('display', 'none');
    });
});

/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
                Preda: 'The Ice Princess',
                Lauren: 'Dark Observer',
                Grif: 'Grif',
                Rollback: 'Rollback',
                Crat: 'Bureaucrat'
	}
};
//Custom
UserTagsJS.modules.custom = {
        'Sgt D Grif': ['Grif', 'Crat'],
        'Project Predacon': ['Preda'],
        'Lauren Darkmore': ['Lauren'],
};