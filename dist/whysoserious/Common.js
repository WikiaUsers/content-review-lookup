/* <pre><nowiki> */

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
    fixSearch();

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
    // macbre: fixing "this.div" has no properties bug
    if (!this.div) {
      return;
    }

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

// Reskin parser script from [[Uncyclopedia:MediaWiki:Uncyclopedia.js]]
skinjs = {
    "Logout": "Logout.js"
}

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

//addOnloadHook(loadFunc);

YAHOO.util.Event.onDOMReady(loadFunc);


 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/whysoserious/images//8/8a/WelcomeButton.png",
     "speedTip": "Welcome a new user",
     "tagOpen": "{{subst:welcome|",
     "tagClose": "}}",
     "sampleText": "<insert your own username here>"};

  }

// end

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

function catprefix() {
  if(!document.getElementById('catnoprefix')) return
  var anchors = document.getElementById('mw-pages').getElementsByTagName('a');
  for(var i=0;i < anchors.length;i++) {
    if(anchors[i].firstChild.nodeValue.indexOf(':') != -1) {
      anchors[i].firstChild.nodeValue = anchors[i].firstChild.nodeValue.substring(anchors[i].firstChild.nodeValue.indexOf(':')+1);
    }
  }
}
addOnloadHook(catprefix)



 /** Voting *******************************
  * By [[User:Spang|Spang]]
  * Voting system
  * Add "ratings.disabled = true" without the quotes to your JS to disable
  * **Compressed to save space/bandwidth etc. Use http://javascript.about.com/library/blformat.htm to see formatted source
  */

 //<nowiki>
 ratings=new Object();ratings.getCallback={success:function(o){var j=YAHOO.tools.JSONParse(o.responseText);try{with(j.query.wkvoteart[wgArticleId]){if(typeof votesavg!=undefined&&votesavg){ratings.avgVote=(5>=votesavg>=1?Math.round(votesavg*10)/10:5);ratings.text[0]=('average rating: '+ratings.avgVote)}if(typeof(uservote)!='undefined'&&uservote){ratings.myVote=uservote;ratings.hasVoted=true}else{ratings.hasVoted=false}ratings.paint(0)}}catch(e){}},failure:function(o){ratings.out('connection failure :(')}};ratings.vote=function(a){if(wgUserName==null){window.location='/wiki/Special:Userlogin?returnto='+wgPageName;return}var b=(ratings.hasVoted==true?'update':'insert');ratings.get=YAHOO.util.Connect.asyncRequest('GET','/api.php?format=json&action='+b+'&list=wkvoteart&wkuservote=1&wkctime=5&wkpage='+wgArticleId+'&wkvote='+a,ratings.voteCallback,null);ratings.myVote=a;ratings.paint(a,'submitting vote...');ratings.votingInProgress=true};ratings.voteCallback={success:function(o){var j=YAHOO.tools.JSONParse(o.responseText);if(j.item.wkvoteart[3]!=undefined&&ratings.retried!=true){ratings.retried=true;ratings.out('failed, retrying...');ratings.get=YAHOO.util.Connect.asyncRequest('GET','/api.php?format=json&action=delete&list=wkvoteart&wkpage='+wgArticleId,ratings.retry,null);return};try{with(j.item.wkvoteart[0]==undefined?j.item.wkvoteart:j.item.wkvoteart[0]){ratings.hasVoted=true;ratings.myVote=vote;ratings.avgVote=Math.round(avgvote*10)/10;if(ratings.avgVote>5)ratings.avgVote=5}}catch(e){ratings.out('Error: '+e);ratings.votingInProgress=false;return}ratings.votingInProgress=false;ratings.out('thanks for voting!');ratings.text[0]=('average rating: '+ratings.avgVote);ratings.timeout=setTimeout('ratings.paint(0)',1000)},failure:function(o){ratings.votingInProgress=false;ratings.out('connection failure :(')}};ratings.retry={success:function(o){ratings.get=YAHOO.util.Connect.asyncRequest('GET','/api.php?format=json&action=insert&list=wkvoteart&wkuservote=1&wkctime=5&wkpage='+wgArticleId+'&wkvote='+ratings.myVote,ratings.voteCallback,null)},failure:function(o){ratings.out('error')}};ratings.out=function(m){document.getElementById('ratingMsg').innerHTML=m};ratings.paint=function(n,m){if(ratings.votingInProgress==true)return;YAHOO.util.Dom.setStyle(['vote-1','vote-2','vote-3','vote-4','vote-5'],'backgroundPosition','0 0');for(var l=1;l<=n;l++){YAHOO.util.Dom.setStyle('vote-'+l,'backgroundPosition','0 -34px')}if(n===0&&(ratings.myVote!=false||ratings.avgVote!=undefined)){var a=ratings.hasVoted==true?'0 -34px':'0 -17px';var b=ratings.hasVoted!=false?ratings.myVote:ratings.avgVote;for(var l=1;l<=b;l++){YAHOO.util.Dom.setStyle('vote-'+l,'backgroundPosition',a)}if(l-ratings.avgVote<1&&l<=5&&ratings.hasVoted!=true){var p=ratings.avgVote-(l-1);var q=0;switch(true){case 0<p&&p<=.2:q='-51px';break;case.2<p&&p<=.4:q='-68px';break;case.4<p&&p<=.6:q='-85px';break;case.6<p&&p<=.8:q='-102px';break;case.8<p&&p<1:q='-119px';break;default:};document.getElementById('vote-'+l).style.backgroundPosition='0px '+q}};if(wgUserName==null&&n!=0)ratings.out('please log in to vote');else if(m==undefined)ratings.out(ratings.text[n]);else ratings.out(m)};ratings.setup=function(){if(wgIsArticle==false||ratings.disabled==true)return;var a=document.getElementById('p-search');if(!a)return false;ratings.p=document.createElement('div');ratings.p.innerHTML='<h5>rating</h5><div id="ratingBody" class="pBody"><div><ul id="ratingStars" onmouseout="ratings.paint(0);"><li id="vote-1" class="voteStar" onmouseover="ratings.paint(1)" onclick="ratings.vote(1);">&nbsp;1</li><li id="vote-2" class="voteStar" onmouseover="ratings.paint(2)" onclick="ratings.vote(2);"> 2</li><li id="vote-3" class="voteStar" onmouseover="ratings.paint(3)" onclick="ratings.vote(3);"> 3</li><li id="vote-4" class="voteStar" onmouseover="ratings.paint(4)" onclick="ratings.vote(4);"> 4</li><li id="vote-5" class="voteStar" onmouseover="ratings.paint(5)" onclick="ratings.vote(5);"> 5&nbsp;</li></ul></div><span id="ratingMsg">rate this article!</span></div>';ratings.p.className='portlet';ratings.p.id='p-rating';document.getElementById('column-one').insertBefore(ratings.p,a);ratings.text=new Array('rate this article!','poor','nothing special','worth reading','pretty good','awesome!');ratings.get=YAHOO.util.Connect.asyncRequest('GET','/api.php?format=json&action=query&list=wkvoteart&wkuservote=1&wkctime=5&wkpage='+wgArticleId,ratings.getCallback,null)};
 
 YAHOO.util.Event.onContentReady('column-one', ratings.setup);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWWiki.

///////////////////////////////////////////////////////////////////////////////////////////////////////////

ajaxPages = new Array("Special:RecentChanges", "Special:Watchlist", "Special:Log");

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
document.getElementsByTagName("h1")[0].innerHTML += ' <span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing page loads">AJAX:</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
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

// </nowiki></pre>