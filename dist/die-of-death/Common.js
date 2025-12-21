window.UserTagsJS = {
    modules: {
        mwGroups: [],

        implode: {
            'admincrat': ['bureaucrat', 'sysop'],
            'all-access': ['rollbacker', 'thread-moderator', 'content-moderator', 'dual-moderator', 'bureaucrat', 'sysop'],
            'mega-moderator': ['dual-moderator', 'thread-moderator', 'content-moderator', 'rollbacker']
        },

        order: {
            'all-access': 1,
            'admincrat': 2,
            'wiki-owner': 3,
            'wiki-co-owner': 4,
            'bureaucrat': 5,
            'sysop': 6,
            'content-moderator': 7,
            'thread-moderator': 8,
            'dual-moderator': 9,
            'rollbacker': 10,
            'contributor': 11
        }
    },

    tags: {
        /* STAFF ROLES */
        'wiki-owner': { title: 'This user is a Die of Death wiki owner.' },
        'wiki-co-owner': { title: 'This user is a Die of Death wiki co-owner.' },
        'bureaucrat': { title: 'This user is a Die of Death wiki bureaucrat.' },
        'sysop': { title: 'This user is a Die of Death wiki administrator.' },
        'content-moderator': { title: 'This user is a Die of Death wiki content moderator.' },
        'thread-moderator': { title: 'This user is a Die of Death wiki thread moderator.' },
        'dual-moderator': { title: 'This user is a Die of Death wiki dual moderator.' },
        'rollbacker': { title: 'This user is a Die of Death wiki rollbacker.' },
        'contributor': { title: 'This user is a Die of Death wiki contributor.' },
        
        /* BAN ROLES */
        'blocked': { title: 'This user is blocked on the Die of Death Wiki.' },
        'admin-blacklisted': { title: 'This user is blacklisted by administrators on the Die of Death Wiki.' },

        /* COMBINED ROLES */
        'all-access': { title: 'This user has all staff privileges on the Die of Death wiki.' },
        'admincrat': { title: 'This user is both an administrator and a bureaucrat on the Die of Death wiki.' },
        'mega-moderator': { title: 'This user is a Die of Death wiki mega moderator.' }
    },

    oasisPlaceBefore: ''
};

// Custom user tags
UserTagsJS.modules.custom = {
    'Roboticpie': ['wiki-owner', 'all-access'],
    'Frogt007': ['wiki-co-owner', 'all-access'],
    'OGMelodii': ['wiki-co-owner', 'all-access'],
    '226w6Reborn': ['admincrat'],
    'Jackisdev': ['admincrat'],
    'Xx.S0LAS.xX': ['dual-moderator'],
    '.Lotux.Eternum.': ['dual-moderator', 'content-moderator', 'thread-moderator', 'rollbacker'],
    'ScrewchGuy': ['content-moderator'],
    'TerragonArtOriginal': ['content-moderator'],
    'Slippiki': ['thread-moderator'],
    'Derpzzz': ['thread-moderator'],
    'NetTheIdiot': ['thread-moderator'],
    'The Floor with Boards': ['rollbacker']
};