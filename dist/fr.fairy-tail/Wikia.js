
	if(mw.config.get('wgNamespaceNumber') === 0) {
    importArticles({
        type: "script",
        articles: [
            "u:fr.naruto:MediaWiki:Common.js/CategoriesSort.js"
        ]
    });
}

//Ajout du calendrier en haut de l'activité du wiki
window.AddRailModule = [{prepend: true}];

//Profile Tags config
(window.dev = window.dev || {}).profileTags = {
    noHideTags: true
};

/* Ajout de la classe activetab  à l'onglet actif de la ParentTab Portable */
$(".pi-theme-parenttab .mw-selflink").parent().addClass('activetab');