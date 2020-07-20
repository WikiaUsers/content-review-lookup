/** Список статусів користувача */
$(function() {
    var groups = wgUserGroups;
    var string = groups.join(", "); 
    $('.groups').html(string);
});
 
// Автоматичне поновлення
// **************************************************
// AJAX-оновлення деяких сторінок (вибір сторінок)
window.ajaxPages = [
    "Спеціальна:Watchlist",
    "Спеціальна:Contributions",
    "Спеціальна:WikiActivity",
    "Спеціальна:RecentChanges"
];
window.AjaxRCRefreshText = 'Автопоновлення'; //Відображувальна назва
window.AjaxRCRefreshHoverText = 'Автоматично оновлює сторінку'; //Відображає підсказку

// Railway
// **************************************************
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Оформлення клавіши «Наверх» */
window.BackToTopSpeed = 1000;
window.BackToTopText = "До верху";

/*Скрипт альтернативного віджета Discord*/
/*Автор скрипта: Сибирский Смотритель*/
(function () {
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/guilds/653373007775137793/widget.json";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 300) {
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
                            '<a href="https://discordapp.com/" target="_blank">Discord</a> – безкоштовний додаток для публічного спілкування поза ФАНДОМУ. <a href="https://uk.wikipedia.org/wiki/Discord" target="_blank">Детально у Вікіпедії</a>. У разі виникнення будь-яких проблем адміністрація Вікі не несе відповідальності за сервер.'  +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg" class="discord-icon">' +
                            '<span>У мережі: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Увійим у чат</button>' +
                        '</center>' +
                      '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<hr/>' +
                        '<h4>Користувачі у мережі <div class="discord-chevron" style="float: right"></div></h4>' +
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
        $member.append(v.username);
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