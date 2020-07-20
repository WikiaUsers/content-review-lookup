//==============================================================
/*Скрипт альтернативного виджета дискорда by Сибирский Смотритель*/
//==============================================================
(function () {
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/servers/700759200149536779/embed.json";
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
        '<h2 class="discord-header">' +
            '<img alt="Discord" src="https://vignette.wikia.nocookie.net/atom-rpg/images/d/d0/Discord_logo.png/revision/latest?cb=20181227135639&path-prefix=ru" class="discord-icon">' + 
            '<span>Семейный Альбом Аддамсов</span>' + 
        '</h2>' +
        '<table>' +
            '<tbody>' +
                '<tr>' +
                    '<td style="vertical-align:middle; width:100%;">' +
                        '<p class="chat-name">' +
                            'Нашего семейного альбома <b>Стонущий <a href="https://addamsfamily.fandom.com/ru/wiki/Семейка_Аддамс_вики:Discord" target="_blank">Дискорд</a></b> (Dosca). Неприменно отметься, впиши себя в <i>Аддамс-хистори</i>.' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://vignette.wikia.nocookie.net/addamsfamily/images/b/b9/DiscordMirror.png/revision/latest?cb=20200523152151&format=original&path-prefix=ru" class="discord-server-icon">' +
                            '<span> В сети: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Войти в чат</button>' +
                        '</center>' +
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