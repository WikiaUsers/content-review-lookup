importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

window.UserTagsJS = {
	modules: {},
	tags: {
        sysop:{ u:'Admin', m:'Administrateur', f:'Administratrice' },
	}
};
 
UserTagsJS.modules.custom = {
    '%C3%89rinyes' : [ 'sysop' ],
    'Radagast_l%27animal' : ['sysop']
};

UserTagsJS.modules.inactive = {
	days: 30, // 30 jours
	namespaces: [0], // Modifications uniquement dans l'espace de noms principal
	zeroIsInactive: true // 0 modifications est considéré comme inactif
};