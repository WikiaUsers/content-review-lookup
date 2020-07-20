/* Any JavaScript here will be loaded for all users on every page load. */

// SVG images: adds links to rendered PNG images in different resolutions
function SVGThumbs() {
	var file = document.getElementById("file"); // might fail if MediaWiki can't render the SVG
	if (file && wgIsArticle && wgTitle.match(/\.svg$/i)) {
		var thumbu = file.getElementsByTagName('IMG')[0].src;
		if(!thumbu) return;
 
		function svgAltSize( w, title) {
			var path = thumbu.replace(/\/\d+(px-[^\/]+$)/, "/" + w + "$1");
			var a = document.createElement("A");
			a.setAttribute("href", path);
			a.appendChild(document.createTextNode(title));
			return a;
		}
 
		var p = document.createElement("p");
		p.className = "SVGThumbs";
		p.appendChild(document.createTextNode("This image rendered as PNG in other sizes"+": "));
		var l = [200, 500, 1000, 2000, 3000];
                for( var i = 0; i < l.length; i++ ) {
			p.appendChild(svgAltSize( l[i], l[i] + "px"));
			if( i < l.length-1 ) p.appendChild(document.createTextNode(", "));
                }
		p.appendChild(document.createTextNode("."));
		var info = getElementsByClassName( file.parentNode, 'div', 'fullMedia' )[0];
		if( info ) info.appendChild(p);
	}
};
addOnloadHook( SVGThumbs );

// Automatically fix Wikipedia links that are appearing as external links
$('a[href*="wikipedia.org/"].external.exitstitial').removeClass('external exitstitial').addClass('text');

if(wgPageName==="Clannad_Wiki_talk:Featured_articles"){
 $('a[href*="action=edit"]').each(function(){
  $(this).attr('href',$(this).attr('href')+'&editintro=Template:Featured_Article_Criteria_Rubric');
 });
}

// Show all language links and alphabetize
$('nav.WikiaArticleInterlang li.more-link').remove();
$('nav.WikiaArticleInterlang li.more').removeClass('more');
var langarr = [];
$('nav.WikiaArticleInterlang').append('<ul id="newlangs" />');
$('nav.WikiaArticleInterlang li').each(function(){
	var iso = $('a',$(this)).attr('href').match(/\/\w{2}\./)[0].match(/\w{2}/)[0];
	langarr.push(iso);
	$(this).attr('id',iso).wrap('<span />');
});
langarr.sort();
for(var i = 0;i<langarr.length; i++) {
	$('#newlangs').append($('#'+langarr[i]).parent().html());
}
$('nav.WikiaArticleInterlang ul:not("#newlangs")').remove();

// JavaScript Measurements and Date Selectors
function makeDate(fmt,fulldate) {
 if(fulldate.match(/[a-z]+, [0-9]+ [a-z]+ [0-9]{4}/gi)) { // dddd dd mmmm yyyy
  var day = fulldate.match(/[a-z]+/gi)[0],
     date = fulldate.match(/[0-9]+/)[0],
    month = fulldate.match(/[a-z]+/gi)[1],
     year = fulldate.match(/[0-9]{4}/)[0];
  if(fmt === "dmy") {
   return day+", "+date+" "+month+" "+year;
  } else if(fmt === "mdy") {
   return day+", "+month+" "+date+", "+year;
  } else if(fmt === "ymd") {
   return year+" "+month+" "+date+" ("+day+")";
  }
 } else if(fulldate.match(/[0-9]+ [a-z]+ [0-9]{4}/i)) { // dd mmmm yyyy
  var date = fulldate.match(/[0-9]+/)[0],
     month = fulldate.match(/[a-z]+/i)[0],
      year = fulldate.match(/[0-9]{4}/)[0];
  if(fmt === "dmy") {
   return date+" "+month+" "+year;
  } else if(fmt === "mdy") {
   return month+" "+date+", "+year;
  } else if(fmt === "ymd") {
   return year+" "+month+" "+date;
  }
 } else if(fulldate.match(/[0-9]+ [a-z]+/i)) { // dd mmmm
  var date = fulldate.match(/[0-9]+/)[0],
     month = fulldate.match(/[a-z]+/i)[0];
  if(fmt === "dmy") {
   return date+" "+month;
  } else if(fmt === "mdy" || fmt === "ymd") {
   return month+" "+date;
  }
 } else if(fulldate.match(/[a-z]+ [0-9]{4}/i)) { // mmmm yyyy
  var month = fulldate.match(/[a-z]+/i)[0],
       year = fulldate.match(/[0-9]{4}/)[0];
  if(fmt === "dmy" || fmt === "mdy") {
   return month+" "+year;
  } else if(fmt === "ymd") {
   return year+" "+month;
  }
 } else {
  return fulldate;
 }
}
 
function toDate(fmt) {
 var d = new Date(),
  date = d.getDate(),
 mname = ["January","February","March","April","May","June","July","August","September","October","November","December"],
 month = mname[d.getMonth()],
  year = d.getFullYear();
 
 if(fmt === "dmy") {
  return date+" "+month+" "+year;
 } else if(fmt === "mdy") {
  return month+" "+date+", "+year;
 } else if(fmt === "ymd") {
  return year+" "+month+" "+date;
 }
}
 
function setCookie(c_name,value,expiredays) {
 var exdate=new Date();
 exdate.setDate(exdate.getDate()+expiredays);
 document.cookie=c_name+ "=" +escape(value) + ((expiredays===null) ? "" : ";expires="+exdate.toGMTString());
}
 
function getCookie(c_name) {
 if (document.cookie.length>0) {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1) { 
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) {c_end=document.cookie.length;}
   return unescape(document.cookie.substring(c_start,c_end));
  }
 }
 return "";
}
 
function msetup() {
 var meas = getCookie('measurements');
 if(meas !== null && meas !== "" && meas !== "label") {
  $('select[name="measurements-selector"] option[value="'+meas+'"]').attr('selected','selected');
  $('.measurements').each(function(){
   $(this).hide();
   $(this).parent().find('.measurements-container').text($('.measurements-'+meas,$(this)).text());
  });
 } else if(meas === "label") {
  $('.measurements').each(function(){
   $(this).parent().find('.measurements-container').empty();
   $(this).show();
  });
 }
}
 
function dsetup() {
 var dat = getCookie('dateformat');
 if(dat !== null && dat !== "" && dat !== "label") {
  $('select[name="date-selector"] option[value="'+dat+'"]').attr('selected','selected');
  $('.date').each(function(){
   $(this).hide();
   $(this).parent().find('.date-container').text(makeDate(dat,$(this).text()));
  });
 } else if(dat === "label") {
  $('.date').each(function(){
   $(this).parent().find('.date-container').empty();
   $(this).show();
  });
 }
}

// On DOM Ready
$(function(){
 // Setup language selector
 $('#langdiv img').each(function(){
  $(this).css({'height':'auto','width':'60px'});
 });
 $('#langdiv img').hover(function(){
  $(this).animate({width:'70px'},'fast');
  $('#langdiv span').text($(this).attr('alt'));
 },function(){
  $('#langdiv span').text('Localized Versions of the Clannad Wiki');
  $(this).animate({width:'60px'},'fast');
 });
});
// End On DOM Ready

function onLoad(){
 // Setup date selector
 $('#WikiaRail #WikiaSearch').after('<section class="module" style="padding-top:8px;"><h1 style="margin:0 0 7px 0;">Display Options</h1><table style="width:100%; text-align:center;"><tr><td><select name="measurements-selector" style="font-size:smaller;"><option value="label">Units</option><option disabled="disabled">—</option><option value="metric">Metric</option><option value="us">US Customary</option><option value="imperial">Imperial</option></select></td><td><select name="date-selector" style="font-size:smaller;"><option value="label">Date Format</option><option disabled="disabled">—</option><option value="dmy">'+toDate('dmy')+'</option><option value="mdy">'+toDate('mdy')+'</option><option value="ymd">'+toDate('ymd')+'</option></select></td></tr></table></section>');
 $('select[name="measurements-selector"]').bind('change keyup',function() {
  setCookie('measurements',$(this).val(),'365');
  msetup();
 });
 $('.measurements').each(function(){
  $(this).before($('<span class="measurements-container" />'));
 });
 msetup();
 $('select[name="date-selector"]').bind('change keyup',function() {
  setCookie('dateformat',$(this).val(),'365');
  dsetup();
 });
 $('.date').each(function(){
  $(this).before($('<span class="date-container" />'));
 });
 dsetup();
}

window.onload = onLoad;

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
 
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
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
 
 function createCollapseButtons()
 {
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
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
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
 *  Maintainers: UNMAINTAINED
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
    if (NavToggle.firstChild.data === NavigationBarHide) {
        for (NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data === NavigationBarShow) {
        for (NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
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
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var isCollapsed = hasClass( NavFrame, "collapsed" );
            /*
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for (NavChild = NavFrame.firstChild; NavChild !== null && !isCollapsed; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if ( NavChild.style.display === 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if (isCollapsed) {
                for (NavChild = NavFrame.firstChild; NavChild !== null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
 
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}
 
addOnloadHook( createNavigationBarToggleButton );

function hideCharTOC() {
    $('body.page-Characters_of_Clannad nav.toc.show #togglelink').click();
    $('body:not(.page-Characters_of_Clannad) nav.toc:not(.show) #togglelink').click();
}

addOnloadHook( hideCharTOC );

//Duplicate Images
importScriptPage('DupImageList/code.js', 'dev');