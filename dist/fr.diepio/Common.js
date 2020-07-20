/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

// UserTags
    window.UserTagsJS = {
        modules: {},
        tags:    {
            rédacteur: { u:'Rédacteur(trice)', m:'Rédacteur', f:'Rédactrice' }
        }
    };
    
    UserTagsJS.modules.inactive      = 30;
    UserTagsJS.modules.newuser       = true;
    UserTagsJS.modules.autoconfirmed = true;
 
    UserTagsJS.modules.mwGroups = [
        'content-moderator',
        'bureaucrat',
        'chatmoderator',
        'patroller',
        'rollback',
        'sysop',
        'bannedfromchat',
        'bot',
        'bot-global',
    ];
 
    UserTagsJS.modules.metafilter = {
        sysop:         ['bureaucrat', 'founder'],
        bureaucrat:    ['founder'],
        chatmoderator: ['sysop', 'bureaucrat', 'rollback', 'threadmoderator'],
        rollback:      ['sysop', 'bureaucrat']
    };
    
        UserTagsJS.modules.autoconfirmed = true; 
UserTagsJS.modules.mwGroups = ['sysop', 'bot', 'chatmoderator']; 
UserTagsJS.modules.custom = { 

};

importArticles({
    type: "script",
    articles: [
        // ...
        
        // ...
    ]

});