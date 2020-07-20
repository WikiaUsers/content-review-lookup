/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: "script",
	articles: [
                "w:dev:ShowHide/code.js", /* Collapsible elements and tables */
		"w:dev:PurgeButton/code.js", /* Add "purge" option to page controls */
                "MediaWiki:Common.js/slider.js", /* "Slider" header for main page */
                "w:dev:DupImageList/code.js", /* List all duplicate images */
                "w:c:dev:SignatureCheck/code.js", /* Signature Check */
                "w:dev:DisplayClock/code.js", /* Display Clock */
                "MediaWiki:Common.js/slider.js", /* "Slider" header for main page */
                "MediaWiki:Common.js/imports.js", /* UserTags and AjaxRC */
       ]
});
 
// ============================================================
// Add Temp/Dump js below.
// ============================================================

importScriptPage('AjaxRC/code.js', 'dev');
var ShowHideConfig = { autoCollapse: 2 };
 
// ================================================================
// Spoiler coding
// ================================================================
 
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
 
// ===============================================================
// END
// ===============================================================
 
// ===============================================================
// "Articletype positioning" script; by [[User:Bp]]
// ===============================================================
 
function moveArticletypeDiv() {
  var fooel = document.getElementById('ma-article-type');
  if (fooel!=null) {
    var artel = document.getElementById('article');
    var wphel = document.getElementById('WikiaPageHeader');
    var titel = document.getElementById('top');
    fooel = fooel.parentNode.removeChild(fooel);
    if (artel!=null) {
      artel.parentNode.insertBefore(fooel,artel);
    } else if (wphel!=null) {
      wphel.parentNode.insertBefore(fooel,wphel);
    } else {
      //fall back to a position before H1 - useful for monobook skin
      titel.parentNode.insertBefore(fooel,titel);
    }
  }
}
 
hookEvent("load", moveArticletypeDiv);
 
// ===============================================================
// END
// ========================================================


var ArchiveToolConfig = { 
   archiveListTemplate: 'ArchCat',
   archivePageTemplate: 'ArchPage',
   archiveSubpage: 'Archive',
   userLang: true
}; 
importScriptPage('ArchiveTool/code.js', 'dev');

// --------------------------------------------------------
// Collapsible tables
// Description: Allows tables to be collapsed, showing only the header. See [[Wikipedia:NavFrame]].
// Maintainers: User:R. Koot
// --------------------------------------------------------
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex ) {
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
 
// --------------------------------------------------------
// Dynamic Navigation Bars (experimental)
// Description: See [[Wikipedia:NavFrame]].
// --------------------------------------------------------
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar) {
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
                if( hasClass(NavChild, 'NavPic') ) {
                        NavChild.style.display = 'block';
                }
                if( hasClass(NavChild, 'NavContent') ) {
                        NavChild.style.display = 'block';
                }
        }
        NavToggle.firstChild.data = NavigationBarHide;
        }
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
        var indexNavigationBar = 0;
        // iterate over all < div >-elements 
        var divs = document.getElementsByTagName("div");
        for(
                var i=0; 
                NavFrame = divs[i]; 
                i++
                ) {
        // if found a navigation bar
        if( hasClass(NavFrame, "NavFrame") ) {
 
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
                        if( hasClass(NavFrame.childNodes[j], "NavHead") ) {
                                NavFrame.childNodes[j].appendChild(NavToggle);
                        }
                }
                NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
                }
        }
}
 
addOnloadHook( createNavigationBarToggleButton );
 

// --------------------------------------------------------
// Test if an element has a certain class
// Description: Uses regular expressions and caching for better performance.
// Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
// --------------------------------------------------------
 
var hasClass = (function () {
        var reCache = {};
        return function (element, className) {
                return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
        };
})();

// --------------------------------------------------------
// addSubpages
// adds a 'subpages' link to the toolbox bar (excludes File, MediaWiki and Category namespaces)
// --------------------------------------------------------
addOnloadHook(function () {
  var NSWithoutSubpages = new Array(-1, 6, 8, 14);
  if (document.getElementById('p-tb') && NSWithoutSubpages.indexOf(wgNamespaceNumber) == -1)
    {
    var linkSubpages = '/Special:PrefixIndex/' + wgPageName + '/';
    addPortletLink('p-tb', linkSubpages, 'Subpages', 't-subpages', 'Subpages of this page');
    }
});

// Code courtesy of pcj of WoWWiki.
// This is a modified version of the WoWWiki site version.

// Code adds a checkbox at the top of the Special:RecentChanges list, next to the header.
// Ticking it sets a cookie (should be individual to wikis) and starts updating the RC list.
// This occurs silently every 30 seconds without a full page reload occuring.

function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

var ajaxPages = new Array("Special:RecentChanges");
var ajaxRCOverride = false;
var rcRefresh = 30000;

function ajaxRC() {
	appTo = $(".firstHeading");
	appTo.append('&nbsp;<span style="position:absolute; margin-left:10px;"><span style="font-size: xx-small; cursor:help;" title="Automatically refresh the current page every ' + Math.floor(rcRefresh / 1000) + ' seconds">AUTO-REFRESH:</span><input type="checkbox" id="autoRefreshToggle"><span style="position:relative; top:5px; left:5px;" id="autoRefreshProgress"><img src="/images/loader.gif" border="0" alt="AJAX operation in progress" /></span></span>');
	$("#autoRefreshToggle").click(function () {
		setCookie("ajaxRC", $("#autoRefreshToggle").is(":checked") ? "on" : "off")
		loadRCData()
	});
	$("#autoRefreshProgress").hide();
	if (getCookie("ajaxRC") == "on" || ajaxRCOverride) {
		$("#autoRefreshToggle").attr("checked", "checked");
		setTimeout("loadRCData();", rcRefresh);
	}
}

function loadRCData() {
	if (!$("#autoRefreshToggle").is(":checked")) return;
	$('#autoRefreshProgress').show()
	$(article).load(location.href + " " + article + " > *", function (data) {
		$(article + " .mw-collapsible").makeCollapsible();
		$('#autoRefreshProgress').hide()
		if ($("#autoRefreshToggle").is(":checked")) setTimeout("loadRCData();", rcRefresh);
	});
}

$(function () {
	article = "#bodyContent";
	for (x in ajaxPages) {
		if (wgPageName == ajaxPages[x] && $("#autoRefreshToggle").length == 0) ajaxRC();
	}
});


/** Username replace function ([[Template:USERNAME]]) 
  * Inserts user name into <span class="insertusername"></span>
  * Originally by User:Splarka
  * New version by User:Spang
  * Fixed with JS provided by User:Grunny, thanks!
  */
$(function() {
	if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) return;
	$("span.insertusername").text(mw.config.get('wgUserName'));
});

// Configuration settings for RevealAnonIP
var RevealAnonIP = {
	permissions: ['sysop', 'rollback', 'chatmoderator', 'bureaucrat']
};