
mediaWiki.loader.using('mediawiki.util', function() {
"use strict";
jQuery(function($) {
    var $tabs = $('#WikiaUserPagesHeader ul.tabs');
    if (!$tabs.length) return;
    var newTabs = { // Put the new tabs you want here
        // 'Text on Tab': '/User Subpage when clicked'
        'Sandbox': '/Sandbox',
        'Worlds': '/Worlds',
    };
    var name = $('#UserProfileMasthead .masthead-info hgroup > h1');
    if (!name.length) return;
    name = name.text();
    var tabs = document.createDocumentFragment(), li, a;
    for (var tab in newTabs) {
        li = document.createElement('li');
        a = document.createElement('a');
        a.title = 'User:' + name + newTabs[tab];
        a.href = mw.util.wikiGetlink(a.title);
        a.appendChild(document.createTextNode(tab));
        li.appendChild(a);
        tabs.appendChild(li);
    }
    $tabs.append(tabs);
});
});

// ============================================================
// displayTimer
// ============================================================
 
//Add a clock to the WikiHeader
//Modified from work by Patrick Westerhoff [poke]:
//http://bulbapedia.bulbagarden.net/wiki/MediaWiki:Monobook.js
 
hookEvent( 'load', displayTimer );
 
function displayTimer ()
{
    if ( typeof( timerDisplay ) !== 'undefined' && timerDisplay === false )
        return;
 
    var date;
 
    if (skin == 'oasis')
    {
    var timerParent = document.getElementById( 'WikiHeader' ).getElementsByTagName( 'div' )[0];
    }
 
    if (skin == 'monobook')
    {
    var timerParent = document.getElementById( 'p-personal' ).getElementsByTagName( 'ul' )[0];
    }
 
    var timerLink   = document.createElement( 'a' );
    var timerObj    = document.createElement( 'li' );
    timerLink.href               = '/wiki/' + wgPageName + '?action=purge';
    timerLink.title              = 'Purge the server cache and update the contents of this page.'
    timerObj.id                  = 'displayTimer';
    timerObj.style.textTransform = 'none';
    timerObj.style.fontWeight    = 'bold';
    timerObj.style.fontSize      = '100%';
    timerObj.appendChild( timerLink );
    timerParent.insertBefore( timerObj, timerParent.firstChild );
 
    if (skin == 'oasis')
    {
        $('#displayTimer').css({'position': "inherit", 'right': "0px", 'top': "-3px"});
    }
 
    var month = new Array(12);
        month[0]  = "Jan";
        month[1]  = "Feb";
        month[2]  = "Mar";
        month[3]  = "Apr";
        month[4]  = "May";
        month[5]  = "Jun";
        month[6]  = "Jul";
        month[7]  = "Aug";
        month[8]  = "Sep";
        month[9]  = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
 
    function actualizeUTC ()
    {
        timerDate           = new Date();
        timerLink.innerHTML = ( timerDate.getUTCDate()     < 10 ? '0' : '' ) + timerDate.getUTCDate()     + ' '
                            + ( timerDate.getUTCMonth()    < 10 ? '' : ''  ) + month[timerDate.getUTCMonth()] + ' '
                            + ( timerDate.getUTCFullYear() < 10 ? '0' : '' ) + timerDate.getUTCFullYear() + ' '
                            + ( timerDate.getUTCHours()    < 10 ? '0' : '' ) + timerDate.getUTCHours()    + ':'
                            + ( timerDate.getUTCMinutes()  < 10 ? '0' : '' ) + timerDate.getUTCMinutes()  + ':'
                            + ( timerDate.getUTCSeconds()  < 10 ? '0' : '' ) + timerDate.getUTCSeconds()  + ' (UTC)';
    }
 
    function actualizeCustom ()
    {
        timerDate           = new Date();
        timerDate.setMinutes  ( timerDate.getMinutes() + timerDate.getTimezoneOffset() + timerTimezone * 60 );
        timerLink.innerHTML = ( timerDate.getDate()     < 10 ? '0' : '' ) + timerDate.getDate()     + ' '
                            + ( timerDate.getMonth()    < 10 ? '' : ''  ) + month[timerDate.getMonth()] + ' '
                            + ( timerDate.getFullYear() < 10 ? '0' : '' ) + timerDate.getFullYear() + ' '
                            + ( timerDate.getHours()    < 10 ? '0' : '' ) + timerDate.getHours()    + ':'
                            + ( timerDate.getMinutes()  < 10 ? '0' : '' ) + timerDate.getMinutes()  + ':'
                            + ( timerDate.getSeconds()  < 10 ? '0' : '' ) + timerDate.getSeconds()
                            + ' (UTC' + ( timerTimezone  < 0 ? '' : '+' ) + timerTimezone + ')';
    }
 
    // start
    if ( typeof( timerTimezone ) !== 'number' )
    {
        actualizeUTC();
        setInterval( actualizeUTC, 1000 );
    }
    else
    {
        actualizeCustom();
        setInterval( actualizeCustom, 1000 );
    }
}

importScriptPage('SocialIcons/code.js','dev');

 
/* Rounded Search */
.WikiaSearch input[type
="text"] {
  -webkit-border-radius: 1em;
  -moz-border-radius: 1em;
  -o-border-radius: 1em;
  -khtml-border-radius:1em;
  border-radius: 1em;
  padding: 3px 0 3px 6px;
}
 
/* Wikia header BG */
.WikiaHeader {
	background-image: url(http://static2.wikia.nocookie.net/edenworldbuilder/images/f/f8/Grass.jpg) !important;
}
 
/* Rounded Search */
.WikiaSearch input[type="text"] {
  -webkit-border-radius: 1em;
  -moz-border-radius: 1em;
  -o-border-radius: 1em;
  -khtml-border-radius:1em;
  border-radius: 1em;
  padding: 3px 0 3px 6px;
}
 
/* Rounded chat avatars */ 
.ChatModule .avatar {
border-radius: 10px;
}
 
/* Rounded rail modules */
#WikiaRail > .module {
        -moz-border-radius: 1ex;
        -webkit-border-radius: 1ex;
	border-radius: 1ex;
}