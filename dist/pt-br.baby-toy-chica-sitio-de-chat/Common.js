// RevealAnonIP
 
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
 
// Auto-refresh
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
 
//configurações do relógio
// dispõe um relógio de 24h seguido de dia, mês (pt-br)
// e ano com "(UTC)" no final
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{Janeiro;Fevereiro;Março;Abril;Maio;Junho;Julho;Agosto;Setembro;Outubro;Novembro;Dezembro}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
}); 
 
importArticles({
    type: "script",
    articles: [
        'u:dev:LastEdited/code.js'
    ]
});
 
// ==============================
importScriptPage('DupImageList/code.js', 'dev');
importArticles({
    type: 'script',
    articles: [
        //...
        'w:c:dev:FixMultipleUpload/code.js',
        //...
    ]
});
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});
importArticles({
    type: "script",
    articles: [
        "u:dev:LockForums/code.js"
    ]
});
importScriptPage('AjaxRC/code.js', 'dev');
 
window.UserTagsJS = {
	modules: {},
	tags: {
                // group: { associated tag data }
		bureaucrat: { u:'Best Friend For Ever da Baby'},
                newuser: { u:'Novo Amigo da Baby'},
                founder: {u:'Baby Toy Chica'},
                retired: {u:'Retired Founder'},
                supervisor: {u:'Supervisor'},
                sysop: {u: 'Amigo especial'},
                mod: {u: 'Amigo pentelho'},
                rollback: {u: 'Colega' },
                designer: {u: 'Designer'},
                inactive: {u: 'Ninguem sabe oq ta fazendo aqui'},
                coder: {u: 'Codificador'},
                codificador: {u: 'Codificador'},
          }
};
UserTagsJS.modules.custom = {
	'Ana_Cristina_Moreira_Matos': ['bureaucrat', 'codificador', 'coder'], // Add bureaucrat and coder
	'Baby_Toy_Chica': ['founder'], // Add founder
 
};
 
 
 
UserTagsJS.modules.userfilter = {
        'sss': ['sysop'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'founder'], chatmoderator: ['sysop', 'bureaucrat', 'rollback'], rollback: ['sysop'], newuser: ['chatmoderator', 'bannedfromchat'], }
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 60; // 60 dias
UserTagsJS.modules.newuser = {
	days: 2, // Precisa estar na Wiki por 2 dias
	edits: 7, // E precisa de 7 edições para tirar a tag
	namespace: 0 // Edições precisam ser em artigos para contar
};
 
//mensagem de bloqueio automatica
var MessageBlock = {
  title : 'Bloqueado',
  message : 'Você foi bloqueado $2 pelo(s) seguinte(s) motivo(s): "$1"',
  autocheck : true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});
 
//LastEdited config
window.lastEdited = {
    avatar: false
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:YoutubePlayer/code.js'
    ]
});
 
importScriptPage('ExternalImageLoader/code.js', 'dev');
importScriptPage('AjaxEmoticons/code.js', 'dev');
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:EditcountTag/code.js"
    ]
});
 
 importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});
 
// imports scripts
importScriptPage('ExternalImageLoader/code.js', 'dev');
//===================================================================