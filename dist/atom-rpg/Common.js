/* Any JavaScript here will be loaded for all users on every page load. */
/*-------Automatically refresh "Recent changes" via AJAX-------*/
var ajaxPages = ["Special:WikiActivity","Special:Contributions","Special:NewPages","Special:RecentChanges","Special:WikiActivity","Special:NewFiles","Special:Log","Special:Video"];
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Enable auto-refreshing page loads';

/* Alternative Discord widget */
/* Script author: Сибирский Смотритель */
(function () {
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/servers/549426996631961610/embed.json";
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
            '<img alt="Discord" src="https://static.wikia.nocookie.net/atom-rpg/images/f/f6/Discord_chat_logo.svg/revision/latest?cb=20250911150021&format=original&path-prefix=ru" class="discord-icon">' + 
            '<span>Discord</span>' + 
        '</h2>' +
        '<table>' +
            '<tbody>' +
                '<tr>' +
                    '<td style="vertical-align:middle; width:auto;">' +
                        '<p class="chat-name">' +
                            'Join the ATOM RPG Wiki\'s <a href="https://en.wikipedia.org/wiki/Discord_(software)" target="_blank">Discord</a> Server' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:100px;">' +
                        '<center>' +
                            '<img alt="Atom RPG" src="https://vignette.wikia.nocookie.net/atom-rpg/images/f/fc/Atom_512.png/revision/latest/scale-to-width-down/480?cb=20180728074149&path-prefix=ru" class="discord-server-icon">' +
                            '<span>Online: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Join Chat Now</button>' +
                        '</center>' +
                      '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<hr/>' +
                        '<h4 class="discord-online">Members online:<div class="discord-chevron" style="float: right"></div></h4>' +
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

/* Wikificator */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Wikificator.js',
		'u:dev:MediaWiki:RecentChangesMultiple/code.2.js',
    ]
});

/* prevents existing tags from being hidden */
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

/* InactiveUsers */
InactiveUsers = { months: 2 };