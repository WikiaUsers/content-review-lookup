/* <pre> */
/* Any JavaScript here will be loaded for all users on every page load. */

// =====================================
//        Variables for functions
// =====================================
// Ajax auto-refresh
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Watchlist',
    'Special:Log',
    'Special:Contributions',
    'Special:NewFiles',
    'Special:AbuseLog'
];
window.AjaxRCRefreshText = 'Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
// Display Clock
window.DisplayClockJS = {
    format: '%d %B %Y, %2H:%2M:%2S (UTC)',
    hoverText: 'Click to purge the cache'
};

/*
if ( wgIsArticle || window.location.href.indexOf( 'action=submit' ) > -1 ) {
  var script  = document.createElement( 'script' );
  script.src  = '/w/index.php?title=User:KidProdigy/CollapsibleTables.js&action=raw&ctype=text/javascript&smaxage=18000&action=raw&maxage=18000';
  script.type = 'text/javascript';
  document.getElementsByTagName( 'head' )[0].appendChild( script );
  
  hookEvent( 'load', function() { new CollapsibleTables(); } );
}
*/

function formatDate(t) {
	var month = new Array();
	month[0] = 'January';
	month[1] = 'February';
	month[2] = 'March';
	month[3] = 'April';
	month[4] = 'May';
	month[5] = 'June';
	month[6] = 'July';
	month[7] = 'August';
	month[8] = 'September';
	month[9] = 'October';
	month[10] = 'November';
	month[11] = 'December';
	
	y = t.getUTCFullYear();
	M = t.getUTCMonth();
	D = t.getUTCDate();
	h = t.getUTCHours();
	m = t.getUTCMinutes();
	s = t.getUTCSeconds();
	
	if (h > 0 || m > 0 || s > 0) {
		hms = '';
		
		if (s > 10)
			hms = ':' + s;
		else if (s > 0)
			hms = ':0' + s;
		
		if (m > 10)
			hms = ':' + m + hms;
		else if (m > 0)
			hms = ':0' + m + hms;
			
		if (h > 12)
			hms = (h - 12) + hms + ' PM';
		else if (h > 0)
			hms = h + hms + ' AM';
		else
			hms = '12' + hms + ' AM';
		
		return hms + ', ' + month[M] + ' ' + D + ', ' + y;
	} else {
		return month[M] + ' ' + D + ', ' + y;
	}
}

function formatTime(h, m, s) {
	var o = '';
	
	if (h != 1) {
		o = h + ' hours ';
	} else {
		o = '1 hour ';
	}
	
	if (m != 1) {
		o += m + ' minutes ';
	} else {
		o += '1 minute ';
	}
	
	if (s != 1) {
		o += s + ' seconds';
	} else {
		o += '1 second';
	}
	
	return o;
}

function updateClocks() {
	var t = new Date();

	setTimeout(updateClocks, 1000);
	
	D = t.getUTCDate();
	M = t.getUTCMonth();
	y = t.getUTCFullYear();
	h = t.getUTCHours();
	m = t.getUTCMinutes();
	s = t.getUTCSeconds();

	t = Date.UTC(y, M, D, h, m, s);

	t = (T - t) / 1000;
	
	if (t < 0 && t > -86400 && (h > 0 || m > 0 || s > 0)) {
		document.getElementById('countdown-big').innerHTML = 'Today';
		document.getElementById('countdown-small').innerHTML = '';
		document.getElementById('countdown-target').innerHTML = 'is ' + formatDate(new Date(T + tzOffset)) + ' ' + tz;
		
		return;
	} else if (t < 0) {
		document.getElementById('countdown-big').innerHTML = 'Past';
		document.getElementById('countdown-target').innerHTML = formatDate(new Date(T + tzOffset)) + ' ' + tz;	
		
		return;
	}
	
	D = Math.floor(t / 86400.0);
	h = Math.floor(t % 86400.0 / 3600.0);
	m = Math.floor(t % 3600.0 / 60.0);
	s = Math.floor(t % 60.0);

	if (D == 1) {
		document.getElementById('countdown-big').innerHTML = '1 day';
	} else if (D === 0) {
		document.getElementById('countdown-big').innerHTML = '';
	} else {
		document.getElementById('countdown-big').innerHTML = D + ' days';
	}
	
	document.getElementById('countdown-small').innerHTML = formatTime(h, m, s);
}

function startCountdown() {
	document.getElementById('countdown-target').innerHTML = 'to ' + formatDate(new Date(T + tzOffset)) + ' ' + tz;
	document.getElementById('countdown').style.display = 'block';
	updateClocks();
}

/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Taken from Wikipedia's Common.js.
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             for (
                  var NavChild = NavFrame.firstChild;
                  NavChild != null;
                  NavChild = NavChild.nextSibling
                 ) {
                 if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                     if (NavChild.style.display == 'none') {
                         NavToggleText = document.createTextNode(NavigationBarShow);
                         break;
                     }
                 }
             }
 
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
  }
 
  addOnloadHook( createNavigationBarToggleButton );
 
if (mwCustomEditButtons) {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "Image:Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": " ",
     "tagClose": " ",
     "sampleText": "#REDIRECT [[]]"};
  }
 
/* Welcome module. More info on the page "Forum:Welcome messages and spoilers". Author:Slyst
$(function() {
    var welcome;
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:Welcome',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').prepend(
                $('<section>')
                    .addClass('module')
                    .addClass('welcome-module')
                    .append(
                        $('<h2>')
                            .addClass('activity-heading')
                            .html($.parseHTML(data.parse.text['*'])[0].innerHTML)
                    )
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                $.parseHTML(data.parse.text['*'])[1].innerHTML.replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'passer-by'))
                            )
                            .append(
                                $('<div>')
                                    .addClass('buttons-container')
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .attr('id', 'remove')
                                            .text('Don\'t show again')
                                    )
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .addClass('talk')
                                            .addClass('comments')
                                            .addClass('secondary')
                                            .attr('id', 'cancel')
                                            .text('Dismiss')
                                    )
                            )  
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('.welcome-module .anons').show();
            }
            $('.welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('.welcome-module').fadeOut('slow');
            });
            $('.welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('.welcome-module').fadeOut('slow');
            });
        });
    }
});
*/

/* Inactive users get an "inactive" tag on their profile headers */
window.InactiveUsers = {months: 2};

importArticles({
	type: 'script',
	articles: [
		'u:runescape:MediaWiki:Common.js/standardeditsummaries.js', /* Standard edit summaries */
	]
});