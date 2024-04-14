/* 
////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE NAVIGATION TEMPLATE COLLAPSABLE
////////////////////////////////////////////////////////////////
*/
 
 // ============================================================
// BEGIN Dynamic Navigation Bars (experimental)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 

$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
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
  var left = (diff%60) + ' secondes';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' heures ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' jours ' + left
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
 
$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});
 
 
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark"
};
 
 
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/standardeditsummaries.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:SocialIcons/code.js',
        'u:dev:ExtendedNavigation/code.js'
 
    ]
});


//=================================================================================================
//
//                                        BOÎTES DÉROULANTES
//
//=================================================================================================
 
// Pour [[Modèle:Méta palette de navigation]]
 
var autoCollapse = 2;
var collapseCaption = '[Masquer]';
var expandCaption = '[Afficher]';
 
function collapseTable( tableIndex ) {
  var Button = document.getElementById( "collapseButton" + tableIndex );
  var Table = document.getElementById( "collapsibleTable" + tableIndex );
  if ( !Table || !Button ) return false;
 
  var Rows = Table.getElementsByTagName( "tr" ); 
 
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
 
function createCollapseButtons() {
  var tableIndex = 0;
  var NavigationBoxes = new Object();
  var Tables = document.getElementsByTagName( "table" );
 
  for ( var i = 0; i < Tables.length; i++ ) {
    if ( hasClass( Tables[i], "collapsible" ) ) {
      NavigationBoxes[ tableIndex ] = Tables[i];
      Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
      var Button     = document.createElement( "span" );
      var ButtonLink = document.createElement( "a" );
      var ButtonText = document.createTextNode( collapseCaption );
 
      Button.style.styleFloat = "right";
      Button.style.cssFloat = "right";
      Button.style.fontWeight = "normal";
      Button.style.textAlign = "right";
      Button.style.width = "7em";
 
      ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
      ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
      ButtonLink.appendChild( ButtonText );
 
      Button.appendChild( ButtonLink );
 
      var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
      /* only add button and increment count if there is a header row to work with */
      if (Header) {
        Header.insertBefore( Button, Header.childNodes[0] );
        tableIndex++;
      }
    }
  }
 
  for (var i = 0; i < tableIndex; i++) {
    if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) collapseTable( i );
  }
}
addOnloadHook(createCollapseButtons);
 
/* Substitute Template:Information into upload page */
$(function() {
	if (wgPageName != 'Spécial:Téléverser') { return; }
	$('#wpUploadDescription').text("==Description==\r\n{{Fichier\r\n|Description=\r\n|Date=\r\n|Auteur=\r\n|Source=\r\n|Licence=\r\n|Et plus=\r\n}}");
});

/* Falling snow effect for the Christmas skin, courtesy of Community Central */
importScriptPage('MediaWiki:Snow.js','c');

SpoilerAlert = {
    question: 'Cette page contient des spoilers sur la Saison 3. Êtes-vous sûr(e) de vouloir la lire ?',
    yes: 'Oui',
    no: 'Non, pas maintenant',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
 
importScriptPage('SpoilerAlert/code.js', 'dev');