/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

//GUZIK ODŚWIEŻAJĄCY
PurgeButtonText = 'Odśwież';
importScriptPage('PurgeButton/code.js', 'dev');




// Zmienia napisy grupom: biurokrata->"Admin"  sysop->"Moderator"
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
                bureaucrat: { u:'Administrator'},
		sysop: { u:'Moderator' },
                bot: { u:'Bot' }
	}
};

// Włącza wyświetlanie grup Biurokraty i Sysopa na stronie profilowej
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback'];


// Usuwa wyświetlanie grupy "sysop" (Moderator) Biurokratom (Administratorom)
// Usuwa wyświetlanie grupy "rollback" sysopom (Moreratotom) i Biurokratom (Administratorom)
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'], 
	'rollback': ['bureaucrat', 'sysop'], 
};

// Wprowadza uprzednio wprowadzone zmiany w grupach
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});


UserTagsJS.modules.custom = {
	'Fandubbing.wikia': ['bot'], // Add bot flag
};

//Dodaje opcje zmieniania wyświetlanego tytułu strony

importArticles({
    type: 'script',
    articles: [
        //...
        'w:c:dev:DISPLAYTITLE/code.js',
        //...
    ]
});

//Search suggestions 

importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});

//WAll greetings

importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});