/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

window.AddRailModule = [{prepend: true}];

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Direction', m:'Directeur', f:'Directrice' },
		inactive: { u: 'A quitté l Agence' },
		newuser: {u: 'Nouvelle idole'},
	}
};

/* Modèle:Spoiler/Galerie */
var _alert = ".spoiler-alert";
$(_alert).next("div").hide();
 
$(_alert + " span").click(function() {
    $(this).attr('id') === "y" ?
        $(this).parents(_alert).next("div").fadeIn() :
        $(this).parents(_alert).next("div").hide();
    $(this).parents(_alert).hide();
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BlogLink/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ColorPreview/code.js',
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DeepLTranslate/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DisableAccessKeys.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Flags/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:NewImages.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PortableListUsers.js',
    ]
});

window.railWAM = {
    logPage:"Project:WAM Log"
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SearchEnhancements.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UnhideUserMasthead/code.js',
    ]
});