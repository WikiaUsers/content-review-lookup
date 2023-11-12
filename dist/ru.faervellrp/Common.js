/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/*---UserTags---*/
window.UserTagsJS = {
	modules: {},
	tags: {
		gamemaster: { u: 'GM', order: 30 },
		sysop: { u: 'Админ', order: -1}
	}
};
UserTagsJS.modules.custom = {
	'Remelnius': ['sysop'],
	'MAX_X_PRO': ['sysop, bureaucrat']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'threadmoderator', 'patroller', 'rollback', 'sysop', 'bot', 'bot-global', 'staff'];

switch ( mw.config.get('wgPageName') ) {
    case 'Тестовая_приватная_страница':
        importArticles({
        	type: 'script',
        	articles: 'MediaWiki:PrivatePage.js'
        });
        break;
}