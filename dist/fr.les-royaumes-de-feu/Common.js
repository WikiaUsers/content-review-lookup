//discussEmbed-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
window.discussEmbedForum = "3692388249763968964";
window.discussEmbedLimit = 3;
window.discussEmbedSortTrending = 0;
//HeaderLinks
importArticles({
    type: "style",
    articles: [
        "w:c:dev:Highlight/code.css"
    ]
});

//UserTags----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }*
		// sysop: { u: 'Admin' },
		// inactive: { u: 'Rien Modifié Récemment' },
		bureaucrat: { order: 1 }, // Normal order is 0
		inactive_bureaucrat: { u:'Bureaucrate inactif' },
		inactive_sysop: { u:'Administrateur inactif' },
		inactive_sysop_bureaucrat: { u:'Administrateur/Bureaucrate inactif' },
		
		templates: { u:'Modèles', title:'Créateur de Modèles', order: 100 },
		theme: { u:'Thèmes', title:'Créateur de Thèmes', order: 101 },
		Refmaker: { u:'Refmaker', order: 102 }
	}
};

UserTagsJS.modules.metafilter = false;

UserTagsJS.modules.inactive = 35; // inactif après 35 days lour sans modification

UserTagsJS.modules.autoconfirmed = true; // Nouveau compte

UserTagsJS.modules.newuser = { //Nouveau contributeurs 
	days: 5, // Must have been on the Wiki for 5 days
	edits: 15, // And have at least 15 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.implode = {
	'inactive_bureaucrat': ['bureaucrat', 'inactive'], // Adds 'inactive-bureaucrat' BUT also removes bureaucrat and inactive
	'inactive_sysop': ['sysop', 'inactive'],
	'inactive_sysop_bureaucrat': ['sysop', 'bureaucrat', 'inactive'],
};

UserTagsJS.modules.userfilter = {
	'Écume des ailes de mer': ['inactive_sysop', 'inactive_bureaucrat'], // Remove the inactive_sysop and inactive_bureaucrat groups
	'Intempérie': ['inactive_sysop', 'inactive_bureaucrat'], 
	'TFWolf': ['inactive_sysop', 'inactive_bureaucrat'], 
};

UserTagsJS.modules.custom = {
	'TFWolf': ['theme', 'templates'], 
	'Queen Galaxy of the NightWings': ['Refmaker'], 
//	'UserName 3': ['featured', 'templates'], // Add Featured + Templates Guru
//	'UserName 4': ['inactive'] // Always Inactive
};
// Dragon anon avatars png------------------------------------------------------------------------------------------------------------------------------------------------------------
function changeSourceAll() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.includes('https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/')) {
            images[i].src = images[i].src.replace("https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/28/height/28", "https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/28/height/28");
            images[i].src = images[i].src.replace("https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/400/height/400", "https://static.wikia.nocookie.net/wings-of-fire-experimental/images/d/d4/Anonymous_SilkWing_Wiki.png/revision/latest?cb=20190914234814");
        }
    }
}
changeSourceAll();
 
setInterval(function(){
    changeSourceAll();
}, 1000);

//SpoilerAlert------------------------------------------------------------------------------------------------------------------------------------------------------------------------
window.SpoilerAlertJS = {
   question: 'Cette zone contient des spoilers. Êtes-vous sûr de vouloir le lire ?',
   yes: 'oui',
   no: 'non',
   fadeDelay: 500
};

//BackToTopButton---------------------------------------------------------------------------------------------------------------------------------------------------------------------
window.BackToTopArrow = false;

//HeaderLinks-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
window.HeaderLinksCopyOnClick = true;

//EditorColorPicker-------------------------------------------------------------------------------------------------------------------------------------------------------------------
window.ecpButton = true;