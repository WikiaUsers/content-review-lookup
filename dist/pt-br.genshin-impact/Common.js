/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:PreloadTemplates.js"
    ]
});

function switchModeToApplyPreload() {
	var ptList = document.getElementById('pt-list');
	if (ptList) {
		ptList.change(function() {
			console.log("pt-list");
            // var $this = $(this),
            //     val = $this.val();

            // // Restore default option
            // $this.find('option:first-child').prop('selected', true);

            // // Preload the template on click
            // getPreloadPage(val);
            })
	}
}
mw.hook("wikipage.content").add(function($content) {
   console.log("meu teste");
	switchModeToApplyPreload();
});