// ******************************************************************
//                        USER TAGS
// ******************************************************************
 window.UserTagsJS = {
	modules: {},
	tags:    {}
    };
 
    UserTagsJS.modules.inactive      = 30;
 
    UserTagsJS.modules.mwGroups = [
        'bureaucrat',
        'chatmoderator',
        'patroller',
        'rollback',
        'sysop',
        'bannedfromchat',
        'bot',
        'bot-global',
    ];
 
    UserTagsJS.modules.metafilter = {
	sysop:         ['bureaucrat', 'founder'],
	bureaucrat:    ['founder'],
	chatmoderator: ['sysop', 'bureaucrat'],
        rollback:      ['sysop', 'bureaucrat']
    };

// ******************************************************************
//                     BLOQUEO DE BLOGS Y FOROS - No me furrula D: -
// ******************************************************************
window.LockForums = {
    expiryDays: 60,
    expiryMessage: "Este foro ha sido archivado ya que no ha sido contestado en 60 días o más.",
    forumName: "Índice"
};

importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockForums/code.js"
    ]
});

window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "Este blog ha sido archivado ya que no ha sido contestado en 60 días o más.",
    nonexpiryCategory: "Noticias"
};

importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});

// ******************************************************************
//                     IMPORTS
// ******************************************************************
importScriptPage('WikiaNavBarHider/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
	'u:dev:SearchSuggest/code.js',
        'w:c:dev:UserTags/code.js',
	'u:dev:WallGreetingButton/code.js',
	'u:dev:RevealAnonIP/code.js',
    ]
});

// ******************************************************************
// NOMBRE DEL USUARIO
// ******************************************************************
// Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
// o la [[Plantilla:NOMBREUSUARIO]]
// Traída inicialmente de Uncyclopedia y corregida por 
// uncyclopedia:es:user:Ciencia Al Poder ,
// para que funcione correctamente usando ''class='' en vez de ''id=''.
// ******************************************************************
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);