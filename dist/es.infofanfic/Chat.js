importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
importScriptPage('ChatTags/code.js', 'dev'); 
var chatags = { images: true, videos: true };

importScriptPage('MediaWiki:Emoticons/code.js', 'kocka');
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js', // ChatHacks
    ]
});

/* Day/Night Switch Feature (dev.wikia) */ 
 
importScriptPage('MediaWiki:Day/Night chat/code.js', 'dev');
 
//Switch to night button
var night_button = 'Botón de Chat Nocturno';
 
//Switch to day button
var day_button = 'Botón de Chat Diurno';
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = 'blue';
 
  //All text Color
    var textColor = 'White';
 
  //Self text background color
    var selfTextColor = 'none';
 
  //Chat background color
    var backgroundColor = 'FF0000';
 
  //Chat foreground color
    var foregroundColor = 'Green';
 
  //User stats foreground color
    var userStatsColor = 'none';
 
//END NIGHT Chat color scheme