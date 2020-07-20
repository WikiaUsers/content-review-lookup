//==============================================================
// Новый блок "Новые статьи" с [[Шаблон:NewPagesModule]] внутри.
// Скрипт by Marvel Энциклопедия Wiki
//==============================================================
 
$(function(){
	$('<section class="module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:NewPagesModule&action=render');
});

//==============================================================
/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/
//==============================================================
(function () {
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/servers/325714014497669120/widget.json";
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
                            '<a href="https://ru.wikipedia.org/wiki/Discord" target="_blank">Discord</a> – бесплатный мессенджер для публичного общения вне Фэндома. <b>Подробнее <a href="http://ru.wikies.wikia.com/wiki/%D0%92%D0%92:D" target="_blank">тут</a></b>' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://vignette.wikia.nocookie.net/knigi6162/images/5/5a/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF.png/revision/latest?cb=20170630001234&path-prefix=ru" class="discord-icon">' +
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
 
    $('#WikiaRail').append($module);
    console.log("Discord module has currently loaded");
}
 
})();

//==============================================================
// Навигация по сайту в правой колонке ниже дискорда
// Скрипт by ru.madmax.wikia.com
//==============================================================
;(function($) {
    if (!$('#WikiaRail').length) return;
 
    $('#WikiaRail').append(
        '<section class="NavRail module" style="padding:0; border-radius:5px;">' +
            '<div class="NavHeader" style="position:relative; background-color:#c9f2c9; border-top: 1px solid #008000; border-bottom: 2px solid #008000; border-radius: 5px; width:100%; text-align:center; font-weight:bold; font-size:18px; padding:3px 0;">' +
                'Навигация по сайту' +
            '</div>' +
            '<div class="NavBody" style="-moz-column-count: 2; -moz-column-gap:50px; -webkit-column-count: 2; -webkit-column-gap:50px; column-count: 2; column-gap:50px; font-size:16px; padding:10px; margin-left:20px;">' +
                '<ul style="list-style: square;">' +
                    // Книги
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%BD%D0%B8%D0%B3%D0%B8" title="Книги">Книги</a>' +
                    '</li>' +
                    // Авторы
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%90%D0%B2%D1%82%D0%BE%D1%80%D1%8B" title="Категория:Авторы">Авторы</a>' +
                    '</li>' +
                    // Серии
                    '<li>' +
                        '<a href="/wiki/%D0%A6%D0%B8%D0%BA%D0%BB,_%D1%81%D0%B5%D1%80%D0%B8%D1%8F_%D0%BA%D0%BD%D0%B8%D0%B3" title="Цикл, серия книг">Серии</a>' +
                    '</li>' + 
                    // Циклы
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A6%D0%B8%D0%BA%D0%BB,_%D1%81%D0%B5%D1%80%D0%B8%D1%8F" title="Категория:Цикл, серия">Циклы</a>' +
                    '</li>' +
                    // Жанры
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%96%D0%B0%D0%BD%D1%80%D1%8B" title="Категория:Жанры">Жанры</a>' +
                    '</li>' +
                    // Сюжеты
                    '<li>' +
                        '<a href="/wiki/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A1%D1%8E%D0%B6%D0%B5%D1%82%D1%8B" title="Категория:Сюжеты">Сюжеты</a>' +
                    '</li>' +
                    // Поиск
                    '<li>' +
                        '<a href="/wiki/%D0%A1%D1%8E%D0%B6%D0%B5%D1%82%D1%8B" title="Сюжеты">Поиск</a>' +
                    '</li>' +
                    // Почитать
                    '<li>' +
                        '<a href="/wiki/%D0%A7%D1%82%D0%BE_%D0%BF%D0%BE%D1%87%D0%B8%D1%82%D0%B0%D1%82%D1%8C%3F" title="Что почитать?">Почитать</a>' +
                    '</li>' +
                '</ul>' +
            '</div>' +
        '</section>'
    );
})(this.jQuery);