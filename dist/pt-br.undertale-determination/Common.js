/* Revelar IP Anônimo */
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};



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



/* Relógio da Wiki */
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{de Jan;de Fev;de Mar;de Abr;de Maio;de Jun;de Jul;de Ago;de Set;de Out;de Nov;de Dez}m de %Y (GMT -3)';



/* Estilização - Trancar Fórums */
window.LockForums = {
    expiryDays: 7,
    expiryMessage: "Este tópico foi considerado arquivado pois não há novos comentários há mais de 7 dias.",
    forumName: "Fórum" 
};



/* Configuração de Tags de Usuário */
/* Tags existentes */
window.UserTagsJS = {
	modules: {},
	tags: {
        founder: {u:'Fundadora'},
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
        montheditor: {u: 'Editor do Mês'},
	}
};

/* Adicionar Tags */
UserTagsJS.modules.custom = {
	'Soul Wade': ['founder', 'designer', 'bureaucrat'],
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



/* Configurações do Mass Protect */
window.massProtectDelay = 1000;



/* Configurações do PageRenameAuto-update */
window.PRAoptions = {
    editSummary: 'Atualizando página (processo automático)'
};



/* Configurações do FileRenameAuto-update */
window.LIRoptions = {
    bottomMessage: '',
    editSummary: 'Atualizando links para arquivos (processo automático)',
    singleButtonText: 'Renomear e Atualizar',
    queueButtonText: 'Colocar na Fila',
    delay: 1000
};



/* Configurações do Link Sweeper (limpador de links) */
linkSweepConfirmation = true;
LinkSweeperDelay = 1000;



/* Substitui {{USERNAME}} pelo nome do usuário que está vendo a página. */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);


/* Link Sweeper (limpador de links) */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Linksweeper/code.js'
    ]
});