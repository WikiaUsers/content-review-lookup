/** Statuts du corps administratif et Utilisateurs Actifs **/
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { u:'Nominateur', m:'Nominateur', f:'Nominatrice', link:'Wiki Inazuma Eleven:Portail Principal#Corps administratif du Wiki', order:1},
                adoption: { u:'Adopteur du Wiki', order:3},
                sysop: { u:'Administrateur Inazuma', m:'Administrateur Inazuma', f:'Administratrice Inazuma', link:'Wiki Inazuma Eleven:Portail Principal#Corps administratif du Wiki', order:2},
                supmoderator: { u:'Modérateur Supérieur', m:'Modérateur Supérieur', f:'Modératrice Supérieure', link:'Wiki Inazuma Eleven:Portail Principal#Corps administratif du Wiki', order:5},
                contentmoderator: { u:'Modérateur de Contenu', m:'Modérateur de Contenu', f:'Modératrice de Contenu', link:'Wiki Inazuma Eleven:Portail Principal#Corps administratif du Wiki', order:6},
                threadmoderator: { u:'Modérateur des Discussions', m:'Modérateur des Discussions', f:'Modératrice des Discussions', link:'Wiki Inazuma Eleven:Portail Principal#Corps administratif du Wiki', order:7},
                rollback: { u:'Modérateur des Modifications', m:'Modérateur des Modifications', f:'Modératrice des Modifications', link:'Wiki Inazuma Eleven:Portail Principal#Corps administratif du Wiki', order:8}, 
                ancien: { u:'Ancien Inazuma', m:'Ancien Inazuma', f:'Ancienne Inazuma', order:4},
                maitre2: { u:'Maitre Légendaire ★★', link:'Modèle:Navigation-UtilisateursActifs#Maitres L.C3.A9gendaires .E2.98.85.E2.98.85'}, order:9,
                maitre1: { u:'Maitre Légendaire ★', link:'Modèle:Navigation-UtilisateursActifs#Maitres L.C3.A9gendaires .E2.98.85', order:10},
                professionnel: { u:'Professionnel', m:'Professionnel', f:'Professionnelle', link:'Modèle:Navigation-UtilisateursActifs#Professionnels', order:11},
                expert: { u:'Expert', m:'Expert', f:'Experte', link:'Modèle:Navigation-UtilisateursActifs#Experts', order:12},
                specialiste: {u:'Spécialiste', link:'Modèle:Navigation-UtilisateursActifs#Sp.C3.A9cialistes', order:13},
                confirme: {u:'Confirmé', m:'Confirmé', f:'Confirmée', link:'Modèle:Navigation-UtilisateursActifs#Confirm.C3.A9s', order:14},
                intermediaire: {u:'Intermédiaire', link:'Modèle:Navigation-UtilisateursActifs#Interm.C3.A9diaires', order:15},
                apprenti: {u:'Apprenti', m:'Apprenti', f:'Apprentie', link:'Modèle:Navigation-UtilisateursActifs#Apprentis', order:16},
                debutant: {u:'Débutant', m:'Débutant', f:'Débutante', link:'Modèle:Navigation-UtilisateursActifs#D.C3.A9butants', order:17},
                pretendant: {u:'Prétendant', m: 'Prétendant', f:'Prétendante', link:'Modèle:Navigation-UtilisateursActifs#D.C3.A9butants', order:18},
                newuser: {u:'Nouveau Contributeur', m:'Nouveau Contributeur', f:'Nouvelle Contributrice', order:20},
                inactive: {u:'Inactif', m:'Inactif', f:'Inactive', order:19},
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'bot', 'rollback', 'founder', 'threadmoderator', 'contentmoderator', 'supmoderator', 'notautoconfirmed', 'autoconfirmed'];
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

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

window.MassCategorizationGroups = ['sysop'];