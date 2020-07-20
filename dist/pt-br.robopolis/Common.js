/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
/* Revelar IP Anônimo */
 window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
 
/* Atualização Atuomatica */
window.ajaxPages = ["Especial:RecentChanges","Especial:Watchlist","Especial:Log","Especial:Contributions","Especial:WikiActivity"];
window.AjaxRCRefreshText = 'Atualização automática';
window.AjaxRCRefreshHoverText = 'Atualiza a página automaticamente';
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

/* Relógio da Wiki */
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{Janeiro;Fevereiro;Março;Abril;Maio;Junho;Julho;Agosto;Setembro;Outubro;Novembro;Dezembro}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});

/* mensagem de bloqueio */
var MessageBlock = {
  title : 'Bloqueado',
  message : 'Você foi bloqueado por $2 pelo(s) seguinte(s) motivo(s): "$1"',
  autocheck : true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});

/* Emoticons */
importScriptPage('AjaxEmoticons/code.js', 'dev');

/* Mensagem do Mural */
 importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

/* User Tags */
window.UserTagsJS = {
	modules: {},
	tags: {
                // group: { associated tag data }
		bureaucrat: { u:'Burocrata'},
                newuser: { u:'Novo Editor'},
                coder: { u:'Codificador'},
                founder: {u:'Fundador'},
                supervisor: {u:'Supervisor'},
                sysop: {u: 'Administrador'},
                rollback: {u: 'Rollbacker'},
                chatmoderator: {u: 'Moderador do Chat'},
                montheditor: {u: 'Editor do Mês'},
                designer: {u: 'Designer'},
                inactive: {u: 'Inativo'}
          }
};
UserTagsJS.modules.custom = {
	'Cratera': ['coder'], // Add coder
        
};
UserTagsJS.modules.userfilter = {
        'Cratera': ['bureaucrat']
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
//===================================================================