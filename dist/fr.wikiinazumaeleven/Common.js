/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
importArticles({
	type: "script",
	articles: [
		'w:dev:UserTags/code.js', /* permet l'ajout de rôles / modification de noms de rôles pour les membres */
	    'w:c:dev:RevealAnonIP/code.js',
		'w:c:dev:SignatureCheck/code.js',
		'w:c:dev:AjaxRC/code.js',
]
});

/** Statuts du corps administratif et Utilisateurs Actifs **/

window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { u:'Nominateur'}, 
                sysop: { u:'Administrateur Inazuma'},
                sysopF: { u:'Administratrice Inazuma provisoire'},
                supmoderator: { u:'Modératrice Supérieure'},
                contentmoderator: { u:'Modérateur de Contenu'},
                threadmoderator: { u:'Modérateur des Discussions'},
                rollback: { u:'Modératrice des Modifications'}, 
                chatmoderator: { u:'Modérateur du Tchat'},
                checkuser: { u:'Enquêteur'},
                responsable: { u:'Responsable'},
                ancien: { u:'Ancien Inazuma'},
                maitre: { u:'UA : Maitre Légendaire'}, 
                professionnel: { u:'UA : Professionnel'},
                professionnelle: { u:'UA : Professionnelle'},
                expert: { u:'UA : Expert'},
                experte: { u:'UA : Experte'},
                specialiste: {u:'UA : Spécialiste'},
                confirme: {u:'UA : Confirmé'},
                confirmee: {u:'UA : Confirmée'},
                intermediaire: {u:'UA : Intermédiaire'},
                apprenti: {u:'UA : Apprenti'},
                apprentie: {u:'UA : Apprentie'},
                debutant: {u:'UA : Débutant'},
                debutante: {u:'UA : Débutante'}
} 
};
UserTagsJS.modules.custom = {
        'JonathanD11Raimon': ['bureaucrat', 'sysop', 'maitre'],
        'Aiden Froste12': ['sysop', 'professionnel'],
        'Zeaphir': ['sysopF', 'professionnelle'],
        'Matauf' : ['sysop', 'professionnel'],
        'Nobbie-San': ['contentmoderator', 'threadmoderator', 'expert'],
        'Monaflemit': ['specialiste'],
        'GuiFFI': ['intermediaire'],
        'SnowyBoy': ['ancien'],
        '22Matt22': ['ancien'],
        'Mohamed9': ['ancien'],
        'Sunset Xero': ['ancien'],
};
UserTagsJS.modules.inactive = 183; //Ajout de la vignette "Inactif" si aucune modification en 6 mois

importScriptPage('AjaxBatchDelete/code.js', 'dev');

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});