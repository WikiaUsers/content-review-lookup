 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
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
 
function createCollapseButtons() {
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
  *  Maintainers: UNMAINTAINED
  */
 
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


function onloadhookcustom() {
  var replace = document.getElementById("JRChatReplace");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=wikia-warriorcats" width="700" height="500"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;

  }
  //alert(document.getElementById("JRChatReplace").innerHTML);

}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);


/************* FOR TOGGLE STUFF *************/
/************* Funzioni di utilità generale *************/
 
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
 
 
function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	 }
	return array;
 }
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};
 
 
function getElementsByName (name, root) {
 if (root == undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') == name) r[r.length] = e[i];
 }
 return r;
}

/* Any JavaScript here will be loaded for all users on every page load. */
 
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
 
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
 
function toggler(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;
 
    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;
 
        var op = toBeToggled[i][0]; // what the operation will be
 
        switch (op)
        {
            case "_reset":
                for (var j in toggles)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j in toggles)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j in toggles)
                    toggles[j].style.display = 'none';
                break;
            case "":
            default:
                // Toggle
                for (var j in toggles)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}
 
function createTogglerLink(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}
 
function toggleInit()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();
 
    // initialize/clear any old information
    togglers = new Array();     
    allClasses = new Object();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);
 
            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }
 
                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }
 
                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }
 
    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}
 
 
function owwsitesearch(f){
    f.q.value='site:http://openwetware.org/wiki/'+
        f.base.value+'++'+f.qfront.value
}
 
 
addOnloadHook(toggleInit);

/* Any JavaScript here will be loaded for all users on every page load. */
/* If you don not know what you are doing, do not edit this page */

// Hide edit button on Exchange pages for wcs
function AnonMessage() {
	if(wgUserGroups == null) {
		$('.anonmessage').css('display', 'inline');
	}
}

// Fill the block expiry time with a default value
var wgDefaultExpiryBlock = '1 week';
 
if ( wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Blockip' ) {
	$(function() {
		if ( ($('#wpBlockExpiry').val() == '' || $('#wpBlockExpiry').val() == 'other') && $('#mw-bi-other').val() == '' ) {
			$('#wpBlockExpiry').val('1 week').trigger('change');
		}
	});
}
 
 
addOnloadHook(UserContribsMenuItem);
 
function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="600" height="650" id="obj_1334882127625"><param name="movie" value="http://beybladewiki.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1334882127625&v=0&w=0"/><embed id="emb_1334882127625" src="http://beybladewiki.chatango.com/group" width="600" height="650" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1334882127625&v=0&w=0"></embed></object><br>[ <a href="http://beybladewiki.chatango.com/clonegroup?ts=1334882127625">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1334882127625">Start New</a> | <a href="http://beybladewiki.chatango.com">Full Size</a> ]';
  }
}
 
 
if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}

/* some imports*/
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('SearchGoButton/code.js', 'dev');

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if(wgNamespaceNumber == 110 ||wgNamespaceNumber === 114 ) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
if(skin == 'oasis') {
  $('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');
  return;
 }
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

/* lock blog comments for blogs that haven't been commented on for more than 30 days.
   by: [[User:Joeyaa|Joey Ahmadi]]
*/
 
$(function() {
if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
var then = $('#article-comments-ul > .SpeechBubble:first .permalink').attr('href');
then = new String(then.match(/\d{8}/));
var monthnames = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];
var year = then.match(/^\d{4}/);
var month = then.substring(4,6); 
var now = new Date();
month--;
month= monthnames[month];
var day = then.match(/\d{2}$/);
then = new Date(month+''+day+', '+year); 
var old = parseInt(now - then);
old = Math.floor(old/(1000*60*60*24));
if (old > 30) {
$('#article-comm').attr('disabled','disabled').text('This blog post hasn\'t been commented on for over 30 days. There is no need to comment.');
$('#article-comm-submit').attr('disabled','disabled');
$('.article-comm-reply').remove();
}
}
});

importScriptPage('ShowHide/code.js', 'dev');


function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=202082182029&amp;connections=10&amp;stream=1" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}

$(fBox);

function fBox2() {
	$('#fbox2').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=202082182029&amp;connections=0&amp;stream=0" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}

$(fBox2);
 
function onloadhookcustom() {
  var replace = document.getElementById("JRChatReplace");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=#wikia-halfblood" width="450" height="400"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;

  }
  //alert(document.getElementById("JRChatReplace").innerHTML);

}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */



var ShowHideConfig = { 
    brackets: '[[]]'
};
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev'); //for examples on [[CollapsibleInfobox]]

//main
importScript('MediaWiki:Common.js/main.js');
//main//

// Cookie accessor functions
importScript('MediaWiki:Common.js/cookieAccessor.js');
// END Cookie accessor functions

// Collapsibles
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;
 
// Collapsible Tables
importScriptPage('ShowHide/code.js', 'dev');
// END of Collapsible Tables
 
// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
// END of Standard Edit Summaries

//AjaxBatchDelete
importScriptPage('AjaxBatchDelete/code.js', 'dev');
//END AjaxBatchDelete
 
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxRefresh = 30000;
// END of ajax auto-refresh

// Extra Rollback Buttons
importScript('MediaWiki:Common.js/extraRollbacks.js');
// END Extra Rollback Buttons
 
// AjaxRollback - works with Extra Rollback Buttons
importScript('MediaWiki:Common.js/ajaxRollback.js');
// END AjaxRollback
 
// Countdown code
importScriptPage('Countdown/code.js', 'dev');
// END Countdown code
 
// JS for Template:CSS
importScript('MediaWiki:Common.js/userCSS.js');
// END JS for Template:CSS
 
// Adds PURGE button for both skins
var PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
// END Adds PURGE button for both skins
 
// For UserGroup-only messages
importScript('MediaWiki:Common.js/UserGroupMessages.js');
// END For UserGroup-only messages

// Inactive users
importScriptPage('InactiveUsers/code.js', 'dev');
// END Inactive users
 
// Add "Edit Intro" Button/Tab
importScriptPage('EditIntroButton/code.js', 'dev');
// END Add "Edit Intro" Button/Tab
 
// Adds PopupsNavigation
importScript('MediaWiki:Common.js/popupsNav.js');
// END Adds PopupsNavigation
 
// Add Enhanced DIFF View
importScript('MediaWiki:Common.js/wikEdDiff.js');
// END Add Enhanced DIFF View
 
// Add Template:Information to Special:Upload
importScript('MediaWiki:Common.js/uploadTemp.js');
// END Add Template:Information to Special:Upload
 
// Backwards compatibility CSS
importScript('MediaWiki:Common.js/backupCSS.js');
// END Backwards compatibility CSS 
 
// Locate Main Page "Buttons" into Headers
importScript('MediaWiki:Common.js/mainPageButtons.js');
// END Locate Main Page "Buttons" into Headers
 
// IE-specific fixes
importScript('MediaWiki:Common.js/IE.js');
// END IE-specific fixes
 
// Display Comments w/ Local Times
// importScript('MediaWiki:Common.js/localTimeComments.js');
// END Display Comments w/ Local Times

// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
// Caveats: Does not work on Special:Contributions/username

// </source>
//</source>

/* Any JavaScript here will be loaded for all users on every page load. */
/* If you don not know what you are doing, do not edit this page */

// Hide edit button on Exchange pages for wcs
function AnonMessage() {
	if(wgUserGroups == null) {
		$('.anonmessage').css('display', 'inline');
	}
}

// Fill the block expiry time with a default value
var wgDefaultExpiryBlock = '1 week';
 
if ( wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Blockip' ) {
	$(function() {
		if ( ($('#wpBlockExpiry').val() == '' || $('#wpBlockExpiry').val() == 'other') && $('#mw-bi-other').val() == '' ) {
			$('#wpBlockExpiry').val('1 week').trigger('change');
		}
	});
}
 
addOnloadHook(UserContribsMenuItem);
 
function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="600" height="650" id="obj_1334882127625"><param name="movie" value="http://beybladewiki.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1334882127625&v=0&w=0"/><embed id="emb_1334882127625" src="http://beybladewiki.chatango.com/group" width="600" height="650" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1334882127625&v=0&w=0"></embed></object><br>[ <a href="http://beybladewiki.chatango.com/clonegroup?ts=1334882127625">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1334882127625">Start New</a> | <a href="http://beybladewiki.chatango.com">Full Size</a> ]';
  }
}
 
 
if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}

/* some imports*/
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('SearchGoButton/code.js', 'dev');

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if(wgNamespaceNumber == 110 ||wgNamespaceNumber === 114 ) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
if(skin == 'oasis') {
  $('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');
  return;
 }
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

// Show and hide thing
importScriptPage('ShowHide/code.js', 'dev');

// Facebook thing
function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=202082182029&amp;connections=10&amp;stream=1" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}

$(fBox);

function fBox2() {
	$('#fbox2').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=202082182029&amp;connections=0&amp;stream=0" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}

$(fBox2);
 
function onloadhookcustom() {
  var replace = document.getElementById("JRChatReplace");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=#wikia-halfblood" width="450" height="400"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;

  }
  //alert(document.getElementById("JRChatReplace").innerHTML);

}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */



var ShowHideConfig = { 
    brackets: '[[]]'
};
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev'); //for examples on [[CollapsibleInfobox]]

//main
importScript('MediaWiki:Common.js/main.js');
//main//

// Cookie accessor functions
importScript('MediaWiki:Common.js/cookieAccessor.js');
// END Cookie accessor functions

// Collapsibles
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;
 
// Collapsible Tables
importScriptPage('ShowHide/code.js', 'dev');
// END of Collapsible Tables
 
// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
// END of Standard Edit Summaries

//AjaxBatchDelete
importScriptPage('AjaxBatchDelete/code.js', 'dev');
//END AjaxBatchDelete
 
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxRefresh = 30000;
// END of ajax auto-refresh

// Extra Rollback Buttons
importScript('MediaWiki:Common.js/extraRollbacks.js');
// END Extra Rollback Buttons
 
// AjaxRollback - works with Extra Rollback Buttons
importScript('MediaWiki:Common.js/ajaxRollback.js');
// END AjaxRollback
 
// Countdown code
importScriptPage('Countdown/code.js', 'dev');
// END Countdown code
 
// JS for Template:CSS
importScript('MediaWiki:Common.js/userCSS.js');
// END JS for Template:CSS
 
// Adds PURGE button for both skins
var PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
// END Adds PURGE button for both skins
 
// For UserGroup-only messages
importScript('MediaWiki:Common.js/UserGroupMessages.js');
// END For UserGroup-only messages

// Inactive users
importScriptPage('InactiveUsers/code.js', 'dev');
// END Inactive users
 
// Add "Edit Intro" Button/Tab
importScriptPage('EditIntroButton/code.js', 'dev');
// END Add "Edit Intro" Button/Tab
 
// Adds PopupsNavigation
importScript('MediaWiki:Common.js/popupsNav.js');
// END Adds PopupsNavigation
 
// Add Enhanced DIFF View
importScript('MediaWiki:Common.js/wikEdDiff.js');
// END Add Enhanced DIFF View
 
// Add Template:Information to Special:Upload
importScript('MediaWiki:Common.js/uploadTemp.js');
// END Add Template:Information to Special:Upload
 
// Backwards compatibility CSS
importScript('MediaWiki:Common.js/backupCSS.js');
// END Backwards compatibility CSS 
 
// Locate Main Page "Buttons" into Headers
importScript('MediaWiki:Common.js/mainPageButtons.js');
// END Locate Main Page "Buttons" into Headers
 
// IE-specific fixes
importScript('MediaWiki:Common.js/IE.js');
// END IE-specific fixes
 
// Display Comments w/ Local Times
// importScript('MediaWiki:Common.js/localTimeComments.js');
// END Display Comments w/ Local Times

//</source>