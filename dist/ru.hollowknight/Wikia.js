/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/
(function () {
if (!mw.config.get('wgUserName'))
    return;
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/servers/326326755822534656/embed.json";
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
                            '<a href="https://ru.wikipedia.org/wiki/Discord" target="_blank">Discord</a> – бесплатный мессенджер для публичного общения вне Фэндома.' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://images.wikia.nocookie.net/hollowknight/ru/images/0/00/Иконка_для_HK_чата2.png" class="discord-icon">' +
                            '<span>В сети: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Войти в чат</button>' +
                        '</center>' +
                      '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<hr>' +
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
        if (v.username == "Dmitry221060") {
            $member.append('<a href="http://ru.dont-starve.wikia.com/wiki/Участник:Dmitry221060">Dmitry221060</a>');
        } else if (v.nick) {
            $member.append('<a href="http://ru.hollowknight.wikia.com/wiki/Участник:' + v.nick + '">' + v.nick + (v.bot ? ' <span class="discord-bot">BOT</span>' : '') + '</a>');
        } else {
            v.username = v.username.replace(/<|>|\//g, '');
            $member.append('<a href="http://ru.hollowknight.wikia.com/wiki/Участник:' + v.username + '">' + v.username + (v.bot ? ' <span class="discord-bot">BOT</span>' : '') + '</a>');
        }
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

/*map map*/
if ($('#noMap').length) {
    $('body').append('<div style="display:block" id="forMap">'+$('#noMap').wrap('<div/>').parent().html()+'</div>'); //Строит карту
 
    $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"}); //Отображает её
 
    $('#forMap').on('click', function(e){ //Скрывает карту при нажатии на пустое место
        if(e.target.id == "forMap"){
            $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:none"});
            $('#forMap').attr({"style":"display:none"});
        }
    });
 
    $('#showMap').on('click', function(e){ //Отображает карту при нажатии на кнопку
        $('#forMap #noMap').attr({"style":"font-size: 14px; line-height: 25px; display:block"});
        $('#forMap').attr({"style":"display:block"});
    });
    
    
    for(i=0;i<$('#forMap .mapMarker a > img').length;i++) //Подгружает маркеры
        $('#forMap .mapMarker a > img')[i].src = $('#forMap .mapMarker a > img')[i].dataset.src
}