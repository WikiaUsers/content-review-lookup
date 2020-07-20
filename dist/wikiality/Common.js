/* Any JavaScript here will be loaded for all users on every page load. */

var fav = document.createElement('link');
fav.setAttribute('rel','shortcut icon');
fav.setAttribute('href','https://images.wikia.nocookie.net/wikiality/images/Favicon.png');
document.getElementsByTagName('head')[0].appendChild(fav);

// ==================================================
//   Main Page tabber (experimental, in development)
// Note: only triggers on [[Main Page]] or [[Main Page2]] currently. Be aware.

if((wgTitle=='Main Page')||(wgTitle=='Main Page2')) addOnloadHook(mainpageTabs)
function mainpageTabs() {
  if(!document.getElementById('tabbyHead') || !document.getElementById('tabbyBoxes')) return
  var box = document.getElementById('tabbyBoxes')
  tabbyBoxen = getElementsByClassName(document, 'div', 'tabbyBox');  //global
  tabbyLinks = document.getElementById('tabbyHead').getElementsByTagName('a') //global
  showbox(0);

  if(tabbyLinks.length < tabbyBoxen.length) {
    var len = tabbyLinks.length;
  } else {
    var len = tabbyBoxen.length;
  }

  for(var i=0;i<len;i++) {
    tabbyLinks[i].href = 'javascript:showbox("' + i + '");'
    tabbyLinks[i].title = 'click to display'
  }

}

function showbox(num) {
  for(var i=0;i<tabbyBoxen.length;i++) {
    if(i==num) {
      tabbyBoxen[i].style.display = 'block';
    } else {
      tabbyBoxen[i].style.display = 'none';
    }
  }
  for(var i=0;i<tabbyLinks.length;i++) {
    if(i==num) {
      tabbyLinks[i].className = 'selected';
    } else {
      tabbyLinks[i].className = '';
    }
  }
}

//                End Main Page tabber
// ==================================================


// --------------------------------------------------
//  <TT> News ticker 2.0, by Splarka, better version
// --------------------------------------------------

var ticker;
var tickertxt;
var tickerdiv;

function newsticker() {
  if (document.getElementById) {
  if ((document.getElementById('ticker'))&&(document.getElementById('tickerdiv'))&&(document.getElementById('tickertxt'))) {
    ticker = document.getElementById('ticker'); 
    ticker.style.display = 'block';
    tickerdiv = document.getElementById('tickerdiv');
    tickertxt = document.getElementById('tickertxt').offsetWidth; 
    tickerdiv.style.left = parseInt(ticker.style.width) + 10 + 'px';
    lefttime=setInterval("newstickergo()",200);
  }
  }
}

function newstickergo() {
  tickerdiv.style.left = (parseInt(tickerdiv.style.left) > (-10 - tickertxt) ) ? parseInt(tickerdiv.style.left) - 10 + "px" : parseInt(ticker.style.width) + 10 + "px";
} 
addOnloadHook(newsticker);

// --------------------------------------------------
//             End <TT> News ticker 2.0
// --------------------------------------------------

/** "Technical restrictions" title fix *****************************************
 *
 * Description:
 * Maintainers: User:Interiot, User:Mets501, User:Freakofnurture
 */
 //
 // For pages that have something like Template:Lowercase, replace the title, but only if it is cut-and-pasteable as a valid wikilink.
 // (for instance iPod's title is updated. But [[C#]] is not an equivalent
 // wikilink, so [[C Sharp]] doesn't have its main title changed)
 // Likewise for users who have selected the U.K. date format ("1 March") the  
 // titles of day-of-the-year articles will appear in that style. Users with any
 // other date setting are not affected.
 //
 // The function looks for a banner like this: 
 // <div id="RealTitleBanner">  ... <span id="RealTitle">title</span> ... </div>
 // An element with id=DisableRealTitle disables the function.
 //
 var disableRealTitle = 0; // users can set disableRealTitle = 1 locally to disable.
 if (wgIsArticle) { // don't display the RealTitle when editing, since it is apparently inconsistent (doesn't show when editing sections, doesn't show when not previewing)
  addOnloadHook(function() {
    try {
        var realTitleBanner = document.getElementById("RealTitleBanner");
        if (realTitleBanner && !document.getElementById("DisableRealTitle") && !disableRealTitle ) {
            var realTitle = document.getElementById("RealTitle");
            if (realTitle) {
                var realTitleHTML = realTitle.innerHTML;
                realTitleText = pickUpText(realTitle);
 
                var isPasteable = 0;
                //var containsHTML = /</.test(realTitleHTML);    // contains ANY HTML
                var containsTooMuchHTML = /</.test( realTitleHTML.replace(/<\/?(sub|sup|small|big)>/gi, "") ); // contains HTML that will be ignored when cut-n-pasted as a wikilink
                // calculate whether the title is pasteable
                var verifyTitle = realTitleText.replace(/^ +/, "");       // trim left spaces
                verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);    // uppercase first character
 
                // if the namespace prefix is there, remove it on our verification copy. If it isn't there, add it to the original realValue copy.
                if (wgNamespaceNumber != 0) {
                    if (wgCanonicalNamespace == verifyTitle.substr(0, wgCanonicalNamespace.length).replace(/ /g, "_") && verifyTitle.charAt(wgCanonicalNamespace.length) == ":") {
                        verifyTitle = verifyTitle.substr(wgCanonicalNamespace.length + 1);
                    } else {
                        realTitleText = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleText;
                        realTitleHTML = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleHTML;

                    }
                }
 
                // verify whether wgTitle matches
                verifyTitle = verifyTitle.replace(/[\s_]+/g, " ");      // underscores and multiple spaces to single spaces
                verifyTitle = verifyTitle.replace(/^\s+/, "").replace(/\s+$/, "");        // trim left and right spaces
                verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);    // uppercase first character
                if ( (verifyTitle == wgTitle) || (verifyTitle == wgTitle.replace(/^(.+)?(January|February|March|April|May|June|July|August|September|October|November|December)\s+([12]?[0-9]|3[0123])([^\d].*)?$/g, "$1$3 $2$4") )) isPasteable = 1;
                var h1 = document.getElementsByTagName("h1")[0];
                if (h1 && isPasteable) {
                    h1.innerHTML = containsTooMuchHTML ? realTitleText : realTitleHTML;
                    if (!containsTooMuchHTML)
                        realTitleBanner.style.display = "none";
                }
                document.title = realTitleText + " - wikiality, the truthiness encyclopedia";
            }
        }
    } catch (e) {
        /* Something went wrong. */
    }
  });
 }
 function pickUpText(aParentElement) {
 var str = "";
 
 function pickUpTextInternal(aElement) {
  var child = aElement.firstChild;
  while (child) {
   if (child.nodeType == 1)     // ELEMENT_NODE 
    pickUpTextInternal(child);
   else if (child.nodeType == 3)   // TEXT_NODE
    str += child.nodeValue;
 
   child = child.nextSibling;
  }
 }
 
  pickUpTextInternal(aParentElement);
  return str;
 }
/** END "Technical restrictions" title fix *****************************************


// --------------------------------------------------
//             Start Fake buttons for Kanye
// --------------------------------------------------


addOnloadHook(function() {
alert('test');
	if (document.getElementById('kanye_west_advanced_search')) {
		document.getElementById('kanye_west_advanced_search').innerHTML = '
			<fieldset>
			<legend>Advanced search</legend>
			<input name="title" type="hidden" value="Special:Search" /><p>Search in namespaces:<br /><span style="white-space: nowrap"><input name="ns0" type="checkbox" value="1" checked="checked" id="mw-search-ns0" />&nbsp;<label for="mw-search-ns0">(Main)</label></span>
			
			<span style="white-space: nowrap"><input name="ns1" type="checkbox" value="1" id="mw-search-ns1" />&nbsp;<label for="mw-search-ns1">Talk</label></span>
			<span style="white-space: nowrap"><input name="ns2" type="checkbox" value="1" id="mw-search-ns2" />&nbsp;<label for="mw-search-ns2">User</label></span>
			<span style="white-space: nowrap"><input name="ns3" type="checkbox" value="1" id="mw-search-ns3" />&nbsp;<label for="mw-search-ns3">User talk</label></span>
			<span style="white-space: nowrap"><input name="ns4" type="checkbox" value="1" id="mw-search-ns4" />&nbsp;<label for="mw-search-ns4">Wikiality</label></span>
			<span style="white-space: nowrap"><input name="ns5" type="checkbox" value="1" id="mw-search-ns5" />&nbsp;<label for="mw-search-ns5">Wikiality talk</label></span>
			<span style="white-space: nowrap"><input name="ns6" type="checkbox" value="1" id="mw-search-ns6" />&nbsp;<label for="mw-search-ns6">Image</label></span>
			<span style="white-space: nowrap"><input name="ns7" type="checkbox" value="1" id="mw-search-ns7" />&nbsp;<label for="mw-search-ns7">Image talk</label></span>
			<span style="white-space: nowrap"><input name="ns8" type="checkbox" value="1" checked="checked" id="mw-search-ns8" />&nbsp;<label for="mw-search-ns8">MediaWiki</label></span>
			<span style="white-space: nowrap"><input name="ns9" type="checkbox" value="1" id="mw-search-ns9" />&nbsp;<label for="mw-search-ns9">MediaWiki talk</label></span>
			
			<span style="white-space: nowrap"><input name="ns10" type="checkbox" value="1" checked="checked" id="mw-search-ns10" />&nbsp;<label for="mw-search-ns10">Template</label></span>
			<span style="white-space: nowrap"><input name="ns11" type="checkbox" value="1" id="mw-search-ns11" />&nbsp;<label for="mw-search-ns11">Template talk</label></span>
			<span style="white-space: nowrap"><input name="ns12" type="checkbox" value="1" id="mw-search-ns12" />&nbsp;<label for="mw-search-ns12">Help</label></span>
			<span style="white-space: nowrap"><input name="ns13" type="checkbox" value="1" id="mw-search-ns13" />&nbsp;<label for="mw-search-ns13">Help talk</label></span>
			<span style="white-space: nowrap"><input name="ns14" type="checkbox" value="1" checked="checked" id="mw-search-ns14" />&nbsp;<label for="mw-search-ns14">Category</label></span>
			<span style="white-space: nowrap"><input name="ns15" type="checkbox" value="1" id="mw-search-ns15" />&nbsp;<label for="mw-search-ns15">Category talk</label></span>
			<span style="white-space: nowrap"><input name="ns110" type="checkbox" value="1" id="mw-search-ns110" />&nbsp;<label for="mw-search-ns110">Forum</label></span>
			<span style="white-space: nowrap"><input name="ns111" type="checkbox" value="1" id="mw-search-ns111" />&nbsp;<label for="mw-search-ns111">Forum talk</label></span>
			</p><p><input name="redirs" type="checkbox" value="1" id="redirs" /> <label for="redirs">List redirects</label></p>Search for&nbsp;<input name="search" size="50" value="' + wgTitle + '" type="text" id="powerSearchText" />&nbsp;<input type="submit" value="Search" name="fulltext" onclick="Special:Search" />
			
			</fieldset>
		';
	}
}



// --------------------------------------------------
//             End Fake buttons for Kanye
// --------------------------------------------------


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