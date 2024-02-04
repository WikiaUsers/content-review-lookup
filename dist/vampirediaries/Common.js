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

// add compass image
$('.fandom-community-header__community-name-wrapper').append(
        $('<a/>').css('font-size', '1px').attr('href', 'https://community.fandom.com/wiki/Fandom_Compass').append(
        $('<img/>').addClass('hover-community-header-wrapper').css('height', '20px')
        .attr('src', 'https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/8/82/FandomCompassBadge.png/revision/latest?path-prefix=es').attr('title', 'A Fandom Compass Wiki')
    ));