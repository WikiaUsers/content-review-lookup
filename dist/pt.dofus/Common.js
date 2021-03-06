//<source lang="javascript">
 
var loadedScripts = {}; // included-scripts tracker
function importScriptURI(url) {
 if (loadedScripts[url]) {
  return null;
 }
 loadedScripts[url] = true;
 var s = document.createElement('script');
 s.setAttribute('src',url);
 s.setAttribute('type','text/javascript');
 document.getElementsByTagName('head')[0].appendChild(s);
 return s;
}
function importScript(page) {
  return importScriptURI(wgScript + '?action=raw&ctype=text/javascript&title=' + encodeURIComponent(page.replace(/ /g,'_')));
}
 
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
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, mostraring only the header. See
  *               [[Wikipedia:Wikipedia:NavFrame]].
  *  Maintainers: [[Wikipedia:User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "esconder";
 var expandCaption = "mostrar";
 
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
 
// 3er part is the Scrip for NavFram 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBaresconder = '[' + collapseCaption + ']';
  var NavigationBarmostrar = '[' + expandCaption + ']';
 
  // mostrars and esconders content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if mostrarn now
     if (NavToggle.firstChild.data == NavigationBaresconder) {
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
     NavToggle.firstChild.data = NavigationBarmostrar;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarmostrar) {
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
     NavToggle.firstChild.data = NavigationBaresconder;
     }
  }
 
  // adds mostrar/esconder-button to navigation bars
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
 
             var NavToggleText = document.createTextNode(NavigationBaresconder);
             for (
                  var NavChild = NavFrame.firstChild;
                  NavChild != null;
                  NavChild = NavChild.nextSibling
                 ) {
                 if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                     if (NavChild.style.display == 'none') {
                         NavToggleText = document.createTextNode(NavigationBarmostrar);
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
 
 
// Wookipedias stuff
 importScript('MediaWiki:Functions.js');
 
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
        document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[esconder]</a>';
    }
    addesconderButtons();
    if(document.getElementById('mp3-navlink') != null)
    {
        document.getElementById('mp3-navlink').onclick = onArticleNavClick;
        document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
    }
    if(window.storagePresent)
        initVisibility();
    fillEditSummaries();
 //   fillDeleteReasons();
    fillPreloads();
 //Disable    substUsername();
 //Disable    substUsernameTOC();
    rewriteTitle();
    mostrarEras('title-epicons');
    mostrarEras('title-shortcut');
    rewriteHover();
    addAlternatingRowColors();
 
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
    var nowmostrarn;
 
    if(document.getElementById('infoboxtoggle').innerHTML == '[esconder]')
    {
        document.getElementById('infoboxinternal').style.display = 'none';
        document.getElementById('infoboxtoggle').innerHTML = '[mostrar]';
        nowmostrarn = false;
    }
    else
    {
        document.getElementById('infoboxinternal').style.display = 'block';
        document.getElementById('infoboxtoggle').innerHTML = '[esconder]';
        nowmostrarn = true;
    }
    if(window.storagePresent)
    {
        var storage = globalStorage[window.location.hostname];
        storage.setItem('infoboxmostrar-' + page, nowmostrarn);
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
 
 function mostrarEras(className)
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
    var mostrar = storage.getItem('infoboxmostrar-' + page);
    if(mostrar == 'false')
    {
        infoboxToggle();
    }
    var hidables = getElementsByClass('hidable');
    for(var i = 0; i < hidables.length; i++)
    {
        mostrar = storage.getItem('hidablemostrar-' + i  + '_' + page);
        if(mostrar == 'false')
        {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);
            if(content != null && content.length > 0 &&
                button != null && button.length > 0 && content[0].style.display != 'none')
            {
                button[0].onclick('bypass');
            }
        }
        else if(mostrar == 'true')
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
 
 function addesconderButtons()
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
            button.appendChild(document.createTextNode('[esconder]'));
            if(new ClassTester('start-hidden').isMatch(box))
                button.onclick('bypass');
        }
    }
 }
 
 function toggleHidable(bypassStorage)
 {
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowmostrarn;
    if(content != null && content.length > 0)
    {
        content = content[0];
        if(content.style.display == 'none')
        {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[esconder]';
            nowmostrarn = true;
        }
        else
        {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[mostrar]';
            nowmostrarn = false;
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
            storage.setItem('hidablemostrar-' + item + '_' + page, nowmostrarn);
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
 
addOnloadHook(loadFunc);
 
//YAHOO.util.Event.onDOMReady(loadFunc);
 function forcePreview() {
    if (wgUserName != null || wgAction != 'edit') return; //(wgAction == 'edit')
    // if (new String(wgUserGroups).indexOf('autoconfirmed') == -1)
    var saveButton = document.getElementById('wpSave');
    if (!saveButton) return;
    saveButton.disabled = true;
    saveButton.value += ' (use preview first)'; //    saveButton.value = 'Save page (use preview first)';
    saveButton.style.fontWeight = 'normal';
    document.getElementById('wpPreview').style.fontWeight = 'bold';
 
 }
 addOnloadHook(forcePreview);
 
//</source>