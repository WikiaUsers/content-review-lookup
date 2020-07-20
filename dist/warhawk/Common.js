/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'General', link:'Project:Bureaucrats' },
                sysop: { u:'Colonel', link:'Project:Administrators' },
		inactive: { u: 'Veteran' },
                chatmoderator: { m: 'Wingman', f: 'Wingwoman', u: 'Wingman', link:'Project:ChatModerators' },
                rollback: { u: 'Sergeant', link:'Project:Rollbacks' },
                autoconfirmed: { m: 'Airman', f: 'Airwoman', u:'Airman' },
                patroller: { u: 'Lieutenant' },
                notautoconfirmed: { u: 'Recruit' },
                nonuser: { u: 'Civilian' },
	}
};
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
	'chatmoderator': ['sysop', 'bureaucrat'],
        'autoconfirmed': ['sysop', 'bureaucrat', 'patroller', 'rollback']
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});