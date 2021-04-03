// настройки для BackToTopButton
window.BackToTopModern = true;

/* Тултипы (взято и адаптировано с Dead Cells вики)*/
// LC
window.tooltips_list = [
	{
	    classname: 'tooltip-weaponLC',
        parse: '{{#invoke:getdata|infobox|<#article#>|Оружие/LC}}'
    }, {
        classname: 'tooltip-suitLC',
        parse: '{{#invoke:getdata|infobox|<#article#>|Броня/LC}}'
    }, {
        classname: 'tooltip-giftLC',
        parse: '{{#invoke:getdata|infobox|<#article#>|Дар/LC}}'
    },
];

/* Сервер (автор скрипта: Сибирский Смотритель) */
(function () {
if (!mw.config.get('wgUserName'))
    return;
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/guilds/764106323469402114/widget.json";
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
                        '<h2><div style="padding-left: 2px; text-align: left;"><img src="https://static.wikia.nocookie.net/lorlc-test/images/d/dd/Discord.png/revision/latest?cb=20200909125833&path-prefix=ru" class="discord-bubble-icon"> Наш Discord</div></h2>' +
                    '</td>' +
                '<tr>' +
                '<tr>' +
                    '<td style="vertical-align:middle; width:100%;">' +
                        '<p class="chat-name">' +
'Присоединяйтесь к официальному Discord чату Тестовой вики! Для верификации требуется аккаунт на вики.' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://static.wikia.nocookie.net/lorlc-test/images/1/1b/DiscordAvatar.png/revision/latest?cb=20200909122734&path-prefix=ru" class="discord-icon">' +
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