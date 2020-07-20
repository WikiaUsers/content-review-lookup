importArticles({
    type: 'script',
    articles: [
        'u:dev:PortableCSSPad/code.js',
        'u:dev:RecentChangesMultiple/code.js',
        'MediaWiki:KevinWordBubble.js',
    ]
});

/* Adds parameter nrackets to Portable Infobox placeholders */

$('.placeholder').each(function() {
    $(this).prepend("{{{");
    $(this).append("}}}");
});

if($('.pi-image').length === 0){
    $('.pi-header:first-of-type').after("<div class='pi-image-placeholder'>[[File:{{{image}}}|250px]]</div>");
    $('.pi-image-placeholder').css({
            "font-size": "12px",
            "text-align": "center",
            "color": "#000000",
    });
}

// ALWAYS ADD IMPORTS ABOVE THIS LINE

/* Custom "NewFilesModule" by 452 - displays [[Special:NewFiles]] in the right rail
   There are three ways to use this, by setting the NewFilesModuleCompact variable
   0 - Normal, width is 212
   1 - Compact, width is 106
   2 - Random, if you're not sure which version you like best.
 
   In both modes, hovering over each displays the uploader info.
 
   NewFilesModuleCount can be used to specify the number of displayed images.
*/
var NewFilesModuleCompact = 2; //must be 0, 1, or 2.
var NewFilesModuleCount = 6; //any integer
 
if ($('#WikiaRail').length) { //only on pages where the rail is present
  $('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
    if (!$("#NewFilesModule").length) { // Only add it ''once''
      if (typeof $temp == "undefined") { // Only load it ''once''
        $temp = $('<div>'); // this line, and the next, originate from http://dev.wikia.com/wiki/AjaxRC/code.js <3
        $temp.load("/Special:NewFiles/" +NewFilesModuleCount + " #gallery-", function () {
          $('#WikiaRail section:last-of-type').after("<section id='NewFilesModule' class='module'><h1><a href='/Special:NewFiles'>New Files</a><a class='wikia-button' href='/Special:Upload'>Upload</a></h1>");
          if (typeof NewFilesModuleCompact == "undefined") NewFilesModuleCompact = 0;
          if (NewFilesModuleCompact == 2) NewFilesModuleCompact = Math.floor(Math.random()*2);
          if (NewFilesModuleCompact) {
            $('#gallery-', $temp).html($('#gallery-', $temp).html().replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/106?"));
            $("#NewFilesModule").addClass("compact");
          }
          $("#NewFilesModule").append($('#gallery-', $temp));
          $("#NewFilesModule .wikia-photogallery-add").remove();
          $("#NewFilesModule .wikia-gallery-item").each(function() { $(".lightbox-caption", this).prepend($("<a>").attr("href",$(".gallery-image-wrapper>a", this).attr("href")).html($(".gallery-image-wrapper>a", this).attr("title")).append($("<br>")));});
          delete $temp; //delete it, in case the rail is wiped after this point.
        });
      }
    }
  });  //end of DOMNodeInserted block
   $('head').append('<style type="text/css">\n#gallery- { position:relative;overflow-y:auto; clear: both; text-align:center; height:452px; }\n#gallery-:hover {padding-bottom: 13em; }\n#NewFilesModule .gallery-image-wrapper { top: 0 !important; height: auto !important; border:none;  background: none; }\n#NewFilesModule.compact .gallery-image-wrapper { width: auto !important; }\n#NewFilesModule .thumb { height:auto !important; }\n#NewFilesModule .wikia-gallery-item { margin: 1px !important; padding: 0 !important; height: auto !important; border: none !important; }\n#NewFilesModule.compact .wikia-gallery-item { width: auto !important; }\n#NewFilesModule .wikia-gallery-item .lightbox-caption { display: none; }\n#NewFilesModule .wikia-gallery-item:hover .lightbox-caption { display:block; padding: 5px; margin-top: 0; position: absolute; border: 1px solid; background-color: #fff; z-index: 2; right: 0; width: 240px !important; }\n#NewFilesModule h1 {margin: 0 2em 0 0;}\n#NewFilesModule h1 a:first-child {color:inherit;}\n#NewFilesModule img { display: block; height: auto !important; width: auto !important; margin-left: auto !important; margin-top: auto !important;}\n.wikia-gallery-item .gallery-image-wrapper a { width: auto !important; height: auto !important; }\n.wikia-gallery-item .gallery-image-wrapper a.image-no-lightbox { line-height: normal; display: block; padding: 1em; }\n</style>');
 
} // End of custom "NewFilesModule"

$(document).ready(function() {
  $('#slidemarginleft button').click(function() {
    var $marginLefty = $(this).next();
    $marginLefty.animate({
      marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ?
        $marginLefty.outerWidth() :
        0
    });
  });
}); 
 
//Makes expand/collapse and hide/show work in comments
//Thanks to Rappy who made this ^^^^
 
$('#WikiaArticleComments').bind('DOMNodeInserted', function () {
    if ($('#WikiaArticleComments .mw-collapsible')) {
        $('#WikiaArticleComments .mw-collapsible').makeCollapsible();
        $('#WikiaArticleComments .mw-collapsible-toggle').css('float', 'right');
    }
});
 
if (mediaWiki.config.get("wgPageName") === "Special:UnusedFiles") {
	$(function () {
		var str = "";
		$('.gallerytext > a').each(function () {
			str += decodeURIComponent(this.href.substring(this.href.indexOf("File"))) + "\n";
		});
		var $textarea = $('<textarea style="width: 95%; height: 100px"></textarea>');
		$textarea.val(str);
		$('.gallery').before($textarea);
	});
}
 
 
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
 
// ============================================================
// displayTimer - 2/1/11
// ============================================================
 
/** Test if an element has a certain class **************************************
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
 
/** Collapsible tables (From [[wikipedia:MediaWiki:Common.js]] ******************************
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
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            addHandler( ButtonLink,  "click", new Function( "evt", "collapseTable(" + tableIndex + " ); return killEvt( evt );") );
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
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
addOnloadHook( createCollapseButtons );

/** Collapsible tables (From [[wikipedia:MediaWiki:Common.js]] ******************************
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
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            addHandler( ButtonLink,  "click", new Function( "evt", "collapseTable(" + tableIndex + " ); return killEvt( evt );") );
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
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
addOnloadHook( createCollapseButtons );

$('#togglebutton').click(function () {
    var $elementtest = $('#elementtest'),
        display = $elementtest.css('display');
    if (display === 'block') {
        $elementtest.css('display', 'none');
    } else {
        $elementtest.css('display', 'block');
    }
});

// Adding a checkbox for "poweruser" users on Special:ListUsers

if (wgPageName=="Special:ListUsers") $("fieldset.lu_fieldset tr:last-child").prepend('<td valign="middle" style="padding:0px 2px 0px 1px;"><label for="checkBoxForpoweruser"><span style="vertical-align:middle"><input type="checkbox" name="lu_target" class="lu_target" value="poweruser" checked="checked" id="checkBoxForpoweruser"></span><span style="padding-bottom:5px;">Power Users</span></label></td>');

var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

// Google Drive Embed

$(document).ready(function() {
    $(".google-drive").html("<iframe width=90% height=500px src='https://docs.google.com/spreadsheets/d/1bNoUJfgyoZAJ3VLphEAW7dHBSRWDVlI8JjQDwEu1pNI/pubhtml?widget=true&amp;headers=false'></iframe>");  
});


 if($("body.ns-0").contains("<center>")) {
    $('nav.article-categories').before('Test');
 }