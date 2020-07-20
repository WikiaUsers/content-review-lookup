// ============================================================
// BEGIN collapsible tables
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================

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
 *  Maintainers: [[User:R. Koot]]
 */
/* customized for Fallout wiki */

var autoCollapse = 1;
var collapseCaption = "скрыть";
var expandCaption = "показать";

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
    var collapseIndex = 0;
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
            Button.className = "t_show_hide";

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );

            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );

            Header.insertBefore( Button, Header.childNodes[0] );

            if ( !hasClass( Tables[i], "nocount" ) ) {
		collapseIndex++;
	    }
            tableIndex++;
        }
    }

    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( collapseIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
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

// ============================================================
// END collapsible tables
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================

/*** Article info box *******************************************************
 * Creates and displays article info box
 * Only displays if the page has something to display
 * Adds icons in the given order
 * Defers to specific skins for how to be handled
 * Written by JBed of FFWiki
 ****************************************************************************/
if ((wgNamespaceNumber === 0 || wgNamespaceNumber == 6 || wgPageName == "Final_Fantasy_Wiki:Sandsea") && (wgAction == "view" || skin == "monobook" && wgAction == "submit") && (skin == "oasis" || skin == "monobook") && (!ifGroup("staff"))) {
  addOnloadHook(articleinfoicons);
}
 
function articleinfoicons() {
  console.log("articleinfoicons()", new Date());
  var output = "";
  var dateFmt = "F j, Y";
  var id = "";
  id = "accFeatured";
  var elem = document.getElementById(id);
  var string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Featured article";
  } else {
    string = "Featured article for " + string;
  }
  output += newAccoladeIcon(id, "Project:Featured Articles", string, "https://images.wikia.nocookie.net/__cb20090427121647/finalfantasy/images/8/8e/SkyPirDen_-_Crystal.png");
 
  id = "accGood";
  elem = document.getElementById(id);
  string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Good article";
  } else {
    string = "Good article since " + new Date(elem.innerHTML).toString(dateFmt);
  }
  output += newAccoladeIcon(id, "Project:Good Articles", string, "https://images.wikia.nocookie.net/__cb20090528210343/finalfantasy/images/c/c4/FF1_Treasure_Chest_1.gif");
 
  id = "mntExpand";
  elem = document.getElementById(id);
  string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Article requiring expansion";
  } else {
    string = "Article requiring expansion since " + new Date(elem.innerHTML).toString(dateFmt);
  }
  output += newMaintenanceIcon(id, "Category:Articles to be expanded", string, "https://images.wikia.nocookie.net/sprite/images/thumb/7/79/FFIVCid.png/26px-FFIVCid.png");
 
  id = "mntCleanup";
  elem = document.getElementById(id);
  string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Article requiring cleanup";
  } else {
    string = "Article requiring cleanup since " + new Date(elem.innerHTML).toString(dateFmt);
  }
  output += newMaintenanceIcon(id, "Category:Articles in need of cleanup", string, "https://images.wikia.nocookie.net/sprite/images/thumb/9/97/TacticsWhiteMage.png/26px-TacticsWhiteMage.png");
 
  id = "mntIncompleteTable";
  elem = document.getElementById(id);
  string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Article missing data";
  } else {
    string = "Article missing data since " + new Date(elem.innerHTML).toString(dateFmt);
  }
  output += newMaintenanceIcon(id, "Category:Articles with Incomplete Tables", string, "https://images.wikia.nocookie.net/__cb20130117071205/finalfantasy/images/thumb/f/fe/Cloud_ATB.png/26px-Cloud_ATB.png");
 
  id = "mntCiteSources";
  elem = document.getElementById(id);
  string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Article does not cite its sources";
  } else {
    string = "Article lacking citations since " + new Date(elem.innerHTML).toString(dateFmt);
  }
  output += newMaintenanceIcon(id, "Category:Articles in need of citations", string, "https://images.wikia.nocookie.net/sprite/images/thumb/3/3f/FFIXGarnet.png/26px-FFIXGarnet.png");
 
  id = "mntAddImages";
  elem = document.getElementById(id);
  string = "";
  if (elem) {
    string = elem.innerHTML;
  }
  if (string === "") {
    string = "Article needing images";
  } else {
    string = "Article needing images since " + new Date(elem.innerHTML).toString(dateFmt);
  }
  output += newMaintenanceIcon(id, "Category:Articles Needing Images", string, "https://images.wikia.nocookie.net/__cb20101126002150/finalfantasy/images/thumb/d/d0/Relm_Arrowny_small.png/26px-Relm_Arrowny_small.png");
  //releases-pre
  output += '<span id="relIconContainer">';
  //releases-main
  for (var x in rel) {
    output += newReleaseIcon(x);
  }
  //releases-end
  output += '</span>';
 
  var elem = document.getElementById("ArticleInformationBox");
  if (elem) {
    elem.innerHTML += output;
  }
  if (skin == "monobook") {
    if (wgReleasesCovered.length > 5) {
      var relContainer = document.getElementById("relIconContainer");
      relContainer.id = "relIconDropdown";
      var seriesIcon = newSeriesIcon("relIconDropdown", "series");
      seriesIcon += '<span class="dropdownButton" style="font-size:10px; line-height:0">ᐁ</span>';
      var relDropdownButton = document.createElement("span");
      relDropdownButton.id = "relIconContainer";
      relDropdownButton.innerHTML = seriesIcon;
      relDropdownButton.addEventListener("mouseover", function () {
        document.getElementById("relIconDropdown").style.display = "block";
      }, false);
      relDropdownButton.addEventListener("mouseleave", function () {
        document.getElementById("relIconDropdown").style.display = "none";
      }, false);
      relContainer.addEventListener("mouseover", function () {
        document.getElementById("relIconDropdown").style.display = "block";
      }, false);
      relContainer.addEventListener("mouseleave", function () {
        document.getElementById("relIconDropdown").style.display = "none";
      }, false);
      relContainer.parentNode.insertBefore(relDropdownButton, relContainer);
      relDropdownButton.appendChild(relContainer);
    }
  }
}
 
function newAccoladeIcon(id, page, hover, bgImg) {
  return newArticleInfoIcon(id, page, hover, bgImg, "", "");
}
 
function newReleaseIcon(id) {
  var page = rel[id].full;
  var useId = id + "-icon";
  var s = newCoverageIcon(useId, id, page, page, rel[id].icon);
  if (s === "") return s;
  var num = wgReleasesCovered.length;
  if (!num) num = 0;
  wgReleasesCovered.push(id);
  return s;
}
 
function newCoverageIcon(useId, id, link, full, text) {
  var bgImg = "https://images.wikia.nocookie.net/finalfantasy/images/c/c5/InfoIcon-release.png";
  text = transformCoverageText(text);
  return newArticleInfoIcon(useId, link, full, bgImg, id, text);
}
 
function transformCoverageText(text) {
  var textArray = text.split("|");
  var length = textArray.length;
  var number = ["one", "two"];
  text = "";
  for (var i = 0; i < length; i++) {
    text += '<span class="' + number[length - 1] + '-line';
    var lineClass = "";
    var textAsArray = textArray[i].split(")");
    if (textAsArray.length == 2) {
      lineClass = "-" + textAsArray[0].replace("(", "");
      textAsArray[0] = textAsArray[1];
    }
    text += lineClass + '">' + textAsArray[0] + '</span>';
    if (i != length - 1) {
      text += "<br/>";
    }
  }
  return text;
}
 
function newSeriesIcon(findId, id) {
  var text = ser[id].icon + "|(small)¯¯¯";
  var s = newCoverageIcon(findId, id, ser[id].link, ser[id].full, text);
  return s;
}
 
function newMaintenanceIcon(id, page, hover, bgImg) {
  return newArticleInfoIcon(id, page, hover, bgImg, "", "");
}


// ============================================================
// END collapsible tables
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
// ============================================================