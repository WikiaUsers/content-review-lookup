/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
 
/*
    Affiche plusieurs titres sur les pages utilisateur.
*/
 window.UserTagsJS = {
        modules: {},
        tags: {
        founder: { u: 'Fondateur' },   
        bureaucrat: { u: 'Scream King', order:1 }, 
        sysop: { u: 'Administrateur', order:2 },
		c: { u: 'Designer', order:3 },
	},
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bannedfromchat', 'rollback', 'chatmoderator', 'bot'];
 
UserTagsJS.modules.custom = {
	'Neyiox': ['c'],
};
 
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

// =================================================================================================== //
// ====================================== SPOILER ALERT : START ====================================== //
// =================================================================================================== //
SpoilerAlert = {
  question: 'Cette page contient pas mal de Spoilers. Voulez-vous quand-même continuer ?',
  yes: 'OUI! Maintenant!',
  no: 'Non, je préfère attendre..',
  pages: ["Spoilers"],
  categories: "Spoilers",
  isSpoiler: function () {
        var h2s = document.getElementsByTagName('h2');
        for (var i = 0, c = h2s.length; i < c; i++) {
            if (/Spoilers/i.test($(h2s[i]).text())) return true;
        }
        return false;
    }
}

importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.js"
    ]
});
importScriptPage('SpoilerAlert/code.js', 'dev');

// =================================================================================================== //
// ======================================= SPOILER ALERT : END ======================================= //
// =================================================================================================== //