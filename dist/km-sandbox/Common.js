/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');


/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
	if( skin == 'oasis' )
	{
		$('#WikiaPageHeader .wikia-menu-button a:first').html('Archived').removeAttr('href');
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

/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/
 
if (mwCustomEditButtons) { 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images3.wikia.nocookie.net/youngjustice/images/d/dc/Image_Button.png",
     "speedTip": "Insert filebox template",
     "tagOpen": "\{\{Filebox\r| description = ",
     "tagClose": "\r| episode     = \r| film        = \r| show        = \r| source      = \r| origin      = \r| license     = screenshot\r\}\}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images2.wikia.nocookie.net/youngjustice/images/1/1d/Copyrights_needed_Button.png",
     "speedTip": "Uncredited image tag",
     "tagOpen": "\{\{subst:ukn|",
     "tagClose": "}}",
     "sampleText": "both"};
 
}

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

// START OF TOOLTIP CODE
// This tooltip code was written by Pcj
// Updated to work with Wikia skin by Uberfuzzy
 
article = "";
 
var tooltipsOn = true;
 
var $tfb;
 
var $ttfb;
 
var $htt;
 
var activeHoverLink = null;
 
var tipCache = new Object;
 
function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
    activeHoverLink = null;
}
 
function displayTip(e) {
    $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
    moveTip(e);
    $htt.not(":empty").css("visibility", "visible");
    moveTip(e);
}
 
function moveTip(e) {
    $ct = $htt.not(":empty");
    var newTop = e.clientY + (e.clientY > $(window).height() / 2 ? -($ct.innerHeight() + 20) : 20);
    var newLeft = e.clientX + (e.clientX > $(window).width() / 2 ? -($ct.innerWidth() + 20) : 20);
    $ct.css({
        position: "fixed",
        top: newTop + "px",
        left: newLeft + "px"
    });
}
 
function showTip(e) {
    var $t = $(this);
    activeHoverLink = $t;
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.removeAttr("title");
        $p.removeAttr("title");
        var url = "/index.php?title=" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "&action=render div.tooltip-content";
        if (tipCache[url] != null) {
            $tfb.html(tipCache[url]);
            displayTip(e);
            return;
        }
        $tfb.load(url, function() {
            if ($t != activeHoverLink) return;
            if ($tfb.html() == "") $tfb.html('<div class="tooltip-content module" style="background:#000000 !important; color:#ffffff"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
            $tfb.find(".tooltip-content").css("display", "");
            tipCache[url] = $tfb.html();
            displayTip(e);
        });
    }
}
 
function hideTemplateTip() {
    $ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}
 
function showTemplateTip(e) {
    $ttfb.html('<div class="tooltip-content">' + $(this).next().html() + "</div>");
    displayTip(e);
}
 
function bindTT() {
    $t = $(this);
    $p = $t.parent();
    if ($p.hasClass("selflink") == false) {
        $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
    }
}
 
function ttMouseOver() {
    if (tooltipsOn) {
        $(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
        $tfb = $("#tfb");
        $ttfb = $("#templatetfb");
        $htt = $("#tfb,#templatetfb");
        $(article + " span.ajaxttlink").each(bindTT);
        $(article + " span.tttemplatelink").hover(showTemplateTip, hideTemplateTip).mousemove(moveTip);
    }
}
 
 
// check to see if it is active then do it
$( function() {
	if(skin=='oasis') {
		article = "#WikiaArticle";
	} else {
		article = "#bodyContent";
	}
 
        ttMouseOver();
});
// END OF TOOLTIP CODE
////////////////////////////////////////////////////////////////////////////////

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
            Button.style.marginLeft = "-100%";
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

//**Back to top**//
importScriptPage('MediaWiki:Common.js/top.js', 'prototype');

// Import scripts from Wikia Developers' Wiki
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:LockForums/code.js',
	'u:dev:DisplayClock/code.js',
        'u:dev:Standard_Edit_Summary/code.js'
    ]
});

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