/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage( 'AjaxRC/code.js', 'dev' ); // AJAX-обновление некоторых страниц
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление страницы'; //Отображаемое название
 
importScriptPage( 'PurgeButton/code.js', 'dev' ); // Кнопка очистки кэша страницы
var PurgeButtonText = 'Обновить'; //Отображаемое название
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:RevealAnonIP/code.js',
        'w:c:dev:UserTags/code.js',
        'w:c:dev:AjaxRC/code.js',
    ]
});
 
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { u:'Бюрократ'},
                weekwinner: { u:'Участник недели'},
                monthwinner: { u:'Участник месяца'},
                newuser: { u:'Новый бульдог'},
                zamgl: { u:'Заместитель главного грозного бульдога'},
                guard: {u:'Бульдог-охранник'},
                founder: {u:'Самый грозный бульдог'},
                moder: {u:'Модератор'},
                chatmoder: {u:'Сторож будки'},
                fanonmoder: {u:'Бульдог фанона'},
                gladm: {u:'Главный грозный бульдог'},
                help: {u:'Администратор - техник'},
                glmod: {u:'Главный модератор'},
                zammod: {u:'Заместитель главного модератора'},
                painter: { u:'Дизайнер'},
                adm: {u:'Администратор'},
                quizwinner: {u:'Победитель конкурса "Ваш выдуманный бульдог"'},
	}
};
UserTagsJS.modules.custom = {
        'Бульдог': ['founder'],
        'Гигантский харвестер': ['quizwinner'],
        'Zef11': ['adm', 'bureaucrat'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'threadmoderator', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser', 'adm'];
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'founder', 'adm'], chatmoderator: ['sysop', 'bureaucrat', 'rollback'], rollback: ['sysop'], poweruser: ['chatmoderator', 'bannedfromchat'], }
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 50; // 50 days
UserTagsJS.modules.newuser = {
	days: 2, // Must have been on the Wiki for 2 days
	edits: 5, // And have at least 5 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.userfilter = {
	    'English Bulldog': ['bureaucrat', 'threadmoderator', 'chatmoderator'],
	    'Эркюль': ['newuser', 'threadmoderator'],
	    'Dragon Spyro': ['newuser', 'threadmoderator', 'chatmoderator'],
	    'GodMsTutorialfan': ['threadmoderator', 'chatmoderator', 'newuser', 'sysop']
};
// ===================
// Добавление Префикса рядом с ником в Стене Обсуждений или комментарии под статьи
// Редактировать я вам категорический запрещаю, а то малая правка приведет к ошибке.
// По любым вопросом обращаться - GodMsTutorialfan.
// ===================
setInterval(function () {
    "use strict";
    $('.comments li.message blockquote .MiniEditorWrapper .edited-by a:not(.subtle)').each(function () {
        var $user = $(this).text();
        if ($user.match(/НИКУЧАСТНИКА/g)) {
            $(this).addClass('bureaucrat');
        }
        if ($user.match(/НИКУЧАСТНИКА/g)) {
            $(this).addClass('gvip');
        }
        if ($user.match(/НИКУЧАСТНИКА/g)) {
            $(this).addClass('svip');
        }
        if ($user.match(/НИКУЧАСТНИКА/g)) {
            $(this).addClass('bvip');
        }
        if ($user.match(/GodMsTutorialfan/g)) {
            $(this).addClass('gladm');
        }
        if ($user.match(/НИКУЧАСТНИКА/g)) {
            $(this).addClass('chatmoder');
        }
        if ($user.match(/HoRReS/g)) {
            $(this).addClass('rollback');
        }
        if ($user.match(/НИКУЧАСТНИКА/g)) {
            $(this).addClass('glmod');
        }
        if ($user.match(/Бульдог/g)) {
            $(this).addClass('founder');
        }
        if ($user.match(/Эркюль/g)) {
            $(this).addClass('moder');
        }
        if ($user.match(/GodMsTutorialfan/g)) {
            $(this).addClass('help');
        }
        if ($user.match(/НИКУЧАСТНИКА/g)) {
            $(this).addClass('zamgl');
        }    
    });
}, 1);
 
// MessageWallUserTags config
window.MessageWallUserTags = {
    tagColor: 'Ghostwhite',  //Tag color – The color of the tag's text
    glow: true,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '20px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: '#4B0082', //Glow color
    users: {
        'GodMsTutorialfan': 'Администратор',
        'Бульдог': 'Руководитель проекта',
 
    }
};
 //Неактивный участниr
InactiveUsers = { 
    months: 2,
    text: 'неактивный бульдог'
}
/* Статусы */
$(function() {
    var rights = {};
 
    //Участники недели
    rights["Рыбка"]      = ["Бульдог-эксперт"]
    if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            $('<span class="tag">' + rights[wgTitle][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
 
});

MastRights = {};

importScriptPage("MediaWiki:Masthead.js", "ru.c");