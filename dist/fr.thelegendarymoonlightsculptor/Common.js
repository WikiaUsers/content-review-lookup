/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */


/**** Import ****/
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:ActiveTabs/code.js",
        'u:dev:Mediawiki:Tabs/code.js',
    ]
});

/**** Onglet  ****/
$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})