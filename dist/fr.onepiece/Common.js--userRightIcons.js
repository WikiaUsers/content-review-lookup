/* Tout code Javascript se trouvant sur cette page sera visible pour tous. */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
    modules: {},
    tags: {
        bureaucrat:         { u:'Bureaucrate' },
        sysop:              { u:'Administrateur', f:'Administratrice' },
        doyen:              { u:'Doyen', f:'Doyenne'                },
        chatmoderator:      { u:'Modérateur du tchat', f:'Modératrice du tchat' },
        bot:                { u:'Robot'                     },
        threadmoderator:    { u:'Modérateur du forum', f:'Modératrice du forum'},
        checkuser:             { u:'vérificateur d’utilisateur'                    },
        rollback:           { u:'Rollback'                                      },
        council:            { u:'Conseiller'                   }
    },
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'bot', 'council', 'checkuser', 'voldev', 'staff', 'threadmoderator', 'vanguard', 'vstf'];