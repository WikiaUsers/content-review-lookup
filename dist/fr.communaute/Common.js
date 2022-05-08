$('.centralhelpbox').click(function(){
    window.location = $(this).find('a').get(0).href;
});

// Configuration for adoptions form
window.adoptInternational = {
    unsupportedLanguages: ['en','es','de','ru','it','nl','pl','pt','pt-br','zh'],
    adoptionConfig: {
        activityDays: 14,
        adminsDays: 60,
        permissionTypes: [
            'bureaucrat',
            'sysop'
        ]
    },
    pageConfig: {
        namespace: 'Demande_adoption',
        namespaceId: 116,
        adoptionsPage: 'Centre_des_communautés:Adoption'
    },
    wikitextSchema: "{{bStart}}Demande d\'adoption\n" +
        "| 0-Statut            = \n" +
        "| 1-Utilisateur       = {{userName}}\n" +
        "| 2-Lien              = {{{wikiURL}}}\n" +
        "| 3-Type              = {{permissionsType}}\n" +
        "| 4-Votre_activité    = {{numDays}}\n" +
        "| 5-Activité_admin    = {{numAdmins}}\n" +
        "| 6-Raisons           = {{comments}}\n" +
        "| 7-Discussion        = {{{communityVote}}}\n" +
    "{{bEnd}}"
};

importArticles({
    type: "script",
    articles: [ 
       'MediaWiki:Common.js/Requests.js'
    ]
});