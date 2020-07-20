//<pre>
// Кнопка викификатора
function addWikifButton() {
	var toolbar = document.getElementById('toolbar')
	if (!toolbar) return
	var i = document.createElement('img')
	i.src = '//upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
	i.alt = i.title = 'викификатор'
	i.onclick = Wikify
	i.style.cursor = 'pointer'
	toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
	importScriptURI('//ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
	addOnloadHook(addWikifButton)
}

// Кнопка, вздымающая вверх
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//Created by Noemon from Dead Space Wiki, translate from ru.elderscrolls.wikia
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Back to top" onClick="goToTop();">Наверх</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Автообновление статей
///////////////////////////////////////////////////////////////////////////////////////////////////////////
window.ajaxPages = [
    "Служебная:WikiActivity",
    "Служебная:RecentChanges",
    "Служебная:Watchlist",
    "Служебная:Log",
    "Служебная:Contributions"
];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Авто-обновление';
window.AjaxRCRefreshHoverText = 'Автоматически обновляет страницу каждые '+ajaxRefresh/1000+' секунд' ;
 
window.PurgeButtonText = 'Обновить';
 
importArticles({
    type: 'script',
    articles: [
        "u:ru.sword-art-online:MediaWiki:RepeatableTimer.js",
        "u:dev:Toggler.js"
    ]
});

//</pre>

// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{Января;Февраля;Марта;Апреля;Мая;Июня;Июля;Августа;Сентября;Октября;Ноября;Декабря}m %Y (UTC)';

/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/
(function () {
if (!mw.config.get('wgUserName'))
    return;
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/guilds/704480037566677044/embed.json";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            setupModule(data);
        }
    };
    request.open("GET", discordJSON, true);
    request.send();
}
 
function setupModule(data) {
    console.log("Building module...");
    var $module = 
    $('<section class="ChatModule module">' +
        '<table>' +
            '<tbody>' +
                '<tr>' +
                    '<td style="vertical-align:middle; width:100%;">' +
                        '<p class="chat-name">' +
                            '<a href="https://ru.wikipedia.org/wiki/Discord" target="_blank">Discord</a> — бесплатный мессенджер для публичного общения вне Фэндома.' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://vignette.wikia.nocookie.net/silenthill/images/d/df/Seal2.png/revision/latest?cb=20150130165823&path-prefix=ru" class="discord-icon">' +
                            '<span>В сети: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Войти в чат</button>' +
                        '</center>' +
                      '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<div style=" font-size:90%; width:100%; box-shadow:0 0 1px 1px #771e1e; "></div>' +
                        '<h4>Пользователи онлайн<div class="discord-chevron" style="float: right"></div></h4>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<ul class="discord-list"></ul>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>' +
    '</section>');
 
    $module.find('.discord-joined').attr('onclick', "window.open('" + data.instant_invite + "','_blank')");
    $module.find('#discord-counter').text(data.members.length);
 
    data.members.forEach(function (v) {
        var $member = $('<li class="discord-member">' +
            '<div class="discord-avatar">' +
                '<img />' +
            '</div>' +
        '</li>');
        $member.append(v.username + (v.bot ? ' <span class="discord-bot">BOT</span>' : ''));
        $member.find('.discord-avatar').addClass("discord-" + v.status);
        $member.find('img').attr("src", v.avatar_url);
 
        $module.find(".discord-list").append($member);
    });
 
    var toggle      = $module.find('.discord-chevron'),
        collapsible = $module.find('.discord-list');
 
    collapsible.hide();
    toggle.click(function() {
        if ( !toggle.hasClass('opened') ) {
            collapsible.slideDown();
            toggle.addClass('opened');
        } else {
            collapsible.slideUp();
            toggle.removeClass('opened');
        }  
    });
 
    $('#WikiaRail').append($module);
    console.log("Discord module has currently loaded");
}
 
})();

/*Неактивные пользователи - более 1 месяца */
//Inactive users
InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВЕН'
};
 
importScriptPage('InactiveUsers/code.js', 'dev');