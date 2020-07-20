/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
//InterlanguageFlags
importArticles({
    type: "style",
    articles: [
        "w:c:dev:InterlanguageFlags/code.css"
    ]
});

window.UserTagsJS = {
	modules: {},
	tags: {}
};

UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.inactive = 30; //Ajoute "Inactif" si aucun edit en 1 mois (30 jours)
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'content-moderator',
    'chatmoderator',
    'inactive',
    'bot',
    'user',
    'council',
    'threadmoderator',
    'vanguard',
];
UserTagsJS.modules.userfilter = {
	'V-Jump Wiki': ['inactive'] // V-Jump Wiki n'est jamais affiché inactif, même s'il devrait l'être
};
UserTagsJS.modules.implode = {
	'admin-inactif': ['sysop', 'inactive'], // Retire Admin et inactifs, s'ils sont présents, et ajoute "Admin Inactif"
	'rollback-inactif': ['inactif'] //Idem (spécificité des modos "apprenti héros")
};

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];