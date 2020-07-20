/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
        admin: { u: 'Admin', },
	}
};

/* Adds tags to after a users name on the message wall */
window.MessageWallUserTags = {
    tagColor: '#ebebeb',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#ffffff',
    users: {
        'username': 'usergroup',
        'Sebastian Clarke': 'Bureaucrat • Administrator',
    }
};
 
/* Add custom groups to several users */
UserTagsJS.modules.custom = {
    'Sebastian_Clarke': ['bureaucrat', 'admin'],
};

UserTagsJS.modules.inactive = {
	days: 30,
	zeroIsInactive: true // 0 article edits = inactive
};
UserTagsJS.modules.newuser = {
	namespace: 0, // Edits must be made to articles
	computation: function(days, edits) {
		// If true then newuser
		// If false then not
		// Newuser removed when user has 10 edits, OR when present for 4 days, whichever first
		return days < 4 && edits < 10;
	}
};

/* Replaces {{Visitor}} with the name of the user browsing the page. */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);