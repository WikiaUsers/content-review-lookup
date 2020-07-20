
// Sharing Buttons
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
};
importScriptPage('SocialIcons/code.js','dev');

/* Voice Search */
importScriptPage('Voice_Dictation/voice.js', 'dev');

importScriptPage('Countdown/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('DupImageList/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');

/* Code by Seaside98 - Displays timer - Special thanks to Runescape wiki */
var refreshDate;
 
function addDate() {
    var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
    $('#showdate').empty().attr('title','Purge the server cache and update the contents of this page.').attr('style','text-decoration:none !important;').attr('href',window.location.href + '?action=purge').html(UTCDate.substring(5));
    window.clearTimeout(refreshDate);
    refreshDate = window.setTimeout(addDate, 1000);
}
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li class="Date" id="displayClock" style="float:right"><a id="showdate"></a></li>').appendTo('.WikiaBarWrapper .toolbar .tools');
    else
        $('#p-personal ul').prepend('<li class="Date" id="displayClock" style="float:right;"><a id="showdate"></a></li>');
    addDate();
    refreshDate = window.setTimeout(addDate, 1000);
});

/* Display title */
importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');

/* Clock */
var refreshDate;function addDate(){var a=((new Date()).toUTCString()).replace("GMT","(UTC)");$("#showdate").empty().append('<span style="font-weight: bold; text-transform: none;"><a style="color:white;" title="Purge the server cache and update the contents of this page." href="'+wgArticlePath.replace("$1",wgPageName.replace(/ /g,"_"))+'?action=purge">'+a.substring(5)+"</a></span>");window.clearTimeout(refreshDate);refreshDate=window.setTimeout(addDate,1000)}$(document).ready(function(){if(skin=="oasis"){$('<li id="displayTimer"><span id="showdate"></span></li>').appendTo("#GlobalNavigation")}else{$("#p-personal ul").prepend('<li><span id="showdate"></span></li>')}addDate();refreshDate=window.setTimeout(addDate,1000);$("#displayTimer").css({"font-size":"12px"})});

/* AJAX */
ajaxPages=["Special:RecentChanges","Special:WikiActivity","Special:NewPages"];var indicator="https://images.wikia.nocookie.net/marbleblast/images/b/b4/FB_Throbber_Orange.gif";if(!window.ajaxPages){ajaxPages=new Array("Special:NewPages")}if(!window.ajaxCallAgain){ajaxCallAgain=[]}var ajaxTimer;var ajaxRefresh=0;var refreshText="AJAX";if(typeof AjaxRCRefreshText=="string"){refreshText=AjaxRCRefreshText}var refreshHover="Enable auto-refreshing page loads";if(typeof AjaxRCRefreshHoverText=="string"){refreshHover=AjaxRCRefreshHoverText}var doRefresh=true;function setCookie(b,c,a){var d=new Date();d.setDate(d.getDate()+a);document.cookie=b+"="+escape(c)+((a==null)?"":";expires="+d.toGMTString())}function getCookie(a){if(document.cookie.length>0){c_start=document.cookie.indexOf(a+"=");if(c_start!=-1){c_start=c_start+a.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1){c_end=document.cookie.length}return unescape(document.cookie.substring(c_start,c_end))}}return""}function preloadAJAXRL(){ajaxRLCookie=(getCookie("ajaxload-"+wgPageName)=="on")?true:false;appTo=($("#WikiaPageHeader").length)?$("#WikiaPageHeader"):$(".firstHeading");appTo.append('&nbsp;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="'+refreshHover+'">'+refreshText+':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="'+indicator+'" style="vertical-align: baseline; margin-top: 5px;" border="0" alt="Refreshing page" /></span></span>');$("#ajaxLoadProgress").ajaxSend(function(b,c,a){if(location.href==a.url){$(this).show()}}).ajaxComplete(function(b,c,a){if(location.href==a.url){$(this).hide();for(i in ajaxCallAgain){ajaxCallAgain[i]()}}});$("#ajaxToggle").click(toggleAjaxReload);$("#ajaxToggle").attr("checked",ajaxRLCookie);if(getCookie("ajaxload-"+wgPageName)=="on"){loadPageData()}}function toggleAjaxReload(){if($("#ajaxToggle").attr("checked")=="checked"){setCookie("ajaxload-"+wgPageName,"on",30);doRefresh=true;loadPageData()}else{setCookie("ajaxload-"+wgPageName,"off",30);doRefresh=false;clearTimeout(ajaxTimer)}}function loadPageData(){var a=($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";$(a).load(location.href+" "+a+" > *",function(b){if(doRefresh){ajaxTimer=setTimeout("loadPageData();",ajaxRefresh)}})}$(function(){for(x in ajaxPages){if(wgPageName==ajaxPages[x]&&$("#ajaxToggle").length==0){preloadAJAXRL()}}});

/* Add a Blog under Contribute - by Codyn329 */
$(document).ready(function() { 
	$('.WikiHeader .buttons .contribute ul li').first().after('<li><a href= "/wiki/Special:CreateBlogPage">Add a Blog</a></li'); 
});

/* Add History Button to Threads - by Seaside98 */
if (mediaWiki.config.get('wgNamespaceNumber') === 1201) {
	$('.follow').after('<a class="wikia-button" style="float:right;margin-left:10px;" href="/wiki/'+ wgPageName +'?action=history">History</a>');
}
 
/* Add Current Diff Link to Edit Menu - by Seaside98 */
$('.WikiaPageHeader .WikiaMenuElement').prepend('<li><a href="/wiki/'+ wgPageName +'?diff=cur">Current Diff</a></li>');


/* From LEGO Space wiki */

/* Add Editcount tab on all user pages and user talk pages */
/* CODE BY GEORGE BARNICK // [[User:GeorgeBarnick]] */
$(function() {
    var wikiUrl = window.location.hostname;
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://" + wikiUrl + "/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

/* Add contributions link to the user dropdown on the Wikia bar */
$(document).ready(function() {
    $('<li id="MyContribs"><a href="/wiki/Special:MyContributions">My&nbsp;contributions</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
});

/* Create a Blog Post quicklink */
$(document).ready(function() {
    $('<li><a href="/wiki/Special:CreateBlogPage" data-id="createblog">Create a Blog Post</a></li>').insertAfter('.contribute ul li:nth-of-type(3)');
});

/* New Buttons */

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/lcf119testinggrounds/images/7/74/Button_comment.png",
		"speedTip": "Comment visible only for editors",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Insert comment here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/7/70/Button_disambig.png",
		"speedTip": "Click for disambiguation page template",
		"tagOpen": "{{",
		"tagClose": "}}",
		"sampleText": "disambig"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "Click to strike out text",
		"tagOpen": "<strike>",
		"tagClose": "</strike>",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/6/6a/Button_sup_letter.png",
		"speedTip": "Makes text higher (be wary; it makes it small)",
		"tagOpen": "<sup>",
		"tagClose": "</sup>",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/a/aa/Button_sub_letter.png",
		"speedTip": "Makes text lower (be wary; it makes it small)",
		"tagOpen": "<sub>",
		"tagClose": "</sub>",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Creates a redirect",
		"tagOpen": "#REDIRECT:[[",
		"tagClose": "]]",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/lcf119testinggrounds/images/d/d5/Button_noinclude.png",
		"speedTip": "Does not include text when imported to another page",
		"tagOpen": "<noinclude>",
		"tagClose": "</noinclude>",
		"sampleText": "Insert text here"
	};

/* Any JavaScript here will be loaded for all users on every page load. */
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

/** Fastdelete *******************************
 * By Splarka
 */
function appendScript(url) {
  var scriptElem = document.createElement('script');
  scriptElem.setAttribute('src',url);
  scriptElem.setAttribute('type','text/javascript');
  document.getElementsByTagName('head')[0].appendChild(scriptElem);
}

appendScript('http://www.wikia.com/index.php?title=User:Splarka/fastdelete.js&action=raw&ctype=text/javascript&dontcountme=s');

// </nowiki></pre>