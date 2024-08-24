/**abstengase a tomar los codigos sin antes pedir permiso o dar creditos a este lugar**/
// Permitir imagenes y videos en chat tags //
 
var chatags = { images: true, videos: true };
 
// Nunca se pone nada debajo de import articles 
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatTags/code.js',
        'MediaWiki:Tags.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:ChatSendButton.js',
        'u:dev:NewMessageCount.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
    ]
});

/* Chat Status */

window.ChatStatus = {
	statuses: {
	    afk: "AFK",
	    edit: "Trabajando",
	    book: "Relax Zone",
	    code: "Dando Cáncer",
		homo: "Stoi haucente xd",
		food: "meehhp",
		ufo: "U ar UFO?",
		tv: "Aim UFO",
		google: "Error 404 Not Found",
		cake: "Being retarded",
		game: "FredZone",
		star: "LoLeando",
		notsoos: "Feoh durmiente",
		
	},
	debug: false
};


/* Day/Night Switch Feature */ 

importScriptPage('MediaWiki:Day/Night chat/code.js', 'dev');

//Switch to night button
var night_button = '¡Buenas Noches,Ooarai!';
 
//Switch to day button
var day_button = '¡Buenos Días,Ooarai!';
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = 'blue';
 
  //All text Color
    var textColor = 'Black';
 
  //Self text background color
    var selfTextColor = 'none';
 
  //Chat background color
    var backgroundColor = 'Olive';
 
  //Chat foreground color
    var foregroundColor = 'Olive';
 
  //User stats foreground color
    var userStatsColor = 'none';
 
//END NIGHT Chat color scheme