// Adding module to rail explaining relationship merge
// Author @Original Authority
// last-modified:  09/07/17
$(function() {
    if(window.location.href.indexOf("/Relationships") > -1) {	
		var fullurl = window.location.pathname;
		var removewiki = fullurl.replace('/wiki/','');
		var removerelationships = removewiki.replace('/Relationships','');
		var finaloutput = removerelationships.replace ('_', ' ');
		$('#WikiaRail').prepend('<section class=\"content-review-module module\"><h2 class=\"headernote\" style="text-align: center;">Relationships</h2><p style="font-weight: bold; text-align: center;">Listed on this article are all of the relationships regarding ' + finaloutput + ' that do not warrant their own article. As such, they have been merged into one article as decided through the <a href="http://vampirediaries.wikia.com/wiki/The Vampire Diaries Wiki:Relationship Merge">relationship merge</a> project.');
    }
});

window.ArticleRating = {
    values: ['Worst', 'Bad', 'Average', 'Good', 'Great'],
    starSize: [24, 24],
    starColor: ['#ccc', 'darkred'],
    starStroke: '#000'
}

window.ModernLeaderboardSettings = {
    hideAbout: 1,
};

window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: '9ARyNSq',
    prependToRail: true
};

/* Any JavaScript here will be loaded for all users on every page load. */

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3s
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left;
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none';
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline';

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length === 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/

//ListFiles//

// Have categories added to images from upload description
// Code written by @Original Authority based on code by @UltimateSupreme

if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
   if (!$.getUrlVar('wpForReUpload'))
    jQuery(function ($) {
        'use strict';
        var $desc = $('#wpUploadDescription');
        if ($desc.val()) {
            return; // If not empty then don't do anything (i.e. error message confirm page)
        } 
        $desc.val(
                  '{{File Categories\n' 
                + '|Character = \n'
                + '|Character#2 = \n'
                + '|Character#3 = \n'
                + '|Cast = \n'
	        	+ '|TO Season = \n'
                + '|TVD Season = \n' 
                + '|Legacies Season = \n'
		        + '|Other = \n' + '}}'
        );
	
	if (window.location.href.indexOf("wpForReUpload") > -1) {
		return; 
	} else {     	
		function verifyLicense() {
			if (!$('#wpLicense').val()) {
                	  window.alert('Licensing must be complete.');
                  	return false;
               		}
        	}
        $desc.closest('form').submit(verifyLicense);
  }
    });
}
// end image upload form

// AjaxRC
window.ajaxPages = ["Special:WikiActivity","Special:Log","Special:RecentChanges"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
window.AjaxRCRefreshText = 'Auto Refresh';
window.AjaxRCRefreshHoverText = 'Silently refreshes the contents of this page every 60 seconds without requiring a full reload';
/* 
$(function() {
    if (
        wgNamespaceNumber !== -1 ||
        window.topArticleRun
    ) {
        return;
    }
    window.topArticleRun = true;

    $.getJSON('https://vampirediaries.fandom.com/api/v1/Articles/Top', {
        limit: 10,
        expand: 1
    }, function(fullarticles) {
        var articles = fullarticles.items[0];
        $('#WikiaRail').prepend(
            $('<section>', {
                class: 'rail-module activity-module'
            }).append(
                $('<h2>', {
                    class: 'headernote',
                    css: {
                        'text-align': 'center'
                    },
                    text: 'Top Article'
                }),
                $('<p>', {
                    css: {
                        'font-weight': 'bold',
                        'text-align': 'center',
                        'padding-bottom': '10px',
                        'font-size:': '15px'
                    },
                    text: mw.html.escape(articles.title)
                }),
                $('<img>', {
                    src: articles.thumbnail,
                    class: 'imagemiddle'
                }),
                $('<p>', {
                    css: {
                        'font-weight': 'bold',
                        'text-align': 'center',
                        'font-style': 'italic',
                        'padding-top': '5px'
                    },
                    text: '"' + mw.html.escape(articles.abstract)
                }),
                $('<a>', {
                    css: {
                        'font-weight': 'bold',
                        'text-align': 'center',
                        'font-style': 'italic',
                        'padding-top': '5px',
                        'text-align': 'center',
                        'left': '50%',
                        'margin-right': '-50%',
                        'transform': 'translate(-50%, -50%)' 
                    },
                    href: mw.html.escape(articles.title),
                    text: 'See More',
                    class: 'imagemiddle'
                })
            )
        );
    });
});
*/