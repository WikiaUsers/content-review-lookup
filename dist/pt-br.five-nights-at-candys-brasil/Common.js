/* ERROR */

 window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};

/* WWE Luta Livre na TV */
window.ajaxPages = ["Especial:RecentChanges","Especial:Watchlist","Especial:Log","Especial:Contributions","Especial:WikiActivity"];
window.AjaxRCRefreshText = 'Atualização automática';
window.AjaxRCRefreshHoverText = 'Atualiza a página automaticamente';
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
/* ERROR */
window.lastEdited = {
    avatar: true
};
importScriptPage('ExternalImageLoader/code.js', 'dev');

/* ERROR */
 importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});
//===================================================================
/* User Tags */
window.UserTagsJS = {
	modules: {},
	tags: {
                // groupos de usuários }
                bureaucrat: {u:'Burocrata'},
                newuser: {u:'Visitante'},
                founder: {u:'Criador da Wiki'},
                sysop: {u: 'ADMIN'},
                rollback: {u: 'Rollbacker'},
                chatmoderator: {u: 'Moderador do Chat'},
                montheditor: {u: 'Editor do Mês'},
                designer: {u: 'Designer'},
                threadmoderator: {u: 'Moderador'},
                inactive: {u: 'Inativo'}
          }
};
window.lastEdited = {
    avatar: true,
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:LastEdited/code.js'
    ]
});