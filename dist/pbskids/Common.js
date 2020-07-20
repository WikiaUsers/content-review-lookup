window.UserTagsJS = {
	modules: {},
	tags: {
		pre: 'President',
                co: 'Co-Founder',
                ch: 'Chancellor',
                ex: 'Executive'
	}
};
UserTagsJS.modules.custom = {
	'Agency': ['pre', 'ch', 'ex', 'co']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
};
UserTagsJS.modules.userfilter = {
	'Agency': ['inactive', 'bureaucrat'],
        'SwirlBoy39': ['bureaucrat', 'founder']
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});


 
// ************* Countdown Clock *************
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
// *******************************************
 
// ************* Back to Top button *************
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				switch(FadeSwitch) {
					case 0:				
						$( '#backtotop' ).show ();
						break;
					default:
						$( '#backtotop' ).fadeIn ();
						break;
				}
			} else {
				switch(FadeSwitch) {
					case 0:				
						$( '#backtotop' ).hide ();
						break;
					default:
						$( '#backtotop' ).fadeOut ();
						break;
				}					
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
		$('<li id="backtotop" style="position: absolute; right:20px; top:1px; border:none;"><button style="height: 20px;" type="button" value="Back To Top" onClick="goToTop();">Back To Top</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
var FadeSwitch = 1;
 
if( !window.BackToTop  ) {
	$( document ).ready( addBackToTop );
}
 
var BackToTop = true; // prevent duplication
 
if( typeof Start == "number" ) {
	ButtonStart = Start;
}
 
if( typeof Speed == "number" ) {
	ScrollSpeed = Speed;
}	
 
if( typeof ToggleFading == "number" ) {
	FadeSwitch = ToggleFading;
}
// *******************************************
 
// ************* RevealAnonIP Converter *************
(function ($, mw, RevealAnonIP, ArticleComments) {
    "use strict";
 
    // set up RevealAnonIP object and its permissions property
    RevealAnonIP = $.extend(RevealAnonIP, {});
    RevealAnonIP.permissions = $.extend(['*'], RevealAnonIP.permissions);
 
    // Check for multiple instantiations. If it's active already then quit.
    if (typeof(RevealAnonIP.reveal) === 'function') {
        return;
    }
 
    // private property
    var hasPermission = (function/* setPermission*/() {
        var permissions = RevealAnonIP.permissions;
        var usergroups;
 
        usergroups = mw.config.get('wgUserGroups');
        usergroups = $.extend(['*'], usergroups);
 
        for (var i = 0, plen = permissions.length; i < plen; ++i) {
            for (var j = 0, ulen = usergroups.length ; j < ulen ; ++j) {
                if (usergroups[j] === permissions[i]) {
                    return true;
                }
            }
        }
        return false;
    }());
 
    // converts "A Wikia contributor" -> IP address when called
    // Depends on mw.util. Must not be called until mw.loader.load('mediawiki.util')
    // has succeeded.
    function revealIPs() {
        if (!hasPermission) {
            return;
        }
 
        // core MediaWiki functions for checking if a string is an IP address
        var isIPv4Address = mw.util.isIPv4Address,
            isIPv6Address = mw.util.isIPv6Address;
 
        // reveal all IP addresses
        // .activityfeed covers Special:WikiActivity and <activityfeed />
        // .edited-by covers article comments and Recent Wiki Activity module
        // Walls display the IP address next to the "A Wikia Contributor" so filter
        // those out.
        $('.edited-by > a').not('#Wall *')
        .add('.activityfeed cite a')
        .each(function () {
            var $this = $(this),
                href = $this.attr('href'),
                lastSlash = href.lastIndexOf('/'),
                ip;
 
            if (lastSlash !== -1) {
                ip = href.substr(lastSlash + 1);
 
                if (isIPv4Address(ip) || isIPv6Address(ip)) {
                    $this.text(ip);
                }
            }
        });
    }
 
    // This can't be run until mw.util is loaded
    RevealAnonIP.reveal = $.noop;
 
    // gets permission level
    RevealAnonIP.getPermission = function () {
        return hasPermission;
    };
 
    // This code functions as the constructor for the singleton
    // It installs hooks into various anchor points in the page and applies
    // the reveal logic once.
    // This function can be invoked manually to force-enable if it hasPermission
    // is false.
    RevealAnonIP.init = function () {
        hasPermission = true;
        mw.loader.using('mediawiki.util', function () {
            RevealAnonIP.reveal = revealIPs;
            $(function ($) {
                if (ArticleComments) {
                    // from User:Pecoes - reload when article comments paginate
                    var realFunc = ArticleComments.addHover;
                    ArticleComments.addHover = function () {
                        var result = realFunc.apply(ArticleComments, arguments);
                        RevealAnonIP.reveal();
                        return result;
                    };
                } else {
                    // add RevealAnonIP.reveal to ajaxCallAgain for use with AjaxRC
                    var ajaxRC = window.ajaxCallAgain;
                    if (!$.isArray(ajaxRC)) {
                        ajaxRC = [];
                    }
                    ajaxRC.push(RevealAnonIP.reveal);
                    window.ajaxCallAgain = ajaxRC;
                }
 
                // reveal() after initialized
                RevealAnonIP.reveal();
            });
        });
 
        // Disable the init function so it can't be called twice
        this.init = $.noop;
    };
 
    // If the user has permission, start now
    if (hasPermission) {
        RevealAnonIP.init();
    }
 
    // expose public interface
    window.RevealAnonIP = RevealAnonIP;
}(jQuery, mediaWiki, window.RevealAnonIP, window.ArticleComments));
// *******************************************

//** Collapsible tables **********************
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
function collapseTable( tableIndex ) {
        var Button = document.getElementById( 'collapseButton' + tableIndex );
        var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
        if ( !Table || !Button ) {
                return false;
        }
 
        var Rows = Table.rows;
 
        if ( Button.firstChild.data == collapseCaption ) {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = 'none';
                }
                Button.firstChild.data = expandCaption;
        } else {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = Rows[0].style.display;
                }
                Button.firstChild.data = collapseCaption;
        }
}
 
function createCollapseButtons() {
        var tableIndex = 0;
        var NavigationBoxes = new Object();
        var Tables = document.getElementsByTagName( 'table' );
 
        for ( var i = 0; i < Tables.length; i++ ) {
                if ( hasClass( Tables[i], 'collapsible' ) ) {
 
                        /* only add button and increment count if there is a header row to work with */
                        var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
                        if ( !HeaderRow ) {
                                continue;
                        }
                        var Header = HeaderRow.getElementsByTagName( 'th' )[0];
                        if ( !Header ) {
                                continue;
                        }
 
                        NavigationBoxes[tableIndex] = Tables[i];
                        Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
                        var Button = document.createElement( 'span' );
                        var ButtonLink = document.createElement( 'a' );
                        var ButtonText = document.createTextNode( collapseCaption );
 
                        Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
                        ButtonLink.style.color = Header.style.color;
                        ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
                        ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
                        ButtonLink.appendChild( ButtonText );
 
                        Button.appendChild( document.createTextNode( '[' ) );
                        Button.appendChild( ButtonLink );
                        Button.appendChild( document.createTextNode( ']' ) );
 
                        Header.insertBefore( Button, Header.childNodes[0] );
                        tableIndex++;
                }
        }
 
        for ( var i = 0;  i < tableIndex; i++ ) {
                if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
                        collapseTable( i );
                } else if ( hasClass( NavigationBoxes[i], 'innercollapse' ) ) {
                        var element = NavigationBoxes[i];
                        while ( element = element.parentNode ) {
                                if ( hasClass( element, 'outercollapse' ) ) {
                                        collapseTable( i );
                                        break;
                                }
                        }
                }
        }
}
 
addOnloadHook( createCollapseButtons );
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();
//***********************************

mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
});