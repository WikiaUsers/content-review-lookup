/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/*<pre><nowiki>*/

/* Site Meter */
importScript('MediaWiki:Common.js/statcounter.js');

/* Skrypt odpowiedzialny za wyświetlanie szablonu Nagłówek [[Szablon:Nagłówek]] */
jQuery(document).ready(function() {
	var hideAll = document.getElementById('mojNaglowekUryj');
	var noFooter = false;
	var footers = 0;

	var tags = document.getElementsByTagName('div');
	for (var i = 0; i < tags.length; i++) {
		var el=tags[i].getAttribute("id");
		if (el=='mojaStopka')
			footers++;
		else if (hideAll && (el=='mojNaglowek')) {
			tags[i].innerHTML="";
			noFooter=true;
		}
	}
	if (noFooter) return;

	var footer = document.getElementById('mojaStopka');
	if ((footer != null) && (footers==1)) {
		var content = document.getElementById('content');
		if (content != null) {
			var s0=document.getElementById('mojaStopka0');
			var s1=document.getElementById('mojaStopka1');
			if ((s1 != null) ||
			    ((s0 == null) && (content.innerHTML.length>8000)))
				 content.appendChild(footer);
		}
	}
 });
/* Koniec skryptu odpowiedzialnego za wyświetlanie szablonu Nagłówek [[Szablon:Nagłówek]] */


/* Skrypt odpowiedzialny za wyświetlanie galerii obrazków [[Szablon:Galeria]] */
function toggleImage(group, remindex, shwindex) {
  document.getElementById("ImageGroupsGr"+group+"Im"+remindex).style.display="none";
  document.getElementById("ImageGroupsGr"+group+"Im"+shwindex).style.display="inline";
}
function ImageGroup(){
  if (document.URL.match(/printable/g)) return;
  var divs=document.getElementsByTagName("div");
  var i = 0, j = 0;
  var units, search;
  var currentimage;
  var UnitNode;
  for (i = 0; i < divs.length ; i++) {
    if (divs[i].className != "ImageGroup") continue;
    UnitNode=undefined;
    search=divs[i].getElementsByTagName("div");
    for (j = 0; j < search.length ; j++) {
      if (search[j].className != "ImageGroupUnits") continue;
      UnitNode=search[j];
      break;
    }
    if (UnitNode==undefined) continue;
    units=Array();
    for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
      var temp = UnitNode.childNodes[j];
      if (temp.className=="center") units.push(temp);
    }
    for (j = 0 ; j < units.length ; j++) {
      currentimage=units[j];
      currentimage.id="ImageGroupsGr"+i+"Im"+j;
      var imghead = document.createElement("div");
      var leftlink = document.createElement("a");
      var rightlink = document.createElement("a");
      if (j != 0) {
        leftlink.href = "javascript:toggleImage("+i+","+j+","+(j-1)+");";
        leftlink.innerHTML="◀";
      }
      if (j != units.length - 1) {
        rightlink.href = "javascript:toggleImage("+i+","+j+","+(j+1)+");";
        rightlink.innerHTML="▶";
      }
      var comment = document.createElement("tt");
      comment.innerHTML = "("+ (j+1) + "/" + units.length + ")";
      with(imghead) {
        style.fontSize="110%";
        style.fontweight="bold";
        appendChild(leftlink);
        appendChild(comment);
        appendChild(rightlink);
      }
      if (units.length>1) currentimage.insertBefore(imghead,currentimage.childNodes[0]);
      if (j != 0) currentimage.style.display="none";
    }
  }
}
addOnloadHook(ImageGroup);
/* Koniec skryptu odpowiedzialnego za wyświetlanie galerii obrazków [[Szablon:Galeria]] */

/* Skrypt odpowiedzialny za zmianę napisu na zakładce treść - pierwszej od lewej [[Szablon:Autorinfo]] oraz [[Szablon:Postęp prac]] */
addOnloadHook(function()
{
	var tab1 = document.getElementById("ca-nstab-main");
	if(tab1) {
		var t = tab1.firstChild;
		var q = document.getElementById("textquality")
		if (q) {
			var src = {
				"0%":   "http://upload.wikimedia.org/wikipedia/commons/8/8f/00%25.png",
				"25%":  "http://upload.wikimedia.org/wikipedia/commons/5/5b/25%25.png",
				"50%":  "http://upload.wikimedia.org/wikipedia/commons/3/3a/50%25.png",
				"75%":  "http://upload.wikimedia.org/wikipedia/commons/c/cd/75%25.png",
				"100%": "http://upload.wikimedia.org/wikipedia/commons/6/64/100%25.png"
			}
			// hack dla skróki vector
			if (t.firstChild && t.firstChild.tagName && t.firstChild.tagName == 'SPAN')
				t = t.firstChild;

			if (src[q.className]) {
				var i = document.createElement("img");
				i.className = "textquality-image";
				i.src = src[q.className];
				i.width = 9;
				i.height = 9;
				t.appendChild(i);
			}
		}
       }
});
/* Koniec skryptu odpowiedzialnego za zmianę napisu na zakładce treść - pierwszej od lewej */

/* Skrypt odpowiedzialny za dodatkowe informacje interwiki [[Szablon:Interwiki-info]] */
addOnloadHook(function()
{
   // iterate over all <span>-elements
   for(var i=0; a = document.getElementsByTagName("span")[i]; i++) {
      // if found a linkInfo span
      if(a.className == "interwiki-info") {
         // iterate over all <li>-elements
         var count=0;

         for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
            if(b.className == "interwiki-" + a.id) {
               b.innerHTML = b.innerHTML + " "+a.title;
               if(a.title == "(org.)") { b.title = "Tekst oryginalny"; }
            }
         else if(b.className == "interwiki-" + a.id.substr(0,a.id.length-1)) {
               count = count+1;
               if(a.id.charAt(a.id.length-1) == count) {
                  b.innerHTML = b.innerHTML + " "+a.title;
               }
            }
         }
      }
   }
});
/* Koniec skryptu odpowiedzialnego za dodatkowe informacje interwiki */

/* Skrypt odpowiedzialny za dodanie do wszystkich interwiki możliwości porównania wersji językowych - ⇔ */
addOnloadHook(function()
{
    if( wgNamespaceNumber != 0) return;
    var doc_url = document.URL;
    var url = '';
    // iterate over all <li>-elements
    for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
         if(b.className.substring(0,10) == "interwiki-" ) {
               var lang = b.className.substring(10,b.className.length);
               if( doc_url.indexOf('?title=') != -1 ) {
                   var qm  = doc_url.indexOf('&match=');
                   if( qm != -1 ) url = doc_url.substring(0,qm)+"&match="+lang;
                   else url = doc_url+"&match="+lang;
               } else {
                   var qm  = doc_url.indexOf('?');
                   if( qm != -1 ) url = doc_url.substring(0,qm)+"?match="+lang;
                   else url = doc_url+"?match="+lang;
               }
               b.innerHTML = b.innerHTML+'<a href="'+url+'" title="Porównaj z wersją w tym języku"> ⇔</a>';
             }
         }
});
/* Koniec skryptu odpowiedzialnego za dodanie do interwiki możliwości porównania wersji językowych - ⇔ */

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
  *               [[en:Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */

var autoCollapse = 2;
var collapseCaption = "ukryj";
var expandCaption = "pokaż";

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
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
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
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
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
            for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if ( NavChild.style.display == 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
            NavToggle.appendChild(NavToggleText);

            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}

addOnloadHook( createNavigationBarToggleButton );

//--------------------------------------------------------------------------------
// Obsługa ciastek skopiowana z [[wikt:MediaWiki:Common.js]]

function setCookie(cookieName, cookieValue) {
	var today = new Date();
	var expire = new Date();
	var nDays = 30;
	expire.setTime( today.getTime() + (3600000 * 24 * nDays) );
	document.cookie = cookieName + "=" + escape(cookieValue)
			+ ";path=" + wgScriptPath
			+ ";expires="+expire.toGMTString();
	document.cookie = cookieName + "=" + escape(cookieValue)
			+ ";path=" + wgArticlePath.replace("/$1", "")
			+ ";expires="+expire.toGMTString();
}

function getCookie(cookieName) {
	var start = document.cookie.indexOf( cookieName + "=" );
	if ( start == -1 ) return "";
	var len = start + cookieName.length + 1;
	if ( ( !start ) && ( cookieName != document.cookie.substring( 0, cookieName.length ) ) )
	{
		return "";
	}
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
}

function deleteCookie(cookieName) {
	if ( getCookie(cookieName) ) {
		document.cookie = cookieName + "=" + ";path=" + wgScriptPath +
		";expires=Thu, 01-Jan-1970 00:00:01 GMT";
		document.cookie = cookieName + "=" + ";path=" + wgArticlePath.replace("/$1", "") +
		";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
}

/**
 * Link w postaci książki do pokazywania/ukrywania numerów stron.
 * Link "Koryguj" jeśli liczba dołączanych stron == 1
 */

function addTogglePageNumbersButton() {
	var a = document.getElementById("ca-nstab-main");
	if(!a) return;

	var spans = getElementsByClassName(document, "span", "PageNumber");
	if (!spans.length) return;

	var link = document.createElement("a");
	link.setAttribute("title", "Pokaż/ukryj numery stron");
	if (skin == "monobook" || skin == "vector") {
		var img = document.createElement("img");
		img.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Open_book_nae_02.svg/20px-Open_book_nae_02.svg.png";
		var span = document.createElement("span");
		span.appendChild(img);
		link.appendChild(span);
	}
	else {
		var text = document.createTextNode("Numeracja stron");
		link.appendChild(text);
	}
	link.onclick = togglePageNumbers;
	link.href = '#';
	var li = document.createElement("li");
	li.appendChild(link);
	a.parentNode.insertBefore(li,a.nextSibling);

	// Dodaj link "Koryguj"
	var link = document.createElement("a");

	var span = document.createElement("span");
	span.appendChild(document.createTextNode("Koryguj"));
	link.appendChild(span);

	var li = document.createElement("li");
	li.appendChild(link);
	li.setAttribute('id', 'ca-proofread');

	var historyLink = document.getElementById("ca-history");
	historyLink.parentNode.insertBefore(li, historyLink);

	if (spans.length == 1) {
		var links = spans[0].getElementsByTagName("a");
		if (links.length > 0) {
			link.href= links[0].href + "?action=edit";
			return;
		}
	}
	link.href = '#';
	link.onclick = function() {
		jsMsg("W tekście zostały pokazane numery stron. Kliknij na numer strony, który chcesz poprawić.");
		var spans = getElementsByClassName(document, "span", "PageNumber");

		for(var i=0; i < spans.length; i++) {
			spans[i].style.display = 'inline';
		}
	}
}

function togglePageNumbers() {
	var spans = getElementsByClassName(document, "span", "PageNumber");

	for(var i=0; i < spans.length; i++) {
		spans[i].style.display = spans[i].style.display == 'none' ? 'inline' : 'none';
	}
}

if (wgNamespaceNumber == 0)
	addOnloadHook(addTogglePageNumbersButton);

/*
=== Link do brudnopisów w menu osobistym ===

; autor: [[Wikipedysta:Herr Kriss]]
*/

var disableSandboxLink = 0;	// ustawienie tego na 1 lub true w swoim monobook.js pozwoli wyłączyć tę funkcjonalność

addOnloadHook(function()
{
	if (wgUserName != null && disableSandboxLink == 0)
	{
		var caption = 'Mój brudnopis'
		if (wgUserLanguage != 'pl')
			caption = 'My sandbox';

		addPortletLink('p-personal', wgServer + wgScript + '?title=Special:Mypage/brudnopis', caption, 'pt-sandbox', caption, '', document.getElementById('pt-preferences'));
	}
});

// usuwanie napisu "Strona główna"

if (wgPageName == "Wikiźródła:Strona_główna" && wgAction == 'view')
{
	importStylesheet('MediaWiki:Strona główna.css');
}

// Importowanie funkcji działających podczas edycji. Patrz: [[MediaWiki:Common-Edit.js]]

if (wgAction == 'edit' || wgAction == 'submit')
{
	if (wgNamespaceNumber > -1)
	{
		importScript( "MediaWiki:Common-Edit.js" )
	}
}