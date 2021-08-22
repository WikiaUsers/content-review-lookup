/** Statuts du corps administratif et Utilisateurs Actifs **/
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { u:'Nominateur', m:'Nominateur', f:'Nominatrice'},
                adoption: { u:'Adopteur du Wiki'},
                sysop: { u:'Administrateur Inazuma', m:'Administrateur Inazuma', f:'Administratrice Inazuma'},
                supmoderator: { u:'Modérateur Supérieur', m:'Modérateur Supérieur', f:'Modératrice Supérieure'},
                contentmoderator: { u:'Modérateur de Contenu', m:'Modérateur de Contenu', f:'Modératrice de Contenu'},
                threadmoderator: { u:'Modérateur des Discussions', m:'Modérateur des Discussions', f:'Modératrice des Discussions'},
                rollback: { u:'Modérateur des Modifications', m:'Modérateur des Modifications', f:'Modératrice des Modifications'}, 
                ancien: { u:'Ancien Inazuma', m:'Ancien Inazuma', f:'Ancienne Inazuma'},
                maitre2: { u:'Maitre Légendaire ★★'}, 
                maitre1: { u:'Maitre Légendaire ★'},
                professionnel: { u:'Professionnel', m:'Professionnel', f:'Professionnelle'},
                expert: { u:'Expert', m:'Expert', f:'Experte'},
                specialiste: {u:'Spécialiste'},
                confirme: {u:'Confirmé', m:'Confirmé', f:'Confirmée'},
                intermediaire: {u:'Intermédiaire'},
                apprenti: {u:'Apprenti', m:'Apprenti', f:'Apprentie'},
                debutant: {u:'Débutant', m:'Débutant', f:'Débutante'},
                pretendant: {u:'Prétendant', m: 'Prétendant', f:'Prétendante'},
                newuser: {u:'Nouveau Contributeur', m:'Nouveau Contributeur', f:'Nouvelle Contributrice'},
                inactive: {u:'Inactif', m:'Inactif', f:'Inactive'},
} 
};
UserTagsJS.modules.custom = {
        'JonathanD11Raimon': ['bureaucrat', 'sysop', 'adoption', 'maitre2'],
        'Aiden Froste12': ['adoption', 'ancien', 'professionnel'],
        'Zeaphir': ['supmoderator', 'professionnel'],
        'Matauf' : ['ancien', 'sysop', 'maitre1'],
        'Nobbie-San': ['maitre1'],
        '~Revelium~' : ['maitre2'],
        'Yukatapulte' : ['Confirme'],
        'Osoro711' : ['Confirme'],
        'Hector Evans': ['confirme'],
        'Pentagramm' : ['intermediaire'],
        'Inazumablaze17' : ['debutant'],
        'SnowyBoy': ['ancien'],
        '22Matt22': ['ancien'],
        'Mohamed9': ['ancien'],
        'Sunset Xero': ['ancien'],
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'supmoderator', 'contentmoderator', 'threadmoderator', 'rollback', 'newuser', 'inactive'];
UserTagsJS.modules.inactive = 183; //Ajout de la vignette "Inactif" si aucune modification en 6 mois
UserTagsJS.modules.newuser = {
	days: 14, // L'utilisateur contribue sur le Wiki depuis 14 jours
	namespace: 0 // Pour comptabilisation, une modification d'article du Wiki suffit
};
/** Fin statuts du corps administratif et Utilisateurs Actifs **/

importScriptPage('AjaxBatchDelete/code.js', 'dev');

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

window.MassCategorizationGroups = ['sysop'];