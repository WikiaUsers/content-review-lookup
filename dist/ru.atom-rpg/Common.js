/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//collapsing in the community corner
(function ($) {
    function makeColl () {
        $('.CommunityCornerModule').find('.mw-collapsible').makeCollapsible();
    }
    $(function(){
        var no = new MutationObserver(function(e) {
            for(var i in e) {
                if (e[i].addedNodes && e[i].addedNodes.length > 0) {
                    for (var k in e[i].addedNodes) {
                        if (e[i].addedNodes[k] instanceof Node && $(e[i].addedNodes[k]).hasClass('CommunityCornerModule')) {
                            no.disconnect();
                            mw.loader.using('jquery.makeCollapsible', makeColl);
                            return;
                        }
                    }//for added node
                }//if added nodes
            }//for mutation record
        });//mutation observer
        if ($('#WikiaRail').length) {
            no.observe($('#WikiaRail').get(0), {childList: true});
        }
    });//doc.rdy
}(jQuery)); //collapsing in the community corner


/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/
(function () {
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/servers/615655661379911839/embed.json";
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
            '<span>Discord</span>' + 
        '</h2>' +
        '<table>' +
            '<tbody>' +
                '<tr>' +
                    '<td style="vertical-align:middle; width:100%;">' +
                        '<p class="chat-name">' +
                            'Бормотуха — чат нашей вики в мессенджере <a href="https://ru.wikipedia.org/wiki/Discord" target="_blank">Discord</a>' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Atom RPG" src="https://vignette.wikia.nocookie.net/atom-rpg/images/f/fc/Atom_512.png/revision/latest/scale-to-width-down/480?cb=20180728074149&path-prefix=ru" class="discord-server-icon">' +
                            '<span>В сети: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Войти в чат</button>' +
                        '</center>' +
                      '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<hr/>' +
                        '<h4 class="discord-online">Пользователи онлайн <div class="discord-chevron" style="float: right"></div></h4>' +
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

// Дополнительные кнопки панели редактирования
 
   if ( mwCustomEditButtons ) 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/central/images/1/16/Button_reflink_alternate.png/revision/latest?cb=20080220213803",
    "speedTip": "Добавить сноску",
    "tagOpen": "<ref>",
    "tagClose": "</ref>",
    "sampleText": "Название сноски"
};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/f/f2/Ref_name_button.png/revision/latest?cb=20131205151742",
    "speedTip": "Повторная сноска",
    "tagOpen": "<ref name=Название>",
    "tagClose": "</ref>",
    "sampleText": "Название повторной сноски"
};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/cb/Button_wikipedia.png/revision/latest?cb=20081020115941",
    "speedTip": "Ссылка на статью в Википедии",
    "tagOpen": "[[wikipedia:ru:|",
    "tagClose": "]]",
    "sampleText": ""
};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
    "speedTip": "Добавить галерею",
    "tagOpen": "<gallery>",
    "tagClose": "</gallery>",
    "sampleText":""
}; 
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png/revision/latest?cb=20070329065451",
    "speedTip": "Добавить шаблон",
    "tagOpen": "{{",
    "tagClose": "}}",
    "sampleText": "Название шаблона"
};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anführung.png",
    "speedTip": "Добавить цитату",
    "tagOpen": "{{Цитата|",
    "tagClose": "||}}",
    "sampleText": ""
};
 

    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0e/Button_acute_accent.png",
    "speedTip": "Ударение",
    "tagOpen": "́",
    "tagClose": "",
    "sampleText": ""
};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/5/56/Button_big.png/revision/latest?cb=20081020113952",
    "speedTip": "Крупный шрифт",
    "tagOpen": "<big>",
    "tagClose": "</big>",
    "sampleText": ""
};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/5/58/Button_small.png/revision/latest?cb=20081020113836",
    "speedTip": "Мелкий шрифт",
    "tagOpen": "<small>",
    "tagClose": "</small>",
    "sampleText": ""
};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/f/fd/Button_underline.png/revision/latest?cb=20081020114112",
    "speedTip": "Подчёркнутый текст",
    "tagOpen": "<u>",
    "tagClose": "</u>",
    "sampleText": ""
};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/c9/Button_strike.png/revision/latest?cb=20070324060207",
    "speedTip": "Зачёркнутый текст",
    "tagOpen": "<s>",
    "tagClose": "</s>",
    "sampleText": ""
};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/d/d5/Button_noinclude.png/revision/latest?cb=20070329065148",
    "speedTip": "Скрыть категорию шаблона в статьях",
    "tagOpen": "<noinclude>",
    "tagClose": "</noinclude>",
    "sampleText": "На место этого текста вставьте категорию"
};
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png",
    "speedTip": "Перенос строки",
    "tagOpen": "<br>",
    "tagClose": "",
    "sampleText": ""
};
 
 
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/7/74/Button_comment.png/revision/latest?cb=20070324060240",
    "speedTip": "Скрытый комментарий",
    "tagOpen": "<!--",
    "tagClose": "-->",
    "sampleText": "Добавьте комментарий"
};