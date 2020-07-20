// IMPORT
importArticles({
    type: 'script',
    articles: [
        'u:pl.arrow:MediaWiki:ReportErrors.js',    //ReportErrors by Szynka013
    ]
});

// AJAXRC
window.ajaxPages = ["Special:RecentChanges","Specjalna:Ostatnie_zmiany"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';
 
// NIEAKTYWNY UŻYTKOWNIK
window.InactiveUsers = { text: 'nieobecny' };

// PRZYCISK DO POWROTU NA GÓRĘ STRONY
$(function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>');
});

// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};

// OSTATNIE ZMIANY W MODULE AKTYWNOŚCI by Szynka013
if ($('#WikiaRail').length) { 
    $('#WikiaRail').bind('DOMNodeInserted.modules', function(event) {
 
	if (!$('#RCLink').size()) 
	  $(".WikiaActivityModule").append('<a href="/Special:RecentChanges" title="Special:RecentChanges" class="more" style="float:left;" id="RCLink">Ostatnie zmiany</a>');
    });
}

// PRZYCISK DO POWROTU by Rafi862
$(function() {
  if(wgNamespaceNumber == 112 || wgNamespaceNumber == 114 || $('#showarticlebutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments[data-id]').before('<a class="wikia-button comments secondary" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Powrót do oryginalnego artykułu"><span style="width: 10px; text-align: center; font-size:13px; padding-right:5px; display: inline-block;" class="fa fa-arrow-circle-o-left ""></span> Powrót</a>');
  }
});
 
// OSTRZEŻENIE O BRAKU LICENCJI
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane.";
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() === '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true;
		return false;
	}
	return true;
}

$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
 
$(".wikia-gallery-item .thumbimage").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
	});
	$(".wikia-gallery-item .image").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
});
 
// LICENCJE by Vuh
var LicenseOptions = {
	'{{Brak licencji}}': 'Grafika bez licencji',
	'{{CC-BY-SA}}': 'Grafika CC-BY-SA',
	'{{Copyright}}': 'Grafika Copyright',
	'{{Fairuse}}': 'Grafika Fairuse',
	'{{PD}}': 'Grafika domeny publicznej',
	'{{Wikimedia}}': 'Grafika Wikimedii',
};

importArticles({
    type: "script",
    articles: [
    "u:pl.tes:MediaWiki:APIQuery.js",
    "u:pl.tes:MediaWiki:Licenses.js"
   ]
});

// EDITBUTTONS by Szynka013
var ExMenu = $('.WikiaPageHeader ul.WikiaMenuElement'),
    ExMenu_Links = '<li><a href="?veaction=edit"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-desktop "></span> VisualEditor</a></li>' +
    '<li><a href="?action=delete"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-trash-o "></span> Usuń</a></li>' +
'<li><a href="/wiki/Special:MovePage/' + wgPageName +'"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-reply "></span> Zmień nazwę</a></li>' +
'<li><a href="?action=protect"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-lock "></span> Zabezpiecz</a></li>' +
'<li><a href="?action=history"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-book "></span> Historia</a></li>' +
'<li><a href="/wiki/Special:WhatLinksHere/' + wgPageName +'"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-link "></span> Linkujące</a></li>' +
'<li><a href="?action=purge"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-clock-o "></span> Odśwież</a></li>' +
'<li><a href="?action=raw&ctype=text/javascript"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-code "></span> Surowa wersja</a></li>' +
'<li><a href="#" id="reportarError" onclick="openReportForm(); return false"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-bug "></span> Zgloś błąd</a></li>';

if (wgUserGroups != 'null') {
    ExMenu.html(ExMenu_Links);
}

// LICZNIK by Nanaki
function getTimeCountText(time) {
    amount = Math.floor((time - new Date().getTime())/1000);
    if(amount < 0) return false;
    
    var days = Math.floor(amount / 86400);
    amount = amount % 86400;
    var hours = Math.floor(amount / 3600);
    amount = amount % 3600;
    var mins = Math.floor(amount / 60);
    amount = amount % 60;
    var secs = Math.floor(amount);
    
    var list = [];
    if (days > 0) {
        list.push('<span class="days">' + days + ' ' + ((days == 1) ? 'dzień' : 'dni') + '</span>');
    }
    if (hours > 0) {
        list.push('<span span="hours">' + hours + ' h</span>');
    }
    list.push('<span span="minutes">' + mins + ' m</span>');
    list.push('<span span="seconds">' + secs + ' s</span>');
    
    return list.join(' ');
}

function countBoxTick(box) {
    console.log(this);
    var time = box.data('time');
    var res = getTimeCountText(time);
    if(res) {
        box.html(res);
        setTimeout(function() {
            countBoxTick(box);
        }, 1000);
    } else {
        box.html('Oczekuj!');
    }
}

$('.countbox').each(function() {
    if($(this).data('date')) {
        var time = new Date($(this).data('date')).getTime();
        if(!isNaN(time)) {
            $(this).data('time', time);
            countBoxTick($(this));
        } else {
            $(this).html('Niepoprawna data');
        }
    }
});

// KOMUNIKAT
/*
function setCookie() {
  document.cookie = "PlHelpThread=closed; expires=0; path=/"; 
}
function getCookie(name)
  {
 var re = new RegExp(name + "=([^;]+)");
 var value = re.exec(document.cookie);
 return (value != null) ? unescape(value[1]) : null;
  }
 
var notifNotClosed = getCookie("PlHelpThread") != "closed";
 
      if (notifNotClosed) {
 
var message = 'Adoptuj tę wiki!<br/>Wygląda na to, że wiki jest opuszczona przez <a href="http://pl.ben10reboot.wikia.com/wiki/Project:Administratorzy" class="plainlinks">administratorów</a>. Jeśli spełniasz wymagania możesz ją <a href="http://spolecznosc.wikia.com/wiki/Centrum_Spo%C5%82eczno%C5%9Bci:Adoptuj_wiki" class="plainlinks">adoptować</a>!';
 
if($('.WikiaNotifications').length > 0) { 
          $('<li><div id="helpTheWiki" style=""><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li>').prependTo('#WikiaNotifications');
       } else {
        $('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div style="" id="helpTheWiki"><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li></ul>').prependTo('.WikiaBarWrapper');
       }
}
*/