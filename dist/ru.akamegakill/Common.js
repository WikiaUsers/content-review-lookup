/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxRC/code.js", /* Auto Refresh */
        "u:dev:WallGreetingButton/code.js", /* Wall Greeting Button */
        "u:dev:BackToTopButton/code.js", /* Add Back To Top Button */
        "u:dev:ShowHide/code.js", /* Show/Hide */
        "w:c:dev:ReferencePopups/code.js",
        "MediaWiki:Common.js/displayTimer.js",
        "MediaWiki:Common.js/Toggler.js"
    ]
});

/**
 * Dynamic Navigation Bars. See [[Wikipedia:NavFrame]]
 * 
 * Based on script from en.wikipedia.org, 2008-09-15.
 *
 * @source www.mediawiki.org/wiki/MediaWiki:Gadget-NavFrame.js
 * @maintainer Helder.wiki, 2012–2013
 * @maintainer Krinkle, 2013
 */
( function () {
 
// Set up the words in your language
var collapseCaption = 'hide';
var expandCaption = 'show';
 
var navigationBarHide = '[' + collapseCaption + ']';
var navigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars.
 *
 * @param {number} indexNavigationBar The index of navigation bar to be toggled
 * @param {jQuery.Event} e Event object
 */
function toggleNavigationBar( indexNavigationBar, e ) {
	var navChild,
		navToggle = document.getElementById( 'NavToggle' + indexNavigationBar ),
		navFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
 
	// Prevent browser from jumping to href "#"
	e.preventDefault();
 
	if ( !navFrame || !navToggle ) {
		return false;
	}
 
	// If shown now
	if ( navToggle.firstChild.data == navigationBarHide ) {
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( hasClass( navChild, 'NavPic' ) ) {
				navChild.style.display = 'none';
			}
			if ( hasClass( navChild, 'NavContent' ) ) {
				navChild.style.display = 'none';
			}
		}
		navToggle.firstChild.data = navigationBarShow;
 
	// If hidden now
	} else if ( navToggle.firstChild.data == navigationBarShow ) {
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavPic' ) || $( navChild ).hasClass( 'NavContent' ) ) {
				navChild.style.display = 'block';
			}
		}
		navToggle.firstChild.data = navigationBarHide;
	}
}
 
/**
 * Adds show/hide-button to navigation bars.
 *
 * @param {jQuery} $content
 */
function createNavigationBarToggleButton( $content ) {
	var i, j, navFrame, navToggle, navToggleText, navChild,
		indexNavigationBar = 0,
		navFrames = $content.find( 'div.NavFrame' ).toArray();
 
	// Iterate over all (new) nav frames
	for ( i = 0; i < navFrames.length; i++ ) {
		navFrame = navFrames[i];
		// If found a navigation bar
		indexNavigationBar++;
		navToggle = document.createElement( 'a' );
		navToggle.className = 'NavToggle';
		navToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
		navToggle.setAttribute( 'href', '#' );
		$( navToggle ).on( 'click', $.proxy( toggleNavigationBar, null, indexNavigationBar ) );
 
		navToggleText = document.createTextNode( navigationBarHide );
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavPic' ) || $( navChild ).hasClass( 'NavContent' ) ) {
				if ( navChild.style.display == 'none' ) {
					navToggleText = document.createTextNode( navigationBarShow );
					break;
				}
			}
		}
 
		navToggle.appendChild( navToggleText );
		// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
		for ( j = 0; j < navFrame.childNodes.length; j++ ) {
			if ( $( navFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
				navFrame.childNodes[j].appendChild( navToggle );
			}
		}
		navFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
	}
}
 
mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton );
 
}());

 
 // *****************************************************
 // * Experimental javascript countdown timer (Splarka) *
 // * Version 0.0.3                                     *
 // *****************************************************
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
     var tpm = '';''
   } else {
     var tpm = '';''
   }
 
   // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' секунды';
  } else {
    left = (diff%60) + ' секунда';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' минута, и ' + left;
    } else {
      left = (diff%60) + ' минут, и ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' час, ' + left;
    } else {
      left = (diff%24) + ' часов, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' день, ' + left;
    } else {
      left = diff + ' дней, ' + left;
    }
  }
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

// **************************************************
 //  Викификатор
 // **************************************************

function addWikifButton() {
        var toolbar = document.getElementById('toolbar')
        if (!toolbar) return
        var i = document.createElement('img')
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
        i.alt = i.title = 'викификатор'
        i.onclick = Wikify
        i.style.cursor = 'pointer'
        toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
        addOnloadHook(addWikifButton)
}
if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0)
{
        if (wgCanonicalNamespace != "Special")
        {
              document.write('<script type="text/javascript" src="' 
              + 'http://uk.vijskpens.wikia.com/index.php?title=MediaWiki:Onlyifediting.js' 
              + '&action=raw&ctype=text/javascript&dontcountme=s"></script>'); 
              addOnloadHook(function(){
              if (mwEditButtons.length < 3) return;
              mwEditButtons[0].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/f/fa/Button_bold_ukr.png';
              mwEditButtons[1].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/f/f3/Button_italic_ukr.png';
              mwEditButtons[2].imageFile = 'http://upload.wikimedia.org/wikipedia/commons/0/03/Button_internal_link_ukr.png';
              })
        }
}
 if (mwCustomEditButtons) {
//Перенаправление
mwCustomEditButtons[mwCustomEditButtons.length] = { 
   "imageFile": "http://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect_rus.png", 
    "speedTip": "Перенаправление", 
    "tagOpen": "#REDIRECT [[", 
    "tagClose": "]]", 
    "sampleText": "название страницы"} 
//Template button
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
    "speedTip": "Шаблон",
    "tagOpen": "{{",
    "tagClose": "}}",
    "sampleText": "Название шаблона"}
    }

 // **************************************************
 //  Автоматическое обновление
 // **************************************************
 
importScriptPage( 'AjaxRC/code.js', 'dev' ); // AJAX-обновление некоторых страниц
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"]; // AJAX-обновление некоторых страниц(выбор страниц)
var AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемое подсказку
 
 
 // **************************************************
 //  Кнопка "Наверх"
 // **************************************************
 
var Speed = 400;
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
	       $('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Наверх" onClick="goToTop();">Наверх</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 500;
var ScrollSpeed = 700;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication

importScriptPage('ShowHide/code.js', 'dev');
 
function rewriteTitle()
{
    if(typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE)
        return;
 
    var titleDiv = document.getElementById('title-meta');
 
    if(titleDiv == null)
        return;
 
    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    var node = firstHeading.childNodes[0];
 
    // new, then old!
    firstHeading.replaceChild(cloneNode, node);
    cloneNode.style.display = "inline";
 
    var titleAlign = document.getElementById('title-align');
    firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}
 
addOnloadHook (rewriteTitle);


 // **************************************************
 //  Разное
 // **************************************************

window.UserTagsJS = {
    modules: {},
    tags: {
        убийца: { u:'Убийца' }
    }
};
 
UserTagsJS.modules.custom = {
	'Vandyc': ['убийца']
};

importArticles({
	type:'script',
	articles: [
		'u:dev:UserTags/code.js', 
        'w:dev:TopEditors/code.js',
        'u:dev:TimedSlider/code.js',
        'u:dev:ExtendedNavigation/code.js'
	]
});

window.onload = function () {
if (wgUserName !== 'null') {
        $('.insertusername').html(wgUserName);
    }
}
//Script for easy quoting in Special:Chat
//code by Wildream, idea and some inspiration - by KORNiUX
//You can add this script to your global.js by adding next string:
//importScriptPage('User:Wildream/ChatQuote/code.js', 'ru.community');
function ChatQuote() {
    $('.Chat li .message').each(function () {
        if ($(this).find('.chat-quote').length === 0) {
            $(this).append('<span class="chat-quote" style="color:red; float:right">[quote]</span>').find(".chat-quote").click(function () {
                $('.message > textarea').val($('.message > textarea').val() + ' ' + $(this).parent().prevAll('.username:first').text() + ': "' + $(this).parent().text().toString().replace('[quote]', '') + '"');
            });
        }
    });
}
setInterval(ChatQuote, 1000);