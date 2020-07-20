/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

importArticles({
    type: "script",
    articles: [
        'u:dev:ShowHide/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:PurgeBlogs/code.js',
//      'MediaWiki:AdoptionForm.js'
    ]
}, {
    type: "style",
    article: "MediaWiki:StaffHighlight.css"
});

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */

if (wgNamespaceNumber == 110 || wgNamespaceNumber === 114) {

    function disableOldForumEdit() {
        if (typeof (enableOldForumEdit) != 'undefined' && enableOldForumEdit) {
            return;
        }
        if (!document.getElementById('old-forum-warning')) {
            return;
        }

        if (skin == 'oasis') {
            $('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');
            return;
        }
        if (!document.getElementById('ca-edit')) {
            return;
        }
        var editLink = null;
        if (skin == 'monobook') {
            editLink = document.getElementById('ca-edit').firstChild;
        } else {
            return;
        }

        editLink.removeAttribute('href', 0);
        editLink.removeAttribute('title', 0);
        editLink.style.color = 'gray';
        editLink.innerHTML = 'Archived';

        $('span.editsection-upper').remove();

    }
    addOnloadHook(disableOldForumEdit);
}

/* Opens chat in a new window for homepage */

$(".openchat a").click(function () {
    window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
    return false;
});

/*
$(function(){
	if ( wgNamespaceNumber === 112 || wgNamespaceNumber === 113 ||wgNamespaceNumber === 114 || wgNamespaceNumber === 115 ) {
		var FEurl = wgScript + '?title=Admin_Central:Main_Page';
		$('h1.wordmark.medium.graphic > a').attr('href', FEurl);
	}
});
*/

/* Guided Tours */
if (mw.config.get('wgCanonicalNamespace') == 'User_blog') {
	setTimeout(function() {
		$('.guidedtours-header').each(function() {
			var headerWidth = $(this).find('.text').width();
			var leftMargin = parseInt(headerWidth) + 15 + 'px';
			$(this).next().css('margin-left',leftMargin);
		});
	},250);
}

/* Wikia University */
$('.wu-content .box .next').on('click', function() {
	var currentBox = $(this).parent();
	var nextBox = currentBox.next();
	if (nextBox.length !== 0) {
		$('html, body').animate({
			scrollTop: $(nextBox).offset().top
		}, 500);
	}
});
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
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
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************