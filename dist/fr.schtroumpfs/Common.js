/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/* Merci de demander quand vous emprunter un code, ce code là peut venir d'un autre wikia alors demander l'autorisation sur le "wikia" qui l'avait en premier. */

/** Notification **/
var WikiaNotificationMessage = "Bienvenue sur Wiki Schtroumpf ! Vous pouvez contribuer ou créer des pages en respectant les règles ! merci.";

/** Code modèle "USERNAME" de Mihawk Moha **/  
$(function () { if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return; $('span.insertusername').html(mw.config.get('wgUserName')); });

/** User Tags **/
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { u:'Schtroumpf Bricoleur', m:'Schtroumpf Bricoleur', f:'Schtroumpfette' }
	}
};

/** Importation de scripts **/
importArticles({
    type: 'script',
    articles: [
        'u:dev:SocialIcons/code.js', /* Icônes de réseaux sociaux */
        'u:dev:WikiaNotification/code.js', /* Notification */
        'u:dev:UserTags/code.js' /* Etiquettes utilisateurs */
    ]
});

/* Raison du bannissement */

importArticles ({ 
    Type :'script' , 
    articles :  [ 
        'u:dev:MessageBlock/code.js' 
    ] 
});