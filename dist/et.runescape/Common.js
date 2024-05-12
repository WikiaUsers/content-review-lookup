/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

if (wgAction == "edit" || wgAction == "submit") {

   /***** Custom edit buttons *****/ 
   if (mwCustomEditButtons) { 

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
         "speedTip": "Redirect",
         "tagOpen": "#REDIRECT [[",
         "tagClose": "]]",
         "sampleText": "Insert text"};

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png",
         "speedTip": "Insert a table",
         "tagOpen": '{| class="wikitable"\n|-\n',
         "tagClose": "\n|}",
         "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"};

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
         "speedTip": "Line break",
         "tagOpen": "<br />",
         "tagClose": "",
         "sampleText": ""};

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
         "speedTip": "Insert a picture gallery",
         "tagOpen": '\n<div align="center"><gallery>\n',
         "tagClose": "\n</gallery></div>",
         "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"};
    }
} 

// ============================================================
// EDIT-INTRO FIX for Exchange articles
//
// This script is modified from English Wikipedia 
// Source: http://en.wikipedia.org/wiki/User:RockMFR/disambigeditintro.js
// Function: Adds EditIntro to all Exchange pages 
//           when "edit this page" link is clicked
// ============================================================

function fixEditIntro() {
    if (wgCanonicalNamespace == "Exchange" && document.getElementById("ca-edit")) {
        var editLinks = document.getElementById("ca-edit").getElementsByTagName("a");
      
        if (editLinks.length > 0) {
            editLinks[0].href += "&editintro=Template:ExchangeItemHelp";
        }
    }
}
addOnloadHook(fixEditIntro);

// ============================================================
// End of EDIT-INTRO FIX
// ============================================================

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
    var collapseCaption = "hide";
    var expandCaption = "show";
    var maxHeight = 300;
 
    function collapseTable(tableIndex) {
        var Button = document.getElementById("collapseButton" + tableIndex);
        var Table = document.getElementById("collapsibleTable" + tableIndex);
        if (!Table || !Button) return false;
 
        var Rows = Table.getElementsByTagName("tr"); 
  
        if (Button.firstChild.data == collapseCaption) {
            for (var i = 1; i < Rows.length; i++) {
                Rows[i].style.display = "none";
            }
            Button.firstChild.data = expandCaption;
        } else {
          for (var i = 1; i < Rows.length; i++) {
              Rows[i].style.display = Rows[0].style.display;
          }
          Button.firstChild.data = collapseCaption;
        }
    }
 
    function createCollapseButtons() {
        var tableIndex = 0;
        var navBoxes = new Object();
        var Tables = document.getElementsByTagName("table");
 
        for (var i = 0; i < Tables.length; i++) {
            if (hasClass(Tables[i], "collapsible")) {
 
                /* Only add button and increment count if there is a header row to work with */
                var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
                if (!HeaderRow) continue;

                var Header = HeaderRow.getElementsByTagName("th")[0];
                if (!Header) continue;

                navBoxes[tableIndex] = Tables[i];
                Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
 
                var Button     = document.createElement("span");
                var ButtonLink = document.createElement("a");
                var ButtonText = document.createTextNode(collapseCaption);
 
                Button.style.styleFloat = "right";
                Button.style.cssFloat = "right";
                Button.style.fontSize = "90%";
                Button.style.fontWeight = "normal";
                Button.style.textAlign = "right";
                Button.style.width = "6em";
 
                ButtonLink.style.color = Header.style.color;
                ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
                ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
                ButtonLink.appendChild(ButtonText);
 
                Button.appendChild(document.createTextNode("["));
                Button.appendChild(ButtonLink);
                Button.appendChild(document.createTextNode("]"));
 
                Header.insertBefore(Button, Header.childNodes[0]);
                tableIndex++;
            }
        }
 
        var j = 0;
        for (var i = 0;  i < tableIndex; i++) {  
            if (hasClass(navBoxes[i], "navbox") && hasClass(navBoxes[i], "collapsible") && hasClass(navBoxes[i], "autocollapse")) j++;

            var h = 0;
            if (hasClass(navBoxes[i], "navbox") && hasClass(navBoxes[i], "collapsible")) h = navBoxes[i].clientHeight;
            if(h == null || h == undefined) h = 0;

            // Collapses if:
            //   1. Contains "collapsed"
            //   2. If j>autoCollapse, and contains "navbox collapsible autocollapse"
            //   3. If table height > maxHeight, and contains "navbox collapsible"
            //   4. If there are "innercollapse" tables in "outercollapse" tables */

            if (hasClass(navBoxes[i], "collapsed") || (j > autoCollapse) || (h > maxHeight)) {
                collapseTable(i);
            }
            else if (hasClass(navBoxes[i], "innercollapse")) {
                var element = navBoxes[i];
                while (element = element.parentNode) {
                    if (hasClass(element, "outercollapse")) {
                        collapseTable(i);
                        break;
                    }
                }
            }
        }
    }
    
    addOnloadHook(createCollapseButtons);

// =====================================================================
// End of Collapsible Tables
// =====================================================================


 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
  
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
  
  
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
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
   
  }

  addOnloadHook( createNavigationBarToggleButton );

function getElementsByClassName(oElm, strTagName, oClassNames){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var arrRegExpClassNames = new Array();
	if(typeof oClassNames == "object"){
		for(var i=0; i<oClassNames.length; i++){
			arrRegExpClassNames[arrRegExpClassNames.length] =
				new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)");
		}
	}
	else{
		arrRegExpClassNames[arrRegExpClassNames.length] =
			new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)");
	}
	var oElement;
	var bMatchesAll;
	for(var j=0; j<arrElements.length; j++){
		oElement = arrElements[j];
		bMatchesAll = true;
		for(var k=0; k<arrRegExpClassNames.length; k++){
			if(!arrRegExpClassNames[k].test(oElement.className)){
				bMatchesAll = false;
				break;
			}
		}
		if(bMatchesAll){
			arrReturnElements[arrReturnElements.length] = oElement;
		}
	}
	return (arrReturnElements)
}

// ============================================================
function createCheckboxes()
{
  var items = getElementsByClassName(document, "span", "checklistitem");
  for (var ti = 0; ti < items.length ; ti++) {
		items[ti].innerHTML = "<INPUT TYPE=CHECKBOX>" + items[ti].innerHTML;
	}
} 
addOnloadHook( createCheckboxes );
// ============================================================


//Overrides the function with the same name in http://svn.wikimedia.org/viewvc/mediawiki/trunk/phase3/skins/common/wikibits.js
//Fixes a bug: for the sorting order, takes the whole number, not the number before the second comma. 
//Also, removes spaces. See [[Help:Sorting]].
function ts_parseFloat(num) {
	if (!num) return 0;
     num = removeSpaces(num);
	num = parseFloat(num.replace(/,/g, ""));
	return (isNaN(num) ? 0 : num);
}

//Keep spaces in "currency" mode, to sort a range "70 to 80" at 70, not 7080
function ts_parseFloat_ks(num) {
	if (!num) return 0;
	num = parseFloat(num.replace(/,/g, ""));
	return (isNaN(num) ? 0 : num);
}

//Auxiliary function for function ts_resortTable(lnk)
function removeSpaces(string) {
        var tstring = "";
        string = '' + string;
        splitstring = string.split(" ");
        for(i = 0; i < splitstring.length; i++)
        tstring += splitstring[i];
        return tstring;
}

/* removed tablesort override -- TOR, 2009-06-10 */

// =====================================================================
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// by Sikon
//
// =====================================================================

function rewriteTitle() {
    if(typeof(SKIP_TITLE_REWRITE) != 'undefined' && SKIP_TITLE_REWRITE)
        return;

    var titleDiv = document.getElementById('title-meta');
    if(titleDiv == null || titleDiv == undefined)
        return;

    // For the title in the Monaco masthead
    if (skin == "monaco" && (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User_talk")) {
        var mastheadUser = document.getElementById("user_masthead_head");
        var mastheadSince = document.getElementById("user_masthead_since");

        var titleString = '<h2>' + titleDiv.innerHTML;
        titleString += '<small id="user_masthead_since">' + mastheadSince.innerHTML;
        titleString += '</small></h2>';
    
        mastheadUser.innerHTML = titleString;
    } else {
        var cloneNode = titleDiv.cloneNode(true);
        var firstHeading = getElementsByClass('firstHeading', document.getElementById('content'), 'h1')[0];
        var node = firstHeading.childNodes[0];

        // new, then old!
        firstHeading.replaceChild(cloneNode, node);
        cloneNode.style.display = "inline";

        var titleAlign = document.getElementById('title-align');
        firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
    }
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

$(document).ready(loadFunc);

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


////////////////////////////////////////////////////////////////
// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWWiki.
////////////////////////////////////////////////////////////////

ajaxPages = new Array("Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Forum:Yew_Grove");

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
document.getElementsByTagName("h1")[0].innerHTML += '&nbsp;<label style="font-size: xx-small; border-bottom: 1px dotted; cursor: help; text-transform: uppercase;" title="Enable auto-refreshing page loads" for="ajaxRCtoggle">Auto-refresh</label><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
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

for (x in ajaxPages) {
if (wgPageName == ajaxPages[x] && wgAction == "view") addOnloadHook(preloadAJAXRC);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////

// END OF AJAX AUTO-REFRESH

///////////////////////////////////////////////////////////////////////////////////////////////////////////


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

/* Site Meter */
importScript('MediaWiki:Common.js/sitemeter.js');


// ==================================================================
// Added SiteNotice Functionality
// 
// Functions:
//   * Moves the dismiss link into the SiteNotice table.
//   * Saves the show/hide status of the SiteNotice in a cookie.
//   * Automatically expands the SiteNotice when the ID is updated.
// ==================================================================

var dCookieName = "dismissSiteNotice=";
var msgClose = "dismiss";

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

        if (hCookieValue != siteNoticeID && hideLink.innerHTML == "show") {
            collapseTable(0);
        }
        if (hCookieValue == siteNoticeID && hideLink.innerHTML == "hide") {
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

addOnloadHook(editSiteNotice);

// ==================================================================
// End of Added SiteNotice Functionality
// ==================================================================

// ==================================================================
// Item Compare Overlays
// ==================================================================
$(document).ready(function() {
	if ($('.cioCompareLink').size() > 0) {
		importScript('MediaWiki:Common.js/compare.js');
		importStylesheet('MediaWiki:Common.css/compare.css');
	}
});
// ==================================================================
// End Item Compare Overlays
// ==================================================================

// ==================================================================
// Dynamic Templates
// ==================================================================
$(document).ready(function() {
	if ($('.jcConfig').size() > 0) {
		importScript('MediaWiki:Common.js/calc.js');
		importStylesheet('MediaWiki:Common.css/calc.css');
	}
});
// ==================================================================
// End Dynamic Templates
// ==================================================================

// ==================================================================
// Insert username 
// ==================================================================
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

// ==================================================================
// Changes 'article' to 'main page' on the monobook skin
// ==================================================================
function monobookMainPageFix() {
    var nstab = document.getElementById("ca-nstab-main");
    if (nstab && wgUserLanguage == "en") {
        while (nstab.firstChild) nstab = nstab.firstChild;
        nstab.nodeValue = "Main page";
    }
}
if (wgPageName == "RuneScape_Wiki" || wgPageName == "Talk:RuneScape_Wiki") {
    addOnloadHook(monobookMainPageFix);
}

// ==================================================================
// Hide Auto-uploads
// ==================================================================
if (wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName == "Log") {
    importScript('User:AzBot/HideBotUploads.js');
}

/* </pre> */