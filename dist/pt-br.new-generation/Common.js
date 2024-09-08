window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
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
        geralsupervisor: {u: 'Supervisor Geral'},
        blogsupervisor: {u: 'Supervisor de Blog'},
        forumsupervisor: {u: 'Supervisor de Fórum'},
        chatsupervisor: {u: 'Supervisor de Chat'},
        revisor: {u: 'Revisor de Conteúdo'},
	}
};
 
/* Adicionar Tags */
UserTagsJS.modules.custom = {
	'Kimberly Br': ['founder', 'designer', 'geralsupervisor', 'bureaucrat'],
	'PandaLoko': ['revisor', 'chatsupervisor']
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