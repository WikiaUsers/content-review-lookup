/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:PreloadTemplates.js"
    ]
});

function switchApplyPreload() {
	if($('.ve-ui-surface-visual').length) {
		$('#preload-templates').prepend('<p id="preload_message">Pré carregar não funciona no editor visual, mude para editor de código</p>');
		$('#pt-list').attr("disabled", true);
	}
	else {
		$('#preload_message').remove();
		$('#pt-list').attr("disabled", false);
	}
}
mw.hook("wikipage.content").add(function($content) {
	switchApplyPreload();
});