/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre><nowiki> */

/**** Custom edit buttons ****/
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
}

importArticles({
	type: "script",
	articles: [
        "w:c:dev:Countdown/code.js"
	]
});

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
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
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

document.write('<script type="text/javascript" src="' 
    + '/index.php?title=MediaWiki:Functions.js&action=raw&ctype=text/javascript&smaxage=18000"></script>');

// **************************************************
// Edit summaries
// **************************************************

function fillEditSummaries()
{
    var label = document.getElementById("wpSummaryLabel");

    if(label == null)
        return;

    var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
    comboString += "</select><br />";
    label.innerHTML = comboString + label.innerHTML;

    requestComboFill('stdSummaries', 'Template:Stdsummaries');
}

function onStdSummaryChange()
{
    var combo = document.getElementById("stdSummaries");
    var value = combo.options[combo.selectedIndex].value;

    if(value != "")
        document.getElementById("wpSummary").value = value;
}

addOnloadHook(fillEditSummaries);


// **************************************************
// - end - Edit summaries
// **************************************************

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AUTO REFRESHING RECENT CHANGES AND WATCHLIST
// Code courtesy of "pcj" of WoWWiki.

///////////////////////////////////////////////////////////////////////////////////////////////////////////


ajaxPages="Special:RecentChanges,Special:Watchlist,";

function setCookie(c_name,value,expiredays) {
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(c_name) {
if (document.cookie.length>0) {
c_start=document.cookie.indexOf(c_name + "=")
if (c_start!=-1) { 
c_start=c_start + c_name.length+1 
c_end=document.cookie.indexOf(";",c_start)
if (c_end==-1) c_end=document.cookie.length
return unescape(document.cookie.substring(c_start,c_end))
} 
}
return ""
}

function getXmlHttpRequestObject() {
if (window.XMLHttpRequest) {
return new XMLHttpRequest(); //Not Internet Explorer
} else if(window.ActiveXObject) {
return new ActiveXObject("Microsoft.XMLHTTP"); //Internet Explorer
} else {
//fail silently
}
}
getRCDataRO = getXmlHttpRequestObject();
var cr = new RegExp("\r", "gm");
var lf = new RegExp("\n", "gm");
var endText = new RegExp('</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "mi");
var rcTimer;
var rcRefresh = 60000;
function preloadAJAXRC() {
if (skin == "monaco") {
s = 1;
} else {
s = 0;
}
ajaxRCCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
document.getElementsByTagName("h1")[0].innerHTML += '&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">AJAX:</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
document.getElementById("ajaxRCtoggle").checked = ajaxRCCookie;
if (getCookie("ajaxload-"+wgPageName)=="on") loadRCData();
}

function toggleRC() {
if (document.getElementById("ajaxRCtoggle").checked == true) {
setCookie("ajaxload-"+wgPageName, "on", 30);
loadRCData();
} else {
setCookie("ajaxload-"+wgPageName, "off", 30);
clearTimeout(rcTimer);
}
}

function loadRCData() {
if (getRCDataRO.readyState == 4 || getRCDataRO.readyState == 0) {
if (location.href.indexOf("/wiki/")) {
rcURL = "http://" + location.hostname + "/wiki/" + wgPageName + location.search;
} else {
rcURL = "http://" + location.hostname + "/" + wgPageName + location.search;
}
getRCDataRO.open("GET", rcURL, true);
getRCDataRO.onreadystatechange = parseRCdata;
getRCDataRO.send(null);
}
}

function parseRCdata() {
if (getRCDataRO.readyState == 4) {
textFilter = new RegExp('<div id="bodyContent">.*?</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "i");
rawRCdata = getRCDataRO.responseText.replace(cr, "").replace(lf, "");
filteredRCdata = textFilter.exec(rawRCdata);
updatedText = filteredRCdata[0].replace('<div id="bodyContent">', "").replace(endText, "");
document.getElementById("bodyContent").innerHTML = updatedText;
rcTimer = setTimeout("loadRCData();", rcRefresh);
}
}

if (ajaxPages.indexOf(wgPageName)!=-1) addOnloadHook(preloadAJAXRC);

/* ====================================================================== *\
	# music templates
\* ====================================================================== */

$(function() {
	$("body").on("DOMNodeInserted", "object.musictemplate", function() {
		$('<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Audio-volume-muted.svg/24px-Audio-volume-muted.svg.png" class="musictemplate button" title="Toggle music" />')
			.prependTo("body")
			.click(function() {
				var urls = ["http://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Audio-volume-muted.svg/24px-Audio-volume-muted.svg.png", "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Audio-volume-high.svg/24px-Audio-volume-high.svg.png"],
					src = $(this).attr("src"),
					isOn = urls.indexOf(src) == 1;
				$(this).attr("src", isOn ? urls[0] : urls[1]);
				$("object.musictemplate").each(function() {
					if ($(this).hasClass("musictemplate-off")) {
						$(this).attr({
							"data": $(this).attr("data-data"),
							"data-data": ""
						});
						$(this).removeClass("musictemplate-off");
					} else {
						$(this).attr({
							"data-data": $(this).attr("data"),
							"data": ""
						});
						$(this).addClass("musictemplate-off");
					}
				});
			});
		mw.util.addCSS(
			'@-moz-keyframes embedcontrol{0%{box-shadow: 0 0 4px red;}17%{box-shadow: 0 0 4px yellow;}33%{box-shadow: 0 0 4px lime;}50%{box-shadow: 0 0 4px cyan;}67%{box-shadow: 0 0 4px blue;}83%{box-shadow: 0 0 4px purple;}100%{box-shadow: 0 0 4px red;}}@-webkit-keyframes embedcontrol{0%{box-shadow: 0 0 4px red;}17%{box-shadow: 0 0 4px yellow;}33%{box-shadow: 0 0 4px lime;}50%{box-shadow: 0 0 4px cyan;}67%{box-shadow: 0 0 4px blue;}83%{box-shadow: 0 0 4px purple;}100%{box-shadow: 0 0 4px red;}}@keyframes embedcontrol{0%{box-shadow: 0 0 4px red;}17%{box-shadow: 0 0 4px yellow;}33%{box-shadow: 0 0 4px lime;}50%{box-shadow: 0 0 4px cyan;}67%{box-shadow: 0 0 4px blue;}83%{box-shadow: 0 0 4px purple;}100%{box-shadow: 0 0 4px red;}}\n' +
			'img.musictemplate {\n' +
				'\tposition: fixed;\n' +
				'\ttop: 60px;\n' +
				'\tleft: 4px;\n' +
				'\tz-index: 9999;\n' +
				'\tpadding: 1px;\n' +
				'\tcursor: hand;\n' +
				'\tcursor: pointer;\n' +
				'\t-moz-animation: embedcontrol 5s infinite linear;\n' +
				'\t-webkit-animation: embedcontrol 5s infinite linear;\n' +
				'\tanimation: embedcontrol 5s infinite linear;\n' +
			'}'

		);
	});
	/* for [[Template:EmbedMusic]] */
	function EmbedMusic() {
		if (
			$("#mw-content-text span.EmbedMusic").length > 0 && // music fragments exist
			Number($("#mw-content-text span.EmbedMusic").first().text()) != NaN && // music has a valid input
			[2, 3, 10, 500].indexOf(mw.config.get("wgNamespaceNumber")) > -1 // namespace: ["User", "User talk", "Template", "User blog"]
		) {
			$("#mw-content-text span.EmbedMusic").first().replaceWith(
				'<object width="0" height="0" data="http://media1.clubpenguin.com/play/v2/content/global/music/' +
				Number($("#mw-content-text span.EmbedMusic").first().text()) +
				'.swf" class="musictemplate embedmusic"></object>'
			);
		} else if ($("#mw-content-text span.EmbedMusic").length > 0) {
			console.log("Your music ID input for [[Template:EmbedMusic]] was not valid. Please try again.");
		}
	}
	 
	if (mw.config.get("wgAction") == "edit") {
		// when ?action=edit
		$("body").on("DOMNodeInserted", ".WikiaArticle", function() {
			EmbedMusic();
		});
	} else {
		// not in the editor
		EmbedMusic();
	}
	/* for [[Template:MusicPlay]] */
	$(function() {
		// <span class="MusicPlay" data-repeat="repeat">File:FILENAME</span>
		function MusicPlay() {
			if ([2, 3, 10, 500].indexOf(mw.config.get("wgNamespaceNumber")) > -1 && $.cookie("embedmusic") != "disabled") { // namespace: ["User", "User talk", "Template", "User blog"], also MusicPlay function not disabled by the client
				// file names array (includes the File: prefix)
				var titles = [];
	 
				// all elements that require
				$("span.MusicPlay").each(function() {
					var slash = $(this).html().replace(/_/g," ").split("/"); // for dealing with old syntax, at least for now
					$(this).html(slash.length == 1 ? slash[0] : "File:" + decodeURIComponent(slash[slash.length-1]));
					var a = encodeURIComponent($(this).html());
					if (titles.indexOf(a) == -1) {
						titles.push(a);
					}
					$(this).attr("data-src", a);
				});
				$.getJSON("/api.php?action=query&format=json&prop=imageinfo&iiprop=mime|metadata|url&titles=" + titles.join("|") + "&cb=" + new Date().getTime(), function(data) {
					var a = data.query.pages;
					for (var pageid in a) {
						// if file exists
						if (pageid > 0) {
							// if is .ogg
							if (a[pageid].imageinfo[0].mime == "application/ogg") {
								var embed =
									$('<object />').attr({
										"data": a[pageid].imageinfo[0].url,
										"type": "application/ogg",
										"height": "0",
										"width": "0",
										"class": "musictemplate MusicPlay"
									});
								/*
									could use for looping, if specified:
									a[pageid].imageinfo[0].metadata.[i/* 'i' has property 'length'*\/].value
								*/
								$('span[data-src="' + encodeURIComponent(a[pageid].title.replace(/&/g,"&amp;")) + '"].MusicPlay').replaceWith(embed);
							}
						} else {
							// file doesn't exist- modify 'span.MusicPlay' element
							$('span[data-src="' + encodeURIComponent(a[pageid].title) + '"].MusicPlay').each(function() {
								var errorFilename = a[pageid].title.replace(/"/g,"\\");
								$(this).html(
									'<!-- MusicPlay Error: couldn\'t find file named "' + errorFilename + '" -->'
								);
								console.error('MusicPlay Error: couldn\'t find file named "' + errorFilename + '"');
							});
						}
					}
				});
			}
		}
		if (mw.config.get("wgAction") == "edit") {
			// when ?action=edit
			$(window).on("EditPageAfterRenderPreview", function() {
				MusicPlay();
			});
		} else if ($("span.MusicPlay").length > 0) {
			// not in the editor but 'span.MusicPlay' exists
			MusicPlay();
		}
	});
});




///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF CODE

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// **************************************************
// Infobox spoilers
// **************************************************

function spoilerLoad(){
    $("[title='Click to display spoiler']").click(function(){$(this.nextSibling).fadeIn()});
}
 
hookEvent('load', spoilerLoad);

// **************************************************
// - end - Infobox spoilers
// **************************************************

/* </nowiki></pre> */

window.UserTagsJS = {
	modules: {},
	tags: {
		jay: { u:'Blue Jay' },
	}
};

importedScripts = {}; // object keeping track of included scripts, so a script ain't included twice
 function importScript( page ) {
     if( importedScripts[page] ) {
         return;
     }
     importedScripts[page] = true;
     var url = wgScriptPath
             + '/index.php?title='
             + encodeURIComponent( page.replace( / /g, '_' ) )
             + '&action=raw&ctype=text/javascript';
     var scriptElem = document.createElement( 'script' );
     scriptElem.setAttribute( 'src' , url );
     scriptElem.setAttribute( 'type' , 'text/javascript' );
     document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
 }

importScript("MediaWiki:WikiaRating.js");

/*DO NOT TOUCH*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YoutubePlayer/code.js'
    ]
});