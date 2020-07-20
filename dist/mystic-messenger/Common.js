/* Any JavaScript here will be loaded for all users on every page load. */
/* User Tags */
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Project:Administrators'
        },
        bot: {
           link: 'Project:Administrators'
        },
         chatmoderator: {
            link: 'Project:Administrators'
        },
        threadmoderator: {
            link: 'Project:Administrators'
        }, 
        patroller: {
            link: 'Project:Administrators'
        },
        imagecontrol: {
            u: 'image control',
            link: 'Project:Administrators'
        },
        rollback: {
            link: 'Project:Administrators'
        },
        sysop: {
            link: 'Project:Administrators'
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'threadmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot',
            'imagecontrol'
        ],
        newuser: true
    }
}