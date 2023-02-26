/* <pre style="overflow: scroll"><nowiki> */

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
        if(document.getElementById('mp3-navlink').getElementsByTagName('a').length > 0)
        {
            document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
        }
        
    }

    if(window.storagePresent)
        initVisibility();

    rewriteSearchFormLink();
    fillEditSummaries();
    fillDeleteReasons();
    fillPreloads();

    substUsername();
    substUsernameTOC();
    rewriteTitle();
    showEras('title-eraicons');
    showEras('title-shortcut');
    rewriteHover();
    addAlternatingRowColors();
    replaceSearchIcon();

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

// ============================================================
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

function replaceSearchIcon()
{
    var searchbox = document.getElementById('searchBody');
    if(searchbox==null) { return; }
    var innerDiv = searchbox.getElementsByTagName('div')[0];
    var link = innerDiv.getElementsByTagName('a')[0];
    
    if(link)
        innerDiv.removeChild(link);
    
//    innerDiv.style.paddingTop = '56px';
    
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

    div.appendChild(ul);
    document.getElementById('globalWrapper').appendChild(div);

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

// Reskin parser script from [[Uncyclopedia:MediaWiki:Uncyclopedia.js]]
skinjs = {
    "Logout": "Logout.js"
}

var re = RegExp("(.*) - SWGames, the Star Wars Games Wiki");
var matches = re.exec(document.title);

var skinNamejs;

if (matches) {
    if (skinjs[matches[1]] != undefined) {
        skinNamejs = (skinjs[matches[1]].length > 0) ? skinjs[matches[1]] : matches[1] + '.js';
        document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Skin/' + skinNamejs + '&action=raw&ctype=text/javascript"></script>');
    }
}

addOnloadHook(loadFunc);


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

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i=0;i<nocountdowns.length;i++) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i=0;i<countdowns.length;i++) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i=0;i<timers.length;i++) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

/*</pre>*/

// </nowiki></pre>