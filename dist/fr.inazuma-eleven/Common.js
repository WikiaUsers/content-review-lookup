/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
importArticles({
	type: "script",
	articles: [
]
});

importScriptPage('AjaxBatchDelete/code.js', 'dev');

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

window.MassCategorizationGroups = ['sysop'];