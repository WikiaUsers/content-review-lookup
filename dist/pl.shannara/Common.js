/* Kody JS zapożyczone z https://pl.arrowwersum.wikia.com */
// IMPORT
importArticles({
    type: 'script',
    articles: [
        'u:dev:RevealAnonIP/code.js',              //RevealAnonIP
        'u:dev:WallGreetingButton/code.js',        //WallGreetingButton
        'u:dev:SearchSuggest/code.js',             //SearchSuggest
        'u:dev:DynamicImages/code.js',             //DynamicImages
        'u:dev:ExtendedNavigation/code.js',        //ExtendedNavigation
        'u:dev:ExternalImageLoader/code.js',       //ExternalImageLoader
        'u:dev:DupImageList/code.js',              //DupImageList
        'u:dev:Tooltips/code.js',                  //TOLLTIPS
        'u:dev:InactiveUsers/code.js'              //InactiveUsers
    ]
});

// NIEAKTYWNY UŻYTKOWNIK
InactiveUsers = { text: 'nieobecny' };

// OSTATNIE ZMIANY W MODULE AKTYWNOŚCI by Szynka013
if ($('#WikiaRail').length) { 
    $('#WikiaRail').bind('DOMNodeInserted.modules', function(event) {
 
	if (!$('#RCLink').size()) 
	  $(".WikiaActivityModule").append('<a href="/Special:RecentChanges" title="Special:RecentChanges" class="more" style="float:left;" id="RCLink">Ostatnie zmiany</a>');
    });
}

// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {permissions:['sysop','bureaucrat']};

// OSTRZEŻENIE O BRAKU LICENCJI
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
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
    console.log(this)
    var time = box.data('time');
    var res = getTimeCountText(time);
    if(res) {
        box.html(res);
        setTimeout(function() {
            countBoxTick(box)
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
            $(this).html('Niepoprawna data')
        }
    }
});

// KOMUNIKAT
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
 
var message = 'Adoptuj tę wiki!<br/>Wykaż się aktywnością i napisz do <a href="https://pl.shannara.wikia.com/wiki/U%C5%BCytkownik:NexGaming27" class="plainlinks">biurokraty</a>. Jeśli spełniasz wymagania możesz ją także adoptować na <a href="https://spolecznosc.wikia.com/wiki/Centrum_Spo%C5%82eczno%C5%9Bci:Adoptuj_wiki" class="plainlinks">Centrum Społeczności</a>!';
 
if($('.WikiaNotifications').length > 0) { 
          $('<li><div id="helpTheWiki" style=""><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li>').prependTo('#WikiaNotifications');
       } else {
        $('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div style="" id="helpTheWiki"><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li></ul>').prependTo('.WikiaBarWrapper');
       }
}