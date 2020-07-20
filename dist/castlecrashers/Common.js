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
         "tagOpen": "<br/>",
         "tagClose": "",
         "sampleText": ""};

       mwCustomEditButtons[mwCustomEditButtons.length] = {
         "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
         "speedTip": "Insert a picture gallery",
         "tagOpen": "\n<center><gallery>\n",
         "tagClose": "\n</gallery></center>",
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
// TUTORIAL IMAGE DUPLICATION FIX for Exchange articles
//
// Function: Removes duplicate tutorial images from 
//           Exchange articles
// ============================================================

function fixDuplicateTutorial() {
    if (wgCanonicalNamespace == "Exchange") {
        var matchText = "Price_update_tutorial"

        // Search for duplicate images with matchText
        var c = 0;
        for(var i=0; i<document.images.length; i++) {
            if (document.images[i].src.indexOf(matchText) != -1) {
                c++;
  
                // Hide duplicate images by reducing size to 0x0 pixels
                if (c>1) {
                    document.images[i].height="0";
                    document.images[i].width="0";
                }
            }
        }
    }
}
addOnloadHook(fixDuplicateTutorial);

// ============================================================
// End of TUTORIAL IMAGE DUPLICATION FIX
// ============================================================

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

//Overrides the function with the same name in http://svn.wikimedia.org/viewvc/mediawiki/trunk/phase3/skins/common/wikibits.js
//Changes the criteria for various sorting modes, see [[Help:Sorting]].
//For easy maintenance the difference with wikibits.js is kept limited to a few lines.
function ts_resortTable(lnk) {
	// get the span
	var span = lnk.getElementsByTagName('span')[0];

	var td = lnk.parentNode;
	var tr = td.parentNode;
	var column = td.cellIndex;

	var table = tr.parentNode;
	while (table && !(table.tagName && table.tagName.toLowerCase() == 'table'))
		table = table.parentNode;
	if (!table) return;

	// Work out a type for the column
	if (table.rows.length <= 1) return;

	// Skip the first row if that's where the headings are
	var rowStart = (table.tHead && table.tHead.rows.length > 0 ? 0 : 1);

	var itm = "";
	for (var i = rowStart; i < table.rows.length; i++) {
		if (table.rows[i].cells.length > column) {
			itm = ts_getInnerText(table.rows[i].cells[column]);
			itm = itm.replace(/^[\s\xa0]+/, "").replace(/[\s\xa0]+$/, "");
			if (itm != "") break;
		}
	}

	sortfn = ts_sort_caseinsensitive;
     itmns = removeSpaces(itm);
     if (itmns.match(/^[\d\.\,\-\+]+\%?$/)) sortfn = ts_sort_numeric;
     if (itmns.match(/^[\d\.\,\-\+]+[eE][\d\-\+]+\%?$/)) sortfn = ts_sort_numeric;
     if (itmns.match(/^[\d\.\,\-\+]+e[\d\-\+]+\u00d710[\d\-\+]+\%?$/)) sortfn = ts_sort_numeric;
	if (itm.match(/^\d\d[\/. -][a-zA-Z]{3}[\/. -]\d\d\d\d$/))
		sortfn = ts_sort_date;
	if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/))
		sortfn = ts_sort_date;
	if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d$/))
		sortfn = ts_sort_date;
	if (itm.match(/^[\u00a3$\u20ac\u00a5]/)) // pound dollar euro yen
		sortfn = ts_sort_currency;
     if (itm.match(/sm=c$/)) sortfn = ts_sort_currency;
     if (itm.match(/sm=d$/)) sortfn = ts_sort_date;
     if (itm.match(/sm=n$/)) sortfn = ts_sort_numeric;

	var reverse = (span.getAttribute("sortdir") == 'down');

	var newRows = new Array();
	for (var j = rowStart; j < table.rows.length; j++) {
		var row = table.rows[j];
		var keyText = ts_getInnerText(row.cells[column]);
		var oldIndex = (reverse ? -j : j);

		newRows[newRows.length] = new Array(row, keyText, oldIndex);
	}

	newRows.sort(sortfn);

	var arrowHTML;
	if (reverse) {
			arrowHTML = '<img src="'+ ts_image_path + ts_image_down + '" alt="&darr;"/>';
			newRows.reverse();
			span.setAttribute('sortdir','up');
	} else {
			arrowHTML = '<img src="'+ ts_image_path + ts_image_up + '" alt="&uarr;"/>';
			span.setAttribute('sortdir','down');
	}

	// We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
	// don't do sortbottom rows
	for (var i = 0; i < newRows.length; i++) {
		if ((" "+newRows[i][0].className+" ").indexOf(" sortbottom ") == -1)
			table.tBodies[0].appendChild(newRows[i][0]);
	}
	// do sortbottom rows only
	for (var i = 0; i < newRows.length; i++) {
		if ((" "+newRows[i][0].className+" ").indexOf(" sortbottom ") != -1)
			table.tBodies[0].appendChild(newRows[i][0]);
	}

	// Delete any other arrows there may be showing
	var spans = getElementsByClassName(tr, "span", "sortarrow");
	for (var i = 0; i < spans.length; i++) {
		spans[i].innerHTML = '<img src="'+ ts_image_path + ts_image_none + '" alt="&darr;"/>';
	}
	span.innerHTML = arrowHTML;

	ts_alternate(table);		
}

function ts_dateToSortKey(date) {	
	// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
	if (date.length > 10) {
		switch (date.substr(3,3).toLowerCase()) {
			case "jan": var month = "01"; break;
			case "feb": var month = "02"; break;
			case "mar": var month = "03"; break;
			case "apr": var month = "04"; break;
			case "may": var month = "05"; break;
			case "jun": var month = "06"; break;
			case "jul": var month = "07"; break;
			case "aug": var month = "08"; break;
			case "sep": var month = "09"; break;
			case "oct": var month = "10"; break;
			case "nov": var month = "11"; break;
			case "dec": var month = "12"; break;
			// default: var month = "00";
		}
		return date.substr(7,4)+month+date.substr(0,2);
	} else if (date.length == 10) {
			return date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
	} else if (date.length == 8) {
		yr = date.substr(6,2);
		if (parseInt(yr) < 50) { 
			yr = '20'+yr; 
		} else { 
			yr = '19'+yr; 
		}
			return yr+date.substr(3,2)+date.substr(0,2);
	}
	return "00000000";
}

function ts_sort_currency(a,b) {
	var aa = ts_parseFloat_ks(a[1].replace(/[\u00a3$\u20ac\u00a5a-zA-Z]/g,''));
	var bb = ts_parseFloat_ks(b[1].replace(/[\u00a3$\u20ac\u00a5a-zA-Z]/g,''));
	return (aa != bb ? aa - bb : a[2] - b[2]);
}

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

//YAHOO.util.Event.onDOMReady(loadFunc);

// addOnloadHook(fillPreloads);

// ============================================================
/* collapsible sidebar portlets */

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

			if (num++ < 2) {
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWWiki.

///////////////////////////////////////////////////////////////////////////////////////////////////////////

ajaxPages = new Array("Special:RecentChanges");

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
document.getElementsByTagName("h1")[0].innerHTML += '&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">Enable Recent Changes Auto-Refresher</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
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
if (wgPageName == ajaxPages[x]) addOnloadHook(preloadAJAXRC);
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
        comboString += "<div class='pBody'><div style='margin-top:2px; margin-bottom:5px;'><table><tr><td><a href='http://sm6.sitemeter.com/stats.asp?site=sm6castlecrasherswiki' target='_top'><img src='http://sm6.sitemeter.com/meter.asp?site=sm6castlecrasherswiki' alt='Site Meter' border=0 /></a></td></tr></table></div></div>";

        sidebar.innerHTML += comboString;
    }

    if(skin == "monaco") {
        var sidebar = document.getElementById("102_wg");

        if(sidebar == null)
            return;

        var comboString = "<dt class='color1 widget_title'><div class='widgetToolbox'></div>Wiki Site Meter</dt>";
        comboString += "<dd class='shadow widget_contents'><div style='margin-left:10px; margin-top:2px; margin-bottom:5px;'><table><tr><td><a href='http://sm6.sitemeter.com/stats.asp?site=sm6castlecrasherswiki' target='_top'><img src='http://sm6.sitemeter.com/meter.asp?site=sm6castlecrasherswiki' alt='Site Meter' border=0 /></a></td></tr></table></div></dd>";

        sidebar.innerHTML += comboString;
    }
}
addOnloadHook(wikiSiteMeter);

// ============================================================
// End of wikiSiteMeter
// ============================================================

/* </pre> */