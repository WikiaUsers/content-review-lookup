/* Folgendes Script wird in jedem Skin geladen */


//TOGGLE
//Austin Che http://openwetware.org/wiki/User:Austin
// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
var togglers = new Array();     
var allClasses = new Object(); // associative map of class names to page elements
function createSpoilerButtons() { 
    var els = document.getElementsByTagName('*'); 
    var pattern = new RegExp("(^|\\s)jp(\\s|$)"); 
    for (i = 0; i < els.length; i++) { 
        if ( pattern.test(els[i].className) ) { 
            var divDe = document.createElement('div'); 
                divDe.style.position = 'absolute'; 
                divDe.style.right = '12px'; 
                divDe.style.top = '0.8em'; 
                divDe.style.lineHeight = '1.5em'; 
                divDe.style.fontSize = '150%'; 
                 
                var div2 = document.createElement('div'); 
                    div2.className = '_toggle de'; 
                     
                    var span = document.createElement('span'); 
                        span.className = '_toggler_hide-de _toggler_show-jp'; 
                        span.appendChild(document.createTextNode('Spoiler anzeigen')); 
                    div2.appendChild(span); 
                     
                    var img = document.createElement('img'); 
                        img.src = '/images/thumb/b/bd/Close.png/25px-Close.png'; 
                        img.style.verticalAlign = 'middle'; 
                    div2.appendChild(img); 
                divDe.appendChild(div2); 
                 
                var div2 = document.createElement('div'); 
                    div2.className = '_toggle de'; 
                    div2.style.display = 'none'; 
                divDe.appendChild(div2); 
            document.getElementById('bodyContent').appendChild(divDe); 
 
            var divJp = document.createElement('div'); 
                divJp.style.position = 'absolute'; 
                divJp.style.right = '12px'; 
                divJp.style.top = '1.8em'; 
                divJp.style.lineHeight = '1.5em'; 
                divJp.style.fontSize = '80%'; 
                 
                var div2 = document.createElement('div'); 
                    div2.className = '_toggle jp'; 
                    div2.style.display = 'none'; 
                divJp.appendChild(div2); 
                 
                var div2 = document.createElement('div'); 
                    div2.className = '_toggle jp'; 
                    div2.style.display = 'none'; 
                     
                    var span = document.createElement('span'); 
                        span.className = '_toggler_hide-jp _toggler_show-de'; 
                        span.appendChild(document.createTextNode('Spoiler verbergen')); 
                    div2.appendChild(span); 
                     
                    var img = document.createElement('img'); 
                        img.src = '/images/thumb/b/bd/Close.png/25px-Close.png'; 
                        img.style.verticalAlign = 'middle'; 
                    div2.appendChild(img); 
                divJp.appendChild(div2); 
            document.getElementById('bodyContent').appendChild(divJp); 
             
            break; 
        } 
    } 
} 
addOnloadHook(createSpoilerButtons);
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

addOnloadHook(toggleInit);

function toggleObjectVisibility(objectId) {
  var styleObject = document.getElementById(objectId);
  if (styleObject) {
    if (styleObject.style.display == 'block') {
      styleObject.style.display = "none";
    } else {
      styleObject.style.display = "block";
    }
  }
}


var spoilersDone, navbarsDone;
//================================================================================
//*** Dynamic Navigation Bars
 
// set up the words in your language
var NavigationBarHide = 'Einklappen';
var NavigationBarShow = 'Ausklappen';
 
// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
if (typeof NavigationBarShowDefault == 'undefined' ) {
    var NavigationBarShowDefault = 1;
}
 
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
           if (NavChild.className == 'NavPic') {
               NavChild.style.display = 'none';
           }
           if (NavChild.className == 'NavContent') {
               NavChild.style.display = 'none';
           }
           if (NavChild.className == 'NavToggle') {
               NavChild.firstChild.data = NavigationBarShow;
           }
       }
 
   // if hidden now
   } else if (NavToggle.firstChild.data == NavigationBarShow) {
       for (
               var NavChild = NavFrame.firstChild;
               NavChild != null;
               NavChild = NavChild.nextSibling
           ) {
           if (NavChild.className == 'NavPic') {
               NavChild.style.display = 'block';
           }
           if (NavChild.className == 'NavContent') {
               NavChild.style.display = 'block';
           }
           if (NavChild.className == 'NavToggle') {
               NavChild.firstChild.data = NavigationBarHide;
           }
       }
   }

}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
   if (navbarsDone) return;
   var indexNavigationBar = 0;
   // iterate over all < div >-elements
   var divs = document.getElementsByTagName("div");
   for (var i=0;  i<divs.length; i++) {
       var NavFrame = divs[i];
       // if found a navigation bar
       if (NavFrame.className == "NavFrame" || NavFrame.className == "NavFrame Ausgeklappt" || NavFrame.className == "NavFrame Zugeklappt") {
 
           indexNavigationBar++;
           var NavToggle = document.createElement("a");
           NavToggle.className = 'NavToggle';
           NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
           NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
           var NavToggleText = document.createTextNode(NavigationBarHide);
           NavToggle.appendChild(NavToggleText);
 
           // add NavToggle-Button as first div-element 
           // in < div class="NavFrame" >
           NavFrame.insertBefore(
               NavToggle,
               NavFrame.firstChild
           );
           NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
if (NavFrame.className == "NavFrame Zugeklappt") toggleNavigationBar(indexNavigationBar);
       }
   }
   // if more Navigation Bars found than Default: hide all
   if (NavigationBarShowDefault < indexNavigationBar) {
       for(
               var i=1; 
               i<=indexNavigationBar; 
               i++
       ) {
           var NavFrame = document.getElementById("NavFrame" + i);
           if (NavFrame.className == "NavFrame") toggleNavigationBar(i);
       }
   }
  navbarsDone = true;
}
 
if (typeof showAllSpoiler == 'undefined' ) {
    var showAllSpoiler = 0;
}

function createSpoiler() {
   if (showAllSpoiler || spoilersDone) return;

   var indexSpoiler = 0;
   // iterate over all < div >-elements
   var divs = document.getElementsByTagName("div");
   for (var i=0;  i<divs.length; i++) {
       var Spoiler = divs[i];
       if (Spoiler.className == "spoiler") {
           indexSpoiler++;
           Spoiler.style.display = "none";

           var SpoilerToggle = document.createElement("a");
           SpoilerToggle.className = 'spoilerButton';
           SpoilerToggle.setAttribute('id', 'SpoilerToggle' +indexSpoiler);
           SpoilerToggle.setAttribute('href', 'javascript:toggleObjectVisibility(\'Spoiler' + indexSpoiler + '\');');
 
           var spLabel = Spoiler.getAttribute("title");
           Spoiler.setAttribute("title", "");
           if (!spLabel) spLabel = "Spoiler";
           var SpoilerToggleText = document.createTextNode(spLabel);
           SpoilerToggle.appendChild(SpoilerToggleText);
 
           document.getElementById("bodyContent").insertBefore(
               SpoilerToggle,
               Spoiler
           );
           Spoiler.setAttribute('id', 'Spoiler' + indexSpoiler);
       }
   }  
   spoilersDone = true;
}

function createContentTabs() {
	var ict = 0, divs = document.getElementsByTagName("div"), defaultTab;
	for (var i = 0; i<divs.length; i++) {
		var ctdiv = divs[i];
		if (ctdiv.className == "Tabs") {
			var firstTab, tabs;
			ict++;

			if (document.getElementById("ct_"+ict)) continue;
			ctdiv.parentNode.id = "ct_"+ict;
			tabs = ctdiv.childNodes;
			defaultTab = ctdiv.title;
			ctdiv.setAttribute("title", "");

			for (var j=0; j<tabs.length; j++) {
				var tab = tabs[j];
				var toggle = document.createElement("a");
				var tabName = tab.className;
				if (!tabName) continue;

				toggle.setAttribute('href', 'javascript:toggleTab(\'ct_'+ict+'\', \''+tabName+'\');');
				toggle.setAttribute('id', 'ct_'+ict+'_'+tabName);

				var spLabel = tab.innerHTML;
				if (!spLabel) continue;
				toggle.innerHTML = spLabel;

				if (!firstTab) {
					firstTab = tabName;
					if (!defaultTab) {
						defaultTab=tabName;
					}
				}
				ctdiv.appendChild(toggle);
				ctdiv.removeChild(tab);
			}
			toggleTab("ct_"+ict, defaultTab);
		}
	}
}
function toggleTab(ct_id, ct_tab) {
	var a = document.getElementById(ct_id);
	for (var i = 0; i<a.childNodes.length; i++) {
		var b = a.childNodes[i];
		for (var j = 0; j<b.childNodes.length; j++) {
			var c = b.childNodes[j];
			if(c.id||c.className) {
				if (b.className=="Tabs") {
					c.className="";
				} else if (b.className=="Contents") {
					c.style.display="none";
					if (c.id==ct_tab) c.style.display = "block";
				}
			}
		}
	}
	document.getElementById(ct_id+"_"+ct_tab).className = "active";
}
addOnloadHook(createNavigationBarToggleButton);
addOnloadHook(createSpoiler);
addOnloadHook(createContentTabs);


 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *			   http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
function collapseTable( tableIndex ) {
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
	if ( !Table || !Button ) {
		return false;
	}
 
	var Rows = Table.rows;
 
	if ( Button.firstChild.data == collapseCaption ) {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
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
	var Tables = document.getElementsByTagName( 'table' );
 
	for ( var i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], 'collapsible' ) ) {
 
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
			if ( !HeaderRow ) {
				continue;
			}
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if ( !Header ) {
				continue;
			}
 
			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
			var Button = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
 
			Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', '#' );
			addHandler( ButtonLink, 'click', new Function( 'evt', 'collapseTable(' + tableIndex + ' ); return killEvt( evt );' ) );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );
 
			Header.insertBefore( Button, Header.childNodes[0] );
			tableIndex++;
		}
	}
 
	for ( var i = 0;  i < tableIndex; i++ ) {
		if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
			collapseTable( i );
		} else if ( hasClass( NavigationBoxes[i], 'innercollapse' ) ) {
			var element = NavigationBoxes[i];
			while ( element = element.parentNode ) {
				if ( hasClass( element, 'outercollapse' ) ) {
					collapseTable( i );
					break;
				}
			}
		}
	}
}
 
addOnloadHook( createCollapseButtons );
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function() {
	var reCache = {};
	return function( element, className ) {
		return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
	};
})();

function toggleObjectVisibility(objectId) {
  var styleObject = document.getElementById(objectId);
  if (styleObject) {
    if (styleObject.style.display == 'block') {
      styleObject.style.display = "none";
    } else {
      styleObject.style.display = "block";
    }
  }
}


var spoilersDone, navbarsDone;
//================================================================================
//*** Dynamic Navigation Bars
 
// set up the words in your language
var NavigationBarHide = 'Einklappen';
var NavigationBarShow = 'Ausklappen';
 
// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
if (typeof NavigationBarShowDefault == 'undefined' ) {
    var NavigationBarShowDefault = 1;
}
 
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
           if (NavChild.className == 'NavPic') {
               NavChild.style.display = 'none';
           }
           if (NavChild.className == 'NavContent') {
               NavChild.style.display = 'none';
           }
           if (NavChild.className == 'NavToggle') {
               NavChild.firstChild.data = NavigationBarShow;
           }
       }
 
   // if hidden now
   } else if (NavToggle.firstChild.data == NavigationBarShow) {
       for (
               var NavChild = NavFrame.firstChild;
               NavChild != null;
               NavChild = NavChild.nextSibling
           ) {
           if (NavChild.className == 'NavPic') {
               NavChild.style.display = 'block';
           }
           if (NavChild.className == 'NavContent') {
               NavChild.style.display = 'block';
           }
           if (NavChild.className == 'NavToggle') {
               NavChild.firstChild.data = NavigationBarHide;
           }
       }
   }

}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
   if (navbarsDone) return;
   var indexNavigationBar = 0;
   // iterate over all < div >-elements
   var divs = document.getElementsByTagName("div");
   for (var i=0;  i<divs.length; i++) {
       var NavFrame = divs[i];
       // if found a navigation bar
       if (NavFrame.className == "NavFrame" || NavFrame.className == "NavFrame Ausgeklappt" || NavFrame.className == "NavFrame Zugeklappt") {
 
           indexNavigationBar++;
           var NavToggle = document.createElement("a");
           NavToggle.className = 'NavToggle';
           NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
           NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
           var NavToggleText = document.createTextNode(NavigationBarHide);
           NavToggle.appendChild(NavToggleText);
 
           // add NavToggle-Button as first div-element 
           // in < div class="NavFrame" >
           NavFrame.insertBefore(
               NavToggle,
               NavFrame.firstChild
           );
           NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
if (NavFrame.className == "NavFrame Zugeklappt") toggleNavigationBar(indexNavigationBar);
       }
   }
   // if more Navigation Bars found than Default: hide all
   if (NavigationBarShowDefault < indexNavigationBar) {
       for(
               var i=1; 
               i<=indexNavigationBar; 
               i++
       ) {
           var NavFrame = document.getElementById("NavFrame" + i);
           if (NavFrame.className == "NavFrame") toggleNavigationBar(i);
       }
   }
  navbarsDone = true;
}
 
if (typeof showAllSpoiler == 'undefined' ) {
    var showAllSpoiler = 0;
}

function createSpoiler() {
   if (showAllSpoiler || spoilersDone) return;

   var indexSpoiler = 0;
   // iterate over all < div >-elements
   var divs = document.getElementsByTagName("div");
   for (var i=0;  i<divs.length; i++) {
       var Spoiler = divs[i];
       if (Spoiler.className == "spoiler") {
           indexSpoiler++;
           Spoiler.style.display = "none";

           var SpoilerToggle = document.createElement("a");
           SpoilerToggle.className = 'spoilerButton';
           SpoilerToggle.setAttribute('id', 'SpoilerToggle' +indexSpoiler);
           SpoilerToggle.setAttribute('href', 'javascript:toggleObjectVisibility(\'Spoiler' + indexSpoiler + '\');');
 
           var spLabel = Spoiler.getAttribute("title");
           Spoiler.setAttribute("title", "");
           if (!spLabel) spLabel = "Spoiler";
           var SpoilerToggleText = document.createTextNode(spLabel);
           SpoilerToggle.appendChild(SpoilerToggleText);
 
           document.getElementById("bodyContent").insertBefore(
               SpoilerToggle,
               Spoiler
           );
           Spoiler.setAttribute('id', 'Spoiler' + indexSpoiler);
       }
   }  
   spoilersDone = true;
}

function createContentTabs() {
	var ict = 0, divs = document.getElementsByTagName("div"), defaultTab;
	for (var i = 0; i<divs.length; i++) {
		var ctdiv = divs[i];
		if (ctdiv.className == "Tabs") {
			var firstTab, tabs;
			ict++;

			if (document.getElementById("ct_"+ict)) continue;
			ctdiv.parentNode.id = "ct_"+ict;
			tabs = ctdiv.childNodes;
			defaultTab = ctdiv.title;
			ctdiv.setAttribute("title", "");

			for (var j=0; j<tabs.length; j++) {
				var tab = tabs[j];
				var toggle = document.createElement("a");
				var tabName = tab.className;
				if (!tabName) continue;

				toggle.setAttribute('href', 'javascript:toggleTab(\'ct_'+ict+'\', \''+tabName+'\');');
				toggle.setAttribute('id', 'ct_'+ict+'_'+tabName);

				var spLabel = tab.innerHTML;
				if (!spLabel) continue;
				toggle.innerHTML = spLabel;

				if (!firstTab) {
					firstTab = tabName;
					if (!defaultTab) {
						defaultTab=tabName;
					}
				}
				ctdiv.appendChild(toggle);
				ctdiv.removeChild(tab);
			}
			toggleTab("ct_"+ict, defaultTab);
		}
	}
}
function toggleTab(ct_id, ct_tab) {
	var a = document.getElementById(ct_id);
	for (var i = 0; i<a.childNodes.length; i++) {
		var b = a.childNodes[i];
		for (var j = 0; j<b.childNodes.length; j++) {
			var c = b.childNodes[j];
			if(c.id||c.className) {
				if (b.className=="Tabs") {
					c.className="";
				} else if (b.className=="Contents") {
					c.style.display="none";
					if (c.id==ct_tab) c.style.display = "block";
				}
			}
		}
	}
	document.getElementById(ct_id+"_"+ct_tab).className = "active";
}
addOnloadHook(createNavigationBarToggleButton);
addOnloadHook(createSpoiler);
addOnloadHook(createContentTabs);

/* admin ui changes */
 
if( window.wgUserGroups ) {
  for(var i = 0; i < wgUserGroups.length; ++i) {
    if(wgUserGroups[i] === "sysop") {
  // importScript("MediaWiki:Group-sysop.js");  kann bei Bedarf ent-auskommentiert werden
      importStylesheet("MediaWiki:Group-sysop.css");
      break;
    }
  }
}

//================================================================================
//*** import Onlyifuploading-functions
// SEE ALSO [[MediaWiki:Onlyifuploading.js]]

if (wgCanonicalSpecialPageName == "Upload") {
    importScript("MediaWiki:Onlyifuploading.js");
}

// Dieses Javascript stammt aus aus dem Super Mario Wiki, http://www.mariowiki.com/MediaWiki:Monobook.js //

function mainPageRenameNamespaceTab() {
     try {
         var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
         if ( Node.textContent ) {
             Node.textContent = 'Hauptseite';
         } else if ( Node.innerText ) {
             Node.innerText = 'Hauptseite';
         } else {
             Node.replaceChild( Node.firstChild, document.createTextNode( 'Hauptseite' ) ); 
         }
     } catch(e) {
     }
 }

if ( wgTitle == 'Hauptseite' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
        addOnloadHook( mainPageRenameNamespaceTab );
}
if ( wgIsArticle || window.location.href.indexOf( 'action=submit' ) > -1 )
{
  var script  = document.createElement( 'script' );
  script.src  = 'http://bulbapedia.bulbagarden.net/w/index.php?title=User:Poke/CollapsibleTables.js&action=raw&ctype=text/javascript';
  script.type = 'text/javascript';
  document.getElementsByTagName( 'head' )[0].appendChild( script );
}

addOnloadHook( function()
  { new CollapsibleTables(); } );