/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
    modules: {
        inactive: 0,
        mwGroups: [
            'bureaucrat', 
            'sysop', 
            'content-moderator', 
            'thread-moderator'
        ],
        implode: {
            'hybrid': ['content-moderator', 'thread-moderator']
        }
    },
    tags: {
        'bureaucrat': { u: 'Bureaucrat' },
        'sysop': { u: 'Administrator' },
        'content-moderator': { u: 'Content Moderator' },
        'thread-moderator': { u: 'Thread Moderator' },
        'hybrid': { u: 'Hybrid Moderator' }
    }
};