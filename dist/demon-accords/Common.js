/* Any JavaScript here will be loaded for all users on every page load. */
/* BackToTopButton */
window.BackToTopModern = true;

/* LockOldBlogs */
window.LockOldBlogs = {
    expiryMessage: 'This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!',
    nonexpiryCategory: 'Never archived blogs'
};

/* UserTags */
window.UserTagsJS = {
    tags: {
        'bureaucrat': {
            u: 'Oracle',
            link: 'Project:Bureaucrats'
        },
        'sysop': {
            u: 'Demon',
            link: 'Project:Sysops'
        },
        'content-moderator': {
            u: 'Angel',
            link: 'Project:Content moderator'
        },
        'poweruser': {
            u: 'Human',
            link: 'Project:Autoconfirmed users'
        },
        'autoconfirmed-user': {
            u: 'Human',
            link: 'Project:Autoconfirmed users'
        },
        'user': {
            u: 'Human',
            link: 'Project:Autoconfirmed users'
        },
        'newuser': {
            u: 'Human'
        },
        inactive: {
            u: 'Deceased',
            title: 'The user hasn\'t edited for last 30 days'
        },
        blocked: {
            u: 'Deceased',
        },
    },
    modules: {
        stopblocked: false,
        inactive: 30,
        mwGroups: [
            'bureaucrat',
            'sysop',
            'content-moderator',
            'rollback',
            'user',
            'autoconfirmed-user',
            'bot',
            'bot-global',
            'blocked',
            'nonuser'
        ],
        autoconfirmed: true,
        newuser: true,
        metafilter: {
            'content-moderator': ['bureaucrat'],
            rollback: [
                'bureaucrat',
                'content-moderator'
            ],
            threadmoderator: ['content-moderator'],
            user: [
                'bureaucrat',
                'sysop',
                'content-moderator',
                'rollback',
                'translator',
                'newuser',
                'inactive',
                'blocked'
            ],
            bot: ['bot-global'],
            newuser: ['inactive'],
            bureaucrat: ['inactive'],
            sysop: ['inactive'],
            founder: ['inactive'],
            blocked: ['inactive'],
            poweruser: ['newuser']
        },
    },
};

importArticles({
	type:'script',
	articles: [
        'MediaWiki:Common.js/redditWidget.js',      // Adds reddit widget to id="reddit-widget"
	]
});

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:User_Avatar_Finder/code.js"
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
    ]
});

function getElementsByClass(searchClass, node, tag)
{
    var classElements = new Array();

    if(node == null)
        node = document;

    if(tag == null)
        tag = '*';

    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var tester = new ClassTester(searchClass);

    for(i = 0, j = 0; i < elsLen; i++)
    {
        if(tester.isMatch(els[i]))
        {
            classElements[j] = els[i];
            j++;
        }
    }
    
    return classElements;
}

function ClassTester(className)
{
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}

ClassTester.prototype.isMatch = function(element)
{
    return this.regex.test(element.className);
}

function getParentByClass(className, element) {
    var tester = new ClassTester(className);
    var node = element.parentNode;

    while(node != null && node != document)
    {
        if(tester.isMatch(node))
            return node;

        node = node.parentNode;
    }

    return null;
}

function addHideButtons() {
    var hidables = getElementsByClass('hidable');

    for( var i = 0; i < hidables.length; i++ ) {
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');

        if( button != null && button.length > 0 ) {
            button = button[0];

            button.onclick = toggleHidable;
            button.appendChild( document.createTextNode('[Hide]') );

            if( new ClassTester('start-hidden').isMatch(box) )
                button.onclick('bypass');
        }
    }
}

function toggleHidable(bypassStorage) {
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;

    if( content != null && content.length > 0 ) {
        content = content[0];

        if( content.style.display == 'none' ) {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[Hide]';
            nowShown = true;
        } else {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Show]';
            nowShown = false;
        }

        if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
            var page = window.pageName.replace(/\W/g, '_');
            var items = getElementsByClass('hidable');
            var item = -1;

            for( var i = 0; i < items.length; i++ ) {
                if( items[i] == parent ) {
                    item = i;
                    break;
                }
            }

            if( item == -1 ) {
                return;
            }

            localStorage.setItem('hidableshow-' + item + '_' + page, nowShown);
        }
    }
}

$( addHideButtons );