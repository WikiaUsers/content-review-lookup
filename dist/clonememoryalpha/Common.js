
$().ready( function() {
	
	//********************************************************************************
	// Start "Hidden appearances section/interactive tree" script; by [[User:Bp]] and modified by [[User:KettleMeetPot]]
	//********************************************************************************
	
	var tree = 0;
	var pane = 0;
	var paneListForThisTree = [];
	var descriptionString = new String("This list contains %d items"); //%d is where the number of items is inserted
	
	var smallTreeCount = 4; // less leaves than this, the tree will be open at first
	var interactiveTrees = 1; // set this to 0 in user.js to turn this off
	
	function $button(text,id,toggle) {
		var $b = $('<a>');
		$b.html(text).attr('id',id).css('cursor','pointer');
		if (toggle.length > 0) {
			$b.data('toggle',toggle.join(' '));
			$b.on('click.appear',function() {
				var tSplit = $(this).data('toggle').split(' ');
				for (var i in tSplit) $('#' + tSplit[i]).toggleClass('hiddenlist visiblelist');
			});
		}
		return $b;
	}
	
	function recursiveCountAndMark(e, depth, nocount, index) {
		var si = e.firstChild;
		var total = 0;
		while (si) {
			var tn = (si.tagName) ? si.tagName.toLowerCase() : '';
			if (tn == "li") { total++; }
			var subtotal = recursiveCountAndMark(si, depth+1, nocount);
			if (tn == "ul" || tn == "ol") {
				if (depth > 1) {
					var siID = 'Pane-'+index+'-' + pane++;
					$(si).attr('id',siID);
					paneListForThisTree.push(siID);
					$(si).addClass('hiddenlist');
					$(si).before('(').before($button( (nocount) ? "+/-" : subtotal, 'listexpand-'+index+'-'+siID, [siID])).before(')');
					total--; // don't count the li that this ul/ol is in
				}
				else {
					// we are finished and this is the top ul/ol
					if (subtotal < smallTreeCount) { // this small enough they can be visible right away
						for (var i=0;i<paneListForThisTree.length;i++) {
							$('#'+paneListForThisTree[i]).toggleClass('hiddenlist visiblelist');
						}
					}
			        var ds = (nocount) ? "" : descriptionString.replace(/\%d/g, subtotal);
					
			        $(si).before($('<div>').attr('id','listTreeHeader-'+index).html(ds));
	
					$(si).parent().children().eq(0).append(' (').append($button('show all', 'listAllButton-'+index, [])).append(')');
	
					$('#listAllButton-'+index).data('toggle',paneListForThisTree.join(' '));
					$('#listAllButton-'+index).on('click.appear',function() {
						var tSplit = $(this).data('toggle').split(' ');
						for (var i in tSplit) $('#' + tSplit[i]).removeClass('hiddenlist').addClass('visiblelist');
			        });
					$('#listAllButton-'+index).click(function () {
					    if ($(this).html() === "show all") {
					        $(this).html("hide all");
					        $(this).off('click.appear');
					        $(this).on('click.appear',function() {
					        	var tSplit = $(this).data('toggle').split(' ');
								for (var i in tSplit) $('#' + tSplit[i]).removeClass('visiblelist').addClass('hiddenlist');
					        });
					    }
					    else {
					        $(this).html("show all");
					        $(this).off('click.appear');
					        $(this).on('click.appear',function() {
					        	var tSplit = $(this).data('toggle').split(' ');
								for (var i in tSplit) $('#' + tSplit[i]).removeClass('hiddenlist').addClass('visiblelist');
					        });
					    }
					});
				}
			}
			total += subtotal;
			si = si.nextSibling;
		}
		return total;
	}
	
	function doAppearancesTrees() {
		if (!interactiveTrees) { return; }
	
		$('div.appear').each(function(index) {
			recursiveCountAndMark(this, 0, $(this).hasClass('nocount') ? 1 : 0, index);
			paneListForThisTree = [];
			tree++;
		});
		
		// fix a bug noticed by renegade54
		// jump to the named anchor again
		if (window.location.hash && tree > 0) {
			// still won't work 100% in safari and khtml
			if (navigator.userAgent.indexOf("MSIE") != -1) {
				window.location = window.location.hash; // -- causes Firefox to fire onload events
			} else {
				window.location.hash = window.location.hash;
			}
		}
	
	}
	
	$(doAppearancesTrees);

	
	/*******************************************************************************
	** "Interactive quotes" script; by [[User:Bp]]
	*******************************************************************************/
	
	function speakerLabel(text) {
		var spkr = document.createElement('span');
		spkr.innerHTML = text + ": ";
		spkr.className = "speaker-label";
		return spkr;
	}
	
	function explicitQuoteOn(event, e) {
		var si = (e) ? e.firstChild : this.firstChild;
		while(si) {
			explicitQuoteOn(event, si);
			if (si.className == "dialogue-inside") {
				si.className = "dialogue-inside-highlight";
			} else if (si.className == "quoteline") {
				if (si.childNodes[0].className != "speaker-label") {
					if (si.title != '') {
						si.insertBefore(speakerLabel(si.title), si.childNodes[0]);
						si.title = '';
					}
				}
				if (si.childNodes[0].className == "speaker-label") {
					si.childNodes[0].style.display = "inline";
				}
			}
			si = si = si.nextSibling;
		}
	}
	
	function explicitQuoteOff(event, e) {
		var si = (e) ? e.firstChild : this.firstChild;
		while(si) {
			explicitQuoteOff(event, si);
			if (si.className == "dialogue-inside-highlight") {
				si.className = "dialogue-inside";
			} else if (si.className == "quoteline") {
				if (si.childNodes[0].className == "speaker-label") {
					si.childNodes[0].style.display = "none";
				}
			}
			si = si = si.nextSibling;
		}
	}
	
	var explicitQuotes = 0;
	
	function doQuotes() {
		if (!explicitQuotes) { return; }
	
		var dumbevent;
		var divs = document.getElementsByTagName("div");
		for (var i = 0; i < divs.length; i++) {
			if (divs[i].className == 'dialogue') {
				if (explicitQuotes == 1) {
					divs[i].onmouseover = explicitQuoteOn;
					divs[i].onmouseout = explicitQuoteOff;
				} else {
					explicitQuoteOn(dumbevent, divs[i]);
				}
			}
		}
	}
	
	$(doQuotes);
	
	/*******************************************************************************
	** tooltips and access keys
	*******************************************************************************/
	
	ta = new Object();
	ta['pt-userpage'] = new Array('.','My user page'); 
	ta['pt-anonuserpage'] = new Array('.','The user page for the ip you\'re editing as'); 
	ta['pt-mytalk'] = new Array('n','My talk page'); 
	ta['pt-anontalk'] = new Array('n','Discussion about edits from this ip address'); 
	ta['pt-preferences'] = new Array('','My preferences'); 
	ta['pt-watchlist'] = new Array('l','List of pages I\'m monitoring for changes'); 
	ta['pt-mycontris'] = new Array('y','List of my contributions'); 
	ta['pt-login'] = new Array('o','You are encouraged to log in; it is not mandatory, however'); 
	ta['pt-anonlogin'] = new Array('o','You are encouraged to log in; it is not mandatory, however'); 
	ta['pt-logout'] = new Array('o','Log out'); 
	ta['ca-talk'] = new Array('t','Discussion about the content page'); 
	ta['ca-edit'] = new Array('e','You can edit this page; please use the preview button before saving'); 
	ta['ca-addsection'] = new Array('+','Add a comment to this discussion'); 
	ta['ca-viewsource'] = new Array('e','This page is protected; you can view its source'); 
	ta['ca-history'] = new Array('h','Past versions of this page'); 
	ta['ca-protect'] = new Array('=','Protect this page'); 
	ta['ca-delete'] = new Array('d','Delete this page'); 
	ta['ca-undelete'] = new Array('d','Restore the edits done to this page before it was deleted'); 
	ta['ca-move'] = new Array('m','Move this page'); 
	ta['ca-nomove'] = new Array('','You don\'t have the permissions to move this page'); 
	ta['ca-watch'] = new Array('w','Add this page to your watchlist'); 
	ta['ca-unwatch'] = new Array('w','Remove this page from your watchlist'); 
	ta['search'] = new Array('','Search Memory Alpha'); 
	ta['p-logo'] = new Array('z','Main Page'); 
	ta['n-mainpage'] = new Array('z','Visit the Main Page'); 
	ta['n-Main-page'] = new Array('z','Visit the Main Page'); 
	ta['n-portal'] = new Array('','About the project, what you can do, where to find things'); 
	ta['n-Chat'] = new Array('','IRC, the place to chat');
	ta['n-currentevents'] = new Array('','Find background information on current events'); 
	ta['n-recentchanges'] = new Array('r','The list of recent changes in the wiki'); 
	ta['n-randompage'] = new Array('x','Load a random page'); 
	ta['n-help'] = new Array('/','The place to find out information'); 
	ta['n-sitesupport'] = new Array('','Support us'); 
	ta['t-whatlinkshere'] = new Array('j','List of all wiki pages that link here'); 
	ta['t-recentchangeslinked'] = new Array('k','Recent changes in pages linking to this page'); 
	ta['feed-rss'] = new Array('','RSS feed for this page'); 
	ta['feed-atom'] = new Array('','Atom feed for this page'); 
	ta['t-contributions'] = new Array('','View the list of contributions of this user'); 
	ta['t-emailuser'] = new Array('','Send a mail to this user'); 
	ta['t-upload'] = new Array('u','Upload images or media files'); 
	ta['t-specialpages'] = new Array('q','List of all special pages'); 
	ta['ca-nstab-main'] = new Array('c','View the content page'); 
	ta['ca-nstab-user'] = new Array('c','View the user page'); 
	ta['ca-nstab-media'] = new Array('c','View the media page'); 
	ta['ca-nstab-special'] = new Array('','This is a special page; you can\'t edit the page itself.'); 
	ta['ca-nstab-wp'] = new Array('c','View the project page'); 
	ta['ca-nstab-image'] = new Array('c','View the image page'); 
	ta['ca-nstab-mediawiki'] = new Array('c','View the system message'); 
	ta['ca-nstab-template'] = new Array('c','View the template'); 
	ta['ca-nstab-help'] = new Array('c','View the help page'); 
	ta['ca-nstab-category'] = new Array('c','View the category page');

});

/*******************************************************************************
**					To replace the now dead "welcome bot				      **
*******************************************************************************/
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:newuser}}',
        3: '{{sub'+'st:welcome}}',
        1202: false
    },
    summary: 'Script: Creating user+talkpage on first edit'
};

/*******************************************************************************
**					Personalised MA copyright notice				      **
*******************************************************************************/
$(function(){
	$('.license-description').append('See <a href="https://memory-alpha.fandom.com/wiki/Memory_Alpha:Copyrights">Memory Alpha\'s Copyright</a> information for full details.');
});

/*******************************************************************************
**					MA rail module for Ten Forward posts				      **
*******************************************************************************/
window.AddRailModule = [
    'Template: RailModule',
    'Template:Ten Forward rail module'
];

/*******************************************************************************
** Re-add proper namespace prefix to titles where it has been removed "by design"
*******************************************************************************/
$('.ns-5 .page-header__title').prepend('Memory Alpha ');
$('.ns-6 .page-header__title').prepend('File:');
$('.ns-7 .page-header__title').prepend('File ');
$('.ns-8 .page-header__title').prepend('MediaWiki:');
$('.ns-9 .page-header__title').prepend('MediaWiki ');
$('.ns-10 .page-header__title').prepend('Template:');
$('.ns-11 .page-header__title').prepend('Template ');
$('.ns-13 .page-header__title').prepend('Help ');
$('.ns-14 .page-header__title').prepend('Category:');
$('.ns-15 .page-header__title').prepend('Category ');

/*******************************************************************************
** Countdown: Version: 2.0 Rewrite by Pecoes; original script by Splarka + Eladkse
*******************************************************************************/
 
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
        sr: {
            and: 'i',
            second: 'sekundu',
            seconds: 'sekunde/-i',
            minute: 'minutu',
            minutes: 'minute/-a',
            hour: 'sat',
            hours: 'sata/-i',
            day: 'dan',
            days: 'dana'
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


/* ==============
   Trivia code
   ============== 
 
    $(function () {
        $('#WikiaRail').append("<div class='typeform-widget' data-url='https://fandomrewards.typeform.com/to/Jgvlc6kz' style='width: 100%; height: 700px'></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id='typef_orm', b='https://embed.typeform.com/'; if(!gi.call(d,id)) { js=ce.call(d,'script'); js.id=id; js.src=b+'embed.js'; q=gt.call(d,'script')[0]; q.parentNode.insertBefore(js,q) } })() </script>" );
    });
*/