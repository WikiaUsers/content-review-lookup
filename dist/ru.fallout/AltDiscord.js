/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/

(function($, document, mw) {
    'use strict';

    function altDiscord() {
		// debugger;
		if (
			!$('#WikiaRail').length
			|| mw.config.values.wgCanonicalNamespace == 'Special'
			|| mw.config.values.wgCanonicalNamespace == 'MediaWiki'
			|| window.initDiscordModule
			) return;
			
		window.initDiscordModule = true;
		initDiscordModule();
		 
		function initDiscordModule() {
		    // console.log("Getting data...");
		    var discordJSON = "https://discordapp.com/api/servers/460444054644064258/embed.json";
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
		    // console.log("Building module...");
		    var $module = 
		    $('<section class="rail-module activity-module ChatModule">' +
		        '<h2 class="discord-header">' +
		            '<img alt="Discord" src="https://vignette.wikia.nocookie.net/atom-rpg/images/d/d0/Discord_logo.png/revision/latest?cb=20181227135639&path-prefix=ru" class="discord-icon">' + 
		            /* '<span><a href="https://en.wikipedia.org/wiki/Discord_(software)" target="_blank">Discord</a></span>' + */
		            '<span>Discord</span>' + 
		        '</h2>' +
		        '<table>' +
		            '<tbody>' +
		                '<tr>' +
		                    '<td style="vertical-align:middle; width:auto;">' +
		                        '<p class="chat-name">' +
		                            '<span>Мегатонна </span>' + 
		                            '<span>сервер Убежища </span>' + 
		                            '<a href="https://fallout.fandom.com/ru/wiki/Убежище:Дискорд#Участники">[регистрация]</a>' +
		                            '<a href="https://fallout.fandom.com/ru/wiki/Убежище:Дискорд">[faq]</a>' +
		                        '</p>' +
		                    '</td>' +
		                      '<td style="vertical-align:middle; width:100px;">' +
		                        '<center>' +
		                            '<img alt="Мегатонна" src="https://static.wikia.nocookie.net/fallout/images/b/bc/Wiki.png/revision/latest?cb=20150612202852&path-prefix=ru" class="discord-server-icon">' +
		                            '<span>Online: <span id="discord-counter">?</span></span>' +
		                            '<button class="discord-joined">Войти в чат</button>' +
		                        '</center>' +
		                      '</td>' +
		                '</tr>' +
		                '<tr>' +
		                    '<td colspan="2">' +
		                        '<hr/>' +
		                        '<h4 class="discord-online">В сети:<div class="discord-chevron" style="float: right"></div></h4>' +
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
		    // console.log("Discord module has currently loaded");
		}
		 
    }

    mw.hook('wikipage.content').add(altDiscord);
 
})(window.jQuery, document, window.mediaWiki);