/* C�digos JavaScript aqui colocados ser�o carregados por todos aqueles que acessarem alguma p�gina deste wiki */
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:PreloadTemplates.js"
    ]
});

function switchApplyPreload() {
	if($('.ve-ui-surface-visual').length) {
		$('#preload-templates').prepend('<p id="preload_message">Pr� carregar n�o funciona no editor visual, mude para editor de c�digo</p>');
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