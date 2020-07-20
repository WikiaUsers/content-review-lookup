/* Códigos cedidos pela Five Nights at Freddy's Wiki */

/* Atualização Automática */
window.ajaxPages = [
    "Especial:RecentChanges",
    "Especial:Watchlist",
    "Especial:Log",
    "Especial:Contributions",
    "Especial:WikiActivity"
];
window.AjaxRCRefreshText = 'Atualização automática';
window.AjaxRCRefreshHoverText = 'Atualizar a página automaticamente';

/* Configuração de Tags de Usuário */
/* Tags existentes */
window.UserTagsJS = {
	modules: {},
	tags: {
        founder: {u:'Fundador'},
        bureaucrat: {u:'Burocrata'},
        sysop: {u: 'Administrador'},
        rollback: {u: 'Rollbacker'},
        chatmoderator: {u: 'Moderador de Chat'},
        contentmoderator: {u: 'Moderador de Conteúdo'},
        threadmoderator: {u: 'Moderador de Discussões'},
        bot: {u: 'Bot'},
        designer: {u: 'Designer'},
        newuser: {u:'Novo Editor'},
        inactive: {u: 'Inativo'},
	}
};

/* Forçar a Tag referente aos grupos abaixo */
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

/* Configurações Gerais */
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 60; // Precisa estar Inativo por 60 dias
UserTagsJS.modules.newuser = {
	days: 2, // Precisa estar na Wiki por 2 dias
	edits: 7, // E precisa de 7 edições para tirar a tag
	namespace: 0 // Edições precisam ser em artigos para contar
};

/* Mensagem de Bloqueio Automática */
window.MessageBlock = {
  title : 'Bloqueado',
  message : 'Você foi bloqueado por $2 pelo(s) seguinte(s) motivo(s): "$1"',
  autocheck : true
};

/* Editado por Último */
window.lastEdited = {
    avatar: true
};

/* Substitui {{USERNAME}} pelo nome do usuário que está vendo a página. */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 });