 // This is a 3 set parts script
 // This script is from Wikipedia. For author attribution, please see
 // http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js

// 1st part will look for the class name
 /* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Maintainers: [[Wikipedia:User:Mike Dillon]], [[Wikipedia:User:R. Koot]], [[Wikipedia:User:SG]]
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

// 2nd part is the Scrip for Wikitables
/* <pre style="height: 45em"><nowiki> */
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:Wikipedia:NavFrame]].
  *  Maintainers: [[Wikipedia:User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "verstecken";
 var expandCaption = "zeigen";
 
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
/* </nowiki></pre> */

// 3er part is the Scrip for NavFram 
/* <pre style="height: 45em"><nowiki> */
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:Wikipedia:NavFrame]].
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
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
  }
 
  addOnloadHook( createNavigationBarToggleButton );
/* </nowiki></pre> */


// Wookipedias stuff
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
 //Disabling?    rewriteSearchFormLink();
    fillEditSummaries();
    fillDeleteReasons();
    fillPreloads();
 //Disabling?    substUsername();
 //Disabling?    substUsernameTOC();
    rewriteTitle();
    showEras('title-epicons');
    showEras('title-shortcut');
    rewriteHover();
    addAlternatingRowColors();
 //Disabling?    replaceSearchIcon();
 //Disabling?    fixSearch();
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

 function infoboxToggle()
 {
    var page = window.pageName.replace(/\W/g, '_');
    var nowShown;

    if(document.getElementById('infoboxtoggle').innerHTML == '[Hide]')
    {
        document.getElementById('infoboxinternal').style.display = 'none';
        document.getElementById('infoboxtoggle').innerHTML = '[Show]';
        nowShown = false;
    }
    else
    {
        document.getElementById('infoboxinternal').style.display = 'block';
        document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
        nowShown = true;
    }
    if(window.storagePresent)
    {
        var storage = globalStorage[window.location.hostname];
        storage.setItem('infoboxshow-' + page, nowShown);
    }
 }

// Various preloads menus
 function fillEditSummaries()
 {
    var label = document.getElementById("wpSummaryLabel");
    if(label == null)
        return;
    var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
    comboString += "</select><br />";
    label.innerHTML = comboString + label.innerHTML;
    requestComboFill('stdSummaries', 'Template:Stdsummaries');
 }
 function onStdSummaryChange()
 {
    var combo = document.getElementById("stdSummaries");
    var value = combo.options[combo.selectedIndex].value;
    if(value != "")
        document.getElementById("wpSummary").value = value;
 }
 function fillDeleteReasons()
 {
    var label = document.getElementById("wpReason");
    if(label == null)
        return;
    label = document.getElementById("contentSub");
    if(label == null)
        return;
    var comboString = "<br /><select id='stdReasons' onchange='onStdReasonChange()'>";
    comboString += "</select>";
    label.innerHTML += comboString;
    requestComboFill('stdReasons', "Template:Stdreasons");
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
    doPreload(document.getElementById('lf-preload-pagename').getElementsByTagName('input')[0].value);
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

// BEGIN JavaScript title rewrite
 function rewriteTitle()
 {
    if(typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE)
        return;
    var titleDiv = document.getElementById('title-meta');
    if(titleDiv == null)
        return;
    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    var node = firstHeading.childNodes[0];
    // new, then old!
    firstHeading.replaceChild(cloneNode, node);
    cloneNode.style.display = "inline";
    var titleAlign = document.getElementById('title-align');
    firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
 }

 function showEras(className)
 {
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;
    var titleDiv = document.getElementById(className);
    if(titleDiv == null || titleDiv == undefined)
        return;
    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
 }
// END JavaScript title rewrite

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

 function onArticleNavClick()
 {
    var div = document.getElementById('mp3-nav');
    if(div.style.display == 'block')
        div.style.display = 'none';
    else
        div.style.display = 'block';
 }

 function addAlternatingRowColors()
 {
    var infoboxes = getElementsByClass('infobox', document.getElementById('content'));
    if(infoboxes.length == 0)
        return;
    for(var k = 0; k < infoboxes.length; k++)
    {
        var infobox = infoboxes[k];
        var rows = infobox.getElementsByTagName('tr');
        var changeColor = false;
        for(var i = 0; i < rows.length; i++)
        {
            if(rows[i].className.indexOf('infoboxstopalt') != -1)
                break;
            var ths = rows[i].getElementsByTagName('th');
            if(ths.length > 0)
            {
                continue;
            }
            if(changeColor)
                rows[i].style.backgroundColor = '#f9f9f9';
            changeColor = !changeColor;
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


 /* Disabling the Something i dont know what is for
 function substUsernameTOC()
 {
    var toc = document.getElementById('toc');
    var userpage = document.getElementById('pt-userpage');
    if(!userpage || !toc)
        return;
    var username = userpage.firstChild.firstChild.nodeValue;
    var elements = getElementsByClass('toctext', toc, 'span');
    for(var i = 0; i < elements.length; i++)
        elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
 }
 */

 /* Disabling the search icon java
 function replaceSearchIcon()
 {
    var innerDiv;
    var searchbox = document.getElementById('searchBody');
    if(searchbox)
    {
        // monobook
        innerDiv = searchbox.getElementsByTagName('div')[0];
        var link = innerDiv.getElementsByTagName('a')[0];
        if(link)
            innerDiv.removeChild(link);
    }
    else
    {
        // smoke
        innerDiv = document.getElementById('WidgetSearch_1_content');
    }
    var loader = new ContentLoader();
    loader.div = innerDiv;
    loader.callback = onSearchIconsArrival;
    loader.send('/index.php?title=Template:Searchicons&action=raw');
 }
 function rand(n)
 {
    return Math.round(Math.random() * n);
 }
 function onSearchIconsArrival()
 {
    var lines = this.text.split('\n');
    var line = lines[rand(lines.length - 1)];
    var pos = line.indexOf(' ');
    var link = document.createElement('div');
 //    link.href = '/index.php?title=Special:Search&adv=1';
    link.id = 'search-icon-wrapper';
    var img = document.createElement('img');
    img.alt = 'Search';
    img.src = (pos == -1) ? line : line.substring(0, pos);
    link.appendChild(img);
    this.div.insertBefore(link, this.div.firstChild);
    var div = document.createElement('div');
    div.id = 'search-popup';
    div.style.display = 'none';
    var ul = document.createElement('ul');
    var li;
    var a;
    li = document.createElement('li');
    a = document.createElement('a');
    a.href = '/index.php?title=Special:Search&adv=1';
    a.appendChild(document.createTextNode('Advanced search'));
    li.appendChild(a);
    ul.appendChild(li);
    li = document.createElement('li');
    a = document.createElement('a');
    a.href = (pos == -1) ? 'javascript:emptySearchDesc()' : '/wiki/' + line.substring(pos + 1);
    a.appendChild(document.createTextNode("What's this? (" + ((pos == -1) ? 'NO DESCRIPTION' : line.substring(pos + 1)) + ')'));
    li.appendChild(a);
    ul.appendChild(li);
    li = document.createElement('li');
    a = document.createElement('a');
    a.href = 'javascript:closeSearchPopup()';
    a.appendChild(document.createTextNode("Close"));
    li.appendChild(a);
    ul.appendChild(li);
    var container = document.getElementById('globalWrapper');
    if(!container)
        container = document.getElementById('container');
    div.appendChild(ul);
    container.appendChild(div);
    link.onclick = openSearchPopup;
 }
 function openSearchPopup(event)
 {
    var div = document.getElementById('search-popup');
    var e = event || window.event;
    div.style.display = (div.style.display == 'none') ? 'block' : 'none';
    div.style.left = e.clientX + 'px';
    div.style.top = (e.clientY + document.documentElement.scrollTop) + 'px';
 }
 function closeSearchPopup()
 {
    document.getElementById('search-popup').style.display = 'none';
 }
 function emptySearchDesc()
 {
    alert('No description exists for this search icon. Please contact the administrators to resolve this problem.');
 }
 */

 /* Disabling, i dont know what this does
 var re = RegExp("(.*) - Wookieepedia, the Star Wars Wiki");
 var matches = re.exec(document.title);

 var skinNamejs;

 if (matches) {
    if (skinjs[matches[1]] != undefined) {
        skinNamejs = (skinjs[matches[1]].length > 0) ? skinjs[matches[1]] : matches[1] + '.js';
        document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Skin/' + skinNamejs + '&action=raw&ctype=text/javascript"></script>');
    }
 }

 function fixSearch()
 {
    var button = document.getElementById('searchSubmit');

    if(button)
        button.name = 'go';
 }
 */
//addOnloadHook(loadFunc);

YAHOO.util.Event.onDOMReady(loadFunc);