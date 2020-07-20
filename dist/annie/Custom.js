window.UserTagsJS = {
	modules: {},
	tags: {
		a: { u: 'Admin', order:1 },
		b: { u: 'Magic', order:2 },
		c: { u: 'Jedi', order:3 },
		d: { u: 'Test Tag 4', order:4 },
		e: { u: 'Test Tag 5', order:5 },
		Jedi: { u: 'Jedi' },
		csshelper: { u: 'CSS' },
		templatehelper: { u: 'Templates' },
		hello: { 
            m: 'Male',
            f:'Female',
            u: 'No Gender Set',
            order: -1/0,
            link:'https://en.wikipedia.org/wiki/Gender'
        },

UserTagsJS.modules.custom = {
	'Theolex': ['Bureaucrat', 'Magic', 'Jedi', 'Reviver', 'e', 'inactive'],
	'UserName 2': ['featured'], // Add featured
	'UserName 3': ['featured', 'templates'], // Add featured + templates guru
	'UserName 4': ['inactive'], // Always inactiv
	'Someone': ['hello'],
	'You': ['inactive'], // Force inactive group instead of relying on the inactive module
	'Other User': ['hello', 'muckraker']
};

UserTagsJS.modules.isblocked = false; 
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0, 'Talk', 'User talk', 'Forum'],
	zeroIsInactive: true // 0 article edits = inactive
};

UserTagsJS.modules.implode = {
	'mini-sysop': ['patroller', 'rollback', 'chatmoderator'] // Remove patroller, rollback and chatmoderator, if ALL 3 exist, and replace with 'mini-sysop'
};

UserTagsJS.modules.explode = {
	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
};

function EditGreeting() {
    if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
        if (wgTitle == wgUserName) {
            $('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:' + wgUserName + '?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
        }
    }
}