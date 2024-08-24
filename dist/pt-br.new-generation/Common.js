window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

/* Configura��o de Tags de Usu�rio */
/* Tags existentes */
window.UserTagsJS = {
	modules: {},
	tags: {
        founder: {u:'Fundadora'},
        bureaucrat: {u:'Burocrata'},
        sysop: {u: 'Administrador'},
        rollback: {u: 'Rollbacker'},
        chatmoderator: {u: 'Moderador de Chat'},
        contentmoderator: {u: 'Moderador de Conte�do'},
        threadmoderator: {u: 'Moderador de Discuss�es'},
        bot: {u: 'Bot'},
        designer: {u: 'Designer'},
        newuser: {u:'Novo Editor'},
        inactive: {u: 'Inativo'},
        montheditor: {u: 'Editor do M�s'},
        geralsupervisor: {u: 'Supervisor Geral'},
        blogsupervisor: {u: 'Supervisor de Blog'},
        forumsupervisor: {u: 'Supervisor de F�rum'},
        chatsupervisor: {u: 'Supervisor de Chat'},
        revisor: {u: 'Revisor de Conte�do'},
	}
};
 
/* Adicionar Tags */
UserTagsJS.modules.custom = {
	'Kimberly Br': ['founder', 'designer', 'geralsupervisor', 'bureaucrat'],
	'PandaLoko': ['revisor', 'chatsupervisor']
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