/* Any JavaScript here will be loaded for all users on every page load. */

// MessageBlock config
window.MessageBlock = {
  title : 'Blocked',
  message : 'You have received a $2 block for the reason: \'$1\'. Unless otherwise stated, you may appeal your block on my, or another admin\'s, message wall at Community Central.',
  autocheck : true
};

// DiscussionTemplates config
window.DiscussionTemplates = {
    templates: {
        'Low effort': {
            name: 'Project:Staff messages/Low effort',
            title: 'Warning - low effort post'
        }
    },
    /*wikiList: {
        en: 'https://example.fandom.com/'
    },*/
    allowedGroups: ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator']
};