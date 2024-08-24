/* C�digo base cedido pela Five Nights at Freddy's Wiki */
/* Revelar IP An�nimo */
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};



/* Atualiza��o Autom�tica */
window.ajaxPages = [
    "Especial:RecentChanges",
    "Especial:Watchlist",
    "Especial:Log",
    "Especial:Contributions",
    "Especial:WikiActivity"
];
window.AjaxRCRefreshText = 'Atualiza��o autom�tica';
window.AjaxRCRefreshHoverText = 'Atualizar a p�gina automaticamente';



/* Rel�gio da Wiki */
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{de Jan;de Fev;de Mar;de Abr;de Maio;de Jun;de Jul;de Ago;de Set;de Out;de Nov;de Dez}m de %Y (GMT -3)';



/* Configura��o de Tags de Usu�rio */
/* Tags existentes */
window.UserTagsJS = {
	modules: {},
	tags: {
        founder: {u:'Fundador'},
        bureaucrat: {u:'Burocrata'},
        sysop: {u: 'Administrador'},
        rollback: {u: 'Rollbacker'},
        chatmoderator: {u: 'Moderador do Chat'},
        contentmoderator: {u: 'Moderador de Conte�do'},
        threadmoderator: {u: 'Moderador de Discuss�es'},
        bot: {u: 'Bot'},
        designer: {u: 'Designer'},
        newuser: {u:'Novo Editor'},
        inactive: {u: 'Inativo'},
        geralsupervisor: {u: 'Supervisor Geral'},
        blogsupervisor: {u: 'Supervisor de Blog'},
        forumsupervisor: {u: 'Supervisor de F�rum'},
        chatsupervisor: {u: 'Supervisor de Chat'},
        revisor: {u: 'Revisor de Conte�do'},
	}
};

/* Adicionar Tags */
UserTagsJS.modules.custom = {
	'MegaBatataLord': ['founder', 'designer', 'geralsupervisor', 'bureaucrat'],
};

/* For�ar a Tag referente aos grupos abaixo */
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
    'newuser'
];

/* Tirar Tag X dos grupos Y */
UserTagsJS.modules.metafilter = { 
    sysop: ['bureaucrat', 'founder'],
    chatmoderator: ['sysop', 'bureaucrat'],
    rollback: ['sysop'],
    newuser: ['chatmoderator'],
};

/* Configura��es Gerais */
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 60; // Precisa estar Inativo por 60 dias
UserTagsJS.modules.newuser = {
	days: 2, // Precisa estar na Wiki por 2 dias
	edits: 7, // E precisa de 7 edi��es para tirar a tag
	namespace: 0 // Edi��es precisam ser em artigos para contar
};



/* Mensagem de Bloqueio Autom�tica */
window.MessageBlock = {
  title : 'Bloqueado',
  message : 'Voc� foi bloqueado por $2 pelo(s) seguinte(s) motivo(s): "$1"',
  autocheck : true
};



/* Editado por �ltimo */
window.lastEdited = {
    avatar: true
};

/* Substitui {{USERNAME}} pelo nome do usu�rio que est� vendo a p�gina. */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);