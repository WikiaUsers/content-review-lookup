
/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/
(function () {
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/servers/450588794870038530/embed.json";
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
                            '<a href="https://ru.wikipedia.org/wiki/Discord" target="_blank">Discord</a> – бесплатный мессенджер для публичного общения вне Фэндома. <b>Подробнее <a href="/wiki/Discord" target="_blank">тут</a></b>' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg" class="discord-icon">' +
                            '<span>В сети: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Войти в чат</button>' +
                        '</center>' +
                      '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<hr/>' +
                        '<h4>Пользователи онлайн <div class="discord-chevron" style="float: right"></div></h4>' +
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
 
    $('#WikiaRail').prepend($module);
    console.log("Discord module has currently loaded");
}
 
})();
 
/*********************Tooltip end************************************/
/* Titles */
// Загрузить js для формирования таблицы титулов
if(document.getElementById('title_tables')){
    importScript('MediaWiki:TableTitle.js');
}

window.ajaxPages = [
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление страницы';