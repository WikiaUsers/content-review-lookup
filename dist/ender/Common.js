// external scripts
(function() {
    importArticles({
        type: 'script',
        articles: ['u:clodaghelm:MediaWiki:SlideToggle.js']
    }, {
        type: 'style',
        articles: ['u:clodaghelm:MediaWiki:BalancedUCX.css']
    });
})();

// dev:UserTags config
window.UserTagsJS = {
    modules: {
        //. automated inactivity
        inactive: {
            days: 30, // user is marked inactive after 30 days of no edits
            zeroIsInactive: true // users with 0 edits are also marked inactive
        },
        //. local groups to be replaced by local custom titles
        mwGroups: [
            'founder', 
            'bureaucrat', 
            'administrator', 
            'content-moderator', 
            'threadmoderator', 
            'rollback', 
            'bot'
        ],
        //. clean up tag "stacking"
        metafilter: {
            'sysop': ['sysop', 'bureaucrat'] // remove "admin" tag from bureaucrats and admins
        },
        //. manual overrides for specific users
        custom: {
            'ClodaghelmC': ['founder', 'bureaucrat', 'administrator'], // [[User:ClodaghelmC]]
            'Fla1m9C': ['administrator'] // [[User:Fla1m9C]]
        }
    },
    //. local custom titles
    tags: {
        'founder': { 
            u: 'Priestess of Origin', 
            link: 'Wiki of Ender:Administration#Founder', 
            title: 'Founder' 
        },
        'bureaucrat': { 
            u: 'Priestess of Sovereignty', 
            link: 'Wiki of Ender:Administration#Bureaucrat', 
            title: 'Bureaucrat' 
        },
        'administrator': { 
            u: 'Priestess of Principles', 
            link: 'Wiki of Ender:Administration#Administrator', 
            title: 'Administrator' 
        },
        'content-moderator': { 
            u: 'Priestess of Curation', 
            link: 'Wiki of Ender:Administration#Content Moderator', 
            title: 'Content Moderator' 
        },
        'threadmoderator': { 
            u: 'Priestess of Discourse', 
            link: 'Wiki of Ender:Administration#Discussions Moderator', 
            title: 'Discussions Moderator' 
        },
        'rollback': { 
            u: 'Attuner of Revisions', 
            link: 'Wiki of Ender:Administration#Rollback', 
            title: 'Rollback' 
        },
        'bot': { 
            u: 'Automaton of Rites', 
            link: 'Wiki of Ender:Administration#Bot Functionality', 
            title: 'Bot' 
        }
    }
};

// dev:welcomeMessage config
window.welcomeMessage = {
    enabled: true,
    preferTalk: true,
    adminUsername: 'ClodaghelmC',
    adminNickname: 'Clodaghelm',
    messageTitle: 'Welcome to Wiki of Ender, $1!',
    messageText: '{{' + 'subst:WelcomeMessage|$1|$2|$3|$4|' + 
'{{' + 'subst:CURRENTTIME}}, {{' + 'subst:CURRENTDAY}} {{' + 'subst:CURRENTMONTHNAME}} {{' + 'subst:CURRENTYEAR}} (UTC)}}' // [[Template:WelcomeMessage]]
};

// insert viewing user's name into <span class="insert-username"></span>
$(function() {
    var name = mw.config.get('wgUserName');
    $('.insert-username').text(name ? name : 'anonymous user'); // for anonymous users
});