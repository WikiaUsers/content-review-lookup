/*Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

window.BackToTopModern = true;

var tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
/*превью предметов*/
window.tooltips_list = [
    {
    classname: 'tooltip-item',
    parse: '{{#invoke:getdata|infobox|<#article#>|Снаряжение}}'
},
{
    classname: 'tooltip-spec',
}
];


/*Детектив Искажения перемещение/WonderLab персонажи (Lucifer wiki) */
jQuery(document).ready(function($) {
    $(".lobotomy-js-click td").click(function() {
        window.document.location = $(this).data("href");
    });
});


jQuery(document).ready(function($) {
    $(".lobotomy-js-click .mp-character-portal").click(function() {
        window.document.location = $(this).data("href");
    });
});

/* Дайте, пожалуйста, причину */

/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/
(function () {
if (!mw.config.get('wgUserName'))
    return;
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discord.com/api/guilds/480414333520707594/widget.json";
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
                    '</td>' +
                        '<h2><div style="padding-left: 25px; text-align: left;">Наш Discord</div></h2>' +
                    '</td>' +
                '<tr>' +
                '<tr>' +
                    '<td style="vertical-align:middle; width:100%;">' +
                        '<p class="chat-name">' +
                            '<a href="https://ru.wikipedia.org/wiki/Discord" target="_blank">Discord</a> – бесплатный мессенджер для публичного общения вне Фэндома. <b>Открыть в <a href="https://discordapp.com/channels/343465056190857216/448478541051592704" target="_blank">браузере</a></b>' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://vignette.wikia.nocookie.net/lobotomycorp/images/7/7f/DiscordAva.png/revision/latest?cb=20190604051420&format=original&path-prefix=ru" class="discord-icon">' +
                            '<span>В сети: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Войти в чат</button>' +
                        '</center>' +
                      '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>' +
    '</section>');
 
    $module.find('.discord-joined').attr('onclick', "window.open('" + data.instant_invite + "','_blank')");
    $module.find('#discord-counter').text(data.members.length);
 
    $('#WikiaRail').prepend($module);
    console.log("Discord module has currently loaded");
}
})();


mw.loader.using('mediawiki.util').then(function() {
    
function zselector( $content ) {
    var ActiveID = '';
    $(function () {
        $('[class|="cc"]').click(function () {
            var cn = $(this).attr('class');
            if (typeof cn !== 'undefined') {
                ZContent(cn, '0');
            }
        });
        $('[class|="hh"]').mouseenter(function () {
            var cn = $(this).attr('class');
            if (typeof cn !== 'undefined') {
                ZContent(cn, '1');
            }
        });
        $('[class|="hh"]').mouseleave(function () {
            var cn = $(this).attr('class');
            if (typeof cn !== 'undefined') {
                ZContent(cn, '2');
            }
        });
        $('[class|="zz"]').each(function (i, elem) {
            if ($(this).css('display') == 'none') {
                $(this).css('opacity', 0);
            }
        });
    });
    function ZContent(classValue, effect) {
        if (classValue.split) {
            var ID = '';
            var fl = false;
            var fl1 = false;
            var elemClasses = classValue.split(' ');
            for (var i = 0; i < elemClasses.length; i++) {
                var elemClass = elemClasses[i];
                fl = fl || (elemClass == 'default' && effect == '0');
                if (elemClass.substring(0, 3) == 'hh-' || fl || elemClass.substring(0, 3) == 'cc-' || (fl1 && fl && elemClass == 'sy')) {
                	if(elemClass == 'sy')
                		ID = 'default';
                	else
                    	ID = elemClass.substring(3);
                    fl1 = ActiveID == ID;
                    if (effect == '0') {
                        ActiveID = ID;
                        ZEffect(ID);
                        SelectElem('cc', ID);
                    } else if (effect == '1') {
                        ActiveID = ID;
                        ZEffect(ID);
                        SelectElem('hh', ID);
                    } else if (effect == '2') {
                        ZEffect(ActiveID);
                        SelectElem('hh', ID);
                    }
                }
            }
        }
    }
    function ZEffect(ID) {
        $('[class|="zz"]').each(function (i, elem) {
            if ($(this).hasClass('zz-' + ID)) {
                $(this).css('display', 'block');
                $(window).trigger('scroll');
                $(this).stop();
                $(this).animate({
                    opacity: 1,
                    queue: false
                }, 700);
            } else {
                $(this).css('display', 'none');
                $(this).stop();
                $(this).animate({
                    opacity: 0,
                    queue: false
                }, 0);
            }
        });
    }
    function SelectElem(type, ID) {
        $('[class|="cc"],[class|="hh"]').each(function (i, elem) {
            if ($(this).hasClass(type + '-' + ID)) {
                $(this).removeClass('sn');
                $(this).addClass('sy');
            } else {
                $(this).removeClass('sy');
                $(this).addClass('sn');
            }
        });
    }
}
    
    mw.hook( 'wikipage.content' ).add( zselector );
    zselector( mw.util.$content );
});