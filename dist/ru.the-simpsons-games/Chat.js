// Original: w:c:ru.elderscrolls:MediaWiki:Chat.js*/
$(function() {
    if ($('#HeadLineBar').length) {
        return;
    }
    var headline_styles = 'display:inline-block; width:300px; font-size:12px; text-align:center; line-height:14px; padding:7px 0; color:white; font-weight:bold; position:absolute; right:170px;';
    var headline_bar = '<div id="HeadLineBar" style="' + headline_styles + '">Добро пожаловать в чат The Simpsons:Hit and Run wiki!</br><a href="/wiki/The_Simpsons:_Hit_%26_Run_Вики/Правила" target="_blank">Правила</a> &bull; <a href="/wiki/Special:Listadmins" target="_blank">Админы</a> &bull;  <a href="/wiki/Special:ListUsers/chatmoderator" target="_blank">Модераторы</a> &bull;  <a href="/wiki/The_Simpsons_Hit_%26_Run_Вики:Чат" target="_blank">Инфо</a></div>';
    $('.ChatHeader > .wordmark').append(headline_bar);
});
/*ChatTags*/
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
 
// Wait until object will be in loaded or in scope.
var checkExist = setInterval(function() {
    if (typeof chatags === 'undefined') {
        return;
    }
 
    chatags.tags['wd'] = function(s,t) {  
        return (t.charAt(0) === '/') ? 
            s.replace('[/wd]', '</span>') :
            s.replace('[wd]', '<span style="font-family: Wingdings">');
    };
    clearInterval(checkExist);
}, 1000);

/* Day/Night */
//Switch to night button
var night_button = 'Ночной Чат';
 
//Switch to day button
var day_button = 'Дневной Чат';

//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = 'blue';
 
  //All text Color
    var textColor = '#FFFFFF';
 
  //Self text background color
    var selfTextColor = 'black';
 
  //Chat background color
    var backgroundColor = '#000000';
 
  //Chat foreground color
    var foregroundColor = 'black';
 
  //User stats foreground color
    var userStatsColor = 'none';
 
//END NIGHT Chat color scheme

importScriptPage('MediaWiki:Day/Night chat/code.js', 'dev');

/* Options */
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

/* Emoticons Window */
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
    ]
});
window.kockaEmoticons = {
    vocab: {
        emoticons: "Смайлики",
        close: "Закрыть"
    },
    help: "Кликни на смайлик, чтобы выбрать его!"
};

/* ChatAnnouncements */
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
chatAnnouncementsAll = false;