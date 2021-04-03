/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

///* UserTags *///
window.UserTagsJS = {
    modules: {},
    tags: {
        founder: {
            u: 'Direction',
            m: 'Directeur',
            f: 'Directrice',
            link: 'Wiki Uta no prince-sama:Rôles#Directeur'
        },
        bureaucrat: {
            u: 'Senior',
            m: 'Senior',
            f: 'Senior',
            link: 'Wiki Uta no prince-sama:Rôles#Seniors'
        },
        sysop: {
            u: 'Compositeur',
            m: 'Compositeur',
            f: 'Compositeur',
            link: 'Wiki Uta no prince-sama:Rôles#Compositeurs'
        },
        'content-moderator': {
            u: 'Senpai (contenu)',
            link: 'Wiki_Uta_no_prince-sama:Rôles#Senpais_.28contenu.29'
        },
        chatmoderator: {
            u: 'Senpai (tchat)',
            link: 'Wiki Uta no prince-sama:Rôles#Senpais_.28tchat.29'
        },
        threadmoderator: {
            u: 'Senpai (discussion)',
            link: 'Wiki Uta no prince-sama:Rôles#Wiki_Uta_no_prince-sama:Rôles#Senpais_.28tchat.29'
        },
        autoconfirmed: {
            u: 'Idoles auto-confirmées',
            link: 'Wiki Uta no prince-sama:Rôles#Idoles auto-confirmées'
        },
        newuser: {
            u: 'Nouvelle idole',
            link: 'Wiki Uta no prince-sama:Rôles#Nouvelles idoles'
        },
        inactive: {
            u: 'A quitté l\'Agence',
            link: 'Wiki Uta no prince-sama:Rôles#Retraités'
        },
        nonuser: {
            u: 'Étudiant',
            m: 'Étudiant',
            f: 'Étudiante',
            link: 'Wiki Uta no prince-sama:Rôles#Étudiants'
        },
        blocked: {
            u: 'Renvoyé',
            m: 'Renvoyé',
            f: 'Renvoyée',
            link: 'Wiki Uta no prince-sama:Rôles#Renvoyés'
        },
    }
};
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'bot',
    'rollback',
    'chatmoderator',
    'founder',
    'threadmoderator',
    'notautoconfirmed',
    'autoconfirmed'
];

UserTagsJS.modules.metafilter = {
    'inactive': ['sysop', 'bureaucrat'],
    'autoconfirmed': [
        'syspop',
        'bureaucrat',
        'content-moderator',
        'chatmoderator',
        'threadmoderator',
        'newuser',
        'tshirtNoir',
        'nonuser'
    ],
    'notautoconfirmed': ['newuser', 'nonuser'],
    'chatmoderator': ['sysop', ['patroller', 'rollback']],
    'content-moderator': ['sysop'],
    'threadmoderator': ['sysop'],
    'tshirtNoir': [
        'threadmoderator',
        'content-moderator',
        'chatmoderator',
        'notautoconfirmed',
        'newuser',
        'nonuser',
        'bureaucrat',
        'syspop',
        'blocked'
    ],
    'nonuser': ['blocked']
};
 
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.nonuser = true;
UserTagsJS.modules.stopblocked = false;
UserTagsJS.modules.newuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 20, // And have at least 20 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

///* Modèle:Spoiler/Galerie *///
var _alert = ".spoiler-alert";
$(_alert).next("div").hide();
 
$(_alert + " span").click(function() {
    $(this).attr('id') === "y" ?
        $(this).parents(_alert).next("div").fadeIn() :
        $(this).parents(_alert).next("div").hide();
    $(this).parents(_alert).hide();
});


///* Autres *///
window.AddRailModule = [{prepend: true}];

window.railWAM = {
    logPage:"Project:WAM Log"
};