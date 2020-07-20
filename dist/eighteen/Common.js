// Message Wall User Tags Config
window.MessageWallUserTags = {
    tagColor: 'pink',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#ff146a',
    users: {
        'Lilliyan': 'GS Community Director • GS Staff',
        'Mysticalia': 'Wiki Founder',
        'Wizkiller96': 'Wiki Manager • GS Community Helper',
        'FoSizzle': 'Wiki Admin',
        'Fish1314': 'Wiki Admin',
        'Advarian': 'Wiki Admin'
    }
};

// User Tags Config
window.UserTagsJS = {
	modules: {},
	tags: {
        gscommunitydirector: { u: 'GS Community Director', order: 100 },
		gsstaff: { u: 'GS Staff', order: 101 },
		gscommunityhelper: { u: 'GS Community Helper', order: 103 },
		gsgamehelper: { u: 'GS Game Helper', order: 104 },
		montheditor: { u: 'Editor of the Month', order: 4 },
		featured: { u: 'Featured', order: 4 },
		templates: { u: 'Templates Guru', order: 4 },
		hello: { m: 'Male', f:'Female', u: 'No Gender Set', order: -1/0, link:'http://en.wikipedia.org/wiki/Gender' },
		muckraker: 'Muckraker',
		bureaucrat: { u: 'Wiki Manager', link:'Eighteen_Wikia:Administrators', order: 0 },
		'inactive-bureaucrat' : { u: 'Inactive Wiki Manager', order: 97 },
		'inactive-sysop' : { u: 'Inactive Wiki Admin', order: 98 },
		'inactive-mini-sysop' : { u: 'Inactive Wiki Admin', order: 99 },
		sysop: { u: 'Wiki Admin', link:'Eighteen_Wikia:Administrators', order: 1 },
		'mini-sysop': { u: 'Half Admin', link:'Eighteen_Wikia:Administrators', order: 2 },
		'vandal-patrol': { u: 'Spam Janitor', link:'Project:Janitors', order: 3 }
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Wizkiller96': ['gscommunityhelper'],
	'Lilliyan': ['gscommunitydirector', 'gsstaff']
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'], // Remove administrator group from bureaucrats & founder
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat'],
	hello: ['muckraker'], // Remove hello group from people with muckraker group
	'vandal-patrol': ['mini-sysop'] // Remove vandal-patrol from mini-sysops
};
UserTagsJS.modules.userfilter = {
	'Wizkiller96': ['inactive'], // Wizkiller96 is never inactive, even when he is
	'Mysticalia': ['inactive'], // Mysticalia is never inactive, even when she is
	'Lilliyan': ['inactive'] // Lilliyan is never inactive, even when she is
};
UserTagsJS.modules.implode = {
    'inactive-bureaucrat': ['bureaucrat', 'inactive'],
	'inactive-sysop': ['sysop', 'inactive'],
	'inactive-mini-sysop': ['patroller', 'rollback', 'chatmoderator', 'inactive'],
	'mini-sysop': ['patroller', 'rollback', 'chatmoderator'] // Remove patroller, rollback and chatmoderator, if ALL 3 exist, and replace with 'mini-sysop'
};
UserTagsJS.modules.explode = {
	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
};

//Last Edited Config
window.lastEdited = {
    avatar: false
};

//Lock Forums Config
window.LockForums = {
    expiryDays: 180,
    expiryMessage: "This forum has been automatically archived because its most recent comment is over <expiryDays> days old.",
    warningDays: 30,
    warningMessage: "This forum is now <actualDays> days old; out of courtesy to your fellow Wikians, please do not comment unless it is absolutely necessary. This forum will archive automatically when the last comment is <expiryDays> days old.",
    banners: true,
    ignoreDeletes: true,
    warningPopup: true,
    warningPopupMessage: "By posting on an old forum you may be filling up the e-mail boxes of many people who are still following this topic. Are you sure you want to do this?",
    disableOn: ["12345", "67890"]
};

//Lock Old Blogs Config
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};

/* Insert the Discord Widget on the <div id="DiscordWidget> and the <span class="DiscWidgetHor"> with a   horizontal aspect */
$("#DiscordWidget .DiscWidgetHor").append('<iframe src="https://discordapp.com/widget?id=228274044082978818&theme=dark" width="716px" height="480px" allowtransparency="true" frameborder="0"></iframe>');

/* Insert the Discord Widget on the <div id="DiscordWidget> and the <span class="DiscWidgetVert"> with a   vertical aspect */
$("#DiscordWidget .DiscWidgetVert").append('<iframe src="https://discordapp.com/widget?id=228274044082978818&theme=dark" width="300px" height="430px" allowtransparency="true" frameborder="0"></iframe>');

/* Insert the Discord Widget on the <div id="DiscordWidget> and the <span class="DiscWidgetHor"> with a   100% size */
$("#DiscordWidget .DiscWidget").append('<iframe src="https://discordapp.com/widget?id=228274044082978818&theme=dark" width="100%" height="100%" allowtransparency="true" frameborder="0"></iframe>');