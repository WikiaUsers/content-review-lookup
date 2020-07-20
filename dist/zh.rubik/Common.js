$('.insertusername').text(mw.config.get('wgUserName'));
/*特殊用户标签*/
window.UserTagsJS = {
	modules: {},
	tags: {
	    wca: {u:'WCA认证'},
            old: {u:'维基常驻用户'},
	},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.custom = {
    'KK899'           : ['old']
    '1999lx'          : ['wca'],
};

UserTagsJS.modules.mwGroups = ['founder', 'bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback', 'vstf', 'global-discussions-moderator', 'newuser', 'notautoconfirmed', 'neweditor'];
};