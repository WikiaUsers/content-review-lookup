/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
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
 var collapseCaption = "ẩn";
 var expandCaption = "hiện";
 
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

/// Title Rewrite ///

function showEras(className)
{
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;

    var titleDiv = document.getElementById(className);

    if(titleDiv == null || titleDiv == undefined)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}
// END JavaScript title rewrite

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

importScriptPage('AjaxRC/code.js', 'dev');

/*Keep favicon as correct PF logo instead of reverting to Wikia logo*/

document.write('<link REL="shortcut icon" HREF="/images/6/64/Favicon.ico" />')

/* Courtesy of the My Little Pony Friendship is Magic Wiki */
 
/* IRClogin div */
$(function() {
    if ($('#IRClogin').length) {
        if (typeof wgUserName == 'undefined') {
            var nick = 'Wikian' + Math.floor(Math.random() * 100);
        } else {
            var nick = wgUserName.replace(/ /g, "_");
        }
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=phineasandferb&prompt=true" width="660" height="400" style="border:0;"></iframe>');
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
    var tpm = '';
  } else {
    var tpm = '';
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

//YouTube player
mw.hook('wikipage.content').add(function($content) {
    $content.find('.youtubeplayer:not(.loaded)').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('https://www.youtube.com/embed/'),
            id = String(data.id || '').trim(),
            loop = String(data.loop || '').trim();
 
        if (id === '') {
            console.warn('[YoutubePlayer] Video ID is not defined.');
            return;
        }
 
        uri.path += id;
        uri.query = {
            autoplay: window.YoutubePlayerDisableAutoplay ?
                '0' :
                String(data.autoplay || '').trim(),
            loop: loop,
            playlist: loop === '1' ? id : '',
            start: String(data.start || '').trim(),
            list: String(data.list || '').trim()
        };
 
        $this.html(
            $('<iframe>', {
                width: String(data.width || '').trim(),
                height: String(data.height || '').trim(),
                src: uri.toString(),
                allowfullscreen: 'true',
                allow: 'fullscreen' + (loop ? '; autoplay' : '')
            })
        ).addClass('loaded');
    });
});

 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************


importArticles({
    type: "script",
    articles: [
        'w:c:dev:Countdown/code.js'
    ]
});