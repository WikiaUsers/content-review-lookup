var aka = name

window.UserTagsJS = {
        tags: {
            bureaucrat: {
                u: 'Bureaucrat',
                /*link: 'Project:Bureaucrats'*/
            },
            sysop: {
                u: 'Administrator',
                title: 'Respect this member because ' + aka + 'is an administrator of Snowflakie Tent. ' + aka + 'blocks you easily!',
                link: 'Project:Administrators'
            },
            'content-moderator': {
                u: 'Content Moderator',
                /*link: 'Project:Content moderator'*/
            },
            rollback: {
                u: 'Rollback',
                /*link: 'Project:Rollback'*/
            },
            newuser: {
                u: 'New Member'
            },
            'autoconfirmed-user': {
                u: 'Active',
                /*link: 'Project:Autoconfirmed users'*/
            },
            user: {
                u: 'Member',
                /*link: 'Project:Autoconfirmed users'*/
            },
            inactive: {
                u: 'Inactive',
                title: 'This user hasn\'t edited for 30 days! ' + aka + 'is definitely inactive!'
            },
            nonuser: {
                u: 'Non-User',
                title: 'The user hasn\'t been granted membership on the wiki yet.'
            },
            blocked: {
                u: 'Blocked',
                title: 'Uh oh! This user violated the policies and deserves a block. For more information, read the block report below.',
                link: 'Project:Blocking Policy'
            },
        },
        modules: {
            stopblocked: false,
            inactive: 30,
            mwGroups: [
                'bureaucrat',
                'rollback',
                'sysop',
                'content-moderator',
                'autoconfirmed-user',
                'user',
                'bot',
                'bot-global',
                'blocked',
                'nonuser'
            ],
            autoconfirmed: true,
            newuser: true,
            },
    };