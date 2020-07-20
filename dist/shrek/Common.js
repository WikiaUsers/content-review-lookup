/* <pre><nowiki> */
/* Any JavaScript here will be loaded for all users on every page load. */


/****** Edit button popup for anons (experimental) ******/
//No, I'm not really that self-centered. I just needed a keyword so nothing of mine messed with anything else.
if(jQuery.inArray('user', wgUserGroups) == -1) {
  function AirhogsChangeURL() {
    window.location.href = "http://shrek.wikia.com/index.php?title=" + wgPageName + "&action=edit";
  }
 
  $('#WikiaPageHeader .wikia-menu-button').css('height', '18px');
  $('#WikiaPageHeader .wikia-menu-button').css('width', '75px');
  $('#WikiaPageHeader .wikia-menu-button').append('<div id="AirhogsEditBoxContainer" style="width: 120px; margin-top: 5px; position: relative; right: 15px;" onClick="AirhogsChangeURL()" onMouseOut="$(this).fadeOut(\'200\')">&nbsp;</div>');
 
  $('#AirhogsEditBoxContainer').append('<img src="https://images.wikia.nocookie.net/airhogs777/images/d/d4/ShrekEditBoxChevron.png" style="margin-bottom: 0px; position: relative; left: 25px; top: 3px;"/>');
 
  $('#AirhogsEditBoxContainer').append('<div id="AirhogsEditBox" style="background: #228b22; opacity: .9; border-radius: 4px; -moz-border-radius: 4px; -webkit-border-radius: 4px; color: white; padding: 10px; white-space: normal; margin-top: 0px; text-align: center;">Have something to add? You can edit this page!</div>');
UserTagsJS.modules.custom = {
'UserName': ['Rollback'], // Add Rollback
};}


// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
//function wikiSiteMeter() {
//    if(skin == "wikia") {
//        var sidebar = document.getElementsByClass("mainpage-tally");
// 
//        if(sidebar == null)
//            return;
 
//        var comboString = "<br /><h5>sitemeter</h5>";
//        comboString += "<div class='pBody'><div style='margin-top:2px; margin-bottom:5px;'><table><tr><td><a href='http://s44.sitemeter.com/stats.asp?site=s44ShrekWiki' target='_top'><img src='http://s44.sitemeter.com/meter.asp?site=s44ShrekWiki' alt='SiteMeter' border=0 /></a></td></tr></table></div></div>";
 
//        sidebar.innerHTML += comboString;
//    }
//}
//addOnloadHook(wikiSiteMeter);

/* Custom edit buttons */
if (wgAction == "edit" || wgAction == "submit") {
     if (mwCustomEditButtons) {
 
        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
            "speedTip": "Redirect",
            "tagOpen": "#REDIRECT [[",
            "tagClose": "]]",
            "sampleText": "Insert text"
        };
 
        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img571.imageshack.us/img571/6707/cebnote.png",
            "speedTip": "Song",
            "tagOpen": "{{song|",
            "tagClose": "}}",
            "sampleText": "song name"
        };
 
        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png",
            "speedTip": "Insert a table",
            "tagOpen": '{| class="wikitable"\n|-\n',
            "tagClose": "\n|}",
            "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
        };
}
}

/* Ajax Auto-refresh. Code by "pcj" */
importScriptPage('AjaxRC/code.js', 'dev');
var indicator = 'http://img16.imageshack.us/img16/4265/3811.gif';

/* Collapsible tables */
 
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
 
            // Does not collapse if:
            //   Contains "uncollapsed"
 
            // Collapses if:
            //   1. Contains "collapsed"
            //   2. If j>autoCollapse, and contains "navbox collapsible autocollapse"
            //   3. If table height > maxHeight, and contains "navbox collapsible"
            //   4. If there are "innercollapse" tables in "outercollapse" tables
 
            if (!hasClass(navBoxes[i], "uncollapsed")) {
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
    }
 
    addOnloadHook(createCollapseButtons);
 
// =====================================================================
// End of Collapsible Tables
// =====================================================================
 
//BEGIN IRC CODE
///HERE IS THE IRC REPLACER. Adds Embedded IRC to RS:IRC made by Green Reaper & ShadowTale
function onloadhookcustom() {
  var replace = document.getElementById("IRCReplace");
  if (null != replace) {
    var getvalue = replace.getAttribute("class");
    var nick = (wgUserName == null) ? ('Guest-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-shrek&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="100%" height="400" style="border:0;"></iframe>';
  }
}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);
//END IRC CODE
// This script changes the "Your signature with timestamp" edit button to use a real em dash instead of two hyphens.
 
(function () {
    var oldAddButton = window.addButton;
    if (typeof(oldAddButton) != 'function') return;
    window.addButton = function () {
        if (arguments.length > 2)
            arguments[2] = arguments[2].replace(/^--(~+)$/, '—$1');
        oldAddButton.apply(this, arguments);
    };
})();
 
//
/* ShowHide */
importScriptPage('ShowHide/code.js', 'dev');

/* Change touch icon (so we don't affect Monobook users again, experimental) */
            function touchIcon() {
                for(var i = 0; i < document.getElementsByTagName("link").length; i++) {
                    if(document.getElementsByTagName("link")[i].rel == 'apple-touch-icon') {
                        var orig = document.getElementsByTagName("link")[i];
                    }
                }
                document.getElementsByTagName("head")[0].removeChild(orig);
                var icon = document.createElement("link");
                icon.rel = "apple-touch-icon";
                icon.href = "https://images.wikia.nocookie.net/__cb20110401032707/shrek/images/archive/b/bc/20111029054549%21Wiki.png";
                document.getElementsByTagName("head")[0].appendChild(icon);
            }
            touchIcon();

//Link to answers
$('ul.tools li:first-child').after('<li><a href="http://shrek.answers.wikia.com/">Got a question about Shrek?</a></li>');

/* RfA button */
if(wgUserGroups.indexOf('autoconfirmed') !== -1) {
   $('#RfAButton').prepend('<a style="color: white; padding: 5px;" href="http://shrek.wikia.com/index.php?title=WikiShrek:Requests_for_adminship/' + wgUserName + '&action=edit&preload=Template:RfA">Request!</a>');
}
else {
   $('#RfAButton').html('Sorry, you are not eligible for adminship.');
}
/* </nowiki></pre> */