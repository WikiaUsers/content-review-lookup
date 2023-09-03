/* Any JavaScript here will be loaded for all users on every page load. */
window.AjaxBlock = {
    blockReasons: {
        'General': {
            '[[w:c:community:Help:Vandalism|Vandalism]]': 'Vandalism',
            '[[WP:WP:CRV|Removing Content From Pages]]': 'Removing Content From Pages',
            '[[WP:WP:DISRUPT|Disruptive Editing]]': 'Disruptive Editing',
            '[[WP:WP:Disinformation|Inserting False Information]]': 'Inserting False Information',
            'Creating Nonsense/[[w:c:community:Help:Vandalism|Vandalism]] Articles': 'Creating Spam Articles',
            'Inserting nonsense/gibberish into pages': 'Inserting nonsense/gibberish into pages',
        },
        'Accounts': {
            '[[wP:Wp:PROXY|Open Proxy/VPN]]': 'Open Proxy/VPN',
            '[[WP:WP:VOA|Vandalism-Only Account]]': 'Vandalisn-Only Account',
            '[[WP:WP:IU|Unacceptable Username]]': 'Unacceptable Username',
            'Abusing Multiple Accounts ([[WP:WP:SOCK|Sockpuppetry]])': 'Sockpuppety',
            'Long-Term Abuse': 'Long-Term Abuse',
        },
        'Spam': {
            '[[w:Help:Spam|Spam/Advertising]] Only account': 'Spam/Advertising Only account',
            '[[w:Help:Spam|Spam/Advertising]]': 'Spam/Advertising',
            '[[WP:WP:LINKSPAM|Spamming Links to External Sites]]': 'External Link Spam',
            '[[WP:WP:SPAM|Posting Spam on Userpage]]': 'Posting Spam on Userpage',
        },
        'Comments': {
            '[[Project:Article Comment Guidelines|Spamming Nonsense Comments/Posts]]': 'Spamming Nonsense Comments/Posts',
            'Intimidating/Harassing Comments/Posts': 'Intimidating/Harassing Comments/Posts',
            'Swearing in Comments/Discussions': 'Swearing in Comments/Discussions'
        },
    },
    unblockReasons: {
        'Error': 'Error',
        'Appealed': 'Appealed',
        'Covered by a Bigger Range Block': 'Range block'
    },
    expiryTimes: {
        '2 hours': '2 hours',
        '1 day': 'one day',
        '1 week': 'a week',
        '2 months': '2m',
        'never': 'Never'
    },
    check: {
        talk: true,
        autoBlock: true,
        override: true,
        noCreate: true
    }
};