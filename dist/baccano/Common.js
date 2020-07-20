/* Any JavaScript here will be loaded for all users on every page load. */

/******************************************************************/
/* UserTags Customization. See http://dev.wikia.com/wiki/UserTags */
/******************************************************************/

window.UserTagsJS = {
	modules: {},
	tags: {sysop: {link:'Baccano! Wiki:Administrators', order:1 },
	      bureaucrat: {link: 'Baccano! Wiki:Administrators', order:2},
	      formeradmin: {u: 'Former Admin', link: 'Baccano! Wiki:Administrators', order:3},
	      immortal: {u: 'Immortal', link: 'Baccano! Wiki:Administrators'},
	      founder: {u:'Wiki Founder'},
	      bot: {link:'Help:Bots' },
	}        
};
UserTagsJS.modules.custom = {
  'Farewellfire': ['formeradmin'],
  'Ladyshift': ['formeradmin'],
  'AimanFurtwrangler': ['founder'],
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'content-moderator', 'bot', 'bot-global']; 
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = false;

UserTagsJS.modules.implode = {
    'immortal': ['sysop', 'bureaucrat'],
};