/* Any JavaScript here will be loaded for all users on every page load. */

/*Free Rider*/
importScript('MediaWiki:Common.js/FreeRider.js‎');

if (wgAction == "edit" || wgAction == "submit") {

   /***** Custom edit buttons *****/ 
   if (mwCustomEditButtons) { 

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
         "speedTip": "Siirto",
         "tagOpen": "#OHJAUS [[",
         "tagClose": "]]",
         "sampleText": "Tähän teksti"};

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png",
         "speedTip": "Lisää wikitable",
         "tagOpen": '{| class="wikitable"\n|-\n',
         "tagClose": "\n|}",
         "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"};

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
         "speedTip": "Rivin vahto",
         "tagOpen": "<br />",
         "tagClose": "",
         "sampleText": ""};

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
         "speedTip": "Lisää kuvagalleria",
         "tagOpen": '\n<div align="center"><gallery>\n',
         "tagClose": "\n</gallery></div>",
         "sampleText": "Tiedosto:Esimerkki.jpg|Kuvateksti1\nTiedosto:Esimerkki.jpg|Kuvateksti2"};

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/5/58/Button_small.png",
         "speedTip": "Pienennä",
         "tagOpen": '<small>',
         "tagClose": "</small>",
         "sampleText": "Pienennä"};   

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
         "speedTip": "Yliviivaa",
         "tagOpen": '<s>',
         "tagClose": "</s>",
         "sampleText": "Yliviivaa"}; 

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/3/34/Button_hide_comment.png",
         "speedTip": "Kommentti",
         "tagOpen": '<!--',
         "tagClose": "-->",
         "sampleText": "Kommentti"}; 

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/c/cb/Button_wikipedia.png",
         "speedTip": "Wikipedia linkki",
         "tagOpen": '[[Wikipedia:',
         "tagClose": "]]",
         "sampleText": "Tähän teksti"}; 

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/e/ea/Button_align_left.png",
         "speedTip": "Teksti vasemmalle",
         "tagOpen": '<p style="text-align:left;">',
         "tagClose": "</p>",
         "sampleText": "Tähän teksti"}; 

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/5/5f/Button_center.png",
         "speedTip": "Teksti keskelle",
         "tagOpen": '<p style="text-align:center;">',
         "tagClose": "</p>",
         "sampleText": "Tähän teksti"}; 

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/a/a5/Button_align_right.png",
         "speedTip": "Teksti oikealle",
         "tagOpen": '<p style="text-align:right;">',
         "tagClose": "</p>",
         "sampleText": "Tähän teksti"}; 
     }
}

// ============================================================
// End of EDIT-INTRO FIX
// ============================================================

// ==================================================================
// {{USERNAME}}-malline
// ==================================================================
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

// ==================================================================
// Laskimet
// ==================================================================
$(document).ready(function() {
	if ($('.jcConfig').size() > 0) {
		importScript('MediaWiki:Common.js/calc.js');
		importStylesheet('MediaWiki:Common.css/calc.css');
	}
});

// ============================================================
// a test script to try to copy the [show] | [hide] feature currently in toc panels
// ============================================================

var expandoShowText = "show";
var expandoHideText = "hide";

// the initAllToggles function has to be called *after* the page has finished loading otherwise the dom nodes
// won't actually exist when we try to get references to them. the hookEvent function is defined in wikibits.js
// and provides a mechanism for adding functions to the list of callbacks to run when a particular event
// occurs. we'll use this to register a callback for the page load event, which happens after everything has
// been loaded from the server. at that point the dom onodes will exist so we can safely try to get references
// to them.
hookEvent( "load", initAllExpandos );

// initialise all known expando panels on the page.
function initAllExpandos() {
	// check the 'initExpando' function is defined and set the 'show' and 'hide' text if it is
	if (window.initExpando) {
		// add a line here to initialise each known expando panel. keep the name short to
		// avoid storing more data than necessary in the cookie. this will keep bandwidth
		// usage to a minimum since the cookie is sent to the server at every page request.
		initExpando("userbox"); // user box panel
	};
};


// initialise the specified expando panel.  we'll add a new <span> node that contains the 
// [ show | hide ] text and then automatically make sure the panel is in the correct state
// by reading the cookie and checking what the last saved value was.
function initExpando(name) {
	if (document.createTextNode) {
		// Uses DOM calls to avoid document.write + XHTML issues
		var expandoTitle = document.getElementById(name + '-title');
		if (!expandoTitle) {
			return;
		}
		// this section of code manipulates the dom tree and inserts a new toggle link span that contains the 'show' and 'hide' links.
		// dom tree before:
		// <div id='%name%-title'>title</div>
		// <div id='%name%-body'>
		//   ...
		// </div>
		// dom tree after
		// <div id='%name%-title'>title <span class='togglespan'>[<a id='togglelink' classname='internal' href='javascript:flipExpando(%name%)'>%expandoHideText%</a>]</span></div>
		// <div id='%name%-body'>
		//   ...
		// </div>
		var outerSpan = document.createElement('span');
		outerSpan.className = 'togglespan';
		var toggleLink = document.createElement('a');
		toggleLink.id = name + '-link';
		toggleLink.className = 'internal';
		toggleLink.href = 'javascript:flipExpando(\'' + name + '\')';
		toggleLink.appendChild(document.createTextNode(expandoHideText));
		outerSpan.appendChild(document.createTextNode('['));
		outerSpan.appendChild(toggleLink);
		outerSpan.appendChild(document.createTextNode(']'));
		expandoTitle.appendChild(document.createTextNode(' '));
		expandoTitle.appendChild(outerSpan);
		// now we need to check whether the panel should be in 'show' mode or 'hide' mode when the page initialises
		var cookiePos = document.cookie.indexOf("hide" + name + "=");
		if (cookiePos > -1 && document.cookie.charAt(cookiePos + ("hide" + name + "=").length) == 1) {
			flipExpando(name);
		}
	}
}

// flips the current state of the specified expando panel. it if's currently expanded it will be collapsed
// and vice versa. also updates the local cookie so that we can remember the state when we come back to
// the current page. note that the changeText function is defined in wikibits.js.
function flipExpando( name ) {
	// get references to the body content and toggle link for this named panel
	var expandoBody = document.getElementById(name + '-body');
	var expandoLink = document.getElementById(name + '-link');
	// check if the panel is in expanded or collapsed mode, then switch the mode and update the cookie
	if (expandoBody && expandoLink && expandoBody.style.display == 'none') {
		changeText(expandoLink, expandoHideText);
		expandoBody.style.display = 'block';
		document.cookie = "hide" + name + "=0";
	}
	else {
		changeText(expandoLink, expandoShowText);
		expandoBody.style.display = 'none';
		document.cookie = "hide" + name + "=1";
	}
}

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================


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

// =====================================================================
// Collapsible Tables
//
// Description: Allows tables to be collapsed, showing only the header.
// Reference:   [[Wikipedia:Wikipedia:NavFrame]]
//              [[Wikipedia:Help:Collapsing]]
// Maintainers: [[Wikipedia:User:R. Koot]]
//
// =====================================================================
 
  var autoCollapse = 2;
  var collapseCaption = "pienennä";
  var expandCaption = "suurenna";
 
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
 
              /* Only add button and increment count if there is a header row to work with */
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

// =====================================================================
// End of Collapsible Tables
// =====================================================================

/** Title rewrite ********************************************************
 * Rewrites the page's title, used by Template:Title
 * By Sikon
 */

function rewriteTitle()
{
   if(typeof(SKIP_TITLE_REWRITE) != 'undefined' && SKIP_TITLE_REWRITE)
       return;

   var titleDiv = document.getElementById('title-meta');

   if(titleDiv == null || titleDiv == undefined)
       return;

   var cloneNode = titleDiv.cloneNode(true);
   var firstHeading = getElementsByClass('firstHeading', document.getElementById('content'), 'h1')[0];
   var node = firstHeading.childNodes[0];

   // new, then old!
   firstHeading.replaceChild(cloneNode, node);
   cloneNode.style.display = "inline";

   var titleAlign = document.getElementById('title-align');
   firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}

addOnloadHook(rewriteTitle, false);

/* Preloaded stuff */

document.write('<script type="text/javascript" src="' 
    + '/index.php?title=MediaWiki:Functions.js&action=raw&ctype=text/javascript"></script>');
    

// onload stuff
var firstRun = true;

function loadFunc()
{
    if(firstRun)
        firstRun = false;
    else
        return;

    initFunctionsJS();

    // DEPRECATED
    if(document.getElementById('infoboxinternal') != null && document.getElementById('infoboxend') != null)
    {
        document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
    }

    addHideButtons();

    if(document.getElementById('mp3-navlink') != null)
    {
        document.getElementById('mp3-navlink').onclick = onArticleNavClick;
        document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
    }

    if(window.storagePresent)
        initVisibility();

    rewriteSearchFormLink();
    fillEditSummaries();
    fillPreloads();

    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;

    if(!bodyClass || (bodyClass.indexOf('page-') == -1))
    {
        var page = window.pageName.replace(/\W/g, '_');
        body.className += ' page-' + page;
    }

    if(typeof(onPageLoad) != "undefined")
    {
        onPageLoad();
    }
}

function fillEditSummaries()
{
    var label = document.getElementById("wpSummaryLabel");

    if(label == null)
        return;

    var comboString = "Summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
    comboString += "</select><br />";
    label.innerHTML = comboString + label.innerHTML;

    requestComboFill('stdSummaries', 'Template:Stdsummaries');
}

function onStdSummaryChange()
{
    var combo = document.getElementById("stdSummaries");
    var value = combo.options[combo.selectedIndex].value;

    if(value != "")
    {
        if(skin == 'monaco')
        { document.getElementById("wpSummaryEnhanced").value = value; }
        else
        { document.getElementById("wpSummary").value = value; }
    }
}

function onStdReasonChange()
{
    var combo = document.getElementById("stdReasons");
    var value = combo.options[combo.selectedIndex].value;

    if(value != "")
        document.getElementById("wpReason").value = value;
}

function fillPreloads()
{
    var div = document.getElementById("lf-preload");

    if(div == null)
        return;

    div.style.display = 'block';
    var span = document.getElementById('lf-preload-cbox');

    var comboString = "<select id='stdPreloads' onchange='onPreloadChange()'>";
    comboString += "</select>";
    span.innerHTML = comboString;
    
    span = document.getElementById('lf-preload-pagename');
    span.innerHTML = '<input type="text" class="textbox" />';
    span = document.getElementById('lf-preload-button');
    span.innerHTML = '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />';

    requestComboFill('stdPreloads', "Template:Stdpreloads");
}

function doCustomPreload()
{
	var page = document.getElementById('lf-preload-pagename').getElementsByTagName('input')[0].value;
	if ( page != "" ) {
		doPreload(page);
	} else {
		alert("The page name must be specified.  For an article with redirects, the actual article name (the destination of the redirects) must be used.");
	}
}

function onPreloadChange()
{
    var combo = document.getElementById("stdPreloads");
    var value = combo.options[combo.selectedIndex].value;

    if(value == "")
        return;

    value = "Template:" + value + "/preload";
    value = value.replace(" ", "_");
    doPreload(value);
}

function initVisibility()
{
    var storage = globalStorage[window.location.hostname];

    var page = window.pageName.replace(/\W/g,'_');
    var show = storage.getItem('infoboxshow-' + page);

    if(show == 'false')
    {
        infoboxToggle();
    }
    
    var hidables = getElementsByClass('hidable');
    
    for(var i = 0; i < hidables.length; i++)
    {
        show = storage.getItem('hidableshow-' + i  + '_' + page);
        
        if(show == 'false')
        {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);
            
            if(content != null && content.length > 0 &&
                button != null && button.length > 0 && content[0].style.display != 'none')
            {
                button[0].onclick('bypass');
            }
        }
        else if(show == 'true')
        {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);
            
            if(content != null && content.length > 0 &&
                button != null && button.length > 0 && content[0].style.display == 'none')
            {
                button[0].onclick('bypass');
            }
        }
    }
}

function addHideButtons()
{
    var hidables = getElementsByClass('hidable');
    
    for(var i = 0; i < hidables.length; i++)
    {
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');
        
        if(button != null && button.length > 0)
        {
            button = button[0];
            
            button.onclick = toggleHidable;
            button.appendChild(document.createTextNode('[Hide]'));

            if(new ClassTester('start-hidden').isMatch(box))
                button.onclick('bypass');
        }
    }
}

function toggleHidable(bypassStorage)
{
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;
    
    if(content != null && content.length > 0)
    {
        content = content[0];
        
        if(content.style.display == 'none')
        {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[Hide]';
            nowShown = true;
        }
        else
        {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Show]';
            nowShown = false;
        }
        
        if(window.storagePresent && (typeof(bypassStorage) == 'undefined' || bypassStorage != 'bypass'))
        {
            var page = window.pageName.replace(/\W/g, '_');
            var items = getElementsByClass('hidable');
            var item = -1;
            
            for(var i = 0; i < items.length; i++)
            {
                if(items[i] == parent)
                {
                    item = i;
                    break;
                }
            }
            
            if(item == -1)
            {
                return;
            }
        
            var storage = globalStorage[window.location.hostname];
            storage.setItem('hidableshow-' + item + '_' + page, nowShown);
        }
    }
}

//addOnloadHook(loadFunc);

YAHOO.util.Event.onDOMReady(loadFunc);

// addOnloadHook(fillPreloads);

// ============================================================
// Collapsible sidebar portlets 
// Source: http://www.wikia.com/wiki/User:Splarka/tricks
// ============================================================

function foldingPortlets() {
    var portlets = getElementsByClassName(document.getElementById('column-one'), 'div', 'portlet');
    var portskip = ['p-personal', 'p-cactions', 'p-logo', 'ads-top-left', 'p-search', 'p-tbx', 'p-wikicities-nav', 'p-lang'];
    var num = 0;

    for (var i = 0; i < portlets.length; i++) {
        if (portskip.join(' ').indexOf(portlets[i].id) == -1) {
            var pd = portlets[i].getElementsByTagName('div')[0];
            var ph = portlets[i].getElementsByTagName('h5')[0];

            ph.className = 'portletCollapsible';
            pd.setAttribute('id', 'pbody-' + i);
            pd.style.display = 'none';

            var link = document.createElement('a');
            var head = getAllText(ph);

            while (ph.firstChild) {
                ph.removeChild(ph.firstChild);
            }

            link.appendChild(document.createTextNode(head));
            link.setAttribute('href', 'javascript:showPortlet(\'' + i + '\');');
            link.setAttribute('id', 'plink-'+i);
            link.className = 'portletClosed';
            ph.appendChild(link);

            if (num++ < 3) {
                showPortlet(i);
            }
        }
    }
}

if (skin == 'monobook' && !window.portletsNormal) {
    addOnloadHook(foldingPortlets);
}

function getAllText(thing) {
    if (thing.nodeType == 3) {
        return thing.nodeValue;
    }

    var text = new Array();
    var i = 0;

    while (thing.childNodes[i]) {
        text[text.length] = getAllText(thing.childNodes[i]);
        i++;
    }

    return text.join('');
}

function showPortlet(id) {
    var pd = document.getElementById('pbody-' + id);
    var pl = document.getElementById('plink-' + id);

    if (pd.style.display == 'none') {
        pd.style.display = 'block';
        pl.className = 'portletOpened';
    } else {
        pd.style.display = 'none';
        pl.className = 'portletClosed';
    }
}

// ============================================================
// End of Collapsible sidebar portlets 
// ============================================================

// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================

function wikiSiteMeter() {
    if(skin == "monobook") {
        var sidebar = document.getElementById("p-wikicities-nav");

        if(sidebar == null)
            return;

        var comboString = "<br /><h5>wiki site meter</h5>";
        comboString += "<div class='pBody'><div style='margin-top:2px; margin-bottom:5px;'><table><tr><td><a href='http://sm6.sitemeter.com/stats.asp?site=sm6runescapewiki' target='_top'><img src='http://sm6.sitemeter.com/meter.asp?site=sm6runescapewiki' alt='Site Meter' border=0 /></a></td></tr></table></div></div>";

        sidebar.innerHTML += comboString;
    }

    if(skin == "monaco") {
        var sidebar = document.getElementById("widget_101");

        if(sidebar == null)
            return;

        var comboString = "<dt class='color1 widget_title'><div class='widgetToolbox'></div>Wiki Site Meter</dt>";
        comboString += "<dd class='shadow widget_contents'><div style='margin-left:10px; margin-top:2px; margin-bottom:5px;'><table><tr><td><a href='http://sm6.sitemeter.com/stats.asp?site=sm6runescapewiki' target='_top'><img src='http://sm6.sitemeter.com/meter.asp?site=sm6runescapewiki' alt='Site Meter' border=0 /></a></td></tr></table></div></dd>";

        sidebar.innerHTML += comboString;
    }
}
addOnloadHook(wikiSiteMeter);

// ============================================================
// End of wikiSiteMeter
// ============================================================

// ==================================================================
// Added SiteNotice Functionality
// 
// Functions:
//   * Moves the dismiss link into the SiteNotice table.
//   * Saves the show/hide status of the SiteNotice in a cookie.
//   * Automatically expands the SiteNotice when the ID is updated.
// ==================================================================

addOnloadHook(editSiteNotice);
var dCookieName = "dismissSiteNotice=";
var msgClose = "älä näytä";

var hCookieName = "hideSiteNotice=";
var hCookiePos = document.cookie.indexOf(hCookieName);
var hCookieValue = "";
   
function editSiteNotice() {
    var snbox = document.getElementById('mw-dismissable-notice');
   
    if (snbox != null){
        if (hCookiePos > -1) {
            hCookiePos = hCookiePos + hCookieName.length;
            var hideEndPos = document.cookie.indexOf(";", hCookiePos);
            if (hideEndPos > -1) {
                hCookieValue = document.cookie.substring(hCookiePos, hideEndPos);
            } else {
                hCookieValue = document.cookie.substring(hCookiePos);
            }
        }
      
        var newLink = document.createElement('a');
        newLink.setAttribute('href', "javascript:dismissNotice();");
        newLink.setAttribute('title', 'Dismiss this notice.');
        newLink.innerHTML = msgClose;

        var hideLink = document.getElementById( "collapseButton" + "0" );
        hideLink.href = "javascript:hideSiteNotice();"
        hideLink.parentNode.style.width = "12em";
        hideLink.parentNode.appendChild(document.createTextNode(' [')); 
        hideLink.parentNode.appendChild(newLink);
        hideLink.parentNode.appendChild(document.createTextNode(']'));
      
        snbox.tBodies[0].rows[0].deleteCell(1);

        if (hCookieValue != siteNoticeID && hideLink.innerHTML == "suurenna") {
            collapseTable(0);
        }
        if (hCookieValue == siteNoticeID && hideLink.innerHTML == "pienennä") {
            collapseTable(0);
        }
    }
}

function hideSiteNotice() {
    var hideLink = document.getElementById( "collapseButton" + "0" );
    var date = new Date();
    
    if (hideLink.innerHTML == 'hide'){
        date.setTime(date.getTime() + 30*86400*1000);
    } else {
        date.setTime(date.getTime() - 30*86400*1000);
    }
    document.cookie = hCookieName + siteNoticeID + "; expires="+date.toGMTString() + "; path=/";
    collapseTable(0);
}

// ==================================================================
// Insert username 
// ==================================================================
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);