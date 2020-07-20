/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
// Importy

importArticles({
    type: 'script',
    articles: [
        'w:dev:MediaWiki:WallGreetingButton/code.js',
        'w:c:dev:ReferencePopups/code.js'
    ]
});

// Szablon USERNAME
// Kod z Centrum Społeczności
$(function() {
	if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) return;
	$("span.insertusername").text(mw.config.get('wgUserName'));
});