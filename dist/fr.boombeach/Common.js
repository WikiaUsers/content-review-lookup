var WikiaNotificationMessage = "Rejoignez la force spéciale du wiki Boom Beach ! Elle est ouverte pour tous les niveaux 35 et plus dès 200 médailles. Nom : Boom Beach Wiki Identifiant : #VQ0RLJJ<br>Pour ceux qui n'auraient le niveau requis, il y a la team école qui vous accompagnent. Nom : BB Wiki Ecole Identifiant : #2PYUUPUJ";
importScriptPage('WikiaNotification/code.js', 'dev');
// By English Boom Beach Wiki
$(function() {
   var elem = $('div.protection-image');
 
   if (typeof elem === 'undefined')
      return;
 
   // Relocate it and make it appear 
   var btn = $('.wikia-button.comments.secondary');
 
   if (typeof btn !== 'undefined') {
      btn.after(elem);
   }
   else {
      btn = $('#WikiaMainContentContainer .wikia-menu-button');
      btn.after(elem);
   }
   elem.addClass('protection-image-visible');
   elem.removeClass('protection-image');
});
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
/* End of the {{USERNAME}} replacement */
// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: { u:'Patrouilleur' },
		bureaucrat: { u:'Bureaucrate' },
		montheditor: { u:'Éditeur du mois', f:'Éditrice du mois' },
                sysop: { u:'Admin', f:'Administratrice', m:'Administrateur' },
                'Protecteur du wiki': { u:'Protecteur du wiki' },
                'Administrateur inactif': { u:'Administrateur inactif' },
                founder: { u:'Fondateur' }
	}
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = {
	days: 5, // est présent depuis moins de 5 jours
	edits: 15, // à fait moins de 15 édits
	namespace: 0 // Les édits doivent être faits sur des articles
};
UserTagsJS.modules.inactive = 60; // Inactif au bout de 60 jours sans modifications 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'founder'];
// Ajoute le groupe bureaucrat aux bureaucrates
UserTagsJS.modules.metafilter = {
	rollback: ['sysop'], // retire le groupe rollback aux admins
	chatmoderator: ['sysop'], // retire le groupe modérateur du tchat aux admins
	sysop: ['bureaucrat'], // retire le groupe admins aux bureaucrates
	bureaucrat: ['founder'] // retire le groupe bureaucrates au fondateur
};
UserTagsJS.modules.userfilter = {
	'Gguigui1': ['newuser'], // Gguigui1 n'est jamais inactif
	'Maxx86': ['newuser'] // Maxx86 n'est jamais inactif
};
UserTagsJS.modules.implode = {
	'Administrateur inactif': ['sysop', 'inactive'],
	'Protecteur du wiki': ['chatmoderator', 'rollback'] // Ajoute "Protecteur du wiki" pour les rollbacks et patrollers en supprimant ces derniers
};
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js",
        'w:c:dev:UserTags/code.js',
        'MediaWiki:Common.js/DrTerror.js',
        'MediaWiki:Calc.js'
        'MediaWiki:ExtendedNavigation/code.js'
    ]
});