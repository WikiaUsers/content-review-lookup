/* Any JavaScript here will be loaded for all users on every page load. */

// UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
                founder: { u:'Founder' },
                bureaucrat: { u:'Bureaucrat' },
		sysop: { u:'Administrator' },
                rollback: { u:'Rollback' },
                chatmoderator: { u:'Chat Moderator' },
                blocked: { u:'Blocked' },
		inactive: { u: 'Inactive' },
               king: { u:'Kingster' },
               react: { u:'Reactor' },
                contributor: { u:'Helper' },
               guard: { u:'React Guardian' },
		news: { u:'Newsperson' },
		unstoppable: { u:'Unstoppable' },
		hated: { u:'Hated' },
	}
};
UserTagsJS.modules.custom = {
       JohnnyHarden: ['king'],
      Dannysreactions: ['react', 'contributor'],
      LibertyGroveSantos4SA5: ['react', 'guard'],
      KimJongUn98: ['contributor', 'news'],
      TheEpicReactor: ['guard'],
      Maxmoefoe2: ['react'],
      'ZEROFC4 Sack': ['contributor', 'guard'],
	Turbomouth: ['guard', 'react'],   
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'],
};
UserTagsJS.modules.userfilter = {
       JohnnyHarden: ['bureaucrat'],
	'Wikia': ['inactive'],
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});