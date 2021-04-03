/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
    modules: {
        mwGroups: [
            'bureaucrat',
            'sysop',
            'content-moderator',
            'chatmoderator',
            'threadmoderator',
            'rollback',
            'bot',
            'bot-global'
        ],
        metafilter: {
            sysop: ['bureaucrat'],
            'content-moderator': ['bureaucrat', 'sysop'], 
            chatmoderator: ['bureaucrat', 'sysop', 'content-moderator'],
            threadmoderator: ['bureaucrat', 'sysop', 'content-moderator', 'chatmoderator'],
            rollback: ['bureaucrat', 'sysop', 'content-moderator', 'chatmoderator', 'threadmoderator']
        },
        custom: {
            'Positive Elixir Trade': ['bureaucrat', 'administrator', 'admincrat'],
            'HereComeTheTurtles': ['content moderator', 'chat moderator', 'discussions moderator', 'rollback'],
            'MemeMachine1.0': ['content moderator', 'rollback'],
            'NL2022': ['content moderator', 'discussions moderator', 'rollback'],
            'TheAmazingCrafter': ['chat moderator','discussions moderator', 'rollback'],
            'FudgyGuy': ['discussions moderator', 'rollback']
        
        }
    }
};

/* Articles are interwiki links so that other wikis can use them. */
    articles = [
        'MediaWiki:Common.js/Protection.js',
    ];

window.ArticleRating = {
  title: 'Rate This Article',
  values: ['Worst', 'Bad', 'Average', 'Good', 'Great'],
  starSize: [24, 24],
  starColor: ['#ccc', '#ffba01'],
  starStroke: '#000',
  exclude: ['Page A', 'Page B'],
  excludeCats: ['Category:A', 'Category:B'],
  location: 'bottom-page'
}