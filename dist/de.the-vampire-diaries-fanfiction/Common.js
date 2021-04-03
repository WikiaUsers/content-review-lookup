/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

window.UserTagsJS = {
        modules: {},
        tags: {
                user: { u:'Writer' }
   }
};

UserTagsJS.modules.mwGroups = ['bannedfromchat', 'blocked', 'bot', 'bureaucrat', 'chatmoderator', 'content-moderator', 'council', 'helper',  'staff', 'sysop', 'threadmoderator', 'user', 'vanguard', 'vstf'];

UserTagsJS.modules.metafilter = {
        'user': ['bannedfromchat', 'blocked', 'bot', 'bureaucrat', 'chatmoderator', 'content-moderator', 'council', 'helper', 'staff', 'sysop', 'threadmoderator', 'vanguard', 'vstf']
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js'        
     ]
});