/*Imports - Full credits on imported pages*/
 
/* http://dev.wikia.com/wiki/RevealAnonIP This must be placed above all imports. */
window.RevealAnonIP = {
    permissions : ['user']
};
 importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', '/index.php?title=MediaWiki:Functions.js&action=raw&ctype=text/javascript&usemsgcache=yes');
document.getElementsByTagName('head').item(0).appendChild(script);

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

 addOnloadHook(addAlternatingRowColors);

 function prepareInfoboxHide()
 {
    pageName = getElementsByClass('firstHeading', document.getElementById('content'), 'h1')[0].childNodes[0].nodeValue.trim();

    if(document.getElementById('infoboxinternal') != null)
    {
        document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Verberg]</a>';
    }

    if(window.storagePresent)
         initVisibility();
 }

 function infoboxToggle()
 {
    var page = pageName.replace(/\W/g,'_');
    var nowShown;

    if(document.getElementById('infoboxtoggle').innerHTML == '[Verberg]')
    {
        document.getElementById('infoboxinternal').style.display = 'none';
        document.getElementById('infoboxtoggle').innerHTML = '[Tonen]';
        nowShown = false;
    }
    else
    {
        document.getElementById('infoboxinternal').style.display = 'block';
        document.getElementById('infoboxtoggle').innerHTML = '[Verberg]';
        nowShown = true;
    }

    if(window.storagePresent)
    {
        var storage = globalStorage[window.location.hostname];
        storage.setItem('infoboxshow-' + page, nowShown);
    }
 }

 function initVisibility()
 {
    var storage = globalStorage[window.location.hostname];

    var page = pageName.replace(/\W/g,'_');
    var show = storage.getItem('infoboxshow-' + page);

    if(show == 'false')
    {
        infoboxToggle();
    }
 }

 addOnloadHook(prepareInfoboxHide);

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

addOnloadHook (fillDeleteReasons);

function onStdReasonChange()
{
    var combo = document.getElementById("stdReasons");
    var value = combo.options[combo.selectedIndex].value;

    if(value != "")
        document.getElementById("wpReason").value = value;
}

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

addOnloadHook (rewriteTitle);

//Ajax autorefresh door "pcj" van WoWwiki
var ajaxPages = [":Wikia discussies", "Speciaal:Volglijst", "Speciaal:Logboeken", "Speciaal:Bijdragen", "Speciaal:RecenteWijzigingen", "Forum:Index", "Speciaal:WikiActivity"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');


//Het hebben van een IRC box op paginas

$(function() {
	var nick = (wgUserName == null) ? ('RSW-Bezoeker-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-runescape-nl&prompt=false" width="680" height="700" style="border:0;background-color:#483821;"></iframe>');
	$('#IRCReplaceWide').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-runescape-nl&prompt=false" width="980" height="700" style="border:0;background-color:#483821;"></iframe>');
});

//Invoegen van gebruikersnaam

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

// ==================================================================
// Dynamic Templates
// ==================================================================
$(function() {
	if ($('#WikiaArticle pre.jcConfig,#bodyContent pre.jcConfig').size() > 0) {
		importScript('MediaWiki:Common.js/calc.js');
		importStylesheet('MediaWiki:Common.css/calc.css');
        }
});

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://ru.elderscrolls.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );

/* Collapsible Tables */
importScript('MediaWiki:Common.js/collapsibletables.js');

/* Exchange namespace interface */
importScript('MediaWiki:Common.js/gemhpop.js');

/* Masthead box script */
importScript('MediaWiki:Common.js/mastheadBoxes.js');

/* HighlightTables */
importScript('MediaWiki:Common.js/highlightTable.js');

/* MVV script */
importScript('MediaWiki:Common.js/mvv.js');

/* Switch Infobox */
importScript('MediaWiki:Common.js/SwitchInfobox.js');

/* Exchange Item Update */
importScript ('MediaWiki:Common.js/gemwupdate.js');

//GE Charts Script
if ($('.GEdatachart').length) {
	importScriptURI('http://code.highcharts.com/stock/highstock.js').onload = function() {
		addOnloadHook(function() {
			importScript('MediaWiki:Common.js/GECharts.js');
		});
	}
	if ($.browser.msie && parseFloat($.browser.version) < 9) {
		addOnloadHook(function() {
			importScript('MediaWiki:Common.js/GECharts.js');
		});
	}
}
/* Switch */
importScript('MediaWiki:Common.js/switch.js');